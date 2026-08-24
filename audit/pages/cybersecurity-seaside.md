# Page Audit: /cybersecurity-seaside

## Route
/cybersecurity-seaside (file: cybersecurity-seaside.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Google review rating/count (hero trust callout) | 5.0 stars, 26 Google reviews | cybersecurity-seaside.html:228 | MATCHES |
| Google review rating/count (key-facts block) | 5.0 stars, 26 Google reviews | cybersecurity-seaside.html:241 | MATCHES |
| Client since year | "trusted by businesses across Monterey County since 2021 and beyond" | cybersecurity-seaside.html:228 | UNVERIFIABLE - CLAUDE.md itself tags this year "[VERIFY year]"; VERIFY WITH ULI |
| Engineer credential framing | "An engineer with DoD infrastructure experience" (key-facts, hero, CTAs) | cybersecurity-seaside.html:217, 237 | MATCHES - no clearance level stated |
| "Government-grade" cybersecurity/IT framing | "Government-grade cybersecurity... Government-grade IT for small business" | cybersecurity-seaside.html:7, 13, 19, 44, 217, 368 | UNVERIFIABLE - marketing framing consistent with DoD/federal-contractor background, not a literal VERIFIED FACT; VERIFY WITH ULI |
| Excluded vertical named as part of local business landscape | "retail and restaurants along Broadway, auto and repair shops, dental and healthcare offices, nonprofits, childcare, construction trades..." | cybersecurity-seaside.html:250 | CONTRADICTS - VERIFIED FACTS: "Excluded vertical: dentists. Dental must not appear as a client or target industry anywhere." |
| Response time SLA (key-facts) | "Same-day remote support; on-site within 24–48 hours" | cybersecurity-seaside.html:238 | UNVERIFIABLE - not documented in VERIFIED FACTS (only a 4-hour critical-incident notification SLA is documented) |
| Response time SLA (FAQ body copy) | "Same-day or next-day for non-emergencies, and most issues are resolved remotely the same hour." | cybersecurity-seaside.html:333 | UNVERIFIABLE - differently worded from the key-facts response claim above (24-48hr vs. same-hour) and not documented in VERIFIED FACTS; VERIFY WITH ULI for internal consistency |
| EDR product named with vendor | "Huntress EDR with a 24/7 SOC on every endpoint, layered with Microsoft Defender." | cybersecurity-seaside.html:263 | CONTRADICTS - VERIFIED FACTS: "never publish vendor names"; describe as managed detection and response with a 24/7 SOC instead |
| Microsoft Defender reference | "layered with Microsoft Defender" | cybersecurity-seaside.html:263 | MATCHES - Defender for Business is explicitly named in the VERIFIED FACTS capability list |
| Identity/MFA capability | "Phishing-resistant MFA and Conditional Access for Microsoft 365" | cybersecurity-seaside.html:267 | MATCHES - within listed capabilities |
| Retail/POS security capability | "PCI-aware point-of-sale protection with the payment network segmented from the back-office and guest Wi-Fi" | cybersecurity-seaside.html:271, 303-304 | UNVERIFIABLE - not enumerated in the VERIFIED FACTS capability list; VERIFY WITH ULI whether PCI/POS segmentation is an actual delivered capability |
| Business email / BEC defense capability | "Anti-phishing, DMARC, and email security policies" | cybersecurity-seaside.html:275 | UNVERIFIABLE - not enumerated in the VERIFIED FACTS capability list; VERIFY WITH ULI |
| Immutable/air-gapped backup capability | "Air-gapped backups the production network cannot reach or overwrite, tested with real restore runs" | cybersecurity-seaside.html:279 | UNVERIFIABLE - VERIFIED FACTS lists "cloud backup for Microsoft 365 and Google Workspace" generically; "air-gapped" and "tested with real restore runs" are more specific claims not documented; VERIFY WITH ULI |
| Vulnerability management capability | "endpoint detection and response, phishing-resistant MFA, identity hardening, immutable backup, vulnerability management, and 24/7 monitoring" | cybersecurity-seaside.html:44 (Service JSON-LD description) | CONTRADICTS - "vulnerability management" is not among the capabilities enumerated in VERIFIED FACTS; house rule: do not claim unlisted capabilities |
| 24/7 monitoring capability | "Tooling backed by a human who acts on alerts." | cybersecurity-seaside.html:283 | MATCHES - "managed detection and response with a 24/7 SOC" |
| Pricing statement | "Cybersecurity is built into every managed plan, pricing published upfront." / FAQ mentions "flat-rate Tiny Team plan" | cybersecurity-seaside.html:229, 329 | MATCHES - no specific dollar figures given on this page to check against the $600/$125/$175/$250 tiers |
| Free assessment offer | "No-obligation 30-minute IT assessment" | cybersecurity-seaside.html:240, 292 | UNVERIFIABLE - general offer language, no contradiction found but not itself in VERIFIED FACTS |
| Local military/geography color | "military families tied to the Defense Language Institute and Presidio of Monterey" | cybersecurity-seaside.html:217, 250 | UNVERIFIABLE - outside VERIFIED FACTS scope; plausible local geography but not a business claim this audit can confirm |
| Footer background claim | "Built by an engineer from the federal contracting world." | cybersecurity-seaside.html:492 | MATCHES - consistent with "prior DoD/federal contractor infrastructure experience" |
| No case examples, testimonials, or client names present | n/a | n/a | N/A - none found on this page |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` lines 233-244: service area, "Led by", response time, pricing link, review rating, phone all present |
| FAQ present with real question-and-answer text | Pass | Four `<details>/<summary>` Q&A pairs, lines 319-335, mirrored in FAQPage JSON-LD (lines 56-92) |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero lead paragraph (line 217) states the offer plainly; body-through-lead word count is ~198 words |
| Exactly one H1 | Pass | Single `<h1>` at line 216 |
| Title, meta description, canonical present | Pass | Lines 6, 7, 8 |
| JSON-LD present (list which types) | Pass | Service, BreadcrumbList, FAQPage (lines 34-95) |
| Content that exists only inside JS | Pass (none found) | All body content is static HTML; only the analytics beacon and shared main.min.js are scripted |
| Icon-only table cells | N/A | No `<table>` elements on this page |
| display:none on content that should be crawlable | Pass (none found in this file) | No inline `display:none`; page-level CSS files were not audited as part of this pass |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (lines 106-120) and the full duplicate `<div class="navbar-mobile-menu">` (lines 172-207) both precede `<main>` (line 210) in DOM order |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (229, 239), /cybersecurity, /cloud-services-seaside, /seaside, /marina, /monterey, /pacific-grove, /salinas (lines 311-312) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental named as part of the target local business landscape ("dental and healthcare offices") | cybersecurity-seaside.html:250 |
| Vendor name disclosed ("Huntress EDR") | cybersecurity-seaside.html:263 |
| Unlisted capability ("vulnerability management") in Service JSON-LD description | cybersecurity-seaside.html:44 |
| Unlisted capabilities to VERIFY WITH ULI (PCI/POS network segmentation, DMARC/anti-phishing BEC defense, "air-gapped" backup with "real restore runs") | cybersecurity-seaside.html:271, 275, 279, 303-304 |

No em dashes (including %E2%80%94 encodings), Cisco-certification claims, clearance-level statements, or the literal term "SIEM" were found on this page.

## Top Three Fixes
1. Remove the vendor name "Huntress" (line 263); rewrite as "endpoint detection and response (EDR) backed by a 24/7 SOC" per the capability language in VERIFIED FACTS. "Microsoft Defender" can stay since Defender for Business is explicitly listed.
2. Remove "dental" from line 250 ("dental and healthcare offices") - dental must never appear as a client or target industry, even in a list of local business types.
3. VERIFY WITH ULI: whether PCI/POS network segmentation (271, 303-304), DMARC/anti-phishing BEC defense (275), "air-gapped"/"real restore runs" backup language (279), and "vulnerability management" (44) are actual deliverable capabilities before republishing - none are enumerated in VERIFIED FACTS, and the house rule is explicit that unlisted capabilities must not be claimed. Also reconcile the two differently-worded response-time claims (238 vs. 333).
