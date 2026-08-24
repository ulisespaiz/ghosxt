# Page Audit: /san-jose

## Route
/san-jose (file: san-jose.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Meta description: engineer with DoD infrastructure experience | "an engineer with DoD infrastructure experience" | san-jose.html:7 | MATCHES |
| Onboarding fees / per-ticket charges (FAQ visible) | "No. Pricing is a transparent per-user monthly rate... No onboarding fees and no per-ticket surprises" | san-jose.html:281 | CONTRADICTS - VERIFIED FACTS states onboarding is $1,000 (Tiny Team) / $1,500 (5–15 users, M365 default scope) |
| Onboarding fees / per-ticket charges (FAQPage JSON-LD, duplicate) | Same "No onboarding fees" answer | san-jose.html:46 | CONTRADICTS - same as above |
| Onboarding fees ("Written plan" step card) | "transparent, per-user pricing: no onboarding fees or per-ticket games" | san-jose.html:230 | CONTRADICTS - same as above |
| Managed IT tier pricing | Core $125/user/mo, Secure Growth $175, Compliance & Continuity $250 | san-jose.html:279 | MATCHES |
| Tiny Team plan pricing | "$600/mo flat Tiny Team Managed Security plan" for 1–4 users | san-jose.html:279 | MATCHES (plan name shown as "Tiny Team Managed Security"; VERIFIED FACTS just says "Tiny Team" - confirm exact plan name with Uli) |
| Google reviews rating/count | "★★★★★ Rated 5.0 across 26 Google reviews" | san-jose.html:140 | MATCHES (VERIFIED FACTS itself flags this count [VERIFY live count]) |
| Google reviews rating/count (key-facts) | "★★★★★ 5.0 on 26 Google reviews" | san-jose.html:152 | MATCHES (same live-count caveat) |
| Serving clients since year | "trusted by businesses across Monterey County since 2021 and beyond" | san-jose.html:140 | MATCHES on year (VERIFIED FACTS flags year [VERIFY]); "Monterey County" phrasing is odd on a San Jose/South Bay page - likely unedited boilerplate carried from a Monterey County location page. UNVERIFIABLE / VERIFY WITH ULI whether this should reference South Bay/Santa Clara County instead |
| Engineer with DoD infrastructure experience (key-facts "Led by") | "An engineer with DoD infrastructure experience" | san-jose.html:148 | MATCHES |
| Sole/one senior engineer | "one senior engineer" / "a senior engineer" | san-jose.html:135, 219, 232, 266–267 | MATCHES (VERIFIED FACTS: sole engineer) |
| Response time - remote (key-facts) | "Same-day remote support; on-site within 24–48 hours" | san-jose.html:149 | UNVERIFIABLE (no VERIFIED FACT for response time) but internally inconsistent - see below |
| Response time - remote (body copy) | "most issues resolved remotely the same hour" | san-jose.html:183 | UNVERIFIABLE; CONTRADICTS other response-time claims on this same page (149, 44, 278 say "same business day" / "24–48 hours", not "same hour") |
| Response time - remote (specialty card) | "most issues fixed remotely the same hour" | san-jose.html:267 | Same internal contradiction as above |
| Response time (FAQPage JSON-LD) | "On-site visits... typically same-day or next-day. Most issues are resolved remotely the same business day." | san-jose.html:44 | UNVERIFIABLE; contradicts "same hour" (183, 267) and "24–48 hours" on-site (149) |
| Response time (visible FAQ, duplicate of above) | Same text | san-jose.html:278 | Same internal contradiction |
| Dental practice as example client | "Whether you run a small SaaS, a dental practice, a real estate office, or a manufacturing shop..." | san-jose.html:160 | CONTRADICTS - VERIFIED FACTS: dentists are an excluded vertical; dental must not appear as a client or target industry anywhere |
| Dental as target industry | "Healthcare and dental" (industries-list item) | san-jose.html:193 | CONTRADICTS - same house rule |
| Cybersecurity capability list (service card) | "Endpoint protection, MFA, immutable backups, audits" | san-jose.html:165 | UNVERIFIABLE / VERIFY WITH ULI - "endpoint protection," "immutable," and "audits" are not verbatim in the VERIFIED FACTS capability list (closest verified item is "managed detection and response with a 24/7 SOC"; backups are listed simply as "cloud backup," not "immutable") |
| Cybersecurity capability list (specialty card) | "Endpoint detection and response, phishing-resistant MFA, immutable backup, and 24/7 monitoring" | san-jose.html:263 | "phishing-resistant MFA" and "24/7 monitoring" MATCH; "Endpoint detection and response" (EDR) and "immutable backup" are UNVERIFIABLE - not listed verbatim in VERIFIED FACTS (VERIFIED FACTS says "managed detection and response," a distinct term from EDR, and "cloud backup" without "immutable") |
| Backup capability (specialty card) | "Immutable, tested backups and a real recovery plan" | san-jose.html:268 | UNVERIFIABLE / VERIFY WITH ULI - "immutable" not in VERIFIED FACTS backup description |
| Web design starting price | "published pricing from $1,800" | san-jose.html:265 | UNVERIFIABLE - no web-design pricing figure exists in VERIFIED FACTS; VERIFY WITH ULI |
| JSON-LD areaServed | San Jose, Morgan Hill, Gilroy, Sunnyvale | san-jose.html:39 | UNVERIFIABLE / minor inconsistency - Sunnyvale is not mentioned anywhere in the visible body copy or the "nearby cities" list (203–207: Gilroy, Hollister, Santa Cruz, Salinas - no Sunnyvale, no Morgan Hill) |
| Federal contracting background (footer) | "Built by an engineer from the federal contracting world." | san-jose.html:424 | MATCHES |
| "Federal-grade IT" / "Government-grade IT" taglines | og:description (13), twitter:description (19), footer tagline (300), "Government-grade rigor" (165), "government-grade" (263) | multiple | Marketing puffery, not a checkable factual claim - not scored |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` lines 144–155: service area, "Led by," Response, Pricing (links to /pricing), Rated, Direct line all present |
| FAQ present with real question-and-answer text | Pass | Visible `<details>` FAQ, lines 273–283, 7 real Q&A pairs; duplicated in FAQPage JSON-LD (41–48) |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (134) + lead paragraph (135) plainly states the offer ("Ghosxt brings real Silicon Valley engineering to South Bay teams without the Silicon Valley invoice") well within the first ~150 words of body |
| Exactly one H1 | Pass | Single `<h1>` at line 134 |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8 |
| JSON-LD present (list which types) | Pass | Two `<script type="application/ld+json">` blocks: LocalBusiness, BreadcrumbList, FAQPage (lines 36–51); Service (lines 55–75) |
| Content that exists only inside JS | Pass (none found) | All visible content is present in static HTML; no content appears to be JS-injected |
| Icon-only table cells | N/A | No `<table>` elements on this page |
| display:none on content that should be crawlable | Pass (none found in this file) | No inline `display:none` on any crawlable content block |
| Cookie banner or duplicated nav before main content in the DOM | FAIL | Cookie banner (`<div class="cookie-banner">`, line 80) sits before `<nav>` (81) and before `<main id="main-content">` (130); the mobile nav menu (`<div class="navbar-mobile-menu">`, 109–128) duplicates every desktop nav link and also precedes `<main>` |
| Internal links to pricing and to the relevant city or vertical pages | Pass | /pricing linked at 150 and 279; nearby-city links to Gilroy, Hollister, Santa Cruz, Salinas (203–207); San Jose-specific vertical/specialty pages linked (cybersecurity-san-jose, cloud-services-san-jose, web-design-san-jose, 263–269) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental - listed as example client ("a dental practice") | san-jose.html:160 |
| Dental - listed as target industry ("Healthcare and dental") | san-jose.html:193 |
| Capability not verbatim in VERIFIED FACTS ("Endpoint detection and response," "immutable backups/backup") | san-jose.html:165, 263, 268 |

No em dash (plain or %E2%80%94), Cisco certification claim, vendor name, or clearance-level statement found on this page.

## Top Three Fixes
1. Remove both "dental" references (san-jose.html:160 "a dental practice" and san-jose.html:193 "Healthcare and dental") - dentists are an explicitly excluded vertical and must not appear as a client example or target industry anywhere on the site.
2. Fix the onboarding-fee contradiction: the page states "No onboarding fees" in three places (san-jose.html:46, 230, 281), but VERIFIED FACTS confirms onboarding fees of $1,000 (Tiny Team) / $1,500 (5–15 users, M365 default scope) do exist. This is a customer-facing pricing accuracy issue and should be corrected or reconciled with Uli before publishing.
3. Reconcile the response-time claims, which contradict each other within this single page: "same hour" remote resolution (183, 267) vs. "same business day" (44, 278) vs. "24–48 hours" on-site (149) vs. "same-day or next-day" on-site (44, 278). Pick one consistent, verified figure and also move the cookie banner and duplicated mobile nav so they no longer precede `<main>` in the DOM.
