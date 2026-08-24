# Page Audit: /hollister

## Route
/hollister

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner described as engineer with DoD infrastructure experience | "an engineer with DoD infrastructure experience" | hollister.html:7 (meta description) | MATCHES |
| Positioning line | "Federal-grade IT for Hollister manufacturers, wineries, and small business." | hollister.html:13 (og:description) | MATCHES |
| Positioning line | "Federal-grade IT for Hollister small business." | hollister.html:19 (twitter:description) | MATCHES |
| Business phone | +18312040501 | hollister.html:39 (JSON-LD LocalBusiness) | MATCHES (consistent site-wide) |
| Business email | sales@ghosxt.com | hollister.html:39 (JSON-LD LocalBusiness) | MATCHES (consistent site-wide) |
| Address | Hollister, CA 95023 | hollister.html:39 (JSON-LD LocalBusiness) | MATCHES |
| Service area cities | Hollister, Salinas, Gilroy, San Juan Bautista | hollister.html:39 (JSON-LD areaServed) | UNVERIFIABLE (service-area city list not itemized in VERIFIED FACTS) |
| JSON-LD Service provider reference | `"provider": {"@id": "https://ghosxt.com/#business"}` | hollister.html:66 | CONTRADICTS — the only LocalBusiness `@id` defined on this page is `https://ghosxt.com/hollister#business` (line 39); the Service node's provider reference does not resolve to any node in the graph |
| Published pricing (Core $125/user/mo, Secure Growth $175, Compliance & Continuity $250, Tiny Team $600/mo flat for 1–4 users) | Stated in FAQ | hollister.html:43 (JSON-LD FAQPage) and :279 (visible FAQ) | MATCHES VERIFIED FACTS exactly |
| Google reviews | "Rated 5.0 across 26 Google reviews" | hollister.html:140, 152 | MATCHES VERIFIED FACTS ("26 at 5.0"); source itself is tagged [VERIFY live count] |
| Years in business | "since 2021" | hollister.html:140 | MATCHES VERIFIED FACTS (source itself tagged [VERIFY year]) |
| Geographic claim | "trusted by businesses across Monterey County" | hollister.html:140 | CONTRADICTS — Hollister is in San Benito County, which this same page names explicitly three other times (lines 183, 214, 280); "Monterey County" reads as unlocalized boilerplate copied from a Salinas/Monterey-area page |
| Response time | "Same-day remote support; on-site within 24–48 hours" | hollister.html:149 (key-facts block) | MATCHES the "same day" framing used elsewhere, but see the "same hour" contradiction below |
| Direct phone line | (831) 204-0501 | hollister.html:153 | MATCHES |
| Response time | "most issues resolved remotely the same hour" | hollister.html:183 | CONTRADICTS — page states "same day" elsewhere (lines 149, 278, 280); internal inconsistency on response time |
| Managed IT capability | "24/7 monitoring, helpdesk, patching, and a real engineer who answers the phone" | hollister.html:162 | MATCHES (maps to MDR w/24/7 SOC + patching capabilities) |
| Cybersecurity capability | "Endpoint protection, MFA, immutable backups, audits" | hollister.html:165 | MATCHES broadly; "immutable" backup qualifier is UNVERIFIABLE — VERIFIED FACTS states only "cloud backup," with no immutability claim |
| Manufacturing IT capability | "CMMC compliance prep for defense subcontractors" | hollister.html:168 | CONTRADICTS — not present in the VERIFIED FACTS capabilities list; VERIFIED FACTS instructs "do not claim ... anything not listed" — VERIFY WITH ULI |
| Industries served | "Healthcare and dental" | hollister.html:198 | CONTRADICTS — VERIFIED FACTS: "Excluded vertical: dentists. Dental must not appear as a client or target industry anywhere." HOUSE-RULE VIOLATION |
| Response time | "most issues fixed remotely the same hour" | hollister.html:267 | CONTRADICTS — same internal same-hour/same-day inconsistency as line 183 |
| Cloud & M365 capability | "SharePoint, Teams, and Azure for Hollister businesses" | hollister.html:264 | CONTRADICTS/UNVERIFIABLE — Azure is not in the VERIFIED FACTS capability list (which covers M365 + Intune + Defender for Business + Conditional Access, and Google Workspace as IdP only) — VERIFY WITH ULI |
| Web design pricing | "published pricing from $1,800" | hollister.html:265 | UNVERIFIABLE — no web-design pricing appears anywhere in VERIFIED FACTS (only MSP plan/onboarding pricing is listed) — VERIFY WITH ULI |
| Backup & DR capability | "Immutable, tested backups" | hollister.html:268 | UNVERIFIABLE (same immutability-qualifier issue as line 165) |
| Founder background | "Built by an engineer from the federal contracting world." | hollister.html:424 (footer) | MATCHES VERIFIED FACTS (sole engineer, DoD/federal contractor infrastructure experience) |
| Tagline | "Government-grade IT for small business." | hollister.html:300 (footer) | MATCHES (marketing framing consistent with DoD-experience fact) |

