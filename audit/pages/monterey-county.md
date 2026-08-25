# Page Audit: /monterey-county

## Route
/monterey-county (file: monterey-county.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "run by an engineer with DoD infrastructure experience" | monterey-county.html:7, 45, 112, 125, 211 | MATCHES |
| Clearance level | none stated, only "DoD infrastructure experience" | monterey-county.html:7, 45, 112, 125, 211 | MATCHES (no specific level stated, consistent with "never state the clearance level") |
| "Federal-grade" / "Government-grade" marketing language | tied to DoD/federal contractor background | monterey-county.html:13, 19, 223, 289 | MATCHES (marketing gloss on verified DoD/federal-contractor experience; not a separate factual claim) |
| Tiny Team Managed Security price | $600/mo flat, 1 to 4 users | monterey-county.html:46 (JSON-LD FAQ), 212 (visible FAQ) | MATCHES |
| Core Managed IT price | $125/user/mo | monterey-county.html:46, 212 | MATCHES |
| Secure Growth price | $175/user/mo | monterey-county.html:46, 212 | MATCHES |
| Compliance & Continuity price | $250/user/mo | monterey-county.html:46, 212 | MATCHES |
| Google reviews count/rating | "26 Google reviews," 5.0 stars | monterey-county.html:117, 129 | MATCHES value, but VERIFIED FACTS itself flags this as "[VERIFY live count]" and says the number "lives in one data file and nowhere else" - it is hardcoded twice on this page instead of pulled from that file, creating drift risk. VERIFY WITH ULI on architecture. |
| "Trusted... since 2021" | client-serving start year 2021 | monterey-county.html:117 | UNVERIFIABLE (VERIFIED FACTS itself flags this year "[VERIFY]") |
| Industries served: "Healthcare and dental" | listed as a target industry | monterey-county.html:44 (JSON-LD FAQ), 177 (visible industries list), 210 (visible FAQ) | CONTRADICTS - dentists are an excluded vertical; VERIFIED FACTS: "Dental must not appear as a client or target industry anywhere" |
| Industries served (non-dental): agriculture/food processing/cold storage, hospitality/hotels/restaurants, defense contractors, logistics/trucking/distribution, professional services/legal, wineries/vineyards/tasting rooms, retail/nonprofit/civic | monterey-county.html:174-181 | UNVERIFIABLE - not individually enumerated in VERIFIED FACTS (only "excluded: dentists; wineries fine" is stated); no contradiction found |
| Defense contractors: "CMMC / NIST 800-171" compliance framing | monterey-county.html:176 | UNVERIFIABLE - CMMC/NIST 800-171 work is not on the VERIFIED FACTS "capabilities we actually deliver" list, nor the "contracted deliverables" list (which names only an annual independent risk assessment, SOC 2 documentation, and a written policy suite). VERIFY WITH ULI before publishing a specific compliance-framework claim. |
| Cybersecurity: "EDR, MFA, immutable backups, and compliance" | monterey-county.html:164 | UNVERIFIABLE - VERIFIED FACTS lists "managed detection and response with a 24/7 SOC," not "EDR" by name; "immutable backups" is not on the capabilities list either (only "cloud backup for Microsoft 365 and Google Workspace" is). Neither is a named vendor, but neither is verbatim on the approved list. VERIFY WITH ULI. |
| "Immutable backups and tested restores tied to your real RTO and RPO" | monterey-county.html:166 | UNVERIFIABLE - same "immutable" gap as above |
| Cyber insurance questionnaire/renewal readiness help | monterey-county.html:159 | UNVERIFIABLE - VERIFIED FACTS mentions Ghosxt's own cyber liability insurance, not a client-facing cyber-insurance-questionnaire service; no contradiction found, but not sourced either |
| On-site response window | "Same-day remote support; on-site within 24–48 hours" (key facts) / "Most issues are resolved remotely the same day, with on-site visits scheduled across the county" (FAQ) | monterey-county.html:43 (JSON-LD), 126 (key facts), 209 (visible FAQ) | UNVERIFIABLE - not stated in VERIFIED FACTS (which only names a "4-hour notification on actual or reasonably suspected critical incidents" deliverable, a different metric); the two on-page phrasings are mutually compatible, not a hard internal contradiction |
| Free, no-obligation 30-minute IT assessment | monterey-county.html:114, 128, 195, 196 | UNVERIFIABLE - business offer term, not covered by VERIFIED FACTS; internally consistent throughout the page |
| Phone number | (831) 204-0501 / +18312040501 | monterey-county.html:39, 82, 104, 115, 130, 319 | UNVERIFIABLE - not covered by VERIFIED FACTS, but consistent throughout the page |
| Email | sales@ghosxt.com | monterey-county.html:39, 283 | UNVERIFIABLE - not covered by VERIFIED FACTS |
| Business/service-area location | Salinas, CA 93905 (LocalBusiness address); areaServed Monterey County | monterey-county.html:39 | MATCHES "Based in Salinas, CA" (exact ZIP not independently verifiable from CLAUDE.md) |
| Monterey County economy stats: "4th-highest agricultural-producing county," ~$5B 2024 crop/livestock value, "61% of U.S. leaf lettuce," "57% of U.S. celery," NPS, DLI, CSU Monterey Bay, Salinas Valley Health, Community Hospital of the Monterey Peninsula | monterey-county.html:203 | UNVERIFIABLE - third-party county/economic statistics with no citation on the page and no coverage in VERIFIED FACTS (these are not claims about Ghosxt itself, but are stated as fact and should be sourced). VERIFY WITH ULI. |
| Credentials/certifications (M.S., CompTIA, AZ-104, ITIL, etc.) | none named on this page | - | N/A - page makes no specific credential claims |
| Cisco certification | none found | - | N/A - no Cisco claim present (correct) |
| Cyber liability insurance ($1M) / SAM.gov registration | not mentioned on this page | - | N/A - no claim made, nothing to check |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at monterey-county.html:121-132: Service area, Led by, Response, Pricing (linked to /pricing), plus Free/Rated/Direct line rows |
| FAQ present with real question-and-answer text | Pass | Visible `<details>/<summary>` FAQ at monterey-county.html:209-212 (4 Q&As), matching FAQPage JSON-LD at 42-47 |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (line 111) + lead paragraph (line 112) state the offer plainly well within the first 300 words |
| Exactly one H1 | Pass | Single `<h1>` at monterey-county.html:111 |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8 |
| JSON-LD present (list which types) | Pass, with a bug | One `<script type="application/ld+json">` `@graph` block (lines 35-50) with LocalBusiness (39), BreadcrumbList (40), Service (41), FAQPage (42-47). Bug: the Service node's `"provider": {"@id": "https://ghosxt.com/#business"}` (line 41) does not match the LocalBusiness node's own `@id`, which is page-scoped as `"https://ghosxt.com/monterey-county#business"` (line 39) - the reference does not resolve within this page's graph. |
| Content that exists only inside JS | Pass (none found) | All headings, body copy, service cards, industries list, and FAQ are static HTML (FAQ uses native `<details>`); no evidence of content injected only via assets/js/main.min.js |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the file |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, monterey-county.html:57) sits in the DOM before `<nav>` (58) and before `<main id="main-content">` (107) |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (76, 100, 127, 212, 240); city pages within the county (Salinas, Monterey, Pacific Grove, Carmel, Seaside, Marina, Castroville, Carmel Valley, Greenfield, Gonzales, Prunedale) at 140-150; neighboring county pages (Santa Cruz, San Benito, Santa Clara) at 189; /cyber-insurance-compliance at 159 |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental - excluded vertical named as a target industry ("Healthcare and dental") | monterey-county.html:44 (JSON-LD FAQ answer), 177 (visible industries list), 210 (visible FAQ answer) - three occurrences |
| CMMC / NIST 800-171 compliance-framework claim not on the VERIFIED FACTS capabilities/deliverables list | monterey-county.html:176 |
| "EDR" named specifically (VERIFIED FACTS says "managed detection and response," not "EDR") and "immutable backups" (not a qualifier used in VERIFIED FACTS) | monterey-county.html:164, 166 |

