# Page Audit: /blog/nightmare-eclipse-legacyhive-windows-zero-day-smb-2026

## Route
/blog/nightmare-eclipse-legacyhive-windows-zero-day-smb-2026.html

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Author bio: shared blurb | - | line 194 | Cert count MATCHES VERIFIED FACTS; "10+ years," job title, "40+ businesses" UNVERIFIABLE (see group-wide note) |
| "engineer with DoD infrastructure experience" (CTA) | - | line 305 | MATCHES VERIFIED FACTS |
| No clearance level stated | - | whole page | MATCHES house rule |
| CVE numbers, patch dates, "570 fixes" Patch Tuesday claim, RoguePlanet/LegacyHive technical details | third-party security-news claims | throughout | External/journalistic security reporting, not Ghosxt capability claims - out of scope for VERIFIED FACTS verification |
| "EDR and 24/7 monitoring" capability description | generic capability | lines 213, 271-272, 298 | MATCHES VERIFIED FACTS MDR/24-7 SOC capability - no vendor name |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | line 189 |
| Visible publish date | Pass | `<time datetime="2026-07-15">July 15, 2026</time>` (line 181) |
| BlogPosting JSON-LD: datePublished, dateModified, author as Person | Pass | lines 47, 49-50 |
| Exactly one H1 | Pass | line 187 |
| Title, meta description, canonical present | Pass | lines 6-8. Minor: `<title>` reads "...Explained \| Ghosxt" while JSON-LD `headline` reads "...Explained for Small Business" - inconsistent but not a house-rule violation |
| FAQ JSON-LD matching visible text | Pass | 6 Q&As, verbatim match (lines 66-112 vs 285-301) |
| Internal links to relevant service pages | Pass | body link to /managed-it-services (line 263) |

## House-Rule Violations
None found.

## Top Three Fixes
1. Verify the shared author-bio numbers (see group-wide note).
2. Optional: align `<title>` tag with JSON-LD `headline` for consistency (cosmetic only).
3. No other changes needed.
