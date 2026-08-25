# Page Audit: /privacy-policy

## Route
/privacy-policy (file: privacy-policy.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Title branding line | "Privacy Policy \| Ghosxt – Managed IT Services California" | privacy-policy.html:8 | UNVERIFIABLE (generic branding; dash used is an en dash "–", not an em dash) |
| Meta description "last updated" date | "Last updated 2026" | privacy-policy.html:11 | CONTRADICTS - conflicts with the on-page "Last Updated" date at line 248 |
| On-page "Last Updated" date | "December 11, 2024" | privacy-policy.html:248 | CONTRADICTS - conflicts with meta description at line 11 (page claims two different last-updated dates) |
| Footer copyright year | "© 2026 Ghosxt" | privacy-policy.html:796 | MATCHES current date (2026-08-24) |
| Footer tagline | "Government-grade IT for small business." | privacy-policy.html:673 | UNVERIFIABLE - not a specific fact in VERIFIED FACTS; broad marketing claim tied to DoD/federal-contractor background |
| Footer origin claim | "Built by an engineer from the federal contracting world." | privacy-policy.html:796 | MATCHES - consistent with "prior DoD/federal contractor infrastructure experience" |
| Contact email | sales@ghosxt.com | privacy-policy.html:642, 783, 785 | UNVERIFIABLE - no contact-info fact in VERIFIED FACTS to check against |
| Contact phone | (831) 204-0501 | privacy-policy.html:159, 646, 834, 835 | UNVERIFIABLE - no contact-info fact in VERIFIED FACTS to check against |
| Privacy-request response time | "respond to your request within 30 days" | privacy-policy.html:650-653 | UNVERIFIABLE - distinct from the VERIFIED FACTS "4-hour notification on critical incidents"; no source confirms this 30-day figure |
| Service area city list | Salinas, Monterey, Watsonville, Hollister, Santa Cruz, Gilroy, San Jose, Pacific Grove, Carmel, Seaside, Marina | privacy-policy.html:814-825 | MATCHES (loosely) - consistent with "Based in Salinas, CA"; not contradicted |
| Client portal link | https://ticket.ghosxt.com/ | privacy-policy.html:735, 804 | UNVERIFIABLE - not a factual claim, informational link only |
| No pricing figures, credentials, certifications, client names, or capability list appear on this page | n/a | n/a | N/A - nothing to contradict; page stays in generic privacy-policy boilerplate |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No dedicated at-a-glance block. This is a legal boilerplate page; only scattered contact info in the footer/CTA bar. |
| FAQ present with real question-and-answer text | Fail | No FAQ section anywhere on the page. |
| Plain-text statement of the offer within first 300 words of body | Fail | Opening paragraph (lines 256-263) is privacy-policy boilerplate ("we take your privacy seriously...") - no statement of what Ghosxt sells or does. |
| Exactly one H1 | Pass | Single `<h1 class="privacy-hero-title">Privacy Policy</h1>` at line 247. |
| Title, meta description, canonical present | Pass | Title line 8, meta description lines 9-12, canonical line 13. |
| JSON-LD present (list which types) | Pass (limited) | One JSON-LD block, `@type: WebPage` only (lines 52-59). No FAQPage, Organization, or LocalBusiness schema. |
| Content that exists only inside JS | Pass | All body content is present in static HTML; no JS-only content detected. |
| Icon-only table cells | Pass / N/A | No `<table>` elements on this page. |
| display:none on crawlable content | Pass (file-scope) | No `display:none` in the page's inline markup/styles. External stylesheets (main.min.css, privacy.min.css) were not read - out of scope for this audit - so hidden-via-external-CSS content cannot be ruled out. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, lines 73-99) sits in the DOM before `<nav>` (line 102) and well before `<main id="main-content">` (line 219). |
| Internal links to pricing and to the relevant city or vertical pages | Pass | `/pricing` linked in nav (145), mobile nav (201), and footer (697). Service-area city links present in footer (814-825). No vertical pages are linked from this page, but none are specifically relevant to a privacy policy. |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| None found | - |

Notes: No em dash characters found (title at line 8 uses an en dash "–", U+2013, which is a distinct character from the prohibited em dash "-", U+2014 - flagging for awareness only, not counted as a violation). No Cisco certification claim, no dental/dentist mention, no vendor names, no clearance level stated, no SIEM or unlisted-capability claim anywhere on this page.

## Top Three Fixes
1. Reconcile the conflicting last-updated dates: meta description says "Last updated 2026" (line 11) while the visible page says "Last Updated: December 11, 2024" (line 248) - pick one true date and use it in both places.
2. Move the cookie banner markup after `<main>` in the DOM (or otherwise ensure it doesn't precede primary content for crawlers), consistent with the "no duplicated nav/banner before main content" check.
3. Add FAQPage or Organization JSON-LD (in addition to the existing WebPage type) if this page is meant to support AI-search visibility, and consider a brief plain-text sentence near the top stating what Ghosxt does, since the current opening 300 words contain no offer statement.
