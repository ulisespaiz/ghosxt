# Target query panel (SEO plus AI-search)

Date opened: 2026-10-25. Owner fills the hand-checked columns; the agent column was
pre-filled on 2026-10-25 with one US web-search API pass per query (not Google, not a
local-pack result, no location bias set). Treat the agent column as "is the domain in the
general web index at all", nothing more.

How to use: run each query once a month in a fresh session per surface. Record whether
ghosxt.com is named, the position or citation, and any wrong statement about Ghosxt
word for word. A wrong statement is a defect to trace back to the page or listing that
caused it (see audit/llm-prompts.md for the longer 20-prompt panel and the log format).

Location wording follows the owner's rule: the service area is Monterey County and
surrounding areas. City-level queries are listed only where buyers demonstrably type the
city (Watsonville and Hollister are the two phrases the site already ranks for).

| # | Theme | Query without location | Query with location | Owning page (should answer it) | Google (hand) | Google AI Overview / AI Mode (hand) | ChatGPT (hand) | Claude (hand) | Perplexity (hand) | Gemini (hand) | Copilot (hand) | Agent web search 2026-10-25 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Managed IT | managed IT services for a small business | managed IT services Monterey County small business | /managed-it-services | | | | | | | | ghosxt.com absent. Adaptive Information Systems (Salinas) x4, Rayne Technology (Monterey), one Massachusetts false match |
| 2 | Managed IT | IT support company for a 10 person business | IT support small business Monterey CA | /help-desk-it-support, /managed-it-cost-monterey-county | | | | | | | | not run (covered by 1) |
| 3 | Managed IT | how much does managed IT cost per user per month | managed IT cost Monterey County | /managed-it-cost-monterey-county, /pricing | | | | | | | | not run |
| 4 | Cybersecurity | cybersecurity services for a small business | cybersecurity services small business Monterey County | /cybersecurity | | | | | | | | ghosxt.com absent. Adaptive IS x4, Rayne, CTRL-A (Inland Empire) |
| 5 | Cybersecurity | managed detection and response for a small business | MDR small business Central Coast California | /managed-detection-response | | | | | | | | not run |
| 6 | Cybersecurity | cyber insurance requirements MFA MDR backups what the MSP must provide | cyber insurance compliance MSP California | /cyber-insurance-compliance | | | | | | | | ghosxt.com absent. Only national MSP blogs (CMIT, Mainsail, Elect Pros) |
| 7 | Compliance: CMMC | CMMC compliance MSP for a small defense contractor | CMMC MSP Monterey County (NPS and DLI adjacent) | /cmmc-compliance | | | | | | | | ghosxt.com absent. No Central Coast provider at all: CyberSheath, Agile IT, Consilien (LA/OC), PreVeil partners |
| 8 | Compliance: HIPAA | HIPAA compliant IT support for a medical practice | HIPAA compliant IT support medical practice Monterey County | /hipaa-it-compliance, /healthcare-it-services | | | | | | | | ghosxt.com absent. No Monterey County provider found; Texas and Florida firms, a 2014 county report |
| 9 | Compliance: C-TPAT | C-TPAT cybersecurity requirements IT provider for importers and carriers | C-TPAT IT compliance Monterey County / Salinas Valley shippers | /ctpat, /trucking-it-services | | | | | | | | ghosxt.com absent. Only generic compliance guides; no provider of any kind surfaced (open lane) |
| 10 | Managed AI | managed AI governance for a small business | managed AI governance Monterey County | /managed-ai (PR #260, unmerged) | | | | | | | | ghosxt.com absent. Category exists: IronEdge ManagedAI, Integris CORE, Hatz Activate; all Texas or national |
| 11 | Managed AI | is it safe for employees to use ChatGPT with company data | AI acceptable use policy help small business Monterey | /managed-ai FAQ, /blog/ai-acceptable-use-policy-small-business-2026 | | | | | | | | not run |
| 12 | Managed AI | Microsoft 365 Copilot readiness for a small business | Copilot readiness assessment IT provider Monterey Bay | /managed-ai, /blog/microsoft-365-copilot-oversharing-risk-small-business-2026 | | | | | | | | ghosxt.com absent. Only Microsoft marketplace listings and national vendors |
| 13 | Control: city win | IT support Watsonville | (same) | /watsonville | | | | | | | | ghosxt.com absent in this index (Google showed it in the 2026-09 baseline); ClickAway, HEROIC, RVS job posts |
| 14 | Control: brand | ghosxt | ghosxt.com managed IT Salinas Monterey | / | | | | | | | | ghosxt.com absent even for the brand query; index returned Adaptive IS, SRS, Alvarez, ZAG, Got.net |

## Read on the pre-fill

- Zero of ten queries returned ghosxt.com, including the branded query. This is one search
  API and may underweight the domain, but it matches the 2026-09 rankings baseline (2 of 10
  phrases) and says the problem is index presence and third-party mentions, not on-page
  wording. See AUDIT.md section "Positioning read".
- Three lanes have no local competitor in the index at all: C-TPAT IT (row 9), HIPAA IT in
  Monterey County (row 8), and CMMC on the Central Coast (row 7). Those are the compliance
  plus MSP plus location queries the recent AI-assistant leads used.
- Managed AI governance (row 10) is a named category with national entrants and no local one.

## Columns to fill by hand

Google: position of the first ghosxt.com result, and whether the local pack shows Ghosxt.
AI surfaces: Y/N named, position in the answer, the cited URL, and any misstatement verbatim.
