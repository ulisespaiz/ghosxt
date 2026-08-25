# Page Audit: /blog/shadow-ai-employees-chatgpt-data-small-business-2026

## Route
/blog/shadow-ai-employees-chatgpt-data-small-business-2026.html

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Author certifications | "9 certifications including CySA+, Security+, and AZ-104" | author-bio-box | MATCHES |
| Years of experience | "10+ years in IT infrastructure and cybersecurity" | author-bio-box | UNVERIFIABLE [VERIFY] |
| Prior role | "Senior Solutions Consultant for the DoD" | author-bio-box | UNVERIFIABLE [VERIFY] |
| Client count | "built security programs for 40+ Central Coast businesses" | author-bio-box | UNVERIFIABLE [VERIFY] |
| AI tool/product descriptions (ChatGPT Enterprise, Microsoft 365 Copilot) | General product/data-handling claims | body + FAQ | Not a Ghosxt capability claim - subject matter of the article, not "vendor names" for Ghosxt's own security stack |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming author | Pass | |
| Visible publish date | Pass | "June 9, 2026" |
| BlogPosting JSON-LD: datePublished, dateModified, author as Person | Pass | Dates match (2026-06-09) |
| Exactly one H1 | Pass | |
| Title, meta description, canonical | Pass | |
| FAQ JSON-LD matching visible text | Pass | 5 questions in JSON-LD match visible H3/p text verbatim |
| Internal links to relevant service pages | Pass | Links to /it-consulting-vcio and /cybersecurity in body, plus sibling blog posts |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| "Dental" mentioned as an example vertical facing AI/data risk - borderline: appears in a generic, educational list alongside law/accounting/agriculture ("A dental practice drafting a letter that includes patient details"; FAQ: "law firms, medical and dental practices, accounting firms"). Not framed as a Ghosxt client, but repeated 4x and paired with a direct link to a page titled with "medical-dental" in its slug. | body line ~233, FAQ JSON-LD line ~110, FAQ visible text line ~303, and link to `/blog/hipaa-compliant-it-medical-dental-monterey-county` (lines 279 in-body, also in "Where this fits" list) |
| Author-bio numbers not traceable to VERIFIED FACTS | author-bio-box |

## Top Three Fixes
1. **Flag for PM review**: this page links twice to `/blog/hipaa-compliant-it-medical-dental-monterey-county` - a page whose own slug pairs "medical-dental" for "Monterey County," which strongly suggests dental is being marketed as a target vertical elsewhere on the site. VERIFIED FACTS bars dental as a client/target industry anywhere; recommend auditing that linked page directly and deciding whether the in-body "dental" mentions here should be removed or genericized to "medical practices."
2. Verify or soften the shared author-bio's unverified specifics (10+ years, DoD title, 40+ businesses).
3. No other structural issues; FAQ JSON-LD and internal linking to service pages are otherwise solid.
