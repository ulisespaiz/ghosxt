# Page Audit: /web-design-pacific-grove

## Route
/web-design-pacific-grove (file: web-design-pacific-grove.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/operator is a Peninsula-based engineer with deep DoD infrastructure experience | :217 (lead), :44 (JSON-LD Service description) | MATCHES |
| No clearance level stated | DoD experience described without a clearance level | :217, :44 | MATCHES |
| Essential package price | $1,800 (3–5 page site) | :228 (hero callout), :64/:80 (JSON-LD FAQ), :304/:312 (visible FAQ), meta description :7 | UNVERIFIABLE — website-design pricing is not in VERIFIED FACTS' pricing list (that list covers managed-IT tiers only). Internally consistent with the same figure on website-development.html and other web-design-X pages (per prior /website-development audit) |
| Business Pro package price | $3,200 | :88 (JSON-LD FAQ), :316 (visible FAQ) | UNVERIFIABLE — same basis as above; internally consistent site-wide. Note: unlike website-development.html (where $3,200/$5,900 exist only in JS), here the figure is static in HTML/JSON-LD, so it is crawlable without JS |
| E-commerce / booking-heavy package price | $5,900+ | :88 (JSON-LD FAQ), :316 (visible FAQ) | UNVERIFIABLE — same basis; internally consistent; static/crawlable on this page |
| Maintenance & Security | "from $300/month" | :259 | UNVERIFIABLE — same basis; matches the $300/month figure on website-development.html |
| Platform commission avoided by direct booking | "15-20% a platform would take" | :72 (JSON-LD FAQ), :247, :308 (visible FAQ) | UNVERIFIABLE — general industry commission-rate claim, not covered by VERIFIED FACTS, not contradicted by anything |
| Self-referential "team" language for web/security/IT work | "the same security team that protects business networks" (:259); "Local web design, backed by a real IT and security team" (:293, H2); "the same team that runs cybersecurity and managed IT" (:294) | :259, :293, :294 | UNVERIFIABLE / potential inconsistency — VERIFIED FACTS states "Owner and sole engineer: Ulises Paiz." Sibling pages (/cloud-services-pacific-grove, /cybersecurity-pacific-grove) use "team" only to mean the customer's own staff ("your team"); this page is the only one of the three that uses "team" self-referentially, three times, to describe Ghosxt's own delivery. VERIFY WITH ULI whether this should read "engineer" / "Ghosxt" instead of "team" |
| "Senior engineer" leads consultations | :276 | UNVERIFIABLE phrasing but consistent with "sole engineer" (singular) |
| Domain, hosting, code owned by the client | "delivered with the domain, hosting, and code in accounts you own" | :235, :44 (JSON-LD) | UNVERIFIABLE — not itemized in VERIFIED FACTS, plausible standard practice claim, not contradicted |
| Email setup with SPF/DKIM/DMARC | :255 | UNVERIFIABLE — not in the VERIFIED FACTS capability list, which is scoped to managed-IT/security deliverables, not web-dev email setup; not contradicted |
| No dental/dentist mention | — (absent) | (confirmed via search) | MATCHES exclusion rule |
| No case examples, testimonials, or named clients present | — (absent) | (confirmed via read) | N/A — nothing to verify |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No `key-facts`/at-a-glance block exists on this page at all (unlike the cloud-services and cybersecurity PG pages). Only a single pricing-trust-callout line (:228) with a pricing link; no explicit service-area statement, no "who you talk to" line, and no response-time commitment anywhere on the page. |
| FAQ present with real question-and-answer text | Pass | 4 `<details>` Q&As at :302–318, matching FAQPage JSON-LD (:57–92) word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (:216) + lead paragraph (:217) state the offer plainly ("Ghosxt hand-codes warm, fast websites for PG's inns, cafes, retreats, and small offices"), well under 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at :216 (confirmed via count). |
| Title, meta description, canonical present | Pass | Title :6, meta description :7, canonical :8. |
| JSON-LD present (list which types) | Pass | Service (:39), BreadcrumbList (:48), FAQPage (:56). No LocalBusiness defined on this page itself, consistent with the sitewide pattern for city×service combo pages. |
| Content that exists only inside JS | Pass | All pricing figures ($1,800/$3,200/$5,900+/$300) exist as static text in the raw HTML and JSON-LD, not only inside JS — no calculator widget on this page (unlike website-development.html). |
| Icon-only table cells | N/A / Pass | No `<table>` elements on this page. |
| display:none on content that should be crawlable | Pass | No `display:none` occurrences in this file (confirmed via search). |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (:106–120) precedes `<nav class="navbar">` (:121) and `<main id="main-content">` (:210); the mobile nav menu (:172–207) is also a full duplicated link set preceding `<main>`. Consistent sitewide pattern. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Pricing: `/website-development` calculator link (:228, :329). City cross-links to Monterey, Carmel, Seaside, Marina web-design pages (:295); `/pacific-grove` hub and `/cybersecurity-pacific-grove`/`/managed-it-services` cross-links (:294). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| None found | — |

No em dashes (plain or %E2%80%94-encoded), Cisco-certification claims, dental/dentist mentions, vendor/tool-brand names, clearance-level statements, or SIEM/unlisted-capability claims were found on this page. (The self-referential "team" language flagged above is a factual-consistency concern against the "sole engineer" fact, not one of the six house-rule categories, so it is listed in the Claims Table rather than here.)

## Top Three Fixes
1. Add an at-a-glance block to this page (service area, who you talk to, response time, pricing link) — it is the only one of the three audited PG pages missing one entirely, and the sitewide `ghosxt:key-facts` marker/pattern already exists to reuse.
2. VERIFY WITH ULI the three self-referential "team" references (lines 259, 293, 294) against "Owner and sole engineer: Ulises Paiz" — either confirm there is in fact a team behind web design/security/IT delivery, or change the language to "engineer"/singular framing to match the verified fact.
3. VERIFY WITH ULI that $1,800 / $3,200 / $5,900+ / $300 per month web-design pricing is current and accurate — it is not covered by the VERIFIED FACTS pricing list (which enumerates only managed-IT tiers), though it is internally consistent with website-development.html and the other web-design-X city pages.
