#!/usr/bin/env python3
"""Generate llms-full.txt: a full-content companion to llms.txt.

llms.txt is a short index of the site (title, key facts, and a linked
list of pages). llms-full.txt is the long-form companion: it walks
llms.txt in order, and for every root page it links to (skipping
individual blog posts, but keeping the blog index link) it pulls that
page's on-page text straight out of its <main> element: the <title>,
the meta description, and the H1/H2/H3 headings, paragraph, and list
text, in document order. Nav, footer, script, style, and JSON-LD blocks
are stripped before extraction, and each page becomes one section headed
by its canonical URL.

FAQ accordions are captured too, in either of the site's two patterns
(<details><summary>Question</summary><div>Answer</div></details>, or a
<button>-plus-<span> question with a following sibling answer div, used
on contact.html, website-development.html, and ghosxt-cares.html): the
question becomes a "Q:" line and the answer a matching "A:" line, in
place under the FAQ heading. pricing.html's "Outside Your Agreement"
rate-card prices are captured the same way, as "Rate:" lines under each
card's heading.

The /blog/ index page is special-cased: instead of every post card's
title and teaser blurb, it is trimmed to each post title as a markdown
link (no teaser text), since the individual posts are already excluded
in favor of just the index.

The same key-facts intro block that sits at the top of llms.txt is
carried over verbatim, so a crawler that only fetches llms-full.txt
still gets the who/what/where before the page-by-page content.

USAGE
-----
    python3 scripts/generate-llms-full.py --dry-run
    python3 scripts/generate-llms-full.py --apply

Notes
-----
  * Default behavior (no --apply) is ALWAYS a dry run: it reports what
    would be written without touching llms-full.txt.
  * Page order and page selection both come from llms.txt itself: this
    script does not scan the repo for HTML files independently. Re-run
    after llms.txt's page list changes.
  * A link is skipped if it resolves to a non-HTML resource (sitemap.xml,
    feed.xml) or to a blog post other than the blog index (/blog/).
  * Idempotent: re-running with unchanged source pages and an unchanged
    llms.txt reproduces the same output.
  * Dependency on update-review-count.py: the "NN Google reviews" trust
    line is materialized once per page across the site (53 times as of
    this writing) and is pulled in verbatim by this script. Whenever
    update-review-count.py changes the review count or rating, re-run
    this script with --apply afterward so llms-full.txt reflects the
    same numbers as the live pages. This script does not read
    site-config.json itself; it only reflects whatever text is already
    on each page.
"""

from __future__ import annotations

import argparse
import re
import sys
from html import unescape
from html.parser import HTMLParser
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
LLMS_TXT = REPO / "llms.txt"
OUTPUT = REPO / "llms-full.txt"
BASE_URL = "https://ghosxt.com"

CONTENT_TAGS = {"h1", "h2", "h3", "p", "li", "summary"}
STRIP_BLOCK_TAGS = ("script", "style", "nav", "footer")

LINK_RE = re.compile(r"\[[^\]]*\]\((https://ghosxt\.com/[^)\s]*)\)")
TITLE_RE = re.compile(r"<title>([^<]*)</title>", re.IGNORECASE)
DESC_RE = re.compile(r'<meta\s+name=["\']description["\']\s+content=(["\'])(.*?)\1', re.IGNORECASE)
CANONICAL_RE = re.compile(r'<link\s+rel=["\']canonical["\']\s+href=(["\'])(.*?)\1', re.IGNORECASE)
MAIN_RE = re.compile(r"<main\b[^>]*>(.*?)</main>", re.IGNORECASE | re.DOTALL)
COMMENT_RE = re.compile(r"<!--.*?-->", re.DOTALL)
NON_PAGE_SUFFIXES = (".xml", ".pdf", ".json", ".txt")

WARN_BYTES = 400_000  # ~400KB target ceiling


def normalize_ws(text: str) -> str:
    text = text.replace("\xa0", " ")
    return re.sub(r"\s+", " ", text).strip()


