# Page Audit: /blog/employee-offboarding-it-security-checklist-small-business

## Route
/blog/employee-offboarding-it-security-checklist-small-business.html

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Founder credentials/bio | "10+ years... 9 certifications including CySA+, Security+, and AZ-104... Senior Solutions Consultant for the DoD... 40+ Central Coast businesses" | author-bio-box, line 183 | MATCHES cert count (9); "Senior Solutions Consultant for the DoD" and "40+ businesses" are invented specifics not in VERIFIED FACTS |
| First-hand assessment anecdote | "ex-employees with active email accounts eight months after their last day... a shared file drive still syncing... over a year earlier" | line 189 | UNVERIFIABLE - illustrative pattern description, no specific client/number invented |
| HowTo JSON-LD steps (disable identity, revoke MFA, reassign mailbox, pull device, rotate credentials, remove from third-party apps) | lines 63–72 | MATCHES visible checklist content (spot-checked) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | "Ulises Paiz, Founder, Ghosxt" |
| Visible publish date | Pass | `<time datetime="2026-07-01">July 1, 2026</time>` |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | All three present |
| Exactly one H1 | Pass | 1 |
| Title, meta description, canonical present | Pass | All present |
| FAQ JSON-LD matching visible text | Pass | 3 Q&A pairs verbatim-match visible FAQ section |
| Internal links to relevant service pages | Pass | Links to /managed-it-services, /backup-disaster-recovery, related blog posts |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Invented job title/story ("Senior Solutions Consultant for the DoD") and invented client count ("40+ Central Coast businesses") | line 183, author-bio-box (site-wide component) |

No em dash, no Cisco claim, no dental mention, no security-stack vendor names, no clearance level, no SIEM claim, no pricing contradicting published tiers.

## Top Three Fixes
1. Tag the "Senior Solutions Consultant for the DoD" title and "40+ Central Coast businesses" figure in the shared author-bio-box as [VERIFY] or remove - site-wide fix.
2. No page-specific issues found; page is otherwise clean.
3. No further action.
