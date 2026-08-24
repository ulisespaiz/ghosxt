# Page Audit: /break-fix-vs-managed-it

## Route
/break-fix-vs-managed-it (file: break-fix-vs-managed-it.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Engineer credential framing | "an engineer with DoD infrastructure experience" | meta description, line 7; JSON-LD WebPage description, line 43 | MATCHES (VERIFIED FACTS: prior DoD/federal contractor infrastructure experience; no clearance level stated) |
| Engineer credential framing (lead) | "from an engineer with DoD infrastructure experience who will tell you straight" | line 224 (lead paragraph) | MATCHES |
| Footer bio line | "Built by an engineer from the federal contracting world." | line 507 | MATCHES |
| Pricing transparency | "Managed IT pricing is published upfront: no mystery, no sales call required." | line 235 | MATCHES (VERIFIED FACTS: published pricing plans) |
| Pricing structure (FAQ) | "per-user managed tiers plus a flat-rate Tiny Team option" | line 349 (visible), line 95 (JSON-LD) | MATCHES (Core $125/Secure Growth $175/Compliance & Continuity $250 per user/mo; Tiny Team $600/mo flat, 1-4 users) |
| Tiny Team plan name | "flat-rate Tiny Team plan" for very small teams | line 337 (visible), line 71 (JSON-LD) | MATCHES |
| Capability list (FAQ Q2) | "backups, patching, MFA, EDR" | line 337 (visible), line 71 (JSON-LD) | Backups/patching/MFA MATCH. "EDR" is UNVERIFIABLE - VERIFIED FACTS lists "managed detection and response with a 24/7 SOC" (MDR), not the term EDR. [VERIFY WITH ULI: is EDR the correct/authorized term, or should copy say MDR?] |
| Capability list (FAQ Q4 + compare table) | "24/7 monitoring, patching, immutable backups, EDR and security" | line 345 (visible), line 87 (JSON-LD); compare table line 277 ("EDR, MFA, patching, and immutable backups") | "24/7 monitoring" and "patching" MATCH. "immutable backups" is UNVERIFIABLE - VERIFIED FACTS says only "cloud backup for Microsoft 365 and Google Workspace," with no statement that backups are immutable. "EDR" UNVERIFIABLE as above. [VERIFY WITH ULI] |
| Illustrative dollar figure | "the surprise $8,000 month after a ransomware hit" | line 333 (visible FAQ), line 63 (JSON-LD) | UNVERIFIABLE - this specific figure does not appear anywhere in VERIFIED FACTS and is not framed as a sourced case example, so it reads as a fabricated statistic. [VERIFY WITH ULI: source this figure or replace with unquantified language] |
| Footer tagline | "Government-grade IT for small business." | line 383 | UNVERIFIABLE - sitewide brand tagline, not a specific factual claim in VERIFIED FACTS; consistent in spirit with DoD/federal-contractor framing but not itself verified. Same phrase used as inline link text "government-grade security" at line 325. |
| Service-area city list | Salinas, Monterey, Watsonville, Hollister, Santa Cruz, Gilroy, San Jose, Pacific Grove, Carmel, Seaside, Marina | lines 526-536 (footer, sitewide) | UNVERIFIABLE - VERIFIED FACTS only confirms "Based in Salinas, CA"; the full service-area list is not itemized in VERIFIED FACTS. Sitewide footer boilerplate, not specific to this page. |
| Phone number | (831) 204-0501 | lines 170, 545 (sitewide nav/mobile CTA) | UNVERIFIABLE - not present in VERIFIED FACTS; sitewide boilerplate, low priority for this page. |
| No client names, case studies, or testimonials appear on this page | n/a | n/a | N/A - nothing to flag as anonymized case/testimonial |
| No Cisco, dental, SIEM, clearance level, or vendor-tool names appear | n/a | n/a | MATCHES (none present) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | Hero block (lines 218-236) has a CTA and a pricing link/callout, but no explicit service-area statement, no "who you talk to" (owner/sole-engineer framing), and no response-time commitment (the 4-hour notification deliverable from VERIFIED FACTS is absent from this page entirely). |
| FAQ present with real question-and-answer text | Pass | Five `<details>/<summary>` Q&As at lines 331-350, mirrored in FAQPage JSON-LD (lines 56-99), all substantive real text. |
| Plain-text statement of the offer within first 300 words of body | Pass | Lead paragraph (line 224) frames the comparison; CTAs (lines 226-234) and the "What is managed IT?" paragraph (line 247, well within 300 words) plainly state the offer: monitoring, patching, security, backups, help desk for a monthly fee. |
| Exactly one H1 | Pass | Single `<h1>` at line 223. |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8. |
| JSON-LD present (list which types) | Pass | `@graph` with WebPage (line 39), BreadcrumbList (line 48), FAQPage (line 56), lines 34-102. |
| Content that exists only inside JS | Pass (none found) | Page is static server-rendered HTML; nav/mobile toggles and scroll-to-top are progressive enhancement only, no body content depends on JS to appear. |
| Icon-only table cells | Pass (none found) | Comparison table (lines 254-296) uses full descriptive sentences in every cell for both Break-Fix and Managed IT columns - no icon-only or symbol-only cells (checked specifically per instructions). |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` usage in this file; no sr-only pattern needed here since no hidden crawlable content exists. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, lines 113-127) sits in the DOM before `<nav>` (line 128) and before `<main>` (line 217) - it precedes all primary content and navigation. |
| Internal links to pricing and to the relevant city or vertical pages | Partial | Pricing is linked repeatedly and contextually (lines 230, 235, 325, 349, 361, plus nav/footer). No contextual in-body link to a specific city or vertical page exists - city links appear only in the sitewide footer boilerplate (lines 526-536), and no vertical service page is linked despite the footer listing several (trucking, agriculture, manufacturing, etc.). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Capability term "EDR" not in VERIFIED FACTS capability list (closest listed capability is "managed detection and response with a 24/7 SOC") | line 71 (JSON-LD), line 87 (JSON-LD), line 277 (compare table), line 337 (visible FAQ), line 345 (visible FAQ) |
| Capability descriptor "immutable backups" - VERIFIED FACTS only states "cloud backup for Microsoft 365 and Google Workspace," with no immutability claim | line 87 (JSON-LD), line 277 (compare table), line 345 (visible FAQ) |
| Specific dollar figure ("$8,000 month after a ransomware hit") not sourced from VERIFIED FACTS - reads as an invented number | line 63 (JSON-LD), line 333 (visible FAQ) |

No em dashes, no Cisco certification claims, no dental/dentist references, no vendor/product names, and no clearance-level statements were found on this page.

## Top Three Fixes
1. Resolve the "$8,000 ransomware month" figure with Uli - either source it or replace with unquantified language (e.g., "a five-figure incident"), since house rules forbid inventing numbers. It appears in both the visible FAQ (line 333) and duplicated in FAQPage JSON-LD (line 63), so both need the same fix.
2. Reconcile "EDR" and "immutable backups" against the VERIFIED FACTS capability list with Uli - either confirm these are accurate descriptions of the MDR/backup services actually delivered (and add the terms to VERIFIED FACTS), or replace with the exact listed language ("managed detection and response with a 24/7 SOC," "cloud backup for Microsoft 365 and Google Workspace"). Five occurrences across lines 71, 87, 277, 337, 345.
3. Add a real at-a-glance block near the top (service area statement, "who you talk to" - one engineer, not a call center - and a response-time commitment) and move the cookie banner after `<main>` or below the nav in DOM order so it doesn't precede primary content for crawlers.
