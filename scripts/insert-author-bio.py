#!/usr/bin/env python3
"""Insert a visible author-credential bio box into every blog post, right after
the existing byline. Blog posts already carry the author's credentials in
invisible schema.org JSON-LD (linking to about.html): this surfaces the same
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
            <strong>Ulises Paiz</strong>, Owner, Ghosxt
          </div>"""

MARKER = "<!-- ghosxt:author-bio -->"

BIO_HTML = f"""
          <div class="author-bio-box">
            {MARKER}
            <img src="../assets/img/ulises.avif" alt="Ulises Paiz" width="56" height="56" loading="lazy" />
            <p>Ulises Paiz is the owner and sole engineer at Ghosxt, a Salinas, CA managed IT and cybersecurity provider. He holds an M.S. in Cybersecurity and Information Assurance (WGU, 2026) and nine industry certifications including CompTIA SecurityX, CySA+, and Microsoft AZ-104, with prior DoD and federal contractor infrastructure experience. <a href="../about.html">More about Ulises &rarr;</a></p>
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
            print(f"!! anchor not found in {name}, skipping")
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
