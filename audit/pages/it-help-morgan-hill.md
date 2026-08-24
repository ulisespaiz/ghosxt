# Page Audit: /it-help-morgan-hill

## Route
/it-help-morgan-hill (file: it-help-morgan-hill.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Service area / city | Morgan Hill, CA, contained in Santa Clara County | it-help-morgan-hill.html:46 (JSON-LD areaServed), 216-217 (H1/lead) | MATCHES (correct geography) |
| Business base / footprint | Based on the Central Coast in Salinas, "footprint up the 101 corridor" | it-help-morgan-hill.html:287 | MATCHES (VERIFIED FACTS: based in Salinas, CA); note Morgan Hill is roughly 60 miles from Salinas - "footprint" framing is a judgment call, not a factual error |
| Engineer background | "an engineer with DoD infrastructure experience" | it-help-morgan-hill.html:13, 19, 44, 217 | MATCHES (VERIFIED FACTS) |
| Vertical served - dental/medical | "dental and medical practices that cannot see patients when the system is down" | it-help-morgan-hill.html:235 | **CONTRADICTS** (VERIFIED FACTS: "Excluded vertical: dentists. Dental must not appear as a client or target industry anywhere.") |
| Vertical served - dental/medical (service card) | "Practice & Office Uptime" - "Dental, medical, and professional offices in Morgan Hill kept running" | it-help-morgan-hill.html:254-255 | **CONTRADICTS** (same rule, second instance) |
| Named local companies | "Specialized Bicycle Components and Anritsu are both based here" | it-help-morgan-hill.html:235 | UNVERIFIABLE (unsourced third-party claim, not in VERIFIED FACTS; presented as local-economy backdrop, not as Ghosxt clients - VERIFY WITH ULI before publishing) |
| Vertical served - wineries | "wineries along the Santa Clara Valley Wine Trail" | it-help-morgan-hill.html:235 | MATCHES (VERIFIED FACTS: "Wineries are fine") |
| Staffing model | "gets a named engineer" / senior engineer | it-help-morgan-hill.html:80 (FAQ), 236 | MATCHES (sole engineer, VERIFIED FACTS) |
| On-site response time | "same-day or next-day for non-emergencies" | it-help-morgan-hill.html:72, 88 (JSON-LD), 251, 287 | UNVERIFIABLE (not documented beyond the 4-hour critical-incident SLA in VERIFIED FACTS - VERIFY WITH ULI) |
| Pricing | "Pricing is published upfront so there are no surprises" | it-help-morgan-hill.html:88 (FAQ) | MATCHES (VERIFIED FACTS confirms published pricing; no specific figures stated) |
| Nearby coverage | Santa Clara County, Gilroy, San Jose, Hollister, Watsonville | it-help-morgan-hill.html:295 | MATCHES geographically; all linked pages exist |
| Company tagline / background | "Government-grade IT for small business" / "Built by an engineer from the federal contracting world" | it-help-morgan-hill.html:351, 475 | MATCHES (tagline is soft marketing language; federal-contracting line matches VERIFIED FACTS) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | Same template gap as all 5 pages - no dedicated scannable block. |
| FAQ present with real question-and-answer text | Pass | 4 real, page-specific Q&A pairs (61-91 JSON-LD, 302-317 visible), matched word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero lead (217) + pricing callout (228) + intro section (235-236) state the offer early. |
| Exactly one H1 | Pass | Line 216 only. |
| Title, meta description, canonical present | Pass | Lines 6, 7, 8. |
| JSON-LD present (list which types) | Pass | Service, BreadcrumbList, FAQPage. |
| Content that exists only inside JS | Pass (none found) | Static HTML, native `<details>` FAQ. |
| Icon-only table cells | Pass (N/A) | No tables. |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` in file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner and full nav precede `<main>`, identical to template baseline. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | /pricing, /santa-clara-county, /gilroy, /san-jose, /hollister, /watsonville, plus standard service links; footer carries the full vertical list. No in-body link to /healthcare-it-services despite the medical/dental framing (moot once dental references are removed). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| "dental" used as a served/target vertical ("dental and medical practices that cannot see patients when the system is down") | it-help-morgan-hill.html:235 |
| "dental" used again in service-card copy ("Dental, medical, and professional offices in Morgan Hill kept running") | it-help-morgan-hill.html:254-255 |

Checked and clear: em dash (- and %E2%80%94), Cisco, DoD clearance level, vendor names, SIEM/unlisted capabilities - no matches.

## Top Three Fixes
1. **Remove "dental" entirely.** Rewrite line 235 to drop "dental and medical practices" (keep "medical" and "professional offices" if desired - healthcare generally is not excluded, only dentists), and rewrite the "Practice & Office Uptime" card headline and body (254-255) to remove "Dental," from the list. This is a direct, repeated violation of the excluded-vertical rule.
2. Verify the "Specialized Bicycle Components and Anritsu are both based here" claim (line 235) with Uli before publishing - it is an unsourced third-party company claim not present in VERIFIED FACTS.
3. Add a scannable at-a-glance block (template-wide gap, see checklist).
