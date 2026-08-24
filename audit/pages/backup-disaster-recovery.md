# Page Audit: /backup-disaster-recovery

## Route
/backup-disaster-recovery (file: backup-disaster-recovery.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/operator is an engineer with DoD infrastructure experience | "an engineer with DoD infrastructure experience" | backup-disaster-recovery.html:8 (meta description), 121 (JSON-LD Service description), 433 (lead paragraph), 453 (key-facts "Led by"), 745 (footer, "federal contracting world") | MATCHES |
| Business location | Salinas, CA 93901 | backup-disaster-recovery.html:58-62 (JSON-LD PostalAddress) | MATCHES |
| Client history start | "trusted by businesses across Monterey County since 2021 and beyond" | backup-disaster-recovery.html:444 | MATCHES (source fact itself carries [VERIFY year] in CLAUDE.md) |
| Google review count/rating | "26 Google reviews," 5.0 stars | backup-disaster-recovery.html:444, 457 | MATCHES (source fact itself carries [VERIFY live count] in CLAUDE.md) |
| Response time | "Same-day remote support; on-site within 24–48 hours" | backup-disaster-recovery.html:454 | UNVERIFIABLE - no response-time figure exists in VERIFIED FACTS. VERIFY WITH ULI |
| Free assessment length/offer | "No-obligation 30-minute IT assessment" / "30 minutes" | backup-disaster-recovery.html:456, 517, 435-437 | UNVERIFIABLE - duration not stated in VERIFIED FACTS; internally consistent across the page though |
| Pricing pointer | "Published upfront" links to /pricing, no numbers restated on-page | backup-disaster-recovery.html:445, 455 | MATCHES (correctly defers to the pricing page rather than restating figures) |
| BCDR pricing structure | "BCDR is included in every managed IT plan. Standalone BCDR engagements are available, priced per scope." | backup-disaster-recovery.html:561 | UNVERIFIABLE - not itemized anywhere in VERIFIED FACTS pricing. VERIFY WITH ULI |
| Vendor/product names published for backup tooling | "Veeam Data Platform," "Veeam Hardened Repository," "Datto SIRIS / Alto," "Wasabi, Backblaze B2, or Azure Blob storage" | backup-disaster-recovery.html:479-480, 483-484, 496, 552 | CONTRADICTS - VERIFIED FACTS: "never publish vendor names" |
| Capability: image-based/application-aware server & appliance backup (Hyper-V, VMware, physical Windows/Linux; on-site appliance + cloud replication) | Full "Veeam Data Platform" / "Datto SIRIS / Alto" card descriptions | backup-disaster-recovery.html:479-484, 552 | UNVERIFIABLE - not in the VERIFIED FACTS capability list (only "cloud backup for Microsoft 365 and Google Workspace" is listed for backup). VERIFY WITH ULI |
| Capability: Microsoft 365 & Google Workspace backup (Exchange Online, SharePoint, OneDrive, Teams) | "Microsoft 365 & Google Workspace Backup" card | backup-disaster-recovery.html:487-488, 554, 586; JSON-LD FAQ 246 | MATCHES VERIFIED FACTS capability "cloud backup for Microsoft 365 and Google Workspace" |
| Capability: endpoint backup for workstations | "For workstations holding data that lives nowhere else... we add endpoint-level backup" | backup-disaster-recovery.html:491-492 | UNVERIFIABLE - not in the VERIFIED FACTS capability list. VERIFY WITH ULI |
| Capability: immutable cloud object storage / object lock as a delivered offering | "3-2-1 rule, plus immutability" section; "Immutable Cloud Object Storage" card | backup-disaster-recovery.html:473-475, 495-496, 553 | UNVERIFIABLE - "immutable" backup is not in the VERIFIED FACTS capability list. VERIFY WITH ULI |
| Capability: database-aware backup (SQL Server, PostgreSQL, MySQL) | "Database-Aware Backup" card | backup-disaster-recovery.html:499-500 | UNVERIFIABLE - not in the VERIFIED FACTS capability list. VERIFY WITH ULI |
| Capability: RTO/RPO planning and commitments as a service deliverable | "RTO and RPO in plain English" section; "RTO and RPO commitments tied to actual workload classes" | backup-disaster-recovery.html:508-510, 558 | UNVERIFIABLE - not a contracted deliverable in VERIFIED FACTS. VERIFY WITH ULI |
| Capability: monthly tested restores with a written restore-test report | "Monthly tested restores of at least one workload, with written reports" | backup-disaster-recovery.html:230 (JSON-LD FAQ), 517, 555, 578 | UNVERIFIABLE - not among the listed contracted deliverables (4-hour notification, annual risk assessment, SOC 2 docs, policy suite). VERIFY WITH ULI |
| Capability: annual disaster-recovery tabletop exercise | "Annual disaster recovery tabletop exercise with your team" | backup-disaster-recovery.html:557 | UNVERIFIABLE - not in VERIFIED FACTS. VERIFY WITH ULI |
| Capability: detailed ransomware recovery runbook (Hour 1 through Day 30) | "Ransomware recovery: day one to day thirty" section | backup-disaster-recovery.html:527-536 | UNVERIFIABLE - procedural claim not in VERIFIED FACTS. VERIFY WITH ULI |
| Dental listed as a served/target vertical | "Healthcare, dental, and clinical practices in Monterey, Carmel, and Pacific Grove have HIPAA exposure" | backup-disaster-recovery.html:543 | CONTRADICTS - VERIFIED FACTS: "Excluded vertical: dentists. Dental must not appear as a client or target industry anywhere." |
| Illustrative downtime-cost examples (Salinas cooler, CPA firm, Monterey clinic, San Jose SaaS company) | RTO/RPO worked examples | backup-disaster-recovery.html:510; duplicated in JSON-LD FAQ 222 and visible FAQ 574 | UNVERIFIABLE - reads as anonymized/illustrative case material. VERIFY WITH ULI. Not proposing rewrite or removal per instructions. |
| Duplicate/conflicting structured data for the same page | Two separate `Service` nodes share `@id` "https://ghosxt.com/backup-disaster-recovery#service" with different `areaServed` (11 cities + State + Country vs. 4 cities + State only); two `BreadcrumbList` nodes disagree (3-item with "Services" as position 2, `@id` present vs. 2-item skipping "Services", no `@id`) | backup-disaster-recovery.html:117-180 & 182-204 (main block) vs. 262-277 & 279-311 ("ghosxt:extra-schema" block) | CONTRADICTS - the two `<script type="application/ld+json">` blocks disagree with each other |
| Contact info | Phone (831) 204-0501, email sales@ghosxt.com | backup-disaster-recovery.html:54-55 (JSON-LD), 379, 439, 599-601, 732-736 | UNVERIFIABLE - not covered by VERIFIED FACTS (presumed accurate site-wide, not page-specific) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at lines 449-460 has Service area, Led by, Response, Pricing, Free, Rated, and Direct line. |
| FAQ present with real question-and-answer text | Pass | 5 `<details>` Q&As at lines 568-587, matching the FAQPage JSON-LD (lines 206-250) word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (432) + lead paragraph (433) plainly state the offer ("Ghosxt builds the kind of backup and disaster recovery program... Sized and priced for small business...") well within the first 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at line 432. |
| Title, meta description, canonical present | Pass | Title line 7; meta description line 8; canonical line 9. |
| JSON-LD present (list which types) | Pass, with issue | Types present: LocalBusiness, Service (defined twice, conflicting - see Claims Table), BreadcrumbList (defined twice, conflicting - see Claims Table), FAQPage. |
| Content that exists only inside JS | Pass | No content found that is JS-only; all visible copy (including FAQ answers) is server-rendered in the HTML. |
| Icon-only table cells | N/A / Pass | No `<table>` elements exist on this page. |
| display:none on content that should be crawlable | Pass | No `display:none` occurrences found in this file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner" id="cookieBanner">` (lines 320-334) sits in the DOM before `<nav class="navbar">` (337) and before `<main id="main-content">` (426). |
| Internal links to pricing and to the relevant city or vertical pages | Pass | `/pricing` linked 3x (445, 455, 561). City pages linked: Salinas, Monterey, Watsonville, Hollister, Santa Cruz, Gilroy, San Jose, Carmel, Pacific Grove (510, 543) plus full footer service-areas list (764-774). Vertical/related links to `/ctpat` (543) and `/ransomware-recovery` (528). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental listed as a served/target vertical (excluded vertical) | backup-disaster-recovery.html:543 ("Healthcare, dental, and clinical practices... have HIPAA exposure") |
| Vendor/product names published: Veeam Data Platform, Veeam Hardened Repository, Datto SIRIS/Alto, Wasabi, Backblaze B2, Azure Blob | backup-disaster-recovery.html:479-480, 483-484, 496, 552 |
| Capability not in VERIFIED FACTS: image-based/application-aware server & appliance backup (Hyper-V, VMware, physical Windows/Linux servers; on-site appliance + cloud replication) | backup-disaster-recovery.html:479-484, 552 |
| Capability not in VERIFIED FACTS: immutable cloud object storage / object-lock as a delivered offering | backup-disaster-recovery.html:473-475, 495-496, 553 |
| Capability not in VERIFIED FACTS: endpoint backup for workstations | backup-disaster-recovery.html:491-492 |
| Capability not in VERIFIED FACTS: database-aware backup (SQL Server, PostgreSQL, MySQL) | backup-disaster-recovery.html:499-500 |
| Capability not in VERIFIED FACTS: RTO/RPO planning and commitments as a service deliverable | backup-disaster-recovery.html:508-510, 558 |
| Capability not in VERIFIED FACTS: monthly tested restores with written restore-test report as a contracted deliverable | backup-disaster-recovery.html:230, 517, 555, 578 |
| Capability not in VERIFIED FACTS: annual disaster-recovery tabletop exercise | backup-disaster-recovery.html:557 |
| Capability not in VERIFIED FACTS: detailed ransomware recovery runbook/timeline (Hour 1 through Day 30) | backup-disaster-recovery.html:527-536 |

No em dashes, no Cisco certification claims, and no stated clearance level were found on this page (checked via pattern search).

## Top Three Fixes
1. Strip every vendor/product name from the "What we deploy" cards (lines 477-503) and the BCDR bullet list (line 552) - Veeam, Datto SIRIS/Alto, Wasabi, Backblaze B2, Azure Blob all directly violate "never publish vendor names." Rewrite in outcome language.
2. Remove "dental" from line 543 - dentists are an explicitly excluded vertical. [VERIFY WITH ULI what, if anything, replaces the healthcare/HIPAA line item.]
3. This page's entire core offering - image-based server/appliance backup, immutable object-lock storage, endpoint backup, database-aware backup, RTO/RPO commitments, monthly tested restores with written reports, an annual DR tabletop exercise, and a detailed hour-1-to-day-30 ransomware runbook - goes well beyond the VERIFIED FACTS capability list, which names only "cloud backup for Microsoft 365 and Google Workspace" for backup and lists no restore-testing cadence, tabletop exercise, or RTO/RPO commitment among contracted deliverables. VERIFY WITH ULI which of these are actually delivered before this page ships; as written it describes a materially larger service than what is verified.

Additional lower-priority item: the two conflicting JSON-LD `Service`/`BreadcrumbList` blocks (main block at 44-253 vs. "ghosxt:extra-schema" block at 257-311) should be de-duplicated to one authoritative block per type.
