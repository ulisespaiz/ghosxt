# Page Audit: blog/phishing-simulation-security-awareness-training-small-business-2026.html

## Route
/blog/phishing-simulation-security-awareness-training-small-business-2026

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| KnowBe4 Silver tier pricing | $20-25/user/year (~$300-375/yr at 15 users; ~$300-500/yr for a 15-20 person team) | body lines 94, 238, FAQ, JSON-LD FAQ | UNVERIFIABLE (third-party vendor pricing, not Ghosxt's; figures are internally consistent - $300-500 range reflects the wider 15-20 user band at $20-25/user) |
| Click-rate improvement | 25-30% down to under 5% after 12 months of quarterly simulations | body, quickfix, FAQ | UNVERIFIABLE (industry-style statistic, not sourced) |
| Ebbinghaus forgetting curve stat | "forget roughly 50% within a day, 90% within a week" | body ~line 197 | UNVERIFIABLE (general research claim, not Ghosxt-specific; not a house-rule issue) |
| Author bio boilerplate | - | author-bio-box, line 178 | 9-certs claim MATCHES; other claims UNVERIFIABLE |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | |
| Visible publish date | Pass | line 165, June 27, 2026 |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | lines 49-50, 47 |
| Exactly one H1 | Pass | |
| Title, meta description, canonical present | Pass | lines 6-8 |
| FAQ JSON-LD matching visible text | Pass | |
| Internal links to relevant service pages | Partial | links to sister blog posts (MFA fatigue, email authentication, 10 essentials) but no direct link to /cybersecurity in body |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Security-stack vendor names: "KnowBe4" (also in SEO keywords meta), "Proofpoint," "IRONSCALES" | body lines 52 (keywords), 91, 94, 191, 222, 237, 238 (repeated) |
| Ambiguity risk: body implies Ghosxt's own security-awareness-training capability may run on one of these named platforms ("your managed IT provider likely has a platform license that covers phishing simulation as part of a managed security services package") without naming which - combined with the repeated KnowBe4 mentions this reads close to naming Ghosxt's own vendor for a capability VERIFIED FACTS says must never be attributed to a named vendor | body lines 191, 222, 238 |

## Top Three Fixes
1. Remove or genericize the KnowBe4/Proofpoint/IRONSCALES vendor names (including the "KnowBe4 small business" SEO keyword) - security awareness training is a capability Ghosxt delivers per VERIFIED FACTS, and vendor names for delivered capabilities are explicitly prohibited.
2. Verify the shared author-bio boilerplate claims (see password-manager report).
3. No pricing contradictions against Ghosxt's own published tiers found - all dollar figures are third-party KnowBe4/Proofpoint pricing.
