# Page Audit: /santa-clara-county

## Route
/santa-clara-county (file: santa-clara-county.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "an engineer with DoD infrastructure experience" | santa-clara-county.html:7, 43, 112, 125, 178, 199 | MATCHES |
| Clearance level | none stated, only "DoD infrastructure experience" | santa-clara-county.html:7, 112, 125, 178 | MATCHES (no specific level stated, consistent with "never state the clearance level") |
| "Federal-grade" / "Government-grade" / "SOC 2-aware cloud" marketing language | tied to DoD/federal contractor background and SOC 2 documentation deliverable | santa-clara-county.html:13, 19, 112, 213, 279 | MATCHES (marketing gloss on verified DoD/federal-contractor experience and the SOC 2 documentation deliverable; not separately verifiable line items) |
| Tiny Team Managed Security price | $600/mo flat, 1 to 4 users | santa-clara-county.html:46 (JSON-LD FAQ), 202 (visible FAQ) | MATCHES |
| Core Managed IT price | $125/user/mo | santa-clara-county.html:46, 202 | MATCHES |
| Secure Growth price | $175/user/mo | santa-clara-county.html:46, 202 | MATCHES |
| Compliance & Continuity price | $250/user/mo | santa-clara-county.html:46, 202 | MATCHES |
| Google reviews count/rating | "26 Google reviews," 5.0 stars | santa-clara-county.html:117, 129 | MATCHES value (26 at 5.0 per VERIFIED FACTS and site-config.json `google_review_count: 26`), but VERIFIED FACTS itself flags this "[VERIFY live count]" and says the number "lives in one data file and nowhere else" - it is hardcoded twice on this page (identical text to 55+ other pages per audit/inventory.md) instead of pulled from that file. No AggregateRating/reviewCount JSON-LD backs the visible text (inventory.md: "Notable gaps"). VERIFY WITH ULI on architecture. |
| "...trusted by businesses across **Monterey County** since 2021 and beyond" | Names Monterey County as the trusted-client base | santa-clara-county.html:117 | CONTRADICTS - this is a page about Santa Clara County (hero, H1, key facts, and areaServed all say Santa Clara County), but the trust callout directly beneath the hero names a different county. Confirmed via grep this exact sentence is a hardcoded, unparameterized chrome string reused verbatim across dozens of pages (Hollister, Pacific Grove, Monterey, santa-cruz-county.html, san-benito-county.html, etc.) - a sitewide bug, not unique to this page, but it lands on this page as a direct geography contradiction with the page's own stated service area. |
| "...since 2021" (client-serving start year) | 2021 | santa-clara-county.html:117 | UNVERIFIABLE (VERIFIED FACTS itself flags this year "[VERIFY]") |
| Industries served: "Healthcare and dental" | listed as a target industry | santa-clara-county.html:169 (visible industries list) | CONTRADICTS - dentists are an excluded vertical; VERIFIED FACTS: "Dental must not appear as a client or target industry anywhere." Only one occurrence on this page (JSON-LD FAQ and visible FAQ do not repeat it here, unlike the sibling monterey-county.html page). |
| Industries served (non-dental): Technology/SaaS/startups, professional services/legal, distribution/manufacturing, logistics/trucking, retail/hospitality | santa-clara-county.html:166-171 | UNVERIFIABLE - not individually enumerated in VERIFIED FACTS (only "excluded: dentists; wineries fine" is stated); no contradiction found |
| Cybersecurity: "EDR, MFA, immutable backups, and compliance. Government-grade rigor." | santa-clara-county.html:156 | UNVERIFIABLE - VERIFIED FACTS lists "managed detection and response with a 24/7 SOC," not "EDR" by name; "immutable backups" is not on the capabilities list either (only "cloud backup for Microsoft 365 and Google Workspace" is). Not a named vendor, but not verbatim on the approved capability list either. VERIFY WITH ULI. |
| "Immutable backups and tested restores tied to your real RTO and RPO" | santa-clara-county.html:158 | UNVERIFIABLE - same "immutable" gap as above |
| "24/7 monitoring, helpdesk, patching, and a real engineer who answers the phone" | santa-clara-county.html:153 | MATCHES (consistent with "24/7 SOC" and "OS and third-party patching" on the capabilities list) |
| Cyber insurance questionnaire/renewal readiness help for clients | santa-clara-county.html:151 | UNVERIFIABLE - VERIFIED FACTS mentions Ghosxt's own cyber liability insurance, not a client-facing cyber-insurance-questionnaire service; no contradiction found, but not sourced either |
| Can get a "tech company SOC 2 ready" - configures M365/cloud with access controls, logging, evidence a SOC 2 audit expects | santa-clara-county.html:44 (JSON-LD), 200 (visible FAQ) | MATCHES directionally ("SOC 2 documentation for every platform in our stack provided during onboarding" is a contracted deliverable), though "run them day to day so the audit reflects reality" is elaboration beyond the literal VERIFIED FACTS wording - minor VERIFY WITH ULI on phrasing precision |
| On-site response window | "Same-day remote support; on-site within 24–48 hours" | santa-clara-county.html:126 (key facts) | UNVERIFIABLE - not stated in VERIFIED FACTS (which only names a "4-hour notification on actual or reasonably suspected critical incidents" deliverable, a different metric). Only one occurrence on this page - no internal contradiction. |
| Free, no-obligation 30-minute IT assessment | santa-clara-county.html:114, 128, 184-186 | UNVERIFIABLE - business offer term, not covered by VERIFIED FACTS; internally consistent throughout the page |
| Phone number | (831) 204-0501 / +18312040501 | santa-clara-county.html:39, 82, 115, 130, 309 | UNVERIFIABLE - not covered by VERIFIED FACTS, but consistent throughout the page |
| Email | sales@ghosxt.com | santa-clara-county.html:39, 273 | UNVERIFIABLE - not covered by VERIFIED FACTS |
| Business/service-area location | Salinas, CA 93905 (LocalBusiness address); areaServed "Santa Clara County, California" | santa-clara-county.html:39 | MATCHES "Based in Salinas, CA"; areaServed correctly reflects the page topic (unlike the trust-callout county mismatch above) |
| Santa Clara County economy: Applied Materials, Intel, Nvidia, Oracle, Ericsson headquartered/hosted in the city of Santa Clara; Stanford Health Care and Santa Clara Valley Healthcare anchor the medical system | santa-clara-county.html:193 | UNVERIFIABLE - third-party regional/economic claims with no citation on the page and no coverage in VERIFIED FACTS (not claims about Ghosxt itself, but stated as fact). VERIFY WITH ULI. |
| Credentials/certifications (M.S., CompTIA, AZ-104, ITIL, etc.) | none named on this page | - | N/A - page makes no specific credential claims |
| Cisco certification | none found | - | N/A - no Cisco/Meraki claim present (correct) |
| SIEM | none found | - | N/A |
| Clearance level (specific, e.g. "Secret") | none found | - | N/A - correct, only "DoD infrastructure experience" is used |
| Vendor/tool brand names (e.g. specific EDR/SOC/password-vault/backup product) | none found | - | N/A - no violation; Microsoft 365, Google Workspace mentions (line 157) are the client's own platform names, which VERIFIED FACTS explicitly permits |
| Cyber liability insurance ($1M) / SAM.gov registration | not mentioned on this page | - | N/A - no claim made, nothing to check |
| Testimonials / case examples | none present on this page | - | N/A |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at santa-clara-county.html:121-132: Service area, Led by, Response, Pricing (linked to /pricing), plus Free/Rated/Direct line rows |
| FAQ present with real question-and-answer text | Pass | Visible `<details>/<summary>` FAQ at santa-clara-county.html:199-202 (4 Q&As), matching FAQPage JSON-LD at 42-47 |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (line 111) + lead paragraph (line 112) state the offer plainly, well within the first 300 words |
| Exactly one H1 | Pass | Single `<h1>` at santa-clara-county.html:111 |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8 |
| JSON-LD present (list which types) | Pass, with a bug | One `<script type="application/ld+json">` `@graph` block (lines 35-50): LocalBusiness (39), BreadcrumbList (40), Service (41), FAQPage (42-47). Bug: the Service node's `"provider": {"@id": "https://ghosxt.com/#business"}` (line 41) does not match the LocalBusiness node's own page-scoped `@id`, `"https://ghosxt.com/santa-clara-county#business"` (line 39) - the reference does not resolve within this page's graph. |
| Content that exists only inside JS | Pass (none found) | All headings, body copy, service cards, industries list, and FAQ are static HTML (FAQ uses native `<details>`); no evidence of content injected only via assets/js/main.min.js |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the file |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, santa-clara-county.html:57) sits in the DOM before `<nav>` (58) and before `<main id="main-content">` (107); the mobile nav link set (`.navbar-mobile-menu`, 86-105) is also a full duplicate of the desktop menu preceding `<main>`. Sitewide chrome pattern (per audit/inventory.md, present on 214/215 pages), not unique to this page. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (76, 100, 127, 230); in-county city pages (San Jose, Gilroy, Morgan Hill) at 140-142; San Jose service sub-pages (cybersecurity-san-jose, cloud-services-san-jose) at 145; neighboring county pages (Monterey, Santa Cruz, San Benito) at 179; /cyber-insurance-compliance at 151 |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental - excluded vertical named as a target industry ("Healthcare and dental") | santa-clara-county.html:169 (visible industries list) |
| "EDR" named specifically (VERIFIED FACTS says "managed detection and response," not "EDR") and "immutable backups" (not a qualifier used in VERIFIED FACTS) | santa-clara-county.html:156, 158 |

