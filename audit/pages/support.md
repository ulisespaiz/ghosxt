# Page Audit: /support

## Route
/support (file: support.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Support hours | "8am to 6pm Pacific" | support.html:7 (meta description) | UNVERIFIABLE — business hours are not stated in VERIFIED FACTS; internally consistent everywhere it appears on this page |
| Support hours | "Support runs 8am to 6pm Pacific with the engineer who knows your systems" | support.html:13 (og:description), :19 (twitter:description) | UNVERIFIABLE — same, consistent phrasing |
| Support hours | "Support runs 8am to 6pm Pacific" | support.html:54 (JSON-LD ContactPage description) | UNVERIFIABLE — consistent |
| Support hours | Mon–Fri, opens 08:00, closes 18:00 | support.html:74-79 (JSON-LD LocalBusiness openingHoursSpecification) | UNVERIFIABLE — consistent |
| Support hours | "8am to 6pm Pacific, Monday through Friday" | support.html:313 (key-facts), :369 (body), :456 (closing CTA) | UNVERIFIABLE — consistent throughout; no VERIFIED FACT covers business hours so this should get a [VERIFY] from Uli even though it never contradicts itself |
| Founding / client-serving year | "2021" | support.html:66 (JSON-LD foundingDate) | MATCHES (VERIFIED FACTS: "Serving clients since 2021 [VERIFY year]" — inherits the same [VERIFY] flag) |
| Founding / client-serving year | "trusted by businesses across Monterey County since 2021 and beyond" | support.html:306 (hero trust line) | MATCHES — same inherited [VERIFY] |
| Business address | Salinas, CA, 93901, US | support.html:67-73 (JSON-LD PostalAddress) | MATCHES on city/state (VERIFIED FACTS: "Based in Salinas, CA"); postal code 93901 is UNVERIFIABLE (not in VERIFIED FACTS) |
| Phone number | "+18312040501" / "(831) 204-0501" | support.html:63, 83, 234, 288, 293, 314, 334, 352, 440, 458, 651 (throughout) | UNVERIFIABLE — not listed in VERIFIED FACTS (contact info, not a substantive claim); consistent everywhere it appears |
| Email | "sales@ghosxt.com" | support.html:64, 360, 600 | UNVERIFIABLE — not in VERIFIED FACTS; consistent |
| Sole point of contact | "There is no phone tree, no tier-one script, and no queue of strangers. The person who picks up is the engineer who set up your systems, and it is the same person every time." | support.html:291 (hero lead) | MATCHES (VERIFIED FACTS: "Owner and sole engineer: Ulises Paiz") |
| Sole point of contact | "The engineer who runs your environment. There is no tier-one layer, no offshore queue, and no script." | support.html:103 (JSON-LD FAQ answer), :424 (visible FAQ) | MATCHES |
| Sole point of contact | "Emergencies: Answered by the engineer, not a voicemail box" | support.html:319 (key-facts) | MATCHES |
| 24/7 SOC | "Monitoring and the 24/7 security operations center keep running and escalate critical security events regardless of the hour." | support.html:118 (JSON-LD FAQ answer), :432 (visible FAQ) | MATCHES (VERIFIED FACTS lists "24/7 SOC" as a delivered capability) |
| 24/7 SOC | "The 24/7 security operations center watches for critical security events around the clock and escalates them whether or not anyone has filed a ticket." | support.html:370 (body) | MATCHES |
| Google reviews | "Rated 5.0 across 26 Google reviews" | support.html:306 (hero trust line) | MATCHES (VERIFIED FACTS: "Google reviews: 26 at 5.0 as of August 2026 [VERIFY live count]"; current date 2026-08-24 is within that window, but the underlying count still carries the source [VERIFY] tag) |
| Non-client hourly-rate offer | "For a one-off, yes, at the published hourly rate on our pricing page." | support.html:150 (JSON-LD FAQ answer), :448 (visible FAQ) | MATCHES — pricing.html publishes hourly/project rates ($150-$750+/hr, see pricing.html:2085-2145) |
| Non-client cost comparison | "If it keeps happening, a managed plan is almost always cheaper than paying by the incident." | support.html:150 (JSON-LD FAQ answer), :448 (visible FAQ) | UNVERIFIABLE — comparative/opinion claim, not a checkable fact in VERIFIED FACTS |
| On-site service area (cities) | Salinas, Monterey, Watsonville, Santa Cruz, Hollister, Seaside, Marina, Pacific Grove, Carmel, Gilroy, San Jose | support.html:415 (body) | MATCHES — internally consistent with footer service-area list (support.html:632-643); all 11 corresponding city pages exist on the site |
| On-site service area (region) | "Monterey County and the Central Coast" | support.html:317 (key-facts) | UNVERIFIABLE — regional label not stated verbatim in VERIFIED FACTS, but consistent with the city list above |
| First response time | "First response: Same business day" / "Requests that come in during those hours get a same-business-day first response" | support.html:318 (key-facts), :369 (body) | UNVERIFIABLE — VERIFIED FACTS only specifies a "4-hour notification on actual or reasonably suspected critical incidents" as a contracted deliverable, a different metric; this page's "same business day" first-response claim is not covered by any VERIFIED FACT, so flag for [VERIFY] |
| Priority tiers | "Company down: Immediate, everything else stops." / "One person blocked: Same business day." / "Request or question: Scheduled, tracked in the portal." / "Project work: Moves out of the support queue into a planned project." | support.html:373-376 | UNVERIFIABLE — operational description not covered by any VERIFIED FACT; not contradicted, just unconfirmed |
| Free assessment offer | "start with a free 30-minute assessment" | support.html:384 (body) | UNVERIFIABLE — the "30-minute" duration is not stated in VERIFIED FACTS |
| Marketing tagline | "Government-grade IT for small business." | support.html:489 (footer, sitewide) | MATCHES in tone with VERIFIED FACTS "Active DoD clearance and prior DoD/federal contractor infrastructure experience"; no specific clearance level is stated, so this is not a house-rule violation, consistent with prior page audits (see audit/pages/case-studies.md) |
| Engineer background | "Built by an engineer from the federal contracting world." | support.html:613 (footer, sitewide) | MATCHES (VERIFIED FACTS: prior DoD/federal contractor infrastructure experience) |
| Remote-session security policy | "we will never call you out of the blue and ask you to enter a session code" | support.html:340 | UNVERIFIABLE — internal security policy statement, not a fact tracked in VERIFIED FACTS; not contradicted |
| FAQ content parity | JSON-LD FAQPage (7 Q&A pairs) text matches the visible `<details>` FAQ text word-for-word | support.html:96-153 (JSON-LD) vs. :422-449 (visible) | MATCHES — no JS-only or mismatched FAQ content |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | The `key-facts` aside (support.html:310-321) has service area ("On-site: Monterey County and the Central Coast") and a response-time row ("First response: Same business day"), but there is no explicit "who you talk to" row (it's only implied via the "Emergencies" row and the hero paragraph above the block) and **no pricing link at all** in the block — pricing is only linked later, in the "Not a client yet?" CTA section (:390) and footer. |
| FAQ present with real question-and-answer text | Pass | Seven `<details>` Q&A pairs at :422-449, visible in the DOM, matching the JSON-LD FAQPage content word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | The hero lead paragraph (:291) states the offer in plain text very early: "Here is every way to reach us... The person who picks up is the engineer who set up your systems, and it is the same person every time." This lands well inside the first 300 words of body copy. |
| Exactly one H1 | Pass | Single `<h1>Get Support</h1>` at :290. |
| Title, meta description, canonical present | Pass | Title :6, meta description :7, canonical :8. |
| JSON-LD present (list which types) | Pass | `@graph` with ContactPage (:50), LocalBusiness (:57), FAQPage (:95), BreadcrumbList (:156). |
| Content that exists only inside JS | Pass (none found) | Page is static HTML; hero, key-facts, remote-session steps, and FAQ are all present in the raw DOM, not JS-rendered. `assets/js/main.min.js` (:648) appears to handle only interactivity (mobile menu, cookie banner buttons, scroll-to-top), not content injection. |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page. |
| display:none on content that should be crawlable | Pass | No `display:none` occurrences in support.html itself, and no `sr-only` usage either — nothing on this page is hidden from crawlers. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | The cookie banner (`#cookieBanner`, support.html:175-189) sits in the DOM **before** both the `<nav class="navbar">` (:192) and `<main id="main-content">` (:281). No duplicated nav was found. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Pricing linked at :390 ("See our pricing") and inside the FAQ answer at :448. City pages linked at :415 (Salinas, Monterey, Watsonville, Santa Cruz, Hollister, Seaside, Marina, Pacific Grove, Carmel, Gilroy, San Jose) and again in the footer service-areas list (:632-643); all target files exist on the site. |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| None found | — no em dashes, no Cisco certification claim, no dental/dentist mention, no vendor names, no clearance level stated, and no SIEM or capability outside the VERIFIED FACTS list appear anywhere in support.html. |

## Top Three Fixes
1. Add a pricing link (and an explicit "who you talk to" row) to the `key-facts` at-a-glance block (support.html:310-321) — it currently covers hours, fastest path, ticketing, remote help, on-site area, first response, and emergencies, but omits pricing entirely and only implies who answers the phone.
2. Move the cookie banner (`#cookieBanner`, support.html:175-189) so it no longer sits before `<nav>` and `<main>` in the DOM — currently it is the very first content block on the page, ahead of the primary navigation and all main content.
3. Get Uli's sign-off on the business-hours and first-response language repeated across the page (meta/OG/Twitter tags, both JSON-LD blocks, key-facts, and body copy at :7, :13, :19, :54, :74-79, :313, :369, :456) — "8am to 6pm Pacific" and "same-business-day first response" are stated as fact seven-plus times but neither appears in VERIFIED FACTS, so there is nothing in project memory to confirm them against.
