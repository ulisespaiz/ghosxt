# Page Audit: /cybersecurity-marina

## Route
/cybersecurity-marina (file: cybersecurity-marina.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Google review rating/count (hero) | 5.0 stars, 26 Google reviews | cybersecurity-marina.html:228 | MATCHES |
| Google review rating/count (key-facts) | 5.0 stars, 26 Google reviews | cybersecurity-marina.html:241 | MATCHES |
| Client since year | "trusted by businesses across Monterey County since 2021 and beyond" | cybersecurity-marina.html:228 | UNVERIFIABLE - CLAUDE.md itself tags this year "[VERIFY year]"; VERIFY WITH ULI |
| Engineer credential framing | "An engineer with DoD infrastructure experience" (key-facts, hero, CTAs) | cybersecurity-marina.html:217, 237, 291, 339 | MATCHES - no clearance level stated |
| "Government-grade" cybersecurity/IT framing | "Government-grade cybersecurity... government-grade IT for small business" | cybersecurity-marina.html:13, 19, 44, 217, 258, 366 | UNVERIFIABLE - marketing framing consistent with DoD/federal-contractor background, but not a literal VERIFIED FACT; VERIFY WITH ULI |
| Response time SLA (key-facts) | "Same-day remote support; on-site within 24–48 hours" | cybersecurity-marina.html:238 | UNVERIFIABLE - not documented in VERIFIED FACTS (only a 4-hour critical-incident notification SLA is documented) |
| Response time SLA (body copy) | "same-day or next-day for non-urgent work, immediate remote response for active incidents" | cybersecurity-marina.html:310 | UNVERIFIABLE - differently worded from the key-facts response claim above and not documented in VERIFIED FACTS; VERIFY WITH ULI for consistency |
| EDR product named with vendor | "Huntress EDR backed by a 24/7 SOC, layered with Microsoft Defender" | cybersecurity-marina.html:262 | CONTRADICTS - VERIFIED FACTS: "never publish vendor names"; describe as managed detection and response with a 24/7 SOC instead |
| Microsoft Defender reference | "layered with Microsoft Defender" | cybersecurity-marina.html:262 | MATCHES - Defender for Business is explicitly named in VERIFIED FACTS capability list |
| Identity/MFA capability | Phishing-resistant MFA, Conditional Access, least-privilege access | cybersecurity-marina.html:266 | MATCHES - within listed capabilities |
| Immutable/air-gapped backup capability | "Air-gapped backups the production environment cannot reach or overwrite, tested on a schedule with verified restore times" | cybersecurity-marina.html:278 | UNVERIFIABLE - VERIFIED FACTS lists "cloud backup for Microsoft 365 and Google Workspace" but does not document "air-gapped" as a specific technical claim; VERIFY WITH ULI |
| Vulnerability management capability | "endpoint detection and response, phishing-resistant MFA, identity hardening, immutable backup, vulnerability management, and 24/7 monitoring" | cybersecurity-marina.html:44 (Service JSON-LD description) | CONTRADICTS - "vulnerability management" is not among the capabilities enumerated in VERIFIED FACTS; house rule: do not claim unlisted capabilities |
| Pricing statement | "Cybersecurity is built into every managed plan: pricing published upfront." / FAQ: "Our pricing is published upfront" | cybersecurity-marina.html:229, 88 | MATCHES - general statement, no specific dollar figures given on this page to check against the $600/$125/$175/$250 tiers |
| Free assessment offer | "No-obligation 30-minute IT assessment" | cybersecurity-marina.html:240, 291 | UNVERIFIABLE - general offer language, no contradiction found but not itself in VERIFIED FACTS |
| Footer background claim | "Built by an engineer from the federal contracting world." | cybersecurity-marina.html:490 | MATCHES - consistent with "prior DoD/federal contractor infrastructure experience" |
| No case examples, testimonials, or client names present | n/a | n/a | N/A - none found on this page |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` lines 233–244 |
| FAQ present with real question-and-answer text | Pass | Four `<details>/<summary>` Q&A pairs, lines 317–332, mirrored in FAQPage JSON-LD |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero lead paragraph (line 217) states the offer plainly before other body content |
| Exactly one H1 | Pass | Single `<h1>` at line 216 |
| Title, meta description, canonical present | Pass | Lines 6, 7, 8 |
| JSON-LD present (list which types) | Pass | Service, BreadcrumbList, FAQPage (lines 34–95) |
| Content that exists only inside JS | Pass (none found) | All body content is static HTML; only analytics beacon and shared main.min.js are scripted |
| Icon-only table cells | N/A | No `<table>` elements on this page |
| display:none on content that should be crawlable | Pass (none found in this file) | No inline `display:none`; page-level CSS files were not audited as part of this pass |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (lines 106–120) precedes both `<nav>` (121) and `<main>` (210) in DOM order |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (229, 239), /cybersecurity, /marina, /cloud-services-marina, /seaside, /monterey, /salinas, /pacific-grove (lines 302–310) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Vendor name disclosed ("Huntress EDR") | cybersecurity-marina.html:262 |
| Unlisted capability ("vulnerability management") in Service JSON-LD description | cybersecurity-marina.html:44 |

No em dashes (including %E2%80%94 encodings), Cisco-certification claims, dental/dentist references, clearance-level statements, or the literal term "SIEM" were found on this page.

## Top Three Fixes
1. Remove the vendor name "Huntress" (line 262); rewrite as "managed detection and response (EDR) backed by a 24/7 SOC" per the capability language in VERIFIED FACTS. "Microsoft Defender" can stay since Defender for Business is explicitly listed.
2. Drop "vulnerability management" from the Service JSON-LD description (line 44) or VERIFY WITH ULI that it is an actual, deliverable capability before adding it to VERIFIED FACTS and republishing it consistently.
3. VERIFY WITH ULI: reconcile the two differently-worded response-time claims (line 238's "24–48 hours" vs. line 310's "same-day or next-day... immediate remote response for active incidents"), and confirm the "since 2021" tenure and "air-gapped backup" specifics, none of which are documented in VERIFIED FACTS.
