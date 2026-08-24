# Page Audit: /it-help-greenfield

## Route
/it-help-greenfield (file: it-help-greenfield.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Service area / city | Greenfield, CA, contained in Monterey County | it-help-greenfield.html:46 (JSON-LD areaServed), 216-217 (H1/lead) | MATCHES (correct geography; Salinas-based provider serving Monterey County is consistent with VERIFIED FACTS) |
| Business base location | "Ghosxt is based up the valley in Salinas" | it-help-greenfield.html:217, 287, 295 | MATCHES (VERIFIED FACTS: Based in Salinas, CA) |
| Engineer background | "an engineer with DoD infrastructure experience" | it-help-greenfield.html:13, 19, 44 (meta/JSON-LD) | MATCHES (VERIFIED FACTS: prior DoD/federal contractor infrastructure experience; no clearance level stated) |
| Staffing model | "just a senior engineer and a help desk" / single point of contact | it-help-greenfield.html:236, 276 | MATCHES (VERIFIED FACTS: sole engineer, Ulises Paiz) |
| Verticals served | Growers, wineries, processors, vineyards, row-crop agriculture, packing | it-help-greenfield.html:64 (JSON-LD FAQ), 217, 235 | UNVERIFIABLE (wineries explicitly allowed per VERIFIED FACTS; agriculture verticals are not enumerated or excluded, no contradiction, but client base is not confirmed — VERIFY WITH ULI) |
| Regional statistic | "the Salinas Valley the source of roughly 60% of U.S. leaf lettuce" | it-help-greenfield.html:235 | UNVERIFIABLE (not in VERIFIED FACTS; unsourced third-party statistic — VERIFY WITH ULI or cite a source) |
| Also serves | Soledad, King City (unlinked, plain text) | it-help-greenfield.html:72, 287, 295 | UNVERIFIABLE (plausible extension of Salinas-based coverage, not confirmed in VERIFIED FACTS, no contradiction) |
| On-site response time | "same-day or next-day for non-emergencies" | it-help-greenfield.html:88 (JSON-LD), 251, 287, 316 | UNVERIFIABLE (VERIFIED FACTS only documents a 4-hour notification SLA for critical incidents; this general non-emergency response-time claim is not separately confirmed — VERIFY WITH ULI) |
| Remote resolution time | "Most issues are resolved remotely the same business day" | it-help-greenfield.html:88, 287, 316 | UNVERIFIABLE (not in VERIFIED FACTS — VERIFY WITH ULI) |
| Pricing | "Help desk and IT support are built into every managed plan: pricing published upfront" | it-help-greenfield.html:228, 312 | MATCHES (VERIFIED FACTS confirms a published, flat-rate/per-user pricing structure exists; no specific dollar figures stated on this page) |
| Company tagline | "Government-grade IT for small business" | it-help-greenfield.html:351 | UNVERIFIABLE (marketing tagline, loosely tied to DoD/federal background; not a hard factual claim, no direct contradiction) |
| Company background | "Built by an engineer from the federal contracting world" | it-help-greenfield.html:475 | MATCHES (VERIFIED FACTS: prior DoD/federal contractor infrastructure experience) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No dedicated scannable block. The four elements exist but are scattered across the hero lead paragraph, a one-line pricing callout (228), and later prose sections — not presented as a single at-a-glance unit. |
| FAQ present with real question-and-answer text | Pass | 4 real Q&A pairs, present both in JSON-LD FAQPage (61-91) and as visible `<details>/<summary>` (302-317), text matches word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero lead (217) + pricing callout (228) + "What IT help looks like" intro (235-236) clearly state the help desk / IT support / on-site offer well within the first 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at line 216; all other headings are H2/H3. |
| Title, meta description, canonical present | Pass | Lines 6, 7, 8. |
| JSON-LD present (list which types) | Pass | Service (39), BreadcrumbList (48), FAQPage (56) — lines 34-95. |
| Content that exists only inside JS | Pass (none found) | Page is static HTML; FAQ uses native `<details>`; no content is injected client-side. main.min.js only drives cookie banner / mobile menu / scroll-to-top interactivity. |
| Icon-only table cells | Pass (N/A) | No `<table>` elements on the page. |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences anywhere in the file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (106-120) and the full `<nav>` (121-208) both precede `<main id="main-content">` (210) in DOM order. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (multiple), /monterey-county, /salinas, /help-desk-it-support, /managed-it-services, /cybersecurity, /cloud-services, /backup-disaster-recovery; footer carries the full vertical-page list. No in-body link to /agriculture-it-services despite heavy agriculture framing (minor gap). |

## House-Rule Violations
None found on this page. Checked for: em dash (— and %E2%80%94), Cisco, dental/dentist, DoD clearance level, vendor names, SIEM/unlisted capabilities — no matches.

## Top Three Fixes
1. Add a real at-a-glance block (service area, who you talk to, response time, pricing link) near the top of the page instead of leaving those facts scattered through prose — this is the main AI-search legibility gap and applies to all 5 templated pages.
2. Source or remove the "~60% of U.S. leaf lettuce" statistic (line 235) — it is not in VERIFIED FACTS and is currently an unsourced claim.
3. Confirm the "same-day or next-day on-site / same business day remote" response-time language against actual practice — VERIFIED FACTS only documents a 4-hour notification SLA for critical incidents, not a general response-time commitment.
