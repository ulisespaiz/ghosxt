# Page Audit: /blog/managed-it-services-cost-salinas-2026

## Route
/blog/managed-it-services-cost-salinas-2026 (file: blog/managed-it-services-cost-salinas-2026.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Security-stack vendor names | "Endpoint Detection and Response (CrowdStrike, SentinelOne, Microsoft Defender for Business, or Huntress in the SMB market)" | :215 | CONTRADICTS - VERIFIED FACTS: "never publish vendor names." CrowdStrike, SentinelOne, and Huntress are named explicitly (Microsoft Defender for Business is separately fine as it is on the actual capabilities list) |
| Ghosxt's Compliance & Continuity tier includes managed SIEM | "Compliance & Continuity: $250 per user/month. Everything in Secure Growth plus Identity Threat Detection, managed SIEM, compliance support, virtual CIO..." | :330 | CONTRADICTS - VERIFIED FACTS: "Do not claim SIEM." This is Ghosxt's own named, published tier, not a generic industry description |
| SIEM referenced again in FAQ discussing Ghosxt's own tiers | "the top tier (Compliance & Continuity) with managed SIEM, compliance support, and vCIO almost always pays for itself" | :361 (visible FAQ; not in JSON-LD) | CONTRADICTS - same issue, repeated |
| SIEM referenced as generic "higher tier" feature | "Higher tiers add MFA enforcement, DNS filtering, security awareness training, dark web monitoring, password management, managed SIEM, compliance support, and a virtual CIO" | :78 (JSON-LD FAQ), :196, :201, :231, :258, :349 (visible FAQ) | CONTRADICTS in context - same unlisted-capability pattern, repeated across the page (7 total SIEM mentions) |
| Ghosxt's own published tier names and prices | Tiny Team Managed Security $600/mo (1-4 users); Core Managed IT $125; Secure Growth $175; Compliance & Continuity $250 per user/mo | :327-330 | MATCHES VERIFIED FACTS tier names and dollar amounts (the names are correct here, unlike it-help-help-desk-tech-support-small-business-salinas.html) |
| Onboarding fee | not restated for Ghosxt specifically; generic "$500 to $5,000" industry range cited | :272, :354 (FAQ) | N/A - describes the market, not Ghosxt's own onboarding fee (VERIFIED FACTS: $1,000 Tiny Team / $1,500 for 5-15 users on M365 default scope) |
| Engineering/project hourly rate | "$125 to $250 per hour for engineering work, $175 to $350 per hour for senior architects" | :249 | UNVERIFIABLE - not in VERIFIED FACTS; differs from the $150/hr figure on it-help-help-desk-tech-support-small-business-salinas.html (same site, same claim category, overlapping but inconsistent ranges) |
| 15-user cost example | "$2,625/month," "$31,500/year," "$39,000 to $43,500" first-year all-in | :297-303 | UNVERIFIABLE - illustrative example, arithmetic is internally consistent with the stated $175/user rate |
| Author bio (boilerplate) | "10+ years...," "9 certifications...," "Senior Solutions Consultant for the DoD," "40+ Central Coast businesses" | :186 | UNVERIFIABLE - recurring bio block |
| Byline title | "Founder, Ghosxt" | :181 | UNVERIFIABLE - VERIFIED FACTS says "Owner and sole engineer" |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | :181 and bio box :183-187 |
| Visible publish date | Pass | `<time datetime="2026-05-16">May 16, 2026</time>` :173 |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | :42-53; Person author :47; dates :49-50 |
| Exactly one H1 | Pass | Single `<h1>` :179 |
| Title, meta description, canonical present | Pass | :6, :7, :8 |
| FAQ JSON-LD matching visible text | Fail | JSON-LD FAQPage lists 5 Q&A (:63-106); visible page has 7 FAQ H3/P pairs (:345-364). The 5 in JSON-LD match verbatim, but 2 visible FAQs ("Is paying more for the higher tier worth it?" - contains the managed-SIEM claim at :361 - and "What about the Bay Area MSPs...") have no JSON-LD counterpart |
| Internal links to relevant service pages | Pass | Links to pricing, managed-it-services, and several related blog posts throughout |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Security-stack vendor names (CrowdStrike, SentinelOne, Huntress) | :215 |
| SIEM (unlisted capability) - 7 mentions, several tied directly to Ghosxt's own published Compliance & Continuity tier | :196, :201, :231, :258, :330, :349, :361 |

## Top Three Fixes
1. Remove "CrowdStrike, SentinelOne... or Huntress" at :215 - describe EDR generically without vendor names, per house rule.
2. Remove "managed SIEM" from the Compliance & Continuity tier description at :330 and every other mention on this page (:196, :201, :231, :258, :349, :361); this is the page's most direct SIEM claim since it names Ghosxt's actual published tier.
3. Add the 2 missing visible FAQs to the FAQPage JSON-LD (after the SIEM language is fixed), or trim them from the visible page.
