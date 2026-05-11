#!/usr/bin/env python3
"""Generate sitemap.xml from canonical HTML pages.

The script scans the site root and blog directory for HTML files, skips pages
that opt out with a noindex robots meta tag, and writes canonical URLs to
sitemap.xml. Existing sitemap metadata is treated as intentional: changefreq,
priority, and lastmod values are carried forward only for URLs already present
in sitemap.xml. New pages receive a lastmod date, but no changefreq or priority
unless those values are deliberately added to the generated sitemap later.
"""

from __future__ import annotations

import re
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable
from xml.sax.saxutils import escape
from xml.etree import ElementTree as ET

BASE_URL = "https://ghosxt.com"
ROOT = Path(__file__).resolve().parents[1]
SITEMAP_PATH = ROOT / "sitemap.xml"
SCAN_PATTERNS = ("*.html", "blog/*.html")
SITEMAP_NS = "http://www.sitemaps.org/schemas/sitemap/0.9"
CANONICAL_RE = re.compile(
    r'<link\b(?=[^>]*\brel=["\']canonical["\'])(?=[^>]*\bhref=["\']([^"\']+)["\'])[^>]*>',
    re.IGNORECASE,
)
ROBOTS_RE = re.compile(
    r'<meta\b(?=[^>]*\bname=["\']robots["\'])(?=[^>]*\bcontent=["\']([^"\']+)["\'])[^>]*>',
    re.IGNORECASE,
)


def scanned_html_files() -> list[Path]:
    files: list[Path] = []
    for pattern in SCAN_PATTERNS:
        files.extend(ROOT.glob(pattern))
    return sorted(files, key=lambda path: path.as_posix())


def has_noindex(html: str) -> bool:
    match = ROBOTS_RE.search(html)
    if not match:
        return False
    directives = {part.strip().lower() for part in match.group(1).split(",")}
    return "noindex" in directives


def derived_url(path: Path) -> str:
    relative = path.relative_to(ROOT).as_posix()
    if relative == "index.html":
        return f"{BASE_URL}/"
    if relative == "blog/index.html":
        return f"{BASE_URL}/blog/"
    return f"{BASE_URL}/{relative}"


def canonical_url(path: Path, html: str) -> str:
    match = CANONICAL_RE.search(html)
    if match:
        url = match.group(1).strip()
        if url == f"{BASE_URL}/blog/index.html":
            return f"{BASE_URL}/blog/"
        if url == f"{BASE_URL}/index.html":
            return f"{BASE_URL}/"
        return url
    return derived_url(path)


def current_sitemap_entries() -> dict[str, dict[str, str]]:
    if not SITEMAP_PATH.exists():
        return {}

    ET.register_namespace("", SITEMAP_NS)
    tree = ET.parse(SITEMAP_PATH)
    namespace = {"sm": SITEMAP_NS}
    entries: dict[str, dict[str, str]] = {}
    for url_element in tree.findall("sm:url", namespace):
        loc = url_element.findtext("sm:loc", default="", namespaces=namespace).strip()
        if not loc:
            continue
        metadata: dict[str, str] = {}
        for tag in ("lastmod", "changefreq", "priority"):
            value = url_element.findtext(f"sm:{tag}", default="", namespaces=namespace).strip()
            if value:
                metadata[tag] = value
        entries[loc] = metadata
    return entries


def git_last_modified(path: Path) -> str:
    relative = path.relative_to(ROOT).as_posix()
    result = subprocess.run(
        ["git", "log", "-1", "--format=%cs", "--", relative],
        cwd=ROOT,
        check=False,
        text=True,
        capture_output=True,
    )
    date = result.stdout.strip()
    if date:
        return date
    timestamp = datetime.fromtimestamp(path.stat().st_mtime, tz=timezone.utc)
    return timestamp.date().isoformat()


def sitemap_pages() -> dict[str, Path]:
    pages: dict[str, Path] = {}
    for path in scanned_html_files():
        html = path.read_text(encoding="utf-8")
        if has_noindex(html):
            continue
        url = canonical_url(path, html)
        if not url.startswith(f"{BASE_URL}/"):
            raise ValueError(f"Canonical URL for {path.relative_to(ROOT)} is outside {BASE_URL}: {url}")
        pages[url] = path
    return pages


def ordered_urls(urls: Iterable[str], current_order: Iterable[str]) -> list[str]:
    remaining = set(urls)
    ordered: list[str] = []
    for url in current_order:
        if url in remaining:
            ordered.append(url)
            remaining.remove(url)
    ordered.extend(sorted(remaining))
    return ordered


def build_sitemap() -> str:
    existing_entries = current_sitemap_entries()
    pages = sitemap_pages()
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        f'<urlset xmlns="{SITEMAP_NS}">',
    ]

    for url in ordered_urls(pages.keys(), existing_entries.keys()):
        metadata = dict(existing_entries.get(url, {}))
        metadata.setdefault("lastmod", git_last_modified(pages[url]))

        lines.extend(
            [
                "  <url>",
                f"    <loc>{escape(url)}</loc>",
                f"    <lastmod>{escape(metadata['lastmod'])}</lastmod>",
            ]
        )
        for tag in ("changefreq", "priority"):
            if tag in metadata:
                lines.append(f"    <{tag}>{escape(metadata[tag])}</{tag}>")
        lines.append("  </url>")

    lines.append("</urlset>")
    return "\n".join(lines) + "\n"


def main() -> None:
    SITEMAP_PATH.write_text(build_sitemap(), encoding="utf-8")


if __name__ == "__main__":
    main()
