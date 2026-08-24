# Page Audit: /manufacturing-it-services

## Route
/manufacturing-it-services (file: manufacturing-it-services.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/operator is an engineer with DoD infrastructure experience (no clearance level stated) | "An engineer with DoD infrastructure experience" | manufacturing-it-services.html:456, 493, 579, 734, 907 | MATCHES |
| Serving clients since a stated year | "trusted by businesses across Monterey County since 2021" | manufacturing-it-services.html:447 | MATCHES - VERIFIED FACTS itself flags this year `[VERIFY year]`, so it is internally consistent but not fully closed out |
| Google reviews count/rating | "5.0" across "26 Google reviews" | manufacturing-it-services.html:447, 460 | MATCHES - VERIFIED FACTS: "26 at 5.0 as of August 2026 `[VERIFY live count]`" |
| Response time | "Same-day remote support; on-site within 24–48 hours" | manufacturing-it-services.html:457 | UNVERIFIABLE - no response-time SLA of this form appears in VERIFIED FACTS (which lists only a 4-hour critical-incident *notification* deliverable, a different commitment) |
| Free assessment offer | "No-obligation 30-minute IT assessment" / "30 minutes with an engineer with DoD infrastructure experience" | manufacturing-it-services.html:459, 734 | UNVERIFIABLE - the free-assessment offer itself isn't in VERIFIED FACTS; internally consistent across the page |
| Service-area city list (11 CA cities) | Salinas, Monterey, Watsonville, Hollister, Santa Cruz, Gilroy, San Jose, Pacific Grove, Carmel, Seaside, Marina | manufacturing-it-services.html:74–117 (JSON-LD LocalBusiness), 708–714 (body), 926–937 (footer) | UNVERIFIABLE - not itemized in VERIFIED FACTS beyond "Based in Salinas, CA"; internally consistent with the footer boilerplate |
| Service JSON-LD `areaServed` for the same `@id` | Block 1: California + 11 cities. Block 2 ("ghosxt:extra-schema"): California + only 4 cities (Salinas, Monterey, Santa Cruz, San Jose) | manufacturing-it-services.html:129–184 vs. 276–306 (both `@id`: `https://ghosxt.com/manufacturing-it-services#service`) | CONTRADICTS - two `Service` nodes share the identical `@id` but list different `areaServed` sets; this is an internal contradiction in the page's own structured data |
| Duplicate BreadcrumbList, differing item name | "Manufacturing & Industrial IT" vs. "Manufacturing IT Services" | manufacturing-it-services.html:186–202 vs. 259–275 | CONTRADICTS - two separate `BreadcrumbList` nodes for the same page use different breadcrumb labels |
| Case example: legacy CNC controller hit by ransomware | Anonymized scenario | manufacturing-it-services.html:588–602 | UNVERIFIABLE - VERIFY WITH ULI (anonymized case example; do not rewrite or remove) |
| Case example: CAD/PDM server failure before a customer release | Anonymized scenario | manufacturing-it-services.html:604–619 | UNVERIFIABLE - VERIFY WITH ULI (anonymized case example; do not rewrite or remove) |
| Case example: shop-floor wifi dead spots on handhelds | Anonymized scenario | manufacturing-it-services.html:621–635 | UNVERIFIABLE - VERIFY WITH ULI (anonymized case example; do not rewrite or remove) |
| Case example: ex-engineer retained VPN/PLM access | Anonymized scenario | manufacturing-it-services.html:637–652 | UNVERIFIABLE - VERIFY WITH ULI (anonymized case example; do not rewrite or remove) |
| Testimonial blockquote | "Manufacturing client, multi-year Ghosxt partner" | manufacturing-it-services.html:658–663 | UNVERIFIABLE - VERIFY WITH ULI (anonymous testimonial; do not rewrite or remove) |
| CMMC 2.0 / NIST SP 800-171 framework facts (Level 1 vs. Level 2, 110 controls, SSP, POA&M, C3PAO) | Public-record regulatory facts, not a Ghosxt-specific credential claim | manufacturing-it-services.html:217–221 (JSON-LD FAQ), 492–495, 517–519, 750–752 | UNVERIFIABLE - outside VERIFIED FACTS's scope (which covers only Ghosxt's own facts); no Ghosxt certification is claimed, only prep/deployment services, so no contradiction found |
| Core service premise: OT/IT segmentation, shop-floor network design, ERP/MES/PLM uptime support, engineering data/CAD management, CMMC compliance prep | Full services grid + compliance-framework section | manufacturing-it-services.html:466–503, 505–581 | UNVERIFIABLE - this is the entire premise of the page and none of it is itemized in VERIFIED FACTS's "Capabilities we actually deliver" or "Contracted deliverables" lists |
| ERP/MES/PLM software named | NetSuite, Epicor, IQMS/DELMIAworks, ProShop, Global Shop, JobBoss, Fishbowl, SolidWorks PDM, Autodesk Vault ("We do not resell them") | manufacturing-it-services.html:483, 228/755 (FAQ) | See House-Rule Violations - flagged as vendor/product names |
| QMS software named | SharePoint, Greenlight Guru, MasterControl | manufacturing-it-services.html:546 | See House-Rule Violations - flagged as vendor/product names |
| CAD/CAM software named | SolidWorks, Inventor, Mastercam, Fusion 360, GibbsCAM | manufacturing-it-services.html:691 | See House-Rule Violations - flagged as vendor/product names |
| Verticals/sub-industries served | Machine shops, sheet metal/fabrication, contract manufacturers, medical device makers, electronics/PCB assembly, aerospace & defense suppliers, food & beverage processors, tool/die/plastics/additive | manufacturing-it-services.html:181 (JSON-LD audience), 668–678 | MATCHES - none of these is the excluded "dentists" vertical; no dental/dentist reference anywhere on the page |
| Business address | Salinas, CA 93901 | manufacturing-it-services.html:61–67 | MATCHES - "Based in Salinas, CA" |
| Phone number | (831) 204-0501 / +18312040501 | manufacturing-it-services.html:58, 378, 442, 461, 945 | UNVERIFIABLE - not stated in VERIFIED FACTS, but consistent everywhere it appears on this page |
| Contact email | sales@ghosxt.com | manufacturing-it-services.html:59, 894 | UNVERIFIABLE - not stated in VERIFIED FACTS, but consistent everywhere it appears on this page |
| Copyright year | "© 2026 Ghosxt" | manufacturing-it-services.html:907 | MATCHES current date (2026-08-24) |
| Branding language re: federal background | "federal-grade engineering", "Built by an engineer from the federal contracting world", "Government-grade IT for small business" | manufacturing-it-services.html:436, 493, 579, 783, 907 | MATCHES - consistent with "prior DoD/federal contractor infrastructure experience"; no clearance level stated |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at lines 452–463 has all four: service area (California), who you talk to (line 456), response time (line 457), pricing link (line 458). |
| FAQ present with real question-and-answer text | Pass | Five `<details>/<summary>` Q&As at lines 745–764, matching the FAQPage JSON-LD (lines 204–248) word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (435) + lead paragraph (436) plainly state the offer ("Ghosxt runs the IT, cybersecurity, and OT/IT plumbing for machine shops, fabricators, contract manufacturers...") well within the first 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at line 435. |
| Title, meta description, canonical present | Pass | Title line 7; meta description lines 8–11; canonical line 12. |
| JSON-LD present (list which types) | Pass, with issue | Types present: `LocalBusiness`, `Service` (appears twice with the same `@id` but conflicting `areaServed` - see Claims Table), `BreadcrumbList` (appears twice with different item names), `FAQPage`. |
| Content that exists only inside JS | Pass | No JS-only content found; all visible copy, including the FAQ, is static server-rendered HTML. |
| Icon-only table cells | N/A / Pass | No `<table>` elements exist on this page (service/scenario/icon cards use icon + heading + paragraph, not bare table cells). |
| display:none on content that should be crawlable | Pass | No `display:none` occurrences found in this file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner" id="cookieBanner">` (lines 317–333) and the full desktop nav plus a duplicate mobile nav menu (lines 336–427) all sit before `<main id="main-content">` (429). |
| Internal links to pricing and to the relevant city or vertical pages | Pass | `/pricing` linked in-body twice (448, 458) plus footer; city links to Salinas, Hollister, Gilroy, Watsonville, San Jose, Monterey (708–714) and the full footer service-area list (926–937); adjacent vertical links to `/trucking-it-services` and `/agriculture-it-services` (724–725). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Vendor/product names - ERP/MES/PLM: NetSuite, Epicor, IQMS/DELMIAworks, ProShop, Global Shop, JobBoss, Fishbowl, SolidWorks PDM, Autodesk Vault; QMS: SharePoint, Greenlight Guru, MasterControl; CAD/CAM: SolidWorks, Inventor, Mastercam, Fusion 360, GibbsCAM. VERIFIED FACTS' "no vendor names" instruction is stated in the context of Ghosxt's own security-capability stack, but the HOUSE RULES section repeats "no vendor names" unqualified - VERIFY WITH ULI whether client-side software this page names to build credibility is in scope | manufacturing-it-services.html:483, 546, 691, 228/755 |
| Capability/service premise not itemized in VERIFIED FACTS - the page's entire core offering (OT/IT segmentation, shop-floor network design, ERP/MES/PLM uptime support, engineering data/CAD management, CMMC 2.0 compliance prep) is not named anywhere in VERIFIED FACTS's "Capabilities we actually deliver" or "Contracted deliverables" lists | manufacturing-it-services.html:466–503, 505–581 |

