# Page Audit: /blog/agriculture-it-cybersecurity-salinas-valley

## Route
/blog/agriculture-it-cybersecurity-salinas-valley.html

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Founder credentials/bio | Same boilerplate as other posts (9 certs, DoD experience, 40+ businesses) | author-bio-box | MATCHES cert count; job title/business count UNVERIFIABLE |
| 24/7 monitored detection and response capability | "24/7 monitored detection and response" | Layer 5 cybersecurity list, ~line 274 | MATCHES VERIFIED FACTS ("managed detection and response with a 24/7 SOC") |
| Sample budget line items | "MDR / managed security: 25 users × $25 = $625"; "Managed IT ... 25 users × $150–$200"; total "$7,500–$12,000/month" | budget section, ~lines 343-352 | UNVERIFIABLE - presented as an illustrative generic ag-operation budget, not a stated Ghosxt price sheet; does not explicitly cite Ghosxt's own published per-tier pricing |
| Microsoft 365 Business Premium price | "roughly $22 per user" | ~line 316, 343 | UNVERIFIABLE (third-party Microsoft price, not Ghosxt's) |
| Monterey County crop value | "nearly $5 billion of crops in 2024" | body, ~line 220 | UNVERIFIABLE (external agricultural statistic) |
| FSMA 204 compliance date | "extended... to July 20, 2028" | body + FAQ | UNVERIFIABLE (external regulatory fact) |
| Produce ERP vendor names | "Famous, Produce Pro, a Microsoft Dynamics build" | Layer 3, ~line 254 | Third-party client-software vendor names (not Ghosxt's own security stack) - informational, not a house-rule vendor-name violation |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | |
| Visible publish date | Pass | `<time datetime="2026-06-02">` |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | |
| Exactly one H1 | Pass | |
| Title, meta description, canonical present | Pass | |
| FAQ JSON-LD matching visible text | Pass | 6 Q&A pairs verbatim-match body FAQ |
| Internal links to relevant service pages | Pass | Links to /agriculture-it-services, /cybersecurity, /network-design, /backup-disaster-recovery, /ctpat, /managed-it-services, /it-consulting-vcio |

## House-Rule Violations
None found. No em dash, no dental, no Cisco certification claim, no clearance level, no SIEM claim. Vendor names present (Famous, Produce Pro, Microsoft Dynamics, Veeam/Datto/etc. not mentioned here) are client-side agricultural ERP/backup products, not Ghosxt's own delivered security-stack - does not appear to violate the "never publish vendor names" rule, which targets Ghosxt's own capability stack.

## Top Three Fixes
1. None required - page is clean against house rules.
2. Tag the illustrative $/user budget line items as [VERIFY] or explicitly label them as "market range" if there's any risk a reader conflates them with Ghosxt's own published pricing tiers.
3. Tag "40+ Central Coast businesses" and the specific DoD job title in the shared bio block as [VERIFY] (applies site-wide, fix once).
