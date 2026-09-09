#!/usr/bin/env python3
"""Compute CSP script-src hashes for every first-party inline script and
rewrite the script-src directive in _headers.

The site's Content-Security-Policy allows inline scripts by hash instead of
'unsafe-inline'. This script is the single source of truth for that
allowlist: it scans every *.html and blog/*.html file, extracts the exact
text content of each inline <script> tag that is not a src= reference and
not a JSON-LD block (type="application/ld+json" is data, not executed code,
so it needs no hash), computes the base64 sha256 digest CSP expects
(sha256-<base64>), dedupes the results, and rewrites the script-src
directive in _headers with 'self', the sorted hash list, the one
'unsafe-hashes' entry for the shared onload="this.media='all'" async
stylesheet handler (see below), and the third-party script hosts the site
already allows.

Why 'unsafe-hashes' for one entry instead of a hash-only policy: about 450
<link rel="preload" as="style" onload="this.media='all'"> tags across the
site use the classic loadCSS async-stylesheet pattern. CSP hashing of
inline event-handler attributes (onload=, onclick=, etc) requires the
'unsafe-hashes' source expression before the browser will honor a hash for
an attribute instead of a <script> body (script-hash CSP predates
event-handler hashing; browsers gate the newer behavior behind this flag).
The alternative was replacing every onload attribute with an external
bootstrap script; the chosen fix is one flag plus one hash, confirmed
byte-identical everywhere it appears, so it is strictly tighter than the
'unsafe-inline' it replaces and involves zero markup churn. Run this
script's --check in CI so any new distinct onload value (or any other new
inline handler) fails the build instead of silently falling back to
'unsafe-inline'.

Usage:

    python3 scripts/compute-csp-hashes.py            # rewrite _headers
    python3 scripts/compute-csp-hashes.py --check    # exit 1 on drift, no write
"""

from __future__ import annotations

import base64
import hashlib
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HEADERS_PATH = ROOT / "_headers"
SCAN_PATTERNS = ("*.html", "blog/*.html")

SCRIPT_TAG_RE = re.compile(
    r"<script\b(?P<attrs>[^>]*)>(?P<body>.*?)</script>",
    re.IGNORECASE | re.DOTALL,
)
SRC_ATTR_RE = re.compile(r"\bsrc\s*=", re.IGNORECASE)
TYPE_ATTR_RE = re.compile(r"""type\s*=\s*["']([^"']+)["']""", re.IGNORECASE)

# The one inline event-handler attribute value that appears verbatim across
# the site (async stylesheet loading). If this ever changes, or a second
# distinct onload/onclick/etc value shows up, --check will fail so the new
# value gets its own hash added deliberately rather than silently trusting
# 'unsafe-inline'.
UNSAFE_HASHES_VALUES = ["this.media='all'"]

THIRD_PARTY_SCRIPT_SRC = (
    "https://challenges.cloudflare.com",
    "https://static.cloudflareinsights.com",
    "https://assets.calendly.com",
)

HEADERS_CSP_PREFIX = "  Content-Security-Policy: "
SCRIPT_SRC_RE = re.compile(r"script-src [^;]*")


def find_html_files() -> list[Path]:
    files: list[Path] = []
    for pattern in SCAN_PATTERNS:
        files.extend(sorted(ROOT.glob(pattern)))
    return files


def sha256_b64(text: str) -> str:
    digest = hashlib.sha256(text.encode("utf-8")).digest()
    return base64.b64encode(digest).decode("ascii")


def extract_inline_scripts() -> dict[str, list[str]]:
    """Return {hash: [locations]} for every distinct inline <script> body."""
    hashes: dict[str, list[str]] = {}
    for path in find_html_files():
        src = path.read_text(encoding="utf-8")
        rel = path.relative_to(ROOT).as_posix()
        for match in SCRIPT_TAG_RE.finditer(src):
            attrs = match.group("attrs")
            body = match.group("body")
            if SRC_ATTR_RE.search(attrs):
                continue  # external script, no inline content to hash
            type_match = TYPE_ATTR_RE.search(attrs)
            script_type = type_match.group(1).lower() if type_match else "text/javascript"
            if script_type == "application/ld+json":
                continue  # data, not executed script
            if body.strip() == "":
                continue
            digest = sha256_b64(body)
            line = src.count("\n", 0, match.start()) + 1
            hashes.setdefault(digest, []).append(f"{rel}:{line}")
    return hashes


def build_script_src(hashes: dict[str, list[str]]) -> str:
    parts = ["'self'"]
    for digest in sorted(hashes):
        parts.append(f"'sha256-{digest}'")
    for value in UNSAFE_HASHES_VALUES:
        parts.append(f"'sha256-{sha256_b64(value)}'")
    if UNSAFE_HASHES_VALUES:
        parts.insert(len(parts) - len(UNSAFE_HASHES_VALUES), "'unsafe-hashes'")
    parts.extend(THIRD_PARTY_SCRIPT_SRC)
    return "script-src " + " ".join(parts)


def main() -> int:
    check_only = "--check" in sys.argv[1:]

    hashes = extract_inline_scripts()
    new_script_src = build_script_src(hashes)

    headers_text = HEADERS_PATH.read_text(encoding="utf-8")
    lines = headers_text.splitlines(keepends=True)

    csp_line_index = None
    for i, line in enumerate(lines):
        if line.startswith(HEADERS_CSP_PREFIX):
            csp_line_index = i
            break

    if csp_line_index is None:
        print("compute-csp-hashes: no Content-Security-Policy line found in _headers", file=sys.stderr)
        return 1

    old_line = lines[csp_line_index]
    ending = "\r\n" if old_line.endswith("\r\n") else ("\n" if old_line.endswith("\n") else "")
    old_body = old_line[: len(old_line) - len(ending)] if ending else old_line

    if not SCRIPT_SRC_RE.search(old_body):
        print("compute-csp-hashes: no script-src directive found in the CSP line", file=sys.stderr)
        return 1

    new_body = SCRIPT_SRC_RE.sub(lambda m: new_script_src, old_body, count=1)

    if check_only:
        if new_body != old_body:
            print("compute-csp-hashes --check: _headers script-src is out of date.")
            print(f"  current:  {old_body.split('script-src', 1)[1].split(';', 1)[0].strip()}")
            print(f"  expected: {new_script_src[len('script-src'):].strip()}")
            print("Run `python3 scripts/compute-csp-hashes.py` to regenerate.")
            return 1
        print(f"compute-csp-hashes --check: OK ({len(hashes)} inline script hashes, script-src up to date).")
        return 0

    if new_body == old_body:
        print(f"compute-csp-hashes: no change needed ({len(hashes)} inline script hashes).")
        return 0

    lines[csp_line_index] = new_body + ending
    HEADERS_PATH.write_text("".join(lines), encoding="utf-8")
    print(f"compute-csp-hashes: wrote {len(hashes)} inline script hashes to _headers script-src.")
    for digest, locations in sorted(hashes.items()):
        print(f"  sha256-{digest}  ({len(locations)} occurrence(s), first: {locations[0]})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
