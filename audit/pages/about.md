# Page Audit: /about

## Route
/about (file: about.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner title | "Founder & CEO" | about.html:79 (JSON-LD jobTitle), :711 (img alt), :725 (team-card-role) | UNVERIFIABLE [VERIFY WITH ULI] — VERIFIED FACTS calls him "Owner and sole engineer"; title not confirmed |
| Service area (meta description) | "small businesses across Monterey County" | about.html:9 | CONTRADICTS — inconsistent with every other service-area mention on the same page, which says "California" (see next row). VERIFIED FACTS gives only "Based in Salinas, CA," no county/state framing to confirm either |
| Service area (OG/Twitter/JSON-LD/body) | "small businesses across California" / State: California | about.html:17, :30, :68, :69, :119, :122-125, :313, :711 | UNVERIFIABLE — broader than the "Based in Salinas, CA" fact on file; statewide service claim is not confirmed |
| Certification | CompTIA CySA+ | about.html:85 (JSON-LD), :475-476 (grid card) | MATCHES |
| Certification | CompTIA Security+ | about.html:86, :499-500 | MATCHES |
| Certification | Microsoft AZ-104 | about.html:87, :491-492 | MATCHES |
| Certification | CompTIA Cloud+ | about.html:88, :483-484 | MATCHES |
| Certification | CompTIA Network+ | about.html:89, :507-508 | MATCHES |
| Certification | CompTIA A+ | about.html:90 (JSON-LD hasCredential), :515-516 (grid card "CompTIA A+ / IT Fundamentals") | CONTRADICTS — A+ is not in the VERIFIED FACTS credential list at all |
| Certification | ITIL 4 Foundation | about.html:91, :523-524 | MATCHES |
| Certification | Linux Essentials (LPI) | about.html:92, :531-532 | MATCHES |
| Certification (missing) | CompTIA SecurityX (CAS-005) | not present anywhere on page | CONTRADICTS — verified credential omitted from both the JSON-LD hasCredential array (:84-93) and the certifications grid (:470-534) |
| Certification (missing) | CompTIA Project+ | not present anywhere on page | CONTRADICTS — verified credential omitted from both the JSON-LD hasCredential array and the certifications grid |
| Degree (missing) | M.S. Cybersecurity and Information Assurance (WGU, 2026) | not present anywhere on page | CONTRADICTS — the actual verified degree is entirely absent from an About page whose whole purpose is to state credentials |
| Degree (stated) | "a B.S. in Network Engineering and Cybersecurity" | about.html:80 (JSON-LD Person description), :96 (JSON-LD alumniOf.name), :726 (bio prose) | CONTRADICTS — no B.S. exists in VERIFIED FACTS; only the M.S. (WGU, 2026) is on file. Also misuses schema: alumniOf.name is set to a degree title, not a school name |
| Certification count | "nine industry certifications" | about.html:80, :726 | CONTRADICTS — only 8 credentials are actually listed on the page (JSON-LD :84-93 and grid :470-534 both show 8), so the page's own text and its own list disagree. Separately, VERIFIED FACTS' true 9-item cert list has a different composition (includes SecurityX and Project+, not A+) |
| Experience | "over 10 years in IT infrastructure and cybersecurity" | about.html:80, :726 | UNVERIFIABLE [VERIFY WITH ULI] |
| Prior role | "served as a Senior Solutions Consultant for the DoD" | about.html:80, :727 | UNVERIFIABLE [VERIFY WITH ULI] — VERIFIED FACTS confirms only general "prior DoD/federal contractor infrastructure experience," not this specific title |
| Prior role | "managed infrastructure for a multinational corporation across North America" | about.html:727 | UNVERIFIABLE [VERIFY WITH ULI] |
| Client count | "managed IT for 40+ small businesses" / "built security programs for over 40 businesses" | about.html:423, :727 | UNVERIFIABLE [VERIFY WITH ULI] — not in VERIFIED FACTS |
| Personal detail | "coaches football at Rancho San Juan High School" | about.html:727 | UNVERIFIABLE [VERIFY WITH ULI] |
| DoD infrastructure experience (general) | "engineer with DoD infrastructure experience" | about.html:8, :9, :17, :30, :80, :305, :726 | MATCHES — consistent with "prior DoD/federal contractor infrastructure experience," and correctly avoids stating a clearance level |
| Clearance level | not stated anywhere | n/a | MATCHES — house rule compliance ("Never state the clearance level") |
| Cisco certification | not claimed anywhere | n/a | MATCHES — house rule compliance |
| Dental/dentist vertical | not mentioned anywhere | n/a | MATCHES — house rule compliance |
| Vendor names / SIEM | not mentioned anywhere | n/a | MATCHES — house rule compliance |
| Phone number | (831) 204-0501 | about.html:222, :1534 | UNVERIFIABLE — not in VERIFIED FACTS, no reason to doubt but unconfirmed |
| Email | sales@ghosxt.com | about.html:118, :135, :1493 | UNVERIFIABLE — not in VERIFIED FACTS |
| Booking link | calendly.com/ulises-ghosxt | about.html:137, :223, :265, :746, :1433, :1535 | UNVERIFIABLE — not in VERIFIED FACTS |
| Tagline | "Government-grade IT for small business." | about.html:1429 | UNVERIFIABLE — marketing framing, not a checkable fact |
| Tagline | "Built by an engineer from the federal contracting world." | about.html:1501 | MATCHES — general framing consistent with DoD/federal contractor experience |
| Copyright year | "© 2026 Ghosxt" | about.html:1501 | MATCHES — correct for current year (2026-08-24) |
| Founding year ("since 2021") | not stated on this page | n/a | N/A — VERIFIED FACTS flags this as [VERIFY year] but the claim doesn't appear on /about, so nothing to contradict here |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No such block exists anywhere on the page. Service area is only stated inconsistently in meta tags (California vs. Monterey County); no named point of contact beyond "Ulises," no response-time figure, no pricing link in body copy |
| FAQ present with real question-and-answer text | Fail | No FAQ section anywhere on the page |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero subtitle at about.html:303-305 clearly states what Ghosxt does, well within the first 300 words |
| Exactly one H1 | Pass | Single `<h1 class="about-hero-title">About Ghosxt</h1>` at about.html:302; confirmed no other `<h1>` on the page |
| Title, meta description, canonical present | Pass | Title :8, meta description :9, canonical :10 all present. Note: title (:8), og:title (:16), and JSON-LD AboutPage name (:68) all use different wording for the same page — not a checklist failure but worth tightening |
| JSON-LD present (list which types) | Pass | `@graph` at about.html:57-142 contains AboutPage (:62), Person (:76, "Ulises Paiz"), and LocalBusiness (:112, "Ghosxt," with embedded ContactPoint). No FAQPage (no FAQ content exists to back it) |
| Content that exists only inside JS | Pass (none found) | Page content is static HTML; assets/js/main.min.js appears to drive only interactivity (mobile nav, scroll-to-top, cookie banner, canvas animation), not content injection |
| Icon-only table cells | N/A | No `<table>` elements on this page; certifications are presented as icon+name+description cards, not table cells |
| display:none on content that should be crawlable | Pass (none found) | grep of about.min.css and main.min.css shows display:none used only for standard responsive UI toggles (mobile nav menu, mobile CTA bar, decorative ::before/::after on background-grid) — no crawlable body text is hidden this way |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner" id="cookieBanner">` at about.html:157-177 sits in the DOM before both `<nav>` (:180) and `<main id="main-content">` (:272) |
| Internal links to pricing and to the relevant city or vertical pages | Pass (nav/footer only) | Pricing linked in nav (:214, :260) and footer (:1447); vertical/service pages linked in nav dropdown (:201-211) and footer (:1457-1473); city pages linked in footer service-areas-footer (:1514-1524). All are sitewide nav/footer links — no contextual in-body link to pricing or a specific city/vertical page from the About content itself |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Invented/incorrect credential: "B.S. in Network Engineering and Cybersecurity" — no such degree exists in VERIFIED FACTS (only the M.S., WGU 2026, is on file); also misused as the alumniOf organization name in JSON-LD | about.html:80, :96, :726 |
| Invented certification: "CompTIA A+" listed as a held credential — not in VERIFIED FACTS | about.html:90, :515-516 |
| Invented/unverified specifics not in VERIFIED FACTS ("Senior Solutions Consultant for the DoD," "multinational corporation across North America," "over 10 years," "40+ businesses," "coaches football at Rancho San Juan High School") — house rule: "Never invent a client, a number, a story, a quote, or a capability" | about.html:80, :423, :727 |
| Em dash | None found — only en dashes (–) at :21 and :68, used as title-separator punctuation, not prose em dashes. Not a violation of the stated rule but flagged for awareness |
| Cisco certification | None found — compliant |
| Dental / dentist | None found — compliant |
| Vendor names | None found — compliant |
| Clearance level | None stated — compliant |
| SIEM or unlisted capability | None found — compliant |

## Top Three Fixes
1. Rebuild the credentials section (JSON-LD `hasCredential` at about.html:84-93 and the certifications grid at :470-534) to exactly match VERIFIED FACTS: remove CompTIA A+, add CompTIA SecurityX (CAS-005) and CompTIA Project+, and add the M.S. Cybersecurity and Information Assurance (WGU, 2026). Fix or remove the "B.S. in Network Engineering and Cybersecurity" claim at :80, :96, and :726 since it does not appear in VERIFIED FACTS, and correct the "nine industry certifications" count at :80/:726 so it matches whatever list actually ships.
2. Resolve the service-area contradiction: the meta description (:9) says "Monterey County" while the title, OG/Twitter tags, and JSON-LD (:17, :30, :68-69, :119, :122-125) all say "California." Pick one accurate description consistent with "Based in Salinas, CA" and use it everywhere, and flag [VERIFY] with Uli exactly how far the service area extends.
3. Add a real at-a-glance block (service area, who a prospect talks to, response time, pricing link) and an FAQ with real Q&A text — both are entirely absent — and move the cookie banner (about.html:157-177) after `<main>` in the DOM, or otherwise off the crawl path ahead of content, per the house rule against content-blocking elements preceding main content.
