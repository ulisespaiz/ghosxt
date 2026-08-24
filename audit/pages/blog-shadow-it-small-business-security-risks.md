# Page Audit: /blog/shadow-it-small-business-security-risks

## Route
/blog/shadow-it-small-business-security-risks.html

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Author certifications | "9 certifications including CySA+, Security+, and AZ-104" | author-bio-box | MATCHES |
| Years of experience | "10+ years in IT infrastructure and cybersecurity" | author-bio-box | UNVERIFIABLE [VERIFY] |
| Prior role | "Senior Solutions Consultant for the DoD" | author-bio-box | UNVERIFIABLE [VERIFY] |
| Client count | "built security programs for 40+ Central Coast businesses" | author-bio-box | UNVERIFIABLE [VERIFY] |
| Statistic | "average small business employee now uses seven to ten work-related SaaS apps that IT does not know about. That number has roughly doubled since... 2024" | body | UNVERIFIABLE [VERIFY] — specific statistic with no cited source, house rule bars inventing numbers |
| DoD comparison | "I have seen this vector used in small business incident response cases and in DoD security reviews" | body | UNVERIFIABLE (unsourced anecdote, consistent with general DoD-experience claim but not independently verifiable) |
| Microsoft Copilot data-handling claim | "Microsoft Copilot, for example, includes data processing agreements that keep your data out of model training" | body + FAQ | Product claim, not a Ghosxt capability — informational, not a house-rule vendor-name violation (Microsoft 365/Copilot are explicitly named in VERIFIED FACTS) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming author | Pass | |
| Visible publish date | Pass | "June 29, 2026" |
| BlogPosting JSON-LD: datePublished, dateModified, author as Person | Pass | Dates match (2026-06-29) |
| Exactly one H1 | Pass | |
| Title, meta description, canonical | Pass | |
| FAQ JSON-LD matching visible text | **FAIL** | Page has a 5-question FAQPage JSON-LD block, but the rendered body has NO visible FAQ section — structured data does not match visible content |
| Internal links to relevant service pages | Pass | Links to /managed-it-services (2x) and /cybersecurity, plus /contact |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Author-bio numbers not traceable to VERIFIED FACTS | author-bio-box |
| None else found (no em dash, no Cisco, no dental, no vendor name, no clearance level, no SIEM, no price contradiction) | — |

## Top Three Fixes
1. **Fix the FAQ JSON-LD mismatch** — either add a visible "FAQs" section to the body matching the 5 JSON-LD questions/answers, or remove the FAQPage schema.
2. Source or remove the unverified statistic ("seven to ten SaaS apps... roughly doubled since 2024") — no citation, and the house rules bar inventing numbers.
3. Verify or soften the shared author-bio's unverified specifics (10+ years, DoD title, 40+ businesses).
