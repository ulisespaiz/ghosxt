#!/usr/bin/env python3
"""Read-only: report how each live page's chrome (head assets, cookie banner,
nav, footer) differs from the canonical scripts/_chrome_source.html.

Run from the repo root:

    python3 scripts/check-chrome-drift.py
    python3 scripts/check-chrome-drift.py --diff agriculture-it-services.html

--diff <page> prints a unified diff (canonical vs page) for every drifted
region of that page, after the same normalisation used for the comparison.

Only pages that contain all five chrome markers (i.e. pages built from the
shared chrome layout) are checked. Not every page on the site uses identical
chrome, e.g. contact.html has its own extra CTA-bar suppression. A
difference here isn't automatically a bug: some pages intentionally vary
(e.g. active nav state). Read the diff before deciding to fix anything.
"""

import argparse
import difflib
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _chrome import extract_chrome, CHROME_SOURCE

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def find_html_files():
    files = []
    for name in sorted(os.listdir(ROOT)):
        if name.endswith(".html"):
            files.append(os.path.join(ROOT, name))
    return files


CHECK_KEYS = ["head_assets", "cf_analytics", "body_top", "nav", "footer_only"]


_THEME_COLOR = re.compile(r'^[ \t]*<meta\s+name="theme-color"[^>]*/?>[ \t]*\n?', re.M)
_CACHE_STAMP = re.compile(r'(\.(?:css|js))\?v=[^"\'\s>]+')
_MIN = re.compile(r'\.min(\.(?:css|js))\b')


def normalise(text):
    """Make a chrome region comparable: the served pages link the .min copies
    with ?v= cache stamps (scripts/minify.py), and carry theme-color outside
    the compared block, so none of those count as drift. Blank lines are
    dropped too, since pages space their head differently."""
    text = _THEME_COLOR.sub("", text)
    text = _CACHE_STAMP.sub(r"\1", text)
    text = _MIN.sub(r"\1", text)
    return "\n".join(l for l in text.split("\n") if l.strip())


def region_diffs(canonical, actual):
    out = {}
    for k in CHECK_KEYS:
        a = normalise(actual.get(k) or "")
        c = normalise(canonical[k])
        if a != c:
            out[k] = (c, a)
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--diff", metavar="PAGE",
                    help="print a unified diff per drifted region for this page")
    args = ap.parse_args()
    canonical = extract_chrome(CHROME_SOURCE)

    if args.diff:
        path = args.diff if os.path.isabs(args.diff) else os.path.join(ROOT, args.diff)
        if not os.path.exists(path) and not path.endswith(".html"):
            path += ".html"
        try:
            actual = extract_chrome(path)
        except (ValueError, OSError) as e:
            print(f"cannot read chrome from {args.diff}: {e}")
            return 1
        diffs = region_diffs(canonical, actual)
        if not diffs:
            print("no drift")
        for key, (c, a) in diffs.items():
            print(f"=== {key} ===")
            sys.stdout.writelines(difflib.unified_diff(
                [l + "\n" for l in c.split("\n")], [l + "\n" for l in a.split("\n")],
                "canonical", os.path.basename(path), lineterm="\n"))
        return 0

    files = find_html_files()
    clean = 0
    drifted = []
    skipped = 0
    for path in files:
        try:
            actual = extract_chrome(path)
        except ValueError:
            skipped += 1
            continue
        diffs = region_diffs(canonical, actual)
        if diffs:
            drifted.append((path, diffs))
        else:
            clean += 1

    print(f"{clean} pages match the canonical chrome exactly.")
    print(f"{skipped} pages skipped (missing one or more chrome markers).")
    print(f"{len(drifted)} pages drifted:\n")
    for path, diffs in drifted:
        name = os.path.relpath(path, ROOT)
        print(f"=== {name}: {', '.join(diffs.keys())} ===")
        for key, (expected_val, actual_val) in diffs.items():
            ratio = difflib.SequenceMatcher(None, expected_val, actual_val).ratio()
            # never print 1.000 for a real difference
            ratio = min(ratio, 0.999)
            print(f"  {key}: similarity {ratio:.3f} "
                  f"(expected {len(expected_val)} chars, actual {len(actual_val)} chars)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
