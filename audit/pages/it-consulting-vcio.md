# Page Audit: /it-consulting-vcio

## Route
/it-consulting-vcio (file: it-consulting-vcio.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/operator is an engineer with DoD infrastructure experience | "an engineer with DoD infrastructure experience" | it-consulting-vcio.html:234, 254, 335, 365 (visible), 45, 95 (JSON-LD) | MATCHES |
| No clearance level stated | Only "DoD infrastructure experience" language used, never a specific level | it-consulting-vcio.html:234, 254, 335, 365 | MATCHES (VERIFIED FACTS: "DoD-cleared" is fine, never state the level) |
| Client history start | "trusted by businesses across Monterey County since 2021 and beyond" | it-consulting-vcio.html:245 | MATCHES (source fact itself carries [VERIFY year] in CLAUDE.md) |
| Google review count/rating | "26 Google reviews," 5.0 stars (two instances) | it-consulting-vcio.html:245, 258 | MATCHES (source fact itself carries [VERIFY live count] in CLAUDE.md; current date is Aug 2026, matching "26 at 5.0 as of August 2026") |
| Service area | "California's Central Coast & Bay Area" | it-consulting-vcio.html:253 | UNVERIFIABLE - VERIFIED FACTS states only "Based in Salinas, CA"; no explicit service-radius/region fact to check "Bay Area" framing against. VERIFY WITH ULI |
| "Led by" (who you talk to) | "An engineer with DoD infrastructure experience" | it-consulting-vcio.html:254 | MATCHES (generic, consistent with sole-engineer fact; does not name Ulises Paiz specifically) |
| Response time | "Same-day remote support; on-site within 24–48 hours" | it-consulting-vcio.html:255 | UNVERIFIABLE - no response-time figure in VERIFIED FACTS (only the unrelated "4-hour notification on actual or reasonably suspected critical incidents" contracted deliverable). VERIFY WITH ULI |
| Free assessment duration | "No-obligation 30-minute IT assessment" / "30 minutes with a senior engineer" | it-consulting-vcio.html:257, 324 | UNVERIFIABLE - 30-minute figure not in VERIFIED FACTS. VERIFY WITH ULI |
| Pricing pointer (no figures stated on this page) | "Published upfront, free assessment for a written quote" | it-consulting-vcio.html:256 | MATCHES (links to /pricing rather than restating numbers; no pricing figures on this page to check against the $600/125/175/250 figures) |
| Quarterly vCIO planning included with managed plans | "Managed clients get quarterly vCIO planning included" / "included in every managed plan" | it-consulting-vcio.html:79 (JSON-LD), 246, 336, 357 (visible) | UNVERIFIABLE - VERIFIED FACTS' Contracted Deliverables list (4-hr notification, annual risk assessment, SOC 2 docs, written policy suite) does not mention quarterly vCIO planning cadence or plan inclusion. VERIFY WITH ULI |
| Compliance verticals named: "HIPAA for medical and dental practices" | Dental named as a compliance-served vertical | it-consulting-vcio.html:95 (JSON-LD FAQ answer), 365 (visible FAQ) | CONTRADICTS - VERIFIED FACTS: "Excluded vertical: dentists. Dental must not appear as a client or target industry anywhere." |
| Compliance frameworks: NIST 800-171/CMMC for defense contractors, SOC 2 for SaaS/tech, PCI for card-taking businesses | Framework/vertical list | it-consulting-vcio.html:95 (JSON-LD), 365 (visible) | UNVERIFIABLE - VERIFIED FACTS lists only "annual independent risk assessment" and "SOC 2 documentation for every platform in our stack" as contracted deliverables; this broader client-vertical/framework claim is not itself verified. VERIFY WITH ULI |
| Target business size for a vCIO | "businesses from about 10 to 100 employees" | it-consulting-vcio.html:103 (JSON-LD FAQ answer), 369 (visible FAQ) | UNVERIFIABLE - employee-count range not in VERIFIED FACTS. VERIFY WITH ULI |
| IT roadmap duration | "A written 12-to-36-month plan" | it-consulting-vcio.html:295 | UNVERIFIABLE - specific duration range not in VERIFIED FACTS. VERIFY WITH ULI |
| Areas served (structured data) | California; Salinas, Monterey, Santa Cruz, San Jose | it-consulting-vcio.html:47-53 (JSON-LD areaServed) | MATCHES (consistent with Salinas, CA base; no contradiction) |
| Cities served (body copy) | Salinas, Monterey, Santa Cruz, Watsonville, Hollister, Marina, Seaside, Pacific Grove, Carmel, Gilroy, San Jose, "remote across the United States" | it-consulting-vcio.html:234, 343-344 | UNVERIFIABLE - specific city list and nationwide-remote claim are not individually enumerated in VERIFIED FACTS, but are consistent with the Salinas/Central Coast base and site-wide service-area footer list; no contradiction found. |
| Footer tagline | "Government-grade IT for small business." | it-consulting-vcio.html:404 | UNVERIFIABLE - marketing framing consistent with DoD-experience fact but not itself a verified claim. |
| Footer copyright line | "Built by an engineer from the federal contracting world." | it-consulting-vcio.html:528 | MATCHES (consistent with "prior DoD/federal contractor infrastructure experience") |
| Phone number | (831) 204-0501 | it-consulting-vcio.html:180, 240, 259, 566 (and mobile CTA bar) | UNVERIFIABLE - not listed in VERIFIED FACTS; internally consistent across all instances on the page, no contradiction. |
| No credentials list, no Cisco claim, no pricing figures, no case studies, or testimonials appear on this page | - | n/a | N/A - nothing to verify; also means no anonymized-case/testimonial VERIFY-WITH-ULI flag applies to this page. |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at lines 250-261 has Service area, Led by, Response, Pricing, Free, Rated, and Direct line fields. |
| FAQ present with real question-and-answer text | Pass | 5 `<details>` Q&As at lines 351-370, matching the FAQPage JSON-LD (lines 64-107) word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (233) + lead paragraph (234) plainly state the offer ("IT consulting fixes the decision-making... As your virtual CIO (vCIO), Ghosxt brings the strategic side of IT leadership...") well within the first 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at line 233. |
| Title, meta description, canonical present | Pass | Title line 6; meta description line 7; canonical line 8. |
| JSON-LD present (list which types) | Pass | Types present: Service, BreadcrumbList, FAQPage (single `@graph` block, lines 35-110; no duplication found). |
| Content that exists only inside JS | Pass | No content found that is JS-only; all visible copy is server-rendered in the HTML. `main.min.js` (line 563) appears to drive interactive widgets only (cookie banner, mobile menu, scroll-to-top), not content injection. |
| Icon-only table cells | N/A / Pass | No `<table>` elements exist on this page. |
| display:none on content that should be crawlable | Pass | No `display:none` occurrences found in this file; no `sr-only` usage either (none needed - no hidden crawlable text on this page). |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner" id="cookieBanner">` (lines 121-135) sits in the DOM before `<nav class="navbar">` (138) and before `<main id="main-content">` (227). |
| Internal links to pricing and to the relevant city or vertical pages | Pass | `/pricing` linked 3x (246, 256, plus footer). 11 city-specific pages linked in the "IT consulting across the Central Coast" section (343: Salinas, Monterey, Santa Cruz, Watsonville, Hollister, Marina, Seaside, Pacific Grove, Carmel, Gilroy, San Jose) plus related service pages (managed-it-services, help-desk-it-support, cybersecurity, cloud-services). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental named as a compliance-served vertical (excluded vertical) | it-consulting-vcio.html:95 ("HIPAA for medical and dental practices," JSON-LD FAQ answer), 365 (identical text, visible FAQ `<details>`) |

No em dashes (only correctly-used en dashes in the title separator and the "24–48 hours" number range), no Cisco certification claims, no vendor/tool-brand names, no SIEM claim, and no stated clearance level were found on this page.

## Top Three Fixes
1. Remove "dental" from the shared FAQ answer text about compliance verticals - it appears twice (JSON-LD line 95 and the visible FAQ line 365, same sentence duplicated for structured-data/accessibility parity), so both must be fixed together. Dentists are an explicitly excluded vertical per VERIFIED FACTS. [VERIFY WITH ULI what, if anything, replaces "medical and dental practices" - e.g. "medical practices" alone, or a different HIPAA-covered example.]
2. Move the cookie banner (lines 121-135) after `<main id="main-content">` in the DOM, or otherwise ensure it does not precede the primary content block for crawlers.
3. Confirm with Uli the response-time figure ("Same-day remote support; on-site within 24–48 hours," line 255), the 30-minute assessment duration (lines 257, 324), the "quarterly vCIO planning included in every managed plan" claim (lines 79 JSON-LD, 246, 336, 357), the 10-100 employee target range (lines 103 JSON-LD, 369), and the 12-to-36-month roadmap duration (line 295) - none of these appear in VERIFIED FACTS and should be added there (if accurate) or corrected on the page.

No anonymized case examples or anonymous testimonials appear on this page, so no VERIFY-WITH-ULI flag of that kind applies here.
