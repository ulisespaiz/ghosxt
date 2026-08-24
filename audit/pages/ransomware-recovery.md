# Page Audit: /ransomware-recovery

## Route
/ransomware-recovery (file: ransomware-recovery.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/operator is an engineer with DoD infrastructure experience | "an engineer with DoD infrastructure experience" | ransomware-recovery.html:13, 19, 44, 239 (og/twitter/JSON-LD/hero lead) | MATCHES |
| Footer tagline: "Built by an engineer from the federal contracting world" | Federal/DoD-background positioning | ransomware-recovery.html:508 | MATCHES (consistent with "prior DoD/federal contractor infrastructure experience") |
| Core offer: "Ransomware Recovery & Emergency IT Support" as a discrete, named standalone service | Title, H1, JSON-LD `Service` entity, hero, service-card grid | ransomware-recovery.html:6, 41-44, 238-239, 262-291 | UNVERIFIABLE - VERIFIED FACTS' capability list does not itemize "ransomware recovery" or "incident response" as a delivered service; it lists MDR/24-7 SOC, patching, DNS/web filtering, security awareness training, cloud backup, Apple Business Manager, M365/Google Workspace hardening. VERIFY WITH ULI before publishing (see task note: standalone ransomware-recovery service must be checked against the capability list) |
| "Recovery from immutable backups" / "immutable, properly isolated backups" / "immutable backups" | Backups explicitly characterized as immutable | ransomware-recovery.html:7 (meta description), 44 (JSON-LD Service description), 110 & 350 (FAQ answer, JSON-LD + visible), 274-275 (service card 3), 309 (body), 322 (body) | UNVERIFIABLE - VERIFIED FACTS lists only "cloud backup for Microsoft 365 and Google Workspace" as the capability; immutability is not stated anywhere in VERIFIED FACTS. VERIFY WITH ULI |
| Response time: remote triage "often within minutes"; on-site mobilization "same-day... across the Central Coast" | Specific response-time SLA-like claims | ransomware-recovery.html:70 & 330 (FAQ, JSON-LD + visible), 287 (service card "24/7 Emergency Response") | UNVERIFIABLE - the only documented SLA in VERIFIED FACTS is the "4-hour notification on actual or reasonably suspected critical incidents" contracted deliverable, which is never stated on this page and is a different commitment (notification, not response/mobilization time). VERIFY WITH ULI |
| "EDR with 24/7 monitoring" as a hardening measure | ransomware-recovery.html:110 & 350 (FAQ), 279 (service card 4), 322 (body) | MATCHES (reasonable paraphrase of VERIFIED FACTS' "managed detection and response with a 24/7 SOC"; no vendor name used) | MATCHES |
| "phishing-resistant MFA" | ransomware-recovery.html:110 & 350 (FAQ), 279, 322 | MATCHES (VERIFIED FACTS: "phishing-resistant MFA" via Google Workspace as identity provider) | MATCHES |
| "segmentation" as a hardening/closing-the-door measure | ransomware-recovery.html:110 & 350 (FAQ), 279, 322 | UNVERIFIABLE - network segmentation is not itemized in the VERIFIED FACTS capability list. VERIFY WITH ULI |
| Cyber-insurance claim support: "We document the incident, scope, and remediation the way carriers and breach counsel require... produce the report you need for the claim"; "cyber-insurance documentation" | ransomware-recovery.html:44 (JSON-LD description), 99-104 & 345-346 (FAQ, JSON-LD + visible), 282-283 (service card 5) | UNVERIFIABLE - VERIFIED FACTS' contracted deliverables list "annual independent risk assessment," "SOC 2 documentation for every platform," and "written policy suite," but not post-incident cyber-insurance claim documentation as a named deliverable. VERIFY WITH ULI |
| Anonymized track-record claim: "We have brought businesses back from incidents with no clean backup by recovering from cloud copies, snapshots, unaffected endpoints, and in some cases vendor decryptors" | ransomware-recovery.html:94 (JSON-LD FAQ), 342 (visible FAQ) | UNVERIFIABLE - anonymized case-example-style claim with no specifics to check. VERIFY WITH ULI flag only; not proposing rewrite or removal per instructions |
| Service area: "Central Coast businesses"; JSON-LD `areaServed` = Monterey, Santa Cruz, San Benito, Santa Clara counties + State of California | ransomware-recovery.html:46-51 (JSON-LD), 239, 316 (body) | UNVERIFIABLE - VERIFIED FACTS states only "Based in Salinas, CA" with no enumerated county list, but this is consistent with the footer's 11-city service-area list (527-538) which spans these counties; no contradiction found |
| Phone number (831) 204-0501 used throughout as the contact/emergency line | ransomware-recovery.html:7 and 20+ further occurrences (hero, CTAs, FAQ, footer mobile bar) | UNVERIFIABLE - no phone number is listed in VERIFIED FACTS to check against; internally consistent across the page |
| No pricing figures, Google review count, client names, or named certifications appear on this page | N/A | - | N/A - nothing to verify; nothing invented either |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No unified at-a-glance block exists. "Central Coast" (service area), "A real engineer on the phone, not a ticket in a queue" (who you talk to, line 287; also 250), and "often within minutes" / "same-day" (response time, lines 70/330) are scattered through prose, but there is no pricing link anywhere in the body content - only in global nav (177), mobile nav (219), and footer (408). |
| FAQ present with real question-and-answer text | Pass | Six real Q&A pairs, present both in JSON-LD `FAQPage` (63-114) and as visible `<details>` elements (328-351), text matches word-for-word between the two. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (238) plus hero lead paragraph (239) plainly state the offer - "Ghosxt provides rapid ransomware recovery and emergency IT for Central Coast businesses, led by an engineer with DoD infrastructure experience" - within the first ~90 words of body copy. |
| Exactly one H1 | Pass | Single `<h1>` at line 238. |
| Title, meta description, canonical present | Pass | Title line 6; meta description line 7; canonical line 8. |
| JSON-LD present (list which types) | Pass | One `@graph` block (34-117) containing: `Service`, `BreadcrumbList`, `FAQPage`. |
| Content that exists only inside JS | Pass | No JS-only content found; all visible copy (including FAQ answers) is present in static HTML, duplicated in JSON-LD. |
| Icon-only table cells | N/A / Pass | No `<table>` elements exist on this page. |
| display:none on content that should be crawlable | Pass | No `display:none` occurrences in this HTML file (linked CSS files were not audited - out of scope per house rules, no CSS changes). |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner" id="cookieBanner">` (128-142) sits in the DOM before `<nav class="navbar">` (143) and before `<main id="main-content">` (232). |
| Internal links to pricing and to the relevant city or vertical pages | Fail | `/pricing` is linked only in the global nav (177), mobile nav (219), and footer (408) - no pricing link inside the body/main content. City links appear only in the generic footer "Service Areas" list (527-538), not contextually placed in body copy. Body does link to related service pages (`/cyber-insurance-compliance` 283, `/cybersecurity` 322 & 350, `/backup-disaster-recovery` 322 & 350, `/managed-it-services` 322) but no vertical-industry page (ransomware recovery is not vertical-specific, so this may be acceptable, but no city-specific contextual link exists either). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Capability not in VERIFIED FACTS: "Ransomware Recovery" marketed as its own standalone named service/deliverable (title, JSON-LD `Service` type, H1, full page premise) | ransomware-recovery.html:6, 39-53, 238-239 - page-wide |
| Capability not in VERIFIED FACTS: "immutable" backups (immutability is never stated as a fact; only "cloud backup for Microsoft 365 and Google Workspace" is verified) | ransomware-recovery.html:7, 44, 110, 274-275, 309, 322, 350 - 7 occurrences |
| Capability not in VERIFIED FACTS: "segmentation" as a named hardening deliverable | ransomware-recovery.html:110, 279, 322, 350 |

No em dashes (including URL-encoded `%E2%80%94`), no Cisco/Meraki mentions, no dental/dentist mentions, no vendor/tool-brand names, no SIEM, and no stated clearance level were found on this page.

## Top Three Fixes
1. VERIFY WITH ULI whether "Ransomware Recovery" is an actual delivered standalone service before this page goes live - it is not itemized anywhere in VERIFIED FACTS' capability or contracted-deliverables list, yet it is the entire premise of the page (title, H1, JSON-LD `Service` type, all six service cards, all six FAQs). This is the highest-priority open question on the page.
2. VERIFY WITH ULI the specific technical claims stacked on top of that premise: "immutable backups" (7 occurrences - lines 7, 44, 110, 274-275, 309, 322, 350), the "within minutes" / "same-day" response-time claims (lines 70, 287, 330 - distinct from the verified 4-hour notification deliverable, which is never mentioned on this page), "segmentation" (lines 110, 279, 322, 350), and the cyber-insurance claim-documentation commitment (lines 44, 99-104, 282-283, 345-346).
3. Add a visible at-a-glance block near the top of the page with service area, who the client talks to, response time, and an in-body pricing link - none of these currently appear together, and no pricing link exists anywhere outside the global nav/footer.

Lower-priority: the cookie banner sits before `<nav>` and `<main>` in the DOM (128-142) - this may be a site-wide template pattern rather than page-specific; and no page body links point to a relevant city page (only the generic sitewide footer list).
