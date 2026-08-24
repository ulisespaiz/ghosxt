# Page Audit: /msp-partners

## Route
/msp-partners (file: msp-partners.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "an engineer with DoD infrastructure experience" | msp-partners.html:7, 13, 19 (meta/OG/Twitter); 44 (JSON-LD Service description); 249, 351 (visible body) | MATCHES (VERIFIED FACTS: "Active DoD clearance and prior DoD/federal contractor infrastructure experience"; no clearance level stated anywhere on page) |
| "Federal-grade" quality descriptor | Used to describe pricing tier, assessments, and engineer sign-off | msp-partners.html:244 (hero lead), 275 (service card), 96 (JSON-LD FAQ answer), 335 (visible FAQ, duplicate text) | UNVERIFIABLE — undefined marketing term, not tied to any specific VERIFIED FACT; [VERIFY WITH ULI] whether this term is approved |
| CMMC 2.0 / NIST 800-171 readiness service detail | "Gap assessments, CUI enclave design, SSP/POA&M authoring, and SPRS scoring" | msp-partners.html:271-273 (service card); 96, 335 (FAQ, JSON-LD + visible) | UNVERIFIABLE — not among the "Capabilities we actually deliver" list in VERIFIED FACTS (that list covers the managed-security stack only); page links to an existing /cmmc-compliance page, so plausible, but this level of detail isn't independently confirmed |
| Engineering & CAD Environments service | "SolidWorks PDM, Autodesk Vault, and BIM-vault architecture and remediation" for manufacturing/engineering/architecture clients | msp-partners.html:282-284 | UNVERIFIABLE as a capability (not in VERIFIED FACTS list; though /engineering-it-services exists sitewide). Also see House-Rule Violations — SolidWorks and Autodesk Vault are named vendor products |
| Ransomware / incident response capability | "ransomware and incident response with a senior engineer on the call" | msp-partners.html:256, 276, 297, 351; 99, 337 (FAQ) | UNVERIFIABLE — not explicitly named in the VERIFIED FACTS capabilities list, though plausibly covered under the MDR/24-7-SOC capability and the "4-hour notification on critical incidents" contracted deliverable |
| Complex network design capability | "Multi-site, identity-first architecture, OT/IT segmentation, and ITAR or CUI enclave design" | msp-partners.html:279-280; 99, 337 (FAQ) | UNVERIFIABLE — not in the enumerated capabilities/deliverables list; /network-design exists sitewide so plausible, no direct contradiction |
| Business base location | "We're based on California's Central Coast" | msp-partners.html:115 (JSON-LD FAQ), 343 (visible FAQ) | MATCHES (VERIFIED FACTS: "Based in Salinas, CA," which is on the Central Coast) |
| Extended on-site service area | "On-site engineering escalation is realistic for MSPs in the Monterey Bay, Salinas Valley, and South Bay area" | msp-partners.html:115, 343 | UNVERIFIABLE — specific radius not stated in VERIFIED FACTS; geographically consistent with Salinas base, no contradiction found |
| National remote service area for partners | "remote overflow support, cybersecurity assessments, and CMMC/compliance work are available to MSP partners anywhere in the U.S." | msp-partners.html:115, 343; JSON-LD areaServed (California + United States) at 46-49 | UNVERIFIABLE — not addressed in VERIFIED FACTS, but internally consistent across JSON-LD and visible FAQ text |
| Partner pricing structure | "Peer-priced, not retail: wholesale rates for overflow ticket work, and project or hourly rates for specialized engagements"; no dollar figures given | msp-partners.html:244, 249, 307, 322-323 (JSON-LD), 73-75, 351 | UNVERIFIABLE — VERIFIED FACTS only publishes direct-client pricing (Tiny Team $600/mo, Core $125/user, etc.); no wholesale/partner rate is published anywhere to check against. Correctly avoids inventing numbers |
| No minimum commitment / no standing contract required to start | Stated policy for onboarding partners | msp-partners.html:107, 264, 309, 339 | UNVERIFIABLE — business policy claim, not covered by VERIFIED FACTS, no contradiction |
| No-poaching / white-label policy | "We don't market to your clients... we don't compete for the relationship"; "Tickets, documentation, and client-facing communication can go out under your name" | msp-partners.html:67, 91, 256-257, 287-289, 319, 331 | UNVERIFIABLE — business policy claim, not covered by VERIFIED FACTS, no contradiction |
| Phone number | (831) 204-0501 | msp-partners.html:190, 247, 353, 534 | UNVERIFIABLE — not stated in VERIFIED FACTS; internally consistent across the page |
| Email | sales@ghosxt.com | msp-partners.html:483-486 | UNVERIFIABLE — not stated in VERIFIED FACTS |
| Scheduling link implies owner identity | calendly.com/ulises-ghosxt | msp-partners.html:191, 229, 378, 443 | MATCHES (consistent with VERIFIED FACTS: "Owner and sole engineer: Ulises Paiz"), though "Ulises Paiz" is never named in visible page text |
| Footer tagline | "Government-grade IT for small business." | msp-partners.html:372 | MATCHES (marketing gloss consistent with verified DoD/federal-contractor background; not a separate factual claim) |
| Footer copyright line | "Built by an engineer from the federal contracting world." | msp-partners.html:496 | MATCHES (consistent with VERIFIED FACTS federal contractor experience) |
| Verticals mentioned | Manufacturing, engineering, architecture (CAD/engineering IT card) | msp-partners.html:285 | MATCHES exclusion rule — no dental/dentist reference anywhere on page (verified via grep) |
| No anonymized case examples or testimonials present | — | — | N/A — this page contains no client anecdotes, quotes, or case studies to flag |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No dedicated at-a-glance/key-facts block exists anywhere on the page. Service area is buried in the last FAQ answer (115/343); no named point of contact ("Ulises Paiz" never appears in visible text, only in the Calendly URL); no response-time commitment stated for partners anywhere; no pricing link inside `<main>` at all (only in nav/footer, outside main content). |
| FAQ present with real question-and-answer text | Pass | 7 `<details>` Q&As at lines 317-344, word-for-word identical to the FAQPage JSON-LD (lines 60-118). |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (243) + lead paragraph (244) + pricing-trust-callout (249) plainly state the MSP overflow/white-label offer, well under 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at line 243. |
| Title, meta description, canonical present | Pass | Title line 6; meta description line 7; canonical line 8. |
| JSON-LD present (list which types) | Pass | Types present in one `@graph`: Service (39-51), BreadcrumbList (52-58), FAQPage (59-119). No LocalBusiness node on this page (referenced only by `@id` at line 45). |
| Content that exists only inside JS | Pass | No content found that is JS-only; all visible copy (nav, FAQ, service cards) is static HTML. `assets/js/main.min.js` (531) is assumed to drive only interactivity (menus, cookie banner, scroll-to-top), consistent with the sitewide pattern seen on other audited pages. |
| Icon-only table cells | N/A / Pass | No `<table>` elements exist on this page. |
| display:none on content that should be crawlable | Pass | No `display:none` or `hidden` occurrences found in this file (grep confirmed); only decorative `aria-hidden="true"` icons, which is correct usage. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (lines 133-147) sits in the DOM before `<nav class="navbar">` (148) and before `<main id="main-content">` (237) — same sitewide issue flagged on other audited pages (e.g. network-design, cybersecurity, salinas). |
| Internal links to pricing and to the relevant city or vertical pages | Pass, with gap | `/pricing` is linked in nav (182) and footer (396), but nowhere inside `<main>` despite the page discussing "peer-priced" rates repeatedly — a missed contextual link. Relevant vertical/service links inside `<main>` are present: `/cmmc-compliance` (272), `/engineering-it-services` (284), `/about` (249), `/contact` (246, 298, 352). No city pages are linked inside `<main>` (only in the sitewide footer service-areas list, 515-526), which is reasonable since this is a partner/national page, not a local page. |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Vendor name: SolidWorks PDM | msp-partners.html:283 |
| Vendor name: Autodesk Vault | msp-partners.html:283 |

No em dashes, no Cisco-certification claims, no Cisco/Meraki equipment mentions, no dental/dentist references, no stated clearance level, and no SIEM claim were found on this page (all confirmed via grep). "SolidWorks PDM" and "Autodesk Vault" in the Engineering & CAD Environments service card (line 283) are named vendor/product brands and are not covered by the VERIFIED FACTS Cisco/Meraki equipment carve-out (which applies only to Cisco or Meraki gear, and only "if true"). This capability is also not listed among "Capabilities we actually deliver" in VERIFIED FACTS.

## Top Three Fixes
1. Strip or genericize the vendor names in the Engineering & CAD Environments card (line 283) — "SolidWorks PDM, Autodesk Vault, and BIM-vault architecture and remediation" — to capability language (e.g., "engineering and CAD data-vault architecture and remediation"), or VERIFY WITH ULI whether naming specific CAD software products is an intended, approved exception to the "no vendor names" house rule (distinct from the managed-security stack the rule appears primarily aimed at).
2. Move the cookie banner (lines 133-147) so it no longer sits before `<nav>`/`<main>` in the DOM order — this is a sitewide template issue also flagged on other audited pages, not unique to this one.
3. Add a proper at-a-glance block near the hero (service area, named point of contact, response time if one exists for partners, and a direct `/pricing` link inside `<main>`) — currently service area is buried in the last FAQ answer, no one is named as the contact, no response time is stated, and `/pricing` is only reachable via nav/footer despite the page repeatedly referencing "peer-priced" rates.
