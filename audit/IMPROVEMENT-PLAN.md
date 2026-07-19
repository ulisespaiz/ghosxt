# Ghosxt.com — A/A+ improvement roadmap (from the 2026-07-19 fleet audit)

Produced by a 3-lens Opus planning panel (conversion, SEO architecture, engineering)
plus an adversarial critique pass, all verified against this repo. Findings source:
the 2026-07-19 live-site audit (79/188 URLs, 47 issue types, 6 high).

**Grades today → target:** Speed A, Content A−, Security B+, Accessibility B+, UI B,
SEO B−. **Overall B+ → A** (A+ criteria noted per phase).

Two corrections the panel made to the audit itself (trust these over the report):

- The crawl samples 4 pages per city family, so the report understates family sizes:
  there are **13** cloud-services, **13** cybersecurity, **13** web-design, and **10**
  it-help spokes. `website-development.html` already links all 13 web-design spokes.
- 12 of 13 city hubs are **already teaser-only** — the correct hub→spoke pattern.
  Only `salinas.html` still contains full duplicate service sections.

---

## Phase 0 — Verify-first gates (XS, no code — do before anything they gate)

| # | Action | Gates |
|---|---|---|
| 0.1 | Load `contact.html` in a **real** mobile + desktop browser on prod. If Turnstile shows the red "Verification failed" state for real users (not just our headless run), also check the sitekey's allowed-hostnames list in the Cloudflare dashboard. Document pass/fail with screenshots. | Whether 4.1 is a bugfix or hardening |
| 0.2 | Confirm `ALLOWED_ORIGINS` is actually set on the deployed Worker (CF dashboard). | 1.3 — deploying fail-closed with it unset would 403 every lead |
| 0.3 | Confirm `.form-response-promise`'s background is light (the 3.44:1 sample may be against the red accent border). | Direction of 1.6 |

## Phase 1 — Independent quick wins (each XS/S; ~a day total)

**Worker (`src/worker.js`):**
1.1 Strip CR/LF from the email Subject — line 172, `fields.company.replace(/[\r\n]+/g, ' ')`.
    Defense-in-depth (Resend is a JSON API, so this is not an exploitable header split — don't
    over-credit it). Accept: injected `\r\nBcc:` in `company` arrives as a single-line Subject.
1.2 Honeypot 204 must carry no body — line 134, return `new Response(null, {status: 204, ...})`.
1.3 Fail-closed origin check — line 52 `return true` → `false`, **after 0.2**. Note:
    `isAllowedOrigin()` is shared with `/api/track` (whose fail-open is commented as
    intentional) — either scope the change to the `handleContact` call-site or accept that
    track stops logging when unset. Accept: forged Origin → 403; legit → 200.

**Markup/content:**
1.4 Fused-word fix — insert one space before `<br /><span>` at `ghosxt-cares.html:404,709`
    and `ctpat.html:575,1266`. Accept: stripped text reads "be a luxury", "get your org",
    "That Secures", "a Failed".
1.5 `ctpat.html` heading order — the h2→h4×5 skip (orphan the critique caught): promote the
    five `<h4>`s to `<h3>` (or insert an `<h3>`). Accept: no skipped levels on ctpat.

**Accessibility CSS (batch — same files):**
1.6 `.form-response-promise` `#2a2a2a` → `#000` (`main.css:2133`). Accept: 0 contrast
    violations on contact.html.
