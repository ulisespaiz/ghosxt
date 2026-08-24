# Page Audit: /blog/seasonal-worker-it-security-checklist-central-coast

## Route
/blog/seasonal-worker-it-security-checklist-central-coast.html

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Microsoft 365 / Google Workspace expiration support | "Microsoft 365 and Google Workspace both support automatic expiration dates or reminders tied to a hire" | body | UNVERIFIABLE (plausible product-capability claim, not Ghosxt-specific) |
| No pricing, cert, or DoD claims on this page | — | — | N/A — page has no author-bio-box (see below) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming author | Partial | "Ulises Paiz, Founder, Ghosxt" is present, but this page is **missing the author-bio-box** that every other audited post has (no photo, no credentials/DoD paragraph) — inconsistent with site template |
| Visible publish date | Pass | "July 6, 2026" |
| BlogPosting JSON-LD: datePublished, dateModified, author as Person | Pass | Dates match (2026-07-06) |
| Exactly one H1 | Pass | |
| Title, meta description, canonical | Pass | |
| FAQ JSON-LD matching visible text | Pass | 3 questions in JSON-LD match visible H3/p text verbatim |
| Internal links to relevant service pages | Partial | Links only to sibling blog posts (agriculture-it-cybersecurity, hospitality-it-cybersecurity, employee-offboarding, identity-hardening, mfa-fatigue) and /cybersecurity; no link to /managed-it-services or a pricing page |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| None found (no em dash, no Cisco, no dental, no vendor name, no clearance level, no SIEM, no price contradiction) | — |

## Technical/Asset Issues (non-house-rule)
| Issue | Location |
|-------|----------|
| Logo asset path uses a filename with a literal space, "ghosxt logo.webp" (no hyphen), inconsistent with every other audited page's "ghosxt-logo-160.webp" | navbar-logo `<img>`, footer-brand `<img>`, and publisher.logo.url in BlogPosting JSON-LD |
| CSS asset versions differ from the rest of the batch (main.min.css?v=2026-05-31d, blog.min.css?v=2026-05-15a vs. 2026-07-02a/2026-07-03a used elsewhere) | `<head>` stylesheet links |

## Top Three Fixes
1. Add the missing author-bio-box (photo + credentials paragraph) to match every other blog post's template — currently this page under-discloses author credentials relative to the rest of the site.
2. Fix the "ghosxt logo.webp" asset path (space in filename, no version hash) — likely a broken or stale image reference; confirm the file exists or correct it to the standard "ghosxt-logo-160.webp".
3. Add an in-body link to /managed-it-services or /pricing — currently no direct service-page link, only sibling blog posts and /cybersecurity.
