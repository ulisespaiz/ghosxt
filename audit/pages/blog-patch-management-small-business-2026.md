# Page Audit: blog/patch-management-small-business-2026.html

## Route
/blog/patch-management-small-business-2026

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Author bio: "9 certifications including CySA+, Security+, and AZ-104" | 9 certs | author-bio-box, line 178 | MATCHES |
| Author bio: "10+ years in IT infrastructure and cybersecurity" | 10+ years | author-bio-box, line 178 | UNVERIFIABLE |
| Author bio: "Senior Solutions Consultant for the DoD" | job title | author-bio-box, line 178 | UNVERIFIABLE |
| Author bio: "built security programs for 40+ Central Coast businesses" | 40+ businesses | author-bio-box, line 178 | UNVERIFIABLE (possible invented number) |
| "Patched within 24 to 72 hours" for actively-exploited flaws | SLA-style claim | body line 216, 238 | UNVERIFIABLE (operational claim, not in VERIFIED FACTS' 4-hour notification deliverable, but different topic — patch SLA vs incident notification) |
| No pricing claims | — | — | N/A |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | line 173 |
| Visible publish date | Pass | line 165, Aug 6, 2026 |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | lines 49-50, 47 |
| Exactly one H1 | Pass | line 171 |
| Title, meta description, canonical present | Pass | lines 6-8 |
| FAQ JSON-LD matching visible text | Pass | 4 Q&As match H3 text verbatim |
| Internal links to relevant service pages | Pass | /cybersecurity line 227, plus city pages (Salinas, Monterey, Santa Cruz, Watsonville, San Jose) line 230 and 4 sister blog posts |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| None found | — |

## Top Three Fixes
1. Verify the shared author-bio boilerplate (40+ businesses, DoD title, 10+ years) — same issue across the whole blog group.
2. Consider tagging the "24 to 72 hours" patch SLA claim [VERIFY] since it is not explicitly listed among contracted deliverables.
3. No other fixes needed.
