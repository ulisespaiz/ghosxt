# Page Audit: /blog/ai-attack-speed-22-seconds-mdr-smb

## Route
/blog/ai-attack-speed-22-seconds-mdr-smb.html

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Founder credentials/bio | Same boilerplate as other posts | author-bio-box | MATCHES cert count; job title/business count UNVERIFIABLE |
| Headline statistic | Attacker handoff time dropped "from roughly eight hours three years ago to 22 seconds today," attributed to Palo Alto Networks IR data | title, TL;DR, body, FAQ | UNVERIFIABLE (third-party statistic, not a Ghosxt claim) |
| Comparison example naming dental as a small-business type | "...whether the captured credential belongs to a 30,000-employee bank or a 30-employee dental group" / "The dental group has an MSP that checks email in the morning." | body, ~lines 241, 243 | Illustrative hypothetical, not presented as a Ghosxt client or target vertical — but VERIFIED FACTS states dental "must not appear ... anywhere"; flagged below for PM judgment call |
| EDR vendor names | "Microsoft Defender for Business... SentinelOne, CrowdStrike, Huntress, Sophos Intercept X" | ~line 266 | Defender for Business MATCHES VERIFIED FACTS capability; the other four are third-party vendor names cited as general market alternatives, not stated as part of Ghosxt's own stack — flagged below as gray-area vendor-name mention |
| MDR pricing range | "$20 to $45 per user per month"; all-in stack "$170 to $250 per user per month" | ~lines 274, 296-301 | UNVERIFIABLE — presented as general 2026 SMB market pricing, not an explicit Ghosxt price-sheet claim; roughly consistent with, does not contradict, published tiers (Core $125 / Secure Growth $175 / Compliance & Continuity $250) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | |
| Visible publish date | Pass | `<time datetime="2026-05-17">` |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | |
| Exactly one H1 | Pass | |
| Title, meta description, canonical present | Pass | |
| FAQ JSON-LD matching visible text | Pass | 5 Q&A pairs verbatim-match body FAQ |
| Internal links to relevant service pages | Pass | Links to identity-hardening, patch-cadence, ransomware, cyber-insurance posts (no direct /cybersecurity service link, but topically relevant blog cluster links present) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental named as an illustrative small-business example ("30-employee dental group") — borderline against "dental must not appear as a client or target industry anywhere"; not framed as a Ghosxt client/target here, PM should confirm whether purely illustrative comparisons are acceptable | ~lines 241, 243 |
| Security-stack vendor names (SentinelOne, CrowdStrike, Huntress, Sophos Intercept X) named as EDR options in a section about what Ghosxt clients run ("even our most cost-sensitive clients are running it now") | ~line 266, 289 |

No em dash, no Cisco certification claim, no clearance level, no SIEM claim.

## Top Three Fixes
1. Decide and apply a consistent rule on the "dental group" illustrative example — either remove/replace with a non-excluded vertical (e.g., "30-employee accounting firm") or confirm generic illustrative mentions are out of scope for the exclusion.
2. Review the SentinelOne/CrowdStrike/Huntress/Sophos Intercept X mention against the "never publish vendor names" rule — reword to describe EDR options generically if the rule is meant to cover market-education content, not just Ghosxt's own stack.
3. Tag the shared bio block's job title/business count as [VERIFY] (site-wide fix).
