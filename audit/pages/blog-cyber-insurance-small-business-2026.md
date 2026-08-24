# Page Audit: /blog/cyber-insurance-small-business-2026

## Route
/blog/cyber-insurance-small-business-2026.html

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Author certifications count | "9 certifications including CySA+, Security+, and AZ-104" | author-bio-box, line 178 | MATCHES |
| Author years / DoD role / 40+ businesses | boilerplate | line 178 | UNVERIFIABLE |
| Reasonable cyber insurance premium | "$1,500 to $4,000 for $1 million in coverage" (5-50 employee business) | lines 86, 249 (FAQ JSON-LD + visible) | UNVERIFIABLE (insurance market pricing, not Ghosxt's own pricing) |
| GL policy data-compromise endorsement cap | "$10,000 to $25,000" vs. avg SMB breach cost "$120,000 to $200,000" | lines 70, 243 | UNVERIFIABLE |
| Ransomware IR firm cost | "$15,000 to $75,000" | line 206 | UNVERIFIABLE |
| BEC/social engineering sub-limit | "$25,000 to $100,000" | line 222 | UNVERIFIABLE |
| MSP reduces premium | "reduce your annual premium by $500 to $1,500" | line 191 | UNVERIFIABLE |
| "having an MDR or SIEM solution matters" for pre-existing-breach coverage disputes | capability reference | line 218 | HOUSE-RULE VIOLATION (SIEM not in VERIFIED FACTS capabilities) |
| EDR vendor examples | "SentinelOne, CrowdStrike, or Microsoft Defender for Business" | line 232 | HOUSE-RULE VIOLATION (security-stack vendor names) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | line 173 |
| Visible publish date | Pass | June 25, 2026 (dateModified June 25, 2026 per JSON-LD) |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | lines 42-50 |
| Exactly one H1 | Pass | headline present |
| Title, meta description, canonical present | Pass | lines 6-8 |
| FAQ JSON-LD matching visible text | Pass | 4 Q&As match body verbatim |
| Internal links to relevant service pages | Pass | links to /backup-disaster-recovery, /cyber-insurance-compliance, related blog posts |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| SIEM mentioned as a capability/control | line 218: "having an MDR or SIEM solution matters" |
| Security-stack vendor names | line 232: "SentinelOne, CrowdStrike, or Microsoft Defender for Business" |

## Top Three Fixes
1. Remove "or SIEM" from line 218 — VERIFIED FACTS lists MDR with 24/7 SOC as a Ghosxt capability but explicitly says never claim SIEM or anything not listed.
2. Remove the vendor names at line 232 ("SentinelOne, CrowdStrike, or Microsoft Defender for Business") and describe EDR/next-gen antivirus generically instead.
3. None else required; the various dollar figures are third-party insurance-market context, not Ghosxt pricing, and do not contradict the published rate card.
