#!/usr/bin/env python3
"""Read-only: report how each live page's chrome (head assets, cookie banner,
nav, footer) differs from the canonical scripts/_chrome_source.html.

Run from the repo root:

    python3 scripts/check-chrome-drift.py

Only pages that contain all five chrome markers (i.e. pages built from the
shared chrome layout — not every page on the site uses identical chrome,
e.g. contact.html has its own extra CTA-bar suppression) are checked. A
difference here isn't automatically a bug — some pages intentionally vary
(e.g. active nav state) — read the diff before deciding to fix anything.
"""

import difflib
import os
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


def main():
    canonical = extract_chrome(CHROME_SOURCE)
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
        diffs = {k: canonical[k] for k in CHECK_KEYS if actual.get(k) != canonical[k]}
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
        for key, actual_val in diffs.items():
            expected_val = canonical[key]
            sm = difflib.SequenceMatcher(None, expected_val, actual_val)
            ratio = sm.ratio()
            print(f"  {key}: similarity {ratio:.3f} "
                  f"(expected {len(expected_val)} chars, actual {len(actual_val)} chars)")


if __name__ == "__main__":
    main()
