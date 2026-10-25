#!/usr/bin/env node
// axe-core accessibility scan for the Ghosxt site audit.
//
// For every URL in the list, loads the page in Chromium at each viewport
// (mobile, desktop), runs axe-core with the WCAG 2.0/2.1/2.2 A and AA tags plus
// best-practice rules, and writes one lean JSON result per page and viewport:
//   <out>/<slug>.<mobile|desktop>.json        scan result (success)
//   <out>/<slug>.<mobile|desktop>.error.json  {url, viewport, error} (failure)
//
// All pages share one Chromium browser, and each page gets its own context.
// Resume-safe: an existing .json is skipped unless --force is given, and a
// leftover .error.json does not count as done, so a plain re-run retries it.
// After the scans, the script rebuilds a Markdown summary and a CSV with one
// row per violation. --summary-only skips the scans and only rebuilds those.
//
// Progress lines go to stderr. Exit 0 on completion, 1 only on a fatal setup
// error (bad arguments, unreadable URL list, duplicate output names, Chromium
// cannot start). Ctrl-C or SIGTERM closes the browser and exits 130 or 143.

import { readFile, writeFile, mkdir, rename, rm, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { chromium } from 'playwright-core';
import { AxeBuilder } from '@axe-core/playwright';

const DEFAULT_URLS = fileURLToPath(new URL('../baseline/urls.txt', import.meta.url));
const DEFAULT_OUT = fileURLToPath(new URL('../baseline/axe', import.meta.url));
const DEFAULT_CONCURRENCY = 3;
const VIEWPORTS = {
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  desktop: { viewport: { width: 1366, height: 768 } },
};
const VIEWPORT_NAMES = Object.keys(VIEWPORTS);
const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];
const IMPACT_ORDER = ['critical', 'serious', 'moderate', 'minor'];
const NAV_TIMEOUT_MS = 45000;
const SETTLE_MS = 500;
const SAMPLE_NODES = 3;
const SAMPLE_HTML_CHARS = 200;
const ERROR_TEXT_CHARS = 1000;
const CSV_HEADER = ['url', 'path', 'viewport', 'rule', 'impact', 'nodeCount', 'help', 'helpUrl', 'sampleTarget'];

const HELP = `Usage: node tools/axe-run.mjs [options]

Runs an axe-core scan (WCAG 2.0/2.1/2.2 A and AA plus best-practice rules) on
each URL at the mobile and desktop viewports, then writes a Markdown summary
and a CSV with one row per violation.

Options:
  --urls <file>         URL list, one absolute URL per line
                        (default: audit/baseline/urls.txt).
  --out <dir>           Output directory for per-page JSON
                        (default: audit/baseline/axe).
  --viewports <list>    Comma-separated subset of mobile,desktop
                        (default: mobile,desktop, mobile first).
  --concurrency <n>     Pages scanned in parallel, one browser context each
                        (default: 3).
  --limit <n>           Process only the first n URLs.
  --force               Re-scan pages whose JSON output already exists.
  --base <origin>       Replace the origin of every URL, keeping its path,
                        e.g. http://127.0.0.1:8787.
  --summary-md <file>   Markdown summary (default: <out>/../axe-summary.md).
  --summary-csv <file>  CSV of violations (default: <out>/../axe-summary.csv).
  --summary-only        Do not scan; rebuild both summaries from the JSON
                        already in --out.
  -h, --help            Show this help and exit.

Environment:
  CHROME_PATH           Chromium binary. Unset lets Playwright pick its own.

Output, per page and viewport:
  <out>/<slug>.<mobile|desktop>.json        Scan result: url, viewport,
                                            scannedAt, httpStatus, violations,
                                            passesCount, incomplete,
                                            inapplicableCount.
  <out>/<slug>.<mobile|desktop>.error.json  {url, viewport, failedAt, error}
                                            when the scan failed.
  Slug: the URL pathname without leading and trailing slashes, with "/"
  replaced by "__"; the home page is "home".
`;

class UsageError extends Error {}
class FatalError extends Error {}

const log = (msg) => console.error(msg);

// ---------------------------------------------------------------- arguments

