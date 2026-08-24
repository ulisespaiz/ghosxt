# Page Audit: /pacific-grove

## Route
/pacific-grove (file: pacific-grove.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "an engineer with DoD infrastructure experience" / "Built by an engineer from the federal contracting world" | pacific-grove.html:7 (meta description), 148 (key-facts dd), 424 (footer copyright) | MATCHES |
| DoD clearance level | Not stated, only "DoD infrastructure experience" | pacific-grove.html:7, 148 | MATCHES ("DoD-cleared"-style language is fine; no level is ever stated, per house rule) |
| "Government-grade" / "Federal-grade" marketing language | tied to DoD/federal contractor background | pacific-grove.html:13, 19 ("Federal-grade IT"), 165 ("Government-grade rigor"), 263 ("government-grade, sized for a Pacific Grove small business"), 300 (footer tagline) | MATCHES (marketing gloss on the verified DoD/federal-contractor background; not a separate factual claim) |
| Sole engineer vs. "team"/"help desk" language | "One local engineer who answers the phone" (232), "one senior engineer behind it" (261) vs. "Live, US-based help desk for your Pacific Grove team" (163) and "the same team watching your network is the one you reach" (184) | pacific-grove.html:163, 184, 232, 261 | Lines 232/261 MATCH "Owner and sole engineer" fact. Lines 163/184 use "help desk"/"team" phrasing that sits in tension with "sole engineer" — UNVERIFIABLE, VERIFY WITH ULI whether this wording is acceptable |
| **LocalBusiness physical address/geo** | JSON-LD declares the business's `PostalAddress` as `addressLocality: "Pacific Grove"`, `postalCode: "93950"`, with `geo` lat/long for Pacific Grove | pacific-grove.html:39 (`"address": {..."addressLocality": "Pacific Grove"...}`, `"geo": {"latitude": 36.6177, "longitude": -121.9166}`) | **CONTRADICTS** — VERIFIED FACTS states the business is "Based in Salinas, CA." This LocalBusiness schema instead asserts a Pacific Grove street-level address/coordinates, i.e., a second physical location not confirmed anywhere in VERIFIED FACTS. VERIFY WITH ULI whether this is intentional or should instead describe Pacific Grove only via `areaServed`. |
| Service JSON-LD `provider.@id` | Service entity's `"provider": {"@id": "https://ghosxt.com/#business"}` | pacific-grove.html:65-67 | Does not match this page's own LocalBusiness `@id`, `"https://ghosxt.com/pacific-grove#business"` (line 39) — a dangling/mismatched reference within this page's own `@graph`, not a VERIFIED-FACTS content issue but a schema bug. VERIFY WITH ULI / flag for template fix. |
| Tiny Team Managed Security price | $600/mo flat, 1–4 users | pacific-grove.html:279 (visible FAQ), 43/45 (JSON-LD FAQ) | MATCHES |
| Core Managed IT price | $125/user/mo | pacific-grove.html:279 | MATCHES |
| Secure Growth price | $175/user/mo | pacific-grove.html:279 | MATCHES |
| Compliance & Continuity price | $250/user/mo | pacific-grove.html:279 | MATCHES (no SIEM claim attached to this tier on this page) |
| Google reviews count/rating | "26 Google reviews," 5.0 stars | pacific-grove.html:140, 152 | MATCHES value, but hardcoded twice in markup rather than sourced from the single data file VERIFIED FACTS says this number "lives in ... and nowhere else." VERIFY WITH ULI on templating mechanism. |
| "Trusted... since 2021" | Client-serving start year 2021 | pacific-grove.html:140 | MATCHES (VERIFIED FACTS itself flags this year [VERIFY]) |
| "Trusted by businesses across Monterey County" | Trust-callout claims PG customers are "across Monterey County" | pacific-grove.html:140 | MATCHES — Pacific Grove is in Monterey County, so this is geographically correct (unlike the same sentence on some other city pages) |
| Excluded vertical (dental) | "Healthcare and dental" listed as a served industry | pacific-grove.html:195 (`<li>Healthcare and dental</li>`) | **CONTRADICTS / HOUSE-RULE VIOLATION** — VERIFIED FACTS: "Excluded vertical: dentists. Dental must not appear as a client or target industry anywhere." This is the exact hit the grep signal flagged. |
| Cisco certification | none found | — | N/A — correct, no Cisco claim present |
| Vendor names (3rd-party security/IT tools) | none found (no SentinelOne, Huntress, Datto, Meraki, etc.) | — | N/A — correct |
| Clearance level | none stated | — | N/A — correct |
| SIEM | none found | — | N/A — correct |
| Microsoft 365 / SharePoint / Teams / Azure capability | "Microsoft 365 setup and hardening, no-downtime email and file migrations, SharePoint, Teams, and Azure for Pacific Grove businesses" | pacific-grove.html:264 | Microsoft 365/Teams/SharePoint MATCHES VERIFIED FACTS ("Microsoft 365 hardening with Intune, Defender for Business, and Conditional Access"). "Azure" (general IaaS) is not itself enumerated in VERIFIED FACTS capabilities — UNVERIFIABLE / possible scope creep, VERIFY WITH ULI. |
| PCI-compliant payment processing / POS capability | "PCI-compliant payment processing" / "PCI-compliant POS" | pacific-grove.html:42 (JSON-LD FAQ), 166 (service card), 276 (visible FAQ) | UNVERIFIABLE — PCI compliance/payment processing is not among the "Capabilities we actually deliver" enumerated in VERIFIED FACTS. Not contradicted, but not confirmed either. VERIFY WITH ULI — this is the kind of specific capability claim the house rule ("Do not claim ... anything not listed") is meant to catch. |
| "Immutable" backups | "immutable backups" / "immutable backup" / "Immutable, tested backups" | pacific-grove.html:165, 263, 268 | UNVERIFIABLE — VERIFIED FACTS says only "cloud backup for Microsoft 365 and Google Workspace," without the word "immutable." Possible overclaim of a specific technical property not confirmed. VERIFY WITH ULI. |
| On-site response window (key-facts) | "Same-day remote support; on-site within 24–48 hours" | pacific-grove.html:149 | UNVERIFIABLE (not itemized in VERIFIED FACTS, which only specifies a 4-hour *notification* on critical incidents — a different metric) — and **internally inconsistent** with the FAQ/JSON-LD claim below. |
| On-site response window (FAQ/JSON-LD/body) | "Same-day or next-day for non-emergencies. Most issues are resolved remotely the same hour." | pacific-grove.html:44 (JSON-LD FAQ), 183 (body), 278/281 (visible FAQ) | UNVERIFIABLE, and inconsistent with the key-facts block's "24–48 hours" framing above ("next-day" ≈24h vs. a stated range extending to 48h). VERIFY WITH ULI which figure is accurate. |
| Free assessment length | "30-minute" | pacific-grove.html:151, 229, 253 | UNVERIFIABLE (not in VERIFIED FACTS) but internally consistent across the page |
| areaServed (JSON-LD) vs. nearby-cities list | JSON-LD `areaServed`: Pacific Grove, Monterey, Carmel (39); visible "We also serve nearby cities": Monterey, Carmel, Seaside, Marina (203-207) | pacific-grove.html:39, 203-207 | UNVERIFIABLE — not a contradiction, but the JSON-LD areaServed list is a subset of the visible nearby-cities list (missing Seaside, Marina). Minor scope inconsistency; low priority. |
| Industries served | Inns/B&Bs, restaurants/cafes, retreats/wellness, professional services, healthcare **and dental**, real estate/rentals, galleries/retail, nonprofit/civic | pacific-grove.html:191-198 | See dental violation row above; remaining verticals are UNVERIFIABLE (not enumerated in VERIFIED FACTS) but not contradicted, and wineries (explicitly allowed) do not appear here |
| Illustrative business example | "a 12-room inn on Lighthouse" | pacific-grove.html:160 | UNVERIFIABLE — specific, invented-looking illustrative detail (exact room count, named street) not tied to any real, named client. Reads as scene-setting rather than a sourced case example, but VERIFIED FACTS instructs "never invent... a story" / "a number." Treated as an anonymized/illustrative example per instructions — **VERIFY WITH ULI**, not proposed for rewrite or removal. |
| Web design pricing (specialty card) | "published pricing from $1,800" | pacific-grove.html:265 | UNVERIFIABLE — website-design pricing is out of scope of the managed-IT VERIFIED FACTS pricing table, which is silent on web-design pricing. Not contradicted. |
| Geographic/local-color facts | "salt air kills cheap network gear," "bandwidth gets squirrelly past Asilomar," "PG's historic buildings were not wired for modern business" | pacific-grove.html:176, 217, 219 | UNVERIFIABLE — plausible local-color claims not sourced in VERIFIED FACTS, low risk, not contradicted |
| Phone number | (831) 204-0501 / +18312040501 | pacific-grove.html:39, 105, 138, 153, 461 (recurs) | UNVERIFIABLE — not covered by VERIFIED FACTS, but consistent throughout |
| Email | sales@ghosxt.com | pacific-grove.html:39, 411 | UNVERIFIABLE — not covered by VERIFIED FACTS |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at pacific-grove.html:144-155: Service area, Led by, Response, Pricing (linked to /pricing), plus Free/Rated/Direct line |
| FAQ present with real question-and-answer text | Pass | Visible `<details>/<summary>` FAQ at pacific-grove.html:276-282 (7 Q&As), matching FAQPage JSON-LD at 41-48 |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (134, "Managed IT Services & IT Support in Pacific Grove, California"), hero lead paragraph (135), and the key-facts block (144-155, service area/response/pricing in plain `<dl>` text) all land within roughly the first 150-200 words of visible body content |
| Exactly one H1 | Pass | Single `<h1>` at pacific-grove.html:134 |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8 |
| JSON-LD present (list which types) | Pass, with a bug | Two script blocks: LocalBusiness, BreadcrumbList, FAQPage (pacific-grove.html:35-51) and Service (55-75). Bug: the Service entity's `"provider": {"@id": "https://ghosxt.com/#business"}` (66) does not match the LocalBusiness `"@id": "https://ghosxt.com/pacific-grove#business"` (39) actually defined on this page. |
| Content that exists only inside JS | Pass (none found) | All headings, body copy, plans, and FAQ are static HTML (FAQ uses native `<details>`); no evidence of JS-only content |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page |
| display:none on content that should be crawlable | Pass (none found) | No inline `display:none` occurrences in the file (grepped; external CSS files not read, out of scope) |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, pacific-grove.html:80) sits in the DOM before `<nav>` (81) and before `<main id="main-content">` (130); the mobile nav menu (109-128) duplicates every desktop nav link and also precedes `<main>` |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Multiple links to /pricing (99, 123, 150, 279, 324 footer); nearby-city links (Monterey, Carmel, Seaside, Marina, 203-207) plus footer service-areas list (440-455); Pacific-Grove-specific specialty pages (cybersecurity-pacific-grove, cloud-services-pacific-grove, web-design-pacific-grove, 263-265) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental listed as a served industry ("Healthcare and dental") | pacific-grove.html:195 |
| Unlisted capability: PCI-compliant payment processing / PCI-compliant POS | pacific-grove.html:42, 166, 276 |
| Unlisted capability: "immutable" backups (specific technical property not in VERIFIED FACTS) | pacific-grove.html:165, 263, 268 |
| Unlisted capability: Azure (general IaaS, not enumerated alongside M365/Intune/Defender/Conditional Access) | pacific-grove.html:264 |

