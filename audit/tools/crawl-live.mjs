#!/usr/bin/env node
// crawl-live.mjs
//
// Full crawl of the LIVE site (default https://ghosxt.com).
//
// Breadth-first, same-host HTML crawl. Redirects are followed by hand so every
// hop is recorded. Each 200 HTML page is parsed for SEO, social, JSON-LD, image,
// link and header data. Internal, asset and external links are checked. The
// sitemap, robots.txt and host/scheme variants are checked. A Markdown report
// is written at the end.
//
// Outputs in --out: pages.json, links.json, redirects.json, external-links.json,
// assets.json, report.md. Run with --help for the options.
//
// With --origin on another host (a local mirror), --site-host names the
// production host: URLs on it are fetched from --origin instead.

import { load } from "cheerio";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fetchRaw, probeStatus } from "../lib/fetch.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const AUDIT_DIR = path.resolve(HERE, "..");

const MAX_HOPS = 6;
const FETCH_TIMEOUT_MS = 45000;
const EXTERNAL_TIMEOUT_MS = 20000;
const EXTERNAL_CONCURRENCY = 6;
const REFERRER_SAMPLE = 5;
// Same-host hrefs whose path ends in one of these are recorded as asset links
// and probed once with probeStatus. They are never crawled as pages.
const ASSET_RE = /\.(xml|txt|png|jpe?g|gif|webp|avif|svg|ico|css|js|pdf|woff2?|mp4|webm|json|map|zip)$/i;

const HELP = `Usage: node tools/crawl-live.mjs [options]

Full live crawl: breadth-first same-host HTML crawl with manual redirect
tracking, link checks, SEO / social / JSON-LD / image / header extraction,
sitemap and robots checks, host and scheme checks, and report.md.

Options:
  --origin <url>      Origin to crawl (default https://ghosxt.com)
  --site-host <host>  Production host to map onto --origin when --origin is on
                      another host, such as a local mirror (default ghosxt.com).
                      Seeds, --urls entries, sitemap locs and absolute links on
                      <host> or www.<host> are fetched from --origin instead.
                      Page records keep the original URL as sourceUrl.
  --urls <file>       Seed list, one absolute URL per line
                      (default audit/baseline/urls.txt)
  --out <dir>         Output directory (default audit/baseline/crawl)
  --concurrency <n>   Parallel page fetches (default 6)
  --limit <n>         Fetch only the first n seeds and do not follow discovered
                      links. Link status probes (assets, canonicals, externals)
                      still run for links found on the fetched pages.
  --no-external       Do not probe external links
  --force             Re-crawl even when the outputs already exist
  --help              Show this help

Seeds, in order: "/", every URL in --urls, every <loc> in <origin>/sitemap.xml.
Outputs: pages.json, links.json, redirects.json, external-links.json,
assets.json, report.md
`;

// Run-wide configuration, set once in main(). host is the origin's host, siteHost
// the production host, and mirror is true when --origin is not on siteHost.
const cfg = { origin: "", host: "", siteHost: "", mirror: false, follow: true };

// Run-wide crawl state.
const state = {
  results: new Map(), // fetched target -> result record (final status, chain)
  claimed: new Set(), // targets queued or resolved; each is fetched at most once
  pages: [], // parsed 200 text/html page records
  parseErrors: [], // {url, error} for pages whose parsing threw
  links: [], // {from, to, raw, kind} for page, asset and canonical links
  externals: new Map(), // external url -> ref entry (status set by probe)
  assets: new Map(), // asset target -> ref entry (status set by probe)
  canonicalTargets: new Set(), // on-host canonical targets that differ from their page
  seedSources: new Map(), // seed target -> [source labels]
  seedOrder: [], // unique same-host seeds, in order
  seedInputs: 0,
  sitemapFiles: [],
  sitemapEntries: [], // {loc, lastmod}
  robots: null,
  hosts: [],
  visited: 0,
  sourceUrls: new Map(), // local target -> first original (site host) URL seen for it, mirror runs only
};

const log = (msg) => console.error(msg);

function short(err) {
  const code = err?.cause?.code || err?.code;
  const msg = err?.message || String(err);
  return (code ? `${code}: ${msg}` : msg).slice(0, 160);
}

function firstHeader(v) {
  return (Array.isArray(v) ? v[0] : v) ?? null;
}

function hdr(resp, name) {
  return firstHeader(resp?.headers?.[name]);
}

function isHtmlResponse(resp) {
  return /text\/html|application\/xhtml\+xml/i.test(hdr(resp, "content-type") || "");
}

function fmtStatus(s) {
  if (s === null || s === undefined) return "not fetched";
  if (s === 0) return "0 (unreachable)";
  return String(s);
}

function byUrl(a, b) {
  return String(a.url).localeCompare(String(b.url));
}

