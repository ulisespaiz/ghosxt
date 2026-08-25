# Page Audit: /santa-cruz-county

## Route
/santa-cruz-county (file: santa-cruz-county.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "An engineer with DoD infrastructure experience" | santa-cruz-county.html:7 (meta description), 112 (lead paragraph), 125 (key-facts "Led by"), 204 (FAQ) | MATCHES |
| "Federal-grade" / "Government-grade" marketing language | tied to DoD/federal-contractor background | santa-cruz-county.html:13 (og:description), 19 (twitter:description), 158 ("Government-grade rigor"), 216 (footer tagline), 282 (footer copyright, "federal contracting world") | MATCHES (marketing gloss on verified DoD/federal-contractor experience; not a separate factual claim requiring its own number) |
| Google reviews count/rating | "26 Google reviews," 5.0 stars | santa-cruz-county.html:117, 129 | MATCHES value (VERIFIED FACTS: "26 at 5.0 as of August 2026"). Flag: VERIFIED FACTS says this number "lives in one data file and nowhere else," yet it is hardcoded twice in this page's markup - drift risk when the live count changes. VERIFY WITH ULI on intended architecture. |
| "Trusted... since 2021" | Client-serving start year 2021 | santa-cruz-county.html:117 | UNVERIFIABLE (VERIFIED FACTS itself flags this year "[VERIFY]") |
| Trust callout references wrong county | "trusted by businesses across Monterey County since 2021 and beyond" appears on the Santa Cruz County page | santa-cruz-county.html:117 | CONTRADICTS - this is the Santa Cruz County location page (title, H1, breadcrumb, canonical, and every other section reference Santa Cruz County); the reviews trust line references "Monterey County" instead, reading as an un-localized/copy-pasted snippet. Not a VERIFIED-FACTS violation on its own (Monterey County service is true) but it undercuts this page's own geo-targeting and should be corrected to Santa Cruz County. |
| Tiny Team Managed Security price | $600/mo flat, 1-4 users | santa-cruz-county.html:46 (JSON-LD FAQPage), 205 (visible FAQ) | MATCHES |
| Core Managed IT price | $125/user/mo | santa-cruz-county.html:46, 205 | MATCHES |
| Secure Growth price | $175/user/mo | santa-cruz-county.html:46, 205 | MATCHES |
| Compliance & Continuity price | $250/user/mo | santa-cruz-county.html:46, 205 | MATCHES |
| Response time - remote | "Same-day remote support" (key-facts); "Most issues are resolved remotely the same day" (FAQ/JSON-LD) | santa-cruz-county.html:126, 43, 202 | Internally consistent (unlike some sibling pages). UNVERIFIABLE against VERIFIED FACTS - no remote-response SLA is defined there (only the unrelated 4-hour critical-incident notification). |
| Response time - on-site | "on-site within 24–48 hours" | santa-cruz-county.html:126 | UNVERIFIABLE - no on-site SLA figure in VERIFIED FACTS to check against |
| 24/7 monitoring | "24/7 monitoring, helpdesk, patching, and a real engineer who answers the phone" | santa-cruz-county.html:155 | MATCHES ("managed detection and response with a 24/7 SOC") |
| Endpoint detection and response (EDR) | "EDR, MFA, immutable backups, and compliance. Government-grade rigor." | santa-cruz-county.html:158 | UNVERIFIABLE - VERIFIED FACTS lists "managed detection and response with a 24/7 SOC," not "EDR" by name; close but not an exact match to the approved capability list. See House-Rule Violations. |
| Immutable backups | "immutable backups" (Cybersecurity card); "Immutable backups and tested restores tied to your real RTO and RPO" (Backup & DR card) | santa-cruz-county.html:158, 160 | UNVERIFIABLE - VERIFIED FACTS lists only "cloud backup for Microsoft 365 and Google Workspace," with no mention of immutability. VERIFY WITH ULI before publishing under the unlisted-capability rule. |
| Cloud/M365 hardening | "Hardened tenants, no-downtime migrations, SharePoint and Teams done right" | santa-cruz-county.html:159 | MATCHES generally ("Microsoft 365 hardening with Intune, Defender for Business, and Conditional Access") |
| "SOC 2-aware setups" for tech clients | "We tailor IT, cloud, and security to each: SOC 2-aware setups for tech, and buyer-questionnaire and cold-chain resilience for ag and food" | santa-cruz-county.html:44 (JSON-LD), 203 (visible FAQ) | UNVERIFIABLE - VERIFIED FACTS lists "SOC 2 documentation for every platform in our stack" as something Ghosxt itself provides during onboarding, not a client-facing "SOC 2-aware setup" service; not an exact match. Also "cold-chain resilience for ag and food" is not in VERIFIED FACTS. |
| Cities served on-site | Santa Cruz, Watsonville, Pajaro Valley, Scotts Valley, Capitola, Aptos | santa-cruz-county.html:43, 140-144, 202 | UNVERIFIABLE - specific city list not enumerated in VERIFIED FACTS; not contradicted |
| Industries served | Technology/SaaS/startups, tourism/hospitality/restaurants, agriculture/berries/food processing, cold storage/distribution, healthcare **and dental** (HIPAA), professional/creative services, retail/nonprofit | santa-cruz-county.html:167-175 | Dental entry (line 172) CONTRADICTS VERIFIED FACTS ("Excluded vertical: dentists. Dental must not appear as a client or target industry anywhere."). Remaining industries are UNVERIFIABLE (not enumerated in VERIFIED FACTS) but not contradicted. |
| "One senior engineer" model | "You get one senior engineer, enterprise-grade tooling..." | santa-cruz-county.html:181 | MATCHES ("Owner and sole engineer: Ulises Paiz") |
| "Live, US-based help desk" | service card copy | santa-cruz-county.html:156 | UNVERIFIABLE - mild tension with the "one senior engineer / sole engineer" framing elsewhere on the page (line 181), though "help desk" is generic enough not to be a hard contradiction |
| Free assessment offer | "30 minutes, no sales script, no obligation" / "No-obligation 30-minute IT assessment" | santa-cruz-county.html:128, 188 | UNVERIFIABLE - not covered by VERIFIED FACTS, internally consistent |
| Regional economy statistic | "education, tourism/hospitality, healthcare, retail, and agriculture together account for 63% of the workforce" | santa-cruz-county.html:196 | UNVERIFIABLE - specific statistic not sourced in VERIFIED FACTS; a precise, checkable-looking number like this carries real risk if wrong. VERIFY WITH ULI / cite a source before publishing. |
| Regional facts (UC Santa Cruz genomics/marine-science spinoffs; Looker founded in Santa Cruz, acquired by Google Cloud) | santa-cruz-county.html:196 | UNVERIFIABLE - general public-record claims about the region, not about Ghosxt itself, but not sourced in VERIFIED FACTS so this audit cannot confirm accuracy |
| Service-area cities (JSON-LD areaServed) | "Santa Cruz County, California" (single AdministrativeArea, LocalBusiness and Service nodes) | santa-cruz-county.html:39, 41 | MATCHES visible page framing (no internal inconsistency, unlike some sibling pages) |
| Service JSON-LD provider reference | `Service.provider.@id` = `https://ghosxt.com/#business` | santa-cruz-county.html:41 | CONTRADICTS - the only `LocalBusiness` defined on this page has `@id` = `https://ghosxt.com/santa-cruz-county#business` (line 39); the Service node points to a different, undefined `@id` on this page, breaking the structured-data graph reference (same bug pattern as sibling location pages) |
| LocalBusiness postal address | Salinas, CA 93905 | santa-cruz-county.html:39 | MATCHES "Based in Salinas, CA"; postal code itself is UNVERIFIABLE (not stated in VERIFIED FACTS) but not contradicted |
| Phone number | (831) 204-0501 / +18312040501 | santa-cruz-county.html:39, 82, 104, 115, 130, 312 | UNVERIFIABLE - not covered by VERIFIED FACTS, but consistent throughout the page |
| Email | sales@ghosxt.com | santa-cruz-county.html:39, 276 | UNVERIFIABLE - not covered by VERIFIED FACTS |
| Credentials/certifications (M.S., CompTIA, AZ-104, ITIL, etc.) | none named on this page | - | N/A - page makes no specific credential claims, so nothing to contradict |
| Cisco certification | none found | - | N/A - no Cisco claim present (correct) |
| Clearance level | none stated, only "DoD infrastructure experience" | santa-cruz-county.html:7, 112, 125, 204 | MATCHES (no specific level stated, consistent with "never state the clearance level") |
| Vendor names | none found (Microsoft 365/SharePoint/Teams/Intune/Defender/Conditional Access/Google Workspace are all explicitly named in VERIFIED FACTS as things Ghosxt may describe) | - | N/A - no forbidden vendor tool names present |
| SIEM | none found | - | N/A - no SIEM claim present (correct) |
| Insurance / SAM.gov figures | not mentioned on this page | - | N/A |
| Anonymized case examples / testimonials | none present - only the aggregate "26 Google reviews at 5.0" figure, which matches VERIFIED FACTS directly | - | N/A - no anonymized case example or anonymous testimonial text to flag |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at santa-cruz-county.html:121-132 has Service area, Led by, Response, Pricing (linked to /pricing), plus bonus Free/Rated/Direct-line rows |
| FAQ present with real question-and-answer text | Pass | Visible `<details>/<summary>` FAQ at santa-cruz-county.html:199-207 (4 Q&As), matching the FAQPage JSON-LD at lines 42-47 word-for-word |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (line 111) + lead paragraph (line 112) state the offer plainly ("...delivers managed IT, IT support, and cybersecurity across the county, on-site and remote.") well inside the first 300 words |
| Exactly one H1 | Pass | Single `<h1>` at santa-cruz-county.html:111 |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8 |
| JSON-LD present (list which types) | Pass | One `@graph` block (lines 35-50) containing LocalBusiness, BreadcrumbList, Service, and FAQPage. Note the Service→LocalBusiness `@id` mismatch flagged in Claims Table. |
| Content that exists only inside JS | Pass (none found) | All headings, body copy, plan pricing, and FAQ are static HTML (FAQ uses native `<details>`); no evidence of content injected only via assets/js/main.min.js (JS file itself not read, out of audit scope) |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the HTML file itself; external CSS (main.min.css, locations.min.css) not inspected, out of audit scope |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, santa-cruz-county.html:57) sits in the DOM before `<nav>` (58) and before `<main id="main-content">` (107) |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Multiple links to /pricing (76, 100, 127, 233); links to nearby city pages (140-144: Santa Cruz, Watsonville, Capitola, Scotts Valley, Aptos; footer 291-306), specialized local pages (147: cybersecurity-santa-cruz, cloud-services-santa-cruz, cloud-services-watsonville), and neighboring county pages (182: Monterey County, San Benito County, Santa Clara County) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental - excluded vertical named as a target industry | santa-cruz-county.html:172 ("Healthcare and dental (HIPAA)" in the "Industries we serve in Santa Cruz County" list) |
| Possible unlisted capability - "EDR" named explicitly (VERIFIED FACTS lists "managed detection and response with a 24/7 SOC," not "EDR" by name) | santa-cruz-county.html:158 |
| Possible unlisted capability - "immutable" backups (not in VERIFIED FACTS capability list, which says only "cloud backup for Microsoft 365 and Google Workspace") | santa-cruz-county.html:158, 160 |

