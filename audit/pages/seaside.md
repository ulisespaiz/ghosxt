# Page Audit: /seaside

## Route
/seaside (file: seaside.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "An engineer with DoD infrastructure experience" / "Built by an engineer from the federal contracting world" | seaside.html:7, 148, 423 | MATCHES |
| "Federal-grade" / "government-grade" marketing language | tied to DoD/federal contractor background | seaside.html:13, 19, 135, 165, 176, 226, 262, 299 | MATCHES (marketing gloss on verified DoD/federal-contractor experience; not a separate factual claim) |
| Clearance level | none stated, only "DoD infrastructure experience" language | seaside.html:7, 148, 423 | MATCHES (no specific level stated, consistent with "never state the clearance level") |
| Tiny Team Managed Security price | $600/mo flat, 1 to 4 users | seaside.html:44 (JSON-LD FAQPage), 277-278 (visible FAQ) | MATCHES |
| Core Managed IT price | $125/user/mo | seaside.html:44, 277 | MATCHES |
| Secure Growth price | $175/user/mo | seaside.html:44, 277 | MATCHES |
| Compliance & Continuity price | $250/user/mo | seaside.html:44, 277 | MATCHES |
| Google reviews count/rating | "26 Google reviews," 5.0 stars | seaside.html:140, 152 | MATCHES (VERIFIED FACTS states this figure "lives in one data file and nowhere else"; it is hardcoded twice on this page - same drift risk noted on other location pages, VERIFY WITH ULI on architecture, not a content error) |
| "Trusted... since 2021" | Client-serving start year 2021 | seaside.html:140 | MATCHES (VERIFIED FACTS itself flags this year [VERIFY]) |
| Industries served: "Healthcare and dental" | listed as an industry served in Seaside | seaside.html:192 | CONTRADICTS - dentists are an excluded vertical; dental must not appear as a client or target industry anywhere |
| "Healthcare and dental compliance" challenge item, HIPAA-grade security for "medical and dental practices" | seaside.html:217 | CONTRADICTS - same excluded-vertical violation |
| "healthcare and dental offices" named among Seaside's business mix | seaside.html:213 | CONTRADICTS - same excluded-vertical violation |
| FAQ: "Do you work with healthcare and dental offices in Seaside?" → "Yes... medical and dental practices" | seaside.html:47 (JSON-LD FAQPage) and 281 (visible FAQ, duplicate text) | CONTRADICTS - most explicit violation; directly answers "yes" to serving dental clients |
| Industries served (non-dental): retail/storefronts, restaurants/food service, professional services, construction/trades, auto/repair, education/child care, nonprofit/civic | seaside.html:190-197 | UNVERIFIABLE - not enumerated in VERIFIED FACTS (only "excluded: dentists; wineries fine" is stated); no contradiction found for these verticals |
| PCI-compliant POS / retail-restaurant point-of-sale support | seaside.html:45 (JSON-LD FAQPage), 168, 215, 262, 279 | UNVERIFIABLE - PCI-compliance work is not on the VERIFIED FACTS capabilities list; no contradiction, but not sourced either. VERIFY WITH ULI |
| "Immutable" backup(s) | seaside.html:165, 262, 267 | UNVERIFIABLE - VERIFIED FACTS lists only "cloud backup for Microsoft 365 and Google Workspace," without the "immutable" qualifier |
| Web design pricing "from $1,800" | seaside.html:264 | UNVERIFIABLE - not covered by VERIFIED FACTS (only Microsoft 365-scope managed IT pricing and onboarding fees are listed there) |
| On-site response window | "Same-day remote support; on-site within 24–48 hours" (key facts) vs. "Same-day or next-day for non-emergencies" (FAQ) vs. "a 10-minute drive" (body) | seaside.html:149, 182, 276-277 | UNVERIFIABLE - no response-time SLA is stated in VERIFIED FACTS (the only timed deliverable there is the unrelated 4-hour critical-incident notification, which does not appear on this page at all); the phrasings here are compatible with each other, not a hard internal contradiction |
| Anonymized illustrative client size: "one-person consultancy to a 25-employee retailer" | seaside.html:42 (JSON-LD), 275 (visible FAQ) | UNVERIFIABLE, VERIFY WITH ULI - anonymized example, and inconsistent with the "30-person retailer" figure used elsewhere on the same page (see next row) |
| Anonymized illustrative client size: "sole proprietor on Broadway to a 30-person retailer" | seaside.html:160 | UNVERIFIABLE, VERIFY WITH ULI - anonymized example; uses a different headcount (30) than the "25-employee retailer" language used twice elsewhere on this same page for what reads like the same illustrative example |
| areaServed includes "Sand City" | seaside.html:39 (JSON-LD LocalBusiness) | UNVERIFIABLE - not corroborated anywhere else on the page: the visible "We also serve nearby cities" list (196-206) and the footer Service Areas list (441-453) both omit Sand City entirely |
| "the former Fort Ord area" | seaside.html:13 (og:description) | UNVERIFIABLE - plausible local geography (Seaside includes former Fort Ord land) but not a claim covered by VERIFIED FACTS |
| Phone number | (831) 204-0501 / +18312040501 | seaside.html:105, 138, 153, 460 (recurs) | UNVERIFIABLE - not covered by VERIFIED FACTS, but consistent throughout the page |
| Email | sales@ghosxt.com | seaside.html:410 | UNVERIFIABLE - not covered by VERIFIED FACTS |
| Business/service-area location | Seaside, CA 93955 (LocalBusiness address); areaServed Seaside, Marina, Monterey, Sand City | seaside.html:39 | UNVERIFIABLE - VERIFIED FACTS states the business is "Based in Salinas, CA"; this is a location landing page for the Seaside service area, consistent with a multi-city footprint (footer lists both Salinas and Seaside among service areas at 442-452), not a contradiction |
| Credentials/certifications (M.S., CompTIA, AZ-104, ITIL, etc.) | none named on this page | - | N/A - page makes no specific credential claims, so nothing to contradict |
| Cisco certification | none found | - | N/A - no Cisco claim present (correct) |
| Cyber liability insurance ($1M) / SAM.gov registration | not mentioned on this page | - | N/A - no claim made, nothing to check |
| Vendor/tool names (SIEM, EDR/RMM products, etc.) | none found | - | N/A - no vendor-name or SIEM claim present (correct); "Endpoint detection and response" (line 262) is a generic capability description, not a product name |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at seaside.html:144-155 has Service area, Led by, Response, Pricing (linked to /pricing), plus bonus Free/Rated/Direct line rows |
| FAQ present with real question-and-answer text | Pass | Visible `<details>/<summary>` FAQ at seaside.html:272-283 (7 Q&As), matching FAQPage JSON-LD at 41-48 |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (line 134) + lead paragraph (line 135) state the offer, reinforced by the key-facts block immediately after, well inside the first 300 words |
| Exactly one H1 | Pass | Single `<h1>` at seaside.html:134 |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8 |
| JSON-LD present (list which types) | Pass | Two `<script type="application/ld+json">` blocks: `@graph` at seaside.html:35-51 contains LocalBusiness, BreadcrumbList, FAQPage; second block at 55-75 contains Service |
| Content that exists only inside JS | Pass (none found) | All headings, body copy, service cards, and FAQ are static HTML (FAQ uses native `<details>`); no evidence of content injected only via assets/js/main.min.js |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the file |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, seaside.html:80) sits in the DOM before `<nav>` (81) and before `<main id="main-content">` (130) |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (150, 277, footer 323); nearby city pages Marina/Monterey/Pacific Grove/Salinas (202-206) and footer service-areas list (442-453); vertical/specialty pages cybersecurity-seaside, cloud-services-seaside, web-design-seaside (262-264) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental - excluded vertical named as a target industry/client, four separate copy blocks plus one JSON-LD echo | seaside.html:192 ("Healthcare and dental" industries-list item) |
| Dental - excluded vertical | seaside.html:213 ("healthcare and dental offices" in the challenges intro paragraph) |
| Dental - excluded vertical | seaside.html:217 ("Healthcare and dental compliance" challenge item, "medical and dental practices") |
| Dental - excluded vertical, most explicit instance | seaside.html:47 (JSON-LD FAQPage Q&A: "Do you work with healthcare and dental offices in Seaside?" → "Yes... medical and dental practices") |
| Dental - excluded vertical, duplicate of the above in visible markup | seaside.html:281 (visible FAQ `<details>`, identical Q&A text) |

