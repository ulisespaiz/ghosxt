# Page Audit: /it-help-aptos

## Route
/it-help-aptos (file: it-help-aptos.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Excluded vertical: dental/dentist | "dental practices" (meta description); "medical or dental office" / "dental and medical practices" (JSON-LD FAQ Q&A); "medical and dental offices" (hero lead); "dental and medical practices on tight appointment schedules" (section body); "Dental, medical, legal, and accounting offices" (service card heading+body); "medical or dental office" / "dental and medical practices" (visible FAQ, duplicate of JSON-LD) | it-help-aptos.html:7, 77, 80, 217, 235, 255, 311, 312 (8 occurrences) | **CONTRADICTS** — VERIFIED FACTS: "Excluded vertical: dentists. Dental must not appear as a client or target industry anywhere." This is the most severe finding on this page. |
| HIPAA compliance support for dental/medical offices | "We support HIPAA-minded dental and medical practices in Aptos with the access controls, backups, and documentation those obligations require" | it-help-aptos.html:80, 312 (JSON-LD + visible FAQ) | **CONTRADICTS** (dental) and separately **UNVERIFIABLE** — HIPAA-specific compliance support is not itemized on the VERIFIED FACTS "capabilities we actually deliver" list (which lists a written policy suite, SOC 2 documentation, and an annual risk assessment, but no HIPAA-specific service). VERIFY WITH ULI. |
| Owner/engineer background | "an engineer with DoD infrastructure experience" | it-help-aptos.html:13, 19, 44 | MATCHES — consistent with VERIFIED FACTS ("prior DoD/federal contractor infrastructure experience"); no clearance level stated. |
| Footer tagline | "Government-grade IT for small business." | it-help-aptos.html:351 | UNVERIFIABLE — marketing gloss on the DoD/federal-contractor background; not a separate itemized fact, not contradicted. |
| Footer copyright line | "Built by an engineer from the federal contracting world." | it-help-aptos.html:475 | MATCHES. |
| Staffing model: "Real people who answer" (plural) on a "Live, US-Based Help Desk" | service card claims plural staff answering | it-help-aptos.html:246-248 | UNVERIFIABLE / worth flagging — VERIFIED FACTS states "Owner and sole engineer: Ulises Paiz," i.e., one person. The plural "Real people who answer" sits in tension with a one-person shop, even though it could describe non-engineer answering support. Same wording appears in section 291-294 ("the engineer who answers your ticket," singular). VERIFY WITH ULI that staffing language is accurate. |
| Ticket resolution time | "most tickets resolved the same hour instead of parked in a queue" | it-help-aptos.html:247 | UNVERIFIABLE — no specific ticket-resolution SLA is itemized in VERIFIED FACTS (which only specifies a 4-hour *notification* on critical incidents, a different metric). |
| Remote resolution time | "Most issues are resolved remotely the same business day" | it-help-aptos.html:88, 287, 316 (JSON-LD + body + FAQ) | UNVERIFIABLE — not itemized in VERIFIED FACTS. |
| On-site response time | "same-day or next-day for non-emergencies" | it-help-aptos.html:88, 251, 287, 316 | UNVERIFIABLE — not itemized in VERIFIED FACTS. |
| Free assessment length | "30 minutes with a senior engineer" | it-help-aptos.html:276 | UNVERIFIABLE — not itemized in VERIFIED FACTS. |
| Location/base | "We are local to the Santa Cruz area" / based on the Central Coast | it-help-aptos.html:64, 251, 287 | MATCHES — consistent with VERIFIED FACTS ("Based in Salinas, CA") and plausible regional coverage; no specific contradiction. |
| Pricing | "Pricing is published upfront" (no dollar figures stated on this page) | it-help-aptos.html:228, 308 | MATCHES — consistent with VERIFIED FACTS published-pricing model; no specific number to check for drift. |
| Google reviews count/rating | not present on this page | — | N/A — nothing to check; consistent with VERIFIED FACTS note that this figure "lives in one data file and nowhere else." |
| Founding year ("since 2021") | not present on this page | — | N/A |
| Credentials/certifications (M.S., CompTIA, AZ-104, ITIL, etc.) | not named on this page | — | N/A |
| Cisco certification | none found | — | N/A — correctly absent |
| Clearance level | none stated | — | N/A — correctly absent, consistent with "never state the clearance level" |
| Cyber liability insurance ($1M) / SAM.gov | not mentioned | — | N/A |
| Case examples / testimonials | none present | — | N/A |
| Vendor/tool names (SIEM, EDR product names, etc.) | none found | — | N/A — correctly absent |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No single consolidated block. The four elements exist but are scattered: service area only implied by city name in H1 (216), no explicit "who you talk to" statement, response time buried in FAQ/body text (247, 251, 287), pricing link in hero callout (228) and CTA. |
| FAQ present with real question-and-answer text | Pass | Native `<details>/<summary>` FAQ at 302-318, matching FAQPage JSON-LD at 57-92. |
| Plain-text statement of the offer within first 300 words of body | Pass | Lead paragraph (217) states the offer directly: "Ghosxt is the local help desk and on-site engineer that fills that gap," well within the first 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at line 216 (confirmed via count). |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7 (contains the dental violation), canonical line 8. |
| JSON-LD present (list which types) | Pass | `Service` (39-47), `BreadcrumbList` (48-55), `FAQPage` (56-92) in one `@graph`. `Service.provider` correctly references `https://ghosxt.com/#business`, which is defined as a `LocalBusiness` on index.html:91-92 — the link resolves. No page-local `LocalBusiness`/`Organization` block, which is fine since it inherits the sitewide one. |
| Content that exists only inside JS | Pass (none found) | All headings, body copy, service cards, and FAQ are static HTML; FAQ uses native `<details>`, no JS-only content detected. |
| Icon-only table cells | Pass (N/A) | No `<table>` elements on this page. |
| display:none on content that should be crawlable | Pass (none found) | No inline `display:none` in the file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, 106-120) sits before `<nav>` (121) and before `<main id="main-content">` (210). The mobile nav menu (`navbar-mobile-menu`, 172-207) also duplicates the desktop menu (130-159) and sits before `<main>`, though this is a standard responsive pattern. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (228, nav, footer); nearby cities santa-cruz-county, santa-cruz, watsonville (295); footer service-areas list (493-505) — note the footer's Service Areas list does not include Aptos itself. |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental (excluded vertical named as client/target industry) | it-help-aptos.html:7, 77, 80, 217, 235, 255, 311, 312 |
| Capability not on the VERIFIED FACTS list: HIPAA-specific compliance support for medical/dental practices | it-help-aptos.html:80, 312 |

No em dash (literal, URL-encoded `%E2%80%94`, or entity form), Cisco certification, clearance level, vendor/product name, or SIEM claim was found on this page.

## Top Three Fixes
1. Remove every "dental"/"dentist" reference (8 occurrences: meta description line 7, JSON-LD FAQ Q&A lines 77/80, hero lead 217, section body 235, service card 255, visible FAQ 311/312) and rewrite the affected FAQ entry and service card around the remaining legitimate verticals (medical, legal, accounting) — this is a direct, repeated violation of the excluded-vertical house rule on a single page.
2. VERIFY WITH ULI whether "HIPAA-minded" compliance support (80, 312) is an accurate capability claim; it is not on the VERIFIED FACTS capabilities list and is currently bundled with the dental violation.
3. Consolidate the at-a-glance information (service area, single point of contact, response time, pricing link) into one visible block near the hero, and reconcile "Real people who answer" (plural, 247) with the sole-engineer fact and the singular "the engineer who answers your ticket" phrasing used elsewhere on the same page (294).