class MainContentExtractor(HTMLParser):
    """Pulls H1/H2/H3, paragraph, and list text out of a <main> fragment,
    in document order, skipping anything not inside one of those tags.

    Also pulls FAQ accordions in either of the site's two patterns:

      1. <details><summary>Question</summary><div ...>Answer</div></details>
         The <summary> becomes a "summary" line (the question) and the
         div that immediately follows it inside the same <details>
         becomes an "answer" line, whatever that div's class attribute
         is. Matching is structural (first <div> after the <summary>
         closes, within the same <details>), not class-name-based, since
         the answer div's class varies across pages (answer, faq-answer,
         cares-faq-answer, ...).

      2. <button class="...faq-question..."><span>Question</span>...
         </button><div class="...answer...">Answer</div>
         Used on contact.html, website-development.html, and
         ghosxt-cares.html, which have no <details> element at all. The
         first <span> inside a button whose class contains
         "faq-question" becomes the question; the next sibling <div>
         whose class contains "answer" becomes the answer.

    Both patterns feed the same "answer" capture: a single depth counter
    tracks nesting so a plain <p> (or other content tag) nested inside
    the answer div folds into the answer text instead of becoming its
    own separate line.

    Also pulls pricing.html's rate-card prices: a
    <div class="rate-card-price">$150<span>/hr</span></div> becomes a
    "price" line (the nested <span> suffix, e.g. "/hr" or the "-$2k" in
    the assessment card's range, is folded in automatically since the
    span itself never starts its own frame here).
    """

    FAQ_BUTTON_MARKER = "faq-question"
    ANSWER_CLASS_MARKER = "answer"
    RATE_CARD_PRICE_CLASS = "rate-card-price"

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.stack: list[dict] = []
        self.lines: list[tuple[str, str]] = []
        self.details_stack: list[dict] = []
        self.answer_depth = 0
        self.in_faq_button = False
        self.faq_span_captured = False
        self.expect_answer_div = False
        self.price_depth = 0

    def handle_starttag(self, tag: str, attrs) -> None:
        classes = dict(attrs).get("class") or ""

        if tag == "details":
            self.details_stack.append({"seen_summary": False, "answer_captured": False})
            return

        if tag == "button":
            if self.FAQ_BUTTON_MARKER in classes:
                self.in_faq_button = True
                self.faq_span_captured = False
            return

        if tag == "span":
            if self.in_faq_button and not self.faq_span_captured:
                self.faq_span_captured = True
                self.stack.append({"tag": "question", "buf": []})
            return

        if tag == "div":
            if self.answer_depth > 0:
                self.answer_depth += 1
                return
            if self.details_stack and self.details_stack[-1]["seen_summary"] and not self.details_stack[-1]["answer_captured"]:
                self.details_stack[-1]["answer_captured"] = True
                self.answer_depth = 1
                self.stack.append({"tag": "answer", "buf": []})
                return
            if self.expect_answer_div:
                self.expect_answer_div = False
                if self.ANSWER_CLASS_MARKER in classes:
                    self.answer_depth = 1
                    self.stack.append({"tag": "answer", "buf": []})
                return
            if self.price_depth > 0:
                self.price_depth += 1
                return
            if self.RATE_CARD_PRICE_CLASS in classes.split():
                self.price_depth = 1
                self.stack.append({"tag": "price", "buf": []})
            return

        if tag in CONTENT_TAGS:
            if self.answer_depth > 0:
                # Nested content tag inside an active answer capture: fold
                # its text into the answer instead of starting its own line.
                if self.stack and tag in ("p", "li"):
                    self.stack[-1]["buf"].append(" ")
                return
            self.stack.append({"tag": tag, "buf": []})
            return

        if tag == "br" and self.stack:
            self.stack[-1]["buf"].append(" ")

    def _emit_top(self) -> None:
        frame = self.stack.pop()
        text = normalize_ws("".join(frame["buf"]))
        if text:
            self.lines.append((frame["tag"], text))

    def _close_frame(self, tag: str) -> None:
        # Close the matching frame, and any unclosed frames opened after it
        # (malformed/nested markup); each closed frame emits its own line.
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i]["tag"] == tag:
                while len(self.stack) > i:
                    self._emit_top()
                return

    def handle_endtag(self, tag: str) -> None:
        if tag == "details":
            if self.details_stack:
                self.details_stack.pop()
            return
        if tag == "button":
            self.in_faq_button = False
            return
        if tag == "span":
            if self.stack and self.stack[-1]["tag"] == "question":
                self._emit_top()
                self.expect_answer_div = True
            return
        if tag == "div":
            if self.answer_depth > 0:
                self.answer_depth -= 1
                if self.answer_depth == 0:
                    self._emit_top()
                return
            if self.price_depth > 0:
                self.price_depth -= 1
                if self.price_depth == 0:
                    self._emit_top()
            return
        if tag == "summary":
            self._close_frame("summary")
            if self.details_stack:
                self.details_stack[-1]["seen_summary"] = True
            return
        if tag in CONTENT_TAGS:
            if self.answer_depth > 0:
                return  # suppressed nested tag; no frame was pushed for it
            self._close_frame(tag)

    def handle_data(self, data: str) -> None:
        if self.stack:
            self.stack[-1]["buf"].append(data)

    def close(self) -> None:
        super().close()
        # Flush any frames left open at end of fragment.
        while self.stack:
            self._emit_top()


