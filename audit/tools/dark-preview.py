#!/usr/bin/env python3
"""Build a site-wide preview of the owner's dark brand tokens, in place.

Preview-branch tooling only. It rewrites served files so Cloudflare's branch
preview shows every page in the dark system (background #0a0a0a, accent
#ff1f3a, white text, Michroma headlines, Inter body). It is not the retheme
itself: the real retheme edits the source stylesheets by hand. This script
exists so the owner can look at the whole site in the dark tokens before
deciding D1 (AUDIT.md).

What it does

1. For every assets/css/<name>.css source it writes assets/css/<name>.dark.css:
   the same rules with every colour literal mapped to the dark palette, chosen
   by the property it sits in (text, surface, or SVG fill). Comments are
   stripped and the output is minified when rcssmin is installed.
2. In every served page (root, blog/, case-studies/) it:
   - links each <name>.dark.css right after the page's <name>.min.css link,
     then assets/css/theme-dark.css (the hand-written layer: fonts, headings,
     buttons, logo) after the last of them;
   - swaps the Roboto Google Fonts URL for Inter plus Michroma, keeping the
     onload handler text identical so the CSP hash allowlist still matches;
   - sets <meta name="theme-color"> to #0a0a0a;
   - maps colours inside style="..." attributes and SVG fill, stroke and
     stop-color attributes.
3. Writes assets/js/index.dark.js from assets/js/index.js (the home page
   canvas paints a white background and black strokes) and points index.html
   at it.

Usage

    python3 audit/tools/dark-preview.py            # dry run: counts only
    python3 audit/tools/dark-preview.py --apply    # write files

Idempotent: a page that already carries the dark-preview marker is skipped.
No em dashes anywhere in this file or its output.
"""

import argparse
import colorsys
import glob
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MARKER = "dark-preview"

# Palette. Only the owner's tokens plus the dark neutrals a page needs for
# surfaces and dividers. No yellow. No grey text: muted text is white at 70%.
BG = "#0a0a0a"
SURFACE = "#141414"
SURFACE_2 = "#1c1c1c"
LINE = "#2a2a2a"
LINE_2 = "#3a3a3a"
RED = "#ff1f3a"
RED_DEEP = "#c9142c"
RED_DEEPER = "#7a0d1c"
RED_TINT = "#2a0b10"
CYAN = "#00ecff"
CYAN_TINT = "rgba(0, 236, 255, 0.12)"
WHITE = "#ffffff"
MUTED = "rgba(255, 255, 255, 0.7)"

NAMED = {
    "white": (255, 255, 255),
    "black": (0, 0, 0),
    "gray": (128, 128, 128),
    "grey": (128, 128, 128),
    "red": (255, 0, 0),
    "silver": (192, 192, 192),
    "whitesmoke": (245, 245, 245),
    "lightgray": (211, 211, 211),
    "lightgrey": (211, 211, 211),
    "darkgray": (169, 169, 169),
    "darkgrey": (169, 169, 169),
    "dimgray": (105, 105, 105),
    "dimgrey": (105, 105, 105),
    "gainsboro": (220, 220, 220),
}

COLOR_RE = re.compile(
    r"#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b"
    r"|rgba?\(\s*[\d.]+%?\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?\s*(?:,\s*[\d.]+%?\s*)?\)"
    r"|(?<![\w-])(?:whitesmoke|lightgray|lightgrey|darkgray|darkgrey|dimgray|dimgrey"
    r"|gainsboro|silver|white|black|gray|grey|red)(?![\w-])",
    re.IGNORECASE,
)

# Tokens that resolve to a neutral. In a text or fill context they are
# replaced by an explicit colour, because the token itself is mapped as a
# surface and would otherwise paint text in the page background colour.
VAR_TEXT = {
    "var(--ghosxt-black)": WHITE,
    "var(--ghosxt-white)": WHITE,
    "var(--ghosxt-gray)": MUTED,
}

TEXT_PROPS = {"color", "-webkit-text-fill-color", "caret-color", "text-decoration-color",
              "text-emphasis-color", "column-rule-color"}
