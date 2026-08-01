#!/usr/bin/env python3
"""
update-review-count.py — one-command sync of the site's Google review
count and rating.

Every page that shows the "★★★★★ Rated 5.0 across 25+ Google reviews"
trust callout wraps that block in an HTML comment marker:

    <!-- ghosxt:trust-reviews -->

This script finds every such marked block across the site, and rewrites:
  - the rating number (e.g. "5.0") inside the block's <strong>...</strong>
  - the review-count text (e.g. "25+ Google reviews" -> "26 Google reviews")

from a single source of truth, site-config.json:

    {
      "google_review_count": 26,
      "google_rating": "5.0"
    }

so that updating the real-world review count in one place (the config
file) and re-running this script updates every page consistently — no
more hunting down each occurrence by hand.

USAGE
-----
    python update-review-count.py --root /path/to/ghosxt --dry-run
    python update-review-count.py --root /path/to/ghosxt --apply
    python update-review-count.py --root /path/to/ghosxt --config my-config.json --apply

Notes
-----
  * Default behavior (no --apply) is ALWAYS a dry run.
  * The scan is marker-driven: it walks the repo (skipping .git, assets,
    node_modules, and any *.min.css / *.min.js) looking for
    "<!-- ghosxt:trust-reviews -->" in any *.html file, so it stays
    correct even if the marker is added to new pages later.
  * Each marked block runs from the marker to the next "</p>" close tag.
    Only the rating and review-count text inside that window are
    touched — nothing else on the page is modified.
  * 54 of the marked pages also carry a second, unmarked "key-facts"
    dt/dd block with the same rating and review count
    ("<dt>Rated</dt><dd>...5.0 on ...25+ Google reviews</a></dd>"). Its
    structure is identical site-wide, so this script updates it directly
    wherever it appears in a file that also carries the marker (every
    file that has the block also has the marker, so the marker-driven
    file discovery below still finds all of them).
  * Idempotent: re-running with the same config is a no-op the second
    time (the "NN+ Google reviews" pattern this script looks for no
    longer matches after the "+" has been dropped).
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from typing import List, Tuple

MARKER = "<!-- ghosxt:trust-reviews -->"

EXCLUDE_DIR_NAMES = {".git", "assets", "node_modules"}
EXCLUDE_SUFFIXES = (".min.css", ".min.js")

RATING_RE = re.compile(r"<strong>\s*(\d+(?:\.\d+)?)\s*</strong>")
REVIEW_COUNT_RE = re.compile(r"(\d+)\+?(&nbsp;|\s+)Google reviews")

# A second, non-marker-scoped occurrence of the same rating/review-count
# pair: the "<dt>Rated</dt><dd>...</dd>" key-facts block used on 54 pages.
# It is not wrapped in the <!-- ghosxt:trust-reviews --> marker, but its
# structure is consistent enough site-wide to update safely and directly.
KEY_FACTS_RE = re.compile(
    r'(<dt>Rated</dt><dd><span class="key-facts__stars"[^>]*>[^<]*</span>\s*)'
    r"(\d+(?:\.\d+)?)"
    r"(\s*on\s*<a[^>]*>)"
    r"(\d+)\+?"
    r"(&nbsp;|\s+)"
    r"(Google reviews</a></dd>)"
)


def discover_marked_files(root: str) -> List[str]:
    found = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIR_NAMES and not d.startswith(".")]
        for name in filenames:
            if not name.endswith(".html"):
                continue
            if name.endswith(EXCLUDE_SUFFIXES):
                continue
            path = os.path.join(dirpath, name)
            try:
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
            except (UnicodeDecodeError, OSError):
                continue
            if MARKER in content:
                found.append(os.path.relpath(path, root))
    return sorted(found)


def update_blocks(text: str, rating: str, review_count) -> Tuple[str, int]:
    """Replace the rating and review-count inside every
    marker -> next "</p>" window. Returns (new_text, num_fields_changed)."""
    count_str = str(review_count)
    changed = 0
    out = []
    pos = 0
    while True:
        idx = text.find(MARKER, pos)
        if idx == -1:
            out.append(text[pos:])
            break
        end = text.find("</p>", idx)
        if end == -1:
            # No closing </p> found after the marker; leave the rest as-is.
            out.append(text[pos:])
            break
        end += len("</p>")

        out.append(text[pos:idx])
        block = text[idx:end]

        rating_match = RATING_RE.search(block)
        if rating_match and rating_match.group(1) != rating:
            block = block[: rating_match.start(1)] + rating + block[rating_match.end(1):]
            changed += 1

        count_match = REVIEW_COUNT_RE.search(block)
        if count_match and count_match.group(1) != count_str:
            block = (
                block[: count_match.start()]
                + f"{count_str}{count_match.group(2)}Google reviews"
                + block[count_match.end():]
            )
            changed += 1

        out.append(block)
        pos = end

    full_text = "".join(out)

    def _key_facts_repl(m: "re.Match[str]") -> str:
        nonlocal changed
        old_rating, old_count = m.group(2), m.group(4)
        new_rating = old_rating if old_rating == rating else rating
        new_count = old_count if old_count == count_str else count_str
        if new_rating != old_rating:
            changed += 1
        if new_count != old_count:
            changed += 1
        return f"{m.group(1)}{new_rating}{m.group(3)}{new_count}{m.group(5)}{m.group(6)}"

    full_text = KEY_FACTS_RE.sub(_key_facts_repl, full_text)

    return full_text, changed


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--root", default=".", help="Path to the ghosxt repo root (default: current directory).")
    parser.add_argument(
        "--config",
        default=None,
        help="Path to the config JSON (default: site-config.json in the repo root).",
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Actually write changes. Without this flag the script ALWAYS runs as a dry run.",
    )
    parser.add_argument("--dry-run", action="store_true", help="Explicit dry-run flag (informational only).")
    args = parser.parse_args()

    root = os.path.abspath(args.root)
    if not os.path.isdir(root):
        print(f"error: --root {root!r} is not a directory", file=sys.stderr)
        return 2

    config_path = args.config or os.path.join(args.root, "site-config.json")
    if not os.path.isfile(config_path):
        print(f"error: config file not found: {config_path}", file=sys.stderr)
        return 2
    with open(config_path, "r", encoding="utf-8") as f:
        config = json.load(f)

    rating = str(config["google_rating"])
    review_count = config["google_review_count"]

    files = discover_marked_files(root)
    apply_changes = args.apply

    print("=" * 78)
    print(f"update-review-count.py — {'APPLY' if apply_changes else 'DRY RUN'}")
    print(f"root: {root}")
    print(f"config: {config_path}  (rating={rating!r}, review_count={review_count!r})")
    print(f"marked files found: {len(files)}")
    print("=" * 78)

    total_changed_fields = 0
    total_files_changed = 0
    for rel in files:
        path = os.path.join(root, rel)
        with open(path, "r", encoding="utf-8") as f:
            original = f.read()
        new_text, n = update_blocks(original, rating, review_count)
        status = f"{n} field(s) updated" if n else "already up to date"
        print(f"  {rel:<60} {status}")
        total_changed_fields += n
        if n and new_text != original:
            total_files_changed += 1
            if apply_changes:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(new_text)

    print("-" * 78)
    print(f"files changed: {total_files_changed} / {len(files)}   fields updated: {total_changed_fields}")
    print("=" * 78)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
