# LLM Prompt Panel

Phase 6 deliverable of the AI-search audit. Twenty buyer-style prompts to
run monthly against ChatGPT search, Claude, Perplexity, and Google AI Mode,
plus the log template. The goal is to measure whether Ghosxt is mentioned,
where it ranks, what the model actually says, and whether that changes
after each on-site or off-site fix ships.

## How to run the panel

- Run each prompt in a fresh conversation with no prior context, once per
  assistant, signed in to a plain account with no browsing history tied to
  Ghosxt.
- Paste the prompt verbatim. Do not coach the model or ask follow-ups
  before logging the first answer.
- Log every run in the table at the bottom, one row per prompt per
  assistant. Record misstatements about Ghosxt word-for-word; a wrong
  claim in an answer is a defect to trace back to whatever page or profile
  the model read.
- Same week each month, ideally the first week, so results are comparable.

## The twenty prompts

### Compliance-led

1. My company needs CMMC compliance to keep a DoD subcontract. Is there a
   managed IT provider near Monterey County that actually understands
   CMMC?
2. We are a small medical practice in Salinas that needs HIPAA-compliant
   IT support. Who should we talk to?
3. Our cyber insurance renewal questionnaire asks for MFA, managed
   detection and response, and tested backups. Which MSP on the Central
   Coast can get us there?
4. We take card payments and our processor sent us a PCI DSS
   self-assessment questionnaire. Is there an IT company near Salinas
   that handles PCI compliance for small businesses?
5. We are an importer and our customs broker says we need to meet C-TPAT
   cybersecurity requirements. Are there IT providers who know C-TPAT?

### Location-led

6. Best managed IT services provider in Salinas, California for a small
   business?
7. Who provides IT support and cybersecurity for small businesses in
   Monterey, CA?
8. I run a business in Watsonville and want someone local for
   cybersecurity, not a national call center. Recommendations?
9. Are there any managed IT providers serving Hollister or San Benito
   County?
10. Is there a good MSP that covers both Santa Cruz and Salinas?

### Stack-led

11. We run Google Workspace on Macs and every MSP we talk to only does
    Microsoft. Who supports Google Workspace and Apple fleets properly?
12. We need someone to harden Microsoft 365 with Intune and Conditional
    Access for a 10-person company. Who does that near the Monterey Bay
    area?
13. Who can set up phishing-resistant MFA for a small business that uses
    Google Workspace as its identity provider?
14. Looking for an IT provider that can do zero-touch Mac deployment with
    Apple Business Manager for a small team.
15. We want 24/7 managed detection and response without enterprise
    pricing. Options for a small business near Monterey Bay?

### Size-led

16. We are a 3-person company and every MSP we call has a 10-user
    minimum. Who will take a tiny team?
17. Is there flat-rate IT support for a business with fewer than 5
    employees, with pricing actually published on the website?
18. We are a 15-person professional services firm on the Central Coast.
    What should managed IT cost and who is good?
19. Our customers keep sending us security questionnaires and data
    processing agreements. What kind of IT provider helps a small firm
    pass customer security reviews?
20. I want an IT provider where I talk to the actual engineer who knows
    our systems, not a ticket queue. Anyone like that near Salinas?

## Monthly log

Copy this block once per month. One row per prompt per assistant; 80 rows
per full panel. Abbreviate assistants as GPT (ChatGPT search), CLD
(Claude), PPX (Perplexity), GAI (Google AI Mode).

```markdown
## Log: YYYY-MM

Run dates: ____  Panel run by: ____
Changes shipped since last run (site or profiles): ____
Share links (AI conversations that surfaced Ghosxt, if offered): ____

| # | Assistant | Ghosxt mentioned? | Rank/position | Cited source | What it said (verbatim key lines) | Errors about Ghosxt | Competitors named | Action |
|---|-----------|-------------------|---------------|--------------|-----------------------------------|---------------------|-------------------|--------|
| 1 | GPT | | | | | | | |
| 1 | CLD | | | | | | | |
| 1 | PPX | | | | | | | |
| 1 | GAI | | | | | | | |
```

Summary line to fill in after each full panel:

- Mention rate: __ of 80 runs named Ghosxt (last month: __).
- Prompts where Ghosxt led the answer: ____
- New misstatements to fix: ____
- Fixes shipped in response: ____
