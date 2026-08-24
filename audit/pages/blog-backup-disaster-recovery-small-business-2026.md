# Page Audit: /blog/backup-disaster-recovery-small-business-2026

## Route
/blog/backup-disaster-recovery-small-business-2026.html

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Founder credentials/bio | Same boilerplate as other posts | author-bio-box | MATCHES cert count; job title/business count UNVERIFIABLE |
| Backup vendor names cited as examples | Veeam, Datto (SIRIS/SaaS Protection/Workplace), Acronis, Afi, AvePoint, Unitrends, Carbonite; storage tech S3 Object Lock, Azure Blob, Wasabi Object Lock | multiple sections (Layer 2, Layer 3, FAQ, immutability section) | Third-party product-category vendor names presented as general market options for readers evaluating backup tooling - not explicitly stated as Ghosxt's own delivered stack, but the "never publish vendor names" house rule is broad; flagged below for PM review |
| Backup budget figures | "$700 to $1,800 per month" (25-user firm, no DRaaS); "$1,000 to $3,000" with DRaaS; per-line items ($5-12/user workstation, $150-400 server, $3-6/user M365) | "What costs what" section, ~lines 362-373; FAQ | UNVERIFIABLE - presented as general 2026 market pricing, not stated as Ghosxt's own price sheet; does not explicitly contradict published tiers |
| Ransomware backup-targeting statistic | "70 to 90 percent of ransomware events" target backups first, per CISA/Mandiant/Unit 42/Sophos X-Ops/Coveware | body, ~line 236 | UNVERIFIABLE (third-party statistic, attributed but not linked) |
| Ransomware event cost reference | "$80,000 to $250,000" per event for a 25-person firm | body, ~line 373; FAQ | UNVERIFIABLE (third-party/industry cost estimate) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | |
| Visible publish date | Pass | `<time datetime="2026-05-22">` |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | |
| Exactly one H1 | Pass | |
| Title, meta description, canonical present | Pass | |
| FAQ JSON-LD matching visible text | Pass | 6 Q&A pairs verbatim-match body FAQ |
| Internal links to relevant service pages | Pass | Links to /backup-disaster-recovery, /cybersecurity, /managed-it-services, /cloud-services, plus related blog posts |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Multiple third-party backup-vendor names (Veeam, Datto, Acronis, Afi, AvePoint, Unitrends, Carbonite) named across several sections in a post that also describes what "we recommend" for clients | Layer 2 (~line 268), Layer 3 (~line 288), FAQ (~lines 425, 440) |

No em dash, no dental, no Cisco certification claim, no clearance level, no SIEM claim.

## Top Three Fixes
1. Review the repeated backup-vendor naming (Veeam, Datto, Acronis, Afi, AvePoint, Unitrends, Carbonite) against the "never publish vendor names" rule - this is the single largest concentration of vendor names in the batch; either confirm vendor-agnostic market education is acceptable or reword to name categories only (e.g., "third-party Microsoft 365 backup products").
2. Tag the backup-budget dollar ranges as general market estimates (not Ghosxt's price sheet) if there's any risk of reader confusion with the published pricing tiers.
3. Tag the shared bio block's job title/business count as [VERIFY] (site-wide fix).
