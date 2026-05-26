#!/usr/bin/env python3
"""Regenerate blog/all.html (file-explorer view) from scanning blog/*.html.

Scans every .html file in /blog/ (except index.html and all.html),
extracts each post's title, date, and category, and rewrites the dynamic
sections of blog/all.html in place.

The static parts of blog/all.html (nav, footer, CSS, schema) are NOT
touched. The script replaces only the content between these markers:

  <!-- BEGIN:COUNT -->...<!-- END:COUNT -->
  <!-- BEGIN:FOLDERS -->...<!-- END:FOLDERS -->
  <!-- BEGIN:ROWS -->...<!-- END:ROWS -->

Run after adding, removing, or re-dating a blog post.
"""

import re
import sys
from datetime import datetime
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
BLOG_DIR = REPO / "blog"
OUTPUT = BLOG_DIR / "all.html"
SKIP = {"index.html", "all.html"}

CATEGORY_ALIASES = {
    "Backup and Disaster Recovery": "Backup & DR",
    "Industry IT": "Industry IT",
}


def extract(path):
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

    # Date: prefer article:published_time meta, fall back to JSON-LD datePublished
    m = re.search(
        r'<meta\s+property="article:published_time"\s+content="(\d{4}-\d{2}-\d{2})"',
        text,
    )
    if not m:
        m = re.search(r'"datePublished":\s*"(\d{4}-\d{2}-\d{2})"', text)
    date_iso = m.group(1) if m else None

    # Category: prefer JSON-LD articleSection, fall back to <span class="blog-card-tag">
    m = re.search(r'"articleSection":\s*"([^"]+)"', text)
    if m:
        category = m.group(1).strip()
    else:
        m = re.search(r'<span class="blog-card-tag">([^<]+)</span>', text)
        category = m.group(1).strip() if m else "Other"
    category = CATEGORY_ALIASES.get(category, category)

    return {
        "href": path.name,
        "title": title,
        "date_iso": date_iso,
        "category": category,
    }


def format_date(iso):
    dt = datetime.strptime(iso, "%Y-%m-%d")
    # Use %#d on Windows, %-d elsewhere
    try:
        return dt.strftime("%B %-d, %Y")
    except ValueError:
        return dt.strftime("%B %#d, %Y")


def anchor_for(category):
    return "cat-" + re.sub(r"[^a-z0-9]+", "-", category.lower()).strip("-")


def build_folders(counts, cat_order):
    lines = []
    for cat in cat_order:
        anchor = anchor_for(cat)
        lines.append(
            f'            <a href="#{anchor}" class="explorer-folder">'
            f'<i class="fi fi-rs-folder folder-icon" aria-hidden="true"></i> '
            f'{cat} <span class="folder-count">{counts[cat]}</span></a>'
        )
    return "\n".join(lines)


def build_rows(posts):
    seen = set()
    lines = []
    for p in posts:
        date_str = format_date(p["date_iso"])
        if p["category"] not in seen:
            anchor_attr = f' id="{anchor_for(p["category"])}"'
            seen.add(p["category"])
        else:
            anchor_attr = ""
        lines.append(
            f"                <tr{anchor_attr}>\n"
            f'                  <td class="col-name"><a href="{p["href"]}">'
            f'<i class="fi fi-rs-document file-icon" aria-hidden="true"></i>'
            f'<span>{p["title"]}</span></a></td>\n'
            f'                  <td class="col-kind">{p["category"]}</td>\n'
            f'                  <td class="col-date">'
            f'<time datetime="{p["date_iso"]}">{date_str}</time></td>\n'
            f"                </tr>"
        )
    return "\n".join(lines)


def replace_between(text, begin_marker, end_marker, new_content):
    pattern = re.compile(
        re.escape(begin_marker) + r".*?" + re.escape(end_marker),
        re.DOTALL,
    )
    if not pattern.search(text):
        raise RuntimeError(
            f"Markers not found: {begin_marker} / {end_marker}. "
            "Add them to blog/all.html first."
        )
    return pattern.sub(begin_marker + "\n" + new_content + "\n" + end_marker, text, count=1)


def main():
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

    counts = {}
    for p in posts:
        counts[p["category"]] = counts.get(p["category"], 0) + 1
    cat_order = sorted(counts.keys(), key=lambda c: (-counts[c], c))

    folders_html = build_folders(counts, cat_order)
    rows_html = build_rows(posts)

    existing = OUTPUT.read_text(encoding="utf-8")
    updated = existing
    updated = replace_between(
        updated, "<!-- BEGIN:COUNT -->", "<!-- END:COUNT -->", f"<strong>{len(posts)}</strong>"
    )
    updated = replace_between(
        updated, "<!-- BEGIN:FOLDERS -->", "<!-- END:FOLDERS -->", folders_html
    )
    updated = replace_between(
        updated, "<!-- BEGIN:ROWS -->", "<!-- END:ROWS -->", rows_html
    )

    OUTPUT.write_text(updated, encoding="utf-8")
    print(f"Wrote {OUTPUT.relative_to(REPO)}: {len(posts)} posts across {len(counts)} categories.")


if __name__ == "__main__":
    main()
