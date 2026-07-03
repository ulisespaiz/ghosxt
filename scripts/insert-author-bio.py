#!/usr/bin/env python3
"""Insert a visible author-credential bio box into every blog post, right after
the existing byline. Blog posts already carry the author's credentials in
invisible schema.org JSON-LD (linking to about.html) — this surfaces the same
facts on the page itself, which is what Google's E-E-A-T guidance rewards.

Idempotent: posts that already contain the section are skipped, safe to re-run.

Run from the repo root:

    python3 scripts/insert-author-bio.py
"""

import os
import glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOG_DIR = os.path.join(ROOT, "blog")

ANCHOR = """          <div class="blog-post-author">
            <strong>Ulises Paiz</strong>, Founder, Ghosxt
          </div>"""

MARKER = "<!-- ghosxt:author-bio -->"

BIO_HTML = f"""
          <div class="author-bio-box">
            {MARKER}
            <img src="../assets/img/ulises.avif" alt="Ulises Paiz" width="56" height="56" loading="lazy" />
            <p>Ulises Paiz, Founder of Ghosxt, has 10+ years in IT infrastructure and cybersecurity, an Active Top Secret Clearance, and 9 certifications including CySA+, Security+, and AZ-104. Before founding Ghosxt, he served as a Senior Solutions Consultant for the DoD and built security programs for 40+ Central Coast businesses. <a href="../about.html">More about Ulises &rarr;</a></p>
          </div>"""


def main():
    changed, skipped = [], []
    for path in sorted(glob.glob(os.path.join(BLOG_DIR, "*.html"))):
        name = os.path.basename(path)
        if name in ("index.html", "all.html"):
            continue
        t = open(path, encoding="utf-8").read()
        if MARKER in t:
            skipped.append(name)
            continue
        if ANCHOR not in t:
            print(f"!! anchor not found in {name} — skipping")
            skipped.append(name)
            continue
        new = t.replace(ANCHOR, ANCHOR + BIO_HTML, 1)
        open(path, "w", encoding="utf-8").write(new)
        changed.append(name)

    print(f"Inserted author bio into {len(changed)} posts")
    if skipped:
        print(f"Skipped {len(skipped)}: {', '.join(skipped)}")


if __name__ == "__main__":
    main()
