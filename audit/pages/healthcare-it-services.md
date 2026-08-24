# Page Audit: /healthcare-it-services

## Route
/healthcare-it-services (file: healthcare-it-services.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/base location | Salinas, CA (JSON-LD address + body text "Our home base is Salinas") | healthcare-it-services.html:63-67, 700 | MATCHES |
| Years serving clients | "trusted by businesses across Monterey County since 2021 and beyond" | healthcare-it-services.html:447 | MATCHES (VERIFIED FACTS itself carries `[VERIFY year]`) |
| Google reviews | "Rated 5.0 across 26 Google reviews" / "5.0 on 26 Google reviews" | healthcare-it-services.html:447, 460 | MATCHES (VERIFIED FACTS itself carries `[VERIFY live count]`) |
| Engineer background ("who you talk to") | "An engineer with DoD infrastructure experience" | healthcare-it-services.html:456, 731 | MATCHES |
| Founder background, footer tagline | "Built by an engineer from the federal contracting world." | healthcare-it-services.html:904 | MATCHES |
| Founder background, footer brand tagline | "Government-grade IT for small business." | healthcare-it-services.html:780 | UNVERIFIABLE — marketing puffery not itemized in VERIFIED FACTS |
| "federal-grade engineering" claim (repeated) | appears 4x as a selling point | healthcare-it-services.html:10, 18, 436, 578 | UNVERIFIABLE — not a defined/sourced term |
| Target vertical: dental (meta description) | "California medical, **dental**, and behavioral health practices" | healthcare-it-services.html:10 | CONTRADICTS |
| Target vertical: dental (og:description) | "California medical, **dental**, and behavioral health practices" | healthcare-it-services.html:18 | CONTRADICTS |
| Target vertical: dental (JSON-LD LocalBusiness description) | "California medical, **dental**, and behavioral health practices" | healthcare-it-services.html:119 | CONTRADICTS |
| Target vertical: dental (JSON-LD Service audienceType) | "Medical practices, **dental practices**, **DSOs**, behavioral health..." | healthcare-it-services.html:181 | CONTRADICTS |
| Target vertical: dental (hero lead paragraph) | "...for medical practices, **dental groups**, behavioral health..." | healthcare-it-services.html:436 | CONTRADICTS |
| Dental-specific practice-management software named | "Eaglesoft, **Dentrix**, **Open Dental**, Practice Fusion" | healthcare-it-services.html:483 | CONTRADICTS |
| Target vertical: dental (scenario card heading) | "Ransomware attempt at a **dental practice**" | healthcare-it-services.html:614 | CONTRADICTS |
| Target vertical: dental (scenario card body, anonymized case example) | "A **dental practice** had a single workstation hit with a ransomware loader..." | healthcare-it-services.html:616 | CONTRADICTS |
| Target vertical: dental (sub-industries list) | "**Dental** practices and DSOs" | healthcare-it-services.html:667 | CONTRADICTS |
| "DSOs" used alone as a named audience (Dental Service/Support Organizations) | "Managed IT for clinics, practices, and **DSOs**" | healthcare-it-services.html:472 | CONTRADICTS — same excluded vertical under an industry abbreviation, no literal "dental" needed on this line |
| EHR/PM platform breadth claim | "Athenahealth, eClinicalWorks, NextGen, Greenway, ... Practice Fusion, and the long list of specialty platforms" | healthcare-it-services.html:483 | UNVERIFIABLE — platform list not itemized anywhere in VERIFIED FACTS |
| Sub-industries served (non-dental items) | Medical, behavioral health, PT/chiro/rehab, optometry/ophthalmology, imaging/radiology, home health/hospice, medical billing | healthcare-it-services.html:666-674 | UNVERIFIABLE — not itemized in VERIFIED FACTS, but not contradicted (dental item counted separately above) |
| Two conflicting JSON-LD `Service` blocks share the same `@id` (`#service`) with different `areaServed` (11 cities vs. 4 cities) and two `BreadcrumbList` blocks with mismatched item names ("Healthcare & Medical IT" vs. "Healthcare IT Services") | healthcare-it-services.html:122-184 (first `@graph`) vs. 255-309 ("ghosxt:extra-schema" second `@graph`) | UNVERIFIABLE / data-quality issue — internally inconsistent structured data, not a VERIFIED FACTS contradiction but a legibility defect |
| Response time claim | "Same-day remote support; on-site within 24–48 hours" | healthcare-it-services.html:457 | UNVERIFIABLE — not itemized in VERIFIED FACTS. Note: the actual contracted deliverable (4-hour notification on critical incidents) never appears anywhere on this page |
| Free assessment offer | "No-obligation 30-minute IT assessment" / "30 minutes with an engineer..." | healthcare-it-services.html:459, 731 | UNVERIFIABLE |
| Phone number | (831) 204-0501 | healthcare-it-services.html:378, 442, 461, 732, 942 | UNVERIFIABLE — not in VERIFIED FACTS, but consistent site-wide |
| Email | sales@ghosxt.com | healthcare-it-services.html:59, 891 | UNVERIFIABLE |
| JSON-LD priceRange | "$$" | healthcare-it-services.html:60 | UNVERIFIABLE |
| Anonymous testimonial | "Healthcare client, multi-year Ghosxt partner" pull-quote | healthcare-it-services.html:655-658 | UNVERIFIABLE — anonymous testimonial, **VERIFY WITH ULI**; not proposing rewrite/removal per instructions |
| Anonymized case example: EHR offline mid-clinic-day (primary care practice, cellular-modem failover) | healthcare-it-services.html:599-601 | UNVERIFIABLE — **VERIFY WITH ULI**; not proposing rewrite/removal |
| Anonymized case example: ransomware at a dental practice | healthcare-it-services.html:613-616 | UNVERIFIABLE — **VERIFY WITH ULI**; also separately CONTRADICTS the dental-exclusion house rule (see rows above) |
| Anonymized case example: lost laptop with PHI, encrypted, no breach triggered | healthcare-it-services.html:628-630 | UNVERIFIABLE — **VERIFY WITH ULI**; not proposing rewrite/removal |
| Anonymized case example: vendor breach with no BAA on file | healthcare-it-services.html:645-647 | UNVERIFIABLE — **VERIFY WITH ULI**; not proposing rewrite/removal |
| Regulatory/legal claims cluster: HIPAA Security/Privacy/Breach Notification Rule mechanics, 60-day notice, 500-person media threshold, 42 CFR Part 2, CMIA, CCPA, FTC Health Breach Notification Rule + 2023/2024 pixel-tracking updates | healthcare-it-services.html:508-580 (framework cards), 683-693 (glossary), 743-761 (FAQ) | UNVERIFIABLE — general legal/regulatory statements outside VERIFIED FACTS' scope of company facts; specific dates/thresholds not sourced in CLAUDE.md, **VERIFY WITH ULI** for legal accuracy |
| "Endpoint detection product" described generically for the ransomware case example, no vendor named | healthcare-it-services.html:616 | MATCHES — correctly compliant with "never publish vendor names" |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` (452-463) states Service area (California), Led by (engineer w/ DoD infra experience), Response, Pricing link, Free offer, Rating, Direct line. |
| FAQ present with real question-and-answer text | Pass | Five real Q&A pairs, both in JSON-LD FAQPage (204-247) and matching visible `<details>` markup (742-761), text is identical between the two. |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero lead paragraph (436) states the offer directly ("Ghosxt runs HIPAA-aligned IT and cybersecurity for medical practices...") within the first ~120 words of body content. |
| Exactly one H1 | Pass | Single `<h1>` at line 435. |
| Title, meta description, canonical present | Pass | Title (7), meta description (8-11), canonical (12) all present. |
| JSON-LD present (list which types) | Partial | Types present: `LocalBusiness` (53), `Service` (×2, lines 122 and 277 — same `@id`, conflicting `areaServed`), `BreadcrumbList` (×2, lines 186 and 260 — one has an `@id`, the other doesn't, and item names differ), `FAQPage` (204). Two separate `<script type="application/ld+json">` blocks (one inline, one under an "extra-schema" comment) define overlapping/conflicting entities — see Claims Table data-quality row. |
| Content that exists only inside JS | Pass (none found) | All body content is static HTML; FAQ uses native `<details>`, works without JS. `main.min.js` (939) only drives UI behavior (mobile menu, scroll-to-top, cookie banner buttons), not content. |
| Icon-only table cells | Pass (N/A) | No `<table>` markup anywhere on the page; icon+text pairs use `<article class="icon-card">` / `<article class="scenario-card">`, each with accompanying `<h3>` and paragraph text, not bare icons. |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` or inline `style` attributes present in this file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | The cookie banner (`#cookieBanner`, lines 317-333) sits in the DOM before both `<nav class="navbar">` (336) and `<main id="main-content">` (429). The `<nav>` itself also carries a full duplicate set of link markup for the mobile accordion menu (387-426) ahead of `<main>`. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Body-contextual `/pricing` links at 448 and 458 (not just nav/footer). Vertical links: `/hipaa-it-compliance` (479), `/managed-it-services` (474), `/cybersecurity` (489), `/cloud-services` (485, 499), `/backup-disaster-recovery` (494, 721), `/professional-services-it` (720). City links: Salinas, Monterey, Carmel, Watsonville, Santa Cruz, San Jose (704-710). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental named as a target vertical/client (excluded vertical) — 9 occurrences across 9 lines | healthcare-it-services.html:10 (meta description), 18 (og:description), 119 (JSON-LD LocalBusiness description), 181 (JSON-LD Service audienceType), 436 (hero lead paragraph), 483 (dental PM software: Eaglesoft, Dentrix, Open Dental), 614 (scenario card h3), 616 (scenario card body / anonymized case example), 667 (sub-industries list item) |
| "DSOs" used as a standalone target-audience term (Dental Service/Support Organizations) — same excluded vertical under an abbreviation | healthcare-it-services.html:472 (service-card h3, no literal "dental" on this line but same audience) |
| No em dashes found (plain or URL-encoded `%E2%80%94`) | — |
| No Cisco certification claim found | — |
| No clearance level stated (only "DoD infrastructure experience," which is permitted) | — |
| No vendor names found for capabilities Ghosxt delivers (MDR/EDR/backup/etc. all described generically, e.g. "endpoint detection product" at line 616) | — |
| No SIEM or unlisted capability claimed | — |

## Top Three Fixes
1. Remove or replace every "dental"/"Dental"/"DSO" reference (10 locations across 10 lines: meta description, og:description, JSON-LD LocalBusiness description, JSON-LD Service audienceType, hero lead paragraph, dental PM-software list, service-card h3, two scenario-card mentions in the ransomware case example, and the sub-industries list item). Dentists are an explicitly excluded vertical and must not appear as a client or target industry anywhere — this page currently treats dental as a co-equal primary vertical throughout, including one full anonymized case example built around a dental practice.
2. Reconcile the two conflicting JSON-LD `Service` entries that share the same `@id` (`#service`) but list different `areaServed` sets (11 cities at lines 129-178 vs. 4 cities at lines 284-305), and the two `BreadcrumbList` blocks with mismatched breadcrumb names ("Healthcare & Medical IT" vs. "Healthcare IT Services") — keep a single canonical entry per `@id` so search engines and AI crawlers don't ingest contradictory structured data for the same URL.
3. Add the verified 4-hour critical-incident notification commitment (a contracted deliverable per VERIFIED FACTS) to the at-a-glance block or FAQ. The page's only response-time claim today is "Same-day remote support; on-site within 24–48 hours" (line 457), and the actual notification SLA never appears anywhere on the page.
