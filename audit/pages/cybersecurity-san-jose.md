# Page Audit: /cybersecurity-san-jose

## Route
/cybersecurity-san-jose (file: cybersecurity-san-jose.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "Engineer with DoD infrastructure experience" | cybersecurity-san-jose.html:19, 45, 81, 220, 240, 331 | MATCHES |
| "Government-grade cybersecurity" / "same class of controls used to protect government endpoints" | Marketing language tied to DoD/federal background | cybersecurity-san-jose.html:13, 220 | UNVERIFIABLE - plausible gloss on the verified DoD/federal-contractor background, but "same class of controls used to protect government endpoints" is a strong, specific claim with no direct VERIFIED FACTS statement to check it against. VERIFY WITH ULI. |
| Footer background line | "Built by an engineer from the federal contracting world." | cybersecurity-san-jose.html:494 | MATCHES |
| Google reviews count/rating | "26 Google reviews," 5.0 stars | cybersecurity-san-jose.html:231, 244 | MATCHES - value agrees with VERIFIED FACTS; hardcoded here rather than pulled from the single canonical data file (same drift risk as the sibling cloud/web-design pages). |
| "Trusted... since 2021" | Client-serving start year 2021, geography "across Monterey County" | cybersecurity-san-jose.html:231 | UNVERIFIABLE - VERIFIED FACTS flags the 2021 year "[VERIFY year]." Also un-localized: this is a San Jose/South Bay page, but the line references "Monterey County." |
| Response time | "Same-day remote support; on-site within 24–48 hours" | cybersecurity-san-jose.html:241 | UNVERIFIABLE - not stated in VERIFIED FACTS (which only documents a 4-hour notification SLA for critical incidents, a different metric). VERIFY WITH ULI. |
| Free assessment length | "No-obligation 30-minute IT assessment" / "30 minutes with a senior engineer" | cybersecurity-san-jose.html:243, 294 | UNVERIFIABLE - not specified in VERIFIED FACTS |
| Capability bundle | "Endpoint detection and response, phishing-resistant MFA, identity hardening, immutable backup, **vulnerability management**, and 24/7 monitoring" | cybersecurity-san-jose.html:45 (JSON-LD description), 65 (JSON-LD FAQ answer), 323 (visible FAQ answer) | MIXED - EDR, MFA, identity hardening, and 24/7 monitoring MATCH the capability list ("managed detection and response with a 24/7 SOC," M365 hardening/Conditional Access). **"Vulnerability management" is not in the VERIFIED FACTS capability list** (which names only "OS and third-party patching," a narrower claim) - CONTRADICTS / unlisted capability. |
| Capability card: Endpoint Detection & Response | "**Huntress EDR** with a 24/7 SOC on every endpoint, layered with **Microsoft Defender**" | cybersecurity-san-jose.html:265 | CONTRADICTS - VERIFIED FACTS: "never publish vendor names." The approved wording is generic ("managed detection and response with a 24/7 SOC"); "Huntress" names the actual EDR vendor. (Microsoft Defender is fine - it's explicitly named in VERIFIED FACTS under M365 hardening.) |
| Capability card: Identity & MFA | "Phishing-resistant MFA, Conditional Access, and the death of legacy auth" | cybersecurity-san-jose.html:269 | MATCHES capability list |
| Capability card: SOC 2 Readiness | "Access controls, logging, change management, and vendor-risk evidence a SOC 2 audit expects" | cybersecurity-san-jose.html:70-73, 273, 327 | MATCHES (consistent with "SOC 2 documentation for every platform in our stack provided during onboarding") |
| Capability card: Immutable Backup | "Backups the production network cannot reach or delete, with monthly tested restores" | cybersecurity-san-jose.html:276-277 | MATCHES capability "cloud backup for Microsoft 365 and Google Workspace" generally; the "immutable" qualifier and "monthly tested restores" cadence specifically are not stated in VERIFIED FACTS - VERIFY WITH ULI. |
| Capability card: Email Security & Training | "Email filtering plus security-awareness training" | cybersecurity-san-jose.html:280-281 | MATCHES capability list (DNS and web filtering, security awareness training) |
| Capability card: 24/7 Monitoring & Response | "Tooling plus a human who responds... contained, not waiting in a queue" | cybersecurity-san-jose.html:284-285 | MATCHES capability "managed detection and response with a 24/7 SOC" |
| Cost FAQ | "It depends on headcount and what you already have... pricing is published upfront" (no numbers stated) | cybersecurity-san-jose.html:85-89, 333-335 | Not contradicted - no specific figures to check against the VERIFIED FACTS pricing table |
| Industries named | Technology/SaaS, distribution, manufacturing, professional-services firms | cybersecurity-san-jose.html:45, 253 | UNVERIFIABLE - not enumerated in VERIFIED FACTS; no contradiction, no dental/excluded-vertical mention on this page |
| Cities served | San Jose, Gilroy, Santa Cruz, Salinas, Monterey | cybersecurity-san-jose.html:313-314 | MATCHES footer service-area list |
| Credentials/certifications | none named on this page | - | N/A - page makes no specific credential claims |
| Cisco certification | none found | - | N/A (correct) |
| Clearance level | none stated, only "DoD infrastructure experience" | cybersecurity-san-jose.html:19, 220 | MATCHES (no specific level stated) |
| Dental | none found | - | N/A - no dental/dentist mention on this page |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at cybersecurity-san-jose.html:236-247 has Service area, Led by, Response, Pricing (linked to /pricing), plus Free/Rated/Direct line rows |
| FAQ present with real question-and-answer text | Pass | Visible `<details>/<summary>` FAQ at cybersecurity-san-jose.html:321-337 (4 Q&As), matching FAQPage JSON-LD at 58-93 (note: the vulnerability-management wording appears identically in both JSON-LD and visible FAQ, so a fix must be applied to both to stay in sync) |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (line 219) + lead paragraph (line 220) state the offer plainly ("Ghosxt brings the same class of controls used to protect government endpoints... from an engineer with DoD infrastructure experience") well inside the first 300 words |
| Exactly one H1 | Pass | Single `<h1>` at cybersecurity-san-jose.html:219 |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8 |
| JSON-LD present (list which types) | Pass | `@graph` at cybersecurity-san-jose.html:38-95 contains: Service, BreadcrumbList, FAQPage |
| Content that exists only inside JS | Pass (none found) | All headings, body copy, and FAQ are static HTML (FAQ uses native `<details>`); no evidence of content injected only via assets/js/main.min.js |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the file |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, cybersecurity-san-jose.html:107-121) sits in the DOM before `<nav>` (124) and before `<main id="main-content">` (213) |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (232, 242); links to nearby city pages (313-314: San Jose hub, Gilroy, Santa Cruz, Salinas, Monterey) and to /managed-it-services, /help-desk-it-support, /cybersecurity, /cyber-insurance-compliance (306, 313); footer links to vertical pages (agriculture, trucking, manufacturing, healthcare, etc.) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Vendor name - "Huntress EDR" named explicitly | cybersecurity-san-jose.html:265 |
| Unlisted capability - "vulnerability management" claimed but not present in the VERIFIED FACTS capability list | cybersecurity-san-jose.html:45 (JSON-LD description), 65 (JSON-LD FAQ answer), 323 (visible FAQ answer) |

No em-dash, dental, or clearance-level violations were found on this page. No Cisco-certification or SIEM claims were found on this page.

## Top Three Fixes
1. Remove the vendor name "Huntress" from the Endpoint Detection & Response card (cybersecurity-san-jose.html:265) - replace with the generic listed capability wording ("managed detection and response with a 24/7 SOC," already used correctly elsewhere on the site). Microsoft Defender can stay, since Microsoft 365/Defender is explicitly named in VERIFIED FACTS.
2. Remove or get sign-off on "vulnerability management" (cybersecurity-san-jose.html:45, 65, 323) - it is not on the approved capabilities list ("Do not claim SIEM or anything not listed"). Either strike it in favor of the listed "OS and third-party patching," or have Uli confirm it's a real, deliverable capability worth adding to VERIFIED FACTS. Fix must be applied in the JSON-LD description, the JSON-LD FAQ answer, and the matching visible `<details>` answer to stay in sync.
3. Move the cookie banner (cybersecurity-san-jose.html:107-121) so it no longer sits before `<nav>`/`<main>` in the DOM order; also VERIFY WITH ULI the "immutable"/"monthly tested restores" backup specifics (line 273) and the "since 2021"/"Monterey County" trust line (line 231), which is un-localized template copy on a South Bay page.
