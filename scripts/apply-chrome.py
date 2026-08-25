#!/usr/bin/env python3
"""Propagate scripts/_chrome_source.html to live pages that already contain
the standard chrome markers (i.e. pages generate-location-service-pages.py /
generate-it-help-pages.py could have built, or an equivalent hand-authored
page, see check-chrome-drift.py for which pages qualify).

Defaults to a dry run (reports what would change, writes nothing). Pass
--apply to actually write. Pass specific filenames to scope to just those
pages; with no filenames, targets every page check-chrome-drift.py reports
as drifted. Pass --regions=key1,key2 to limit which chrome regions get
synced (valid keys: head_assets, cf_analytics, body_top, nav, footer,
cookie_banner); with no --regions, all MARKERS regions plus cookie_banner
are synced, which will also pick up any other pre-existing drift in those
regions (e.g. per-page minified-asset paths in head_assets) alongside
whatever you actually meant to change, so scope narrowly when you only
intend a specific, targeted edit.

    python3 scripts/apply-chrome.py                        # dry run, all drifted pages
    python3 scripts/apply-chrome.py --apply index.html      # write just index.html
    python3 scripts/apply-chrome.py --apply                 # write all drifted pages
    python3 scripts/apply-chrome.py --apply --regions=cookie_banner
                                                            # write only the cookie-banner move

This replaces each of the four MARKERS regions independently and in place.
It does not touch anything between them (hero, body sections, FAQs, etc.),
so a page's unique content is preserved. Read the diff (or run with dry-run
first) before applying broadly: some chrome differences are intentional
per-page variance, not drift to fix.

The cookie_banner region is handled separately from MARKERS (see
remove_cookie_banner_before_nav / insert_cookie_banner_after_main below):
unlike body_top, which some pages decorate with their own extra markup
(an accessibility comment, a decorative overlay div) that a blind
region-replace would erase, or fold into a </main>-to-<footer> span whose
gap content (a stray comment, etc.) also varies per page, cookie_banner
surgically removes/inserts only the cookie-banner element itself, matched
by balanced div depth, leaving everything else in those spans untouched.
"""

import os
import re
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


DIV_TAG_RE = re.compile(r'<div\b|</div>')
COOKIE_BANNER_OPEN = '<div class="cookie-banner" id="cookieBanner">'


def _find_matching_div_end(text, start):
    """Given the index of an opening '<div' at `start`, return the index
    just past its balanced closing '</div>', or None if unbalanced."""
    depth = 0
    for m in DIV_TAG_RE.finditer(text, start):
        depth += 1 if m.group() == '<div' else -1
        if depth == 0:
            return m.end()
    return None


def remove_cookie_banner_before_nav(text):
    """Fix 14 (DOM-order audit): the cookie banner used to live in
    body_top, before the nav and before <main>, so crawlers hit it
    before real content. Remove it from there wherever it still is,
    matched by balanced div depth rather than by whole-region markers,
    so any other body_top content (an accessibility comment, a
    decorative overlay div, a page's own extra class on <body>, etc.)
    is left completely untouched. No-op if no such block sits before
    the nav (already moved, or a page like 404.html that never had
    one).
    """
    nav_pos = text.find('<nav class="navbar"')
    if nav_pos == -1:
        return text
    start = text.find(COOKIE_BANNER_OPEN)
    if start == -1 or start > nav_pos:
        return text
    end = _find_matching_div_end(text, start)
    if end is None:
        return text  # malformed; leave alone rather than guess
    head = text[:start].rstrip()
    tail = text[end:].lstrip("\n")
    return head + "\n\n" + tail


def insert_cookie_banner_after_main(text, cookie_banner_block, had_banner):
    """Fix 14 (DOM-order audit): insert the canonical cookie banner
    immediately after the page's closing </main>, so it renders after
    the page's main content in source order. Splices in right after
    </main> without touching whatever already follows (a stray
    comment, blank lines, the footer itself), unlike a blind
    </main>-to-<footer> region replace, whose gap content varies per
    page. No-op if a cookie banner already sits there (idempotent
    against re-runs), if the page has no </main> to anchor on, or if
    `had_banner` is False: a page like 404.html that never carried a
    cookie banner anywhere in its original content must not have one
    injected just because it happens to have a </main>. `had_banner`
    is decided once, up front, from the page's original content (see
    apply_to_file), before remove_cookie_banner_before_nav has had a
    chance to strip an existing banner out of body_top.
    """
    if not had_banner:
        return text
    main_end_marker = "</main>"
    idx = text.find(main_end_marker)
    if idx == -1:
        return text
    insert_at = idx + len(main_end_marker)
    remainder = text[insert_at:]
    if remainder.lstrip().startswith(COOKIE_BANNER_OPEN):
        return text  # already inserted
    return text[:insert_at] + "\n\n" + cookie_banner_block + "\n\n" + remainder.lstrip("\n")


def apply_to_file(path, canonical, dry_run=True, regions=None):
    with open(path, encoding="utf-8") as f:
        text = f.read()

    # Decided once, from the page's original (as-read) content, before any
    # region edits below run: a page like 404.html that never carried a
    # cookie banner anywhere must not gain one just because it has a
    # </main>. See insert_cookie_banner_after_main.
    had_cookie_banner = 'id="cookieBanner"' in text

    changed_regions = []
    for key, (start_marker, end_marker) in MARKERS.items():
        if regions is not None and key not in regions:
            continue
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

    if regions is None or "cookie_banner" in regions:
        stripped = remove_cookie_banner_before_nav(text)
        if stripped != text:
            text = stripped
            changed_regions.append("cookie_banner (removed before nav)")
        inserted = insert_cookie_banner_after_main(text, canonical["cookie_banner"], had_cookie_banner)
        if inserted != text:
            text = inserted
            changed_regions.append("cookie_banner (inserted after main)")

    # footer_only is just the <footer>...</footer> element, deliberately
    # NOT the footer-to-EOF field the generators use: a page's own trailing
    # scripts (a calculator widget, a form handler, etc.) live after
    # </footer> and must be left alone.
    if regions is None or "footer" in regions:
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
    regions = None
    for a in args:
        if a.startswith("--regions="):
            regions = set(a[len("--regions="):].split(","))
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
        result = apply_to_file(path, canonical, dry_run=dry_run, regions=regions)
        if result is None:
            continue
        verb = "would update" if dry_run else "updated"
        print(f"{verb} {name}: {', '.join(result)}")

    if dry_run:
        print("\nDry run only: no files written. Re-run with --apply to write.")


if __name__ == "__main__":
    main()
