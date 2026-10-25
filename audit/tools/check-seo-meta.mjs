#!/usr/bin/env node
// SEO and structured-data checker for the static ghosxt.com site.
//
// Scans the served HTML files: *.html directly in the site root, blog/*.html and
// case-studies/*.html. Prints a Markdown report to stdout: a summary line per
// check, then one section per check with PASS or FAIL and the offending items.
// Exit codes: 0 when every selected check passes, 1 when any check fails, 2 on a
// usage or read error.
//
// Usage:
//   node tools/check-seo-meta.mjs [--root <dir>] [--json <file>] [--only <check,check>] [--quiet]
//
//   --root   site directory (default: the repo root, two levels above this script)
//   --json   also write {checks:[{id, pass, count, items}]} to <file>
//   --only   run only these check ids, comma separated
//   --quiet  print the summary lines only, without the per-check sections
//
// Noindex pages (a robots meta containing noindex) are excluded from the checks
// that name indexable pages and are listed in the report header. Text is measured
// after entity decoding and whitespace normalisation.

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';

const DEFAULT_ROOT = fileURLToPath(new URL('../../', import.meta.url));
const SITE_ORIGIN = 'https://ghosxt.com';
const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;
const FAQ_PREFIX_LENGTH = 40;
const DRAFT_FILES = new Set(['google-workspace-mac-it.html', 'it-for-audited-companies.html']);
const KEY_FACTS_EXEMPT = new Set([
  'index.html',
  '404.html',
  'privacy-policy.html',
  'contact.html',
  'support.html',
  'services.html',
  'service-area.html',
  'case-studies.html',
  'msp-partners.html',
]);
const OG_KEYS = ['og:type', 'og:url', 'og:title', 'og:description', 'og:image', 'og:site_name'];
const TWITTER_KEYS = ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'];
const BUSINESS_TYPES = ['LocalBusiness', 'Organization'];
const EM_DASH = '\u2014';
const VERIFY_MARKER = '[VERIFY';
const DENTAL_WORDS = /\b(?:dental|dentists?)\b/gi;

class UsageError extends Error {}

// ---------------------------------------------------------------- text helpers

const norm = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();
const lower = (value) => String(value ?? '').trim().toLowerCase();
const charCount = (text) => [...text].length;
const countOf = (text, needle) => text.split(needle).length - 1;
const verdict = (result) => (result.pass ? 'PASS' : 'FAIL');

// Browsers do not decode entities inside JSON-LD script text, so decode them here.
function decodeEntities(value) {
  return load(`<p>${String(value).replace(/</g, '&lt;')}</p>`)('p').text();
}

// ---------------------------------------------------------------- JSON-LD helpers

// Every plain object in a parsed JSON-LD value, at any depth (covers @graph and nested objects).
function objectsIn(value, out = []) {
  if (Array.isArray(value)) {
    for (const item of value) objectsIn(item, out);
  } else if (value !== null && typeof value === 'object') {
    out.push(value);
    for (const item of Object.values(value)) objectsIn(item, out);
  }
  return out;
}

function hasType(node, type) {
  const types = node['@type'];
  return Array.isArray(types) ? types.includes(type) : types === type;
}

function isNonEmpty(value) {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string') return value.trim() !== '';
  if (Array.isArray(value)) return value.some(isNonEmpty);
  if (typeof value === 'object') return Object.keys(value).length > 0;
  return true;
}

// Copy with keys sorted at every depth, so JSON.stringify ignores key order.
function sortKeys(value) {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, sortKeys(value[key])]));
  }
  return value;
}

// ---------------------------------------------------------------- page loading

async function listSiteFiles(root) {
  const files = [];
  for (const dir of ['', 'blog', 'case-studies']) {
    let entries;
    try {
      entries = await readdir(path.join(root, dir), { withFileTypes: true });
    } catch (err) {
      if (dir !== '' && err.code === 'ENOENT') continue;
      throw err;
    }
    const names = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
      .map((entry) => entry.name)
      .sort();
    files.push(...names.map((name) => (dir ? `${dir}/${name}` : name)));
  }
  return files;
}

// First non-empty content of the meta tag named or propertied `key`, whitespace-normalised.
function metaValue(meta, key) {
  return (meta.get(key) ?? []).map(norm).find(Boolean) ?? '';
}

