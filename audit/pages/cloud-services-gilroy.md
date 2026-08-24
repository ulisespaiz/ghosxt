# Page Audit: /cloud-services-gilroy

## Route
/cloud-services-gilroy (file: cloud-services-gilroy.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Google review count/rating | "5.0" across "26 Google reviews" | line 228 (hero trust callout), line 241 (key-facts) | MATCHES (VERIFIED FACTS: "26 at 5.0 as of August 2026 [VERIFY live count]" — source itself is flagged [VERIFY], so treat live count as needing refresh) |
| Client tenure | "trusted by businesses across Monterey County since 2021 and beyond" | line 228 | MATCHES (VERIFIED FACTS: "Serving clients since 2021 [VERIFY year]" — source year itself flagged [VERIFY]) |
| Engineer background | "An engineer with DoD infrastructure experience" (repeated: lines 217, 237, 295, 344) | multiple | MATCHES (VERIFIED FACTS: "prior DoD/federal contractor infrastructure experience"). No clearance level stated — compliant. |
| Response time SLA | "Same-day remote support; on-site within 24–48 hours" | line 238 (key-facts) | UNVERIFIABLE — not itemized in VERIFIED FACTS contracted deliverables (which specify a 4-hour notification SLA for incidents, not a general response-time SLA). VERIFY WITH ULI. |
| On-site turnaround (body copy) | "on-site at a Gilroy warehouse, processing plant, or retail back office is a same-day or next-day call" | line 314 | UNVERIFIABLE — roughly consistent with the 24–48hr key-facts figure but not an exact match; same underlying SLA not confirmed in VERIFIED FACTS. |
| Pricing | "Cloud and Microsoft 365 management is part of every managed plan: pricing published upfront" (links to /pricing) | line 229 | MATCHES general structure (VERIFIED FACTS confirms published per-user/flat pricing tiers); no specific dollar figures asserted on this page, so nothing to contradict. |
| Phone number | (831) 204-0501 | lines 163, 223, 242, 533 | Internally consistent across page/site; not independently verifiable from CLAUDE.md (no phone number in VERIFIED FACTS). UNVERIFIABLE (low priority). |
| Capability: Microsoft 365 setup & hardening, phishing-resistant MFA, Conditional Access | line 254 | MATCHES capability list |
| Capability: Intune-managed mobile access | "Intune-managed mobile access" | line 270 | MATCHES capability list (Intune listed) |
| Capability: Cloud backup for Microsoft 365 | "immutable cloud backup for mail and files" | line 278 | UNVERIFIABLE — VERIFIED FACTS lists "cloud backup for Microsoft 365 and Google Workspace" but does not confirm the backup is "immutable." VERIFY WITH ULI. |
| Capability: Entra ID / Conditional Access hardening | line 278 | MATCHES (Conditional Access is listed; Entra ID is Microsoft's own product name for the tenant identity service being configured, not a third-party vendor) |
| "Government-grade mobile management" | line 270 | UNVERIFIABLE — unsubstantiated marketing superlative, not a checkable fact in VERIFIED FACTS. |
| No Cisco certification claimed | — | whole page | MATCHES (no Cisco mention at all — compliant) |
| No dental/dentist vertical | — | whole page | MATCHES (not present — compliant) |
| No clearance level stated | — | whole page | MATCHES (compliant; only "DoD infrastructure experience" used) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` (lines 233–244) has Service area, Led by, Response, Pricing (links /pricing), Free, Rated, Direct line. "Led by" describes role, not a named person. |
| FAQ present with real question-and-answer text | Pass | 4 `<details>` items (lines 322–337) with real text, mirrored in FAQPage JSON-LD. |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero `<p class="lead">` (line 217) states the offer plainly in the first ~120 words. |
| Exactly one H1 | Pass | One `<h1>` at line 216. |
| Title, meta description, canonical present | Pass | Lines 6, 7, 8. |
| JSON-LD present (list which types) | Pass | Service, BreadcrumbList, FAQPage (lines 39, 49, 57). `provider` references `#business` by @id but that entity is not defined on this page (assumed defined sitewide). |
| Content that exists only inside JS | Pass (none found) | All visible page content is server-rendered HTML; mobile menu is duplicated static markup, not JS-injected. |
| Icon-only table cells | Pass (N/A) | No `<table>` elements on this page; key-facts uses `<dl>`, services use cards. |
| display:none on crawlable content | Pass (none found) | No inline `display:none` in the file; not checked in linked CSS (out of scope for HTML-only review). |
| Cookie banner or duplicated nav before main content in the DOM | **Fail** | Cookie banner (`#cookieBanner`, lines 106–120) sits before `<nav>` (121) and before `<main>` (210) in DOM order, ahead of all page-specific crawlable content. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (229, 239), /gilroy, /cybersecurity-gilroy, /hollister, /san-jose, /salinas, /watsonville, /agriculture-it-services, /cloud-services (lines 314–316). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| None found | — |

## Top Three Fixes
1. Move the cookie banner markup after `<main>` (or otherwise later in DOM order) so it doesn't precede the page's crawlable content — same template issue site-wide.
2. Confirm the "Same-day remote support; on-site within 24–48 hours" SLA and the "immutable" backup claim with Uli; neither is spelled out in VERIFIED FACTS as written.
3. Refresh/confirm the "26 Google reviews... since 2021" figures against the live count before next publish, since both source values are themselves flagged [VERIFY] in CLAUDE.md.
