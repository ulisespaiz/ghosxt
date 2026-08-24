# Page Audit: /cybersecurity-monterey

## Route
/cybersecurity-monterey (file: cybersecurity-monterey.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/engineer background | "An engineer with DoD infrastructure experience" | cybersecurity-monterey.html:19, 45, 73, 220, 240, 273, 327 | MATCHES (VERIFIED FACTS: prior DoD/federal contractor infrastructure experience) |
| Clearance level | Never stated, only "DoD infrastructure experience" language | cybersecurity-monterey.html: throughout | MATCHES (consistent with "never state the clearance level") |
| Google reviews count/rating | "26 Google reviews," 5.0 stars, marked `<!-- ghosxt:trust-reviews -->` | cybersecurity-monterey.html:231, 244 | MATCHES - confirmed against `site-config.json` (`google_review_count: 26`, `google_rating: "5.0"`), synced sitewide by `scripts/update-review-count.py` |
| "Trusted... since 2021" | Client-serving start year 2021 | cybersecurity-monterey.html:231 | MATCHES (VERIFIED FACTS itself flags this year [VERIFY]) |
| Response time | "Same-day remote support; on-site within 24–48 hours" | cybersecurity-monterey.html:241 (key-facts) | UNVERIFIABLE - not stated in VERIFIED FACTS (only the 4-hour critical-incident notification SLA is confirmed, and it is not mentioned on this page) |
| Excluded vertical named as a client/target - "dental" | "Clinics and dental practices carry protected health information under HIPAA" | cybersecurity-monterey.html:253 | **CONTRADICTS** - dentists are an excluded vertical per VERIFIED FACTS; dental must not appear as a client or target industry anywhere |
| Excluded vertical named as a client/target - "dental" (2nd instance) | "Medical and dental practices get HIPAA-aligned security and documentation" | cybersecurity-monterey.html:305 | **CONTRADICTS** - same rule, second occurrence |
| Vendor/tool name - "Huntress" | "Huntress EDR with a 24/7 SOC on every endpoint, layered with Microsoft Defender" | cybersecurity-monterey.html:265 | **CONTRADICTS** - VERIFIED FACTS: "describe these; never publish vendor names." "Huntress" is the third-party EDR/MDR vendor name; "Microsoft Defender" is acceptable because Microsoft 365/Defender for Business is explicitly named as a delivered capability, but "Huntress" is not |
| CMMC / NIST 800-171 / DFARS, System Security Plan production | "we work with defense contractors... on CMMC, NIST 800-171, and DFARS-aligned controls, and produce the System Security Plan and documentation an assessor expects" | cybersecurity-monterey.html:45 (JSON-LD), 70–74 (JSON-LD FAQ), 272–273 (service card), 305 (body), 326–327 (visible FAQ) | UNVERIFIABLE - not on the VERIFIED FACTS "capabilities we deliver" list nor the "contracted deliverables" list (which names only an annual independent risk assessment and SOC 2 documentation). VERIFY WITH ULI. |
| PCI-aware point-of-sale security, segmented guest Wi-Fi | Offered for hospitality clients | cybersecurity-monterey.html:78–83 (JSON-LD FAQ), 276–277 (service card), 330–331 (visible FAQ) | UNVERIFIABLE - not on the VERIFIED FACTS capability list. VERIFY WITH ULI. |
| Vulnerability management | Listed as a delivered capability | cybersecurity-monterey.html:45 (JSON-LD), 65 (JSON-LD FAQ), 323 (visible FAQ) | UNVERIFIABLE - not named on the VERIFIED FACTS "capabilities we actually deliver" list |
| Immutable backup, "monthly tested restores" | "Backups the production network cannot reach or delete, with monthly tested restores" | cybersecurity-monterey.html:280–281 | UNVERIFIABLE - VERIFIED FACTS lists only "cloud backup for Microsoft 365 and Google Workspace," without the "immutable" qualifier or a monthly-restore-test commitment |
| 24/7 monitoring with incident response, "human who responds" | cybersecurity-monterey.html:65, 284–285, 323 | MATCHES in substance (VERIFIED FACTS: "managed detection and response with a 24/7 SOC") |
| Security awareness training | cybersecurity-monterey.html:65, 323 (JSON-LD/visible FAQ) | MATCHES (explicitly on the VERIFIED FACTS capability list) |
| Phishing-resistant MFA / identity hardening / Conditional Access | cybersecurity-monterey.html:268–269 | MATCHES (M365 hardening w/ Conditional Access and phishing-resistant MFA are explicitly listed) |
| Pricing | "Cybersecurity is built into every managed plan: pricing published upfront," links to /pricing; no specific dollar figures on this page | cybersecurity-monterey.html:232, 242, 333–335 (FAQ defers to /pricing) | MATCHES in substance; no numeric price is asserted here to check |
| Phone number | (831) 204-0501 / +18312040501 | cybersecurity-monterey.html:166, 226, 245, 532 (recurs) | UNVERIFIABLE - not covered by VERIFIED FACTS, but consistent throughout the page |
| Email | sales@ghosxt.com | cybersecurity-monterey.html:481–483 | UNVERIFIABLE - not covered by VERIFIED FACTS |
| "Government-grade" cybersecurity tagline | og:description :13, twitter :19, footer :370 | MATCHES tone of DoD/federal-contractor background; marketing gloss, not itself a discrete fact |
| Credentials/certifications (M.S., CompTIA, AZ-104, ITIL, etc.) | None named on this page | - | N/A - page makes no specific credential claims |
| Cisco certification | None found | - | N/A - no Cisco claim present (correct) |
| SIEM | None found | - | N/A - "SIEM" does not appear on this page |
| Em dash (literal, %E2%80%94, or &mdash;) | None found | - | N/A - confirmed absent via search |
| Clearance level stated | None found | - | N/A - confirmed absent via search |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Pass | `<aside class="key-facts">` at cybersecurity-monterey.html:236–247 has Service area, Led by, Response, Pricing (linked to /pricing), plus Free/Rated/Direct-line rows |
| FAQ present with real question-and-answer text | Pass | Visible `<details>/<summary>` FAQ at cybersecurity-monterey.html:321–337 (4 Q&As), matching FAQPage JSON-LD at 58–93 near word-for-word |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (line 219) + lead paragraph (line 220) state the offer plainly ("Ghosxt brings government-grade cybersecurity, sized and priced for a Monterey small business, from an engineer with DoD infrastructure experience"), well inside the first ~280 words of `<main>` |
| Exactly one H1 | Pass | Single `<h1>` at cybersecurity-monterey.html:219 |
| Title, meta description, canonical present | Pass | Title line 6, meta description line 7, canonical line 8 |
| JSON-LD present (list which types) | Pass | One `@graph` block (lines 35–96) contains Service, BreadcrumbList, FAQPage |
| Content that exists only inside JS | Pass (none found) | All headings, body copy, service cards, and FAQ are static HTML; no calculator or JS-injected content on this page type |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the file |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `#cookieBanner` (line 107) sits before `<nav>` (124) and before `<main id="main-content">` (213); the desktop `.navbar-menu` (133–162) and fully duplicated `.navbar-mobile-menu` (175–210) also both sit before `<main>` - sitewide chrome pattern, not unique to this page |
| Internal links to pricing and to the relevant city or vertical pages | Pass | Links to /pricing (232, plus nav/footer); vertical links to /cybersecurity (313), /backup-disaster-recovery (281), /cyber-insurance-compliance (305); city links to /monterey (313, 314), /pacific-grove, /carmel, /seaside, /marina, /salinas (314); /managed-it-services, /help-desk-it-support (313) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental - excluded vertical named as a covered/target industry ("Clinics and dental practices carry protected health information") | cybersecurity-monterey.html:253 |
| Dental - excluded vertical named a second time ("Medical and dental practices get HIPAA-aligned security and documentation") | cybersecurity-monterey.html:305 |
| Vendor name - "Huntress EDR" named as the specific endpoint-detection tool | cybersecurity-monterey.html:265 |

No em-dash (literal, URL-encoded, or entity form), Cisco-certification, clearance-level, or SIEM violations were found on this page.

## Top Three Fixes
1. Remove "dental"/"dentist" from both occurrences (cybersecurity-monterey.html:253, 305) - dentists are an excluded vertical and must not appear as a client or target industry anywhere on the site. "Clinics" and "Medical practices" alone already cover the legitimate HIPAA point without naming the excluded vertical.
2. Remove the vendor name "Huntress" from the service card (cybersecurity-monterey.html:265) - describe the capability generically per VERIFIED FACTS ("endpoint detection and response with a 24/7 SOC," "layered with Microsoft Defender" is fine since Defender for Business is an explicitly listed capability, but the third-party brand name is not).
3. VERIFY WITH ULI whether CMMC/NIST 800-171/DFARS System Security Plan production (lines 45, 70–74, 272–273, 305, 326–327), PCI-aware POS/segmented guest Wi-Fi (lines 78–83, 276–277, 330–331), and "vulnerability management" (lines 45, 65, 323) are capabilities actually delivered - none of the three appear on the VERIFIED FACTS "capabilities we deliver" or "contracted deliverables" lists; if not confirmed, they need to come off the page.
