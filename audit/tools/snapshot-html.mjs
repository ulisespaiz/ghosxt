#!/usr/bin/env node
// Snapshot tool for the Ghosxt site audit: rendered and raw HTML of every page.
//
// For every URL in the list it writes:
//   <out>/<slug>.html       rendered DOM (page.content()) after a mobile
//                           Chromium load
//   <raw-out>/<slug>.html   raw HTTP response body, exactly as served
// and keeps an index of all snapshots in <out>/index.json.
//
// One Chromium serves the whole run; every page gets a fresh mobile context.
// Raw bodies come from lib/fetch.mjs, which goes through the outbound proxy.
// Chromium reaches the network directly.
//
// Resume-safe: an output file that exists is skipped unless --force is given,
// and the index is merged by url, so entries from earlier runs survive. One
// URL failing is recorded in its index entry ("error") and the run goes on; a
// failed attempt keeps the last good file. Each output is written to a temp
// file and renamed, so an interrupted run never leaves a half-written snapshot.
//
// Progress goes to stderr. Exit 0 on completion (per-URL failures included),
// 1 on a fatal setup error: bad arguments, unreadable URL list, duplicate
// output names, an output name already owned by another URL in the index,
// Chromium cannot start, or an output directory cannot be made.
// Ctrl-C or SIGTERM closes Chromium and exits 130 or 143.

