# Page Audit: /trucking-it-services

## Route
/trucking-it-services (file: trucking-it-services.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/location | Salinas, CA address in LocalBusiness JSON-LD | trucking-it-services.html:67-70 | MATCHES |
| Service-area home base | "Our home base is Salinas." | trucking-it-services.html:699 | MATCHES |
| Owner background | "An engineer with DoD infrastructure experience" (key-facts) | trucking-it-services.html:460 | MATCHES (no clearance level stated) |
| Owner background | "30 minutes with an engineer with DoD infrastructure experience" | trucking-it-services.html:717 | MATCHES (no clearance level stated) |
| "Federal-grade engineering" / "federal contracting world" framing | Meta description, OG description, hero lead, compliance note, footer copyright | trucking-it-services.html:11, 20, 440, 579, 890 | MATCHES (consistent with "prior DoD/federal contractor infrastructure experience"); grammar issue noted separately below |
| Google reviews | "5.0" across "26 Google reviews" | trucking-it-services.html:451, 464 | MATCHES exactly (26 at 5.0, per VERIFIED FACTS as of August 2026) |
| Client since | "trusted by businesses across Monterey County since 2021 and beyond" | trucking-it-services.html:451 | MATCHES (inherits [VERIFY year] tag from source fact) |
| Response time | "Same-day remote support; on-site within 24–48 hours" | trucking-it-services.html:461 | UNVERIFIABLE — not stated in VERIFIED FACTS (which specifies a 4-hour incident-notification SLA, a different metric); not contradicted, but unconfirmed. [VERIFY WITH ULI] |
| Free assessment length | "No-obligation 30-minute IT assessment" / "30 minutes with an engineer..." | trucking-it-services.html:463, 717 | UNVERIFIABLE — not in VERIFIED FACTS, not contradicted |
| Pricing | No specific dollar figures stated; links to /pricing, "published upfront" language only | trucking-it-services.html:452, 462 | MATCHES (does not contradict tiered/flat pricing structure; no numbers to check) |
| ELD vendor names | "Samsara, Geotab, Motive, Omnitracs" | trucking-it-services.html:213 (JSON-LD), 492 (service card), 729 (visible FAQ) | See House-Rule Violations — vendor names, ambiguous scope. [VERIFY WITH ULI] |
| Capability: EDR / "endpoint detection and response" | Listed as a delivered capability | trucking-it-services.html:240, 482, 548, 742 | Not on VERIFIED FACTS capability list (list specifies MDR with a 24/7 SOC, not EDR as a distinct capability). See House-Rule Violations. |
| Capability: "forced disk encryption" / "forced encryption" | Listed as a delivered capability | trucking-it-services.html:240, 482, 646, 742 | Not explicit in VERIFIED FACTS capability list. UNVERIFIABLE/flag. |
| Capability: "immutable backups" / "backup immutability" | Listed as a delivered capability | trucking-it-services.html:482, 548 | VERIFIED FACTS lists "cloud backup for Microsoft 365 and Google Workspace" without "immutable." UNVERIFIABLE/flag. |
| Capability: "automated detection of forwarding rules" / "real-time detection for new forwarding rules" | Listed as a delivered capability | trucking-it-services.html:248, 613, 746 | Not explicit in VERIFIED FACTS capability list. UNVERIFIABLE/flag. |
| Capability: MDM / mobile device management | Listed as a delivered capability | trucking-it-services.html:240, 482, 646, 742 | MATCHES (reasonable aggregation of "Apple Business Manager with zero-touch enrollment" + "Microsoft 365 hardening with Intune") |
| Capability: MFA | Listed multiple times | trucking-it-services.html:240, 482, 742, 746 | MATCHES ("phishing-resistant MFA" in VERIFIED FACTS) |
| Capability: 24/7 monitoring, helpdesk, patching | Service card copy | trucking-it-services.html:477 | MATCHES (MDR w/24/7 SOC + OS/third-party patching) |
| Capability: "role-based access" | icon-card copy | trucking-it-services.html:561 | Not explicit in VERIFIED FACTS list. UNVERIFIABLE, minor. |
| Testimonial | "We've had the pleasure of partnering with Ghosxt for the past three years..." — cited "Transportation client, three-year Ghosxt partner" | trucking-it-services.html:654-657 | UNVERIFIABLE — anonymous testimonial, no named source. [VERIFY WITH ULI] — not proposing rewrite/removal per house rules. |
| Anonymized case examples (4) | "Dispatch dark at 2am," "AP wire-fraud, two payments already gone," "TMS down during peak shipping season," "Stolen driver tablet, 800 miles from the yard" | trucking-it-services.html:587-648 | UNVERIFIABLE — anonymized case examples, page itself states "Names, locations, and specifics are removed" (line 586). [VERIFY WITH ULI] — not proposing rewrite/removal per house rules. |
| Phone number | (831) 204-0501 | throughout (e.g. 382, 446, 465, 928) | UNVERIFIABLE (not in VERIFIED FACTS; internally consistent, not contradicted) |
| Email | sales@ghosxt.com | 63, 877 | UNVERIFIABLE (not contradicted) |
| Address ZIP | 93901 | trucking-it-services.html:69 | UNVERIFIABLE (city matches VERIFIED FACTS; ZIP not covered by VERIFIED FACTS) |
| Service-area cities | Salinas, Monterey, Watsonville, Hollister, Santa Cruz, Gilroy, San Jose, Pacific Grove, Carmel, Seaside, Marina | JSON-LD 79-121, 138-181, 288-309; footer 909-919; nearby-locations 703-709 | UNVERIFIABLE — not individually enumerated in VERIFIED FACTS but consistent site-wide boilerplate; no contradiction |
| Excluded vertical (dental) check | No mention of "dental" or "dentist" | n/a | MATCHES (absence confirmed by grep) |
| FMCSA/C-TPAT regulatory facts | HOS retention 6 months, DVIR retention 3 months, driver qualification files = employment + 3 years; C-TPAT Minimum Security Criteria description | trucking-it-services.html:521-522, 535-536, 682-691 (glossary) | UNVERIFIABLE — external regulatory facts, outside the scope of VERIFIED FACTS; not internally contradicted |
| FAQ JSON-LD vs. visible FAQ | 5 Q&A pairs | JSON-LD 208-251 vs. visible 728-747 | MATCHES — text is identical between structured data and rendered content (good practice) |
| Cisco certification check | No mention of "Cisco" or "Meraki" | n/a | MATCHES (absence confirmed by grep) |
| Clearance-level check | No specific clearance level (Secret/Top Secret/TS-SCI) stated | n/a | MATCHES (absence confirmed by grep; only approved "DoD infrastructure experience" phrasing used, never "DoD-cleared" either, which is also fine per VERIFIED FACTS) |
| SIEM check | No mention of "SIEM" | n/a | MATCHES (absence confirmed by grep) |
| Em dash check | No literal "—" or URL-encoded "%E2%80%94" found; only en dashes ("24–48 hours") which are not prohibited | n/a | MATCHES (absence confirmed by grep) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at trucking-it-services.html:456-467. Service area (California), "Led by: An engineer with DoD infrastructure experience" (role description, not a named contact), Response (same-day remote / 24-48h on-site), Pricing (link to /pricing). All four elements present. |
| FAQ present with real question-and-answer text | Pass | trucking-it-services.html:727-748, five `<details>` elements with full-sentence answers, text identical to the FAQPage JSON-LD. |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero lead paragraph (trucking-it-services.html:440) states the offer plainly well within the first 300 words: "Ghosxt runs the IT stack that keeps small-to-mid trucking, logistics, and customs operators on the road, on time, and audit-ready." |
| Exactly one H1 | Pass | Single `<h1>` at trucking-it-services.html:439; confirmed via grep, no other H1 on page. |
| Title, meta description, canonical present | Pass | Title (8), meta description (9-12), canonical (13) all present. |
| JSON-LD present (list which types) | Pass, with issue | Types: LocalBusiness, Service, BreadcrumbList, FAQPage. Note: BreadcrumbList and Service are each defined twice — once in the main `@graph` (52-255) and again in a second "ghosxt:extra-schema" block (259-313) with a shorter city list. This is redundant/duplicate structured data, not a factual contradiction, but worth consolidating. |
| Content that exists only inside JS | Pass (none found) | Page is static markup; deferred main.min.js only handles UI interactions (mobile menu, cookie banner buttons, scroll-to-top), not content injection. |
| Icon-only table cells | N/A | No `<table>` elements anywhere on the page (confirmed via grep). |
| display:none on content that should be crawlable | Pass (none found) | No inline `display:none` in this file (confirmed via grep). No `sr-only` usage either, but none appears necessary since no content is hidden. External stylesheets (main.min.css, locations.min.css, verticals.min.css) were not audited — out of scope for a single-page audit. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, trucking-it-services.html:321-337) sits in the DOM before `<nav>` (340) and before `<main id="main-content">` (433). No duplicated nav found. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | /pricing linked at 374 (navbar), 420 (mobile), 452, 462, 790 (footer). City links at 703-709 (nearby-locations) and 909-919 (footer service areas). Vertical/related-service links to /ctpat (371, 417, 498, 522, 734, 810), /managed-it-services, /cybersecurity, /network-design, /cloud-services (478-503), and /salinas (440, 703). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Vendor names: ELD platforms "Samsara, Geotab, Motive, Omnitracs" named explicitly (3 occurrences) | trucking-it-services.html:213, 492, 729 |
| Capability not in VERIFIED FACTS: "EDR" / "endpoint detection and response" (VERIFIED FACTS lists MDR with a 24/7 SOC, not EDR as a distinct named capability) | trucking-it-services.html:240, 482, 548, 742 |
| Capability not in VERIFIED FACTS: "forced disk encryption" / "forced encryption" | trucking-it-services.html:240, 482, 646, 742 |
| Capability not in VERIFIED FACTS: "immutable backups" / "backup immutability" | trucking-it-services.html:482, 548 |
| Capability not in VERIFIED FACTS: "automated detection of forwarding rules" / "real-time detection for new forwarding rules" | trucking-it-services.html:248, 613, 746 |
| Capability not in VERIFIED FACTS: "role-based access" (named as a specific delivered control) | trucking-it-services.html:561 |

