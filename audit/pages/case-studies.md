# Page Audit: /case-studies

## Route
/case-studies (file: case-studies.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Engineer background | "an engineer with DoD infrastructure experience" | case-studies.html:7 (meta description) | MATCHES (VERIFIED FACTS: prior DoD/federal contractor infrastructure experience) |
| Engineer background | same claim | case-studies.html:13 (og:description) | MATCHES |
| Engineer background | same claim | case-studies.html:19 (twitter:description) | MATCHES |
| Engineer background + services | "engineer with DoD infrastructure experience with managed IT, cybersecurity, compliance, and web development on the Central Coast" | case-studies.html:43 (JSON-LD WebPage description) | MATCHES |
| Verticals served | "transportation and logistics, manufacturing and machine shops, professional offices, and small businesses" | case-studies.html:63 (JSON-LD FAQ answer 1) | MATCHES - no excluded vertical (dental) present |
| Pricing plan reference | "flat-rate Tiny Team plan" (one- and two-person offices) | case-studies.html:71 (JSON-LD FAQ answer 2) and :266 (visible) | MATCHES (VERIFIED FACTS: Tiny Team $600/mo flat, 1–4 users) - no dollar figure stated, so no numeric conflict |
| Engineer background | "an engineer with DoD infrastructure experience who treats your business like it matters" | case-studies.html:208 (hero lead) | MATCHES |
| Case example / client relationship | "a transportation company three years in" | case-studies.html:208 | UNVERIFIABLE - VERIFY WITH ULI (client tenure not in VERIFIED FACTS) |
| Case example / client name+vertical | "Villicana Group" - Transportation & Logistics Company | case-studies.html:218 | UNVERIFIABLE - VERIFY WITH ULI |
| Case example / relationship length | "a relationship spanning three years" | case-studies.html:219 | UNVERIFIABLE - VERIFY WITH ULI |
| Case example / scope claim | "meeting high-level compliance standards" and "improving the efficiency of their security systems" (Villicana) | case-studies.html:219 | UNVERIFIABLE - VERIFY WITH ULI (no VERIFIED FACT ties a specific compliance outcome to this client) |
| Testimonial | Full attributed quote from "Villicana Group, Transportation & Logistics Company" | case-studies.html:222-223 | UNVERIFIABLE - VERIFY WITH ULI (anonymized/unconfirmable testimonial per audit brief) |
| Case example / client name+vertical | "C&M Machine Shop Inc." - Machine Shop, California | case-studies.html:229 | UNVERIFIABLE - VERIFY WITH ULI |
| Testimonial | Attributed quote from "C&M Machine Shop Inc., Machine Shop, California" | case-studies.html:233-234 | UNVERIFIABLE - VERIFY WITH ULI |
| Case example / client name+title | "Andrew Sandoval" - Salinas City Council Member | case-studies.html:240 | UNVERIFIABLE - VERIFY WITH ULI |
| Testimonial | Attributed quote from "Andrew Sandoval, Salinas City Council Member" | case-studies.html:244-245 | UNVERIFIABLE - VERIFY WITH ULI |
| Marketing tagline | "Real clients, real words: ask us for a reference relevant to your industry." | case-studies.html:213 | UNVERIFIABLE - VERIFY WITH ULI (rests on the same unconfirmed case claims) |
| Marketing tagline | "Government-grade IT for small business." | case-studies.html:290 (footer, sitewide) | MATCHES in tone with DoD/federal contractor experience fact; no clearance level stated |
| Marketing tagline | "Built by an engineer from the federal contracting world." | case-studies.html:414 (footer, sitewide) | MATCHES (consistent with VERIFIED FACTS federal contractor experience) |
| Contact number | "(831) 204-0501" | case-studies.html:154, 211, 452 | UNVERIFIABLE - not listed in VERIFIED FACTS (contact info, not a substantive claim; consistent throughout page) |
| FAQ answer text (visible) matches JSON-LD FAQ | 3 Q&A pairs identical between :56-83 (JSON-LD) and :260-271 (visible `<details>`) | case-studies.html | MATCHES (no JS-only or mismatched FAQ content) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No dedicated at-a-glance block anywhere on the page. No response time is stated at all (VERIFIED FACTS has a 4-hour critical-incident notification that could anchor this). A pricing link exists only in the bottom CTA (:254) and footer, not paired with service area / who-you-talk-to info. |
| FAQ present with real question-and-answer text | Pass | Three `<details>` Q&A pairs at :260-271, visible in the DOM, matching the JSON-LD FAQPage content. |
| Plain-text statement of the offer within first 300 words of body | Fail | The hero lead (:208) and Villicana section (:219-223) mention "IT partner," "cybersecurity," "website," "compliance standards" in passing, but nowhere in the first ~300 words is there one clear plain-text sentence stating what Ghosxt sells (managed IT/cybersecurity/compliance) and where it operates (Central Coast CA). The offer is only stated cleanly in the `<meta name="description">` and JSON-LD, not in crawlable body copy. |
| Exactly one H1 | Pass | Single `<h1>Client Stories</h1>` at :207. Five `<h2>` elements below it (:218, :229, :240, :251, :259). |
| Title, meta description, canonical present | Pass | Title :6, meta description :7, canonical :8. |
| JSON-LD present (list which types) | Pass | `@graph` with WebPage (:39), BreadcrumbList (:48), FAQPage (:56). |
| Content that exists only inside JS | Pass (none found) | Page is static HTML; FAQ, testimonials, and case text are all present in the raw DOM, not JS-rendered. |
| Icon-only table cells | Pass (N/A) | No `<table>` elements on this page. |
| display:none on content that should be crawlable | Pass (none found) | No inline `display:none` in the page. External CSS files (main.min.css, locations.min.css) were not audited for hidden-content rules - out of scope for HTML-only review. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (:97-111) sits in the DOM before `<nav>` (:112) and before `<main>` (:201). No duplicated nav found. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to `/pricing` (:254, footer), vertical pages `/cybersecurity`, `/website-development`, `/manufacturing-it-services` embedded in case copy, and city links in the footer Service Areas list (:433-443), including `/salinas` which matches the Sandoval case's location. |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| None found | Checked for em dashes, "Cisco," "dental"/"dentist," "SIEM," "clearance"/"Top Secret," and a list of common MSP vendor/tool names (SentinelOne, Datto, ConnectWise, N-able, Huntress, Kaseya, NinjaOne, Bitdefender, Sophos, CrowdStrike, Fortinet, Meraki, Barracuda, Duo, Okta, 1Password, KnowBe4, Proofpoot, Webroot, ESET, Malwarebytes) - none appear anywhere in case-studies.html. |

## Top Three Fixes
1. Add a plain-text at-a-glance block near the top (service area, who the client talks to, response time, pricing link) - none of the four elements are grouped together anywhere on the page, and response time is absent entirely.
2. Move the cookie banner markup after `<main>` in the DOM (or otherwise ensure it doesn't precede primary content), so crawlers and AI readers hit the actual page content first.
3. Add one clear plain-text sentence stating the offer (managed IT, cybersecurity, and compliance for Central Coast CA small businesses, delivered by one dedicated engineer) within the first 300 words of body copy - currently that statement only exists in meta tags/JSON-LD, not in visible text.

## VERIFY WITH ULI
All three named case examples (Villicana Group, C&M Machine Shop Inc., Andrew Sandoval) and their attributed testimonials are UNVERIFIABLE against VERIFIED FACTS - CLAUDE.md contains no client roster, so client names, industries, relationship durations, and quotes cannot be confirmed or denied from the source of truth. Per instructions, these are flagged for Uli's verification and no rewrite or removal is proposed.
