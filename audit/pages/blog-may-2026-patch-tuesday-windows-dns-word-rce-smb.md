# Page Audit: /blog/may-2026-patch-tuesday-windows-dns-word-rce-smb

## Route
/blog/may-2026-patch-tuesday-windows-dns-word-rce-smb (file: blog/may-2026-patch-tuesday-windows-dns-word-rce-smb.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Author bio (boilerplate) | "10+ years...," "9 certifications...," "Senior Solutions Consultant for the DoD," "40+ Central Coast businesses" | may-2026-patch-tuesday-windows-dns-word-rce-smb.html:186 | UNVERIFIABLE - recurring bio block |
| Byline title | "Founder, Ghosxt" | :181 | UNVERIFIABLE - VERIFIED FACTS says "Owner and sole engineer" |
| DoD infrastructure experience (general) | "engineer with DoD infrastructure experience" | :186, :314 | MATCHES - no clearance level stated |
| CVE/vulnerability counts, CVSS scores, MDASH/Claude Mythos discussion | ~120 fixes, 17 Critical, specific CVE IDs, "16 CVEs credited to MDASH" | throughout | N/A - third-party Microsoft/security-research facts, outside VERIFIED FACTS scope |
| JSON-LD image field | uses generic fallback `og-image.png` instead of the page-specific OG image | :46 | Minor site bug (not a house-rule violation) - meta `og:image` at :14 correctly points to the page-specific image; JSON-LD `image` field does not match |
| No pricing claims on this page | - | - | N/A |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | :181 and bio box :183-187 |
| Visible publish date | Pass | `<time datetime="2026-05-14">May 14, 2026</time>` :173 |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | :42-53; Person author :47; dates :49-50 |
| Exactly one H1 | Pass | Single `<h1>` :179 |
| Title, meta description, canonical present | Pass | :6, :7, :8 |
| FAQ JSON-LD matching visible text | Pass | 6 Q&A in JSON-LD (:63-106) match the 6 visible FAQ H3/P pairs (:294-310) verbatim |
| Internal links to relevant service pages | Pass | Links to managed-it-services, cybersecurity, and related Claude Mythos/BitLocker/identity-hardening posts (:210, :284-290) |

## House-Rule Violations
None found. No em dashes, Cisco claims, dental mention, vendor names, clearance level, SIEM, or unlisted capabilities; no pricing to contradict.

## Top Three Fixes
1. Replace "Founder" with "Owner" (or verify title) to match VERIFIED FACTS.
2. Fix the JSON-LD `image` field at :46 to point to the page's own OG image instead of the generic fallback.
3. Verify or source the shared author-bio figures.
