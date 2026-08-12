#!/usr/bin/env python3
"""Compute CSP sha256 hashes for every inline executable <script> block and
rewrite the script-src directive in _headers.

The site's Content-Security-Policy allows inline scripts only by hash (no
'unsafe-inline' in script-src), so ANY edit to an inline <script> block on
any page changes its hash and MUST be followed by a re-run of this script,
then a redeploy:

    python3 scripts/compute-csp-hashes.py            # rewrite _headers
    python3 scripts/compute-csp-hashes.py --check    # report drift, write nothing

--check exits non-zero if _headers is stale, so it can gate a deploy.

Notes:
- <script type="application/ld+json"> blocks are data, not executable script;
  CSP does not apply to them, so they are not hashed.
- Inline event handler attributes (onclick=..., onload=...) can NOT be
  allowed by hash without 'unsafe-hashes'. They were all removed from the
  site (see assets/js/media-swap.js and the chat delegation in index.js);
  this script fails loudly if any creep back in.
- The hash covers the exact bytes between <script> and </script>. Editors
  that reformat whitespace inside inline scripts will invalidate hashes.
"""

import base64
import hashlib
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HEADERS = os.path.join(ROOT, "_headers")

SCRIPT_RE = re.compile(r"<script(?![^>]*\bsrc=)([^>]*)>(.*?)</script>", re.S)
HANDLER_RE = re.compile(r"<[a-zA-Z][^>]*\son\w+\s*=", re.S)

# Hosts allowed to serve external scripts; keep in sync with what the site
# actually loads (Turnstile, Cloudflare Insights, Calendly).
SCRIPT_HOSTS = [
    "'self'",
    "https://challenges.cloudflare.com",
    "https://static.cloudflareinsights.com",
    "https://assets.calendly.com",
]


def html_files():
    for name in sorted(os.listdir(ROOT)):
        if name.endswith(".html"):
            yield os.path.join(ROOT, name)
    blog = os.path.join(ROOT, "blog")
    for name in sorted(os.listdir(blog)):
        if name.endswith(".html"):
            yield os.path.join(blog, name)


def collect():
    hashes = {}  # hash -> first file seen (for reporting)
    handler_pages = []
    for path in html_files():
        with open(path, encoding="utf-8") as f:
            text = f.read()
        if HANDLER_RE.search(text):
            handler_pages.append(os.path.relpath(path, ROOT))
        for m in SCRIPT_RE.finditer(text):
            attrs, body = m.group(1), m.group(2)
            if "ld+json" in attrs:
                continue
            digest = hashlib.sha256(body.encode("utf-8")).digest()
            h = "'sha256-" + base64.b64encode(digest).decode("ascii") + "'"
            hashes.setdefault(h, os.path.relpath(path, ROOT))
    return hashes, handler_pages


def build_directive(hashes):
    return "script-src " + " ".join(SCRIPT_HOSTS + sorted(hashes))


def main():
    check = "--check" in sys.argv
    hashes, handler_pages = collect()
    if handler_pages:
        print("ERROR: inline event handler attributes found (CSP blocks these "
              "without 'unsafe-hashes'); refactor them to addEventListener:")
        for p in handler_pages:
            print("  ", p)
        sys.exit(2)

    with open(HEADERS, encoding="utf-8") as f:
        headers = f.read()
    new_directive = build_directive(hashes)
    new_headers, n = re.subn(r"script-src [^;]*", new_directive, headers)
    if n != 1:
        print(f"ERROR: expected exactly one script-src directive in _headers, found {n}")
        sys.exit(2)

    if check:
        if new_headers != headers:
            print("STALE: _headers script-src does not match current inline scripts.")
            print("Run: python3 scripts/compute-csp-hashes.py")
            sys.exit(1)
        print(f"OK: script-src current ({len(hashes)} inline-script hash(es)).")
        return

    with open(HEADERS, "w", encoding="utf-8") as f:
        f.write(new_headers)
    print(f"Wrote {len(hashes)} hash(es) into _headers script-src:")
    for h, origin in sorted(hashes.items()):
        print(f"  {h}  ({origin})")


if __name__ == "__main__":
    main()