async function loadPage(root, file) {
  const raw = await readFile(path.join(root, file), 'utf8');
  const $ = load(raw);

  // Meta tags keyed by their name and by their property (lower-cased).
  const meta = new Map();
  $('meta').each((_, el) => {
    for (const attribute of ['name', 'property']) {
      const key = lower($(el).attr(attribute));
      if (key) meta.set(key, [...(meta.get(key) ?? []), $(el).attr('content') ?? '']);
    }
  });

  // JSON-LD blocks: parsed data, or the parse error.
  const jsonld = [];
  $('script').each((_, el) => {
    if (lower($(el).attr('type')) !== 'application/ld+json') return;
    try {
      jsonld.push({ data: JSON.parse($(el).text()) });
    } catch (err) {
      jsonld.push({ error: err.message });
    }
  });

  const canonicals = $('link')
    .filter((_, el) => lower($(el).attr('rel')).split(/\s+/).includes('canonical'))
    .toArray()
    .map((el) => norm($(el).attr('href')));

  return {
    file,
    isRoot: !file.includes('/'),
    raw,
    $,
    meta,
    title: norm($('title').first().text()),
    jsonld,
    nodes: jsonld.filter((block) => 'data' in block).flatMap((block) => objectsIn(block.data)),
    canonicals,
    indexable: !(meta.get('robots') ?? []).some((content) => /noindex/i.test(content)),
  };
}

// Text of body with script and style removed, entity-decoded and whitespace-normalised. Cached per page.
function visibleText(page) {
  if (page.visible === undefined) {
    const body = page.$('body').clone();
    body.find('script, style').remove();
    page.visible = norm(body.text());
  }
  return page.visible;
}

// https://ghosxt.com plus the clean path: index.html -> /, blog/index.html -> /blog/, blog/foo.html -> /blog/foo.
function expectedCanonical(file) {
  if (file === 'index.html') return `${SITE_ORIGIN}/`;
  if (file.endsWith('/index.html')) return `${SITE_ORIGIN}/${file.slice(0, -'index.html'.length)}`;
  return `${SITE_ORIGIN}/${file.replace(/\.html$/, '')}`;
}

// Pages grouped by key (null keys are skipped); only groups with more than one page are returned.
function sharedGroups(pages, keyOf) {
  const groups = new Map();
  for (const page of pages) {
    const key = keyOf(page);
    if (key === null) continue;
    groups.set(key, [...(groups.get(key) ?? []), page.file]);
  }
  return [...groups].filter(([, files]) => files.length > 1);
}

const result = (id, items, count = items.length) => ({ id, pass: count === 0, count, items });

const hasBusinessNode = (page) =>
  page.nodes.some((node) => BUSINESS_TYPES.some((type) => hasType(node, type)));

function localBusinessEntries(pages) {
  return pages.flatMap((page) =>
    page.nodes.filter((node) => hasType(node, 'LocalBusiness')).map((node) => ({ file: page.file, node })),
  );
}

// Distinct values of one property across LocalBusiness nodes, with page counts and an example file.
function variantsOf(entries, read) {
  const variants = new Map();
  for (const { file, node } of entries) {
    const value = read(node);
    const key = value === undefined ? null : JSON.stringify(sortKeys(value));
    if (!variants.has(key)) {
      const display =
        value === undefined ? '(absent)' : typeof value === 'string' ? value : JSON.stringify(sortKeys(value));
      variants.set(key, { value: display, files: new Set() });
    }
    variants.get(key).files.add(file);
  }
  return [...variants.values()].map(({ value, files }) => ({ value, pages: files.size, example: [...files][0] }));
}

// Passes only when every compared property has exactly one variant across the site.
// Lists the variants of each property that has more than one.
function consistencyCheck(id, entries, fields) {
  const items = [];
  for (const [field, read] of Object.entries(fields)) {
    const variants = variantsOf(entries, read);
    if (variants.length > 1) items.push(...variants.map((variant) => ({ field, ...variant })));
  }
  return result(id, items);
}

// ---------------------------------------------------------------- checks

function checkTitleUnique({ indexable }) {
  const items = sharedGroups(indexable, (page) => page.title).map(([title, files]) => ({ title, files }));
  return result('title-unique', items);
}

function checkTitleLength({ pages }) {
  const items = pages
    .map((page) => ({ file: page.file, length: charCount(page.title), title: page.title }))
    .filter((row) => row.length > TITLE_MAX);
  return result('title-length', items);
}