No em dashes (including URL-encoded `%E2%80%94` or `&mdash;`), Cisco-certification claims, dental/dentist references, stated clearance level, or SIEM claims were found on this page.

## Top Three Fixes
1. Resolve the duplicate `Service` JSON-LD nodes that share `@id` `https://ghosxt.com/manufacturing-it-services#service` but list conflicting `areaServed` sets (11 cities + California at lines 129–184 vs. only 4 cities + California at lines 276–306, inside the "ghosxt:extra-schema" block). Remove the redundant block or reconcile the city lists so search/AI crawlers don't ingest contradictory service-area data for the same entity. Same fix applies to the duplicate `BreadcrumbList` with differing item names (186–202 vs. 259–275).
2. VERIFY WITH ULI whether the house rule "no vendor names" extends to the ERP/PLM/CAD/QMS software this page names to build shop-floor credibility (NetSuite, Epicor, IQMS/DELMIAworks, ProShop, Global Shop, JobBoss, Fishbowl, SolidWorks PDM, Autodesk Vault, SharePoint, Greenlight Guru, MasterControl, Mastercam, Fusion 360, GibbsCAM - lines 483, 546, 691, 755), and add the confirmed answer to VERIFIED FACTS so future audits of this and the other vertical pages have a clear rule.
3. Get sign-off from Uli to add this page's core service premise - OT/IT segmentation, shop-floor network design, ERP/MES/PLM uptime support, engineering data/CAD management, CMMC 2.0 compliance prep - to VERIFIED FACTS's capability/deliverable lists. Right now this entire page's offering sits outside the one source of truth CLAUDE.md defines, alongside the four anonymized case examples (588–652) and the multi-year client testimonial (658–663), which are UNVERIFIABLE by nature and flagged VERIFY WITH ULI (not proposed for rewrite or removal). Also move the cookie banner/duplicate nav (317–427) so neither precedes `<main>` in the DOM order.