function cell(v) {
  return String(v).replace(/\|/g, "\\|");
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

// URL helpers. A target is an absolute URL without hash; on-host targets also
// lose the query. A key is the target with its trailing slash removed (root
// stays "/"); keys match sitemap entries and link destinations.
function stripHashOnly(u) {
  const x = new URL(u);
  x.hash = "";
  return x.href;
}

function stripHashQuery(u) {
  const x = new URL(u);
  x.hash = "";
  x.search = "";
  return x.href;
}

function onHost(u) {
  try {
    const x = new URL(u);
    return /^https?:$/.test(x.protocol) && x.hostname === cfg.host;
  } catch {
    return false;
  }
}

// Mirror runs only: a URL on the site host (or www. of it) is fetched from
// --origin instead, keeping path, query and hash. The first original seen for
// each local target is kept for sourceUrl. Other URLs are returned unchanged.
function toOrigin(u) {
  if (!cfg.mirror) return u;
  let x;
  try {
    x = new URL(u);
  } catch {
    return u;
  }
  if (!/^https?:$/.test(x.protocol)) return u;
  if (x.hostname !== cfg.siteHost && x.hostname !== `www.${cfg.siteHost}`) return u;
  const local = `${cfg.origin}${x.pathname}${x.search}${x.hash}`;
  const key = normTarget(local);
  const original = stripHashQuery(x.href);
  if (original !== key && !state.sourceUrls.has(key)) state.sourceUrls.set(key, original);
  return local;
}

function normTarget(u) {
  return onHost(u) ? stripHashQuery(u) : stripHashOnly(u);
}

function keyOf(u) {
  const x = new URL(u);
  let p = x.pathname;
  if (p.length > 1) p = p.replace(/\/+$/, "") || "/";
  return `${x.origin}${p}`;
}

function isWww(u) {
  try {
    return new URL(u).hostname === `www.${cfg.siteHost}`;
  } catch {
    return false;
  }
}

function claim(target) {
  if (state.claimed.has(target)) return false;
  state.claimed.add(target);
  return true;
}

function makeRefEntry(fields) {
  return { ...fields, status: undefined, refKeys: new Set(), referrers: [] };
}

function addReferrer(entry, from, raw) {
  const k = `${from}\n${raw}`;
  if (entry.refKeys.has(k)) return;
  entry.refKeys.add(k);
  if (entry.referrers.length < REFERRER_SAMPLE) entry.referrers.push({ from, raw });
}

function noteExternal(url, from, raw) {
  const u = stripHashOnly(url);
  let e = state.externals.get(u);
  if (!e) {
    e = makeRefEntry({ url: u, www: isWww(u) });
    state.externals.set(u, e);
  }
  addReferrer(e, from, raw);
}

function noteAsset(target, from, raw) {
  let a = state.assets.get(target);
  if (!a) {
    a = makeRefEntry({ url: target });
    state.assets.set(target, a);
  }
  addReferrer(a, from, raw);
}

function addSeed(raw, source) {
  let target;
  try {
    target = normTarget(toOrigin(new URL(raw, cfg.origin).href));
    if (!/^https?:$/.test(new URL(target).protocol)) return;
  } catch {
    return;
  }
  state.seedInputs++;
  const sources = state.seedSources.get(target);
  if (sources) {
    sources.push(source);
    return;
  }
  state.seedSources.set(target, [source]);
  if (onHost(target)) state.seedOrder.push(target);
  else noteExternal(target, `(seed: ${source})`, raw);
}

function parseSitemap(xml) {
  const $ = load(xml, { xmlMode: true });
  const urls = [];
  const children = [];
  $("url").each((_, el) => {
    const loc = $(el).children("loc").first().text().trim();
    const lastmod = $(el).children("lastmod").first().text().trim();
    if (loc) urls.push({ loc, lastmod: lastmod || null });
  });
  $("sitemap").each((_, el) => {
    const loc = $(el).children("loc").first().text().trim();
    if (loc) children.push(loc);
  });
  if (!urls.length && !children.length) {
    $("loc").each((_, el) => {
      const loc = $(el).text().trim();
      if (loc) urls.push({ loc, lastmod: null });
    });
  }
  return { urls, children };
}

// Reads the sitemap and, one level down, any child sitemaps of an index.
async function readSitemaps(rootUrl) {
  const queue = [{ url: rootUrl, depth: 0 }];
  for (let i = 0; i < queue.length; i++) {
    const { url, depth } = queue[i];
    const file = { url, status: 0, urls: 0, error: null };
    state.sitemapFiles.push(file);
    try {
      const r = await fetchRaw(url, { timeoutMs: FETCH_TIMEOUT_MS });
      file.status = r.status;
      if (r.status !== 200) continue;
      const parsed = parseSitemap(r.body.toString("utf8"));
      file.urls = parsed.urls.length;
      state.sitemapEntries.push(...parsed.urls);
      if (depth < 2) for (const child of parsed.children) queue.push({ url: toOrigin(child), depth: depth + 1 });
    } catch (e) {
      file.error = short(e);
    }
  }
}

// Fetches one URL without following redirects, then follows Location headers by
// hand (at most MAX_HOPS). Every hop is recorded in chain.
async function fetchChain(startUrl) {
  const started = Date.now();
  const chain = [];
  let url = startUrl;
  for (;;) {
    let resp;
    try {
      resp = await fetchRaw(url, { maxRedirections: 0, timeoutMs: FETCH_TIMEOUT_MS });
    } catch (e) {
      return { chain, finalUrl: url, status: 0, error: short(e), ms: Date.now() - started, response: null, unresolved: false };
    }
    const location = firstHeader(resp.headers.location);
    const isRedirect = resp.status >= 300 && resp.status < 400 && Boolean(location);
    if (!isRedirect) {
      return { chain, finalUrl: url, status: resp.status, error: null, ms: Date.now() - started, response: resp, unresolved: false };
    }
    if (chain.length >= MAX_HOPS) {
      return { chain, finalUrl: url, status: resp.status, error: `more than ${MAX_HOPS} redirects`, ms: Date.now() - started, response: null, unresolved: true };
    }
    let next;
    try {
      next = toOrigin(new URL(location, url).href);
    } catch {
      return { chain, finalUrl: url, status: resp.status, error: `bad Location header: ${String(location).slice(0, 100)}`, ms: Date.now() - started, response: null, unresolved: true };
    }
    chain.push({ url, status: resp.status, location });
    url = next;
  }
}

function storeResult(target, r, via, depth) {
  const rec = {
    url: target,
    finalUrl: r.finalUrl,
    status: r.status,
    firstStatus: r.chain.length ? r.chain[0].status : r.status,
    chain: r.chain,
    error: r.error ?? null,
    via,
    depth,
    redirectedFrom: null,
    responseMs: r.ms,
    contentType: hdr(r.response, "content-type"),
  };
  state.results.set(target, rec);
  return rec;
}

function collectTypes(node, out = new Set()) {
  if (Array.isArray(node)) {
    for (const n of node) collectTypes(n, out);
  } else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      if (k === "@type") {
        for (const t of Array.isArray(v) ? v : [v]) if (typeof t === "string") out.add(t);
      } else {
        collectTypes(v, out);
      }
    }
  }
  return out;
}

function parseJsonLd($) {
  return $("script[type]")
    .toArray()
    .filter((el) => /application\/ld\+json/i.test($(el).attr("type") || ""))
    .map((el) => {
      const raw = $(el).text().trim();
      if (!raw) return { ok: false, error: "empty JSON-LD block", types: [] };
      try {
        return { ok: true, error: null, types: [...collectTypes(JSON.parse(raw))] };
      } catch (e) {
        return { ok: false, error: short(e), types: [] };
      }
    });
}

