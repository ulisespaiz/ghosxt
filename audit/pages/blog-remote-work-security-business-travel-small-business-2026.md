# Page Audit: /blog/remote-work-security-business-travel-small-business-2026

## Route
/blog/remote-work-security-business-travel-small-business-2026.html

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Author certifications | "9 certifications including CySA+, Security+, and AZ-104" | author-bio-box | MATCHES |
| Years of experience | "10+ years in IT infrastructure and cybersecurity" | author-bio-box | UNVERIFIABLE [VERIFY] |
| Prior role | "Senior Solutions Consultant for the DoD" | author-bio-box | UNVERIFIABLE [VERIFY] |
| Client count | "built security programs for 40+ Central Coast businesses" | author-bio-box | UNVERIFIABLE [VERIFY] |
| VPN cost | "modern options cost a few dollars per user per month, often bundled into a managed IT plan" | FAQ JSON-LD + likely intended body text | UNVERIFIABLE — generic market claim, does not contradict published pricing tiers |
| Lost laptop example cost | "$1,200 loss" | body | UNVERIFIABLE (illustrative example, not a Ghosxt price) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming author | Pass | |
| Visible publish date | Pass | "July 3, 2026" |
| BlogPosting JSON-LD: datePublished, dateModified, author as Person | Pass | Dates match (2026-07-03) |
| Exactly one H1 | Pass | |
| Title, meta description, canonical | Pass | |
| FAQ JSON-LD matching visible text | **FAIL** | Page has a 3-question FAQPage JSON-LD block, but the rendered body has NO visible FAQ section (no "FAQs" heading, no matching Q&A text anywhere in the HTML body) — structured data does not match visible content |
| Internal links to relevant service pages | Fail | Body has zero links to any service page (no /cybersecurity, /managed-it-services, etc.) — only the CTA button to Calendly |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Author-bio numbers not traceable to VERIFIED FACTS | author-bio-box |
| None else found (no em dash, no Cisco, no dental, no vendor name, no clearance level, no SIEM, no price contradiction) | — |

## Top Three Fixes
1. **Fix the FAQ JSON-LD mismatch** — either add a visible "FAQs" section to the body matching the 3 JSON-LD questions/answers, or remove the FAQPage schema. This is a structured-data/visible-content mismatch that search engines can penalize.
2. Add at least one in-body link to a relevant service page (e.g., /cybersecurity or /managed-it-services) — currently the article has no internal service links at all.
3. Verify or soften the shared author-bio's unverified specifics (10+ years, DoD title, 40+ businesses).
