# Page Audit: /voip-business-phone-systems

## Route
/voip-business-phone-systems (file: voip-business-phone-systems.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "an engineer with DoD infrastructure experience" | voip-business-phone-systems.html:7, 13, 19 (meta/og/twitter descriptions), 44 (JSON-LD Service description), 223 (visible lead paragraph), 228 (trust callout) | MATCHES (VERIFIED FACTS: "prior DoD/federal contractor infrastructure experience"; page never claims a clearance level or "DoD-cleared" wording) |
| Service area | JSON-LD areaServed: Monterey County, Santa Cruz County, San Benito County, Santa Clara County, California | voip-business-phone-systems.html:46-51 | MATCHES (consistent with owner based in Salinas, CA / Monterey County; no address asserted on this page) |
| Footer service-area city list | Salinas, Monterey, Watsonville, Hollister, Santa Cruz, Gilroy, San Jose, Pacific Grove, Carmel, Seaside, Marina | voip-business-phone-systems.html:470-480 | MATCHES (consistent with the four-county JSON-LD area above) |
| "Government-grade IT for small business" / "Built by an engineer from the federal contracting world" / "not a science project" | Footer tagline, footer copyright, hero trust callout | voip-business-phone-systems.html:327, 228, 451 | MATCHES (marketing gloss on verified DoD/federal-contractor experience, not a separate factual claim) |
| Phone number | (831) 204-0501 / +18312040501 | voip-business-phone-systems.html:169, 226, 306, 489 | UNVERIFIABLE - not covered by VERIFIED FACTS, but internally consistent across every instance on the page |
| Email | sales@ghosxt.com | voip-business-phone-systems.html:438 | UNVERIFIABLE - not covered by VERIFIED FACTS |
| Booking link | https://calendly.com/ulises-ghosxt | voip-business-phone-systems.html:170, 208, 225, 273, 307, 333, 398, 490 | UNVERIFIABLE - not covered by VERIFIED FACTS, but consistent with owner name Ulises Paiz |
| Pricing | No dollar figures appear anywhere on this page; /pricing is linked only from the nav (161) and footer (351), not from any in-body content or CTA | voip-business-phone-systems.html (page-wide) | MATCHES for not inventing numbers, but see Legibility Checklist / Top Fixes - no in-body pricing link or pricing-link CTA exists |
| Anonymized case example | "We've set this up across client environments where the main line couldn't afford to go dark (reservation desks, dispatch lines, front-office phones)" | voip-business-phone-systems.html:235 | UNVERIFIABLE - anonymized case example, VERIFY WITH ULI (not rewritten or flagged for removal per instructions) |
| VoIP service-line capability claims | Cloud VoIP setup & number porting, mobile/softphone integration, auto-attendant & call routing, Microsoft Teams Phone integration, E911 compliance, outage failover | voip-business-phone-systems.html:243-265 (service cards), 66-96 (JSON-LD FAQ), 286-300 (visible FAQ) | UNVERIFIABLE - VoIP/phone-system capabilities are not part of the "Capabilities we actually deliver" list in VERIFIED FACTS (that list covers only the managed-security/MSP stack: MDR/SOC, password vault, patching, DNS filtering, security-awareness training, cloud backup, Apple Business Manager, M365 hardening, Google Workspace IdP); no contradiction, just outside the enumerated facts - VERIFY WITH ULI |
| Microsoft Teams Phone product naming | "Microsoft Teams Phone Integration" | voip-business-phone-systems.html:91-94 (JSON-LD), 255-256, 298-299 (visible) | Not a house-rule violation - VERIFIED FACTS itself names Microsoft 365/Intune/Defender/Conditional Access as allowed capability language, so naming a Microsoft product (as opposed to a third-party MSP tool vendor) follows the same pattern. UNVERIFIABLE that Teams Phone integration is actually delivered (see row above) |
| "Where this fits" cross-link claim | VoIP setup described as "typically part of a broader Microsoft 365 and cloud deployment" and supported via "managed IT" help desk | voip-business-phone-systems.html:279 | MATCHES (internal positioning claim, consistent with sitewide service structure; not a specific fact to verify) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No such block exists. The hero (lines 217-230) has only the H1, a lead paragraph, two CTA buttons (Calendly + phone), and one trust-callout sentence - no structured service-area/who-you-talk-to/response-time/pricing summary, unlike the `aside.key-facts` pattern used on other audited service pages (e.g. network-design.html:448-460). |
| FAQ present with real question-and-answer text | Pass | 4 `<details>` Q&As at lines 285-300, matching the FAQPage JSON-LD (lines 64-98) word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (222) + lead paragraph (223) state the offer plainly ("Ghosxt sets up cloud VoIP for California small businesses that ports your existing number, rings through to mobile, and keeps working when the office can't...") well within the first 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at line 222. |
| Title, meta description, canonical present | Pass | Title line 6; meta description line 7; canonical line 8. |
| JSON-LD present (list which types) | Pass | Service (34-53), BreadcrumbList (54-61), FAQPage (62-98) - one instance each, no duplication/conflict found. No LocalBusiness/Organization node on this page itself; Service.provider references `https://ghosxt.com/#business` by `@id` only (expected if defined once sitewide, not verifiable from this file alone). |
| Content that exists only inside JS | Pass | No JS-only content found; all visible copy is static HTML. `assets/js/main.min.js` (486) only drives interactivity (menus, cookie banner, scroll-to-top). |
| Icon-only table cells | N/A / Pass | No `<table>` elements exist on this page. |
| display:none on content that should be crawlable | Pass | No `display:none` occurrences found in this file (external stylesheets not audited - out of scope for a single-page review). |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (lines 112-126) sits in the DOM before `<nav class="navbar">` (127) and before `<main id="main-content">` (216). |
| Internal links to pricing and to the relevant city or vertical pages | Fail | `/pricing` appears only in the nav (161) and footer (351) - no link to pricing anywhere in the main body content or CTAs (all body CTAs point to Calendly, tel:, or /contact). Footer service-area city links exist (470-480) but there is no in-body contextual link to a specific city page; no vertical page is relevant to a VoIP service page, so that half is N/A. |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| None found | - |

No em dashes, no Cisco-certification claims, no dental/dentist references, no stated clearance level, no vendor names (third-party MSP tooling), and no SIEM or unlisted-capability claims from the cybersecurity capability list were found on this page. Microsoft/Teams product naming is consistent with the Microsoft-product language already used directly in VERIFIED FACTS (see Claims Table) and is not treated as a "vendor name" violation.

## Top Three Fixes
1. Add an at-a-glance block near the top of the page (mirroring the `aside.key-facts` pattern on network-design.html:448-460) covering service area, who you talk to, a response-time expectation, and a link to /pricing - currently entirely absent, and no /pricing link exists anywhere in the main body content.
2. Move the cookie banner (lines 112-126) so it no longer sits before `<nav>`/`<main>` in the DOM order - a sitewide template issue already flagged on other audited pages (network-design, cybersecurity, salinas).
3. VERIFY WITH ULI: confirm the six VoIP service-card capability claims (number porting, mobile/softphone integration, auto-attendant/call routing, Microsoft Teams Phone integration, E911 compliance, outage failover, lines 243-265) and the anonymized case-example line (reservation desks/dispatch lines/front-office phones, line 235) are accurate - none of this is covered by CLAUDE.md's VERIFIED FACTS, which enumerates only the cybersecurity/MSP capability stack and contains no VoIP-specific facts to check against.
