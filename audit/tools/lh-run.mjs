#!/usr/bin/env node
// Lighthouse runner for the Ghosxt site audit.
//
// For every URL in the list, runs Lighthouse (performance, accessibility,
// best-practices, seo) at mobile and/or desktop form factor and writes a lean
// JSON result per URL and form factor:
//   <out>/<slug>.<mobile|desktop>.json        lean lhr (success)
//   <out>/<slug>.<mobile|desktop>.error.json  {url, formFactor, error} (failed twice)
//
// Each worker owns one Chrome and reuses it across its runs. A failed run is
// retried once with a fresh Chrome. Resume-safe: an existing .json is skipped
// unless --force is given. A leftover .error.json does not count as done, so a
// plain re-run retries those URLs.
//
// Progress lines go to stderr. Exit 0 on completion, 1 only on a fatal setup
// error (bad arguments, unreadable URL list, duplicate output names, Chrome
// cannot start). Ctrl-C or SIGTERM stops Chrome and exits 130 or 143.

import { readFile, writeFile, mkdir, rename, rm, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import lighthouse, { desktopConfig } from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const DEFAULT_URLS = fileURLToPath(new URL('../baseline/urls.txt', import.meta.url));
const DEFAULT_OUT = fileURLToPath(new URL('../baseline/lighthouse', import.meta.url));
const CHROME_FLAGS = ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'];
const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'];
const DROPPED_AUDITS = ['full-page-screenshot', 'screenshot-thumbnails', 'final-screenshot'];
const RUN_TIMEOUT_MS = 4 * 60 * 1000;
const ATTEMPTS_PER_RUN = 2;

const HELP = `Usage: node tools/lh-run.mjs [options]

Runs Lighthouse (performance, accessibility, best-practices, seo) on each URL
and writes lean JSON results.

Options:
  --form-factor mobile|desktop|both  Form factor(s) to run (default: both).
                                     With both, every URL runs at mobile first,
                                     then every URL runs at desktop.
  --urls <file>      URL list, one absolute URL per line
                     (default: audit/baseline/urls.txt).
  --out <dir>        Output directory (default: audit/baseline/lighthouse).
  --base <origin>    Replace the origin of every URL, keeping its path,
                     e.g. http://127.0.0.1:8787.
  --concurrency <n>  Parallel workers, one Chrome each (default: 3).
  --limit <n>        Process only the first n URLs.
  --runs <n>         Runs per URL and form factor. Keeps the run with the
                     median performance score (lower median for even n)
                     (default: 1).
  --force            Re-run URLs whose output already exists.
  -h, --help         Show this help and exit.

Environment:
  CHROME_PATH        Chrome or Chromium binary. Unset lets chrome-launcher
                     find one.

Output (per URL and form factor):
  <out>/<slug>.<mobile|desktop>.json         Lean Lighthouse result (lhr).
  <out>/<slug>.<mobile|desktop>.error.json   {url, formFactor, error} after
                                             two failed attempts.

Progress goes to stderr. Exit 0 on completion, 1 on a fatal setup error.
`;

// ---------------------------------------------------------------- helpers

function errText(err) {
  const msg = err && err.message ? err.message : String(err);
  return msg.replace(/\s+/g, ' ').trim();
}

function log(line) {
  process.stderr.write(`${line}\n`);
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

// Write to a temp file, then rename, so an interrupted run never leaves a
// half-written JSON that a resume would mistake for a finished result.
async function writeJson(file, data) {
  const tmp = `${file}.tmp`;
  await writeFile(tmp, JSON.stringify(data));
  await rename(tmp, file);
}

function withTimeout(promise, ms, message) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
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
    formFactor: 'both',
    urls: DEFAULT_URLS,
    out: DEFAULT_OUT,
    base: '',
    concurrency: 3,
    limit: 0,
    runs: 1,
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
        break;
      case '--force':
        opts.force = true;
        break;
      case '--form-factor':
        opts.formFactor = value();
        break;
      case '--urls':
        opts.urls = path.resolve(process.cwd(), value());
        break;
      case '--out':
        opts.out = path.resolve(process.cwd(), value());
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
      case '--runs':
        opts.runs = parsePositiveInt(flag, value());
        break;
      default:
        throw new Error(`unknown argument: ${raw}`);
    }
  }
  if (!['mobile', 'desktop', 'both'].includes(opts.formFactor)) {
    throw new Error(`--form-factor must be mobile, desktop or both (got "${opts.formFactor}")`);
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

// The URL actually requested: the source URL, with its origin swapped for
// --base when that is set (path, query and hash kept).
function targetFor(src, base) {
  const u = new URL(src);
  return base ? `${base}${u.pathname}${u.search}${u.hash}` : u.href;
}

function buildTasks(urls, opts) {
  const formFactors = opts.formFactor === 'both' ? ['mobile', 'desktop'] : [opts.formFactor];
  const slugOwner = new Map();
  const entries = urls.map((src) => {
    const slug = slugFor(src);
    if (slugOwner.has(slug)) {
      throw new Error(`${slugOwner.get(slug)} and ${src} both map to output name "${slug}"`);
    }
    slugOwner.set(slug, src);
    return { src, slug, target: targetFor(src, opts.base) };
  });
  // Form factor is the outer loop: all URLs at mobile, then all at desktop.
  const tasks = [];
  for (const ff of formFactors) {
    for (const entry of entries) {
      tasks.push({ ...entry, ff, index: tasks.length + 1 });
    }
  }
  return tasks;
}

function outputFiles(outDir, task) {
  const stem = path.join(outDir, `${task.slug}.${task.ff}`);
  return { ok: `${stem}.json`, error: `${stem}.error.json` };
}

// ---------------------------------------------------------------- Chrome

const liveChromes = new Set();

async function launchChrome() {
  const chrome = await chromeLauncher.launch({
    chromeFlags: CHROME_FLAGS,
    chromePath: process.env.CHROME_PATH || undefined,
    handleSIGINT: false,
  });
  liveChromes.add(chrome);
  return chrome;
}

// chrome-launcher's kill() sends SIGKILL synchronously, so this is safe to
// call from signal and exit handlers.
function killChrome(chrome) {
  if (!chrome) return;
  liveChromes.delete(chrome);
  try {
    chrome.kill();
  } catch {
    // Already gone.
  }
}

async function preflight() {
  let chrome;
  try {
    chrome = await launchChrome();
  } catch (err) {
    throw new Error(
      `Chrome could not be started (${errText(err)}). Set CHROME_PATH to a Chrome or Chromium binary.`,
    );
  }
  killChrome(chrome);
}

// ---------------------------------------------------------------- measuring

async function measure(task, port) {
  const flags = { port, output: 'json', logLevel: 'error', onlyCategories: CATEGORIES };
  const config = task.ff === 'desktop' ? desktopConfig : undefined;
  const result = await withTimeout(
    lighthouse(task.target, flags, config),
    RUN_TIMEOUT_MS,
    `Lighthouse run exceeded ${RUN_TIMEOUT_MS / 1000}s`,
  );
  const lhr = result && result.lhr;
  if (!lhr) throw new Error('Lighthouse returned no result');
  if (lhr.runtimeError) {
    throw new Error(`runtimeError ${lhr.runtimeError.code}: ${lhr.runtimeError.message}`);
  }
  return lhr;
}

async function runWithRetry(task, worker) {
  let lastError = null;
  for (let attempt = 1; attempt <= ATTEMPTS_PER_RUN; attempt++) {
    try {
      if (!worker.chrome) worker.chrome = await launchChrome();
      return await measure(task, worker.chrome.port);
    } catch (err) {
      lastError = err;
      log(`    attempt ${attempt} failed for ${task.ff} ${task.slug}: ${errText(err)}`);
      killChrome(worker.chrome);
      worker.chrome = null;
    }
  }
  throw lastError;
}

async function measureTask(task, worker, runs) {
  const kept = [];
  let lastError = null;
  for (let r = 1; r <= runs; r++) {
    try {
      kept.push(await runWithRetry(task, worker));
    } catch (err) {
      lastError = err;
    }
  }
  return { kept, lastError };
}

function perfScore(lhr) {
  const s = lhr.categories && lhr.categories.performance ? lhr.categories.performance.score : null;
  return typeof s === 'number' ? s : -1;
}

function pickMedian(lhrs) {
  const sorted = [...lhrs].sort((a, b) => perfScore(a) - perfScore(b));
  return sorted[Math.floor((sorted.length - 1) / 2)];
}

// Drop bulky, non-analytic data. Requested URL fields are kept as-is.
// fullPageScreenshot is the top-level screenshot blob (about 140 KB per page),
// the same kind of data as the screenshot audits, so it goes too.
function lean(lhr) {
  if (lhr.audits) {
    for (const id of DROPPED_AUDITS) delete lhr.audits[id];
  }
  delete lhr.fullPageScreenshot;
  delete lhr.i18n;
  delete lhr.stackPacks;
  if (lhr.timing) delete lhr.timing.entries;
  return lhr;
}

function fmtScore(lhr, id) {
  const s = lhr.categories && lhr.categories[id] ? lhr.categories[id].score : null;
  return typeof s === 'number' ? String(Math.round(s * 100)) : 'NA';
}

function metric(lhr, id) {
  const v = lhr.audits && lhr.audits[id] ? lhr.audits[id].numericValue : undefined;
  return typeof v === 'number' && Number.isFinite(v) ? v : null;
}

function progressLine(label, lhr) {
  const lcp = metric(lhr, 'largest-contentful-paint');
  const cls = metric(lhr, 'cumulative-layout-shift');
  const tbt = metric(lhr, 'total-blocking-time');
  return [
    label,
    `perf=${fmtScore(lhr, 'performance')}`,
    `a11y=${fmtScore(lhr, 'accessibility')}`,
    `bp=${fmtScore(lhr, 'best-practices')}`,
    `seo=${fmtScore(lhr, 'seo')}`,
    `lcp=${lcp === null ? 'NA' : `${(lcp / 1000).toFixed(1)}s`}`,
    `cls=${cls === null ? 'NA' : cls.toFixed(3)}`,
    `tbt=${tbt === null ? 'NA' : `${Math.round(tbt)}ms`}`,
  ].join(' ');
}

// ---------------------------------------------------------------- scheduling

let stopping = false;

async function processTask(task, total, worker, opts, stats) {
  const label = `[${task.index}/${total}] ${task.ff} ${task.slug}`;
  const files = outputFiles(opts.out, task);
  const { kept, lastError } = await measureTask(task, worker, opts.runs);

  if (kept.length === 0) {
    const error = errText(lastError);
    await writeJson(files.error, { url: task.target, formFactor: task.ff, error });
    log(`${label} ERROR: ${error}`);
    stats.errors++;
    return;
  }
  if (kept.length < opts.runs) {
    log(`${label} warning: ${opts.runs - kept.length} of ${opts.runs} runs failed`);
  }
  const chosen = pickMedian(kept);
  await writeJson(files.ok, lean(chosen));
  await rm(files.error, { force: true });
  log(progressLine(label, chosen));
  stats.ok++;
}

async function runPool(todo, total, opts, stats) {
  let cursor = 0;
  const size = Math.min(opts.concurrency, todo.length);
  const workers = Array.from({ length: size }, () => ({ chrome: null }));
  await Promise.all(
    workers.map(async (worker) => {
      try {
        while (!stopping && cursor < todo.length) {
          const task = todo[cursor++];
          try {
            await processTask(task, total, worker, opts, stats);
          } catch (err) {
            stats.errors++;
            log(`[${task.index}/${total}] ${task.ff} ${task.slug} ERROR: ${errText(err)}`);
          }
        }
      } finally {
        killChrome(worker.chrome);
        worker.chrome = null;
      }
    }),
  );
}

function shutdown(signal) {
  if (stopping) return;
  stopping = true;
  log(`${signal} received, stopping Chrome`);
  for (const chrome of [...liveChromes]) killChrome(chrome);
  process.exit(signal === 'SIGINT' ? 130 : 143);
}

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

  const stats = { ok: 0, skipped: 0, errors: 0 };
  try {
    await mkdir(opts.out, { recursive: true });
    const urls = await readUrls(opts.urls, opts.limit);
    const tasks = buildTasks(urls, opts);
    const total = tasks.length;
    log(
      `lh-run: ${urls.length} URLs, form factor ${opts.formFactor}, ${total} tasks, ` +
        `concurrency ${opts.concurrency}, runs per task ${opts.runs}, out ${opts.out}`,
    );

    const todo = [];
    for (const task of tasks) {
      if (!opts.force && (await exists(outputFiles(opts.out, task).ok))) {
        log(`[${task.index}/${total}] ${task.ff} ${task.slug} skip (exists)`);
        stats.skipped++;
      } else {
        todo.push(task);
      }
    }

    if (todo.length > 0) {
      await preflight();
      await runPool(todo, total, opts, stats);
    }
    log(`done: ${stats.ok} written, ${stats.skipped} skipped, ${stats.errors} errors -> ${opts.out}`);
    return 0;
  } catch (err) {
    log(`fatal: ${errText(err)}`);
    return 1;
  }
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('exit', () => {
  for (const chrome of [...liveChromes]) killChrome(chrome);
});

const code = await main(process.argv.slice(2));
process.exit(code);