No em-dash (literal, URL-encoded, or entity form), Cisco-certification, vendor-name, clearance-level, or SIEM violations were found on this page. The two en dash ("–") occurrences at seaside.html:39 ("Ghosxt – Managed IT Services Seaside") and seaside.html:149 ("24–48 hours") are U+2013 EN DASH, not the prohibited U+2014 EM DASH, so they are not flagged as violations. PCI-compliance and "immutable backup" claims (see Claims Table) are not confirmed capabilities per VERIFIED FACTS and are flagged UNVERIFIABLE / VERIFY WITH ULI rather than as confirmed violations, since neither is on the explicit "never claim" list (only SIEM is named) but neither is on the "capabilities we actually deliver" list either.

## Top Three Fixes
1. Remove all five dental references (seaside.html:47, 192, 213, 217, 281) - dentists are an excluded vertical and must not appear as a client or target industry anywhere on the site. This page has the highest concentration of dental mentions of any page audited so far, including an explicit JSON-LD FAQ answer stating "yes" to serving dental practices.
2. Move the cookie banner (seaside.html:80) so it no longer sits before `<nav>`/`<main>` in the DOM order.
3. VERIFY WITH ULI: reconcile the two different anonymized illustrative client sizes on this single page ("25-employee retailer" at lines 42/275 vs. "30-person retailer" at line 160); confirm whether "immutable backup" (165, 262, 267), PCI-compliant POS support (45, 168, 215, 262, 279), and the $1,800 web-design starting price (264) are accurate/current; and confirm whether "Sand City" (line 39 areaServed) is an intended service-area claim, since it appears nowhere else on the page or in the footer service-areas list.
