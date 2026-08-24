# Page Audit: /professional-services-it

## Route
/professional-services-it

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Business address | Salinas, CA | professional-services-it.html:64-65 | MATCHES |
| Postal code | 93901 | professional-services-it.html:66 | UNVERIFIABLE |
| Phone number | (831) 204-0501 / +18312040501 | professional-services-it.html:59, 278, 342, 361, 852 | UNVERIFIABLE (not in VERIFIED FACTS; internally consistent throughout page) |
| Email | sales@ghosxt.com | professional-services-it.html:60, 801-804 | UNVERIFIABLE |
| Client tenure | "since 2021" | professional-services-it.html:347 | MATCHES (source fact itself carries [VERIFY year]) |
| Google reviews | 26 reviews, 5.0 rating | professional-services-it.html:347, 360 | MATCHES (source fact itself carries [VERIFY live count]) |
| Team lead credential | "An engineer with DoD infrastructure experience" | professional-services-it.html:356, 641 | MATCHES (no clearance level stated — compliant) |
| Response time SLA | "Same-day remote support; on-site within 24–48 hours" | professional-services-it.html:357 | UNVERIFIABLE — VERIFY WITH ULI (not in VERIFIED FACTS; the only response commitment on file is 4-hour notification on critical incidents, a different metric) |
| Free assessment length | "30-minute" / "30 minutes" | professional-services-it.html:359, 641 | UNVERIFIABLE — VERIFY WITH ULI |
| Pricing | "Published upfront" (no numbers stated, links to /pricing) | professional-services-it.html:348, 358 | MATCHES (correctly deferred to pricing page, nothing on-page to contradict) |
| Service-area naming | "Central Coast & Bay Area" (hero/key-facts) vs. "Central Coast and the South Bay" (service-area section) | professional-services-it.html:355 vs. 609-610 | UNVERIFIABLE (internally inconsistent terminology, not a VERIFIED FACTS conflict) |
| Cities served | Salinas, Monterey, Carmel, Santa Cruz, Pacific Grove, San Jose (+ footer: Watsonville, Hollister, Gilroy, Seaside, Marina) | professional-services-it.html:75-81, 613-620, 833-844 | UNVERIFIABLE (not enumerated in VERIFIED FACTS; no contradiction) |
| Duplicate Service schema areaServed | @graph Service = California only; second "extra-schema" Service = California + Salinas/Monterey/Santa Cruz/San Jose only (omits Carmel and Pacific Grove, which appear elsewhere on the page) | professional-services-it.html:89-91 vs. 184-205 | UNVERIFIABLE (self-inconsistent between the two JSON-LD blocks; flag for fix) |
| "Federal/government-grade" framing | "federal-grade engineering," "Government-grade IT for small business," "federal contracting world," "federal contracting auditor" | professional-services-it.html:336, 483, 690, 814 | MATCHES (consistent with DoD/federal-contractor background; no clearance level disclosed) |
| EDR deployment mention | "EDR deployment" named among items answered for cyber-insurance questionnaires | professional-services-it.html:136/479 (FAQ + compliance copy), 597 (glossary), 666 | UNVERIFIABLE — VERIFY WITH ULI (EDR is not on the approved capabilities list; page reads ambiguously as either "we report on your EDR posture" or "we deploy EDR" — confirm intended meaning) |
| M365 hardening scope detail | mailbox audit logging, retention, DLP, external sharing controls, app consent governance, conditional access | professional-services-it.html:383, 658 | MATCHES (reasonable elaboration of the verified "Microsoft 365 hardening ... Conditional Access" capability) |
| Case example: BEC wire-fraud near-miss | anonymized | professional-services-it.html:503-505 | UNVERIFIABLE — VERIFY WITH ULI |
| Case example: Phishing wave during tax season | anonymized | professional-services-it.html:508-523 | UNVERIFIABLE — VERIFY WITH ULI |
| Case example: Departing associate copied matter file | anonymized | professional-services-it.html:526-541 | UNVERIFIABLE — VERIFY WITH ULI |
| Case example: Filing-deadline VPN outage | anonymized | professional-services-it.html:544-557 | UNVERIFIABLE — VERIFY WITH ULI |
| Testimonial | anonymous, "Professional services client, multi-year Ghosxt partner" | professional-services-it.html:565-568 | UNVERIFIABLE — VERIFY WITH ULI |
| Sub-verticals served | law, CPA, financial advisors, real estate, insurance, architecture/engineering, marketing/consulting, nonprofits | professional-services-it.html:576-584 | MATCHES (no excluded vertical — dental does not appear) |
| Certifications / Cisco / SIEM / vendor names / clearance level | none appear on this page | n/a | MATCHES (nothing to contradict — page is clean on these categories) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">`, lines 351-363, has all four fields. |
| FAQ present with real question-and-answer text | Pass | Five real Q&As, lines 649-673, matching the FAQPage JSON-LD verbatim. |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero lead paragraph (line 336) states the offer ~120 words in, but the sentence is grammatically broken (see Top Fixes). |
| Exactly one H1 | Pass | Single `<h1>` at line 335. |
| Title, meta description, canonical present | Pass | Lines 7, 9-11, 12. Note: twitter:title (line 25) differs from the page title/og:title (lines 7, 17) — minor inconsistency, not a VERIFIED FACTS issue. |
| JSON-LD present (list which types) | Pass | LocalBusiness, Service (x2, duplicated with inconsistent areaServed), BreadcrumbList (x2, duplicated), FAQPage. |
| Content that exists only inside JS | Pass (none found) | FAQ uses native `<details>/<summary>`; no JS-gated content detected. |
| Icon-only table cells | N/A | Page has no `<table>` elements; icons in cards/dl are always paired with visible text. |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` or `sr-only` usage in this file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (lines 217-233) and the full mobile-menu link duplicate (lines 287-326) both sit before `<main>` (line 329). |
| Internal links to pricing and to the relevant city or vertical pages | Pass | `/pricing` linked repeatedly; city links to Salinas/Monterey/Carmel/Pacific Grove/Santa Cruz/San Jose (613-620) and vertical links to trucking/agriculture/manufacturing (630-632) plus footer vertical pages. |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| None found | — em dash (incl. %E2%80%94), Cisco certification, dental/dentist, clearance level, vendor names, and SIEM were all absent from this page. |

## Top Three Fixes
1. Fix the broken hero sentence: "...across the Central Coast and the Bay Area. federal-grade engineering, transparent pricing, no outsourced helpdesk." (line 336) reads as a dropped connector — most likely leftover from em-dash removal — leaving a lowercase sentence fragment right in the first-300-words offer statement. Repair the grammar (VERIFY WITH ULI on intended wording).
2. Verify the at-a-glance response-time claim, "Same-day remote support; on-site within 24–48 hours" (line 357) — this specific SLA is not in VERIFIED FACTS (only the 4-hour critical-incident notification commitment is on file, and that is a different metric). VERIFY WITH ULI before leaving it live.
3. Reconcile the two JSON-LD `Service` blocks (lines 84-96 and 155-209): the first scopes areaServed to California only, the second to California plus four named cities that omit Carmel and Pacific Grove (both of which appear elsewhere on the page and in the LocalBusiness schema). Consolidate to one consistent, accurate block.
