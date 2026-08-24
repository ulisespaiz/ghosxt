# Page Audit: /san-benito-county

## Route
/san-benito-county (file: san-benito-county.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner base | Based in Salinas, CA | line 112 (lead) | MATCHES |
| Credential framing | "an engineer with DoD infrastructure experience" | line 7 (meta description), line 112 (lead), line 45 (JSON-LD FAQ answer), line 201 (visible FAQ) | MATCHES - never states clearance level, consistent with VERIFIED FACTS |
| Service area | San Benito County, California | line 39 (JSON-LD areaServed), line 124 (key-facts) | MATCHES (no restriction on this county in VERIFIED FACTS) |
| Google reviews | 5.0 rating across 26 reviews | line 117 (hero trust line), line 129 (key-facts) | MATCHES (source fact itself carries a [VERIFY live count] tag in CLAUDE.md) |
| "Trusted by businesses across Monterey County since 2021 and beyond" | line 117 | UNVERIFIABLE - the "since 2021" start date is itself flagged [VERIFY] in CLAUDE.md; separately, a San Benito County page citing only Monterey County as social proof is a relevance/copy concern (see Top Fixes) |
| Response time | "Same-day remote support; on-site within 24–48 hours" | line 126 (key-facts) | UNVERIFIABLE - no such SLA is listed in VERIFIED FACTS; the only verified response commitment is 4-hour notification on critical incidents, a different metric this page does not mention |
| Free assessment length | "No-obligation 30-minute IT assessment" | line 128 (key-facts), line 185 (CTA section) | UNVERIFIABLE - duration not stated in VERIFIED FACTS |
| Pricing - Core | $125/user/mo | line 46 (JSON-LD FAQ answer), line 202 (visible FAQ) | MATCHES |
| Pricing - Secure Growth | $175/user/mo | line 46, line 202 | MATCHES |
| Pricing - Compliance & Continuity | $250/user/mo | line 46, line 202 | MATCHES |
| Pricing - Tiny Team | $600/mo flat, 1–4 users | line 46, line 202 | MATCHES |
| Contact phone | (831) 204-0501 / +18312040501 | lines 39, 82, 115, 130, 309 (repeated) | UNVERIFIABLE - not covered by VERIFIED FACTS; internally consistent throughout the page |
| Contact email | sales@ghosxt.com | lines 39, 273 | UNVERIFIABLE - not covered by VERIFIED FACTS; internally consistent |
| Industries served | Manufacturing, Agriculture, Wineries, Construction, Auto/equipment, Professional services, **Healthcare and dental** | lines 165–171 | **"Healthcare and dental" CONTRADICTS** VERIFIED FACTS ("Excluded vertical: dentists. Dental must not appear as a client or target industry anywhere."); other list items MATCH/are unrestricted |
| "Government-grade rigor" (Cybersecurity card) | line 155 | UNVERIFIABLE - marketing puffery not tied to a specific verified capability or certification |
| "Government-grade IT for small business" (footer tagline) | line 213 | UNVERIFIABLE - same concern as above |
| "Federal-grade managed IT" | lines 13, 19 (og/twitter description) | UNVERIFIABLE - marketing puffery; not a literal claim in VERIFIED FACTS |
| "Built by an engineer from the federal contracting world" | line 279 (footer copyright) | MATCHES - consistent with "prior DoD/federal contractor infrastructure experience" |
| "Hollister has a strong small-manufacturing base" / manufacturing IT specialty | line 200 (FAQ), lines 149–160 (services intro) | UNVERIFIABLE - not addressed in VERIFIED FACTS |
| County economy stats: agriculture as cornerstone (wine grapes, walnuts, almonds, tomatoes); manufacturing as largest employer category; Taylor Farms and George Chiala Farms named as "anchors"; Hazel Hawkins Memorial Hospital as the county's only hospital system; San Benito led all CA counties in pace of new housing construction over 5 years; ~40% of workforce commutes to Santa Clara County | lines 192–193 | UNVERIFIABLE - VERIFY WITH ULI. Entire paragraph is third-party county/economic data with no basis in VERIFIED FACTS, including two real, specifically-named companies (Taylor Farms, George Chiala Farms) asserted as economic "anchors." High factual-risk block; needs a citation or removal decision from Uli. |
| "No-downtime migrations" (Cloud & Microsoft 365 card) | line 156 | UNVERIFIABLE - specific performance claim not in VERIFIED FACTS |
| "Tested restores tied to your real RTO and RPO" (Backup & DR card) | line 157 | UNVERIFIABLE - broadly consistent with the BC/DR policy deliverable, but the specific claim of tested restores/RTO/RPO tracking is not itself in VERIFIED FACTS |
| "Live, US-based help desk" | line 153 | UNVERIFIABLE - staffing/location claim not addressed in VERIFIED FACTS |
| JSON-LD internal reference | `Service.provider` @id points to `https://ghosxt.com/#business`, but this page's own `LocalBusiness` @id is `https://ghosxt.com/san-benito-county#business` (no entity with the `#business` id, unqualified, is defined in this page's graph) | lines 39 vs. 41 | Technical/structured-data inconsistency - not a factual claim, but a dangling reference that likely breaks the Service→Provider link for crawlers on this page |

