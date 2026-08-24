# Page Audit: /cybersecurity-salinas

## Route
/cybersecurity-salinas (file: cybersecurity-salinas.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "Engineer with DoD infrastructure experience" | cybersecurity-salinas.html:19, 45, 220, 240 | MATCHES |
| "Government-grade cybersecurity" marketing language | tied to DoD/federal background | cybersecurity-salinas.html:13, 220, 261 | MATCHES (marketing gloss on verified DoD/federal-contractor experience; not a separate factual claim) |
| Footer background line | "Built by an engineer from the federal contracting world." | cybersecurity-salinas.html:494 | MATCHES |
| Google reviews count/rating | "26 Google reviews," 5.0 stars | cybersecurity-salinas.html:231, 244 | MATCHES |
| Response time (key-facts) | "Same-day remote support; on-site within 24–48 hours" | cybersecurity-salinas.html:241 | UNVERIFIABLE — not stated in VERIFIED FACTS (which only documents a 4-hour notification SLA for critical incidents). VERIFY WITH ULI. |
| Response time (body copy) | "Same-day or next-day for non-emergencies, immediate remote response for anything critical" | cybersecurity-salinas.html:314 | UNVERIFIABLE and internally inconsistent with the key-facts block's "24–48 hours" figure on the same page — VERIFY WITH ULI, resolve to one number |
| Free assessment length | "No-obligation 30-minute IT assessment" / "30 minutes with a senior engineer" | cybersecurity-salinas.html:243, 294 | UNVERIFIABLE — not specified in VERIFIED FACTS |
| Capability: Endpoint Detection & Response | **"Huntress EDR** with a 24/7 SOC on every endpoint, layered with **Microsoft Defender**" | cybersecurity-salinas.html:265 | CONTRADICTS — VERIFIED FACTS: "never publish vendor names." The listed capability is generic "managed detection and response with a 24/7 SOC"; "Huntress" names the actual EDR vendor. (Microsoft Defender is fine — it's explicitly named in the VERIFIED FACTS capability list under M365 hardening.) |
| Capability: Vulnerability Management | "Continuous scanning and fast patching across Windows, macOS, and **200+ third-party apps**" | cybersecurity-salinas.html:281 | UNVERIFIABLE — the "200+" figure is not sourced in VERIFIED FACTS. VERIFY WITH ULI. |
| Capability: Identity & MFA | "Phishing-resistant MFA, Conditional Access, and the death of legacy auth" | cybersecurity-salinas.html:268-269, 323 | MATCHES capability list |
| Capability: Immutable Backup | "Backups the production network cannot reach or delete, with **monthly tested restores**" | cybersecurity-salinas.html:272-273 | MATCHES capability "cloud backup for Microsoft 365 and Google Workspace" generally; the specific "monthly tested restores" cadence is UNVERIFIABLE (not stated in VERIFIED FACTS) — VERIFY WITH ULI |
| Capability: Email Security & Training | "Email filtering plus security-awareness training" | cybersecurity-salinas.html:276-277 | MATCHES capability list (DNS and web filtering, security awareness training) |
| Compliance work: HIPAA for **medical and dental practices** | Dental named as a served/target vertical for compliance work | cybersecurity-salinas.html:89 (JSON-LD FAQ answer), 306 (body paragraph), 335 (visible FAQ answer) | CONTRADICTS — VERIFIED FACTS: "Excluded vertical: dentists. Dental must not appear as a client or target industry anywhere." |
| Compliance work: C-TPAT for importers/carriers/3PLs | cybersecurity-salinas.html:306, 335 | Not contradicted — aligns with the site's existing /ctpat service line; no VERIFIED FACTS statement to check against |
| Industries named (targeted-by-attackers narrative) | Agriculture, food processing, cold storage, logistics/carriers | cybersecurity-salinas.html:220, 253, 327 | UNVERIFIABLE — not enumerated in VERIFIED FACTS; no contradiction |
| Credentials/certifications | none named on this page | — | N/A — page makes no specific credential claims |
| Cisco certification | none found | — | N/A (correct) |
| Clearance level | none stated, only "DoD infrastructure experience" | cybersecurity-salinas.html:19, 220 | MATCHES (no specific level stated) |
| SIEM | none found | — | N/A — no SIEM claim on this page |
| Phone number | (831) 204-0501 | cybersecurity-salinas.html:166, 226, 245, 532 | UNVERIFIABLE — not covered by VERIFIED FACTS, but consistent throughout the page |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at cybersecurity-salinas.html:236-247 has Service area, Led by, Response, Pricing (linked to /pricing), plus Free/Rated/Direct line rows |
| FAQ present with real question-and-answer text | Pass | Visible `<details>/<summary>` FAQ at cybersecurity-salinas.html:321-337 (4 Q&As), matching FAQPage JSON-LD at 58-93 (see dental violation above — the JSON-LD and visible FAQ both carry the same dental text, so fixing one without the other would create a mismatch) |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (line 219) + lead paragraph (line 220) state the offer plainly ("Ghosxt brings government-grade cybersecurity, sized and priced for a Salinas small business...") well inside the first 300 words |
| Exactly one H1 | Pass | Single `<h1>` at cybersecurity-salinas.html:219 |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8 |
| JSON-LD present (list which types) | Pass | `@graph` at cybersecurity-salinas.html:38-93 contains: Service, BreadcrumbList, FAQPage |
| Content that exists only inside JS | Pass (none found) | All headings, body copy, and FAQ are static HTML (FAQ uses native `<details>`); no evidence of content injected only via assets/js/main.min.js |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the file |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, cybersecurity-salinas.html:107-121) sits in the DOM before `<nav>` (124) and before `<main id="main-content">` (213) |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (232); links to nearby city pages (314: Watsonville, Hollister, Monterey, Santa Cruz, Gilroy) and to /ctpat (306, 335); footer links to vertical pages (agriculture, trucking, manufacturing, healthcare, etc.) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Vendor name — "Huntress EDR" named explicitly | cybersecurity-salinas.html:265 |
| Dental — excluded vertical named as a client/target industry for HIPAA compliance work | cybersecurity-salinas.html:89 (JSON-LD FAQ answer), 306 (body paragraph "we handle HIPAA for medical and dental practices"), 335 (visible FAQ answer, identical text) |

No em-dash or clearance-level violations were found on this page. No Cisco-certification or SIEM claims were found on this page.

## Top Three Fixes
1. Remove the vendor name "Huntress" from the Endpoint Detection & Response card (cybersecurity-salinas.html:265) — replace with the generic listed capability wording ("managed detection and response with a 24/7 SOC," already used correctly elsewhere on the site). Microsoft Defender can stay, since Microsoft 365/Defender is explicitly named in VERIFIED FACTS.
2. Remove all three dental references (cybersecurity-salinas.html:89, 306, 335) — dentists are an excluded vertical and must not appear as a client or target industry anywhere, including in FAQ text and JSON-LD structured data. Fix must be applied in both the JSON-LD FAQ answer and the matching visible `<details>` answer so the two stay in sync.
3. Reconcile the two different response-time claims on the same page (key-facts block: "24–48 hours" at line 241, vs. body copy: "same-day or next-day" at line 314) and VERIFY WITH ULI which figure is accurate before publishing either; also confirm the "200+ third-party apps" patching figure (line 281) and "monthly tested restores" cadence (line 273), neither of which is sourced in VERIFIED FACTS.
