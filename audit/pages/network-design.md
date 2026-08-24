# Page Audit: /network-design

## Route
/network-design (file: network-design.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "an engineer with DoD infrastructure experience" | network-design.html:433, 453 (visible); JSON-LD Service description :121 | MATCHES |
| Business location | Salinas, CA 93901 | network-design.html:59-62 (JSON-LD PostalAddress) | MATCHES |
| Client history start | "trusted by businesses across Monterey County since 2021 and beyond" | network-design.html:444 | MATCHES (VERIFIED FACTS itself carries [VERIFY year]) |
| Google review count/rating | "26 Google reviews," 5.0 stars | network-design.html:444, 457 | MATCHES (VERIFIED FACTS itself carries [VERIFY live count]) |
| Service area | "California's Central Coast & Bay Area"; 11-city list (Salinas, Monterey, Watsonville, Hollister, Santa Cruz, Gilroy, San Jose, Pacific Grove, Carmel, Seaside, Marina) | network-design.html:449-452; JSON-LD LocalBusiness areaServed :69-114 | MATCHES (consistent with Salinas base + Monterey County service area) |
| Response time | "Same-day remote support; on-site within 24–48 hours" | network-design.html:454 | UNVERIFIABLE — not stated in VERIFIED FACTS (only a "4-hour notification on actual or reasonably suspected critical incidents" is a contracted deliverable, a different metric); internally consistent on this page (only one instance, no conflicting values) |
| Pricing | Page states pricing is "Published upfront" and links to /pricing rather than restating figures; no dollar amounts appear on this page | network-design.html:455, 564 | MATCHES (correctly defers to /pricing instead of inventing numbers) |
| Free assessment length | "30-minute" / "30 minutes on-site or remote" | network-design.html:437, 456, 537, 597 | MATCHES (internally consistent) |
| Phone number | (831) 204-0501 / +18312040501 | network-design.html:54, 379, 439, 458, 786 | UNVERIFIABLE — not covered by VERIFIED FACTS, but consistent throughout the page |
| Email | sales@ghosxt.com | network-design.html:55, 735 | UNVERIFIABLE — not covered by VERIFIED FACTS |
| "Government-grade IT" / "engineer from the federal contracting world" marketing language | Footer tagline and copyright | network-design.html:624, 748 | MATCHES (marketing gloss on verified DoD/federal-contractor experience; not a separate factual claim) |
| Cisco Meraki MX — equipment we deploy | Listed as a firewall vendor option | network-design.html:222 (JSON-LD FAQ), 525, 577 (visible FAQ) | UNVERIFIABLE — [VERIFY] equipment-we-deploy mention; permitted per VERIFIED FACTS carve-out ("Mentions of Cisco or Meraki equipment we deploy are fine only if true") IF true |
| Cisco Catalyst — equipment we deploy | Listed as a switching option | network-design.html:527 | UNVERIFIABLE — [VERIFY] equipment-we-deploy mention; same Cisco carve-out applies IF true |
| Non-Cisco/Meraki vendor names published: pfSense Plus, OPNsense, Sophos XGS, WatchGuard Firebox, UniFi Enterprise, Aruba CX | Named as firewall/switching/Wi-Fi vendors deployed | network-design.html:222, 523-526, 577 | House-rule violation (see below) — VERIFIED FACTS' equipment carve-out names only "Cisco or Meraki"; these six brands are not covered by that exception |
| Duplicate/conflicting JSON-LD `Service` nodes for this page | Two nodes share `@id` "https://ghosxt.com/network-design#service" but disagree: `name` "Network Design and Architecture" vs. "Network Design"; `areaServed` is State+Country+11 cities vs. State+4 cities only | network-design.html:117-180 vs. 278-308 | CONTRADICTS — the two `<script type="application/ld+json">` blocks (main block and the "ghosxt:extra-schema" block) disagree with each other |
| Duplicate/conflicting JSON-LD `BreadcrumbList` nodes | Main block: 3-item trail (Home > Services > Network Design and Architecture) with `@id`; extra-schema block: 2-item trail (Home > Network Design) with no `@id`, and position-2 item points at the page itself rather than "Services" | network-design.html:182-204 vs. 261-277 | CONTRADICTS — the two structured-data blocks disagree with each other |
| Multi-site VPN / SD-WAN / IPsec capability claims | Site-to-site IPsec VPN, dynamic full-mesh, SD-WAN, hub-and-spoke designs | network-design.html:236-238 (JSON-LD FAQ), 555-559, 585 (visible FAQ) | UNVERIFIABLE — network design/VPN/SD-WAN is not part of the "Capabilities we actually deliver" list in VERIFIED FACTS (that list covers the managed-security stack); no contradiction found, just outside the enumerated facts |
| Network design deliverables | Written runbook, current network diagram, IP scheme documentation, switch/firewall config backups, credentials handed over in password manager | network-design.html:243-246 (JSON-LD FAQ), 507-508, 588-589 (visible) | UNVERIFIABLE — not among the "Contracted deliverables" enumerated in VERIFIED FACTS (that list is 4-hour notification, annual risk assessment, SOC 2 documentation, written policy suite); different service line, no direct contradiction |
| "Vendor-neutral" positioning | Repeated claim that vendor selection is neutral/tailored to client | network-design.html:222, 433, 521, 577 | UNVERIFIABLE — not addressed in VERIFIED FACTS, no contradiction |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at lines 448-460 has Service area, Led by, Response, Pricing (linked to /pricing), plus bonus Free/Rated/Direct-line rows. |
| FAQ present with real question-and-answer text | Pass | 5 `<details>` Q&As at lines 571-591, matching the FAQPage JSON-LD (lines 206-250) word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (432) + lead paragraph (433) plainly state the offer ("Ghosxt designs networks the way an engineer with DoD infrastructure experience would build one...") well within the first 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at line 432. |
| Title, meta description, canonical present | Pass | Title line 7; meta description line 8; canonical line 9. |
| JSON-LD present (list which types) | Pass, with issue | Types present: LocalBusiness, Service (defined twice, conflicting — see Claims Table), BreadcrumbList (defined twice, conflicting — see Claims Table), FAQPage. |
| Content that exists only inside JS | Pass | No content found that is JS-only; all visible copy is static HTML. `assets/js/main.min.js` (783) only drives interactivity (menus, cookie banner, scroll-to-top). |
| Icon-only table cells | N/A / Pass | No `<table>` elements exist on this page. |
| display:none on content that should be crawlable | Pass | No `display:none` occurrences found in this file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (lines 320-334) sits in the DOM before `<nav class="navbar">` (337) and before `<main id="main-content">` (426). |
| Internal links to pricing and to the relevant city or vertical pages | Pass | `/pricing` linked at 445, 455, 564 (plus footer). City pages linked at 549 (Watsonville, Salinas, San Jose, Santa Cruz) and 556 (Salinas, Watsonville, Hollister, Monterey, Gilroy, San Jose, Pacific Grove, Carmel, Seaside, Marina). Vertical pages linked at 530 (/cybersecurity, /ctpat). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Vendor name: pfSense Plus | network-design.html:222 (JSON-LD FAQ), 523 (vendors section), 577 (visible FAQ) |
| Vendor name: OPNsense | network-design.html:523 (vendors section) |
| Vendor name: Sophos XGS | network-design.html:222 (JSON-LD FAQ), 524 (vendors section), 577 (visible FAQ) |
| Vendor name: WatchGuard Firebox | network-design.html:222 (JSON-LD FAQ), 524 (vendors section), 577 (visible FAQ) |
| Vendor name: UniFi Enterprise | network-design.html:526 (vendors section) |
| Vendor name: Aruba CX | network-design.html:527 (vendors section) |

No em dashes, no Cisco-certification claims, no dental references, and no stated clearance level were found on this page. Cisco Meraki MX and Cisco Catalyst mentions (lines 222, 525, 527, 577) are equipment-we-deploy references, not certification claims — per VERIFIED FACTS these are acceptable only if true and are tagged [VERIFY] in the Claims Table above rather than listed as violations here.

## Top Three Fixes
1. Strip the six non-Cisco/Meraki vendor names (pfSense Plus, OPNsense, Sophos XGS, WatchGuard Firebox, UniFi Enterprise, Aruba CX) from the "Vendors we deploy and why" section (lines 521-529) and the matching FAQ answer (JSON-LD line 222, visible line 577); rewrite in capability-only language, or VERIFY WITH ULI whether this entire vendor-naming section is an intended, approved exception to the "no vendor names" house rule for network hardware specifically (as opposed to the managed-security tool stack the rule appears aimed at). If it stays, only the Cisco/Meraki brand mentions have an explicit carve-out in VERIFIED FACTS.
2. Reconcile the two conflicting JSON-LD `Service` nodes that share `@id` "https://ghosxt.com/network-design#service" (lines 117-180 vs. 278-308 — different `name` and `areaServed` scope) and the two conflicting `BreadcrumbList` nodes (lines 182-204 vs. 261-277 — different item counts and different position-2 target). Keep one authoritative block per type; delete or de-duplicate the "ghosxt:extra-schema" block's overlapping definitions.
3. Move the cookie banner (lines 320-334) so it no longer sits before `<nav>`/`<main>` in the DOM order, matching the fix already flagged on other audited pages (cybersecurity, salinas) — this is a sitewide template issue, not unique to this page.