// Extracts one page record and its links. Returns the on-host page targets it
// links to (the caller decides whether to follow them).
function parsePage(pageUrl, redirectedFrom, r, depth) {
  const resp = r.response;
  const $ = load(resp.body.toString("utf8"));
  const discovered = [];
  const internalKeys = new Set();
  const externalUrls = new Set();
  const tel = new Set();
  const mail = new Set();
  let badHrefs = 0;

  const meta = (name) => {
    const v = $(`meta[name="${name}"], meta[property="${name}"]`).first().attr("content");
    return v && v.trim() ? v.trim() : null;
  };

  // Canonical link. Self-canonicals are recorded as links but not probed.
  const canonEls = $('link[rel="canonical"]');
  const canonicalRaw = (canonEls.first().attr("href") || "").trim() || null;
  let canonicalAbs = null;
  let canonicalTarget = null;
  if (canonicalRaw) {
    try {
      const abs = new URL(toOrigin(new URL(canonicalRaw, pageUrl).href));
      if (/^https?:$/.test(abs.protocol)) {
        canonicalAbs = stripHashOnly(abs.href);
        canonicalTarget = normTarget(abs.href);
        if (onHost(canonicalTarget)) {
          state.links.push({ from: pageUrl, to: canonicalTarget, raw: canonicalRaw, kind: "canonical" });
          if (keyOf(canonicalTarget) !== keyOf(pageUrl)) state.canonicalTargets.add(canonicalTarget);
        } else {
          noteExternal(canonicalTarget, pageUrl, `canonical ${canonicalRaw}`);
        }
      }
    } catch {
      badHrefs++;
    }
  }

  // Anchors.
  $("a[href]").each((_, el) => {
    const raw = ($(el).attr("href") || "").trim();
    if (!raw || raw.startsWith("#") || /^javascript:/i.test(raw)) return;
    if (/^tel:/i.test(raw)) {
      const digits = raw.replace(/^tel:/i, "").replace(/[^\d+]/g, "");
      if (digits) tel.add(digits);
      return;
    }
    if (/^mailto:/i.test(raw)) {
      const addr = raw.replace(/^mailto:/i, "").split("?")[0].trim().toLowerCase();
      if (addr) mail.add(addr);
      return;
    }
    let abs;
    try {
      abs = new URL(toOrigin(new URL(raw, pageUrl).href));
    } catch {
      badHrefs++;
      return;
    }
    if (!/^https?:$/.test(abs.protocol)) return;
    if (abs.hostname !== cfg.host) {
      const ext = stripHashOnly(abs.href);
      externalUrls.add(ext);
      noteExternal(ext, pageUrl, raw);
      return;
    }
    if (abs.pathname.startsWith("/assets/")) return;
    const target = stripHashQuery(abs.href);
    if (ASSET_RE.test(abs.pathname)) {
      noteAsset(target, pageUrl, raw);
      state.links.push({ from: pageUrl, to: target, raw, kind: "asset" });
      return;
    }
    state.links.push({ from: pageUrl, to: target, raw, kind: "page" });
    internalKeys.add(keyOf(target));
    discovered.push(target);
  });

  // Images.
  const imgs = $("img")
    .toArray()
    .map((el) => {
      const $el = $(el);
      return {
        src: $el.attr("src") || "",
        hasAlt: $el.attr("alt") !== undefined,
        hasDims: Boolean($el.attr("width")) && Boolean($el.attr("height")),
        lazy: ($el.attr("loading") || "").trim().toLowerCase() === "lazy",
      };
    });
  const missingAlt = imgs.filter((i) => !i.hasAlt);

  const title = $("head title").first().text().replace(/\s+/g, " ").trim() || null;
  const metaDescription = meta("description");
  const h1 = $("h1")
    .toArray()
    .map((el) => $(el).text().replace(/\s+/g, " ").trim());
  const jsonLd = parseJsonLd($);
  const hstsValue = hdr(resp, "strict-transport-security");
  const cspValue = hdr(resp, "content-security-policy");

  // Visible text, without script, style, noscript or template content. Done last
  // because it removes nodes from the document.
  const bodyText = $("body").find("script, style, noscript, template").remove().end().text().replace(/\s+/g, " ").trim();

  const sourceUrl = state.sourceUrls.get(pageUrl);
  const rec = {
    url: pageUrl,
    ...(sourceUrl ? { sourceUrl } : {}),
    redirectedFrom,
    depth,
    status: r.status,
    finalUrl: r.finalUrl,
    responseMs: r.ms,
    htmlBytes: resp.body.length,
    title,
    titleLength: title ? [...title].length : 0,
    metaDescription,
    metaDescriptionLength: metaDescription ? [...metaDescription].length : 0,
    metaDescriptionCount: $('meta[name="description"]').length,
    canonical: canonicalRaw,
    canonicalAbs,
    canonicalTarget,
    canonicalCount: canonEls.length,
    robotsMeta: meta("robots"),
    xRobotsTag: hdr(resp, "x-robots-tag"),
    lang: $("html").attr("lang") || null,
    h1,
    h2Count: $("h2").length,
    og: { title: meta("og:title"), description: meta("og:description"), image: meta("og:image") },
    twitter: { card: meta("twitter:card"), image: meta("twitter:image") },
    hasRssAlternate: $('link[rel="alternate"]')
      .toArray()
      .some((el) => /rss|atom/i.test($(el).attr("type") || "")),
    jsonLd,
    images: {
      count: imgs.length,
      missingAltCount: missingAlt.length,
      withoutDimensionsCount: imgs.filter((i) => !i.hasDims).length,
      lazyCount: imgs.filter((i) => i.lazy).length,
      missingAltSamples: missingAlt.slice(0, 3).map((i) => i.src.slice(0, 160)),
    },
    internalLinks: [...internalKeys],
    externalLinks: [...externalUrls],
    telLinks: [...tel],
    mailtoLinks: [...mail],
    badHrefs,
    textLength: bodyText.length,
    headers: {
      contentType: hdr(resp, "content-type"),
      cacheControl: hdr(resp, "cache-control"),
      contentEncoding: hdr(resp, "content-encoding"),
      strictTransportSecurity: hstsValue,
      hstsPresent: Boolean(hstsValue),
      contentSecurityPolicyPresent: Boolean(cspValue),
    },
  };
  state.pages.push(rec);
  return discovered;
}

function parseInto(pageUrl, redirectedFrom, r, depth, push) {
  let discovered = [];
  try {
    discovered = parsePage(pageUrl, redirectedFrom, r, depth);
  } catch (e) {
    state.parseErrors.push({ url: pageUrl, error: short(e) });
    log(`  ! parse failed for ${pageUrl}: ${short(e)}`);
    return;
  }
  pushDiscovered(discovered, depth + 1, push);
}

function pushDiscovered(targets, depth, push) {
  if (!cfg.follow) return;
  const fresh = [];
  for (const t of targets) if (claim(t)) fresh.push({ target: t, depth, via: "link" });
  if (fresh.length) push(fresh);
}

