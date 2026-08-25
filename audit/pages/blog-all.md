# Page Audit: /blog/all

## Route
/blog/all.html

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Total post count | "116 items" | explorer toolbar, ~line 177 | UNVERIFIABLE (not counted against live directory; internal index count, not a VERIFIED FACTS item) |
| Category counts | Cybersecurity 86, Industry IT 9, Managed IT in Salinas 6, Managed IT 4, Web Development 4, Microsoft 365 3, Backup & DR 1, Cloud Services 1, Google Workspace 1, Troubleshooting 1 | explorer filters, ~lines 182-191 | UNVERIFIABLE (not cross-tallied) |
| Linked post title presents dental as a target/client vertical | "HIPAA-Compliant IT for Medical & Dental Practices in Monterey County" | table row, ~line 726 | CONTRADICTS VERIFIED FACTS ("Excluded vertical: dentists. Dental must not appear as a client or target industry anywhere") - this is a title for a linked blog post (not itself in this audit batch) but the dental-targeting title is displayed as content directly on this page |

## Legibility Checklist
Note: this is a CollectionPage (file-explorer style post index), not a BlogPosting - several items below are marked N/A for that reason rather than Fail.
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | N/A | Index page; no single-post byline expected |
| Visible publish date | N/A | Index page lists many posts' dates in a table; no page-level "publish date" |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Fail (N/A by design) | Page uses `CollectionPage` JSON-LD, not `BlogPosting` - expected for an index, but confirm this is the intended type for this route |
| Exactly one H1 | Pass | "All posts" |
| Title, meta description, canonical present | Pass | All present |
| FAQ JSON-LD matching visible text | N/A | No FAQ content on this page (appropriate for an index) |
| Internal links to relevant service pages | Partial | Page links to every blog post but not directly to service pages (nav/footer service links still present) |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Dental presented as a target/client vertical in a linked post title ("HIPAA-Compliant IT for Medical & Dental Practices in Monterey County") | Row linking to /blog/hipaa-compliant-it-medical-dental-monterey-county, ~line 726 |

No em dash, no Cisco certification claim, no clearance level, no SIEM claim, no vendor names, no pricing on this page.

## Top Three Fixes
1. The linked post "HIPAA-Compliant IT for Medical & Dental Practices in Monterey County" needs its own audit - it presents dental as a target vertical in its title, which contradicts the excluded-vertical rule. That post is not in this audit batch; flag it for a separate pass. Consider whether its title (as displayed on this index page) should be retitled in the interim.
2. Confirm the "116 items" and per-category counts are accurate/auto-generated rather than hand-maintained, so they don't drift from the actual post count.
3. No other action needed on this page itself.
