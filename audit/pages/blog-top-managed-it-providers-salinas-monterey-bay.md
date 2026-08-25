# Page Audit: /blog/top-managed-it-providers-salinas-monterey-bay

## Route
/blog/top-managed-it-providers-salinas-monterey-bay (file: blog/top-managed-it-providers-salinas-monterey-bay.html)

## "Cisco" signal - resolved
A raw substring grep for "cisco" hits 4 lines (231, 242, 306, 331), but all four are false positives: three are the word "discover"/"discount" (contain "isco" mid-word) and the fourth is "San Francisco" (line 331: "San Jose, Sunnyvale, and San Francisco MSPs will sell into Salinas"). Confirmed via exact word-boundary search (`grep -inw cisco`): **zero actual occurrences of "Cisco" on this page.** No Cisco certification claim, no Cisco equipment mention. Not a violation.

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Author credentials/bio | Sitewide bio: 10+ years, 9 certs, DoD experience, 40+ businesses | line 186 | MATCHES (cert count matches VERIFIED FACTS; years/business-count UNVERIFIABLE, not contradicted) |
| Ghosxt founded year | "Founded: 2021" | line 223, also FAQ line 70 | MATCHES VERIFIED FACTS "serving clients since 2021 [VERIFY year]" |
| Ghosxt's own security stack, explicit | "the security stack we run for clients is the stack senior engineers run on government networks: EDR on every endpoint, MFA enforced everywhere, identity hardening..." | line 235 | CONTRADICTS - "EDR" not in VERIFIED FACTS capability list (closest listed capability is "managed detection and response with a 24/7 SOC") |
| Ghosxt's own service list, explicit | "managed cybersecurity (EDR, MFA enforcement, patch management, security operations)" | line 256 | CONTRADICTS - same "EDR" term issue |
| Ghosxt's own documented stack, explicit | "EDR / MFA / patch cadence / identity hardening as a documented stack" | line 298 | CONTRADICTS - same "EDR" term issue |
| "EDR" as generic reader advice (not Ghosxt-specific) | "Ask about the security stack. EDR (not just antivirus)..." | line 343 | Generic advice to readers evaluating any MSP, not a first-person Ghosxt claim - lower priority than the three above but still uses an unlisted term |
| Deliverable claim | "Quarterly business reviews with a written report on what we patched, what we caught, what we recommend next" | line 245 | UNVERIFIABLE - not among VERIFIED FACTS' contracted deliverables (4-hour notification, annual risk assessment, SOC 2 docs, policy suite). VERIFY WITH ULI |
| Founder-led / flat-rate pricing claims | "Flat-rate per-user-per-month, published on the pricing page," "Founder-led... founder is the one on your account" | lines 242-243 | MATCHES VERIFIED FACTS (published per-user pricing tiers; sole engineer/owner) |
| DoD infrastructure experience | "Ulises Paiz, the founder, holds DoD infrastructure experience from prior federal IT work" | line 233 | MATCHES VERIFIED FACTS |
| Competitor factual claims (SRS Networks founded 1996, ATG founded 2001/CyberAB RPO/Inc. 5000 2011, Pinnacle founded 2009, Adaptive founded 2016) | various | lines 260-334 | Out of scope for Ghosxt fact-checking - these are third-party claims about competitors, sourced per the page's own disclosure section (lines 213-219, 379-381); not evaluated against VERIFIED FACTS |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | Line 181, author-bio box 183-187 |
| Visible publish date | Pass | `<time datetime="2026-05-16">May 16, 2026</time>` line 173 |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | Lines 42-53 |
| Exactly one H1 | Pass | Line 179 |
| Title, meta description, canonical | Pass | Lines 6, 7, 8 |
| FAQ JSON-LD matching visible text | Pass | 5 Q&As (63-106) match visible FAQ (348-364) verbatim; visible FAQ has one additional Q&A (363, "Where can I see another perspective") not mirrored in JSON-LD |
| Internal links to relevant service pages | Pass | Links to /pricing (306), /managed-it-services, /cybersecurity, /cloud-services, and multiple industry pages (256-258, 311-314) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Capability term "EDR" not in VERIFIED FACTS (closest listed capability is "managed detection and response with a 24/7 SOC") | lines 235, 256, 298 (explicit Ghosxt capability claims); line 343 (generic reader advice, lower priority) |

No em dashes, no Cisco certification claims (the "cisco" grep hit is a false positive - see above), no dental/dentist, no security-stack vendor names, no clearance level, no SIEM, and no price contradicting published pricing were found on this page.

## Top Three Fixes
1. Replace "EDR" with VERIFIED FACTS language ("managed detection and response with a 24/7 SOC") at lines 235, 256, and 298, where the page explicitly describes Ghosxt's own delivered stack.
2. Reconcile the "quarterly business reviews with a written report" deliverable claim (line 245) against VERIFIED FACTS' contracted-deliverables list - confirm it's real and add it to VERIFIED FACTS, or soften the claim.
3. No structural/legibility issues found - page is otherwise clean and well-linked.