// Handles one queued target: fetch it, store the result, and parse it when it is
// a 200 HTML page. A redirect's final response is recorded under its own key
// (once), and parsed there if it is an HTML page.
async function visitItem(item, push) {
  const r = await fetchChain(item.target);
  storeResult(item.target, r, item.via, item.depth);
  state.visited++;
  const hops = r.chain.length ? ` via ${r.chain.length} redirect(s) to ${r.finalUrl}` : "";
  log(`[${state.visited}] ${r.status} ${item.target}${hops}`);

  if (!r.chain.length && r.status === 200 && r.response && isHtmlResponse(r.response)) {
    parseInto(item.target, null, r, item.depth, push);
    return;
  }
  if (r.chain.length && !r.unresolved && r.finalUrl !== item.target && onHost(r.finalUrl)) {
    const finalKey = normTarget(r.finalUrl);
    if (claim(finalKey)) {
      const fr = storeResult(finalKey, { ...r, chain: [], finalUrl: finalKey }, "redirect-final", item.depth);
      fr.redirectedFrom = item.target;
      if (r.status === 200 && r.response && isHtmlResponse(r.response)) {
        parseInto(finalKey, item.target, r, item.depth, push);
      }
    }
  }
}

async function runPool(initial, concurrency, handler) {
  const queue = [...initial];
  const push = (items) => queue.push(...items);
  let head = 0;
  let inFlight = 0;
  await new Promise((resolve) => {
    const pump = () => {
      while (inFlight < concurrency && head < queue.length) {
        const item = queue[head++];
        inFlight++;
        handler(item, push)
          .catch((e) => {
            log(`  ! ${item.target}: ${short(e)}`);
            storeResult(item.target, { chain: [], finalUrl: item.target, status: 0, error: short(e), ms: 0, response: null, unresolved: false }, item.via, item.depth);
          })
          .finally(() => {
            inFlight--;
            pump();
          });
      }
      if (inFlight === 0 && head >= queue.length) resolve();
    };
    pump();
  });
}

async function mapLimit(items, limit, fn) {
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      await fn(items[i], i);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
}

async function safeProbe(url, options) {
  try {
    return await probeStatus(url, options);
  } catch {
    return 0;
  }
}

// Status-only fetches for canonical targets that the crawl did not fetch. The
// response is not parsed and nothing is followed.
async function probeCanonicals(concurrency) {
  const todo = [...state.canonicalTargets].filter((t) => !state.results.has(t));
  log(`[canonical] fetching ${todo.length} canonical targets not already fetched (status only)`);
  await mapLimit(todo, concurrency, async (t) => {
    try {
      const r = await fetchChain(t);
      storeResult(t, r, "canonical-probe", null);
    } catch (e) {
      storeResult(t, { chain: [], finalUrl: t, status: 0, error: short(e), ms: 0, response: null }, "canonical-probe", null);
    }
  });
}

async function probeAssets(concurrency) {
  const list = [...state.assets.values()];
  log(`[assets] probing ${list.length} asset links`);
  await mapLimit(list, concurrency, async (a) => {
    a.status = await safeProbe(a.url, {});
  });
}

async function probeExternals() {
  const list = [...state.externals.values()];
  log(`[external] probing ${list.length} external URLs (concurrency ${EXTERNAL_CONCURRENCY})`);
  let done = 0;
  await mapLimit(list, EXTERNAL_CONCURRENCY, async (e) => {
    e.status = await safeProbe(e.url, { timeoutMs: EXTERNAL_TIMEOUT_MS });
    done++;
    if (done % 25 === 0) log(`  external ${done}/${list.length}`);
  });
}

// Host and scheme variants, with redirects not followed. A local mirror gets only
// the path checks, run against --origin.
async function hostChecks() {
  const host = cfg.host;
  const urls = cfg.mirror
    ? [
        `${cfg.origin}/index.html`,
        `${cfg.origin}/salinas/`,
        `${cfg.origin}/salinas.html`,
        `${cfg.origin}/blog`,
        `${cfg.origin}/blog/index.html`,
        `${cfg.origin}/does-not-exist-404-check`,
      ]
    : [
        `http://${host}/`,
        `https://www.${host}/`,
        `https://${host}/index.html`,
        `https://${host}/salinas/`,
        `https://${host}/salinas.html`,
        `https://${host}/blog`,
        `https://${host}/blog/index.html`,
        `https://${host}/does-not-exist-404-check`,
      ];
  const rows = [];
  for (const url of urls) {
    try {
      const r = await fetchRaw(url, { maxRedirections: 0, timeoutMs: FETCH_TIMEOUT_MS });
      rows.push({ url, status: r.status, location: firstHeader(r.headers.location), error: null });
    } catch (e) {
      rows.push({ url, status: 0, location: null, error: short(e) });
    }
  }
  return rows;
}

async function fetchRobots(origin) {
  const url = `${origin}/robots.txt`;
  try {
    const r = await fetchRaw(url, { maxRedirections: 0, timeoutMs: FETCH_TIMEOUT_MS });
    const lines = r.body.toString("utf8").split(/\r?\n/).map((l) => l.trim());
    // Tag each Disallow line with the user-agent group(s) it belongs to.
    const disallow = [];
    let agents = [];
    let inAgentLines = false;
    for (const line of lines) {
      const ua = line.match(/^user-agent:\s*(.+)$/i);
      if (ua) {
        if (!inAgentLines) agents = [];
        agents.push(ua[1].trim());
        inAgentLines = true;
        continue;
      }
      if (line && !line.startsWith("#")) inAgentLines = false;
      if (/^disallow:/i.test(line)) disallow.push(`${line} [user-agent: ${agents.join(", ") || "none declared"}]`);
    }
    return {
      url,
      status: r.status,
      location: firstHeader(r.headers.location),
      contentType: hdr(r, "content-type"),
      disallow,
      sitemap: lines.filter((l) => /^sitemap:/i.test(l)),
      error: null,
    };
  } catch (e) {
    return { url, status: 0, location: null, contentType: null, disallow: [], sitemap: [], error: short(e) };
  }
}