No em dash (literal, URL-encoded, or entity form), Cisco certification, vendor product name, SIEM, or clearance-level violation was found on this page. The EDR/"immutable" item above is borderline: it is not on the explicit "never claim" list (only SIEM is named there), but it is also not verbatim on the "capabilities we actually deliver" list, so it is flagged per the "SIEM or any capability not in VERIFIED FACTS" check rather than treated as confirmed clean. The "trusted by businesses across Monterey County" line (santa-clara-county.html:117) is not one of the six named violation categories, so it is not in this table, but see the Claims Table and Top Fixes - it is a direct geography contradiction on this specific page.

## Top Three Fixes
1. Remove "dental" from the industries list (santa-clara-county.html:169) - dentists are an excluded vertical and must not appear as a client or target industry anywhere on the site. This is a hard contradiction of VERIFIED FACTS, not a judgment call.
2. Fix the trust-callout line at santa-clara-county.html:117 - it names "Monterey County" on a page whose hero, key facts, and JSON-LD areaServed all say Santa Clara County. Root cause is a shared, unparameterized chrome string (confirmed identical on dozens of other pages, including the other two county pages), so the real fix belongs in the source template/generator (per audit/inventory.md, the `ghosxt:trust-reviews` marker), not a one-off hand edit to this file - flag for the PM to fix at the source. Also VERIFY WITH ULI whether the hardcoded "26 Google reviews / 5.0" figure (lines 117, 129) should instead be sourced from the single data file VERIFIED FACTS names as its home.
3. VERIFY WITH ULI the "EDR" / "immutable backups" capability wording (santa-clara-county.html:156, 158) against the exact VERIFIED FACTS capability list (e.g., "managed detection and response with a 24/7 SOC," "cloud backup for Microsoft 365 and Google Workspace"); also fix the JSON-LD `@id` mismatch (Service.provider references `https://ghosxt.com/#business` at line 41, but the page's own LocalBusiness node is `@id`'d as `https://ghosxt.com/santa-clara-county#business` at line 39) so the Service node actually resolves to the business entity.
