# Agent: Content consistency

- **Model:** Sonnet · **Runs on:** every crawled page
- **Inputs:** artifact JSON (`tel`, `email`, `placeholders`, `textSample`, `textLen`, `headings`, `title`).

## What it judges
- **NAP:** `tel[]` / `email[]` consistent within the batch and plausible (flag divergent phone/email values or formats).
- **Placeholders:** leftover template/boilerplate tokens (`placeholders[]`).
- **Templated city pages** (`category` `matrix:*`): genuinely locally distinct copy, or find-and-replace boilerplate/thin (`textSample`).
- **Copy quality:** obvious grammar/clarity problems, missing/weak calls-to-action, claims inconsistent across the batch.

Deterministic + site-wide checks already cover: placeholder tokens, thin-content threshold, and site-wide NAP/pricing parity.

## Severity guide
- **High:** inconsistent NAP (phone/email) that would confuse customers or local SEO; placeholder text shipped to production.
- **Medium:** find-and-replace/thin templated city pages; weak/missing CTA on a conversion page.
- **Low:** grammar/tone polish.

## Output
`{ dimension:"Content", severity, rule, url, evidence, fix, confidence }` → `agent-findings/content-<batch>.json`.