// Indexes built after the crawl: referrers per target, and inbound page-to-page
// link sources per key.
function buildIndexes() {
  const linkIndex = new Map();
  const seenLink = new Set();
  const addLink = (rec) => {
    const k = `${rec.to}\n${rec.from}\n${rec.raw}`;
    if (seenLink.has(k)) return;
    seenLink.add(k);
    if (!linkIndex.has(rec.to)) linkIndex.set(rec.to, []);
    linkIndex.get(rec.to).push(rec);
  };
  for (const l of state.links) addLink(l);
  for (const [target, sources] of state.seedSources) {
    for (const s of sources) addLink({ from: `(seed: ${s})`, to: target, raw: target, kind: "seed" });
  }
  const inbound = new Map();
  for (const l of state.links) {
    if (l.kind !== "page") continue;
    const fk = keyOf(l.from);
    const tk = keyOf(l.to);
    if (fk === tk) continue;
    if (!inbound.has(tk)) inbound.set(tk, new Set());
    inbound.get(tk).add(fk);
  }
  return { linkIndex, inbound };
}

function sitemapRowsOf() {
  const rows = new Map();
  for (const e of state.sitemapEntries) {
    let target;
    let key;
    try {
      target = normTarget(toOrigin(e.loc));
      key = keyOf(target);
    } catch {
      continue;
    }
    if (!rows.has(key)) rows.set(key, { loc: e.loc, target, key, lastmod: e.lastmod });
  }
  return [...rows.values()];
}

function countUniqueInternal() {
  const keys = new Set();
  const add = (u) => {
    try {
      keys.add(keyOf(u));
    } catch {
      /* skip unparseable */
    }
  };
  for (const t of state.results.keys()) add(t);
  for (const p of state.pages) add(p.url);
  for (const l of state.links) if (l.kind !== "asset") add(l.to);
  for (const t of state.seedOrder) add(t);
  return keys.size;
}

// Status of a target: on-host from the crawl results, off-host from the external
// probe. Returns null when the target was not fetched or probed.
function statusOf(url) {
  const t = normTarget(url);
  if (onHost(t)) {
    const r = state.results.get(t);
    return r ? r.status : null;
  }
  const e = state.externals.get(t);
  return e && e.status !== undefined ? e.status : null;
}

function describeTarget(t) {
  if (onHost(t)) {
    const r = state.results.get(t);
    if (!r) return "not fetched";
    return `returned ${fmtStatus(r.status)}${r.chain.length ? ` after ${r.chain.length} redirect(s)` : ""}`;
  }
  const e = state.externals.get(normTarget(t));
  if (!e || e.status === undefined) return "off-host, not probed";
  return `off-host, returned ${fmtStatus(e.status)}`;
}

function chainText(r) {
  const hops = r.chain.map((c) => `${c.status} ${c.url} -> ${c.location}`);
  return [...hops, `final ${fmtStatus(r.status)} ${r.finalUrl}`].join(" ; ");
}

function histogram(values) {
  const m = new Map();
  for (const v of values) {
    const k = fmtStatus(v);
    m.set(k, (m.get(k) || 0) + 1);
  }
  return [...m].sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }));
}

function dupGroups(list, pick) {
  const m = new Map();
  for (const p of list) {
    const v = pick(p);
    if (!v) continue;
    if (!m.has(v)) m.set(v, []);
    m.get(v).push(p.url);
  }
  return [...m].filter(([, urls]) => urls.length > 1).map(([value, urls]) => ({ value, urls }));
}

