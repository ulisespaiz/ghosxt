#!/usr/bin/env node
// ci-crawl-gate.mjs
//
// CI pass/fail gate for the crawl of the locally served site (job "links" in
// .github/workflows/site-quality.yml). It reads the JSON outputs of
// tools/crawl-live.mjs (pages.json, links.json, redirects.json, assets.json) and
// the sitemap, runs seven checks, and prints a Markdown summary to stdout for
// $GITHUB_STEP_SUMMARY. report.md is not read.
//
// Usage: node tools/ci-crawl-gate.mjs <crawlDir> [--known-broken <file>]
//          [--known-orphans <file>] [--known-duplicate-titles <file>]
//          [--sitemap <file>] [--help]
//
// Exit codes: 0 when no check FAILs (WARN results do not fail the gate),
// 1 when at least one check FAILs, 2 on a usage error or when the crawl
// directory or pages.json is missing.
//
// Path allowlists (--known-broken, --known-orphans) match by pathname: origin,
// query and trailing slash are ignored, so the same files serve the live origin
// and the local origin. --known-duplicate-titles holds exact page titles, compared
// after whitespace normalization. In all three files one entry is written per
// line; blank lines and # comments are skipped. A missing allowlist is an empty one.
//
// crawl-live.mjs does not write the sitemap set to its JSON, so the sitemap is
// read from its <loc> elements. Without --sitemap the first file found is used:
// <crawlDir>/../../../sitemap.xml, then /home/user/ghosxt/sitemap.xml, then
// sitemap.xml at the repository root (the parent of audit/).

import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const AUDIT_DIR = path.resolve(HERE, "..");
const REPO_ROOT = path.resolve(AUDIT_DIR, "..");
const DEFAULT_KNOWN_BROKEN = path.join(AUDIT_DIR, "ci", "known-broken-links.txt");
const DEFAULT_KNOWN_ORPHANS = path.join(AUDIT_DIR, "ci", "known-orphans.txt");
const DEFAULT_KNOWN_DUPLICATE_TITLES = path.join(AUDIT_DIR, "ci", "known-duplicate-titles.txt");
const SITEMAP_FALLBACK = "/home/user/ghosxt/sitemap.xml";
const BASE = "http://gate.invalid";
const LIST_LIMIT = 100; // detail items printed per check
const USAGE =
  "Usage: node tools/ci-crawl-gate.mjs <crawlDir> [--known-broken <file>] [--known-orphans <file>] " +
  "[--known-duplicate-titles <file>] [--sitemap <file>] [--help]";
const HELP = `${USAGE}

Runs seven checks on a crawl-live.mjs output directory and prints a Markdown
summary to stdout. Exit 0 when no check FAILs (WARN results do not fail), 1 when
a check FAILs, 2 on a usage error or when the crawl directory or pages.json is
missing.

Options:
  --known-broken <file>            Link target paths tolerated by check 1
                                   (default: audit/ci/known-broken-links.txt)
  --known-orphans <file>           Sitemap paths tolerated by check 3
                                   (default: audit/ci/known-orphans.txt)
  --known-duplicate-titles <file>  Exact page titles tolerated by check 6, one per
                                   line, whitespace-normalized
                                   (default: audit/ci/known-duplicate-titles.txt)
  --sitemap <file>                 Sitemap to read (default: <crawlDir>/../../../sitemap.xml,
                                   then /home/user/ghosxt/sitemap.xml, then the
                                   repository root sitemap.xml)
  --help, -h                       Show this help and exit 0

Allowlist files: one entry per line; blank lines and # comments are ignored.
A missing allowlist file is an empty allowlist. Path allowlists match by pathname
(origin, query and trailing slash are ignored).
`;

// Pathname of a URL or bare path, or null when it does not parse.
function pathOf(u) {
  try {
    return new URL(u, BASE).pathname;
  } catch {
    return null;
  }
}

// Trailing slashes removed; the root stays "/".
function keyOfPath(p) {
  return p.length > 1 ? p.replace(/\/+$/, "") || "/" : p;
}

function keyOf(u) {
  const p = pathOf(u);
  return p === null ? null : keyOfPath(p);
}

// Whitespace collapsed and trimmed, for exact title comparison.
function normTitle(s) {
  return String(s).replace(/\s+/g, " ").trim();
}

function cell(v) {
  return String(v).replace(/\|/g, "\\|");
}

