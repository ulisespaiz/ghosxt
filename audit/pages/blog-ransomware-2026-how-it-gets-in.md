# Page Audit: /blog/ransomware-2026-how-it-gets-in

## Route
/blog/ransomware-2026-how-it-gets-in.html

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Author certifications | "9 certifications including CySA+, Security+, and AZ-104" | author-bio-box | MATCHES |
| DoD experience | "deep DoD infrastructure experience" / "the DoD networks I trained on" | author-bio-box, body | MATCHES |
| Years of experience | "10+ years in IT infrastructure and cybersecurity" | author-bio-box | UNVERIFIABLE [VERIFY] |
| Prior role | "Senior Solutions Consultant for the DoD" | author-bio-box | UNVERIFIABLE [VERIFY] |
| Client count | "built security programs for 40+ Central Coast businesses" | author-bio-box | UNVERIFIABLE [VERIFY] |
| EDR vendor recommendations | "Common picks for small business include CrowdStrike, SentinelOne, Microsoft Defender for Business, and Huntress" | body, "What to do this week" list | CONTRADICTS - VERIFIED FACTS: "never publish vendor names" for security capabilities |
| CVE-vulnerable edge vendors | "Fortinet, SonicWall, Citrix, Ivanti" | body, "Unpatched edge devices" section | CONTEXT - factual reference to vendors with disclosed CVEs, not Ghosxt's own stack; lower-confidence violation, flag for PM review |
| Supply-chain incidents | "2024 Kaseya and 2024 ConnectWise incidents" | body | CONTEXT - historical incident references, not stack endorsement |
| Free assessment offer | "our free cybersecurity assessment... 30 minutes, no sales pitch" | body, CTA | MATCHES general offer pattern used site-wide |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming author | Pass | |
| Visible publish date | Pass | "May 5, 2026" |
| BlogPosting JSON-LD: datePublished, dateModified, author as Person | Pass | Dates match (2026-05-05) |
| Exactly one H1 | Pass | |
| Title, meta description, canonical | Pass | |
| FAQ JSON-LD matching visible text | N/A | No FAQPage schema |
| Internal links to relevant service pages | Pass | Links to /cloud-services, /backup-disaster-recovery, /managed-it-services, /cybersecurity, /contact |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Security-stack vendor names (CrowdStrike, SentinelOne, Microsoft Defender for Business, Huntress) named as EDR recommendations | body: "This month: Deploy real EDR... Common picks for small business include CrowdStrike, SentinelOne, Microsoft Defender for Business, and Huntress." |
| Author-bio numbers not traceable to VERIFIED FACTS ("10+ years," "Senior Solutions Consultant for the DoD," "40+ Central Coast businesses") | author-bio-box |

## Top Three Fixes
1. Remove or genericize the named EDR vendor list (CrowdStrike, SentinelOne, Microsoft Defender for Business, Huntress) - replace with a description of the capability, per VERIFIED FACTS instruction to never publish vendor names.
2. Verify or soften the author-bio's unverified specifics (years, prior DoD title, "40+ businesses" client count) that repeat across every post via the shared bio template.
3. Consider whether naming Fortinet/SonicWall/Citrix/Ivanti/ConnectWise as vulnerable edge vendors (factual CVE reporting) is acceptable under the vendor-name house rule, or should be genericized too - flag for PM decision.