function renderReport(ctx) {
  const { opts, elapsedSec, startedIso, limited, seedsFetched, uniqueUrls, linkIndex, inbound, sitemapRows, unfetchedCount } = ctx;
  const pages = [...state.pages].sort(byUrl);
  const results = [...state.results.values()].sort(byUrl);
  const externals = [...state.externals.values()].sort(byUrl);
  const assets = [...state.assets.values()].sort(byUrl);
  const sitemapKeys = new Set(sitemapRows.map((r) => r.key));
  const refsOf = (t) => linkIndex.get(t) || [];
  const out = [];
  const H = (t) => out.push(`## ${t}`, "");
  const P = (t) => out.push(t, "");
  const L = (items, empty = "None.") => {
    if (!items.length) out.push(empty);
    for (const i of items) out.push(`- ${i}`);
    out.push("");
  };
  const sub = (label, items, empty) => {
    out.push(`**${label}** (${items.length})`, "");
    L(items, empty);
  };
  const refBlock = (head, count, sample) => {
    if (!count) return `${head}; no referrers recorded`;
    const lines = sample.slice(0, REFERRER_SAMPLE).map((r) => `  - from ${r.from} href "${r.raw}"`);
    return [`${head}; ${count} referrer(s):`, ...lines].join("\n");
  };

  out.push(`# Live crawl report: ${cfg.origin}`, "");
  P(`Generated ${startedIso}; elapsed ${elapsedSec}s; written by tools/crawl-live.mjs.`);
  P(
    limited
      ? `LIMITED RUN (--limit ${opts.limit}): only the first ${seedsFetched} seeds were fetched and discovered links were not followed. Sections 6 and 7, and every "not fetched" entry, are not meaningful in this mode.`
      : "Full crawl: breadth-first, same host, every discovered link followed.",
  );
  P(opts.noExternal ? "External links were not probed (--no-external)." : "External links were probed once each.");
  if (cfg.mirror) P(`Mirror run: --origin ${cfg.origin} is not the site host ${cfg.siteHost}; URLs on ${cfg.siteHost} and www.${cfg.siteHost} were fetched from the origin.`);

  H("1 Totals");
  L([
    `Seeds: ${state.seedOrder.length} unique same-host seeds from ${state.seedInputs} inputs ("/", urls.txt, sitemap.xml); off-host seeds are listed as externals`,
    `Seeds fetched: ${seedsFetched}`,
    `Crawled HTML pages (200 text/html): ${pages.length}`,
    `Unique internal URLs (trailing slash and query dropped for matching): ${uniqueUrls}`,
    `Internal targets with a fetch result: ${results.length}; first response not 200: ${results.filter((r) => r.firstStatus !== 200).length}`,
    `Discovered internal page links not fetched in this run: ${unfetchedCount}`,
    `External URLs: ${externals.length}; www.${cfg.siteHost} among them: ${externals.filter((e) => e.www).length}; probed: ${opts.noExternal ? "skipped" : externals.filter((e) => e.status !== undefined).length}`,
    `Asset links probed: ${assets.filter((a) => a.status !== undefined).length} of ${assets.length}`,
    `Pages that failed to parse: ${state.parseErrors.length}; malformed hrefs skipped: ${pages.reduce((n, p) => n + p.badHrefs, 0)}`,
    `Elapsed: ${elapsedSec}s`,
  ]);

  H("2 Status histogram (final status)");
  P("Internal targets:");
  L(histogram(results.map((r) => r.status)).map(([s, n]) => `${s}: ${n}`));
  P("External URLs:");
  L(
    histogram(externals.filter((e) => e.status !== undefined).map((e) => e.status)).map(([s, n]) => `${s}: ${n}`),
    opts.noExternal ? "Not probed (--no-external)." : "None.",
  );
  P("Asset links:");
  L(histogram(assets.filter((a) => a.status !== undefined).map((a) => a.status)).map(([s, n]) => `${s}: ${n}`));

  H("3 Redirect chains");
  sub(
    "URLs with more than one redirect hop",
    results
      .filter((r) => r.chain.length > 1)
      .map((r) => [`${r.url} -> final ${fmtStatus(r.status)} at ${r.finalUrl} (${r.chain.length} hops)`, ...r.chain.map((c) => `  - ${c.status} ${c.url} -> ${c.location}`)].join("\n")),
  );
  const redirLinks = [];
  const seenRL = new Set();
  for (const l of state.links) {
    if (l.kind === "asset") continue;
    const r = state.results.get(l.to);
    if (!r || !r.chain.length) continue;
    const k = `${l.from}\n${l.raw}\n${l.to}`;
    if (seenRL.has(k)) continue;
    seenRL.add(k);
    redirLinks.push(`from ${l.from} href "${l.raw}" (${l.kind}) -> ${chainText(r)}`);
  }
  sub("Internal links whose target redirects (page, raw href, chain)", redirLinks);

  H("4 Broken internal targets (status 0, 4xx, 5xx)");
  sub(
    "Fetched targets",
    results
      .filter((r) => r.status === 0 || r.status >= 400)
      .map((r) => {
        const via = r.redirectedFrom ? ` [reached via redirect from ${r.redirectedFrom}]` : "";
        const err = r.error ? ` (${r.error})` : "";
        return refBlock(`${r.url} -> HTTP ${fmtStatus(r.status)}${err}${via}`, refsOf(r.url).length, refsOf(r.url));
      }),
  );
  sub(
    "Asset links",
    assets
      .filter((a) => a.status === 0 || a.status >= 400)
      .map((a) => refBlock(`${a.url} -> HTTP ${fmtStatus(a.status)}`, a.refKeys.size, a.referrers)),
  );

  H("5 Broken external links (status 0, 4xx, 5xx)");
  if (opts.noExternal) {
    P("Skipped: external checks were not run (--no-external).");
  } else {
    P("403 and 429 often come from bot protection rather than real breakage; confirm in a browser before fixing.");
    sub(
      "External URLs",
      externals
        .filter((e) => e.status === 0 || e.status >= 400)
        .map((e) => refBlock(`${e.url} -> HTTP ${fmtStatus(e.status)}${e.www ? " (www host)" : ""}`, e.refKeys.size, e.referrers)),
    );
  }

  H("6 Orphan pages (sitemap URLs with no inbound internal link from another crawled page)");
  if (limited) P("Not meaningful in a limited run.");
  sub(
    "Orphans",
    sitemapRows.filter((row) => !(inbound.get(row.key)?.size)).map((row) => `${row.loc} (status ${fmtStatus(statusOf(row.target))})`),
  );

  H("7 Crawlable but not in sitemap (200 HTML pages absent from the sitemap)");
  if (limited) P("Not meaningful in a limited run.");
  sub(
    "Pages",
    pages.filter((p) => !sitemapKeys.has(keyOf(p.url))).map((p) => `${p.url} (robots: ${p.robotsMeta || "none"})`),
  );

  H("8 Sitemap entries whose final status is not 200");
  sub(
    "Entries",
    sitemapRows.filter((row) => statusOf(row.target) !== 200).map((row) => `${row.loc} -> ${fmtStatus(statusOf(row.target))}`),
  );

  H("9 Duplicate titles and meta descriptions");
  sub(
    "Duplicate titles (groups)",
    dupGroups(pages, (p) => p.title).map((g) => `"${g.value.slice(0, 120)}" on ${g.urls.length} pages:\n` + g.urls.map((u) => `  - ${u}`).join("\n")),
  );
  sub(
    "Duplicate meta descriptions (groups)",
    dupGroups(pages, (p) => p.metaDescription).map((g) => `"${g.value.slice(0, 120)}" on ${g.urls.length} pages:\n` + g.urls.map((u) => `  - ${u}`).join("\n")),
  );

  H("10 Canonical tags");
  sub("Missing canonical", pages.filter((p) => p.canonicalCount === 0).map((p) => p.url));
  sub("Multiple canonical tags", pages.filter((p) => p.canonicalCount > 1).map((p) => `${p.url} (${p.canonicalCount} tags)`));
  sub(
    "Canonical not self-referential (target and whether it returned 200)",
    pages
      .filter((p) => p.canonicalTarget && keyOf(p.canonicalTarget) !== keyOf(p.url))
      .map((p) => `${p.url} -> ${p.canonicalTarget}: ${describeTarget(p.canonicalTarget)}`),
  );
  sub(
    "Canonical pointing at a redirect",
    pages
      .filter((p) => p.canonicalTarget && onHost(p.canonicalTarget) && (state.results.get(p.canonicalTarget)?.chain.length ?? 0) > 0)
      .map((p) => `${p.url} -> ${p.canonicalTarget}; ${chainText(state.results.get(p.canonicalTarget))}`),
  );

  H("11 Missing meta description, og and twitter tags, h1 problems");
  sub("Missing meta description", pages.filter((p) => !p.metaDescription).map((p) => p.url));
  sub("Missing og:title", pages.filter((p) => !p.og.title).map((p) => p.url));
  sub("Missing og:image", pages.filter((p) => !p.og.image).map((p) => p.url));
  sub("Missing twitter:card", pages.filter((p) => !p.twitter.card).map((p) => p.url));
  sub("Missing h1", pages.filter((p) => p.h1.length === 0).map((p) => p.url));
  sub("Multiple h1", pages.filter((p) => p.h1.length > 1).map((p) => `${p.url} (${p.h1.length} h1)`));

  H("12 Length limits (decoded text)");
  sub(
    "Titles over 60 characters",
    pages.filter((p) => p.titleLength > 60).map((p) => `${p.url} (${p.titleLength}): "${p.title}"`),
  );
  sub(
    "Meta descriptions over 155 characters",
    pages.filter((p) => p.metaDescriptionLength > 155).map((p) => `${p.url} (${p.metaDescriptionLength})`),
  );

  H("13 Images missing alt");
  const missingTotal = pages.reduce((n, p) => n + p.images.missingAltCount, 0);
  const pagesMissing = pages.filter((p) => p.images.missingAltCount > 0);
  P(`Total img elements without an alt attribute: ${missingTotal}, on ${pagesMissing.length} pages.`);
  sub(
    "Top 25 pages by missing alt",
    [...pagesMissing]
      .sort((a, b) => b.images.missingAltCount - a.images.missingAltCount || byUrl(a, b))
      .slice(0, 25)
      .map((p) => {
        const samples = p.images.missingAltSamples.length ? `; e.g. ${p.images.missingAltSamples.join(", ")}` : "";
        return `${p.url}: ${p.images.missingAltCount} of ${p.images.count}${samples}`;
      }),
  );

  H("14 JSON-LD");
  sub(
    "Parse errors",
    pages.flatMap((p) => p.jsonLd.filter((j) => !j.ok).map((j) => `${p.url}: ${j.error}`)),
  );
  P(`Pages without any JSON-LD block: ${pages.filter((p) => p.jsonLd.length === 0).length}.`);
  const typeCounts = new Map();
  for (const p of pages) {
    const types = new Set(p.jsonLd.filter((j) => j.ok).flatMap((j) => j.types));
    for (const t of types) typeCounts.set(t, (typeCounts.get(t) || 0) + 1);
  }
  sub(
    "JSON-LD @type histogram (pages carrying each type)",
    [...typeCounts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([t, n]) => `${t}: ${n}`),
  );

  H("15 robots.txt and sitemap.xml");
  const rb = state.robots;
  if (rb) {
    const loc = rb.location ? ` -> ${rb.location}` : "";
    const ct = rb.contentType ? ` (${rb.contentType})` : "";
    const err = rb.error ? ` error: ${rb.error}` : "";
    P(`robots.txt: HTTP ${fmtStatus(rb.status)}${loc}${ct}${err}.`);
    sub("Disallow lines", rb.disallow);
    P(`Sitemap line present in robots.txt: ${rb.sitemap.length ? "yes" : "no"}.`);
    sub("Sitemap lines", rb.sitemap);
  }
  sub(
    "sitemap fetches",
    state.sitemapFiles.map((f) => `${f.url}: HTTP ${fmtStatus(f.status)}, ${f.urls} URL entries${f.error ? `, error ${f.error}` : ""}`),
  );
  const smEntries = state.sitemapEntries;
  const withLm = smEntries.filter((e) => e.lastmod);
  const dated = withLm
    .map((e) => ({ ...e, t: Date.parse(e.lastmod) }))
    .filter((e) => !Number.isNaN(e.t))
    .sort((a, b) => a.t - b.t);
  P(
    `Sitemap entries: ${smEntries.length}; with lastmod: ${withLm.length}; without lastmod: ${smEntries.length - withLm.length}; unparseable lastmod: ${withLm.length - dated.length}.`,
  );
  if (dated.length) {
    const oldest = dated[0];
    const newest = dated[dated.length - 1];
    P(`Oldest lastmod: ${oldest.lastmod} (${oldest.loc}).`);
    P(`Newest lastmod: ${newest.lastmod} (${newest.loc}).`);
  }

  H("16 Host and scheme checks (redirects not followed)");
  out.push("| Request | Status | Location |", "| --- | --- | --- |");
  for (const h of state.hosts) {
    const status = fmtStatus(h.status) + (h.error ? ` (${h.error})` : "");
    out.push(`| ${cell(h.url)} | ${cell(status)} | ${cell(h.location || "-")} |`);
  }
  out.push("");
  if (cfg.mirror) {
    P(`www and http checks were skipped because the origin is local (${cfg.origin}), not ${cfg.siteHost}; only the path checks above ran, against the origin.`);
  } else {
    const www = state.hosts.find((h) => h.url === `https://www.${cfg.host}/`);
    let wwwVerdict = "www check not run.";
    if (www) {
      if (www.status === 200) {
        wwwVerdict = `www.${cfg.host} resolves to a 200 page: DUPLICATE HOST, the same site is served on www and the apex host unless canonicals or redirects say otherwise.`;
      } else if (www.status >= 300 && www.status < 400) {
        wwwVerdict = `www.${cfg.host} redirects (HTTP ${www.status}) to ${www.location || "an unknown location"}; it does not serve a 200 page.`;
      } else {
        wwwVerdict = `www.${cfg.host} returned HTTP ${fmtStatus(www.status)}: neither a 200 page nor a redirect.`;
      }
    }
    P(wwwVerdict);
    const httpRow = state.hosts.find((h) => h.url === `http://${cfg.host}/`);
    if (httpRow) P(`http://${cfg.host}/ returned HTTP ${fmtStatus(httpRow.status)}${httpRow.location ? ` -> ${httpRow.location}` : ""}.`);
  }
  const missing404 = state.hosts.find((h) => h.url.endsWith("/does-not-exist-404-check"));
  if (missing404) P(`Unknown path returned HTTP ${fmtStatus(missing404.status)}${missing404.status === 200 ? " (soft 404: unknown paths render as 200)" : ""}.`);

  H("17 noindex pages");
  sub(
    "Pages with noindex (meta robots or X-Robots-Tag)",
    pages
      .filter((p) => /noindex/i.test(p.robotsMeta || "") || /noindex/i.test(p.xRobotsTag || ""))
      .map((p) => `${p.url} (meta robots: ${p.robotsMeta || "none"}; X-Robots-Tag: ${p.xRobotsTag || "none"}; in sitemap: ${sitemapKeys.has(keyOf(p.url)) ? "yes" : "no"})`),
  );

  H("18 Security headers on 200 HTML pages");
  const noHsts = pages.filter((p) => !p.headers.hstsPresent);
  const noCsp = pages.filter((p) => !p.headers.contentSecurityPolicyPresent);
  P(`200 HTML pages checked: ${pages.length}. HSTS present on ${pages.length - noHsts.length}; CSP present on ${pages.length - noCsp.length}.`);
  P(`Every 200 HTML page carries HSTS: ${noHsts.length ? "NO" : "yes"}. Every 200 HTML page carries CSP: ${noCsp.length ? "NO" : "yes"}.`);
  sub("Exceptions: missing HSTS", noHsts.map((p) => p.url));
  sub("Exceptions: missing CSP", noCsp.map((p) => p.url));

  return out.join("\n") + "\n";
}

