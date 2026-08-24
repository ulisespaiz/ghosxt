# Page Audit: /cybersecurity-santa-cruz

## Route
/cybersecurity-santa-cruz (file: cybersecurity-santa-cruz.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/operator is an engineer with DoD infrastructure experience | "an engineer with DoD infrastructure experience" | cybersecurity-santa-cruz.html:220, 240; JSON-LD:45 | MATCHES |
| Footer attribution | "Built by an engineer from the federal contracting world." | cybersecurity-santa-cruz.html:493 | MATCHES |
| "Government-grade" cybersecurity positioning | og:description / twitter:description: "Government-grade cybersecurity for Santa Cruz small business" | cybersecurity-santa-cruz.html:13, 19 | UNVERIFIABLE - marketing language grounded in the real DoD/federal-contractor background fact, but not a verbatim VERIFIED FACTS claim; no clearance level is disclosed, which is correct |
| Google review count/rating | "26 Google reviews," 5.0 stars (stated twice) | cybersecurity-santa-cruz.html:231, 244 | MATCHES (source fact itself carries `[VERIFY live count]` in CLAUDE.md) |
| Client history / geography | "trusted by businesses across Monterey County since 2021 and beyond" | cybersecurity-santa-cruz.html:231 | CONTRADICTS - "since 2021" matches VERIFIED FACTS (`[VERIFY year]`), but "Monterey County" is geographically wrong on a Santa Cruz page: this page's own JSON-LD (line 47) places Santa Cruz in Santa Cruz County. Identical text also appears on cloud-services-santa-cruz.html:231 and was already flagged on santa-cruz.html |
| Response time | "Same-day remote support; on-site within 24–48 hours" | cybersecurity-santa-cruz.html:241 | UNVERIFIABLE - not itemized in VERIFIED FACTS (the only response figure there is the "4-hour notification on actual or reasonably suspected critical incidents" contracted deliverable, a different metric). VERIFY WITH ULI |
| Pricing | "Published upfront," free assessment for a written quote | cybersecurity-santa-cruz.html:232, 242, FAQ:333-334 | MATCHES conceptually - no specific dollar figures stated on this page to check against the four published tiers |
| Verticals served | Tech/SaaS, tourism/hospitality, healthcare, professional services | cybersecurity-santa-cruz.html:220, 253; JSON-LD:45 | MATCHES excluded-vertical rule - no dental/dentist mention found |
| Endpoint Detection & Response: "Huntress EDR with a 24/7 SOC on every endpoint, layered with Microsoft Defender" | Vendor-named capability claim | cybersecurity-santa-cruz.html:265 | CONTRADICTS house rule - names the third-party vendor "Huntress." The underlying capability (managed detection and response with a 24/7 SOC) is in VERIFIED FACTS, but the vendor name itself must never be published. "Microsoft Defender" is fine - VERIFIED FACTS itself names "Defender for Business" |
| "Ransomware behavior is detected and isolated before it spreads" | Automatic-isolation behavior claim | cybersecurity-santa-cruz.html:265 | UNVERIFIABLE - VERIFIED FACTS lists "managed detection and response with a 24/7 SOC," not a specific automatic-isolation behavior guarantee. VERIFY WITH ULI |
| Identity & MFA: phishing-resistant MFA, Conditional Access, legacy auth blocked | Capability claim | cybersecurity-santa-cruz.html:268-269 | MATCHES - both are explicitly listed in VERIFIED FACTS |
| SOC 2 Readiness: "access controls, logging, change management, and vendor-risk evidence... run day to day" | Ongoing consulting/build-out claim | cybersecurity-santa-cruz.html:271-273, 305; FAQ:69-74/325-326 | UNVERIFIABLE - goes beyond the VERIFIED FACTS contracted deliverable ("SOC 2 documentation for every platform in our stack provided during onboarding") into ongoing readiness consulting. VERIFY WITH ULI |
| "Immutable Backup," "backups the production network cannot reach or delete," monthly tested restores | Capability claim | cybersecurity-santa-cruz.html:275-277, 305 | UNVERIFIABLE - VERIFIED FACTS lists "cloud backup for Microsoft 365 and Google Workspace" with no "immutable" qualifier and no stated restore-testing cadence. VERIFY WITH ULI |
| Email Security & Training | Capability claim | cybersecurity-santa-cruz.html:279-281 | MATCHES - "security awareness training" is explicitly listed; email filtering is close to "DNS and web filtering" |
| 24/7 Monitoring & Response, "human who responds" | Capability claim | cybersecurity-santa-cruz.html:283-285 | MATCHES - 24/7 SOC is explicitly listed |
| "Vulnerability management" | Capability claim | JSON-LD:45; FAQ:65/322 | UNVERIFIABLE - not itemized in VERIFIED FACTS (closest listed item is "OS and third-party patching," which is not the same as vulnerability scanning/management). VERIFY WITH ULI |
| HIPAA-aligned security and documentation (healthcare) | Compliance claim | cybersecurity-santa-cruz.html:305 | UNVERIFIABLE - exceeds the itemized contracted deliverables (annual risk assessment, SOC 2 documentation, written policy suite). VERIFY WITH ULI |
| PCI-aware point-of-sale security, segmented guest Wi-Fi (hospitality) | Compliance/capability claim | FAQ:81/330 | UNVERIFIABLE - not on the VERIFIED FACTS capability list. VERIFY WITH ULI |
| "Every business carrying cyber-insurance gets the controls underwriters now require (MFA, EDR, immutable backup, email security)" | Capability/positioning claim | cybersecurity-santa-cruz.html:305 | UNVERIFIABLE in part - describes controls for the *client's* cyber insurance, not Ghosxt's own $1M coverage; repeats the unverified "immutable backup" and unnamed "EDR" framing flagged above |
| FAQ content (JSON-LD vs. visible) | 4 Q&As: general cybersecurity, SOC 2, tourism/hospitality, pricing | cybersecurity-santa-cruz.html:58-93 (JSON-LD) vs. 317-336 (visible) | MATCHES - word-for-word identical, single consistent JSON-LD block |
| Service area | Santa Cruz, Santa Cruz County; on-site county, remote nationwide; nearby Watsonville, Monterey, Salinas, San Jose | cybersecurity-santa-cruz.html:47 (JSON-LD), 220, 313 | MATCHES |
| No em dash, Cisco certification, dental/dentist, or clearance level found | - (absent) | confirmed via full-file search | MATCHES |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at lines 236-247 has all fields. Response-time value itself is unverified (see Claims Table). |
| FAQ present with real question-and-answer text | Pass | 4 `<details>` Q&As at lines 320-335, matching the FAQPage JSON-LD word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (219) + lead paragraph (220, ~115 words) plainly state the offer well within the first 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at line 219. |
| Title, meta description, canonical present | Pass | Title line 6; meta description line 7; canonical line 8. |
| JSON-LD present (list which types) | Pass | Single `@graph` block (lines 35-96): Service, BreadcrumbList, FAQPage. No duplicate/conflicting schema block found on this page. |
| Content that exists only inside JS | Pass | No content found that is JS-only; all visible copy is server-rendered. |
| Icon-only table cells | N/A / Pass | No `<table>` elements exist on this page. |
| display:none on content that should be crawlable | Pass | No `display:none` occurrences found in this file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner" id="cookieBanner">` (lines 107-121) sits in the DOM before `<nav class="navbar">` (124) and before `<main id="main-content">` (213). No duplicated nav element found. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | `/pricing` linked at 232, 242 (plus nav/footer). `/cyber-insurance-compliance` at 305. City links: `/santa-cruz`, `/watsonville`, `/monterey`, `/salinas`, `/san-jose` (313); cross-links to `/cybersecurity`, `/managed-it-services`, `/help-desk-it-support`, `/backup-disaster-recovery`. |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Vendor name - "Huntress" (third-party EDR vendor) named directly | cybersecurity-santa-cruz.html:265 |
| Unlisted capability - automatic ransomware detection/isolation behavior claim | cybersecurity-santa-cruz.html:265 - VERIFY WITH ULI |
| Unlisted capability - "Immutable Backup" with monthly tested restores | cybersecurity-santa-cruz.html:275-277, 305 - VERIFY WITH ULI |
| Unlisted capability - SOC 2 "readiness" / ongoing controls-building consulting beyond onboarding documentation | cybersecurity-santa-cruz.html:271-273, 305; FAQ:69-74/325-326 - VERIFY WITH ULI |
| Unlisted capability - "vulnerability management" | JSON-LD:45; FAQ:65/322 - VERIFY WITH ULI |
| Unlisted capability - PCI-aware POS security / segmented guest Wi-Fi | FAQ:81/330 - VERIFY WITH ULI |
| Unlisted capability - HIPAA-aligned security and documentation | cybersecurity-santa-cruz.html:305 - VERIFY WITH ULI |

No em dash, Cisco certification, dental/dentist mention, or clearance-level statement was found on this page.

## Top Three Fixes
1. Remove the vendor name "Huntress" from line 265 - house rules forbid publishing vendor names. Describe the capability generically as "managed detection and response with a 24/7 SOC," matching the phrasing VERIFIED FACTS already uses; "Microsoft Defender" on the same line is fine to keep.
2. Fix the "trusted by businesses across Monterey County since 2021" trust callout (line 231) - Santa Cruz is in Santa Cruz County. Identical wrong-county text also appears on cloud-services-santa-cruz.html:231 and was already flagged on santa-cruz.html, pointing to a shared, un-parameterized snippet across the templated city pages.
3. VERIFY WITH ULI the capability claims that exceed the VERIFIED FACTS list before this ships: automatic ransomware isolation, immutable backup, SOC 2 readiness/build-controls consulting, vulnerability management, PCI-aware point-of-sale security, and HIPAA-aligned documentation (lines 265, 271-277, 305, FAQ:65/81/330). Either confirm these are genuinely delivered and add them to VERIFIED FACTS, or trim the page back to the confirmed capability list.
