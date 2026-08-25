# Page Audit: /blog/index.html

## Route
/blog/index.html (blog hub/listing page - not a single blog post; the standard blog-post checks below are adapted or marked N/A accordingly)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| HIPAA post teaser copy | "What HIPAA-compliant IT actually looks like for a Monterey County medical or dental practice, beyond the marketing checkbox" | lines 1280-1286 (card linking to /blog/hipaa-compliant-it-medical-dental-monterey-county) | CONTRADICTS house rule (propagates dental as target vertical; root cause is the linked post, see blog-hipaa-compliant-it-medical-dental-monterey-county.md) |
| Microsoft 365 Copilot Business price reference | "$18/user/month if locked in before June 30, 2026; $21 after" | lines 1058-1059 | Not a Ghosxt price - Microsoft's own SKU pricing cited in a teaser; no contradiction with Ghosxt's published tiers |

## Legibility Checklist (blog-adapted)
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | N/A | Index/hub page, no single author byline expected |
| Visible publish date | N/A | Index/hub page; each card carries its own linked post's date |
| BlogPosting JSON-LD: datePublished, dateModified, author as Person | N/A | JSON-LD here is `@type: Blog`, not BlogPosting (lines 35-44) - correct for a hub page |
| Exactly one H1 | Pass | "Notes from the field" (line 104) |
| Title, meta description, canonical present | Pass | lines 6-8 |
| FAQ JSON-LD matching visible text | N/A | No FAQ content on this page |
| Internal links to relevant service pages | Pass | extensive card links to individual posts and service pages throughout |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental named in a post-teaser card as part of the target-practice description | lines 1280-1286 |

## Top Three Fixes
1. Update or remove the HIPAA post teaser copy ("medical or dental practice") once the source page (blog-hipaa-compliant-it-medical-dental-monterey-county) is corrected - the excluded vertical should not surface here either.
2. None otherwise; this hub page is structurally clean (single H1, correct Blog-type JSON-LD, no other signal-word hits across its ~1,570 lines).
3. -
