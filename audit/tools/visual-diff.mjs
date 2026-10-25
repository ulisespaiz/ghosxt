#!/usr/bin/env node
// Pixel-diff two screenshot directories written by tools/screenshots.mjs.
// CI runs this to block visual changes nobody approved.
//
// Each *.png in --base is paired with the PNG of the same name in --head:
//   changed           the sizes differ (the reason says how), or the share of
//                     differing pixels is above --max-diff-ratio
//   unchanged         same size and within the limit
//   missing-in-head   no PNG of that name in head (fails the run)
//   error             a PNG could not be decoded or written; recorded, counted
//                     as changed, and the run goes on
// PNGs that exist only in head are new-in-head (informational, never fails).
//
// Outputs in --out: report.json, report.md (summary line first, then tables)
// and <stem>.diff.png for each changed file. Diff images of files that are no
// longer changed are removed. An existing diff image that is newer than both of
// its inputs is kept unless --force is given, so pass --force after changing
// --threshold.
//
// Progress lines go to stderr and the summary line to stdout. Exit 1 when
// anything changed or is missing in head, and on a fatal setup error (bad
// arguments, a missing directory). Exit 0 otherwise.

import { mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const DEFAULT_OUT = 'visual-diff-report';
const DEFAULT_THRESHOLD = 0.1;
const DEFAULT_MAX_DIFF_RATIO = 0.001;
const MAGENTA = Buffer.from([255, 0, 255, 255]);

const HELP = `Usage: node tools/visual-diff.mjs --base <dir> --head <dir> [options]

Compares the PNG screenshots in --base with the PNGs of the same name in --head
(as written by tools/screenshots.mjs), using pixelmatch.

Options:
  --base <dir>            Screenshots of the base branch (required).
  --head <dir>            Screenshots of the PR head (required).
  --out <dir>             Report directory (default: visual-diff-report).
  --threshold <0-1>       pixelmatch per-pixel color threshold (default: 0.1).
  --max-diff-ratio <0-1>  Share of pixels that may differ before a file counts
                          as changed (default: 0.001, that is 0.1 percent).
  --only <text>           Compare only names containing this text. A * or ?
                          makes it a wildcard, e.g. --only "blog*.mobile".
  --force                 Rewrite diff images even when they are newer than both
                          inputs. Pass it after changing --threshold.
  -h, --help              Show this help and exit.

Writes <out>/report.json, <out>/report.md and <stem>.diff.png for each changed
file. Prints a summary line to stdout. Exit 0 when nothing changed and nothing
is missing in head; exit 1 otherwise, and on a fatal setup error.
`;

function log(message) {
  process.stderr.write(`${message}\n`);
}

function parseCli(argv) {
  const { values } = parseArgs({
    args: argv,
    options: {
      base: { type: 'string' },
      head: { type: 'string' },
      out: { type: 'string', default: DEFAULT_OUT },
      threshold: { type: 'string', default: String(DEFAULT_THRESHOLD) },
      'max-diff-ratio': { type: 'string', default: String(DEFAULT_MAX_DIFF_RATIO) },
      only: { type: 'string' },
      force: { type: 'boolean', default: false },
      help: { type: 'boolean', short: 'h', default: false },
    },
    strict: true,
  });
  return values;
}

function unitInterval(raw, flag) {
  const value = Number(raw);
  if (String(raw).trim() === '' || !Number.isFinite(value) || value < 0 || value > 1) {
    throw new Error(`${flag} must be a number from 0 to 1, got "${raw}"`);
  }
  return value;
}

function isDirectory(path) {
  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
}

function requireDir(dir, flag) {
  if (!dir) throw new Error(`${flag} is required`);
  if (!isDirectory(dir)) throw new Error(`${flag} is not a directory: ${dir}`);
  return resolve(dir);
}

function listPngs(dir) {
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.png') && !entry.name.endsWith('.diff.png'))
    .map((entry) => entry.name)
    .sort();
}

// Substring match on the file name; * and ? act as wildcards when present.
function nameFilter(only) {
  if (!only) return () => true;
  const source = only
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/\?/g, '.');
  const pattern = new RegExp(source);
  return (name) => pattern.test(name);
}

function diffNameFor(name) {
  return `${name.slice(0, -'.png'.length)}.diff.png`;
}

function record(name, status, fields = {}) {
  return {
    name,
    status,
    ratio: null,
    diffPixels: null,
    width: null,
    height: null,
    reason: null,
    diffImage: null,
    ...fields,
  };
}

