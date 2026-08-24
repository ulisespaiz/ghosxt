# Page Audit: /gilroy

## Route
/gilroy (file: gilroy.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "An engineer with DoD infrastructure experience" / "federal-grade engineering" / "Built by an engineer from the federal contracting world" | gilroy.html:7 (meta description), 135 (hero lead), 148 (key-facts dd), 424 (footer copyright) | MATCHES |
| "Government-grade" / "Federal-grade" marketing language | tied to DoD/federal contractor background | gilroy.html:165 ("Government-grade rigor"), 263 ("government-grade, sized for a Gilroy small business"), 300 (footer tagline "Government-grade IT for small business") | MATCHES (marketing gloss on verified DoD/federal-contractor background; not a separate factual claim) |
| DoD clearance level | Not stated, only "DoD infrastructure experience" | gilroy.html:7, 148 | MATCHES ("DoD-cleared"-style language is fine; no level is ever stated, per house rule) |
| **LocalBusiness physical address/geo** | JSON-LD declares the business's `PostalAddress` as `addressLocality: "Gilroy"`, `postalCode: "95020"`, with `geo` lat/long for Gilroy | gilroy.html:39 (`"address": {... "addressLocality": "Gilroy" ...}`, `"geo": {"latitude": 37.0058, "longitude": -121.5683}`) | **CONTRADICTS** — VERIFIED FACTS states the business is "Based in Salinas, CA." This LocalBusiness schema instead asserts a Gilroy street-level address/coordinates, i.e., a second physical location not confirmed anywhere in VERIFIED FACTS. This is the kind of fabricated local address pattern that misleads both search engines and readers. VERIFY WITH ULI whether this is intentional (a real satellite address) or a templating bug that should instead describe Gilroy only as `areaServed`. |
| Tiny Team Managed Security price | $600/mo flat, 1–4 users | gilroy.html:279 (FAQ) | MATCHES |
| Core Managed IT price | $125/user/mo | gilroy.html:279 (FAQ) | MATCHES |
| Secure Growth price | $175/user/mo | gilroy.html:279 (FAQ) | MATCHES |
| Compliance & Continuity price | $250/user/mo | gilroy.html:279 (FAQ) | MATCHES (no SIEM claim attached to this tier on this page, unlike some other pages audited) |
| Google reviews count/rating | "26 Google reviews," 5.0 stars | gilroy.html:140, 152 | MATCHES value, but hardcoded twice in markup rather than sourced from the single data file VERIFIED FACTS says this number "lives in ... and nowhere else." VERIFY WITH ULI on intended templating mechanism. |
| "Trusted... since 2021" | Client-serving start year 2021 | gilroy.html:140 | MATCHES (VERIFIED FACTS itself flags this year [VERIFY]) |
| **"Trusted by businesses across Monterey County"** | Trust-callout claims Gilroy customers are "across Monterey County" | gilroy.html:140 | **CONTRADICTS** — Gilroy is in Santa Clara County, not Monterey County (confirmed by this same page's own areaServed list: Gilroy, Hollister, Morgan Hill, San Jose — Santa Clara/San Benito, not Monterey). This exact sentence is copy-pasted verbatim from salinas.html (where "Monterey County" is correct for Salinas) — a templating bug that was not localized for Gilroy. |
| Excluded vertical (dental) | none found | — | N/A — correct, no dental/dentist reference on this page |
| Cisco certification | none found | — | N/A — correct, no Cisco claim present |
| Vendor names (3rd-party security tools) | none found (no SentinelOne, Huntress, Datto, etc.) | — | N/A — correct |
| Microsoft 365 / SharePoint / Teams / Azure capability | "Microsoft 365 setup and hardening, no-downtime email and file migrations, SharePoint, Teams, and Azure for Gilroy businesses" | gilroy.html:264 | Microsoft 365/Teams/SharePoint MATCHES VERIFIED FACTS ("Microsoft 365 hardening with Intune, Defender for Business, and Conditional Access"). "Azure" (general IaaS) is not itself enumerated in VERIFIED FACTS capabilities — UNVERIFIABLE / possible scope creep, VERIFY WITH ULI whether Azure IaaS is actually delivered or this should read "Entra ID"/M365 only. |
| PCI-DSS / point-of-sale security capability | "Point-of-sale security, network segmentation, and PCI-DSS-aligned controls for retail businesses" | gilroy.html:166, 220, 277, 280 (FAQ), JSON-LD FAQ line 43 | UNVERIFIABLE — PCI/POS security is not among the "Capabilities we actually deliver" enumerated in VERIFIED FACTS. Not contradicted, but not confirmed either. VERIFY WITH ULI. |
| C-TPAT / CBP-aligned compliance capability | "CBP-aligned cybersecurity controls and documentation" for distributors/importers | gilroy.html:168 | UNVERIFIABLE — not enumerated in VERIFIED FACTS capability list. VERIFY WITH ULI. |
| "Immutable" backups | "immutable backups" / "Immutable, tested backups" | gilroy.html:165, 268 | UNVERIFIABLE — VERIFIED FACTS says only "cloud backup for Microsoft 365 and Google Workspace," without the word "immutable." Possible overclaim of a specific technical property. VERIFY WITH ULI. |
| On-site response window (key-facts) | "Same-day remote support; on-site within 24–48 hours" | gilroy.html:149 | UNVERIFIABLE (not itemized in VERIFIED FACTS, which only specifies a 4-hour *notification* on critical incidents, a different metric) — and **internally inconsistent** with the FAQ/JSON-LD claim below. |
| On-site response window (FAQ/JSON-LD) | "On-site visits to Gilroy are typically same-day or next-day. Most issues are resolved remotely the same business day." | gilroy.html:44 (JSON-LD FAQ), 278 (visible FAQ), 183 (body) | UNVERIFIABLE, and inconsistent with the key-facts block's "24–48 hours" framing above — "next-day" (~24h) vs. a stated range extending to 48h. VERIFY WITH ULI which figure is accurate. |
| Free assessment length | "30-minute" | gilroy.html:151, 229, 253 | UNVERIFIABLE (not in VERIFIED FACTS) but internally consistent across the page |
| Phone number | (831) 204-0501 / +18312040501 | gilroy.html:39, 105, 138, 153, 461 (recurs) | UNVERIFIABLE — not covered by VERIFIED FACTS, but consistent throughout |
| Email | sales@ghosxt.com | gilroy.html:39, 411 | UNVERIFIABLE — not covered by VERIFIED FACTS |
| Service area (areaServed) | Gilroy, Hollister, Morgan Hill, San Jose | gilroy.html:39 | UNVERIFIABLE — service-area scope not defined in VERIFIED FACTS; internally consistent with the nearby-cities list (Hollister, San Jose, Salinas, Watsonville, gilroy.html:203-207) |
| Industries served | Distribution/warehousing, retail/outlets, agriculture/growers, manufacturing, logistics/3PL, construction, professional services, restaurants/hospitality | gilroy.html:191-198 | UNVERIFIABLE — not enumerated in VERIFIED FACTS (only "excluded: dentists; wineries fine" is stated); no contradiction found, no dental present |
| Warehouse size example | "a 100,000-square-foot warehouse off Pacheco Pass" | gilroy.html:160 | UNVERIFIABLE — specific, invented-looking illustrative detail not tied to any real client per VERIFIED FACTS (VERIFIED FACTS instructs "never invent... a story"). Reads as generic scene-setting rather than a client case example, but the specificity (exact square footage) is unsourced. VERIFY WITH ULI. |
| Web design pricing (linked specialty card) | "published pricing from $1,800" | gilroy.html:265 | UNVERIFIABLE — website pricing is out of scope of the managed-IT VERIFIED FACTS pricing table; VERIFIED FACTS notes only that "Google Workspace and Apple fleet onboarding" is quoted separately, and is silent on web-design pricing. Not contradicted. |
| Geographic/local-color facts | "Gilroy sits where the 101 meets the 152"; "at the end of the Caltrain line" | gilroy.html:135, 214 | UNVERIFIABLE — general geographic facts not sourced in VERIFIED FACTS, but plausible and low-risk; not contradicted |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at gilroy.html:144-155: Service area, Led by, Response, Pricing (linked to /pricing), plus Free/Rated/Direct line |
| FAQ present with real question-and-answer text | Pass | Visible `<details>/<summary>` FAQ at gilroy.html:276-282 (7 Q&As), matching FAQPage JSON-LD at 41-48 |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (line 134, "Managed IT Services & IT Support in Gilroy, California") plus the key-facts heading restating the same and the "Managed IT" service card, all within the first ~300 words |
| Exactly one H1 | Pass | Single `<h1>` at gilroy.html:134 |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8 |
| JSON-LD present (list which types) | Pass, with a bug | Two script blocks: LocalBusiness, BreadcrumbList, FAQPage (gilroy.html:35-51) and Service (gilroy.html:55-75). Bug: the Service entity's `"provider": {"@id": "https://ghosxt.com/#business"}` (line 66) does not match the LocalBusiness `"@id": "https://ghosxt.com/gilroy#business"` (line 39) actually defined on this page — the reference resolves to nothing in this page's own graph. |
| Content that exists only inside JS | Pass (none found) | All headings, body copy, plans, and FAQ are static HTML (FAQ uses native `<details>`); no evidence of JS-only content |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page |
| display:none on content that should be crawlable | Pass (none found) | No inline `display:none` occurrences in the file (CSS files not read per scope) |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, gilroy.html:80) sits in the DOM before `<nav>` (81) and before `<main id="main-content">` (130) |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Multiple links to /pricing (150, 279); nearby-city links (Hollister, San Jose, Salinas, Watsonville, 203-207); vertical links (agriculture, trucking, manufacturing, C-TPAT at 168, 247); Gilroy-specific specialty pages (cybersecurity-gilroy, cloud-services-gilroy, web-design-gilroy, 263-265) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| None of the explicitly enumerated terms (em dash, Cisco certification, dental, vendor name, clearance level, SIEM) were found on this page. | — |

No em-dash (checked literal "—" and the URL-encoded `%E2%80%94`, plus the broader dash family U+2012–U+2015; only two ordinary en dashes "–" were found, in the JSON-LD business name at line 39 and "24–48 hours" at line 149 — these are not em dashes and not a rule violation), Cisco-certification, dental, vendor-name, clearance-level, or SIEM violation was found on this page.

Two findings fall outside the literal named-term list but are serious factual/trust issues and are flagged above in the Claims Table with VERIFY WITH ULI: (1) the LocalBusiness JSON-LD asserting a Gilroy physical address/geo that contradicts "Based in Salinas, CA" (gilroy.html:39), and (2) the "trusted by businesses across Monterey County" line, which is geographically wrong for Gilroy and appears to be an unlocalized copy-paste from the Salinas page's template (gilroy.html:140).

## Top Three Fixes
1. Resolve the LocalBusiness address/geo in the JSON-LD (gilroy.html:39): it currently states a Gilroy `PostalAddress` and `geo` coordinates, contradicting VERIFIED FACTS ("Based in Salinas, CA"). VERIFY WITH ULI whether this should instead use `areaServed` only (no fabricated street address for a city the business isn't physically located in), consistent with how PM wants city pages structured.
2. Fix the "trusted by businesses across Monterey County" trust-callout (gilroy.html:140) — Gilroy is in Santa Clara County; this line was copy-pasted unchanged from the Salinas template. PM should correct the county/region reference for Gilroy specifically (do not invent a new claim; use the page's own already-stated service area).
3. Reconcile the on-site response time discrepancy between the key-facts block ("24–48 hours," gilroy.html:149) and the FAQ/JSON-LD ("same-day or next-day," gilroy.html:44, 278) — pick one accurate figure. Also move the cookie banner (gilroy.html:80) so it no longer sits before `<nav>`/`<main>` in the DOM order, and fix the JSON-LD Service `provider.@id` (gilroy.html:66) so it correctly references this page's own LocalBusiness `@id` (gilroy.html:39).
