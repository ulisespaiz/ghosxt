# Page Audit: /watsonville

## Route
/watsonville (file: watsonville.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "An engineer with DoD infrastructure experience" | watsonville.html:7 (meta description), 148 (key-facts "Led by"), 226-227 | MATCHES |
| "Federal-grade" / "Government-grade" marketing language | tied to DoD/federal contractor background | watsonville.html:13 (og:description), 135 ("federal-grade engineering"), 165 ("Government-grade rigor"), 263 ("government-grade"), 300 (footer tagline), 424 (footer copyright) | MATCHES (marketing gloss on verified DoD/federal-contractor experience; not a separate factual claim) |
| Google reviews count/rating | "26 Google reviews," 5.0 stars | watsonville.html:140, 152 | MATCHES value, but flag: VERIFIED FACTS states this number "lives in one data file and nowhere else" - it is hardcoded twice in this page's markup, creating drift risk when the live count changes. VERIFY WITH ULI on intended architecture. |
| "Trusted... since 2021" | Client-serving start year 2021 | watsonville.html:140 | MATCHES (VERIFIED FACTS itself flags this year [VERIFY]) |
| Tiny Team Managed Security price | $600/mo flat, 1-4 users | watsonville.html:279 (visible FAQ answer) | MATCHES |
| Core Managed IT price | $125/user/mo | watsonville.html:279 | MATCHES |
| Secure Growth price | $175/user/mo | watsonville.html:279 | MATCHES |
| Compliance & Continuity price | $250/user/mo | watsonville.html:279 | MATCHES |
| Response time - remote support | Three different values on one page: "Same-day remote support" (key-facts), "resolved remotely the same hour" (body section), "resolved remotely the same business day" (FAQ + JSON-LD) | watsonville.html:149 (key-facts), 183 (IT Support section), 278 (visible FAQ), 44 (FAQPage JSON-LD) | CONTRADICTS (internal - the page contradicts itself; VERIFIED FACTS gives no response-time SLA to check against, only the unrelated 4-hour critical-incident notification) |
| Response time - on-site | "on-site within 24-48 hours" (key-facts) vs "same-day or next-day for non-emergencies" (FAQ + JSON-LD) | watsonville.html:149 vs 278, 44 | CONTRADICTS (internal - overlapping but not identical windows; not sourced in VERIFIED FACTS) |
| 24/7 monitoring | "Our monitoring runs 24/7" | watsonville.html:162, 231, 277 (FAQ), 43 (JSON-LD) | MATCHES ("managed detection and response with a 24/7 SOC") |
| Immutable backups | "immutable backups" (Why-Ghosxt section); "Immutable, tested backups" (specialty-grid card) | watsonville.html:165, 268 | UNVERIFIABLE - VERIFIED FACTS lists only "cloud backup for Microsoft 365 and Google Workspace," with no mention of immutability. VERIFY WITH ULI whether "immutable" is accurate before publishing under an unlisted-capability rule. |
| Endpoint detection and response (EDR) | "Endpoint detection and response, phishing-resistant MFA, immutable backup, and 24/7 monitoring" | watsonville.html:263 | UNVERIFIABLE - VERIFIED FACTS lists "managed detection and response with a 24/7 SOC," not "EDR" by name; close but not an exact match to the approved capability list |
| C-TPAT / CBP-aligned controls | "CBP-aligned cybersecurity controls and documentation" for carriers/importers/distributors | watsonville.html:168 | UNVERIFIABLE - not in the VERIFIED FACTS capability or deliverable list; the site has a dedicated /ctpat page but this specific "CBP-aligned" framing isn't sourced here |
| Web design starting price | "published pricing from $1,800" | watsonville.html:265 | UNVERIFIABLE - VERIFIED FACTS only covers managed-IT tier pricing ($600/$125/$175/$250) and onboarding fees; web-design pricing isn't addressed, so this can't be checked |
| Case example: "200-employee processor on Riverside" | Specific employee count + street/location reference | watsonville.html:160 | UNVERIFIABLE - reads as a possible anonymized case example (VERIFY WITH ULI per house rule against inventing a client, a number, or a story); "Riverside" is ambiguous (a Watsonville street vs. the city of Riverside, CA, ~300 miles away) and should be confirmed, not rewritten |
| Industries served | Berry farms/growers, food processing/packing, cold storage/distribution, logistics/trucking, manufacturing, professional services, healthcare, nonprofit/civic | watsonville.html:191-198 | UNVERIFIABLE - not individually enumerated in VERIFIED FACTS (only "excluded: dentists; wineries fine" is stated); no contradiction found |
| Dental reference | "HIPAA-compliant IT for medical and dental practices" (blog resource link) | watsonville.html:244 | CONTRADICTS - dental is an excluded vertical and must not appear anywhere on the site, including as a linked resource on a location page |
| Service-area cities (JSON-LD areaServed) | Watsonville, Salinas, Santa Cruz, Aptos | watsonville.html:39 | UNVERIFIABLE - inconsistent with the visible "nearby cities" list (below); scope not defined in VERIFIED FACTS |
| Service-area cities (visible "nearby cities" list) | Salinas, Santa Cruz, Monterey, Hollister | watsonville.html:203-207 | UNVERIFIABLE - differs from JSON-LD areaServed (Aptos appears only in JSON-LD; Monterey and Hollister appear only in the visible list) - internal inconsistency, VERIFY WITH ULI |
| LocalBusiness postal address | Watsonville, CA 95076 (locality/region/postal code only, no street address) | watsonville.html:39 | UNVERIFIABLE - VERIFIED FACTS states the owner is "Based in Salinas, CA"; this service-area-business address pattern (no street address) is common for local-SEO geo-targeting but should be confirmed as intentional rather than implying a Watsonville office |
| Service JSON-LD provider reference | `Service.provider.@id` = `https://ghosxt.com/#business` | watsonville.html:66 | CONTRADICTS - the only `LocalBusiness` defined on this page has `@id` = `https://ghosxt.com/watsonville#business` (line 39); the Service node points to a different, undefined `@id`, breaking the structured-data graph link on this page |
| FAQPage JSON-LD completeness | JSON-LD FAQPage has 6 Q&As; visible FAQ has 7 (includes a "What does managed IT cost?" pricing Q&A not present in JSON-LD) | watsonville.html:41-48 (JSON-LD) vs 275-282 (visible) | UNVERIFIABLE - visible/structured-data mismatch; not a factual contradiction but worth fixing for parity |
| Phone number | (831) 204-0501 / +18312040501 | watsonville.html:39, 105, 138, 153, 461 | UNVERIFIABLE - not covered by VERIFIED FACTS, but consistent throughout the page |
| Email | sales@ghosxt.com | watsonville.html:39, 411-414 | UNVERIFIABLE - not covered by VERIFIED FACTS |
| Credentials/certifications (M.S., CompTIA, AZ-104, ITIL, etc.) | none named on this page | - | N/A - page makes no specific credential claims, so nothing to contradict |
| Cisco certification | none found | - | N/A - no Cisco claim present (correct) |
| Clearance level | none stated, only "DoD infrastructure experience" | watsonville.html:7, 148 | MATCHES (no specific level stated, consistent with "never state the clearance level") |
| Vendor names | none found | - | N/A - no vendor names present (correct); "vendor-neutral" (line 164) is a description, not a vendor name |
| SIEM | none found | - | N/A - no SIEM claim present (correct, unlike some sibling pages) |
| Insurance / SAM.gov figures | not mentioned on this page | - | N/A |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at watsonville.html:144-155 has Service area, Led by, Response, Pricing (linked to /pricing), plus bonus Free/Rated/Direct-line rows |
| FAQ present with real question-and-answer text | Pass | Visible `<details>/<summary>` FAQ at watsonville.html:275-282 (7 Q&As) plus FAQPage JSON-LD at 41-48 (6 Q&As); see completeness mismatch noted in Claims Table |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (line 134) + lead paragraph (line 135) state the offer plainly ("Ghosxt brings federal-grade engineering to Watsonville growers, food processors, packers, and distributors...") well inside the first 300 words |
| Exactly one H1 | Pass | Single `<h1>` at watsonville.html:134 |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8 |
| JSON-LD present (list which types) | Pass | Two `<script type="application/ld+json">` blocks: first `@graph` (lines 36-51) contains LocalBusiness, BreadcrumbList, FAQPage; second block (lines 55-75) contains Service. Note the Service→LocalBusiness `@id` mismatch flagged in Claims Table. |
| Content that exists only inside JS | Pass (none found) | All headings, body copy, plan pricing, and FAQ are static HTML (FAQ uses native `<details>`); no evidence of content injected only via assets/js/main.min.js |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the file |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, watsonville.html:80) sits in the DOM before `<nav>` (81) and before `<main id="main-content">` (130) |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Multiple links to /pricing (99, 123, 150, 279, 324); links to nearby city pages (203-207, footer 443-453) and vertical pages (agriculture, healthcare, trucking, C-TPAT at 168, 247) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental - excluded vertical named as a linked topic | watsonville.html:244 ("HIPAA-compliant IT for medical and dental practices" - blog resource link text and href slug) |
| Possible unlisted capability - "immutable" backups (not in VERIFIED FACTS capability list) | watsonville.html:165, 268 |
| Possible unlisted capability - "CBP-aligned cybersecurity controls" (not in VERIFIED FACTS deliverable list) | watsonville.html:168 |