function statusText(s) {
  return s === 0 ? "0 (unreachable)" : String(s);
}

function countText(flagged, tolerated) {
  return tolerated ? `${flagged} (${tolerated} tolerated)` : String(flagged);
}

function capped(items) {
  if (items.length <= LIST_LIMIT) return items;
  return [...items.slice(0, LIST_LIMIT), `- ... and ${items.length - LIST_LIMIT} more`];
}

function isNoindex(p) {
  return /noindex/i.test(p.robotsMeta || "") || /noindex/i.test(p.xRobotsTag || "");
}

function parseArgs(argv) {
  const opts = {
    crawlDir: null,
    knownBroken: DEFAULT_KNOWN_BROKEN,
    knownOrphans: DEFAULT_KNOWN_ORPHANS,
    knownDuplicateTitles: DEFAULT_KNOWN_DUPLICATE_TITLES,
    sitemap: null,
    help: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      opts.help = true;
    } else if (["--known-broken", "--known-orphans", "--known-duplicate-titles", "--sitemap"].includes(arg)) {
      const v = argv[i + 1];
      if (v === undefined || v.startsWith("--")) throw new Error(`${arg} needs a value`);
      i++;
      if (arg === "--known-broken") opts.knownBroken = path.resolve(v);
      else if (arg === "--known-orphans") opts.knownOrphans = path.resolve(v);
      else if (arg === "--known-duplicate-titles") opts.knownDuplicateTitles = path.resolve(v);
      else opts.sitemap = path.resolve(v);
    } else if (arg.startsWith("--")) {
      throw new Error(`unknown option: ${arg}`);
    } else if (opts.crawlDir === null) {
      opts.crawlDir = path.resolve(arg);
    } else {
      throw new Error(`unexpected argument: ${arg}`);
    }
  }
  if (!opts.help && opts.crawlDir === null) throw new Error("crawl directory is required");
  return opts;
}

// A missing or unreadable file, or one that is not a JSON array, reads as null.
async function readJsonArray(file) {
  try {
    const data = JSON.parse(await readFile(file, "utf8"));
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

// A missing allowlist is an empty set (found: false).
async function readAllowlist(file) {
  const keys = new Set();
  let text;
  try {
    text = await readFile(file, "utf8");
  } catch {
    return { keys, file, found: false };
  }
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const k = keyOf(line);
    if (k !== null) keys.add(k);
  }
  return { keys, file, found: true };
}

// Exact page titles, whitespace-normalized. A missing file is an empty set.
async function readTitleList(file) {
  const titles = new Set();
  let text;
  try {
    text = await readFile(file, "utf8");
  } catch {
    return { titles, file, found: false };
  }
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    titles.add(normTitle(line));
  }
  return { titles, file, found: true };
}

// Returns { file, locs } for the first sitemap found, or null.
async function readSitemap(opts) {
  const candidates = opts.sitemap
    ? [opts.sitemap]
    : [
        path.resolve(opts.crawlDir, "../../../sitemap.xml"),
        SITEMAP_FALLBACK,
        path.join(REPO_ROOT, "sitemap.xml"),
      ];
  for (const file of candidates) {
    try {
      const xml = await readFile(file, "utf8");
      const locs = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => m[1]);
      return { file, locs };
    } catch {
      // not here; try the next candidate
    }
  }
  return null;
}

// One entry per sitemap key (trailing slash ignored), in sitemap order.
function sitemapEntries(locs) {
  const byKey = new Map();
  for (const loc of locs) {
    const p = pathOf(loc);
    if (p === null) continue;
    const key = keyOfPath(p);
    if (!byKey.has(key)) byKey.set(key, { loc, path: p, key });
  }
  return [...byKey.values()];
}

// Final status by pathname. Targets whose first response was not 200 are in
// redirects.json with their final status; 200 HTML pages are in pages.json;
// assets.json holds the probed status of asset links. Exact pathname first, then
// the trailing-slash-free key. Returns a lookup(path) function.
function statusIndex(pages, redirects, assets) {
  const exact = new Map();
  const byKey = new Map();
  const add = (url, entry) => {
    if (typeof url !== "string") return;
    const p = pathOf(url);
    if (p === null) return;
    if (!exact.has(p)) exact.set(p, entry);
    const k = keyOfPath(p);
    if (!byKey.has(k)) byKey.set(k, entry);
  };
  for (const r of redirects) {
    add(r.url, { status: r.status, redirected: (r.chain?.length ?? 0) > 0, finalUrl: r.finalUrl || r.url });
  }
  for (const p of pages) add(p.url, { status: p.status, redirected: false, finalUrl: p.finalUrl || p.url });
  for (const a of assets) add(a.url, { status: a.status ?? null, redirected: false, finalUrl: a.url });
  return (p) => exact.get(p) ?? byKey.get(keyOfPath(p)) ?? null;
}

