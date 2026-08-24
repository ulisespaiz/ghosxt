# Page Audit: /blog/identity-hardening-small-business-5-employees-microsoft-365.html

## Route
/blog/identity-hardening-small-business-5-employees-microsoft-365.html

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Cert count in author bio | "9 certifications including CySA+, Security+, and AZ-104" | line 198 | MATCHES |
| Prior role / track record | "Senior Solutions Consultant for the DoD," "40+ Central Coast businesses" | line 198 | UNVERIFIABLE |
| M365 Business Premium cost reference | "approximately $22 per user per month" | lines 98, 214, 289, 326 | Not a Ghosxt price — Microsoft's own SKU price cited as a cost input; no contradiction with Ghosxt's published tiers |
| Median SMB ransomware IR engagement cost (industry reference) | "$25,000 to $75,000" | line 294 | Not a Ghosxt claim — industry reference, no verification needed |

## Legibility Checklist (blog-adapted)
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | line 193 |
| Visible publish date | Pass | "May 13, 2026" (line 185) |
| BlogPosting JSON-LD: datePublished, dateModified, author as Person | Pass | lines 47-50 |
| Exactly one H1 | Pass | line 191 |
| Title, meta description, canonical present | Pass | lines 6-8 |
| FAQ JSON-LD matching visible text | Partial FAIL | JSON-LD FAQPage has 5 Q&As (lines 76-118); visible FAQ has 6 (adds "What if a user loses their FIDO2 key?" at line 334-335, not in schema) |
| Internal links to relevant service pages | Pass | /cybersecurity, /backup-disaster-recovery plus cross-links |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Security-stack vendor names: FIDO2 hardware-key brands ("YubiKey, Feitian, Token2") published as recommended products | line 240 |
| Security-stack vendor names: just-in-time elevation tools ("CyberArk EPM, AutoElevate, Microsoft's Endpoint Privilege Management") | line 276 |

## Top Three Fixes
1. Remove the specific hardware-key and elevation-tool vendor names (YubiKey/Feitian/Token2, CyberArk EPM/AutoElevate); describe "hardware FIDO2 security keys" and "just-in-time elevation tooling" generically.
2. Add the missing "lost FIDO2 key" FAQ to the FAQPage JSON-LD so schema matches visible content.
3. Tag or verify the "Senior Solutions Consultant for the DoD" / "40+ Central Coast businesses" bio claims.