function parseArgs(argv) {
  const opts = {
    origin: "https://ghosxt.com",
    siteHost: "ghosxt.com",
    urls: path.join(AUDIT_DIR, "baseline", "urls.txt"),
    out: path.join(AUDIT_DIR, "baseline", "crawl"),
    concurrency: 6,
    limit: Infinity,
    noExternal: false,
    force: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const next = () => {
      const v = argv[i + 1];
      if (v === undefined || v.startsWith("--")) throw new Error(`${arg} needs a value`);
      i++;
      return v;
    };
    switch (arg) {
      case "--help":
      case "-h":
        opts.help = true;
        break;
      case "--origin":
        opts.origin = next();
        break;
      case "--site-host":
        opts.siteHost = next();
        break;
      case "--urls":
        opts.urls = path.resolve(next());
        break;
      case "--out":
        opts.out = path.resolve(next());
        break;
      case "--concurrency":
        opts.concurrency = positiveInt(next(), arg);
        break;
      case "--limit":
        opts.limit = positiveInt(next(), arg);
        break;
      case "--no-external":
        opts.noExternal = true;
        break;
      case "--force":
        opts.force = true;
        break;
      default:
        throw new Error(`unknown argument: ${arg}`);
    }
  }
  return opts;
}

function positiveInt(v, flag) {
  const n = Number(v);
  if (!Number.isInteger(n) || n < 1) throw new Error(`${flag} must be a positive integer, got "${v}"`);
  return n;
}