// Link targets by pathname, with every referrer (one per from + raw href), and
// the inbound page-to-page sources per key. Self-links are not inbound links.
function indexLinks(links) {
  const targets = new Map();
  const inbound = new Map();
  for (const l of links) {
    if (typeof l?.to !== "string" || typeof l.from !== "string") continue;
    const tp = pathOf(l.to);
    if (tp === null) continue;
    let t = targets.get(tp);
    if (!t) {
      t = { url: l.to, refs: [], seen: new Set() };
      targets.set(tp, t);
    }
    const rk = `${l.from}\n${l.raw}`;
    if (!t.seen.has(rk)) {
      t.seen.add(rk);
      t.refs.push({ from: l.from, raw: l.raw, kind: l.kind });
    }
    if (l.kind === "page") {
      const fk = keyOf(l.from);
      const tk = keyOfPath(tp);
      if (fk !== null && fk !== tk) {
        if (!inbound.has(tk)) inbound.set(tk, new Set());
        inbound.get(tk).add(fk);
      }
    }
  }
  return { targets, inbound };
}

// Runs the seven checks. Each row: { name, result: PASS|WARN|FAIL, count, items }.
function runChecks({ pages, files, sitemap, knownBroken, knownOrphans, knownTitles }) {
  const rows = [];
  const add = (name, result, count, items = []) => rows.push({ name, result, count, items: capped(items) });
  const missingFiles = (names) => names.filter((n) => files[n] === null).map((n) => `${n}.json`);
  const noSitemap = "- No sitemap file found (pass --sitemap). Check skipped.";
  const lookup = statusIndex(pages, files.redirects ?? [], files.assets ?? []);
  const idx = files.links ? indexLinks(files.links) : null;
  const sitemapKeys = sitemap ? new Set(sitemap.map((e) => e.key)) : null;

  // 1 Broken internal targets: final status 0, 4xx or 5xx.
  {
    const name = "1 Broken internal targets";
    const miss = missingFiles(["links", "redirects", "assets"]);
    if (miss.length) {
      add(name, "FAIL", "n/a", [`- Missing or unreadable: ${miss.join(", ")}.`]);
    } else {
      const broken = [];
      let unknown = 0;
      for (const [p, t] of idx.targets) {
        const st = lookup(p);
        if (!st || st.status == null) unknown++;
        else if (st.status === 0 || st.status >= 400) {
          broken.push({ url: t.url, status: st.status, refs: t.refs, tolerated: knownBroken.keys.has(keyOfPath(p)) });
        }
      }
      broken.sort((a, b) => a.url.localeCompare(b.url));
      const flagged = broken.filter((b) => !b.tolerated).length;
      const items = broken.map((b) => {
        const head = `- ${b.url} -> HTTP ${statusText(b.status)}${b.tolerated ? " (known-broken, tolerated)" : ""}`;
        const refLines = b.refs.slice(0, 3).map((r) => `  - from ${r.from} href "${r.raw}"`);
        if (!b.refs.length) refLines.push("  - no referrers recorded");
        else if (b.refs.length > 3) refLines.push(`  - ${b.refs.length - 3} more referrer(s)`);
        return [head, ...refLines].join("\n");
      });
      if (unknown) {
        items.push(`${unknown} link target(s) have no recorded status (not fetched, or a non-HTML 200); not counted.`);
      }
      add(name, flagged ? "FAIL" : "PASS", countText(flagged, broken.length - flagged), items);
    }
  }

  // 2 Sitemap entries whose final status is not 200. Never allowlisted.
  {
    const name = "2 Sitemap entries not returning 200";
    const miss = missingFiles(["redirects"]);
    if (miss.length) {
      add(name, "FAIL", "n/a", [`- Missing or unreadable: ${miss.join(", ")}.`]);
    } else if (!sitemap) {
      add(name, "WARN", "n/a", [noSitemap]);
    } else {
      const bad = [];
      const unrecorded = [];
      for (const e of sitemap) {
        const st = lookup(e.path);
        if (!st || st.status == null) unrecorded.push(e);
        else if (st.status !== 200) bad.push({ e, status: st.status });
      }
      const items = [
        ...bad.map(({ e, status }) => `- ${e.loc} -> HTTP ${statusText(status)}`),
        ...unrecorded.map((e) => `- ${e.loc} -> status not recorded (non-HTML 200 or not fetched); not counted as 200`),
      ];
      const result = bad.length ? "FAIL" : unrecorded.length ? "WARN" : "PASS";
      add(name, result, unrecorded.length ? `${bad.length} (${unrecorded.length} not recorded)` : String(bad.length), items);
    }
  }

  // 3 Orphans: sitemap URLs with no inbound internal link from another page.
  // The home page is not tested.
  {
    const name = "3 Orphan sitemap pages";
    const miss = missingFiles(["links"]);
    if (miss.length) {
      add(name, "FAIL", "n/a", [`- Missing or unreadable: ${miss.join(", ")}.`]);
    } else if (!sitemap) {
      add(name, "WARN", "n/a", [noSitemap]);
    } else {
      const orphans = sitemap.filter((e) => e.key !== "/" && !(idx.inbound.get(e.key)?.size));
      const flagged = orphans.filter((e) => !knownOrphans.keys.has(e.key)).length;
      const items = orphans.map((e) => `- ${e.loc}${knownOrphans.keys.has(e.key) ? " (known-orphan, tolerated)" : ""}`);
      add(name, flagged ? "FAIL" : "PASS", countText(flagged, orphans.length - flagged), items);
    }
  }

  // 4 Internal links whose target redirected (WARN only).
  {
    const name = "4 Internal links to redirects";
    const miss = missingFiles(["links", "redirects"]);
    if (miss.length) {
      add(name, "FAIL", "n/a", [`- Missing or unreadable: ${miss.join(", ")}.`]);
    } else {
      const hits = [];
      for (const [p, t] of idx.targets) {
        const st = lookup(p);
        if (!st?.redirected) continue;
        for (const r of t.refs) {
          if (r.kind === "page") hits.push({ from: r.from, raw: r.raw, finalUrl: st.finalUrl });
        }
      }
      hits.sort((a, b) => a.from.localeCompare(b.from) || a.raw.localeCompare(b.raw));
      const items = [];
      if (hits.length) items.push(`${hits.length} internal link(s) point at a redirect (first 10 shown):`);
      for (const h of hits.slice(0, 10)) items.push(`- page ${h.from}, href "${h.raw}", final ${h.finalUrl}`);
      add(name, hits.length ? "WARN" : "PASS", String(hits.length), items);
    }
  }

  // 5 Crawlable 200 pages absent from the sitemap, not noindex (WARN only).
  {
    const name = "5 Crawlable pages missing from sitemap";
    if (!sitemap) {
      add(name, "WARN", "n/a", [noSitemap]);
    } else {
      const extra = pages.filter((p) => {
        const k = keyOf(p.url);
        return k !== null && !sitemapKeys.has(k) && !isNoindex(p);
      });
      add(name, extra.length ? "WARN" : "PASS", String(extra.length), extra.map((p) => `- ${p.url}`));
    }
  }

  // 6 Duplicate titles across crawled pages. Titles are compared after whitespace
  // normalization; a group whose title is in the known-duplicate-titles list is tolerated.
  {
    const groups = new Map();
    for (const p of pages) {
      const t = normTitle(p.title ?? "");
      if (!t) continue;
      if (!groups.has(t)) groups.set(t, []);
      groups.get(t).push(p.url);
    }
    const dups = [...groups]
      .filter(([, urls]) => urls.length > 1)
      .sort(([a], [b]) => a.localeCompare(b));
    const flagged = dups.filter(([t]) => !knownTitles.has(t)).length;
    const items = dups.flatMap(([title, urls]) => {
      const tolerated = knownTitles.has(title);
      return [
        `- "${title}" on ${urls.length} pages${tolerated ? " (known-duplicate-title, tolerated)" : ""}:`,
        ...urls.sort().map((u) => `  - ${u}`),
      ];
    });
    add("6 Duplicate titles", flagged ? "FAIL" : "PASS", countText(flagged, dups.length - flagged), items);
  }

  // 7 Page basics: exactly one h1, a canonical, and a meta description.
  {
    const noH1 = pages.filter((p) => (p.h1?.length ?? 0) !== 1);
    add(
      "7a Pages with 0 or more than 1 h1",
      noH1.length ? "FAIL" : "PASS",
      String(noH1.length),
      noH1.map((p) => `- ${p.url} (${p.h1?.length ?? 0} h1)`),
    );
    const noCanon = pages.filter((p) => !p.canonical);
    add("7b Pages missing a canonical", noCanon.length ? "FAIL" : "PASS", String(noCanon.length), noCanon.map((p) => `- ${p.url}`));
    const noMeta = pages.filter((p) => !p.metaDescription);
    add("7c Pages missing a meta description", noMeta.length ? "FAIL" : "PASS", String(noMeta.length), noMeta.map((p) => `- ${p.url}`));
  }

  return rows;
}

