# Page Audit: /blog/manufacturing-it-cybersecurity-central-coast

## Route
/blog/manufacturing-it-cybersecurity-central-coast (file: blog/manufacturing-it-cybersecurity-central-coast.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Author bio (boilerplate) | "10+ years...," "9 certifications...," "Senior Solutions Consultant for the DoD," "40+ Central Coast businesses" | manufacturing-it-cybersecurity-central-coast.html:194 | UNVERIFIABLE — recurring bio block |
| Byline title | "Founder, Ghosxt" | :189 | UNVERIFIABLE — VERIFIED FACTS says "Owner and sole engineer" |
| DoD infrastructure experience (general) | "engineer with DoD infrastructure experience" | :194, :386 | MATCHES — no clearance level stated |
| Regulatory/compliance facts (CMMC dates, NIST 800-171/800-82) | Phase 1 Nov 10 2025, Phase 2 Nov 10 2026, Phase 3 Nov 10 2027; 48 CFR final rule | :70, :279-287, :367 (FAQ) | N/A — third-party regulatory facts, outside VERIFIED FACTS scope |
| Illustrative 40-person shop IT budget | "$7,000 and $11,500 per month," itemized ($700-1,000 M365; $625 MDR + OT monitoring; $3,750-5,000 managed IT at $150-200/user; etc.) | :339-348 | UNVERIFIABLE — hypothetical example, not Ghosxt's own published pricing; the $150-200/user "Managed IT" line item is a subset of a larger bundle and does not directly contradict the $125-$250/user published range once the separate $25/user "MDR" line is added back in |
| Capabilities referenced as defenses | segmentation, EDR "on everything that can run it," MFA, monitored email, identity hardening, 24/7 detection | :263-268, :373, :382 | MATCHES — described generically, consistent with VERIFIED FACTS capabilities, no vendor names or SIEM |
| Manufacturing ransomware-target statistic | "most-targeted sector for ransomware for several years running," "median manufacturing ransomware breach around half a million dollars" | :202, :222, :348, :373 | N/A — third-party industry statistic, outside VERIFIED FACTS scope |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | :189 and bio box :191-195 |
| Visible publish date | Pass | `<time datetime="2026-06-02">June 2, 2026</time>` :181 |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | :42-53; Person author :47; dates :49-50 |
| Exactly one H1 | Pass | Single `<h1>` :187 |
| Title, meta description, canonical present | Pass | :6, :7, :8 |
| FAQ JSON-LD matching visible text | Pass | 6 Q&A in JSON-LD (:63-114) match the 6 visible FAQ H3/P pairs (:366-382) verbatim |
| Internal links to relevant service pages | Pass | Links to manufacturing-it-services, engineering-it-services, cybersecurity, network-design, backup-disaster-recovery pages and related posts (:217, :244, :252, :256, :271, :275, :353-360) |

## House-Rule Violations
None found — checked carefully given this page's industry/CMMC/DoD framing. No em dashes, no Cisco certification claims, no dental/dentist mention anywhere, no security-stack vendor names, no clearance level (only general "DoD infrastructure experience"), no SIEM mention, no pricing that contradicts the published tiers.

## Top Three Fixes
1. Replace "Founder" with "Owner" (or verify title) to match VERIFIED FACTS.
2. Verify or source the shared author-bio figures.
3. No other changes needed; page is otherwise clean.
