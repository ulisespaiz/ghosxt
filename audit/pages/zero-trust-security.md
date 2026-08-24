# Page Audit: /zero-trust-security

## Route
/zero-trust-security (file: zero-trust-security.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Page title | "Zero Trust Security for Small Business \| Ghosxt" | line 6 | MATCHES |
| Meta description: engineer with DoD infrastructure experience | — | line 7 | MATCHES (VERIFIED FACTS: "prior DoD/federal contractor infrastructure experience") |
| Canonical URL | https://ghosxt.com/zero-trust-security | line 8 | MATCHES |
| og:description: DoD infrastructure experience | — | line 13 | MATCHES |
| twitter:description: DoD infrastructure experience | — | line 19 | MATCHES |
| JSON-LD Service areaServed | Monterey, Santa Cruz, San Benito, Santa Clara counties + California | lines 46-51 | UNVERIFIABLE (VERIFIED FACTS only states "Based in Salinas, CA"; no enumerated service-area list to check against, though consistent with footer city list) |
| JSON-LD FAQPage (4 Q&A) | What is Zero Trust / hardware needed / fits with M365 / enterprise-only | lines 63-97 | MATCHES visible on-page FAQ text (lines 292-307), no factual assertions beyond general Zero Trust concepts |
| JSON-LD BreadcrumbList | Home > Services > Zero Trust Security | lines 54-61 | MATCHES on-page breadcrumb (line 220) |
| Phone number | (831) 204-0501 / tel:+18312040501 | lines 169, 226, 313, 496 | MATCHES (consistent throughout) |
| Booking link | https://calendly.com/ulises-ghosxt | multiple | MATCHES (consistent throughout) |
| H1 | "Zero Trust Security for Small Business" | line 222 | MATCHES (exactly one H1) |
| Offer statement (lead) | "Ghosxt builds Zero Trust architecture for Central Coast small businesses using the tools you likely already own, configured to actually enforce it." | line 223 | UNVERIFIABLE — "Central Coast" service-area framing not itself enumerated in VERIFIED FACTS (see areaServed row above) |
| "Built by an engineer with DoD infrastructure experience" | — | line 228 | MATCHES |
| Founder "worked inside directly: DoD networks" | — | line 241 | MATCHES (VERIFIED FACTS: prior DoD/federal contractor infrastructure experience) |
| Service card: Identity Verification & Conditional Access (phishing-resistant MFA, Conditional Access policies) | — | lines 250-252 | MATCHES (Conditional Access and phishing-resistant MFA are both in the VERIFIED FACTS capabilities list) |
| Service card: Least-Privilege Access Control | — | lines 253-256 | UNVERIFIABLE — not an itemized capability in VERIFIED FACTS |
| Service card: Network Micro-Segmentation | "Your network split into isolated zones..." | lines 257-260 | UNVERIFIABLE — network segmentation/micro-segmentation is not in the VERIFIED FACTS capabilities list |
| Service card: Device Compliance & Health Checks | — | lines 261-264 | UNVERIFIABLE — plausibly an extension of "Microsoft 365 hardening with Intune" but not itemized by name |
| Service card: Continuous Monitoring & Logging | "Access and identity events logged and watched on an ongoing basis" | lines 265-268 | UNVERIFIABLE — closest listed capability is "managed detection and response with a 24/7 SOC," but this card's wording (continuous log collection + watching) reads as a SIEM-adjacent claim; SIEM is explicitly disallowed and this exact capability is not itemized |
| Service card: Application & Workload Isolation | — | lines 269-272 | UNVERIFIABLE — not in the VERIFIED FACTS capabilities list |
| Footer tagline | "Government-grade IT for small business." | line 334 | UNVERIFIABLE (marketing framing, not a specific fact to check) |
| Footer copyright | "Built by an engineer from the federal contracting world." | line 458 | MATCHES |
| Footer service-area city links | Salinas, Monterey, Watsonville, Hollister, Santa Cruz, Gilroy, San Jose, Pacific Grove, Carmel, Seaside, Marina | lines 477-487 | MATCHES JSON-LD county list (site-wide boilerplate, not page-specific) |
| Contact email | sales@ghosxt.com | line 447 | UNVERIFIABLE (not stated in VERIFIED FACTS; no contradiction) |

No pricing figures, fees, terms, response-time SLAs, client names, testimonials, case examples, certifications, or dates appear anywhere on this page.

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No such block exists anywhere on the page. No named point of contact, no response-time claim, no pricing link in body content — only global nav/footer links. |
| FAQ present with real question-and-answer text | Pass | 4 real Q&A pairs, both in JSON-LD (lines 63-97) and matching visible `<details>/<summary>` markup (lines 292-307). |
| Plain-text statement of the offer within first 300 words of body | Pass | Lead paragraph line 223: "Ghosxt builds Zero Trust architecture for Central Coast small businesses using the tools you likely already own, configured to actually enforce it." Appears well within the first ~100 words. |
| Exactly one H1 | Pass | Single `<h1>` at line 222; confirmed no other H1 in file. |
| Title, meta description, canonical present | Pass | Lines 6, 7, 8. |
| JSON-LD present (list which types) | Pass | `Service`, `BreadcrumbList`, `FAQPage` (lines 34-101). |
| Content that exists only inside JS | None found | FAQ, service cards, and all body copy are static HTML, not JS-injected. No `<noscript>`-only content gaps observed. |
| Icon-only table cells | N/A | No `<table>` elements exist on this page. |
| display:none on content that should be crawlable | None found | No inline `style` attributes and no `sr-only`/display-hiding classes present in this file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (lines 112-126) sits before `<nav>` and before `<main id="main-content">` (line 216). The mobile nav menu (lines 178-213) is also a second full navigation block preceding `<main>` in DOM order. |
| Internal links to pricing and to the relevant city or vertical pages | Partial | `/pricing` only appears in global nav (line 161) and footer (line 358) — no contextual pricing link inside the body content itself. The link styled `pricing-trust-callout` (line 228) actually points to `/contact`, not `/pricing`, despite its class name. Body links to `/managed-it-services`, `/cybersecurity`, and two blog posts (line 286) exist, but no link to a specific city page since this is not a city/vertical page. |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Capability not in VERIFIED FACTS: "Network Micro-Segmentation" service card | lines 257-260 |
| Capability not in VERIFIED FACTS: "Continuous Monitoring & Logging" service card (SIEM-adjacent wording: ongoing log collection + watching) | lines 265-268 |
| Capability not in VERIFIED FACTS: "Least-Privilege Access Control" service card | lines 253-256 |
| Capability not in VERIFIED FACTS: "Device Compliance & Health Checks" service card | lines 261-264 |
| Capability not in VERIFIED FACTS: "Application & Workload Isolation" service card | lines 269-272 |

No em dashes, no Cisco certification claims, no dental/dentist mentions, no vendor names (Microsoft/Google product names used are the same ones named directly in VERIFIED FACTS' capabilities list), and no clearance level stated anywhere on this page.

## Top Three Fixes
1. Five of six "What we implement" service cards (Least-Privilege Access Control, Network Micro-Segmentation, Device Compliance & Health Checks, Continuous Monitoring & Logging, Application & Workload Isolation) describe specific technical capabilities that are not itemized in VERIFIED FACTS — only "Identity Verification & Conditional Access" clearly maps to a listed capability. The "Continuous Monitoring & Logging" card in particular reads as a SIEM-style claim, which VERIFIED FACTS explicitly disallows. VERIFY WITH ULI which of these are real deliverables versus Zero-Trust-principle framing that should be reworded to avoid implying an unverified specific capability.
2. Add an at-a-glance block (service area, who you talk to, response time, pricing link) — none exists on the page at all, and this is a hard requirement per the audit checklist.
3. Fix the mismatched link at line 228: the element is classed `pricing-trust-callout` but its `href` points to `/contact` rather than `/pricing`; also add a contextual `/pricing` link within the body content itself rather than relying solely on global nav/footer.