function checkMetaLength({ pages }) {
  const items = [];
  for (const page of pages) {
    const description = metaValue(page.meta, 'description');
    const length = charCount(description);
    if (length === 0) {
      items.push({ file: page.file, length, problem: 'meta description missing' });
    } else if (length > DESCRIPTION_MAX) {
      items.push({ file: page.file, length, problem: `longer than ${DESCRIPTION_MAX}`, description });
    }
  }
  return result('meta-length', items);
}

function checkMetaUnique({ indexable }) {
  const groups = sharedGroups(indexable, (page) => metaValue(page.meta, 'description') || null);
  return result('meta-unique', groups.map(([description, files]) => ({ description, files })));
}

function checkH1Single({ pages }) {
  const items = pages
    .map((page) => ({ file: page.file, h1Count: page.$('h1').length }))
    .filter((row) => row.h1Count !== 1);
  return result('h1-single', items);
}

function checkCanonicalSelf({ pages }) {
  const items = [];
  for (const page of pages) {
    const expected = expectedCanonical(page.file);
    if (page.canonicals.length !== 1) {
      items.push({ file: page.file, problem: `${page.canonicals.length} canonical link tags`, expected });
    } else if (page.canonicals[0] !== expected) {
      items.push({ file: page.file, problem: 'href mismatch', href: page.canonicals[0], expected });
    }
  }
  return result('canonical-self', items);
}

function checkOgTwitter({ indexable }) {
  const items = [];
  for (const page of indexable) {
    const missing = [...OG_KEYS, ...TWITTER_KEYS].filter((key) => metaValue(page.meta, key) === '');
    if (missing.length) items.push({ file: page.file, missing });
  }
  return result('og-twitter', items);
}

function checkJsonldParse({ pages }) {
  const items = [];
  for (const page of pages) {
    page.jsonld.forEach((block, index) => {
      if ('error' in block) items.push({ file: page.file, block: index + 1, error: block.error });
    });
  }
  return result('jsonld-parse', items);
}

function checkBusinessNode({ indexable }) {
  const items = indexable.filter((page) => page.isRoot && !hasBusinessNode(page)).map((page) => ({ file: page.file }));
  return result('business-node', items);
}

const serviceName = (node) => (typeof node.name === 'string' && norm(node.name)) || '(no name)';

function checkServiceProvider({ pages }) {
  const items = [];
  for (const page of pages) {
    for (const node of page.nodes) {
      if (hasType(node, 'Service') && !isNonEmpty(node.provider)) {
        items.push({ file: page.file, service: serviceName(node) });
      }
    }
  }
  return result('service-provider', items);
}

function checkBreadcrumbs({ indexable }) {
  const items = indexable
    .filter((page) => page.isRoot && page.file !== 'index.html')
    .filter((page) => !page.nodes.some((node) => hasType(node, 'BreadcrumbList')))
    .map((page) => ({ file: page.file }));
  return result('breadcrumbs', items);
}

function checkFaqVisible({ pages }) {
  const items = [];
  for (const page of pages) {
    const faqNodes = page.nodes.filter((node) => hasType(node, 'FAQPage'));
    if (!faqNodes.length) continue;
    const questions = new Set(
      faqNodes
        .flatMap((faq) => objectsIn(faq))
        .filter((node) => hasType(node, 'Question'))
        .map((node) => (typeof node.name === 'string' ? norm(decodeEntities(node.name)) : '')),
    );
    const text = visibleText(page);
    const missing = [...questions].filter((question) => {
      const needle = question.slice(0, FAQ_PREFIX_LENGTH);
      return needle === '' || !text.includes(needle);
    });
    if (missing.length) items.push({ file: page.file, missing: missing.length, first: missing[0] });
  }
  return result('faq-visible', items);
}

function checkLocalBusinessConsistent({ pages }) {
  const entries = localBusinessEntries(pages);
  const fields = {
    name: (node) => node.name,
    telephone: (node) => node.telephone,
    address: (node) => node.address,
  };
  // Email is compared only when at least one LocalBusiness node carries one.
  if (entries.some(({ node }) => node.email !== undefined)) fields.email = (node) => node.email;
  return consistencyCheck('localbusiness-consistent', entries, fields);
}

function checkAreaServedConsistent({ pages }) {
  return consistencyCheck('areaserved-consistent', localBusinessEntries(pages), {
    areaServed: (node) => node.areaServed,
  });
}

function checkVerifyMarkers({ pages }) {
  const items = [];
  for (const page of pages) {
    const count = countOf(page.raw, VERIFY_MARKER);
    if (!count) continue;
    if (DRAFT_FILES.has(page.file)) {
      items.push({ file: page.file, count, info: true, note: 'allowed: noindex draft' });
    } else {
      items.push({ file: page.file, count });
    }
  }
  return result('verify-markers', items, items.filter((item) => !item.info).length);
}

