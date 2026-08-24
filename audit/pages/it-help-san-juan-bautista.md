# Page Audit: /it-help-san-juan-bautista

## Route
/it-help-san-juan-bautista (file: it-help-san-juan-bautista.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Service area / city | San Juan Bautista, CA, contained in San Benito County | it-help-san-juan-bautista.html:46 (JSON-LD areaServed), 216-217 (H1/lead) | MATCHES (correct geography) |
| Business base location | "an engineer nearby in Hollister and Salinas" | it-help-san-juan-bautista.html:217, 287 | MATCHES (VERIFIED FACTS confirms Salinas base; Hollister presence is a plausible coverage extension, not confirmed independently - low risk) |
| Engineer background | "an engineer with DoD infrastructure experience" | it-help-san-juan-bautista.html:13, 19, 44 | MATCHES (VERIFIED FACTS; this phrase appears only in meta/JSON-LD boilerplate on this page, not in the visible lead paragraph) |
| Named local company | "Earthbound Farms, one of the country's largest organic salad producers, is based here" | it-help-san-juan-bautista.html:235 | UNVERIFIABLE (unsourced third-party claim, not in VERIFIED FACTS, presented as local-economy backdrop not as a Ghosxt client - VERIFY WITH ULI before publishing) |
| Verticals served | Restaurants, tasting rooms, shops/galleries, inns, small offices, growers | it-help-san-juan-bautista.html:64 (JSON-LD FAQ), 217, 235 | UNVERIFIABLE (no excluded vertical present, no contradiction) |
| Capability claim - payment security | "PCI-aware point-of-sale support, separate the payment network from public guest Wi-Fi" | it-help-san-juan-bautista.html:88 (JSON-LD FAQ), visible FAQ ~line 316 | UNVERIFIABLE / flag for capability-scope review - this specific claim (PCI-aware POS support, network segmentation) is not among the "capabilities we actually deliver" enumerated in VERIFIED FACTS, which explicitly says "Do not claim... anything not listed." VERIFY WITH ULI whether this is an accurate description of delivered work before publishing. |
| Response time - POS/Wi-Fi issues | "most point-of-sale and Wi-Fi issues are resolved remotely within minutes" | it-help-san-juan-bautista.html:72 (JSON-LD FAQ), visible FAQ ~line 308 | UNVERIFIABLE, and notably a stronger/different claim than the "same business day" remote-resolution language used elsewhere on this same page (line 88) and on the other 4 templated pages - internal inconsistency, not just unverified. VERIFY WITH ULI which figure is accurate. |
| Response time - general | "same-day or next-day for non-emergencies" | it-help-san-juan-bautista.html:88, 251, 287 | UNVERIFIABLE (beyond the 4-hour critical-incident SLA, not otherwise documented in VERIFIED FACTS) |
| Pricing | "flat, published pricing sized for a small team, including our Tiny Team plan" | it-help-san-juan-bautista.html:80 (FAQ) | MATCHES (Tiny Team is a real plan per VERIFIED FACTS; no incorrect figures stated) |
| Nearby coverage | San Benito County, Hollister, Salinas, Gilroy | it-help-san-juan-bautista.html:295 | MATCHES geographically; all linked pages exist |
| Company tagline / background | "Government-grade IT for small business" / "Built by an engineer from the federal contracting world" | it-help-san-juan-bautista.html:351, 475 | MATCHES |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | Same template gap as all 5 pages. |
| FAQ present with real question-and-answer text | Pass | 4 real, page-specific Q&A pairs (61-91 JSON-LD, 302-317 visible), matched word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero lead (217) + pricing callout (228) + intro section (235-236) state the offer early. |
| Exactly one H1 | Pass | Line 216 only. |
| Title, meta description, canonical present | Pass | Lines 6, 7, 8. |
| JSON-LD present (list which types) | Pass | Service, BreadcrumbList, FAQPage. |
| Content that exists only inside JS | Pass (none found) | Static HTML, native `<details>` FAQ. |
| Icon-only table cells | Pass (N/A) | No tables. |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` in file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner and full nav precede `<main>`, identical to template baseline. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | /pricing, /san-benito-county, /hollister, /salinas, /gilroy, plus standard service links; footer carries the full vertical list. |

## House-Rule Violations
None of the six literal banned terms found on this page (em dash including %E2%80%94, Cisco, dental/dentist, clearance level, vendor names, "SIEM"). However, flag for review under the spirit of the "unlisted capabilities" rule:
| Violation (borderline / flag) | Location |
|-----------|----------|
| Specific capability claim ("PCI-aware point-of-sale support," payment-network segmentation) not enumerated in VERIFIED FACTS' capabilities list - VERIFY WITH ULI | it-help-san-juan-bautista.html:88 (JSON-LD), visible FAQ ~316 |

## Top Three Fixes
1. Verify the "PCI-aware point-of-sale support" / payment-network-segmentation claim against what is actually delivered - VERIFIED FACTS enumerates a specific capability list and says not to claim anything not on it.
2. Reconcile "resolved remotely within minutes" (this page's POS/Wi-Fi FAQ) with "same business day" (this page's other FAQ, and the standard language on all 4 sibling pages) - pick one accurate figure.
3. Verify the "Earthbound Farms... based here" claim with Uli before publishing.
