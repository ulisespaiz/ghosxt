# ghosxt

Ghosxt's website.

## Sitemap maintenance

Run the sitemap generator whenever a root-level page or blog page is added, removed, or intentionally re-canonicalized:

```bash
python3 scripts/generate-sitemap.py
```

The generator scans `*.html` and `blog/*.html`, skips pages with a `noindex` robots meta tag, reads each page's canonical URL, and writes `sitemap.xml`. It normalizes both `index.html` and `blog/index.html` canonicals to their directory URLs (`/` and `/blog/`) so the sitemap does not publish duplicate `/blog/` versus `/blog/index.html` entries.

Existing `lastmod`, `changefreq`, and `priority` values in `sitemap.xml` are carried forward for URLs already listed there. New URLs get a `lastmod` date only; add `changefreq` or `priority` to the generated sitemap afterward only when that value is an intentional SEO signal, then rerun the generator to verify it is preserved.