function parseConfig(argv) {
  const { values } = parseArgs({
    args: argv,
    strict: true,
    allowPositionals: false,
    options: {
      urls: { type: 'string' },
      out: { type: 'string' },
      viewports: { type: 'string' },
      concurrency: { type: 'string' },
      limit: { type: 'string' },
      force: { type: 'boolean' },
      base: { type: 'string' },
      'summary-md': { type: 'string' },
      'summary-csv': { type: 'string' },
      'summary-only': { type: 'boolean' },
      help: { type: 'boolean', short: 'h' },
    },
  });
  if (values.help) return { help: true };
  const out = path.resolve(values.out ?? DEFAULT_OUT);
  return {
    help: false,
    urlsFile: path.resolve(values.urls ?? DEFAULT_URLS),
    out,
    viewports: parseViewports(values.viewports),
    concurrency: values.concurrency === undefined ? DEFAULT_CONCURRENCY : parseCount(values.concurrency, 'concurrency'),
    limit: values.limit === undefined ? null : parseCount(values.limit, 'limit'),
    force: values.force === true,
    base: parseBase(values.base),
    summaryMd: path.resolve(values['summary-md'] ?? path.join(out, '..', 'axe-summary.md')),
    summaryCsv: path.resolve(values['summary-csv'] ?? path.join(out, '..', 'axe-summary.csv')),
    summaryOnly: values['summary-only'] === true,
  };
}

function parseCount(raw, name) {
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 1) throw new UsageError(`--${name} must be a positive integer, got "${raw}"`);
  return n;
}

function parseViewports(raw) {
  if (raw === undefined) return [...VIEWPORT_NAMES];
  const names = [...new Set(raw.split(',').map((s) => s.trim()).filter(Boolean))];
  if (names.length === 0) throw new UsageError('--viewports needs at least one of mobile, desktop');
  for (const name of names) {
    if (!VIEWPORT_NAMES.includes(name)) throw new UsageError(`unknown viewport "${name}" (use mobile, desktop)`);
  }
  return names;
}

function parseBase(raw) {
  if (raw === undefined) return null;
  let url = null;
  try {
    url = new URL(raw);
  } catch {
    url = null;
  }
  if (!url || !/^https?:$/.test(url.protocol)) throw new UsageError(`--base must be an http(s) origin, got "${raw}"`);
  return url.origin;
}

// ---------------------------------------------------------------- URL list

function isHttpUrl(text) {
  try {
    return /^https?:$/.test(new URL(text).protocol);
  } catch {
    return false;
  }
}

async function loadUrlList(file, limit) {
  let text;
  try {
    text = await readFile(file, 'utf8');
  } catch (err) {
    throw new FatalError(`cannot read URL list ${file}: ${messageOf(err)}`);
  }
  const urls = [];
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (!line) continue;
    if (!isHttpUrl(line)) throw new FatalError(`${file}:${i + 1} is not an absolute http(s) URL: "${line}"`);
    urls.push(line);
  }
  if (urls.length === 0) throw new FatalError(`no URLs in ${file}`);
  return limit === null ? urls : urls.slice(0, limit);
}

// Output name for a URL: pathname without leading/trailing slashes, "/" -> "__".
function slugFor(url) {
  const trimmed = new URL(url).pathname.replace(/^\/+|\/+$/g, '');
  return trimmed === '' ? 'home' : trimmed.replaceAll('/', '__');
}

function assertUniqueSlugs(urls) {
  const seen = new Map();
  for (const url of urls) {
    const slug = slugFor(url);
    if (seen.has(slug)) throw new FatalError(`${seen.get(slug)} and ${url} both map to output name "${slug}"`);
    seen.set(slug, url);
  }
}

// The address Chromium actually loads: the list URL with its origin replaced by --base.
function targetUrl(url, base) {
  if (!base) return url;
  const u = new URL(url);
  return `${base}${u.pathname}${u.search}`;
}

function buildJobs(urls, cfg) {
  const jobs = [];
  for (const viewport of cfg.viewports) {
    for (const url of urls) {
      const slug = slugFor(url);
      jobs.push({
        url,
        target: targetUrl(url, cfg.base),
        viewport,
        slug,
        jsonFile: path.join(cfg.out, `${slug}.${viewport}.json`),
        errorFile: path.join(cfg.out, `${slug}.${viewport}.error.json`),
      });
    }
  }
  return jobs;
}

// ---------------------------------------------------------------- browser

const browserState = { browser: null, launching: null };