No em-dash (including URL-encoded %E2%80%94), Cisco-certification, vendor-name, or clearance-level violations were found on this page.

## Top Three Fixes
1. Remove or reword the dental reference at santa-cruz-county.html:172 - dentists are an excluded vertical per VERIFIED FACTS and must not appear anywhere on the site, including in an industries-served list on a location page. This is a bare list item, not an anonymized case example or testimonial, so it is safe to flag for direct removal rather than only a VERIFY-flag.
2. Fix the structured-data bug: `Service.provider.@id` at santa-cruz-county.html:41 points to `https://ghosxt.com/#business`, but the only `LocalBusiness` defined on this page has `@id` = `https://ghosxt.com/santa-cruz-county#business` (line 39) - the reference doesn't resolve within this page's graph. Also move the cookie banner (line 57) so it no longer precedes `<nav>`/`<main>` in the DOM.
3. Correct the trust-callout location mismatch at santa-cruz-county.html:117 ("trusted by businesses across Monterey County") to reference Santa Cruz County on this Santa Cruz County page, and VERIFY WITH ULI on "EDR" (158) and "immutable backups" (158, 160) since neither is an exact match to the VERIFIED FACTS capability list, plus the "63% of the workforce" regional-economy statistic (196), which is not sourced anywhere in VERIFIED FACTS.
