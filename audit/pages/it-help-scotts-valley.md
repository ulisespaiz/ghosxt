# Page Audit: /it-help-scotts-valley

## Route
/it-help-scotts-valley (file: it-help-scotts-valley.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Service area / city | Scotts Valley, CA, contained in Santa Cruz County | it-help-scotts-valley.html:46 (JSON-LD areaServed), 216-217 (H1/lead) | MATCHES (correct geography) |
| Business base / coverage | "Based on the Central Coast... covering the Santa Cruz area and the Highway 17 corridor" | it-help-scotts-valley.html:287 | MATCHES (VERIFIED FACTS: based in Salinas, CA, which is Central Coast) |
| Engineer background | "an engineer with DoD infrastructure experience" | it-help-scotts-valley.html:13, 19, 44 | MATCHES (boilerplate meta/JSON-LD; not restated in the visible lead paragraph on this page) |
| Named local companies | "the town was once home to Borland Software and Seagate Technology, and current employers like Ichor Systems and Threshold Enterprises" | it-help-scotts-valley.html:235 | UNVERIFIABLE (unsourced third-party historical/company claims, not in VERIFIED FACTS, presented as local-economy backdrop not as Ghosxt clients - VERIFY WITH ULI before publishing) |
| Verticals served | Technology firms, manufacturers, professional offices, medical offices | it-help-scotts-valley.html:64 (JSON-LD FAQ), 235, 545 | MATCHES/no contradiction - only "dentists" is an excluded vertical per VERIFIED FACTS; general medical offices are served elsewhere on the site (footer links to /healthcare-it-services), so this is fine |
| Staffing model | "escalates quickly to a senior engineer instead of reading from a script... You get peers, not gatekeepers" | it-help-scotts-valley.html:72 (JSON-LD FAQ), ~308 (visible) | MATCHES (sole engineer, VERIFIED FACTS) |
| Response time - remote resolution (FAQ) | "Most issues are solved remotely the same business day" | it-help-scotts-valley.html:88 (JSON-LD FAQ), ~316 (visible) | UNVERIFIABLE (not in VERIFIED FACTS beyond the 4-hour critical-incident SLA) |
| Response time - remote resolution (body) | "most issues resolved remotely the same hour" | it-help-scotts-valley.html:287 | **Internal inconsistency** - contradicts this same page's own FAQ claim of "same business day" (line 88/316). Neither figure is documented in VERIFIED FACTS. Flag both for verification and reconciliation. |
| On-site response time | "same-day or next-day for non-emergencies" | it-help-scotts-valley.html:88, 251, 287 | UNVERIFIABLE |
| Nearby coverage | Santa Cruz County, Santa Cruz, Watsonville, San Jose | it-help-scotts-valley.html:295 | MATCHES geographically; all linked pages exist |
| Pricing | No specific pricing claim on this page beyond the standard "pricing published upfront" callout | it-help-scotts-valley.html:228 | MATCHES (generic, links to /pricing; no page-specific FAQ pricing claim here, unlike the other 4 pages) |
| Company tagline / background | "Government-grade IT for small business" / "Built by an engineer from the federal contracting world" | it-help-scotts-valley.html:351, 475 | MATCHES |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | Same template gap as all 5 pages. |
| FAQ present with real question-and-answer text | Pass | 4 real, page-specific Q&A pairs (61-91 JSON-LD, 302-317 visible), matched word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero lead (217) + pricing callout (228) + intro section (235-236) state the offer early. |
| Exactly one H1 | Pass | Line 216 only. |
| Title, meta description, canonical present | Pass | Lines 6, 7, 8. |
| JSON-LD present (list which types) | Pass | Service, BreadcrumbList, FAQPage. |
| Content that exists only inside JS | Pass (none found) | Static HTML, native `<details>` FAQ. |
| Icon-only table cells | Pass (N/A) | No tables. |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` in file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner and full nav precede `<main>`, identical to template baseline. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | /pricing, /santa-cruz-county, /santa-cruz, /watsonville, /san-jose, plus standard service links; footer carries the full vertical list. |

## House-Rule Violations
None found on this page. Specifically checked and cleared the two grep signals flagged for this page:
- **"dental" signal**: both matches are false positives from the word "**acci-dental**" - line 217 ("...free the owner from being the accidental IT department") and line 258 (`<h3>Free the Accidental IT Owner</h3>`). Neither references dentistry; no actual dental/dentist content exists on this page.
- **Vendor-name signal ("keeper")**: false positive from the word "gate**keeper**s" at line 72 (JSON-LD) and ~308 (visible FAQ): "You get peers, not gatekeepers." No reference to the password-manager vendor Keeper.

Also checked and clear: em dash (- and %E2%80%94), Cisco, DoD clearance level, other vendor names, SIEM - no matches.

## Top Three Fixes
1. Reconcile the "resolved remotely the same hour" claim (line 287) with the "same business day" claim used in this page's own FAQ (line 88/316) and on all 4 sibling pages - an internal inconsistency, not just an unverified figure.
2. Verify the named-company claims (Borland Software, Seagate Technology, Ichor Systems, Threshold Enterprises) with Uli before publishing.
3. Add a scannable at-a-glance block (template-wide gap).