No em dash (literal, URL-encoded, or entity form), Cisco certification, vendor name, or clearance-level violation was found on this page. The CMMC/NIST and EDR/"immutable" items above are borderline: they are not on the explicit "never claim" list (only SIEM is named there), but they are also not verbatim on the "capabilities we actually deliver" list, so they are flagged per the "SIEM or any capability not in VERIFIED FACTS" check rather than treated as confirmed clean.

## Top Three Fixes
1. Remove "dental" from the industries list and both FAQ answers (monterey-county.html:44, 177, 210) - dentists are an excluded vertical and must not appear as a client or target industry anywhere on the site. This is a hard contradiction of VERIFIED FACTS, not a judgment call.
2. VERIFY WITH ULI whether the CMMC/NIST 800-171 defense-contractor framing (monterey-county.html:176) and the "EDR" / "immutable backups" capability wording (monterey-county.html:164, 166) match what Ghosxt actually delivers and is allowed to name; if not confirmed, align the wording to the exact VERIFIED FACTS capability list (e.g., "managed detection and response with a 24/7 SOC," "cloud backup for Microsoft 365 and Google Workspace").
3. Fix the JSON-LD `@id` mismatch (Service.provider references `https://ghosxt.com/#business`, but the page's own LocalBusiness node is `@id`'d as `https://ghosxt.com/monterey-county#business`, line 39 vs. 41) so the Service node actually resolves to the business entity; also move the cookie banner (line 57) so it no longer sits before `<nav>`/`<main>` in DOM order, and VERIFY WITH ULI whether the hardcoded "26 Google reviews / 5.0" figure (lines 117, 129) should instead be sourced from the single data file VERIFIED FACTS names as its home.
