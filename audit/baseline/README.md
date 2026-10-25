# Baseline: ghosxt.com as of 2026-10-25 (tag `pre-seo-2026-10`, commit e4f22c3)

Everything in this directory was measured against the live site unless the file name
says `local`. Mobile numbers come first everywhere. Nothing here is served to visitors
(`audit/` is in `.assetsignore`).

| File or directory | What it is | Produced by |
|---|---|---|
| `urls.txt` | The 268 URLs audited: every sitemap URL plus the 5 live noindex pages and `/blog/all` | live `sitemap.xml` plus the noindex list in AUDIT.md |
| `lighthouse/<slug>.<mobile|desktop>.json` | Lean Lighthouse 12.8.2 result per page and form factor (screenshot blobs removed) | `tools/lh-run.mjs --form-factor both` (one run per page; see the variance note) |
| `lighthouse-summary.md`, `lighthouse-summary.csv` | Scores and metrics per page, mobile table first, thresholds bolded | `tools/lh-summary.mjs` |
| `lighthouse-failing-audits.md` | Which audits fail on how many pages | `tools/lh-summary.mjs` |
| `lighthouse-local/` and `lighthouse-local-summary.md` | The 16 representative pages served by `tools/static-server.mjs`, 3 runs each, median kept. This is the source of the CI budgets. | `tools/lh-run.mjs --base http://127.0.0.1:8787 --runs 3` |
| `crawl/report.md` and `crawl/*.json` | Full crawl: status codes, redirect chains, broken links, orphans, duplicates, canonical and OG checks, robots and sitemap checks, host checks | `tools/crawl-live.mjs` |
| `axe/<slug>.<mobile|desktop>.json`, `axe-summary.md`, `axe-summary.csv` | axe-core violations per page at 390x844 and 1366x768 | `tools/axe-run.mjs` |
| `html/<slug>.html`, `html/index.json` | Rendered DOM after load at the mobile profile | `tools/snapshot-html.mjs` |
| `html-raw/<slug>.html` | The HTML exactly as served | `tools/snapshot-html.mjs` |
| `screenshots/<slug>.<mobile|desktop>.png` | First-viewport screenshots (390x844 and 1366x768) of the representative pages, device scale factor 1. Full-page captures are kept out of git (`screenshots-fullpage/`, 44 MB) and regenerated on demand | `tools/screenshots.mjs --viewport-only` |
| `../queries.md` | Target query panel with the pre-filled web-search column | hand |
| `../ci/lighthouserc.mobile.json`, `../ci/lighthouserc.desktop.json`, `../ci/budgets-*.md` | Lighthouse CI budgets derived from `lighthouse-local/` | `tools/make-budgets.mjs` |
| `../ci/known-*.txt` | Allowlists the crawl gate tolerates until the matching AUDIT.md finding is fixed | hand |
| `seo-check.md` | Output of the repo-level checker on the audited commit | `tools/check-seo-meta.mjs` |

## How to regenerate (cd audit; npm install once; CHROME_PATH set to a Chromium binary)

```bash
# 1. URL list from the live sitemap plus the noindex pages
curl -s https://ghosxt.com/sitemap.xml | grep -o '<loc>[^<]*</loc>' | sed 's/<\/\?loc>//g' > baseline/urls.txt
for p in privacy-policy case-studies google-workspace-mac-it it-for-audited-companies \
         case-studies/remote-google-workspace-onboarding blog/all; do echo "https://ghosxt.com/$p" >> baseline/urls.txt; done
sort -u baseline/urls.txt -o baseline/urls.txt

# 2. Lighthouse against production. Run mobile and desktop as separate processes:
#    two runs inside one Node process collide on Lighthouse's performance marks.
node tools/lh-run.mjs --form-factor mobile  --concurrency 1 &
node tools/lh-run.mjs --form-factor desktop --concurrency 1 &
wait
node tools/lh-summary.mjs --force

# 3. Crawl, snapshots, axe, screenshots
node tools/crawl-live.mjs --force
node tools/snapshot-html.mjs --force
node tools/axe-run.mjs --force
node tools/screenshots.mjs --urls ci/representative-urls.txt --out baseline/screenshots --force

# 4. Local-server baseline for the CI budgets (quiet machine, 3 runs, median)
node tools/static-server.mjs --port 8787 --quiet &
node tools/lh-run.mjs --base http://127.0.0.1:8787 --urls ci/representative-urls.txt \
     --out baseline/lighthouse-local --runs 3 --concurrency 1 --form-factor mobile
node tools/lh-run.mjs --base http://127.0.0.1:8787 --urls ci/representative-urls.txt \
     --out baseline/lighthouse-local --runs 3 --concurrency 1 --form-factor desktop
node tools/lh-summary.mjs --in baseline/lighthouse-local --out-md baseline/lighthouse-local-summary.md \
     --out-csv baseline/lighthouse-local-summary.csv --out-audits baseline/lighthouse-local-failing-audits.md --force
node tools/make-budgets.mjs --from baseline/lighthouse-local --pages ci/representative-pages.txt
```

## Updating the CI budgets

Budgets live in `audit/ci/lighthouserc.mobile.json` and `audit/ci/lighthouserc.desktop.json`
and are generated, never hand-edited. Tighten them whenever a performance PR lands: rerun
step 4 on the merged `main` and commit the regenerated files in the same PR. Loosen them
only in a PR whose body explains which page regressed and why that is accepted; the
reviewer rejects a loosened budget without that paragraph. The screenshot baseline for
the visual-diff job is always the PR's base branch, so there is nothing to regenerate;
an intended visual change is approved by the owner with the `visual-change-approved`
label on the PR.

## Local baseline versus production

The local static server sends no compression and no HTTP/2, so the local numbers are
lower than production (home mobile performance 74 locally against 87 live; LCP 3.7 s
against 2.1 s). That is fine for CI, which measures the same way every time; it is not a
statement about the live site. One artefact to know about: `/pricing` measures CLS
0.245 locally and 0.000 live, so its CLS budget is loose until the cause (hero subtitle
and badge moving after the late font or script arrival on the slower local load) is
removed by the A2 and A3 pull requests, after which the budget is regenerated.

## Variance note

Lighthouse lab numbers move between runs. On this host the home page mobile performance
score ranged 70 to 88 across five single runs while the content did not change. The
production baseline is one run per page and form factor (536 runs); use it to spot
patterns (which audits fail where), not to gate. The CI budgets use the local-server
baseline with 3 runs and the median, with a 3-point score tolerance, 15 percent LCP
tolerance, 0.02 CLS slack and 100 ms TBT slack, and CI itself runs 3 times and asserts
on the median. Performance score, LCP and TBT are asserted at warn level (they track the
runner's CPU); accessibility, best practices, SEO and CLS are errors. Field metrics (INP) need Search Console or CrUX and are not in this set.
