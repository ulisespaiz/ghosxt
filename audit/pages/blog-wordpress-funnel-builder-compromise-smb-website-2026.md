# Page Audit: /blog/wordpress-funnel-builder-compromise-smb-website-2026

## Route
/blog/wordpress-funnel-builder-compromise-smb-website-2026

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Author credentials | "9 certifications including CySA+, Security+, and AZ-104" | author-bio-box | MATCHES |
| DoD experience | "deep DoD infrastructure experience," "Senior Solutions Consultant for the DoD" | author-bio-box | MATCHES general / job title UNVERIFIABLE |
| Career length | "10+ years in IT infrastructure and cybersecurity" | author-bio-box | UNVERIFIABLE |
| Client count | "built security programs for 40+ Central Coast businesses" | author-bio-box | UNVERIFIABLE |
| Funnel Builder/FunnelKit vuln details: ~40,000 installs, fixed in 3.15.0.3, exploited since mid-May 2026 | body + FAQ JSON-LD | UNVERIFIABLE by this audit (external technical claims) |
| "In the small-business breaches I have walked into..." (first-person incident-response experience claim) | body, FAQ answer | UNVERIFIABLE — implies direct hands-on incident history; not itself a listed capability but worth confirming isn't overstating experience |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming author | Pass | |
| Visible publish date | Pass | `<time datetime="2026-05-20">May 20, 2026</time>` |
| BlogPosting JSON-LD: datePublished, dateModified, author as Person | Pass | |
| Exactly one H1 | Pass | |
| Title, meta description, canonical present | Pass | |
| FAQ JSON-LD matches visible text | Pass | 5 FAQ Q&As match visible FAQ section verbatim |
| Internal links to relevant service pages | Pass | Links to /website-development, /cybersecurity, /backup-disaster-recovery, /cloud-services |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Numerous third-party WordPress-ecosystem product/vendor names (Wordfence, Sucuri, Cloudflare, UpdraftPlus, Kinsta, WP Engine, Pressable, Rocket.net, Automattic, Yoast, WP Rocket, FunnelKit) with specific prices ("Cloudflare Pro ~$25/mo," "Wordfence Premium ~$150/yr") | Throughout body, esp. "The defensive baseline for any SMB WordPress site" section (lines 289-319) | Context: this is advice about tools for the reader's own WordPress site/hosting, not Ghosxt's own delivered security stack (MDR/SIEM/etc. per VERIFIED FACTS). Distinguishable from the stricter miniplasma case since these are WordPress-specific consumer/site-owner tools, not enterprise EDR framed as "what to run." Still flagging full list for PM awareness given house rule's breadth. |

## Top Three Fixes
1. PM to review the WordPress tool/vendor list (Wordfence, Sucuri, Cloudflare, hosting brands) against house-rule intent — likely acceptable as reader-facing WordPress guidance, but confirm.
2. Verify shared bio-box claims (see vcio report).
3. Confirm the "in the small-business breaches I have walked into" first-person claim doesn't overstate incident-response history beyond what's verified.