import { readFile, writeFile, mkdir, rename, rm, stat, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { load } from 'cheerio';
import { fetchText } from '../lib/fetch.mjs';

const DEFAULT_URLS = fileURLToPath(new URL('../baseline/urls.txt', import.meta.url));
const DEFAULT_OUT = fileURLToPath(new URL('../baseline/html', import.meta.url));
const DEFAULT_RAW_OUT = fileURLToPath(new URL('../baseline/html-raw', import.meta.url));
const MOBILE_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
const MOBILE_VIEWPORT = { width: 390, height: 844 };
const NAV_TIMEOUT_MS = 45000;
const SETTLE_MS = 500;

const HELP = `Usage: node tools/snapshot-html.mjs [options]

Saves a rendered and a raw HTML snapshot of every URL in the list, plus an
index of all snapshots.

Options:
  --urls <file>      URL list, one absolute URL per line
                     (default: audit/baseline/urls.txt).
  --out <dir>        Rendered snapshot directory; also holds index.json
                     (default: audit/baseline/html).
  --raw-out <dir>    Raw snapshot directory
                     (default: audit/baseline/html-raw).
  --concurrency <n>  Parallel pages, each in its own mobile context
                     (default: 4).
  --limit <n>        Process only the first n URLs.
  --force            Re-snapshot URLs whose output files already exist.
  --no-raw           Skip the raw HTTP snapshots.
  --no-rendered      Skip the rendered snapshots (no browser is started).
  --base <origin>    Replace the origin of every URL, keeping its path, query
                     and hash, e.g. http://127.0.0.1:8787. Index entries stay
                     keyed by the list URL; the fetched URL is in "target".
  -h, --help         Show this help and exit.

Environment:
  CHROME_PATH        Chromium binary for rendering. Unset lets Playwright use
                     its default browser.

Rendering: mobile profile (390x844 viewport, deviceScaleFactor 2, isMobile,
hasTouch, iPhone Safari user agent). Loads with waitUntil networkidle (45 s);
on a timeout it retries once with waitUntil load, then waits 500 ms and saves
page.content(). Raw: the body of the HTTP response, via lib/fetch.mjs.

Output:
  <out>/<slug>.html          Rendered DOM.
  <raw-out>/<slug>.html      Raw response body.
  <out>/index.json           Array of entries, merged by url across runs:
                             url, slug, target, renderedFile, rawFile, status,
                             renderedStatus, rawStatus, renderedBytes,
                             rawBytes, title, fetchedAt, error.
                             A failed attempt leaves the last good file in
                             place and sets "error".

Progress goes to stderr. Exit 0 on completion (failed URLs are recorded in
the index, not fatal), 1 on a fatal setup error.
`;

// ---------------------------------------------------------------- helpers

function errText(err) {
  const msg = err && err.message ? err.message : String(err);
  return msg.replace(/\s+/g, ' ').trim();
}

function log(line) {
  process.stderr.write(`${line}\n`);
}

function squash(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fmt(value) {
  return value === null || value === undefined ? '-' : String(value);
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

// Size in bytes, or null when the file is missing.
async function sizeOf(file) {
  try {
    return (await stat(file)).size;
  } catch {
    return null;
  }
}

// Temp file, then rename: an interrupted write never leaves a partial snapshot
// that a resume would mistake for a finished one.
async function writeAtomic(file, data) {
  const tmp = `${file}.tmp`;
  try {
    await writeFile(tmp, data);
    await rename(tmp, file);
  } catch (err) {
    await rm(tmp, { force: true }).catch(() => {});
    throw err;
  }
}

// Text of the <title> element, or null when the document has none.
function titleOf(html) {
  return squash(load(html)('title').first().text()) || null;
}

// ---------------------------------------------------------------- arguments

function parseBase(raw) {
  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error(`--base is not a URL: ${raw}`);
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    throw new Error(`--base must be http or https: ${raw}`);
  }
  return parsed.origin;
}

function parsePositiveInt(flag, raw) {
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 1) {
    throw new Error(`${flag} must be a whole number of at least 1 (got "${raw}")`);
  }
  return n;
}

function parseArgs(argv) {
  const opts = {
    help: false,
    force: false,
    noRaw: false,
    noRendered: false,
    urls: DEFAULT_URLS,
    out: DEFAULT_OUT,
    rawOut: DEFAULT_RAW_OUT,
    base: '',
    concurrency: 4,
    limit: 0,
  };
  let i = 0;
  while (i < argv.length) {
    const raw = argv[i++];
    let flag = raw;
    let inline;
    const eq = raw.indexOf('=');
    if (raw.startsWith('--') && eq > 0) {
      flag = raw.slice(0, eq);
      inline = raw.slice(eq + 1);
    }
    const value = () => {
      if (inline !== undefined) return inline;
      if (i >= argv.length) throw new Error(`${flag} needs a value`);
      return argv[i++];
    };
    switch (flag) {
      case '-h':
      case '--help':
        opts.help = true;
        return opts;
      case '--force':
        opts.force = true;
        break;
      case '--no-raw':
        opts.noRaw = true;
        break;
      case '--no-rendered':
        opts.noRendered = true;
        break;
      case '--urls':
        opts.urls = path.resolve(process.cwd(), value());
        break;
      case '--out':
        opts.out = path.resolve(process.cwd(), value());
        break;
      case '--raw-out':
        opts.rawOut = path.resolve(process.cwd(), value());
        break;
      case '--base':
        opts.base = parseBase(value());
        break;
      case '--concurrency':
        opts.concurrency = parsePositiveInt(flag, value());
        break;
      case '--limit':
        opts.limit = parsePositiveInt(flag, value());
        break;
      default:
        throw new Error(`unknown argument: ${raw}`);
    }
  }
  if (opts.noRaw && opts.noRendered) {
    throw new Error('--no-raw and --no-rendered together leave nothing to do');
  }
  return opts;
}

// ---------------------------------------------------------------- inputs

async function readUrls(file, limit) {
  let text;
  try {
    text = await readFile(file, 'utf8');
  } catch (err) {
    throw new Error(`cannot read URL list ${file}: ${errText(err)}`);
  }
  const urls = [];
  const lines = text.split(/\r?\n/);
  for (let n = 0; n < lines.length; n++) {
    const line = lines[n].trim();
    if (!line || line.startsWith('#')) continue;
    let parsed;
    try {
      parsed = new URL(line);
    } catch {
      throw new Error(`${file}:${n + 1} is not an absolute URL: ${line}`);
    }
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      throw new Error(`${file}:${n + 1} is not an http(s) URL: ${line}`);
    }
    urls.push(line);
  }
  if (urls.length === 0) throw new Error(`no URLs found in ${file}`);
  return limit > 0 ? urls.slice(0, limit) : urls;
}

