# Page Audit: /managed-detection-response

## Route
/managed-detection-response (file: managed-detection-response.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/operator is an engineer with DoD infrastructure experience | "an engineer with DoD infrastructure experience" | managed-detection-response.html:13, 19, 44, 223, 228, 240-241; footer:457 | MATCHES |
| Core service: managed detection and response with 24/7 coverage | "24/7 managed detection and response" | managed-detection-response.html:7, 13, 19, 44, 223 (title/meta/og/JSON-LD/hero) | MATCHES (VERIFIED FACTS: "managed detection and response with a 24/7 SOC") |
| "24/7 SIEM correlation" | SIEM named as the underlying technology | managed-detection-response.html:7 (meta description) | CONTRADICTS — VERIFIED FACTS explicitly excludes SIEM: "Do not claim SIEM or anything not listed." |
| "SIEM log correlation, human-reviewed alerts, and threat hunting" | SIEM named | managed-detection-response.html:13 (og:description) | CONTRADICTS |
| "SIEM log correlation across endpoints, network, and cloud" | SIEM named | managed-detection-response.html:44 (JSON-LD Service `description`) | CONTRADICTS |
| "SIEM log correlation, human-reviewed alerts, and real containment action" | SIEM named | managed-detection-response.html:223 (hero `<p class="lead">`, first visible body paragraph) | CONTRADICTS |
| "24/7 SIEM Log Correlation" | Service-card heading naming SIEM as a deliverable | managed-detection-response.html:249 (`<h3>`), 250 (supporting body copy) | CONTRADICTS |
| "Isn't this the same as a SOC? ... MDR delivers the same 24/7 monitoring and response" | SOC-equivalent framing | managed-detection-response.html:75-79 (JSON-LD FAQ), 296-297 (visible FAQ) | MATCHES (24/7 SOC is verified) |
| "Human-Reviewed Alert Triage" | Human analyst reviews flagged activity | managed-detection-response.html:253-254 | MATCHES (consistent with "24/7 SOC" including human review; not separately itemized but not contradicted) |
| "Threat Hunting" | Proactive searches for signs of compromise | managed-detection-response.html:257-258 | UNVERIFIABLE — not itemized in VERIFIED FACTS capability list. VERIFY WITH ULI |
| "Incident Containment" — isolating a device, disabling a compromised account | Specific containment actions taken directly | managed-detection-response.html:261-262; also FAQ at 93-94 (JSON-LD) and 305 (visible) | UNVERIFIABLE — VERIFIED FACTS lists "managed detection and response with a 24/7 SOC" but does not itemize specific containment actions as a deliverable. VERIFY WITH ULI |
| "Compliance-Ready Reporting" naming CMMC, HIPAA, PCI | Monitoring/incident documentation "formatted for" these frameworks | managed-detection-response.html:265-266 | UNVERIFIABLE — VERIFIED FACTS names only "annual independent risk assessment" and "SOC 2 documentation for every platform" as contracted deliverables; CMMC/HIPAA/PCI are not listed. VERIFY WITH ULI |
| "Integration With Existing Tools" — built around existing EDR, firewall, email security | Vendor-agnostic integration claim | managed-detection-response.html:269-270 | UNVERIFIABLE — generic claim, no vendor names used (compliant with house rule), not itemized in VERIFIED FACTS but low-risk. VERIFY WITH ULI |
| Service area: Monterey, Santa Cruz, San Benito, Santa Clara counties + State of California | JSON-LD `areaServed` | managed-detection-response.html:46-51 | MATCHES (consistent with the footer's 11-city service-area list at 476-487, which spans these counties) |
| Business tagline: "Government-grade IT for small business" / "Built by an engineer from the federal contracting world" | Federal/DoD-background positioning | managed-detection-response.html:333, 457 | MATCHES (consistent with "prior DoD/federal contractor infrastructure experience") |
| No pricing figures, testimonials, case examples, or Google review count appear on this page | N/A | — | N/A — nothing to verify; page has no anonymized case examples or testimonials to flag |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No such block exists anywhere on the page. Service area only appears inside JSON-LD (not visible), there is no visible "who you talk to," no response-time statement (the VERIFIED 4-hour notification deliverable is not mentioned), and no pricing link inside the body content. |
| FAQ present with real question-and-answer text | Pass | Four real Q&A pairs, both in JSON-LD FAQPage (managed-detection-response.html:63-98) and as visible `<details>` elements (291-306), text matches word-for-word between the two. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (222) + hero lead paragraph (223) plainly state the offer within the first ~90 words of body copy — though that same sentence is the one carrying the SIEM contradiction (see Claims Table). |
| Exactly one H1 | Pass | Single `<h1>` at line 222. |
| Title, meta description, canonical present | Pass | Title line 6; meta description line 7; canonical line 8. |
| JSON-LD present (list which types) | Pass | One `@graph` block (34-101) containing: `Service`, `BreadcrumbList`, `FAQPage`. |
| Content that exists only inside JS | Pass | No JS-only content found; all visible copy (including FAQ answers) is present in static HTML, duplicated in JSON-LD. |
| Icon-only table cells | N/A / Pass | No `<table>` elements exist on this page. |
| display:none on content that should be crawlable | Pass | No `display:none` occurrences in this HTML file (linked CSS files were not audited per house rules — no CSS changes in scope). |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (112-126) sits in the DOM before `<nav class="navbar">` (127) and before `<main id="main-content">` (216). |
| Internal links to pricing and to the relevant city or vertical pages | Fail | `/pricing` is linked only in the global nav (161), mobile nav (203), and footer (357) — no pricing link inside the body/main content. City links appear only in the generic footer "Service Areas" list (476-487), not contextually placed in body copy. Body does link to related service pages (`/cybersecurity`, `/penetration-testing`, `/zero-trust-security` at line 285) but no vertical-industry pages. |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| SIEM (unlisted capability — VERIFIED FACTS explicitly excludes it) | managed-detection-response.html:7 (meta description), 13 (og:description), 44 (JSON-LD Service `description`), 223 (hero lead paragraph), 249 (`<h3>24/7 SIEM Log Correlation</h3>`) — 5 occurrences |
| Capability not in VERIFIED FACTS: "Threat Hunting" as a named, standalone deliverable | managed-detection-response.html:257-258 |
| Capability not in VERIFIED FACTS: specific incident-containment actions (isolating a device, disabling a compromised account) | managed-detection-response.html:261-262, 305; JSON-LD 93-94 |
| Capability not in VERIFIED FACTS: "Compliance-Ready Reporting" naming CMMC, HIPAA, PCI | managed-detection-response.html:265-266 |

No em dashes, no Cisco/Meraki mentions, no dental/dentist mentions, no vendor/tool-brand names, and no stated clearance level were found on this page.

## Top Three Fixes
1. Remove every instance of "SIEM" (5 occurrences: meta description line 7, og:description line 13, JSON-LD Service `description` line 44, hero lead paragraph line 223, service-card `<h3>` line 249) and replace with VERIFIED FACTS language — "managed detection and response with a 24/7 SOC" / "24/7 human-reviewed monitoring across endpoints, network, and cloud." This is the highest-priority fix: it appears in the `<title>`-adjacent meta description and JSON-LD, so it affects both what users read first and what search/AI crawlers index as the page's core claim.
2. Add a visible at-a-glance block near the top of the page with service area, who the client talks to, response time, and an in-body pricing link — none of these currently appear outside JSON-LD or the global nav/footer.
3. VERIFY WITH ULI the three unlisted-capability claims before publishing: "Threat Hunting" (line 257), the specific containment actions "isolating a device, disabling a compromised account" (lines 261-262, 305), and "Compliance-Ready Reporting" naming CMMC/HIPAA/PCI (lines 265-266) — none are itemized in VERIFIED FACTS' capability or contracted-deliverables lists.

Lower-priority: the cookie banner sits before `<nav>` and `<main>` in the DOM (112-126) — this may be a site-wide template pattern rather than page-specific; and no page body links point to a relevant vertical or city page (only generic footer links).
