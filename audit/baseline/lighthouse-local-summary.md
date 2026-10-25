# Lighthouse local-server baseline (CI budgets), 3 runs median, 2026-10-25

> **Note:** INP is a field metric. Lighthouse runs in the lab and cannot measure it, so the "INP (field)" column stays empty until Search Console or CrUX data is supplied.

Bold marks a cell below threshold: Perf under 90, A11y, BP and SEO under 95, LCP over 2500 ms, CLS over 0.1, TBT over 200 ms.

Source: 32 runs from /home/user/ghosxt/audit/baseline/lighthouse-local.

## Mobile

| Page | Perf | A11y | BP | SEO | FCP s | LCP s | TBT ms | CLS | SI s | INP (field) |
|---|---|---|---|---|---|---|---|---|---|---|
| / | **74** | 97 | 96 | 100 | 3.24 | **3.69** | **353** | 0.060 | 3.24 |  |
| /about | **71** | 100 | 96 | 100 | 1.85 | **2.85** | **1176** | 0.000 | 1.85 |  |
| /blog/ | 95 | 100 | 96 | 100 | 2.14 | **2.61** | 35 | 0.000 | 2.14 |  |
| /blog/password-expiration-policy-nist-small-business-2026 | 99 | 100 | 96 | 100 | 1.56 | 1.61 | 0 | 0.000 | 1.56 |  |
| /cmmc-compliance | 100 | 100 | 96 | 100 | 1.54 | 1.54 | 0 | 0.000 | 1.54 |  |
| /contact | 90 | 100 | **75** | 100 | 2.61 | **2.91** | 146 | 0.019 | 2.61 |  |
| /ctpat | 90 | 96 | 96 | 100 | 2.78 | **2.93** | 0 | 0.050 | 2.78 |  |
| /cybersecurity | 99 | 100 | 96 | 100 | 1.69 | 1.69 | 0 | 0.005 | 1.69 |  |
| /cybersecurity-monterey | 99 | 100 | 96 | 100 | 1.55 | 1.76 | 0 | 0.000 | 1.55 |  |
| /hipaa-it-compliance | 99 | 100 | 96 | 100 | 1.54 | 1.65 | 0 | 0.000 | 1.54 |  |
| /it-help-aptos | 99 | 100 | 96 | 100 | 1.53 | 1.69 | 0 | 0.000 | 1.53 |  |
| /managed-it-services | 99 | 100 | 96 | 100 | 1.69 | 1.69 | 2 | 0.000 | 1.69 |  |
| /monterey-county | 99 | 100 | 96 | **92** | 1.55 | 1.75 | 0 | 0.027 | 1.55 |  |
| /pricing | **84** | **93** | 96 | 100 | 2.10 | 2.40 | 9 | **0.245** | 2.10 |  |
| /salinas | 98 | 100 | 96 | 100 | 1.82 | 2.10 | 0 | 0.000 | 1.82 |  |
| /services | 99 | 100 | 96 | **92** | 1.54 | 2.00 | 0 | 0.025 | 1.54 |  |

Stats for 16 pages: Perf n=16, median 99, min 71, max 100; A11y n=16, median 100, min 93, max 100; BP n=16, median 96, min 75, max 96; SEO n=16, median 100, min 92, max 100; FCP s n=16, median 1.69, min 1.53, max 3.24; LCP s n=16, median 1.88, min 1.54, max 3.69; TBT ms n=16, median 0, min 0, max 1176; CLS n=16, median 0.000, min 0.000, max 0.245; SI s n=16, median 1.69, min 1.53, max 3.24.

Pages below thresholds:

- /: Perf, LCP s, TBT ms
- /about: Perf, LCP s, TBT ms
- /blog/: LCP s
- /contact: BP, LCP s
- /ctpat: LCP s
- /monterey-county: SEO
- /pricing: Perf, A11y, CLS
- /services: SEO

## Desktop

| Page | Perf | A11y | BP | SEO | FCP s | LCP s | TBT ms | CLS | SI s | INP (field) |
|---|---|---|---|---|---|---|---|---|---|---|
| / | **89** | 97 | 96 | 100 | 0.70 | 1.04 | **226** | 0.015 | 1.34 |  |
| /about | **81** | 100 | 96 | 100 | 0.77 | 0.81 | **402** | 0.002 | 1.02 |  |
| /blog/ | 100 | 100 | 96 | 100 | 0.53 | 0.63 | 0 | 0.010 | 0.58 |  |
| /blog/password-expiration-policy-nist-small-business-2026 | 100 | 100 | 96 | 100 | 0.44 | 0.51 | 0 | 0.002 | 0.47 |  |
| /cmmc-compliance | 100 | 100 | 96 | 100 | 0.45 | 0.54 | 0 | 0.002 | 0.45 |  |
| /contact | **81** | 100 | **74** | 100 | 0.83 | 0.83 | **400** | 0.024 | 1.12 |  |
| /ctpat | **77** | 96 | 96 | 100 | 0.48 | 0.58 | **575** | 0.002 | 0.77 |  |
| /cybersecurity | 100 | 100 | 96 | 100 | 0.48 | 0.53 | 0 | 0.003 | 0.48 |  |
| /cybersecurity-monterey | 100 | 100 | 96 | 100 | 0.46 | 0.51 | 0 | 0.007 | 0.49 |  |
| /hipaa-it-compliance | 100 | 100 | 96 | 100 | 0.44 | 0.50 | 0 | 0.002 | 0.46 |  |
| /it-help-aptos | 100 | 100 | 96 | 100 | 0.45 | 0.49 | 0 | 0.002 | 0.45 |  |
| /managed-it-services | 100 | 100 | 96 | 100 | 0.49 | 0.57 | 0 | 0.003 | 0.59 |  |
| /monterey-county | 100 | 100 | 96 | **92** | 0.44 | 0.54 | 0 | 0.002 | 0.47 |  |
| /pricing | 100 | **93** | 96 | 100 | 0.52 | 0.63 | 0 | 0.040 | 0.56 |  |
| /salinas | 100 | 100 | 96 | 100 | 0.48 | 0.59 | 0 | 0.004 | 0.48 |  |
| /services | 100 | 100 | 96 | **92** | 0.44 | 0.44 | 0 | 0.002 | 0.49 |  |

Stats for 16 pages: Perf n=16, median 100, min 77, max 100; A11y n=16, median 100, min 93, max 100; BP n=16, median 96, min 74, max 96; SEO n=16, median 100, min 92, max 100; FCP s n=16, median 0.48, min 0.44, max 0.83; LCP s n=16, median 0.56, min 0.44, max 1.04; TBT ms n=16, median 0, min 0, max 575; CLS n=16, median 0.003, min 0.002, max 0.040; SI s n=16, median 0.49, min 0.45, max 1.34.

Pages below thresholds:

- /: Perf, TBT ms
- /about: Perf, TBT ms
- /contact: Perf, BP, TBT ms
- /ctpat: Perf, TBT ms
- /monterey-county: SEO
- /pricing: A11y
- /services: SEO
