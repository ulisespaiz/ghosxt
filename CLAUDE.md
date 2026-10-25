# Ghosxt.com: working rules for agents and contributors

This file is operational guidance only. It is excluded from the deployed site by
.assetsignore. The repository is public, so nothing confidential goes here: no client
names, no insurance figures, no clearance detail, no internal decision logs. Facts about
the business come from the owner or from what is already visible on the live site.

## Stack and layout

- Static HTML site. Every page is a hand-authored `*.html` at the repo root, under `blog/`,
  or under `case-studies/`. No framework, no build step for HTML.
- Hosting: Cloudflare Workers with static assets (`wrangler.jsonc`, worker in
  `src/worker.js` for `/api/contact` and `/api/track`). `_headers` sets security and cache
  headers; `_redirects` holds 301s and the `.html` to extensionless rules.
  `.assetsignore` keeps tooling out of the deploy.
- Cloudflare Git integration builds a preview for every branch and deploys `main` to
  production. Merging to `main` is a deploy.
- Shared chrome (head assets, nav, cookie banner, footer, mobile CTA bar) lives in
  `scripts/_chrome_source.html` and is applied with `scripts/apply-chrome.py`.
- CSS and JS source is `assets/css/*.css` and `assets/js/*.js`; the site serves the
  `.min.*` copies. Generated files: `sitemap.xml`, `feed.xml`, `blog/all.html`,
  `llms-full.txt`, `assets/img/og/*.png`.

## Commands

```bash
# Preview (needs: npm install at repo root once)
npx wrangler dev                      # http://localhost:8787, mirrors production routing
node audit/tools/static-server.mjs    # dependency-free local server used by CI (port 8787)

# Checks a contributor runs before pushing
python3 scripts/check-title-meta-length.py     # titles <= 60, metas <= 155 (exit 1 on violation)
python3 scripts/compute-csp-hashes.py --check  # CSP hash allowlist matches inline scripts
python3 scripts/check-chrome-drift.py          # shared chrome identical across pages
cd audit && npx html-validate ../index.html    # HTML validation (config: .htmlvalidate.json)
npx wrangler deploy --dry-run

# Regenerate after content changes (run from repo root)
python3 scripts/generate-sitemap.py
python3 scripts/generate-feed.py
python3 scripts/generate-blog-explorer.py
python3 scripts/generate-og-images.py
python3 scripts/generate-llms-full.py --apply
python3 scripts/minify.py && python3 scripts/minify.py --stamp   # after any CSS or JS edit

# Audit tooling (cd audit && npm install once; CHROME_PATH points at a Chromium binary)
node audit/tools/lh-run.mjs --form-factor both          # Lighthouse, mobile first
node audit/tools/crawl-live.mjs                         # crawl, links, redirects, orphans
node audit/tools/axe-run.mjs                            # axe at mobile and desktop
node audit/tools/screenshots.mjs --base http://127.0.0.1:8787
node audit/tools/visual-diff.mjs --base <dirA> --head <dirB>
```

CI: `.github/workflows/site-quality.yml` runs HTML validation, link and crawl checks,
Lighthouse CI with budgets from `audit/ci/`, and a Playwright screenshot diff against the
base branch on every pull request. See `audit/baseline/README.md` for how baselines and
budgets are regenerated.

## Hard rules

1. No em dashes anywhere: code, copy, docs, commits, PR text. Use a comma, colon,
   period, or a plain hyphen.
