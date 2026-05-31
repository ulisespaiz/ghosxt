#!/usr/bin/env python3
"""One-off mobile page-speed pass applied across all site HTML.

Safe, visually-neutral changes flagged by a mobile Lighthouse audit:
  1. Logo: point every <img src> at the new 160x160 webp (7 KB vs 63 KB).
     Leaves JSON-LD "image": refs (absolute URLs) untouched.
  2. Google Fonts: convert the render-blocking stylesheet <link> into a
     non-render-blocking media="print"/onload swap + <noscript> fallback.
     Matches the pattern already used for the flaticon stylesheet.
  3. Drop the unused preconnect to https://calendly.com (Calendly only
     loads on click, so the early connection is wasted).

Idempotent: re-running makes no further changes. Run from repo root:
    python3 scripts/perf-mobile-pass.py
"""
import glob
import re
import sys

OLD_LOGO = 'src="assets/img/ghosxt logo.webp"'
NEW_LOGO = 'src="assets/img/ghosxt-logo-160.webp"'

FONT_URL = (
    "https://fonts.googleapis.com/css2?"
    "family=Roboto:wght@400;500;600;700&display=swap"
)

# Render-blocking stylesheet link, in every formatting variant present:
#   <link href="...Roboto..." rel="stylesheet" />   (self-closing)
#   <link href="...Roboto..." rel="stylesheet">     (about/contact)
#   multi-line  <link\n  href="..."\n  rel="stylesheet"\n/>
BLOCKING_FONT_RE = re.compile(
    r'<link\s+href="' + re.escape(FONT_URL) + r'"\s+rel="stylesheet"\s*/?>',
    re.DOTALL,
)
FONT_REPLACEMENT = (
    '<link rel="stylesheet" media="print" onload="this.media=\'all\'" '
    f'href="{FONT_URL}" />\n'
    f'    <noscript><link rel="stylesheet" href="{FONT_URL}" /></noscript>'
)

# Calendly preconnect, with or without the trailing slash.
CALENDLY_RE = re.compile(
    r'[ \t]*<link rel="preconnect" href="https://calendly\.com"\s*/?>\n?'
)


def process(path: str) -> dict:
    with open(path, encoding="utf-8") as fh:
        src = fh.read()
    orig = src
    counts = {"logo": 0, "font": 0, "calendly": 0}

    counts["logo"] = src.count(OLD_LOGO)
    src = src.replace(OLD_LOGO, NEW_LOGO)

    # Re-runs are no-ops: the regex requires href immediately after "<link",
    # which only the original render-blocking link has (the new async link
    # and its <noscript> fallback both lead with rel=, so they never match).
    src, counts["font"] = BLOCKING_FONT_RE.subn(FONT_REPLACEMENT, src)

    src, counts["calendly"] = CALENDLY_RE.subn("", src)

    if src != orig:
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(src)
    return counts


def main() -> int:
    files = sorted(glob.glob("*.html") + glob.glob("blog/*.html"))
    if not files:
        print("No HTML files found. Run from the repo root.", file=sys.stderr)
        return 1
    totals = {"logo": 0, "font": 0, "calendly": 0}
    changed = 0
    for path in files:
        c = process(path)
        if any(c.values()):
            changed += 1
        for k in totals:
            totals[k] += c[k]
    print(f"Processed {len(files)} files; modified {changed}.")
    print(f"  logo <img> swapped : {totals['logo']}")
    print(f"  font links async   : {totals['font']}")
    print(f"  calendly preconnect removed: {totals['calendly']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