async function writeJson(dir, name, data) {
  await writeFile(path.join(dir, name), JSON.stringify(data, null, 2) + "\n");
}

async function main() {
  const started = Date.now();
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    process.stdout.write(HELP);
    return;
  }
  const origin = new URL(opts.origin);
  if (!/^https?:$/.test(origin.protocol)) throw new Error(`--origin must be http or https: ${opts.origin}`);
  const siteHost = opts.siteHost.toLowerCase();
  if (!/^[a-z0-9.-]+$/.test(siteHost)) throw new Error(`--site-host must be a host name, got "${opts.siteHost}"`);
  cfg.origin = origin.origin;
  cfg.host = origin.hostname;
  cfg.siteHost = siteHost;
  cfg.mirror = origin.hostname !== siteHost;
  cfg.follow = opts.limit === Infinity;
  const limited = !cfg.follow;

  const reportPath = path.join(opts.out, "report.md");
  const pagesPath = path.join(opts.out, "pages.json");
  if (!opts.force && (await exists(reportPath)) && (await exists(pagesPath))) {
    log(`[skip] ${opts.out} already holds a crawl; use --force to re-crawl`);
    return;
  }

  const urlText = await readFile(opts.urls, "utf8");

  log(`[sitemap] reading ${cfg.origin}/sitemap.xml`);
  await readSitemaps(`${cfg.origin}/sitemap.xml`);
  for (const f of state.sitemapFiles) {
    log(`[sitemap] ${f.url}: HTTP ${fmtStatus(f.status)}, ${f.urls} entries${f.error ? ` (${f.error})` : ""}`);
  }

  addSeed("/", "root");
  for (const line of urlText.split(/\r?\n/)) {
    const t = line.trim();
    if (t && !t.startsWith("#")) addSeed(t, "urls.txt");
  }
  for (const e of state.sitemapEntries) addSeed(e.loc, "sitemap.xml");
  if (!state.seedOrder.length) throw new Error("no same-host seeds found");

  const toFetch = state.seedOrder.slice(0, opts.limit);
  const initial = toFetch.map((target) => {
    claim(target);
    return { target, depth: 0, via: "seed" };
  });
  log(
    `[crawl] ${toFetch.length} of ${state.seedOrder.length} seeds, concurrency ${opts.concurrency}` +
      (limited ? " (--limit: discovered links are not followed)" : ", following discovered links"),
  );
  await runPool(initial, opts.concurrency, visitItem);
  log(`[crawl] done: ${state.pages.length} HTML pages, ${state.results.size} fetched targets`);

  await probeCanonicals(opts.concurrency);
  log("[checks] host and scheme variants, robots.txt");
  state.hosts = await hostChecks();
  state.robots = await fetchRobots(cfg.origin);
  await probeAssets(opts.concurrency);
  if (opts.noExternal) log("[external] skipped (--no-external)");
  else await probeExternals();

  const elapsedSec = ((Date.now() - started) / 1000).toFixed(1);
  const { linkIndex, inbound } = buildIndexes();
  const sitemapRows = sitemapRowsOf();
  const unfetchedCount = state.links.filter((l) => l.kind !== "asset" && !state.results.has(l.to)).length;
  const report = renderReport({
    opts,
    elapsedSec,
    startedIso: new Date(started).toISOString(),
    limited,
    seedsFetched: toFetch.length,
    uniqueUrls: countUniqueInternal(),
    linkIndex,
    inbound,
    sitemapRows,
    unfetchedCount,
  });

  const pagesOut = [...state.pages].sort(byUrl);
  const linksOut = state.links.map((l) => ({ from: l.from, to: l.to, raw: l.raw, kind: l.kind }));
  const redirectsOut = [...state.results.values()]
    .filter((r) => r.firstStatus !== 200)
    .sort(byUrl)
    .map((r) => ({
      url: r.url,
      firstStatus: r.firstStatus,
      status: r.status,
      finalUrl: r.finalUrl,
      chain: r.chain,
      via: r.via,
      redirectedFrom: r.redirectedFrom,
      depth: r.depth,
      error: r.error,
    }));
  const externalsOut = [...state.externals.values()].sort(byUrl).map((e) => ({
    url: e.url,
    status: opts.noExternal ? null : (e.status ?? null),
    skipped: opts.noExternal,
    www: e.www,
    referrerCount: e.refKeys.size,
    referrers: e.referrers,
  }));
  const assetsOut = [...state.assets.values()].sort(byUrl).map((a) => ({
    url: a.url,
    status: a.status ?? null,
    referrerCount: a.refKeys.size,
    referrers: a.referrers,
  }));

  await mkdir(opts.out, { recursive: true });
  await writeJson(opts.out, "pages.json", pagesOut);
  await writeJson(opts.out, "links.json", linksOut);
  await writeJson(opts.out, "redirects.json", redirectsOut);
  await writeJson(opts.out, "external-links.json", externalsOut);
  await writeJson(opts.out, "assets.json", assetsOut);
  await writeFile(reportPath, report);
  log(`[done] ${pagesOut.length} pages, ${linksOut.length} links, ${externalsOut.length} external URLs; report: ${reportPath} (${elapsedSec}s)`);
}

main().catch((err) => {
  console.error(`fatal: ${err?.stack || err}`);
  process.exit(1);
});
