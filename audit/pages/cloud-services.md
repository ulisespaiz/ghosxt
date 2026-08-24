# Page Audit: /cloud-services

## Route
/cloud-services (file: cloud-services.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/operator is an engineer with DoD infrastructure experience | "engineer with DoD infrastructure experience" / "Federal-grade engineer's playbook" / "Built by an engineer from the federal contracting world" | cloud-services.html:8, 121, 437, 457, 747 | MATCHES |
| Business location | Salinas, CA 93901 | cloud-services.html:59-62 (JSON-LD PostalAddress) | MATCHES |
| Client history start | "trusted by businesses across Monterey County since 2021 and beyond" | cloud-services.html:448 | MATCHES (source fact itself carries [VERIFY year] in CLAUDE.md) |
| Google review count/rating | "26 Google reviews," 5.0 stars (stated twice) | cloud-services.html:448, 461 | MATCHES (source fact itself carries [VERIFY live count] in CLAUDE.md) |
| Phone number | (831) 204-0501 / +18312040501 | cloud-services.html:54, 383, 443, 462, 785 | UNVERIFIABLE — not itemized in VERIFIED FACTS; internally consistent across the page |
| Pricing structure | "Cloud and Microsoft 365 management is included in every managed IT plan. Standalone migrations... priced per scope after the assessment." | cloud-services.html:563 | MATCHES — no specific dollar figures stated on this page to check against the four published tiers |
| Response time | "Same-day remote support; on-site within 24-48 hours" | cloud-services.html:458 | UNVERIFIABLE — not in VERIFIED FACTS. The only response-type figure in VERIFIED FACTS is "4-hour notification on actual or reasonably suspected critical incidents," a different metric (incident notification, not general support response). VERIFY WITH ULI |
| Free assessment offer | "No-obligation 30-minute IT assessment" / "30 minutes. No sales script. No obligation." | cloud-services.html:441, 460, 521, 525, 596, 599 | UNVERIFIABLE — offer terms not itemized in VERIFIED FACTS; internally consistent across the page |
| "Microsoft Secure Score audit" as part of the free assessment | Specific named Microsoft tool used during assessment | cloud-services.html:521 | UNVERIFIABLE — not in VERIFIED FACTS capability list. VERIFY WITH ULI |
| Defender for Business & Defender for Endpoint, integrated into "Microsoft 365 Defender XDR portal" | Capability claim | cloud-services.html:482-483 | UNVERIFIABLE — VERIFIED FACTS lists "Defender for Business" only; "Defender for Endpoint" and the "XDR portal" integration claim are not listed. VERIFY WITH ULI |
| Conditional Access: phishing-resistant MFA, legacy auth blocked, risk-based sign-in, FIDO2 hardware keys for admins, country/device-state restrictions | Capability claim | cloud-services.html:486-487 | MATCHES in part (Conditional Access is listed) / UNVERIFIABLE for the FIDO2-hardware-key and country/device-state-restriction specifics, which go beyond the listed capability. VERIFY WITH ULI |
| Microsoft Intune device management | Capability claim | cloud-services.html:490-491 | MATCHES — Intune is explicitly listed |
| SharePoint & Teams architecture/governance (sites, libraries, retention, external sharing) | Capability claim | cloud-services.html:494-495, 583-584 (FAQ) | UNVERIFIABLE — not in the VERIFIED FACTS capability list. VERIFY WITH ULI |
| Exchange Online hardening: SPF/DKIM/DMARC, anti-phishing, transport rules | Capability claim | cloud-services.html:498-499 | UNVERIFIABLE — not in the VERIFIED FACTS capability list (closest listed item is "DNS and web filtering"). VERIFY WITH ULI |
| DLP & Sensitivity Labels (credit cards, SSNs, PHI detection; regulated-industry labels) | Capability claim | cloud-services.html:502-503 | UNVERIFIABLE — not in the VERIFIED FACTS capability list. VERIFY WITH ULI |
| "The vast majority of M365 small business breaches we have ever responded to walked through one of those defaults" | Implicit breach-response track record claim | cloud-services.html:478 | UNVERIFIABLE — no breach-response volume/history is in VERIFIED FACTS. VERIFY WITH ULI |
| "We have run dozens of each [migration type]" | Quantified migration volume claim | cloud-services.html:513 | UNVERIFIABLE — specific volume not in VERIFIED FACTS. VERIFY WITH ULI |
| Anonymized case examples: Watsonville distribution / Salinas ag clients (pre-harvest file-share migration), San Jose / Gilroy tech firms (tenant consolidation from acquisitions), Monterey / Carmel clinics (HIPAA-preserving migration) | City + vertical case examples, no named clients | cloud-services.html:514 | UNVERIFIABLE — anonymized case examples per instructions; flagged VERIFY WITH ULI, not proposed for rewrite or removal |
| Azure/hybrid capabilities: Entra ID hybrid join, Privileged Identity Management, Azure VMs w/ reserved-instance pricing, Azure Files/Blob Storage, Azure Site Recovery, Azure Backup w/ long-term retention, Azure Virtual Desktop / Windows 365 | Capability claim list | cloud-services.html:532-541 | UNVERIFIABLE — none of these Azure infrastructure/DR items are in the VERIFIED FACTS capability list (which covers M365 hardening, not Azure IaaS/DR). VERIFY WITH ULI |
| Verticals served in cloud projects | "healthcare, legal, professional services, distribution, manufacturing, and SaaS" | cloud-services.html:549 | MATCHES excluded-vertical rule — no dental/dentist mention found |
| City service area (on-site) | Salinas, Monterey, Watsonville, Hollister, Santa Cruz, Gilroy, San Jose, Pacific Grove, Carmel, Seaside, Marina | cloud-services.html:549, 69-113 (JSON-LD), 763-777 (footer) | MATCHES across body, footer, and primary JSON-LD |
| Duplicate/conflicting structured data for the same page | Two separate `Service` nodes share `@id` "https://ghosxt.com/cloud-services#service": the primary block (name "Cloud Services and Microsoft 365") lists 11 cities + State + Country in `areaServed`; the second "ghosxt:extra-schema" block (name "Cloud Services") lists only 4 cities + State. Two `BreadcrumbList` nodes also disagree (3-item "Services" node vs. 2-item node with no `@id`) | cloud-services.html:117-179 vs. 261-315 | CONTRADICTS — the two JSON-LD blocks disagree with each other on service-area scope |
| Credentials directly relevant to this page (AZ-104, Cloud+) never named | Page discusses Azure/M365 extensively but cites no specific Microsoft/CompTIA credential | cloud-services.html:437, 457 (only "DoD infrastructure experience" is cited) | UNVERIFIABLE / opportunity gap — not a contradiction, but AZ-104 and Cloud+ from VERIFIED FACTS are never named despite being the most on-topic credentials for a cloud page |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at lines 453-464 has Service area, Led by, Response, Pricing, Free, Rated, Direct line. Response-time value is unverified (see Claims Table). |
| FAQ present with real question-and-answer text | Pass | 5 `<details>` Q&As at lines 570-589, matching the FAQPage JSON-LD (lines 212-253) word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (436) + lead paragraph (437) plainly state the offer ("someone who knows how to set Microsoft 365 up properly, decide what genuinely belongs in Azure... Ghosxt does that work") well within the first 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at line 436. |
| Title, meta description, canonical present | Pass | Title line 7; meta description line 8; canonical line 9. |
| JSON-LD present (list which types) | Pass, with issue | Types present: LocalBusiness, Service (defined twice, conflicting — see Claims Table), BreadcrumbList (defined twice, conflicting — see Claims Table), FAQPage. |
| Content that exists only inside JS | Pass | No content found that is JS-only; all visible copy is server-rendered in the HTML. |
| Icon-only table cells | N/A / Pass | No `<table>` elements exist on this page. |
| display:none on content that should be crawlable | Pass | No `display:none` occurrences found in this file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (lines 324-338) sits in the DOM before `<nav class="navbar">` (341) and before `<main id="main-content">` (430). |
| Internal links to pricing and to the relevant city or vertical pages | Pass | `/pricing` linked 3x (449, 459, 563). 11 city-specific cloud-services pages linked at line 549 (Salinas, Monterey, Watsonville, Hollister, Santa Cruz, Gilroy, San Jose, Pacific Grove, Carmel, Seaside, Marina), plus general city pages at line 514 (Watsonville, Salinas, San Jose, Gilroy, Monterey, Carmel) and footer (766-777). Cross-link to `/cybersecurity` at line 506. |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Capability not in VERIFIED FACTS: "Defender for Endpoint" and "Microsoft 365 Defender XDR portal" integration (only "Defender for Business" is listed) | cloud-services.html:482-483 |
| Capability not in VERIFIED FACTS: FIDO2 hardware keys and country/device-state restrictions as specific Conditional Access features | cloud-services.html:486-487 |
| Capability not in VERIFIED FACTS: SharePoint & Teams architecture/governance as a distinct deliverable | cloud-services.html:494-495, 583-584 |
| Capability not in VERIFIED FACTS: Exchange Online hardening (SPF/DKIM/DMARC, anti-phishing, transport rules) | cloud-services.html:498-499 |
| Capability not in VERIFIED FACTS: DLP & Sensitivity Labels | cloud-services.html:502-503 |
| Capability not in VERIFIED FACTS: "Microsoft Secure Score audit" as a named assessment tool | cloud-services.html:521 |
| Capability not in VERIFIED FACTS: Privileged Identity Management | cloud-services.html:535 |
| Capability not in VERIFIED FACTS: Azure Site Recovery | cloud-services.html:532, 538 |
| Capability not in VERIFIED FACTS: Azure Backup / long-term retention (VERIFIED FACTS lists "cloud backup for Microsoft 365 and Google Workspace" only, not Azure infrastructure backup) | cloud-services.html:532, 539 |
| Capability not in VERIFIED FACTS: Azure Virtual Desktop / Windows 365 | cloud-services.html:540 |

No em dashes, no Cisco certification claims, no dental/dentist mentions, no vendor/tool-brand names, and no stated clearance level were found on this page.

## Top Three Fixes
1. VERIFY WITH ULI every Azure/M365-specific capability claim beyond the VERIFIED FACTS list before this ships: Defender for Endpoint, the Defender XDR portal integration, FIDO2 admin keys, SharePoint/Teams governance work, Exchange Online hardening specifics, DLP & Sensitivity Labels, Microsoft Secure Score audits, Privileged Identity Management, Azure Site Recovery, Azure Backup, and Azure Virtual Desktop/Windows 365 (lines 482-541, 521). Either confirm these are genuinely delivered and add them to VERIFIED FACTS, or trim the page back to the confirmed capability list.
2. De-duplicate the conflicting JSON-LD: the "ghosxt:extra-schema" block (lines 261-315) repeats the `Service` and `BreadcrumbList` types already defined in the primary `@graph` (lines 47-256) but with a shorter, inconsistent `areaServed` list (4 cities vs. 11 cities + State + Country). Remove the duplicate block or make it match the primary schema exactly.
3. Move the cookie banner (lines 324-338) so it no longer precedes `<nav>` and `<main>` in the DOM, and VERIFY WITH ULI the "Same-day remote support; on-site within 24-48 hours" response-time claim (line 458), which has no corresponding entry in VERIFIED FACTS and should not be conflated with the contracted 4-hour critical-incident notification window.

Additional lower-priority items: consider naming the AZ-104 and Cloud+ credentials explicitly on this page since they are the most directly relevant VERIFIED FACTS credentials to a cloud/M365 services page and are currently omitted in favor of the generic "DoD infrastructure experience" phrasing; the "dozens of" migrations claim (line 513) and the breach-response track-record claim (line 478) are unquantified and should be confirmed with Uli; the three anonymized city/vertical case examples (line 514) are UNVERIFIABLE per house rules and are flagged for Uli's review only, not for rewrite or removal.
