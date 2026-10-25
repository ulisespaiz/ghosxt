// Summarise Lighthouse lean JSON output: one lhr per page and form factor.
//
// Reads every *.json in --in (default audit/baseline/lighthouse) except
// *.error.json, then writes:
//   --out-md      Mobile and Desktop tables, threshold flags, stats, failed runs
//   --out-csv     one row per JSON file
//   --out-audits  failing audits per form factor
//
// The page path and form factor come from the lhr itself (requestedUrl and
// configSettings.formFactor), never from file names.
//
// Run:  node tools/lh-summary.mjs --help

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const AUDIT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_IN = join(AUDIT_DIR, "baseline", "lighthouse");
const DEFAULT_TITLE = "Lighthouse baseline";
const ERROR_SUFFIX = ".error.json";
const FORM_FACTORS = ["mobile", "desktop"];

// An audit fails when its numeric score is below 0.9 and it is shown as a
// binary, numeric or metric-savings check.
const FAIL_MODES = new Set(["binary", "numeric", "metricSavings"]);

const CSV_HEADER = [
  "url", "path", "formFactor", "performance", "accessibility", "bestPractices", "seo",
  "fcp_ms", "lcp_ms", "tbt_ms", "cls", "si_ms", "tti_ms", "ttfb_ms", "total_bytes",
  "failing_audit_count", "failing_audits", "run_warnings", "lighthouse_version", "fetch_time",
];

const HELP = `Usage: node tools/lh-summary.mjs [options]

Summarise Lighthouse lean JSON (one lhr per page and form factor).

Options:
  --in <dir>           Folder of lhr *.json files (default: audit/baseline/lighthouse)
  --out-md <file>      Markdown summary (default: <in>/../lighthouse-summary.md)
  --out-csv <file>     CSV, one row per JSON file (default: <in>/../lighthouse-summary.csv)
  --out-audits <file>  Failing audits per form factor (default: <in>/../lighthouse-failing-audits.md)
  --title <text>       Title for the Markdown headings (default: "Lighthouse baseline")
  --limit <N>          Process only the first N JSON files, in name order
  --force              Overwrite outputs that already exist (default: skip them)
  --help               Show this help and exit

*.error.json files are not summarised. One is listed under "Failed runs" when a
JSON file exists for the same page path.

Exit codes: 0 completed; 1 fatal setup error (bad options, unreadable --in,
no readable lhr files).
`;

const NOTE_INP =
  '> **Note:** INP is a field metric. Lighthouse runs in the lab and cannot measure it, so the "INP (field)" column stays empty until Search Console or CrUX data is supplied.';
const LEGEND =
  "Bold marks a cell below threshold: Perf under 90, A11y, BP and SEO under 95, LCP over 2500 ms, CLS over 0.1, TBT over 200 ms.";

// Display helpers. Missing values print as "-".
function scoreText(v) {
  if (v == null) return "-";
  return Number.isInteger(v) ? String(v) : v.toFixed(1);
}
function msText(v) {
  return v == null ? "-" : String(Math.round(v));
}
function secText(v) {
  return v == null ? "-" : (v / 1000).toFixed(2);
}
function clsText(v) {
  return v == null ? "-" : v.toFixed(3);
}

// Markdown table columns. `bad` flags a value past its threshold; `stat: false`
// keeps a column out of the stats line.
const MD_COLS = [
  { head: "Perf", get: (r) => r.perf, show: scoreText, bad: (v) => v < 90 },
  { head: "A11y", get: (r) => r.a11y, show: scoreText, bad: (v) => v < 95 },
  { head: "BP", get: (r) => r.bp, show: scoreText, bad: (v) => v < 95 },
  { head: "SEO", get: (r) => r.seo, show: scoreText, bad: (v) => v < 95 },
  { head: "FCP s", get: (r) => r.fcpMs, show: secText },
  { head: "LCP s", get: (r) => r.lcpMs, show: secText, bad: (v) => v > 2500 },
  { head: "TBT ms", get: (r) => r.tbtMs, show: msText, bad: (v) => v > 200 },
  { head: "CLS", get: (r) => r.cls, show: clsText, bad: (v) => v > 0.1 },
  { head: "SI s", get: (r) => r.siMs, show: secText },
  // Field-only metric: Lighthouse lab runs cannot fill it.
  { head: "INP (field)", get: () => null, show: () => "", stat: false },
];

const VALUE_OPTS = {
  "--in": "in",
  "--out-md": "outMd",
  "--out-csv": "outCsv",
  "--out-audits": "outAudits",
  "--title": "title",
  "--limit": "limit",
};
const FLAG_OPTS = { "--force": "force", "--help": "help" };

