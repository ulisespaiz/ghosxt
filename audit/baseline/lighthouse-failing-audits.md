# Lighthouse baseline, production, 2026-10-25: failing audits

Audits whose numeric score is below 0.9 and that are shown as binary, numeric or metric-savings checks.
Example page is the first path, in order, where the audit fails.

## Mobile

| Audit id | Title | Pages failing | Example page |
|---|---|---|---|
| cache-insight | Use efficient cache lifetimes | 268 | / |
| image-delivery-insight | Improve image delivery | 268 | / |
| legacy-javascript | Avoid serving legacy JavaScript to modern browsers | 268 | / |
| legacy-javascript-insight | Legacy JavaScript | 268 | / |
| network-dependency-tree-insight | Network dependency tree | 268 | / |
| render-blocking-insight | Render blocking requests | 268 | / |
| unminified-css | Minify CSS | 268 | / |
| unused-css-rules | Reduce unused CSS | 268 | / |
| uses-long-cache-ttl | Serve static assets with an efficient cache policy | 268 | / |
| uses-responsive-images | Properly size images | 164 | /about |
| max-potential-fid | Max Potential First Input Delay | 48 | / |
| total-blocking-time | Total Blocking Time | 36 | / |
| render-blocking-resources | Eliminate render-blocking resources | 33 | / |
| link-text | Links do not have descriptive text | 25 | /agriculture-it-services |
| mainthread-work-breakdown | Minimize main-thread work | 19 | / |
| color-contrast | Background and foreground colors do not have a sufficient contrast ratio. | 8 | / |
| first-contentful-paint | First Contentful Paint | 7 | / |
| dom-size | Avoid an excessive DOM size | 6 | / |
| is-crawlable | Page is blocked from indexing | 5 | /case-studies |
| largest-contentful-paint | Largest Contentful Paint | 5 | /contact |
| largest-contentful-paint-element | Largest Contentful Paint element | 5 | /contact |
| interactive | Time to Interactive | 4 | /contact |
| speed-index | Speed Index | 4 | /contact |
| forced-reflow-insight | Forced reflow | 3 | / |
| label-content-name-mismatch | Elements with visible text labels do not have matching accessible names. | 3 | /about |
| aria-prohibited-attr | Elements use prohibited ARIA attributes | 1 | /pricing |
| bf-cache | Page prevented back/forward cache restoration | 1 | /contact |
| heading-order | Heading elements are not in a sequentially-descending order | 1 | /blog/all |
| inspector-issues | Issues were logged in the `Issues` panel in Chrome Devtools | 1 | /contact |
| link-in-text-block | Links rely on color to be distinguishable. | 1 | /blog/all |
| third-party-cookies | Uses third-party cookies | 1 | /contact |
| total-byte-weight | Avoid enormous network payloads | 1 | /contact |

## Desktop

| Audit id | Title | Pages failing | Example page |
|---|---|---|---|
| cache-insight | Use efficient cache lifetimes | 268 | / |
| image-delivery-insight | Improve image delivery | 268 | / |
| legacy-javascript | Avoid serving legacy JavaScript to modern browsers | 268 | / |
| legacy-javascript-insight | Legacy JavaScript | 268 | / |
| network-dependency-tree-insight | Network dependency tree | 268 | / |
| render-blocking-insight | Render blocking requests | 268 | / |
| unminified-css | Minify CSS | 268 | / |
| unused-css-rules | Reduce unused CSS | 268 | / |
| uses-long-cache-ttl | Serve static assets with an efficient cache policy | 268 | / |
| uses-responsive-images | Properly size images | 268 | / |
| link-text | Links do not have descriptive text | 25 | /agriculture-it-services |
| color-contrast | Background and foreground colors do not have a sufficient contrast ratio. | 8 | / |
| max-potential-fid | Max Potential First Input Delay | 8 | / |
| dom-size | Avoid an excessive DOM size | 6 | / |
| forced-reflow-insight | Forced reflow | 5 | /blog/credential-stuffing-small-business-2026 |
| is-crawlable | Page is blocked from indexing | 5 | /case-studies |
| total-blocking-time | Total Blocking Time | 5 | / |
| first-contentful-paint | First Contentful Paint | 4 | /contact |
| label-content-name-mismatch | Elements with visible text labels do not have matching accessible names. | 3 | /about |
| aria-prohibited-attr | Elements use prohibited ARIA attributes | 1 | /pricing |
| cls-culprits-insight | Layout shift culprits | 1 | /support |
| cumulative-layout-shift | Cumulative Layout Shift | 1 | /support |
| heading-order | Heading elements are not in a sequentially-descending order | 1 | /blog/all |
| inspector-issues | Issues were logged in the `Issues` panel in Chrome Devtools | 1 | /contact |
| largest-contentful-paint | Largest Contentful Paint | 1 | /website-development |
| largest-contentful-paint-element | Largest Contentful Paint element | 1 | /website-development |
| layout-shifts | Avoid large layout shifts | 1 | /support |
| link-in-text-block | Links rely on color to be distinguishable. | 1 | /blog/all |
| mainthread-work-breakdown | Minimize main-thread work | 1 | / |
| render-blocking-resources | Eliminate render-blocking resources | 1 | / |
| speed-index | Speed Index | 1 | / |
| third-party-cookies | Uses third-party cookies | 1 | /contact |
| total-byte-weight | Avoid enormous network payloads | 1 | /contact |
