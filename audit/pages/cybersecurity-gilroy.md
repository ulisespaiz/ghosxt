# Page Audit: /cybersecurity-gilroy

## Route
/cybersecurity-gilroy (file: cybersecurity-gilroy.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Google review count/rating | "5.0" across "26 Google reviews" | line 228 (hero trust callout), line 241 (key-facts) | MATCHES (VERIFIED FACTS: "26 at 5.0 as of August 2026 [VERIFY live count]" - source flagged [VERIFY], recommend live-count refresh) |
| Engineer background | "An engineer with DoD infrastructure experience" (repeated: lines 217, 237, 291, 338) | multiple | MATCHES (VERIFIED FACTS: "prior DoD/federal contractor infrastructure experience"). No clearance level stated - compliant. |
| Response time SLA | "Same-day remote support; on-site within 24–48 hours" | line 238 (key-facts) | UNVERIFIABLE - not itemized as such in VERIFIED FACTS contracted deliverables. VERIFY WITH ULI. |
| On-site turnaround (body copy) | "same-day or next-day for non-emergencies, with immediate remote response for anything urgent" | line 310 | UNVERIFIABLE - plausible but not an exact match to the key-facts 24–48hr figure or to the 4-hour critical-incident notification SLA in VERIFIED FACTS. |
| Capability: EDR with 24/7 SOC | "Huntress EDR with a 24/7 SOC" | line 262 | CONTRADICTS house rule - names a vendor ("Huntress"). VERIFIED FACTS: "describe these; never publish vendor names." The underlying capability (managed detection and response with a 24/7 SOC) itself MATCHES the approved capability list; the vendor name does not belong on the page. |
| Capability: Phishing-resistant MFA / Conditional Access | line 266 | MATCHES capability list |
| Capability: Immutable backup | "Our backups are immutable and stored off the production network" | line 278 | UNVERIFIABLE - VERIFIED FACTS lists "cloud backup for Microsoft 365 and Google Workspace" without confirming immutability. VERIFY WITH ULI. |
| Capability: Network/OT segmentation | "network segmentation," full "OT & Network Segmentation" service card | lines 251, 257–258, 273–275, JSON-LD line 44, FAQ lines 319, 323 | CONTRADICTS house rule - network/OT segmentation is not on the VERIFIED FACTS capabilities list ("Do not claim ... anything not listed"). Treat as an unlisted capability pending confirmation. |
| Capability: Vulnerability management | "vulnerability management" | JSON-LD Service description, line 44 | CONTRADICTS house rule - not on the VERIFIED FACTS capabilities list (patching is listed; "vulnerability management" as a distinct service is not). |
| Pricing | "our pricing is published upfront" (FAQ, links to /pricing) | line 331 | MATCHES general structure; no specific dollar figures stated on-page to check against the published tiers. |
| No Cisco certification claimed | - | whole page | MATCHES (no Cisco mention - compliant) |
| No dental/dentist vertical | - | whole page | MATCHES (not present - compliant) |
| No clearance level stated | - | whole page | MATCHES (compliant; only "DoD infrastructure experience" used) |
| No SIEM claimed | - | whole page | MATCHES (term "SIEM" does not appear - compliant) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` (lines 233–244): Service area, Led by, Response, Pricing (links /pricing), Free, Rated, Direct line. |
| FAQ present with real question-and-answer text | Pass | 4 `<details>` items (lines 317–332) with real text, mirrored in FAQPage JSON-LD. |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero `<p class="lead">` (line 217) states the offer plainly. |
| Exactly one H1 | Pass | One `<h1>` at line 216. |
| Title, meta description, canonical present | Pass | Lines 6, 7, 8. |
| JSON-LD present (list which types) | Pass | Service, BreadcrumbList, FAQPage (lines 39, 49, 57). Same dangling `#business` @id reference as sibling pages. |
| Content that exists only inside JS | Pass (none found) | All visible content is server-rendered HTML. |
| Icon-only table cells | Pass (N/A) | No `<table>` elements on this page. |
| display:none on crawlable content | Pass (none found) | No inline `display:none` in the file; linked CSS not audited (out of scope). |
| Cookie banner or duplicated nav before main content in the DOM | **Fail** | Cookie banner (`#cookieBanner`, lines 106–120) precedes `<nav>` (121) and `<main>` (210) in DOM order. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (229), /gilroy, /cybersecurity, /cloud-services-gilroy, /managed-it-services, /help-desk-it-support, /backup-disaster-recovery, /hollister, /san-jose, /salinas, /watsonville, /agriculture-it-services, /trucking-it-services, /manufacturing-it-services (lines 278, 282, 302, 309–310, 270, 274). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Vendor name ("Huntress EDR") | line 262 |
| Unlisted capability: network/OT segmentation | lines 251, 257–258, 273–275 (service card "OT & Network Segmentation"), JSON-LD line 44, FAQ lines 319, 323 |
| Unlisted capability: "vulnerability management" | JSON-LD Service description, line 44 |

## Top Three Fixes
1. Remove "Huntress" from line 262 - describe the capability generically ("managed EDR with a 24/7 SOC") per VERIFIED FACTS, which explicitly bars vendor names.
2. Resolve network/OT segmentation and "vulnerability management": either get these added to VERIFIED FACTS as confirmed capabilities, or strip them from the page (service card, body copy, FAQ answer, and JSON-LD description all currently claim them).
3. Move the cookie banner after `<main>` in DOM order, and confirm the "immutable" backup claim and the stated response-time SLA with Uli.
