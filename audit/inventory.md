# Site Inventory: ghosxt.com

Phase 1 deliverable of the AI-search audit. Structural facts only; claim audits live in audit/pages/.

## 1. Framework and build

- No framework, no bundler, no build step. Hand-authored static HTML served by a Cloudflare Worker (`wrangler.jsonc`: `main: src/worker.js`, assets directory is the repo root, `not_found_handling: 404-page`).
- `src/worker.js` handles `POST /api/contact` (self-hosted form -> Turnstile verify -> Resend email) and `POST /api/track` (no-op beacon). Everything else is static asset serving.
- `package.json` has no scripts; only devDependency is `wrangler@4.120.1`. Deploy is Cloudflare git integration on push.
- `_headers`: strict CSP (allowlists Turnstile, Cloudflare Insights, Calendly, fonts.gstatic.com, flaticon icons), HSTS, cache tiers.
- `_redirects`: 301s for removed geo pages, legacy slugs, and generic `/:page.html -> /:page` extensionless normalization (must stay last).
- Python tooling in `scripts/` (run manually, never at deploy):
  - Full-page generators (skip existing files unless `--force`): `generate-location-service-pages.py` (cybersecurity-X, cloud-services-X), `generate-web-design-pages.py`, `generate-it-help-pages.py`. Hand edits are safe unless forced.
  - Derived artifacts (always overwrite): `generate-sitemap.py` -> sitemap.xml, `generate-feed.py` -> feed.xml, `generate-blog-explorer.py` -> marked regions of blog/all.html, `generate-og-images.py`.
  - In-place mutators (idempotent, marker-driven): `apply-chrome.py`, `insert-author-bio.py`, `insert-city-specialty-section.py`, `insert-county-economy-section.py`, `update-review-count.py`.
  - `minify.py`: sources in `assets/css/` and `assets/js/` are the editable truth; pages load the `.min.` copies. Never hand-edit a `.min.` file.
- Shared chrome (head assets, cookie banner, nav, footer) is centrally managed: edit `scripts/_chrome_source.html`, then run `python3 scripts/apply-chrome.py --apply`. Hand-patching chrome on one page gets reverted. apply-chrome only touches root `*.html`, not `blog/*.html`, so blog chrome drifts independently.
- Separate live-site audit harness under `audit/` (crawl/render/digest, excluded from deploy via `.assetsignore`). Not part of the build.

## 2. Routes (215 HTML files; sitemap.xml lists all 213 public routes, only 404.html and privacy-policy.html are off-sitemap)

| Group | Count | Members |
|-------|-------|---------|
| Homepage | 1 | index.html (154 KB, largest page) |
| Core service pages | 17 | services (hub), managed-it-services, help-desk-it-support, it-consulting-vcio, cybersecurity, cloud-services, backup-disaster-recovery, network-design, website-development, co-managed-it, managed-detection-response, penetration-testing, zero-trust-security, ransomware-recovery, voip-business-phone-systems, break-fix-vs-managed-it, msp-partners |
| Compliance pages | 5 | ctpat, cmmc-compliance, hipaa-it-compliance, pci-compliance, cyber-insurance-compliance |
| Vertical pages | 8 | agriculture, trucking, manufacturing, healthcare, professional-services, property-management, engineering, hospitality (hospitality is missing from llms.txt industries list) |
| City hubs | 11 | salinas, monterey, watsonville, hollister, santa-cruz, gilroy, san-jose, pacific-grove, carmel, seaside, marina |
| County pages | 4 | monterey-county, santa-cruz-county, san-benito-county, santa-clara-county |
| City x service combos | 43 | cloud-services-X (11), cybersecurity-X (11), web-design-X (11), it-help-X (10, disjoint smaller-town set) |
| Utility | 8 | 404, about, contact, support, pricing, case-studies, privacy-policy, ghosxt-cares |
| Blog | 118 | blog/index.html, blog/all.html (generated explorer), 116 posts. Kebab-case topical slugs, no date prefixes. 116/118 have datePublished/dateModified in BlogPosting JSON-LD; 118/118 have a visible time element; 115 carry the ghosxt:author-bio box (author Ulises Paiz throughout) |

## 3. Rendering: static vs client-side JS

Every page is fully static HTML. No hydration, no client-side routing. JS bundles: `main.min.js` (all pages: cookie banner logic, mobile nav, beacons), `index.min.js` + `why.min.js` (homepage), `pricing.min.js` (pricing), `webdev.min.js` (website-development).

Content that exists only inside JS (crawlers see empty containers):

- Chat demo, index.html only: all message text lives in `assets/js/index.js` (~lines 685-830) and is injected into empty `#chatMessages` / `#chatOptions` divs. Clearest JS-only content on the site.
- Pricing calculator, pricing.html: tier labels and prices do appear in static markup, but computed totals and the add-on breakdown rows are JS-only (`assets/js/pricing.js`, TIER_PRICES 125/175/250, MIN_USERS 5).
- Website cost calculator, website-development.html: PROJECT_PRICES 1800/3200/5900, ADDON_PRICES, MAINTENANCE_PRICE 300 live only in `assets/js/webdev.js`. The $3,200 and $5,900 tiers appear nowhere in static HTML.
- Drag-and-drop widget (index.html): box labels are in the DOM; only the solved counter and success message are JS-driven.
- Radar timer and canvas decorations (index.html): no meaningful text.

