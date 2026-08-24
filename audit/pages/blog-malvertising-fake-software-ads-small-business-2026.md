# Page Audit: /blog/malvertising-fake-software-ads-small-business-2026

## Route
/blog/malvertising-fake-software-ads-small-business-2026 (file: blog/malvertising-fake-software-ads-small-business-2026.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Author bio (boilerplate) | "10+ years...," "9 certifications...," "Senior Solutions Consultant for the DoD," "40+ Central Coast businesses" | malvertising-fake-software-ads-small-business-2026.html:170 | UNVERIFIABLE — recurring bio block |
| Byline title | "Founder, Ghosxt" | :165 | UNVERIFIABLE — VERIFIED FACTS says "Owner and sole engineer" |
| DoD infrastructure experience (general) | "engineer with DoD infrastructure experience" | :170, :235 | MATCHES — no clearance level stated |
| Capabilities referenced as defenses | DNS/web filtering, EDR with behavioral detection, managed software deployment, removing local admin rights | :182, :204-209 | MATCHES — all within the VERIFIED FACTS capabilities list (DNS/web filtering, EDR-equivalent detection described generically without vendor names) |
| No pricing claims on this page | — | — | N/A |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | :165 and bio box :167-171 |
| Visible publish date | Pass | `<time datetime="2026-07-23">July 23, 2026</time>` :157 |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | :42-53; Person author :47; dates :49-50 |
| Exactly one H1 | Pass | Single `<h1>` :163 |
| Title, meta description, canonical present | Pass | :6, :7, :8 |
| FAQ JSON-LD matching visible text | Pass | 3 Q&A in JSON-LD (:63-90) match the 3 visible FAQ H3/P pairs (:224-231) verbatim |
| Internal links to relevant service pages | Pass | Links to cybersecurity page and related typosquatting/ClickFix/EDR blog posts (:184, :215-219) |

## House-Rule Violations
None found. No em dashes, Cisco claims, dental mention, vendor names, clearance level, SIEM, or unlisted capabilities; no pricing to contradict.

## Top Three Fixes
1. Replace "Founder" with "Owner" (or verify title) to match VERIFIED FACTS.
2. Verify or source the shared author-bio figures.
3. No other changes needed; page is otherwise clean.