function tryReadPng(file) {
  try {
    return { png: PNG.sync.read(readFileSync(file)) };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// Top-left width x height block of an RGBA buffer that is srcWidth pixels wide.
function copyRegion(src, srcWidth, width, height) {
  const out = Buffer.alloc(width * height * 4);
  const rowBytes = width * 4;
  for (let y = 0; y < height; y++) {
    const from = y * srcWidth * 4;
    src.copy(out, y * rowBytes, from, from + rowBytes);
  }
  return out;
}

function isFresh(file, inputs) {
  try {
    const built = statSync(file).mtimeMs;
    return inputs.every((input) => statSync(input).mtimeMs <= built);
  } catch {
    return false;
  }
}

function writeDiffPng(file, width, height, data) {
  const png = new PNG({ width, height });
  png.data = data;
  writeFileSync(file, PNG.sync.write(png));
}

function comparePair(name, basePath, headPath, ctx) {
  const base = tryReadPng(basePath);
  const head = tryReadPng(headPath);
  if (base.error || head.error) {
    const reason = [base.error && `base: ${base.error}`, head.error && `head: ${head.error}`]
      .filter(Boolean)
      .join('; ');
    return record(name, 'error', { reason });
  }

  const a = base.png;
  const b = head.png;
  const width = Math.max(a.width, b.width);
  const height = Math.max(a.height, b.height);
  const overlapW = Math.min(a.width, b.width);
  const overlapH = Math.min(a.height, b.height);
  const sameSize = overlapW === width && overlapH === height;

  // Compare the region both images cover. Area that only one image covers
  // counts as different.
  const overlapDiff = Buffer.alloc(overlapW * overlapH * 4);
  const mismatched = pixelmatch(
    copyRegion(a.data, a.width, overlapW, overlapH),
    copyRegion(b.data, b.width, overlapW, overlapH),
    overlapDiff,
    overlapW,
    overlapH,
    { threshold: ctx.threshold, includeAA: false },
  );
  const diffPixels = mismatched + (width * height - overlapW * overlapH);
  const ratio = diffPixels / (width * height);
  const changed = !sameSize || ratio > ctx.maxDiffRatio;
  const fields = {
    ratio,
    diffPixels,
    width,
    height,
    reason: sameSize ? null : `dimensions ${a.width}x${a.height} -> ${b.width}x${b.height}`,
  };
  if (!changed) return record(name, 'unchanged', fields);

  const diffName = diffNameFor(name);
  const diffPath = join(ctx.outDir, diffName);
  if (ctx.force || !isFresh(diffPath, [basePath, headPath])) {
    const canvas = Buffer.alloc(width * height * 4).fill(MAGENTA);
    const rowBytes = width * 4;
    for (let y = 0; y < overlapH; y++) {
      overlapDiff.copy(canvas, y * rowBytes, y * overlapW * 4, (y + 1) * overlapW * 4);
    }
    writeDiffPng(diffPath, width, height, canvas);
  } else {
    ctx.log(`  kept up-to-date ${diffName}`);
  }
  return record(name, 'changed', { ...fields, diffImage: diffName });
}

function safeCompare(name, basePath, headPath, ctx) {
  try {
    return comparePair(name, basePath, headPath, ctx);
  } catch (err) {
    return record(name, 'error', { reason: err instanceof Error ? err.message : String(err) });
  }
}

function pct(ratio) {
  return ratio === null ? 'n/a' : `${(ratio * 100).toFixed(2)}%`;
}

function sizeOf(rec) {
  return rec.width === null ? 'n/a' : `${rec.width}x${rec.height}`;
}

function cell(text) {
  return String(text).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
}

function linkTo(file) {
  return encodeURI(file).replace(/\(/g, '%28').replace(/\)/g, '%29');
}

function summaryLine(summary, ctx) {
  const verdict = summary.changed > 0 || summary.missingInHead > 0 ? 'FAILED' : 'PASSED';
  return (
    `Visual diff ${verdict}: ${summary.changed} changed, ${summary.missingInHead} missing in head, ` +
    `${summary.newInHead} new in head, ${summary.unchanged} unchanged ` +
    `(${summary.compared} compared; threshold ${ctx.threshold}, max diff ratio ${ctx.maxDiffRatio})`
  );
}

function bulletsOrNone(records) {
  if (records.length === 0) return ['None.', ''];
  return [...records.map((rec) => `- ${cell(rec.name)}`), ''];
}

function renderMarkdown(summary, records, ctx) {
  const changed = records
    .filter((rec) => rec.status === 'changed' || rec.status === 'error')
    .sort((x, y) => (y.ratio ?? -1) - (x.ratio ?? -1) || x.name.localeCompare(y.name));
  const lines = [summaryLine(summary, ctx), '', '## Changed files', ''];
  if (changed.length === 0) {
    lines.push('None.', '');
  } else {
    lines.push('| File | Status | Diff % | Size | Diff image |', '| --- | --- | ---: | --- | --- |');
    for (const rec of changed) {
      const status = rec.reason ? `${rec.status}: ${rec.reason}` : rec.status;
      const image = rec.diffImage ? `[${cell(rec.diffImage)}](${linkTo(rec.diffImage)})` : 'none';
      lines.push(`| ${cell(rec.name)} | ${cell(status)} | ${pct(rec.ratio)} | ${sizeOf(rec)} | ${image} |`);
    }
    lines.push('');
  }
  lines.push('## Missing in head', '', ...bulletsOrNone(records.filter((rec) => rec.status === 'missing-in-head')));
  lines.push('## New in head (informational)', '', ...bulletsOrNone(records.filter((rec) => rec.status === 'new-in-head')));
  return `${lines.join('\n')}\n`;
}

function main(argv) {
  let args;
  try {
    args = parseCli(argv);
  } catch (err) {
    log(`visual-diff: ${err.message} (see --help)`);
    return 1;
  }
  if (args.help) {
    process.stdout.write(HELP);
    return 0;
  }

  let baseDir;
  let headDir;
  let ctx;
  try {
    baseDir = requireDir(args.base, '--base');
    headDir = requireDir(args.head, '--head');
    ctx = {
      outDir: resolve(args.out),
      threshold: unitInterval(args.threshold, '--threshold'),
      maxDiffRatio: unitInterval(args['max-diff-ratio'], '--max-diff-ratio'),
      force: args.force,
      log,
    };
  } catch (err) {
    log(`visual-diff: ${err.message} (see --help)`);
    return 1;
  }

  const keep = nameFilter(args.only);
  const baseNames = listPngs(baseDir).filter(keep);
  const headNames = listPngs(headDir).filter(keep);
  const baseSet = new Set(baseNames);
  const headSet = new Set(headNames);
  const newNames = headNames.filter((name) => !baseSet.has(name));
  const total = baseNames.length + newNames.length;
  if (baseNames.length === 0) log(`warning: no PNG files to compare in ${baseDir}`);

  mkdirSync(ctx.outDir, { recursive: true });
  const records = [];
  const note = (rec) => {
    records.push(rec);
    const ratio = rec.ratio === null ? '' : ` (${pct(rec.ratio)})`;
    log(`[${records.length}/${total}] ${rec.name}: ${rec.status}${ratio}`);
  };

  for (const name of baseNames) {
    const rec = headSet.has(name)
      ? safeCompare(name, join(baseDir, name), join(headDir, name), ctx)
      : record(name, 'missing-in-head', { reason: 'no file with this name in head' });
    if (!rec.diffImage) rmSync(join(ctx.outDir, diffNameFor(name)), { force: true });
    note(rec);
  }
  for (const name of newNames) {
    note(record(name, 'new-in-head', { reason: 'no file with this name in base' }));
  }

  const count = (status) => records.filter((rec) => rec.status === status).length;
  const summary = {
    compared: records.filter((rec) => ['changed', 'unchanged', 'error'].includes(rec.status)).length,
    changed: count('changed') + count('error'),
    missingInHead: count('missing-in-head'),
    newInHead: count('new-in-head'),
    unchanged: count('unchanged'),
  };
  writeFileSync(join(ctx.outDir, 'report.json'), `${JSON.stringify({ summary, files: records }, null, 2)}\n`);
  writeFileSync(join(ctx.outDir, 'report.md'), renderMarkdown(summary, records, ctx));
  process.stdout.write(`${summaryLine(summary, ctx)}\n`);
  return summary.changed > 0 || summary.missingInHead > 0 ? 1 : 0;
}

try {
  process.exitCode = main(process.argv.slice(2));
} catch (err) {
  log(`visual-diff: fatal: ${err instanceof Error ? err.message : String(err)}`);
  process.exitCode = 1;
}
