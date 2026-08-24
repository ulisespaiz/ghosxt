# Page Audit: /blog/top-website-design-companies-salinas-monterey-bay

## Route
/blog/top-website-design-companies-salinas-monterey-bay (file: blog/top-website-design-companies-salinas-monterey-bay.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Author credentials/bio | Sitewide bio: 10+ years, 9 certs, DoD experience, 40+ businesses | line 186 | MATCHES (cert count matches VERIFIED FACTS; years/business-count UNVERIFIABLE, not contradicted) |
| Ghosxt founded year | "Founded: 2021" | line 221 | MATCHES VERIFIED FACTS "serving clients since 2021 [VERIFY year]" |
| DoD infrastructure experience | "Ulises Paiz, the founder, holds DoD infrastructure experience from prior federal IT work" | line 229 | MATCHES VERIFIED FACTS |
| Hosting/infrastructure claim | "the Ghosxt site itself is on Cloudflare with Web Analytics, strict transport security, and modern TLS" | line 231, also line 196 ("hosted on Cloudflare") | Factual claim about Ghosxt's own website infrastructure, not a security-stack capability claim from VERIFIED FACTS — Cloudflare is the hosting/CDN platform, not a security product being sold to clients. Not flagged as a vendor-name violation (infrastructure disclosure, not a capability claim). |
| Website pricing ranges (industry-wide, comparative) | "$2,500-$7,500" starter, "$7,500-$20,000" custom, "$15,000-$50,000+" e-commerce, DIY $20-$50/mo | lines 86, 321-323, 354 (FAQ) | Market/competitor pricing for comparison, not a specific Ghosxt price commitment — no contradiction with VERIFIED FACTS MSP pricing |
| Competitor factual claims (Monterey Premier since 2015, Mag One Media, Peakify since 2016, Zestful Media) | various | lines 258-288 | Out of scope for Ghosxt fact-checking — third-party claims, sourced per page's own disclosure (215-217, 381-383) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | Line 181, author-bio box 183-187 |
| Visible publish date | Pass | `<time datetime="2026-05-16">May 16, 2026</time>` line 173 |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | Lines 42-53 |
| Exactly one H1 | Pass | Line 179 |
| Title, meta description, canonical | Pass | Lines 6, 7, 8 |
| FAQ JSON-LD matching visible text | Pass | 4 Q&As (63-105) match visible FAQ (347-360) verbatim; visible FAQ has two additional Q&As (362, 365) not mirrored in JSON-LD |
| Internal links to relevant service pages | Pass | Links to /website-development repeatedly (196, 221, 235, 243) |

## House-Rule Violations
None found. No em dashes, no Cisco certification claims, no dental/dentist, no security-stack vendor names, no clearance level, no SIEM, no capability outside VERIFIED FACTS, no price contradicting published MSP pricing (this page's dollar figures are website-development pricing, a separate service line).

## Top Three Fixes
1. Confirm the website-development pricing figures cited (implicitly, via the "our starting price is on the page" language at line 235) stay in sync with the live /website-development page — no specific numbers are hardcoded here beyond competitor ranges, so low risk, but worth a spot check.
2. No violations found.
3. None.
