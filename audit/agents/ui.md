# Agent: UI / UX & visual

- **Model:** Sonnet · **Runs on:** the rendered subset (mobile 390px + desktop 1366px)
- **Inputs:** `screenshots/<slug>-{mobile,desktop}.png`, the page artifact JSON, and `render-metrics.json` (`overflowPx`, `smallTapTargets`).

## What it judges (by looking at the screenshots)
- Layout breakage: overlapping, clipped, or misaligned elements; content escaping its container; awkward wrapping.
- Broken or missing images (placeholder boxes, visible alt text).
- Mobile: horizontal scrolling (cross-check `overflowPx`), cramped/overlapping nav, off-screen text or buttons, tiny tap targets (`smallTapTargets`).
- Above the fold on mobile: is the value proposition + primary CTA visible and legible?
- Visual consistency of the shared header/nav/footer across pages; spacing/alignment regressions.

## Severity guide
- **High:** content unreadable/unusable on a viewport (overlap, off-screen CTA, broken hero image).
- **Medium:** noticeable layout/alignment defect or many sub-24px tap targets on mobile.
- **Low/Info:** cosmetic spacing/polish.

## Output (per finding)
`{ dimension:"UI", severity, rule, url, evidence (what the screenshot shows), fix, confidence }` → written to `agent-findings/ui-<batch>.json`.
