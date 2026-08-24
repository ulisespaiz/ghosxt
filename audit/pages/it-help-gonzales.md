# Page Audit: /it-help-gonzales

## Route
/it-help-gonzales (file: it-help-gonzales.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "an engineer with DoD infrastructure experience" | it-help-gonzales.html:13, 19, 44 | MATCHES - consistent with VERIFIED FACTS; no clearance level stated. |
| Footer tagline | "Government-grade IT for small business." | it-help-gonzales.html:351 | UNVERIFIABLE - marketing gloss, not itemized separately. |
| Footer copyright line | "Built by an engineer from the federal contracting world." | it-help-gonzales.html:475 | MATCHES. |
| Staffing model: "Real people who answer" (plural) on a "Live, US-Based Help Desk" | service card | it-help-gonzales.html:246-248 | UNVERIFIABLE - tension with VERIFIED FACTS "Owner and sole engineer: Ulises Paiz." VERIFY WITH ULI. |
| Ticket resolution time | "most tickets resolved the same hour" | it-help-gonzales.html:247 | UNVERIFIABLE - not itemized in VERIFIED FACTS. |
| Remote resolution time | "Most issues are fixed remotely the same business day" | it-help-gonzales.html:287 | UNVERIFIABLE. |
| On-site response time | "same-day or next-day for non-emergencies" | it-help-gonzales.html:251, 287 | UNVERIFIABLE. |
| Free assessment length | "30 minutes with a senior engineer" | it-help-gonzales.html:276 | UNVERIFIABLE. |
| Processing/distribution system support | "keep the networks, scheduling, and line-of-business systems behind those operations monitored and supported, segment connected equipment safely" | it-help-gonzales.html:72, 308 (JSON-LD + visible FAQ) | UNVERIFIABLE / flagged as unlisted capability - OT/equipment network segmentation and line-of-business-system support are not itemized on the VERIFIED FACTS capabilities list. VERIFY WITH ULI. |
| Pricing model | "Pricing is published upfront: flat per-user managed plans, with a Tiny Team option for the smallest offices" | it-help-gonzales.html:88, 316 | MATCHES - Tiny Team plan exists per VERIFIED FACTS; no specific dollar figure stated here to check for drift. |
| Named local facility | "the city's own Agricultural Business Industrial Park" | it-help-gonzales.html:235 | UNVERIFIABLE - third-party geographic/civic fact not covered by VERIFIED FACTS. |
| Named local feature | "wineries along the River Road Wine Trail" | it-help-gonzales.html:235 | UNVERIFIABLE - third-party geographic fact not covered by VERIFIED FACTS. |
| Nearby service area (unlinked) | "also support nearby Soledad, Salinas, and King City" | it-help-gonzales.html:295 | UNVERIFIABLE - Soledad and King City are named as served areas but, unlike every other nearby-city mention on this page and its sibling pages, are not hyperlinked (no corresponding city page exists to link to) and do not appear in the footer's Service Areas list (493-505). Not a house-rule violation on its own, but a claim of coverage that isn't backed by a linkable page - worth confirming with Uli that Soledad/King City are in fact served. |
| Location/base | "We are based up the valley in Salinas" | it-help-gonzales.html:64, 217 | MATCHES - consistent with VERIFIED FACTS "Based in Salinas, CA." |
| Google reviews count/rating, founding year | not present on this page | - | N/A |
| Credentials/certifications | not named on this page | - | N/A |
| Cisco certification, dental, clearance level, vendor/product names, SIEM | none found | - | N/A - correctly absent |
| Case examples / testimonials | none present | - | N/A |

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
| Internal links to pricing and to the relevant city or vertical pages | Pass, with a gap | Links to /pricing (228, nav, footer) and monterey-county, salinas (295); but "Soledad" and "King City," named in the same sentence as served areas, are plain text with no corresponding page to link to (295). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Capability not on the VERIFIED FACTS list: line-of-business-system support and equipment network segmentation for processors/distributors | it-help-gonzales.html:72, 308 |

No em dash, Cisco certification, dental, clearance level, vendor/product name, or SIEM claim was found on this page.

## Top Three Fixes
1. VERIFY WITH ULI whether line-of-business-system support and equipment network segmentation for processing/distribution operations (72, 308) is a capability Ghosxt actually delivers; if not, rephrase per the "never invent a capability" house rule.
2. Confirm Soledad and King City are genuinely served (295) - they're claimed as coverage area but have no linkable city page and don't appear in the footer's Service Areas list, unlike every other nearby city named across this page set.
3. Consolidate the at-a-glance information (service area, point of contact, response time, pricing link) into one visible block near the hero, and reconcile "Real people who answer" (plural, 247) with the sole-engineer fact.
