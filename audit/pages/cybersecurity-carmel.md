# Page Audit: /cybersecurity-carmel

## Route
/cybersecurity-carmel (file: cybersecurity-carmel.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/operator is an engineer with DoD infrastructure experience | "an engineer with DoD infrastructure experience" | :217 (lead), :44 (JSON-LD Service description) | MATCHES |
| No clearance level stated | Discretion tied to "the same standard we held inside DoD networks" | :217, :88 (JSON-LD FAQ), :331 (visible FAQ) | MATCHES - DoD experience/discretion framing only, no clearance level named |
| Google review count/rating, client history | "5.0" across "26 Google reviews," "trusted by businesses across Monterey County since 2021 and beyond" | :228 (trust callout), :241 (key-facts) | MATCHES VERIFIED FACTS (26 at 5.0; serving clients since 2021), both of which carry [VERIFY] tags in CLAUDE.md |
| Response time | "Same-day remote support; on-site within 24–48 hours" | :238 (key-facts) | UNVERIFIABLE - not itemized in VERIFIED FACTS; the only response-time figure there is the 4-hour critical-incident notification, a different metric. VERIFY WITH ULI |
| Pricing structure | "Cybersecurity is built into every managed plan: pricing published upfront" | :229, :239 | MATCHES - no specific dollar figures stated on this page to check against the four published tiers |
| Phone number | (831) 204-0501 | :163, :223, :242, :528 | UNVERIFIABLE - not itemized in VERIFIED FACTS but consistent site-wide |
| EDR product named by vendor | "Huntress EDR with a 24/7 SOC on every device" | :262 | **CONTRADICTS** - VERIFIED FACTS: "never publish vendor names." "Managed detection and response with a 24/7 SOC" is the listed capability; "Huntress" is a specific vendor brand |
| PCI-aware point-of-sale security | Named capability, repeated across meta/OG/Twitter tags, service card, and FAQ (JSON-LD + visible) | :7 (meta description), :13/:19 (og/twitter), :273–274 (service card), :77–80 (JSON-LD FAQ), :302 (body copy), :326–327 (visible FAQ) | UNVERIFIABLE - not in the VERIFIED FACTS capability list at all (closest listed items: DNS/web filtering, MDR). Repeated as a core, named capability, including in the meta description - high visibility for AI crawlers. VERIFY WITH ULI |
| Guest/payment network segmented from back office | Network segmentation capability | :274, :302, :327 | UNVERIFIABLE - not in the VERIFIED FACTS capability list. VERIFY WITH ULI |
| "Immutable Backup" | "Off-site, air-gapped backups the production network cannot write to or delete, tested with actual restores"; also "immutable off-site backup" in the compliance-bar section | :277–279, also :44 (JSON-LD Service description), :302 | UNVERIFIABLE - VERIFIED FACTS lists "cloud backup for Microsoft 365 and Google Workspace," not immutability specifically. VERIFY WITH ULI |
| "Vulnerability management" | Listed capability in JSON-LD Service description | :44 | UNVERIFIABLE - not in the VERIFIED FACTS capability list (closest: "OS and third-party patching," which is not the same as vulnerability scanning/management). VERIFY WITH ULI |
| 24/7 monitoring / human response | "Alert tooling with a human analyst who acts on it, not just logs it," handled "immediately, not reviewed Monday morning" | :281–283 | MATCHES in spirit with "managed detection and response with a 24/7 SOC" |
| Discretion / no client details disclosed | On-site visits scheduled around hours, engineer low-profile, no client details discussed | :217, :251, :330–331, :339 | UNVERIFIABLE marketing/process claim, not itemized in VERIFIED FACTS but plausible and not contradicted |
| No dental/dentist mention | - (absent) | (confirmed via search) | MATCHES exclusion rule |
| No case examples, testimonials, or named clients present | - (absent) | (confirmed via read) | N/A - nothing to verify |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` :233–244 has Service area, Led by, Response, Pricing, Free, Rated, Direct line. |
| FAQ present with real question-and-answer text | Pass | 4 `<details>` Q&As at :317–333, matching FAQPage JSON-LD (:57–92) word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (:216) + lead paragraph (:217) state the offer plainly, well under 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at :216 (confirmed via file-wide search). |
| Title, meta description, canonical present | Pass | Title :6, meta description :7, canonical :8. |
| JSON-LD present (list which types) | Pass | Service (:39), BreadcrumbList (:48), FAQPage (:56). No LocalBusiness defined on this page itself (provider referenced only via `@id`), consistent with the sitewide pattern for city×service combo pages. |
| Content that exists only inside JS | Pass | No content found that is JS-only; all copy is server-rendered. |
| Icon-only table cells | N/A / Pass | No `<table>` elements on this page. |
| display:none on content that should be crawlable | Pass | No `display:none` occurrences in this file (confirmed via search). |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (:106–120) precedes `<nav class="navbar">` (:121) and `<main id="main-content">` (:210); the mobile nav menu (:172–207) is also a full duplicated link set preceding `<main>`. Consistent sitewide pattern. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | `/pricing` linked at :229, :239. City cross-links to Pacific Grove, Monterey, Seaside, Salinas (:310); `/carmel` hub and `/cloud-services-carmel` cross-link (:309–310). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Vendor name published: "Huntress EDR" | cybersecurity-carmel.html:262 |
| Capability not in VERIFIED FACTS: "PCI-aware point-of-sale security" (named repeatedly, including meta description and both FAQ instances) | cybersecurity-carmel.html:7, 13, 19, 273–274, 302, 326–327 |
| Capability not in VERIFIED FACTS: guest/payment network segmentation | cybersecurity-carmel.html:274, 302, 327 |
| Capability not in VERIFIED FACTS: "Immutable Backup" (backup is listed, "immutable" is not) | cybersecurity-carmel.html:44, 277–279, 302 |
| Capability not in VERIFIED FACTS: "vulnerability management" | cybersecurity-carmel.html:44 |

No em dashes (plain or %E2%80%94-encoded), Cisco-certification claims, dental/dentist mentions, or clearance-level statements were found on this page.

## Top Three Fixes
1. Remove the vendor name "Huntress" from :262 - rewrite as "EDR with a 24/7 SOC on every device," matching the VERIFIED FACTS phrasing ("managed detection and response with a 24/7 SOC") without naming the underlying tool.
2. VERIFY WITH ULI whether PCI-aware point-of-sale security, guest/payment network segmentation, "Immutable Backup," and "vulnerability management" are accurate as currently worded - these are repeated as core, named capabilities (including in the meta description and JSON-LD, both high-visibility for AI crawlers) but none appear in the VERIFIED FACTS capability list. Either confirm and add them to VERIFIED FACTS or trim the page to the confirmed list.
3. Move the cookie banner (:106–120) so it no longer precedes `<nav>` and `<main>` in the DOM, and VERIFY WITH ULI the "Same-day remote support; on-site within 24–48 hours" response-time claim (:238), which has no corresponding entry in VERIFIED FACTS.