function render(header, rows) {
  const failed = rows.some((r) => r.result === "FAIL");
  const out = [`## Crawl gate: ${failed ? "FAIL" : "PASS"}`, ""];
  for (const h of header) out.push(h, "");
  out.push("| Check | Result | Count |", "| --- | --- | --- |");
  for (const r of rows) out.push(`| ${cell(r.name)} | ${r.result} | ${cell(r.count)} |`);
  out.push("");
  for (const r of rows) {
    if (!r.items.length) continue;
    out.push(`### ${r.name}`, "");
    out.push(...r.items);
    out.push("");
  }
  return out.join("\n");
}

async function main() {
  let opts;
  try {
    opts = parseArgs(process.argv.slice(2));
  } catch (e) {
    process.stderr.write(`ci-crawl-gate: ${e.message}\n${USAGE}\n`);
    return 2;
  }
  if (opts.help) {
    process.stdout.write(HELP);
    return 0;
  }
  try {
    if (!(await stat(opts.crawlDir)).isDirectory()) throw new Error("not a directory");
  } catch {
    process.stderr.write(`ci-crawl-gate: crawl directory not found: ${opts.crawlDir}\n`);
    return 2;
  }
  let pages;
  try {
    pages = JSON.parse(await readFile(path.join(opts.crawlDir, "pages.json"), "utf8"));
    if (!Array.isArray(pages)) throw new Error("not a JSON array");
  } catch (e) {
    process.stderr.write(`ci-crawl-gate: pages.json missing or unreadable in ${opts.crawlDir}: ${e.message}\n`);
    return 2;
  }

  const files = {
    links: await readJsonArray(path.join(opts.crawlDir, "links.json")),
    redirects: await readJsonArray(path.join(opts.crawlDir, "redirects.json")),
    assets: await readJsonArray(path.join(opts.crawlDir, "assets.json")),
  };
  const knownBroken = await readAllowlist(opts.knownBroken);
  const knownOrphans = await readAllowlist(opts.knownOrphans);
  const knownTitles = await readTitleList(opts.knownDuplicateTitles);
  const sm = await readSitemap(opts);
  const sitemap = sm ? sitemapEntries(sm.locs) : null;

  const rows = runChecks({ pages, files, sitemap, knownBroken, knownOrphans, knownTitles: knownTitles.titles });
  const source = (a) => (a.found ? a.file : `${a.file} (file not found, treated as empty)`);
  const header = [
    `Crawl \`${opts.crawlDir}\`: ${pages.length} HTML pages, ${files.links ? files.links.length : "n/a"} links, ` +
      (sitemap ? `${sitemap.length} sitemap entries from \`${sm.file}\`.` : "no sitemap found."),
    `Allowlists: known-broken ${knownBroken.keys.size} path(s) from ${source(knownBroken)}.`,
    `Allowlists: known-orphans ${knownOrphans.keys.size} path(s) from ${source(knownOrphans)}.`,
    `Allowlists: known-duplicate-titles ${knownTitles.titles.size} title(s) from ${source(knownTitles)}.`,
  ];
  process.stdout.write(render(header, rows) + "\n");
  return rows.some((r) => r.result === "FAIL") ? 1 : 0;
}

main().then(
  (code) => {
    process.exitCode = code;
  },
  (err) => {
    process.stderr.write(`ci-crawl-gate: ${err?.stack || err}\n`);
    process.exitCode = 2;
  },
);
