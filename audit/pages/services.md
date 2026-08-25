# Page Audit: /services

## Route
/services (file: services.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Engineer background | "An engineer with DoD infrastructure experience" | services.html:254 (key-facts "Led by") | MATCHES |
| Engineer background | "Built around the discipline of an engineer with DoD infrastructure experience" | services.html:285 (Cybersecurity card) | MATCHES |
| Engineer background | "The kind of backup program a DoD engineer would trust their own data on" | services.html:295 (Backup & DR card) | MATCHES |
| Engineer background | "led by an engineer with DoD infrastructure experience" | services.html:320 (Ransomware Recovery card) | MATCHES |
| Engineer background | "by an engineer with DoD infrastructure experience who has operated these controls" (CMMC/NIST 800-171) | services.html:330 | UNVERIFIABLE - VERIFY WITH ULI (VERIFIED FACTS states general "prior DoD/federal contractor infrastructure experience," not specifically operating CMMC/NIST 800-171 controls) |
| Engineer background | "from an engineer with DoD infrastructure experience" | services.html:350 (Penetration Testing card) | MATCHES |
| No clearance level stated | n/a | entire page | MATCHES (compliant - "DoD infrastructure experience" used throughout, never a clearance level) |
| Marketing tagline | "Government-grade IT for small business." | services.html:415 (footer tagline) | MATCHES in tone (no clearance level stated) |
| Marketing tagline | "Built by an engineer from the federal contracting world." | services.html:539 (footer copyright) | MATCHES |
| Google reviews | "Rated 5.0 across 26 Google reviews" | services.html:246 (trust callout) | MATCHES site-config.json (google_review_count: 26, google_rating: "5.0") |
| Google reviews | "5.0 on 26 Google reviews" | services.html:258 (key-facts "Rated") | MATCHES |
| Client history | "trusted by businesses across Monterey County since 2021 and beyond" | services.html:246 | MATCHES the value in VERIFIED FACTS, but VERIFY WITH ULI - the source fact itself is tagged "[VERIFY year]," so the underlying year is not fully confirmed even though the page is consistent with it |
| Contact phone | "(831) 204-0501" | services.html:181, 241, 259, 320, 577 | UNVERIFIABLE - not listed in VERIFIED FACTS (contact info, not a substantive claim; consistent throughout page) |
| Service area | "On-site across Monterey County, remote across the United States." | services.html:235 (lead paragraph) | UNVERIFIABLE / internally inconsistent - narrower than the other two service-area statements on the same page (see next two rows) |
| Service area | "California's Central Coast & Bay Area" | services.html:253 (key-facts "Service area") | UNVERIFIABLE / internally inconsistent - VERIFIED FACTS only states "Based in Salinas, CA," no defined coverage area to check against |
| Service area | "on-site across the Central Coast and South Bay, and remotely nationwide" | services.html:375 | UNVERIFIABLE / internally inconsistent - contradicts :235's narrower "Monterey County" on-site claim; roughly matches :253 |
| Response time | "Same-day remote support; on-site within 24–48 hours" | services.html:255 (key-facts "Response") | UNVERIFIABLE - not in VERIFIED FACTS (the only response-time figure on record is the 4-hour critical-incident notification, a different metric that this does not directly contradict but also does not confirm) |
| Pricing | "Published upfront, free assessment for a written quote" (links to /pricing) | services.html:256 | MATCHES structurally (no dollar figures stated on this page to check) |
| Free assessment | "No-obligation 30-minute IT assessment" | services.html:257, 388 | UNVERIFIABLE - assessment length not specified in VERIFIED FACTS |
| Managed IT pricing structure | "flat-rate Tiny Team Managed Security for 1 to 4 users up through per-user tiers for larger teams" | services.html:270 | MATCHES VERIFIED FACTS structure (Tiny Team $600/mo flat 1–4 users; Core/Secure Growth/Compliance & Continuity per-user tiers) - no dollar figures on this page, so no numeric conflict possible |
| Help desk inclusion | "Included with managed IT" | services.html:275 | UNVERIFIABLE - plausible, not explicit in VERIFIED FACTS |
| Cybersecurity capabilities | "EDR, identity hardening, MFA, immutable backup, vulnerability management, security awareness training, and incident response" | services.html:285 | MIXED - MFA, immutable/cloud backup, and security awareness training MATCH the VERIFIED FACTS capability list; **EDR is not on that list** (flagged below as a violation, same category as SIEM); "identity hardening," "vulnerability management," and "incident response" are UNVERIFIABLE as named deliverables |
| Cloud services | "Azure where it earns its place... Conditional Access... SharePoint architecture" | services.html:290 | MIXED - Conditional Access MATCHES the listed capability; Azure and SharePoint are not explicitly named in the VERIFIED FACTS capability list (only "Microsoft 365 hardening with Intune, Defender for Business, and Conditional Access" and Google Workspace identity) → UNVERIFIABLE |
| Backup & DR specifics | "Immutable backups, monthly tested restores, ransomware-ready DR, and RTO and RPO commitments" | services.html:295 | UNVERIFIABLE - cloud backup is listed, but "monthly tested restores" and specific RTO/RPO commitments are not in VERIFIED FACTS |
| Network Design | "VLAN segmentation, real firewalls, enterprise wireless, multi-site VPN or SD-WAN, full documentation" | services.html:300 | UNVERIFIABLE - not covered by the VERIFIED FACTS capability list (a separate project-based service, not clearly prohibited) |
| C-TPAT Compliance | "CBP-aligned controls and documentation" | services.html:310 | UNVERIFIABLE - no VERIFIED FACTS reference to C-TPAT/CBP work |
| Co-Managed IT | "24/7 help-desk overflow, after-hours coverage, and cybersecurity and compliance depth" | services.html:315 | UNVERIFIABLE - "24/7" here applies to help-desk overflow, not the listed "24/7 SOC," a different claim |
| Ransomware Recovery | "the emergency line is answered, not queued" | services.html:320 | UNVERIFIABLE - operational promise not in VERIFIED FACTS |
| CMMC & NIST 800-171 | "gap assessment, CUI enclave design, SSP and POA&M, and SPRS scoring" | services.html:330 | UNVERIFIABLE - VERIFY WITH ULI (specific deliverables not in VERIFIED FACTS) |
| HIPAA IT Compliance | "HIPAA-compliant IT for medical and dental practices" | services.html:335 | **CONTRADICTS VERIFIED FACTS** - "Excluded vertical: dentists. Dental must not appear as a client or target industry anywhere." (house-rule violation, see below) |
| PCI DSS Compliance | "retail, restaurants, and hospitality... the right SAQ" | services.html:340 | UNVERIFIABLE |
| Cyber Insurance Compliance | "MFA, EDR, immutable backups, and questionnaire and attestation help" | services.html:345 | MIXED - MFA/immutable backup MATCH; **EDR again not on the VERIFIED FACTS capability list** (see violations) |
| Penetration Testing | "Manual, adversarial penetration testing... not an automated scan" | services.html:350 | UNVERIFIABLE - not in the VERIFIED FACTS capability list (separate project-based service) |
| Zero Trust Security | "identity verification, least-privilege access, and network micro-segmentation" | services.html:355 | UNVERIFIABLE |
| VoIP & Business Phone Systems | "Cloud VoIP setup and number porting with mobile integration and outage failover" | services.html:360 | UNVERIFIABLE |
| Managed Detection & Response | "24/7 SIEM log correlation and human-reviewed alert triage" | services.html:365 | **CONTRADICTS VERIFIED FACTS** - "Do not claim SIEM or anything not listed." The actual listed capability is "managed detection and response with a 24/7 SOC," not SIEM log correlation. (house-rule violation, see below) |
| CTA promise | "Written punch list whether or not you become a client." | services.html:388 | UNVERIFIABLE marketing promise |
| Case examples / testimonials | none present | entire page | N/A - this page contains no anonymized case examples or testimonials to flag |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at :250–261 has Service area, Led by, Response, and a Pricing link, all grouped together. |
| FAQ present with real question-and-answer text | Fail | No FAQ section anywhere on the page - no `<details>`/Q&A markup, no FAQPage JSON-LD. Zero FAQ content found. |
| Plain-text statement of the offer within first 300 words of body | Pass (marginal) | The lead paragraph (:235) states the offer clearly ("...full Ghosxt service catalog... On-site across Monterey County, remote across the United States"). It stays under the 300-word mark, but the cookie banner (~35 words) and the full desktop + mobile nav (~90–100 words combined) precede it in the DOM, pushing the offer statement to roughly word 140–230 with little margin to spare. |
| Exactly one H1 | Pass | Single `<h1>IT Services for California Small Business</h1>` at :234. |
| Title, meta description, canonical present | Pass | Title :8, meta description :9, canonical :10. |
| JSON-LD present (list which types) | Pass | Two `<script type="application/ld+json">` blocks. Types found: `BreadcrumbList` (:53, duplicated again at :95 in the second "extra-schema" block), `ItemList` (:60), `WebPage` with `speakable` (:72). No `FAQPage` (consistent with no FAQ content) and no `LocalBusiness`/`Organization`/`Service` schema directly on this page (the `WebPage` node references `#business` by `@id`, presumably defined elsewhere sitewide). |
| Content that exists only inside JS | Pass (none found) | All service cards, key-facts, and copy are static HTML in the source; no placeholder containers populated by `assets/js/main.min.js` were found. |
| Icon-only table cells | Pass (N/A) | No `<table>` elements anywhere on the page. |
| display:none on content that should be crawlable | Pass (none found) | No inline `display:none` in services.html. External CSS (`main.min.css`, `locations.min.css`) was not audited - out of scope for this HTML-level review. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner" id="cookieBanner">` (:122–136) sits before `<nav class="navbar">` (:139) and well before `<main id="main-content">` (:228). No separately duplicated `<nav>` element was found (the mobile menu at :190–225 lives inside the single `<nav>`, not as a second nav). |
| Internal links to pricing and to the relevant city or vertical pages | Pass | `/pricing` linked in navbar (:173), key-facts (:256), and footer (:439). City links via `/monterey-county`, `/santa-cruz-county`, `/san-benito-county`, `/santa-clara-county` (:377–380) and the footer's individual city list (:558–568). Vertical links via footer (trucking, agriculture, manufacturing, healthcare, etc. :460–467) and in-body service links (`/ctpat`, `/cmmc-compliance`, `/hipaa-it-compliance`, `/pci-compliance`, etc.). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental listed as a target vertical ("medical and dental practices") - VERIFIED FACTS excludes dentists entirely | services.html:335 |
| SIEM claimed ("24/7 SIEM log correlation") - VERIFIED FACTS explicitly says "Do not claim SIEM or anything not listed" | services.html:365 |
| EDR claimed as a capability - not on the VERIFIED FACTS "Capabilities we actually deliver" list (same category as SIEM: an unlisted capability) | services.html:285, 345 |

Checked and clear on this page: no em dashes (- character), no Cisco certification claim, no stated clearance level, no MSP/security vendor names (ConnectWise, Datto, SentinelOne, Sophos, Meraki, CrowdStrike, Huntress, N-able, Kaseya, NinjaOne, Bitdefender, Fortinet, Barracuda, Duo, Okta, 1Password, KnowBe4, Webroot, ESET, Malwarebytes, etc. - none appear).

## Top Three Fixes
1. Remove "dental" from the HIPAA IT Compliance card (services.html:335) - VERIFIED FACTS explicitly excludes dentists as a client or target vertical anywhere on the site; change "medical and dental practices" to "medical practices."
2. Rewrite the Managed Detection & Response card (services.html:365) to drop "SIEM," and drop "EDR" from the Cybersecurity (:285) and Cyber Insurance Compliance (:345) cards - none of these are on the VERIFIED FACTS capability list, and SIEM is explicitly forbidden. Use only the listed wording: "managed detection and response with a 24/7 SOC."
3. Add a real FAQ (visible Q&A text plus FAQPage JSON-LD) - the page currently has none - and reconcile the three different service-area claims on this single page (:235 "on-site across Monterey County," :253 "Central Coast & Bay Area," :375 "Central Coast and South Bay") into one consistent statement; while doing so, also move the cookie banner (:122–136) to after `<main>` in the DOM so it stops crowding the word budget ahead of the offer statement.

## VERIFY WITH ULI
- "since 2021" (services.html:246) - matches the value in VERIFIED FACTS, but that source fact itself is tagged "[VERIFY year]," so the year is not independently confirmed.
- Three inconsistent service-area statements on one page (:235, :253, :375) - need a single confirmed answer on where on-site coverage actually extends (Monterey County only, vs. Central Coast + South Bay/Bay Area).
- Response time claim "Same-day remote support; on-site within 24–48 hours" (:255) - not in VERIFIED FACTS; confirm this is accurate before it stays published.
- CMMC & NIST 800-171 card's claim that the engineer has "operated these controls" (:330) - more specific than the general DoD infrastructure experience fact on record.
- "Identity hardening," "vulnerability management," and "incident response" listed as named deliverables (:285); Azure/SharePoint architecture work (:290); "monthly tested restores" and RTO/RPO commitments (:295) - none of these are explicitly on the VERIFIED FACTS capability list; confirm they're accurate before keeping the wording.
- No anonymized case examples or anonymous testimonials appear on this page, so nothing in that category needed flagging here.
