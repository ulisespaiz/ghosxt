# Page Audit: /cloud-services-carmel

## Route
/cloud-services-carmel (file: cloud-services-carmel.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/operator is an engineer with DoD infrastructure experience | "an engineer with DoD infrastructure experience" | :217 (lead), :44 (JSON-LD Service description) | MATCHES |
| No clearance level stated | DoD experience described without a clearance level | :217, :44 | MATCHES (experience framing only, no level named) |
| Google review count/rating, client history | "5.0" across "26 Google reviews," "trusted by businesses across Monterey County since 2021 and beyond" | :228 (trust callout), :241 (key-facts) | MATCHES VERIFIED FACTS (26 at 5.0; serving clients since 2021), both of which carry [VERIFY] tags in CLAUDE.md |
| Response time | "Same-day remote support; on-site within 24–48 hours" | :238 (key-facts) | UNVERIFIABLE — not itemized in VERIFIED FACTS; the only response-time figure there is the 4-hour critical-incident notification, a different metric. VERIFY WITH ULI |
| Pricing structure | "Cloud and Microsoft 365 management is part of every managed plan: pricing published upfront" → links to /pricing | :229, :239 | MATCHES — no specific dollar figures stated on this page to check against the four published tiers |
| Phone number | (831) 204-0501 | :163, :223, :242, :533 | UNVERIFIABLE — not itemized in VERIFIED FACTS but consistent site-wide |
| Azure & Hybrid as a delivered service line | Full service card: line-of-business apps, secure remote access, hybrid identity | :273–274 | UNVERIFIABLE — Azure/hybrid infrastructure work is not in the VERIFIED FACTS capability list (scoped to M365 hardening: Intune, Defender for Business, Conditional Access). VERIFY WITH ULI |
| "SharePoint, Teams & OneDrive" governance as a distinct deliverable | Rebuilding file storage into a SharePoint/Teams structure with permissions | :261–263 | UNVERIFIABLE — not itemized in the VERIFIED FACTS capability list. VERIFY WITH ULI |
| Email & file migration (Exchange/Google Workspace/hosting → M365) | "Moving from on-prem Exchange, Google Workspace, or a shared hosting inbox to Microsoft 365...pre-staged and validated before any cutover" | :257–259 | UNVERIFIABLE — not itemized in the VERIFIED FACTS capability list. VERIFY WITH ULI |
| "Immutable" backup for Microsoft 365 data | "Immutable backup for Microsoft 365 data (email, SharePoint, and OneDrive)" | :278 | UNVERIFIABLE — VERIFIED FACTS lists "cloud backup for Microsoft 365 and Google Workspace," not immutability specifically. VERIFY WITH ULI |
| Entra ID hardening + Conditional Access | Identity layer claim, "every account is covered" | :278 | MATCHES in part — Conditional Access is explicitly listed; "Entra ID" framing is a reasonable description of the listed M365 identity work |
| Gallery & Inn systems tie-in (inventory, CRM, booking, POS) | POS/CRM/booking systems "tied into a hardened Microsoft 365 tenant," segmented from back office | :269–270 | UNVERIFIABLE — not itemized in the VERIFIED FACTS capability list. VERIFY WITH ULI |
| Cutover scheduled around a "quietest window" (e.g. a slow Tuesday in January) | Operational/process claim | :306 | UNVERIFIABLE — plausible, not covered by VERIFIED FACTS, not contradicted |
| "Senior engineer" leads the free assessment | :295, :344 | UNVERIFIABLE phrasing but consistent with "Owner and sole engineer: Ulises Paiz" (singular, not "team") |
| No dental/dentist mention | — (absent) | (confirmed via search) | MATCHES exclusion rule |
| No case examples, testimonials, or named clients present | — (absent) | (confirmed via read) | N/A — nothing to verify |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` :233–244 has Service area, Led by, Response, Pricing, Free, Rated, Direct line. |
| FAQ present with real question-and-answer text | Pass | 4 `<details>` Q&As at :322–338, matching FAQPage JSON-LD (:57–92) word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (:216) + lead paragraph (:217) state the offer plainly, well under 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at :216 (confirmed via file-wide search). |
| Title, meta description, canonical present | Pass | Title :6, meta description :7, canonical :8. |
| JSON-LD present (list which types) | Pass | Service (:39), BreadcrumbList (:48), FAQPage (:56). No LocalBusiness defined on this page itself (provider referenced only via `@id`), consistent with the sitewide pattern for city×service combo pages. |
| Content that exists only inside JS | Pass | No content found that is JS-only; all copy is server-rendered. |
| Icon-only table cells | N/A / Pass | No `<table>` elements on this page. |
| display:none on content that should be crawlable | Pass | No `display:none` occurrences in this file (confirmed via search). |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (:106–120) precedes `<nav class="navbar">` (:121) and `<main id="main-content">` (:210); the mobile nav menu (:172–207) is also a full duplicated link set preceding `<main>`. Consistent sitewide pattern. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | `/pricing` linked at :229, :239. City cross-links to Pacific Grove, Monterey, Seaside, Salinas (:315); `/carmel` hub and `/cybersecurity-carmel` cross-link (:314). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Capability not in VERIFIED FACTS: "Azure & Hybrid" as a full delivered service line | cloud-services-carmel.html:273–274 |
| Capability not in VERIFIED FACTS: "Immutable" backup (backup is listed, "immutable" is not) | cloud-services-carmel.html:278 |

No em dashes (plain or %E2%80%94-encoded), Cisco-certification claims, dental/dentist mentions, vendor/tool-brand names, or clearance-level statements were found on this page.

## Top Three Fixes
1. VERIFY WITH ULI whether "Azure & Hybrid" as a delivered service line (:273–274) and the "immutable" backup claim (:278) are accurate as worded, or trim them to match the VERIFIED FACTS capability list (M365 hardening + "cloud backup," no immutability claim, no Azure IaaS scope).
2. Move the cookie banner (:106–120) so it no longer precedes `<nav>` and `<main>` in the DOM.
3. VERIFY WITH ULI the "Same-day remote support; on-site within 24–48 hours" response-time claim (:238), which has no corresponding entry in VERIFIED FACTS, and confirm the phone number (831) 204-0501 is current.
