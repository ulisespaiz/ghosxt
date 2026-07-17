# Agent: Security & headers

- **Model:** Sonnet · **Runs on:** every crawled page (+ live header probes from the crawler)
- **Inputs:** artifact JSON (`headers`, `secrets`, `stylesheets`, `scriptCount`) and the crawler's live-probe findings (exposed source).

## What it judges
- **Response headers:** completeness/strength of CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy.
- **CSP quality:** `'unsafe-inline'` in `script-src`/`style-src` (what inline code depends on it; feasibility of a nonce/hash migration); overly broad sources.
- **Secret / PII exposure:** anything key- or credential-shaped served to the client.
- **Third-party trust:** off-site scripts/embeds (Cloudflare, Calendly, fonts) and whether they're appropriate.

Deterministic checks already cover: missing security headers, `unsafe-inline` presence, secret-regex hits, and the `scripts/*.py` source-exposure probe.

## Severity guide
- **Critical:** a real secret/credential in client-served content.
- **High:** missing a core security header; exposed server-side source.
- **Medium:** `unsafe-inline` in `script-src`; broad CSP sources.
- **Low:** `unsafe-inline` in `style-src`, hardening nitpicks.

## Output
`{ dimension:"Security", severity, rule, url, evidence, fix, confidence }` → `agent-findings/security-<batch>.json`.
