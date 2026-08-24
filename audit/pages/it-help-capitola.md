# Page Audit: /it-help-capitola

## Route
/it-help-capitola (file: it-help-capitola.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "an engineer with DoD infrastructure experience" | it-help-capitola.html:13, 19, 44 | MATCHES — consistent with VERIFIED FACTS; no clearance level stated. |
| Footer tagline | "Government-grade IT for small business." | it-help-capitola.html:351 | UNVERIFIABLE — marketing gloss, not itemized separately. |
| Footer copyright line | "Built by an engineer from the federal contracting world." | it-help-capitola.html:475 | MATCHES. |
| Staffing model: "Real people who answer" (plural) on a "Live, US-Based Help Desk" | service card | it-help-capitola.html:246-248 | UNVERIFIABLE — tension with VERIFIED FACTS "Owner and sole engineer: Ulises Paiz" (one person); same wording as every other page in this pass. VERIFY WITH ULI. |
| Ticket resolution time | "most tickets resolved the same hour" | it-help-capitola.html:247 | UNVERIFIABLE — not itemized in VERIFIED FACTS (which only specifies a 4-hour *notification* on critical incidents). |
| POS/Wi-Fi specific response time | "most register, terminal, and Wi-Fi issues are fixed remotely within minutes" | it-help-capitola.html:72, 308 (JSON-LD + visible FAQ) | UNVERIFIABLE — a faster, more specific SLA than the "same hour" claim used elsewhere on the same page (247); not itemized in VERIFIED FACTS, and the two figures sit close together without being reconciled. VERIFY WITH ULI. |
| Remote resolution time | "most issues handled remotely the same business day" | it-help-capitola.html:287 | UNVERIFIABLE. |
| On-site response time | "same-day or next-day for non-emergencies" | it-help-capitola.html:72, 251, 287, 308 | UNVERIFIABLE. |
| Free assessment length | "30 minutes with a senior engineer" | it-help-capitola.html:276 | UNVERIFIABLE. |
| PCI-aware point-of-sale support | "We deliver PCI-aware point-of-sale support" | it-help-capitola.html:88, 316 (JSON-LD + visible FAQ) | UNVERIFIABLE / flagged as unlisted capability — PCI-specific work is not on the VERIFIED FACTS "capabilities we actually deliver" list. VERIFY WITH ULI. |
| Payment-network segmentation | "keep the payment network separate from public guest Wi-Fi" | it-help-capitola.html:88, 316 | UNVERIFIABLE / flagged as unlisted capability — network segmentation for POS is not itemized. VERIFY WITH ULI. |
| Tiny Team plan reference | "flat, published pricing sized for a small team, including our Tiny Team plan" | it-help-capitola.html:80, 312 | MATCHES — Tiny Team plan exists per VERIFIED FACTS ($600/mo flat, 1-4 users); no specific dollar figure stated here to check for drift. |
| Local geography: "Art & Wine Festival," "41st Avenue corridor," "the Village along the Esplanade" | local color in body copy | it-help-capitola.html:217, 235 | UNVERIFIABLE — third-party geographic/event facts not covered by VERIFIED FACTS; plausible but unconfirmed. |
| Location/base | "We are local to the Santa Cruz area" | it-help-capitola.html:64 | MATCHES — consistent with VERIFIED FACTS. |
| Google reviews count/rating, founding year | not present on this page | — | N/A |
| Credentials/certifications | not named on this page | — | N/A |
| Cisco certification, clearance level, dental, vendor/product names, SIEM | none found | — | N/A — correctly absent |
| Case examples / testimonials | none present | — | N/A |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | Same as it-help-aptos: elements scattered across hero, FAQ, and body sections rather than one consolidated block. |
| FAQ present with real question-and-answer text | Pass | Native `<details>/<summary>` FAQ at 302-318, matching FAQPage JSON-LD at 57-92. |
| Plain-text statement of the offer within first 300 words of body | Pass | Lead paragraph (217) states the offer plainly, well within the first 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at line 216. |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8. |
| JSON-LD present (list which types) | Pass | `Service` (39-47), `BreadcrumbList` (48-55), `FAQPage` (56-92). `Service.provider` correctly references the sitewide `LocalBusiness` defined on index.html (`#business`). |
| Content that exists only inside JS | Pass (none found) | All content is static HTML. |
| Icon-only table cells | Pass (N/A) | No `<table>` elements. |
| display:none on content that should be crawlable | Pass (none found) | No inline `display:none`. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Same structural pattern as it-help-aptos: cookie banner (106-120) and duplicated mobile nav (172-207) sit before `<main>` (210). |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (228, nav, footer); nearby cities santa-cruz-county, santa-cruz, watsonville (295); footer service-areas list (493-505) does not include Capitola itself. |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Capability not on the VERIFIED FACTS list: "PCI-aware point-of-sale support" | it-help-capitola.html:88, 316 |
| Capability not on the VERIFIED FACTS list: payment-network segmentation from guest Wi-Fi | it-help-capitola.html:88, 316 |

No em dash, Cisco certification, dental, clearance level, vendor/product name, or SIEM claim was found on this page.

## Top Three Fixes
1. VERIFY WITH ULI whether "PCI-aware point-of-sale support" and payment-network/guest-Wi-Fi segmentation (88, 316) are capabilities Ghosxt actually delivers; if not, remove them from both the visible FAQ and the JSON-LD per the "never invent a capability" house rule.
2. Reconcile the two different response-time claims on the same page — "fixed remotely within minutes" for POS/Wi-Fi issues (72, 308) versus "resolved the same hour" for tickets generally (247) — into one figure Uli confirms is accurate.
3. Consolidate the at-a-glance information (service area, point of contact, response time, pricing link) into one visible block near the hero, and reconcile "Real people who answer" (plural, 247) with the sole-engineer fact.
