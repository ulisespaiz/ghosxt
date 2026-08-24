# Page Audit: /it-help-castroville

## Route
/it-help-castroville (file: it-help-castroville.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "an engineer with DoD infrastructure experience" | it-help-castroville.html:13, 19, 44 | MATCHES — consistent with VERIFIED FACTS; no clearance level stated. |
| Footer tagline | "Government-grade IT for small business." | it-help-castroville.html:351 | UNVERIFIABLE — marketing gloss, not itemized separately. |
| Footer copyright line | "Built by an engineer from the federal contracting world." | it-help-castroville.html:475 | MATCHES. |
| Staffing model: "Real people who answer" (plural) on a "Live, US-Based Help Desk" | service card | it-help-castroville.html:246-248 | UNVERIFIABLE — tension with VERIFIED FACTS "Owner and sole engineer: Ulises Paiz." VERIFY WITH ULI. |
| Ticket resolution time | "most tickets resolved the same hour" | it-help-castroville.html:247 | UNVERIFIABLE — not itemized in VERIFIED FACTS. |
| Remote resolution time (harvest-specific) | "Most issues are handled remotely the same business day" | it-help-castroville.html:88, 287, 316 | UNVERIFIABLE. |
| On-site response time | "same-day or next-day for non-emergencies" | it-help-castroville.html:88, 251, 287, 316 | UNVERIFIABLE. |
| Free assessment length | "30 minutes with a senior engineer" | it-help-castroville.html:276 | UNVERIFIABLE. |
| Equipment network segmentation | "We support the networks and systems that connect them and segment that equipment safely from the office network" (cooler/scale/processing equipment) | it-help-castroville.html:80, 312 (JSON-LD + visible FAQ) | UNVERIFIABLE / flagged as unlisted capability — OT/equipment network segmentation is not itemized on the VERIFIED FACTS capabilities list. VERIFY WITH ULI. |
| Base location for "won't drive out here" claim | "We are based in Salinas, minutes from Castroville" | it-help-castroville.html:72, 217, 235, 287, 308 | MATCHES — consistent with VERIFIED FACTS "Based in Salinas, CA." |
| Named third-party company | "Ocean Mist Farms, headquartered here, is one of the area's largest employers" | it-help-castroville.html:235 | UNVERIFIABLE — a specific, checkable factual claim about a named company that is not a Ghosxt client and is not covered by VERIFIED FACTS. VERIFY WITH ULI (headquarters location and "largest employers" status can go stale or be wrong). |
| Civic nickname | "Castroville is the Artichoke Center of the World" | it-help-castroville.html:217 | UNVERIFIABLE — a well-known local slogan, but not covered by VERIFIED FACTS and not verified in this pass. |
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
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (228, nav, footer); nearby monterey-county, salinas, marina, monterey, watsonville (295); footer service-areas list (493-505) does not include Castroville itself. |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Capability not on the VERIFIED FACTS list: cooler/scale/processing equipment network segmentation | it-help-castroville.html:80, 312 |

No em dash, Cisco certification, dental, clearance level, vendor/product name, or SIEM claim was found on this page.

## Top Three Fixes
1. VERIFY WITH ULI whether OT/equipment network segmentation for coolers, scales, and processing lines (80, 312) is a capability Ghosxt actually delivers; if not, rephrase per the "never invent a capability" house rule.
2. VERIFY WITH ULI the "Ocean Mist Farms, headquartered here, is one of the area's largest employers" claim (235) — a specific, checkable statement about a named third-party company that is outside VERIFIED FACTS scope and can go stale.
3. Consolidate the at-a-glance information (service area, point of contact, response time, pricing link) into one visible block near the hero, and reconcile "Real people who answer" (plural, 247) with the sole-engineer fact.
