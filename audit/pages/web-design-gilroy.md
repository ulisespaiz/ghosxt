# Page Audit: /web-design-gilroy

## Route
/web-design-gilroy (file: web-design-gilroy.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Engineer background | "a Central Coast engineer with deep DoD infrastructure experience" | line 217 | MATCHES (VERIFIED FACTS: "prior DoD/federal contractor infrastructure experience"). No clearance level stated - compliant. |
| Web package pricing | "$1,800 Essential, $3,200 Business Pro, $5,900+ e-commerce or portals" | meta description (line 7), FAQ line 316 | UNVERIFIABLE - these figures are not present anywhere in VERIFIED FACTS (which only documents the managed-IT tier pricing: Tiny Team $600/mo, Core $125/user, Secure Growth $175/user, Compliance & Continuity $250/user, plus onboarding fees). VERIFY WITH ULI. |
| "From $1,800" | meta description, OG description | lines 7, 13 | UNVERIFIABLE - same as above, not sourced in VERIFIED FACTS. |
| Maintenance & Security pricing | "from $300/month" | line 259 | UNVERIFIABLE - not in VERIFIED FACTS. VERIFY WITH ULI. |
| Maintenance run by "the same security team" | line 259 | line 259 | MATCHES in spirit (VERIFIED FACTS confirms Ulises is the sole engineer covering cybersecurity work), though "team" (plural) is imprecise language given VERIFIED FACTS states "Owner and sole engineer." Flag for wording review. |
| No Google reviews / trust callout on this page | - | whole page | Not a factual claim, but note: unlike the cloud and cybersecurity Gilroy pages, this page contains no "26 Google reviews / 5.0" trust signal at all. |
| No response-time SLA stated | - | whole page | No claim to verify - but see Legibility Checklist (missing at-a-glance block). |
| No Cisco certification claimed | - | whole page | MATCHES (no Cisco mention - compliant) |
| No dental/dentist vertical | - | whole page | MATCHES (not present - compliant) |
| No clearance level stated | - | whole page | MATCHES (compliant) |
| No vendor names / SIEM claimed | - | whole page | MATCHES (none found - compliant) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | **Fail** | No `<aside class="key-facts">` block exists on this page (confirmed absent - the other two Gilroy pages have it). No response time is stated anywhere on the page. Only a single pricing-trust callout paragraph (line 228) covers pricing, and it links to /website-development rather than /pricing. |
| FAQ present with real question-and-answer text | Pass | 4 `<details>` items (lines 302–317) with real text, mirrored in FAQPage JSON-LD. |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero `<p class="lead">` (line 217) states the offer plainly. |
| Exactly one H1 | Pass | One `<h1>` at line 216. |
| Title, meta description, canonical present | Pass | Lines 6, 7, 8. |
| JSON-LD present (list which types) | Pass | Service, BreadcrumbList, FAQPage (lines 39, 49, 57). Same dangling `#business` @id reference as sibling pages. |
| Content that exists only inside JS | Pass (none found) | All visible content is server-rendered HTML. |
| Icon-only table cells | Pass (N/A) | No `<table>` elements on this page. |
| display:none on crawlable content | Pass (none found) | No inline `display:none` in the file; linked CSS not audited (out of scope). |
| Cookie banner or duplicated nav before main content in the DOM | **Fail** | Cookie banner (`#cookieBanner`, lines 106–120) precedes `<nav>` (121) and `<main>` (210) in DOM order - same template issue as the other two pages. |
| Internal links to pricing and to the relevant city or vertical pages | Partial | Links to /website-development (the site's pricing calculator page, not /pricing itself - lines 228, 269, 295, 329), /gilroy, /cybersecurity-gilroy, /managed-it-services, /web-design-hollister, /web-design-san-jose, /web-design-salinas, /web-design-watsonville (lines 294–295). No direct in-body link to /pricing; nav bar link to /pricing is present sitewide only. |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| None found | - |

## Top Three Fixes
1. Add the missing at-a-glance key-facts block (service area, who you talk to, response time, pricing link) to match the other two Gilroy pages - currently this page states no response time at all.
2. Confirm the web-design package prices ($1,800 / $3,200 / $5,900+) and the $300/month maintenance price with Uli - none of these figures appear in VERIFIED FACTS, which only documents managed-IT pricing tiers.
3. Move the cookie banner after `<main>` in DOM order, and consider linking directly to /pricing in addition to /website-development.