No em-dash, Cisco-certification, vendor-name, clearance-level, or SIEM violations were found on this page.

## Top Three Fixes
1. Remove or reword the dental reference at watsonville.html:244 - dentists are an excluded vertical and must not appear anywhere on the site, including in resource/blog link text on a location page. (This is a link label, not an anonymized case example or testimonial, so it is safe to flag for removal rather than only VERIFY-flagging.)
2. Resolve the three-way response-time contradiction: key-facts says "same-day remote / 24-48hr on-site" (line 149), the IT Support section says "same hour" remote (line 183), and the FAQ/JSON-LD say "same business day" remote / "same-day or next-day" on-site (lines 278, 44). Pick one accurate figure and apply it consistently - VERIFY WITH ULI, since VERIFIED FACTS does not define a response-time SLA.
3. Fix the structured-data bug: `Service.provider.@id` at watsonville.html:66 points to `https://ghosxt.com/#business`, but the only `LocalBusiness` defined on this page has `@id` = `https://ghosxt.com/watsonville#business` (line 39) - the reference doesn't resolve within this page's graph. Also move the cookie banner (line 80) so it no longer precedes `<nav>`/`<main>` in the DOM, and VERIFY WITH ULI on "immutable backups" (165, 268) and "CBP-aligned controls" (168) since neither is in the VERIFIED FACTS capability/deliverable list.
