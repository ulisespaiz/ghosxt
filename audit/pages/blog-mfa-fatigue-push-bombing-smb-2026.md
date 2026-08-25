# Page Audit: /blog/mfa-fatigue-push-bombing-smb-2026

## Route
/blog/mfa-fatigue-push-bombing-smb-2026 (file: blog/mfa-fatigue-push-bombing-smb-2026.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Author bio (boilerplate) | "10+ years...," "9 certifications...," "Senior Solutions Consultant for the DoD," "40+ Central Coast businesses" | mfa-fatigue-push-bombing-smb-2026.html:194 | UNVERIFIABLE - recurring bio block |
| Byline title | "Founder, Ghosxt" | :189 | UNVERIFIABLE - VERIFIED FACTS says "Owner and sole engineer" |
| DoD infrastructure experience (general) | "engineer with DoD infrastructure experience" | :194, :313 | MATCHES - no clearance level stated |
| FIDO2 hardware key cost | "roughly $25 to $70 each" / "$25 to 70 dollars each" | :253, :309 (FAQ) | N/A - third-party hardware pricing, not a Ghosxt service price, does not contradict published pricing |
| Capabilities referenced | phishing-resistant MFA, Conditional Access, number matching, help-desk verification runbook, monitoring/MDR | :253, :260-270 | MATCHES - consistent with VERIFIED FACTS capabilities (Microsoft 365 hardening with Conditional Access, phishing-resistant MFA); no vendor names, no SIEM |
| 24/7 MDR reference | "the 24/7 MDR argument we have made all month," "someone has to be watching those alerts" | :270 | MATCHES - MDR with 24/7 SOC is on the VERIFIED FACTS capabilities list |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | :189 and bio box :191-195 |
| Visible publish date | Pass | `<time datetime="2026-05-26">May 26, 2026</time>` :181 |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | :42-53; Person author :47; dates :49-50 |
| Exactly one H1 | Pass | Single `<h1>` :187 |
| Title, meta description, canonical present | Pass | :6, :7, :8 |
| FAQ JSON-LD matching visible text | Pass | 6 Q&A in JSON-LD (:63-114) match the 6 visible FAQ H3/P pairs (:293-309) verbatim |
| Internal links to relevant service pages | Pass | Links to pricing page and multiple related identity/credential-stuffing/SIM-swap/ransomware posts (:281-286, :289) |

## House-Rule Violations
None found. No em dashes, Cisco claims, dental mention, vendor names, clearance level, SIEM, or unlisted capabilities; no pricing to contradict.

## Top Three Fixes
1. Replace "Founder" with "Owner" (or verify title) to match VERIFIED FACTS.
2. Verify or source the shared author-bio figures.
3. No other changes needed; page is otherwise clean.
