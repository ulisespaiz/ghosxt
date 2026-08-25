# Page Audit: /

## Route
/ (file: index.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/founder title | "Founder & Lead IT Engineer" | index.html:103 (JSON-LD Person.jobTitle) | MATCHES - consistent with "Owner and sole engineer" |
| Owner/founder title (conflicting) | "Founder & CEO, Ghosxt" | index.html:1595 (email-mockup signature) | CONTRADICTS - disagrees with the JSON-LD jobTitle on the same page (:103); VERIFIED FACTS gives neither title explicitly, so pick one and use it everywhere |
| Prior role | "former Senior Solutions Consultant for the U.S. Department of Defense" | index.html:104 (JSON-LD Person.description) | UNVERIFIABLE [VERIFY WITH ULI] - VERIFIED FACTS confirms only general "prior DoD/federal contractor infrastructure experience," not this specific title |
| DoD infrastructure experience (general) | "Engineer with DoD infrastructure experience" | index.html:11 (meta description), :104 (JSON-LD), :454 (hero subtitle), :2561 (C-TPAT section) | MATCHES - consistent with VERIFIED FACTS; no clearance level ever stated (compliant with "Never state the clearance level") |
| Business location | Salinas, CA 93901 | index.html:106-112 (JSON-LD PostalAddress), :455 (hero link to /salinas) | MATCHES locality/state ("Based in Salinas, CA"); ZIP code itself is UNVERIFIABLE (not in VERIFIED FACTS) |
| Founding year | "2021" | index.html:187 (JSON-LD foundingDate), :479 (hero trust callout "since 2021") | MATCHES - consistent with "Serving clients since 2021 [VERIFY year]"; the underlying year itself is still flagged [VERIFY] in VERIFIED FACTS, so treat as provisionally correct |
| Google rating/review count | "5.0" / "26 Google reviews" (marker-synced) | index.html:473-479 (`<!-- ghosxt:trust-reviews -->` block) | MATCHES - value matches site-config.json (`google_review_count: 26`, `google_rating: "5.0"`) and is kept in sync by scripts/update-review-count.py |
| Google rating/review count (second, unsynced copy) | "5.0" / "26" | index.html:2347-2354 (trust-bar stat block) | CONTRADICTS the "lives in one data file and nowhere else" property in VERIFIED FACTS - this block is not wrapped in the `ghosxt:trust-reviews` marker and does not match the script's marker-block or key-facts regexes (see scripts/update-review-count.py:68-82), so it will NOT update when site-config.json changes. Value is currently correct but the architecture guarantee is already broken |
| Cities served | "11" (stat) / 11 named cities | index.html:2357 (trust-bar "11 Cities served"), :129-171 (JSON-LD areaServed cities), :3609-3619 (footer service-areas list) | Internally consistent (all three lists agree: Salinas, Monterey, Watsonville, Santa Cruz, Hollister, Gilroy, San Jose, Pacific Grove, Carmel, Seaside, Marina) but UNVERIFIABLE against VERIFIED FACTS, which does not enumerate a city list |
| Service radius | GeoCircle geoRadius "80000" (meters, ~50 mi) | index.html:118-127 (JSON-LD areaServed GeoCircle) | UNVERIFIABLE - no radius figure in VERIFIED FACTS |
| Response speed | "24/7 monitoring and instant response without human delay" | index.html:2261-2264 (comparison card, "Automated Protection") | CONTRADICTS - "instant response without human delay" overpromises relative to the actual contracted deliverable: a 4-hour notification window on actual/suspected critical incidents. Nothing on this page states the real 4-hour SLA anywhere |
| Response speed (chat demo) | Full issue "resolution" (DNS fix / phishing containment / server recovery) narrated within ~5.5 seconds of the user's message | assets/js/index.js:685-710 (`conversationData`, JS only - not in index.html) | CONTRADICTS / UNVERIFIABLE - implies near-instant fixes, inconsistent with the 4-hour critical-incident notification SLA in VERIFIED FACTS; also exists only in JS (see Legibility Checklist) |
| 24/7 monitoring | "We monitor your systems 24/7 with automated alerts" | index.html:1653-1655 | MATCHES - consistent with "managed detection and response with a 24/7 SOC" |
| Cybersecurity capability description | "Enterprise-grade security monitoring, threat detection, automated response systems, and compliance management" | index.html:1986-1990 (services grid) | MATCHES (reasonable paraphrase of "managed detection and response with a 24/7 SOC"); does not name SIEM or any vendor |
| Detection detail | "Custom scripts catch suspicious activity before it becomes a problem" | index.html:1891-1892 (Pillar 2 card) | UNVERIFIABLE - plausible but not itemized in the VERIFIED FACTS capability list; not a SIEM/vendor claim, just unconfirmed detail |
| Services offered | Managed IT Services, Cybersecurity, Cloud Services (M365/Azure), Web Development | index.html:201-231 (JSON-LD OfferCatalog), :1966-2018 (services grid) | MATCHES - all four are within the VERIFIED FACTS capability set; "Microsoft 365"/"Azure" here name the client-facing platform being managed, not an MSP tooling vendor |
| C-TPAT service claim | "Ghosxt ... handles every requirement, documents your compliance posture for CBP validation, and keeps your certification secure long-term" | index.html:2560-2564 | UNVERIFIABLE - not itemized in VERIFIED FACTS contracted deliverables (out of scope of this pass; verify against the dedicated /ctpat page separately) |
| Testimonial (named) | Villicana Group/Villicana Transportation - "past three years," "high-level compliance standards," import/export logistics | index.html:2364-2419 | UNVERIFIABLE - named (not anonymous) client testimonial; specifics cannot be checked against VERIFIED FACTS. No VERIFY-WITH-ULI flag required per instructions (that applies to anonymized examples), but content is still unconfirmed |
| Testimonial (named) | Andrew Sandoval, "Salinas City Council Member" | index.html:2439-2476 | UNVERIFIABLE - named testimonial, unconfirmed specifics |
| Testimonial (named) | C&M Machine Shop Inc. | index.html:2478-2513 | UNVERIFIABLE - named testimonial, unconfirmed specifics |
| Phone number | +1 (831) 204-0501 | index.html:97, :197 (JSON-LD), :361 (nav), :3678 (mobile CTA bar) | UNVERIFIABLE - not in VERIFIED FACTS, but internally consistent across the page |
| Email | sales@ghosxt.com | index.html:98 (JSON-LD), :3579 (footer) | UNVERIFIABLE - not in VERIFIED FACTS, internally consistent |
| Business hours | Mon–Fri 08:00–18:00 | index.html:188-193 (JSON-LD openingHoursSpecification) | UNVERIFIABLE - not in VERIFIED FACTS |
| Tagline | "Government-grade IT for small business." | index.html:3466 (footer) | UNVERIFIABLE - marketing framing, not a checkable fact, but not contradicted |
| Tagline | "Built by an engineer from the federal contracting world." | index.html:3590 (footer copyright line) | MATCHES - consistent with prior DoD/federal contractor experience |
| Copyright year | "© 2026 Ghosxt" | index.html:3590, :1602 (email mockup) | MATCHES - correct for current date (2026-08-24) |
| Excluded vertical (dental) | Not mentioned anywhere | n/a | MATCHES - house rule compliance |
| Cisco certification | Not claimed anywhere | n/a | MATCHES - house rule compliance |
| Clearance level | Not stated anywhere | n/a | MATCHES - house rule compliance |
| Vendor names / SIEM | Not mentioned anywhere | n/a | MATCHES - house rule compliance |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No dedicated block exists. Service area and "who you talk to" (Ulises) are scattered through hero copy; a concrete response-time figure never appears in plain text anywhere on the page (only vague "24/7"/"instant" language - see Claims Table); pricing is only a nav/footer link, not part of a summary block. Note: 54 other pages on the site carry a `<dt>Rated</dt>`-style "key-facts" block per scripts/update-review-count.py:42-48 - this homepage has none |
| FAQ present with real question-and-answer text | Fail | No FAQ section, no FAQPage schema, anywhere on this page |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero H1 + subtitle at index.html:448-456 states the offer plainly within the first ~100 words: "Managed IT & Cybersecurity that stops problems before they start... Get government-grade IT and cybersecurity for less than one in-house hire. One engineer with DoD infrastructure experience, real local response across California..." |
| Exactly one H1 | Pass | Single `<h1 class="hero-title">` at index.html:448; all other section headings are h2/h3 |
| Title, meta description, canonical present | Pass | Title :8, meta description :9-12, canonical :13 all present |
| JSON-LD present (list which types) | Pass | `@graph` at index.html:86-261 containing: **LocalBusiness** (with embedded Person/founder, PostalAddress, GeoCoordinates, areaServed GeoCircle/City/State/Country, ContactPoint, OfferCatalog→Offer→Service), **WebSite** (with SearchAction), **WebPage** (with SpeakableSpecification). No FAQPage (no FAQ content exists to back one) |
| Content that exists only inside JS | Fail | The entire chat-demo conversation - the actual "response" text ("Ohh I see the issue, let me fix it right now," "I've blocked the domain and updated your security protocols," "Expanded your capacity and implemented auto-scaling") - lives only in assets/js/index.js:685-836 (and its minified twin index.min.js). The static HTML (index.html:1782-1795) contains only the three clickable prompt buttons and a generic greeting; a crawler or LLM reading raw HTML never sees the actual demonstrated response content |
| Icon-only table cells | N/A | No `<table>` elements anywhere on this page |
| display:none on content that should be crawlable | Pass | The only inline `display: none` uses (index.html:1518, :1559) toggle alternate tab *illustrations* (decorative radar/email graphics), not text. The actual tab text (`.tab-content`) is hidden/shown via `opacity`/`visibility` in assets/css/index.min.css (not display:none), and all three tabs' full text stays present in the raw HTML regardless of which is visually active |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner" id="cookieBanner">` (index.html:275-301) sits in the DOM before `<nav>` (:304) and before `<main id="main-content">` (:420). Nav itself is not duplicated as a separate landmark (the mobile menu lives inside the same `<nav>`), but the cookie banner still precedes all main content |
| Internal links to pricing and to the relevant city or vertical pages | Pass | `/pricing` linked in nav (:347) and footer (:3490); footer links to all 11 service-area city pages (:3609-3619) and 8 vertical pages (trucking, agriculture, manufacturing, professional services, healthcare, property management, engineering, hospitality - :3511-3518); hero subtitle also links inline to `/salinas` (:455) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Em dash | None found - only en dashes (–) used as title-separator punctuation (e.g., index.html:8, :21). Not a violation of the stated rule |
| Cisco certification | None found - compliant |
| Dental / dentist | None found - compliant |
| Vendor names | None found - compliant |
| Clearance level | None stated - compliant |
| SIEM or unlisted capability | None found by name - compliant. Flagging for awareness, not as a strict violation: "instant response without human delay" (index.html:2263) and the JS chat demo's ~5-second resolutions (assets/js/index.js:685-710) describe response speed well beyond the 4-hour critical-incident notification SLA that's actually contracted; see Claims Table |

## Top Three Fixes
1. Build a real at-a-glance block near the top of the page (service area, named point of contact, an accurate response-time commitment, and a pricing link) - response time is currently never stated in plain text anywhere on the page, and the four elements are scattered rather than scannable together. While fixing this, reconcile "instant response without human delay" (index.html:2263) and the JS chat demo's near-instant resolutions (assets/js/index.js:685-710) against the real 4-hour critical-incident notification SLA - VERIFY WITH ULI which figure(s), if any, are safe to publish.
2. Move the chat-demo dialogue out of JS-only territory: either render the conversation text in the static HTML (progressively enhanced by JS) or add a plain-text equivalent, so an LLM/crawler reading raw HTML can see the actual demonstrated response content instead of only the three prompt buttons.
3. Fix the two internal inconsistencies found on this single page: the founder's title ("Founder & CEO, Ghosxt" at :1595 vs. "Founder & Lead IT Engineer" in JSON-LD at :103 - pick one) and the second, unsynced "26 Google reviews / 5.0" hardcode in the trust-bar block (:2347-2354), which sits outside the `ghosxt:trust-reviews` marker and scripts/update-review-count.py's sync patterns and will silently go stale the next time site-config.json's review count changes. Also add a real FAQ section with genuine question-and-answer text, which is entirely absent.
