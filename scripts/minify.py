#!/usr/bin/env python3
"""Minify the site's CSS and JS, and (optionally) point every page at the
minified copies.

The source files under assets/css/ and assets/js/ stay the editable source of
truth. This produces a `*.min.css` / `*.min.js` next to each, using the
safe, conservative rcssmin / rjsmin minifiers (whitespace/comment removal only
— no risky JS transforms). Run it before deploying whenever CSS/JS changes,
the same way the other scripts/ generators are run.

    pip install rcssmin rjsmin        # one-time
    python3 scripts/minify.py         # build assets/**/*.min.{css,js}
    python3 scripts/minify.py --refs  # also rewrite <link>/<script> refs in *.html + blog/*.html
    python3 scripts/minify.py --check # report what --refs would change, write nothing

Cloudflare already serves these brotli-compressed, so the win is the ~30-40%
smaller *uncompressed* payload (parse time + a smaller compressed transfer).
"""

import os
import re
import sys
import glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def minify_assets():
    import rcssmin
    import rjsmin
    total_src = total_min = 0
    for path in glob.glob(os.path.join(ROOT, "assets/css/*.css")):
        if path.endswith(".min.css"):
            continue
        src = open(path, encoding="utf-8").read()
        out = rcssmin.cssmin(src)
        open(path[:-4] + ".min.css", "w", encoding="utf-8").write(out)
        total_src += len(src); total_min += len(out)
    for path in glob.glob(os.path.join(ROOT, "assets/js/*.js")):
        if path.endswith(".min.js"):
            continue
        src = open(path, encoding="utf-8").read()
        out = rjsmin.jsmin(src)
        open(path[:-3] + ".min.js", "w", encoding="utf-8").write(out)
        total_src += len(src); total_min += len(out)
    if total_src:
        print(f"minified assets: {total_src} -> {total_min} bytes "
              f"({100 - round(total_min / total_src * 100)}% smaller uncompressed)")


# Rewrite `assets/css/foo.css` -> `assets/css/foo.min.css` (same for .js), but
# only for the site's own assets, preserving any `?v=` cache-busting suffix and
# never touching already-minified refs or third-party URLs.
REF_RE = re.compile(r'((?:href|src)="(?:\.\./)?assets/(?:css|js)/[a-zA-Z0-9_-]+)\.(css|js)((?:\?[^"]*)?")')


def rewrite_refs(check_only=False):
    changed = 0
    for path in glob.glob(os.path.join(ROOT, "*.html")) + glob.glob(os.path.join(ROOT, "blog/*.html")):
        s = open(path, encoding="utf-8").read()
        new = REF_RE.sub(lambda m: f"{m.group(1)}.min.{m.group(2)}{m.group(3)}", s)
        if new != s:
            changed += 1
            if not check_only:
                open(path, "w", encoding="utf-8").write(new)
    verb = "would rewrite" if check_only else "rewrote refs in"
    print(f"{verb} {changed} HTML files")


if __name__ == "__main__":
    minify_assets()
    if "--refs" in sys.argv:
        rewrite_refs(check_only=False)
    elif "--check" in sys.argv:
        rewrite_refs(check_only=True)
