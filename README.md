# ghosxt

Ghosxt's website.

## Sitemap maintenance

Run the sitemap generator whenever a root-level page or blog page is added, removed, or intentionally re-canonicalized:

```bash
python3 scripts/generate-sitemap.py
```

The generator scans `*.html` and `blog/*.html`, skips pages with a `noindex` robots meta tag, reads each page's canonical URL, and writes `sitemap.xml`. It normalizes both `index.html` and `blog/index.html` canonicals to their directory URLs (`/` and `/blog/`) so the sitemap does not publish duplicate `/blog/` versus `/blog/index.html` entries.

Existing `lastmod`, `changefreq`, and `priority` values in `sitemap.xml` are carried forward for URLs already listed there. New URLs get a `lastmod` date only; add `changefreq` or `priority` to the generated sitemap afterward only when that value is an intentional SEO signal, then rerun the generator to verify it is preserved.

## Open Graph image generation

Per-page social-share images live in `assets/img/og/<slug>.png` and are generated from each page's `<title>`. Re-run the generator whenever a page is added, renamed, or has its title changed:

```bash
pip install Pillow   # one-time
python3 scripts/generate-og-images.py
```

The script reads `*.html` and `blog/*.html`, skips pages with a `noindex` robots meta tag, splits the title at `|` / `–` / `—` / `-`, and renders a 1200x630 PNG. Output filenames map `index.html` → `home.png`, `blog/foo.html` → `blog-foo.png`, and everything else to `<slug-without-extension>.png`. Drop `Roboto-Bold.ttf` and `Roboto-Regular.ttf` into `scripts/fonts/` for on-brand typography; otherwise the script falls back to DejaVu Sans.

## Cloudflare Web Analytics token

Every page loads the Cloudflare Web Analytics beacon. The `data-cf-beacon` attribute currently contains the placeholder `REPLACE_WITH_CF_WEB_ANALYTICS_TOKEN` — replace it with the real site token from the Cloudflare dashboard (Analytics → Web Analytics → site → Token). Search-and-replace across all `*.html` and `blog/*.html` once.
