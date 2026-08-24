# Page Audit: /web-design-monterey

## Route
/web-design-monterey (file: web-design-monterey.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "A Central Coast engineer with deep DoD infrastructure experience" | web-design-monterey.html:44 (JSON-LD), 217 (lead) | MATCHES (VERIFIED FACTS: prior DoD/federal contractor infrastructure experience) |
| Clearance level | Never stated | web-design-monterey.html: throughout | MATCHES (consistent with "never state the clearance level") |
| Essential website package price | $1,800 | web-design-monterey.html:7 (meta description), 13, 19 (og/twitter descriptions), 80 (JSON-LD FAQ), 228 (hero pricing-trust-callout), 312 (visible FAQ) | UNVERIFIABLE - VERIFIED FACTS only covers managed-IT-plan pricing (Tiny Team/Core/Secure Growth/Compliance & Continuity) and onboarding fees; website-project pricing is out of its scope. Internally consistent with website-development.html, which shows the identical $1,800 figure (static text and calculator default) - not a cross-page contradiction, just unsourced in VERIFIED FACTS. VERIFY WITH ULI. |
| Business Pro website package price | $3,200 | web-design-monterey.html:80 (JSON-LD FAQ), 312 (visible FAQ) | UNVERIFIABLE - same reasoning; matches website-development.html's $3,200 figure |
| E-commerce / booking-heavy package price | $5,900+ | web-design-monterey.html:80 (JSON-LD FAQ), 312 (visible FAQ) | UNVERIFIABLE - same reasoning; matches website-development.html's $5,900+ figure |
| Booking/reservation add-on price | $1,200 | web-design-monterey.html:72 (JSON-LD FAQ), 308 (visible FAQ) | UNVERIFIABLE - same reasoning; matches website-development.html's $1,200 booking-system add-on |
| Maintenance & Security starting price | "from $300/month" | web-design-monterey.html:259 (service card) | UNVERIFIABLE - same reasoning; matches website-development.html's $300/month maintenance figure |
| Domain, hosting, code delivered "in accounts you own" | web-design-monterey.html:235, 254–255 | UNVERIFIABLE - operational claim, not covered by VERIFIED FACTS, not contradicted |
| Site maintained by "the same security team" that runs cybersecurity/managed IT | web-design-monterey.html:259, 294 | MATCHES in substance - ties the web-design line of business to the same single-engineer operation described in VERIFIED FACTS ("sole engineer: Ulises Paiz") |
| Google reviews / "since 2021" trust statement | Not present anywhere on this page | - | N/A / gap - see Legibility Checklist; this page carries no `<!-- ghosxt:trust-reviews -->` block or key-facts aside at all, unlike its sibling location pages (cloud-services-monterey.html, cybersecurity-monterey.html both show it) |
| Phone number | (831) 204-0501 / +18312040501 | web-design-monterey.html:163, 223, 513 (recurs) | UNVERIFIABLE - not covered by VERIFIED FACTS, but consistent throughout the page |
| Email | sales@ghosxt.com | web-design-monterey.html:462–464 | UNVERIFIABLE - not covered by VERIFIED FACTS |
| "Government-grade IT for small business" tagline | Footer tagline | web-design-monterey.html:351 | MATCHES tone of DoD/federal-contractor background; marketing gloss, not itself a discrete fact |
| Service area / local presence | Monterey, CA; also builds sites for Pacific Grove, Carmel, Seaside, Salinas; remote across California/US | web-design-monterey.html:217, 295 | UNVERIFIABLE - VERIFIED FACTS states the business is "Based in Salinas, CA" and serves clients broadly; consistent with a multi-city footprint, not a contradiction |
| Credentials/certifications (M.S., CompTIA, AZ-104, ITIL, etc.) | None named on this page | - | N/A - page makes no specific credential claims |
| Cisco certification | None found | - | N/A - no Cisco claim present (correct) |
| Dental/dentist mention | None found | - | N/A - confirmed absent via search (correct) |
| Vendor/product-tool name | None found | - | N/A - confirmed absent via search |
| SIEM or unlisted-capability wording | None found | - | N/A - "SIEM" does not appear on this page |
| Em dash (literal, %E2%80%94, or &mdash;) | None found | - | N/A - confirmed absent via search |
| Clearance level stated | None found | - | N/A - confirmed absent via search |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | **Fail** | Unlike cloud-services-monterey.html and cybersecurity-monterey.html, this page has no `<aside class="key-facts">` block at all, and no `<!-- ghosxt:trust-reviews -->` rating line. "Who you talk to" and a rough response window are only implied in body prose ("30 minutes with the engineer who would actually build your site," line 276) rather than surfaced as a scannable fact row; there is no stated turnaround/response time anywhere on the page |
| FAQ present with real question-and-answer text | Pass | Visible `<details>/<summary>` FAQ at web-design-monterey.html:302–318 (4 Q&As), matching FAQPage JSON-LD at 57–94 near word-for-word |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (line 216) + lead paragraph (line 217) state the offer plainly ("Ghosxt hand-codes fast, mobile-first websites for Monterey small businesses... from a Central Coast engineer with deep DoD infrastructure experience"), well inside the first ~300 words of `<main>` |
| Exactly one H1 | Pass | Single `<h1>` at web-design-monterey.html:216 |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8 |
| JSON-LD present (list which types) | Pass | One `@graph` block (lines 34–95) contains Service, BreadcrumbList, FAQPage |
| Content that exists only inside JS | Pass (none found) | All headings, body copy, service cards, and FAQ are static HTML; the pricing figures ($1,800/$3,200/$5,900+/$1,200/$300) are spelled out in plain text here (unlike the interactive calculator widgets on website-development.html, which are JS-dependent) |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the file |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `#cookieBanner` (line 106) sits before `<nav>` (121) and before `<main id="main-content">` (210); the desktop `.navbar-menu` (130–159) and fully duplicated `.navbar-mobile-menu` (172–207) also both sit before `<main>` - sitewide chrome pattern, not unique to this page |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to the actual pricing/calculator page /website-development (228, 269, 295, 329 - the correct source for web-design pricing, since /pricing covers managed-IT plans only) and vertical link /cybersecurity-monterey (294); city links /web-design-pacific-grove, /web-design-carmel, /web-design-seaside, /web-design-salinas (295, all confirmed to exist), /monterey (294). Note: does not link to /pricing from body copy (only via global nav/footer), which is appropriate since /pricing does not cover web-design pricing |

## House-Rule Violations
| Violation | Location |
|-----------|----------|

No em-dash (literal, URL-encoded, or entity form), Cisco-certification, dental/dentist, vendor-name, clearance-level, or SIEM violations were found on this page.

## Top Three Fixes
1. Add an at-a-glance/key-facts block to match the sibling location pages (service area, "Led by," a stated response/turnaround time, and a pricing link) - this page currently has none, and also omits the Google-reviews trust line both siblings carry, which weakens the page's scannable trust signals.
2. VERIFY WITH ULI that the web-design pricing figures ($1,800 / $3,200 / $5,900+ / $1,200 booking add-on / $300 monthly maintenance, lines 7, 13, 19, 80, 228, 259, 308, 312) are current and intended to be quoted verbatim here - they are not covered by VERIFIED FACTS (which only sources managed-IT-plan pricing) though they are internally consistent with website-development.html.
3. Move the cookie banner (web-design-monterey.html:106) so it no longer sits before `<nav>`/`<main>` in DOM order, and consider whether the fully duplicated mobile nav (172–207) needs to precede main content as well - sitewide chrome issue, not specific to this page.
