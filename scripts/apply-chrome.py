#!/usr/bin/env python3
"""Propagate scripts/_chrome_source.html to live pages that already contain
the standard chrome markers (i.e. pages generate-location-service-pages.py /
generate-it-help-pages.py could have built, or an equivalent hand-authored
page — see check-chrome-drift.py for which pages qualify).

Defaults to a dry run (reports what would change, writes nothing). Pass
--apply to actually write. Pass specific filenames to scope to just those
pages; with no filenames, targets every page check-chrome-drift.py reports
as drifted.

    python3 scripts/apply-chrome.py                        # dry run, all drifted pages
    python3 scripts/apply-chrome.py --apply index.html      # write just index.html
    python3 scripts/apply-chrome.py --apply                 # write all drifted pages

This replaces each of the five chrome regions independently and in place —
it does not touch anything between them (hero, body sections, FAQs, etc.),
so a page's unique content is preserved. Read the diff (or run with dry-run
first) before applying broadly: some chrome differences are intentional
per-page variance, not drift to fix.
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _chrome import extract_chrome, slice_between, CHROME_SOURCE

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MARKERS = {
    "head_assets": ('    <link rel="icon" href="assets/img/favicon.ico"', '    <script type="application/ld+json">'),
    "cf_analytics": ("    <!-- ghosxt:cf-web-analytics -->", "  </head>"),
    "body_top": ("  <body>", '    <nav class="navbar"'),
    "nav": ('    <nav class="navbar"', '    <main id="main-content">'),
}


def apply_to_file(path, canonical, dry_run=True):
    with open(path, encoding="utf-8") as f:
        text = f.read()

    changed_regions = []
    for key, (start_marker, end_marker) in MARKERS.items():
        try:
            current = slice_between(text, start_marker, end_marker, include_start=True, include_end=False)
        except ValueError:
            continue  # this page doesn't have this region; leave it alone
        if current.rstrip("\n") == canonical[key]:
            continue
        s = text.index(start_marker)
        e = text.index(end_marker, s + len(start_marker))
        text = text[:s] + canonical[key] + "\n\n" + text[e:]
        changed_regions.append(key)

    # footer_only is just the <footer>...</footer> element, deliberately
    # NOT the footer-to-EOF field the generators use — a page's own trailing
    # scripts (a calculator widget, a form handler, etc.) live after
    # </footer> and must be left alone.
    footer_marker = '    <footer class="footer" id="footerSection">'
    footer_end_marker = "    </footer>"
    if footer_marker in text and footer_end_marker in text[text.index(footer_marker):]:
        current_footer = slice_between(text, footer_marker, footer_end_marker, include_end=True)
        if current_footer.rstrip("\n") != canonical["footer_only"]:
            s = text.index(footer_marker)
            e = s + len(current_footer)
            text = text[:s] + canonical["footer_only"] + text[e:]
            changed_regions.append("footer")

    if not changed_regions:
        return None

    if not dry_run:
        with open(path, "w", encoding="utf-8") as f:
            f.write(text)
    return changed_regions


def main():
    args = sys.argv[1:]
    dry_run = "--apply" not in args
    targets = [a for a in args if not a.startswith("--")]

    canonical = extract_chrome(CHROME_SOURCE)

    if not targets:
        for name in sorted(os.listdir(ROOT)):
            if name.endswith(".html"):
                targets.append(name)

    for name in targets:
        path = os.path.join(ROOT, name)
        if not os.path.isfile(path):
            print(f"skip (not found): {name}")
            continue
        result = apply_to_file(path, canonical, dry_run=dry_run)
        if result is None:
            continue
        verb = "would update" if dry_run else "updated"
        print(f"{verb} {name}: {', '.join(result)}")

    if dry_run:
        print("\nDry run only — no files written. Re-run with --apply to write.")


if __name__ == "__main__":
    main()
