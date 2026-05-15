#!/usr/bin/env python3
"""Generate per-page Open Graph images for ghosxt.com.

Reads each top-level *.html and blog/*.html, extracts the page <title>
(canonical SEO title), and renders a 1200x630 PNG with the Ghosxt logo
plus the title. Output goes to assets/img/og/<slug>.png.

The script is idempotent and safe to re-run: it overwrites existing files.

Requires:
  pip install Pillow

Optional but recommended: download the Roboto-Bold.ttf and Roboto-Regular.ttf
fonts into scripts/fonts/ to match the site's typography. If absent, the
script falls back to DejaVuSans which is bundled on most Linux systems.

Usage:
  python3 scripts/generate-og-images.py
"""

from __future__ import annotations

import os
import re
import sys
import glob
import textwrap
from html import unescape
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("Pillow is required. Install with: pip install Pillow", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "assets" / "img" / "og"
LOGO_PATH = ROOT / "assets" / "img" / "ghosxt logo.png"

WIDTH, HEIGHT = 1200, 630

# Brand palette — kept in sync with assets/css/main.css var --ghosxt-red-0.
BG_COLOR = (15, 15, 18)            # near-black
ACCENT_COLOR = (230, 57, 70)       # Ghosxt red
TEXT_COLOR = (245, 245, 245)
SUBTITLE_COLOR = (170, 170, 175)

# Where to look for font files. First match wins.
FONT_CANDIDATES_BOLD = [
    ROOT / "scripts" / "fonts" / "Roboto-Bold.ttf",
    Path("/usr/share/fonts/truetype/roboto/Roboto-Bold.ttf"),
    Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"),
]
FONT_CANDIDATES_REG = [
    ROOT / "scripts" / "fonts" / "Roboto-Regular.ttf",
    Path("/usr/share/fonts/truetype/roboto/Roboto-Regular.ttf"),
    Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
]


def first_existing(paths):
    for p in paths:
        if p.exists():
            return str(p)
    return None


def load_title(html: str) -> str | None:
    m = re.search(r"<title[^>]*>(.*?)</title>", html, flags=re.S | re.I)
    if not m:
        return None
    return unescape(re.sub(r"\s+", " ", m.group(1)).strip())


def split_title(full_title: str) -> tuple[str, str]:
    """Split 'Page name | Site' style titles into (heading, subtitle)."""
    for sep in (" | ", " – ", " — ", " - "):
        if sep in full_title:
            head, _, tail = full_title.partition(sep)
            return head.strip(), tail.strip()
    return full_title.strip(), "Ghosxt"


def wrap_to_width(draw, text, font, max_width):
    """Wrap text to fit max_width pixels using a binary search per line."""
    words = text.split()
    lines = []
    current = []
    for w in words:
        trial = " ".join(current + [w])
        if draw.textlength(trial, font=font) <= max_width:
            current.append(w)
        else:
            if current:
                lines.append(" ".join(current))
            current = [w]
    if current:
        lines.append(" ".join(current))
    return lines


def render_og(title: str, subtitle: str, out_path: Path, logo_img):
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)

    # Accent bar on the left edge
    draw.rectangle([(0, 0), (12, HEIGHT)], fill=ACCENT_COLOR)

    # Brand row: logo + wordmark live in a reserved band at the top so the
    # heading can never collide with them, even when the title wraps to
    # three lines.
    LOGO_TOP = 56
    LOGO_SIZE = 72
    LOGO_LEFT = 60
    WORDMARK_X = LOGO_LEFT + LOGO_SIZE + 20
    BRAND_BAND_BOTTOM = LOGO_TOP + LOGO_SIZE  # 128
    HEADING_TOP = BRAND_BAND_BOTTOM + 56      # 184 — generous gap below brand row
    FOOTER_TOP = HEIGHT - 120                 # 510

    if logo_img is not None:
        ratio = min(LOGO_SIZE / logo_img.width, LOGO_SIZE / logo_img.height)
        new_size = (int(logo_img.width * ratio), int(logo_img.height * ratio))
        logo_resized = logo_img.resize(new_size, Image.LANCZOS)
        img.paste(
            logo_resized,
            (LOGO_LEFT, LOGO_TOP),
            logo_resized if logo_resized.mode == "RGBA" else None,
        )

    brand_font_path = first_existing(FONT_CANDIDATES_BOLD)
    reg_font_path = first_existing(FONT_CANDIDATES_REG)
    if not brand_font_path or not reg_font_path:
        raise SystemExit("No usable TTF font found. Drop Roboto-Bold.ttf into scripts/fonts/.")

    # Wordmark vertically centered against the logo
    brand_font = ImageFont.truetype(brand_font_path, 30)
    wm_bbox = draw.textbbox((0, 0), "GHOSXT", font=brand_font)
    wm_h = wm_bbox[3] - wm_bbox[1]
    wm_y = LOGO_TOP + (LOGO_SIZE - wm_h) // 2 - 2
    draw.text((WORDMARK_X, wm_y), "GHOSXT", font=brand_font, fill=TEXT_COLOR)

    # Heading: pick the largest size that fits in the heading band
    # (between HEADING_TOP and FOOTER_TOP) with at most 3 lines.
    max_text_width = WIDTH - 120
    heading_available_h = FOOTER_TOP - HEADING_TOP
    for size in (72, 64, 58, 52, 46, 42, 38):
        title_font = ImageFont.truetype(brand_font_path, size)
        lines = wrap_to_width(draw, title, title_font, max_text_width)
        line_height = int(size * 1.18)
        block_height = line_height * len(lines)
        fits_lines = len(lines) <= 3
        fits_width = all(draw.textlength(l, font=title_font) <= max_text_width for l in lines)
        fits_height = block_height <= heading_available_h
        if fits_lines and fits_width and fits_height:
            break

    # Vertically center the heading within the heading band so short titles
    # don't crowd the brand row.
    start_y = HEADING_TOP + (heading_available_h - block_height) // 2
    for i, line in enumerate(lines):
        draw.text((60, start_y + i * line_height), line, font=title_font, fill=TEXT_COLOR)

    # Subtitle / domain in the bottom band.
    subtitle_font = ImageFont.truetype(reg_font_path, 28)
    domain_font = ImageFont.truetype(brand_font_path, 26)
    sub_y = HEIGHT - 90
    # Truncate the subtitle if it would collide with the domain on the right
    domain_text = "ghosxt.com"
    domain_width = draw.textlength(domain_text, font=domain_font)
    max_sub_width = WIDTH - 120 - domain_width - 24
    sub = subtitle
    while sub and draw.textlength(sub + "…", font=subtitle_font) > max_sub_width:
        sub = sub[:-1]
    if sub != subtitle:
        sub = sub.rstrip() + "…"
    draw.text((60, sub_y), sub, font=subtitle_font, fill=SUBTITLE_COLOR)
    draw.text((WIDTH - 60 - domain_width, sub_y + 2), domain_text, font=domain_font, fill=ACCENT_COLOR)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(out_path, format="PNG", optimize=True)


