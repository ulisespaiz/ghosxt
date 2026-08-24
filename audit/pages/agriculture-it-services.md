# Page Audit: /agriculture-it-services

## Route
/agriculture-it-services (file: agriculture-it-services.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/operator is an engineer with DoD infrastructure experience | "An engineer with DoD infrastructure experience" | agriculture-it-services.html:456, 731 | MATCHES |
| Business location | Salinas, CA 93901 | agriculture-it-services.html:63-66 (JSON-LD PostalAddress) | MATCHES |
| Client history start | "trusted by businesses across Monterey County since 2021 and beyond" | agriculture-it-services.html:447 | MATCHES (source fact itself carries [VERIFY year] in CLAUDE.md) |
| Google review count/rating | "26 Google reviews," 5.0 stars | agriculture-it-services.html:447, 460 | MATCHES (source fact itself carries [VERIFY live count] in CLAUDE.md) |
| "Federal-grade engineering" / "government-grade IT" / "engineer from the federal contracting world" | Federal/government-grade framing | agriculture-it-services.html:436, 579, 780, 904 | MATCHES (VERIFIED FACTS: prior DoD/federal contractor infrastructure experience) |
| Response time | "Same-day remote support; on-site within 24–48 hours" | agriculture-it-services.html:457 (key-facts block) | UNVERIFIABLE - this specific SLA is not in VERIFIED FACTS (which lists only a 4-hour notification window for critical incidents, a different commitment). Only one instance on this page, so no internal contradiction, but the figure itself is unsourced. [VERIFY] |
| Free assessment length | "No-obligation 30-minute IT assessment" / "30 minutes with an engineer" | agriculture-it-services.html:459, 731 | UNVERIFIABLE - not stated in VERIFIED FACTS. [VERIFY] |
| Cybersecurity capability list: "EDR, MFA, mobile device management, conditional access" | Capability paraphrase | agriculture-it-services.html:478 | MATCHES, with one caveat - MFA and Conditional Access are explicit VERIFIED FACTS items; "mobile device management" reasonably maps to Apple Business Manager/Intune; "EDR" is not itself a listed term (VERIFIED FACTS lists "managed detection and response," MDR, not EDR specifically). Minor terminology drift, not a fabricated capability. |
| Produce ERP names: Famous, Silver Creek, Produce Pro | Named third-party software brands | agriculture-it-services.html:233 (JSON-LD FAQ), 493, 755 (visible FAQ) | UNVERIFIABLE - these are the client's own ERP platforms (Ghosxt "does not resell them"), not vendors behind Ghosxt's own capability stack, but the house rule text ("No vendor names") is not scoped to only security vendors. Flagging for explicit sign-off. VERIFY WITH ULI |
| Anonymized case examples (cooler paging failure, ERP outage, wire-transfer fraud, stale seasonal accounts) | Four detailed incident narratives with specific figures (38°F, six-week silent backup failure, 40+ stale accounts, etc.) | agriculture-it-services.html:586-649 | UNVERIFIABLE - anonymized case examples per task instructions. VERIFY WITH ULI. Not proposed for rewrite or removal. |
| Anonymous client testimonial | "Ulises has been a steady hand through three years of harvest seasons..." - cite: "Agriculture client, three-year Ghosxt partner" | agriculture-it-services.html:656-659 | UNVERIFIABLE - anonymous testimonial per task instructions. VERIFY WITH ULI. Not proposed for rewrite or removal. |
| "Salinas Valley grows roughly seventy percent of the country's lettuce" | External agricultural-industry statistic | agriculture-it-services.html:436 | UNVERIFIABLE - not a claim about Ghosxt, but an unsourced external stat presented as fact in body copy. [VERIFY] |
| Duplicate/conflicting structured data for the same page | Two separate `Service` nodes share `@id` "https://ghosxt.com/agriculture-it-services#service" with different `areaServed` lists (11 cities + State in the main block vs. only Salinas, Monterey, Santa Cruz, San Jose + State in the "extra-schema" block); two separate `BreadcrumbList` nodes disagree on the position-2 name ("Agriculture & Agribusiness IT" vs. "Agriculture IT Services") and one has no `@id` | agriculture-it-services.html:121-184 (Service) and 185-202 (BreadcrumbList) vs. 255-309 ("ghosxt:extra-schema" block) | CONTRADICTS - the two `<script type="application/ld+json">` blocks disagree with each other |
| Phone number consistency | (831) 204-0501 / tel:+18312040501 | agriculture-it-services.html:58 (JSON-LD), 378, 442, 461, 942 | MATCHES (internally consistent) |
| Email consistency | sales@ghosxt.com | agriculture-it-services.html:59 (JSON-LD), 891 | MATCHES (internally consistent) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at lines 452-463 has Service area, Led by, Response, Pricing, Free, Rated, and Direct line. |
| FAQ present with real question-and-answer text | Pass | 5 `<details>` Q&As at lines 742-761, matching the FAQPage JSON-LD (lines 204-248) word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (435) + lead paragraph (436) state the offer plainly ("Ghosxt runs the infrastructure, security, and food-safety IT for growers, packers, processors, and cooling and distribution operators across the Central Coast") well within the first 300 words (offer sentence lands around word ~85). |
| Exactly one H1 | Pass | Single `<h1>` at line 435. |
| Title, meta description, canonical present | Pass | Title line 7; meta description lines 9-11; canonical line 12. |
| JSON-LD present (list which types) | Pass, with issue | Types present: LocalBusiness, Service (defined twice, conflicting - see Claims Table), BreadcrumbList (defined twice, conflicting - see Claims Table), FAQPage. |
| Content that exists only inside JS | Pass | No content found that is JS-only; all visible copy is server-rendered in the HTML. |
| Icon-only table cells | N/A / Pass | No `<table>` elements exist on this page (confirmed via grep). |
| display:none on content that should be crawlable | Pass | No `display:none` occurrences found in this file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner" id="cookieBanner">` (lines 317-333) sits in the DOM before `<nav class="navbar">` (336) and before `<main id="main-content">` (429). |
| Internal links to pricing and to the relevant city or vertical pages | Pass | `/pricing` linked at lines 448, 458 (plus footer 804). City links at lines 705-712 and footer 923-933 (Salinas, Watsonville, Hollister, Gilroy, Monterey, Santa Cruz, San Jose, Pacific Grove, Carmel, Seaside, Marina). Adjacent vertical links at 721-723 (trucking-it-services, ctpat). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Possible vendor-name issue: produce-ERP brand names (Famous, Silver Creek, Produce Pro) named in body copy, JSON-LD FAQ, and visible FAQ | agriculture-it-services.html:233 (JSON-LD), 493, 755 |

No em dashes (plain or URL-encoded), no Cisco certification claims, no dental/dentist mentions, no stated clearance level, and no explicit SIEM claim were found on this page.

## Top Three Fixes
1. Move the cookie banner (lines 317-333) so it no longer precedes `<nav>` and `<main id="main-content">` in the DOM - currently the first substantive block a crawler or screen reader hits is the cookie banner, not the page's navigation or content.
2. De-duplicate the two conflicting JSON-LD blocks: the primary `@graph` (lines 48-251) and the "ghosxt:extra-schema" block (lines 255-309) define separate `Service` and `BreadcrumbList` nodes with different `areaServed` city counts and different breadcrumb names for the same URLs/`@id`s. Keep one authoritative block per type.
3. Get explicit sign-off from Uli on whether naming produce-ERP brands (Famous, Silver Creek, Produce Pro) at lines 233, 493, and 755 is intended - the house rule bans vendor names without qualifying it to Ghosxt's own capability stack, and these are third-party client-side software brands, not Ghosxt's vendors.

Additional lower-priority items worth the PM's attention: the "Same-day remote support; on-site within 24–48 hours" response-time figure (line 457) and the "30-minute" assessment length (lines 459, 731) are not sourced in VERIFIED FACTS and should be confirmed or explicitly tagged [VERIFY]; the "roughly seventy percent of the country's lettuce" stat (line 436) is an unsourced external claim; and the four anonymized case examples (lines 586-649) plus the anonymous testimonial (lines 656-659) are flagged UNVERIFIABLE / VERIFY WITH ULI per instructions - no rewrite or removal proposed for either.
