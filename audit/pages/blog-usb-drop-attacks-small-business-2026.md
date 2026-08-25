# Page Audit: /blog/usb-drop-attacks-small-business-2026

## Route
/blog/usb-drop-attacks-small-business-2026 (file: blog/usb-drop-attacks-small-business-2026.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Author credentials/bio | Sitewide bio: 10+ years, 9 certs, DoD experience, 40+ businesses | line 170 | MATCHES (cert count matches VERIFIED FACTS; years/business-count UNVERIFIABLE, not contradicted) |
| "EDR" used as generic reader-facing advice (not an explicit first-person Ghosxt capability claim) | "EDR that flags unusual command execution," "EDR with behavioral detection," CTA: "confirm EDR is watching for post-connection command activity" | lines 182, 206, 236 | Lower-priority than an explicit "we provide EDR" claim - this is advisory language about what a good security posture includes and what Ghosxt would check on a prospect's environment during a free assessment, not a direct claim that "EDR" is Ghosxt's own delivered capability. Still uses a term not in VERIFIED FACTS' capability list (MDR w/ 24/7 SOC is listed, not EDR); worth reconciling for consistency with other pages in this batch. |
| No pricing claims | - | - | N/A |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | Line 165, author-bio box 167-171 |
| Visible publish date | Pass | `<time datetime="2026-07-24">July 24, 2026</time>` line 157 |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | Lines 42-53 |
| Exactly one H1 | Pass | Line 163 |
| Title, meta description, canonical | Pass | Lines 6, 7, 8 |
| FAQ JSON-LD matching visible text | Pass | 3 Q&As (63-90) match visible FAQ (225-232) verbatim |
| Internal links to relevant service pages | Pass | Links to /cybersecurity (220) and 4 related blog posts (215-220) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Capability term "EDR" not in VERIFIED FACTS, used repeatedly (advisory tone, not an explicit Ghosxt-delivers-this claim, but still an unlisted term) | lines 182, 206, 219-220, 236 |

No em dashes, no Cisco certification claims, no dental/dentist, no security-stack vendor names, no clearance level, no SIEM, no price contradicting published pricing.

## Top Three Fixes
1. Reconcile the repeated "EDR" language (lines 182, 206, 236, plus the link-post title at 219) with VERIFIED FACTS' listed capability term ("managed detection and response with a 24/7 SOC") for consistency across the site - lower priority than pages making an explicit "our stack includes EDR" claim, but the term should still be standardized.
2. No other issues found.
3. None.
