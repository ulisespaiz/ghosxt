# Orchestration: the fleet

Fable (the Claude Code main loop) is the **PM**. It produces the artifacts
(`crawl.mjs` + `render.mjs`), launches the fleet (`site-audit.workflow.mjs` via
the Workflow tool), and synthesizes the report (`synthesize.mjs`). Workers run
on **Sonnet** (broad fan-out) and **Opus** (judgment-heavy stages).

## Phases

1. **Bootstrap** (Sonnet ×1) — reads `manifest.json` + `render-metrics.json`, returns the audited page list.
2. **Code dimensions** (Sonnet) — SEO / Security / Content, sharded over all crawled pages (`batchCode`, default 8/page batch).
3. **Rendered dimensions** (Sonnet) — UI / Accessibility / Speed, sharded over the rendered subset (`batchRendered`, default 4/page batch); these agents read the screenshots.
4. **Site-wide** (Opus ×3) — read `digest.json` and judge what needs the whole set at once:
   - `sitewide-cannibalization` — pages competing for the same city+intent.
   - `sitewide-nap-pricing` — phone/email/pricing parity across the site.
   - `sitewide-duplication` — near-duplicate / thin templated city families (doorway-page risk).
5. **Verify** (Opus ×3) — adversarially re-check every HIGH/CRITICAL finding (deterministic + fleet), defaulting to *refuted* when evidence is weak. Verdicts (`confirmed`/`refuted`/`adjusted`) are applied during synthesis.

## Concurrency & scale
The Workflow runs ~16 agents at a time (lifetime cap 1000). Fleet size scales
with `AUDIT_MATRIX_SAMPLE` / `AUDIT_BLOG_SAMPLE` (crawl breadth),
`AUDIT_RENDER_LIMIT` (rendered breadth), and the `batch*` sizes. A typical run
(~79 pages, 22 rendered) is ~54 agents.

## Findings contract
Every worker writes a JSON array to `reports/agent-findings/<label>.json`:
`{ dimension, severity, rule, url, evidence, fix, confidence }`. Verify agents
write `{ verifies, url, verdict, adjustedSeverity, note }`. `synthesize.mjs`
merges, applies verdicts, dedupes site-wide repeats, ranks, and emits
`reports/audit-<date>.md` / `.html`.
