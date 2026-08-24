# Page Audit: /carmel

## Route
/carmel (file: carmel.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "An engineer with DoD infrastructure experience" / "the same standard we held inside DoD networks" / "Built by an engineer from the federal contracting world" | carmel.html:7, 148, 45, 280, 424 | MATCHES |
| "Federal-grade" / "Government-grade" marketing language | tied to DoD/federal contractor background | carmel.html:13, 19, 135, 165, 263, 300, 424 | MATCHES (marketing gloss on verified DoD/federal-contractor experience; not a separate factual claim) |
| Clearance level | none stated, only "DoD infrastructure experience" / "DoD-cleared"-style language | carmel.html:7, 45, 148, 280 | MATCHES (no specific level stated, consistent with "never state the clearance level") |
| Tiny Team Managed Security price | $600/mo flat, 1 to 4 users | carmel.html:279 (visible FAQ) | MATCHES |
| Core Managed IT price | $125/user/mo | carmel.html:279 (visible FAQ) | MATCHES |
| Secure Growth price | $175/user/mo | carmel.html:279 (visible FAQ) | MATCHES |
| Compliance & Continuity price | $250/user/mo | carmel.html:279 (visible FAQ) | MATCHES |
| Google reviews count/rating | "26 Google reviews," 5.0 stars | carmel.html:140, 152 | MATCHES value, but flag: VERIFIED FACTS states this number "lives in one data file and nowhere else" — it is hardcoded twice on this page instead of sourced from that single file, creating drift risk when the live count changes. VERIFY WITH ULI on intended architecture. |
| "trusted... since 2021" | Client-serving start year 2021 | carmel.html:140 | MATCHES (VERIFIED FACTS itself flags this year [VERIFY]) |
| Industries served | Art galleries, real estate brokerages, luxury hospitality, restaurants/tasting rooms, professional services/law, healthcare and wellness, retail/boutiques, wineries/tasting rooms | carmel.html:190-198 | MATCHES — no dental/dentist present (excluded vertical correctly absent); wineries present, which VERIFIED FACTS says is fine; "healthcare and wellness" is not itemized in VERIFIED FACTS but is not the excluded vertical either |
| PCI-compliant POS for galleries | claimed capability | carmel.html:42 (JSON-LD FAQPage), 166, 217, 276 (visible FAQ) | UNVERIFIABLE — PCI-compliance work is not on the VERIFIED FACTS "capabilities we actually deliver" list; no contradiction found, but not sourced either. VERIFY WITH ULI. |
| "Immutable" backups | claimed capability | carmel.html:165, 263, 268 | UNVERIFIABLE — VERIFIED FACTS lists only "cloud backup for Microsoft 365 and Google Workspace," without the "immutable" qualifier |
| "Endpoint detection and response" / "Endpoint protection" | claimed capability | carmel.html:165, 263 | UNVERIFIABLE — VERIFIED FACTS names "managed detection and response with a 24/7 SOC," not an EDR product-level claim; close but not an exact match |
| Email hardening: enforced MFA, SPF/DKIM/DMARC, impersonation and banking-change alerts | claimed capability | carmel.html:47 (JSON-LD FAQPage), 216, 282 (visible FAQ) | UNVERIFIABLE — domain-authentication and banking-change-alert configuration is not itemized on the VERIFIED FACTS capabilities list |
| Microsoft 365 / SharePoint / Teams / Azure | claimed capability | carmel.html:264 | UNVERIFIABLE for "Azure" specifically — VERIFIED FACTS names "Microsoft 365 hardening with Intune, Defender for Business, and Conditional Access" but does not list Azure (a distinct IaaS/PaaS platform) as a delivered capability. SharePoint/Teams are reasonably covered under "Microsoft 365." |
| Web design pricing "from $1,800" | carmel.html:265 | — | UNVERIFIABLE — not covered by VERIFIED FACTS (only Microsoft 365-scope managed IT pricing and onboarding fees are listed there) |
| On-site/remote response time (four different phrasings on one page) | (a) "Same-day remote support; on-site within 24–48 hours" (key facts); (b) "Same-day or next-day for non-emergencies. Most issues are resolved remotely the same hour" (FAQ, visible + JSON-LD); (c) "most issues are resolved remotely the same business day" (IT Support section body copy); (d) "most issues fixed remotely the same hour" (specialty grid) | carmel.html:149, 44 &amp; 278, 183, 267 | UNVERIFIABLE — no single response-time figure is stated in VERIFIED FACTS, so none of these individually contradicts a verified fact, but (b)/(d) "same hour" sits awkwardly next to (c) "same business day" on the same page. VERIFY WITH ULI which figure is accurate and align all four. |
| JSON-LD `Service.provider.@id` reference | `"@id": "https://ghosxt.com/#business"` | carmel.html:66 | CONTRADICTS — the LocalBusiness entity actually defined earlier in the same `@graph` uses `"@id": "https://ghosxt.com/carmel#business"` (carmel.html:39). The Service block points to an `@id` that does not exist in this page's structured data, breaking the Service→LocalBusiness link that search engines and AI crawlers rely on. |
| Phone number | (831) 204-0501 / +18312040501 | carmel.html:39, 105, 138, 153, 461 (recurs) | UNVERIFIABLE — not covered by VERIFIED FACTS, but consistent throughout the page |
| Email | sales@ghosxt.com | carmel.html:39, 411 | UNVERIFIABLE — not covered by VERIFIED FACTS, but consistent |
| Business/service-area location | Carmel-by-the-Sea, CA 93921 (LocalBusiness address); areaServed Carmel-by-the-Sea, Carmel Valley, Pacific Grove, Monterey | carmel.html:39 | UNVERIFIABLE — VERIFIED FACTS states the business is "Based in Salinas, CA" and serves clients broadly; this is a location landing page for the Carmel service area, consistent with the site's multi-city footprint (footer lists Salinas, Monterey, Pacific Grove, Carmel, Seaside, etc. at 440-455), not a contradiction |
| Credentials/certifications (M.S., CompTIA, AZ-104, ITIL, etc.) | none named on this page | — | N/A — page makes no specific credential claims, so nothing to contradict |
| Cisco certification | none found | — | N/A — no Cisco claim present (correct) |
| Cyber liability insurance ($1M) / SAM.gov registration | not mentioned on this page | — | N/A — no claim made, nothing to check |
| Case examples / testimonials | none present (no named client stories, no quoted testimonials) | — | N/A — page contains no anonymized case examples or anonymous testimonials to flag |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at carmel.html:144-155 has Service area, Led by, Response, Pricing (linked to /pricing), plus bonus Free/Rated/Direct line rows |
| FAQ present with real question-and-answer text | Pass | Visible `<details>/<summary>` FAQ at carmel.html:273-283 (7 Q&As), matching FAQPage JSON-LD at carmel.html:41-48 |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (line 134) + lead paragraph (line 135) state the offer plainly ("Ghosxt brings federal-grade engineering to Carmel-by-the-Sea and Carmel Valley with the discretion the town expects"), reinforced by the key-facts block, well inside the first 300 words |
| Exactly one H1 | Pass | Single `<h1>` at carmel.html:134 |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8 |
| JSON-LD present (list which types) | Pass, with a bug | Two `<script type="application/ld+json">` blocks: `@graph` at carmel.html:36-51 contains LocalBusiness, BreadcrumbList, FAQPage; second block at carmel.html:55-75 contains Service. The Service's `provider.@id` (line 66) does not match the LocalBusiness `@id` defined at line 39, breaking the intended link between the two entities. |
| Content that exists only inside JS | Pass (none found) | All headings, body copy, service cards, and FAQ are static HTML (FAQ uses native `<details>`); no evidence of content injected only via assets/js/main.min.js |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the file |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, carmel.html:80) sits in the DOM before `<nav>` (81) and before `<main id="main-content">` (130) |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (150, 279, nav, footer); nearby city pages Pacific Grove/Monterey/Seaside/Salinas (203-206) and footer service-areas list (440-455); vertical/specialty pages cybersecurity-carmel, cloud-services-carmel, web-design-carmel (263-265) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Capabilities not on the VERIFIED FACTS list: "PCI-compliant POS" | carmel.html:42, 166, 217, 276 |
| Capabilities not on the VERIFIED FACTS list: "Immutable" backups (verified fact says only "cloud backup") | carmel.html:165, 263, 268 |
| Capabilities not on the VERIFIED FACTS list: "Endpoint detection and response" (verified fact says "managed detection and response with a 24/7 SOC") | carmel.html:165, 263 |
| Capabilities not on the VERIFIED FACTS list: SPF/DKIM/DMARC configuration, impersonation and banking-change alerts | carmel.html:47, 216, 282 |
| Capabilities not on the VERIFIED FACTS list: Azure (as a distinct cloud platform beyond Microsoft 365) | carmel.html:264 |

