# Page Audit: /managed-it-services

## Route
/managed-it-services (file: managed-it-services.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Engineer background | "Engineer with DoD infrastructure experience" | managed-it-services.html:9 (meta description), :17 (og:description), :27 (twitter:description) | MATCHES (VERIFIED FACTS: prior DoD/federal contractor infrastructure experience) |
| Engineer background | "Delivered by an engineer with DoD infrastructure experience." | managed-it-services.html:130 (JSON-LD Service description) | MATCHES |
| Engineer background | "Ghosxt is run by an engineer with DoD infrastructure experience with the same playbooks used to keep government endpoints safe." | managed-it-services.html:455 (hero lead) | MATCHES on DoD experience; "same playbooks used to keep government endpoints safe" is an unsourced extension — UNVERIFIABLE |
| Engineer background | "An engineer with DoD infrastructure experience" | managed-it-services.html:475 (key-facts "Led by") | MATCHES — does not name the owner (Ulises Paiz) |
| Engineer background | "Built by an engineer from the federal contracting world." | managed-it-services.html:774 (footer) | MATCHES |
| Business address | Salinas, CA, 93901 | managed-it-services.html:68-71 (LocalBusiness JSON-LD) | MATCHES |
| Clearance / classification level | none stated | (n/a) | MATCHES house rule — no clearance level found anywhere on page |
| Cisco certification claim | none found | (n/a) | MATCHES house rule — no Cisco certification claim on page |
| Cisco equipment mention | "Cisco Meraki on the edge depending on what your environment needs" | managed-it-services.html:528 | UNVERIFIABLE — VERIFY WITH ULI. Per audit brief, a Cisco equipment mention is only OK if it is equipment we deploy AND tagged [VERIFY]; this is untagged, and it doubles as a vendor-name house-rule violation (see below) |
| Google reviews | "Rated 5.0 across 26 Google reviews, trusted by businesses across Monterey County since 2021 and beyond." | managed-it-services.html:466 | UNVERIFIABLE — value matches VERIFIED FACTS (26 @ 5.0) but source fact itself is tagged [VERIFY live count] |
| Google reviews (repeat) | "5.0 on 26 Google reviews" | managed-it-services.html:479 (key-facts) | Same as above — UNVERIFIABLE (VERIFY live count) |
| Serving-since date | "since 2021" | managed-it-services.html:466 | UNVERIFIABLE — matches VERIFIED FACTS value but that fact is itself tagged [VERIFY year] |
| Response time (at-a-glance) | "Same-day remote support; on-site within 24–48 hours" | managed-it-services.html:476 | UNVERIFIABLE — not present anywhere in VERIFIED FACTS (only the 4-hour critical-incident notification is a contracted deliverable, and that is not stated here) |
| Response time (FAQ) | "Most issues are picked up by our monitoring before a user notices, and resolved remotely the same hour... critical issues jump straight to the front of the queue... after-hours emergencies are answered live by the engineer" | managed-it-services.html:227, :594-595 (JSON-LD + visible FAQ) | UNVERIFIABLE — no source in VERIFIED FACTS; does not conflict with the 4-hour SLA but is a materially more specific promise ("resolved... the same hour") that isn't backed by a listed fact |
| Free assessment offer/length | "No-obligation 30-minute IT assessment"; "30 minutes, on a video call or on-site" | managed-it-services.html:478, :554, :623 | UNVERIFIABLE — business offer, not addressed in VERIFIED FACTS |
| Pricing tier names | "Tiny teams (1–4) run on the Tiny Team Managed Security plan; everyone else uses per-user pricing on Core, Secure Growth, or Compliance & Continuity." | managed-it-services.html:565 | MATCHES tier names and the 1–4 user band in VERIFIED FACTS; no dollar figures stated on this page so no numeric conflict |
| Pricing structure | "Pricing is fixed, per user per month, with everything included... no surprise project invoices... Strategic planning sessions are quarterly at no additional cost" | managed-it-services.html:547 | MATCHES general per-user-per-month structure; "quarterly strategic planning at no additional cost" is not itemized in VERIFIED FACTS — UNVERIFIABLE detail |
| Contract term | "Our standard agreement is 12 months at the listed per-user price... no price increases during your initial year." | managed-it-services.html:235, :599 (JSON-LD + visible FAQ) | UNVERIFIABLE — no contract-term facts exist in VERIFIED FACTS at all |
| Early cancellation fee | "Early cancellation during the term costs 50% of the remaining months; after the first 12 months, cancel anytime with 30 days written notice and no fee." | managed-it-services.html:235, :599 | UNVERIFIABLE — VERIFY WITH ULI (specific fee percentage and notice period not sourced anywhere) |
| Month-to-month surcharge | "month-to-month is available at +15%" | managed-it-services.html:235, :599 | UNVERIFIABLE — VERIFY WITH ULI (specific surcharge not sourced anywhere) |
| Business size range | "businesses ranging from tiny teams... up through 50+ employee operations on the per-user tiers" | managed-it-services.html:259, :611 (JSON-LD + visible FAQ) | UNVERIFIABLE — no upper size bound stated in VERIFIED FACTS |
| Platform support (Mac/Windows/mobile/Linux) | "The full stack runs on macOS and Windows, and we manage iOS and Android phones through Microsoft Intune. Linux servers are also supported." | managed-it-services.html:243, :603 | MATCHES Intune capability listed in VERIFIED FACTS; macOS/Linux/mobile support breadth is UNVERIFIABLE (not itemized) |
| Co-managed IT | "Yes. Co-managed IT is a common arrangement..." | managed-it-services.html:251, :607 | UNVERIFIABLE — not addressed in VERIFIED FACTS (plausible service, not confirmable against fact sheet) |
| After-hours availability / SOC vendor | "Yes for emergencies. The Huntress SOC monitors endpoints around the clock and engages us automatically on a critical event." | managed-it-services.html:267, :615 | Concept MATCHES "managed detection and response with a 24/7 SOC"; naming "Huntress" is a vendor-name house-rule violation (never publish vendor names) |
| EDR / SOC capability | "Huntress EDR on every endpoint, with 24/7 SOC monitoring and human analyst review. Layered with Microsoft Defender for Endpoint..." | managed-it-services.html:508 | Concept MATCHES 24/7 SOC/MDR capability; CONTRADICTS on two points: (1) vendor name "Huntress" published (violation), (2) fact sheet says "Defender for Business," page says "Defender for Endpoint" — different named product |
| Identity / Conditional Access | "Microsoft Entra ID with Conditional Access policies that block legacy auth, enforce phishing-resistant MFA... FIDO2 hardware keys for admins." | managed-it-services.html:512 | MATCHES Conditional Access/Intune/Defender family in VERIFIED FACTS; "FIDO2 hardware keys for admins" is an added specific detail not itemized — UNVERIFIABLE |
| Device management | "Microsoft Intune as the MDM and configuration plane." | managed-it-services.html:516 | MATCHES (Intune explicitly named in VERIFIED FACTS) |
| Patch management stat | "Automated patching for Windows, macOS, and 200+ third-party apps. Continuous vulnerability scanning." | managed-it-services.html:520 | "OS and third-party patching" MATCHES; the "200+" app count and "continuous vulnerability scanning" are specific additions not in VERIFIED FACTS — UNVERIFIABLE |
| Backup capability | "Veeam Data Platform or Datto SIRIS depending on your environment, paired with an immutable cloud target the production network cannot reach. Tested restores monthly." | managed-it-services.html:524 | CONTRADICTS — VERIFIED FACTS lists the backup capability specifically as "cloud backup for Microsoft 365 and Google Workspace"; this describes a different capability (server/network immutable backup) and names two vendors not in the approved capability list |
| Network/edge stack | "UniFi Enterprise for switching and wireless, pfSense Plus, Sophos XGS, or Cisco Meraki on the edge..." | managed-it-services.html:528 | Not a listed capability in VERIFIED FACTS at all — UNVERIFIABLE, plus four vendor names published (violation) |
| Virtualization/cloud stack | "Hyper-V or VMware vSphere on the server side... Azure infrastructure when it earns its place." | managed-it-services.html:532 | Not a listed capability in VERIFIED FACTS — UNVERIFIABLE, plus two vendor names published (violation) |
| RMM/telemetry | "Enterprise RMM agent on every Windows and Mac endpoint, with custom telemetry and alerting tuned per client." | managed-it-services.html:536 | UNVERIFIABLE — generic description, no vendor named, but "RMM & Telemetry" as a discrete capability is not itemized in VERIFIED FACTS |
| Tooling comparison | "We deploy the same class of tooling that Fortune 500 IT teams run..." | managed-it-services.html:504 | UNVERIFIABLE — marketing comparison, not a checkable fact |
| Service structure ("no tier-1, no offshore") | "There is one senior engineer... There is no tier-1. There is no offshore." | managed-it-services.html:546 | MATCHES (consistent with sole-engineer VERIFIED FACT) |
| Target verticals | Agriculture, logistics/trucking/3PL, manufacturing, **healthcare and dental practices (HIPAA)**, legal, construction, SaaS/startups, retail/hospitality, nonprofit | managed-it-services.html:568-576 | CONTRADICTS — "dental practices" is listed as a target industry; VERIFIED FACTS explicitly excludes dentists as a client/target vertical anywhere on the site |
| Target vertical (SOC 2) | "SaaS and technology startups (SOC 2 readiness)" | managed-it-services.html:574 | UNVERIFIABLE — refers to helping clients reach their own SOC 2 readiness, distinct from the "SOC 2 documentation for every platform in our stack" contracted deliverable; not directly sourced either way |
| Service area / cities | Salinas, Watsonville, Hollister, Santa Cruz, Monterey, Marina, Seaside, Pacific Grove, Carmel, Gilroy, San Jose | managed-it-services.html:565, :793-803 (body + footer) | MATCHES city list in JSON-LD areaServed (:78-123) |
| Positioning tagline | "Government-grade IT for small business." | managed-it-services.html:650 (footer, sitewide) | UNVERIFIABLE — tone-consistent marketing tagline, not a specific checkable fact; recurs as "government-grade security standards" at :455, :564, :611 |
| FAQ content parity | JSON-LD FAQPage (6 Q&A) vs. visible `<details>` FAQ (6 Q&A) | managed-it-services.html:221-269 (JSON-LD) vs. :592-617 (visible) | MATCHES — text is identical between JSON-LD and visible DOM (one added inline link to /co-managed-it in the visible version only, no content change) |
| Structured data consistency | Second `<script type="application/ld+json">` block duplicates BreadcrumbList and Service with the same `@id` as the first block but different/truncated content (2-crumb trail missing "Services," 4-city areaServed instead of 11) | managed-it-services.html:278-332 vs. :190-213, :125-189 | CONTRADICTS — internally inconsistent structured data (duplicate `@id` with differing property values is not a VERIFIED FACTS issue per se, but is a factual-consistency defect worth flagging) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at :471-482 has Service area, Led by, Response, Pricing (linked to /pricing), Free, Rated, Direct line. "Who you talk to" is described by role, not by the owner's name. |
| FAQ present with real question-and-answer text | Pass | Six `<details>` Q&A pairs at :592-617, visible in DOM, matching JSON-LD FAQPage content word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero lead at :455 states the offer in plain text well inside the first ~200 words: "Managed IT flips the relationship. You pay a fixed monthly fee, we keep the systems healthy..." |
| Exactly one H1 | Pass | Single `<h1>` at :454. Multiple `<h2>`/`<h3>` below it, correctly nested. |
| Title, meta description, canonical present | Pass | Title :8, meta description :9, canonical :10. |
| JSON-LD present (list which types) | Pass, with a defect | Block 1 (:53-274): LocalBusiness, Service, BreadcrumbList, FAQPage in one `@graph`. Block 2 (:278-332, "ghosxt:extra-schema"): a second BreadcrumbList and a second Service node reusing the same `@id` as block 1's Service but with a shorter/different areaServed list and a 2-item (not 3-item) breadcrumb trail. This is a structured-data consistency defect. |
| Content that exists only inside JS | Pass (none found) | Page is static HTML; FAQ, key facts, service cards, and CTAs are all in the raw DOM. main.min.js (:809) only drives menu/scroll/cookie-banner UI behavior. |
| Icon-only table cells | Pass (n/a) | No `<table>` elements on this page; the services grid uses `<article>` cards with heading + paragraph text, not icon-only cells. |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` or inline-hidden crawlable content found. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner" id="cookieBanner">` (:341-355) sits in the DOM before `<nav class="navbar">` (:358) and before `<main id="main-content">` (:447). No duplicated nav found. |
| Internal links to pricing and to the relevant city or vertical pages | Pass, partial | Links to /pricing at :467, :477, :586. City links (Salinas, Watsonville, Hollister, Santa Cruz, Monterey, Marina, Seaside, Pacific Grove, Carmel, Gilroy, San Jose) inline in body copy at :565 and again in footer :793-803. Vertical/industry pages (e.g. /agriculture-it-services, /trucking-it-services, /healthcare-it-services) are linked only from the sitewide footer (:695-701), not contextually from the "Who managed IT is for" industries list (:567-577), which names industries but doesn't link out to their vertical pages. |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental listed as a target industry ("Healthcare and dental practices (HIPAA)") | managed-it-services.html:571 |
| Vendor name published: Huntress (EDR/SOC) | managed-it-services.html:267, :508, :615 |
| Vendor name published: Veeam Data Platform, Datto SIRIS (backup) | managed-it-services.html:524 |
| Vendor names published: UniFi Enterprise, pfSense Plus, Sophos XGS, Cisco Meraki (network/edge) | managed-it-services.html:528 |
| Vendor names published: Hyper-V, VMware vSphere (virtualization) | managed-it-services.html:532 |
| Cisco equipment mention not tagged [VERIFY] as required (Cisco Meraki) | managed-it-services.html:528 |
| Capability not in VERIFIED FACTS list: network/edge firewall stack, virtualization/cloud hosting stack, continuous vulnerability scanning, RMM/telemetry as a named capability | managed-it-services.html:519-540 |

No em dashes, no Cisco certification claim, and no clearance level were found on this page.

## Top Three Fixes
1. Remove "Healthcare and dental practices (HIPAA)" from the industries list at :571 (or replace with a non-excluded vertical) — this directly contradicts the VERIFIED FACTS exclusion of dentists as a client/target vertical.
2. Strip vendor names from the four "enterprise stack" service cards (:508, :524, :528, :532) and rewrite in capability-only language matching the VERIFIED FACTS phrasing (e.g., "managed detection and response with a 24/7 SOC" instead of "Huntress EDR"); tag anything about specific equipment (e.g., Cisco Meraki) as [VERIFY] if it stays, per the audit brief's rule for equipment mentions. Also reconcile "Defender for Endpoint" (:508) with the VERIFIED FACTS wording "Defender for Business."
3. Source or tag the contract-terms FAQ (:235/:599 — 12-month term, 50% early-cancellation fee, 30-day notice, +15% month-to-month surcharge) and the at-a-glance response-time claim (:476 — same-day/24–48 hour on-site) with [VERIFY], since none of these specific commitments exist in VERIFIED FACTS today.
