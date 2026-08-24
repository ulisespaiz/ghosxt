# Page Audit: /cybersecurity

## Route
/cybersecurity (file: cybersecurity.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/operator is an engineer with DoD infrastructure experience | "an engineer with DoD infrastructure experience" | cybersecurity.html:559, 593, 769, 326 (JSON-LD) | MATCHES |
| Business location | Salinas, CA 93901 | cybersecurity.html:71-73 (JSON-LD PostalAddress) | MATCHES |
| Client history start | "trusted by businesses across Monterey County since 2021 and beyond" | cybersecurity.html:570 | MATCHES (source fact itself carries [VERIFY year] in CLAUDE.md) |
| Certifications listed | "CompTIA CySA+, Security+, Network+, A+, Cloud+, ITIL 4, Linux Essentials, and Microsoft AZ-104" | cybersecurity.html:326 (JSON-LD FAQ answer), 769 (visible FAQ) | CONTRADICTS - "A+" is not in the VERIFIED FACTS credential list; SecurityX (CAS-005), Project+, and the M.S. Cybersecurity and Information Assurance (WGU, 2026) are also omitted |
| Google review count/rating | "26 Google reviews," 5.0 stars | cybersecurity.html:570, 583 | MATCHES (source fact itself carries [VERIFY live count] in CLAUDE.md) |
| Tiny Team Managed Security price | $600/mo flat, 1-4 users | cybersecurity.html:713, 765 | MATCHES |
| Core Managed IT price | $125 per user/month | cybersecurity.html:714, 765 | MATCHES |
| Secure Growth price | $175 per user/month | cybersecurity.html:715, 765 | MATCHES |
| Compliance & Continuity price | $250 per user/month | cybersecurity.html:716, 765 | MATCHES |
| Response time (three separate statements on one page) | Key-facts: "Same-day remote support; on-site within 24-48 hours" vs. Service areas: "Remote response is immediate... on-site... same-day or next-day" vs. FAQ: "Remote response is immediate... within minutes after-hours... on-site... typically same-day" | cybersecurity.html:580 vs. 725 vs. 785 | CONTRADICTS - three different, mutually inconsistent values for the same claim on the same page |
| Compliance frameworks supported (CMMC 2.0, NIST 800-171, C-TPAT, HIPAA, PCI-DSS, SOC 2 readiness, CIS Controls v8, NIST CSF, CCPA/CPRA) | Full framework list | cybersecurity.html:652-660, 773 | UNVERIFIABLE - VERIFIED FACTS names only "annual independent risk assessment" and "SOC 2 documentation for every platform" as contracted deliverables; this broader framework-support claim is not itself listed. VERIFY WITH ULI |
| Dental listed as a served/target vertical | "HIPAA (healthcare and dental practices)"; "Healthcare and dental (HIPAA-regulated)" | cybersecurity.html:654, 696 | CONTRADICTS - VERIFIED FACTS: "Excluded vertical: dentists. Dental must not appear as a client or target industry anywhere." |
| EDR capability: "isolate compromised devices automatically" | Automatic isolation behavior claim | cybersecurity.html:604-606; JSON-LD 203 | UNVERIFIABLE - VERIFIED FACTS lists "managed detection and response with a 24/7 SOC," not EDR-branded automatic isolation. VERIFY WITH ULI |
| "Immutable Backup and Disaster Recovery" | Backups described as immutable | cybersecurity.html:616-618; JSON-LD 224; FAQ 761, 777 | UNVERIFIABLE - VERIFIED FACTS lists "cloud backup for Microsoft 365 and Google Workspace," not immutability. VERIFY WITH ULI |
| "Cloud Security (Microsoft 365, Azure, AWS)" | AWS/Azure security capability | cybersecurity.html:632; JSON-LD 252 | UNVERIFIABLE - VERIFIED FACTS names only Microsoft 365 hardening (Intune, Defender for Business, Conditional Access) and Google Workspace identity; AWS/Azure security is not listed. VERIFY WITH ULI |
| "Network Security and Firewalls" | Segmentation, firewall rules, guest Wi-Fi isolation, traffic monitoring | cybersecurity.html:628-629; JSON-LD 245 | UNVERIFIABLE - not in the VERIFIED FACTS capability list. VERIFY WITH ULI |
| "Vendor and Supply Chain Security" | Third-party posture review | cybersecurity.html:635-637 | UNVERIFIABLE - not in the VERIFIED FACTS capability list. VERIFY WITH ULI |
| "Continuous vulnerability scanning" | Vulnerability management claim | cybersecurity.html:619-621; JSON-LD 231 | UNVERIFIABLE - VERIFIED FACTS lists "OS and third-party patching" but not vulnerability scanning. VERIFY WITH ULI |
| Email security: DMARC/SPF/DKIM configuration, attachment sandboxing | Email security capability | cybersecurity.html:611-613; JSON-LD 217 | UNVERIFIABLE - not in the VERIFIED FACTS capability list (closest listed item is "DNS and web filtering"). VERIFY WITH ULI |
| Duplicate/conflicting structured data for the same page | Two separate `Service` nodes share `@id` "https://ghosxt.com/cybersecurity#service" with different `name` values ("Cybersecurity Services for Small Business" vs. "Cybersecurity") and different `areaServed` city counts (11 cities + State + Country vs. 4 cities + State only); two separate `BreadcrumbList` nodes disagree on structure (3-item with "Services" as position 2 vs. 2-item with "Cybersecurity" as position 2, and the second has no `@id`) | cybersecurity.html:129-296 vs. 377-431 | CONTRADICTS - the two `<script type="application/ld+json">` blocks (main "STRUCTURED DATA" block and the later "ghosxt:extra-schema" block) disagree with each other |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at lines 574-586 has all four fields (Service area, Led by, Response, Pricing). Response-time value it shows contradicts the response-time text elsewhere on the page (see Claims Table). |
| FAQ present with real question-and-answer text | Pass | 7 `<details>` Q&As at lines 759-790, matching the FAQPage JSON-LD word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (558) + lead paragraph (559) plainly state the offer ("government-grade cybersecurity controls to California small businesses...") well within the first 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at line 558. |
| Title, meta description, canonical present | Pass | Title line 8; meta description lines 9-12; canonical line 13. |
| JSON-LD present (list which types) | Pass, with issue | Types present: LocalBusiness, Service (defined twice, conflicting - see Claims Table), BreadcrumbList (defined twice, conflicting - see Claims Table), FAQPage. |
| Content that exists only inside JS | Pass | No content found that is JS-only; all visible copy is server-rendered in the HTML. |
| Icon-only table cells | N/A / Pass | No `<table>` elements exist on this page. |
| display:none on content that should be crawlable | Pass | No `display:none` occurrences found in this file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (lines 440-456) sits in the DOM before `<nav class="navbar">` (459) and before `<main id="main-content">` (552). |
| Internal links to pricing and to the relevant city or vertical pages | Pass | `/pricing` linked 5x (571, 581, 718, 765, footer). 11 city-specific cybersecurity pages linked at lines 729-739 (Salinas, Monterey, Watsonville, Hollister, Santa Cruz, Gilroy, San Jose, Pacific Grove, Carmel, Seaside, Marina). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental listed as a served/target vertical (excluded vertical) | cybersecurity.html:654 ("HIPAA (healthcare and dental practices)"), 696 ("Healthcare and dental (HIPAA-regulated)") |
| Capability not in VERIFIED FACTS: "Cloud Security (Microsoft 365, Azure, AWS)" - AWS/Azure security not listed as a delivered capability | cybersecurity.html:632; JSON-LD line 252 |
| Capability not in VERIFIED FACTS: "Network Security and Firewalls" | cybersecurity.html:628-629; JSON-LD line 245 |
| Capability not in VERIFIED FACTS: "Vendor and Supply Chain Security" | cybersecurity.html:635-637 |
| Capability not in VERIFIED FACTS: "Immutable Backup" (backup capability is listed, "immutable" is not) | cybersecurity.html:616-618; JSON-LD line 224 |
| Capability not in VERIFIED FACTS: EDR with automatic device isolation | cybersecurity.html:604-606; JSON-LD line 203 |

No em dashes, no Cisco certification claims, no vendor/tool-brand names, and no stated clearance level were found on this page.

## Top Three Fixes
1. Remove "dental" from both the Compliance frameworks list (line 654) and the Industries we secure list (line 696) - dentists are an explicitly excluded vertical per VERIFIED FACTS. [VERIFY WITH ULI what, if anything, replaces the HIPAA-healthcare line item.]
2. Reconcile the three conflicting response-time claims: key-facts block (line 580: "Same-day remote support; on-site within 24-48 hours") vs. Service areas section (line 725: "Remote response is immediate... on-site... same-day or next-day") vs. FAQ (line 785: "Remote response is immediate... on-site... typically same-day"). Pick one accurate figure and make all three match.
3. Remove the fabricated "A+" certification from the FAQ text and JSON-LD (lines 326, 769) and bring the credentials line in sync with VERIFIED FACTS (CySA+, Security+, Network+, Cloud+, Project+, SecurityX CAS-005, ITIL 4 Foundation, Linux Essentials, Microsoft AZ-104, M.S. Cybersecurity and Information Assurance).

Additional lower-priority items worth the PM's attention: the two conflicting JSON-LD `Service`/`BreadcrumbList` blocks (main block at 129-296 vs. "ghosxt:extra-schema" block at 377-431) should be de-duplicated to one authoritative block per type; and several capability claims (AWS/Azure cloud security, network security/firewalls, vendor/supply-chain security, immutable backups, EDR auto-isolation, vulnerability scanning, email DMARC/SPF/DKIM specifics) go beyond the VERIFIED FACTS capability list and should be confirmed with Uli or trimmed back to what is verified.
