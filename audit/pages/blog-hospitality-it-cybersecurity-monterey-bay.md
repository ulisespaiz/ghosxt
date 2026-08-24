# Page Audit: /blog/hospitality-it-cybersecurity-monterey-bay.html

## Route
/blog/hospitality-it-cybersecurity-monterey-bay.html

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Cert count in author bio | "9 certifications including CySA+, Security+, and AZ-104" | line 194 | MATCHES |
| Prior role / track record | "Senior Solutions Consultant for the DoD," "40+ Central Coast businesses" | line 194 | UNVERIFIABLE |
| Realistic monthly IT budget for a single-location hospitality business | "$2,700 to $4,000 per month" for ~10 users, itemized incl. "Managed IT... 10 users × $150–$200 = $1,500–$2,000" and "MDR / managed security: 10 users × $25 = $250" as a separate line | lines 369-378 | CONTRADICTS published pricing structure (tiers are $125/$175/$250 per user/month, all-inclusive; VERIFIED FACTS does not describe a separate stand-alone MDR per-user fee, and $150–$200 does not align to a specific published tier) |
| "dental" false-positive check | grep hit was "accidental[ly]" (line 294), not the word "dental" | line 294 | Not a violation — false positive, no dental client/vertical language present |

## Legibility Checklist (blog-adapted)
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | line 189 |
| Visible publish date | Pass | "June 19, 2026" (line 181) |
| BlogPosting JSON-LD: datePublished, dateModified, author as Person | Pass | lines 47-50 |
| Exactly one H1 | Pass | line 187 |
| Title, meta description, canonical present | Pass | lines 6-8 |
| FAQ JSON-LD matching visible text | Pass | 6 Q&As in schema (lines 63-116) match 6 visible FAQs (lines 404-420) |
| Internal links to relevant service pages | Pass | /hospitality-it-services, /cybersecurity, /network-design plus cross-links |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Security-stack vendor names published as recommended firewall brands ("A real firewall (Fortinet, Sophos, Palo Alto, or a managed Meraki)") | line 341 |

Note: the extensive POS/PMS/booking-platform vendor names (Toast, Square, OpenTable, Oracle OPERA, Commerce7, etc.) describe the client's own existing third-party tools, not Ghosxt's security stack, and the page explicitly states "We do not resell these platforms" (line 262) — not flagged as a violation.

## Top Three Fixes
1. Remove the specific firewall vendor names (Fortinet, Sophos, Palo Alto, Meraki) from the recommended-stack line; describe "a real business-grade firewall" generically per VERIFIED FACTS.
2. Reconcile the "$150–$200/user managed IT + separate $25/user MDR" budget breakdown with the published tier pricing (or clarify it is an independent illustrative estimate, not a Ghosxt quote).
3. Tag or verify the "Senior Solutions Consultant for the DoD" / "40+ Central Coast businesses" bio claims.
