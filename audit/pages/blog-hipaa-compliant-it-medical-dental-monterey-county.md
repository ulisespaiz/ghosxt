# Page Audit: /blog/hipaa-compliant-it-medical-dental-monterey-county.html

## Route
/blog/hipaa-compliant-it-medical-dental-monterey-county.html

## Overview
This entire page is built around "medical and dental practices" as Ghosxt's target industry and client base. Per VERIFIED FACTS, dentists are an excluded vertical and dental must not appear as a client or target industry anywhere on the site. This is not an isolated mention; the page's title, meta tags, JSON-LD, H1, body sections, and CTA all frame dental practices as prospective Ghosxt clients. This is the single largest finding in this audit batch.

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Cert count in author bio | "9 certifications including CySA+, Security+, and AZ-104" | line 186 | MATCHES |
| Prior role / track record | "Senior Solutions Consultant for the DoD," "40+ Central Coast businesses" | line 186 | UNVERIFIABLE |
| HIPAA-compliant managed IT price | "$175 to $300 per user per month" | JSON-LD line 102, quickfix line 203, body line 410, visible FAQ line 447 | CONTRADICTS (published tiers are Core $125 / Secure Growth $175 / Compliance & Continuity $250 per user/month — no $300 tier exists) |
| Year-one all-in cost for 10-person practice | "$28,000 to $50,000" | line 420 | CONTRADICTS (derived from the $175-$300 figure above) |
| One-time setup/remediation cost | "$2,500 to $8,000" | line 415, JSON-LD echoes via cost FAQ | CONTRADICTS published onboarding ($1,000 Tiny Team / $1,500 for 5-15 users, Microsoft 365 default scope) — page presents this as the typical onboarding cost for a 5-15 person practice without noting it as scope beyond the M365 default |
| OCR settlement range (industry fact, not a Ghosxt claim) | "$50,000 to several hundred thousand dollars" | line 435 and elsewhere | Not a Ghosxt claim — generic regulatory/industry fact, no verification needed |

## Legibility Checklist (blog-adapted)
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | line 181 |
| Visible publish date | Pass | "May 16, 2026" (line 173) |
| BlogPosting JSON-LD: datePublished, dateModified, author as Person | Pass | lines 47-50 |
| Exactly one H1 | Pass | line 179 |
| Title, meta description, canonical present | Pass | lines 6-8 (title/meta/description themselves name "Dental," see violations) |
| FAQ JSON-LD matching visible text | FAIL | JSON-LD FAQPage has 5 Q&As (lines 63-106); visible FAQ section has 9 (adds "Is Microsoft 365 HIPAA-compliant?", "What about Apple devices and Macs?", "Do I need to encrypt every laptop?", "What happens if there's a breach?" — lines 449-459, none in schema) |
| Internal links to relevant service pages | Pass | /healthcare-it-services, /backup-disaster-recovery plus cross-links |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental presented as Ghosxt target/client vertical — page title | `<title>` line 6 |
| Dental in meta description / og:description / twitter tags | lines 7, 13, 20-21 |
| Dental in JSON-LD headline/description | lines 44-45 |
| Dental in visible H1 | line 179 |
| Dental as client throughout body ("Medical and dental practices... run on technology," EHR/imaging vendor lists "for dental," "10-person medical or dental practice" reference stack) | lines 206, 297, 335, 364, 407 and others |
| Dental explicitly as Ghosxt clients: "What Ghosxt does for healthcare practices... For medical and dental practice clients in Monterey, Salinas..." plus CTA "Want a HIPAA gap audit... 30 minutes with the founder" | lines 424-430, 461-467 |
| SIEM mention ("A managed IT provider that includes a managed SIEM or security operations tier handles this monitoring") — capability not in VERIFIED FACTS | line 282 |
| Security-stack vendor names in "reference design" (CrowdStrike Falcon Go, SentinelOne Vigilance, Huntress, Sophos, Fortinet, Meraki, Ubiquiti UDM Pro, Datto, Veeam, Acronis Cyber Cloud, Paubox, Virtru, Identillect, DocuSign) presented as what the managed IT stack would use | lines 341, 370-373, 389, 413-414, 417 |
| Meraki equipment mention (allowed only if true and [VERIFY]'d) | line 370 |

## Top Three Fixes
1. Retire or fully rewrite this page: remove every instance of "dental" as a target/client vertical (title, meta, JSON-LD, H1, body, CTA) — this is the excluded vertical and the violation runs through the entire page, not a few lines.
2. Correct the pricing claims to match published tiers (Core $125 / Secure Growth $175 / Compliance & Continuity $250 per user/month; onboarding $1,000 Tiny Team / $1,500 for 5-15 users) or clearly scope the HIPAA remediation project as a separate quoted engagement.
3. Strip the SIEM mention and the security-stack vendor-name list from the "reference design" section; describe capabilities generically per VERIFIED FACTS instead.
