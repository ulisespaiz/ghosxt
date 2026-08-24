# Page Audit: /blog/fbi-silent-ransom-group-law-firms-2026.html

## Route
/blog/fbi-silent-ransom-group-law-firms-2026.html

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Cert count in author bio | "9 certifications including CySA+, Security+, and AZ-104" | line 194 | MATCHES |
| Prior role / track record | "Senior Solutions Consultant for the DoD," "40+ Central Coast businesses" | line 194 | UNVERIFIABLE |
| Target-industry list for this attack pattern | "accounting and tax firms, real estate and title offices, insurance agencies, medical and dental practices, and consultancies" | JSON-LD line 102, body line 246, visible FAQ line 327 | CONTRADICTS house rule (dental listed as in-scope client/target vertical, see violations) |

## Legibility Checklist (blog-adapted)
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | line 189 |
| Visible publish date | Pass | "May 27, 2026" (line 181) |
| BlogPosting JSON-LD: datePublished, dateModified, author as Person | Pass | lines 47-50 |
| Exactly one H1 | Pass | line 187 |
| Title, meta description, canonical present | Pass | lines 6-8 |
| FAQ JSON-LD matching visible text | Pass | 6 Q&As in schema (lines 63-114) match 6 visible FAQs (lines 314-330) |
| Internal links to relevant service pages | Pass | /professional-services-it plus cross-links |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental listed as an in-scope target/client vertical ("medical and dental practices" among businesses invited to "read 'law firm' below as 'your firm'" and book an assessment) | JSON-LD FAQ answer line 102; body paragraph line 246; visible FAQ line 327 |

## Top Three Fixes
1. Remove "dental" from the professional-services target-industry list in all three locations (JSON-LD, body, visible FAQ) — excluded vertical per house rules.
2. Tag or verify the "Senior Solutions Consultant for the DoD" / "40+ Central Coast businesses" bio claims.
3. None otherwise; rest of page (FAQ schema, structure) is clean.
