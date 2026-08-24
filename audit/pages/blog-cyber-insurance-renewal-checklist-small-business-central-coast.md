# Page Audit: /blog/cyber-insurance-renewal-checklist-small-business-central-coast

## Route
/blog/cyber-insurance-renewal-checklist-small-business-central-coast.html

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Author certifications count | "9 certifications including CySA+, Security+, and AZ-104" | author-bio-box, line 186 | MATCHES |
| Author years / DoD role / 40+ businesses | boilerplate | line 186 | UNVERIFIABLE |
| Cyber insurance premium ranges by business size ($500-$1,500 / $2,000-$10,000 / $10,000-$50,000 per year) | third-party insurance market pricing | lines 209, 326-328, 421 | UNVERIFIABLE (insurance market pricing, not Ghosxt's own pricing; does not contradict published Ghosxt service pricing) |
| Healthcare/financial/logistics premium uplift 25-150% | market commentary | lines 334-338, 421 | UNVERIFIABLE |
| Insurance carrier names (Coalition, At-Bay, Cowbell, Chubb, Travelers, Hartford, Beazley, AXA XL, Tokio Marine HCC) | market context, not security-stack vendors | lines 310-316 | Not a house-rule violation (insurance carriers, not Ghosxt's security stack) |
| "For a Ghosxt client, the renewal questionnaire becomes a one-hour exercise" | service claim | line 395 | UNVERIFIABLE (plausible operational claim, not in VERIFIED FACTS, not contradicted) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | line 181 |
| Visible publish date | Pass | May 16, 2026, line ~173 |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | lines 42-50 |
| Exactly one H1 | Pass | headline present |
| Title, meta description, canonical present | Pass | lines 6-8 |
| FAQ JSON-LD matching visible text | Pass | 5 Q&As match body FAQ verbatim |
| Internal links to relevant service pages | Pass | links to /cyber-insurance-compliance, /managed-it-services, /cybersecurity |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Security-stack vendor names (EDR) | line 271: "CrowdStrike Falcon, SentinelOne, Microsoft Defender for Business / for Endpoint Plan 2, Huntress, Sophos Intercept X, and SonicWall Capture Client" |
| Security-stack vendor names (backup) | line 275: "Datto, Veeam, Acronis" |
| Security-stack vendor names (email security) | line 287: "Microsoft Defender for Office 365 Plan 1 or 2, Proofpoint Essentials, Mimecast, Abnormal, IRONSCALES" |
| Security-stack vendor names (awareness training) | line 291: "KnowBe4, Hoxhunt, Cofense, NINJIO, Hook Security, Curricula" |
| Security-stack vendor names (vuln scanning) | line 303: "Coalition Control, Tenable, Qualys, Rapid7" |
| Dental as target vertical (via link) | line 299: links to "/blog/hipaa-compliant-it-medical-dental-monterey-county" with slug naming "medical-dental" as a served/target compliance vertical |

## Top Three Fixes
1. Strip the five vendor-name lists (EDR, backup, email security, training, vulnerability scanning products) at lines 271, 275, 287, 291, 303 — replace with generic capability descriptions per house rule ("no vendor names").
2. Investigate the linked page `/blog/hipaa-compliant-it-medical-dental-monterey-county` (out of this audit's scope but referenced twice from this page) — its slug presents dental as a served/target vertical, which directly violates "Excluded vertical: dentists." Either the target page needs remediation or this link/anchor text needs to stop pointing readers toward a dental-labeled compliance page.
3. This is the longest and most vendor-dense page in the batch; a full pass for vendor names specifically is warranted before publish.
