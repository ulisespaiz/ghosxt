#!/usr/bin/env python3
"""Build the deployable site into dist/.

Copies an explicit allowlist of site files from the repo root into dist/ and
minifies CSS/JS there with esbuild (via npx). Sources in the repo stay
readable; wrangler.jsonc points its assets directory at dist/, so URLs and
HTML references are unchanged.

Usage:
    python3 scripts/build-dist.py              # full build (minified)
    python3 scripts/build-dist.py --no-minify  # fast build for local dev

Deploy with:
    python3 scripts/build-dist.py && npx wrangler deploy

If esbuild is unavailable (e.g. offline npx), the build falls back to
unminified copies so a deploy is never blocked.
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"

# Only these items are deployed. Tooling (scripts/, src/), docs, and config
# must never end up publicly served.
COPY_DIRS = ("assets", "blog")
COPY_FILES = (
    "_headers",
    "_redirects",
    "robots.txt",
    "llms.txt",
    "sitemap.xml",
    "feed.xml",
)
MINIFY_DIRS = ("assets/css", "assets/js")


def copy_site() -> None:
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir()

    for html in sorted(ROOT.glob("*.html")):
        shutil.copy2(html, DIST / html.name)

    for name in COPY_DIRS:
        src = ROOT / name
        if src.is_dir():
            shutil.copytree(src, DIST / name)

    for name in COPY_FILES:
        src = ROOT / name
        if src.is_file():
            shutil.copy2(src, DIST / name)


def minify() -> bool:
    targets = []
    for rel in MINIFY_DIRS:
        directory = DIST / rel
        if directory.is_dir():
            targets.extend(sorted(directory.glob("*.css")))
            targets.extend(sorted(directory.glob("*.js")))
    if not targets:
        return True

    before = sum(p.stat().st_size for p in targets)
    cmd = [
        "npx",
        "-y",
        "esbuild",
        "--minify",
        "--allow-overwrite",
        f"--outdir={DIST}",
        f"--outbase={DIST}",
        *[str(p) for p in targets],
    ]
    result = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True)
    if result.returncode != 0:
        print(result.stderr.strip(), file=sys.stderr)
        return False

    after = sum(p.stat().st_size for p in targets)
    print(
        f"Minified {len(targets)} CSS/JS files: "
        f"{before / 1024:.0f} KB -> {after / 1024:.0f} KB"
    )
    return True


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--no-minify",
        action="store_true",
        help="Skip minification (faster local dev builds).",
    )
    args = parser.parse_args()

    copy_site()
    print(f"Copied site into {DIST.relative_to(ROOT)}/")

    if args.no_minify:
        print("Skipping minification (--no-minify).")
    elif not minify():
        print(
            "WARNING: esbuild failed or is unavailable; "
            "deploying unminified assets.",
            file=sys.stderr,
        )


if __name__ == "__main__":
    main()
