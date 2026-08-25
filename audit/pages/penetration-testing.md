# Page Audit: /penetration-testing

## Route
/penetration-testing (file: penetration-testing.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/operator credential | "an engineer with DoD infrastructure experience" | penetration-testing.html:7 (meta description), 13 (og:description), 19 (twitter:description), 223 (lead), 228 (CTA callout), 241, 244 | MATCHES (VERIFIED FACTS: "prior DoD/federal contractor infrastructure experience") |
| Specific former job title | "former Senior Solutions Consultant for the U.S. Department of Defense" | penetration-testing.html:241 | UNVERIFIABLE - this specific title appears nowhere in the VERIFIED FACTS credentials list, which names only "prior DoD/federal contractor infrastructure experience." VERIFY WITH ULI |
| "who has operated these controls" | og:description claims hands-on operation of security controls | penetration-testing.html:13 | UNVERIFIABLE - goes beyond the general "infrastructure experience" wording in VERIFIED FACTS. VERIFY WITH ULI |
| Core capability claim: Ghosxt/the sole engineer personally delivers manual, adversarial penetration testing in-house | "Ghosxt runs manual, adversarial testing..."; "Built by an engineer..."; "Ghosxt is run by an engineer...someone who has tested and defended real networks"; JSON-LD `Service` node with `provider` = the Ghosxt business | penetration-testing.html:39-53 (JSON-LD Service), 223 (lead), 228 (CTA), 241-244 | CONTRADICTS - "Penetration Testing" is not in the VERIFIED FACTS closed capability list ("Capabilities we actually deliver... Do not claim SIEM or anything not listed"). The only VERIFIED deliverable in this space, the annual independent risk assessment, is explicitly "arranged through a third-party assessor," not delivered hands-on by the sole engineer. This page's framing throughout directly conflicts with that arranged-via-third-party model. VERIFY WITH ULI whether any pentesting is actually performed in-house, or whether this page is describing/inflating the third-party-arranged risk assessment as an in-house offensive-testing program |
| External Network Testing (service card) | Firewalls, VPNs, remote access, public-facing servers tested "the way an outside attacker would" | penetration-testing.html:251-253 | UNVERIFIABLE - not in VERIFIED FACTS capability list. VERIFY WITH ULI |
| Internal Network Testing (service card) | Lateral movement / privilege-escalation testing from an internal foothold | penetration-testing.html:254-257 | UNVERIFIABLE - not in VERIFIED FACTS capability list. VERIFY WITH ULI |
| Web Application Testing (service card) | Manual testing for auth bypass, business-logic errors, injection | penetration-testing.html:258-261 | UNVERIFIABLE - not in VERIFIED FACTS capability list. VERIFY WITH ULI |
| Wireless & Physical Assessment (service card) | Wi-Fi segmentation/rogue-AP testing plus physical and social walk-through assessment | penetration-testing.html:262-265 | UNVERIFIABLE - not in VERIFIED FACTS capability list. VERIFY WITH ULI |
| Social Engineering & Phishing (service card) | Simulated phishing and pretexting | penetration-testing.html:266-269 | UNVERIFIABLE - not in VERIFIED FACTS capability list. VERIFY WITH ULI |
| Report, Remediation & Retest (service card) | Written report, remediation help, retest to confirm fixes | penetration-testing.html:270-273 | UNVERIFIABLE - not in VERIFIED FACTS capability list (the VERIFIED "annual independent risk assessment" is arranged through a third party, not an in-house retest cycle). VERIFY WITH ULI |
| "Automated vulnerability scanning...the kind we run continuously as part of managed cybersecurity" | Continuous vulnerability-scanning claim | penetration-testing.html:234 | UNVERIFIABLE - "vulnerability scanning" is not itself named in the VERIFIED FACTS capability list (closest listed item is "managed detection and response with a 24/7 SOC"). VERIFY WITH ULI |
| Service area (JSON-LD `areaServed`) | Monterey, Santa Cruz, San Benito, and Santa Clara Counties, plus California | penetration-testing.html:46-51 | UNVERIFIABLE - VERIFIED FACTS confirms the business is "Based in Salinas, CA" (Monterey County) but does not enumerate a specific multi-county service area |
| "Central Coast small business networks" | General service-area statement | penetration-testing.html:223 | UNVERIFIABLE - directionally consistent with the Salinas, CA base but not itself a verified claim |
| PCI DSS requires an annual penetration test | Industry/regulatory fact (not Ghosxt-specific) | penetration-testing.html:85-86 (JSON-LD FAQ), 303 (visible FAQ) | MATCHES - accurate general industry fact, does not depend on VERIFIED FACTS |
| "...provide the documentation carriers and assessors expect" | Implies Ghosxt itself produces/delivers pentest documentation | penetration-testing.html:85-86, 303 | UNVERIFIABLE - tied to the unverified in-house-delivery claim above. VERIFY WITH ULI |
| Footer tagline | "Government-grade IT for small business." | penetration-testing.html:335 | UNVERIFIABLE - sitewide positioning tagline, not itself a VERIFIED FACTS line item |
| Footer copyright line | "Built by an engineer from the federal contracting world." | penetration-testing.html:459 | MATCHES (loosely consistent with "prior DoD/federal contractor infrastructure experience") |
| Contact phone number | (831) 204-0501 | penetration-testing.html:169, 226, 314, 497 | UNVERIFIABLE - contact detail not covered by VERIFIED FACTS; low-risk boilerplate |
| Booking link identifies owner | `calendly.com/ulises-ghosxt` | penetration-testing.html:170, 208, 225, 281, 315, 340, 406 | MATCHES - consistent with owner name Ulises Paiz |

**Totals: 19 claims - 4 MATCHES, 1 CONTRADICTS, 14 UNVERIFIABLE.**

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No dedicated at-a-glance/key-facts block exists anywhere on the page. The hero (217-229) has CTAs and a phone number but states no explicit service area, no named point of contact, no response time, and no pricing link. |
| FAQ present with real question-and-answer text | Pass | Four `<details>` Q&As at lines 293-308, matching the FAQPage JSON-LD (66-97) word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (222) + lead paragraph (223) plainly state the offer ("Ghosxt runs manual, adversarial testing on Central Coast small business networks and web applications...") within the first ~60 words of body copy. |
| Exactly one H1 | Pass | Single `<h1>` at line 222. |
| Title, meta description, canonical present | Pass | Title line 6; meta description line 7; canonical line 8. |
| JSON-LD present (list which types) | Pass | Types present: `Service`, `BreadcrumbList`, `FAQPage` (all inside one `@graph`, lines 34-101). No `LocalBusiness`/`Organization` node on this page itself (the `Service.provider` references an external `#business` `@id` presumably defined elsewhere). |
| Content that exists only inside JS | Pass | No content found that is JS-only; FAQ uses native `<details>/<summary>`, service cards are static HTML, all copy is server-rendered. |
| Icon-only table cells | N/A / Pass | No `<table>` elements exist on this page. |
| display:none on content that should be crawlable | Pass | Checked main.css/locations.css for `display:none` rules touching this page's markup - all instances found (`.navbar-mobile-toggle`, `.navbar-mobile-menu`, `.navbar-buttons .btn-demo`, `.mobile-cta-bar`, `.location-faq summary::-webkit-details-marker`) are standard responsive nav/UI toggles, not body copy hidden from crawlers. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (lines 112-126) sits in the DOM before `<nav class="navbar">` (127) and before `<main id="main-content">` (216). The mobile accordion menu (178-213) also duplicates every desktop nav link inside the same `<nav>`, ahead of `<main>`. |
| Internal links to pricing and to the relevant city or vertical pages | Fail | No link to `/pricing` and no link to any city-specific or vertical-specific page appears in the body content (`<main>`); those only exist in the sitewide nav/footer boilerplate. Body content does link to `/cybersecurity`, `/cmmc-compliance`, `/pci-compliance`, and a blog post (234, 287), which is relevant but does not satisfy the pricing/city/vertical requirement. |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Unlisted capability: entire penetration-testing service framed as delivered in-house by Ghosxt/the sole engineer (JSON-LD `Service`, lead paragraph, CTA line, "is run by" section) - "Penetration Testing" is not in the VERIFIED FACTS "Capabilities we actually deliver" list, and conflicts with the "arranged through a third-party assessor" delivery model for the one adjacent verified deliverable | penetration-testing.html:39-53, 223, 228, 241-244 |
| Unlisted capability: External Network Testing | penetration-testing.html:251-253 |
| Unlisted capability: Internal Network Testing | penetration-testing.html:254-257 |
| Unlisted capability: Web Application Testing | penetration-testing.html:258-261 |
| Unlisted capability: Wireless & Physical Assessment | penetration-testing.html:262-265 |
| Unlisted capability: Social Engineering & Phishing | penetration-testing.html:266-269 |
| Unlisted capability: Report, Remediation & Retest | penetration-testing.html:270-273 |
| Unlisted capability: continuous "automated vulnerability scanning...as part of managed cybersecurity" | penetration-testing.html:234 |
| Invented/unverified specific credential detail: "former Senior Solutions Consultant for the U.S. Department of Defense" - not in the VERIFIED FACTS credentials list; risk of an invented biographical detail | penetration-testing.html:241 |

No em dashes, no Cisco certification claims, no dental/dentist references, no vendor/tool-brand names, and no stated clearance level were found on this page.

## Top Three Fixes
1. Resolve the page's central premise with Uli before anything else: is penetration testing actually delivered in-house by Ulises, subcontracted, or is this page conflating/inflating the VERIFIED "annual independent risk assessment arranged through a third-party assessor" into an in-house offensive-testing program? Until confirmed, the JSON-LD `Service` block, lead paragraph (223), CTA line (228), the "is run by an engineer...tested and defended real networks" claim (241), and all six service-card capabilities (251-273) are unverified capability claims that should either be substantiated or rewritten to accurately describe what is arranged through the third-party assessor.
2. Remove or verify the specific unearned-looking credential "former Senior Solutions Consultant for the U.S. Department of Defense" (line 241) - this exact title is absent from the VERIFIED FACTS credentials list and reads as a more specific (and riskier) claim than "prior DoD/federal contractor infrastructure experience." VERIFY WITH ULI before this stays published.
3. Add a proper at-a-glance block (service area, who you talk to, response time, pricing link) near the hero, move the cookie banner in the DOM to after `<main>`, and add body-content links to `/pricing` and to a relevant city or vertical page - currently only sitewide nav/footer boilerplate provides any of these.

Note: no anonymized case examples or anonymous testimonials appear on this page, so that carve-out does not apply here.
