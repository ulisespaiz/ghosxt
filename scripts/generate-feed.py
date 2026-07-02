#!/usr/bin/env python3
"""Generate feed.xml (RSS 2.0) from the blog posts in /blog/.

Scans every .html file in /blog/ (except index.html and all.html), skips
pages that opt out with a noindex robots meta tag, extracts each post's
title, canonical URL, description, publish date, category, and author, and
writes an RSS 2.0 feed to feed.xml at the repository root.

The feed exposes the 30 most recent posts. Re-run after adding, removing,
or re-dating a blog post (same workflow as generate-sitemap.py and
generate-blog-explorer.py).

Usage:
  python3 scripts/generate-feed.py
"""

from __future__ import annotations

import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from xml.sax.saxutils import escape

REPO = Path(__file__).resolve().parent.parent
BLOG_DIR = REPO / "blog"
OUTPUT = REPO / "feed.xml"
SKIP = {"index.html", "all.html"}

SITE = "https://ghosxt.com"
FEED_URL = f"{SITE}/feed.xml"
BLOG_URL = f"{SITE}/blog/"
FEED_TITLE = "Ghosxt Blog — Managed IT & Cybersecurity for the Central Coast"
FEED_DESC = (
    "Practical IT, cybersecurity, and compliance guidance for small "
    "businesses on California's Central Coast, from a DoD-cleared engineer."
)
DEFAULT_AUTHOR = "Ulises Paiz"
MAX_ITEMS = 30


def extract(path: Path):
    text = path.read_text(encoding="utf-8")

    # Skip pages with noindex robots
    if re.search(r'<meta\s+name="robots"[^>]*content="[^"]*noindex', text, re.IGNORECASE):
        return None

    # Title: prefer <title>, strip " | Ghosxt..." suffix; fall back to <h1>
    title = None
    m = re.search(r"<title>([^<]+)</title>", text)
    if m:
        title = re.sub(r"\s*\|\s*Ghosxt.*$", "", m.group(1)).strip()
    if not title:
        m = re.search(r"<h1[^>]*>([^<]+)</h1>", text)
        title = m.group(1).strip() if m else path.stem

    # Canonical URL: prefer <link rel="canonical">, fall back to constructed URL
    m = re.search(r'<link\s+rel="canonical"\s+href="([^"]+)"', text)
    link = m.group(1).strip() if m else f"{BLOG_URL}{path.name}"

    # Description: prefer meta description, then og:description
    m = re.search(r'<meta\s+name="description"\s+content="([^"]*)"', text)
    if not m:
        m = re.search(r'<meta\s+property="og:description"\s+content="([^"]*)"', text)
    description = m.group(1).strip() if m else ""

    # Date: prefer article:published_time meta, fall back to JSON-LD datePublished
    m = re.search(
        r'<meta\s+property="article:published_time"\s+content="(\d{4}-\d{2}-\d{2})"',
        text,
    )
    if not m:
        m = re.search(r'"datePublished":\s*"(\d{4}-\d{2}-\d{2})"', text)
    date_iso = m.group(1) if m else None

    # Category: prefer JSON-LD articleSection, fall back to blog-card-tag span
    m = re.search(r'"articleSection":\s*"([^"]+)"', text)
    if m:
        category = m.group(1).strip()
    else:
        m = re.search(r'<span class="blog-card-tag">([^<]+)</span>', text)
        category = m.group(1).strip() if m else None

    # Author: prefer article:author meta, then JSON-LD author name
    m = re.search(r'<meta\s+property="article:author"\s+content="([^"]+)"', text)
    if not m:
        m = re.search(r'"author":\s*\{\s*"@type":\s*"Person",\s*"name":\s*"([^"]+)"', text)
    author = m.group(1).strip() if m else DEFAULT_AUTHOR

    return {
        "title": title,
        "link": link,
        "description": description,
        "date_iso": date_iso,
        "category": category,
        "author": author,
    }


def rfc822(date_iso: str) -> str:
    dt = datetime.strptime(date_iso, "%Y-%m-%d").replace(tzinfo=timezone.utc)
    # e.g. "Wed, 28 May 2026 00:00:00 +0000"
    return dt.strftime("%a, %d %b %Y %H:%M:%S +0000")


def build_item(post: dict) -> str:
    parts = [
        "    <item>",
        f"      <title>{escape(post['title'])}</title>",
        f"      <link>{escape(post['link'])}</link>",
        f'      <guid isPermaLink="true">{escape(post["link"])}</guid>',
        f"      <pubDate>{rfc822(post['date_iso'])}</pubDate>",
        f"      <dc:creator>{escape(post['author'])}</dc:creator>",
    ]
    if post["category"]:
        parts.append(f"      <category>{escape(post['category'])}</category>")
    if post["description"]:
        parts.append(f"      <description>{escape(post['description'])}</description>")
    parts.append("    </item>")
    return "\n".join(parts)


def main() -> None:
    posts = []
    for path in sorted(BLOG_DIR.glob("*.html")):
        if path.name in SKIP:
            continue
        meta = extract(path)
        if meta is None or meta["date_iso"] is None:
            print(f"  skip (no date or noindex): {path.name}", file=sys.stderr)
            continue
        posts.append(meta)

    posts.sort(key=lambda p: (p["date_iso"], p["title"]), reverse=True)
    posts = posts[:MAX_ITEMS]

    build_date = datetime.now(timezone.utc).strftime("%a, %d %b %Y %H:%M:%S +0000")
    last_pub = rfc822(posts[0]["date_iso"]) if posts else build_date

    items = "\n".join(build_item(p) for p in posts)

    feed = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>{escape(FEED_TITLE)}</title>
    <link>{BLOG_URL}</link>
    <atom:link href="{FEED_URL}" rel="self" type="application/rss+xml" />
    <description>{escape(FEED_DESC)}</description>
    <language>en-us</language>
    <copyright>Ghosxt</copyright>
    <lastBuildDate>{build_date}</lastBuildDate>
    <pubDate>{last_pub}</pubDate>
    <ttl>1440</ttl>
{items}
  </channel>
</rss>
"""

    OUTPUT.write_text(feed, encoding="utf-8")
    print(f"Wrote {OUTPUT.relative_to(REPO)}: {len(posts)} items.")


if __name__ == "__main__":
    main()
