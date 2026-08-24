# Page Audit: /marina

## Route
/marina (file: marina.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Title tag | "Marina IT Support & Managed IT Services \| Ghosxt" | marina.html:6 | UNVERIFIABLE — marketing title, not an independently checkable fact; consistent with the business |
| Meta description | "Marina IT support, managed IT, and cybersecurity from an engineer with DoD infrastructure experience. Help desk for growing Monterey Peninsula companies." | marina.html:7 | MATCHES DoD/federal-contractor infrastructure-experience fact; no clearance level stated |
| og:description / twitter:description | "Federal-grade IT for Marina small business and the growing CSUMB area." | marina.html:13, :19 | UNVERIFIABLE — marketing tagline, not itemized in VERIFIED FACTS, but consistent with DoD-experience fact |
| JSON-LD LocalBusiness | name "Ghosxt – Managed IT Services Marina", phone +18312040501, email sales@ghosxt.com, address Marina, CA 93933, areaServed Marina/Seaside/Monterey/Salinas | marina.html:39 | UNVERIFIABLE — contact/address details and city list are not itemized in VERIFIED FACTS (no explicit service-area list to check against) |
| JSON-LD LocalBusiness @id vs. Service provider @id | LocalBusiness @id = `https://ghosxt.com/marina#business` (:39); Service `provider.@id` = `https://ghosxt.com/#business` (:65) | marina.html:39, :65 | Technical defect, not a fact claim — the two IDs do not match, so the Service node's provider reference is dangling/does not resolve to the LocalBusiness node defined on this page |
| JSON-LD FAQPage | 5 Q&A pairs (Marina growth, on-site speed, pricing, buildouts, security review) | marina.html:41-47 | Matches visible FAQ text word-for-word (see FAQ rows below) |
| JSON-LD Service | name "Marina IT Support & Managed IT Services", serviceType "Managed IT Services", areaServed City Marina | marina.html:58-73 | UNVERIFIABLE — generic service framing, not itemized in VERIFIED FACTS but not contradicting it |
| Engineer background (key-facts "Led by") | "An engineer with DoD infrastructure experience" | marina.html:147 | MATCHES VERIFIED FACTS (prior DoD/federal contractor infrastructure experience); no clearance level stated |
| Engineer background (footer) | "Built by an engineer from the federal contracting world." | marina.html:422 | MATCHES |
| H1 | "Managed IT Services & IT Support in Marina, California" | marina.html:133 | UNVERIFIABLE — general positioning statement, not independently checkable; exactly one H1 on the page |
| Response time (key-facts, at-a-glance) | "Same-day remote support; on-site within 24–48 hours" | marina.html:148 | UNVERIFIABLE — no such SLA figure exists in VERIFIED FACTS |
| Response time ("Why Marina businesses pick Ghosxt") | "Same-day on-site response is a five-minute drive" | marina.html:176 | UNVERIFIABLE — not sourced in VERIFIED FACTS; also worded inconsistently with the 24–48 hour figure at :148 (same-day vs. up to 48 hours) |
| Response time (Help Desk section) | "most issues resolved remotely the same hour, and on-site help that's a five-minute drive" | marina.html:182 | UNVERIFIABLE — not sourced in VERIFIED FACTS; a third, differently-worded response-time claim on the same page |
| Response time (FAQ #2 / JSON-LD) | "Same-day or next-day for non-emergencies. Most issues are resolved remotely the same hour." | marina.html:43, :276 | UNVERIFIABLE — not sourced in VERIFIED FACTS; a fourth wording of the response-time claim, inconsistent with the "24–48 hours" figure at :148 |
| Pricing (FAQ #3 / JSON-LD) | Core $125/user/mo, Secure Growth $175, Compliance & Continuity $250; Tiny Team $600/mo flat (1–4 users) | marina.html:44, :277 | MATCHES VERIFIED FACTS exactly |
| Pricing (FAQ #4) | "Very small teams (1 to 4 users) use the flat-rate Tiny Team Managed Security plan; everyone else uses per-user tiers." | marina.html:278 | MATCHES |
| Pricing link (key-facts) | "Published upfront, free assessment for a written quote" | marina.html:149 | MATCHES — pricing is in fact published; no dollar figures stated in this row itself |
| Free assessment | "No-obligation 30-minute IT assessment" / "30 minutes, no sales script, no obligation" | marina.html:150, :228, :252 | UNVERIFIABLE — offer/duration not itemized in VERIFIED FACTS, but internally consistent across the page |
| Google reviews | "Rated 5.0 across 26 Google reviews, trusted by businesses across Monterey County since 2021 and beyond" | marina.html:139 | Value MATCHES VERIFIED FACTS (26 @ 5.0, since 2021); underlying fact is tagged [VERIFY live count] / [VERIFY year] in VERIFIED FACTS |
| Google reviews (repeat) | "★★★★★ 5.0 on 26 Google reviews" | marina.html:151 | Same as above — value MATCHES but the figure is hardcoded a second time on this page, though VERIFIED FACTS says it should live in one data file |
| Industries served | Tech and SaaS, Professional services, **Healthcare and dental**, Retail and storefronts, Restaurants and food service, Construction and trades, Real estate and property management, Education and child care | marina.html:190-197 | **CONTRADICTS VERIFIED FACTS** — "Healthcare and dental" names dental as a target industry; VERIFIED FACTS explicitly excludes dentists and says dental must not appear as a client or target industry anywhere |
| Local landmarks | "Imjin Office Park", "Reservation Road" | marina.html:159 | UNVERIFIABLE — specific local references not sourced in VERIFIED FACTS; VERIFY WITH ULI that these are accurate/real Marina locations before this ships |
| Local geography/history | "built on the old Fort Ord footprint, anchored by CSU Monterey Bay" | marina.html:213 | UNVERIFIABLE — plausible public geography but not sourced in VERIFIED FACTS; VERIFY WITH ULI |
| Local market claim | "increasingly home to ag-tech and small startups" / "local startups and ag-tech firms land larger clients" | marina.html:213, :217 | UNVERIFIABLE — unsourced local-market characterization, not itemized in VERIFIED FACTS |
| Capabilities (service card) | "24/7 monitoring, helpdesk, patching, and a real engineer who answers the phone" | marina.html:161 | MATCHES 24/7 SOC + OS/third-party patching capabilities in VERIFIED FACTS |
| Capabilities ("Why" section service card) | "Endpoint protection, MFA, immutable backups, audits. Government-grade rigor." | marina.html:164 | Backup capability MATCHES ("cloud backup" is listed); "immutable" is an added technical qualifier not itemized in VERIFIED FACTS — UNVERIFIABLE, flag for VERIFY WITH ULI |
| Capabilities (specialty grid — Cybersecurity in Marina) | "Endpoint detection and response, phishing-resistant MFA, immutable backup, and 24/7 monitoring: government-grade" | marina.html:262 | "Phishing-resistant MFA" and "24/7 monitoring" MATCH; "Endpoint detection and response" is worded differently from the listed "managed detection and response with a 24/7 SOC" and "immutable backup" is an unlisted qualifier — both UNVERIFIABLE, flag for VERIFY WITH ULI against the "no capability not in VERIFIED FACTS" rule |
| Capabilities (specialty grid — Cloud & Microsoft 365 in Marina) | "Microsoft 365 setup and hardening, no-downtime email and file migrations, SharePoint, Teams, and **Azure** for Marina businesses" | marina.html:263 | Microsoft 365/SharePoint/Teams reasonably MATCH the M365 capability; **"Azure" is not named anywhere in the VERIFIED FACTS capability list** (Intune, Defender for Business, and Conditional Access are listed, plain Azure is not) — UNVERIFIABLE, flag for VERIFY WITH ULI as a possible unlisted-capability risk |
| Web design pricing (specialty grid) | "published pricing from $1,800" | marina.html:264 | UNVERIFIABLE — web design pricing is not itemized anywhere in VERIFIED FACTS (only the managed IT tiers and onboarding fees are) |
| Sole-engineer model | "One senior engineer who scales with you and answers the phone: no rotating ticket queue." | marina.html:231 | MATCHES "sole engineer" fact |
| Footer tagline | "Government-grade IT for small business." | marina.html:298 | UNVERIFIABLE — marketing tagline; does not state a clearance level or a certification claim |
| Phone number | (831) 204-0501 | marina.html:104, :137, :152, :459 | UNVERIFIABLE — contact info not itemized in VERIFIED FACTS, but consistent throughout the page |
| Certifications / credentials list | Not present on this page | n/a | MATCHES — no credential list to check, so no Cisco-certification risk on this page |
| Clearance level | Never stated; only "DoD infrastructure experience" appears | n/a | MATCHES house rule — no clearance level given anywhere on the page |
| Vendor names (backend MSP tooling) | None found (no MDR/SOC/backup/identity/network product-vendor names) | n/a | MATCHES house rule — capabilities described generically apart from the Azure/immutable-backup items flagged above |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at :143-154 has Service area (Marina, California), Led by (an engineer with DoD infrastructure experience), Response, Pricing (linked to /pricing), Free, Rated, Direct line. |
| FAQ present with real question-and-answer text | Pass | Six `<details>` Q&A pairs at :275-280, visible in DOM, matching the JSON-LD FAQPage content at :41-47 (5 of the 6 also appear in JSON-LD; "Are you affordable for very small businesses?" at :278 is visible-only, not duplicated in JSON-LD). |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (:133) + lead paragraph (:134) + key-facts block (:143-154) together plainly state the managed-IT/IT-support offer, service area, and pricing link well within the first ~150 words of body content. |
| Exactly one H1 | Pass | Single `<h1>` at :133. Subheadings are correctly nested `<h2>`/`<h3>`. |
| Title, meta description, canonical present | Pass | Title :6, meta description :7, canonical :8. |
| JSON-LD present (list which types) | Pass | Two script blocks: LocalBusiness, BreadcrumbList, FAQPage (:36-50) and Service (:54-74) — 4 types total. Note: Service's `provider.@id` (:65) points to `https://ghosxt.com/#business`, which does not match the LocalBusiness `@id` defined on this same page (`https://ghosxt.com/marina#business`, :39) — a dangling reference. |
| Content that exists only inside JS | Pass (none found) | Page is static HTML; FAQ, key facts, service cards, and CTAs are all in the raw DOM. FAQ uses native `<details>/<summary>`, so answer text is crawlable even when collapsed. |
| Icon-only table cells | Pass (n/a) | No `<table>` elements on this page. |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` found anywhere in the file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner" id="cookieBanner">` (:79) sits in the DOM before `<nav class="navbar">` (:80) and before `<main id="main-content">` (:129). No duplicated nav found (mobile menu is inside the same single `<nav>`). |
| Internal links to pricing and to the relevant city or vertical pages | Pass | /pricing linked at :98, :122, :149, :277, :322. City links: Seaside, Monterey, Salinas, Pacific Grove at :202-206, plus a full service-area list (including a self-link to Marina) in the footer at :441-451. Marina-specific specialty pages (/cybersecurity-marina, /cloud-services-marina, /web-design-marina) at :262-264. Vertical/industry pages appear only in the sitewide footer (:343-350); the on-page "Industries we serve" list (:189-198) is plain text with no links to vertical pages. |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental named as a target industry ("Healthcare and dental") | marina.html:192 |

No em dashes (plain or %E2%80%94-encoded) were found anywhere on the page. No Cisco-certification claim, no stated clearance level, and no backend MSP vendor-product names were found. Two items are worth a closer look against the "no capability not in VERIFIED FACTS" rule but are judgment calls rather than clear-cut violations, so they are recorded as UNVERIFIABLE in the Claims Table rather than listed here: "Azure" (:263), which is not named in the VERIFIED FACTS capability list, and "immutable backup(s)" (:164, :262), an added qualifier on the listed cloud-backup capability.

## Top Three Fixes
1. Remove "dental" from the Industries list at marina.html:192 ("Healthcare and dental" → "Healthcare"). This is the one clear house-rule violation on the page: VERIFIED FACTS explicitly excludes dentists as a vertical, and this line lists dental as a target industry Ghosxt serves in Marina.
2. Reconcile the four differently-worded response-time claims on this single page: "Same-day remote support; on-site within 24–48 hours" (:148), "Same-day on-site response is a five-minute drive" (:176), "most issues resolved remotely the same hour... on-site help that's a five-minute drive" (:182), and "Same-day or next-day for non-emergencies" (:43/:276). None are sourced in VERIFIED FACTS, and the on-site figures range from "same-day, five-minute drive" to a "24–48 hour" window. Flag for Uli to confirm the real number and use one consistent claim.
3. VERIFY WITH ULI two capability-wording items against the "no capability not in VERIFIED FACTS" rule: "Azure" at :263 (not in the listed capability set) and "immutable backup(s)" at :164 and :262 (VERIFIED FACTS lists "cloud backup," not immutability specifically). Also worth a look: the Service JSON-LD `provider.@id` at :65 references `https://ghosxt.com/#business`, which does not match this page's own LocalBusiness `@id` (`https://ghosxt.com/marina#business`, :39) — a dangling schema reference that should point at the correct node.
