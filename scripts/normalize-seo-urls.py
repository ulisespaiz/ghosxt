#!/usr/bin/env python3
"""Normalize Ghosxt page URLs to the extensionless URLs served in production.

The live site redirects ``/page.html`` to ``/page``.  This script makes the
repository agree with that behavior by updating internal links, canonical URLs,
Open Graph URLs, JSON-LD URLs, and llms.txt.  Source files remain ``.html``;
only public URLs become extensionless.
"""

from __future__ import annotations

import argparse
import posixpath
import re
from pathlib import Path, PurePosixPath
from urllib.parse import SplitResult, urlsplit, urlunsplit

ROOT = Path(__file__).resolve().parents[1]
BASE_HOST = "ghosxt.com"
HTML_PATTERNS = ("*.html", "blog/*.html")
TEXT_URL_FILES = ("llms.txt",)

ATTR_URL_RE = re.compile(
    r"(?P<prefix>\b(?:href|action)\s*=\s*(?P<quote>[\"']))"
    r"(?P<url>[^\"']*)"
    r"(?P=quote)",
    re.IGNORECASE,
)
ABSOLUTE_SITE_URL_RE = re.compile(
    r"https?://(?:www\.)?ghosxt\.com(?:/[^\"'<>&\s]*)?",
    re.IGNORECASE,
)
SKIP_SCHEMES = {"mailto", "tel", "javascript", "data", "sms"}


def normalize_route_path(path: str) -> str:
    """Return a root-relative production route for a source HTML path."""
    path = "/" + path.lstrip("/")
    path = re.sub(r"/{2,}", "/", path)
    if path == "/index.html":
        return "/"
    if path.endswith("/index.html"):
        return path[: -len("index.html")]
    if path.endswith(".html"):
        return path[:-5]
    return path


def rebuild(parts: SplitResult, *, scheme: str | None = None, netloc: str | None = None, path: str | None = None) -> str:
    return urlunsplit(
        (
            parts.scheme if scheme is None else scheme,
            parts.netloc if netloc is None else netloc,
            parts.path if path is None else path,
            parts.query,
            parts.fragment,
        )
    )


def normalize_absolute_site_url(value: str) -> str:
    parts = urlsplit(value)
    if parts.hostname not in {BASE_HOST, f"www.{BASE_HOST}"}:
        return value
    normalized_path = normalize_route_path(parts.path or "/")
    return rebuild(parts, scheme="https", netloc=BASE_HOST, path=normalized_path)


def normalize_attribute_url(value: str, source_path: Path) -> str:
    stripped = value.strip()
    if not stripped or stripped.startswith("#"):
        return value

    parts = urlsplit(stripped)
    if parts.scheme.lower() in SKIP_SCHEMES:
        return value

    # Absolute internal URL.
    if parts.scheme in {"http", "https"}:
        if parts.hostname not in {BASE_HOST, f"www.{BASE_HOST}"}:
            return value
        return normalize_absolute_site_url(stripped)

    # Protocol-relative URL.
    if parts.netloc:
        if parts.hostname not in {BASE_HOST, f"www.{BASE_HOST}"}:
            return value
        normalized = rebuild(parts, scheme="https", netloc=BASE_HOST, path=normalize_route_path(parts.path or "/"))
        return normalized

    if not parts.path.endswith(".html"):
        return value

    if parts.path.startswith("/"):
        route = normalize_route_path(parts.path)
    else:
        source_dir = PurePosixPath(source_path.as_posix()).parent.as_posix()
        if source_dir == ".":
            source_dir = ""
        resolved = posixpath.normpath(posixpath.join("/", source_dir, parts.path))
        route = normalize_route_path(resolved)

    return urlunsplit(("", "", route, parts.query, parts.fragment))


def normalize_html(text: str, source_path: Path) -> str:
    def replace_attr(match: re.Match[str]) -> str:
        prefix = match.group("prefix")
        quote = match.group("quote")
        value = match.group("url")
        return f"{prefix}{normalize_attribute_url(value, source_path)}{quote}"

    text = ATTR_URL_RE.sub(replace_attr, text)
    text = ABSOLUTE_SITE_URL_RE.sub(lambda match: normalize_absolute_site_url(match.group(0)), text)
    return text


def normalize_text_urls(text: str) -> str:
    return ABSOLUTE_SITE_URL_RE.sub(lambda match: normalize_absolute_site_url(match.group(0)), text)


def html_files() -> list[Path]:
    files: list[Path] = []
    for pattern in HTML_PATTERNS:
        files.extend(ROOT.glob(pattern))
    return sorted(set(files), key=lambda item: item.as_posix())


def process_file(path: Path, *, check: bool) -> bool:
    original = path.read_text(encoding="utf-8")
    relative = path.relative_to(ROOT)
    if path.suffix.lower() == ".html":
        updated = normalize_html(original, relative)
    else:
        updated = normalize_text_urls(original)
    if updated == original:
        return False
    if not check:
        path.write_text(updated, encoding="utf-8")
    return True


def validate() -> list[str]:
    errors: list[str] = []
    for path in html_files():
        text = path.read_text(encoding="utf-8")
        relative = path.relative_to(ROOT)
        if ABSOLUTE_SITE_URL_RE.search(text):
            # Only flag absolute URLs whose path still ends in .html.
            for match in ABSOLUTE_SITE_URL_RE.finditer(text):
                if urlsplit(match.group(0)).path.endswith(".html"):
                    errors.append(f"{relative}: absolute Ghosxt URL still ends in .html: {match.group(0)}")
        for match in ATTR_URL_RE.finditer(text):
            value = match.group("url")
            if normalize_attribute_url(value, relative) != value:
                errors.append(f"{relative}: internal href/action still needs normalization: {value}")
                break
    return errors


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="Report files that would change without writing them")
    args = parser.parse_args()

    targets = html_files()
    targets.extend(ROOT / item for item in TEXT_URL_FILES if (ROOT / item).exists())
    changed = [path.relative_to(ROOT).as_posix() for path in targets if process_file(path, check=args.check)]

    if args.check and changed:
        print("URL normalization required in:")
        for item in changed:
            print(f"  - {item}")
        return 1

    errors = validate()
    if errors:
        print("URL normalization validation failed:")
        for error in errors:
            print(f"  - {error}")
        return 1

    action = "Would normalize" if args.check else "Normalized"
    print(f"{action} {len(changed)} file(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
