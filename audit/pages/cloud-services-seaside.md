# Page Audit: /cloud-services-seaside

## Route
/cloud-services-seaside (file: cloud-services-seaside.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Google review rating/count (hero trust callout) | 5.0 stars, 26 Google reviews | cloud-services-seaside.html:228 | MATCHES |
| Google review rating/count (key-facts block) | 5.0 stars, 26 Google reviews | cloud-services-seaside.html:241 | MATCHES |
| Client since year | "trusted by businesses across Monterey County since 2021 and beyond" | cloud-services-seaside.html:228 | UNVERIFIABLE — CLAUDE.md itself tags this year "[VERIFY year]"; VERIFY WITH ULI |
| Engineer credential framing (hero) | "from an engineer with DoD infrastructure experience based on the Central Coast" | cloud-services-seaside.html:217 | MATCHES — no clearance level stated |
| Engineer credential framing (key-facts "Led by") | "An engineer with DoD infrastructure experience" | cloud-services-seaside.html:237 | MATCHES |
| Response time SLA | "Same-day remote support; on-site within 24–48 hours" | cloud-services-seaside.html:238 | UNVERIFIABLE — not documented in VERIFIED FACTS (only a 4-hour critical-incident notification SLA is documented); VERIFY WITH ULI |
| Excluded vertical named as target industry | "Healthcare and dental offices need documents available anywhere staff are working, with appropriate access controls." | cloud-services-seaside.html:287 | CONTRADICTS — VERIFIED FACTS: "Excluded vertical: dentists. Dental must not appear as a client or target industry anywhere." |
| M365 hardening capability | "hardened with phishing-resistant MFA, Conditional Access, and a Secure Score that reflects actual protection" | cloud-services-seaside.html:254 | MATCHES — within listed capabilities (M365 hardening with Intune, Defender for Business, Conditional Access) |
| Identity/backup capability | "immutable backup for Exchange, SharePoint, and Teams data, alongside Entra ID hardening and Conditional Access policies" | cloud-services-seaside.html:278 | UNVERIFIABLE — VERIFIED FACTS lists "cloud backup for Microsoft 365 and Google Workspace" generically; "immutable" is a more specific technical claim not documented; VERIFY WITH ULI |
| Azure & hybrid service line | "Azure where it solves a real problem... secure remote access... hybrid identity management" | cloud-services-seaside.html:273-274 | UNVERIFIABLE — general service description, not enumerated in VERIFIED FACTS capability list but not contradicted either |
| Pricing statement | "Cloud and Microsoft 365 management is part of every managed plan, pricing published upfront." (links to /pricing) | cloud-services-seaside.html:229 | MATCHES — no specific dollar figures stated on this page to check against the $600/$125/$175/$250 tiers |
| Free assessment offer | "No-obligation 30-minute IT assessment" | cloud-services-seaside.html:240, 295, 344 | UNVERIFIABLE — general offer language, no contradiction found but not itself in VERIFIED FACTS |
| Footer tagline | "Government-grade IT for small business." | cloud-services-seaside.html:371 | UNVERIFIABLE — marketing framing consistent with DoD/federal-contractor experience but not a literal VERIFIED FACT; VERIFY WITH ULI |
| Footer background claim | "Built by an engineer from the federal contracting world." | cloud-services-seaside.html:495 | MATCHES — consistent with "prior DoD/federal contractor infrastructure experience" |
| No case examples, testimonials, or client names present | n/a | n/a | N/A — none found on this page |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` lines 233-244: service area, "Led by", response time, pricing link, review rating, phone all present |
| FAQ present with real question-and-answer text | Pass | Four `<details>/<summary>` Q&A pairs, lines 322-338, mirrored in FAQPage JSON-LD (lines 56-92) |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero lead paragraph (line 217) states the offer plainly; body-through-lead word count is ~207 words |
| Exactly one H1 | Pass | Single `<h1>` at line 216 |
| Title, meta description, canonical present | Pass | Lines 6, 7, 8 |
| JSON-LD present (list which types) | Pass | Service, BreadcrumbList, FAQPage (lines 34-95) |
| Content that exists only inside JS | Pass (none found) | All body content is static HTML; only the analytics beacon and shared main.min.js are scripted |
| Icon-only table cells | N/A | No `<table>` elements on this page |
| display:none on content that should be crawlable | Pass (none found in this file) | No inline `display:none`; page-level CSS files were not audited as part of this pass |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (lines 106-120) and the full duplicate `<div class="navbar-mobile-menu">` (lines 172-207) both precede `<main>` (line 210) in DOM order |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (229, 239), /cloud-services, /cybersecurity-seaside, /seaside, /marina, /monterey, /pacific-grove, /salinas (lines 314-315) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental named as target industry ("Healthcare and dental offices need documents available anywhere staff are working") | cloud-services-seaside.html:287 |

No em dashes (including %E2%80%94 encodings), Cisco-certification claims, vendor names, clearance-level statements, or the literal term "SIEM" were found on this page.

## Top Three Fixes
1. Remove "dental" from line 287 ("Healthcare and dental offices need documents available anywhere staff are working, with appropriate access controls.") — dental must never appear as a client or target industry. Replace with a non-excluded vertical (e.g., healthcare offices alone, or a winery/ag-tech example).
2. Move the cookie banner and duplicated mobile-nav markup after `<main>` in DOM source order (or confirm with Uli this is an accepted site-wide pattern) so crawlers reach the offer statement and key facts before consent/navigation chrome.
3. VERIFY WITH ULI: the "since 2021" tenure claim (line 228, matches CLAUDE.md's own [VERIFY year] tag), the "Same-day remote support; on-site within 24-48 hours" response SLA (line 238, not documented in VERIFIED FACTS), and the "immutable backup" specificity for Exchange/SharePoint/Teams (line 278).
