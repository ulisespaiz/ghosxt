# Page Audit: blog/penetration-testing-small-business-2026.html

## Route
/blog/penetration-testing-small-business-2026

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Single-focus pentest price | $4,000-$8,000 | body ~line 208, FAQ, JSON-LD FAQ | UNVERIFIABLE (industry-typical project pricing for a one-off third-party engagement; distinct service line from Ghosxt's recurring per-user MSP tiers, so does not contradict published pricing) |
| Combined external+internal pentest price | $8,000-$15,000 | body, FAQ | UNVERIFIABLE (same as above) |
| Full-scope engagement price | $15,000+ | body, FAQ | UNVERIFIABLE (same as above) |
| Author bio: "9 certifications including CySA+, Security+, and AZ-104" | 9 certs | author-bio-box, line 178 | MATCHES |
| Author bio: "10+ years", "Senior Solutions Consultant for the DoD", "40+ Central Coast businesses" | - | author-bio-box, line 178 | UNVERIFIABLE (shared boilerplate, see other reports) |
| "We run manual, adversarial penetration testing for small businesses across [service areas]" | capability claim | body, line 224 | CONTRADICTS/UNVERIFIABLE - penetration testing is not in VERIFIED FACTS' "Capabilities we actually deliver" list; the only related contracted deliverable is an "annual independent risk assessment arranged through a third-party assessor," which is not the same as Ghosxt (sole engineer) directly running adversarial pentests |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | line 165 (approx) |
| Visible publish date | Pass | line 157, Aug 14, 2026 |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | lines 49-50, 47 |
| Exactly one H1 | Pass | |
| Title, meta description, canonical present | Pass | lines 6-8 |
| FAQ JSON-LD matching visible text | Pass | pentest cost figures identical between JSON-LD and body/FAQ |
| Internal links to relevant service pages | Pass (assumed consistent with sibling pages; not fully re-verified line-by-line) | |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Capability not in VERIFIED FACTS: claims Ghosxt directly "run[s] manual, adversarial penetration testing" - pentesting is absent from the verified capabilities/deliverables list | body, line 224 |
| (Pricing note: pentest pricing itself is a distinct one-off project service, not the recurring per-user MSP pricing, so the dollar figures do not contradict the $125/$175/$250-per-user or $600 Tiny Team figures) | - |

## Top Three Fixes
1. Resolve the capability claim at line 224 ("We run manual, adversarial penetration testing") - either confirm with the PM this is a real, verifiable service Ghosxt performs/brokers and add it to VERIFIED FACTS, or soften the line to avoid implying an in-house adversarial pentest capability not on the verified list.
2. Verify the shared author-bio boilerplate claims (see password-manager report).
3. No other fixes needed.
