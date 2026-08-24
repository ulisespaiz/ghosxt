# Page Audit: /blog/trucking-logistics-it-services-salinas-owner-operator

## Route
/blog/trucking-logistics-it-services-salinas-owner-operator (file: blog/trucking-logistics-it-services-salinas-owner-operator.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Author credentials/bio | Sitewide bio: 10+ years, 9 certs, DoD experience, 40+ businesses | line 194 | MATCHES (cert count matches VERIFIED FACTS; years/business-count UNVERIFIABLE, not contradicted) |
| Ghosxt's own trucking cybersecurity stack, explicit, with vendor names | "EDR on every office endpoint. Microsoft Defender for Business at the M365 Business Premium tier, or SentinelOne / Huntress / CrowdStrike at the next tier up." | line 301 | CONTRADICTS on two counts: (1) "EDR" not in VERIFIED FACTS capability list; (2) SentinelOne, Huntress, and CrowdStrike are unlisted vendor names. "Microsoft Defender for Business" alone is whitelisted by VERIFIED FACTS. |
| Recommended firewall equipment, incl. Cisco Meraki | "Real firewall (Fortinet, Sophos, Palo Alto, or a managed Meraki). Not a Linksys." | line 346 | Meraki is a Cisco brand. VERIFIED FACTS: "Mentions of Cisco or Meraki equipment we deploy are fine only if true [VERIFY]" — this is presented as Ghosxt's own recommended baseline ("The baseline we recommend for a 5-15 person Salinas trucking back office"), so it needs a [VERIFY] tag confirming Ghosxt actually deploys/recommends this equipment. As written it is untagged. Fortinet, Sophos, and Palo Alto are additional vendor names with no VERIFIED FACTS carve-out. |
| 24/7 MDR coverage claim | "24/7 MDR coverage. A monitored detection layer with a real responder on the other end." | line 305 | MATCHES VERIFIED FACTS ("managed detection and response with a 24/7 SOC") |
| Illustrative budget: "$1,500 and $2,500 per month" for a 5-truck operation, itemized with per-user dollar figures | "Microsoft 365 Business Premium: 4 users x $22 = $88," "MDR / managed security: 4 users x $25 = $100," "Managed IT... 4 users x $150-$200 = $600-$800" | lines 392-401 | CONTRADICTS/UNVERIFIABLE — the "$150-$200" per-user managed IT figure does not match any published VERIFIED FACTS tier (Core $125, Secure Growth $175, Compliance & Continuity $250 per user/mo); "$25 per user" for MDR is also not an itemized VERIFIED FACTS line. This reads as an invented illustrative budget rather than the actual published pricing. VERIFY WITH ULI |
| Ransomware incident cost range | "typically lands between $80,000 and $250,000 in our recent IR work" | line 403 | UNVERIFIABLE — presented as a real, sourced range from Ghosxt's own incident-response work; no such figure or case history is in VERIFIED FACTS. VERIFY WITH ULI (source it, or soften to industry-wide framing) |
| Immutable backup/RTO-RPO capability | "backup and continuity layer also covers backup and disaster recovery as a managed service: tested restores, immutable copies, and a written RTO and RPO" | line 315 | UNVERIFIABLE — VERIFIED FACTS lists only "cloud backup for Microsoft 365 and Google Workspace" for backup; no immutability or RTO/RPO commitment is listed. Same issue previously flagged in backup-disaster-recovery.md. |
| Cyber insurance pricing example | "Premiums for a 5-truck operation are usually under $300 per month" | line 383 | UNVERIFIABLE — specific dollar figure not in VERIFIED FACTS (which confirms cyber liability insurance is held but does not give client-facing premium figures). VERIFY WITH ULI |
| Third-party industry tool names (Samsara, Motive, Geotab, Omnitracs, McLeod LoadMaster, TMW, Aljex, Truckstop.com, ITS Dispatch, AscendTMS, Axon, ProTransport, Tailwind, DAT, RMIS) | ELD/TMS vendor comparisons | lines 253-256, 265-272, 331 | Industry-education content about third-party trucking software, not part of Ghosxt's own security/capability stack — not flagged under the "security-stack vendor names" scope of this audit, though it is a large volume of named products on a Ghosxt-branded page. Flagging for awareness only. |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | Line 189, author-bio box 191-195 |
| Visible publish date | Pass | `<time datetime="2026-05-24">May 24, 2026</time>` line 181 |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | Lines 42-53 |
| Exactly one H1 | Pass | Line 187 |
| Title, meta description, canonical | Pass | Lines 6, 7, 8 |
| FAQ JSON-LD matching visible text | Pass | 5 Q&As (63-114) match visible FAQ (423-439) verbatim |
| Internal links to relevant service pages | Pass | Links to /trucking-it-services, /ctpat, /cybersecurity, /managed-it-services, /backup-disaster-recovery (410-414) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Capability term "EDR" not in VERIFIED FACTS | line 301 (and general "endpoint detection" phrasing elsewhere is closer to acceptable) |
| Vendor names published: SentinelOne, Huntress, CrowdStrike (security tools) | line 301 |
| Vendor names published: Fortinet, Sophos, Palo Alto (firewall vendors, no VERIFIED FACTS carve-out) | line 346 |
| Cisco/Meraki equipment mention untagged | "a managed Meraki" — line 346. Per VERIFIED FACTS this is conditionally allowed ("fine only if true [VERIFY]") but is not tagged [VERIFY] on the live page. |
| Pricing that does not match published VERIFIED FACTS tiers ("$150-$200" per user for managed IT) | lines 396, 401 |

No em dashes, no Cisco certification claims (Meraki appears only as an equipment/brand mention, not a certification claim), no dental/dentist, no clearance level, no SIEM were found on this page.

## Top Three Fixes
1. Rewrite line 301 to drop "EDR" and remove SentinelOne/Huntress/CrowdStrike — describe the capability using only VERIFIED FACTS language ("managed detection and response with a 24/7 SOC"); Microsoft Defender for Business alone may stay, since it's whitelisted.
2. Line 346: either confirm Ghosxt genuinely deploys/recommends Meraki equipment and add an explicit [VERIFY] tag (or move the confirmed fact into VERIFIED FACTS), or remove "Meraki" along with Fortinet/Sophos/Palo Alto and describe the requirement generically ("a business-grade firewall, not a consumer router").
3. Reconcile the "$150-$200 per user" managed-IT budget line (lines 396, 401) and the "$80,000-$250,000" IR cost range (line 403) against actual VERIFIED FACTS pricing/case history — replace with the real published per-user tiers or soften to unquantified language if the figures cannot be sourced.