function checkEmDash({ pages }) {
  const items = pages
    .map((page) => ({ file: page.file, count: countOf(page.raw, EM_DASH) }))
    .filter((row) => row.count > 0);
  return result('em-dash', items);
}

function checkDental({ pages }) {
  const items = [];
  for (const page of pages) {
    const words = [...page.raw.matchAll(DENTAL_WORDS)].map((match) => match[0].toLowerCase());
    if (words.length) items.push({ file: page.file, count: words.length, words: [...new Set(words)] });
  }
  return result('dental', items);
}

function checkKeyFacts({ indexable }) {
  const items = indexable
    .filter((page) => page.isRoot && !KEY_FACTS_EXEMPT.has(page.file))
    .filter((page) => !page.raw.includes('class="key-facts"'))
    .map((page) => ({ file: page.file }));
  return result('key-facts', items);
}

function checkSearchAction({ pages }) {
  const items = [];
  for (const page of pages) {
    for (const node of page.nodes) {
      if (hasType(node, 'SearchAction')) items.push({ file: page.file, target: node.target ?? '(no target)' });
    }
  }
  return result('search-action', items);
}

const CHECKS = [
  {
    id: 'title-unique',
    title: 'Indexable pages must not share a title tag.',
    run: checkTitleUnique,
  },
  {
    id: 'title-length',
    title: `Every title tag is ${TITLE_MAX} characters or fewer (decoded).`,
    run: checkTitleLength,
  },
  {
    id: 'meta-length',
    title: `Every page has a meta description of ${DESCRIPTION_MAX} characters or fewer.`,
    run: checkMetaLength,
  },
  {
    id: 'meta-unique',
    title: 'Indexable pages must not share a meta description.',
    run: checkMetaUnique,
  },
  { id: 'h1-single', title: 'Every page has exactly one h1.', run: checkH1Single },
  {
    id: 'canonical-self',
    title: `Exactly one canonical link per page, equal to ${SITE_ORIGIN} plus the clean path.`,
    run: checkCanonicalSelf,
  },
  {
    id: 'og-twitter',
    title: 'Indexable pages carry the Open Graph and Twitter card tags.',
    run: checkOgTwitter,
  },
  { id: 'jsonld-parse', title: 'Every JSON-LD script block parses as JSON.', run: checkJsonldParse },
  {
    id: 'business-node',
    title: 'Every indexable root page has a LocalBusiness or Organization node.',
    run: checkBusinessNode,
  },
  { id: 'service-provider', title: 'Every Service node has a non-empty provider.', run: checkServiceProvider },
  {
    id: 'breadcrumbs',
    title: 'Indexable root pages except index.html have a BreadcrumbList.',
    run: checkBreadcrumbs,
  },
  {
    id: 'faq-visible',
    title: 'Each FAQ question (first 40 characters) appears in the visible body text.',
    run: checkFaqVisible,
  },
  {
    id: 'localbusiness-consistent',
    title: 'LocalBusiness name, telephone, email and address are identical across the site.',
    run: checkLocalBusinessConsistent,
  },
  {
    id: 'areaserved-consistent',
    title: 'LocalBusiness areaServed is identical across the site.',
    run: checkAreaServedConsistent,
  },
  {
    id: 'verify-markers',
    title: 'No served file contains the text [VERIFY; noindex drafts are listed as info.',
    run: checkVerifyMarkers,
  },
  { id: 'em-dash', title: 'No served file contains an em dash (U+2014).', run: checkEmDash },
  { id: 'dental', title: 'No served file contains the words dental, dentist or dentists.', run: checkDental },
  {
    id: 'key-facts',
    title: 'Indexable root pages outside the exempt list contain class="key-facts".',
    run: checkKeyFacts,
  },
  { id: 'search-action', title: 'No SearchAction node appears in any JSON-LD block.', run: checkSearchAction },
];

const USAGE = `Usage: node tools/check-seo-meta.mjs [--root <dir>] [--json <file>] [--only <check,check>] [--quiet]
Checks: ${CHECKS.map((check) => check.id).join(', ')}
`;

// ---------------------------------------------------------------- arguments and runner