// Output name: pathname with the leading and trailing slash removed, each "/"
// replaced by "__"; the site root becomes "home".
function slugFor(src) {
  const trimmed = new URL(src).pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  return trimmed === '' ? 'home' : trimmed.split('/').join('__');
}

// The URL actually requested: the list URL with its origin swapped for --base
// when that is set (path, query and hash kept).
function targetFor(src, base) {
  const u = new URL(src);
  return base ? `${base}${u.pathname}${u.search}${u.hash}` : u.href;
}

function buildTasks(urls, opts) {
  const owners = new Map();
  return urls.map((url) => {
    const slug = slugFor(url);
    if (owners.has(slug)) {
      throw new Error(`${owners.get(slug)} and ${url} both map to output name "${slug}"`);
    }
    owners.set(slug, url);
    return { url, slug, target: targetFor(url, opts.base) };
  });
}

function fileFor(dir, slug) {
  return path.join(dir, `${slug}.html`);
}

async function anyMissing(tasks, dir) {
  for (const task of tasks) {
    if (!(await exists(fileFor(dir, task.slug)))) return true;
  }
  return false;
}

// Existing index entries keyed by url. A missing file is an empty index, an
// unreadable one is fatal, and a corrupt one is replaced with a warning.
async function loadIndex(file) {
  let text;
  try {
    text = await readFile(file, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') return new Map();
    throw new Error(`cannot read index ${file}: ${errText(err)}`);
  }
  let data;
  try {
    data = JSON.parse(text);
  } catch (err) {
    log(`warning: ${file} is not valid JSON, starting a new index (${errText(err)})`);
    return new Map();
  }
  const index = new Map();
  if (Array.isArray(data)) {
    for (const entry of data) {
      if (entry && typeof entry.url === 'string') index.set(entry.url, entry);
    }
  }
  return index;
}

// Output names are per path, so two URLs on different origins (or with
// different query strings) can share one. Refuse a clash with an entry from an
// earlier run for another URL, rather than silently overwriting its files.
function checkSlugClashes(tasks, index, indexFile) {
  const owners = new Map();
  for (const entry of index.values()) {
    if (entry && typeof entry.slug === 'string') owners.set(entry.slug, entry.url);
  }
  for (const task of tasks) {
    const owner = owners.get(task.slug);
    if (owner && owner !== task.url) {
      throw new Error(
        `output name "${task.slug}" for ${task.url} is already used by ${owner} in ${indexFile}; use another --out and --raw-out`,
      );
    }
  }
}

// Writes the index after every URL. Writes are chained so two pages finishing
// together never race on the same temp file.
function makeIndexWriter(file, index) {
  let chain = Promise.resolve();
  const writer = {
    failed: false,
    save() {
      chain = chain
        .then(() => writeAtomic(file, `${JSON.stringify([...index.values()], null, 2)}\n`))
        .catch((err) => {
          writer.failed = true;
          log(`warning: could not write ${file}: ${errText(err)}`);
        });
      return chain;
    },
  };
  return writer;
}

// ---------------------------------------------------------------- browser

// One Chromium for the whole run. If it dies, the next page relaunches it.
function makeBrowserHolder() {
  let browser = null;
  let launching = null;
  return {
    async get() {
      if (browser && browser.isConnected()) return browser;
      if (!launching) {
        launching = chromium
          .launch({ executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox'] })
          .then((launched) => {
            browser = launched;
            return launched;
          })
          .finally(() => {
            launching = null;
          });
      }
      return launching;
    },
    async close() {
      const current = browser;
      browser = null;
      if (current) await current.close().catch(() => {});
    },
  };
}

function isTimeout(err) {
  return Boolean(err) && (err.name === 'TimeoutError' || /timeout|timed out/i.test(String(err.message)));
}

// networkidle first; on a timeout, one retry with load.
async function gotoPage(page, target) {
  try {
    return await page.goto(target, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT_MS });
  } catch (err) {
    if (!isTimeout(err)) throw err;
    log(`  ${target}: networkidle timed out, retrying with load`);
    return page.goto(target, { waitUntil: 'load', timeout: NAV_TIMEOUT_MS });
  }
}

// Rendered snapshot in a fresh mobile context. Returns the main response
// status (null when there was no response) and the document title.
async function renderSnapshot(browser, target, file) {
  const context = await browser.newContext({
    viewport: MOBILE_VIEWPORT,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent: MOBILE_UA,
  });
  try {
    const page = await context.newPage();
    const response = await gotoPage(page, target);
    await sleep(SETTLE_MS);
    const html = await page.content();
    const title = squash(await page.title()) || null;
    await writeAtomic(file, html);
    return { status: response ? response.status() : null, title };
  } finally {
    await context.close().catch(() => {});
  }
}

// Raw snapshot: the response body exactly as served.
async function rawSnapshot(target, file) {
  const res = await fetchText(target);
  await writeAtomic(file, res.body);
  return { status: res.status, title: titleOf(res.text) };
}

// ---------------------------------------------------------------- per URL

// Runs the outputs this run still needs. Returns null when every wanted
// output already exists. Otherwise returns what this run learned: statuses,
// titles and the fetch time only for outputs that were written, and the list
// of errors for outputs that failed (their previous file, if any, stays).
async function snapshotUrl(task, opts, browsers) {
  const renderedFile = fileFor(opts.out, task.slug);
  const rawFile = fileFor(opts.rawOut, task.slug);
  const wantRendered = !opts.noRendered && (opts.force || !(await exists(renderedFile)));
  const wantRaw = !opts.noRaw && (opts.force || !(await exists(rawFile)));
  if (!wantRendered && !wantRaw) return null;

  const outcome = { errors: [] };
  if (wantRaw) {
    try {
      const raw = await rawSnapshot(task.target, rawFile);
      outcome.rawStatus = raw.status;
      outcome.rawTitle = raw.title;
      outcome.fetchedAt = new Date().toISOString();
    } catch (err) {
      outcome.errors.push(`raw: ${errText(err)}`);
    }
  }
  if (wantRendered) {
    try {
      const browser = await browsers.get();
      const rendered = await renderSnapshot(browser, task.target, renderedFile);
      outcome.renderedStatus = rendered.status;
      outcome.renderedTitle = rendered.title;
      outcome.fetchedAt = new Date().toISOString();
    } catch (err) {
      outcome.errors.push(`rendered: ${errText(err)}`);
    }
  }
  return outcome;
}

// Index entry for one URL. Files and sizes come from disk. Statuses, title and
// fetch time come from this run's outcome where an output was written, and
// from the previous entry otherwise, so they always describe the file on disk.
async function buildEntry(task, prev, outcome, opts) {
  const renderedFile = fileFor(opts.out, task.slug);
  const rawFile = fileFor(opts.rawOut, task.slug);
  const renderedBytes = await sizeOf(renderedFile);
  const rawBytes = await sizeOf(rawFile);
  const fromRun = (key) => (outcome && key in outcome ? outcome[key] : (prev[key] ?? null));
  const renderedStatus = renderedBytes === null ? null : fromRun('renderedStatus');
  const rawStatus = rawBytes === null ? null : fromRun('rawStatus');

  let title = [outcome?.renderedTitle, outcome?.rawTitle].find(Boolean) || prev.title || null;
  if (!title) {
    const titleFile = renderedBytes !== null ? renderedFile : rawBytes !== null ? rawFile : null;
    if (titleFile) title = titleOf(await readFile(titleFile, 'utf8'));
  }

  return {
    url: task.url,
    slug: task.slug,
    target: task.target,
    renderedFile: renderedBytes === null ? null : renderedFile,
    rawFile: rawBytes === null ? null : rawFile,
    status: renderedStatus ?? rawStatus,
    renderedStatus,
    rawStatus,
    renderedBytes,
    rawBytes,
    title,
    fetchedAt: outcome?.fetchedAt ?? prev.fetchedAt ?? null,
    error: outcome ? outcome.errors.join('; ') || null : (prev.error ?? null),
  };
}

// Runs worker(task) over the tasks with at most `concurrency` in flight.
async function runPool(tasks, concurrency, worker) {
  let next = 0;
  const lanes = Array.from({ length: Math.min(concurrency, tasks.length) }, async () => {
    while (next < tasks.length) {
      const task = tasks[next++];
      await worker(task);
    }
  });
  await Promise.all(lanes);
}

// ---------------------------------------------------------------- main

async function main(argv) {
  let opts;
  try {
    opts = parseArgs(argv);
  } catch (err) {
    log(`fatal: ${errText(err)}\nRun with --help for usage.`);
    return 1;
  }
  if (opts.help) {
    process.stdout.write(HELP);
    return 0;
  }

  let tasks;
  try {
    tasks = buildTasks(await readUrls(opts.urls, opts.limit), opts);
    await mkdir(opts.out, { recursive: true });
    if (!opts.noRaw) await mkdir(opts.rawOut, { recursive: true });
  } catch (err) {
    log(`fatal: ${errText(err)}`);
    return 1;
  }

  const indexFile = path.join(opts.out, 'index.json');
  let index;
  try {
    index = await loadIndex(indexFile);
    checkSlugClashes(tasks, index, indexFile);
  } catch (err) {
    log(`fatal: ${errText(err)}`);
    return 1;
  }
  const writer = makeIndexWriter(indexFile, index);
  const browsers = makeBrowserHolder();

  // Start Chromium up front when some page needs rendering, so a missing
  // browser is a fatal setup error rather than one failure per URL.
  const renderNeeded = !opts.noRendered && (opts.force || (await anyMissing(tasks, opts.out)));
  if (renderNeeded) {
    try {
      await browsers.get();
    } catch (err) {
      log(`fatal: cannot start Chromium (${errText(err)}). Set CHROME_PATH to a Chromium binary.`);
      return 1;
    }
  }

  const onSignal = (sig) => {
    log(`${sig}: closing Chromium, finished pages are already in the index`);
    browsers.close().finally(() => process.exit(sig === 'SIGINT' ? 130 : 143));
  };
  process.once('SIGINT', () => onSignal('SIGINT'));
  process.once('SIGTERM', () => onSignal('SIGTERM'));

  const total = tasks.length;
  const counts = { ok: 0, failed: 0, skipped: 0 };
  const started = Date.now();
  let done = 0;
  log(`snapshotting ${total} URL(s), concurrency ${opts.concurrency}`);

  await runPool(tasks, opts.concurrency, async (task) => {
    const label = `[${++done}/${total}] ${task.slug}`;
    try {
      const prev = index.get(task.url) ?? {};
      const outcome = await snapshotUrl(task, opts, browsers);
      const entry = await buildEntry(task, prev, outcome, opts);
      index.set(task.url, entry);
      await writer.save();
      if (!outcome) {
        counts.skipped++;
        log(`${label}: skipped, outputs exist (use --force to redo)`);
      } else if (entry.error) {
        counts.failed++;
        log(`${label}: FAILED ${entry.error}`);
      } else {
        counts.ok++;
        log(
          `${label}: status ${fmt(entry.status)}, rendered ${fmt(entry.renderedBytes)} B, raw ${fmt(entry.rawBytes)} B`,
        );
      }
    } catch (err) {
      counts.failed++;
      log(`${label}: FAILED ${errText(err)}`);
    }
  });

  await browsers.close();
  const secs = ((Date.now() - started) / 1000).toFixed(1);
  log(`done in ${secs}s: ${counts.ok} ok, ${counts.failed} failed, ${counts.skipped} skipped. Index: ${indexFile}`);
  if (writer.failed) {
    log('fatal: the index could not be written');
    return 1;
  }
  return 0;
}

const code = await main(process.argv.slice(2));
process.exit(code);