2. The visual system is locked. No change to layout, palette, typography, spacing, or
   page structure without explicit written approval from the owner on the PR. Owner's
   brand tokens: background #0a0a0a, accent red #ff1f3a, all text #ffffff, cyan #00ecff
   only as a rare status accent, headlines Michroma uppercase, body Inter. As of
   2026-10-25 only `/managed-ai` (PR #260) implements these tokens; every other page uses
   the earlier light theme (Roboto, dark red #b71c1c). Which direction the rest of the
   site takes is an owner decision; until it is made, neither theme is edited. No yellow,
   no grey text.
3. No visual diffs without explicit approval. The screenshot-diff job fails on any pixel
   change unless the PR carries the `visual-change-approved` label applied by the owner.
4. Voice: confident and plain. Lead with the client's blind spot. The thread is
   "IT that sees it coming." Local credibility belongs in CTA copy, not in the footer.
5. Service area wording: "Monterey County and surrounding areas." Never list Salinas as
   a separate area beside Monterey County; it is inside it. "Based in Salinas" as a
   location fact is fine.
6. Never name stack vendors or tools Ghosxt deploys. Client-side software a reader
   already uses (Microsoft 365, Google Workspace, Yardi, an EHR) may be named.
7. Never claim a certification, partnership, or vendor relationship that is not already
   on the live site or confirmed in writing by the owner. Do not infer credentials. Ask.
8. Structured data may only state what is visible on the page. A FAQPage question must
   appear word for word in the visible FAQ. No AggregateRating.
9. Do not target dental practices in any page, FAQ, blog post, or recommendation.
10. NAP (name, address, phone, email, hours) must match `contact.html` exactly
    everywhere, including JSON-LD and llms.txt. Flag inconsistencies; do not guess.
11. Pricing: do not change any number on `/pricing` or anywhere prices are repeated
    (`site-config.json` is the single source for review count and prices).
12. Never ship `[VERIFY]` markers, placeholder text, or HTML comments that reveal open
    questions in served pages. Resolve or remove before merge.
13. Do not delete files. Redirect instead (`_redirects`), and keep history.
14. Only the designated committer commits. Workers return diffs and summaries.

## Per-page requirements (every indexable page)

- One `<title>` under 60 characters, unique across the site, head keyword first.
- One meta description under 155 characters, unique, written as the answer a searcher
  wants, not a tagline.
- Exactly one `<h1>`. Heading levels never skip.
- Self-referential canonical. `robots` meta `index, follow` unless intentionally noindex.
- Open Graph (`og:type`, `og:url`, `og:title`, `og:description`, `og:image` 1200x630,
  `og:site_name`) and Twitter card tags (`summary_large_image`, title, description, image).
- JSON-LD in one `@graph`: `LocalBusiness` (`@id` `https://ghosxt.com/#business`) or a
  reference to it, `Service` for a service page (with `provider` pointing at the business
  `@id`, `areaServed`, `serviceType`), `FAQPage` when a visible FAQ exists,
  `BreadcrumbList` on every page below the home page, `BlogPosting` on posts.
- Answer-first opening: the first paragraph under the H1 states what the page offers,
  for whom, and where, in plain words, before any story.
- A visible FAQ with questions phrased the way buyers type them.
- Key-facts block (`class="key-facts"`) on every root page.
- Internal links: to `/pricing`, to the relevant service or vertical page, and at least
  three contextual inbound links from other pages (no orphans).
- Images: `alt` on every `<img>`, explicit `width` and `height`, `loading="lazy"` below
  the fold, modern formats (webp or avif) for photos.
- No render-blocking third-party CSS; fonts preloaded or swapped.

## Commit and PR conventions

- Branch names: `seo/<topic>-<yyyy-mm>` for this programme; never commit to `main`.
- Commit subject: imperative, under 72 characters, no trailing period. Body says why,
  names the AUDIT.md finding IDs it closes, and lists regenerated files.
- One concern per PR, a few hundred changed lines at most (generated files such as
  `llms-full.txt` or `sitemap.xml` do not count toward the limit but must be regenerated
  by the scripts, never by hand).
- PR body: What changed, Why (finding IDs), Acceptance test (copied from AUDIT.md, with
  the command and expected result), Visual impact (none, or screenshots plus the approval
  label), Facts introduced (each with its source: live page, owner message, or none).
- Reviewer rejects any PR that changes visuals without approval, introduces an unverified
  fact, or lacks its acceptance test.

## Verified facts live elsewhere

Business facts (credentials, capabilities, deliverables, support hours, prices, review
count) are confirmed by the owner and already visible on the live site. When a page and
the owner disagree, the owner wins and the page is a bug. When a claim cannot be traced to
the live site or an owner message, it does not ship.