def strip_blocks(html: str) -> str:
    html = COMMENT_RE.sub("", html)
    for tag in STRIP_BLOCK_TAGS:
        html = re.sub(rf"<{tag}\b[^>]*>.*?</{tag}>", "", html, flags=re.IGNORECASE | re.DOTALL)
    return html


def ordered_page_links(llms_text: str) -> list[str]:
    """Root-page URLs referenced in llms.txt, in first-seen order.
    Blog posts are skipped except the blog index (https://ghosxt.com/blog/)."""
    seen: dict[str, None] = {}
    for match in LINK_RE.finditer(llms_text):
        url = match.group(1)
        path = url[len(BASE_URL):]
        if path.startswith("/blog/") and path != "/blog/":
            continue
        seen.setdefault(url, None)
    return list(seen.keys())


def resolve_local_path(url: str) -> Path | None:
    path = url[len(BASE_URL):].lstrip("/")
    if path == "" or path.endswith("/"):
        candidate = REPO / path / "index.html" if path else REPO / "index.html"
    elif path.endswith(NON_PAGE_SUFFIXES):
        return None
    else:
        candidate = REPO / f"{path}.html"
    return candidate if candidate.is_file() else None


def build_page_section(url: str, path: Path) -> str | None:
    html_text = path.read_text(encoding="utf-8")

    title_m = TITLE_RE.search(html_text)
    title = unescape(title_m.group(1)).strip() if title_m else ""

    desc_m = DESC_RE.search(html_text)
    description = unescape(desc_m.group(2)).strip() if desc_m else ""

    canon_m = CANONICAL_RE.search(html_text)
    canonical = unescape(canon_m.group(2)).strip() if canon_m else url

    main_m = MAIN_RE.search(html_text)
    if not main_m:
        print(f"  warn: no <main> found, skipping: {path.relative_to(REPO)}", file=sys.stderr)
        return None

    main_html = strip_blocks(main_m.group(1))
    extractor = MainContentExtractor()
    extractor.feed(main_html)
    extractor.close()

    body_lines: list[str] = []
    for tag, text in extractor.lines:
        if tag == "h1":
            body_lines.append(f"# {text}")
        elif tag == "h2":
            body_lines.append(f"## {text}")
        elif tag == "h3":
            body_lines.append(f"### {text}")
        elif tag == "li":
            body_lines.append(f"- {text}")
        elif tag in ("summary", "question"):
            body_lines.append(f"Q: {text}")
        elif tag == "answer":
            body_lines.append(f"A: {text}")
        elif tag == "price":
            body_lines.append(f"Rate: {text}")
        else:
            body_lines.append(text)

    section = [f"## {canonical}", ""]
    if title:
        section.append(f"Title: {title}")
    if description:
        section.append(f"Meta description: {description}")
    section.append("")
    section.extend(body_lines)
    return "\n".join(section).rstrip() + "\n"


class BlogIndexExtractor(HTMLParser):
    """Special-cased extractor for the /blog/ index page: keeps the page
    intro (H1 and lead paragraph) and each topic section's heading and
    intro paragraph, but reduces every post card to a markdown link
    (title only; the per-card teaser text is dropped)."""

    CARD_LINK_CLASS = "blog-card-link"

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.stack: list[dict] = []
        self.lines: list[tuple[str, object]] = []
        self.in_card_link = False
        self.card_href = ""
        self.card_title_buf: list[str] | None = None

    def handle_starttag(self, tag: str, attrs) -> None:
        attrs_dict = dict(attrs)
        classes = (attrs_dict.get("class") or "").split()
        if tag == "a" and self.CARD_LINK_CLASS in classes:
            self.in_card_link = True
            self.card_href = attrs_dict.get("href", "")
            return
        if self.in_card_link:
            if tag == "h2":
                self.card_title_buf = []
            return
        if tag in ("h1", "h2", "p"):
            self.stack.append({"tag": tag, "buf": []})
        elif tag == "br" and self.stack:
            self.stack[-1]["buf"].append(" ")

    def handle_endtag(self, tag: str) -> None:
        if tag == "a" and self.in_card_link:
            self.in_card_link = False
            self.card_href = ""
            return
        if self.in_card_link:
            if tag == "h2" and self.card_title_buf is not None:
                title = normalize_ws("".join(self.card_title_buf))
                if title and self.card_href:
                    self.lines.append(("link", (title, self.card_href)))
                self.card_title_buf = None
            return
        if tag in ("h1", "h2", "p") and self.stack and self.stack[-1]["tag"] == tag:
            frame = self.stack.pop()
            text = normalize_ws("".join(frame["buf"]))
            if text:
                self.lines.append((frame["tag"], text))

    def handle_data(self, data: str) -> None:
        if self.in_card_link:
            if self.card_title_buf is not None:
                self.card_title_buf.append(data)
            return
        if self.stack:
            self.stack[-1]["buf"].append(data)

    def close(self) -> None:
        super().close()
        while self.stack:
            frame = self.stack.pop()
            text = normalize_ws("".join(frame["buf"]))
            if text:
                self.lines.append((frame["tag"], text))


