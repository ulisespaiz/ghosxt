# Page Audit: /blog/it-support-vs-managed-it-services-difference

## Route
/blog/it-support-vs-managed-it-services-difference (file: blog/it-support-vs-managed-it-services-difference.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Ghosxt is structured as an MSSP with managed SIEM | "Ghosxt is a managed IT services provider (MSP) with managed cybersecurity (MSSP-level security) built in... Ghosxt is structured this way: managed IT and managed cybersecurity are one product, not two" | :419, :327 | CONTRADICTS — VERIFIED FACTS: "Do not claim SIEM." The MSSP definition this page gives just above (:317, :78 JSON-LD) explicitly includes "managed SIEM," and the page then states Ghosxt IS structured that way |
| MSSP definition includes SIEM (industry-generic) | "deeper investment in cybersecurity tooling and operations: managed SIEM, identity threat detection, threat hunting, 24/7 SOC..." | :317, :78 (JSON-LD FAQ), :441 (visible FAQ) | CONTRADICTS when read with the "Ghosxt is structured this way" claim at :327/:419 — generic definition alone would be closer to educational, but the page ties it directly to Ghosxt |
| Cyber-insurance requirements | "carriers have shifted from asking 'do you have antivirus' to asking 'do you have phishing-resistant MFA, EDR, and managed SIEM'" | :453 (visible FAQ; not in JSON-LD) | CONTRADICTS — repeats "managed SIEM" as an expected/sold capability in a Ghosxt sales-facing FAQ |
| "Cybersecurity-included" ambiguity discussion | "...a full security stack (EDR + MFA + SIEM + identity threat detection + 24/7 SOC)" | :401 | CONTRADICTS — same unlisted-capability pattern |
| Pricing range (MSP model) | "$125 to $250 per user per month" | :244, :284 (table) | MATCHES VERIFIED FACTS published range |
| Break-fix hourly rate | "$125 to $200 per hour on the Central Coast in 2026" | :220, :283 (table) | UNVERIFIABLE — not in VERIFIED FACTS; differs somewhat from other posts' engineering-rate figures ($150/hr on it-help page, $125-$250/hr on managed-it-cost page) though ranges overlap |
| Co-managed cost example | "$65,000-$85,000 fully loaded" in-house junior tech + "$75-$125 per user per month" MSP | :347 | UNVERIFIABLE — not in VERIFIED FACTS, plausible market figure |
| Author bio (boilerplate) | "10+ years...," "9 certifications...," "Senior Solutions Consultant for the DoD," "40+ Central Coast businesses" | :186 | UNVERIFIABLE — recurring bio block |
| Byline title | "Founder, Ghosxt" | :181 | UNVERIFIABLE — VERIFIED FACTS says "Owner and sole engineer" |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| Visible byline naming the author | Pass | :181 and bio box :183-187 |
| Visible publish date | Pass | `<time datetime="2026-05-16">May 16, 2026</time>` :173 |
| BlogPosting JSON-LD with datePublished, dateModified, author as Person | Pass | :42-53; Person author :47; dates :49-50 |
| Exactly one H1 | Pass | Single `<h1>` :179 |
| Title, meta description, canonical present | Pass | :6, :7, :8 |
| FAQ JSON-LD matching visible text | Fail | JSON-LD FAQPage lists 5 Q&A (:63-106); visible page has 7 FAQ H3/P pairs (:437-456). The 5 in JSON-LD match verbatim, but 2 visible FAQs — "Do I really need MFA, EDR, and all that security stuff?" (contains the managed-SIEM claim) and "Can an MSP handle both IT and cybersecurity?" — have no JSON-LD counterpart |
| Internal links to relevant service pages | Pass | Links to managed-it-services, cybersecurity, pricing, and several related blog posts throughout |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| SIEM claimed/implied as a Ghosxt capability | :317, :327 ("Ghosxt is structured this way"), :401, :419 ("MSSP-level security built in"), :453 |

## Top Three Fixes
1. Rewrite :327/:419 so the page stops claiming Ghosxt itself delivers "MSSP-level security" that includes managed SIEM; describe MSSP generically without tying it to Ghosxt, or restate Ghosxt's actual capabilities from VERIFIED FACTS.
2. Remove "managed SIEM" from the FAQ answers at :401 and :453 (the insurance-requirements FAQ especially reads as a sales claim).
3. Add the 2 missing visible FAQs to the FAQPage JSON-LD (after the SIEM language above is fixed), or trim them from the visible page.
