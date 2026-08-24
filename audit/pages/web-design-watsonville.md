# Page Audit: /web-design-watsonville

## Route
/web-design-watsonville (file: web-design-watsonville.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "Central Coast engineer with deep DoD infrastructure experience" | web-design-watsonville.html:44, 217 | MATCHES - VERIFIED FACTS: "Active DoD clearance and prior DoD/federal contractor infrastructure experience" |
| Footer background line | "Built by an engineer from the federal contracting world." | web-design-watsonville.html:475 | MATCHES |
| Package pricing | "$1,800 Essential, $3,200 Business Pro, $5,900+ e-commerce or portals" | web-design-watsonville.html:7, 13, 19, 88, 228, 316 | UNVERIFIABLE - web design package pricing is not covered anywhere in VERIFIED FACTS (which documents only the managed-IT plan tiers: Tiny Team/Core/Secure Growth/Compliance & Continuity). Not a contradiction, but not sourced - VERIFY WITH ULI. |
| Multilingual add-on price | "$950" | web-design-watsonville.html:72, 308 | UNVERIFIABLE - not sourced in VERIFIED FACTS. VERIFY WITH ULI. |
| Website maintenance price | "from $300/month" | web-design-watsonville.html:259 | UNVERIFIABLE - not sourced in VERIFIED FACTS. VERIFY WITH ULI. |
| Free consultation length | "30 minutes with the engineer who would actually build your site" | web-design-watsonville.html:276, 324 | UNVERIFIABLE - not specified in VERIFIED FACTS |
| Phone number | (831) 204-0501 | web-design-watsonville.html:163, 223, 513 | UNVERIFIABLE - not covered by VERIFIED FACTS, but consistent throughout the page |
| Response time | none stated on this page | - | N/A - unlike the cloud/cybersecurity Watsonville pages, no response-time claim appears anywhere on this page |
| Google reviews / rating | none stated on this page | - | N/A - unlike the cloud/cybersecurity Watsonville pages, no "26 Google reviews / 5.0" trust callout appears here |
| "Since 2021" | none stated on this page | - | N/A - this page does not repeat the founding-year claim |
| Maintenance run by "same security team" | "run by the same security team that protects business networks" | web-design-watsonville.html:259, 294 | UNVERIFIABLE - general claim, not a specific figure to check, no contradiction found |
| Bilingual/Spanish builds | "Full English/Spanish builds," "real translated pages" | web-design-watsonville.html:64, 217, 247, 304 | UNVERIFIABLE - descriptive service claim, not covered by VERIFIED FACTS, no contradiction |
| Industries named | Ag/row crops, food processing, manufacturing, trucking, family businesses | web-design-watsonville.html:44, 217, 268 | UNVERIFIABLE - not enumerated in VERIFIED FACTS; no dental or other excluded-vertical mention found |
| Credentials/certifications | none named on this page | - | N/A - page makes no specific credential claims |
| Cisco certification | none found | - | N/A - no Cisco/Meraki claim present (correct) |
| Clearance level | none stated, only "DoD infrastructure experience" | web-design-watsonville.html:44, 217 | MATCHES (no specific level stated, per house rule) |
| SIEM / vendor names / dental | none found | - | N/A - no violations on this page |
| Case examples / testimonials | none present on this page | - | N/A |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No `<aside class="key-facts">` (or equivalent) exists on this page - confirmed absent (present on the sibling cloud-services-watsonville.html and cybersecurity-watsonville.html pages, but not here). Service area and "who you talk to" are stated in the hero prose (line 217) and pricing appears in a callout (line 228), but there is no dedicated at-a-glance block and no response-time figure anywhere on the page. |
| FAQ present with real question-and-answer text | Pass | Visible `<details>/<summary>` FAQ at web-design-watsonville.html:302-318 (4 Q&As), matching FAQPage JSON-LD at 56-93 |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (line 216) + lead paragraph (line 217) + pricing callout (line 228) state the offer plainly ("Ghosxt hand-codes websites for Watsonville businesses... Websites from $1,800, published upfront.") well inside the first 300 words |
| Exactly one H1 | Pass | Single `<h1>` at web-design-watsonville.html:216 |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8 |
| JSON-LD present (list which types) | Pass | `@graph` at web-design-watsonville.html:37-94 contains: Service, BreadcrumbList, FAQPage |
| Content that exists only inside JS | Pass (none found) | All headings, body copy, and FAQ are static HTML (FAQ uses native `<details>`); no evidence of content injected only via assets/js/main.min.js |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the file |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, web-design-watsonville.html:106-120) sits in the DOM before `<nav>` (121) and before `<main id="main-content">` (210) |
| Internal links to pricing and to the relevant city or vertical pages | Pass (with a note) | No in-content link to `/pricing` exists (only nav/footer boilerplate at lines 155, 197, 375) - the page instead links to `/website-development` (its instant calculator) for pricing, which is the contextually correct page since `/pricing` covers managed-IT plans, not web-design packages (lines 228, 269, 295, 329). Links to sibling city pages are present: `/web-design-santa-cruz`, `/web-design-salinas`, `/web-design-gilroy`, `/web-design-hollister` (line 295), plus `/watsonville`, `/cybersecurity-watsonville`, `/managed-it-services`. |

## House-Rule Violations
No em-dash, Cisco-certification, dental, vendor-name, clearance-level, or SIEM/unlisted-capability violations were found on this page.

| Violation | Location |
|-----------|----------|
| None found | - |

## Top Three Fixes
1. Add a `key-facts`-style at-a-glance block matching the sibling location pages (service area, who you talk to, a response-time figure, and a pricing link) - this page is the only one of the three audited that lacks one, and it also has no response-time claim anywhere.
2. Move the cookie banner (web-design-watsonville.html:106-120) so it no longer sits before `<nav>`/`<main>` in the DOM order.
3. VERIFY WITH ULI: confirm the web-design package prices ($1,800 / $3,200 / $5,900+), the $950 multilingual add-on, and the $300/month maintenance figure - none of these are sourced in VERIFIED FACTS (which only documents managed-IT plan pricing).
