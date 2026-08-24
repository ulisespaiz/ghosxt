# Page Audit: /web-design-san-jose

## Route
/web-design-san-jose (file: web-design-san-jose.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "Engineer with DoD infrastructure experience" | web-design-san-jose.html:44, 217 | MATCHES |
| Footer background line | "Built by an engineer from the federal contracting world." | web-design-san-jose.html:475 | MATCHES |
| **Excluded vertical named in hero copy** | "every plumber, **dentist**, restaurant, and firm is fighting page one" | web-design-san-jose.html:217 | **CONTRADICTS** - VERIFIED FACTS: "Excluded vertical: dentists. Dental must not appear as a client or target industry anywhere." The sentence frames dentist as one of the local San Jose business types this page's local-SEO pitch is written for, i.e. an implied target/prospect. |
| Pricing (meta/og description, FAQ) | "From $1,800" / "$1,800 to $5,900+ depending on scope" | web-design-san-jose.html:7, 13, 19, 64 (JSON-LD FAQ), 303-304 (visible FAQ) | UNVERIFIABLE - website-design package pricing is not covered by the VERIFIED FACTS pricing table (which documents only the managed-IT/MSP tiers: Tiny Team, Core, Secure Growth, Compliance & Continuity, plus onboarding fees). VERIFY WITH ULI. |
| Pricing (hero trust callout) | "Websites from $1,800, published upfront" | web-design-san-jose.html:228 | UNVERIFIABLE - same reason as above. VERIFY WITH ULI. |
| Pricing (Small-Business Pricing card) | "$1,800–$5,900 packages" | web-design-san-jose.html:251 | UNVERIFIABLE - same reason as above. VERIFY WITH ULI. |
| Pricing (competitor comparison, FAQ) | "Agencies in the valley routinely bid five figures for what is structurally a $3,200 site" | web-design-san-jose.html:80 (JSON-LD FAQ), 311-312 (visible FAQ) | UNVERIFIABLE - unsourced competitive/pricing claim, not covered by VERIFIED FACTS. VERIFY WITH ULI. |
| Pricing (FAQ: cost breakdown) | "$1,800 Essential, $3,200 Business Pro, $5,900+ e-commerce" | web-design-san-jose.html:88 (JSON-LD FAQ), 315-316 (visible FAQ) | UNVERIFIABLE - same reason as above. VERIFY WITH ULI. |
| Pricing (Maintenance & Security) | "from $300/month" | web-design-san-jose.html:259 | UNVERIFIABLE - not covered by VERIFIED FACTS. VERIFY WITH ULI. |
| Maintenance/security | "Run by the same security team that protects business networks" | web-design-san-jose.html:259, 294 | Consistent with the site's own cross-links to /cybersecurity-san-jose and /managed-it-services; not contradicted |
| SEO/technical claims | "Schema markup," "Core Web Vitals," Search Console tuning | web-design-san-jose.html:72 (JSON-LD FAQ), 242-247 | UNVERIFIABLE - general web-dev service description, no VERIFIED FACTS statement to check against; not contradicted |
| Verticals named (FAQ) | "Trades, restaurants, **clinics**, firms" | web-design-san-jose.html:64 (JSON-LD FAQ), 303-304 (visible FAQ) | MATCHES footer vertical (healthcare-it-services); "clinics" here is generic medical/professional, distinct from the dental mention above and not itself a violation |
| Cities served | Gilroy, Santa Cruz, Hollister, Salinas (web-design city pages) | web-design-san-jose.html:295 | MATCHES footer service-area list |
| Google reviews / rating | Not mentioned anywhere on this page | - | Note: unlike cloud-services-san-jose.html and cybersecurity-san-jose.html, this page carries no "5.0 / 26 Google reviews" trust signal at all - inconsistent trust presentation across the three templated San Jose pages. Not a factual error, but worth flagging. |
| Response time | Not mentioned anywhere on this page | - | Note: this page has no response-time claim at all (see Legibility Checklist - the entire at-a-glance block is missing) |
| Credentials/certifications | none named on this page | - | N/A - page makes no specific credential claims |
| Cisco certification | none found | - | N/A (correct) |
| Clearance level | none stated, only "DoD infrastructure experience" | web-design-san-jose.html:44, 217 | MATCHES (no specific level stated) |
| SIEM / vendor names | none found | - | N/A - no violations on this page |
| Phone number | (831) 204-0501 | web-design-san-jose.html:163, 223, 513 | UNVERIFIABLE - not covered by VERIFIED FACTS, but consistent throughout the page |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | **Fail** | No `<aside class="key-facts">` or equivalent block exists anywhere on this page (confirmed absent - the sibling cloud-services-san-jose.html and cybersecurity-san-jose.html both have this block right after the hero). No service-area statement outside the hero prose, no "who you talk to" line, and **no response-time claim anywhere on the page**. Only a single pricing-trust-callout line (line 228) linking to /website-development. |
| FAQ present with real question-and-answer text | Pass | Visible `<details>/<summary>` FAQ at web-design-san-jose.html:302-318 (4 Q&As), matching FAQPage JSON-LD at 57-92 |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (line 216) + lead paragraph (line 217) state the offer plainly ("Ghosxt gives San Jose small businesses a different deal: hand-coded, performance-first websites at published Central Coast prices...") well inside the first 300 words - though this same sentence is the one carrying the dental violation (see above) |
| Exactly one H1 | Pass | Single `<h1>` at web-design-san-jose.html:216 |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8 |
| JSON-LD present (list which types) | Pass | `@graph` at web-design-san-jose.html:37-94 contains: Service, BreadcrumbList, FAQPage |
| Content that exists only inside JS | Pass (none found) | All headings, body copy, and FAQ are static HTML (FAQ uses native `<details>`); no evidence of content injected only via assets/js/main.min.js |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the file |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, web-design-san-jose.html:106-120) sits in the DOM before `<nav>` (121) and before `<main id="main-content">` (210) |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /website-development (pricing/calculator, 228, 269, 295, 329-331); links to other web-design city pages (295: Gilroy, Santa Cruz, Hollister, Salinas) and to /san-jose (294); footer links to vertical pages (agriculture, trucking, manufacturing, healthcare, etc.) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental - "dentist" named as one of the local San Jose business types the page's local-SEO pitch targets | web-design-san-jose.html:217 |

No em-dash, Cisco-certification, vendor-name, clearance-level, or SIEM/unlisted-capability violations were found on this page.

## Top Three Fixes
1. Remove "dentist" from the hero paragraph (web-design-san-jose.html:217) - dentists are an excluded vertical and must not appear as a client or target industry anywhere. Replace with an allowed example (e.g., "plumber, restaurant, and firm" is already sufficient, or swap in another footer-listed vertical).
2. Add the missing at-a-glance block (service area, who you talk to, response time, pricing link) - this is the only one of the three audited San Jose pages entirely missing it, and as a result carries no response-time claim anywhere on the page. Consider also adding the "5.0 / 26 Google reviews" trust signal used on the sibling pages, which is absent here.
3. Move the cookie banner (web-design-san-jose.html:106-120) so it no longer sits before `<nav>`/`<main>` in the DOM order; also VERIFY WITH ULI all website-package pricing on this page ($1,800 Essential, $3,200 Business Pro, $5,900+ e-commerce, $300/month maintenance, and the "$3,200 site vs. five-figure agency bid" comparison) - none of these figures appear in the VERIFIED FACTS pricing table, which documents only the managed-IT/MSP tiers.
