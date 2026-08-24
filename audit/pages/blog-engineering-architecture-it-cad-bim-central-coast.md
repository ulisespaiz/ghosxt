# Page Audit: /blog/engineering-architecture-it-cad-bim-central-coast

## Route
/blog/engineering-architecture-it-cad-bim-central-coast.html

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Founder credentials/bio | "10+ years... 9 certifications including CySA+, Security+, and AZ-104... Senior Solutions Consultant for the DoD... 40+ Central Coast businesses" | author-bio-box, line 194 | MATCHES cert count (9); "Senior Solutions Consultant for the DoD" and "40+ businesses" are invented specifics not in VERIFIED FACTS |
| "A federal-grade engineering background is the right lens for this, because engineering data deserves the same rigor as defense data." | line 222 | Consistent with VERIFIED "prior DoD/federal contractor infrastructure experience" — no clearance level stated, PASS |
| Line-item pricing for 25-person A/E firm: M365 $22/user=$550, MDR $25/user=$625, Managed IT $150–200/user=$3,750–5,000, vault admin $500–1,500, connectivity $400–900, backup $400–1,000 | lines 317–322 | UNVERIFIABLE — general market figures; total ($6,500–$10,500/mo, i.e. ~$260–420/user) does not map to published Core $125 / Secure Growth $175 / Compliance & Continuity $250 per-user tiers, though the scope here is broader (adds vault/connectivity/backup line items) so not a direct contradiction |
| "co-managed or white-label" engineering IT support for other MSPs | line 284 | Not itemized in VERIFIED FACTS capabilities list — UNVERIFIABLE service-offering claim |
| ITAR/CMMC/NIST SP 800-171 flow-down guidance | lines 91–94, 258, 308, 352–353 | UNVERIFIABLE — generic regulatory/educational content, not a specific Ghosxt certification or capability claim; describes obligations engineering clients may face, does not claim Ghosxt itself is ITAR/CMMC-certified |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | "Ulises Paiz, Founder, Ghosxt" |
| Visible publish date | Pass | `<time datetime="2026-06-02">June 2, 2026</time>` |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | All three present |
| Exactly one H1 | Pass | 1 |
| Title, meta description, canonical present | Pass | All present |
| FAQ JSON-LD matching visible text | Pass | Q&A pairs verbatim-match visible FAQ section |
| Internal links to relevant service pages | Pass | Links to /cybersecurity, /cloud-services, /network-design, /backup-disaster-recovery, /it-consulting-vcio |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Invented job title/story ("Senior Solutions Consultant for the DoD") and invented client count ("40+ Central Coast businesses") | line 194, author-bio-box (site-wide component) |

No em dash, no Cisco claim, no dental mention, no security-stack vendor names (only named products are Microsoft/Autodesk/SolidWorks/Revit — the CAD/PDM tools the article is about, not security-stack vendors), no clearance level, no SIEM claim.

## Top Three Fixes
1. Tag the "Senior Solutions Consultant for the DoD" title and "40+ Central Coast businesses" figure in the shared author-bio-box as [VERIFY] or remove — site-wide fix.
2. Tag the per-user pricing table (lines 317–325) as [VERIFY] since it is not derived from the published pricing tiers.
3. Consider confirming the "co-managed/white-label engineering IT support for other MSPs" offering (line 284) is an actual current service before this page is treated as authoritative.
