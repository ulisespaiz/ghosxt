# Page Audit: /it-help-prunedale

## Route
/it-help-prunedale (file: it-help-prunedale.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Service area / city | Prunedale, CA, contained in Monterey County | it-help-prunedale.html:46 (JSON-LD areaServed), 216-217 (H1/lead) | MATCHES (correct geography) |
| Civic fact | Prunedale "has no downtown and no IT firm of its own" / "unincorporated community" | it-help-prunedale.html:217, 258 | UNVERIFIABLE (plausible, publicly-known fact that Prunedale is unincorporated, but not confirmed in VERIFIED FACTS - low-risk, flag for awareness only) |
| Business base location | "Ghosxt is based minutes away in Salinas" | it-help-prunedale.html:217, 258-259, 287 | MATCHES (VERIFIED FACTS: based in Salinas, CA) |
| Engineer background | "an engineer with DoD infrastructure experience" | it-help-prunedale.html:13, 19, 44 | MATCHES (VERIFIED FACTS) |
| Staffing model | "just a senior engineer and a help desk" | it-help-prunedale.html:236, 259 | MATCHES (sole engineer, VERIFIED FACTS) |
| Verticals served | Contractors, trades, growers/nurseries, auto/equipment shops, retail, family businesses | it-help-prunedale.html:64 (JSON-LD FAQ), 217, 258 | UNVERIFIABLE (no excluded vertical present; no contradiction - VERIFY WITH ULI on actual client mix) |
| Capability claim | Support for "mobile devices, email, and access your team uses on job sites and in trucks" | it-help-prunedale.html:80 (FAQ) | UNVERIFIABLE (generic end-user/mobile support claim; does not clearly exceed the listed capability set, no contradiction) |
| Pricing | "flat per-user managed plans with a Tiny Team option for the smallest businesses" | it-help-prunedale.html:88 (FAQ) | MATCHES (VERIFIED FACTS: Tiny Team $600/mo flat for 1-4 users; Core/Secure Growth/Compliance & Continuity are per-user plans - no incorrect figures stated on this page) |
| On-site response time | "same-day or next-day for non-emergencies" | it-help-prunedale.html:72, 251, 287 | UNVERIFIABLE (beyond the 4-hour critical-incident SLA, not otherwise documented in VERIFIED FACTS - VERIFY WITH ULI) |
| Nearby coverage | Monterey County, Salinas, Marina, Monterey, Watsonville | it-help-prunedale.html:295 | MATCHES geographically; all linked pages exist |
| Company tagline / background | "Government-grade IT for small business" / "Built by an engineer from the federal contracting world" | it-help-prunedale.html:351, 475 | MATCHES |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | Same template gap as all 5 pages. |
| FAQ present with real question-and-answer text | Pass | 4 real, page-specific Q&A pairs (61-91 JSON-LD, 302-317 visible), matched word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero lead (217) + pricing callout (228) + intro section (258-259) state the offer early. |
| Exactly one H1 | Pass | Line 216 only. |
| Title, meta description, canonical present | Pass | Lines 6, 7, 8. |
| JSON-LD present (list which types) | Pass | Service, BreadcrumbList, FAQPage. |
| Content that exists only inside JS | Pass (none found) | Static HTML, native `<details>` FAQ. |
| Icon-only table cells | Pass (N/A) | No tables. |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` in file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner and full nav precede `<main>`, identical to template baseline. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | /pricing, /monterey-county, /salinas, /marina, /monterey, /watsonville, plus standard service links; footer carries the full vertical list. No in-body link to /agriculture-it-services despite growers/nurseries framing (minor gap). |

## House-Rule Violations
None found on this page. Checked for: em dash (- and %E2%80%94), Cisco, dental/dentist, DoD clearance level, vendor names, SIEM/unlisted capabilities - no matches.

## Top Three Fixes
1. Add a scannable at-a-glance block (service area, who you talk to, response time, pricing link) - template-wide gap.
2. Confirm the "same-day or next-day on-site / same business day remote" response-time language against actual practice, since VERIFIED FACTS only documents a 4-hour critical-incident notification SLA.
3. Lightly verify the "unincorporated community, no downtown, no IT firm of its own" characterization (line 217, 258) with Uli - plausible but not sourced in VERIFIED FACTS.
