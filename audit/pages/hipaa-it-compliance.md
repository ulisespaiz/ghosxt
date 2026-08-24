# Page Audit: /hipaa-it-compliance

## Route
/hipaa-it-compliance (file: hipaa-it-compliance.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Target verticals named in `<title>` | "Medical & Dental Practices" | hipaa-it-compliance.html:6 | CONTRADICTS |
| Target verticals in meta description | "medical & dental practices" | hipaa-it-compliance.html:7 | CONTRADICTS |
| Target verticals in og:title | "Medical & Dental Practices" | hipaa-it-compliance.html:12 | CONTRADICTS |
| Target verticals in twitter:title | "Medical & Dental Practices" | hipaa-it-compliance.html:18 | CONTRADICTS |
| Target verticals in JSON-LD Service `name` | "Medical & Dental Practices" | hipaa-it-compliance.html:42 | CONTRADICTS |
| Target verticals in JSON-LD Service `description` | "medical and dental practices" | hipaa-it-compliance.html:44 | CONTRADICTS |
| Target verticals in visible H1 | "Medical & Dental Practices" | hipaa-it-compliance.html:238 | CONTRADICTS |
| Target verticals + example in hero lead paragraph | "three-chair dental office" and "small medical and dental practices" (2 occurrences) | hipaa-it-compliance.html:239 | CONTRADICTS |
| Engineer background | "engineer with DoD infrastructure experience" | hipaa-it-compliance.html:7, 44, 239 | MATCHES |
| Footer tagline about founder background | "Built by an engineer from the federal contracting world." | hipaa-it-compliance.html:477 | MATCHES |
| Service area (counties) | Monterey, Santa Cruz, San Benito, Santa Clara counties + California (JSON-LD `areaServed`) | hipaa-it-compliance.html:47-51 | UNVERIFIABLE - county list not itemized in VERIFIED FACTS; consistent with footer city list but not directly sourced [VERIFY WITH ULI] |
| Region descriptor | "on the Central Coast" | hipaa-it-compliance.html:239 | UNVERIFIABLE - consistent with Salinas, CA base, not an exact VERIFIED FACT |
| Phone number | (831) 204-0501 | hipaa-it-compliance.html:185, 242, 332, 515 | UNVERIFIABLE - not present in VERIFIED FACTS, no source to confirm |
| Booking link | calendly.com/ulises-ghosxt | hipaa-it-compliance.html:186, 224, 241, 290, 333, 359, 424, 516 | UNVERIFIABLE - not present in VERIFIED FACTS |
| "24/7 monitoring" of access logs | "Logging of who accessed what, with 24/7 monitoring" | hipaa-it-compliance.html:273 | MATCHES (maps to "managed detection and response with a 24/7 SOC") |
| Capability: "EDR" named as breach-prevention tool | "the same EDR, MFA, encryption, and email security that stop most breaches" | hipaa-it-compliance.html:110 (JSON-LD), 325 (visible FAQ) | UNVERIFIABLE / POSSIBLE VIOLATION - "EDR" is not a term used in the VERIFIED FACTS capability list (which lists "managed detection and response with a 24/7 SOC," not EDR specifically). [VERIFY WITH ULI whether EDR is an accurate synonym or an unlisted capability] |
| BAA signing as standard practice | "we sign a BAA," vendor BAA sweep | hipaa-it-compliance.html:70, 91-94, 250, 276-277, 316-317 | UNVERIFIABLE - reasonable compliance practice, not itemized in VERIFIED FACTS, no vendor names used so not a house-rule violation |
| "Free" HIPAA assessment / free IT assessment offer | "Book a Free HIPAA Assessment," "free assessment," "Schedule Free Assessment," "Free IT Assessment" | hipaa-it-compliance.html:241, 289-290, 331-333, 365, 427 | UNVERIFIABLE - no pricing page confirmation on this page itself; offer/price claim not sourced in VERIFIED FACTS |
| No pricing figures, response-time SLA, credentials, reviews count, or founder name appear anywhere on page | - | n/a | N/A - nothing to contradict, but see Legibility Checklist gaps below |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No dedicated at-a-glance block anywhere on page. Service area only appears buried in JSON-LD (47-51) and one adjective ("Central Coast," line 239); the sole engineer (Ulises Paiz) is never named; the 4-hour incident-notification response time (a contracted deliverable per VERIFIED FACTS) is never stated; no link to /pricing appears in the body content (only in template nav/footer). |
| FAQ present with real question-and-answer text | Pass | Six real Q&A pairs, both in JSON-LD FAQPage (63-114) and matching visible `<details>` markup (303-326). |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero lead paragraph (239) plainly states the offer ("Ghosxt builds and documents HIPAA-compliant IT for small medical and dental practices...") within the first ~100 words of body content. |
| Exactly one H1 | Pass | Single `<h1>` at line 238. |
| Title, meta description, canonical present | Pass | Title (6), meta description (7), canonical (8) all present. |
| JSON-LD present (list which types) | Pass | `@graph` with Service (39), BreadcrumbList (55), FAQPage (63). Service references `{"@id":".../#business"}` (45) for the org/LocalBusiness entity, defined elsewhere sitewide, not on this page. |
| Content that exists only inside JS | Pass (none found) | All body content is static HTML; FAQ uses native `<details>`, which works without JS. `main.min.js` (512) only drives UI behavior (mobile menu, scroll-to-top, cookie buttons), not content. |
| Icon-only table cells | Pass (N/A) | Page has no `<table>` markup; the six safeguards are `<article class="service-card">` cards, not a table. |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` or inline `style` attributes present in this file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | The cookie banner (`#cookieBanner`, lines 128-142) sits in the DOM before both `<nav class="navbar">` (143) and `<main id="main-content">` (232). |
| Internal links to pricing and to the relevant city or vertical pages | Partial | No /pricing link in body content (nav line 177 and footer line 377 are template elements, not body-contextual). Relevant vertical page IS linked contextually: /healthcare-it-services (244, 297), plus /backup-disaster-recovery (281), /managed-it-services (296), /cybersecurity (297), /ransomware-recovery (325). No relevant city page linked in body (only in footer's generic service-areas list, 493-508). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental named as a target vertical/client type (excluded vertical) - 9 occurrences across 8 lines | hipaa-it-compliance.html:6 (title), 7 (meta description), 12 (og:title), 18 (twitter:title), 42 (JSON-LD name), 44 (JSON-LD description), 238 (H1), 239 (hero lead paragraph - 2 occurrences: "three-chair dental office" and "medical and dental practices") |
| Capability term "EDR" used without appearing in the VERIFIED FACTS capability list (closest listed item is "managed detection and response with a 24/7 SOC") | hipaa-it-compliance.html:110 (JSON-LD FAQ answer), 325 (visible FAQ answer) |
| No em dashes found | - |
| No Cisco certification claim found | - |
| No vendor/product names found (only generic "vendor" as in third-party vendor) | lines 70, 94, 250, 277, 317 (generic usage, not a violation) |
| No clearance level stated | - |

## Top Three Fixes
1. Remove every "dental"/"Dental" reference (9 occurrences, 8 lines: title, meta description, og:title, twitter:title, JSON-LD `name` and `description`, H1, and hero lead paragraph) and retarget the page to medical/healthcare practices only - dentists are an explicitly excluded vertical. This is a full-page identity issue, not a spot fix, since "Medical & Dental" is the page's title-tag and H1 framing.
2. Add an at-a-glance block near the top of the page stating service area, who the client talks to (the sole engineer, named), the 4-hour critical-incident notification response time, and a direct link to /pricing - none of these currently appear in the body content.
3. Move the cookie banner (128-142) after `<main>` in the DOM (or otherwise ensure it does not precede main content), and add a body-contextual link to /pricing rather than relying solely on nav/footer.
