#!/usr/bin/env node
// Lighthouse CI budgets from a local lean lhr baseline.
//
// Reads every lean lhr JSON in --from (written by tools/lh-run.mjs measured
// against the local static server, so lhr.requestedUrl carries --origin).
// Results are grouped by page path and form factor, and each number is the
// median across the files in its group. For each form factor this writes:
//   <out-dir>/lighthouserc.<ff>.json   Lighthouse CI config (collect, assert, upload)
//   <out-dir>/budgets-<ff>.md          budget table with the regeneration steps
//
// Pages come from --pages (one path per line). When that file is missing,
// every path found in --from is used. A page without a complete baseline for a
// form factor is left out of that form factor's files and reported.
//
// Run:  node tools/make-budgets.mjs --help
// Progress goes to stderr. Exit 0 on completion, 1 only on a fatal setup error.

import { access, mkdir, readFile, readdir, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const AUDIT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO_ROOT = path.resolve(AUDIT_DIR, '..');
const DEFAULT_FROM = path.join(AUDIT_DIR, 'baseline', 'lighthouse-local');
const DEFAULT_PAGES = path.join(AUDIT_DIR, 'ci', 'representative-pages.txt');
const DEFAULT_OUT = path.join(AUDIT_DIR, 'ci');
const DEFAULT_ORIGIN = 'http://127.0.0.1:8787';

const FORM_FACTORS = ['mobile', 'desktop'];
const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'];
const CHROME_FLAGS = '--no-sandbox --headless=new';
const METRIC_KEYS = ['perf', 'a11y', 'bp', 'seo', 'lcp', 'cls', 'tbt'];

// Lighthouse CI assertion keys, in the order the budget entries list them.
const ASSERT_KEYS = [
  'categories:performance',
  'categories:accessibility',
  'categories:best-practices',
  'categories:seo',
  'largest-contentful-paint',
  'cumulative-layout-shift',
  'total-blocking-time',
];
// CPU-bound lab metrics that vary between machines. Emitted as warnings by default.
const DEFAULT_WARN = 'categories:performance,largest-contentful-paint,total-blocking-time';

// Rules that keep a budget from being tighter than the baseline allows.
const LCP_MIN_GROWTH_MS = 250;
const CLS_MIN_CEILING = 0.03;
const TBT_MIN_CEILING_MS = 150;
const GUARD_BASELINE = 0.95;
const GUARD_FLOOR = 0.9;

const VALUE_FLAGS = {
  '--from': 'from',
  '--pages': 'pages',
  '--origin': 'origin',
  '--out-dir': 'outDir',
  '--score-tolerance': 'scoreTolerance',
  '--lcp-tolerance': 'lcpTolerance',
  '--cls-slack': 'clsSlack',
  '--tbt-slack': 'tbtSlack',
  '--runs': 'runs',
  '--limit': 'limit',
  '--warn': 'warn',
};
const FLAG_FLAGS = {
  '--force': 'force',
  '--error-all': 'errorAll',
  '--help': 'help',
  '-h': 'help',
};

const HELP = `Usage: node tools/make-budgets.mjs [options]

Builds Lighthouse CI budgets from a lean lhr baseline: one config and one
Markdown budget table per form factor (mobile, desktop).

Options:
  --from <dir>            Folder of lean lhr *.json files from lh-run.mjs,
                          measured against --origin
                          (default: audit/baseline/lighthouse-local).
  --pages <file>          Pages to budget, one path per line such as / or
                          /pricing (default: audit/ci/representative-pages.txt).
                          Lines starting with # are ignored. If the file is
                          missing, every path found in --from is used.
  --origin <origin>       Origin for the CI URLs and assert patterns
                          (default: http://127.0.0.1:8787). Files measured at
                          another origin are skipped.
  --out-dir <dir>         Output folder (default: audit/ci).
  --score-tolerance <n>   Points a category score may drop below its baseline
                          (default: 3).
  --lcp-tolerance <f>     Allowed LCP growth as a fraction (default: 0.15).
  --cls-slack <n>         Added to the baseline CLS (default: 0.02).
  --tbt-slack <ms>        Added to the baseline TBT, in ms (default: 100).
  --runs <n>              numberOfRuns in each collect block (default: 3).
  --limit <n>             Budget only the first n pages of the page list.
  --warn <list>           Comma-separated assertion keys to emit as warnings
                          (level "warn") instead of errors, in every budget
                          entry. Default: categories:performance,
                          largest-contentful-paint,total-blocking-time (the
                          CPU-bound lab metrics that vary between machines).
                          Keys: categories:performance,
                          categories:accessibility, categories:best-practices,
                          categories:seo, largest-contentful-paint,
                          cumulative-layout-shift, total-blocking-time.
  --error-all             Emit every assertion as an error (the old behaviour).
                          Cannot be combined with --warn.
  --force                 Replace outputs that already exist (default: skip).
  -h, --help              Show this help and exit.

Output, per form factor that has at least one budgeted page:
  <out-dir>/lighthouserc.<ff>.json   Lighthouse CI config.
  <out-dir>/budgets-<ff>.md          Budget table and regeneration steps.

Progress goes to stderr. Exit 0 on completion, 1 on a fatal setup error
(bad arguments, unreadable inputs, no usable lhr files, no page with a
complete baseline).
`;

// ---------------------------------------------------------------- helpers

function log(line) {
  process.stderr.write(`${line}\n`);
}

function errText(err) {
  const msg = err && err.message ? err.message : String(err);
  return msg.replace(/\s+/g, ' ').trim();
}

function rel(file) {
  const r = path.relative(REPO_ROOT, file);
  return r && !r.startsWith('..') ? r : file;
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
// half-written config that a resume would mistake for a finished one.
async function writeText(file, text) {
  const tmp = `${file}.tmp`;
  await writeFile(tmp, text);
  await rename(tmp, file);
}

const isNum = (v) => typeof v === 'number' && Number.isFinite(v);

function median(values) {
  const sorted = values.filter(isNum).sort((a, b) => a - b);
  if (sorted.length === 0) return null;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function groupKey(ff, pagePath) {
  return JSON.stringify([ff, pagePath]);
}

// ---------------------------------------------------------------- arguments

function numberArg(flag, raw, min, integer = false) {
  const text = String(raw).trim();
  const n = Number(text);
  const bad = text === '' || !Number.isFinite(n) || n < min || (integer && !Number.isInteger(n));
  if (bad) {
    throw new Error(`${flag} must be ${integer ? 'a whole number' : 'a number'} of at least ${min} (got "${raw}")`);
  }
  return n;
}

function parseOrigin(raw) {
  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error(`--origin is not a URL: ${raw}`);
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error(`--origin must be http or https: ${raw}`);
  }
  return parsed.origin;
}

// --warn value: comma-separated assertion keys. Empty lists and unknown keys
// are setup errors.
function parseWarnList(raw) {
  const keys = String(raw)
    .split(',')
    .map((k) => k.trim())
    .filter((k) => k !== '');
  if (keys.length === 0) {
    throw new Error('--warn needs at least one assertion key (use --error-all for none)');
  }
  const unknown = keys.filter((k) => !ASSERT_KEYS.includes(k));
  if (unknown.length > 0) {
    throw new Error(`--warn has unknown assertion key: ${unknown.join(', ')} (allowed: ${ASSERT_KEYS.join(', ')})`);
  }
  return [...new Set(keys)];
}

function parseArgs(argv) {
  const opts = {
    help: false,
    force: false,
    from: DEFAULT_FROM,
    pages: DEFAULT_PAGES,
    origin: DEFAULT_ORIGIN,
    outDir: DEFAULT_OUT,
    scoreTolerance: 3,
    lcpTolerance: 0.15,
    clsSlack: 0.02,
    tbtSlack: 100,
    runs: 3,
    limit: null,
    warn: null,
    errorAll: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const raw = argv[i];
    const eq = raw.startsWith('--') ? raw.indexOf('=') : -1;
    const flag = eq > 0 ? raw.slice(0, eq) : raw;
    if (Object.hasOwn(FLAG_FLAGS, flag)) {
      opts[FLAG_FLAGS[flag]] = true;
      continue;
    }
    if (!Object.hasOwn(VALUE_FLAGS, flag)) throw new Error(`unknown argument: ${raw}`);
    let value;
    if (eq > 0) {
      value = raw.slice(eq + 1);
    } else {
      if (i + 1 >= argv.length) throw new Error(`${flag} needs a value`);
      value = argv[++i];
    }
    opts[VALUE_FLAGS[flag]] = value;
  }
  if (opts.help) return opts;

  opts.from = path.resolve(process.cwd(), opts.from);
  opts.pages = path.resolve(process.cwd(), opts.pages);
  opts.outDir = path.resolve(process.cwd(), opts.outDir);
  opts.origin = parseOrigin(opts.origin);
  opts.scoreTolerance = numberArg('--score-tolerance', opts.scoreTolerance, 0);
  opts.lcpTolerance = numberArg('--lcp-tolerance', opts.lcpTolerance, 0);
  opts.clsSlack = numberArg('--cls-slack', opts.clsSlack, 0);
  opts.tbtSlack = numberArg('--tbt-slack', opts.tbtSlack, 0);
  opts.runs = numberArg('--runs', opts.runs, 1, true);
  if (opts.limit !== null) opts.limit = numberArg('--limit', opts.limit, 1, true);
  if (opts.errorAll && opts.warn !== null) {
    throw new Error('--warn and --error-all cannot be used together');
  }
  opts.warn = opts.errorAll ? [] : parseWarnList(opts.warn ?? DEFAULT_WARN);
  return opts;
}

// ---------------------------------------------------------------- inputs

// Metrics read from one lean lhr. A missing number is null, never 0.
function scoreOf(lhr, id) {
  const c = lhr.categories && lhr.categories[id];
  return c && isNum(c.score) ? c.score : null;
}

function valueOf(lhr, id) {
  const a = lhr.audits && lhr.audits[id];
  return a && isNum(a.numericValue) ? a.numericValue : null;
}

function metricsOf(lhr) {
  return {
    perf: scoreOf(lhr, 'performance'),
    a11y: scoreOf(lhr, 'accessibility'),
    bp: scoreOf(lhr, 'best-practices'),
    seo: scoreOf(lhr, 'seo'),
    lcp: valueOf(lhr, 'largest-contentful-paint'),
    cls: valueOf(lhr, 'cumulative-layout-shift'),
    tbt: valueOf(lhr, 'total-blocking-time'),
  };
}

// Reads one lean lhr. Throws with a short reason when the file is not usable.
async function readLhr(file, origin) {
  let lhr;
  try {
    lhr = JSON.parse(await readFile(file, 'utf8'));
  } catch (err) {
    throw new Error(`not readable or not valid JSON (${errText(err)})`);
  }
  if (!lhr || typeof lhr !== 'object' || !lhr.categories || !lhr.audits) {
    throw new Error('not a Lighthouse result (no categories or audits)');
  }
  const settings = lhr.configSettings || {};
  const ff = settings.formFactor || settings.emulatedFormFactor;
  if (!FORM_FACTORS.includes(ff)) throw new Error(`unknown form factor "${ff}"`);
  let url;
  try {
    url = new URL(lhr.requestedUrl);
  } catch {
    throw new Error('requestedUrl is missing or not a URL');
  }
  if (url.origin !== origin) throw new Error(`measured at ${url.origin}, not ${origin}`);
  return { name: path.basename(file), ff, path: url.pathname, metrics: metricsOf(lhr) };
}

// Reads every lean lhr JSON in dir. Files that fail are recorded and skipped.
async function readInputs(dir, origin) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (err) {
    throw new Error(`cannot read --from folder ${dir}: ${errText(err)}`);
  }
  const names = entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .sort();
  const inputs = [];
  const skipped = [];
  let failedRuns = 0;
  for (const name of names) {
    if (!name.endsWith('.json')) continue;
    if (name.endsWith('.error.json')) {
      failedRuns++;
      continue;
    }
    try {
      inputs.push(await readLhr(path.join(dir, name), origin));
    } catch (err) {
      skipped.push({ name, reason: errText(err) });
      log(`skip ${name}: ${errText(err)}`);
    }
  }
  return { inputs, skipped, failedRuns };
}

function groupInputs(inputs) {
  const groups = new Map();
  for (const input of inputs) {
    const key = groupKey(input.ff, input.path);
    if (!groups.has(key)) groups.set(key, { ff: input.ff, path: input.path, files: [], metrics: [] });
    const group = groups.get(key);
    group.files.push(input.name);
    group.metrics.push(input.metrics);
  }
  return groups;
}

function isPagePath(text) {
  return text.startsWith('/') && !text.startsWith('//') && !/[?#\s]/.test(text);
}

// Page paths from --pages, or null when that file does not exist.
async function readPages(file) {
  let text;
  try {
    text = await readFile(file, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') return null;
    throw new Error(`cannot read pages file ${file}: ${errText(err)}`);
  }
  const pages = [];
  const seen = new Set();
  const lines = text.split(/\r?\n/);
  for (let n = 0; n < lines.length; n++) {
    const line = lines[n].trim();
    if (!line || line.startsWith('#')) continue;
    if (!isPagePath(line)) {
      log(`warning: ${rel(file)}:${n + 1} is not a page path, skipped: ${line}`);
      continue;
    }
    if (!seen.has(line)) {
      seen.add(line);
      pages.push(line);
    }
  }
  if (pages.length === 0) throw new Error(`no page paths in ${rel(file)}`);
  return pages;
}

async function resolvePages(opts, inputs) {
  const listed = await readPages(opts.pages);
  if (listed) return { pages: listed, source: rel(opts.pages) };
  log(`pages: ${rel(opts.pages)} not found, using every path found in --from`);
  const all = [...new Set(inputs.map((i) => i.path))].sort();
  return { pages: all, source: `every path found in ${rel(opts.from)}` };
}

// ---------------------------------------------------------------- budgets

// Floor = baseline score (0 to 100) minus tolerance, as a 0 to 1 value. The
// accessibility, best-practices and SEO floors never drop below GUARD_FLOOR
// once the baseline reached GUARD_BASELINE, so a wide tolerance cannot hide a
// real regression.
function scoreFloor(score, tolerance, guard) {
  let floor = Math.max(0, Math.round(Math.round(score * 100) - tolerance)) / 100;
  if (guard && score >= GUARD_BASELINE) floor = Math.max(floor, GUARD_FLOOR);
  return Number(Math.min(1, floor).toFixed(2));
}

function lcpCeiling(lcp, tolerance) {
  const raw = Math.max(lcp * (1 + tolerance), lcp + LCP_MIN_GROWTH_MS);
  return Math.round(raw / 10) * 10;
}

function clsCeiling(cls, slack) {
  return Math.round(Math.max(cls + slack, CLS_MIN_CEILING) * 1000) / 1000;
}

function tbtCeiling(tbt, slack) {
  return Math.round(Math.max(tbt + slack, TBT_MIN_CEILING_MS));
}

function baselineOf(group) {
  const base = {};
  for (const key of METRIC_KEYS) base[key] = median(group.metrics.map((m) => m[key]));
  return base;
}

function budgetFor(base, opts) {
  return {
    perf: scoreFloor(base.perf, opts.scoreTolerance, false),
    a11y: scoreFloor(base.a11y, opts.scoreTolerance, true),
    bp: scoreFloor(base.bp, opts.scoreTolerance, true),
    seo: scoreFloor(base.seo, opts.scoreTolerance, true),
    lcp: lcpCeiling(base.lcp, opts.lcpTolerance),
    cls: clsCeiling(base.cls, opts.clsSlack),
    tbt: tbtCeiling(base.tbt, opts.tbtSlack),
  };
}

// Pages for one form factor: rows that have a complete baseline, and the rest
// with the reason they were left out.
function planFormFactor(ff, pages, groups, opts) {
  const rows = [];
  const excluded = [];
  for (const pagePath of pages) {
    const group = groups.get(groupKey(ff, pagePath));
    if (!group) {
      excluded.push({ path: pagePath, reason: 'no baseline measured' });
      continue;
    }
    const base = baselineOf(group);
    const missing = METRIC_KEYS.filter((k) => base[k] === null);
    if (missing.length > 0) {
      excluded.push({ path: pagePath, reason: `baseline has no ${missing.join(', ')}` });
      continue;
    }
    rows.push({ path: pagePath, base, budget: budgetFor(base, opts), samples: group.files.length });
  }
  return { rows, excluded };
}

// ---------------------------------------------------------------- outputs

function assertEntry(origin, row, warnKeys) {
  const b = row.budget;
  const rules = {
    'categories:performance': { minScore: b.perf },
    'categories:accessibility': { minScore: b.a11y },
    'categories:best-practices': { minScore: b.bp },
    'categories:seo': { minScore: b.seo },
    'largest-contentful-paint': { maxNumericValue: b.lcp },
    'cumulative-layout-shift': { maxNumericValue: b.cls },
    'total-blocking-time': { maxNumericValue: b.tbt },
  };
  const assertions = {};
  for (const key of ASSERT_KEYS) {
    assertions[key] = [warnKeys.includes(key) ? 'warn' : 'error', rules[key]];
  }
  return {
    matchingUrlPattern: `${escapeRegExp(origin + row.path)}$`,
    assertions,
  };
}

function buildConfig(ff, opts, rows) {
  const settings = {};
  if (ff === 'desktop') settings.preset = 'desktop';
  settings.onlyCategories = [...CATEGORIES];
  settings.chromeFlags = CHROME_FLAGS;
  return {
    ci: {
      collect: {
        url: rows.map((row) => opts.origin + row.path),
        numberOfRuns: opts.runs,
        settings,
      },
      assert: {
        assertMatrix: rows.map((row) => assertEntry(opts.origin, row, opts.warn)),
      },
      upload: { target: 'filesystem', outputDir: `./lhci-${ff}` },
    },
  };
}

function tableRow(row) {
  const b = row.budget;
  const cells = [
    row.path.replace(/\|/g, '\\|'),
    b.perf.toFixed(2),
    b.a11y.toFixed(2),
    b.bp.toFixed(2),
    b.seo.toFixed(2),
    String(b.lcp),
    b.cls.toFixed(3),
    String(b.tbt),
    String(Math.round(row.base.perf * 100)),
    String(Math.round(row.base.lcp)),
  ];
  return `| ${cells.join(' | ')} |`;
}

const pct = (fraction) => `${Math.round(fraction * 100)}%`;

const ASSERT_LABELS = {
  'categories:performance': 'performance',
  'categories:accessibility': 'accessibility',
  'categories:best-practices': 'best practices',
  'categories:seo': 'SEO',
  'largest-contentful-paint': 'LCP',
  'cumulative-layout-shift': 'CLS',
  'total-blocking-time': 'TBT',
};

// "a", "a and b" or "a, b and c".
function joinList(items) {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

// The one sentence under the budget table: which assertions are warnings, why,
// and which ones still fail the build.
function warnNote(warnKeys) {
  if (warnKeys.length === 0) return 'Every assertion is an error, so none is a warning.';
  const warned = ASSERT_KEYS.filter((k) => warnKeys.includes(k)).map((k) => ASSERT_LABELS[k]);
  const hard = ASSERT_KEYS.filter((k) => !warnKeys.includes(k)).map((k) => ASSERT_LABELS[k]);
  const gates = hard.length > 0 ? `${joinList(hard)} are the hard gates` : 'no assertion is a hard gate';
  return (
    `Assertions at level warn (reported, not failing the build) are ${joinList(warned)}, ` +
    `because they depend on the CI runner's CPU speed; ${gates}.`
  );
}

function renderMarkdown(ff, plan, ctx) {
  const { opts, pageSource, pageCount, skipped } = ctx;
  const cfgRel = rel(path.join(opts.outDir, `lighthouserc.${ff}.json`));
  const filesUsed = plan.rows.reduce((sum, row) => sum + row.samples, 0);
  const lines = [
    `# Lighthouse CI budgets: ${ff}`,
    '',
    `Generated by \`${rel(path.join(AUDIT_DIR, 'tools', 'make-budgets.mjs'))}\` from the lean lhr baseline in \`${rel(opts.from)}\`, measured at \`${opts.origin}\`. ` +
      `The CI config is \`${cfgRel}\`, run with \`npx --yes @lhci/cli@0.15.1 autorun --config=${cfgRel}\`.`,
    '',
    `Page list: ${pageSource} (${pageCount} paths). Budgeted for ${ff}: ${plan.rows.length}. Baseline files used: ${filesUsed}.`,
    '',
    '## How to regenerate',
    '',
    'Run from the repository root. Both tools skip outputs that already exist, so `--force` is needed to replace them.',
    '',
    '1. Start the local static server on port 8787, the same server CI uses: `node audit/tools/static-server.mjs --port 8787`',
    '2. In a second shell, measure the baseline against it, three runs per page: `node audit/tools/lh-run.mjs --base http://127.0.0.1:8787 --out audit/baseline/lighthouse-local --runs 3 --force`',
    '3. Rebuild the budgets from that baseline: `node audit/tools/make-budgets.mjs --force`',
    '',
    '## Rules',
    '',
    '- Budgets must only be loosened in a pull request that explains why: the page, the metric, the old and new value, and the cause. Tightening needs no such note.',
    '- Floors are minimum category scores on a 0 to 1 scale. LCP and TBT maximums are in milliseconds. The CLS maximum has no unit.',
    `- Tolerances used: score ${opts.scoreTolerance} points, LCP ${pct(opts.lcpTolerance)} (at least ${LCP_MIN_GROWTH_MS} ms), CLS baseline plus ${opts.clsSlack} (ceiling at least ${CLS_MIN_CEILING}), TBT baseline plus ${opts.tbtSlack} ms (ceiling at least ${TBT_MIN_CEILING_MS} ms). Accessibility, best-practices and SEO floors are at least ${GUARD_FLOOR.toFixed(2)} when the baseline was ${GUARD_BASELINE} or better.`,
    '- Baseline values are medians across the lean lhr files for each page and form factor (the mean of the two middle values when the count is even). Baseline perf is 0 to 100. Baseline LCP is in ms.',
    '',
    '## Budgets',
    '',
    '| Page | Perf floor | A11y floor | BP floor | SEO floor | LCP max ms | CLS max | TBT max ms | Baseline perf | Baseline LCP |',
    '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |',
    ...plan.rows.map(tableRow),
    '',
    warnNote(opts.warn),
    '',
  ];
  if (plan.excluded.length > 0) {
    lines.push('## Not budgeted', '');
    for (const e of plan.excluded) lines.push(`- \`${e.path}\`: ${e.reason}`);
    lines.push('');
  }
  if (skipped.length > 0) {
    lines.push('## Inputs skipped', '');
    for (const s of skipped) lines.push(`- \`${s.name}\`: ${s.reason}`);
    lines.push('');
  }
  return lines.join('\n');
}

async function writeFormFactor(ff, plan, ctx, stats) {
  const { opts } = ctx;
  const cfgFile = path.join(opts.outDir, `lighthouserc.${ff}.json`);
  const mdFile = path.join(opts.outDir, `budgets-${ff}.md`);
  const jobs = [
    [cfgFile, () => `${JSON.stringify(buildConfig(ff, opts, plan.rows), null, 2)}\n`],
    [mdFile, () => renderMarkdown(ff, plan, ctx)],
  ];
  for (const [file, render] of jobs) {
    if (!opts.force && (await exists(file))) {
      log(`skip ${rel(file)} (exists, use --force to replace)`);
      stats.skipped++;
      continue;
    }
    await writeText(file, render());
    log(`wrote ${rel(file)}`);
    stats.written++;
  }
}

// ---------------------------------------------------------------- run

async function run(opts) {
  const { inputs, skipped, failedRuns } = await readInputs(opts.from, opts.origin);
  if (inputs.length === 0) {
    throw new Error(`no usable lean lhr files in ${rel(opts.from)} (${skipped.length} skipped)`);
  }
  log(
    `make-budgets: ${inputs.length} usable lhr files in ${rel(opts.from)} at ${opts.origin}, ` +
      `${skipped.length} skipped, ${failedRuns} failed-run files ignored`,
  );

  const groups = groupInputs(inputs);
  const pageList = await resolvePages(opts, inputs);
  const pages = opts.limit !== null ? pageList.pages.slice(0, opts.limit) : pageList.pages;
  log(`pages: ${pages.length} from ${pageList.source}`);

  const plans = new Map(FORM_FACTORS.map((ff) => [ff, planFormFactor(ff, pages, groups, opts)]));
  if ([...plans.values()].every((plan) => plan.rows.length === 0)) {
    throw new Error('no listed page has a complete baseline, nothing to write');
  }

  await mkdir(opts.outDir, { recursive: true });
  const stats = { written: 0, skipped: 0 };
  for (const ff of FORM_FACTORS) {
    const plan = plans.get(ff);
    if (plan.rows.length === 0) {
      log(`warning: no listed page has a ${ff} baseline, ${ff} files not written`);
      continue;
    }
    for (const e of plan.excluded) log(`warning: ${ff} ${e.path} not budgeted: ${e.reason}`);
    const ctx = { opts, skipped, pageSource: pageList.source, pageCount: pages.length };
    await writeFormFactor(ff, plan, ctx, stats);
  }
  log(`done: ${stats.written} written, ${stats.skipped} skipped -> ${rel(opts.outDir)}`);
  return 0;
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
  try {
    return await run(opts);
  } catch (err) {
    log(`fatal: ${errText(err)}`);
    return 1;
  }
}

process.exitCode = await main(process.argv.slice(2));
