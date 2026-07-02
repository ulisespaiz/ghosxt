#!/usr/bin/env python3
"""One-off normalization of the 6 "DoD-cleared engineer" phrasing variants
scattered across the site down to a single canonical form.

Run from the repo root:

    python3 scripts/normalize-dod-phrasing.py

Safe to re-run (idempotent — matched strings are already gone after the
first pass, and this can be deleted afterward).
"""

import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Ordered, mutually-exclusive exact-string replacements. None of these
# substrings overlap with another entry, so order doesn't matter for
# correctness, but exact-string (not regex) matching is used to avoid any
# risk of unintended partial matches.
REPLACEMENTS = [
    ("DoD-cleared IT engineer", "DoD-cleared engineer"),
    ("cleared DoD IT engineer", "DoD-cleared engineer"),
    ("cleared DoD engineer", "DoD-cleared engineer"),
    ("Cleared DoD IT engineer", "DoD-cleared engineer"),
    ("Cleared DoD engineer", "DoD-cleared engineer"),
    # Title-case heading — keep title case rather than dropping to sentence case.
    ("DoD-Cleared IT Engineer", "DoD-Cleared Engineer"),
]


def target_files():
    files = []
    for name in os.listdir(ROOT):
        if name.endswith(".html"):
            files.append(os.path.join(ROOT, name))
    blog_dir = os.path.join(ROOT, "blog")
    if os.path.isdir(blog_dir):
        for name in os.listdir(blog_dir):
            if name.endswith(".html"):
                files.append(os.path.join(blog_dir, name))
    for name in ("generate-location-service-pages.py", "generate-it-help-pages.py"):
        p = os.path.join(ROOT, "scripts", name)
        if os.path.isfile(p):
            files.append(p)
    return files


def main():
    total_changes = 0
    changed_files = 0
    for path in target_files():
        with open(path, encoding="utf-8") as f:
            text = f.read()
        original = text
        file_changes = 0
        for old, new in REPLACEMENTS:
            count = text.count(old)
            if count:
                text = text.replace(old, new)
                file_changes += count
        if text != original:
            with open(path, "w", encoding="utf-8") as f:
                f.write(text)
            changed_files += 1
            total_changes += file_changes
            print(f"{os.path.relpath(path, ROOT)}: {file_changes} replacement(s)")
    print(f"\n{total_changes} total replacements across {changed_files} files.")


if __name__ == "__main__":
    sys.exit(main())
