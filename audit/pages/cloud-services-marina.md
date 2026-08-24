# Page Audit: /cloud-services-marina

## Route
/cloud-services-marina (file: cloud-services-marina.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Google review rating/count (hero trust callout) | 5.0 stars, 26 Google reviews | cloud-services-marina.html:228 | MATCHES |
| Google review rating/count (key-facts block) | 5.0 stars, 26 Google reviews | cloud-services-marina.html:241 | MATCHES |
| Client since year | "trusted by businesses across Monterey County since 2021 and beyond" | cloud-services-marina.html:228 | UNVERIFIABLE - CLAUDE.md itself tags this year "[VERIFY year]"; VERIFY WITH ULI |
| Engineer credential framing | "An engineer with DoD infrastructure experience" (key-facts "Led by") | cloud-services-marina.html:237 | MATCHES - no clearance level stated |
| Engineer credential framing (hero) | "from an engineer with DoD infrastructure experience" | cloud-services-marina.html:217 | MATCHES |
| Response time SLA | "Same-day remote support; on-site within 24–48 hours" | cloud-services-marina.html:238 | UNVERIFIABLE - not present in VERIFIED FACTS (only a 4-hour critical-incident notification SLA is documented); VERIFY WITH ULI |
| Excluded vertical named as prospective client | "a dental practice moving into a new Marina building" | cloud-services-marina.html:287 | CONTRADICTS - VERIFIED FACTS: "Excluded vertical: dentists. Dental must not appear as a client or target industry anywhere." |
| Capabilities referenced (MFA, Conditional Access, Intune, Defender-adjacent tenant hardening) | phishing-resistant MFA, Conditional Access scoped to device/location, Intune device enrollment | cloud-services-marina.html:254, 270, 274, 278, 336 | MATCHES - within the capabilities list (M365 hardening with Intune, Defender for Business, Conditional Access) |
| Pricing statement | "Cloud and Microsoft 365 management is part of every managed plan: pricing published upfront." (links to /pricing) | cloud-services-marina.html:229 | MATCHES - no specific dollar figures stated on this page to check against the $600/$125/$175/$250 tiers |
| Free assessment offer | "No-obligation 30-minute IT assessment" | cloud-services-marina.html:240, 295 | UNVERIFIABLE - general offer language, no contradiction found but not itself in VERIFIED FACTS |
| Footer tagline | "Government-grade IT for small business." | cloud-services-marina.html:371 | UNVERIFIABLE - marketing framing consistent with DoD/federal-contractor experience but not a literal fact in VERIFIED FACTS; VERIFY WITH ULI |
| Footer background claim | "Built by an engineer from the federal contracting world." | cloud-services-marina.html:495 | MATCHES - consistent with "prior DoD/federal contractor infrastructure experience" |
| No case examples, testimonials, client names, or SIEM/vendor claims present | n/a | n/a | N/A - none found on this page |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` lines 233–244: service area, "Led by", response time, pricing link, review rating, phone all present |
| FAQ present with real question-and-answer text | Pass | Four `<details>/<summary>` Q&A pairs, lines 322–337, mirrored in FAQPage JSON-LD |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero lead paragraph (line 217) states the offer plainly before any other body content |
| Exactly one H1 | Pass | Single `<h1>` at line 216 |
| Title, meta description, canonical present | Pass | Lines 6, 7, 8 |
| JSON-LD present (list which types) | Pass | Service, BreadcrumbList, FAQPage (lines 34–95) |
| Content that exists only inside JS | Pass (none found) | All body content is static HTML; only analytics beacon and a shared main.min.js are scripted |
| Icon-only table cells | N/A | No `<table>` elements on this page |
| display:none on content that should be crawlable | Pass (none found in this file) | No inline `display:none`; page-level CSS files were not audited as part of this pass |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (lines 106–120) precedes both `<nav>` (121) and `<main>` (210) in DOM order |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (229, 239), /cybersecurity-marina, /marina, /seaside, /monterey, /salinas, /pacific-grove, /cloud-services (lines 314–315) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental named as target/prospective client ("a dental practice moving into a new Marina building") | cloud-services-marina.html:287 |

No em dashes (including %E2%80%94 encodings), Cisco-certification claims, vendor names, clearance-level statements, or SIEM/unlisted-capability claims were found on this page.

## Top Three Fixes
1. Remove or replace "a dental practice moving into a new Marina building" (line 287) with a non-excluded vertical example (e.g., a winery or ag-tech tenant) - dental must never appear as a client or target industry.
2. Move the cookie banner markup after `<nav>`/`<main>` in DOM source order (or confirm with Uli this is an accepted site-wide pattern) so it does not sit ahead of primary content in the DOM.
3. VERIFY WITH ULI: the "since 2021" tenure claim (line 228, matches CLAUDE.md's own [VERIFY year] tag) and the "Same-day remote support; on-site within 24–48 hours" response-time SLA (line 238), neither of which is documented in VERIFIED FACTS.
