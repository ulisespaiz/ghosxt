# Page Audit: blog/professional-services-it-law-cpa-central-coast.html

## Route
/blog/professional-services-it-law-cpa-central-coast

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Microsoft 365 Business Premium | 15 users x $22 = $330/mo | body budget table, ~line 347 | UNVERIFIABLE (Microsoft's own retail licensing pass-through cost, not a Ghosxt service price; plausible market rate) |
| "MDR / managed security and email protection" | 15 users x $25 = $375/mo | body budget table, line 347 | CONTRADICTS - this is presented as part of Ghosxt's own recommended budget for a client running "Microsoft 365 and a cloud document or practice-management system" (i.e., a Ghosxt-style engagement), but VERIFIED FACTS' published pricing has no separate $25/user MDR add-on line; MDR/SOC is one of the bundled capabilities inside the three per-user tiers, not billed separately |
| "Managed IT (help desk, patching, backup, identity hardening)" | 15 users x $150-$200 = $2,250-$3,000/mo | body budget table, line 349 | CONTRADICTS - $150-$200/user/month does not match any published Ghosxt tier (Core $125, Secure Growth $175, Compliance & Continuity $250 per user/month); the capabilities named (help desk, patching, backup, identity hardening) are exactly the bundled capabilities in VERIFIED FACTS, so this reads as Ghosxt's own price, not a generic market estimate, and invents a per-user rate outside the published tiers |
| Total monthly IT spend | $3,500-$5,500/mo for 15-person office | body, line 355 | CONTRADICTS (downstream of the two line items above) |
| Business internet/cellular failover, managed firewall, independent backup | $300-$700 / $150-$400 / $150-$400 | body, lines 350-352 | UNVERIFIABLE (generic infrastructure/backup cost ranges, not tied to a specific Ghosxt tier) |
| Author bio boilerplate | - | author-bio-box, line ~188 | 9-certs claim MATCHES; other claims UNVERIFIABLE |
| "dental" grep hits (lines 272) | false positive | - | Not a violation - the substring is inside "accidental" ("accidental deletion"), not a mention of dentists/dental as client or vertical |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | |
| Visible publish date | Pass | June 3, 2026 |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | lines 49-50, 47 |
| Exactly one H1 | Pass | |
| Title, meta description, canonical present | Pass | lines 6-8 |
| FAQ JSON-LD matching visible text | Pass | 6 Q&As, verified verbatim match against H3 headings |
| Internal links to relevant service pages | Pass | /network-design, /backup-disaster-recovery, /professional-services-it linked |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Price contradicts published pricing: "MDR / managed security" at $25/user and "Managed IT" at $150-$200/user, framed as Ghosxt's own recommended budget, do not match the published Core/Secure Growth/Compliance & Continuity per-user tiers ($125/$175/$250) | body, lines 347-355 |

## Top Three Fixes
1. Rework the "realistic budget" table so the Ghosxt-delivered portion (MDR + Managed IT, currently $175-$225/user combined) is replaced with the actual published per-user tier pricing ($125/$175/$250), or clearly reframe the whole budget as illustrative third-party market rates rather than a Ghosxt quote.
2. Verify the shared author-bio boilerplate claims (see password-manager report).
3. Re-total "$3,500-$5,500/month" once the per-user Ghosxt pricing line is corrected.
