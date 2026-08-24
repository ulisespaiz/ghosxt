# Page Audit: /cloud-services-pacific-grove

## Route
/cloud-services-pacific-grove (file: cloud-services-pacific-grove.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/operator is an engineer with DoD infrastructure experience | "an engineer with DoD infrastructure experience" | :217 (lead), :44 (JSON-LD Service description) | MATCHES |
| No clearance level stated | DoD experience described without a clearance level | :217, :44 | MATCHES ("DoD-cleared"/experience framing only, no level named) |
| Google review count/rating | "5.0" across "26 Google reviews" | :228 (trust callout), :241 (key-facts) | MATCHES VERIFIED FACTS (26 at 5.0), which itself carries [VERIFY live count] |
| Response time | "Same-day remote support; on-site within 24–48 hours" | :238 (key-facts) | UNVERIFIABLE — not itemized in VERIFIED FACTS; the only response-time figure there is the 4-hour critical-incident notification, a different metric. VERIFY WITH ULI |
| Pricing structure | "Cloud and Microsoft 365 management is part of every managed plan: pricing published upfront" → links to /pricing | :229, :239 | MATCHES — no specific dollar figures stated on this page to check against the four published tiers |
| Phone number | (831) 204-0501 | :163, :223, :242, :533 | UNVERIFIABLE — not itemized in VERIFIED FACTS but consistent site-wide (confirmed against sibling audits) |
| Excluded vertical named as a target industry | "professional offices (dental, real estate, financial services)" | :287 | **CONTRADICTS** — VERIFIED FACTS: "Excluded vertical: dentists. Dental must not appear as a client or target industry anywhere." This is the flagged instance |
| Azure & Hybrid as a delivered service line | Full service card: secure remote access, booking/wellness platform hosting, hybrid identity for offices with a local server | :273–274 | UNVERIFIABLE — Azure/hybrid infrastructure work is not in the VERIFIED FACTS capability list (scoped to M365 hardening: Intune, Defender for Business, Conditional Access). Same gap flagged on the parent /cloud-services page. VERIFY WITH ULI |
| "SharePoint, Teams & OneDrive" governance as a distinct deliverable | Rebuilding shared drives into SharePoint/Teams structure with permissions | :261–262 | UNVERIFIABLE — not itemized in VERIFIED FACTS capability list. VERIFY WITH ULI |
| Email & file migration (Exchange/Google Workspace/hosting → M365) | "Move from on-prem Exchange, Google Workspace, or a shared hosting account to Microsoft 365" | :257–258 | UNVERIFIABLE — not itemized in VERIFIED FACTS capability list. VERIFY WITH ULI |
| "Immutable backup" for Microsoft 365 data | "Immutable backup for your Microsoft 365 data closes that gap" | :278 | UNVERIFIABLE — VERIFIED FACTS lists "cloud backup for Microsoft 365 and Google Workspace," not immutability specifically. Same gap flagged on /cybersecurity. VERIFY WITH ULI |
| Entra ID hardening + Conditional Access | Identity layer claim | :278 | MATCHES in part — Conditional Access is listed; "Entra ID hardening" broadly is reasonable framing of the listed M365 identity work, not flagged separately |
| Cutover scheduling / blackout dates | "Summer weekends and Butterfly Parade weekend are off-limits for cutovers unless you specifically request it" | :307 | UNVERIFIABLE — operational/process claim, not covered by VERIFIED FACTS, plausible and low-risk. VERIFY WITH ULI |
| "Senior engineer" leads the free assessment | :295, :344 | UNVERIFIABLE phrasing but consistent with "Owner and sole engineer: Ulises Paiz" (singular, not "team") |
| No case examples, testimonials, or named clients present | — (absent) | (confirmed via read) | N/A — nothing to verify |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` :233–244 has Service area, Led by, Response, Pricing, Free, Rated, Direct line. |
| FAQ present with real question-and-answer text | Pass | 4 `<details>` Q&As at :322–338, matching FAQPage JSON-LD (:57–92) word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (:216) + lead paragraph (:217) state the offer plainly, well under 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at :216 (confirmed via count). |
| Title, meta description, canonical present | Pass | Title :6, meta description :7, canonical :8. |
| JSON-LD present (list which types) | Pass | Service (:39), BreadcrumbList (:48), FAQPage (:56). No LocalBusiness on this page itself (provider referenced only via `@id`, consistent with sitewide pattern for city×service combo pages). |
| Content that exists only inside JS | Pass | No content found that is JS-only; all copy is server-rendered. |
| Icon-only table cells | N/A / Pass | No `<table>` elements on this page. |
| display:none on content that should be crawlable | Pass | No `display:none` occurrences in this file (confirmed via search). |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (:106–120) precedes `<nav class="navbar">` (:121) and `<main id="main-content">` (:210); the mobile nav menu (:172–207) is also a full duplicated link set that precedes `<main>`. Consistent sitewide pattern. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | `/pricing` linked at :229, :239. City cross-links to Monterey, Carmel, Seaside, Marina (:315); `/pacific-grove` hub and `/cybersecurity-pacific-grove` cross-link (:314). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental named as a target industry (excluded vertical) | cloud-services-pacific-grove.html:287 ("professional offices (dental, real estate, financial services)") |
| Capability not in VERIFIED FACTS: "Azure & Hybrid" as a full delivered service line | cloud-services-pacific-grove.html:273–274 |
| Capability not in VERIFIED FACTS: "Immutable backup" (backup is listed, "immutable" is not) | cloud-services-pacific-grove.html:278 |

No em dashes (plain or %E2%80%94-encoded), Cisco-certification claims, vendor/tool-brand names, clearance-level statements, or SIEM claims were found on this page.

## Top Three Fixes
1. Remove "dental" from the professional-offices list at line 287 — dentists are an explicitly excluded vertical. Replace with an allowed example (e.g., wineries, real estate, financial services alone) or drop the parenthetical.
2. VERIFY WITH ULI whether Azure/hybrid infrastructure work (line 273–274) and "immutable" backup (line 278) are accurate as currently worded, or trim them to match the VERIFIED FACTS capability list (M365 hardening + "cloud backup," no immutability claim, no Azure IaaS).
3. Move the cookie banner (lines 106–120) so it no longer precedes `<nav>` and `<main>` in the DOM, and VERIFY WITH ULI the "Same-day remote support; on-site within 24–48 hours" response-time claim (line 238), which has no corresponding entry in VERIFIED FACTS.
