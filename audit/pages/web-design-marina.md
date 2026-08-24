# Page Audit: /web-design-marina

## Route
/web-design-marina (file: web-design-marina.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Website starting price | "From $1,800" / "Websites from $1,800" | web-design-marina.html:7, 13, 19, 228 | UNVERIFIABLE - VERIFIED FACTS documents managed-IT plan pricing (Tiny Team/Core/Secure Growth/Compliance & Continuity) but no web-design package pricing; VERIFY WITH ULI |
| Website package tiers | "$1,800 Essential, $3,200 Business Pro, $5,900+ e-commerce" | web-design-marina.html:88 (FAQ) | UNVERIFIABLE - same reason; not in VERIFIED FACTS; internally consistent with the page's other price mentions |
| Startup build price range | "$1,800–$3,200 builds" | web-design-marina.html:72 (FAQ) | UNVERIFIABLE - same reason; consistent with the tier figures above |
| Website maintenance price | "from $300/month" | web-design-marina.html:259 | UNVERIFIABLE - not in VERIFIED FACTS |
| "Security team" running maintenance/cybersecurity | "run by the same security team that protects business networks" / "backed by a real IT and security team" / "the same team that runs cybersecurity and managed IT" | web-design-marina.html:259, 293, 294 | CONTRADICTS - VERIFIED FACTS: "Owner and sole engineer: Ulises Paiz." There is no team; this should read as one engineer, not "team" |
| Engineer credential framing | "a Peninsula-based engineer with deep DoD infrastructure experience" / "the engineer who would actually build your site" | web-design-marina.html:217, 276 | MATCHES - no clearance level stated, and singular "engineer" here is correctly used (unlike the "security team" language above) |
| "Government-grade IT for small business" footer tagline | marketing tagline | web-design-marina.html:351 | UNVERIFIABLE - consistent framing with DoD/federal-contractor background but not a literal VERIFIED FACT; VERIFY WITH ULI |
| Footer background claim | "Built by an engineer from the federal contracting world." | web-design-marina.html:475 | MATCHES - consistent with "prior DoD/federal contractor infrastructure experience" |
| Target clientele: "clinics" | "First websites for Marina startups, ag-tech, and clinics near CSUMB" / "Clinics and services near CSUMB need booking..." / FAQ: "startups, clinics, and new storefronts" | web-design-marina.html:7, 268, 304 | UNVERIFIABLE - "clinics" is not itself "dental," so this is not a direct house-rule violation, but it sits close to the excluded vertical; VERIFY WITH ULI that no dental clinics are implied or targeted |
| No case examples, testimonials, or specific client names present | n/a | n/a | N/A - none found on this page |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No `<aside class="key-facts">` block exists on this page (present on both cloud-services-marina.html and cybersecurity-marina.html). Response time is never stated anywhere on the page. Pricing link and "who you talk to" appear only in prose (lines 217, 228), not in a scannable block |
| FAQ present with real question-and-answer text | Pass | Four `<details>/<summary>` Q&A pairs, lines 302–317, mirrored in FAQPage JSON-LD |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero lead paragraph (line 217) states the offer plainly before other body content |
| Exactly one H1 | Pass | Single `<h1>` at line 216 |
| Title, meta description, canonical present | Pass | Lines 6, 7, 8 |
| JSON-LD present (list which types) | Pass | Service, BreadcrumbList, FAQPage (lines 34–95) |
| Content that exists only inside JS | Pass (none found) | All body content is static HTML; only analytics beacon and shared main.min.js are scripted |
| Icon-only table cells | N/A | No `<table>` elements on this page |
| display:none on content that should be crawlable | Pass (none found in this file) | No inline `display:none`; page-level CSS files were not audited as part of this pass |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (lines 106–120) precedes both `<nav>` (121) and `<main>` (210) in DOM order |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /website-development (pricing/calculator, multiple), /cybersecurity-marina, /marina, /web-design-seaside, /web-design-monterey, /web-design-salinas, /web-design-pacific-grove (lines 294–295) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| None of the listed house-rule terms (em dash, Cisco certification, dental, vendor name, clearance level, SIEM/unlisted capability) were found on this page. | - |

Note: the "security team" wording (see Claims Table) is not one of the six listed house-rule categories, but it does contradict the sole-engineer VERIFIED FACT and is flagged for correction.

## Top Three Fixes
1. Reword "security team" to singular ("the same engineer who protects business networks") at lines 259, 293, and 294 - VERIFIED FACTS states Ulises Paiz is the sole engineer, not a team.
2. Add a `key-facts` at-a-glance block matching the other two Marina pages (service area, who you talk to, response time, pricing link) - this page currently has none, and response time is absent from the page entirely.
3. VERIFY WITH ULI: the web-design pricing figures ($1,800 Essential / $3,200 Business Pro / $5,900+ e-commerce / $300/month maintenance) are not documented anywhere in VERIFIED FACTS, which only covers managed-IT plan pricing - confirm these are the correct, current published website-package prices before treating them as settled.