**Totals: 24 claims logged - 1 CONTRADICTS, 10 MATCHES, 13 UNVERIFIABLE.**

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">`, lines 121–132: Service area, Led by, Response, Pricing (links to /pricing), Free, Rated, Direct line all present |
| FAQ present with real question-and-answer text | Pass | Lines 199–202, four real Q&A pairs, mirrored in JSON-LD FAQPage (lines 43–47) |
| Plain-text statement of the offer within first 300 words of body | Pass | Lead paragraph (line 112) states "managed IT, IT support, and cybersecurity" within ~70 words of the H1 |
| Exactly one H1 | Pass | Single `<h1>` at line 111 |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8 |
| JSON-LD present (list which types) | Pass | `@graph` (lines 36–50) contains LocalBusiness, BreadcrumbList, Service, FAQPage |
| Content that exists only inside JS | Pass (none found) | All key-facts, FAQ, and body content are present in raw HTML; no content observed that depends on `assets/js/main.min.js` to render |
| Icon-only table cells | Pass (N/A) | No `<table>` elements on this page |
| display:none on content that should be crawlable | Pass | No `display:none` occurrences found in the file |
| Cookie banner or duplicated nav before main content in the DOM | **Fail** | `<div class="cookie-banner">` (line 57) is placed in the DOM before `<nav class="navbar">` (line 58) and well before `<main id="main-content">` (line 107) |
| Internal links to pricing and to relevant city or vertical pages | Pass | `/pricing` linked (key-facts line 127, footer line 230); city pages `/hollister` and `/it-help-san-juan-bautista` linked (lines 140–141); regional county pages `/monterey-county`, `/santa-cruz-county`, `/santa-clara-county` linked (line 179); vertical pages available site-wide via footer (lines 248–255), though the in-body "Industries we serve" list (lines 164–171) does not itself link out to those vertical pages |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental appears as a target industry ("Healthcare and dental") - directly contradicts "Excluded vertical: dentists. Dental must not appear as a client or target industry anywhere." | san-benito-county.html:171 |

No em dashes (literal or `%E2%80%94`), no Cisco certification claims, no vendor names outside the sanctioned Microsoft/Google terms already listed in VERIFIED FACTS, no clearance level stated, no SIEM or unlisted capability claims found elsewhere on this page.

No anonymized case examples or anonymous testimonials appear on this page (only an aggregate review count/rating, which is a VERIFIED FACT), so no VERIFY WITH ULI flag is needed on that front beyond the county-economy paragraph noted above.

## Top Three Fixes
1. Remove "and dental" from the Industries list at line 171 so it reads "Healthcare" only - this is a direct house-rule violation (excluded vertical named as a target industry).
2. Move the cookie banner (line 57) so it no longer sits before `<nav>`/`<main>` in the DOM, and route Service.provider's JSON-LD `@id` (line 41) to this page's own LocalBusiness `@id` (`https://ghosxt.com/san-benito-county#business`, defined at line 39) instead of the dangling `https://ghosxt.com/#business` reference.
3. Get Uli's sign-off (VERIFY WITH ULI) on the "The San Benito County economy" paragraph (lines 192–193) - it asserts specific third-party statistics (housing-construction ranking, ~40% commute rate, "only hospital system") and names two real companies (Taylor Farms, George Chiala Farms) as economic anchors, none of which trace to VERIFIED FACTS; also reconsider the Monterey-County-only social-proof line (117) on a San Benito County page.