No em dash was found on this page — checked the literal "—" character, the URL-encoded `%E2%80%94`, and HTML entity forms (`&mdash;`, `&#8212;`, `&#x2014;`); zero matches. Two ordinary en dashes ("–") were found (JSON-LD business name concept and "24–48 hours" at line 149) and are not em dashes, so not a violation. No Cisco-certification claim, no vendor name, and no clearance-level statement were found on this page.

## Top Three Fixes
1. Remove "dental" from the industries-served list (pacific-grove.html:195) — hard house-rule violation. VERIFIED FACTS: "Excluded vertical: dentists. Dental must not appear as a client or target industry anywhere." This is the exact hit the initial grep signal flagged for this page.
2. Resolve the LocalBusiness address/geo in the JSON-LD (pacific-grove.html:39): it currently states a Pacific Grove `PostalAddress` and `geo` coordinates, contradicting VERIFIED FACTS ("Based in Salinas, CA"). VERIFY WITH ULI whether this should instead use `areaServed` only, with no fabricated street-level address for a city the business isn't physically located in.
3. VERIFY WITH ULI the three unlisted-capability claims — PCI-compliant payment processing/POS (42, 166, 276), "immutable" backups (165, 263, 268), and Azure (264) — against the VERIFIED FACTS capability list; either confirm these are actually delivered and add them to VERIFIED FACTS, or rephrase to match only listed capabilities. Also reconcile the on-site response-time discrepancy (149 vs. 44/183/278) and fix the Service JSON-LD `provider.@id` mismatch (65-67 vs. 39).
