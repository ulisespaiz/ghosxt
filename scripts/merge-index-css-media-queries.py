#!/usr/bin/env python3
"""One-off: merge scattered `@media (max-width: Npx) { ... }` blocks in
index.css into one block per breakpoint, run once during the site cleanup
pass (see git history for before/after). Kept for reference — re-running
against an already-merged file is a no-op (find_media_blocks will only find
the 3 consolidated blocks and merge each with itself).

The merged block for each breakpoint is placed at the position of the LAST
original occurrence, not the first. This matters: if a later-appearing
unconditional (non-media) rule for the same selector sat between two
originally-scattered same-breakpoint blocks, hoisting the merged block to an
early anchor would flip it from winning the cascade to losing it. Anchoring
at the last occurrence preserves "the media-scoped override cascades after
whatever base rule it was meant to override" for every constituent block.

This does NOT reorder the three breakpoint blocks relative to each other
(they stay wherever their last occurrence happened to be), so some
`!important` in the file remain load-bearing for breakpoint-priority
ordering rather than being scattering artifacts — check before removing any.
"""

import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "css", "index.css")

TARGET_BREAKPOINTS = {"640px", "968px", "480px"}


def find_media_blocks(text):
    """Find all top-level @media (max-width: Npx) { ... } blocks via brace
    matching. Returns list of (start, end, breakpoint, body) — end is
    exclusive index just past the closing brace."""
    blocks = []
    pattern = re.compile(r"@media \(max-width: (\d+px)\) \{")
    for m in pattern.finditer(text):
        bp = m.group(1)
        if bp not in TARGET_BREAKPOINTS:
            continue
        depth = 1
        i = m.end()
        while depth > 0:
            ch = text[i]
            if ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
            i += 1
        body = text[m.end():i - 1]
        blocks.append((m.start(), i, bp, body))
    return blocks


def main():
    with open(SRC, encoding="utf-8") as f:
        text = f.read()

    blocks = find_media_blocks(text)
    print(f"Found {len(blocks)} target blocks: "
          f"{sum(1 for b in blocks if b[2]=='640px')} x640px, "
          f"{sum(1 for b in blocks if b[2]=='968px')} x968px, "
          f"{sum(1 for b in blocks if b[2]=='480px')} x480px")

    bodies_by_bp = {"640px": [], "968px": [], "480px": []}
    for start, end, bp, body in blocks:
        bodies_by_bp[bp].append(body.strip("\n"))

    merged_text_by_bp = {}
    for bp, bodies in bodies_by_bp.items():
        combined = "\n\n".join(b.strip("\n") for b in bodies)
        merged_text_by_bp[bp] = f"@media (max-width: {bp}) {{\n{combined}\n}}"

    blocks_sorted = sorted(blocks, key=lambda b: b[0])
    last_index_by_bp = {}
    for start, end, bp, body in blocks_sorted:
        last_index_by_bp[bp] = start

    out = []
    cursor = 0
    emitted_bp = set()
    for start, end, bp, body in blocks_sorted:
        out.append(text[cursor:start])
        if start == last_index_by_bp[bp] and bp not in emitted_bp:
            out.append(merged_text_by_bp[bp])
            emitted_bp.add(bp)
        cursor = end
    out.append(text[cursor:])

    new_text = "".join(out)
    with open(SRC, "w", encoding="utf-8") as f:
        f.write(new_text)
    print(f"Wrote merged file. Old length {len(text)}, new length {len(new_text)}")


if __name__ == "__main__":
    main()
