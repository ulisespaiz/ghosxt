# Page Audit: /web-design-santa-cruz

## Route
/web-design-santa-cruz (file: web-design-santa-cruz.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/operator is an engineer with DoD infrastructure experience | JSON-LD: "from an engineer with DoD infrastructure experience"; body: "built like they were built by an engineer, because they were" (no DoD reference in visible body copy) | web-design-santa-cruz.html:44 (JSON-LD), 217 (body) | MATCHES — JSON-LD is accurate; note the visible body text doesn't itself repeat the DoD-experience detail, only "an engineer" |
| Footer attribution | "Built by an engineer from the federal contracting world." | web-design-santa-cruz.html:475 | MATCHES |
| No individual named anywhere in body copy | "Ulises Paiz" never appears; "the engineer who would actually build your site" (line 276) is the closest identity statement | confirmed via full-file search | Consistent with the sibling website-development.html page (also audited as never naming Ulises Paiz in body copy) — not a contradiction, but a legibility gap (see checklist) |
| Essential package price | $1,800 one-time | web-design-santa-cruz.html:228 (hero callout); JSON-LD FAQ:88; visible FAQ:316 | UNVERIFIABLE — web-design pricing is a separate service line not itemized in VERIFIED FACTS (which covers managed-IT/security tiers only); internally consistent across the page and matches the figure used on the main website-development.html page |
| Business Pro package price | $3,200 one-time | JSON-LD FAQ:88; visible FAQ:316 | UNVERIFIABLE — same basis; internally consistent |
| E-commerce package price | $5,900+ one-time | JSON-LD FAQ:71-72, 88; visible FAQ:308, 316 | UNVERIFIABLE — same basis; internally consistent |
| Maintenance & Security price | "from $300/month" | web-design-santa-cruz.html:259 | UNVERIFIABLE — same basis; internally consistent, matches the figure used on website-development.html |
| E-commerce feature claim: "product catalog, payment processing, and a checkout that works on phones" | Capability/scope claim | JSON-LD FAQ:71-72; visible FAQ:308 | UNVERIFIABLE — not itemized in VERIFIED FACTS (out of scope of that list, which covers IT/security, not web-dev feature scope); not contradictory |
| CMS / self-service update claim | "clean admin so your team can change menus, events, hours, classes, and products in minutes" | web-design-santa-cruz.html:250-251; JSON-LD FAQ:79-80; visible FAQ:312 | UNVERIFIABLE — same basis, not contradictory |
| Maintenance "run by the same security team that protects business networks" | Cross-sell claim tying web maintenance to the cybersecurity offering | web-design-santa-cruz.html:259, 293-294 | MATCHES — consistent with the sole-engineer operating model and the existing cybersecurity service line |
| Hosting/domain/email setup: SPF, DKIM, DMARC configured | Capability claim | web-design-santa-cruz.html:255 | UNVERIFIABLE — not on the VERIFIED FACTS capability list (that list is scoped to managed-IT/security deliverables, not web-hosting email configuration); not contradictory |
| No Google-reviews / rating trust signal anywhere on this page | Absent — no "26 Google reviews" or "5.0" rating appears | confirmed via full-file search | Gap, not a contradiction — both sibling pages (cloud-services-santa-cruz.html, cybersecurity-santa-cruz.html) carry this trust signal twice each; this page carries it zero times |
| No response-time / turnaround commitment anywhere on this page | Absent — no SLA, no build-timeline statement (unlike website-development.html's FAQ, which states 3-6 / 6-10 week timelines) | confirmed via full-file search | Gap, not a contradiction |
| Verticals served | Shops, studios, restaurants, professionals, boutiques, surf/outdoor shops, makers, cafes, breweries, venues, wellness studios, professional/remote-work economy | web-design-santa-cruz.html:217, 267-268; JSON-LD:64, 44 | MATCHES excluded-vertical rule — no dental/dentist mention found |
| Footer tagline | "Government-grade IT for small business." | web-design-santa-cruz.html:351 | UNVERIFIABLE — marketing language consistent in tone with the DoD/federal-contractor background fact, but not a verbatim VERIFIED FACTS claim |
| FAQ content (JSON-LD vs. visible) | 4 Q&As: builds for Santa Cruz, online stores, self-updates, pricing | web-design-santa-cruz.html:57-93 (JSON-LD) vs. 299-319 (visible) | MATCHES — word-for-word identical, single consistent JSON-LD block |
| Service area | Santa Cruz, Santa Cruz County, "Westside to Aptos"; nearby Watsonville, Gilroy, San Jose, Monterey | web-design-santa-cruz.html:46 (JSON-LD), 64/304 (FAQ), 295 | MATCHES |
| No em dash, Cisco certification, dental/dentist, vendor name, or clearance level found | — (absent) | confirmed via full-file search | MATCHES |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No `<aside class="key-facts">` or equivalent block exists on this page at all — the only one of these three location pages missing it. Service area is stated in the hero/FAQ and a pricing link exists (line 228, to `/website-development`), but "who you talk to" is never more than generic "an engineer" (line 217, 276 — no name), and there is no response-time or build-turnaround statement anywhere on the page. This page also carries zero Google-reviews trust signal, unlike both sibling pages. |
| FAQ present with real question-and-answer text | Pass | 4 `<details>` Q&As at lines 302-317, matching the FAQPage JSON-LD word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (216) + lead paragraph (217, ~75 words) plainly state the offer well within the first 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at line 216. |
| Title, meta description, canonical present | Pass | Title line 6; meta description line 7; canonical line 8. |
| JSON-LD present (list which types) | Pass | Single `@graph` block (lines 34-95): Service, BreadcrumbList, FAQPage. No duplicate/conflicting schema block found on this page. |
| Content that exists only inside JS | Pass | No content found that is JS-only; all visible copy is server-rendered. This page does not embed the pricing calculator itself (that lives on `/website-development`), so there's no calculator-default-mismatch risk here. |
| Icon-only table cells | N/A / Pass | No `<table>` elements exist on this page. |
| display:none on content that should be crawlable | Pass | No `display:none` occurrences found in this file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner" id="cookieBanner">` (lines 106-120) sits in the DOM before `<nav class="navbar">` (121) and before `<main id="main-content">` (210). No duplicated nav element found. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Pricing: `/website-development` (its calculator) at 228, 269, 295, 329, plus `/pricing` in nav/footer. City links: `/web-design-watsonville`, `/web-design-gilroy`, `/web-design-san-jose`, `/web-design-monterey` (295), `/santa-cruz` hub. |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| None found | — |

No em dash, Cisco certification, dental/dentist mention, vendor name, or clearance-level statement was found anywhere on this page.

## Top Three Fixes
1. Add an at-a-glance key-facts block matching the pattern used on cloud-services-santa-cruz.html and cybersecurity-santa-cruz.html — this is the only one of the three pages missing it entirely, and with it goes the Google-reviews trust signal (26 reviews, 5.0) both sibling pages carry twice. Include service area, a named "who you talk to" (or at least the consistent "engineer" framing), a turnaround/timeline commitment, and the pricing-calculator link.
2. Move the cookie banner (lines 106-120) so it no longer precedes `<nav>` and `<main>` in the DOM.
3. Confirm the $1,800 / $3,200 / $5,900+ / $300-per-month web-design pricing figures with Uli — none are itemized in VERIFIED FACTS (which covers managed-IT/security tiers only), though they are internally consistent with the main /website-development page's calculator and not flagged as a contradiction.
