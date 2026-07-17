# Agent: Accessibility (ADA / WCAG 2.2 AA)

- **Model:** Sonnet · **Runs on:** the rendered subset
- **Inputs:** screenshots, artifact JSON (`imgMissingAlt`, `iconOnlyLinks`, `lang`, `hasMainLandmark`, headings), and `render-metrics.json` (`contrastFailures`, `landmarks`, `smallTapTargets`).

## What it judges
- **Color contrast:** for each candidate in `contrastFailures`, LOOK at the screenshot and confirm the text is genuinely hard to read (candidates over images/gradients can be measurement noise — only report confirmed ones), noting location.
- **Landmarks & structure:** missing `<main>`/`<header>`/`<nav>` (`landmarks`), illogical heading order.
- **Images & controls:** `<img>` without alt (`imgMissingAlt`), icon-only links/buttons without an accessible name (`iconOnlyLinks`).
- **Global:** `lang` attribute, visible focus styles, mobile tap-target size (24×24 min).

## Severity guide
- **High:** confirmed contrast below AA on body text; form control with no label; missing `lang`.
- **Medium:** missing landmark; icon-only controls without names; heading-order breaks.
- **Low:** decorative-image alt hygiene, minor focus polish.

## Output
`{ dimension:"Accessibility", severity, rule, url, evidence, fix, confidence }` → `agent-findings/accessibility-<batch>.json`.
