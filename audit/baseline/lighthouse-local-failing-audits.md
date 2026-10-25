# Lighthouse local-server baseline (CI budgets), 3 runs median, 2026-10-25: failing audits

Audits whose numeric score is below 0.9 and that are shown as binary, numeric or metric-savings checks.
Example page is the first path, in order, where the audit fails.

## Mobile

| Audit id | Title | Pages failing | Example page |
|---|---|---|---|
| cache-insight | Use efficient cache lifetimes | 16 | / |
| document-latency-insight | Document request latency | 16 | / |
| errors-in-console | Browser errors were logged to the console | 16 | / |
| image-delivery-insight | Improve image delivery | 16 | / |
| legacy-javascript | Avoid serving legacy JavaScript to modern browsers | 16 | / |
| legacy-javascript-insight | Legacy JavaScript | 16 | / |
| network-dependency-tree-insight | Network dependency tree | 16 | / |
| render-blocking-insight | Render blocking requests | 16 | / |
| render-blocking-resources | Eliminate render-blocking resources | 16 | / |
| unminified-css | Minify CSS | 16 | / |
| unused-css-rules | Reduce unused CSS | 16 | / |
| uses-long-cache-ttl | Serve static assets with an efficient cache policy | 16 | / |
| uses-text-compression | Enable text compression | 16 | / |
| first-contentful-paint | First Contentful Paint | 7 | / |
| largest-contentful-paint | Largest Contentful Paint | 5 | / |
| largest-contentful-paint-element | Largest Contentful Paint element | 5 | / |
| mainthread-work-breakdown | Minimize main-thread work | 5 | / |
| dom-size | Avoid an excessive DOM size | 4 | / |
| color-contrast | Background and foreground colors do not have a sufficient contrast ratio. | 3 | / |
| max-potential-fid | Max Potential First Input Delay | 3 | / |
| label-content-name-mismatch | Elements with visible text labels do not have matching accessible names. | 2 | /about |
| link-text | Links do not have descriptive text | 2 | /monterey-county |
| total-blocking-time | Total Blocking Time | 2 | / |
| uses-responsive-images | Properly size images | 2 | /about |
| aria-prohibited-attr | Elements use prohibited ARIA attributes | 1 | /pricing |
| bf-cache | Page prevented back/forward cache restoration | 1 | /contact |
| cls-culprits-insight | Layout shift culprits | 1 | /pricing |
| cumulative-layout-shift | Cumulative Layout Shift | 1 | /pricing |
| forced-reflow-insight | Forced reflow | 1 | /contact |
| inspector-issues | Issues were logged in the `Issues` panel in Chrome Devtools | 1 | /contact |
| interactive | Time to Interactive | 1 | / |
| layout-shifts | Avoid large layout shifts | 1 | /pricing |
| third-party-cookies | Uses third-party cookies | 1 | /contact |
| total-byte-weight | Avoid enormous network payloads | 1 | /contact |

## Desktop

| Audit id | Title | Pages failing | Example page |
|---|---|---|---|
| cache-insight | Use efficient cache lifetimes | 16 | / |
| document-latency-insight | Document request latency | 16 | / |
| errors-in-console | Browser errors were logged to the console | 16 | / |
| image-delivery-insight | Improve image delivery | 16 | / |
| legacy-javascript | Avoid serving legacy JavaScript to modern browsers | 16 | / |
| legacy-javascript-insight | Legacy JavaScript | 16 | / |
| network-dependency-tree-insight | Network dependency tree | 16 | / |
| render-blocking-insight | Render blocking requests | 16 | / |
| render-blocking-resources | Eliminate render-blocking resources | 16 | / |
| unminified-css | Minify CSS | 16 | / |
| unused-css-rules | Reduce unused CSS | 16 | / |
| uses-long-cache-ttl | Serve static assets with an efficient cache policy | 16 | / |
| uses-responsive-images | Properly size images | 16 | / |
| uses-text-compression | Enable text compression | 16 | / |
| max-potential-fid | Max Potential First Input Delay | 5 | / |
| dom-size | Avoid an excessive DOM size | 4 | / |
| total-blocking-time | Total Blocking Time | 4 | / |
| color-contrast | Background and foreground colors do not have a sufficient contrast ratio. | 3 | / |
| forced-reflow-insight | Forced reflow | 2 | / |
| label-content-name-mismatch | Elements with visible text labels do not have matching accessible names. | 2 | /about |
| link-text | Links do not have descriptive text | 2 | /monterey-county |
| mainthread-work-breakdown | Minimize main-thread work | 2 | / |
| aria-prohibited-attr | Elements use prohibited ARIA attributes | 1 | /pricing |
| inspector-issues | Issues were logged in the `Issues` panel in Chrome Devtools | 1 | /contact |
| speed-index | Speed Index | 1 | / |
| third-party-cookies | Uses third-party cookies | 1 | /contact |
| total-byte-weight | Avoid enormous network payloads | 1 | /contact |