Cookie banner: inline in the DOM on 214/215 pages (all but 404.html), placed in the body_top chrome region BEFORE the nav and BEFORE `<main id="main-content">`. Hidden via CSS transform, shown by JS after 1s. Fully crawlable but precedes main content in source order.

Mobile nav: fully duplicated link set (desktop `.navbar-menu` plus `.navbar-mobile-menu`) inline in the DOM before main on every page, plus a third CTA repeat (`ghosxt:mobile-cta-bar`) after the footer on 209 pages.

display:none on meaningful content: only 3 inline occurrences, none hiding substantive prose (inactive homepage tab illustrations, a conditional calculator row). Two CSS rules in blog/all.html hide a table column.

sr-only utility: DOES NOT EXIST anywhere in the CSS. The house rule requiring sr-only for hidden crawlable text has no implementation yet; adding the utility class is a prerequisite for the icon-cell fix.

## 4. Structured data and head hygiene baseline

- JSON-LD only (zero microdata), present on 214/215 pages (all but 404.html).
- Head hygiene is perfect site-wide: 215/215 have exactly one H1, a canonical, and a meta description.
- Rich existing coverage: Service, FAQPage (204 pages), BreadcrumbList (217 blocks), LocalBusiness (34), Offer/UnitPriceSpecification on pricing and city hubs, BlogPosting + Person on all posts, Person + EducationalOccupationalCredential on about.html.
- Notable gaps:
  - No AggregateRating, Review, or reviewCount anywhere, despite 55 pages displaying "5.0 across 26 Google reviews" as text.
  - Root pages missing FAQPage: index, about, services, privacy-policy, 404.
  - Missing BreadcrumbList: index, about, contact, ctpat, ghosxt-cares, pricing, privacy-policy, website-development, blog/index, blog/all.
  - City x service combo pages have no LocalBusiness and no Offer.
- Content markers available as edit handles: ghosxt:trust-reviews (55 files), ghosxt:key-facts (55), ghosxt:extra-schema (26), ghosxt:author-bio (115 blog), ghosxt:mobile-cta-bar (209), ghosxt:specialty-grid (11), ghosxt:county-economy (4).
- 43 root pages LACK the key-facts at-a-glance block, including index.html, pricing.html, about.html, contact.html, all 5 compliance pages, all 10 it-help-X, all 11 web-design-X, and 8 service pages (mdr, penetration-testing, zero-trust, ransomware-recovery, voip, co-managed, break-fix, msp-partners, website-development).

## 5. AI-crawler and discovery files

- robots.txt: allows everything for `User-agent: *`; explicit Allow blocks for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot. Nothing blocked. Missing explicit entries vs the target list: Claude-SearchBot and Bingbot (both currently covered by the wildcard; Claude-Web is a deprecated token to reconcile against Anthropic docs).
- llms.txt: present at root, well-formed, includes key facts (Salinas CA, phone, pricing tiers, DoD differentiator) and grouped link sections. Hospitality vertical missing from its industries section.
- llms-full.txt: absent. IndexNow key file: absent (no mention of IndexNow anywhere).
- feed.xml: RSS 2.0, 30 most recent posts, generated. sitemap.xml: generated, honors noindex.

## 6. Data files and hardcoded numbers

- `site-config.json` is the only data file: `{"google_review_count": 26, "google_rating": "5.0"}`.
- Review count: uniformly 26 site-wide, no 24 or 25+ stragglers remain. 108 materialized occurrences across 55 root files (trust-reviews callout plus key-facts dt), all inside marker windows that `update-review-count.py --apply` rewrites from site-config.json. Zero occurrences in blog, llms.txt, feed.xml, or JSON-LD. Caveat: changing site-config.json alone changes nothing until the script is run.
- Prices are hardcoded with NO data file or updater script:
  - Per-user tiers 125/175/250: pricing.html, cybersecurity.html, all 11 city hubs, all 4 county pages, `assets/js/pricing.js` (+ .min), ~13 blog posts.
  - Tiny Team $600: same 17 root pages plus ~7 blog posts.
  - Onboarding $1,000/$1,500: pricing.html; $1,500 also on web-design-carmel, website-development, and mixed-purpose blog hits.
  - Web design from $1,800: website-development, all 11 web-design-X, all 11 city hubs, ~5 blog posts. JS-only: 3200/5900 project tiers and add-on prices in webdev.js.

## 7. Contact form (for the Phase 5 intake change)

Self-hosted: contact.html form posts FormData to `/api/contact` in src/worker.js (origin check, honeypot, Turnstile verify, Resend email). Reference: SETUP-CONTACT-FORM.md. The worker silently drops unknown fields, so adding "How did you find us?" needs one contact.html edit (new form-group select after the phone group, ~line 407) plus four coordinated `src/worker.js` edits: MAX_FIELD_LENGTH entry, `fields` extraction, OPTIONAL_FIELDS entry, and inclusion in the plaintext and HTML email bodies. contact.html is also the only page with a Turnstile widget and inline Calendly embed; other pages link out to Calendly.