// One shared browser. Relaunched on demand if it has died, so one crash only
// fails the pages in flight at that moment.
async function getBrowser() {
  const { browser } = browserState;
  if (browser && browser.isConnected()) return browser;
  if (!browserState.launching) {
    browserState.launching = chromium
      .launch({ executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox'] })
      .then(
        (b) => {
          browserState.browser = b;
          browserState.launching = null;
          return b;
        },
        (err) => {
          browserState.launching = null;
          throw err;
        },
      );
  }
  return browserState.launching;
}

async function closeBrowser() {
  const { browser } = browserState;
  browserState.browser = null;
  if (browser) await browser.close().catch(() => {});
}

// ---------------------------------------------------------------- scanning

async function gotoPage(page, url) {
  try {
    return await page.goto(url, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT_MS });
  } catch (err) {
    log(`    networkidle failed (${firstLine(messageOf(err))}), retrying with load`);
    return page.goto(url, { waitUntil: 'load', timeout: NAV_TIMEOUT_MS });
  }
}

async function scanPage(browser, job) {
  const context = await browser.newContext({ ...VIEWPORTS[job.viewport] });
  try {
    const page = await context.newPage();
    const response = await gotoPage(page, job.target);
    await page.waitForTimeout(SETTLE_MS);
    // The cookie banner is deliberately left alone: scan what a first-time visitor sees.
    const results = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();
    return buildResult(results, {
      url: job.url,
      viewport: job.viewport,
      httpStatus: response ? response.status() : null,
    });
  } finally {
    await context.close().catch(() => {});
  }
}

function buildResult(results, meta) {
  return {
    url: meta.url,
    viewport: meta.viewport,
    scannedAt: new Date().toISOString(),
    httpStatus: meta.httpStatus,
    violations: results.violations.map(toViolation),
    passesCount: results.passes.length,
    incomplete: results.incomplete.map((r) => ({
      id: r.id,
      impact: r.impact ?? null,
      nodeCount: r.nodes.length,
    })),
    inapplicableCount: results.inapplicable.length,
  };
}

function toViolation(v) {
  const sampled = v.nodes.slice(0, SAMPLE_NODES);
  return {
    id: v.id,
    impact: v.impact ?? null,
    help: v.help,
    helpUrl: v.helpUrl,
    tags: v.tags,
    nodeCount: v.nodes.length,
    sampleTargets: sampled.flatMap((n) => targetStrings(n.target)),
    sampleHtml: sampled.length ? String(sampled[0].html ?? '').slice(0, SAMPLE_HTML_CHARS) : '',
  };
}

// node.target is an array of selectors; a shadow-DOM path is a nested array.
// Each entry becomes one string, nested parts joined with " >> ".
function targetStrings(target) {
  const parts = Array.isArray(target) ? target : [target];
  return parts.map((part) =>
    Array.isArray(part) ? part.flat(Infinity).map(String).join(' >> ') : String(part),
  );
}

// ---------------------------------------------------------------- job runner

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function writeJsonAtomic(file, data) {
  const tmp = `${file}.tmp`;
  await writeFile(tmp, `${JSON.stringify(data, null, 2)}\n`);
  await rename(tmp, file);
}

async function recordError(job, message) {
  try {
    await writeJsonAtomic(job.errorFile, {
      url: job.url,
      viewport: job.viewport,
      failedAt: new Date().toISOString(),
      error: message,
    });
  } catch (err) {
    log(`    could not write ${job.errorFile}: ${messageOf(err)}`);
  }
}

function progress(state, job, status) {
  log(`[${state.done}/${state.total}] ${job.viewport} ${job.slug}: ${status}`);
}

function elapsed(started) {
  return `${((Date.now() - started) / 1000).toFixed(1)}s`;
}

// Never throws: a failed page is recorded and the run carries on.
async function runJob(job, cfg, state) {
  if (!cfg.force && (await exists(job.jsonFile))) {
    state.done += 1;
    state.skipped += 1;
    progress(state, job, 'skipped, result exists');
    return;
  }
  const started = Date.now();
  try {
    const browser = await getBrowser();
    const result = await scanPage(browser, job);
    await writeJsonAtomic(job.jsonFile, result);
    await rm(job.errorFile, { force: true });
    state.done += 1;
    state.ok += 1;
    progress(state, job, `ok, ${result.violations.length} violated rule(s), ${elapsed(started)}`);
  } catch (err) {
    const message = messageOf(err);
    await recordError(job, message);
    state.done += 1;
    state.failed += 1;
    progress(state, job, `FAILED, ${firstLine(message)}`);
  }
}

async function runAll(jobs, cfg, state) {
  let next = 0;
  const worker = async () => {
    while (next < jobs.length) {
      const job = jobs[next];
      next += 1;
      await runJob(job, cfg, state);
    }
  };
  const workers = Array.from({ length: Math.min(cfg.concurrency, jobs.length) }, () => worker());
  await Promise.all(workers);
}

// ---------------------------------------------------------------- summaries

async function loadResults(dir) {
  let names;
  try {
    names = await readdir(dir);
  } catch {
    log(`axe-run: no output directory at ${dir}`);
    names = [];
  }
  const results = [];
  const errors = [];
  for (const name of names.sort()) {
    const isResult = /\.(mobile|desktop)\.json$/.test(name);
    const isError = /\.(mobile|desktop)\.error\.json$/.test(name);
    if (!isResult && !isError) continue;
    try {
      const data = JSON.parse(await readFile(path.join(dir, name), 'utf8'));
      (isError ? errors : results).push(data);
    } catch (err) {
      log(`axe-run: skipping unreadable ${name}: ${messageOf(err)}`);
    }
  }
  results.sort(compareRows);
  errors.sort(compareRows);
  return { results, errors };
}

async function writeSummaries(cfg) {
  const { results, errors } = await loadResults(cfg.out);
  const md = buildMarkdown(results, errors, cfg.out);
  const csv = buildCsv(results);
  await mkdir(path.dirname(cfg.summaryMd), { recursive: true });
  await mkdir(path.dirname(cfg.summaryCsv), { recursive: true });
  await writeFile(cfg.summaryMd, md);
  await writeFile(cfg.summaryCsv, csv);
  log(
    `axe-run: summaries written: ${cfg.summaryMd} and ${cfg.summaryCsv} ` +
      `(${results.length} results, ${errors.length} errors)`,
  );
}

function buildMarkdown(results, errors, dir) {
  const lines = [
    '# Axe accessibility scan summary',
    '',
    `Generated ${new Date().toISOString()} from ${results.length} result file(s) in ${dir}.`,
    '',
    `Rule tags: ${AXE_TAGS.join(', ')}.`,
    'A violation is one rule failing on one page. Nodes are the affected elements.',
    '',
    '## Totals',
    '',
    ...totalsLines(results, errors),
    '',
    '## Rules',
    '',
    ...rulesLines(results),
    '',
    '## Pages with violations',
    '',
  ];
  for (const vp of VIEWPORT_NAMES) {
    lines.push(`### ${vp}`, '', ...pagesLines(results, vp), '');
  }
  if (errors.length) lines.push('## Scan errors', '', ...errorLines(errors), '');
  return `${lines.join('\n')}\n`;
}

function totalsLines(results, errors) {
  return VIEWPORT_NAMES.map((vp) => {
    const scoped = results.filter((r) => r.viewport === vp);
    const clean = scoped.filter((r) => r.violations.length === 0).length;
    const total = scoped.reduce((n, r) => n + r.violations.length, 0);
    const failed = errors.filter((e) => e.viewport === vp).length;
    const errorNote = failed ? `, ${failed} scan errors` : '';
    return `- ${vp}: ${scoped.length} pages scanned, ${clean} with zero violations, ${total} total violations${errorNote}`;
  });
}

function rulesLines(results) {
  if (results.length === 0) return ['No result files.'];
  const rows = ruleRows(results);
  if (rows.length === 0) return ['No violations.'];
  const lines = [
    '| Rule | Impact | Pages (mobile) | Pages (desktop) | Nodes total | Help |',
    '| --- | --- | ---: | ---: | ---: | --- |',
  ];
  for (const r of rows) {
    const rule = r.helpUrl ? `[${esc(r.id)}](${r.helpUrl})` : esc(r.id);
    lines.push(`| ${rule} | ${r.impact} | ${r.pages.mobile} | ${r.pages.desktop} | ${r.nodes} | ${esc(r.help)} |`);
  }
  return lines;
}

// One entry per rule across all pages and viewports. Impact is the most
// severe seen for the rule; pages are counted per viewport.
function ruleRows(results) {
  const rules = new Map();
  for (const r of results) {
    for (const v of r.violations) {
      let row = rules.get(v.id);
      if (!row) {
        row = { id: v.id, impact: 'unknown', help: v.help, helpUrl: v.helpUrl, pages: { mobile: 0, desktop: 0 }, nodes: 0 };
        rules.set(v.id, row);
      }
      const impact = impactOf(v);
      if (impactRank(impact) < impactRank(row.impact)) row.impact = impact;
      row.pages[r.viewport] = (row.pages[r.viewport] ?? 0) + 1;
      row.nodes += v.nodeCount;
    }
  }
  return [...rules.values()].sort(
    (a, b) =>
      impactRank(a.impact) - impactRank(b.impact) ||
      b.pages.mobile + b.pages.desktop - (a.pages.mobile + a.pages.desktop) ||
      cmp(a.id, b.id),
  );
}

function pagesLines(results, viewport) {
  const rows = results
    .filter((r) => r.viewport === viewport && r.violations.length > 0)
    .map(pageRow)
    .sort((a, b) => b.counts.critical - a.counts.critical || b.counts.serious - a.counts.serious || cmp(a.path, b.path));
  if (rows.length === 0) return ['None.'];
  const lines = [
    '| Page | Critical | Serious | Moderate | Minor | Top rule |',
    '| --- | ---: | ---: | ---: | ---: | --- |',
  ];
  for (const r of rows) {
    const c = r.counts;
    lines.push(`| ${esc(r.path)} | ${c.critical} | ${c.serious} | ${c.moderate} | ${c.minor} | ${esc(r.top)} |`);
  }
  return lines;
}

function pageRow(r) {
  const counts = { critical: 0, serious: 0, moderate: 0, minor: 0 };
  for (const v of r.violations) {
    const impact = impactOf(v);
    if (IMPACT_ORDER.includes(impact)) counts[impact] += 1;
  }
  const top = [...r.violations].sort(
    (a, b) => impactRank(impactOf(a)) - impactRank(impactOf(b)) || b.nodeCount - a.nodeCount || cmp(a.id, b.id),
  )[0];
  return { path: pathOf(r.url), counts, top: top.id };
}

function errorLines(errors) {
  return errors.map((e) => `- ${e.viewport} ${e.url}: ${esc(firstLine(String(e.error ?? '')))}`);
}

function buildCsv(results) {
  const lines = [CSV_HEADER.join(',')];
  for (const r of results) {
    for (const v of r.violations) {
      const row = [
        r.url,
        pathOf(r.url),
        r.viewport,
        v.id,
        impactOf(v),
        v.nodeCount,
        v.help,
        v.helpUrl,
        (v.sampleTargets ?? []).join(' | '),
      ];
      lines.push(row.map(csvCell).join(','));
    }
  }
  return `${lines.join('\n')}\n`;
}

function csvCell(value) {
  const s = value === null || value === undefined ? '' : String(value);
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

// ---------------------------------------------------------------- helpers

function impactOf(v) {
  return IMPACT_ORDER.includes(v.impact) ? v.impact : 'unknown';
}

function impactRank(impact) {
  const i = IMPACT_ORDER.indexOf(impact);
  return i === -1 ? IMPACT_ORDER.length : i;
}

function pathOf(url) {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

function compareRows(a, b) {
  return (
    VIEWPORT_NAMES.indexOf(a.viewport) - VIEWPORT_NAMES.indexOf(b.viewport) ||
    cmp(pathOf(a.url), pathOf(b.url))
  );
}

function cmp(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

// Markdown table cell: no raw pipes or line breaks.
function esc(value) {
  return String(value ?? '').replace(/\r?\n/g, ' ').replace(/\|/g, '\\|');
}

function messageOf(err) {
  const text = err && err.message ? err.message : String(err);
  return text.trim().slice(0, ERROR_TEXT_CHARS);
}

function firstLine(text) {
  return String(text).split('\n')[0].trim();
}

// ---------------------------------------------------------------- main

for (const [signal, code] of [
  ['SIGINT', 130],
  ['SIGTERM', 143],
]) {
  process.on(signal, () => {
    log(`axe-run: ${signal} received, closing browser`);
    closeBrowser().finally(() => process.exit(code));
  });
}

async function main() {
  let cfg;
  try {
    cfg = parseConfig(process.argv.slice(2));
  } catch (err) {
    console.error(`axe-run: ${messageOf(err)}`);
    console.error('axe-run: run with --help for usage');
    return 1;
  }
  if (cfg.help) {
    process.stdout.write(HELP);
    return 0;
  }
  if (cfg.summaryOnly) {
    await writeSummaries(cfg);
    return 0;
  }

  let jobs;
  try {
    const urls = await loadUrlList(cfg.urlsFile, cfg.limit);
    assertUniqueSlugs(urls);
    await mkdir(cfg.out, { recursive: true });
    jobs = buildJobs(urls, cfg);
    await getBrowser(); // fail fast if Chromium cannot start
  } catch (err) {
    console.error(`axe-run: setup failed: ${messageOf(err)}`);
    await closeBrowser();
    return 1;
  }

  const state = { total: jobs.length, done: 0, ok: 0, skipped: 0, failed: 0 };
  log(`axe-run: ${jobs.length} pages (${cfg.viewports.join(', ')}), concurrency ${cfg.concurrency}`);
  try {
    await runAll(jobs, cfg, state);
    await writeSummaries(cfg);
  } finally {
    await closeBrowser();
  }
  log(`axe-run: finished. scanned ${state.ok}, skipped ${state.skipped}, failed ${state.failed}`);
  return 0;
}

main().then(
  (code) => {
    process.exitCode = code;
  },
  (err) => {
    console.error(`axe-run: unexpected error: ${messageOf(err)}`);
    process.exitCode = 1;
  },
);
