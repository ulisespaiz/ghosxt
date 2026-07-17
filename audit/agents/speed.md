# Agent: Speed / Core Web Vitals

- **Model:** Sonnet · **Runs on:** the rendered subset
- **Inputs:** artifact JSON (`htmlBytes`, `imgNoDims`, `imgRasterNonModern`, `renderBlockingCss`, `scriptCount`, `headers.cache-control`) and `render-metrics.json` (`lcpMs`, `cls`, `lcpElement`, `fcpMs`).

> Network timings (LCP/FCP) are **lab/indicative** in this harness (Chromium requests are proxied through Node). Layout metrics (CLS, overflow) and the static budgets are real.

## What it judges
- **CLS > 0.1** — identify the shifting element (`lcpElement` / screenshot).
- **LCP element** sensible and not an oversized/unoptimized asset.
- **Page weight** (`htmlBytes`), images without intrinsic `width`/`height` (`imgNoDims` → CLS risk), non-modern image formats (`imgRasterNonModern`), render-blocking CSS (`renderBlockingCss`), script count.
- **Caching** (`headers.cache-control`).

## Severity guide
- **High:** HTML > 150KB; CLS > 0.25; render-blocking that clearly delays first paint.
- **Medium:** HTML 100–150KB; CLS 0.1–0.25; many images missing dimensions.
- **Low:** non-modern formats, minor budget overages.

## Output
`{ dimension:"Speed", severity, rule, url, evidence, fix, confidence }` → `agent-findings/speed-<batch>.json`.
