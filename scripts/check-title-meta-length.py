#!/usr/bin/env python3
"""Read-only scan: report every page whose <title> exceeds 60 characters or whose
meta description exceeds 155. Lengths are measured on the rendered text, so HTML
entities count as the single character they display. Prints current text and
length. Makes no changes."""
import re, glob, sys, html

TITLE_MAX, DESC_MAX = 60, 155
t_re = re.compile(r'<title>(.*?)</title>', re.S)
d_re = re.compile(r'<meta\s+name="description"\s+content="(.*?)"', re.S)

files = sorted(glob.glob('*.html') + glob.glob('blog/*.html'))
over_t, over_d = [], []
for f in files:
    s = open(f).read()
    m = t_re.search(s)
    if m:
        t = html.unescape(' '.join(m.group(1).split()))
        if len(t) > TITLE_MAX: over_t.append((f, len(t), t))
    m = d_re.search(s)
    if m:
        d = html.unescape(' '.join(m.group(1).split()))
        if len(d) > DESC_MAX: over_d.append((f, len(d), d))

print(f"Scanned {len(files)} pages.")
print(f"\nTITLES over {TITLE_MAX}: {len(over_t)}")
for f, n, t in over_t: print(f"  {f} [{n}] {t}")
print(f"\nMETA DESCRIPTIONS over {DESC_MAX}: {len(over_d)}")
for f, n, d in over_d: print(f"  {f} [{n}] {d}")
sys.exit(1 if (over_t or over_d) else 0)
