# Page Audit: /salinas

## Route
/salinas (file: salinas.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "Engineer with DoD infrastructure experience" | salinas.html:469, 492, 508, 566, 646, 723 (recurs) | MATCHES |
| "Government-grade" / "Federal-grade" / "federal security baselines" marketing language | tied to DoD/federal contractor background | salinas.html:646, 723, 897, 1021 | MATCHES (marketing gloss on verified DoD/federal-contractor experience; not a separate factual claim) |
| Tiny Team Managed Security price | $600/mo flat, 1–4 users | salinas.html:168-183 (JSON-LD), 522, 533, 745-746 | MATCHES |
| Core Managed IT price | $125/user/mo | salinas.html:186-201 (JSON-LD), 538, 746 | MATCHES |
| Secure Growth price | $175/user/mo | salinas.html:204-219 (JSON-LD), 543, 746 | MATCHES |
| Compliance & Continuity price | $250/user/mo | salinas.html:222-237 (JSON-LD), 548, 746 | MATCHES |
| Compliance & Continuity includes "Managed SIEM" | JSON-LD Offer description and visible plan card | salinas.html:235, 548 | CONTRADICTS — SIEM is not in the VERIFIED FACTS capability list; explicitly prohibited ("Do not claim SIEM or anything not listed") |
| Google reviews count/rating | "26 Google reviews," 5.0 stars | salinas.html:484, 496 | MATCHES value, but flag: VERIFIED FACTS states this number "lives in one data file and nowhere else" — it is hardcoded twice in this page's markup instead of sourced from that single file, creating drift risk when the live count changes. VERIFY WITH ULI on intended architecture. |
| "Trusted... since 2021" | Client-serving start year 2021 | salinas.html:484 | MATCHES (VERIFIED FACTS itself flags this year [VERIFY]) |
| Industries served: dental practices | "Healthcare and dental practices" / dental FAQ / dental blog card | salinas.html:609, 669, 777-778, 829, 831 | CONTRADICTS — Dental is an excluded vertical and must not appear as a client/target industry anywhere |
| Industries served (non-dental): agriculture, food processing, logistics/trucking/3PL, distribution, professional services/law, healthcare, property management, engineering/architecture/construction, retail/hospitality, nonprofit | salinas.html:591-609, 663-673, 723-877 | UNVERIFIABLE — not enumerated in VERIFIED FACTS (only "excluded: dentists; wineries fine" is stated); no contradiction found for these verticals |
| Response time: same-business-day first response / resolution | "Standard managed IT tiers carry a same-business-day first response... same-business-day resolution" | salinas.html:311-316 (JSON-LD FAQ), 765-766 | UNVERIFIABLE — VERIFIED FACTS lists only a contracted "4-hour notification on actual or reasonably suspected critical incidents," a different metric never mentioned on this page; this same-business-day SLA is not sourced in VERIFIED FACTS |
| On-site response window | "24 to 48 hours" for non-emergency Salinas visits | salinas.html:259 (JSON-LD FAQ), 493, 510, 559, 619, 738 | UNVERIFIABLE — not stated in VERIFIED FACTS, but internally consistent across the page |
| Free assessment length | "30-minute" (key-facts, hero CTA area) vs "30 to 60 minute call" (onboarding Week 0) | salinas.html:495, 695 vs 631 | UNVERIFIABLE / internal inconsistency — VERIFIED FACTS doesn't specify assessment length; the page itself is inconsistent (30 min in three places, "30 to 60 min" in one) — flag for VERIFY WITH ULI |
| Phone number | (831) 204-0501 / +18312040501 | salinas.html:77, 411, 479, 497, 709, 1059 | UNVERIFIABLE — not covered by VERIFIED FACTS, but consistent throughout the page |
| Email | sales@ghosxt.com | salinas.html:78, 1008-1011 | UNVERIFIABLE — not covered by VERIFIED FACTS |
| Business address | Salinas, CA 93901 | salinas.html:83-89 | Locality/state MATCHES ("Based in Salinas, CA"); ZIP 93901 UNVERIFIABLE (not in VERIFIED FACTS) |
| Opening hours | "Mo-Fr 08:00-18:00" | salinas.html:82 | UNVERIFIABLE — not in VERIFIED FACTS |
| Cyber-insurance readiness | "Controls that pass underwriting... Renewal documentation included," no dollar figure stated | salinas.html:652, 769-770, 819-822 | UNVERIFIABLE / not contradicted — page makes no specific $1M coverage claim to check, so nothing to compare against the VERIFIED FACTS insurance figure |
| Industry compliance frameworks referenced (client-side, not first-party certs) | FSMA, C-TPAT, GAP, SQF, PrimusGFS, HIPAA | salinas.html:600-607, 126-128 (JSON-LD knowsAbout) | UNVERIFIABLE — these describe client/industry standards Ghosxt claims familiarity with, not a Ghosxt credential; not covered by VERIFIED FACTS credential list, no direct contradiction |
| Credentials/certifications (M.S., CompTIA, AZ-104, ITIL, etc.) | none named on this page | — | N/A — page makes no specific credential claims, so nothing to contradict |
| Cisco certification | none found | — | N/A — no Cisco claim present (correct) |
| Clearance level | none stated, only "DoD infrastructure experience" / "DoD-cleared"-style language | salinas.html:469, 492 | MATCHES (no specific level stated, consistent with "never state the clearance level") |
| Service-area cities (JSON-LD areaServed + nearby-cities list) | Salinas, Monterey, Watsonville, Castroville, Marina, Seaside, Hollister, Pacific Grove, Carmel, Santa Cruz, Gilroy, Soledad, King City, Gonzales, Greenfield, San Jose (footer only), Monterey County, San Benito County | salinas.html:95-109, 613-624, 675-688, 1037-1052 | UNVERIFIABLE — service-area scope not defined in VERIFIED FACTS; no contradiction found |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at salinas.html:488-499 has Service area, Led by, Response, Pricing (linked to /pricing), plus bonus Free/Rated/Direct line rows |
| FAQ present with real question-and-answer text | Pass | Visible `<details>/<summary>` FAQ at salinas.html:736-779 (11 Q&As) plus FAQPage JSON-LD at 250-335 (10 Q&As). Note: the JSON-LD FAQPage is missing the dental/HIPAA FAQ that appears in visible markup (salinas.html:776-779) — a minor visible/structured-data mismatch, though removing the dental FAQ per the house-rule violation below resolves it anyway |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (line 468) + lead paragraph (line 469) state the offer plainly ("Ghosxt is a Salinas-based managed IT and cybersecurity provider...") well inside the first 300 words |
| Exactly one H1 | Pass | Single `<h1>` at salinas.html:468 |
| Title, meta description, canonical present | Pass | Title line 8, meta description lines 9-12, canonical line 14 |
| JSON-LD present (list which types) | Pass | `@graph` at salinas.html:64-338 contains: LocalBusiness, Service (with embedded OfferCatalog/Offer x4), BreadcrumbList, FAQPage |
| Content that exists only inside JS | Pass (none found) | All headings, body copy, plans, and FAQ are static HTML (FAQ uses native `<details>`); no evidence of content injected only via assets/js/main.min.js |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the file |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, salinas.html:350-366) sits in the DOM before `<nav>` (369) and before `<main id="main-content">` (462) |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Multiple links to /pricing (475, 494, 534, 539, 544, 549, 701, 871); links to nearby city pages (676-688) and vertical pages (agriculture, trucking, manufacturing, C-TPAT, professional services, healthcare, property management, engineering at 608-609) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| SIEM (capability not in VERIFIED FACTS) — "Managed SIEM" claimed in Compliance & Continuity tier | salinas.html:235 (JSON-LD Offer description), 548 (visible service-card copy) |
| Dental — excluded vertical named as a client/target industry | salinas.html:609 ("healthcare and dental practices"), 669 ("Healthcare and dental practices" industries list), 777 (FAQ question "...medical and dental practices in Salinas?"), 778 (FAQ answer referencing dental/HIPAA), 829 (resource card h3 "HIPAA-compliant IT for medical and dental practices"), 831 (resource card link text "...medical and dental in Monterey County") |

No em-dash, Cisco-certification, vendor-name, or clearance-level violations were found on this page.

## Top Three Fixes
1. Remove the "Managed SIEM" claim from both the Compliance & Continuity JSON-LD Offer description (salinas.html:235) and the matching visible plan-card copy (salinas.html:548) — SIEM is not in the VERIFIED FACTS capability list and is explicitly prohibited. Replace with an actual listed capability (PM to choose replacement wording; do not invent).
2. Remove all six dental references (salinas.html:609, 669, 777, 778, 829, 831) — dentists are an excluded vertical and must not appear as a client or target industry anywhere on the site, including in FAQ questions and resource-card link text.
3. Move the cookie banner (salinas.html:350-366) so it no longer sits before `<nav>`/`<main>` in the DOM order; also resolve the duplicated hardcoding of the "26 Google reviews / 5.0" figure (lines 484, 496) against the single data-file source of truth flagged in VERIFIED FACTS — VERIFY WITH ULI on the intended templating mechanism.