def build_blog_index_section(url: str, path: Path) -> str | None:
    """Like build_page_section, but for the /blog/ index: post cards are
    reduced to a title-only markdown link, dropping the teaser text."""
    html_text = path.read_text(encoding="utf-8")

    title_m = TITLE_RE.search(html_text)
    title = unescape(title_m.group(1)).strip() if title_m else ""

    desc_m = DESC_RE.search(html_text)
    description = unescape(desc_m.group(2)).strip() if desc_m else ""

    canon_m = CANONICAL_RE.search(html_text)
    canonical = unescape(canon_m.group(2)).strip() if canon_m else url

    main_m = MAIN_RE.search(html_text)
    if not main_m:
        print(f"  warn: no <main> found, skipping: {path.relative_to(REPO)}", file=sys.stderr)
        return None

    main_html = strip_blocks(main_m.group(1))
    extractor = BlogIndexExtractor()
    extractor.feed(main_html)
    extractor.close()

    body_lines: list[str] = []
    for tag, value in extractor.lines:
        if tag == "h1":
            body_lines.append(f"# {value}")
        elif tag == "h2":
            body_lines.append(f"## {value}")
        elif tag == "p":
            body_lines.append(value)
        elif tag == "link":
            post_title, href = value
            post_url = href if href.startswith("http") else f"{BASE_URL}{href}"
            body_lines.append(f"- [{post_title}]({post_url})")

    section = [f"## {canonical}", ""]
    if title:
        section.append(f"Title: {title}")
    if description:
        section.append(f"Meta description: {description}")
    section.append("")
    section.extend(body_lines)
    return "\n".join(section).rstrip() + "\n"


def intro_block(llms_lines: list[str]) -> str:
    """The key-facts intro at the top of llms.txt: everything before the
    first '## ' section heading."""
    out: list[str] = []
    for line in llms_lines:
        if line.startswith("## "):
            break
        out.append(line)
    return "\n".join(out).rstrip() + "\n"


def build_llms_full() -> tuple[str, int, int]:
    llms_text = LLMS_TXT.read_text(encoding="utf-8")
    llms_lines = llms_text.splitlines()

    parts = [intro_block(llms_lines)]
    parts.append(
        "This file is the full-content companion to llms.txt "
        "(https://ghosxt.com/llms.txt): the same pages, in the same order, "
        "with each page's on-page text included in full instead of a one-line summary.\n"
    )

    urls = ordered_page_links(llms_text)
    included = 0
    skipped: list[str] = []
    for url in urls:
        path = resolve_local_path(url)
        if path is None:
            skipped.append(url)
            continue
        if url == f"{BASE_URL}/blog/":
            section = build_blog_index_section(url, path)
        else:
            section = build_page_section(url, path)
        if section is None:
            skipped.append(url)
            continue
        parts.append(section)
        included += 1

    text = "\n\n".join(part.rstrip("\n") for part in parts).rstrip() + "\n"
    for url in skipped:
        print(f"  skip (no matching HTML page): {url}", file=sys.stderr)
    return text, included, len(skipped)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Actually write llms-full.txt. Without this flag the script ALWAYS runs as a dry run.",
    )
    parser.add_argument("--dry-run", action="store_true", help="Explicit dry-run flag (informational only).")
    args = parser.parse_args()

    apply_changes = args.apply

    print("=" * 78)
    print(f"generate-llms-full.py: {'APPLY' if apply_changes else 'DRY RUN'}")
    print(f"llms.txt: {LLMS_TXT}")
    print(f"output:   {OUTPUT}")
    print("=" * 78)

    text, included, skipped_count = build_llms_full()
    size = len(text.encode("utf-8"))

    print(f"pages included: {included}")
    print(f"links skipped (non-page / no match): {skipped_count}")
    print(f"output size: {size:,} bytes")
    if size > WARN_BYTES:
        print(f"warning: output exceeds the ~{WARN_BYTES:,}-byte target.", file=sys.stderr)

    if apply_changes:
        OUTPUT.write_text(text, encoding="utf-8")
        print(f"wrote {OUTPUT.relative_to(REPO)}")
    else:
        print("dry run: no file written. Re-run with --apply to write llms-full.txt.")

    print("=" * 78)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
