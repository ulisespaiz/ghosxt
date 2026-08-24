# Page Audit: /blog/it-help-help-desk-tech-support-small-business-salinas

## Route
/blog/it-help-help-desk-tech-support-small-business-salinas (file: blog/it-help-help-desk-tech-support-small-business-salinas.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Pricing tier names (set A) | "Foundation" $600/mo (1-4 users), "Essential" $125, "Professional" $175, "Premium" $250 per user/mo (5+ users) | :199 (quickfix box), :360-364 ("What it costs" section) | CONTRADICTS - VERIFIED FACTS names the tiers Tiny Team, Core, Secure Growth, Compliance & Continuity; "Foundation/Essential/Professional/Premium" do not match |
| Pricing tier names (set B) | "Tiny Team Managed Security" $600/mo, "Core Managed IT" $125, "Secure Growth" $175, "Compliance & Continuity" $250 per user/mo | :102 (FAQPage JSON-LD), :404 (visible FAQ answer) | MATCHES VERIFIED FACTS, but CONTRADICTS the tier names used elsewhere on the same page (see row above) - same page uses two different naming schemes for the identical four price points |
| Dollar amounts themselves | $600 flat / $125 / $175 / $250 per user/month | :199, :360-364, :102, :404 | MATCHES VERIFIED FACTS pricing on both naming schemes - only the tier *names* conflict, not the numbers |
| Capability at top tier | "Premium... Identity Threat Detection, managed SIEM, compliance support, vCIO..." | :363 | CONTRADICTS - VERIFIED FACTS: "Do not claim SIEM." This ties managed SIEM directly to Ghosxt's own top pricing tier |
| Project/engineering hourly rate | "$150 per hour for engineering work" | :364 | UNVERIFIABLE - not in VERIFIED FACTS; also differs from the $125–$250/hr engineering rate quoted on managed-it-services-cost-salinas-2026.html (same site, same claim category) |
| Author bio (boilerplate) | "10+ years...," "9 certifications...," "Senior Solutions Consultant for the DoD," "40+ Central Coast businesses" | :186 | UNVERIFIABLE - recurring bio block |
| Byline title | "Founder, Ghosxt" | :181 | UNVERIFIABLE - VERIFIED FACTS says "Owner and sole engineer" |
| Link to HIPAA/dental post | anchor text "the HIPAA post," href contains `/blog/hipaa-compliant-it-medical-dental-monterey-county` | :410 | INFORMATIONAL - this page does not itself frame dental as a client/vertical; it links to a separate post whose slug contains "dental." Flagging for cross-reference since that target page is under separate review for a retarget decision |
| Response times, on-site coverage, remote/on-site split (80-90%) | various operational claims | :198, :335-337, :395, :401 | UNVERIFIABLE - operational specifics not covered in VERIFIED FACTS, no reason to doubt |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | :181 and bio box :183-187 |
| Visible publish date | Pass | `<time datetime="2026-05-16">May 16, 2026</time>` :173 |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | :42-53; Person author :47; dates :49-50 |
| Exactly one H1 | Pass | Single `<h1>` :179 |
| Title, meta description, canonical present | Pass | :6, :7, :8 |
| FAQ JSON-LD matching visible text | Fail | JSON-LD FAQPage lists only 5 Q&A (:63-107); visible page has 8 FAQ H3/P pairs (:391-413). The 5 in JSON-LD match visible text verbatim, but 3 visible FAQs (Mac support, regulated industries/HIPAA, "need one thing today") have no JSON-LD counterpart |
| Internal links to relevant service pages | Pass | Links to pricing, healthcare-it-services, ctpat, professional-services-it, cybersecurity, and multiple blog posts throughout |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| SIEM (unlisted capability) tied to Ghosxt's own top pricing tier | :363 ("Premium... managed SIEM...") |

## Top Three Fixes
1. Reconcile the two conflicting pricing-tier naming schemes on this single page (Foundation/Essential/Professional/Premium vs. Tiny Team/Core/Secure Growth/Compliance & Continuity) - pick the VERIFIED FACTS names (Tiny Team, Core, Secure Growth, Compliance & Continuity) everywhere.
2. Remove "managed SIEM" from the Premium/Compliance & Continuity tier description at :363; replace with a capability actually on the VERIFIED FACTS list.
3. Add the 3 missing visible FAQs (Mac support, regulated industries, one-off help) to the FAQPage JSON-LD, or trim the visible FAQ list to match.
