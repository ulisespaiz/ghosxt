# Page Audit: /cloud-services-monterey

## Route
/cloud-services-monterey (file: cloud-services-monterey.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "An engineer with DoD infrastructure experience" | cloud-services-monterey.html:19, 45, 73, 219(implied via lead), 220, 240, 269, 286, 313; JSON-LD :45, :73 | MATCHES (VERIFIED FACTS: prior DoD/federal contractor infrastructure experience) |
| Clearance level | Never stated, only "DoD infrastructure experience" language | cloud-services-monterey.html: throughout | MATCHES (consistent with "never state the clearance level") |
| Google reviews count/rating | "26 Google reviews," 5.0 stars, marked `<!-- ghosxt:trust-reviews -->` | cloud-services-monterey.html:231, 244 | MATCHES - confirmed against `site-config.json` (`google_review_count: 26`, `google_rating: "5.0"`), which `scripts/update-review-count.py` syncs into every marked block and the paired key-facts row sitewide. Not a drift risk; the number does live in one config source, propagated by tooling. |
| "Trusted... since 2021" | Client-serving start year 2021 | cloud-services-monterey.html:231 | MATCHES (VERIFIED FACTS itself flags this year [VERIFY]) |
| Response time | "Same-day remote support; on-site within 24–48 hours" | cloud-services-monterey.html:241 (key-facts) | UNVERIFIABLE - not stated in VERIFIED FACTS (the only response-type SLA there is the 4-hour critical-incident notification, a different metric not mentioned on this page) |
| Pricing | "Cloud and Microsoft 365 management is part of every managed plan: pricing published upfront," links to /pricing; no specific dollar figures on this page | cloud-services-monterey.html:232, 242 | MATCHES in substance - M365 hardening with Intune/Defender/Conditional Access is an explicitly listed delivered capability; no numeric price is asserted here to check |
| Microsoft 365 GCC High for defense contractors | Offered, with CMMC/NIST 800-171 controls and documentation "an assessor expects" | cloud-services-monterey.html:45 (JSON-LD Service desc), 70–74 (JSON-LD FAQ), 219 (H1/lead area), 268–269 (service card), 326–327 (visible FAQ) | UNVERIFIABLE - GCC High tenancy and CMMC/NIST 800-171 documentation work are not on the VERIFIED FACTS "capabilities we actually deliver" list (which names M365 hardening w/ Intune, Defender for Business, Conditional Access - not GCC High specifically) nor on the "contracted deliverables" list (which names an annual independent risk assessment and SOC 2 documentation, not CMMC SSP production). VERIFY WITH ULI. |
| No-downtime email/file migration | "Migrate email, file shares... without downtime... does not lose a workday" | cloud-services-monterey.html:7 (meta description), 13 (og:description), 78–83 (JSON-LD FAQ), 304–306 (H2 + body), 330–331 (visible FAQ) | UNVERIFIABLE - operational/process claim, not covered by VERIFIED FACTS; internally consistent everywhere it repeats |
| "Immutable" Microsoft 365 backup | "Immutable backup for Microsoft 365... plus Entra ID and Conditional Access" | cloud-services-monterey.html:277 | UNVERIFIABLE - VERIFIED FACTS lists only "cloud backup for Microsoft 365 and Google Workspace," without the "immutable" qualifier. VERIFY WITH ULI. |
| Phone number | (831) 204-0501 / +18312040501 | cloud-services-monterey.html:166, 226, 245, 532 (recurs) | UNVERIFIABLE - not covered by VERIFIED FACTS, but consistent throughout the page |
| Email | sales@ghosxt.com | cloud-services-monterey.html:481–483 | UNVERIFIABLE - not covered by VERIFIED FACTS |
| "Government-grade IT for small business" tagline | Footer tagline | cloud-services-monterey.html:370 | MATCHES tone of DoD/federal-contractor background; marketing gloss, not itself a discrete fact to verify |
| Service area / local presence | Monterey, CA; on-site across Monterey Peninsula, remote nationwide; also serves Pacific Grove, Carmel, Seaside, Marina, Salinas | cloud-services-monterey.html:220, 239, 313–314 | UNVERIFIABLE - VERIFIED FACTS states the business is "Based in Salinas, CA" and serves clients broadly; consistent with a multi-city service footprint, not a contradiction |
| Credentials/certifications (M.S., CompTIA, AZ-104, ITIL, etc.) | None named on this page | - | N/A - page makes no specific credential claims |
| Cisco certification | None found | - | N/A - no Cisco claim present (correct) |
| Dental/dentist mention | None found | - | N/A - confirmed absent via search (correct) |
| Vendor/product-tool name (e.g., Huntress, SentinelOne) | None found | - | N/A - Microsoft, SharePoint, Teams, OneDrive, Azure, Entra ID, Intune are the literal Microsoft 365/Azure product being sold and are explicitly named in VERIFIED FACTS' capability list, not third-party MDR/security-tool vendor names |
| SIEM or unlisted capability wording | None found | - | N/A - "SIEM" does not appear on this page |
| Em dash (literal, %E2%80%94, or &mdash;) | None found | - | N/A - confirmed absent via search |
| Cyber liability insurance ($1M) / SAM.gov registration | Not mentioned on this page | - | N/A - no claim made, nothing to check |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at cloud-services-monterey.html:236–247 has Service area, Led by, Response, Pricing (linked to /pricing), plus Free/Rated/Direct-line rows |
| FAQ present with real question-and-answer text | Pass | Visible `<details>/<summary>` FAQ at cloud-services-monterey.html:321–337 (4 Q&As), matching FAQPage JSON-LD at 58–93 near word-for-word |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (line 219) + lead paragraph (line 220) state the offer plainly ("Ghosxt handles Microsoft 365 and cloud work for Monterey small business... from an engineer with DoD infrastructure experience"), well inside the first ~270 words of `<main>` |
| Exactly one H1 | Pass | Single `<h1>` at cloud-services-monterey.html:219 |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8 |
| JSON-LD present (list which types) | Pass | One `@graph` block (lines 35–96) contains Service, BreadcrumbList, FAQPage |
| Content that exists only inside JS | Pass (none found) | All headings, body copy, service cards, and FAQ are static HTML (FAQ uses native `<details>`); no calculator or JS-injected content on this page type |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the file |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `#cookieBanner` (line 107) sits before `<nav>` (124) and before `<main id="main-content">` (213); the desktop `.navbar-menu` (133–162) and the fully duplicated `.navbar-mobile-menu` (175–210) also both sit before `<main>` - sitewide chrome pattern, not unique to this page |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (232, plus nav/footer); vertical links to /cybersecurity-monterey (277, 313) and /backup-disaster-recovery (277); city links to /monterey (313, 314), /pacific-grove, /carmel, /seaside, /marina, /salinas (314); hub link to /cloud-services (314) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|

No em-dash (literal, URL-encoded, or entity form), Cisco-certification, dental/dentist, vendor-name, clearance-level, or SIEM violations were found on this page.

## Top Three Fixes
1. VERIFY WITH ULI whether Microsoft 365 GCC High tenancy and CMMC/NIST 800-171 SSP-level documentation (cloud-services-monterey.html:45, 70–74, 219, 268–269, 326–327) are capabilities actually delivered - neither appears on the VERIFIED FACTS "capabilities we deliver" nor "contracted deliverables" lists; if not confirmed, they need to come off the page (visible copy and both JSON-LD blocks).
2. VERIFY WITH ULI the "immutable" qualifier on Microsoft 365 backup (cloud-services-monterey.html:277) - VERIFIED FACTS states only "cloud backup for Microsoft 365 and Google Workspace" without that word.
3. Move the cookie banner (cloud-services-monterey.html:107) so it no longer sits before `<nav>`/`<main>` in DOM order, and consider whether the fully duplicated mobile nav (175–210) needs to precede main content as well - sitewide chrome issue, not specific to this page.