function parseArgs(argv) {
  const opts = {
    in: DEFAULT_IN,
    outMd: null,
    outCsv: null,
    outAudits: null,
    title: DEFAULT_TITLE,
    limit: null,
    force: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const eq = arg.indexOf("=");
    const name = eq > 0 ? arg.slice(0, eq) : arg;
    if (Object.hasOwn(FLAG_OPTS, name)) {
      opts[FLAG_OPTS[name]] = true;
      continue;
    }
    if (!Object.hasOwn(VALUE_OPTS, name)) throw new Error(`unknown argument: ${arg}`);
    let value;
    if (eq > 0) {
      value = arg.slice(eq + 1);
    } else {
      value = argv[++i];
      if (value === undefined) throw new Error(`${name} needs a value`);
    }
    opts[VALUE_OPTS[name]] = value;
  }
  if (opts.limit !== null) {
    const n = Number(opts.limit);
    if (!Number.isInteger(n) || n < 1) {
      throw new Error(`--limit must be a whole number of 1 or more, got "${opts.limit}"`);
    }
    opts.limit = n;
  }
  return opts;
}

function listFiles(dir) {
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .sort();
}

const isRunFile = (name) => name.endsWith(".json") && !name.endsWith(ERROR_SUFFIX);
const isErrorFile = (name) => name.endsWith(ERROR_SUFFIX);

function readJson(file) {
  return JSON.parse(readFileSync(file, "utf8"));
}

function num(v) {
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}
function metric(audits, id) {
  return num(audits[id]?.numericValue);
}
function scoreOf(categories, id) {
  const s = num(categories[id]?.score);
  return s == null ? null : Math.round(s * 100);
}
function pathOf(url) {
  try {
    return new URL(url).pathname || "/";
  } catch {
    return url || "(unknown)";
  }
}
function failingAudits(audits) {
  return Object.keys(audits)
    .sort()
    .filter((id) => {
      const a = audits[id];
      return typeof a?.score === "number" && a.score < 0.9 && FAIL_MODES.has(a.scoreDisplayMode);
    })
    .map((id) => ({ id, title: String(audits[id].title ?? id) }));
}

function toRow(lhr, file) {
  if (!lhr || typeof lhr.audits !== "object" || lhr.audits === null) {
    throw new Error("not a Lighthouse lhr (no audits object)");
  }
  const audits = lhr.audits;
  const cats = lhr.categories || {};
  const url = lhr.requestedUrl || lhr.finalUrl || lhr.finalDisplayedUrl || "";
  return {
    file,
    url,
    path: pathOf(url),
    formFactor: lhr.configSettings?.formFactor || "unknown",
    perf: scoreOf(cats, "performance"),
    a11y: scoreOf(cats, "accessibility"),
    bp: scoreOf(cats, "best-practices"),
    seo: scoreOf(cats, "seo"),
    fcpMs: metric(audits, "first-contentful-paint"),
    lcpMs: metric(audits, "largest-contentful-paint"),
    tbtMs: metric(audits, "total-blocking-time"),
    cls: metric(audits, "cumulative-layout-shift"),
    siMs: metric(audits, "speed-index"),
    ttiMs: metric(audits, "interactive"),
    ttfbMs: metric(audits, "server-response-time"),
    totalBytes: metric(audits, "total-byte-weight"),
    failing: failingAudits(audits),
    runWarnings: Array.isArray(lhr.runWarnings) ? lhr.runWarnings.length : 0,
    lhVersion: lhr.lighthouseVersion || "",
    fetchTime: lhr.fetchTime || "",
  };
}

function loadRuns(inDir, names) {
  const rows = [];
  names.forEach((name, i) => {
    console.error(`[${i + 1}/${names.length}] read ${name}`);
    try {
      rows.push(toRow(readJson(join(inDir, name)), name));
    } catch (err) {
      console.error(`  skip ${name}: ${err.message}`);
    }
  });
  return rows;
}

function warnDuplicates(rows) {
  const seen = new Map();
  for (const r of rows) {
    const key = `${r.formFactor} ${r.path}`;
    if (seen.has(key)) console.error(`warning: ${r.file} and ${seen.get(key)} both cover ${key}`);
    else seen.set(key, r.file);
  }
}