Note on the vendor-names row: VERIFIED FACTS says "never publish vendor names" in the specific context of capabilities Ghosxt delivers (its own security stack), while this page names ELD platforms that are the *client's* existing systems Ghosxt integrates with — arguably a different category, and standard practice for an SEO-driven vertical page. Flagged because the top-level house rule ("No vendor names") is stated without qualification. Recommend Uli confirm whether client-side ELD vendor names are in-bounds before any edit is made; no rewrite is proposed here.

## Top Three Fixes
1. Resolve the vendor-names ambiguity with Uli: confirm whether naming client ELD platforms (Samsara, Geotab, Motive, Omnitracs) is acceptable under the "no vendor names" rule, since this page's SEO value depends heavily on those exact-match vendor searches (trucking-it-services.html:213, 492, 729).
2. Reconcile the security-capability language ("EDR," "forced disk encryption," "immutable backups," "automated detection of forwarding rules," "role-based access") against the VERIFIED FACTS capability list — either get these terms explicitly added to VERIFIED FACTS or rephrase using only the approved capability language (trucking-it-services.html:240, 248, 482, 548, 561, 613, 646, 742, 746).
3. Move the cookie banner (trucking-it-services.html:321-337) so it no longer precedes `<main>` in DOM order, and consolidate the duplicate BreadcrumbList/Service JSON-LD blocks (52-255 vs. 259-313) into one to avoid redundant/conflicting structured data.
