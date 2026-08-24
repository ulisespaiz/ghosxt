# Page Audit: /cloud-services-salinas

## Route
/cloud-services-salinas (file: cloud-services-salinas.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "Engineer with DoD infrastructure experience" | cloud-services-salinas.html:7, 13, 19, 45, 220, 240 | MATCHES |
| Footer background line | "Built by an engineer from the federal contracting world." | cloud-services-salinas.html:494 | MATCHES |
| Google reviews count/rating | "26 Google reviews," 5.0 stars | cloud-services-salinas.html:231, 244 | MATCHES |
| "Trusted... since 2021" | Client-serving start year 2021 | cloud-services-salinas.html:231 | UNVERIFIABLE — VERIFIED FACTS itself flags this year "[VERIFY year]"; the page states it as settled fact. VERIFY WITH ULI. |
| Response time | "Same-day remote support; on-site within 24–48 hours" | cloud-services-salinas.html:241 | UNVERIFIABLE — not stated anywhere in VERIFIED FACTS (which only documents a 4-hour notification SLA for critical incidents, a different metric). VERIFY WITH ULI. |
| Free assessment length | "No-obligation 30-minute IT assessment" | cloud-services-salinas.html:243, 294 | UNVERIFIABLE — not specified in VERIFIED FACTS |
| Phone number | (831) 204-0501 | cloud-services-salinas.html:166, 226, 245, 532 | UNVERIFIABLE — not covered by VERIFIED FACTS, but consistent throughout the page |
| Pricing | "Cloud and Microsoft 365 management is part of every managed plan, pricing published upfront" (links to /pricing, no numbers stated on this page) | cloud-services-salinas.html:232 | Not contradicted — page states no specific figures to check against the VERIFIED FACTS pricing table |
| M365 hardening detail | "Phishing-resistant MFA, Conditional Access, and a healthy Secure Score" | cloud-services-salinas.html:257, 323 | MATCHES capability list ("Microsoft 365 hardening with Intune, Defender for Business, and Conditional Access"); "Secure Score" is a native Microsoft feature name, not a third-party vendor |
| Cloud Backup detail | "Microsoft 365 data is not backed up by Microsoft the way most people assume. We add immutable backup for mail and files." | cloud-services-salinas.html:272-273 | MATCHES capability "cloud backup for Microsoft 365 and Google Workspace" |
| Identity & Access detail | "Entra ID, Conditional Access, and SSO" | cloud-services-salinas.html:276-277 | MATCHES capability list (Microsoft 365 hardening with Conditional Access); Entra ID is Microsoft's own product name for the identity platform already implied by "Microsoft 365 hardening," not a third-party vendor |
| Industries named | Agriculture, food processing, logistics (Salinas Valley) | cloud-services-salinas.html:286, 312, 335 | UNVERIFIABLE — not enumerated in VERIFIED FACTS (only "excluded: dentists; wineries fine" is stated); no contradiction, no dental/excluded-vertical mention found |
| Credentials/certifications | none named on this page | — | N/A — page makes no specific credential claims |
| Cisco certification | none found | — | N/A — no Cisco/Meraki claim present (correct) |
| Clearance level | none stated, only "DoD infrastructure experience" | cloud-services-salinas.html:7, 220 | MATCHES (no specific level stated) |
| SIEM / vendor names | none found | — | N/A — no violations on this page |
| Dental | none found | — | N/A |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at cloud-services-salinas.html:236-247 has Service area, Led by, Response, Pricing (linked to /pricing), plus Free/Rated/Direct line rows |
| FAQ present with real question-and-answer text | Pass | Visible `<details>/<summary>` FAQ at cloud-services-salinas.html:321-337 (4 Q&As), matching FAQPage JSON-LD at 58-93 |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (line 219) + lead paragraph (line 220) state the offer plainly ("Ghosxt handles Microsoft 365 and cloud migrations for Salinas small business...") well inside the first 300 words |
| Exactly one H1 | Pass | Single `<h1>` at cloud-services-salinas.html:219 |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8 |
| JSON-LD present (list which types) | Pass | `@graph` at cloud-services-salinas.html:38-93 contains: Service, BreadcrumbList, FAQPage |
| Content that exists only inside JS | Pass (none found) | All headings, body copy, and FAQ are static HTML (FAQ uses native `<details>`); no evidence of content injected only via assets/js/main.min.js |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the file |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, cloud-services-salinas.html:107-121) sits in the DOM before `<nav>` (124) and before `<main id="main-content">` (213) |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (232); links to nearby city pages (313-314: Watsonville, Hollister, Monterey, Santa Cruz, Gilroy) and vertical pages via footer (agriculture, trucking, manufacturing, C-TPAT, professional services, healthcare, property management, engineering, hospitality) |

## House-Rule Violations
No em-dash, Cisco-certification, dental, vendor-name, clearance-level, or SIEM/unlisted-capability violations were found on this page.

| Violation | Location |
|-----------|----------|
| None found | — |

## Top Three Fixes
1. Move the cookie banner (cloud-services-salinas.html:107-121) so it no longer sits before `<nav>`/`<main>` in the DOM order.
2. VERIFY WITH ULI: the "since 2021" founding-year claim (line 231) — VERIFIED FACTS itself flags this year as unconfirmed, so it should not be stated as settled fact.
3. VERIFY WITH ULI: the response-time claim ("Same-day remote support; on-site within 24–48 hours," line 241) and the "30-minute" free-assessment length (lines 243, 294) — neither is sourced in VERIFIED FACTS.
