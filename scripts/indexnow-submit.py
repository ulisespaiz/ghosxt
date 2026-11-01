#!/usr/bin/env python3
"""Submit the site's URLs to IndexNow (Bing, Yandex, Naver, Seznam, Yep share one endpoint).

Why: AUDIT.md A-06. The Bing index feeds ChatGPT search and Microsoft Copilot, and
ghosxt.com was absent from the non-Google index the AI assistants read. The IndexNow
key file is already served at the site root (see audit/offsite-notes.md); this script
sends the URL list that the key authorises. Nothing else about the site changes.

Default is a dry run. It prints the key, the key location, the endpoint and the URL
count, and writes nothing to the network.

USAGE
-----
    python3 scripts/indexnow-submit.py                 # dry run: all sitemap URLs
    python3 scripts/indexnow-submit.py --apply         # submit all sitemap URLs
    python3 scripts/indexnow-submit.py --apply --urls /tmp/changed.txt
                                                       # submit only the URLs listed (one per line)
    python3 scripts/indexnow-submit.py --apply --endpoint https://www.bing.com/indexnow

Notes
-----
  * One request carries up to 10,000 URLs (the protocol limit); the script batches
    automatically. 270 URLs is one request.
  * Expected responses: 200 or 202 accepted; 400 malformed; 403 key not found at the key
    location; 422 a URL does not belong to the host or the key does not match; 429 too
    many requests. The script exits 0 only on 200 or 202.
  * The key is read from the 32-hex-character .txt file at the repository root, the
    IndexNow convention (file name equals file content equals the key).
  * Submitting unchanged URLs repeatedly is pointless and can get submissions ignored:
    use --urls with the pages that actually changed after the first full submission.
    A routine for new blog posts: submit the post URL, /blog/, /blog/all and /feed.xml.
  * Standard library only. Respects HTTPS_PROXY like any urllib client.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HOST = "ghosxt.com"
DEFAULT_ENDPOINT = "https://api.indexnow.org/indexnow"
BATCH = 10_000
KEY_FILE_RE = re.compile(r"^[0-9a-f]{32}\.txt$")
LOC_RE = re.compile(r"<loc>\s*([^<\s]+)\s*</loc>", re.I)


def find_key() -> tuple[str, str]:
    for path in sorted(ROOT.iterdir()):
        if path.is_file() and KEY_FILE_RE.match(path.name):
            key = path.read_text(encoding="utf-8").strip()
            if key != path.stem:
                sys.exit(f"key file {path.name} does not contain its own name; fix the file first")
            return key, f"https://{HOST}/{path.name}"
    sys.exit("no IndexNow key file (32 hex chars .txt) found at the repository root")


def sitemap_urls() -> list[str]:
    text = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    urls = [u for u in LOC_RE.findall(text) if u.startswith(f"https://{HOST}/")]
    seen: set[str] = set()
    out: list[str] = []
    for u in urls:
        if u not in seen:
            seen.add(u)
            out.append(u)
    return out


def urls_from_file(path: Path) -> list[str]:
    urls = []
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("/"):
            line = f"https://{HOST}{line}"
        if not line.startswith(f"https://{HOST}/") and line != f"https://{HOST}":
            sys.exit(f"refusing a URL outside https://{HOST}/: {line}")
        urls.append(line)
    return urls


def submit(endpoint: str, key: str, key_location: str, urls: list[str]) -> int:
    body = json.dumps(
        {"host": HOST, "key": key, "keyLocation": key_location, "urlList": urls}
    ).encode("utf-8")
    req = urllib.request.Request(
        endpoint,
        data=body,
        method="POST",
        headers={"Content-Type": "application/json; charset=utf-8", "User-Agent": "ghosxt-indexnow/1.0"},
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            status = resp.status
            payload = resp.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as err:
        status = err.code
        payload = err.read().decode("utf-8", "replace")
    print(f"HTTP {status} from {endpoint} for {len(urls)} URLs")
    if payload.strip():
        print(payload.strip()[:2000])
    return status


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--apply", action="store_true", help="actually POST to the endpoint (default: dry run)")
    parser.add_argument("--endpoint", default=DEFAULT_ENDPOINT, help=f"IndexNow endpoint (default {DEFAULT_ENDPOINT})")
    parser.add_argument("--urls", type=Path, help="file with URLs or paths to submit, one per line (default: every sitemap URL)")
    args = parser.parse_args()

    key, key_location = find_key()
    urls = urls_from_file(args.urls) if args.urls else sitemap_urls()
    if not urls:
        sys.exit("no URLs to submit")

    print(f"host:         {HOST}")
    print(f"key:          {key}")
    print(f"key location: {key_location}")
    print(f"endpoint:     {args.endpoint}")
    print(f"urls:         {len(urls)} (first: {urls[0]}; last: {urls[-1]})")

    if not args.apply:
        print("dry run: nothing sent. Re-run with --apply to submit.")
        return 0

    worst = 200
    for i in range(0, len(urls), BATCH):
        status = submit(args.endpoint, key, key_location, urls[i : i + BATCH])
        worst = max(worst, status)
    return 0 if worst in (200, 202) else 1


if __name__ == "__main__":
    sys.exit(main())
