# Page Audit: /blog/yellowkey-greenplasma-windows-bitlocker-bypass-privesc

## Route
/blog/yellowkey-greenplasma-windows-bitlocker-bypass-privesc

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Author credentials | "9 certifications including CySA+, Security+, and AZ-104" | author-bio-box | MATCHES |
| DoD experience | "deep DoD infrastructure experience," "Senior Solutions Consultant for the DoD" | author-bio-box | MATCHES general / job title UNVERIFIABLE |
| Career length | "10+ years in IT infrastructure and cybersecurity" | author-bio-box | UNVERIFIABLE |
| Client count | "built security programs for 40+ Central Coast businesses" | author-bio-box | UNVERIFIABLE |
| YellowKey/GreenPlasma technical details (researcher "Nightmare-Eclipse," Microsoft MORSE/MSTIC/GHOST teams credited, no CVE yet) | body + FAQ JSON-LD | UNVERIFIABLE by this audit (external technical/attribution claims) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming author | Pass | |
| Visible publish date | Pass | `<time datetime="2026-05-12">May 12, 2026</time>` |
| BlogPosting JSON-LD: datePublished, dateModified, author as Person | Pass | |
| Exactly one H1 | Pass | |
| Title, meta description, canonical present | Pass | |
| FAQ JSON-LD matches visible text | Pass | 6 FAQ Q&As match visible FAQ section verbatim |
| Internal links to relevant service pages | Weak | No direct service-page link (only sibling blog posts: ransomware, patch-cadence, identity-hardening, mistakes); CTA links to Calendly only |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| None found (no em dash, Cisco, dental, clearance level, SIEM, or security-stack vendor names) | - |
| Minor: og:image points to generic fallback `/assets/img/og-image.png` instead of a post-specific image like sibling posts use | JSON-LD `image` field, line 46 | Cosmetic/social-share inconsistency, not a content-accuracy violation. |

## Top Three Fixes
1. Add an internal link to /cybersecurity or /network-design (currently no service-page link at all, unlike most sibling posts).
2. Fix the generic og:image fallback to a post-specific image consistent with the rest of the blog.
3. Verify shared bio-box claims (see vcio report).