INVERT_PROPS = {"fill", "stroke", "stop-color", "flood-color", "lighting-color"}


def parse_color(lit):
    """Return (r, g, b, a) for a literal, or None when it is not a colour."""
    s = lit.strip().lower()
    if s in NAMED:
        r, g, b = NAMED[s]
        return r, g, b, 1.0
    if s.startswith("#"):
        h = s[1:]
        if len(h) in (3, 4):
            h = "".join(c * 2 for c in h)
        if len(h) == 6:
            return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16), 1.0
        if len(h) == 8:
            return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16), int(h[6:8], 16) / 255
        return None
    m = re.match(r"rgba?\(\s*([\d.]+)(%?)\s*,\s*([\d.]+)(%?)\s*,\s*([\d.]+)(%?)\s*(?:,\s*([\d.]+)(%?)\s*)?\)", s)
    if not m:
        return None

    def chan(v, pct):
        return float(v) * 2.55 if pct else float(v)

    r, g, b = chan(m.group(1), m.group(2)), chan(m.group(3), m.group(4)), chan(m.group(5), m.group(6))
    a = 1.0
    if m.group(7) is not None:
        a = float(m.group(7)) / (100 if m.group(8) else 1)
    return r, g, b, a


def fmt_alpha(a):
    return f"{a:.3g}"


def grey_hex(level):
    v = max(0, min(255, int(round(level * 255))))
    return "#%02x%02x%02x" % (v, v, v)


def map_color(lit, ctx):
    """Map one colour literal to the dark palette for a context: text, surface, invert."""
    parsed = parse_color(lit)
    if parsed is None:
        return lit
    r, g, b, a = parsed
    h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
    hue = h * 360

    if s < 0.15:
        if ctx == "text":
            if a < 1:
                return f"rgba(255, 255, 255, {fmt_alpha(max(a, 0.7))})"
            if l < 0.35:
                return WHITE
            if l < 0.75:
                return MUTED
            return WHITE
        if ctx == "invert":
            nl = 1 - l
            if a < 1:
                v = int(round(nl * 255))
                return f"rgba({v}, {v}, {v}, {fmt_alpha(a)})"
            if nl > 0.95:
                return WHITE
            if nl < 0.06:
                return BG
            return grey_hex(nl)
        if a < 1:
            return lit
        if l >= 0.97:
            return BG
        if l >= 0.85:
            return SURFACE
        if l >= 0.60:
            return LINE
        if l >= 0.30:
            return LINE_2
        if l >= 0.08:
            return SURFACE_2
        return BG

    if hue >= 340 or hue < 20:
        if a < 1:
            return f"rgba(255, 31, 58, {fmt_alpha(a)})"
        if l >= 0.85:
            return RED if ctx == "text" else RED_TINT
        if l < 0.20:
            return RED_DEEPER
        if l < 0.35:
            return RED_DEEP
        return RED

    if 80 <= hue < 180:
        if a < 1:
            return f"rgba(0, 236, 255, {fmt_alpha(a)})"
        if l >= 0.85:
            return CYAN if ctx == "text" else CYAN_TINT
        return CYAN

    if a < 1:
        return f"rgba(255, 31, 58, {fmt_alpha(a)})"
    if l >= 0.85:
        return RED if ctx == "text" else RED_TINT
    return RED


def context_for(prop):
    p = prop.strip().lower()
    if p.startswith("--"):
        return "text" if "text" in p else "surface"
    if p in TEXT_PROPS:
        return "text"
    if p in INVERT_PROPS:
        return "invert"
    return "surface"


def var_surface_map(prop):
    """Explicit values for the neutral tokens in a surface declaration, by property.
    Backgrounds go to the page background or a surface step; borders and outlines
    become hairlines; anything else keeps the token."""
    p = prop.strip().lower()
    if p.startswith("background") or p in ("accent-color", "scrollbar-color"):
        return {"var(--ghosxt-white)": BG, "var(--ghosxt-gray)": SURFACE, "var(--ghosxt-black)": SURFACE_2}
    if p.startswith("border") or p.startswith("outline") or p == "column-rule":
        return {"var(--ghosxt-white)": LINE, "var(--ghosxt-gray)": LINE, "var(--ghosxt-black)": "rgba(255, 255, 255, 0.5)"}
    return {}


