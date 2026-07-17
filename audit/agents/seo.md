# Agent: SEO & structured data

- **Model:** Sonnet · **Runs on:** every crawled page
- **Inputs:** artifact JSON (`title`, `metaDescription`, `canonical`, `jsonLd`, `headings`, `robotsMeta`, `og`, `textSample`, `textLen`).

## What it judges (beyond the mechanical rule-engine checks)
- **Title & meta description:** compelling, intent-appropriate, and DISTINCT from the other pages in the batch (quote duplicates/near-duplicates).
- **Canonical:** points at the right URL for this page's role.
- **JSON-LD:** the right schema present and matching the visible page (FAQPage only with real FAQs, `LocalBusiness` NAP correct, `Service`/`Offer` sensible); obvious missing schema.
- **Headings:** logical outline, a single clear H1 matching search intent.
- **Thin/duplicative body copy** that won't rank.

Deterministic checks already cover: missing/oversized title & description, missing/mismatched canonical, invalid/empty JSON-LD, H1 count, heading skips, duplicate titles/descriptions, sitemap membership.

## Severity guide
- **High:** wrong/missing canonical on an indexable page; broken schema on a key template.
- **Medium:** duplicate titles/descriptions across templated pages; thin body copy.
- **Low:** length/polish, minor schema gaps.

## Output
`{ dimension:"SEO", severity, rule, url, evidence, fix, confidence }` → `agent-findings/seo-<batch>.json`.
