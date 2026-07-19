# Ghosxt site-audit harness

A re-runnable, multi-agent audit of the **live** `ghosxt.com`, across six
dimensions: **UI, Accessibility (ADA), Speed, SEO, Security, Content**.

> **This whole directory is internal tooling and is never served to visitors.**
> `audit/` is listed in `.assetsignore` (Cloudflare does not upload it) and
> `audit/reports/` is also in `.gitignore` (findings are never committed). The
> `.assetsignore` guarantee is verified live: `https://ghosxt.com/README.md`
> returns 404, so excluded paths are genuinely unreachable.

## How it works

Fable (the Claude Code main loop) is the **PM/orchestrator**. Worker agents run
on **Sonnet** (broad per-dimension fan-out) and **Opus** (cross-page judgment +
verification). The pipeline is four stages:

| Stage | File | What it does | LLM? |
|---|---|---|---|
| 1. Crawl | `crawl.mjs` | Fetch the live sitemap's target URL set, extract a structured artifact per page, run every deterministic rule check. | no |
| 2. Render | `render.mjs` | Drive headless Chromium over a representative subset at mobile+desktop: screenshots, Core Web Vitals, computed contrast, tap targets, landmarks, overflow. | no |
| 3. Digest | `digest.mjs` | Fold all per-page artifacts into one compact `digest.json` for the code-dimension and site-wide agents (jsonLd types come from each entry's `.types` array — see the header comment). | no |
| 4. Fleet | `site-audit.workflow.mjs` | The agent fleet (Workflow tool). Sonnet dimension workers judge the artifacts/screenshots; Opus agents do site-wide analysis + adversarial verification. | yes |
| 5. Synthesize | `synthesize.mjs` | Merge deterministic + agent findings, apply verify verdicts, dedupe site-wide repeats, rank, emit the report. | no |

The deterministic layer (stages 1–2) catches mechanical issues with zero LLM
cost and zero hallucination. The agent layer (stage 3) adds judgment (visual UI
review, contrast confirmation, thin-content/cannibalization calls, severity) and
verifies the high-severity findings before they reach the report.

### Why the browser is proxied through Node

Outbound HTTPS here goes through an agent proxy that curl and Node honor but
this Chromium build cannot egress through directly. So `render.mjs` intercepts
every browser request and fulfils it from Node (`undici` + `ProxyAgent`). Layout
metrics (contrast, overflow, CLS, screenshots) are fully real; network *timings*
(LCP/FCP) are lab/indicative, not field data.

## Running it

```bash
cd audit
npm install                                   # playwright-core reuses /opt/pw-browsers; no browser download

node crawl.mjs                                 # → reports/artifacts/*.json, manifest.json, deterministic-findings.json
node render.mjs                                # → reports/screenshots/*.png, render-metrics.json
node digest.mjs                                # → reports/digest.json (compact all-pages digest for the fleet)
# then, from Claude Code, run the fleet (Fable orchestrates Sonnet/Opus workers):
#   Workflow({ scriptPath: 'audit/site-audit.workflow.mjs', args: {...} })
node synthesize.mjs                            # → reports/audit-<date>.md and .html
```

The `args` object for the Workflow is built by the orchestrator from
`manifest.json` + `render-metrics.json`:

```jsonc
{
  "reportsDir": "/abs/path/to/audit/reports",
  "date": "2026-07-17",
  "pages": [{ "url": "...", "slug": "...", "category": "unique", "rendered": true }],
  "batchCode": 8, "batchRendered": 4
}
```

### Config (env vars)

| Var | Default | Meaning |
|---|---|---|
| `AUDIT_MATRIX_SAMPLE` | 4 | city pages sampled per templated family |
| `AUDIT_BLOG_SAMPLE` | 10 | blog posts sampled |
| `AUDIT_FULL` | – | `1` = audit every sitemap URL |
| `AUDIT_LIMIT` | ∞ | hard cap on pages (quick tests) |
| `AUDIT_RENDER_LIMIT` | 22 | pages sent through Chromium |
| `AUDIT_CHROMIUM` | `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` | Chromium binary |

## Outputs (all git-ignored, never served)

```
reports/
  manifest.json                 audited URL set + metadata
  artifacts/<slug>.json         per-page extracted data
  screenshots/<slug>-<vp>.png   rendered captures
  deterministic-findings.json   rule-engine findings
  agent-findings/*.json         fleet findings + verify verdicts
  render-metrics.json           CWV / contrast / overflow / tap targets
  audit-<date>.md / .html       the final ranked report
```

## The dimensions

See `agents/` for each dimension's role, inputs, checklist, and severity
guidance — one spec per worker. Re-run the whole pipeline after adding pages or
blog posts to catch regressions.
