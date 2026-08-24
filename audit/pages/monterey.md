# Page Audit: /monterey

## Route
/monterey (file: monterey.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "An engineer with DoD infrastructure experience" / "years inside DoD networks" / "Built by an engineer from the federal contracting world" | monterey.html:174, 202, 244, 304, 308, 450 | MATCHES |
| "Federal-grade" / "government-grade" marketing language | tied to DoD/federal contractor background | monterey.html:13, 19, 161, 191, 290, 326 | MATCHES (marketing gloss on verified DoD/federal-contractor experience; not a separate factual claim) |
| Clearance level | none stated, only "DoD infrastructure experience" language | monterey.html:174, 202, 244, 304, 308 | MATCHES (no specific level stated, consistent with "never state the clearance level") |
| Tiny Team Managed Security price | $600/mo flat, 1 to 4 users | monterey.html:306 (FAQ) | MATCHES |
| Core Managed IT price | $125/user/mo | monterey.html:306 (FAQ) | MATCHES |
| Secure Growth price | $175/user/mo | monterey.html:306 (FAQ) | MATCHES |
| Compliance & Continuity price | $250/user/mo | monterey.html:306 (FAQ) | MATCHES |
| Google reviews count/rating | "26 Google reviews," 5.0 stars | monterey.html:166, 178 | MATCHES value, but flag: VERIFIED FACTS states this number "lives in one data file and nowhere else" - it is hardcoded twice on this page instead of sourced from that single file, creating drift risk when the live count changes. VERIFY WITH ULI on intended architecture. |
| "Trusted... since 2021" | Client-serving start year 2021 | monterey.html:166 | MATCHES (VERIFIED FACTS itself flags this year [VERIFY]) |
| Industries served: "Healthcare and dental" | listed as an industry served in Monterey | monterey.html:223 | CONTRADICTS - dentists are an excluded vertical and dental must not appear as a client/target industry anywhere |
| Industries served (non-dental): hospitality/hotels, restaurants/food service, defense contractors/subcontractors, education/research, tourism/event venues, professional services/law, real estate | monterey.html:217-224 | UNVERIFIABLE - not enumerated in VERIFIED FACTS (only "excluded: dentists; wineries fine" is stated); no contradiction found for these verticals |
| CMMC / NIST 800-171 / DFARS compliance services, including production of a "System Security Plan and supporting documentation an assessor expects" | monterey.html:69, 72 (JSON-LD FAQPage), 194, 244, 257, 304, 308 | UNVERIFIABLE - this specific deliverable (SSP production, CMMC controls implementation) is not on the VERIFIED FACTS "capabilities we actually deliver" list; also not covered by the "contracted deliverables" list, which mentions only an annual independent risk assessment and SOC 2 documentation, not CMMC/SSP work. VERIFY WITH ULI. |
| PCI-compliant POS / hospitality network segmentation | monterey.html:68 (JSON-LD FAQPage), 71, 195, 243, 246, 303, 307 | UNVERIFIABLE - PCI compliance work is not on the VERIFIED FACTS capabilities list; no contradiction found, but not sourced either. VERIFY WITH ULI. |
| "Immutable" backups | monterey.html:191, 290, 295 | UNVERIFIABLE - VERIFIED FACTS lists only "cloud backup for Microsoft 365 and Google Workspace," without the "immutable" qualifier |
| Web design pricing "from $1,800" | monterey.html:292 | UNVERIFIABLE - not covered by VERIFIED FACTS (only Microsoft 365-scope managed IT pricing and onboarding fees are listed there) |
| On-site response window | "Same-day remote support; on-site within 24–48 hours" (key facts) vs. "typically same-day or next-day for non-emergencies" (FAQ) | monterey.html:175, 305 | UNVERIFIABLE - not stated in VERIFIED FACTS; the two phrasings are compatible with each other, not a hard internal contradiction |
| Phone number | (831) 204-0501 / +18312040501 | monterey.html:46, 131, 164, 179, 487 (recurs) | UNVERIFIABLE - not covered by VERIFIED FACTS, but consistent throughout the page |
| Email | sales@ghosxt.com | monterey.html:47, 437-439 | UNVERIFIABLE - not covered by VERIFIED FACTS |
| Business/service-area location | Monterey, CA 93940 (LocalBusiness address); areaServed Monterey, Pacific Grove, Carmel, Seaside | monterey.html:49-56 | UNVERIFIABLE - VERIFIED FACTS states the business is "Based in Salinas, CA" and serves clients broadly; this is a location landing page for the Monterey service area, consistent with a multi-city footprint (footer lists both Salinas and Monterey as service areas at 469-470), not a contradiction |
| Credentials/certifications (M.S., CompTIA, AZ-104, ITIL, etc.) | none named on this page | - | N/A - page makes no specific credential claims, so nothing to contradict |
| Cisco certification | none found | - | N/A - no Cisco claim present (correct) |
| Cyber liability insurance ($1M) / SAM.gov registration | not mentioned on this page | - | N/A - no claim made, nothing to check |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at monterey.html:170-181 has Service area, Led by, Response, Pricing (linked to /pricing), plus bonus Free/Rated/Direct line rows |
| FAQ present with real question-and-answer text | Pass | Visible `<details>/<summary>` FAQ at monterey.html:300-309 (6 Q&As), matching FAQPage JSON-LD at 66-74 |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (line 160) + lead paragraph (line 161) state the offer plainly ("Ghosxt brings federal-grade engineering to both, plus everyone in between"), reinforced by the key-facts block, well inside the first 300 words |
| Exactly one H1 | Pass | Single `<h1>` at monterey.html:160 |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8 |
| JSON-LD present (list which types) | Pass | Two `<script type="application/ld+json">` blocks: `@graph` at monterey.html:36-77 contains LocalBusiness, BreadcrumbList, FAQPage; second block at 81-101 contains Service |
| Content that exists only inside JS | Pass (none found) | All headings, body copy, service cards, and FAQ are static HTML (FAQ uses native `<details>`); no evidence of content injected only via assets/js/main.min.js |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the file |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, monterey.html:106) sits in the DOM before `<nav>` (107) and before `<main id="main-content">` (156) |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (176, 306, footer 350); nearby city pages Pacific Grove/Carmel/Seaside/Marina/Salinas (229-234) and footer service-areas list (469-480); vertical/specialty pages cybersecurity-monterey, cloud-services-monterey, web-design-monterey (191-195, 290-296) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental - excluded vertical named as a target industry ("Healthcare and dental") | monterey.html:223 |

