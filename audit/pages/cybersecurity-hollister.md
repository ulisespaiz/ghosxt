# Page Audit: /cybersecurity-hollister

## Route
/cybersecurity-hollister (file: cybersecurity-hollister.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner described as engineer with DoD infrastructure experience | "an engineer with DoD infrastructure experience" | cybersecurity-hollister.html:44 (JSON-LD Service description), 217 (lead), 237 (key-facts "Led by"), 291 (CTA copy) | MATCHES |
| Service area / county | JSON-LD `areaServed`: Hollister, "San Benito County, California" | cybersecurity-hollister.html:46; FAQ text repeats "San Benito County" at :64 and :319; body text at :258 ("A machine shop in San Benito County...") | MATCHES |
| Client trust geography | "trusted by businesses across Monterey County since 2021 and beyond" | cybersecurity-hollister.html:228 (hero trust callout) | CONTRADICTS — this same page names "San Benito County" three other times (lines 46, 64, 258, 319) and is entirely framed around Hollister/San Benito County; the "Monterey County" line reads as unlocalized boilerplate |
| Google review count/rating | "26 Google reviews," 5.0 stars | cybersecurity-hollister.html:228, 241 | MATCHES VERIFIED FACTS ("26 at 5.0 as of August 2026"); source itself tagged [VERIFY live count] |
| Years serving clients | "since 2021" | cybersecurity-hollister.html:228 | MATCHES VERIFIED FACTS (source itself tagged [VERIFY year]) |
| Response time | "Same-day remote support; on-site within 24–48 hours" | cybersecurity-hollister.html:238 (key-facts) | UNVERIFIABLE — not itemized in VERIFIED FACTS (the only stated SLA is 4-hour notification on critical incidents, a different deliverable). VERIFY WITH ULI |
| Pricing | "Published upfront," links to /pricing | cybersecurity-hollister.html:229, 239 | MATCHES (VERIFIED FACTS confirms published pricing exists; no numeric figures stated on this page) |
| Direct phone line | (831) 204-0501 | cybersecurity-hollister.html:163, 225, 242 | MATCHES (consistent site-wide) |
| Dental offices named as a target/exposed vertical | "Hollister businesses (shops, vineyards, ranches, trades contractors, dental offices) all have exactly those exposures" | cybersecurity-hollister.html:258 | CONTRADICTS — VERIFIED FACTS: "Excluded vertical: dentists. Dental must not appear as a client or target industry anywhere." HOUSE-RULE VIOLATION |
| EDR product named by vendor | "Huntress EDR with a 24/7 human SOC covers every endpoint" | cybersecurity-hollister.html:262 | CONTRADICTS — VERIFIED FACTS: "never publish vendor names." HOUSE-RULE VIOLATION. The underlying capability ("managed detection and response with a 24/7 SOC") is itself verified; only the vendor name is the problem |
| Identity/MFA capability | "Phishing-resistant MFA and Conditional Access" | cybersecurity-hollister.html:266 | MATCHES capability list |
| Immutable, write-protected backup with restore testing | "We store backups on a separate, write-protected path... we run restore tests" | cybersecurity-hollister.html:278 | UNVERIFIABLE — VERIFIED FACTS lists only "cloud backup for Microsoft 365 and Google Workspace," with no immutability/write-protection/restore-test claims. VERIFY WITH ULI |
| Network segmentation between office and shop floor | "place a hard network segment between the office and connected floor equipment" | cybersecurity-hollister.html:270, 278 | UNVERIFIABLE — not itemized in the VERIFIED FACTS capability list. VERIFY WITH ULI |
| Small-team identity hardening specifics | "least-privilege roles... and alert rules so a single compromised account cannot move money" | cybersecurity-hollister.html:274 | UNVERIFIABLE — not itemized in the VERIFIED FACTS capability list. VERIFY WITH ULI |
| 24/7 monitoring by human analyst | "A human analyst (not an automated rule) evaluates and responds... around the clock" | cybersecurity-hollister.html:282 | MATCHES ("managed detection and response with a 24/7 SOC") |
| FAQ visible text matches JSON-LD FAQPage | 4 Q&As, word-for-word | cybersecurity-hollister.html:58-91 (JSON-LD) vs. 317-332 (visible `<details>`) | MATCHES |
| Founder background | "Built by an engineer from the federal contracting world." | cybersecurity-hollister.html:490 (footer) | MATCHES VERIFIED FACTS |
| Tagline | "Government-grade IT for small business." | cybersecurity-hollister.html:366 (footer); "government-grade cybersecurity" in lead (217) | MATCHES (marketing framing consistent with DoD-experience fact) |

Claim count: 17. Contradiction count: 3 (Monterey/San Benito County mismatch; dental target vertical; Huntress vendor name). Unverifiable count: 4 (response time, immutable/write-protected backup, network segmentation, least-privilege/alert-rule specifics).

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at lines 233-244: service area, "Led by," response, pricing link, free offer, rating, direct line all present. |
| FAQ present with real question-and-answer text | Pass | 4 `<details>` Q&As at lines 317-332, matching the FAQPage JSON-LD word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (216) + lead paragraph (217) plainly state the offer ("Ghosxt brings government-grade cybersecurity, sized for a Hollister small business...") well within the first 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at line 216; confirmed no other `<h1>` in the file. |
| Title, meta description, canonical present | Pass | Title line 6; meta description line 7; canonical line 8. |
| JSON-LD present (list which types) | Pass | Types present: Service, BreadcrumbList, FAQPage (lines 34-95). No LocalBusiness node on this page — the Service node's `provider` references an external `@id` not defined here. |
| Content that exists only inside JS | Pass (none found) | All visible copy is server-rendered in the HTML. |
| Icon-only table cells | N/A / Pass | No `<table>` elements exist on this page. |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner">` (line 106) sits in the DOM before `<nav class="navbar">` (121) and before `<main id="main-content">` (210). |
| Internal links to pricing and to the relevant city or vertical pages | Pass | `/pricing` linked at 229, 239. Vertical link `/manufacturing-it-services` (270). Related-service links `/backup-disaster-recovery` (278), `/cloud-services-hollister`, `/managed-it-services`, `/cybersecurity`, `/hollister` (309). City links `/salinas`, `/gilroy`, `/watsonville`, `/san-jose` (310). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Vendor name published: "Huntress EDR" | cybersecurity-hollister.html:262 |
| Dental named as a target/exposed vertical (excluded vertical) | cybersecurity-hollister.html:258 ("...trades contractors, dental offices...") |
| Unlisted capability: immutable / write-protected backup with restore testing — VERIFIED FACTS lists only "cloud backup" | cybersecurity-hollister.html:278 |
| Unlisted capability: hard network segmentation between office and shop floor — not in the VERIFIED FACTS capability list | cybersecurity-hollister.html:270, 278 |

No em dashes (plain or URL-encoded), Cisco certification claims, stated clearance level, or SIEM claims were found on this page.

## Top Three Fixes
1. Remove the vendor name "Huntress" (line 262) — VERIFIED FACTS explicitly prohibits publishing vendor names; rewrite as "managed detection and response with a 24/7 human SOC" (the capability itself is verified, only the brand name is the problem).
2. Remove "dental offices" from the exposed-verticals list (line 258) — dentists are an explicitly excluded vertical per VERIFIED FACTS.
3. Fix the "trusted by businesses across Monterey County" line (line 228) — the page is entirely about Hollister/San Benito County (stated 4 other times on the page); the county reference is inconsistent boilerplate. Also VERIFY WITH ULI the unlisted-capability claims (immutable/write-protected backup with restore testing, hard network segmentation, least-privilege/alert-rule specifics).
