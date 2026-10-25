#!/usr/bin/env node
// Playwright screenshots for the Ghosxt site audit. CI also reads this output
// for visual diffs, so the file names and manifest shape below are a contract.
//
// For every URL in the list, captures one PNG per viewport:
//   <out>/<slug>.<mobile|desktop>.png
// <out>/manifest.json lists every PNG as {url, slug, viewport, file, width,
// height, bytes}, merged across resumed runs. <out>/errors.json lists pages
// that failed; an entry is dropped once that page captures cleanly.
//
// One Chromium browser is shared and every page gets its own browser context.
// Progress lines go to stderr. A failing page is recorded and the run goes on.
// Exit 0 on completion, 1 only on a fatal setup error (bad arguments, an
// unreadable or malformed URL list, output name collisions, Chromium cannot
// start). Ctrl-C or SIGTERM closes the browser and exits 130 or 143.

import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { open, rename, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { chromium } from 'playwright-core';

const DEFAULT_URLS = fileURLToPath(new URL('../baseline/urls.txt', import.meta.url));
const DEFAULT_OUT = fileURLToPath(new URL('../baseline/screenshots', import.meta.url));
const MANIFEST_NAME = 'manifest.json';
const ERRORS_NAME = 'errors.json';

const VIEWPORTS = {
  mobile: { width: 390, height: 844, isMobile: true, hasTouch: true },
  desktop: { width: 1366, height: 768, isMobile: false, hasTouch: false },
};
const NAV_TIMEOUT_MS = 45000;
const SHOT_TIMEOUT_MS = 90000;
const JOB_TIMEOUT_MS = 4 * 60 * 1000;
const SCROLL_STEP_PX = 800;
const SCROLL_PAUSE_MS = 80;
const SCROLL_MAX_STEPS = 500;
const STABILIZE_CSS =
  '*, *::before, *::after { animation: none !important; transition: none !important; ' +
  'caret-color: transparent !important; scroll-behavior: auto !important; }';
const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

const HELP = `Usage: node tools/screenshots.mjs [options]

Captures a PNG of every URL in the list at each viewport (mobile, then desktop,
by default). File names are <slug>.<viewport>.png. The slug is the URL pathname
without leading or trailing slashes, with "/" replaced by "__"; the root is "home".

Options:
  --base <origin>      Replace the origin of every URL, keeping its path and
                       query, e.g. http://127.0.0.1:8787. Default: production.
  --urls <file>        URL list, one absolute URL per line
                       (default: audit/baseline/urls.txt).
  --out <dir>          Output directory (default: audit/baseline/screenshots).
  --viewports <list>   Comma-separated subset of mobile,desktop, run in the given
                       order (default: mobile,desktop). mobile is 390x844 with
                       touch; desktop is 1366x768.
  --full-page          Capture the whole scrollable page (default).
  --viewport-only      Capture only the visible viewport. Also skips the
                       scroll-through that triggers lazy loading.
  --dsf <n>            deviceScaleFactor (default: 1, keeps diffs stable).
  --concurrency <n>    Parallel pages, one browser context each (default: 3).
  --limit <n>          Process only the first n URLs.
  --force              Re-capture PNGs that already exist.
  --hide <selectors>   Comma-separated CSS selectors set to visibility:hidden
                       before capture, e.g. .cookie-banner,#chat-widget
  --wait-ms <n>        Pause before each capture (default: 400).
  -h, --help           Show this help and exit.

Environment:
  CHROME_PATH          Chromium binary. Unset lets Playwright use its own.

Output:
  <out>/<slug>.<viewport>.png   Screenshot.
  <out>/manifest.json           [{url, slug, viewport, file, width, height, bytes}],
                                one entry per PNG; file is relative to <out>.
  <out>/errors.json             [{url, slug, viewport, file, error, at}] for pages
                                that failed. An entry is removed once that page
                                captures cleanly.

Resume: an existing PNG is skipped unless --force is given. Failed pages have no
PNG, so a plain re-run retries them.

Exit codes: 0 on completion (failed pages are listed in errors.json),
1 on a fatal setup error, 130 or 143 on Ctrl-C or SIGTERM.
`;

class SetupError extends Error {}

function fail(message) {
  throw new SetupError(message);
}

function line(message) {
  process.stderr.write(`${message}\n`);
}

function errorText(err) {
  const raw = err && err.message ? err.message : String(err);
  // Playwright wraps call logs in ANSI colour codes; keep the file plain text.
  return raw.replace(/\u001b\[[0-9;]*m/g, '').trim();
}

function firstLine(err) {
  return errorText(err).split('\n')[0];
}

function fmtBytes(n) {
  if (n >= 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`;
  return `${(n / 1024).toFixed(1)} KB`;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function withTimeout(promise, ms, message) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

// ---------------------------------------------------------------- arguments

function parseCli(argv) {
  try {
    return parseArgs({
      args: argv,
      allowPositionals: false,
      strict: true,
      options: {
        base: { type: 'string' },
        urls: { type: 'string' },
        out: { type: 'string' },
        viewports: { type: 'string' },
        'full-page': { type: 'boolean' },
        'viewport-only': { type: 'boolean' },
        dsf: { type: 'string' },
        concurrency: { type: 'string' },
        limit: { type: 'string' },
        force: { type: 'boolean' },
        hide: { type: 'string' },
        'wait-ms': { type: 'string' },
        help: { type: 'boolean', short: 'h' },
      },
    }).values;
  } catch (err) {
    fail(errorText(err));
  }
}

function parseList(raw) {
  if (raw === undefined) return [];
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s !== '');
}

function parseInteger(raw, flag, min) {
  if (!/^\d+$/.test(raw) || Number(raw) < min) {
    fail(`${flag} must be a whole number >= ${min}, got "${raw}"`);
  }
  return Number(raw);
}

function parsePositive(raw, flag) {
  const n = Number(raw);
  if (raw.trim() === '' || !Number.isFinite(n) || n <= 0) {
    fail(`${flag} must be a number > 0, got "${raw}"`);
  }
  return n;
}

function parseBase(raw) {
  let u;
  try {
    u = new URL(raw);
  } catch {
    fail(`--base is not a URL: "${raw}"`);
  }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') {
    fail(`--base must be http or https: "${raw}"`);
  }
  if ((u.pathname !== '/' && u.pathname !== '') || u.search || u.hash) {
    fail(`--base must be an origin with no path or query: "${raw}"`);
  }
  return u.origin;
}

function parseViewports(raw) {
  const names = parseList(raw);
  if (names.length === 0) fail('--viewports needs at least one of mobile,desktop');
  const out = [];
  for (const name of names) {
    if (!Object.hasOwn(VIEWPORTS, name)) fail(`unknown viewport "${name}" (use mobile or desktop)`);
    if (!out.includes(name)) out.push(name);
  }
  return out;
}

function buildOptions(a) {
  if (a['full-page'] && a['viewport-only']) {
    fail('use either --full-page or --viewport-only, not both');
  }
  return {
    base: a.base === undefined ? null : parseBase(a.base),
    urlsFile: path.resolve(a.urls ?? DEFAULT_URLS),
    outDir: path.resolve(a.out ?? DEFAULT_OUT),
    viewports: parseViewports(a.viewports ?? 'mobile,desktop'),
    fullPage: !a['viewport-only'],
    dsf: parsePositive(a.dsf ?? '1', '--dsf'),
    concurrency: parseInteger(a.concurrency ?? '3', '--concurrency', 1),
    limit: a.limit === undefined ? null : parseInteger(a.limit, '--limit', 1),
    force: a.force === true,
    hide: parseList(a.hide),
    waitMs: parseInteger(a['wait-ms'] ?? '400', '--wait-ms', 0),
  };
}

// ---------------------------------------------------------------- URL list

// Output name rule: pathname without leading or trailing slash, "/" -> "__",
// root -> "home". Example: /blog/some-post -> blog__some-post.
function slugFor(pathname) {
  const core = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  return core === '' ? 'home' : core.replace(/\//g, '__');
}

function parseHttpUrl(text, where) {
  let u;
  try {
    u = new URL(text);
  } catch {
    fail(`${where} is not an absolute URL: ${text}`);
  }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') {
    fail(`${where} is not http or https: ${text}`);
  }
  return u;
}

// Returns [{slug, url}] in list order. Malformed lines and output name
// collisions are setup errors and stop the run before any browser starts.
function readUrlList(file, base) {
  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch (err) {
    fail(`cannot read URL list ${file}: ${firstLine(err)}`);
  }
  const urls = [];
  const seen = new Map();
  text.split(/\r?\n/).forEach((raw, i) => {
    const entry = raw.trim();
    if (entry === '' || entry.startsWith('#')) return;
    const where = `${file}:${i + 1}`;
    const parsed = parseHttpUrl(entry, where);
    const slug = slugFor(parsed.pathname);
    if (seen.has(slug)) {
      fail(`output name collision "${slug}": ${seen.get(slug)} and ${entry} (${where})`);
    }
    seen.set(slug, entry);
    const url = base ? new URL(parsed.pathname + parsed.search, base).href : parsed.href;
    urls.push({ slug, url });
  });
  if (urls.length === 0) fail(`no URLs in ${file}`);
  return urls;
}

function buildJobs(urls, viewports) {
  const jobs = [];
  for (const viewport of viewports) {
    for (const u of urls) {
      jobs.push({ url: u.url, slug: u.slug, viewport, file: `${u.slug}.${viewport}.png` });
    }
  }
  return jobs;
}

// ---------------------------------------------------------------- state files

function loadJsonArray(file, label) {
  if (!existsSync(file)) return [];
  try {
    const value = JSON.parse(readFileSync(file, 'utf8'));
    return Array.isArray(value) ? value : [];
  } catch (err) {
    line(`warning: ignoring unreadable ${label} ${file} (${firstLine(err)})`);
    return [];
  }
}

function writeJsonAtomic(file, value) {
  const tmp = `${file}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(value, null, 2)}\n`);
  renameSync(tmp, file);
}

function sortByRank(items, rank) {
  const key = (item) => rank.get(item.file) ?? Infinity;
  return items.sort((a, b) => {
    const ka = key(a);
    const kb = key(b);
    if (ka !== kb) return ka < kb ? -1 : 1;
    if (a.file === b.file) return 0;
    return a.file < b.file ? -1 : 1;
  });
}

function createState(opts, jobs) {
  return {
    opts,
    outDir: opts.outDir,
    total: jobs.length,
    done: 0,
    rank: new Map(jobs.map((job, i) => [job.file, i])),
    manifest: new Map(),
    errors: new Map(),
    counts: { written: 0, skipped: 0, failed: 0 },
    browser: null,
    launching: null,
  };
}

// Earlier runs contribute their entries. A manifest entry whose PNG has since
// vanished is dropped.
function loadPrevious(state) {
  for (const entry of loadJsonArray(path.join(state.outDir, MANIFEST_NAME), 'manifest')) {
    if (entry && typeof entry.file === 'string' && existsSync(path.join(state.outDir, entry.file))) {
      state.manifest.set(entry.file, entry);
    }
  }
  for (const entry of loadJsonArray(path.join(state.outDir, ERRORS_NAME), 'errors')) {
    if (entry && typeof entry.file === 'string') state.errors.set(entry.file, entry);
  }
}

function persist(state) {
  const manifest = sortByRank([...state.manifest.values()], state.rank);
  const errors = sortByRank([...state.errors.values()], state.rank);
  writeJsonAtomic(path.join(state.outDir, MANIFEST_NAME), manifest);
  writeJsonAtomic(path.join(state.outDir, ERRORS_NAME), errors);
}

// ---------------------------------------------------------------- PNG facts

async function readPngSize(file) {
  const handle = await open(file, 'r');
  try {
    const buf = Buffer.alloc(24);
    const { bytesRead } = await handle.read(buf, 0, 24, 0);
    if (bytesRead < 24 || !PNG_SIGNATURE.every((byte, i) => buf[i] === byte)) {
      throw new Error(`not a PNG: ${file}`);
    }
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  } finally {
    await handle.close();
  }
}

async function entryFor(job, file) {
  const [size, fileStat] = await Promise.all([readPngSize(file), stat(file)]);
  return {
    url: job.url,
    slug: job.slug,
    viewport: job.viewport,
    file: job.file,
    width: size.width,
    height: size.height,
    bytes: fileStat.size,
  };
}

// ---------------------------------------------------------------- browser

function launchBrowser() {
  return chromium.launch({
    executablePath: process.env.CHROME_PATH || undefined,
    args: ['--no-sandbox'],
  });
}

// Shares one browser across workers and relaunches it if it has crashed.
function getBrowser(state) {
  if (state.browser && state.browser.isConnected()) return Promise.resolve(state.browser);
  if (!state.launching) {
    state.launching = launchBrowser().then(
      (browser) => {
        state.browser = browser;
        state.launching = null;
        return browser;
      },
      (err) => {
        state.launching = null;
        throw err;
      },
    );
  }
  return state.launching;
}

async function closeBrowser(state) {
  const browser = state.browser;
  state.browser = null;
  if (browser) await browser.close().catch(() => {});
}

function contextOptions(viewport, dsf) {
  const vp = VIEWPORTS[viewport];
  return {
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: dsf,
    isMobile: vp.isMobile,
    hasTouch: vp.hasTouch,
  };
}

// ---------------------------------------------------------------- page steps

function note(job, message) {
  line(`  ${job.viewport} ${job.slug}: ${message}`);
}

async function navigate(page, job) {
  try {
    return await page.goto(job.url, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT_MS });
  } catch (err) {
    note(job, `networkidle failed (${firstLine(err)}), retrying with load`);
    return page.goto(job.url, { waitUntil: 'load', timeout: NAV_TIMEOUT_MS });
  }
}

async function hideElements(page, selectors, job) {
  const { count, invalid } = await page.evaluate((sels) => {
    const invalidSelectors = [];
    let matched = 0;
    for (const sel of sels) {
      let nodes;
      try {
        nodes = document.querySelectorAll(sel);
      } catch {
        invalidSelectors.push(sel);
        continue;
      }
      for (const el of nodes) {
        if (el.style) {
          el.style.setProperty('visibility', 'hidden', 'important');
          matched += 1;
        }
      }
    }
    return { count: matched, invalid: invalidSelectors };
  }, selectors);
  if (invalid.length > 0) note(job, `invalid --hide selector(s) ignored: ${invalid.join(', ')}`);
  return count;
}

// Scrolls to the bottom in steps so lazy-loaded images request themselves,
// then returns to the top. The step cap stops endless-scroll pages.
async function scrollThrough(page) {
  await page.evaluate(
    async ({ step, pauseMs, maxSteps }) => {
      const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const pageHeight = () =>
        Math.max(document.body ? document.body.scrollHeight : 0, document.documentElement.scrollHeight);
      let y = 0;
      for (let i = 0; i < maxSteps && y < pageHeight(); i += 1) {
        y += step;
        window.scrollTo(0, y);
        await pause(pauseMs);
      }
      window.scrollTo(0, 0);
    },
    { step: SCROLL_STEP_PX, pauseMs: SCROLL_PAUSE_MS, maxSteps: SCROLL_MAX_STEPS },
  );
}

// Captures one page. Returns the manifest entry and the HTTP status (or null).
async function captureJob(state, job, file) {
  const { opts } = state;
  const browser = await getBrowser(state);
  const context = await browser.newContext(contextOptions(job.viewport, opts.dsf));
  try {
    const page = await context.newPage();
    const response = await navigate(page, job);
    const status = response ? response.status() : null;
    if (status !== null && status >= 400) note(job, `HTTP ${status}, capturing anyway`);
    await page.addStyleTag({ content: STABILIZE_CSS });
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    if (opts.hide.length > 0) await hideElements(page, opts.hide, job);
    if (opts.fullPage) await scrollThrough(page);
    await sleep(opts.waitMs);
    // Write under a temporary name, then rename, so an interrupted capture is
    // never mistaken for a finished PNG on resume.
    const part = `${file}.part`;
    await page.screenshot({
      path: part,
      fullPage: opts.fullPage,
      type: 'png',
      timeout: SHOT_TIMEOUT_MS,
    });
    await rename(part, file);
    return { entry: await entryFor(job, file), status };
  } finally {
    await context.close().catch(() => {});
  }
}

// ---------------------------------------------------------------- run loop

// Never throws: every failure becomes an errors.json record.
async function runJob(state, job) {
  const file = path.join(state.outDir, job.file);
  if (!state.opts.force && existsSync(file)) {
    try {
      state.manifest.set(job.file, await entryFor(job, file));
      state.errors.delete(job.file);
      state.counts.skipped += 1;
      return 'skipped (PNG exists)';
    } catch (err) {
      note(job, `existing PNG unreadable, capturing again (${firstLine(err)})`);
    }
  }
  try {
    const { entry, status } = await withTimeout(
      captureJob(state, job, file),
      JOB_TIMEOUT_MS,
      `timed out after ${JOB_TIMEOUT_MS / 1000}s`,
    );
    state.manifest.set(job.file, entry);
    state.errors.delete(job.file);
    state.counts.written += 1;
    const httpPart = status === null ? '' : ` HTTP ${status}`;
    return `ok ${entry.width}x${entry.height} ${fmtBytes(entry.bytes)}${httpPart}`;
  } catch (err) {
    state.errors.set(job.file, {
      url: job.url,
      slug: job.slug,
      viewport: job.viewport,
      file: job.file,
      error: errorText(err),
      at: new Date().toISOString(),
    });
    state.counts.failed += 1;
    return `FAILED ${firstLine(err)}`;
  }
}

async function runAll(state, jobs) {
  let cursor = 0;
  const worker = async () => {
    while (cursor < jobs.length) {
      const job = jobs[cursor];
      cursor += 1;
      const result = await runJob(state, job);
      state.done += 1;
      line(`[${state.done}/${state.total}] ${job.viewport} ${job.slug}: ${result}`);
      persist(state);
    }
  };
  const workers = Math.min(state.opts.concurrency, jobs.length);
  await Promise.all(Array.from({ length: workers }, () => worker()));
}

function installSignals(state) {
  for (const [signal, code] of [
    ['SIGINT', 130],
    ['SIGTERM', 143],
  ]) {
    process.once(signal, () => {
      line(`${signal} received, closing browser`);
      closeBrowser(state).finally(() => process.exit(code));
    });
  }
}

// ---------------------------------------------------------------- main

async function main() {
  const args = parseCli(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(HELP);
    return 0;
  }
  const opts = buildOptions(args);
  const urls = readUrlList(opts.urlsFile, opts.base);
  const selected = opts.limit === null ? urls : urls.slice(0, opts.limit);
  const jobs = buildJobs(selected, opts.viewports);

  mkdirSync(opts.outDir, { recursive: true });
  const state = createState(opts, jobs);
  loadPrevious(state);
  line(
    `screenshots: ${selected.length} URL(s) x ${opts.viewports.join(' + ')} = ${jobs.length} capture(s), ` +
      `${opts.fullPage ? 'full page' : 'viewport only'}, out ${opts.outDir}`,
  );

  try {
    await getBrowser(state);
    installSignals(state);
    await runAll(state, jobs);
  } finally {
    await closeBrowser(state);
  }
  persist(state);

  const { written, skipped, failed } = state.counts;
  const hint = failed > 0 ? ` (see ${path.join(opts.outDir, ERRORS_NAME)})` : '';
  line(`done: ${written} written, ${skipped} skipped, ${failed} failed${hint}`);
  return 0;
}

main().then(
  (code) => process.exit(code),
  (err) => {
    line(`fatal: ${errorText(err)}`);
    process.exit(1);
  },
);
