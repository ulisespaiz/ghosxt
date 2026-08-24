# Page Audit: blog/password-manager-small-business-2026.html

## Route
/blog/password-manager-small-business-2026

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| 1Password Business price | $7.99/user/month | body, FAQ, JSON-LD FAQ (3rd-party product, not Ghosxt pricing) | UNVERIFIABLE (external vendor price, not checkable against our facts; does not touch Ghosxt's published tiers) |
| Bitwarden Teams price | $4/user/month | body, FAQ, JSON-LD FAQ | UNVERIFIABLE (external vendor price) |
| Dashlane Business | "costs more than both" (no figure) | body ~line 224 | UNVERIFIABLE (no specific number) |
| LastPass 2022 breach description | vaults encrypted, metadata exfiltrated | body + FAQ | UNVERIFIABLE (public historical event, plausible, not in VERIFIED FACTS) |
| Author bio: "9 certifications including CySA+, Security+, and AZ-104" | 9 certs | author-bio-box, line 186 | MATCHES (VERIFIED FACTS lists 9 certs: AZ-104, SecurityX, CySA+, Security+, Network+, Cloud+, Project+, ITIL4, Linux Essentials) |
| Author bio: "10+ years in IT infrastructure and cybersecurity" | 10+ years | author-bio-box, line 186 | UNVERIFIABLE (not stated in VERIFIED FACTS) |
| Author bio: "Senior Solutions Consultant for the DoD" | specific job title | author-bio-box, line 186 | UNVERIFIABLE (VERIFIED FACTS only says "prior DoD/federal contractor infrastructure experience," no title given) |
| Author bio: "built security programs for 40+ Central Coast businesses" | 40+ businesses | author-bio-box, line 186 | UNVERIFIABLE (specific number not in VERIFIED FACTS; risk of invented number) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | "Ulises Paiz, Founder, Ghosxt" line 181; author-bio-box present |
| Visible publish date | Pass | `<time datetime="2026-06-24">June 24, 2026</time>` line 173 |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | lines 49-50 dates match visible date; author Person "Ulises Paiz" line 47 |
| Exactly one H1 | Pass | line 179 |
| Title, meta description, canonical present | Pass | lines 6-8 |
| FAQ JSON-LD matching visible text | Pass | 5 FAQ Q&As, JSON-LD text matches H3/body text verbatim |
| Internal links to relevant service pages | Pass | links to /cybersecurity and 3 sister blog posts |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| None found (no em dash, no Cisco cert claim, no dental, no security-stack vendor names, no clearance level, no SIEM claim, no pricing contradiction) | — |

## Top Three Fixes
1. Verify or source the "40+ Central Coast businesses" and "Senior Solutions Consultant for the DoD" claims in the shared author-bio boilerplate (appears on every post) — tag [VERIFY] or remove if not sourced from VERIFIED FACTS.
2. Verify "10+ years in IT infrastructure and cybersecurity" against actual career history.
3. No other fixes needed; page is otherwise clean.
