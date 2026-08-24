# Page Audit: /web-design-carmel

## Route
/web-design-carmel (file: web-design-carmel.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/operator is an engineer with DoD infrastructure experience | "an engineer with DoD infrastructure experience" | :217 (lead), :44 (JSON-LD Service description) | MATCHES |
| No clearance level stated | DoD experience described without a clearance level | :217, :44 | MATCHES |
| Essential package price | $1,800 | :7 (meta description), :13/:19 (og/twitter description), :88 (JSON-LD FAQ), :228 (hero pricing callout), :316 (visible FAQ) | UNVERIFIABLE — website-design pricing is not in the VERIFIED FACTS pricing list (that list covers managed-IT/MSP tiers only: Tiny Team, Core, Secure Growth, Compliance & Continuity). Internally consistent across the page. |
| Business Pro package price | $3,200 | :88 (JSON-LD FAQ), :316 (visible FAQ) | UNVERIFIABLE — same basis as above; internally consistent, static/crawlable (not JS-only) |
| E-commerce / booking-heavy package price | $5,900+ | :88 (JSON-LD FAQ), :316 (visible FAQ) | UNVERIFIABLE — same basis as above |
| Premium custom design add-on price | $1,500 | :88 (JSON-LD FAQ), :316 (visible FAQ) | UNVERIFIABLE, and flagged for special attention — VERIFIED FACTS has no web-design pricing at all, so this $1,500 is not itself sourced anywhere. It also numerically coincides with an unrelated VERIFIED FACT: "$1,500 for 5 to 15 users on the Microsoft 365 default scope" is the **onboarding fee for managed-IT/cybersecurity plans**, not a web-design price. The two $1,500 figures describe completely different products (a bespoke-design add-on here vs. an MSP onboarding fee elsewhere on the site), so this is not a direct contradiction, but the coincidental match creates real risk that an AI-search engine synthesizing pricing across pages could conflate them. VERIFY WITH ULI that both figures are independently correct and consider wording that makes the distinction unambiguous. |
| Maintenance & Security add-on | "from $300/month" | :259 | UNVERIFIABLE — same basis; not itemized in VERIFIED FACTS |
| Self-referential "team" language for web/security/IT delivery | "the same security team that protects business networks" (:259); "Local web design, backed by a real IT and security team" (:293, H2); "the same team that runs cybersecurity and managed IT" (:294) | :259, :293, :294 | UNVERIFIABLE / potential inconsistency — VERIFIED FACTS states "Owner and sole engineer: Ulises Paiz." This page uses "team" self-referentially three times to describe Ghosxt's own delivery, which reads at odds with the sole-engineer fact. VERIFY WITH ULI whether this should read "engineer" / singular framing instead |
| "The engineer who would actually build your site" leads consultations | :276 | UNVERIFIABLE phrasing but consistent with "sole engineer" (singular, actually supports the fact) |
| Domain, hosting, code owned by the client | "delivered with the domain, hosting, and code in accounts you own" | :235, :44 (JSON-LD) | UNVERIFIABLE — not itemized in VERIFIED FACTS, plausible standard practice, not contradicted |
| Email setup with SPF/DKIM/DMARC | Business email "on your own domain with SPF, DKIM, and DMARC configured" | :255 | UNVERIFIABLE — not in the VERIFIED FACTS capability list (that list is scoped to managed-IT/security deliverables, not web-dev email setup); not contradicted |
| No dental/dentist mention | — (absent) | (confirmed via search) | MATCHES exclusion rule |
| No case examples, testimonials, or named clients present | — (absent) | (confirmed via read) | N/A — nothing to verify |
| No Google-reviews / response-time claim on this page | — (absent; no key-facts block exists) | (confirmed via read) | N/A — nothing to verify, but see Legibility Checklist |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No `key-facts`/at-a-glance block exists on this page at all (unlike the cloud-services-carmel and cybersecurity-carmel siblings). Only a single pricing-trust-callout line (:228) with a pricing link; no explicit service-area statement, no "who you talk to" line, and no response-time commitment anywhere on the page. |
| FAQ present with real question-and-answer text | Pass | 4 `<details>` Q&As at :302–318, matching FAQPage JSON-LD (:57–92) word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (:216) + lead paragraph (:217) state the offer plainly ("Ghosxt hand-codes elegant, fast websites for Carmel businesses..."), well under 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at :216 (confirmed via file-wide search). |
| Title, meta description, canonical present | Pass | Title :6, meta description :7, canonical :8. |
| JSON-LD present (list which types) | Pass | Service (:39), BreadcrumbList (:48), FAQPage (:56). No LocalBusiness defined on this page itself, consistent with the sitewide pattern for city×service combo pages. |
| Content that exists only inside JS | Pass | All pricing figures ($1,800/$3,200/$5,900+/$1,500/$300) exist as static text in the raw HTML and JSON-LD, not only inside JS — no calculator widget on this page itself (unlike the main /website-development page, which is linked to for the interactive calculator). |
| Icon-only table cells | N/A / Pass | No `<table>` elements on this page. |
| display:none on content that should be crawlable | Pass | No `display:none` occurrences in this file (confirmed via search). |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (:106–120) precedes `<nav class="navbar">` (:121) and `<main id="main-content">` (:210); the mobile nav menu (:172–207) is also a full duplicated link set preceding `<main>`. Consistent sitewide pattern. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Pricing/calculator: `/website-development` linked at :228, :295, :329. City cross-links to Pacific Grove, Monterey, Seaside, Salinas web-design pages (:295); `/carmel` hub and `/cybersecurity-carmel`/`/managed-it-services` cross-links (:294). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| None found | — |

No em dashes (plain or %E2%80%94-encoded), Cisco-certification claims, dental/dentist mentions, vendor/tool-brand names, clearance-level statements, or SIEM/unlisted-capability claims were found on this page. (The self-referential "team" language and the coincidental $1,500 figure flagged above are factual-consistency concerns against other VERIFIED FACTS, not matches for one of the six house-rule categories, so they are listed in the Claims Table rather than here.)

## Top Three Fixes
1. Add an at-a-glance block to this page (service area, who you talk to, response time, pricing link) — it is the only one of the three audited Carmel pages missing one entirely, and the sitewide `ghosxt:key-facts` marker/pattern already exists to reuse.
2. VERIFY WITH ULI the three self-referential "team" references (:259, :293, :294) against "Owner and sole engineer: Ulises Paiz" — either confirm there is in fact a team behind web design/security/IT delivery, or change the language to "engineer"/singular framing to match the verified fact.
3. VERIFY WITH ULI the $1,800 / $3,200 / $5,900+ / $1,500 / $300-per-month web-design pricing figures (:88, :228, :259, :316) — none are covered by the VERIFIED FACTS pricing list. Give particular attention to the $1,500 "premium custom design add-on" (:88, :316): it is a different product from, but numerically identical to, the VERIFIED $1,500 Microsoft 365 onboarding fee for 5–15 users, which risks conflation in AI-generated answers that pull pricing from multiple pages.