def map_value(value, ctx, prop=""):
    if ctx in ("text", "invert"):
        for token, repl in VAR_TEXT.items():
            value = value.replace(token, repl)
    else:
        for token, repl in var_surface_map(prop).items():
            value = value.replace(token, repl)
    return COLOR_RE.sub(lambda m: map_color(m.group(0), ctx), value)


def split_declarations(block):
    """Split a declaration block on semicolons outside quotes and parentheses."""
    parts, buf, depth, quote = [], [], 0, None
    for ch in block:
        if quote:
            buf.append(ch)
            if ch == quote:
                quote = None
            continue
        if ch in ("'", '"'):
            quote = ch
            buf.append(ch)
            continue
        if ch == "(":
            depth += 1
        elif ch == ")":
            depth = max(0, depth - 1)
        if ch == ";" and depth == 0:
            parts.append("".join(buf))
            buf = []
            continue
        buf.append(ch)
    if buf:
        parts.append("".join(buf))
    return parts


def map_declarations(block):
    out = []
    for decl in split_declarations(block):
        if ":" not in decl or not decl.strip():
            out.append(decl)
            continue
        prop, value = decl.split(":", 1)
        out.append(prop + ":" + map_value(value, context_for(prop), prop))
    return ";".join(out)


COMMENT_RE = re.compile(r"/\*.*?\*/", re.S)
BLOCK_RE = re.compile(r"\{([^{}]*)\}")


def transform_css(css):
    css = COMMENT_RE.sub("", css)
    return BLOCK_RE.sub(lambda m: "{" + map_declarations(m.group(1)) + "}", css)


def minify_css(css):
    try:
        import rcssmin  # type: ignore
        return rcssmin.cssmin(css)
    except Exception:
        return re.sub(r"\s+", " ", css).strip()


def minify_js(js):
    try:
        import rjsmin  # type: ignore
        return rjsmin.jsmin(js)
    except Exception:
        return js


STYLE_ATTR_RE = re.compile(r'style="([^"]*)"')
SVG_ATTR_RE = re.compile(r'\b(fill|stroke|stop-color)="([^"]*)"')
CSS_LINK_RE = re.compile(
    r'(?P<indent>[ \t]*)<link rel="stylesheet" href="(?P<prefix>(?:\.\./)*)assets/css/(?P<name>[a-zA-Z0-9_-]+?)(?:\.min)?\.css(?:\?v=[^"]*)?"\s*/?>'
)
STYLE_BLOCK_RE = re.compile(r"(<style\b[^>]*>)(.*?)(</style>)", re.S)
ROBOTO = "family=Roboto:wght@400;500;600;700&display=swap"
DARK_FONTS = "family=Inter:wght@400;500;600;700&family=Michroma&display=swap"
THEME_COLOR_RE = re.compile(r'(<meta name="theme-color" content=")[^"]*(")')
INDEX_JS_RE = re.compile(r'(src=")assets/js/index(?:\.min)?\.js(?:\?v=[^"]*)?(")')


