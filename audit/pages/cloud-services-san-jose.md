# Page Audit: /cloud-services-san-jose

## Route
/cloud-services-san-jose (file: cloud-services-san-jose.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "Engineer with DoD infrastructure experience" | cloud-services-san-jose.html:45, 65, 89, 220, 240, 335 | MATCHES |
| Footer background line | "Built by an engineer from the federal contracting world." | cloud-services-san-jose.html:494 | MATCHES |
| Google reviews count/rating | "26 Google reviews," 5.0 stars | cloud-services-san-jose.html:231, 244 | MATCHES - value agrees with VERIFIED FACTS ("26 at 5.0 as of August 2026 [VERIFY live count]"); note VERIFIED FACTS says this number "lives in one data file and nowhere else," but it is hardcoded twice on this page (and again on the sibling cybersecurity/web-design pages) - a drift risk. |
| "Trusted... since 2021" | Client-serving start year 2021, geography "across Monterey County" | cloud-services-san-jose.html:231 | UNVERIFIABLE - VERIFIED FACTS itself flags the 2021 start year "[VERIFY year]." Also note: this is a San Jose/South Bay page, but the trust line references "Monterey County," which is a different service region - not a contradiction of a verified fact, but a mismatched/un-localized line worth flagging. |
| Response time | "Same-day remote support; on-site within 24–48 hours" | cloud-services-san-jose.html:241 | UNVERIFIABLE - not stated anywhere in VERIFIED FACTS (which only documents a 4-hour notification SLA for critical incidents, a different metric). VERIFY WITH ULI. |
| Free assessment length | "No-obligation 30-minute IT assessment" | cloud-services-san-jose.html:243, 294 | UNVERIFIABLE - not specified in VERIFIED FACTS |
| Phone number | (831) 204-0501 | cloud-services-san-jose.html:166, 226, 245, 532 | UNVERIFIABLE - not covered by VERIFIED FACTS, but consistent throughout the page |
| Pricing | "Cloud and Microsoft 365 management is part of every managed plan, pricing published upfront" (links to /pricing, no numbers stated on this page) | cloud-services-san-jose.html:232 | Not contradicted - page states no specific figures to check against the VERIFIED FACTS pricing table |
| M365 hardening detail | "Phishing-resistant MFA, Conditional Access, and a healthy Secure Score" | cloud-services-san-jose.html:65, 257, 323 | MATCHES capability list ("Microsoft 365 hardening with Intune, Defender for Business, and Conditional Access"); "Secure Score" is a native Microsoft feature name, not a third-party vendor |
| SOC 2-ready configuration | "Access controls, logging, and data-protection settings a SOC 2 audit expects" | cloud-services-san-jose.html:70-73, 268-269, 327 | MATCHES (consistent with "SOC 2 documentation for every platform in our stack provided during onboarding") |
| No-downtime migration claim | "Migrate email, file shares, and line-of-business data... so your team does not lose a workday" | cloud-services-san-jose.html:78-81, 260-261, 304-306, 330-331 | UNVERIFIABLE - operational/process claim, no VERIFIED FACTS statement to check against; not contradicted |
| Cloud Backup & Identity detail | "Immutable backup for Microsoft 365... plus Entra ID and Conditional Access" | cloud-services-san-jose.html:276-277 | MATCHES capability "cloud backup for Microsoft 365 and Google Workspace"; Entra ID is Microsoft's own product name for the identity platform already implied by "Microsoft 365 hardening," not a third-party vendor. The "immutable" qualifier specifically is not stated in VERIFIED FACTS - VERIFY WITH ULI. |
| Industries named | Technology/SaaS, professional-services firms, distribution and manufacturing | cloud-services-san-jose.html:220, 286 | UNVERIFIABLE - not enumerated in VERIFIED FACTS (only "excluded: dentists; wineries fine" is stated); no contradiction, no dental/excluded-vertical mention found |
| Cities served | San Jose, Gilroy, Santa Cruz, Hollister, Salinas | cloud-services-san-jose.html:313-315 | MATCHES footer service-area list |
| Credentials/certifications | none named on this page | - | N/A - page makes no specific credential claims |
| Cisco certification | none found | - | N/A - no Cisco/Meraki claim present (correct) |
| Clearance level | none stated, only "DoD infrastructure experience" | cloud-services-san-jose.html:45, 220 | MATCHES (no specific level stated) |
| SIEM / vendor names / dental | none found | - | N/A - no violations on this page |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at cloud-services-san-jose.html:236-247 has Service area, Led by, Response, Pricing (linked to /pricing), plus Free/Rated/Direct line rows |
| FAQ present with real question-and-answer text | Pass | Visible `<details>/<summary>` FAQ at cloud-services-san-jose.html:321-337 (4 Q&As), matching FAQPage JSON-LD at 58-93 |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (line 219) + lead paragraph (line 220) state the offer plainly ("Ghosxt brings Silicon Valley cloud standards without Silicon Valley pricing...") well inside the first 300 words |
| Exactly one H1 | Pass | Single `<h1>` at cloud-services-san-jose.html:219 |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8 |
| JSON-LD present (list which types) | Pass | `@graph` at cloud-services-san-jose.html:38-95 contains: Service, BreadcrumbList, FAQPage |
| Content that exists only inside JS | Pass (none found) | All headings, body copy, and FAQ are static HTML (FAQ uses native `<details>`); no evidence of content injected only via assets/js/main.min.js |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the file |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, cloud-services-san-jose.html:107-121) sits in the DOM before `<nav>` (124) and before `<main id="main-content">` (213) |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (232, 242); links to nearby city pages (313-315: San Jose hub, Gilroy, Santa Cruz, Hollister, Salinas) and to /cybersecurity-san-jose (277, 313); footer links to vertical pages (agriculture, trucking, manufacturing, C-TPAT, professional services, healthcare, property management, engineering, hospitality) |

## House-Rule Violations
No em-dash, Cisco-certification, dental, vendor-name, clearance-level, or SIEM/unlisted-capability violations were found on this page.

| Violation | Location |
|-----------|----------|
| None found | - |

## Top Three Fixes
1. Move the cookie banner (cloud-services-san-jose.html:107-121) so it no longer sits before `<nav>`/`<main>` in the DOM order.
2. Centralize the "26 Google reviews / 5.0" figure (lines 231, 244) to the single canonical data file VERIFIED FACTS describes, instead of hardcoding it independently on this page (and its sibling city pages) - and confirm the live count [VERIFY].
3. VERIFY WITH ULI: the "since 2021" founding-year claim (line 231, tagged "[VERIFY year]" in VERIFIED FACTS) and the response-time claim ("Same-day remote support; on-site within 24–48 hours," line 241), neither of which is sourced. Also reconsider the "trusted by businesses across Monterey County" phrasing (line 231) on a page targeting San Jose/Santa Clara County - it reads as un-localized template copy.
