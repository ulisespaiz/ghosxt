# Page Audit: /web-design-seaside

## Route
/web-design-seaside (file: web-design-seaside.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Engineer credential framing (title/meta) | "From an engineer with DoD infrastructure experience" | web-design-seaside.html:44, 217 | MATCHES — no clearance level stated |
| Starting price | "Websites from $1,800, published upfront" / "pricing published upfront starting at $1,800" | web-design-seaside.html:7, 13, 19, 228, 304 | UNVERIFIABLE — website-development pricing is a separate service line from the $600/$125/$175/$250 MSP plan pricing in VERIFIED FACTS; no source of truth on this page's site to check the figure against |
| Package pricing | "$1,800 Essential, $3,200 Business Pro, $5,900+ e-commerce" | web-design-seaside.html:88, 316 | UNVERIFIABLE — not covered by VERIFIED FACTS pricing table (which only documents managed-services tiers); VERIFY WITH ULI |
| Booking add-on price | "Our booking add-on ($1,200)" | web-design-seaside.html:80, 312 | UNVERIFIABLE — not covered by VERIFIED FACTS; VERIFY WITH ULI |
| Maintenance & security price | "Updates, daily backups, security monitoring, and performance checks from $300/month" | web-design-seaside.html:259 | UNVERIFIABLE — not covered by VERIFIED FACTS; VERIFY WITH ULI |
| Maintenance run by "the same security team" | "run by the same security team that protects business networks" (links to /cybersecurity) | web-design-seaside.html:259, 294 | MATCHES — consistent with sole-engineer model and cross-links to the cybersecurity service |
| Ownership of assets | "domain, hosting, and code in accounts you own" | web-design-seaside.html:235, 254-255 | UNVERIFIABLE — general service description, no VERIFIED FACT to check against, not contradicted |
| No dental/excluded-vertical references | n/a | n/a | N/A — no dental, dentist, Cisco, SIEM, vendor-name, or clearance-level language found on this page |
| No Google review / "since 2021" trust callout on this page | n/a (absent) | n/a | N/A — unlike the sibling cloud-services-seaside.html and cybersecurity-seaside.html pages, this page has no `pricing-trust-callout` review/tenure block to check |
| Footer tagline | "Government-grade IT for small business." | web-design-seaside.html:351 | UNVERIFIABLE — marketing framing consistent with DoD/federal-contractor experience, not a literal VERIFIED FACT; VERIFY WITH ULI |
| Footer background claim | "Built by an engineer from the federal contracting world." | web-design-seaside.html:475 | MATCHES — consistent with "prior DoD/federal contractor infrastructure experience" |
| No case examples, testimonials, or client names present | n/a | n/a | N/A — none found on this page |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No `<aside class="key-facts">` block exists on this page (confirmed absent by search) — unlike the sibling cloud-services-seaside.html and cybersecurity-seaside.html pages, there is no dedicated service-area/response-time/pricing-link summary; only a single pricing-callout line (228) and a pricing link in global nav |
| FAQ present with real question-and-answer text | Pass | Four `<details>/<summary>` Q&A pairs, lines 302-318, mirrored in FAQPage JSON-LD (lines 56-92) |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero lead paragraph (line 217) states the offer plainly ("hand-codes practical, lead-generating websites... at published prices"); body-through-lead word count is ~198 words |
| Exactly one H1 | Pass | Single `<h1>` at line 216 |
| Title, meta description, canonical present | Pass | Lines 6, 7, 8 |
| JSON-LD present (list which types) | Pass | Service, BreadcrumbList, FAQPage (lines 34-95) |
| Content that exists only inside JS | Pass (none found) | All body content is static HTML; only the analytics beacon and shared main.min.js are scripted |
| Icon-only table cells | N/A | No `<table>` elements on this page |
| display:none on content that should be crawlable | Pass (none found in this file) | No inline `display:none`; page-level CSS files were not audited as part of this pass |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (lines 106-120) and the full duplicate `<div class="navbar-mobile-menu">` (lines 172-207) both precede `<main>` (line 210) in DOM order |
| Internal links to pricing and to the relevant city or vertical pages | Partial | Links to /website-development and its `#calculator` pricing tool (228, 295, 329), and to sibling web-design pages for Marina, Monterey, Pacific Grove, Salinas (295); does not link to the general /pricing (MSP) page in body content, though /pricing appears in the shared global nav — appropriate since this service line prices separately from managed IT plans |

## House-Rule Violations
No violations found on this page: no em dashes (including %E2%80%94 encodings), Cisco-certification claims, dental/dentist references, vendor names, clearance-level statements, or the literal term "SIEM"/unlisted security capabilities.

## Top Three Fixes
1. Add an at-a-glance `<aside class="key-facts">` block matching the pattern used on cloud-services-seaside.html and cybersecurity-seaside.html — currently this is the only one of the three audited Seaside pages missing service area / response time / pricing link / review rating in one scannable block, which weakens both human skimmability and AI-answer-engine extraction.
2. VERIFY WITH ULI: confirm the web-design pricing figures ($1,800 / $3,200 / $5,900+, $1,200 booking add-on, $300/month maintenance) are current and accurate — none of these appear in VERIFIED FACTS, which only documents managed-IT plan pricing.
3. Consider adding a Google-reviews/tenure trust callout consistent with the sibling Seaside pages (currently absent here), once the underlying "26 reviews since 2021" figures are themselves reverified per CLAUDE.md's own [VERIFY] tags.
