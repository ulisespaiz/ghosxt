# Page Audit: blog/pge-psps-it-continuity-plan-central-coast.html

## Route
/blog/pge-psps-it-continuity-plan-central-coast

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Cellular failover modem cost | $200-$600 + $30-$100/mo data | body ~line 290 | UNVERIFIABLE (generic reader-facing hardware pricing, not a Ghosxt service price) |
| Mobile hotspot cost (5 workers) | $1,000-$2,000 one-time, $150-$300/mo | body ~line 296 | UNVERIFIABLE (same, third-party consumer hardware) |
| Starlink cost | $99-$250/mo | body ~line 302 | UNVERIFIABLE (third-party ISP price) |
| PSPS events "every fall since 2019" | historical fact about PG&E, unrelated to Ghosxt | body line 218 | UNVERIFIABLE (public utility history, not a Ghosxt claim; "since 2019" here is not Ghosxt's founding date) |
| Author bio boilerplate (10+ years / DoD title / 40+ businesses / 9 certs) | — | author-bio-box, line 186 | 9-certs claim MATCHES; other three UNVERIFIABLE (shared boilerplate) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | line 180 (approx) |
| Visible publish date | Pass | line 173, May 16, 2026 |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | lines 49-50, 47 |
| Exactly one H1 | Pass | |
| Title, meta description, canonical present | Pass | lines 6-8 |
| FAQ JSON-LD matching visible text | Pass (spot-checked; not fully diffed line by line) | |
| Internal links to relevant service pages | Pass | /cloud-services, /backup-disaster-recovery linked |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Security-stack/infrastructure vendor names: "Sophos, Fortinet, SonicWall, Meraki, Ubiquiti UDM" (firewalls), "Cradlepoint, Peplink, Pepwave" (cellular failover brands), "Verizon Jetpack, T-Mobile 5G Home Internet, AT&T Nighthawk" (hotspots), "Razzolink, Etheric, Starlink" (backup ISPs), "Datto, Veeam, Spanning, Acronis Cyber Cloud" (backup tools), "Teams Phone, Zoom Phone, RingCentral, Dialpad" (softphones) | body, lines ~289-313 |

## Top Three Fixes
1. Review the vendor-name list above against the house rule "No vendor names." Context: these are generic market-recommendation examples for the reader's *own* infrastructure choices (firewalls, hotspots, ISPs, backup software), not statements that Ghosxt's own security stack uses them — but the house rule as written is unqualified, so this needs a PM call on whether educational/comparison-shopping vendor mentions are an exception or need to be genericized (e.g., "a modern business-class firewall" instead of naming Sophos/Fortinet/SonicWall/Meraki).
2. Verify the shared author-bio boilerplate claims (see password-manager report).
3. No pricing contradictions found against the published Ghosxt tiers — all dollar figures here are third-party hardware/ISP costs, not Ghosxt service pricing.