No em-dash (literal, URL-encoded, or entity form), Cisco-certification, dental, clearance-level, or SIEM violations were found on this page — only en dashes (–), which house rules do not prohibit. The five rows above are flagged under the "SIEM or any capability not in VERIFIED FACTS" house rule; none are on the explicit "never claim" list by name, but none are on the "capabilities we actually deliver" list either, so they need Uli's confirmation before they can be marked as accurate.

## Top Three Fixes
1. Fix the broken JSON-LD reference: `Service.provider.@id` at carmel.html:66 reads `"https://ghosxt.com/#business"` but should read `"https://ghosxt.com/carmel#business"` to match the LocalBusiness `@id` actually defined at carmel.html:39 — as written, the Service entity does not resolve to this page's business listing.
2. VERIFY WITH ULI whether "PCI-compliant POS" (carmel.html:42, 166, 217, 276), "immutable" backups (165, 263, 268), "Endpoint detection and response" (165, 263), SPF/DKIM/DMARC + banking-change-alert configuration (47, 216, 282), and Azure (264) are capabilities Ghosxt actually delivers; if not confirmed, they need to come off the page (visible copy and JSON-LD) per the "never invent a capability" house rule, or be added to VERIFIED FACTS so future audits can pass them cleanly.
3. Move the cookie banner (carmel.html:80) so it no longer sits before `<nav>`/`<main>` in the DOM order; also reconcile the four differently-worded response-time claims (149, 44/278, 183, 267 — "24–48 hours" / "same-day or next-day" / "same hour" / "same business day") into one figure once Uli confirms the real SLA, and VERIFY WITH ULI whether the hardcoded "26 Google reviews / 5.0" figure (140, 152) should instead be sourced from the single data file VERIFIED FACTS says is the number's home, to avoid drift when the live count changes.
