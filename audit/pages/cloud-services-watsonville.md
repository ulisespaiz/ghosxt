# Page Audit: /cloud-services-watsonville

## Route
/cloud-services-watsonville (file: cloud-services-watsonville.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "Engineer with DoD infrastructure experience" | cloud-services-watsonville.html:6, 19, 45, 220, 240 | MATCHES — VERIFIED FACTS: "Active DoD clearance and prior DoD/federal contractor infrastructure experience" |
| Footer background line | "Built by an engineer from the federal contracting world." | cloud-services-watsonville.html:494 | MATCHES |
| Google reviews count/rating | "26 Google reviews," 5.0 stars | cloud-services-watsonville.html:231, 244 | MATCHES — VERIFIED FACTS: "26 at 5.0 as of August 2026" |
| "Trusted... since 2021" | Client-serving start year 2021 | cloud-services-watsonville.html:231 | UNVERIFIABLE — VERIFIED FACTS itself flags this year "[VERIFY year]"; the page states it as settled fact. VERIFY WITH ULI. |
| Response time | "Same-day remote support; on-site within 24–48 hours" | cloud-services-watsonville.html:241 | UNVERIFIABLE — not stated anywhere in VERIFIED FACTS (which only documents a 4-hour notification SLA for critical incidents, a different metric). VERIFY WITH ULI. |
| Free assessment length | "No-obligation 30-minute IT assessment" | cloud-services-watsonville.html:243, 294 | UNVERIFIABLE — not specified in VERIFIED FACTS |
| Phone number | (831) 204-0501 | cloud-services-watsonville.html:166, 226, 245, 532 | UNVERIFIABLE — not covered by VERIFIED FACTS, but consistent throughout the page |
| Pricing | "Cloud and Microsoft 365 management is part of every managed plan: pricing published upfront" (links to /pricing, no dollar figures stated on this page) | cloud-services-watsonville.html:232 | Not contradicted — page states no specific numbers to check against the VERIFIED FACTS pricing table |
| M365 hardening detail | "Phishing-resistant MFA, Conditional Access, and a healthy Secure Score" | cloud-services-watsonville.html:257, 323 | MATCHES capability list ("Microsoft 365 hardening with Intune, Defender for Business, and Conditional Access"); "Secure Score" is a native Microsoft feature name, not a third-party vendor |
| Cloud Backup detail | "Immutable backup for Microsoft 365 (which Microsoft does not do for you), plus Entra ID and Conditional Access" | cloud-services-watsonville.html:277 | MATCHES capability "cloud backup for Microsoft 365 and Google Workspace"; Entra ID is Microsoft's own identity-platform name, already implied by the listed "Conditional Access" capability, not a third-party vendor |
| Seasonal identity management | Provision/deprovision seasonal hires "in minutes" via Microsoft 365 identity | cloud-services-watsonville.html:89, 273, 335 | UNVERIFIABLE — plausible operational description, not a specific figure to check, no contradiction |
| Migration approach | "Cutover planned around your schedule, typically over a weekend or in stages," validated before/after | cloud-services-watsonville.html:81, 305, 331 | UNVERIFIABLE — process description, no contradiction |
| Industries named | Agriculture, food processing, cold storage, distribution (Pajaro Valley) | cloud-services-watsonville.html:45, 220, 286 | UNVERIFIABLE — not enumerated in VERIFIED FACTS (only "excluded: dentists; wineries fine" is stated); no dental/excluded-vertical mention found |
| Credentials/certifications | none named on this page | — | N/A — page makes no specific credential claims |
| Cisco certification | none found | — | N/A — no Cisco/Meraki claim present (correct) |
| Clearance level | none stated, only "DoD infrastructure experience" | cloud-services-watsonville.html:6, 220 | MATCHES (no specific level stated, per house rule) |
| SIEM / vendor names / dental | none found | — | N/A — no violations on this page |
| Case examples / testimonials | none present on this page | — | N/A |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at cloud-services-watsonville.html:236-247 has Service area, Led by, Response, Pricing (linked to /pricing), plus Free/Rated/Direct line rows |
| FAQ present with real question-and-answer text | Pass | Visible `<details>/<summary>` FAQ at cloud-services-watsonville.html:321-337 (4 Q&As), matching FAQPage JSON-LD at 58-93 |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (line 219) + lead paragraph (line 220) state the offer plainly ("Ghosxt handles Microsoft 365 and cloud migrations for Watsonville small business...") well inside the first 300 words |
| Exactly one H1 | Pass | Single `<h1>` at cloud-services-watsonville.html:219 |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8 |
| JSON-LD present (list which types) | Pass | `@graph` at cloud-services-watsonville.html:38-95 contains: Service, BreadcrumbList, FAQPage |
| Content that exists only inside JS | Pass (none found) | All headings, body copy, and FAQ are static HTML (FAQ uses native `<details>`); no evidence of content injected only via assets/js/main.min.js |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the file |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, cloud-services-watsonville.html:107-121) sits in the DOM before `<nav>` (124) and before `<main id="main-content">` (213) |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (232, 242); links to nearby city pages (313-314: Santa Cruz, Salinas, Hollister, Monterey) and vertical pages via footer (agriculture, trucking, manufacturing, C-TPAT, professional services, healthcare, property management, engineering, hospitality) |

## House-Rule Violations
No em-dash, Cisco-certification, dental, vendor-name, clearance-level, or SIEM/unlisted-capability violations were found on this page.

| Violation | Location |
|-----------|----------|
| None found | — |

## Top Three Fixes
1. Move the cookie banner (cloud-services-watsonville.html:107-121) so it no longer sits before `<nav>`/`<main>` in the DOM order.
2. VERIFY WITH ULI: the "since 2021" founding-year claim (line 231) — VERIFIED FACTS itself flags this year as unconfirmed, so it should not be stated as settled fact.
3. VERIFY WITH ULI: the response-time claim ("Same-day remote support; on-site within 24–48 hours," line 241) and the "30-minute" free-assessment length (lines 243, 294) — neither is sourced in VERIFIED FACTS.
