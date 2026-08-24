# Page Audit: blog/property-management-it-monterey-santa-cruz.html

## Route
/blog/property-management-it-monterey-santa-cruz

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Microsoft 365 Business Premium | ~$22/user/mo, both in office-IT section (line 343) and budget table (10 users x $22 = $220, line 372) | body | UNVERIFIABLE (Microsoft's own retail licensing cost, not Ghosxt's; plausible market rate) |
| "MDR / managed security" | 10 users x $25 = $250/mo | body budget table, line 373 | CONTRADICTS - presented as part of Ghosxt's own recommended budget (references "the full program lives on the managed IT services page"); VERIFIED FACTS' published pricing bundles MDR into the per-user tiers, no separate $25/user MDR line exists |
| "Managed IT (help desk, patching, backup, identity hardening)" | 10 users x $150-$200 = $1,500-$2,000/mo | body budget table, line 374 | CONTRADICTS - $150-$200/user/month matches none of the published tiers (Core $125, Secure Growth $175, Compliance & Continuity $250 per user/month); capabilities named are exactly VERIFIED FACTS' bundled capabilities, so this reads as Ghosxt's own price |
| "VoIP for the leasing lines" | 10 users x $25 = $250/mo | body budget table, line 375 | UNVERIFIABLE (plausible separate line item, not addressed in VERIFIED FACTS pricing, which covers the core MSP tiers only) |
| Total monthly IT spend | $3,000-$4,500/mo for 10 office users | body, line 381 | CONTRADICTS (downstream of the MDR + Managed IT line items above) |
| Office internet/failover, managed firewalls, independent backup | $400-$700 / $300-$500 / $100-$200 | body, lines 376-378 | UNVERIFIABLE (generic infrastructure cost ranges) |
| Author bio boilerplate | - | author-bio-box, line ~188 | 9-certs claim MATCHES; other claims UNVERIFIABLE |
| "dental" grep hits (lines 209, 302) | false positive | - | Not a violation - substring is inside "accidental" ("accidental deletion"), not a dentist/dental client mention |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | |
| Visible publish date | Pass | June 2, 2026 |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | lines 49-50, 47 |
| Exactly one H1 | Pass | |
| Title, meta description, canonical present | Pass | lines 6-8 |
| FAQ JSON-LD matching visible text | Pass | 6 Q&As, verified verbatim match against H3 headings |
| Internal links to relevant service pages | Pass | /managed-it-services, /it-consulting-vcio, /backup-disaster-recovery linked |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Price contradicts published pricing: "MDR / managed security" at $25/user and "Managed IT" at $150-$200/user, framed as Ghosxt's recommended budget tied to "the managed IT services page," do not match the published per-user tiers ($125/$175/$250) | body, lines 372-381 |
| Security-stack vendor names: "Fortinet, Sophos, Palo Alto, or a managed Meraki" as recommended firewall brands | body, line 345 |

## Top Three Fixes
1. Rework the "realistic budget" table so the Ghosxt-delivered portion (MDR + Managed IT, currently $175-$225/user combined) matches the actual published per-user tier pricing ($125/$175/$250), or clearly reframe it as illustrative market rates rather than a Ghosxt quote.
2. Genericize the firewall vendor list ("Fortinet, Sophos, Palo Alto, or a managed Meraki") to a vendor-neutral description, consistent with the "no vendor names" house rule.
3. Verify the shared author-bio boilerplate claims (see password-manager report).