No em-dash (literal, URL-encoded, or entity form), Cisco-certification, vendor-name, clearance-level, or SIEM violations were found on this page. CMMC/SSP-production and PCI-compliance claims (see Claims Table) are not confirmed capabilities per VERIFIED FACTS and are flagged UNVERIFIABLE / VERIFY WITH ULI rather than as confirmed violations, since they are not on the explicit "never claim" list (only SIEM is named) but also are not on the "capabilities we actually deliver" list.

## Top Three Fixes
1. Remove "Healthcare and dental" from the industries-served list (monterey.html:223) - dentists are an excluded vertical and must not appear as a client or target industry anywhere on the site.
2. VERIFY WITH ULI whether the CMMC/NIST 800-171 SSP-production claims (monterey.html:69, 72, 194, 244, 257, 304, 308) and the PCI-compliant POS / hospitality network claims (monterey.html:68, 71, 195, 243, 246, 303, 307) are capabilities Ghosxt actually delivers; if not confirmed, they need to come off the page (visible copy and both JSON-LD blocks) per the "never invent a capability" house rule.
3. Move the cookie banner (monterey.html:106) so it no longer sits before `<nav>`/`<main>` in the DOM order; also VERIFY WITH ULI whether the hardcoded "26 Google reviews / 5.0" figure (lines 166, 178) should instead be sourced from the single data file VERIFIED FACTS says is the number's home, to avoid drift when the live count changes.
