# ghosxt

Ghosxt's website.

## Build and deploy

`wrangler.jsonc` serves static assets from `dist/`, which is produced by
`scripts/build-dist.py` (it copies the site files and minifies CSS/JS with
esbuild via `npx`). The script is wired into wrangler as a custom build
command, so both `npx wrangler deploy` and `npx wrangler dev` run it
automatically — including Cloudflare Workers Builds deploys triggered by Git
pushes:

```bash
npx wrangler deploy
```

`dist/` is git-ignored — never edit files inside it, they are overwritten on
every build. If esbuild is unavailable the script falls back to deploying
unminified assets rather than failing.

## Content-Security-Policy notes

`_headers` sets a CSP whose `script-src` does **not** allow `'unsafe-inline'`:

- New pages must not use inline `<script>` blocks or inline `on*=` event
  handler attributes. Put scripts in `assets/js/` and reference them with
  `<script src="..." defer>`.
- The one exception is the async-stylesheet pattern
  `onload="this.media='all'"`, which is allowed via `'unsafe-hashes'` and a
  sha256 hash of that exact string. The attribute value must stay
  **byte-for-byte identical** on every page (no added spaces or quote
  changes), or font/icon CSS will silently fail to load on that page.

`style-src` still allows `'unsafe-inline'` because many pages use inline
`style=""` attributes.

## Sitemap maintenance

Run the sitemap generator whenever a root-level page or blog page is added, removed, or intentionally re-canonicalized:

```bash
python3 scripts/generate-sitemap.py
```

The generator scans `*.html` and `blog/*.html`, skips pages with a `noindex` robots meta tag, reads each page's canonical URL, and writes `sitemap.xml`. It normalizes both `index.html` and `blog/index.html` canonicals to their directory URLs (`/` and `/blog/`) so the sitemap does not publish duplicate `/blog/` versus `/blog/index.html` entries.

Existing `lastmod`, `changefreq`, and `priority` values in `sitemap.xml` are carried forward for URLs already listed there. New URLs get a `lastmod` date only; add `changefreq` or `priority` to the generated sitemap afterward only when that value is an intentional SEO signal, then rerun the generator to verify it is preserved.

To resync every `lastmod` with each page's actual git last-commit date (e.g. after a batch of content edits), run `python3 scripts/generate-sitemap.py --refresh-lastmod` — commit the page changes first, since the dates come from `git log`.

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

## RSS feed

`feed.xml` (RSS 2.0) at the site root publishes the 30 most recent blog posts for feed readers, content aggregators, and answer-engine crawlers. Every page advertises it via `<link rel="alternate" type="application/rss+xml" ...>`, and `robots.txt` references it. Regenerate it whenever a post is added, removed, or re-dated:

```bash
python3 scripts/generate-feed.py
```

The script scans `blog/*.html` (skipping `index.html`, `all.html`, and any post with a `noindex` robots meta tag), extracts each post's title, canonical URL, meta description, `article:published_time` date, JSON-LD `articleSection` category, and author, sorts by date descending, and writes the newest 30 as RSS items.

## Open Graph image generation

Per-page social-share images live in `assets/img/og/<slug>.png` and are generated from each page's `<title>`. Re-run the generator whenever a page is added, renamed, or has its title changed:

```bash
pip install Pillow   # one-time
python3 scripts/generate-og-images.py
```

The script reads `*.html` and `blog/*.html`, skips pages with a `noindex` robots meta tag, splits the title at `|` / `–` / `—` / `-`, and renders a 1200x630 PNG. Output filenames map `index.html` → `home.png`, `blog/foo.html` → `blog-foo.png`, and everything else to `<slug-without-extension>.png`. Drop `Roboto-Bold.ttf` and `Roboto-Regular.ttf` into `scripts/fonts/` for on-brand typography; otherwise the script falls back to DejaVu Sans.

## Cloudflare Web Analytics

Every page loads the Cloudflare Web Analytics beacon via a `<script>` tag in `<head>` with the site token in `data-cf-beacon`. The live data lives at Cloudflare → Analytics & Logs → Web Analytics → `ghosxt.com`. If the token ever needs to be rotated, regenerate it in the dashboard (Manage site → "Enable with JS Snippet installation") and search-and-replace the old token across all `*.html` and `blog/*.html` files.

## Google Search Console verification

Search Console is the source of truth for what queries actually bring people to
the site (impressions, clicks, average position) and is where the sitemap should
be submitted. To verify ownership, choose one method:

- **HTML meta tag (per-property):** in [Search Console](https://search.google.com/search-console),
  add a URL-prefix property for `https://ghosxt.com/`, copy the
  `google-site-verification` content string it gives you, and paste it into the
  placeholder in `index.html` `<head>` (search for `google-site-verification`).
  The tag only needs to live on the homepage. Then click *Verify*.
- **DNS TXT (domain-wide, recommended):** add the `google-site-verification=...`
  TXT record Search Console provides to the `ghosxt.com` DNS zone in Cloudflare.
  This verifies the whole domain (all subdomains) and needs no code change.

After verifying, submit `https://ghosxt.com/sitemap.xml` under *Sitemaps*.

## llms.txt (AI answer engines)

`llms.txt` at the repo root is a plain-text, link-rich map of the business,
services, service-area cities, and key guides, written for AI assistants
(ChatGPT, Perplexity, Google AI Overviews) so they can cite Ghosxt accurately.
It is served at `https://ghosxt.com/llms.txt`. Update it whenever a service,
city, or important page is added, removed, or renamed, and keep the phone,
email, and pricing lines in sync with the rest of the site. It is not an
indexable HTML page, so it is intentionally absent from `sitemap.xml`.
