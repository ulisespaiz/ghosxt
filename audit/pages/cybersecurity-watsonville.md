# Page Audit: /cybersecurity-watsonville

## Route
/cybersecurity-watsonville (file: cybersecurity-watsonville.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "Engineer with DoD infrastructure experience" | cybersecurity-watsonville.html:6, 19, 45, 220, 240 | MATCHES — VERIFIED FACTS: "Active DoD clearance and prior DoD/federal contractor infrastructure experience" |
| "Government-grade cybersecurity" / "same class of controls used to protect government endpoints" | Marketing framing tied to DoD background | cybersecurity-watsonville.html:13, 19, 220, 261 | UNVERIFIABLE — no specific clearance level is stated (correct per house rule), but the claim itself is not sourced/quantified in VERIFIED FACTS. VERIFY WITH ULI. |
| Footer background line | "Built by an engineer from the federal contracting world." | cybersecurity-watsonville.html:494 | MATCHES |
| Google reviews count/rating | "26 Google reviews," 5.0 stars | cybersecurity-watsonville.html:231, 244 | MATCHES — VERIFIED FACTS: "26 at 5.0 as of August 2026" |
| "Trusted... since 2021" | Client-serving start year 2021 | cybersecurity-watsonville.html:231 | UNVERIFIABLE — VERIFIED FACTS itself flags this year "[VERIFY year]"; the page states it as settled fact. VERIFY WITH ULI. |
| Response time (key-facts block) | "Same-day remote support; on-site within 24–48 hours" | cybersecurity-watsonville.html:241 | UNVERIFIABLE — not stated anywhere in VERIFIED FACTS (which only documents a 4-hour notification SLA for critical incidents, a different metric). VERIFY WITH ULI. |
| Response time (body copy) | "Same-day or next-day for non-emergencies, immediate remote response for anything critical" | cybersecurity-watsonville.html:314 | UNVERIFIABLE — not sourced in VERIFIED FACTS, and worded inconsistently with the "24–48 hours" figure in the key-facts block at line 241 (internal inconsistency). VERIFY WITH ULI. |
| Free assessment length | "No-obligation 30-minute IT assessment" | cybersecurity-watsonville.html:243, 294 | UNVERIFIABLE — not specified in VERIFIED FACTS |
| Phone number | (831) 204-0501 | cybersecurity-watsonville.html:166, 226, 245, 532 | UNVERIFIABLE — not covered by VERIFIED FACTS, but consistent throughout the page |
| Pricing | "Cybersecurity is built into every managed plan: pricing published upfront" (links to /pricing, no dollar figures stated on this page) | cybersecurity-watsonville.html:232 | Not contradicted — no specific numbers on this page to check against the VERIFIED FACTS pricing table |
| Endpoint Detection & Response | "**Huntress** EDR with a 24/7 SOC on every endpoint, layered with **Microsoft Defender**" | cybersecurity-watsonville.html:265 | CONTRADICTS house rule — "Huntress" is an undisclosed vendor name; VERIFIED FACTS says to describe "managed detection and response with a 24/7 SOC" and "never publish vendor names." (Microsoft Defender is fine — it is explicitly named in VERIFIED FACTS as "Defender for Business.") |
| 24/7 SOC on endpoints | "24/7 SOC on every endpoint" | cybersecurity-watsonville.html:265 | MATCHES capability list ("managed detection and response with a 24/7 SOC") — apart from the vendor name issue above |
| Identity & MFA | "Phishing-resistant MFA, Conditional Access, and the death of legacy auth" | cybersecurity-watsonville.html:269 | MATCHES capability list (M365 hardening w/ Conditional Access; GWS phishing-resistant MFA) |
| Immutable Backup | "Backups the production network cannot reach or delete, with monthly tested restores" | cybersecurity-watsonville.html:272-273 | MATCHES capability "cloud backup for Microsoft 365 and Google Workspace"; "monthly tested restores" cadence is not itself stated in VERIFIED FACTS — UNVERIFIABLE detail, VERIFY WITH ULI |
| Email Security & Training | "Email filtering plus security-awareness training" | cybersecurity-watsonville.html:276-277 | UNVERIFIABLE / possible unlisted capability — VERIFIED FACTS lists "security awareness training" and "DNS and web filtering" but not "email filtering" as a named capability. VERIFY WITH ULI. |
| Vulnerability Management | "Continuous scanning and fast patching across Windows, macOS, and 200+ third-party apps" | cybersecurity-watsonville.html:280-281 | UNVERIFIABLE / possible unlisted capability — VERIFIED FACTS lists "OS and third-party patching" but not continuous vulnerability scanning as a distinct capability, and the "200+ third-party apps" figure is not sourced anywhere. VERIFY WITH ULI. |
| HIPAA for medical and dental practices | "we also handle C-TPAT cybersecurity, and HIPAA for local medical and dental practices" | cybersecurity-watsonville.html:306 | CONTRADICTS — "dental" is an explicitly excluded vertical in VERIFIED FACTS ("Dental must not appear as a client or target industry anywhere"). HIPAA/medical compliance work is also not among the listed capabilities/deliverables. |
| C-TPAT cybersecurity | "we also handle C-TPAT cybersecurity" | cybersecurity-watsonville.html:306 | UNVERIFIABLE — not in the VERIFIED FACTS capability list, though C-TPAT is an established separate service line elsewhere on the site (footer nav, /ctpat page). VERIFY WITH ULI. |
| Industries named (non-dental) | Berry farms, food processors, cold-storage operators, distributors/carriers | cybersecurity-watsonville.html:45, 220, 253 | UNVERIFIABLE — not enumerated in VERIFIED FACTS; no other excluded-vertical conflicts found |
| Cisco certification | none found | — | N/A — no Cisco/Meraki claim present (correct) |
| Clearance level | none stated, only "DoD infrastructure experience" / "government-grade" | cybersecurity-watsonville.html:6, 220, 261 | MATCHES (no specific level stated, per house rule) |
| SIEM | none found | — | N/A — no SIEM claim present (correct) |
| Case examples / testimonials | none present on this page | — | N/A |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at cybersecurity-watsonville.html:236-247 has Service area, Led by, Response, Pricing (linked to /pricing), plus Free/Rated/Direct line rows |
| FAQ present with real question-and-answer text | Pass | Visible `<details>/<summary>` FAQ at cybersecurity-watsonville.html:321-336 (4 Q&As), matching FAQPage JSON-LD at 57-93 |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (line 219) + lead paragraph (line 220) state the offer plainly ("Ghosxt brings government-grade cybersecurity, sized and priced for a Watsonville small business...") well inside the first 300 words |
| Exactly one H1 | Pass | Single `<h1>` at cybersecurity-watsonville.html:219 |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8 |
| JSON-LD present (list which types) | Pass | `@graph` at cybersecurity-watsonville.html:38-95 contains: Service, BreadcrumbList, FAQPage |
| Content that exists only inside JS | Pass (none found) | All headings, body copy, and FAQ are static HTML (FAQ uses native `<details>`); no evidence of content injected only via assets/js/main.min.js |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the file |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, cybersecurity-watsonville.html:107-121) sits in the DOM before `<nav>` (124) and before `<main id="main-content">` (213) |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (232, 242); links to nearby city pages (314: Santa Cruz, Salinas, Hollister, Monterey), /cloud-services-watsonville, /ctpat, and vertical pages via footer (agriculture, trucking, manufacturing, professional services, healthcare, property management, engineering, hospitality) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Vendor name ("Huntress" EDR) | cybersecurity-watsonville.html:265 |
| Dental ("HIPAA for local medical and dental practices") | cybersecurity-watsonville.html:306 |
| Possible unlisted capability ("Email filtering" — not in the VERIFIED FACTS capability list) | cybersecurity-watsonville.html:276-277 |
| Possible unlisted capability ("Vulnerability Management" / continuous scanning of 200+ third-party apps — not in the VERIFIED FACTS capability list) | cybersecurity-watsonville.html:280-281 |

## Top Three Fixes
1. Remove the vendor name "Huntress" from the Endpoint Detection & Response card (line 265) — describe as "managed detection and response with a 24/7 SOC" per VERIFIED FACTS, no vendor name. Microsoft Defender may stay since it is explicitly named in VERIFIED FACTS.
2. Remove "dental" from line 306 ("HIPAA for local medical and dental practices") — dental is an explicitly excluded vertical and must not appear anywhere on the site. Also VERIFY WITH ULI whether HIPAA/medical compliance work and C-TPAT cybersecurity should be added to the approved capabilities list, since neither currently appears in VERIFIED FACTS.
3. VERIFY WITH ULI: "Email filtering" (line 276-277) and "Vulnerability Management" / continuous scanning of "200+ third-party apps" (line 280-281) against the approved capability list, and reconcile the two different response-time claims on this page (line 241 vs. line 314).
