# Page Audit: /it-help-carmel-valley

## Route
/it-help-carmel-valley (file: it-help-carmel-valley.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "an engineer with DoD infrastructure experience"; "the same standard we held inside DoD networks" | it-help-carmel-valley.html:13, 19, 44, 72 (JSON-LD), 308 (visible FAQ) | MATCHES — consistent with VERIFIED FACTS ("prior DoD/federal contractor infrastructure experience"); no clearance level stated anywhere, including in the "DoD networks" phrasing. |
| Footer tagline | "Government-grade IT for small business." | it-help-carmel-valley.html:351 | UNVERIFIABLE — marketing gloss, not itemized separately. |
| Footer copyright line | "Built by an engineer from the federal contracting world." | it-help-carmel-valley.html:475 | MATCHES. |
| Staffing model: "Real people who answer" (plural) on a "Live, US-Based Help Desk" | service card | it-help-carmel-valley.html:246-248 | UNVERIFIABLE — tension with VERIFIED FACTS "Owner and sole engineer: Ulises Paiz." VERIFY WITH ULI. |
| Ticket resolution time | "most tickets resolved the same hour" | it-help-carmel-valley.html:247 | UNVERIFIABLE — not itemized in VERIFIED FACTS. |
| Remote resolution time | "Most issues are resolved remotely the same business day" | it-help-carmel-valley.html:88, 287, 316 | UNVERIFIABLE. |
| On-site response time | "same-day or next-day for non-emergencies" | it-help-carmel-valley.html:88, 251, 287, 316 | UNVERIFIABLE. |
| Free assessment length | "30 minutes with a senior engineer" | it-help-carmel-valley.html:276 | UNVERIFIABLE. |
| Wire-fraud email hardening | "harden email with enforced multi-factor authentication and anti-spoofing, add impersonation and banking-change alerts" | it-help-carmel-valley.html:80, 312 (JSON-LD + visible FAQ) | UNVERIFIABLE / flagged as unlisted capability — enforced MFA loosely maps to VERIFIED FACTS' "phishing-resistant MFA" and Conditional Access, but anti-spoofing configuration and impersonation/banking-change alerts are not itemized on the capabilities list. VERIFY WITH ULI. |
| Winery/booking-system support | "point-of-sale, wine-club, and booking systems" | it-help-carmel-valley.html:64, 254-255, 304 | UNVERIFIABLE / flagged as unlisted capability — POS and booking-system support is not itemized on the VERIFIED FACTS capabilities list. VERIFY WITH ULI. |
| Carmel Valley AVA founding date | "its own federally recognized wine appellation since 1983" | it-help-carmel-valley.html:235 | UNVERIFIABLE — third-party historical/geographic fact not covered by VERIFIED FACTS; not about Ghosxt itself but still a specific, checkable date claim. |
| Location/base | "We cover the Peninsula on-site and work discreetly" | it-help-carmel-valley.html:64 | MATCHES — consistent with VERIFIED FACTS "Based in Salinas, CA" and plausible regional coverage. |
| Google reviews count/rating, founding year | not present on this page | — | N/A |
| Credentials/certifications | not named on this page | — | N/A |
| Cisco certification, dental, clearance level, vendor/product names, SIEM | none found | — | N/A — correctly absent |
| Case examples / testimonials | none present | — | N/A |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | Elements scattered across hero, FAQ, and body sections rather than one consolidated block (same pattern as the other four pages in this pass). |
| FAQ present with real question-and-answer text | Pass | Native `<details>/<summary>` FAQ at 302-318, matching FAQPage JSON-LD at 57-92. |
| Plain-text statement of the offer within first 300 words of body | Pass | Lead paragraph (217) states the offer plainly, well within the first 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at line 216. |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8. |
| JSON-LD present (list which types) | Pass | `Service` (39-47), `BreadcrumbList` (48-55), `FAQPage` (56-92). `Service.provider` correctly references the sitewide `LocalBusiness` defined on index.html (`#business`). |
| Content that exists only inside JS | Pass (none found) | All content is static HTML. |
| Icon-only table cells | Pass (N/A) | No `<table>` elements. |
| display:none on content that should be crawlable | Pass (none found) | No inline `display:none`. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (106-120) and duplicated mobile nav (172-207) sit before `<main>` (210). |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (228, nav, footer); nearby monterey-county, carmel, monterey, salinas (295); footer service-areas list (493-505) includes "Carmel" but not "Carmel Valley" specifically. |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Capability not on the VERIFIED FACTS list: anti-spoofing configuration, impersonation and banking-change alerts | it-help-carmel-valley.html:80, 312 |
| Capability not on the VERIFIED FACTS list: point-of-sale / wine-club / booking-system support | it-help-carmel-valley.html:64, 254-255, 304 |

No em dash, Cisco certification, dental, clearance level, vendor/product name, or SIEM claim was found on this page. The "DoD networks" discretion language (72, 308) does not state a clearance level and is consistent with house rules.

## Top Three Fixes
1. VERIFY WITH ULI whether anti-spoofing configuration, impersonation alerts, and banking-change alerts (80, 312) and POS/wine-club/booking-system support (64, 254-255, 304) are capabilities Ghosxt actually delivers; if not, remove or rephrase per the "never invent a capability" house rule.
2. VERIFY WITH ULI the "Carmel Valley AVA ... since 1983" date claim (235) before it is repeated elsewhere, since it is a specific factual claim outside the VERIFIED FACTS scope.
3. Consolidate the at-a-glance information (service area, point of contact, response time, pricing link) into one visible block near the hero, and reconcile "Real people who answer" (plural, 247) with the sole-engineer fact.