def slug_for_path(html_path: Path) -> str:
    rel = html_path.relative_to(ROOT)
    parts = list(rel.parts)
    if parts == ["index.html"]:
        return "home"
    if parts == ["blog", "index.html"]:
        return "blog-index"
    if parts[0] == "blog":
        return f"blog-{parts[1].removesuffix('.html')}"
    return parts[0].removesuffix(".html")


def main():
    pages = sorted(ROOT.glob("*.html")) + sorted((ROOT / "blog").glob("*.html"))
    logo_img = None
    if LOGO_PATH.exists():
        logo_img = Image.open(LOGO_PATH).convert("RGBA")

    written = []
    for path in pages:
        with open(path, "r", encoding="utf-8") as f:
            html = f.read()
        # Skip noindex pages
        if re.search(r'<meta\s+name="robots"\s+content="[^"]*noindex', html, re.I):
            continue
        full_title = load_title(html)
        if not full_title:
            continue
        heading, subtitle = split_title(full_title)
        slug = slug_for_path(path)
        out_path = OUT_DIR / f"{slug}.png"
        render_og(heading, subtitle, out_path, logo_img)
        written.append((path.relative_to(ROOT), out_path.relative_to(ROOT)))

    print(f"Generated {len(written)} OG images:")
    for src, dst in written:
        print(f"  {src} -> {dst}")


if __name__ == "__main__":
    main()
