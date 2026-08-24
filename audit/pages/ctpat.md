# Page Audit: /ctpat

## Route
/ctpat (file: ctpat.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner background | "engineer with DoD infrastructure experience" | ctpat.html:13 (meta description) | MATCHES |
| Owner background | "Ghosxt (run by an engineer with DoD infrastructure experience)" | ctpat.html:367 | MATCHES |
| Owner background | "Our C-TPAT work is led by an engineer whose background includes DoD-cleared work on government systems" | ctpat.html:998-1000 | MATCHES (uses the approved phrase "DoD-cleared"; no clearance level stated) |
| Owner background | "led by an engineer with DoD infrastructure experience who has built security programs for government environments" | ctpat.html:1211-1212 | MATCHES (inside HTML comment, not currently rendered — see Legibility notes) |
| Footer tagline | "Built by an engineer from the federal contracting world." | ctpat.html:1399 | MATCHES |
| Footer tagline | "Government-grade IT for small business." | ctpat.html:1277 | UNVERIFIABLE (marketing puffery, not a checkable fact) |
| OG description | "Ghosxt brings government-grade cybersecurity to supply chain compliance." | ctpat.html:27 | UNVERIFIABLE (marketing puffery) |
| Service area (national) | JSON-LD WebPage description: "...cybersecurity compliance services for importers, carriers, and logistics companies **across the United States**." | ctpat.html:87 | CONTRADICTS — inconsistent with the rest of the site, which only ever lists Central Coast CA service cities (see next two rows). No VERIFIED FACT establishes nationwide service. [VERIFY WITH ULI] |
| Service area (JSON-LD) | Service schema areaServed: California, Salinas, Monterey, Santa Cruz, San Jose | ctpat.html:147-167 | UNVERIFIABLE — Salinas matches the base of operations; the other three cities are not confirmed by VERIFIED FACTS but are plausible and consistent with the footer list |
| Service area (footer) | Salinas, Monterey, Watsonville, Hollister, Santa Cruz, Gilroy, San Jose, Pacific Grove, Carmel, Seaside, Marina | ctpat.html:1418-1428 | UNVERIFIABLE (Salinas matches; the rest are plausible, site-wide boilerplate) |
| Owner identity (implied) | Calendly link "calendly.com/ulises-ghosxt" | ctpat.html:270, 316, 393, 1245, 1283, 1346, 1464 | MATCHES (consistent with sole engineer Ulises Paiz) |
| Phone number | (831) 204-0501 | ctpat.html:268, 1463 | UNVERIFIABLE (no source of truth in CLAUDE.md; not contradicted) |
| Email | sales@ghosxt.com | ctpat.html:1253, 1386 | UNVERIFIABLE (not contradicted) |
| JSON-LD FAQPage content | 4 Q&A pairs about C-TPAT, cybersecurity requirements, how Ghosxt helps, who needs compliance | ctpat.html:93-128 | CONTRADICTS legibility requirement — this structured data has no matching visible content anywhere on the rendered page (see Legibility Checklist). Text itself is general/plausible. |
| Hidden FAQ (HTML comment) | 6 Q&A pairs incl. "60–90 days" / "90–120 days" C-TPAT compliance timelines | ctpat.html:1150-1163 (inside comment block 1077-1222) | UNVERIFIABLE — timeframe not in VERIFIED FACTS; currently not live/crawlable (see notes), but present in source and would need verification before ever being uncommented |
| Hidden FAQ (HTML comment) | "Ghosxt maps C-TPAT cybersecurity controls to NIST CSF (Cybersecurity Framework) and CIS Controls" | ctpat.html:1192-1197 | UNVERIFIABLE — framework-mapping capability not in VERIFIED FACTS capability list; currently dormant (commented out) |
| CBP program facts | "CBP's updated Minimum Security Criteria... Cybersecurity Section (2023+)"; six-criteria breakdown; member benefits (fewer exams, FAST lanes, AEO mutual recognition) | ctpat.html:365-370, 547-841 (throughout "What is C-TPAT," "Member Benefits," and "Minimum Security Criteria" sections) | UNVERIFIABLE — external CBP/regulatory facts, out of scope of VERIFIED FACTS; not internally contradicted, treated as general industry background |
| Capability: vulnerability assessment | "We conduct a full network and systems vulnerability assessment, document findings..., and provide a remediation roadmap" (Criterion 01 "How Ghosxt Covers It") | ctpat.html:699-703 | CONTRADICTS — VERIFIED FACTS states the "annual independent risk assessment [is] arranged through a third-party assessor," not conducted in-house by Ghosxt directly. [VERIFY WITH ULI] |
| Capability: access controls | "We implement and document MFA, **Active Directory** policies, privileged access management, and access reviews" (Criterion 02) | ctpat.html:723-728 | CONTRADICTS/UNVERIFIABLE — "Active Directory" is a Microsoft vendor product name not in the approved capability list (which cites Microsoft 365/Intune/Defender/Conditional Access, not on-prem/hybrid AD); "privileged access management" is not a listed capability (password vault is, PAM is not the same thing). See House-Rule Violations. |
| Capability: security awareness training | "role-based training covering phishing, social engineering, password hygiene, and incident reporting, with completion records" (Criterion 03) | ctpat.html:751-754 | MATCHES core claim (security awareness training is a listed capability); "completion records" is a plausible unverified detail |
| Capability: incident response | "write, implement, and test your incident response plan (including tabletop exercises)" (Criterion 04) | ctpat.html:776-779 | MATCHES core claim (written IR policy is a listed deliverable); "tabletop exercises" testing is an unverified extension, not explicitly in VERIFIED FACTS [VERIFY] |
| Capability: infrastructure security | "automated patch management, **EDR** endpoint protection, **network segmentation**, and... full asset inventory and architecture diagram" (Criterion 05) | ctpat.html:804-807 | CONTRADICTS/UNVERIFIABLE — patch management matches; EDR, network segmentation, and asset-inventory/architecture-diagram deliverables are not in the VERIFIED FACTS capability list (which lists MDR w/24/7 SOC, not EDR specifically). See House-Rule Violations. |
| Capability: vendor security | "We build a vendor security review process, assess your current third-party relationships..." (Criterion 06) | ctpat.html:831-834 | UNVERIFIABLE — not an explicitly listed capability or deliverable |
| Process: ongoing compliance | "continuous monitoring, annual security reviews, and updates as CBP criteria evolve" | ctpat.html:1063-1068 | UNVERIFIABLE/loose MATCH — roughly maps to "24/7 SOC" and "annual independent risk assessment" but wording is not exact |
| Hero UI mockup | "C-TPAT Cybersecurity Checklist" panel showing sample Compliant/Needs Review/Gap Identified rows | ctpat.html:409-506 | UNVERIFIABLE — generic illustrative mockup, not attributed to a named client; not a testimonial or case study, but flagged per instructions since it could read as an implied real assessment outcome. [VERIFY WITH ULI] — do not rewrite or remove, per house rules on anonymized examples. |
| Verticals served | Importers, Carriers, Freight Forwarders, 3PLs & Warehouses, Customs Brokers, Manufacturers | ctpat.html:884-952 | UNVERIFIABLE (no VERIFIED FACTS list of approved verticals to check against); confirmed NOT dental/dentist — no violation |
| Excluded vertical check | No mention of "dental" or "dentist" anywhere on page | n/a | MATCHES (absence confirmed by grep) |
| Cisco certification check | No mention of "Cisco" anywhere on page | n/a | MATCHES (absence confirmed by grep) |
| Clearance level check | No mention of a specific clearance level (Secret, Top Secret, TS/SCI, etc.) | n/a | MATCHES (absence confirmed by grep; only the approved "DoD-cleared" phrasing is used) |
| SIEM check | No mention of "SIEM" anywhere on page | n/a | MATCHES (absence confirmed by grep) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No such block exists anywhere on the page. No stated response time (e.g., 4-hour notification), no "who you'll work with" statement, no pricing link in the body content — only generic nav/footer links to /pricing. |
| FAQ present with real question-and-answer text | Fail | The entire visible FAQ section (ctpat.html:1078-1221) is wrapped in an HTML comment (`<!-- ... -->` opens at 1077, closes at 1222) and does not render. The page has zero visible FAQ text despite shipping a `FAQPage` JSON-LD block (lines 93-128) with 4 Q&A pairs and dead client-side JS (lines 1437-1460) that wires up `.faq-item` accordion behavior for elements that don't exist in the DOM. |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero subtitle (ctpat.html:365-370) plainly states the offer within ~60 words: "Ghosxt... helps importers, carriers, and logistics companies meet and maintain those requirements without disrupting operations." |
| Exactly one H1 | Pass | Single `<h1 class="ctpat-hero-title">` at line 359; no other H1 found. |
| Title, meta description, canonical present | Pass | Title (8-10), meta description (11-14), canonical (15) all present. |
| JSON-LD present (list which types) | Pass, with issue | Two script blocks: (1) `@graph` with `WebPage` and `FAQPage` (lines 78-131); (2) `@graph` with `Service` (lines 135-172). FAQPage has no matching visible content — see FAQ row above. |
| Content that exists only inside JS | Pass (none found) | No content appears to be injected client-side; page is static markup. The FAQ toggle script (1437-1460) is dead code (queries a commented-out section) but doesn't inject content. Shared main.min.js was not audited in depth (page-agnostic bundle). |
| Icon-only table cells | N/A | No `<table>` elements on this page. |
| display:none on content that should be crawlable | Pass (none found) | No inline or class-based `display:none` found; no `sr-only` usage either, though none is currently needed since no content is hidden that way (the FAQ is hidden via HTML comment instead, which is arguably worse — see Fail above). |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, lines 184-208) sits in the DOM before `<nav>` (211) and before `<main id="main-content">` (327). No duplicated nav found. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | /pricing linked in navbar (254), mobile nav (310), and footer (1301). Vertical pages linked in footer Services column, including /trucking-it-services, /agriculture-it-services, /manufacturing-it-services, etc. (1321-1328). One contextual in-body link to /trucking-it-services from the "Carriers" card (905). City pages linked in footer Service Areas list (1418-1428). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Vendor name: "Active Directory" (Microsoft product) named explicitly | ctpat.html:725 |
| Capability not in VERIFIED FACTS / contradiction: in-house "full network and systems vulnerability assessment" performed directly by Ghosxt, conflicting with the VERIFIED FACTS requirement that the annual risk assessment is "arranged through a third-party assessor" | ctpat.html:699-703 |
| Capability not in VERIFIED FACTS: "privileged access management" | ctpat.html:726 |
| Capability not in VERIFIED FACTS: "EDR endpoint protection" (VERIFIED FACTS lists MDR with a 24/7 SOC, not EDR as a distinct named capability) | ctpat.html:805 |
| Capability not in VERIFIED FACTS: "network segmentation" | ctpat.html:798, 806, 1029 |
| Capability not in VERIFIED FACTS: "full asset inventory and architecture diagram" as a deliverable | ctpat.html:807 |
| Capability not in VERIFIED FACTS: "vendor security review process" / third-party vendor assessment as a named deliverable | ctpat.html:832 |
| Capability not in VERIFIED FACTS: "maps C-TPAT cybersecurity controls to NIST CSF... and CIS Controls" (dormant — inside HTML comment, not currently live) | ctpat.html:1192-1197 |

## Top Three Fixes
1. Fix the FAQ/JSON-LD mismatch: either restore the visible FAQ section (currently commented out at ctpat.html:1077-1222) so it matches the `FAQPage` structured data at lines 93-128, or remove the `FAQPage` JSON-LD entirely until real visible FAQ content ships. Shipping FAQPage schema with zero matching rendered content is a structured-data integrity problem for both traditional and AI search crawlers.
2. Add an at-a-glance block near the top of the page with service area, who the visitor will talk to, stated response time, and a pricing link — none of these four elements currently exist anywhere on the page.
3. Reconcile the "How Ghosxt Covers It" capability claims (Criteria 01, 02, 05, 06) with the VERIFIED FACTS capability and deliverable list — remove "Active Directory" (vendor name), replace "EDR," "network segmentation," "privileged access management," and "vendor security review process" with approved capability language or get explicit sign-off from Uli, and correct Criterion 01 so it doesn't claim Ghosxt performs the annual risk assessment in-house when VERIFIED FACTS says it's arranged through a third-party assessor.
