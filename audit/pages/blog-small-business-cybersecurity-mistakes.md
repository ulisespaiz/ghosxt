# Page Audit: /blog/small-business-cybersecurity-mistakes

## Route
/blog/small-business-cybersecurity-mistakes (file: blog/small-business-cybersecurity-mistakes.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Author credentials/bio | "10+ years in IT infrastructure and cybersecurity, deep DoD infrastructure experience, 9 certifications including CySA+, Security+, and AZ-104... Senior Solutions Consultant for the DoD... 40+ Central Coast businesses" | line 139 (author-bio-box) | MATCHES (9 certs count matches VERIFIED FACTS cert list; DoD infrastructure experience matches; "10+ years" and "40+ businesses" UNVERIFIABLE, not stated in VERIFIED FACTS but not contradicted) |
| Illustrative inventory cost | "A simple inventory ($25 in licensing per machine) tells you" | line 183 | UNVERIFIABLE — dollar figure not sourced from VERIFIED FACTS. VERIFY WITH ULI |
| MFA example: "$40,000 wire fraud" | illustrative example | line 157 | UNVERIFIABLE — specific dollar figure not in VERIFIED FACTS, reads as illustrative not a claimed case. VERIFY WITH ULI |
| CTA offer | "free IT assessment... Thirty minutes, no sales pitch" | lines 197, 202-207 | UNVERIFIABLE (duration/format not in VERIFIED FACTS, but consistent sitewide) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | "Ulises Paiz, Founder, Ghosxt" at line 134, plus full author-bio box (136-140) |
| Visible publish date | Pass | `<time datetime="2026-05-04">May 4, 2026</time>` at line 126 |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | Lines 42-51: datePublished 2026-05-04, dateModified 2026-05-05, author `{"@type":"Person","name":"Ulises Paiz"}` |
| Exactly one H1 | Pass | Single `<h1>` at line 132 |
| Title, meta description, canonical | Pass | Lines 6, 7, 8 |
| FAQ JSON-LD matching visible text | N/A | No FAQ section exists on this page (no FAQPage in @graph, no visible FAQ in body) — internally consistent, just absent |
| Internal links to relevant service pages | Pass | Links to /cybersecurity (147), /backup-disaster-recovery (167), /cloud-services (175), /managed-it-services (183) |

## House-Rule Violations
None found. No em dashes, no Cisco certification claims, no dental/dentist, no security-stack vendor names, no clearance level, no SIEM, no capability outside VERIFIED FACTS, no price contradicting published pricing.

## Top Three Fixes
1. Source or remove the "$25 in licensing per machine" figure (line 183) — not in VERIFIED FACTS, reads as an invented number. VERIFY WITH ULI.
2. Source or reframe the "$40,000 wire fraud" illustrative figure (line 157) as unquantified language if it cannot be sourced.
3. No structural or house-rule issues found otherwise; page is clean. Optional: consider adding an FAQ section with FAQPage JSON-LD to match the SEO pattern used on most other 2026 posts in this batch.
