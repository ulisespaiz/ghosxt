# Page Audit: /blog/switching-it-providers-salinas-monterey-checklist

## Route
/blog/switching-it-providers-salinas-monterey-checklist (file: blog/switching-it-providers-salinas-monterey-checklist.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Author credentials/bio | Sitewide bio: 10+ years, 9 certs, DoD experience, 40+ businesses | line 186 | MATCHES (cert count matches VERIFIED FACTS; years/business-count UNVERIFIABLE, not contradicted) |
| Ghosxt's own onboarding stack, explicit | "parallel deployment of our RMM, EDR, identity hardening, and backup" | line 405 | CONTRADICTS - "EDR" is not in the VERIFIED FACTS capability list (closest listed capability is "managed detection and response with a 24/7 SOC"). This is a direct first-person claim about Ghosxt's own stack, not a generic industry reference. |
| Old MSP's security tooling (generic, third-party) | "Security tool (CrowdStrike, SentinelOne, Huntress, Microsoft Defender for Business)" | line 280 | CONTRADICTS - VERIFIED FACTS: "never publish vendor names." Framed as the outgoing MSP's tools, not Ghosxt's own, but the names still appear on the page. "Microsoft Defender for Business" alone is whitelisted (VERIFIED FACTS lists it explicitly as part of Ghosxt's own stack); CrowdStrike, SentinelOne, and Huntress are not. |
| Old MSP's backup tooling (generic, third-party) | "Backup vendor (Datto, Veeam, Acronis, etc.)" | line 279 | CONTRADICTS - same vendor-name rule; Datto/Veeam/Acronis are not whitelisted anywhere in VERIFIED FACTS. |
| "EDR" used generically (old/new MSP tooling, not always explicitly Ghosxt's own) | 8 total occurrences | lines 228, 279-280, 303, 321, 350, 359, 389, 405 | Most are generic industry usage describing MSP tooling in general (old or new, unspecified); line 405 is the one explicit first-person Ghosxt claim (see above) |
| Onboarding/transition claims (90-day written audit, quarterly business review cadence, specific week-by-week playbook) | "Week 7+: First monthly report. First quarterly business review at the 90-day mark." "Day 90: written audit of what we inherited..." | lines 393, 396, 408-409 | UNVERIFIABLE - quarterly business reviews and a formal 90-day written audit are not among VERIFIED FACTS' contracted deliverables. VERIFY WITH ULI |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | Line 181, author-bio box 183-187 |
| Visible publish date | Pass | `<time datetime="2026-05-16">May 16, 2026</time>` line 173 |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | Lines 42-53 |
| Exactly one H1 | Pass | Line 179 |
| Title, meta description, canonical | Pass | Lines 6, 7, 8 |
| FAQ JSON-LD matching visible text | Pass | 5 Q&As (62-107) match visible FAQ (427-446); visible FAQ has 2 additional Q&As (442, 445) not mirrored in JSON-LD - minor incompleteness, not a mismatch of existing content |
| Internal links to relevant service pages | Pass | Links to /salinas, /pricing, /managed-it-services (465-467) plus several sibling blog posts |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Capability term "EDR" not in VERIFIED FACTS, used as first-person Ghosxt capability claim ("our RMM, EDR, identity hardening, and backup") | line 405 |
| Vendor names published: CrowdStrike, SentinelOne, Huntress (security tools) | line 280 |
| Vendor names published: Datto, Veeam, Acronis (backup tools) | line 279 |

No em dashes, no Cisco certification claims, no dental/dentist, no clearance level, no SIEM, and no price contradicting published pricing were found on this page.

## Top Three Fixes
1. Rewrite line 405 ("our RMM, EDR, identity hardening, and backup") to use only VERIFIED FACTS language - describe the capability without naming "EDR" or any vendor.
2. Strip CrowdStrike, SentinelOne, Huntress, Datto, Veeam, and Acronis from lines 279-280 - even though these are framed as the outgoing MSP's tools rather than Ghosxt's own, the house rule against vendor names is unconditional. Rewrite as generic categories ("security tool," "backup vendor") without brand examples, or VERIFY WITH ULI whether naming competitors'/third-party tools in this specific educational context is an intended exception to the rule.
3. Reconcile the "quarterly business review" and "90-day written audit" deliverables (lines 393, 396, 408-409) against VERIFIED FACTS' contracted-deliverables list - confirm these are real and add them to VERIFIED FACTS, or soften the claims.
