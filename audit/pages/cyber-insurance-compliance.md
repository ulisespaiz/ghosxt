# Page Audit: /cyber-insurance-compliance

## Route
/cyber-insurance-compliance (file: cyber-insurance-compliance.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Service area / cities named | Monterey, Santa Cruz, San Jose (also Salinas grower, San Jose professional services in body copy) | cyber-insurance-compliance.html:6,7,12,13,18,19,44,238,239,250,257 | MATCHES — all appear in the site's footer service-area list (Salinas, Monterey, Watsonville, Hollister, Santa Cruz, Gilroy, San Jose, Pacific Grove, Carmel, Seaside, Marina), lines 496-506 |
| JSON-LD areaServed | Monterey County, Santa Cruz County, San Benito County, Santa Clara County, State of California | cyber-insurance-compliance.html:46-51 | MATCHES — consistent with footer service-area cities (San Jose→Santa Clara Co., Hollister→San Benito Co., etc.) |
| "an engineer with DoD infrastructure experience" | Single engineer, DoD infrastructure background, no clearance level stated | cyber-insurance-compliance.html:239 | MATCHES VERIFIED FACT ("Active DoD clearance and prior DoD/federal contractor infrastructure experience"); correctly omits clearance level |
| "We are engineers, not licensed brokers" (plural "engineers") | Implies a team of engineers | cyber-insurance-compliance.html:94 (JSON-LD FAQ text), 317 (visible FAQ answer) | CONTRADICTS — VERIFIED FACTS states "Owner and sole engineer: Ulises Paiz." Plural wording misrepresents team size. |
| "MFA on email, remote access, VPN, and admin accounts, with phishing-resistant options" | MFA capability claim | cyber-insurance-compliance.html:250,261 | MATCHES (reasonably) — consistent with "Google Workspace as identity provider with phishing-resistant MFA" and Conditional Access in VERIFIED FACTS capability list |
| "EDR on Every Endpoint," "carrier-acceptable endpoint detection and response... watched around the clock" | EDR/MDR capability claim | cyber-insurance-compliance.html:250,263-266 | MATCHES — consistent with "managed detection and response with a 24/7 SOC" |
| "Security awareness training" | Capability claim | cyber-insurance-compliance.html:250,281 | MATCHES VERIFIED FACTS capability list |
| "written incident response plan" | Deliverable claim | cyber-insurance-compliance.html:250,281,305 (FAQ) | MATCHES VERIFIED FACTS contracted deliverable "incident response" (part of written policy suite) |
| "a current risk assessment" | Deliverable claim | cyber-insurance-compliance.html:70 (JSON-LD), 305 (FAQ visible) | MATCHES VERIFIED FACTS "annual independent risk assessment arranged through a third-party assessor" |
| "An offline or immutable backup copy ransomware cannot reach... documented restore test... built on our backup and disaster recovery stack" | Immutable/offline backup + tested restore presented as a Ghosxt-delivered capability | cyber-insurance-compliance.html:250,267-270,305 (FAQ),70/78 (JSON-LD) | UNVERIFIABLE / flag for VERIFY WITH ULI — VERIFIED FACTS capability list only says "cloud backup for Microsoft 365 and Google Workspace"; it does not specify immutability, offline copies, or restore testing. House rule: "Do not claim ... anything not listed." |
| "Device encryption" | Capability claim | cyber-insurance-compliance.html:250,281,305 (FAQ),70/78 (JSON-LD) | UNVERIFIABLE / flag for VERIFY WITH ULI — not present in VERIFIED FACTS capability list |
| "Vulnerability scanning" | Capability claim | cyber-insurance-compliance.html:250,70 (JSON-LD) | UNVERIFIABLE / flag for VERIFY WITH ULI — not present in VERIFIED FACTS capability list |
| "carriers that ask for a recent test are covered by our penetration testing" | Penetration testing presented as a Ghosxt-delivered service (links to /penetration-testing) | cyber-insurance-compliance.html:297 | UNVERIFIABLE / flag for VERIFY WITH ULI — not in VERIFIED FACTS capability or deliverables list (the listed third-party-arranged item is an annual risk assessment, not penetration testing) |
| "real phishing protection beyond the default spam filter" (email security) | Capability claim, described as distinct from "DNS and web filtering" | cyber-insurance-compliance.html:250,273 | UNVERIFIABLE — borderline; may map to listed DNS/web filtering capability but is worded as a separate "email security" control. Flag for VERIFY WITH ULI. |
| Santa Cruz retailer / expired antivirus / denied claim scenario | Explicitly hypothetical illustration ("Picture a Santa Cruz retailer...") | cyber-insurance-compliance.html:296 | UNVERIFIABLE (explicitly framed as hypothetical, not a real case or testimonial) — not proposing removal, framing already reads as illustrative rather than a real client story |
| "Start about 60 days before your renewal date"; "a renewal is an hour of review, not a six-week project" | Process/timing claims | cyber-insurance-compliance.html:296,309,313 | UNVERIFIABLE — no VERIFIED FACT covers renewal timelines or turnaround times |
| Ghosxt's own cyber liability insurance ($1M per occurrence/aggregate, general & professional liability) | Not mentioned anywhere on this page | n/a | NOT PRESENT — page discusses helping clients meet carrier requirements but never states Ghosxt's own coverage; nothing to verify or contradict on this specific VERIFIED FACT |
| "Everything we do is operational guidance, not insurance advice... broker handles coverage, policy language, and carrier selection" | Scope/role disclaimer | cyber-insurance-compliance.html:296,317 (FAQ) | MATCHES general positioning (engineer, not broker) — no VERIFIED FACT contradicted |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No dedicated block combines all four. Service area is in the H1/lead (238-239); no explicit "who you talk to" statement; no response time stated anywhere on page; pricing link only appears buried in a FAQ answer (325) plus nav/footer. |
| FAQ present with real question-and-answer text | Pass | Six `<details>` FAQs with full answer text (303-326), mirrored in FAQPage JSON-LD (63-114). |
| Plain-text statement of the offer within first 300 words of body | Pass | Lead paragraph (239) states the offer plainly ("Ghosxt gets Central Coast businesses ready for cyber insurance: MFA everywhere it counts, EDR on every endpoint, immutable backups, and the written evidence...") well under 300 words in. |
| Exactly one H1 | Pass | Single `<h1>` at line 238. |
| Title, meta description, canonical present | Pass | Lines 6, 7, 8. |
| JSON-LD present (list types) | Pass | `Service` (39-53), `BreadcrumbList` (54-61), `FAQPage` (62-114), all in one `@graph` (34-117). |
| Content that exists only inside JS | Pass (none found) | FAQ answers, hero copy, and service cards are all static HTML; no evidence of JS-only rendered content in this file. |
| Icon-only table cells | Pass (N/A) | No `<table>` elements on this page. |
| display:none on content that should be crawlable | Pass (none found) | No inline `display:none` in this file (external CSS not audited). |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, 128-142) sits before `<nav>` (143) and before `<main id="main-content">` (232) in DOM order. |
| Internal links to pricing and to the relevant city or vertical pages | Partial / Fail | Pricing: only one contextual link, inside a FAQ answer (325); otherwise nav/footer only. Vertical links: good — links to /cybersecurity (297), /managed-detection-response (265), /backup-disaster-recovery (269), /managed-it-services (281), /penetration-testing (297). City links: the page repeatedly names Monterey, Santa Cruz, San Jose, Salinas in prose (239,250,257,296) but never hyperlinks to /monterey, /santa-cruz, /san-jose, or /salinas in body content — those city pages are only reachable via the generic footer service-area list (496-506). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Capability not in VERIFIED FACTS list: "immutable"/"offline" backup copy + documented tested restore presented as a delivered capability (verified list only says "cloud backup for Microsoft 365 and Google Workspace") | cyber-insurance-compliance.html:250,267-270,305,70,78 |
| Capability not in VERIFIED FACTS list: "device encryption" presented as delivered | cyber-insurance-compliance.html:250,281,305,70,78 |
| Capability not in VERIFIED FACTS list: "vulnerability scanning" presented as delivered | cyber-insurance-compliance.html:250,70 |
| Capability not in VERIFIED FACTS list: penetration testing presented as a Ghosxt-delivered service via linked /penetration-testing page | cyber-insurance-compliance.html:297 |
| Capability worded as distinct from listed set: "email security"/"phishing protection beyond the default spam filter" (verified list only names "DNS and web filtering") | cyber-insurance-compliance.html:250,273 |

No em dashes, no Cisco certification claim, no dental/dentist mention, no vendor names, and no clearance level found on this page.

## Top Three Fixes
1. Build a real at-a-glance block near the top of the page (service area, who the visitor talks to — sole engineer Ulises Paiz — response time, and a direct pricing link) — currently absent, and the one pricing link that exists is buried inside a FAQ answer.
2. Fix "We are engineers, not licensed brokers" (line 94 JSON-LD / 317 visible FAQ) to singular/sole-engineer phrasing consistent with the VERIFIED FACT "Owner and sole engineer: Ulises Paiz," and reorder the DOM so the cookie banner (128-142) does not sit ahead of `<nav>` and `<main>`.
3. VERIFY WITH ULI whether "immutable/offline backup with tested restore," "device encryption," "vulnerability scanning," and "penetration testing" are actually delivered capabilities — none are in the VERIFIED FACTS capability list, and the page presents all four as things Ghosxt provides directly (not just carrier-required generalities). Also add contextual in-body links to /monterey, /santa-cruz, /san-jose, and /salinas since those cities are named repeatedly in prose but never linked outside the footer.
