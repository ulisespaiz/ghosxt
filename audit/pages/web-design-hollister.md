# Page Audit: /web-design-hollister

## Route
/web-design-hollister (file: web-design-hollister.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner described as engineer with DoD infrastructure experience | "an engineer with DoD infrastructure experience" | web-design-hollister.html:44 (JSON-LD Service description), 217 (lead) | MATCHES |
| "The engineer who would actually build your site" | Sole engineer builds the site personally | web-design-hollister.html:276 | MATCHES VERIFIED FACTS ("Owner and sole engineer: Ulises Paiz") |
| Service area / county | JSON-LD `areaServed`: Hollister, "San Benito County, California" | web-design-hollister.html:46; FAQ text repeats "San Benito County" at :64 and :304 | MATCHES - no "Monterey County" trust line exists on this page, so the county mismatch found on the sibling cloud/cybersecurity Hollister pages does not occur here |
| Web design package pricing | "$1,800 Essential, $3,200 Business Pro, $5,900+ for e-commerce" | web-design-hollister.html:7 (meta description), 13 (og:description), 19 (twitter:description), 228 (hero trust callout), 316 (FAQ) | UNVERIFIABLE - VERIFIED FACTS itemizes only managed-IT plan pricing (Tiny Team/Core/Secure Growth/Compliance & Continuity) and onboarding fees; no web-design package pricing appears anywhere in VERIFIED FACTS. VERIFY WITH ULI |
| Website maintenance & security pricing | "from $300/month" | web-design-hollister.html:259 | UNVERIFIABLE - same reasoning; not itemized in VERIFIED FACTS. VERIFY WITH ULI |
| Direct phone line | (831) 204-0501 | web-design-hollister.html:163, 225 | MATCHES (consistent site-wide) |
| Google review count/rating and "since [year]" trust line | Not present on this page | - | ABSENT - the "Rated 5.0 across 26 Google reviews... since 2021" trust callout present on the cloud/cybersecurity Hollister sibling pages does not appear anywhere on this page. Not a contradiction, but a consistency gap worth flagging. |
| Response time (same-day / 24-48 hr on-site) | Not present on this page | - | ABSENT - no response-time claim appears anywhere on this page (see Legibility Checklist: no key-facts block at all). |
| Maintenance/security delivered by "the same security team" | "run by the same security team that protects business networks" | web-design-hollister.html:259, 294 | MATCHES - consistent with sole-engineer model and cross-links to /cybersecurity-hollister and /managed-it-services |
| Build methodology | "Hand-coded, mobile-first sites: no page builders, no bloated templates" | web-design-hollister.html:239 | UNVERIFIABLE - process/methodology claim not covered by VERIFIED FACTS (which is scoped to the managed-IT/cybersecurity business line); does not contradict it |
| Ownership of deliverables | "domain, hosting, and code in accounts you own" | web-design-hollister.html:235, 255 | UNVERIFIABLE - business-practice claim, not itemized in VERIFIED FACTS, does not contradict it |
| FAQ visible text matches JSON-LD FAQPage | 4 Q&As, word-for-word | web-design-hollister.html:58-91 (JSON-LD) vs. 302-317 (visible `<details>`) | MATCHES |
| Sibling city pages linked exist on the site | `/web-design-salinas`, `/web-design-gilroy`, `/web-design-watsonville`, `/web-design-san-jose` | web-design-hollister.html:295 | MATCHES - all four target files confirmed present in the repo |
| Founder background | "Built by an engineer from the federal contracting world." | web-design-hollister.html:475 (footer) | MATCHES VERIFIED FACTS |

Claim count: 13. Contradiction count: 0. Unverifiable count: 4 (web-design pricing, maintenance pricing, build methodology, ownership-of-deliverables claims - none contradict VERIFIED FACTS, they are simply outside its scope). Notable absences: 2 (no review/rating trust line, no response-time claim).

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | **Fail** | No `<aside class="key-facts">` block exists anywhere on this page - unlike cloud-services-hollister.html and cybersecurity-hollister.html, which both have one immediately after the hero. Service area, response time, and "who you talk to" are not surfaced in a scannable at-a-glance format; only a pricing link is present in the hero (line 228). |
| FAQ present with real question-and-answer text | Pass | 4 `<details>` Q&As at lines 302-317, matching the FAQPage JSON-LD word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (216) + lead paragraph (217) plainly state the offer ("Ghosxt hand-codes straightforward, fast websites for Hollister businesses at published prices...") well within the first 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at line 216; confirmed no other `<h1>` in the file. |
| Title, meta description, canonical present | Pass | Title line 6; meta description line 7; canonical line 8. |
| JSON-LD present (list which types) | Pass | Types present: Service, BreadcrumbList, FAQPage (lines 34-95). No LocalBusiness node on this page - the Service node's `provider` references an external `@id` not defined here. |
| Content that exists only inside JS | Pass (none found) | All visible copy is server-rendered in the HTML. |
| Icon-only table cells | N/A / Pass | No `<table>` elements exist on this page. |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (line 106) sits in the DOM before `<nav class="navbar">` (121) and before `<main id="main-content">` (210). |
| Internal links to pricing and to the relevant city or vertical pages | Pass | `/website-development` (the web-dev pricing/calculator hub) linked at 151, 193, 228, 269, 295, 329-330. Related-service links `/cybersecurity-hollister`, `/managed-it-services`, `/hollister` (294). City links `/web-design-salinas`, `/web-design-gilroy`, `/web-design-watsonville`, `/web-design-san-jose` (295). No link to the generic `/pricing` MSP page, but that is expected since this page's offer is priced via the web-dev calculator, not the managed-IT plans. |

## House-Rule Violations
None found. No em dashes (plain or URL-encoded), Cisco certification claims, dental/dentist mentions, third-party vendor/tool-brand names, stated clearance level, or SIEM/unlisted-capability claims were found on this page.

## Top Three Fixes
1. Add a `key-facts` at-a-glance `<aside>` matching the pattern used on cloud-services-hollister.html and cybersecurity-hollister.html (service area, led-by, response time, pricing link, rating) - this page is the only one of the three missing it, and it is also missing the Google-reviews trust line entirely.
2. VERIFY WITH ULI the web-design package pricing ($1,800 / $3,200 / $5,900+) and the $300/month maintenance figure - neither appears in VERIFIED FACTS, which currently documents only the managed-IT plan pricing. If these are accurate and simply out of scope for VERIFIED FACTS, consider adding them so future audits can confirm rather than flag as unverifiable.
3. Move the cookie banner markup (line 106) to after `<main>` in the DOM, or otherwise ensure it does not precede the primary navigation and content for crawlers (same fix needed site-wide per the other two Hollister page audits).
