# Page Audit: /blog/best-it-support-in-salinas

## Route
/blog/best-it-support-in-salinas.html

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Founder credentials/bio | Same boilerplate as other posts, plus "I personally hold DoD infrastructure experience from prior federal IT work" | author-bio-box + body ~line 310 | MATCHES cert count and DoD-experience language; job title/business count UNVERIFIABLE |
| In-house IT salary range | "$75,000 to $110,000 fully loaded"; senior "$110,000 to $160,000" | body, FAQ | UNVERIFIABLE (general Salinas labor-market estimate, not a Ghosxt price) |
| Break-fix hourly rate | "$125 to $200 per hour" | body, FAQ | UNVERIFIABLE (general market rate) |
| MSP monthly rate | "$125 to $200 per user per month, all-inclusive" (Salinas market rate, repeated several times) | body ~lines 198, 234, 320; FAQ | UNVERIFIABLE as a market-rate claim; does not explicitly state this is Ghosxt's own price - Ghosxt's actual published tiers (Core $125 / Secure Growth $175 / Compliance & Continuity $250 per user/month) fall inside or near this range, so no direct contradiction, but the page never cites Ghosxt's own tier names or numbers despite discussing "how Ghosxt fits" |
| Service-area/client-industry claim | "We work with logistics, agriculture, professional services, healthcare, property management, and engineering firms in the area" | body, ~line 310 | Consistent with footer service-area list; no excluded vertical (dental) named |
| Hybrid model cost example | "$145,000 to $205,000 per year" for an 80-user hybrid setup | body, ~line 246 | UNVERIFIABLE (illustrative market math) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | |
| Visible publish date | Pass | `<time datetime="2026-05-16">` |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | |
| Exactly one H1 | Pass | |
| Title, meta description, canonical present | Pass | |
| FAQ JSON-LD matching visible text | Fail | JSON-LD has 5 Question entries (all verbatim-matching); visible body has 6 FAQ `<h3>` blocks - "Is it worth hiring a Bay Area IT company instead?" (line 331) is in the body but missing from the FAQPage structured data |
| Internal links to relevant service pages | Pass | Links to /pricing, /managed-it-services, /ctpat, plus a dedicated "Related reading" block linking to Salinas-cluster posts |

## House-Rule Violations
None found. No em dash, no dental, no Cisco certification claim, no vendor names, no clearance level, no SIEM claim.

## Top Three Fixes
1. The visible FAQ section has 6 questions but the FAQPage JSON-LD only lists 5 ("Is it worth hiring a Bay Area IT company instead?" is missing from the structured data) - add that Q&A to the JSON-LD so it matches the visible text.
2. Since "How Ghosxt fits" explicitly discusses the company's own pricing model, consider citing the actual published tier names/numbers (Core $125 / Secure Growth $175 / Compliance & Continuity $250) rather than leaving readers to infer them from the generic "$125-$200 Salinas market rate" figure used throughout.
3. Tag the shared bio block's job title/business count as [VERIFY] (site-wide fix).
