# Page Audit: /blog/silent-ransom-group-fake-it-workers-in-person-access-smb-2026

## Route
/blog/silent-ransom-group-fake-it-workers-in-person-access-smb-2026.html

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Author certifications | "9 certifications including CySA+, Security+, and AZ-104" | author-bio-box | MATCHES |
| Years of experience | "10+ years in IT infrastructure and cybersecurity" | author-bio-box | UNVERIFIABLE [VERIFY] |
| Prior role | "Senior Solutions Consultant for the DoD" | author-bio-box | UNVERIFIABLE [VERIFY] |
| Client count | "built security programs for 40+ Central Coast businesses" | author-bio-box | UNVERIFIABLE [VERIFY] |
| Threat intelligence claims (Silent Ransom Group / Luna Moth, Mandiant, FBI warnings, quotes) | Detailed attribution and quotes | body + FAQ | Not a Ghosxt-specific claim; external attributed reporting, outside VERIFIED FACTS scope, not independently verified here |
| "Dozens of firms were hit from January through May 2026" | Specific claim | quickfix aside | UNVERIFIABLE [VERIFY] — no citation given |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming author | Pass | |
| Visible publish date | Pass | "June 6, 2026" |
| BlogPosting JSON-LD: datePublished, dateModified, author as Person | Pass | Dates match (2026-06-06) |
| Exactly one H1 | Pass | |
| Title, meta description, canonical | Pass | |
| FAQ JSON-LD matching visible text | Pass | 6 questions in JSON-LD match visible H3/p text verbatim |
| Internal links to relevant service pages | Pass | Links to /cybersecurity (2x) and /managed-it-services in body, plus sibling blog posts |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| "Dental" mentioned as an example vertical facing this attack — borderline: appears in generic educational context listing at-risk business types ("Medical and dental practices, accounting and tax firms, property management companies..."), not framed as a Ghosxt client. Repeated 3x (FAQ schema x2, body x1, FAQ visible x1). Flag for PM review given the house-rule instruction to scan for any dental mention. | FAQ JSON-LD "We're not a law firm..." answer (line 94), body "Not just law firms" section (line 250), visible FAQ answer (line 303) |
| Author-bio numbers not traceable to VERIFIED FACTS | author-bio-box |

## Top Three Fixes
1. **Flag for PM review**: "medical and dental practices" appears as an example at-risk vertical three times. It reads as educational/universal-risk framing (not a client claim), but given the strict house rule ("dental must not appear... anywhere"), recommend either removing "dental" from these lists or confirming with PM that this usage is acceptable.
2. Verify or soften the shared author-bio's unverified specifics (10+ years, DoD title, 40+ businesses).
3. Source or remove the unverified statistic "dozens of firms were hit from January through May 2026" — no citation provided.
