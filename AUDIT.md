# ghosxt.com SEO and AI-search audit

Date: 2026-10-25. Branch: `seo/audit-2026-10`. Tag of the audited commit: `pre-seo-2026-10`
(e4f22c3). Nothing on the site was changed in this pass. Every finding below has an ID,
a priority, the pages affected, evidence, the fix, and an acceptance test. The execution
order and the PR split are in HANDOFF.md.

Priorities: P0 blocks indexing, citation, or conversion. P1 has measurable ranking,
AI-citation, or Core Web Vitals impact. P2 is polish.

## Assumptions made because the owner was not available to answer

1. The site stays on its current light theme (Roboto, dark red #b71c1c, white
   backgrounds). The dark visual system the brief calls "locked" (#0a0a0a, #ff1f3a,
   Michroma, Inter) exists today only on the unmerged `/managed-ai` page (PR #260) and on
   the generated Open Graph cards. This audit proposes no palette or font change on either
   theme; it treats the split as decision D1 below.
2. The prior audit referred to as "August 2026" is the set of artifacts in `audit/`:
   the July 2026 fleet audit (`audit/report.md`, `audit/IMPROVEMENT-PLAN.md`), the
   September 2026 website pass (`audit/error-sweep-2026-09-10.md`,
   `audit/rankings-baseline.md`) and the 2026-09-28 SEO and AI-search plan
   (`audit/SEO-AI-PLAN.md`, `audit/VERIFY-LIST.md`). Items those files mark as done are not
   repeated here; items they left open and that are still open are re-stated with fresh
   evidence and a new ID.
3. Service area wording follows the owner's rule: "Monterey County and surrounding
   areas". Salinas is the base city, not a separate service area.
4. No Search Console, Business Profile, or analytics export was available. Every
   ranking statement below comes from the repo, the live site, Lighthouse, axe, a crawl,
   and one web-search API pass (`audit/queries.md`). Field Core Web Vitals (INP) are not
   measurable without Search Console or CrUX access.
5. "Mobile first" from the owner's instruction is applied as: mobile numbers lead every
   table, mobile budgets gate CI, and every UI observation is made at 390 px first.
6. The owner's first line asked for a pull request "to see the UI improvements". This
   pass is audit-only by the brief's own rules ("zero site files changed"), so the PR
   contains the baseline, guardrails, and the proposals, not UI changes. The mobile UI
   observations are in the section "Mobile UI observations" with screenshot references.

## Questions for the owner (answers change what the Opus session builds)

- D1 Brand direction: does the whole site move to the dark system on `/managed-ai`, or
  does `/managed-ai` adopt the light site chrome? Until answered, PR #260 cannot merge
  without shipping two design systems.
- D2 Credentials and proof to feature: which of the ten credentials on `/about` go in the
  CTA copy, and may proof content name clients? The home page names Villicana
  Transportation with a logo while `/case-studies` is anonymized and noindexed.
- D3 Entity name: is the legal and Business Profile name "Ghosxt" or "Ghosxt LLC"? The
  site uses both (PR #260 introduces "Ghosxt LLC" in JSON-LD).
- D4 The 129 remaining `[VERIFY]` markers in 30 served files (`audit/VERIFY-LIST.md`):
  Yes, No, or Later for each. The biggest groups: it-for-audited-companies (17),
  google-workspace-mac-it (13), penetration-testing (11), it-support-nonprofits (9).
- D5 Google Business Profile: exact name, primary category, service-area list, whether the
  address is hidden, and the Chamber listing phone fix from the September plan (1.6).
- D6 Search Console export (last 3 and 16 months, Queries and Pages, non-brand filter)
  and the indexing report. Without it the location-page verdict (L-03) stays provisional.
- D7 `sameAs` URLs to publish: LinkedIn company page, the Google Business Profile share
  link (already on the site), Chamber listing, any directory the owner controls.
- D8 Footer tagline "Government-grade IT for small business." (on 102 pages): keep, or
  replace with the thread "IT that sees it coming."
- D9 HSTS preload: has ghosxt.com been submitted to hstspreload.org? The header already
  carries `preload`.
- D10 Capabilities behind pages that are not in the confirmed list: VoIP
  (`/voip-business-phone-systems`), penetration testing (`/penetration-testing`),
  ransomware recovery as a named service (`/ransomware-recovery` and llms.txt
  "Emergency line"), Cisco Meraki and Catalyst deployment (`/network-design`,
  `/managed-it-services`).

## What was measured

- Repo at e4f22c3: 103 root pages, 165 blog files, 1 case study; 263 URLs in the
  sitemap plus 5 live noindex pages and `/blog/all` (268 URLs audited).
- Live site: Lighthouse 12.8.2 at mobile and desktop for all 268 URLs
  (`audit/baseline/lighthouse/`, summary in `audit/baseline/lighthouse-summary.md`),
  axe-core at 390x844 and 1366x768 (`audit/baseline/axe-summary.md`), a full crawl with
  link, redirect, orphan and duplicate checks (`audit/baseline/crawl/report.md`),
  rendered and raw HTML snapshots (`audit/baseline/html/`, `audit/baseline/html-raw/`),
  and screenshots at both widths for the representative page set
  (`audit/baseline/screenshots/`).
- Repo-level scans: title and meta lengths and uniqueness, H1 count, canonical, OG and
  Twitter tags, JSON-LD parse and type coverage, FAQPage text match, inbound link counts,
  5-gram similarity across the templated page families, html-validate 11.17 with the
  config in `.htmlvalidate.json`.
- Diff against the prior pass: confirmed closed (not re-reported): dental removed
  everywhere (0 word-boundary hits), em dashes gone from all HTML, every page has one H1,
  a canonical, a meta description and JSON-LD that parses, the CMMC page no longer claims
  SSP or POA&M authoring and names GCC High 27 times, the founder node references the
  canonical Person `@id`, review count is single-sourced (26 at 5.0), footer contrast was
  raised, `scripts/` and `audit/` are not served, the case study is noindexed, llms.txt no
  longer says "24/7 help desk", the service-area hub exists, extensionless redirects are
  301 and chain-free. Still open from the prior pass and re-stated here: the `[VERIFY]`
  markers (A-01), the Salinas hub duplicate sections (C-06), the cannibalization merges
  (C-02), the long titles (T-02), the two noindex draft pages (C-07), Business Profile and
  listings work (L-01), and the repo being public with internal docs in it (C-12).

## Baseline summary (production, 2026-10-25, one Lighthouse run per page and form factor)

Full tables: `audit/baseline/lighthouse-summary.md` (mobile first), per-audit counts in
`audit/baseline/lighthouse-failing-audits.md`, raw lean JSON per page in
`audit/baseline/lighthouse/`. Lab numbers move between runs on a shared host (home page
mobile performance ranged 70 to 88 across five runs with no content change), so read the
table for patterns and outliers; the CI budgets come from the 3-run local baseline.

| Form factor | Perf median (min) | A11y median (min) | BP median (min) | SEO median (min) | LCP median (max) | CLS median (max) | TBT median (max) |
|---|---|---|---|---|---|---|---|
| Mobile (268 pages) | 99 (68) | 100 (91) | 100 (79) | 100 (61) | 1.62 s (5.50 s) | 0.000 (0.068) | 0 ms (812 ms) |
| Desktop (268 pages) | 100 (85) | 100 (91) | 100 (78) | 100 (61) | 0.57 s (1.34 s) | 0.002 (0.154) | 0 ms (325 ms) |

Mobile outliers that are page defects (not run-to-run noise): `/website-development`
(perf 68, LCP 5.5 s), `/contact` (70, LCP 4.9 s, best practices 79), `/ctpat` (71, LCP
4.7 s), `/privacy-policy` (72, LCP 4.6 s), `/` (87, TBT 405 ms), `/about` (87, TBT 422
ms), `/ghosxt-cares` (93, LCP 2.7 s), `/pricing` (accessibility 93). The SEO score of 92
on 25 pages is one audit (`link-text`, T-18); 61 and 69 are the five noindex pages
(`is-crawlable`, expected). Spoke pages with 400 to 700 ms TBT on identical templates
(cloud-services-gilroy, web-design-seaside, managed-it-cost-monterey-county, zero-trust)
are host noise: the same templates measure 0 ms elsewhere and nothing in their markup
differs. Desktop outliers: `/support` CLS 0.154, `/blog/all` CLS 0.080, `/about` TBT
324 ms, `/ctpat` TBT 266 ms, `/` TBT 177 ms, `/contact` best practices 78.

Site-wide audits that fail on every page (mobile): `uses-long-cache-ttl` and
`cache-insight` (the analytics beacon and 1-hour CSS and JS, T-07), `unused-css-rules`,
`unminified-css` and `render-blocking-insight` (the icon-font stylesheet, T-05),
`legacy-javascript` (the Cloudflare beacon, third party, not fixable here),
`image-delivery-insight` (the 160 px logo in a 48 px slot, T-13), `uses-responsive-images`
on 164 pages (T-17). Core Web Vitals verdict: LCP and CLS are good on every templated
page at both widths; the work is on five one-off templates and the home page.

## P0 findings (do these first)

### A-01 P0: 129 `[VERIFY]` markers ship in the HTML of 30 live pages

Pages: it-for-audited-companies (17, noindex), google-workspace-mac-it (13, noindex),
penetration-testing (11), it-support-nonprofits-google-workspace (9),
it-support-remote-mac-teams (7), cloud-services (5), managed-it-cost-monterey-county (5),
case-studies/remote-google-workspace-onboarding (5, noindex), cmmc-compliance (4),
contact (4), pricing (4), zero-trust-security (4), healthcare-it-services (3),
managed-detection-response (3), network-design (3), salinas (3), managed-it-services (2),
pci-compliance (2), and 12 files with one marker each (full list:
`grep -c '\[VERIFY' *.html blog/*.html case-studies/*.html | grep -v ':0'`).
Evidence: `managed-it-services.html:465` reads "enterprise-grade firewalls on the
edge<!-- [VERIFY] -->, including Cisco Meraki<!-- [VERIFY] -->". Crawlers and LLM
retrieval read raw HTML; an assistant that quotes this page can also see the claim is
unverified. The contact page has four markers next to "We reply as soon as possible".
Fix: the owner answers `audit/VERIFY-LIST.md` (D4). For every Yes the marker is removed;
for every No the sentence is reworded to verified phrasing or cut; Later items are cut
from indexable pages and kept only in the two noindex drafts. Add the CI gate (already in
`.github/workflows/site-quality.yml`: the marker count may not rise; promote it to "must
be zero" once this lands).
Acceptance: `grep -rl '\[VERIFY' --include='*.html' . | wc -l` prints 0 for indexable
pages (the two noindex drafts may keep markers until C-07 is decided), and the rendered
snapshot diff shows no removed claim that the owner answered Yes.

### S-04 P0: FAQPage schema lists questions that are not on the page (24 pages)

Pages: salinas (2 of 10 questions), carmel (2/6), gilroy (2/6), hollister (2/6),
marina (2/5), pacific-grove (3/6), san-jose (1/6), santa-cruz (2/6), seaside (1/6),
watsonville (1/6), and 14 blog posts, worst: clicked-phishing-link-what-to-do (5 of 5
questions absent from the visible text), domain-name-security (3/3), edr-vs-antivirus
(3/3), employee-offboarding-it-security-checklist (3/3), business-email-compromise (3/4).
Evidence: script in this audit compares each `Question.name` against the page's visible
text after stripping scripts; the questions above never appear. Google's structured data
policy treats markup for content that is not visible as spam, and it is also exactly the
mismatch an AI assistant trips on when it quotes a question the page cannot answer.
Fix: for each page either add the missing question and its answer to the visible FAQ
block (wording identical to the JSON-LD), or remove the entry from the JSON-LD. For the
ten city hubs the missing questions are the local ones ("How fast can you get on-site to
Seaside?"), which are worth keeping visible but must not promise a response time the
owner has not confirmed (decision D4 of the prior pass).
Acceptance: `node audit/tools/check-seo-meta.mjs --only faq-visible` reports PASS; Rich Results Test on `/salinas` shows the
same question count as the visible FAQ.

### A-06 P0: the domain is absent from the non-Google index that AI assistants read

Evidence: `audit/queries.md`. One web-search API pass (US exit, no location bias) on ten
target queries returned ghosxt.com for none of them, including the brand query
"ghosxt.com managed IT Salinas Monterey", while Adaptive Information Systems, SRS
Networks, Rayne, Alvarez, ZAG and Got.net appeared. The 2026-09 Google spot checks found
ghosxt.com for 2 of 10 phrases, so this is not only a Google ranking problem; the domain
may be thin or missing in the Bing-fed and Brave-fed indexes that ChatGPT, Copilot and
Claude lean on (`audit/SEO-AI-PLAN.md`, table "How each assistant finds local
businesses"). This is the single biggest lever for the AI-search KPI and it is off-site.
Fix (owner, 2 hours): run `site:ghosxt.com` on bing.com and search.brave.com and record
the counts in `audit/queries.md`; claim Bing Webmaster Tools, import the Google property,
submit the sitemap; trigger IndexNow for every URL in `sitemap.xml` using the key file
already served at `/bcd424e6a5643855bb548dce9676fc59.txt` (the Opus session prepares the
URL list and the curl call); complete the Business Profile and Bing Places entries with
the same NAP as `contact.html` (L-01). Re-run the panel in `audit/queries.md` after 30
days.
Acceptance: `site:ghosxt.com` on Bing returns at least the 98 root pages; the panel's
brand query returns ghosxt.com on every surface; at least 3 of the 12 target queries
name Ghosxt on at least one AI surface within 60 days.

### C-01 P0: the Managed AI governance page exists but cannot merge as written (PR #260)

Pages: `managed-ai.html` on branch `feature/managed-ai`, plus 267 files that receive a
nav and footer link. Evidence: PR #260 is a draft with `mergeable_state: dirty` (behind
main by 5 merged PRs), it introduces a page-scoped dark theme (background #0a0a0a,
Michroma, Inter) under the shared white nav, and it sets `theme-color` to white because
the nav is white. The content itself is the strongest answer-first page on the site:
the lead states the blind spot and the service in four sentences, the key-facts block
already uses "Monterey County and surrounding areas", the FAQ is phrased the way buyers
ask ("Is it safe to let employees use ChatGPT with company data?"), pricing is "quoted
upfront" with no numbers, no stack vendor is named, and the JSON-LD matches the visible
text. It names "Ghosxt LLC" in JSON-LD where every other page says "Ghosxt" (D3) and
lists an audience of "5 to 50 employees" that no other page states.
Why P0: the recent inbound leads came from AI assistants on compliance plus MSP plus
location queries, and AI governance is the one of those lanes with a named national
category (IronEdge, Integris) and no local entrant (`audit/queries.md` row 10). Every week
the page is unmerged is a week the category forms without Ghosxt in it.
Fix: (1) merge `main` into `feature/managed-ai` and resolve the nav and sitemap
conflicts; (2) apply decision D1: either restyle the page onto the shared light chrome
(no new CSS file, locations layout, same tokens as `/cmmc-compliance`) or get written
approval that the dark system is the new site direction and schedule the rest of the site
to follow in a design PR series; (3) align the business name with D3; (4) keep every
sentence of the lead and the FAQ; (5) after merge, regenerate `llms-full.txt`, `feed.xml`
is unaffected, submit the URL via IndexNow and request indexing in Search Console.
Acceptance: `/managed-ai` returns 200 with `index, follow`, appears in `sitemap.xml`
and `llms.txt`, passes the site-quality workflow (including the screenshot diff with the
owner's `visual-change-approved` label on the one new page), and the visible FAQ matches
the FAQPage JSON-LD word for word.

## Technical findings

### T-01 P1: two blog posts share their title with a service page

Pages: `zero-trust-security.html` and `blog/zero-trust-security-small-business-2026.html`
(both "Zero Trust Security for Small Business | Ghosxt"); `penetration-testing.html` and
`blog/penetration-testing-small-business-2026.html` (both "Penetration Testing for Small
Business | Ghosxt"). Evidence: title uniqueness scan in this audit; the service page and
the post compete for the same query with identical titles and near-identical metas.
Fix: retitle the posts as guides ("Zero Trust for a Small Business: Where to Start
(2026) | Ghosxt", "Penetration Testing for Small Business: What It Costs and Covers |
Ghosxt"), rewrite their metas, and add a "Need this done? See the service" link from
each post to the service page; keep the service page titles.
Acceptance: the duplicate-title scan prints 0 groups; both posts link to their service
page in the body.

### T-02 P1: 13 titles over 60 characters and 9 meta descriptions over 155

Pages: all 13 titles are blog posts (worst: it-setup-checklist-new-small-business-2026
at 96 characters, microsoft-365-copilot-oversharing at 86, browser-in-the-browser at
84); metas: 8 blog posts and `cloud-services.html` (161). Evidence: `python3
scripts/check-title-meta-length.py` exits 1 with the list. Fix: trim each to the limit
with the head keyword first. Acceptance: the script exits 0; CI job `static-checks`
stays green.

### T-03 P1: www.ghosxt.com serves the full site with 200 instead of redirecting

Evidence: `curl -sI https://www.ghosxt.com/` returns HTTP/2 200 with the same HTML and
canonical as the apex. Canonicals point at the apex, which limits the damage, but every
URL is crawlable twice, AI crawlers that ignore canonicals can cite the www host, and
link equity splits when someone links to www. Fix: 301 www to the apex at the edge
(a Cloudflare redirect rule, or a hostname check at the top of `src/worker.js` that
returns 301 to `https://ghosxt.com` plus the path). Acceptance: `curl -sI
https://www.ghosxt.com/pricing` returns 301 with `location: https://ghosxt.com/pricing`.

### T-04 P2: slash normalization uses 307 (temporary) redirects

Evidence: `/blog` returns 307 to `/blog/`, `/salinas/` returns 307 to `/salinas`
(Cloudflare's default `auto-trailing-slash` behaviour). `/about.html` to `/about` is
already a 301 because `_redirects` upgrades it. Fix: add explicit 301 rules for the two
directory indexes (`/blog /blog/ 301`, `/case-studies /case-studies/ 301` if used) and
accept the trailing-slash 307s for single pages (no inbound links use them; the crawl
report lists any that do). Acceptance: `curl -sI https://ghosxt.com/blog` returns 301.

### T-05 P1: a 429 KB icon font is the heaviest asset on every page

Evidence: Lighthouse home mobile: `uicons-regular-straight` webfont 429,300 bytes plus
40,404 bytes of CSS of which 39,752 bytes (99%) is unused; it is the largest item in the
599 KiB total page weight and a third-party origin (cdn-uicons.flaticon.com) with its own
connection, CSS and font-face swap. The site uses a few dozen glyphs (phone, calendar,
angle, burger, envelope, cookie, checks). Fix: replace the icon font with inline SVG for
the glyphs in use (same glyph outlines, same size and color, so no visual change) or a
subset woff2 self-hosted with `font-display: swap`; drop the CDN stylesheet and its
preconnect; remove the `'unsafe-hashes'` onload swap for that stylesheet; update the CSP
`font-src` and `style-src` to drop the flaticon origin. Acceptance: no request to
flaticon.com in the Lighthouse network records; total byte weight on `/` under 200 KiB;
screenshot diff reports 0 changed pixels at both widths (or only anti-aliasing under the
0.1% threshold).

### T-06 P1: the home page is heavy on the main thread (mobile TBT 410 ms, DOM 2,051)

Evidence: Lighthouse home mobile: performance 87, main-thread work 6.6 s ("Other" 4.0 s,
"Style and Layout" 1.3 s), DOM 2,051 elements with depth 17 inside
`div.server-unit > div.led-group`, forced reflow attributed to `why.min.js` and
`index.min.js`, render-blocking `index.min.css` (77 KB minified, 408 ms). LCP element is
the H1 at 2.1 to 2.2 s, FCP 2.0 s. Desktop is not clean either: `index.min.js` costs 2.3 s of script bootup on desktop (TBT
177 ms), and `/about` and `/ctpat` each run an inline script in the page itself for 1.2
to 1.3 s (TBT 324 ms and 266 ms on desktop), which is the counter or reveal animation on
those templates. Fix (visually neutral):
(1) reduce the 19 repeated server-rack blocks to one template instantiated by CSS
`counter` or by cloning with JS after first paint, which removes about 1,000 nodes;
(2) batch the layout reads in `why.min.js` and `index.min.js` (read sizes once, then
write) to clear the forced reflow; (3) split `index.css` so the above-the-fold hero rules
load first and the rest loads with `media="print"` swap, as already done for fonts;
(4) keep animations on `transform` and `opacity` only. Acceptance: Lighthouse mobile on
`/`: performance 90 or better over 3 runs median, TBT under 200 ms, DOM under 1,500, with
the CI budget in `audit/ci/lighthouserc.mobile.json` set accordingly; screenshot diff 0
changed pixels.

### T-07 P2: the HTML cache rule in `_headers` never matches the URLs people visit

Evidence: `_headers` sets `/*.html` to `max-age=300`, but the canonical URLs are
extensionless; live `/about` returns `cache-control: public, max-age=0, must-revalidate`
while `/` returns `max-age=300`. Cloudflare still caches at the edge (`cf-cache-status:
HIT`), so the cost is one conditional request per navigation per visitor. Fix: set the
HTML cache header in `src/worker.js` for `text/html` responses (300 s) and leave
`_headers` for assets; raise CSS and JS to `max-age=604800` since every reference carries
a `?v=` stamp from `minify.py --stamp`. Acceptance: `curl -sI https://ghosxt.com/about |
grep -i cache-control` shows `max-age=300`.

### T-08 P2: web fonts are loaded from Google Fonts in four weights

Evidence: 309 pages load Roboto 400/500/600/700 from fonts.googleapis.com with a preload
of the CSS and a print-media swap; two extra origins (googleapis, gstatic) and 55 KB of
font on first view. Roboto has no 600 weight, so that request is wasted. Which font the
site uses depends on D1 (Roboto today, Inter and Michroma in the brief). Fix after D1:
self-host the chosen family as woff2 (latin subset), preload the regular and bold files,
`font-display: swap`, drop the two preconnects, drop the Google origin from CSP
`font-src` and `style-src`. Acceptance: no request to googleapis or gstatic in the
Lighthouse network records; FCP on `/` improves or holds; screenshot diff 0 changed
pixels when the same family is kept.

### T-09 P2: sitemap `lastmod` is carried forward, not computed

Evidence: `scripts/generate-sitemap.py` keeps existing `lastmod` values and only stamps
new URLs; the sitemap has 263 `lastmod` entries between 2026-05-10 and 2026-10-24 and
exactly 2 `priority` tags. A page edited in October can still say May. Fix: compute
`lastmod` from `git log -1 --format=%cs -- <file>` in the generator, remove the two
orphan `priority` tags. Acceptance: `lastmod` for `cmmc-compliance.html` equals the date
of its last content commit.

### T-10 P2: Open Graph cards render in a fallback font

Evidence: `scripts/generate-og-images.py` falls back to DejaVu Sans when
`scripts/fonts/Roboto-*.ttf` are missing, and `scripts/fonts/` does not exist; the 274
cards in `assets/img/og/` (13 MB) use the fallback. The cards already use the dark brand
look (near-black field, red bar, white type), which is a point in favour of D1. Fix after
D1: add the chosen fonts to `scripts/fonts/` and regenerate; this is a visual change to
social cards only and needs the approval label. Acceptance: regenerated
`assets/img/og/home.png` shows the brand font.

### T-11 P2: HSTS carries `preload` but the preload-list status is unknown

Evidence: `strict-transport-security: max-age=31536000; includeSubDomains; preload` on
every response; `http://ghosxt.com/` returns 301 to https. Fix: the owner checks
hstspreload.org and submits if not listed (D9). Acceptance: hstspreload.org reports
"preloaded".

### T-12 P2: markup hygiene flagged by html-validate

Evidence (`.htmlvalidate.json`, run over all 269 files): `blog/all.html:1080` skips from
h1 to h3 (error, downgraded to warn for the CI gate until fixed); 1,654 `<button>` without
`type` (nav toggle, FAQ, cookie banner, calculator); 29 raw `&` that should be `&amp;`;
24 `<div>` inside `<label>` and 6 labels tied to multiple controls on `/pricing`; 15
non-native sections. None of these breaks rendering; the pricing label structure is the
one with an accessibility effect (X-03). Fix: add `type="button"` in
`scripts/_chrome_source.html` and re-apply chrome; fix the h3 in `blog/all.html`; encode
the ampersands. Acceptance: html-validate with `no-implicit-button-type` and
`heading-level` promoted to `error` passes on every page.

### T-13 P2: the logo is served at 160 px for a 48 px slot

Evidence: Lighthouse image-delivery on `/`: `ghosxt-logo-160.webp` 7,156 bytes, 6,772
wasted at the rendered size. Fix: add a 96 px variant for the nav (2x of 48) and keep
160 px for the footer. Acceptance: the audit no longer lists the logo.

### T-14 P1: Lighthouse budgets now gate regressions in CI

Not a defect; the guardrail. `audit/ci/lighthouserc.mobile.json` and `.desktop.json`
hold per-page floors and ceilings generated from the local-server baseline
(`audit/baseline/lighthouse-local/`) for the 16 representative pages in
`audit/ci/representative-pages.txt`. Accessibility, best practices, SEO and CLS are hard
gates; performance score, LCP and TBT are warnings because a two-page smoke run on this
host under load measured TBT at three times the quiet baseline, and GitHub's runners are
another machine again. Loosening a budget needs a PR that says why.
Acceptance: the `lighthouse` jobs in `site-quality.yml` pass on `main`.

### T-15 P1: one internal link 404s and the service-area hub is unlinked

Evidence (`audit/baseline/crawl/report.md`): `blog/device-code-phishing-microsoft-365-small-business-2026` links
`/microsoft-365-small-business-settings-to-turn-on-2026` (missing the `/blog/` prefix),
which returns 404; `/service-area` is in the sitemap with zero inbound internal links from
any page (not nav, not footer, not body). Everything else resolves: 268 of 268 sitemap
URLs return 200, no redirect chains, no internal link points at a redirect, every
canonical is self-referential. Fix: correct the href; link `/service-area` from the footer
service-area line (C-09) and from the four county pages and `/services`. Acceptance:
`node audit/tools/ci-crawl-gate.mjs <crawl>` passes with both entries removed from
`audit/ci/known-broken-links.txt` and `audit/ci/known-orphans.txt`.

### T-16 P2: 28 external links return 404, 403, 429 or nothing

Evidence: crawl section 5. Likely real breakage (confirm in a browser): 14
`support.google.com/a/answer/...` links across `blog/offboard-contractor-google-workspace-checklist`,
`blog/google-workspace-backup-small-business-2026` and
`blog/microsoft-365-vs-google-workspace-small-business-2026`; `pauldavispartnership.com`
(a portfolio link on `/website-development`, unreachable); `pts247.com` (unreachable) in
the Top 5 providers post; `cpuc.ca.gov/firethreatmaps` and the PG&E PSPS map (404). Likely
bot protection, leave alone: hhs.gov, dodcio.defense.gov, leginfo.legislature.ca.gov,
github.com (403), instagram.com (429), srsnetworks.net (403). Fix: replace or remove the
dead ones; the Google support links should point at the current article URLs. Acceptance:
the weekly external-links job lists no 404 or unreachable targets outside the
bot-protected list.

### T-17 P1: two images are served far larger than their slots on almost every page

Evidence (Lighthouse `uses-responsive-images`, mobile, 114 of the first 119 pages):
`assets/img/ulises.avif` (the author bio photo on every blog post) wastes about 50 KB per
page; `assets/img/ghosxt-cta.webp` wastes 69 KB of 82 KB on `/about` and the pages that
share the CTA band. Both are decorative at a small rendered size. Fix: export each at
1x and 2x of its rendered width and add `srcset` and `sizes`; keep the same crop so the
screenshot diff stays clean. Acceptance: `uses-responsive-images` lists neither file on
`/about` or on a blog post; visual diff 0 changed.

### T-18 P1: "Learn more" anchor text on the vertical pages

Evidence (Lighthouse `link-text`, SEO 92 instead of 100): `/agriculture-it-services` has
six links whose text is "Learn more" pointing at `/managed-it-services`,
`/cybersecurity`, `/network-design` and `/cloud-services`; the other vertical pages use
the same card pattern (confirm in `lighthouse-failing-audits.md`). Generic anchors waste
the internal-link signal the compliance and service pages need (C-05). Fix: anchor text
names the destination ("Managed IT for growers", "Cybersecurity for packers"). Visual
change is text only, within the same card; the diff job will flag it, so batch it with
PR C1 and have the owner approve. Acceptance: `link-text` passes on every vertical page;
SEO score 100.

### T-19 P2: 45 root pages have no `twitter:image`

Pages: all 11 `web-design-<city>`, all 10 `it-help-<city>`, 6 `cloud-services-<city>`,
6 `cybersecurity-<city>`, and 12 others including `break-fix-vs-managed-it`
(`node audit/tools/check-seo-meta.mjs --only og-twitter` lists them). Evidence: the
pages carry `og:image` and `twitter:card` but not `twitter:image`, so X and the apps
that read the Twitter tags first fall back to no image. Fix: add
`<meta name="twitter:image" content="<same as og:image>">` to each page. Acceptance:
the check reports PASS.

### T-20 P1: five one-off templates do not paint until the web fonts arrive

Pages: `/contact`, `/ctpat`, `/website-development`, `/privacy-policy`, `/ghosxt-cares`
(the pages with their own hero CSS instead of the locations layout). Evidence: observed
first paint 516 to 583 ms, right after the Roboto files (427 ms) and the 429 KB icon font
(496 to 508 ms) finish, against 290 ms on `/managed-it-services` where text paints before
any font arrives; Lighthouse therefore simulates FCP and LCP at 4.6 to 5.5 s on mobile and
scores these pages 68 to 72 while the rest of the site scores 98 to 100. The LCP element
on each is the hero subtitle paragraph. Hypothesis to confirm with a filmstrip: the first
paint on these templates is an icon glyph or font-dependent element, so nothing paints
until the icon font resolves. Fix: T-05 (inline SVG icons, no icon font) and T-08
(self-hosted text font with `font-display: swap` and a preload) remove the dependency;
until then, add `font-display: swap` for the icon font through a local `@font-face`
override and make sure the hero text has a system fallback that paints. Acceptance:
simulated mobile FCP under 2.0 s and LCP under 2.5 s on all five pages; performance 90
or better; screenshot diff 0 changed.

### T-21 P1: the contact page loads Calendly, Stripe and third-party cookies before any click

Page: `/contact`. Evidence: total page weight 4,646 KiB (the rest of the site is about
600 KiB) of which Calendly 2,983 KiB, cloudflare.com (Turnstile) 844 KiB, Stripe 294 KiB;
Lighthouse `third-party-cookies` lists `__cf_bm` and `_cfuvid` from calendly.com and `m`
from m.stripe.com; `bf-cache` fails; best practices score 79 mobile, 78 desktop. The
inline Calendly widget (`div.calendly-inline-widget` plus `assets/external/widget.js`)
loads the full scheduler and its payment provider on page load, and sets cookies before
the site's own cookie banner is answered. Fix: load Calendly on intent, not on load:
render a static placeholder in the same box (owner-approved, since the box changes
visually before the click) with a "Pick a time" button that injects `widget.js` and the
inline widget on click or when the box scrolls into view after consent; keep Turnstile
as is. Acceptance: no request to calendly.com or stripe.com in the Lighthouse network
records for `/contact` before interaction; `third-party-cookies` passes; total byte
weight under 1 MiB; best practices 100.

### T-22 P1: layout shift on `/support` (desktop CLS 0.154) and nav shift from the icon font

Evidence: on `/support` desktop the `aside.key-facts` block moves (shift score 0.152)
after first paint; on `/blog/all` desktop the `nav .navbar-right` moves (0.067) and the
same 0.001 to 0.002 nav shift appears on every page at both widths, which matches the
phone and calendar icons swapping in when the icon font arrives. Fix: reserve the icon
box size (fixed `width` and `height` on `.fi` in the nav, or inline SVG per T-05); on
`/support` find what inserts above the key-facts block after load (the remote-session
widget or an injected notice) and reserve its height. Acceptance: desktop CLS under 0.05
on `/support` and `/blog/all`; nav shift absent from `layout-shifts` on `/`.

## Structured data findings

### S-01 P1: the business entity has 15 different names and 4 incomplete copies

Evidence: 41 `LocalBusiness` nodes site-wide. 27 are named "Ghosxt"; 14 city and county
pages name it "Ghosxt – Managed IT Services Carmel", "... Monterey County", and so on
(one per page); PR #260 adds "Ghosxt LLC". Three nodes have no `address`, one has no
`telephone`. All share `@id https://ghosxt.com/#business`, which is correct, but
consumers that read one page see a different name than consumers that read another.
Fix: one canonical node body (name per D3, `url`, `telephone` +18312040501, `email`
sales@ghosxt.com, `address` Salinas CA 93901 US with no street, `areaServed` per S-05,
`openingHoursSpecification` Mon to Fri 08:00 to 18:00, `image`, `sameAs` per S-07),
emitted identically by every page from `scripts/_chrome.py`, with the page-specific
`Service` nodes referencing it by `@id`. Acceptance: a script asserts every
`LocalBusiness` node equals the canonical body; `check-chrome-drift.py` is clean.

### S-02 P1: 57 root pages have no business node at all, and 22 `Service` nodes have no `provider`

Pages: all 11 `cybersecurity-<city>`, all 11 `cloud-services-<city>`, all 11
`web-design-<city>`, all 10 `it-help-<city>`, plus `break-fix-vs-managed-it`,
`cmmc-compliance`, `co-managed-it`, `cyber-insurance-compliance`, `hipaa-it-compliance`,
`managed-detection-response`, `msp-partners`, `pci-compliance`, `penetration-testing`,
`ransomware-recovery`, `service-area`, `services`, `voip-business-phone-systems`,
`zero-trust-security` (57 of the 98 indexable root pages). Evidence:
`node audit/tools/check-seo-meta.mjs --only business-node,service-provider`; these pages carry `Service`,
`FAQPage` and `BreadcrumbList` but no `LocalBusiness` or `Organization`, so the
`provider` either is missing (22 nodes) or points at an `@id` that is not defined on the
page. An AI or search parser reading the page in isolation cannot tell who provides the
service or where. Fix: every page emits the canonical business node from S-01, and every
`Service` has `"provider": {"@id": "https://ghosxt.com/#business"}`, `serviceType`, and
`areaServed`. Acceptance: `node audit/tools/check-seo-meta.mjs --only business-node,service-provider`
reports PASS for both.

### S-03 P1: BreadcrumbList is missing on six indexable root pages

Pages: `about`, `contact`, `ctpat`, `ghosxt-cares`, `pricing`, `website-development`
(the home page correctly has none). Evidence: type scan. Fix: add the two-item
breadcrumb (Home, page) matching the visible breadcrumb nav, which these pages also lack
except `ctpat`. Acceptance: type scan reports BreadcrumbList on every root page except
`index.html`, `404.html` and `privacy-policy.html`.

### S-05 P1: `areaServed` has no canonical model

Evidence: the home node lists 11 cities plus an 80 km GeoCircle centred on Salinas (San
Jose is about 95 km away, outside the circle); city pages list subsets; county pages use
`AdministrativeArea`; `contact.html` key facts say "Salinas, California; remote support
available nationwide"; `/service-area` says four counties; PR #260 says "Monterey County,
CA". Fix: one list on the canonical node: four `AdministrativeArea` entries (Monterey
County, Santa Cruz County, San Benito County, Santa Clara County, each
`containedInPlace` California) followed by the cities that have pages; drop the
GeoCircle; put the same phrase in every key-facts "Service area" row: "Monterey County
and surrounding areas (Santa Cruz, San Benito and Santa Clara counties); remote support
nationwide". Acceptance: every `LocalBusiness.areaServed` is identical; `grep -c
"Monterey County and surrounding areas" *.html` equals the number of root pages with a
key-facts block (101).

### S-06 P2: `WebSite.potentialAction` advertises a site search that does not exist

Evidence: `index.html:238` `"target": "https://ghosxt.com/?s={search_term_string}"`; no
page has a search form, and `/?s=test` serves the home page. Fix: remove the
`SearchAction`. Acceptance: Rich Results Test on `/` shows no Sitelinks search box
markup.

### S-07 P1: no `sameAs` on the business or the founder

Evidence: `Organization`/`LocalBusiness` nodes carry no `sameAs`; the `Person` node
links only `https://ulisespaiz.com/`. Entity resolution for AI answers leans on exactly
these cross-links (Business Profile, LinkedIn, Chamber, directory profiles). Fix: add
`sameAs` arrays with the URLs the owner supplies (D7); never invent one. Acceptance: the
canonical node carries the agreed URLs and each returns 200.

### S-08 P2: service pages carry no modification date

Evidence: only 8 pages have a `WebPage` node; no service page states `dateModified`,
so freshness is invisible to crawlers that weigh it. Fix: emit a `WebPage` node per page
with `dateModified` from the file's last content commit (same source as T-09), and a
visible "Updated <month year>" line in the key-facts block. Acceptance: the type scan
shows `WebPage` on every root page; the visible date equals the JSON-LD date.

Validated and not a finding: all 269 JSON-LD blocks parse; pricing `Offer` values
(600, 125, 175, 250) match `site-config.json`; `BlogPosting` on every post with
`datePublished`, `dateModified`, `articleSection` and the canonical `Person`;
`BreadcrumbList` items all resolve to ghosxt.com URLs; the `Person` credential list
matches the ten credentials on `/about`.

## AI-search findings

### A-02 P1: service pages do not open with the answer

Evidence: the lead paragraph on `/managed-it-services` is 180 words and names the
service, the area and the pricing pointer only at the end; `/cybersecurity`,
`/cmmc-compliance`, `/hipaa-it-compliance`, `/pci-compliance`,
`/cyber-insurance-compliance`, `/managed-detection-response` follow the same pattern
(blind spot first, which is right, then two to five sentences of story before the plain
statement). `/pricing` and the draft `/managed-ai` already do it right: one blind-spot
sentence, then "Ghosxt is a managed IT and cybersecurity provider in Salinas,
California, run by owner Ulises Paiz. Published pricing: ...". AI assistants and
featured snippets quote the first 40 to 60 words.
Fix: rewrite every service, compliance and vertical lead to the two-sentence pattern,
under 70 words: sentence one is the blind spot in the client's words; sentence two is
"Ghosxt provides <service> for <who> across Monterey County and surrounding areas, run by
the owner, with published pricing" (or the page's true scope). Move the story into the
first H2 section unchanged, so no copy is lost. The exact question each page must answer
is in the "Recommended page set" table below. Pages: the 20 service and compliance pages
and the 10 vertical pages listed in that table.
Acceptance: for each page, the first 70 words of the lead contain the service name,
"Monterey County", and either "pricing" or who it is for; the reviewer reads each lead
aloud and can answer "what, for whom, where" without reading further.

### A-03 P1: FAQ questions are not phrased the way the AI-lead queries were

Evidence: the leads that converted asked "<compliance> MSP near <location>". Current
compliance FAQs are good on substance but phrased as policy questions ("Can you get us a
SPRS score and write our SSP and POA&M?"); no compliance page has a question that
contains both the framework and the location, and none asks "who do I talk to" in those
words except the generic "Who will I actually talk to?". Fix: add the questions listed
per page in "FAQ list per service page" below, visible and mirrored in FAQPage; answers
stay factual and short. Acceptance: each listed question appears in the visible FAQ and
the JSON-LD of its page; S-04 scan stays at 0 mismatches.

### A-04 P1: the entity describes itself differently across pages

Evidence: name "Ghosxt" vs "Ghosxt LLC" (D3); geography "California" in 20 core titles
("| Ghosxt – California"), "California's Central Coast & Bay Area" in key facts,
"Central Coast" in llms.txt, "Monterey County and surrounding areas" in PR #260;
tagline "Government-grade IT for small business." in 102 footers and "government-grade"
in 102 page bodies vs the home H1 "that stops problems before they start" and the
owner's thread "IT that sees it coming"; the home subtitle says "in Salinas and across
Monterey County" (Salinas listed as a separate area, against the owner's rule).
Fix: one description sentence used in `LocalBusiness.description`, llms.txt line 1,
the home subtitle, and the `og:description` of the home page; one geography phrase
(S-05); one tagline (D8); title suffix for core service pages becomes "in Monterey
County | Ghosxt" (A-05). Acceptance: `grep -c` for the retired phrases returns 0;
`llms.txt`, `index.html` JSON-LD description and the home subtitle are identical in
substance.

### A-05 P1: the compliance pages carry no location in title, meta, H1 or opening sentence

Pages: `cmmc-compliance`, `hipaa-it-compliance`, `ctpat`, `pci-compliance`,
`cyber-insurance-compliance`, `managed-detection-response`, `zero-trust-security`,
`penetration-testing`. Evidence: titles end in "for Small Business | Ghosxt" or
"| Ghosxt"; key facts say "California's Central Coast & Bay Area"; the lead paragraphs
say "Central Coast" once, late. The queries that produced the recent leads were
compliance plus MSP plus location; the pages answer compliance plus MSP only, and the
search pre-fill found no Central Coast competitor at all for CMMC, HIPAA or C-TPAT
(`audit/queries.md` rows 7 to 9), so the lane is open. Fix: new titles and metas per the
HANDOFF spec table (for example "CMMC Compliance IT for Defense Contractors in Monterey
County | Ghosxt" is 73 characters, so the spec uses "CMMC IT Services, Monterey County
Defense Contractors | Ghosxt" at 60), the location phrase in the first sentence of the
lead (A-02), and the key-facts row (S-05). Acceptance: each page's title contains
"Monterey County" and is 60 characters or fewer; the lead's first sentence contains it.

### A-07 P1: llms.txt and llms-full.txt need three corrections and one addition

Evidence: `llms.txt` line for `/ransomware-recovery` reads "Ransomware Recovery &
Emergency IT ... Emergency line (831) 204-0501", which implies standing emergency
coverage the owner has said is not offered (support is 8am to 6pm Pacific, after-hours on
request); `llms.txt` has no entry for `/managed-ai` (add on merge of C-01);
`llms-full.txt` is 798 KB, far beyond what most assistants fetch, so the pages that
matter sit behind 160 blog posts; the geography line says "Central Coast and beyond"
(A-04). Fix: reword the ransomware line to the verified phrasing ("4-hour notification
commitment on critical incidents; restoration from cloud backup"), add `/managed-ai`,
cap `llms-full.txt` to the service, compliance, vertical, pricing, about and contact
pages plus the 20 best guides (target under 200 KB) by giving `generate-llms-full.py` an
allow-list, and apply the one geography phrase. Acceptance: `llms.txt` contains no
"Emergency line"; `wc -c llms-full.txt` under 204800; both files list `/managed-ai`.

### A-08 P2: no freshness signal on service pages

Same fix as S-08; listed here because AI retrieval ranks fresher pages for "2026"
queries. Acceptance: as S-08.

## Content findings

### C-02 P1: cannibalization merges from the September plan are still open

Evidence: `blog/managed-it-services-cost-salinas-2026.html` ("How Much Does Managed IT
Cost in Salinas in 2026?") and `/managed-it-cost-monterey-county` both exist and both
are listed in llms.txt; `blog/cyber-insurance-small-business-2026` vs
`/cyber-insurance-compliance`; the vCIO post vs `/it-consulting-vcio`;
`blog/best-it-support-in-salinas` vs `blog/best-it-support-in-monterey`; the three
Microsoft 365 Copilot posts. Fix (one PR per pair): merge the cost post into the root
page and 301 the post; re-angle the cyber-insurance post to "what the policy covers";
trim the vCIO post to a pointer; differentiate or merge the two best-IT-support posts;
give the Copilot trio distinct readers and cross-links. Acceptance: `_redirects`
carries the 301, the sitemap and llms.txt no longer list the merged URL, and the
surviving page links to the other.

### C-03 P1: proof content is inconsistent and mostly hidden

Evidence: `index.html:2359` names "Villicana Transportation" with a logo
(`assets/img/villicana.webp`) in the testimonial block; `case-studies.html` is noindex
and anonymized ("Professional-services firm, 5 staff, name withheld"); the single case
study is noindex with 5 `[VERIFY]` markers; `assets/img/projects/` holds four named
client images. Every local competitor in the search pre-fill shows named work. Fix per
D2: if clients may be named, publish `case-studies.html` (index, follow) with the named
testimonials already on the home page, add `Review` markup only for reviews visible on
the page, and resolve the case study's markers; if not, anonymize the home testimonial
and remove the client images from the served tree (move, do not delete). Acceptance:
`/case-studies` returns `index, follow` and appears in the sitemap and llms.txt, or the
home page contains no client name; in both cases the home page and the case-studies
page agree.

### C-04 P2: the lead path has two front doors and one is off-site

Evidence: every primary CTA ("Book a Free Assessment", nav "Book a Call", the mobile bar
"Book") opens Calendly in a new tab; the contact form requires four fields (name,
company, email, message) plus Turnstile, with phone and "How did you find us?" optional.
The form posts to the Worker with a 5 per minute rate limit and a honeypot. Friction is
moderate; the bigger issue is that the Calendly path leaves the site before any tracking
and the form path has no stated response expectation except "as soon as possible"
(marked `[VERIFY]` four times). Fix: make "Company" optional (sole proprietors are a
target), state the support hours next to the form ("Replies come from the owner, 8am to
6pm Pacific, Monday to Friday"), and keep Calendly as the second CTA on every page with
the local credibility line in the CTA copy ("Serving Monterey County and surrounding
areas since 2021", once the year is confirmed). Acceptance: the form submits with three
required fields; the hours line is visible on `/contact`; no `[VERIFY]` on the page.

### C-05 P1: weak internal linking to the pages that answer the target queries

Evidence: in-body inbound links (excluding nav and footer): `/service-area` 0 (and zero inbound links of any kind, per the crawl),
`/msp-partners` 1, `/case-studies` 2, `/zero-trust-security` 3, `/co-managed-it` 3,
`/break-fix-vs-managed-it` 3, every `cloud-services-<city>` 4, `/cmmc-compliance` 5. The
compliance pages are reachable from the nav only through "C-TPAT Compliance"; CMMC,
HIPAA, PCI and cyber-insurance are not in the nav or the footer Services column at all.
Fix: add a "Compliance" group to the Services dropdown and the footer Services column
(CMMC, HIPAA, PCI, C-TPAT, Cyber insurance, Managed AI after C-01); link `/service-area`
from the footer "Service Areas" heading and from every county page; add one contextual
link to the matching compliance page from each vertical page (manufacturing to CMMC,
healthcare to HIPAA, hospitality to PCI, trucking to C-TPAT, professional services to
cyber insurance). Acceptance: every compliance page has at least 8 in-body inbound
links; `/service-area` has at least 5.

### C-06 P1: the Salinas hub still duplicates six service pages

Evidence: `salinas.html` is 3,553 words against a 1,578-word median for the other city
hubs, with full sections "Salinas Managed IT Services", "Salinas IT Support and Help
Desk", "Salinas Cybersecurity Services", "Salinas Microsoft 365 Support", "Salinas Backup
and Disaster Recovery", "Salinas Network Support" (the July plan's item 1.10, never
done). Fix: trim each service section to an 80-word teaser that links its service page
and its `cybersecurity-salinas` or `cloud-services-salinas` spoke; keep the local
sections (South County, onboarding, industries, FAQ). Acceptance: `salinas.html` under
2,000 words; each service teaser links exactly one spoke; the page keeps its title, H1
and key facts.

### C-07 P1: two finished vertical pages sit noindexed with 30 unverified claims

Pages: `google-workspace-mac-it.html` (13 markers), `it-for-audited-companies.html`
(17 markers). Evidence: both are complete, both answer prompts the September panel found
no owner for (Google Workspace plus Mac; customer security questionnaires), both are
`noindex`, neither is in the nav, sitemap or llms.txt. Fix per D4: resolve the markers,
then launch (remove noindex, generate OG image, add to nav, llms.txt, sitemap) or keep
them off. Acceptance: either both pages return `index, follow` and appear in the
sitemap, or they stay noindex and are listed in HANDOFF as parked.

### C-08 P1: the voice drifts from the thread on the home page and in the footer

Evidence: home subtitle "Get government-grade IT and cybersecurity for less than one
in-house hire ... Local managed IT services in Salinas and across Monterey County";
footer tagline "Government-grade IT for small business." on 102 pages; "government-grade"
appears in 102 page bodies. The home H1 ("Managed IT & Cybersecurity that stops problems
before they start.") already carries the thread. Fix per D8: tagline becomes "IT that sees
it coming." (or stays, if the owner keeps it); the home subtitle becomes two sentences
in the A-02 pattern with "Monterey County and surrounding areas"; "government-grade" is
replaced in body copy with a concrete statement ("the same controls used on DoD
networks" is already on the site and verified). Acceptance: `grep -il "government-grade"
*.html | wc -l` is 0 if D8 says retire; the home subtitle contains the geography phrase
and not "Salinas and".

### C-09 P2: local credibility sits in the footer, not in the CTA copy

Evidence: the footer carries an 11-city "Service Areas" list on every page; the CTA
blocks say "Book a Free Assessment" with no place name. The owner's rule puts local
credibility in CTA copy. Risk to state plainly: the footer list is also ~100 sitewide
links into each city page, and the two phrases the site ranks for are city pages.
Fix: keep the links but move them out of the visual footer and into the `/service-area`
hub and the county pages (which already list them), replace the footer block with one
line "Serving Monterey County and surrounding areas. See every city and county we
cover" linking `/service-area`, and add the place line to every CTA ("Free IT assessment
for your Monterey County business", which the county pages already do). Measure with
Search Console before and after (D6). Acceptance: footer has one service-area line;
every `location-cta` H2 or lead names Monterey County; the city pages keep at least 4
in-body inbound links each.

### C-10 P2: blog slugs and titles carry the year

Evidence: 112 of 165 post slugs end in `-2026`; titles repeat "(2026)". Evergreen guides
age out of the URL in two months. Fix going forward: no year in new slugs; keep the year
in the title only for time-bound posts (Patch Tuesday, CVE write-ups). Acceptance: new
posts follow the rule (reviewer check); no redirects of existing slugs.

### C-11 P1: pages describe capabilities that are not in the confirmed list

Pages: `/voip-business-phone-systems`, `/penetration-testing` (11 markers),
`/zero-trust-security` (4), `/ransomware-recovery`, `/network-design` (Cisco Meraki and
Catalyst, tagged). Evidence: `audit/VERIFY-LIST.md` and the markers; the brief forbids
claiming anything the owner has not confirmed. Fix per D10: confirm, reword to "arranged
through a partner" where true, or noindex the page and remove it from llms.txt.
Acceptance: no page states a capability the owner has not confirmed; no `[VERIFY]` on
any of the five.

### C-12 P1: the public repository exposes planning documents and this audit

Evidence: `github.com/ulisespaiz/ghosxt` is public (`visibility: public` from the API);
it contains `audit/` (including `audit/claims.md` at 390 KB of claim-by-claim notes),
this AUDIT.md, HANDOFF.md, and CLAUDE.md. `.assetsignore` keeps them off the site, but
GitHub is indexed. The prior pass removed CLAUDE.md for this reason; the brief asks for it
back, so it was written with no confidential content. Fix: make the repository private
(Cloudflare's Git integration does not need it public), or move `audit/` and the
planning files to a private repository and leave only the tooling. Acceptance: the
repository is private, or `audit/*.md` is no longer in the public tree.

## Local findings

### L-01 P1: NAP is consistent on the site but incomplete off it, and the entity copies drift

Evidence: `contact.html` is the reference: Ghosxt, Salinas, CA 93901 (no street, which is
right for a service-area business), +1 (831) 204-0501, sales@ghosxt.com, Monday to Friday
8am to 6pm Pacific. Site-wide: 389 `tel:` and `mailto:` links all use that phone and
address (cares@ghosxt.com appears 3 times on `/ghosxt-cares` for the community programme,
which is fine); 3 `LocalBusiness` nodes lack the address and 1 lacks the phone (S-01);
hours appear in JSON-LD on only 3 pages. Off-site, the September plan found the Salinas
Chamber listing with a different phone (831-595-1114) and a false "Certified in Cisco"
line; its fix (1.6) is not confirmed. Google Business Profile and Bing Places details
are unknown (D5). Fix: the canonical node from S-01 everywhere; the owner fixes the
Chamber listing and aligns the Business Profile name, categories, service areas and
hours to `contact.html`; the Opus session prepares a one-page NAP kit
(`audit/nap-kit.md`) with the exact strings. Acceptance: every listing the owner controls
shows the identical NAP; the JSON-LD scan reports 0 nodes without address or phone.

### L-02 P1: five different service-area phrases

Evidence: "California" (20 core titles and the home meta), "California's Central Coast
& Bay Area" (101 key-facts blocks), "Central Coast and beyond" (llms.txt), "Salinas,
California; remote support available nationwide" (`contact.html` key facts), "Monterey
County and surrounding areas" (PR #260). The home subtitle lists Salinas beside Monterey
County. Fix: S-05 and A-04, one phrase: "Monterey County and surrounding areas" with the
county list on `/service-area`. Acceptance: as S-05.

### L-03 P1: the location pages are justified, but no new ones, and two families are thin

Evidence (5-gram Jaccard similarity across each family, body text only): cybersecurity
spokes 11 pages, median similarity 0.07, 1,090 to 1,382 words; cloud-services spokes 11,
median 0.08, 1,038 to 1,522 words; city hubs 11, median 0.19; it-help spokes 10, median
0.28, about 1,000 words; web-design spokes 11, median 0.38, about 960 words; county pages
4, median 0.24, 780 to 853 words. Nothing is above 0.6 (the doorway-page threshold the
July plan set), two city pages rank (Watsonville, Hollister), and every spoke has local
prose. Verdict: keep every existing location page, add none, and treat the four county
pages as the canonical local entities under the owner's county-first rule. The web-design
and it-help families are the closest to template pages; keep them unless Search Console
(D6) shows zero impressions for a family over six months, in which case consolidate that
family into its service page with 301s. The county pages are the weakest for their new
role: under 900 words, generic "economy" sections. Fix: county pages get the county
industries, the city list with one line each, the compliance lanes that matter there
(Monterey County: defense contractors near NPS and DLI, agriculture, hospitality,
healthcare), and the FAQ questions from the list below. Acceptance: each county page over
1,200 words with at least three facts that appear on no other page; family similarity
stays under 0.4; no new location URL in the sitemap.

### L-04 P2: GeoCircle radius excludes San Jose

Folded into S-05 (drop the circle, use the county list).

## Accessibility findings

Full axe results: `audit/baseline/axe-summary.md` (rules by impact and pages) and
`audit/baseline/axe/<page>.<viewport>.json`. Lighthouse accessibility scores per page:
`audit/baseline/lighthouse-summary.md`. The findings below are the ones confirmed from
the homepage run, html-validate and the markup; the Opus session adds one finding per
axe rule with serious or critical impact from the summary, using the same format.

### X-01 P1: green status text fails contrast on the light green card (4.45:1)

Pages: `index.html` (C-TPAT promo card, three `span.ctpat-promo-*` elements) and any
page using `--ghosxt-success` #15793b on the `--ghosxt-success-tint` background
(`main.css`). Evidence: Lighthouse `color-contrast` on `/` mobile: foreground #15793b on
background #ddebe2 at 4.45:1 against the 4.5:1 minimum for normal text. Fix: darken the
success token to #146a35 (5.2:1 on #ddebe2) in `main.css`, which changes the green by an
amount no screenshot diff at the 0.1% threshold will register on text, but it is a
palette change and needs the approval label; alternative with no token change: raise the
font weight or size of those three spans to large-text thresholds. Acceptance: Lighthouse
`color-contrast` passes on `/` and axe reports 0 `color-contrast` nodes site-wide.

### X-02 P1: the mobile CTA bar is a `div` with `aria-label` and no role (every page)

Pages: all 269 (shared chrome, `scripts/_chrome_source.html:531`). Evidence:
html-validate `aria-label-misuse` on `<div class="mobile-cta-bar" aria-label="Quick
contact">`; `aria-label` on a generic `div` is ignored by assistive technology, so the
bar has no accessible name. Fix: make it `<nav class="mobile-cta-bar" aria-label="Quick
contact">` or add `role="region"`; apply through `apply-chrome.py`; no visual change.
Acceptance: html-validate reports 0 `aria-label-misuse` for the bar; axe `landmark`
rules clean; screenshot diff 0 changes.

### X-03 P1: the pricing calculator's labels wrap block content and share controls

Page: `pricing.html`. Evidence: html-validate: 15 `<div>` inside `<label>`
(`element-permitted-content`), 6 `multiple-labeled-controls`, 80 `aria-label` on
elements that do not take it (`label.tier-option` and friends). Screen readers announce
these controls with the wrong or doubled names. Fix: restructure each tier option as
`<label><input type="radio"> <span>...</span></label>` with the descriptive text in a
`<span>` and one control per label; move `aria-label` to the input or drop it where the
visible text suffices; keep classes and styles so the layout is unchanged. Acceptance:
html-validate with `element-permitted-content`, `multiple-labeled-controls` and
`aria-label-misuse` promoted to `error` passes on `pricing.html`; axe `label` and
`aria-allowed-attr` rules clean; screenshot diff 0 changes.

### X-04 P2: buttons without an explicit `type`

Pages: all (1,654 instances; nav toggle, accordion triggers, cookie buttons, calculator).
Evidence: html-validate `no-implicit-button-type`. Outside a form this is harmless; inside
the pricing calculator and contact form a missing `type` makes a button submit. Fix: add
`type="button"` in the chrome source and the two forms. Acceptance: rule promoted to
`error` passes.

### X-05 P2: visible label and accessible name differ on the About page team button

Page: `about.html` (`a.team-card-btn`). Evidence: Lighthouse `label-content-name-mismatch`:
the `aria-label` does not contain the visible text, so voice-control users cannot
activate it by its label. Fix: make the `aria-label` start with the visible text, or drop
it. Acceptance: the audit passes on `/about`.

### X-06 P2: links in the blog explorer toolbar rely on colour alone

Page: `blog/all.html` (`span.explorer-path > a`). Evidence: Lighthouse `link-in-text-block`.
Fix: underline the path links or raise their contrast against surrounding text (a one-rule
CSS change in `blog.css`; needs the approval label because it is visible). Acceptance: the
audit passes on `/blog/all`.

### X-07 P1: the pricing page scores 93 on accessibility for three concrete reasons

Page: `/pricing`. Evidence (Lighthouse mobile and desktop): `aria-prohibited-attr` on 78
nodes, the `<i class="fi">` check-mark icons in the plan comparison table carry
`aria-label`, which is not allowed on an element with no role; `color-contrast` on 16
nodes inside the calculator card (`#calcCard` header span, the user stepper display);
`label-content-name-mismatch` on 6 nodes in the hero badge. Fix: replace the icon
`aria-label` with visually hidden text (`<span class="sr-only">Included</span>`, the
utility already exists) and `aria-hidden="true"` on the icon; darken the calculator's
secondary text to the site's `--text-secondary` token (a token already in use, so no new
colour); make the badge's accessible name start with its visible text. Acceptance:
Lighthouse accessibility 100 on `/pricing` at both widths; axe clean; screenshot diff 0
changed except the calculator text tone, which needs the label.

### X-08 P1: low-contrast text in the comparison table, the client-stories quotes and one link

Pages and evidence (Lighthouse `color-contrast`): `/break-fix-vs-managed-it` comparison
table caption at 2.54:1 (#9aa3b2), header cells at 1.46:1 (#cfd6e2) and managed-column
cells at 1.14:1 (#eaf0f7) against their backgrounds; `/case-studies` blockquote text at
2.54:1 (#9aa3b2); `/support` CTA link at 2.23:1 (the default link blue #0000ee on the
dark band); `/blog/all` toolbar count at 4.43:1 (#6b7280). These are grey text tokens
the brand rules exclude ("no grey text"). Fix: use `--text-inverse` or `--text-primary`
for the table and quote text and a white link on the dark band; `/blog/all` count to
`--text-primary`. Visible change, label required. Acceptance: `color-contrast` passes on
all four pages; axe reports 0 `color-contrast` nodes site-wide (with X-01).

## Mobile UI observations (proposals only, nothing changed)

Evidence lives in `audit/baseline/screenshots/<page>.mobile.png` (390x844) and the
Lighthouse mobile table. Observations from the homepage and the service template:

1. The first viewport on a service page is nav, breadcrumb, H1, and the top of a
   180-word lead; the primary CTA and the key-facts block are below the fold. With the
   A-02 rewrite (70-word lead) the CTA pair and the first key facts come into the first
   screen without any layout change.
2. The sticky bottom bar (call plus book) and the cookie banner stack on first visit;
   the September pass already fixed the layout-shift and clearance; mobile CLS is
   0.000 to 0.068 on all 268 pages, with the only material shifts on desktop (T-22). Keep it. The one copy change worth making is the
   bar's label ("Book" becomes "Free assessment"), which PR #260 already does on its page.
3. The home page's 19 animated server-rack blocks are the mobile main-thread cost
   (T-06). The animation can stay visually identical with a fraction of the nodes.
4. Tap targets: Lighthouse `tap-targets` passes on all 268 pages at mobile; the July
   fixes held.
5. Fonts: with D1 undecided, nothing changes; if the dark system wins, the mobile
   hero needs a contrast and size pass at 390 px before any page beyond `/managed-ai`
   adopts it (PR #260 reports 29 px H1 at mobile, which is small for Michroma).

## Phase 3: positioning read

What the site says about itself: "government-grade" and "enterprise-grade" IT from an
engineer with DoD infrastructure experience, for small businesses "across California",
delivered through nine services, five compliance pages, eight verticals, and a 50-page
local matrix, with published pricing. The home H1 already carries the thread the owner
wants ("stops problems before they start"), and the pricing page is the best
answer-first page on the site.

What the AI-search leads were looking for: a named local provider that already owns a
specific obligation. Their queries were compliance plus MSP plus location. An assistant
answering that query needs three things in one quotable place: the framework, the
location, and the provider's name with what it does and does not do. On ghosxt.com the
framework pages exist and are accurate (the CMMC page is the model: it says plainly what
Ghosxt does not do), but they are positioned as statewide generic pages ("for Small
Business"), they are not in the navigation, their first sentence is a story, and their
entity block names the business fifteen different ways. Off the site, the domain is not
in the index that the assistants read (A-06), so even a perfect page is not found.

The five changes that close the gap, in order of leverage:

1. Index presence and consistent listings off-site (A-06, L-01). Without this, nothing
   on-page is read by ChatGPT, Copilot or Claude. Owner work, two hours plus follow-ups.
2. Compliance as the front door (C-05, A-05, A-02, A-03): a Compliance group in the
   nav and footer, "Monterey County" in every compliance title and first sentence, FAQ
   questions in the buyer's words, and the framework-to-vertical cross-links.
3. One entity (S-01, S-02, S-05, A-04, L-02): one name, one description, one geography
   phrase, one tagline, emitted by the shared chrome so it cannot drift again.
4. Ship Managed AI governance (C-01) and link it from every compliance page as the next
   obligation; the written policy suite the site already lists includes an AI acceptable
   use policy, so the page extends a verified deliverable rather than inventing one.
5. Proof, decided one way or the other (C-03, A-01): either named clients and an indexed
   case-studies page, or a clean anonymized story with no `[VERIFY]` marker anywhere.

The one content change that matters most: the answer-first rewrite of the five
compliance pages with Monterey County in the title, the first sentence, and the FAQ
(A-02 plus A-05 plus A-03 on cmmc, hipaa, pci, ctpat, cyber-insurance). Those are the
pages the recent leads needed, three of those lanes have no competitor in the index, and
the rewrite touches about 60 lines per page.

## Phase 3: recommended page set

Keep: `/`, `/pricing`, `/contact`, `/about`, `/support`, `/services`, `/service-area`,
`/blog/`, `/blog/all`, `/ghosxt-cares`, `/msp-partners`, `/break-fix-vs-managed-it`,
`/managed-it-cost-monterey-county`, `/website-development` and its 11 city pages, the 11
city hubs (Salinas rewritten per C-06), the 11 cybersecurity and 11 cloud-services
spokes, the 10 it-help pages, the 4 county pages (strengthened per L-03). Rationale:
every one has unique local or topical substance and two of them rank; the matrix is the
organic-side asset.

Rewrite (lead, title, meta, FAQ, business node; nothing structural): the pages in the
table below. Rationale: these are the pages that must answer the lead queries.

Add: `/managed-ai` (merge PR #260 after D1 and D3). Launch from noindex after D4:
`/google-workspace-mac-it`, `/it-for-audited-companies`. Add nothing else; no new city,
county, or GCC High page.

Merge and redirect: `blog/managed-it-services-cost-salinas-2026` into
`/managed-it-cost-monterey-county` (C-02), then the other four pairs in C-02.

| Page | Action | The one question the opening paragraph must answer |
|---|---|---|
| /managed-it-services | rewrite | What do I get for a fixed monthly fee, and who answers when something breaks? |
| /cybersecurity | rewrite | What actually stops an attack on a 10-person business in Monterey County, and who watches it? |
| /managed-detection-response | rewrite | Who is watching our endpoints at 2am, and what happens when they see something? |
| /cloud-services | rewrite | Is our Microsoft 365 or Google Workspace tenant actually locked down, and who proves it? |
| /backup-disaster-recovery | rewrite | If ransomware hits tonight, what comes back tomorrow, and from where? |
| /network-design | rewrite | Can our office network be designed, segmented and documented so it stops being a mystery? |
| /help-desk-it-support | rewrite | When our staff call, who answers, how, and during what hours? |
| /it-consulting-vcio | rewrite | Who sets our IT budget and roadmap when we have no IT director? |
| /co-managed-it | rewrite | Can you back up our one IT person without replacing them? |
| /cmmc-compliance | rewrite | Which MSP near Monterey County sets up and hardens GCC High for a small DoD subcontractor, and what does it not do? |
| /hipaa-it-compliance | rewrite | Who builds HIPAA-compliant IT for a small medical practice in Monterey County and signs the BAA? |
| /pci-compliance | rewrite | Who makes PCI DSS practical for a restaurant, hotel or retailer in Monterey County? |
| /ctpat | rewrite | Which IT provider knows the C-TPAT cybersecurity criteria for an importer, carrier or packer in Monterey County? |
| /cyber-insurance-compliance | rewrite | Who gets us through the cyber insurance questionnaire (MFA, MDR, tested backups) before renewal? |
| /zero-trust-security | rewrite | What does zero trust mean for a 15-person company, in practice and in cost? |
| /penetration-testing | rewrite after D10 | What does a small-business penetration test cover, who performs it, and what does it cost? |
| /ransomware-recovery | rewrite after D10 | We are hit right now: what happens in the first four hours and what gets restored? |
| /voip-business-phone-systems | rewrite after D10 | Is a business phone system something Ghosxt delivers, and for whom? |
| /managed-ai | add (PR #260) | Which AI tools can reach our company data right now, and who sets and enforces the rules? |
| /agriculture-it-services | rewrite | Who runs IT and security for a Salinas Valley grower, packer or ag-tech firm, including the field and the cooler? |
| /trucking-it-services | rewrite | Who keeps a carrier's dispatch, ELD and C-TPAT controls running from Monterey County? |
| /manufacturing-it-services | rewrite | Who handles OT, ERP and CMMC for a small manufacturer in Monterey County? |
| /healthcare-it-services | rewrite | Who runs HIPAA-grade IT for a small clinic in Monterey County without a hospital budget? |
| /hospitality-it-services | rewrite | Who secures POS, guest Wi-Fi and PCI for a restaurant, inn or tasting room in Monterey County? |
| /professional-services-it | rewrite | Who protects a law firm or CPA practice's client files and email in Monterey County? |
| /property-management-it-services | rewrite | Who keeps a property manager's platform, owner portals and tenant data secure? |
| /engineering-it-services | rewrite | Who supports CAD, BIM and ITAR-controlled data for a small engineering firm? |
| /it-support-nonprofits-google-workspace | rewrite | Who supports a nonprofit on Google Workspace, contractors included, at a nonprofit price? |
| /it-support-remote-mac-teams | rewrite | Who manages a remote, Mac-first team with zero-touch enrollment and sign-in monitoring? |
| /monterey-county (and the 3 other county pages) | strengthen | What does Ghosxt do in this county, for which industries, and which towns does it reach on-site? |

## Phase 3: FAQ list per service page (question wording only)

Questions are written the way buyers type them into an assistant. Each becomes a visible
FAQ entry mirrored in FAQPage; answers are the Opus session's job and must use only
confirmed facts.

/managed-it-services
- What is included in managed IT services for a small business in Monterey County?
- How much does managed IT cost per user per month, and is it published?
- Do I have to sign a long contract, and what happens if I cancel?
- Who do I actually talk to when something breaks?
- Can you take a 3-person company, or is there a minimum?
- Do you support Mac and Google Workspace, or only Windows and Microsoft 365?
- What is the difference between managed IT and break-fix support?

/cybersecurity
- What cybersecurity does a 10-person business in Monterey County actually need?
- Is managed detection and response the same as antivirus?
- Do you provide security awareness training for staff?
- Will this satisfy our cyber insurance questionnaire?
- Can you secure Microsoft 365 or Google Workspace without migrating us?
- What does cybersecurity cost for a small business, per user?

/managed-detection-response
- Who is watching our endpoints at night and on weekends?
- What happens when the SOC sees something at 2am?
- Does MDR cover Macs, servers and cloud accounts, or just Windows PCs?
- Is MDR included in the managed IT plans or an add-on?
- Do cyber insurers require MDR for a small business?

/cloud-services
- Can you harden our existing Microsoft 365 tenant without moving us?
- Do you support Google Workspace as the identity provider with phishing-resistant MFA?
- Is Microsoft 365 backed up by Microsoft, or do we need a separate backup?
- Can you set up GCC High for a defense contractor?
- What does a Microsoft 365 migration cost for a 10-person office?

/backup-disaster-recovery
- Does Microsoft 365 or Google Workspace back up our email and files?
- How fast can you restore after ransomware, and from what?
- Are backups tested, and how often?
- What does cloud backup cost per user for a small business?

/network-design
- Can you redesign a small office network with VLANs, firewall and Wi-Fi, and document it?
- Do you deploy and manage the firewall, or just configure what we have?
- How long does a network build take for a 20-person office in Monterey County?

/help-desk-it-support
- Who answers the help desk, and what are the hours?
- Do you come on-site in Monterey County, or is support remote only?
- Is after-hours support available?
- Can staff open a ticket by email, phone or portal?

/it-consulting-vcio
- What does a vCIO do for a company with no IT director?
- How much does vCIO consulting cost for a small business?
- Can you help us budget IT for next year and vet vendors?

/co-managed-it
- Can you support our in-house IT person instead of replacing them?
- What does co-managed IT cost compared with a full plan?
- Who owns the security stack in a co-managed arrangement?

/cmmc-compliance
- Which MSP near Monterey County handles CMMC for a small defense subcontractor?
- What do you do for CMMC, and what do you not do (SSP, POA&M, assessment)?
- Can you set up and harden Microsoft 365 GCC High for a 10-person contractor?
- How long does CMMC Level 2 readiness take, and what does it cost?
- Who performs the actual CMMC assessment?
- Do you work with contractors near the Naval Postgraduate School and DLI?

/hipaa-it-compliance
- Which IT provider in Monterey County builds HIPAA-compliant IT for a small medical practice?
- Will you sign a Business Associate Agreement?
- What technical safeguards does HIPAA actually require from a two-provider clinic?
- Can you run the annual HIPAA security risk analysis?
- Does HIPAA-compliant IT cost more than regular managed IT?

/pci-compliance
- Who handles PCI DSS compliance for a restaurant or hotel in Monterey County?
- Which SAQ applies to our card setup, and can you help fill it in?
- Does our POS vendor already make us PCI compliant?
- What does PCI network segmentation mean for a small shop?

/ctpat
- Which IT provider knows the C-TPAT cybersecurity minimum security criteria?
- What IT controls does C-TPAT require from an importer or carrier?
- Can you prepare our IT evidence for a CBP validation?
- Do you work with Monterey County produce shippers and trucking companies on C-TPAT?

/cyber-insurance-compliance
- What does a cyber insurance application require from a small business (MFA, MDR, backups)?
- Can you help answer the insurer's questionnaire honestly and with evidence?
- Will the controls you put in lower our premium or just qualify us?
- What happens at claim time if an answer on the application was wrong?

/zero-trust-security
- What does zero trust mean for a 15-person company?
- Is zero trust a product we buy or a way of configuring what we have?
- Where should a small business start with zero trust?

/managed-ai
- Is it safe to let employees use ChatGPT with company data?
- How do I control which AI apps can access our Microsoft 365 or Google Workspace?
- Should we turn on Microsoft 365 Copilot, and what should be cleaned up first?
- Do we need a written AI acceptable use policy, and will you write it?
- Are AI meeting note-takers safe to use at work?
- Can a medical office use AI tools with patient information?
- What does managed AI governance cost, and is it an add-on for existing clients?
- Who in Monterey County offers AI governance for a small business?

Vertical pages (3 each; add the matching compliance questions from above):
- /agriculture-it-services: Who runs IT for a Salinas Valley grower or packer? Can you cover the field, the cooler and the office network? Does C-TPAT or FSMA change what you set up?
- /trucking-it-services: Who supports a carrier's dispatch and ELD systems in Monterey County? Can you make us C-TPAT ready? Do you support owner-operators and small fleets?
- /manufacturing-it-services: Who handles IT and OT for a small manufacturer in Monterey County? Can you get a machine shop CMMC ready? Do you support ERP and shop-floor systems?
- /healthcare-it-services: Who runs IT for a small clinic in Monterey County? Will you sign a BAA? Can you protect the EHR and patient email?
- /hospitality-it-services: Who secures POS and guest Wi-Fi for a restaurant or inn in Monterey County? Can you keep us PCI compliant? Do you support tasting rooms and seasonal staff?
- /professional-services-it: Who protects a law firm or CPA practice's client files in Monterey County? Can you pass a client security questionnaire? Do you support remote staff and contractors?
- /property-management-it-services: Who keeps a property manager's platform and owner portals secure? Can you handle same-day offboarding of a manager? Do you support multiple office locations?
- /engineering-it-services: Who supports CAD and BIM workstations for a small engineering firm? Can you handle ITAR-controlled data? Do you set up secure file sharing with clients?
