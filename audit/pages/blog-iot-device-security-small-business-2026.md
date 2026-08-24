# Page Audit: /blog/iot-device-security-small-business-2026

## Route
/blog/iot-device-security-small-business-2026 (file: blog/iot-device-security-small-business-2026.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Author bio (boilerplate) | "10+ years in IT infrastructure and cybersecurity," "9 certifications including CySA+, Security+, and AZ-104," "Senior Solutions Consultant for the DoD," "built security programs for 40+ Central Coast businesses" | iot-device-security-small-business-2026.html:170 | UNVERIFIABLE — not in VERIFIED FACTS (same category as about.html's flagged bio claims); "9 certifications" count is at least consistent with the 9 non-degree credentials on file |
| Byline title | "Founder, Ghosxt" | :165, :189 (Person schema uses no jobTitle) | UNVERIFIABLE — VERIFIED FACTS says "Owner and sole engineer," not "Founder" |
| DoD infrastructure experience (general) | "engineer with DoD infrastructure experience" | :170, :234 | MATCHES — no clearance level stated |
| Capabilities described (VLAN segmentation, EDR-adjacent, DNS/UPnP hardening) | generic IoT security guidance | body | MATCHES / N/A — general educational content, not a specific capability list |
| No pricing claims on this page | — | — | N/A |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | "Ulises Paiz, Founder, Ghosxt" at :165 plus full author-bio box at :167-171 |
| Visible publish date | Pass | `<time datetime="2026-07-27">July 27, 2026</time>` at :157 |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | :42-53; author `{"@type":"Person","name":"Ulises Paiz",...}` :47; datePublished/dateModified :49-50 |
| Exactly one H1 | Pass | Single `<h1>` at :163 |
| Title, meta description, canonical present | Pass | :6, :7, :8 |
| FAQ JSON-LD matching visible text | Pass | 3 Q&A in JSON-LD (:63-90) match the 3 visible FAQ H3/P pairs (:223-230) verbatim |
| Internal links to relevant service pages | Pass | Links to network-design, cybersecurity, and related blog posts in body (:184, :215-218) |

## House-Rule Violations
None found. No em dashes, no Cisco certification claims, no dental/dentist mention, no security-stack vendor names, no clearance level, no SIEM or unlisted capability, no pricing claims to contradict.

## Top Three Fixes
1. Replace "Founder" with "Owner" (or verify title with Uli) to match VERIFIED FACTS.
2. Verify or source the "10+ years," "Senior Solutions Consultant for the DoD," and "40+ businesses" figures in the shared author-bio boilerplate (affects all 12 pages in this batch identically).
3. No other changes needed; page is otherwise clean.
