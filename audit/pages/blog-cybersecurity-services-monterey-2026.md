# Page Audit: /blog/cybersecurity-services-monterey-2026

## Route
/blog/cybersecurity-services-monterey-2026.html

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Founder credentials/bio | "10+ years... 9 certifications including CySA+, Security+, and AZ-104... Senior Solutions Consultant for the DoD... 40+ Central Coast businesses" | author-bio-box, line 194 | MATCHES cert count (9); "Senior Solutions Consultant for the DoD" and "40+ businesses" are invented specifics not in VERIFIED FACTS |
| Client verticals served on the Peninsula | hospitality, professional services, "healthcare (... plus a long tail of independent dental, optometry, and specialty practices)", tourism, real estate, agriculture | line 220 | CONTRADICTS - dental named as part of the client base ("companies I work with") |
| Threat example vertical | "AI-assisted phishing aimed at small healthcare providers... Independent dental, optometry, and specialty practices" | line 233 | CONTRADICTS - dental presented as a target vertical Ghosxt discusses/serves |
| H3 section "Healthcare and dental" incl. internal link | "Our post on HIPAA-compliant IT for medical and dental in Monterey County" | lines 348, 350, 394 | CONTRADICTS - dental treated as a served/target vertical with a dedicated cross-link |
| "Do not buy an enterprise SIEM... The MDR provider's tooling is your SIEM." | line 366 | CONTRADICTS - implies Ghosxt's MDR functions as a SIEM; VERIFIED FACTS says never claim SIEM |
| Endpoint vendor alternatives named | "Larger... firms move to SentinelOne, CrowdStrike, or Huntress" | line 261 | Security-stack vendor names - house-rule violation (never publish vendor names) |
| Phishing training vendors named | "KnowBe4, Hoxhunt, Curricula" | line 310 | Security-stack vendor names - house-rule violation |
| SIEM vendor names | "Splunk or Sentinel scale" | line 366 | Security-stack vendor names - house-rule violation |
| Consumer AV vendor names | "Norton, McAfee, Avast" | line 367 | Security-stack vendor names - house-rule violation |
| All-in program cost, stated twice | "$170 to $250 per user per month" (TL;DR, line 210) vs. "$200 to $275 per user per month" (cost breakdown, line 321) | lines 210, 321 | CONTRADICTS - two different totals for the same 25-person scenario within one article |
| Line-item pricing (M365 ~$22, MDR $25–45, Managed IT $150–200, training $3–6/user) | lines 246, 276, 310, 317–321 | UNVERIFIABLE - general market figures; do not map cleanly to published Core $125 / Secure Growth $175 / Compliance & Continuity $250 per-user tiers |
| Breach cost estimate | "$75,000 to $250,000 all-in" | lines 210, 334 | UNVERIFIABLE (industry claim, not a Ghosxt-specific figure) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | "Ulises Paiz, Founder, Ghosxt" in header + author-bio-box |
| Visible publish date | Pass | `<time datetime="2026-05-25">May 25, 2026</time>` |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | All three present |
| Exactly one H1 | Pass | 1 |
| Title, meta description, canonical present | Pass | All present |
| FAQ JSON-LD matching visible text | Pass | 6 Q&A pairs verbatim-match visible FAQ section |
| Internal links to relevant service pages | Pass | Links to /cybersecurity, /managed-it-services, /pricing, city pages |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental as client/target vertical (multiple instances) | lines 216, 220, 233, 348, 350, 394 |
| SIEM capability implied ("The MDR provider's tooling is your SIEM") | line 366 |
| Security-stack vendor names: SentinelOne, CrowdStrike, Huntress | line 261 |
| Security-stack vendor names: KnowBe4, Hoxhunt, Curricula | line 310 |
| Security-stack vendor names: Splunk, Sentinel | line 366 |
| Security-stack vendor names: Norton, McAfee, Avast | line 367 |
| Invented job title/story ("Senior Solutions Consultant for the DoD") and invented client count ("40+ Central Coast businesses") | line 194, author-bio-box (site-wide component) |

## Top Three Fixes
1. Remove every dental reference (lines 216, 220, 233, 348, 350, 394) and the internal link to the dental/medical HIPAA post - this is the most severe and most repeated violation on the page.
2. Cut "The MDR provider's tooling is your SIEM" and all vendor names (SentinelOne/CrowdStrike/Huntress, KnowBe4/Hoxhunt/Curricula, Splunk/Sentinel, Norton/McAfee/Avast); describe capabilities generically per VERIFIED FACTS.
3. Reconcile the two conflicting all-in cost ranges ($170–250 vs. $200–275 per user/month) and tag the line-item pricing as [VERIFY] against the published tier pricing.