Claim count: 24. Contradiction count: 7 (rows: JSON-LD provider mismatch, Monterey County claim, "same hour" x2, CMMC capability, dental, Azure capability). Unverifiable count: 4 (areaServed cities, immutable backups x2, web design pricing).

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | hollister.html:144-155 — all four elements present (service area, "Led by" engineer, response time, pricing link) |
| FAQ present with real question-and-answer text | Pass | hollister.html:273-283 — 7 FAQ items with full answer text, plus matching JSON-LD FAQPage |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (134) + lead paragraph (135) + "What we do for Hollister businesses" section (159-170) plainly state the service offer well within the first 300 words |
| Exactly one H1 | Pass | Single `<h1>` at hollister.html:134; confirmed no others in the file |
| Title, meta description, canonical present | Pass | hollister.html:6, 7, 8 |
| JSON-LD present (list which types) | Pass, with defects | LocalBusiness, BreadcrumbList, FAQPage (hollister.html:36-51), and Service (hollister.html:55-75). Defects: (1) Service.provider `@id` at line 66 does not match the LocalBusiness `@id` at line 39 (broken reference); (2) the visible FAQ has 7 Q&As including a pricing question (line 279) but the JSON-LD FAQPage only lists 6 — the pricing FAQ is missing from structured data |
| Content that exists only inside JS | Pass (none found) | All key content (at-a-glance, FAQ, services) is present directly in the HTML, not injected by JS |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist anywhere on this page |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the file |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner markup (hollister.html:80) sits in the DOM before `<nav>` (81) and `<main>` (130) |
| Internal links to pricing and to the relevant city or vertical pages | Pass | /pricing linked at lines 150, 279, and in nav; vertical pages /manufacturing-it-services and /agriculture-it-services at lines 168/247; city pages /salinas, /gilroy, /watsonville, /san-jose at lines 203-207 |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental appears as a target industry ("Healthcare and dental") — excluded vertical | hollister.html:198 |
| Unlisted capability: "CMMC compliance prep for defense subcontractors" not in VERIFIED FACTS capabilities list | hollister.html:168 |
| Unlisted capability: "Azure" not in VERIFIED FACTS capabilities list (only M365/Intune/Defender/Conditional Access and Google Workspace IdP are verified) | hollister.html:264 |

No em dashes (plain or URL-encoded), Cisco certification claims, vendor names (Microsoft/Google product names used are pre-approved by VERIFIED FACTS itself), clearance-level statements, or SIEM claims were found on this page.

## Top Three Fixes
1. Remove "Healthcare and dental" from the Industries list (hollister.html:198) — dentists are an explicitly excluded vertical per VERIFIED FACTS; this is the clearest and most direct house-rule violation on the page.
2. Resolve the response-time contradiction: lines 183 and 267 claim "most issues resolved/fixed remotely the same hour" while the key-facts block and FAQ (lines 149, 278, 280) claim "same day." VERIFY WITH ULI which is accurate and make the wording consistent across the page.
3. VERIFY WITH ULI (and remove if not accurate) the two unlisted-capability claims — "CMMC compliance prep for defense subcontractors" (line 168) and "Azure" (line 264) — neither appears in the VERIFIED FACTS capabilities list, which explicitly instructs not to claim capabilities that aren't listed.

Additional lower-priority items worth a look: the JSON-LD Service node's `provider` reference at line 66 points to an `@id` that doesn't exist on this page (should be `https://ghosxt.com/hollister#business`), and the hero trust line at line 140 claims trust "across Monterey County" though this page is otherwise consistently framed around Hollister/San Benito County (lines 183, 214, 280).
