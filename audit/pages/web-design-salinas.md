# Page Audit: /web-design-salinas

## Route
/web-design-salinas (file: web-design-salinas.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "Local engineer with deep DoD infrastructure experience" | web-design-salinas.html:44, 217 | MATCHES |
| Footer background line | "Built by an engineer from the federal contracting world." | web-design-salinas.html:475 | MATCHES |
| Pricing (meta/og description) | "From $1,800" | web-design-salinas.html:7, 13 | UNVERIFIABLE - website-design package pricing is not covered by the VERIFIED FACTS pricing table (which documents only the managed-IT/MSP tiers: Tiny Team, Core, Secure Growth, Compliance & Continuity, plus onboarding fees). VERIFY WITH ULI. |
| Pricing (FAQ / body) | "$1,800 for a 3-5 page Essential site, $3,200 for the 8-12 page Business Pro, and $5,900+ for e-commerce or portals" | web-design-salinas.html:72, 308 (FAQPage JSON-LD and matching visible FAQ) | UNVERIFIABLE - same reason as above; no source in VERIFIED FACTS to confirm these figures. VERIFY WITH ULI. |
| Pricing (Maintenance & Security) | "from $300/month" | web-design-salinas.html:259 | UNVERIFIABLE - not covered by VERIFIED FACTS. VERIFY WITH ULI. |
| Portfolio/case claims | "Campaign sites, machine-shop sites, nonprofit and renter-advocacy sites, all built for real Salinas organizations" | web-design-salinas.html:217 | UNVERIFIABLE (anonymized case reference, no named client) - VERIFY WITH ULI |
| Portfolio/case claims | "Shipped sites for Salinas organizations you may already know, from advocacy groups to a mayoral campaign to industrial shops" | web-design-salinas.html:247 | UNVERIFIABLE (anonymized case reference, no named client) - VERIFY WITH ULI |
| Portfolio/case claims | "Several of our live portfolio projects are Salinas organizations" | web-design-salinas.html:64, 304 (JSON-LD FAQ + visible FAQ) | UNVERIFIABLE (anonymized case reference, no named client) - VERIFY WITH ULI |
| Bilingual add-on | "Real translated pages (not a widget)" for English/Spanish | web-design-salinas.html:77-80, 250-251, 311-312 | Not contradicted - no VERIFIED FACTS statement to check against; general service description |
| Maintenance/security | "Run by the same security team that protects business networks" | web-design-salinas.html:259, 294 | Consistent with the site's own cross-links to /cybersecurity and /managed-it-services; not contradicted |
| Google reviews / rating | Not mentioned anywhere on this page | - | Note: unlike cloud-services-salinas.html and cybersecurity-salinas.html, this page carries no "5.0 / 26 Google reviews" trust signal at all - inconsistent trust presentation across the three templated pages. Not a factual error, but worth flagging. |
| Response time | Not mentioned anywhere on this page | - | Note: this page has no response-time claim at all (see Legibility Checklist - the entire at-a-glance block is missing) |
| Credentials/certifications | none named on this page | - | N/A - page makes no specific credential claims |
| Cisco certification | none found | - | N/A (correct) |
| Clearance level | none stated, only "DoD infrastructure experience" | web-design-salinas.html:44, 217 | MATCHES (no specific level stated) |
| Dental / SIEM / vendor names | none found | - | N/A - no violations on this page |
| Phone number | (831) 204-0501 | web-design-salinas.html:163, 223, 513 | UNVERIFIABLE - not covered by VERIFIED FACTS, but consistent throughout the page |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | **Fail** | No `<aside class="key-facts">` or equivalent block exists anywhere on this page (confirmed absent - the other two audited pages, cloud-services-salinas.html and cybersecurity-salinas.html, both have this block right after the hero). There is no service-area statement outside the hero prose, no "who you talk to" line, and **no response-time claim anywhere on the page**. Only a single pricing-trust-callout line (line 228) links to /website-development. |
| FAQ present with real question-and-answer text | Pass | Visible `<details>/<summary>` FAQ at web-design-salinas.html:302-318 (4 Q&As), matching FAQPage JSON-LD at 57-92 |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (line 216) + lead paragraph (line 217) state the offer plainly ("Ghosxt hand-codes websites for Salinas small businesses... from a local engineer with deep DoD infrastructure experience") well inside the first 300 words |
| Exactly one H1 | Pass | Single `<h1>` at web-design-salinas.html:216 |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8 |
| JSON-LD present (list which types) | Pass | `@graph` at web-design-salinas.html:37-92 contains: Service, BreadcrumbList, FAQPage |
| Content that exists only inside JS | Pass (none found) | All headings, body copy, and FAQ are static HTML (FAQ uses native `<details>`); no evidence of content injected only via assets/js/main.min.js |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the file |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, web-design-salinas.html:106-120) sits in the DOM before `<nav>` (121) and before `<main id="main-content">` (210) |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /website-development (pricing/calculator, 228, 269, 295, 329-331); links to other web-design city pages (295: Monterey, Watsonville, Hollister, Marina); footer links to vertical pages (agriculture, trucking, manufacturing, healthcare, etc.) |

## House-Rule Violations
No em-dash, Cisco-certification, dental, vendor-name, clearance-level, or SIEM/unlisted-capability violations were found on this page.

| Violation | Location |
|-----------|----------|
| None found | - |

## Top Three Fixes
1. Add the missing at-a-glance block (service area, who you talk to, response time, pricing link) - this page is the only one of the three templated pages entirely missing it, and as a result carries no response-time claim anywhere on the page at all.
2. VERIFY WITH ULI: all website-package pricing on this page ($1,800 Essential, $3,200 Business Pro, $5,900+ e-commerce/portals, $300/month maintenance) - none of these figures appear in the VERIFIED FACTS pricing table, which documents only the managed-IT/MSP tiers.
3. VERIFY WITH ULI: the anonymized portfolio/case references ("mayoral campaign," "machine-shop sites," "advocacy groups," "renter-advocacy sites") - no named clients or verifiable specifics are given. Also consider adding the "5.0 / 26 Google reviews" trust signal used on the other two templated pages, which is absent here.
