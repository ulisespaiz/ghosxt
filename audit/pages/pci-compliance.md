# Page Audit: /pci-compliance

## Route
/pci-compliance (file: pci-compliance.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "an engineer with DoD infrastructure experience" | pci-compliance.html:239 (lead) | MATCHES (VERIFIED FACTS: "prior DoD/federal contractor infrastructure experience") |
| Footer tagline | "Government-grade IT for small business." | pci-compliance.html:353 | UNVERIFIABLE - sitewide positioning tagline, not itself a VERIFIED FACTS line item |
| Footer copyright line | "Built by an engineer from the federal contracting world." | pci-compliance.html:477 | MATCHES (consistent with "prior DoD/federal contractor infrastructure experience") |
| Service area (JSON-LD `areaServed`) | Monterey, Santa Cruz, San Benito, and Santa Clara Counties, plus California | pci-compliance.html:46-51 | UNVERIFIABLE - VERIFIED FACTS confirms the business is "Based in Salinas, CA" (Monterey County) but does not itself enumerate a specific multi-county service area; directionally consistent with the footer city list |
| Service-area city list (footer, sitewide boilerplate) | Salinas, Monterey, Watsonville, Hollister, Santa Cruz, Gilroy, San Jose, Pacific Grove, Carmel, Seaside, Marina | pci-compliance.html:496-507 | UNVERIFIABLE - not page-specific, but consistent with the Salinas, CA base |
| "Central Coast retailers, restaurants, hotels, and service businesses" | General service-area statement in lead | pci-compliance.html:239 | UNVERIFIABLE - directionally consistent with the Salinas, CA base but not itself a verified claim |
| "Book a Free PCI Assessment" / "Book a free assessment" offer | Free consultation offer, repeated as primary CTA | pci-compliance.html:241, 289-290, 332-333 | UNVERIFIABLE - this is a sales-consultation offer, not covered by VERIFIED FACTS pricing/deliverables; note risk of readers conflating it with the VERIFIED "annual independent risk assessment arranged through a third-party assessor" contracted deliverable, which is a different, paid, third-party-delivered item |
| Network Segmentation capability | "the single highest-leverage move"; "We design that separation, then keep it enforced" | pci-compliance.html:260-261, 295-297 | UNVERIFIABLE - network segmentation/design is not in the VERIFIED FACTS "Capabilities we actually deliver" list; no direct contradiction, consistent with how the separate /network-design service line was judged (UNVERIFIABLE, not a violation) |
| Secure Point-of-Sale capability | POS/payment terminals "configured and hardened correctly" | pci-compliance.html:263-265 | UNVERIFIABLE - not in the VERIFIED FACTS capability list |
| Access Control & MFA capability | "Unique logins, least-privilege access, and MFA on systems and remote access" | pci-compliance.html:267-269 | MATCHES (VERIFIED FACTS lists "phishing-resistant MFA" via Google Workspace as identity provider) |
| Vulnerability Scanning / ASV setup capability | "Approved Scanning Vendor quarterly scans... set up and interpreted for you"; FAQ: "We set up the scanning, interpret the results, and fix what they find" | pci-compliance.html:271-273 (visible), 316-317 (visible FAQ), 90-94 (JSON-LD FAQ) | UNVERIFIABLE - ASV/vulnerability-scanning setup is not in the VERIFIED FACTS capability list. Flagged as an unlisted-capability house-rule concern below. VERIFY WITH ULI |
| Annual penetration testing (scoping) | "PCI DSS also requires annual penetration testing, which we can scope alongside your ASV scans," linking to /penetration-testing | pci-compliance.html:273 | UNVERIFIABLE - penetration testing is not in the VERIFIED FACTS capability list. The linked /penetration-testing page's own audit (audit/pages/penetration-testing.md) found that page's entire in-house-delivery framing CONTRADICTS VERIFIED FACTS (conflicts with the "arranged through a third-party assessor" model for the one adjacent verified deliverable). This page's softer "we can scope alongside" wording is less direct but still an unlisted capability claim. Flagged below. VERIFY WITH ULI |
| SAQ Guidance capability | "We determine the right Self-Assessment Questionnaire for how you actually take payments" | pci-compliance.html:275-277, 308-309 (visible FAQ), 75-78 (JSON-LD FAQ) | UNVERIFIABLE - compliance consulting service, not in the enumerated capability list; no direct contradiction |
| Monitoring & Logging capability | "Logging and 24/7 monitoring around the payment environment... Part of managed IT" | pci-compliance.html:279-281 | MATCHES (VERIFIED FACTS: "managed detection and response with a 24/7 SOC") |
| Phone number | (831) 204-0501 | pci-compliance.html:185, 242, 332, 515 | UNVERIFIABLE - contact detail not covered by VERIFIED FACTS; internally consistent throughout the page |
| Booking link identifies owner | `calendly.com/ulises-ghosxt` | pci-compliance.html:186, 224, 241, 290, 333, 359, 424, 516 | MATCHES - consistent with owner name Ulises Paiz |
| Email | sales@ghosxt.com | pci-compliance.html:464 | UNVERIFIABLE - not covered by VERIFIED FACTS, sitewide footer boilerplate |

**Totals: 17 claims - 5 MATCHES, 0 CONTRADICTS, 12 UNVERIFIABLE.**

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No dedicated at-a-glance/key-facts block exists anywhere on the page. The hero (233-246) has CTAs and a phone number but states no explicit service-area list, no named point of contact (Ulises/Paiz never appears in body copy), no response time, and no link to /pricing. |
| FAQ present with real question-and-answer text | Pass | Six `<details>` Q&As at lines 303-326, matching the FAQPage JSON-LD (63-114) word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (238) + lead paragraph (239) plainly state the offer ("Ghosxt makes PCI compliance practical for Central Coast retailers, restaurants, hotels, and service businesses...") within roughly the first 70 words of body copy. |
| Exactly one H1 | Pass | Single `<h1>` at line 238. |
| Title, meta description, canonical present | Pass | Title line 6; meta description line 7; canonical line 8. |
| JSON-LD present (list which types) | Pass | Types present: `Service`, `BreadcrumbList`, `FAQPage` (all inside one `@graph`, lines 34-117). `Service.provider` references an external `#business` `@id`; no `LocalBusiness`/`Organization` node is defined on this page itself. |
| Content that exists only inside JS | Pass | No content found that is JS-only; FAQ uses native `<details>/<summary>`, service cards are static HTML, all copy is server-rendered. `assets/js/main.min.js` only drives interactivity (menus, cookie banner, scroll-to-top). |
| Icon-only table cells | N/A / Pass | No `<table>` elements exist on this page. |
| display:none on content that should be crawlable | Pass | No inline `display:none` on this page. Checked the two stylesheets it loads: `locations.min.css` uses `display:none` only on `.location-faq summary::-webkit-details-marker` (default disclosure-triangle suppression, matched by a custom `::after` marker); `main.min.css` uses it only on standard responsive nav/UI toggles (`.navbar-mobile-toggle`, `.navbar-mobile-menu`, `.navbar-buttons .btn-demo`, `.mobile-cta-bar`). None hide crawlable body copy. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (lines 128-142) sits in the DOM before `<nav class="navbar">` (143) and before `<main id="main-content">` (232). The mobile accordion menu (194-229) also duplicates every desktop nav link inside the same `<nav>`, ahead of `<main>`. |
| Internal links to pricing and to the relevant city or vertical pages | Fail | No link to `/pricing` and no link to any city-specific page appears in body content (`<main>`, lines 232-337); `/pricing` only exists in the sitewide nav (177, 219) and footer (377). Body content does link to one relevant vertical page, `/hospitality-it-services` (297), plus `/penetration-testing` (273), `/managed-it-services` (281), `/cybersecurity` and `/ransomware-recovery` (325) - partial credit for vertical linkage, but the pricing-link requirement is not met anywhere in body content. |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Unlisted capability: Approved Scanning Vendor (ASV) quarterly vulnerability-scan setup and interpretation ("We set up the scanning, interpret the results, and fix what they find") - not in the VERIFIED FACTS "Capabilities we actually deliver" list | pci-compliance.html:271-273 (visible service card), 316-317 (visible FAQ), 90-94 (JSON-LD FAQ) |
| Unlisted capability: annual penetration-testing scoping ("PCI DSS also requires annual penetration testing, which we can scope alongside your ASV scans") - not in the VERIFIED FACTS capability list; the linked /penetration-testing page was independently found to CONTRADICT VERIFIED FACTS on this exact point | pci-compliance.html:273 |

No em dashes, no Cisco-certification claims, no dental/dentist references, no vendor/tool-brand names, and no stated clearance level were found on this page.

Note: no anonymized case examples or anonymous testimonials appear on this page, so that carve-out does not apply here.

## Top Three Fixes
1. VERIFY WITH ULI whether ASV vulnerability-scan setup/interpretation and penetration-test scoping (lines 271-273, 316-317, JSON-LD 90-94) are actually delivered/coordinated by Ghosxt today. If yes, add them to the VERIFIED FACTS capability list so future audits can confirm them; if no, rewrite these lines to describe only listed capabilities (e.g., frame scanning/pentest requirements as PCI DSS facts the client must arrange, without claiming Ghosxt sets it up) and reconcile with the CONTRADICTS finding already on file for /penetration-testing.
2. Add a proper at-a-glance block (service area, who you talk to, response time, link to /pricing) near the hero, and add at least one body-content link to `/pricing` - currently the pricing link exists only in sitewide nav/footer boilerplate, not in the page body.
3. Move the cookie banner (lines 128-142) so it no longer sits before `<nav>`/`<main>` in the DOM order - this is a sitewide template issue already flagged on other audited pages (network-design, penetration-testing, cybersecurity, salinas), not unique to this page.
