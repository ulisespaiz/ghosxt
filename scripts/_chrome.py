"""Shared chrome-extraction logic for the location/service page generators.

Chrome (head assets, cookie banner, nav, footer) is sliced verbatim out of
`_chrome_source.html` — a frozen, non-live copy of the site chrome, not one
of the actual served pages. Earlier, both generator scripts sliced chrome
directly from `cybersecurity-monterey.html`, a real page that gets hand-
edited over time (e.g. the `key-facts`/`trust-reviews` sections added after
the generators were last run) — any generator run with `--force` would have
silently reverted those hand edits back to whatever the live template page
looked like at run time. Freezing the source here means the generators are
stable regardless of what happens to the live pages.

To update site-wide chrome (nav links, footer, cookie banner copy, etc.),
edit `_chrome_source.html` directly, then use `apply-chrome.py` to propagate
the change to every live page — do not edit chrome by hand-patching pages.
"""

import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHROME_SOURCE = os.path.join(ROOT, "scripts", "_chrome_source.html")


def slice_between(text, start_marker, end_marker, include_start=True, include_end=False):
    s = text.index(start_marker)
    e = text.index(end_marker, s + len(start_marker))
    if not include_start:
        s += len(start_marker)
    if include_end:
        e += len(end_marker)
    return text[s:e]


def extract_chrome(path=CHROME_SOURCE):
    """Pull the byte-identical shared blocks out of a page (or the frozen
    chrome source by default)."""
    t = open(path, encoding="utf-8").read()
    head_assets = slice_between(
        t,
        '    <link rel="icon" href="assets/img/favicon.ico"',
        '    <script type="application/ld+json">',
    )
    cf_analytics = slice_between(
        t,
        "    <!-- ghosxt:cf-web-analytics -->",
        "  </head>",
    )
    body_top = slice_between(t, "  <body>", '    <nav class="navbar"')
    nav = slice_between(t, '    <nav class="navbar"', '    <main id="main-content">')
    # "footer" runs to end-of-file (not just </footer>) because the page
    # generators use it as a literal suffix — it also carries the trailing
    # main.js include, mobile-cta-bar markup, and closing tags that every
    # *generated* page needs verbatim. That makes it unsuitable for
    # drift-checking/applying against arbitrary hand-authored pages, which
    # often have their own distinct trailing scripts (a calculator, a form
    # widget, etc.) that would be wrongly clobbered by a blind footer-to-EOF
    # comparison. "footer_only" is the narrower <footer>...</footer> element
    # for that purpose — see check-chrome-drift.py / apply-chrome.py.
    footer = t[t.index('    <footer class="footer" id="footerSection">'):]
    footer_only = slice_between(
        t,
        '    <footer class="footer" id="footerSection">',
        "    </footer>",
        include_end=True,
    )
    return {
        "head_assets": head_assets.rstrip(),
        "cf_analytics": cf_analytics.rstrip(),
        "body_top": body_top.rstrip(),
        "nav": nav.rstrip(),
        "footer": footer.rstrip(),
        "footer_only": footer_only.rstrip(),
    }