// Works out the page path and form factor of an error file, preferring its
// JSON contents and falling back to the file name (crawl slug rule: "/" -> "__",
// "home" for the root page).
function describeErrorFile(inDir, name) {
  const stem = name.slice(0, -ERROR_SUFFIX.length);
  const ffMatch = /\.(mobile|desktop)$/.exec(stem);
  const base = ffMatch ? stem.slice(0, ffMatch.index) : stem;
  let url = "";
  let formFactor = ffMatch ? ffMatch[1] : "unknown";
  try {
    const j = readJson(join(inDir, name));
    url = j.requestedUrl || j.finalUrl || j.url || "";
    formFactor = j.configSettings?.formFactor || formFactor;
  } catch {
    // Unreadable error file: keep the name-based guess.
  }
  let path;
  if (url) path = pathOf(url);
  else if (base === "home") path = "/";
  else path = `/${base.replaceAll("__", "/")}`;
  return { file: name, path, formFactor };
}

function cmp(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}
function byPathThenFile(a, b) {
  return cmp(a.path, b.path) || cmp(a.file, b.file);
}
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Keeps a value from breaking a Markdown table cell.
function esc(s) {
  return String(s).replace(/\|/g, "\\|");
}

function median(vals) {
  const s = [...vals].sort((a, b) => a - b);
  const mid = s.length >> 1;
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

function isBad(col, row) {
  const v = col.get(row);
  return Boolean(col.bad) && v != null && col.bad(v);
}
function cellText(col, row) {
  const text = col.show(col.get(row));
  return isBad(col, row) ? `**${text}**` : text;
}

function tableLines(subset) {
  const head = ["Page", ...MD_COLS.map((c) => c.head)];
  const lines = [`| ${head.join(" | ")} |`, `|${head.map(() => "---").join("|")}|`];
  for (const r of subset) {
    const cells = [esc(r.path), ...MD_COLS.map((c) => cellText(c, r))];
    lines.push(`| ${cells.join(" | ")} |`);
  }
  return lines;
}

function statsLine(subset) {
  const parts = [];
  for (const c of MD_COLS) {
    if (c.stat === false) continue;
    const vals = subset.map((r) => c.get(r)).filter((v) => v != null);
    if (!vals.length) {
      parts.push(`${c.head} n=0`);
      continue;
    }
    parts.push(
      `${c.head} n=${vals.length}, median ${c.show(median(vals))}, ` +
        `min ${c.show(Math.min(...vals))}, max ${c.show(Math.max(...vals))}`
    );
  }
  const n = subset.length;
  return `Stats for ${n} ${n === 1 ? "page" : "pages"}: ${parts.join("; ")}.`;
}

function thresholdLines(subset) {
  const hits = [];
  for (const r of subset) {
    const labels = MD_COLS.filter((c) => isBad(c, r)).map((c) => c.head);
    if (labels.length) hits.push(`- ${esc(r.path)}: ${labels.join(", ")}`);
  }
  if (!hits.length) return "Pages below thresholds: none.";
  return ["Pages below thresholds:", "", ...hits].join("\n");
}

function buildSummaryMd(title, rows, failedRuns, inDir) {
  const out = [
    `# ${title}`,
    "",
    NOTE_INP,
    "",
    LEGEND,
    "",
    `Source: ${rows.length} ${rows.length === 1 ? "run" : "runs"} from ${inDir}.`,
    "",
  ];
  for (const ff of FORM_FACTORS) {
    const subset = rows.filter((r) => r.formFactor === ff).sort(byPathThenFile);
    out.push(`## ${cap(ff)}`, "");
    if (!subset.length) {
      out.push(`_No ${ff} runs._`, "");
      continue;
    }
    out.push(...tableLines(subset), "", statsLine(subset), "", thresholdLines(subset), "");
  }
  if (failedRuns.length) {
    out.push("## Failed runs", "");
    for (const e of failedRuns) out.push(`- ${e.file}: ${e.path} (${e.formFactor})`);
    out.push("");
  }
  return out.join("\n");
}

function failingByAudit(subset) {
  const map = new Map();
  for (const r of [...subset].sort(byPathThenFile)) {
    for (const f of r.failing) {
      if (!map.has(f.id)) map.set(f.id, { id: f.id, title: f.title, pages: [] });
      const entry = map.get(f.id);
      if (!entry.pages.includes(r.path)) entry.pages.push(r.path);
    }
  }
  return [...map.values()].sort((a, b) => b.pages.length - a.pages.length || cmp(a.id, b.id));
}

function buildAuditsMd(title, rows) {
  const out = [
    `# ${title}: failing audits`,
    "",
    "Audits whose numeric score is below 0.9 and that are shown as binary, numeric or metric-savings checks.",
    "Example page is the first path, in order, where the audit fails.",
    "",
  ];
  for (const ff of FORM_FACTORS) {
    out.push(`## ${cap(ff)}`, "");
    const audits = failingByAudit(rows.filter((r) => r.formFactor === ff));
    if (!audits.length) {
      out.push("_No failing audits._", "");
      continue;
    }
    out.push("| Audit id | Title | Pages failing | Example page |", "|---|---|---|---|");
    for (const a of audits) {
      out.push(`| ${esc(a.id)} | ${esc(a.title)} | ${a.pages.length} | ${esc(a.pages[0])} |`);
    }
    out.push("");
  }
  return out.join("\n");
}

const CSV_ROUND = { ms: 0, cls: 4 };
function rounded(v, dp) {
  return v == null ? null : Number(v.toFixed(dp));
}
function csvCell(v) {
  if (v === null || v === undefined) return "";
  const s = String(v);
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function buildCsv(rows) {
  const lines = [CSV_HEADER.join(",")];
  for (const r of [...rows].sort(byPathThenFile)) {
    const cells = [
      r.url,
      r.path,
      r.formFactor,
      r.perf,
      r.a11y,
      r.bp,
      r.seo,
      rounded(r.fcpMs, CSV_ROUND.ms),
      rounded(r.lcpMs, CSV_ROUND.ms),
      rounded(r.tbtMs, CSV_ROUND.ms),
      rounded(r.cls, CSV_ROUND.cls),
      rounded(r.siMs, CSV_ROUND.ms),
      rounded(r.ttiMs, CSV_ROUND.ms),
      rounded(r.ttfbMs, CSV_ROUND.ms),
      rounded(r.totalBytes, 0),
      r.failing.length,
      r.failing.map((f) => f.id).join("|"),
      r.runWarnings,
      r.lhVersion,
      r.fetchTime,
    ];
    lines.push(cells.map(csvCell).join(","));
  }
  return lines.join("\n") + "\n";
}

// Resume-safe: an existing output is kept unless --force is given.
function writeOutput(file, text, force) {
  if (existsSync(file) && !force) {
    console.error(`skip ${file}: already exists (use --force to overwrite)`);
    return;
  }
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, text);
  console.error(`wrote ${file}`);
}

async function main(argv) {
  const opts = parseArgs(argv);
  if (opts.help) {
    console.log(HELP);
    return 0;
  }

  const inDir = resolve(opts.in);
  const outMd = resolve(opts.outMd ?? join(inDir, "..", "lighthouse-summary.md"));
  const outCsv = resolve(opts.outCsv ?? join(inDir, "..", "lighthouse-summary.csv"));
  const outAudits = resolve(opts.outAudits ?? join(inDir, "..", "lighthouse-failing-audits.md"));
  const title = opts.title || DEFAULT_TITLE;

  let names;
  try {
    names = listFiles(inDir);
  } catch (err) {
    throw new Error(`cannot read --in ${inDir}: ${err.message}`);
  }
  const jsonNames = names.filter(isRunFile);
  if (!jsonNames.length) throw new Error(`no Lighthouse JSON files in ${inDir}`);
  const selected = opts.limit ? jsonNames.slice(0, opts.limit) : jsonNames;

  const rows = loadRuns(inDir, selected);
  if (!rows.length) {
    throw new Error(`none of the ${selected.length} JSON files in ${inDir} is a readable lhr`);
  }
  warnDuplicates(rows);

  const paths = new Set(rows.map((r) => r.path));
  const errorRuns = names.filter(isErrorFile).map((n) => describeErrorFile(inDir, n));
  const failedRuns = errorRuns.filter((e) => paths.has(e.path));

  writeOutput(outMd, buildSummaryMd(title, rows, failedRuns, inDir), opts.force);
  writeOutput(outCsv, buildCsv(rows), opts.force);
  writeOutput(outAudits, buildAuditsMd(title, rows), opts.force);

  const count = (ff) => rows.filter((r) => r.formFactor === ff).length;
  const other = rows.length - count("mobile") - count("desktop");
  console.error(
    `lh-summary: ${rows.length} runs (mobile ${count("mobile")}, desktop ${count("desktop")}, ` +
      `other ${other}); ${failedRuns.length} failed runs listed; ` +
      `${errorRuns.length - failedRuns.length} error files without a JSON for their path not listed`
  );
  return 0;
}

main(process.argv.slice(2))
  .then((code) => {
    process.exitCode = code;
  })
  .catch((err) => {
    console.error(`lh-summary: fatal: ${err.message}`);
    console.error("Run with --help for options.");
    process.exitCode = 1;
  });
