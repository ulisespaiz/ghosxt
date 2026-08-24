# Page Audit: /cloud-services-hollister

## Route
/cloud-services-hollister (file: cloud-services-hollister.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner described as engineer with DoD infrastructure experience | "an engineer with DoD infrastructure experience" | cloud-services-hollister.html:44 (JSON-LD Service description), 217 (lead), 237 (key-facts "Led by"), 291 (CTA copy) | MATCHES |
| Service area / county | JSON-LD `areaServed`: Hollister, "San Benito County, California" | cloud-services-hollister.html:46; FAQ text repeats "San Benito County" at :64 and :320 | MATCHES |
| Client trust geography | "trusted by businesses across Monterey County since 2021 and beyond" | cloud-services-hollister.html:228 (hero trust callout) | CONTRADICTS — this same page names "San Benito County" three other times (lines 46, 64, 320) and is entirely framed around Hollister/San Benito County; the "Monterey County" line reads as unlocalized boilerplate |
| Google review count/rating | "26 Google reviews," 5.0 stars | cloud-services-hollister.html:228, 241 | MATCHES VERIFIED FACTS ("26 at 5.0 as of August 2026"); source itself is tagged [VERIFY live count] |
| Years serving clients | "since 2021" | cloud-services-hollister.html:228 | MATCHES VERIFIED FACTS (source itself tagged [VERIFY year]) |
| Response time | "Same-day remote support; on-site within 24–48 hours" | cloud-services-hollister.html:238 (key-facts) | UNVERIFIABLE — not itemized in VERIFIED FACTS (the only stated SLA is 4-hour notification on critical incidents, a different deliverable). VERIFY WITH ULI |
| Pricing | "Published upfront," links to /pricing | cloud-services-hollister.html:229, 239 | MATCHES (VERIFIED FACTS confirms published pricing exists; no numeric figures are stated on this page to cross-check) |
| Free assessment offer | "No-obligation 30-minute IT assessment" | cloud-services-hollister.html:240, 291, 340 | UNVERIFIABLE — sales-process claim not itemized in VERIFIED FACTS, but does not contradict it |
| Direct phone line | (831) 204-0501 | cloud-services-hollister.html:163, 225, 242 | MATCHES (consistent site-wide) |
| Dental office named as a client scenario | "a dental office with appointments starting at 8 AM" | cloud-services-hollister.html:302 | CONTRADICTS — VERIFIED FACTS: "Excluded vertical: dentists. Dental must not appear as a client or target industry anywhere." HOUSE-RULE VIOLATION |
| Cloud backup capability | "immutable backup for Exchange, SharePoint, and OneDrive" | cloud-services-hollister.html:274 | UNVERIFIABLE — VERIFIED FACTS lists "cloud backup for Microsoft 365 and Google Workspace" with no immutability qualifier. VERIFY WITH ULI |
| Identity capability | "deploy Entra ID with Conditional Access" | cloud-services-hollister.html:274 | UNVERIFIABLE — Conditional Access is explicitly listed, but "Entra ID" by name is not itemized in the VERIFIED FACTS capability list (it is Microsoft's own underlying identity product, not a third-party vendor tool). VERIFY WITH ULI |
| FAQ visible text matches JSON-LD FAQPage | 4 Q&As, word-for-word | cloud-services-hollister.html:58-91 (JSON-LD) vs. 318-333 (visible `<details>`) | MATCHES |
| Founder background | "Built by an engineer from the federal contracting world." | cloud-services-hollister.html:491 (footer) | MATCHES VERIFIED FACTS |
| Tagline | "Government-grade IT for small business." | cloud-services-hollister.html:367 (footer) | MATCHES (marketing framing consistent with DoD-experience fact) |

Claim count: 15. Contradiction count: 2 (Monterey/San Benito County mismatch; dental example). Unverifiable count: 4 (response time, free-assessment framing, immutable backup, Entra ID by name).

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at lines 233-244: service area, "Led by," response, pricing link, free offer, rating, direct line all present. |
| FAQ present with real question-and-answer text | Pass | 4 `<details>` Q&As at lines 318-333, matching the FAQPage JSON-LD word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (216) + lead paragraph (217) plainly state the offer ("Ghosxt handles cloud and Microsoft 365 work for Hollister small business...") well within the first 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at line 216; confirmed no other `<h1>` in the file. |
| Title, meta description, canonical present | Pass | Title line 6; meta description line 7; canonical line 8. |
| JSON-LD present (list which types) | Pass | Types present: Service, BreadcrumbList, FAQPage (lines 34-95). No LocalBusiness node on this page — the Service node's `provider` references an external `@id` ("https://ghosxt.com/#business") not defined here. |
| Content that exists only inside JS | Pass (none found) | All visible copy is server-rendered in the HTML. |
| Icon-only table cells | N/A / Pass | No `<table>` elements exist on this page. |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (line 106) sits in the DOM before `<nav class="navbar">` (121) and before `<main id="main-content">` (210). |
| Internal links to pricing and to the relevant city or vertical pages | Pass | `/pricing` linked at 229, 239. Vertical links `/agriculture-it-services`, `/manufacturing-it-services` (266). City links `/hollister` (310), `/cybersecurity-hollister`, `/help-desk-it-support` (310), `/salinas`, `/gilroy`, `/watsonville`, `/san-jose` (311), `/cloud-services` (311). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental named as a client scenario (excluded vertical) | cloud-services-hollister.html:302 ("a dental office with appointments starting at 8 AM") |
| Unlisted capability: "immutable" backup — VERIFIED FACTS lists only "cloud backup," not immutability | cloud-services-hollister.html:274 |

No em dashes (plain or URL-encoded), Cisco certification claims, third-party vendor/tool-brand names, or stated clearance level were found on this page.

## Top Three Fixes
1. Remove the dental office example from the "Cutovers that do not blow up your Monday" paragraph (line 302) — dentists are an explicitly excluded vertical per VERIFIED FACTS. Replace with a non-excluded example (e.g., a trades shop or ag office).
2. Fix the "trusted by businesses across Monterey County" line (line 228) — this page is entirely about Hollister/San Benito County (stated 3 other times on the page); the county reference is inconsistent boilerplate.
3. VERIFY WITH ULI the "immutable" backup qualifier (line 274) and the by-name "Entra ID" claim (line 274) — neither is itemized in the VERIFIED FACTS capability list, which instructs not to claim capabilities beyond what is listed.
