# Page Audit: /cloud-services-santa-cruz

## Route
/cloud-services-santa-cruz (file: cloud-services-santa-cruz.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/operator is an engineer with DoD infrastructure experience | "an engineer with DoD infrastructure experience" | cloud-services-santa-cruz.html:220, 240; JSON-LD:45 | MATCHES |
| Footer attribution | "Built by an engineer from the federal contracting world." | cloud-services-santa-cruz.html:494 | MATCHES |
| Google review count/rating | "26 Google reviews," 5.0 stars (stated twice) | cloud-services-santa-cruz.html:231, 244 | MATCHES (source fact itself carries `[VERIFY live count]` in CLAUDE.md) |
| Client history / geography | "trusted by businesses across Monterey County since 2021 and beyond" | cloud-services-santa-cruz.html:231 | CONTRADICTS — "since 2021" matches the VERIFIED FACTS figure (`[VERIFY year]`), but "Monterey County" is geographically wrong on a Santa Cruz page: this page's own JSON-LD (line 47) and footer service-area list place Santa Cruz in Santa Cruz County. Identical wrong-county text also appears on cybersecurity-santa-cruz.html:231 and was already flagged on santa-cruz.html — looks like a shared, un-parameterized trust snippet |
| Response time | "Same-day remote support; on-site within 24–48 hours" | cloud-services-santa-cruz.html:241 | UNVERIFIABLE — not itemized in VERIFIED FACTS; the only response figure there is the "4-hour notification on actual or reasonably suspected critical incidents" contracted deliverable, a different metric. VERIFY WITH ULI |
| Pricing | "Published upfront," free assessment for a written quote; "Cloud and Microsoft 365 management is part of every managed plan" | cloud-services-santa-cruz.html:232, 242 | MATCHES conceptually — no specific dollar figures are stated on this page to check against the four published tiers |
| Free assessment offer | "No-obligation 30-minute IT assessment" | cloud-services-santa-cruz.html:224, 243, 294-298, 342-347 | UNVERIFIABLE — offer terms not itemized in VERIFIED FACTS; internally consistent across the page |
| Verticals served | Technology, hybrid teams, professional services, healthcare | cloud-services-santa-cruz.html:220, 286-287; JSON-LD:45 | MATCHES excluded-vertical rule — no dental/dentist mention found |
| Microsoft 365 Setup & Hardening: phishing-resistant MFA, Conditional Access, Secure Score | Capability claim | cloud-services-santa-cruz.html:256-257 | MATCHES — Microsoft 365 hardening with Conditional Access is explicitly listed in VERIFIED FACTS |
| Email & file migration (Exchange/Google Workspace/hosting → M365) | Capability claim | cloud-services-santa-cruz.html:260-261, 304-308 | UNVERIFIABLE — not itemized as a distinct capability in VERIFIED FACTS. VERIFY WITH ULI |
| SharePoint, Teams & OneDrive architecture/permissions | Capability claim | cloud-services-santa-cruz.html:263-265 | UNVERIFIABLE — not on the VERIFIED FACTS capability list. VERIFY WITH ULI |
| Azure & hybrid: "hosting a line-of-business app, secure remote access, or hybrid identity" | Capability claim | cloud-services-santa-cruz.html:271-273 | UNVERIFIABLE — Azure/hybrid infrastructure work is not on the VERIFIED FACTS capability list (which covers Microsoft 365 hardening, not Azure IaaS/hybrid identity hosting). VERIFY WITH ULI |
| "Immutable backup" for Microsoft 365 | Capability claim | cloud-services-santa-cruz.html:277, 335; JSON-LD FAQ:89 | UNVERIFIABLE — VERIFIED FACTS lists "cloud backup for Microsoft 365 and Google Workspace" with no "immutable" qualifier. VERIFY WITH ULI |
| Entra ID and Conditional Access underpinning security | Capability claim | cloud-services-santa-cruz.html:277 | MATCHES in part — Conditional Access is explicitly listed; Entra ID itself isn't separately named but is the underlying Microsoft identity platform Conditional Access requires |
| HIPAA-aware and confidentiality controls for healthcare/professional services | Capability claim | cloud-services-santa-cruz.html:287 | UNVERIFIABLE — not itemized in VERIFIED FACTS' capability or contracted-deliverables lists. VERIFY WITH ULI |
| Migration claim: "no lost data, no lost workday," validated before/after cutover | Quality/process claim | cloud-services-santa-cruz.html:261, 304-306 | UNVERIFIABLE — unquantified process claim, no track record itemized in VERIFIED FACTS |
| Footer tagline | "Government-grade IT for small business." | cloud-services-santa-cruz.html:370 | UNVERIFIABLE — marketing language consistent in tone with the DoD/federal-contractor background fact, but not a verbatim VERIFIED FACTS claim |
| FAQ content (JSON-LD vs. visible) | 4 Q&As about M365 support, remote/hybrid setup, migration, and backup | cloud-services-santa-cruz.html:58-93 (JSON-LD) vs. 320-336 (visible) | MATCHES — word-for-word identical, single consistent JSON-LD block (no duplicate/conflicting schema, unlike some sitewide pages) |
| Service area | Santa Cruz, Santa Cruz County; on-site county, remote nationwide; nearby Watsonville, Monterey, Salinas, San Jose | cloud-services-santa-cruz.html:47 (JSON-LD), 220, 313-314 | MATCHES |
| No em dash, Cisco certification, dental/dentist, clearance level, or SIEM mention | — (absent) | confirmed via full-file search | MATCHES |
| No vendor/tool-brand names | — (absent) | confirmed via full-file search | MATCHES |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at lines 236-247 has all fields: Service area, Led by, Response, Pricing, Free, Rated, Direct line. |
| FAQ present with real question-and-answer text | Pass | 4 `<details>` Q&As at lines 320-336, matching the FAQPage JSON-LD word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (219) + lead paragraph (220, ~115 words) plainly state the offer well within the first 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at line 219. |
| Title, meta description, canonical present | Pass | Title line 6; meta description line 7; canonical line 8. |
| JSON-LD present (list which types) | Pass | Single `@graph` block (lines 35-96): Service, BreadcrumbList, FAQPage. No duplicate/conflicting schema block found on this page. |
| Content that exists only inside JS | Pass | No content found that is JS-only; all visible copy is server-rendered. |
| Icon-only table cells | N/A / Pass | No `<table>` elements exist on this page. |
| display:none on content that should be crawlable | Pass | No `display:none` occurrences found in this file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner" id="cookieBanner">` (lines 107-121) sits in the DOM before `<nav class="navbar">` (124) and before `<main id="main-content">` (213). No duplicated nav element found. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | `/pricing` linked at 232, 242 (plus nav/footer). City links: `/santa-cruz`, `/watsonville`, `/monterey`, `/salinas`, `/san-jose` (313-314); cross-links to `/cybersecurity-santa-cruz`, `/help-desk-it-support`, `/managed-it-services`, `/backup-disaster-recovery`, `/cloud-services`. |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Unlisted capability — "Immutable" backup qualifier not in VERIFIED FACTS' capability list | cloud-services-santa-cruz.html:277, 335; JSON-LD FAQ:89 — VERIFY WITH ULI |
| Unlisted capability — Azure/hybrid infrastructure hosting and identity work not in VERIFIED FACTS' capability list | cloud-services-santa-cruz.html:271-273 — VERIFY WITH ULI |

No em dash, Cisco certification, dental/dentist mention, vendor name, or clearance-level statement was found on this page.

## Top Three Fixes
1. Fix the "trusted by businesses across Monterey County since 2021" trust callout (line 231) — Santa Cruz is in Santa Cruz County, not Monterey County (per this page's own JSON-LD, line 47). The identical wrong-county text also appears on cybersecurity-santa-cruz.html:231 and was already flagged on santa-cruz.html, suggesting a shared, un-parameterized snippet across the templated city pages that needs county-aware values.
2. VERIFY WITH ULI the "immutable" backup qualifier (lines 277, 335) and the Azure/hybrid-identity/hosting capability claim (lines 271-273) — neither is itemized in VERIFIED FACTS' capability list, and "immutable" specifically overstates what's confirmed ("cloud backup for Microsoft 365 and Google Workspace").
3. Move the cookie banner (lines 107-121) so it no longer precedes `<nav>` and `<main>` in the DOM.

Lower-priority: confirm the "no lost data, no lost workday" migration-quality claim (lines 261, 304-306) and the HIPAA-aware/confidentiality-controls claim for healthcare and professional services (line 287) with Uli — neither is itemized in VERIFIED FACTS' capability or contracted-deliverables lists.
