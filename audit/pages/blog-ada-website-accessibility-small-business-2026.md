# Page Audit: /blog/ada-website-accessibility-small-business-2026

## Route
/blog/ada-website-accessibility-small-business-2026.html

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Founder credentials/bio | "10+ years... deep DoD infrastructure experience, and 9 certifications including CySA+, Security+, and AZ-104... Senior Solutions Consultant for the DoD... 40+ Central Coast businesses" | author-bio-box, ~line 170 | MATCHES cert count (9) and DoD-experience language; specific title "Senior Solutions Consultant for the DoD" and "40+ businesses" are UNVERIFIABLE (not itemized in VERIFIED FACTS) |
| Unruh Act statutory minimum damages | "$4,000 per violation plus attorney's fees" | body + FAQ, multiple | UNVERIFIABLE (third-party legal fact, not a Ghosxt claim; no contradiction with VERIFIED FACTS) |
| WCAG standard cited | WCAG 2.1 Level AA | body, FAQ | UNVERIFIABLE (external standard, not Ghosxt-specific) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | "Ulises Paiz, Founder, Ghosxt" in header + author-bio-box |
| Visible publish date | Pass | `<time datetime="2026-07-11">July 11, 2026</time>` |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | All three present; author `{"@type":"Person","name":"Ulises Paiz"}` |
| Exactly one H1 | Pass | 1 |
| Title, meta description, canonical present | Pass | All present |
| FAQ JSON-LD matching visible text | Pass | 3 Q&A pairs verbatim-match the body FAQ H3/p blocks |
| Internal links to relevant service pages | Pass | Links to /website-development, related blog posts, footer service links |

## House-Rule Violations
None found. No em dash, no Cisco certification claim, no dental mention, no security-stack vendor names, no clearance level, no SIEM/uncleared capability claim, no pricing contradicting published tiers.

## Top Three Fixes
1. None required - page is clean against house rules and legibility checklist.
2. Consider tagging the "Senior Solutions Consultant for the DoD" job title and "40+ Central Coast businesses" figure as [VERIFY] since neither is itemized in VERIFIED FACTS (this bio block is identical across all blog posts, so fixing it once fixes it everywhere).
3. No further action.
