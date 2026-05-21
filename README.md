# ghosxt

Ghosxt's website.

## Sitemap maintenance

Run the sitemap generator whenever a root-level page or blog page is added, removed, or intentionally re-canonicalized:

```bash
python3 scripts/generate-sitemap.py
```

The generator scans `*.html` and `blog/*.html`, skips pages with a `noindex` robots meta tag, reads each page's canonical URL, and writes `sitemap.xml`. It normalizes both `index.html` and `blog/index.html` canonicals to their directory URLs (`/` and `/blog/`) so the sitemap does not publish duplicate `/blog/` versus `/blog/index.html` entries.

Existing `lastmod`, `changefreq`, and `priority` values in `sitemap.xml` are carried forward for URLs already listed there. New URLs get a `lastmod` date only; add `changefreq` or `priority` to the generated sitemap afterward only when that value is an intentional SEO signal, then rerun the generator to verify it is preserved.

## Blog file-explorer page

`blog/all.html` is the "file view" of every blog post. Regenerate it whenever a post is added, removed, re-dated, or re-categorized:

```bash
python3 scripts/generate-blog-explorer.py
```

The script scans `blog/*.html` (skipping `index.html`, `all.html`, and any post with a `noindex` robots meta tag), extracts each post's title, `article:published_time` date, and JSON-LD `articleSection` category, sorts by date descending, and rewrites only the dynamic regions of `blog/all.html` between these markers:

- `<!-- BEGIN:COUNT --> ... <!-- END:COUNT -->` &mdash; the total post count
- `<!-- BEGIN:FOLDERS --> ... <!-- END:FOLDERS -->` &mdash; the category folder badges
- `<!-- BEGIN:ROWS --> ... <!-- END:ROWS -->` &mdash; the Finder-style table rows

Nav, footer, head, schema, and CSS in `blog/all.html` are untouched, so layout edits to the page can be made by hand without breaking the generator. Categories come from each post's `"articleSection"` value in its JSON-LD `BlogPosting` schema; keep that field accurate when authoring new posts.

## Open Graph image generation

Per-page social-share images live in `assets/img/og/<slug>.png` and are generated from each page's `<title>`. Re-run the generator whenever a page is added, renamed, or has its title changed:

```bash
pip install Pillow   # one-time
python3 scripts/generate-og-images.py
```

The script reads `*.html` and `blog/*.html`, skips pages with a `noindex` robots meta tag, splits the title at `|` / `–` / `—` / `-`, and renders a 1200x630 PNG. Output filenames map `index.html` → `home.png`, `blog/foo.html` → `blog-foo.png`, and everything else to `<slug-without-extension>.png`. Drop `Roboto-Bold.ttf` and `Roboto-Regular.ttf` into `scripts/fonts/` for on-brand typography; otherwise the script falls back to DejaVu Sans.

## Cloudflare Web Analytics

Every page loads the Cloudflare Web Analytics beacon via a `<script>` tag in `<head>` with the site token in `data-cf-beacon`. The live data lives at Cloudflare → Analytics & Logs → Web Analytics → `ghosxt.com`. If the token ever needs to be rotated, regenerate it in the dashboard (Manage site → "Enable with JS Snippet installation") and search-and-replace the old token across all `*.html` and `blog/*.html` files.