1.7 Footer bottom links ≥24px tall (`main.css:1867`: inline-block + padding) **and** fix the
    footer opacity contrast in the same block — `rgba(255,255,255,0.4)` (:1837) and
    `rgba(255,255,255,0.2)` (:1880) on the dark footer are ~3.8:1 and ~1.8:1; raise to ≥0.62
    alpha (≥4.5:1). This is sitewide (every page's footer), a finding no single lens owned.
1.8 Cookie "Learn more" link ≥24px (`main.css:496`); breadcrumb links ≥24px
    (`locations.css:21`, `blog.css:148`); pricing-calculator controls ≥24×24
    (`pricing.css`: `.tier-option`/`.tier-check`/`.addon-qty-btn`). Accept: Lighthouse
    tap-target audit passes on pricing + a location page + a blog post.

**SEO structure (the fast 80%):**
1.9 Pricing H1 carries the keyword: `Managed IT Pricing.` + tagline as sub-line
    (`pricing.html`). Do before Phase 2 measures the pricing hero. Accept: H1 shares ≥1
    token with the title.
1.10 Trim `salinas.html`'s duplicate full service sections to ≤80-word teasers linking their
    spokes — **all** of them (Cybersecurity, M365, Managed IT, Help Desk, Backup-DR, Network
    Support — the critique found ~6, not 2), keeping total hub length ≥ monterey.html.
    Accept: 0 full duplicate sections; each service teaser links its spoke exactly once.
1.11 Add the missing 8 city-spoke links to each of `cloud-services.html` and
    `cybersecurity.html` (both currently link only 5 of 13). Accept: grep counts 13 spoke
    hrefs on each hub.
1.12 Re-template the 5 county hubs' title/H1 to aggregator framing ("Managed IT Across
    Monterey County — Multi-Site & County-Wide Support"). Accept: no county title/H1
    string-identical (modulo place noun) to the city template.
1.13 Trim the 10 worst page titles to ≤60 chars; trim the ~20 over-length metas to ≤155.
    Accept: length scan reports 0 pages >160-char meta / >60-char title on the listed set.

## Phase 2 — Mobile chrome redesign (one coordinated change; S–M)

The critique's headline conflict: the conversion lens wanted to compact the banner within
the current stacked model; the engineering lens found the *actual CLS cause* is the
`.cookie-banner.visible ~ .mobile-cta-bar { bottom: var(--cookie-banner-height) }` jump
(`main.css:2252`) and wanted to delete it. **Merged model (do as ONE edit):**

- Cookie banner: fixed at `bottom: calc(88px + env(safe-area-inset-bottom))` (above the CTA
  bar from first paint), compacted to ≤72px on mobile (single-row container at ≤640px,
  2-line message cap; keep Decline/Accept equal prominence). Delete the `~ .mobile-cta-bar`
  bottom-override rule; both elements animate in via `transform` only.
- Tighten home/pricing mobile hero padding so the primary CTA clears the final chrome
  geometry (`index.css` ≤640 hero block, `pricing.css` hero block).
- Wrap the masthead in `<header class="site-header">` (`scripts/_chrome_source.html:124`,
  adjust `apply-chrome.py` MARKERS) — same shell pass.
- Apply via **one** `python3 scripts/apply-chrome.py --apply` run; `check-chrome-drift.py` = 0.

Accept (closes 4 findings at once): at 390×844 with banner+bar visible, home and pricing
primary CTAs have ≥8px clearance above the chrome (screenshot-verified); mobile lab CLS
< 0.02 on home/pricing/salinas (was 0.059) with the CTA-bar `bottom` constant in the
layout-shift trace; bottom chrome ≤ ~124px combined (re-measure the 4 location pages too);
axe reports exactly one `banner` landmark per page.

## Phase 3 — SEO content differentiation (the long pole; parallel with 2/4/5)

Strategy per family (differentiate, don't 301 — every spoke is a conversion-capable local
landing page; full reasoning in the SEO plan):

- **cloud-services-\* (13, thinnest):** metros first (salinas/monterey/san-jose/santa-cruz).
  ≥150 words city-unique prose (named industries, a local migration scenario) + vary ≥2 of
  6 cards per city. Documented fallback: if the 8 small-town spokes never get content, 301
  them to `cloud-services.html`.
- **web-design-\* (13):** same treatment, metros first.
- **it-help-\* (10):** replace 2 of the 4 verbatim cards per town with town-specific ones +
  one local-hook paragraph (this also closes the Content boilerplate finding).
- **cybersecurity-\* (13):** already differentiated — only diversify the templated meta
  tails, and fix the santa-cruz/san-jose near-clone card set (the `duplicate-service-block`
  HIGH: give santa-cruz cards matching its stated verticals).
- Blog titles: trim only where the head keyword lands past ~60 chars.

Accept (the A gate for SEO): pairwise 5-gram Jaccard body similarity < 0.60 within each
family (script-measured) and ≥150 city-unique words per differentiated spoke; intra-family
meta similarity < 0.60; metros done at minimum (A+ = all 13 per family).

## Phase 4 — Contact-form hardening (before CSP; S)

4.1 Add `data-error-callback` / `data-expired-callback` / `data-timeout-callback` to the
Turnstile widget (`contact.html:329`) calling `turnstile.reset()`, surface a retry message
plus a visible `mailto:sales@ghosxt.com` fallback in `#form-status`, keep submit enabled.
Also check `hostname` + `error-codes` in `verifyTurnstile()` (worker), per the security
re-judge. Accept: forced error state shows retry + mailto (no dead-end); successful retry
→ 200; siteverify hostname mismatch → rejected.

## Phase 5 — CSP hardening (LAST — after every inline-script/markup edit)

Decision: **sha256 hashes in `_headers`**, not Worker-injected nonces (static bytes, static
policy file, zero runtime cost — nonces only pay off for per-request markup).

5.1 Refactor the 3 `onclick`s (`index.html:1801/1805/1809`) to event delegation in
`index.js`; replace all ~380 `onload="this.media='all'"` swap handlers with a tiny external
bootstrap script applied sitewide via `apply-chrome.py` (inline event handlers can't be
hash-allowed without `'unsafe-hashes'` — avoid).
5.2 Write `scripts/compute-csp-hashes.py` that scans **every** HTML file (the critique
found inline `<script>` in 5 blog posts the engineering plan missed — BEC, cyber-insurance,
dark-web-monitoring, incident-response, phishing-sim — drifted from the other 81 posts'
external JS; ≥12 blocks across ≥10 pages), emits the `sha256-…` list into `script-src`,
and doubles as a CI drift check. Delete `'unsafe-inline'` from `script-src`.
5.3 Migrate the enumerable inline `style=` attrs to classes (`index.html:2363-2375`
trust-bar/stat-cards, `:1536/:1577` toggles, `contact.html:322/354`). Full `style-src`
hash migration stays **deferred** (168 attrs sitewide, low security value) — it is the A+
stretch, not the A gate.

Accept: `curl -sI https://ghosxt.com/` shows `script-src` without `'unsafe-inline'`;
0 CSP console violations across template representatives **including the 5 inline-JS blog
posts**; contact submit, Turnstile, Calendly, FAQ accordion, rack animation, and font swap
all verified working on a preview deploy first.

## Phase 6 — Abuse + speed polish (A/A+ closers)

6.1 Rate-limit `/api/contact` + `/api/track` (KV/DO fixed-window by `CF-Connecting-IP`, or
a dashboard rule). Accept: >5 POSTs/60s → 429; single legit submit unaffected.
6.2 Surgical blog-LCP fix for the one 3.3s outlier (its LCP `<p>` waits on render-blocking
CSS — inline the few above-the-fold rules for that template or hoist the element). Accept:
that URL < 2.5s mobile lab. (The sitewide critical-CSS re-architecture is **demoted to A+
optional** — Speed is already A and the FOUC risk isn't worth it for one URL.)
6.3 Optional (A+): HSTS `preload` directive; `img-src` tightening; HTML-weight trim of
index.html's 18 repeated server-rack blocks.

---

## What earns the grade (measured, not vibes)

| Dimension | A requires | A+ adds |
|---|---|---|
| SEO (B−) | Phases 1.9–1.13 + Phase 3 metros with Jaccard <0.60 gate (or documented 301 tail) | All 13 per family; metas <0.60 everywhere; blog titles clean |
| UI (B) | Phase 2 shipped: ≥8px CTA clearance, chrome ≤124px, Turnstile verified healthy + hardened | Location-page viewport re-measured; documented mobile lead-path walkthrough |
| Accessibility (B+) | All flagged targets ≥24×24; contact + footer contrast ≥4.5:1; one banner landmark; ctpat headings | axe/Lighthouse 100 on template reps; keyboard focus-order pass |
| Security (B+) | Worker items 1.1–1.3 + 4.1; rate limiting live (429 measured); `script-src` without `'unsafe-inline'`, 0 violations sitewide | `style-src` also clean; preview-deploy CSP report as evidence |
| Speed (A) | Hold: CLS <0.02 mobile after Phase 2; blog outlier <2.5s | Critical-CSS elimination + HTML weight (optional) |
| Content (A−) | Fused words + ctpat headings + it-help card de-dup | Phase 3 unique local prose across all spokes |

**Sequencing rules (from the critique):** 0 before 1.3/4.1; 1.9 before Phase 2's pricing
measurement; Phase 2 as one batched shell pass; Phase 5 strictly last (any inline-script or
markup edit after hashing breaks the contact form under CSP); batch all
`_chrome_source.html` edits (2, 5.1) per phase to keep `check-chrome-drift.py` quiet.

**The critical path to A is Phase 3** — everything else is a few days of engineering;
spoke differentiation is real content work and gates the SEO grade.