def transform_html(html, is_index):
    if MARKER in html:
        return html, 0
    changes = 0

    # 1. Stylesheet links.
    links = list(CSS_LINK_RE.finditer(html))
    if not links:
        return html, 0
    prefix = links[0].group("prefix")
    pieces, last = [], 0
    for m in links:
        pieces.append(html[last:m.end()])
        name, indent = m.group("name"), m.group("indent")
        if name != "theme-dark":
            pieces.append(f'\n{indent}<link rel="stylesheet" href="{m.group("prefix")}assets/css/{name}.dark.css?v={MARKER}" />')
            changes += 1
        last = m.end()
    pieces.append(f'\n{links[0].group("indent")}<link rel="stylesheet" href="{prefix}assets/css/theme-dark.css?v={MARKER}" />')
    pieces.append(html[last:])
    html = "".join(pieces)
    changes += 1

    # 2. Fonts and theme colour.
    n = html.count(ROBOTO)
    html = html.replace(ROBOTO, DARK_FONTS)
    changes += n
    html, n = THEME_COLOR_RE.subn(r"\g<1>" + BG + r"\g<2>", html)
    changes += n

    # 3. Inline style blocks, style attributes and SVG paint attributes.
    def block_sub(m):
        return m.group(1) + transform_css(m.group(2)).replace(chr(0x2014), "-") + m.group(3)

    html, n = STYLE_BLOCK_RE.subn(block_sub, html)
    changes += n

    def style_sub(m):
        return 'style="' + map_declarations(m.group(1)) + '"'

    html, n = STYLE_ATTR_RE.subn(style_sub, html)
    changes += n

    def svg_sub(m):
        return f'{m.group(1)}="{map_value(m.group(2), "invert")}"'

    html, n = SVG_ATTR_RE.subn(svg_sub, html)
    changes += n

    # 4. Home page canvas script.
    if is_index:
        html, n = INDEX_JS_RE.subn(r"\g<1>assets/js/index.dark.js?v=" + MARKER + r"\g<2>", html)
        changes += n
    return html, changes


def transform_index_js(js):
    js = js.replace("'#FFFFFF'", "'" + BG + "'").replace("'#ffffff'", "'" + BG + "'")
    js = js.replace("'#000000'", "'" + WHITE + "'").replace("'#000'", "'" + WHITE + "'")
    js = js.replace("rgba(255, 23, 68,", "rgba(255, 31, 58,")
    return js


def page_files():
    files = glob.glob(os.path.join(ROOT, "*.html"))
    files += glob.glob(os.path.join(ROOT, "blog", "*.html"))
    files += glob.glob(os.path.join(ROOT, "case-studies", "*.html"))
    return sorted(files)


def main(argv):
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--apply", action="store_true", help="write files (default: dry run)")
    args = ap.parse_args(argv)

    css_sources = [p for p in sorted(glob.glob(os.path.join(ROOT, "assets", "css", "*.css")))
                   if not p.endswith(".min.css") and not p.endswith(".dark.css")
                   and os.path.basename(p) != "theme-dark.css"]
    written = []
    for src in css_sources:
        out_path = src[:-4] + ".dark.css"
        out = minify_css(transform_css(open(src, encoding="utf-8").read()))
        # verticals.css paints a U+2014 before pull-quote citations, which hard
        # rule 1 forbids. The preview copy uses a plain hyphen instead.
        out = out.replace(chr(0x2014), "-")
        if chr(0x2014) in out:
            print(f"error: em dash in generated {out_path}", file=sys.stderr)
            return 2
        if args.apply:
            open(out_path, "w", encoding="utf-8").write(out)
        written.append((os.path.relpath(out_path, ROOT), len(out)))

    js_src = os.path.join(ROOT, "assets", "js", "index.js")
    js_out = os.path.join(ROOT, "assets", "js", "index.dark.js")
    if os.path.exists(js_src):
        js = minify_js(transform_index_js(open(js_src, encoding="utf-8").read()))
        if args.apply:
            open(js_out, "w", encoding="utf-8").write(js)
        written.append((os.path.relpath(js_out, ROOT), len(js)))

    pages_changed, total_changes, skipped = 0, 0, 0
    for path in page_files():
        html = open(path, encoding="utf-8").read()
        new, n = transform_html(html, os.path.basename(path) == "index.html" and os.path.dirname(path) == ROOT)
        if n == 0:
            skipped += 1
            continue
        pages_changed += 1
        total_changes += n
        if args.apply:
            open(path, "w", encoding="utf-8").write(new)

    verb = "wrote" if args.apply else "would write"
    for rel, size in written:
        print(f"{verb} {rel} ({size} bytes)")
    print(f"{verb} {pages_changed} pages ({total_changes} edits); {skipped} pages skipped (already done or no stylesheet links)")
    if not args.apply:
        print("dry run; pass --apply to write")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
