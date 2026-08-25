# Page Audit: /santa-cruz

## Route
/santa-cruz (file: santa-cruz.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Service area (page focus) | "Santa Cruz, California" | santa-cruz.html:147 (key-facts), 39 (JSON-LD address) | MATCHES |
| "Who you talk to" | "An engineer with DoD infrastructure experience" | santa-cruz.html:148 | MATCHES - consistent with sole-engineer/DoD-infrastructure fact; no clearance level stated |
| Response time | "Same-day remote support; on-site within 24–48 hours" | santa-cruz.html:149 | UNVERIFIABLE - no SLA number in VERIFIED FACTS; also inconsistent with the FAQ's response-time claim (see next row) |
| Response time (FAQ) | "Most issues are resolved remotely the same business day. On-site work in Santa Cruz County is typically same-day or next-day for non-emergencies." | santa-cruz.html:278 | UNVERIFIABLE - differs from the "24–48 hours" figure in the key-facts block on the same page (same-day/next-day vs. 24–48 hrs) |
| Free assessment | "No-obligation 30-minute IT assessment" / "30 minutes, no sales script" | santa-cruz.html:151, 229, 253 | UNVERIFIABLE - not itemized in VERIFIED FACTS |
| Google reviews | "Rated 5.0 across 26 Google reviews" / "5.0 on 26 Google reviews" | santa-cruz.html:140, 152 | MATCHES (VERIFIED FACTS itself carries `[VERIFY live count]`) |
| Years serving clients | "trusted by businesses across Monterey County since 2021 and beyond" | santa-cruz.html:140 | CONTRADICTS - "since 2021" matches VERIFIED FACTS (`[VERIFY year]`), but "across Monterey County" is geographically wrong for this page: Santa Cruz is the seat of Santa Cruz County, not Monterey County. Reads as an unlocalized trust-callout snippet reused from a Monterey-County location page |
| Pricing - Core Managed IT | "$125 per user per month" | santa-cruz.html:44 (JSON-LD FAQ), 279 (visible FAQ) | MATCHES |
| Pricing - Secure Growth | "$175" per user/month | santa-cruz.html:44, 279 | MATCHES |
| Pricing - Compliance & Continuity | "$250" per user/month | santa-cruz.html:44, 279 | MATCHES |
| Pricing - Tiny Team | "$600/mo flat" for 1–4 users | santa-cruz.html:44, 279 | MATCHES |
| Pricing - Web Design (different service line) | "published pricing from $1,800" | santa-cruz.html:265 | UNVERIFIABLE - not covered by the managed-IT pricing in VERIFIED FACTS |
| Phone number | (831) 204-0501 / +18312040501 | santa-cruz.html:105, 138, 153, 461 (visible), 39 (JSON-LD) | UNVERIFIABLE against VERIFIED FACTS (no number given there), but internally consistent site-wide |
| Email | sales@ghosxt.com | santa-cruz.html:39, 411 | UNVERIFIABLE against VERIFIED FACTS, internally consistent |
| "Federal-grade" / "Government-grade" positioning | "Federal-grade IT..." (meta/og/twitter), "federal-grade engineering," "Government-grade rigor," "government-grade," "Government-grade IT for small business" (footer tagline) | santa-cruz.html:13, 19, 135, 165, 263, 300 | UNVERIFIABLE - marketing language grounded in the real "DoD/federal contractor infrastructure experience" fact, but not a verbatim claim in VERIFIED FACTS |
| Industries served - includes dental | "Healthcare and dental" | santa-cruz.html:193 | CONTRADICTS - VERIFIED FACTS: "Dental must not appear as a client or target industry anywhere" |
| Common challenges - includes dental | "Medical, dental, and wellness practices need encrypted, compliant systems" | santa-cruz.html:220 | CONTRADICTS |
| Resource link title - includes dental | "HIPAA-compliant IT for medical and dental practices" | santa-cruz.html:242 | CONTRADICTS |
| FAQ (JSON-LD) - dental Q&A | "Do you work with healthcare and dental practices on HIPAA? ... Yes." | santa-cruz.html:46 | CONTRADICTS - affirmatively claims dental as a served vertical |
| FAQ (visible) - dental Q&A | "Do you work with healthcare and dental practices on HIPAA? ... Yes." | santa-cruz.html:281 | CONTRADICTS - same Q&A duplicated in visible HTML |
| Backup capability - "immutable" | "immutable backups" / "immutable backup" / "Immutable, tested backups" | santa-cruz.html:165, 263, 268 | UNVERIFIABLE - VERIFIED FACTS lists only "cloud backup for Microsoft 365 and Google Workspace," with no "immutable" qualifier. VERIFY WITH ULI before publishing an immutability claim |
| Cloud capability - Azure named | "SharePoint, Teams, and Azure for Santa Cruz businesses" | santa-cruz.html:264 | UNVERIFIABLE - Azure is not among the capabilities listed in VERIFIED FACTS (which names Microsoft 365 hardening, Intune, Defender for Business, Conditional Access). VERIFY WITH ULI |
| Cybersecurity capability naming | "Endpoint detection and response, phishing-resistant MFA... 24/7 monitoring" | santa-cruz.html:263 | MATCHES loosely - "phishing-resistant MFA" and "24/7" map to verified capabilities; "Endpoint detection and response" is a naming variant of "managed detection and response with a 24/7 SOC," not a new capability |
| areaServed cities (JSON-LD) | Santa Cruz, Watsonville, Capitola, Aptos, Scotts Valley | santa-cruz.html:39 | UNVERIFIABLE / content gap - Capitola appears only in structured data, never in visible body copy (nearby-cities list and body text mention Watsonville, Aptos, Scotts Valley, Westside, but not Capitola) |
| JSON-LD `Service.provider.@id` | references `https://ghosxt.com/#business` | santa-cruz.html:66 | CONTRADICTS its own schema - the `LocalBusiness` block on this page is `@id`'d as `https://ghosxt.com/santa-cruz#business` (line 39), not `https://ghosxt.com/#business`, so the Service→provider reference is broken/orphaned |
| "US-based help desk" | "Live, US-based help desk for your Santa Cruz team" | santa-cruz.html:163, 267 | UNVERIFIABLE - staffing/location detail not itemized in VERIFIED FACTS |
| No em dashes | Checked full file for U+2014 and `%E2%80%94` | n/a | MATCHES - none found. (One en dash, U+2013, appears in the JSON-LD business name "Ghosxt – Managed IT Services Santa Cruz" at line 39, and one legitimate numeric-range en dash at line 149 "24–48 hours"; house rule bans em dashes specifically, so neither is a violation, but the JSON-LD name's en dash is a stylistic wording choice worth a second look) |
| No Cisco certification claim | Searched for "Cisco" | n/a | MATCHES - not mentioned |
| No clearance level stated | Searched for "clearance," "Top Secret," "Secret," "Confidential" | n/a | MATCHES - only "DoD infrastructure experience" appears; no level disclosed |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at santa-cruz.html:144-155 has all four: Service area, Led by, Response, Pricing |
| FAQ present with real question-and-answer text | Pass | Both JSON-LD `FAQPage` (44-48) and visible `<details>/<summary>` FAQ (276-282) contain full real answer text, not stubs |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero lead paragraph (line 135) states the offer plainly within the opening ~60 words: "Ghosxt brings federal-grade engineering to those teams without the corporate-MSP overhead" |
| Exactly one H1 | Pass | Single `<h1>` at line 134: "Managed IT Services & IT Support in Santa Cruz, California" |
| Title, meta description, canonical present | Pass | Title (line 6), meta description (line 7), canonical (line 8) all present and location-specific |
| JSON-LD present (list which types) | Pass | Two `<script type="application/ld+json">` blocks: `LocalBusiness`, `BreadcrumbList`, `FAQPage` (lines 36-51), and `Service` (lines 55-75). Note: `Service.provider.@id` is broken - points at `#business` instead of `santa-cruz#business` (see Claims Table) |
| Content that exists only inside JS | Pass (none found) | All body content, including the FAQ, is present in static server-rendered HTML; only analytics/JSON-LD use `<script>` |
| Icon-only table cells | N/A | No `<table>` element exists on this page (key-facts uses a `<dl>` with full text labels, not icon-only cells) |
| display:none on content that should be crawlable | Not found in inline markup | No inline `display:none` in the HTML; compiled CSS files (`main.min.css`, `locations.min.css`) were out of scope for this page-only audit and were not inspected |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner" id="cookieBanner">` at line 80 sits in the DOM before `<nav>` (81) and before `<main id="main-content">` (130). No duplicated nav was found (only one `<nav class="navbar">` plus one distinct breadcrumb nav inside the hero) |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Pricing: navbar, key-facts (150), FAQ (279), footer. City/vertical: `/watsonville`, `/monterey`, `/salinas`, `/san-jose` (nearby cities, 203-206), `/cybersecurity-santa-cruz`, `/cloud-services-santa-cruz`, `/web-design-santa-cruz` (specialty grid, 263-265) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental named as a served industry (industries list) | santa-cruz.html:193 |
| Dental named as a served vertical (challenges section) | santa-cruz.html:220 |
| Dental named in resource-link title | santa-cruz.html:242 |
| Dental named in FAQ, JSON-LD copy | santa-cruz.html:46 |
| Dental named in FAQ, visible HTML copy (duplicate of above) | santa-cruz.html:281 |
| Unlisted capability - "immutable" backup (not in VERIFIED FACTS' capability list) | santa-cruz.html:165, 263, 268 - VERIFY WITH ULI |
| Unlisted capability - Azure named (not in VERIFIED FACTS' capability list) | santa-cruz.html:264 - VERIFY WITH ULI |

No em dash, Cisco-certification, vendor-name, or clearance-level violations were found on this page.

## Top Three Fixes
1. Remove every "dental" reference (5 locations: lines 46, 193, 220, 242, 281) - the industries list, the challenges bullet, the blog-link title, and both copies of the FAQ Q&A all name dental as a served vertical, directly contradicting the excluded-vertical rule in VERIFIED FACTS. The underlying blog post linked at line 242 (`/blog/hipaa-compliant-it-medical-dental-monterey-county`) is out of scope for this audit but likely needs the same fix.
2. Fix the "trusted by businesses across Monterey County since 2021" trust callout (line 140) on this Santa Cruz page - Santa Cruz is in Santa Cruz County, not Monterey County, so the claim undercuts the page's own local-relevance premise. Also repair the broken JSON-LD `Service.provider.@id` (line 66), which points at `https://ghosxt.com/#business` instead of the `LocalBusiness` block actually defined on this page (`https://ghosxt.com/santa-cruz#business`, line 39).
3. Reconcile the two conflicting response-time claims on the same page - key-facts says "on-site within 24–48 hours" (line 149) while the FAQ says "typically same-day or next-day for non-emergencies" (line 278) - and get Uli to confirm/verify the "immutable" backup claim (lines 165, 263, 268) and the Azure mention (line 264) before publishing, since neither is itemized in VERIFIED FACTS' capability list.