function parseArgs(argv) {
  const opts = { root: DEFAULT_ROOT, json: null, only: null, quiet: false, help: false };
  const valueFlags = { '--root': 'root', '--json': 'json', '--only': 'only' };
  for (let i = 0; i < argv.length; i++) {
    let flag = argv[i];
    let inline;
    const eq = flag.indexOf('=');
    if (flag.startsWith('--') && eq > 0) {
      inline = flag.slice(eq + 1);
      flag = flag.slice(0, eq);
    }
    if (flag === '--help' || flag === '-h') {
      opts.help = true;
    } else if (flag === '--quiet') {
      if (inline !== undefined) throw new UsageError('--quiet takes no value');
      opts.quiet = true;
    } else if (valueFlags[flag]) {
      const value = inline ?? argv[++i];
      if (value === undefined || value.startsWith('--')) throw new UsageError(`${flag} needs a value`);
      opts[valueFlags[flag]] = value;
    } else {
      throw new UsageError(`unknown argument: ${flag}`);
    }
  }
  return opts;
}

function resolveOnly(value) {
  if (value === null) return null;
  const ids = value.split(',').map((id) => id.trim()).filter(Boolean);
  const known = new Set(CHECKS.map((check) => check.id));
  const unknown = ids.filter((id) => !known.has(id));
  if (!ids.length || unknown.length) {
    throw new UsageError(`--only: unknown or empty check id(s): ${unknown.join(', ') || '(none given)'}`);
  }
  return ids;
}

// ---------------------------------------------------------------- renderer

function formatValue(value) {
  if (Array.isArray(value)) return value.map(formatValue).join(', ');
  return JSON.stringify(value);
}

function formatItem(item) {
  return Object.entries(item)
    .filter(([key]) => key !== 'info')
    .map(([key, value]) => `${key}: ${formatValue(value)}`)
    .join('; ');
}

function renderMarkdown(ctx, results, quiet) {
  const lines = [
    '# SEO and structured-data check',
    '',
    `Site root: ${ctx.root}`,
    `Pages scanned: ${ctx.pages.length} (indexable ${ctx.pages.length - ctx.noindex.length}, `
      + `noindex ${ctx.noindex.length})`,
  ];
  if (ctx.noindex.length) lines.push(`Noindex pages (excluded from indexable checks): ${ctx.noindex.join(', ')}`);

  lines.push('', '## Summary', '');
  for (const r of results) lines.push(`- ${r.id}: ${verdict(r)} (${r.count})`);
  if (quiet) return `${lines.join('\n')}\n`;

  for (const r of results) {
    const check = CHECKS.find((candidate) => candidate.id === r.id);
    lines.push('', `## ${r.id}: ${verdict(r)} (${r.count})`, '', check.title, '');
    const offending = r.items.filter((item) => !item.info);
    const info = r.items.filter((item) => item.info);
    if (!offending.length) lines.push('No offending items.');
    for (const item of offending) lines.push(`- ${formatItem(item)}`);
    if (info.length) {
      lines.push('', 'Info:');
      for (const item of info) lines.push(`- ${formatItem(item)}`);
    }
  }
  return `${lines.join('\n')}\n`;
}

// ---------------------------------------------------------------- main

async function main(argv) {
  const opts = parseArgs(argv);
  if (opts.help) {
    process.stdout.write(USAGE);
    return 0;
  }
  const ids = resolveOnly(opts.only);
  const root = path.resolve(opts.root);

  const files = await listSiteFiles(root);
  const pages = await Promise.all(files.map((file) => loadPage(root, file)));
  const ctx = {
    root,
    pages,
    indexable: pages.filter((page) => page.indexable),
    noindex: pages.filter((page) => !page.indexable).map((page) => page.file),
  };

  const results = CHECKS.filter((check) => !ids || ids.includes(check.id)).map((check) => check.run(ctx));
  process.stdout.write(renderMarkdown(ctx, results, opts.quiet));

  if (opts.json) {
    const jsonPath = path.resolve(opts.json);
    await mkdir(path.dirname(jsonPath), { recursive: true });
    const checks = results.map(({ id, pass, count, items }) => ({ id, pass, count, items }));
    await writeFile(jsonPath, `${JSON.stringify({ checks }, null, 2)}\n`);
  }
  return results.every((r) => r.pass) ? 0 : 1;
}

main(process.argv.slice(2)).then(
  (code) => {
    process.exitCode = code;
  },
  (err) => {
    process.stderr.write(`check-seo-meta: ${err.message}\n`);
    if (err instanceof UsageError) process.stderr.write(USAGE);
    process.exitCode = 2;
  },
);
