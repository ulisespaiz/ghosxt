# Page Audit: /cybersecurity-pacific-grove

## Route
/cybersecurity-pacific-grove (file: cybersecurity-pacific-grove.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/operator is an engineer with DoD infrastructure experience | "an engineer with DoD infrastructure experience" | :217 (lead), :44 (JSON-LD Service description) | MATCHES |
| No clearance level stated | Discretion tied to "the same standard we held inside DoD networks" | :217, :332, :340 | MATCHES - DoD experience/discretion framing only, no clearance level named |
| Google review count/rating, client history | "5.0" across "26 Google reviews," "trusted by businesses across Monterey County since 2021 and beyond" | :228 (trust callout), :241 (key-facts) | MATCHES VERIFIED FACTS (26 at 5.0; serving clients since 2021), both of which carry [VERIFY] tags in CLAUDE.md |
| Response time | "Same-day remote support; on-site within 24–48 hours" | :238 (key-facts) | UNVERIFIABLE - not itemized in VERIFIED FACTS; the only response-time figure there is the 4-hour critical-incident notification, a different metric. VERIFY WITH ULI |
| Pricing structure / Tiny Team plan | "Cybersecurity is built into every managed plan: pricing published upfront"; FAQ: "Very small teams use our flat-rate Tiny Team plan" | :229, :328 | MATCHES VERIFIED FACTS (Tiny Team $600/mo flat, 1–4 users) - no exact dollar figure stated on this page, but the plan reference is accurate |
| Phone number | (831) 204-0501 | :163, :223, :242, :529 | UNVERIFIABLE - not itemized in VERIFIED FACTS but consistent site-wide |
| EDR product named by vendor | "Huntress EDR with a 24/7 SOC on every device" | :263 | **CONTRADICTS** - VERIFIED FACTS: "never publish vendor names." "Managed detection and response with a 24/7 SOC" is the listed capability; "Huntress" is a specific vendor brand |
| PCI-aware point-of-sale security | Named capability, repeated 4x (JSON-LD FAQ, hero-adjacent copy, service card, visible FAQ) | :64, :72, :271, :320, :324 | UNVERIFIABLE - not in the VERIFIED FACTS capability list at all (closest listed items: DNS/web filtering, MDR). VERIFY WITH ULI |
| Guest Wi-Fi segmented from back office | Network segmentation capability | :72, :271, :324 | UNVERIFIABLE - not in the VERIFIED FACTS capability list. Same gap flagged as "Network Security and Firewalls" on the parent /cybersecurity page. VERIFY WITH ULI |
| "Immutable Backup" | "Backups the production network cannot reach or wipe, with tested restores" | :278–279 | UNVERIFIABLE - VERIFIED FACTS lists "cloud backup for Microsoft 365 and Google Workspace," not immutability specifically. Same gap flagged on the parent /cybersecurity page. VERIFY WITH ULI |
| "Vulnerability management" | Listed capability in meta description and JSON-LD Service description | :7 (meta description), :44 (JSON-LD) | UNVERIFIABLE - not in the VERIFIED FACTS capability list (closest: "OS and third-party patching," which is not the same as vulnerability scanning/management). Same gap flagged as "Continuous vulnerability scanning" on the parent /cybersecurity page. VERIFY WITH ULI |
| 24/7 monitoring / human response | "Alerts go to a human who acts, not a dashboard that waits... We are [on call at 2 a.m.]" | :282–283 | MATCHES in spirit with "managed detection and response with a 24/7 SOC" |
| Discretion / no client details disclosed | On-site visits scheduled around hours, engineer low-profile, no client details discussed | :217, :252, :331–332, :340 | UNVERIFIABLE marketing/process claim, not itemized in VERIFIED FACTS but plausible and not contradicted |
| No dental/dentist mention | - (absent) | (confirmed via search) | MATCHES exclusion rule |
| No case examples, testimonials, or named clients present | - (absent) | (confirmed via read) | N/A - nothing to verify |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` :233–244 has Service area, Led by, Response, Pricing, Free, Rated, Direct line. |
| FAQ present with real question-and-answer text | Pass | 4 `<details>` Q&As at :318–334, matching FAQPage JSON-LD (:57–92) word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (:216) + lead paragraph (:217) state the offer plainly, well under 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at :216 (confirmed via count). |
| Title, meta description, canonical present | Pass | Title :6, meta description :7, canonical :8. |
| JSON-LD present (list which types) | Pass | Service (:39), BreadcrumbList (:48), FAQPage (:56). No LocalBusiness defined on this page itself (provider referenced only via `@id`), consistent with the sitewide pattern for city×service combo pages. |
| Content that exists only inside JS | Pass | No content found that is JS-only; all copy is server-rendered. |
| Icon-only table cells | N/A / Pass | No `<table>` elements on this page. |
| display:none on content that should be crawlable | Pass | No `display:none` occurrences in this file (confirmed via search). |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (:106–120) precedes `<nav class="navbar">` (:121) and `<main id="main-content">` (:210); the mobile nav menu (:172–207) is also a full duplicated link set preceding `<main>`. Consistent sitewide pattern. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | `/pricing` linked at :229, :239. City cross-links to Monterey, Carmel, Seaside, Marina (:311); `/pacific-grove` hub and `/cloud-services-pacific-grove` cross-link (:310). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Vendor name published: "Huntress EDR" | cybersecurity-pacific-grove.html:263 |
| Capability not in VERIFIED FACTS: "PCI-aware point-of-sale security" (named 4x as a core offering) | cybersecurity-pacific-grove.html:64, 72, 271, 320, 324 |
| Capability not in VERIFIED FACTS: guest Wi-Fi network segmentation | cybersecurity-pacific-grove.html:72, 271, 324 |
| Capability not in VERIFIED FACTS: "Immutable Backup" (backup is listed, "immutable" is not) | cybersecurity-pacific-grove.html:278–279 |
| Capability not in VERIFIED FACTS: "vulnerability management" (meta description + JSON-LD) | cybersecurity-pacific-grove.html:7, 44 |

No em dashes (plain or %E2%80%94-encoded), Cisco-certification claims, dental/dentist mentions, clearance-level statements, or SIEM claims were found on this page.

## Top Three Fixes
1. Remove the vendor name "Huntress" from line 263 - rewrite as "EDR with a 24/7 SOC on every device," matching the VERIFIED FACTS phrasing ("managed detection and response with a 24/7 SOC") without naming the underlying tool.
2. VERIFY WITH ULI whether PCI-aware point-of-sale security, guest Wi-Fi segmentation, "immutable" backup, and "vulnerability management" are accurate as currently worded - these are repeated as core, named capabilities (including in the meta description and JSON-LD, both high-visibility for AI crawlers) but none appear in the VERIFIED FACTS capability list. Either confirm and add them to VERIFIED FACTS or trim the page to the confirmed list.
3. Move the cookie banner (lines 106–120) so it no longer precedes `<nav>` and `<main>` in the DOM, and VERIFY WITH ULI the "Same-day remote support; on-site within 24–48 hours" response-time claim (line 238), which has no corresponding entry in VERIFIED FACTS.
