// Live-site SPEED probe for ghosxt.com — real production measurements.
//
// Two layers:
//   A. Light sweep over every sitemap URL: compressed (wire) HTML size, the
//      encoding actually served, cache-control + cf-cache-status, TTFB. Catches
//      weight outliers, missing compression, and cache misconfig site-wide.
//   B. Deep per-page resource analysis over a representative subset: fetch the
//      HTML, discover every sub-resource, fetch each, and total the real page
//      weight (compressed), request count, third-party split, render-blocking
//      CSS/JS, and image-optimization hygiene (dimensions / lazy / format).
//
// Sizes are measured two ways per resource: a request with `accept-encoding:
// br, gzip` (undici does NOT auto-decompress, so the body length == the exact
// bytes on the wire) and a request with `accept-encoding: identity` (the raw
// uncompressed size). The wire size is what a real browser downloads.
//
// Output: reports/speed/ (git-ignored, never served). Run: node speed-probe.mjs

import { mkdirSync, writeFileSync } from "node:fs";
import { request } from "undici";
import { ProxyAgent, setGlobalDispatcher } from "undici";

const PROXY = process.env.HTTPS_PROXY || process.env.https_proxy || "";
if (PROXY) setGlobalDispatcher(new ProxyAgent(PROXY));

const ORIGIN = "https://ghosxt.com";
const UA =
  "Mozilla/5.0 (site-audit speed probe; +internal, not a public crawler)";
const OUT = new URL("./reports/speed/", import.meta.url);
mkdirSync(OUT, { recursive: true });

// One measured fetch. encoding: 'compressed' sends br/gzip and returns the wire
// byte count (undici request() never auto-decodes); 'identity' returns raw size.
async function measure(url, { encoding = "compressed", timeoutMs = 45000 } = {}) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), timeoutMs);
  const t0 = performance.now();
  try {
    const r = await request(url, {
      method: "GET",
      maxRedirections: 5,
      headers: {
        "user-agent": UA,
        accept: "*/*",
        "accept-encoding": encoding === "identity" ? "identity" : "br, gzip",
      },
      signal: ac.signal,
    });
    // Read to first byte vs full drain: performance.now() after headers ~ TTFB.
    const ttfb = performance.now() - t0;
    const buf = Buffer.from(await r.body.arrayBuffer());
    const total = performance.now() - t0;
    return {
      status: r.statusCode,
      bytes: buf.length,
      ttfbMs: Math.round(ttfb),
      totalMs: Math.round(total),
      enc: r.headers["content-encoding"] || "none",
      type: (r.headers["content-type"] || "").split(";")[0],
      cache: r.headers["cache-control"] || "",
      cfCache: r.headers["cf-cache-status"] || "",
      body: buf,
    };
  } finally {
    clearTimeout(timer);
  }
}

async function pool(items, n, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(n, items.length) }, async () => {
      while (i < items.length) {
        const idx = i++;
        try {
          out[idx] = await fn(items[idx], idx);
        } catch (e) {
          out[idx] = { error: String(e && e.message || e) };
        }
      }
    }),
  );
  return out;
}

const kb = (b) => Math.round((b / 1024) * 10) / 10;

// ---- discover URL set -------------------------------------------------------
const sm = await measure(`${ORIGIN}/sitemap.xml`, { encoding: "identity" });
const urls = [...sm.body.toString("utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => m[1].trim(),
);
console.error(`sitemap: ${urls.length} URLs`);

// ---- A. light sweep over every page ----------------------------------------
console.error("sweep: measuring compressed HTML for every page…");
const sweep = await pool(urls, 8, async (u) => {
  const c = await measure(u, { encoding: "compressed" });
  return {
    url: u.replace(ORIGIN, "") || "/",
    status: c.status,
    wireKb: kb(c.bytes),
    enc: c.enc,
    ttfbMs: c.ttfbMs,
    cache: c.cache,
    cfCache: c.cfCache,
    type: c.type,
  };
});

const html = sweep.filter((s) => s && s.type === "text/html" && s.status === 200);
const uncompressed = html.filter((s) => s.enc === "none");
const byWeight = [...html].sort((a, b) => b.wireKb - a.wireKb);
const avgWire = html.reduce((s, x) => s + x.wireKb, 0) / (html.length || 1);
const avgTtfb = html.reduce((s, x) => s + x.ttfbMs, 0) / (html.length || 1);
const cacheMiss = html.filter((s) => /MISS|EXPIRED|DYNAMIC/i.test(s.cfCache));

// ---- B. representative deep subset -----------------------------------------
const path = (u) => u.replace(ORIGIN, "") || "/";
const pick = new Set();
const add = (pred, n) => {
  for (const u of urls) {
    if (pick.size >= 999) break;
    if (pred(path(u))) {
      pick.add(u);
      if ([...pick].filter((x) => pred(path(x))).length >= n) break;
    }
  }
};
add((p) => p === "/", 1);
add((p) => /^\/pricing/.test(p), 1);
add((p) => /^\/contact/.test(p), 1);
add((p) => /^\/(managed-it|cybersecurity|cloud|it-support|help-desk)/.test(p), 2);
add((p) => /^\/(it-services|managed-it-services|cybersecurity)-[a-z-]+\.html?$/.test(p), 2);
add((p) => /^\/blog\//.test(p), 3);
// plus the two heaviest HTML pages from the sweep
for (const s of byWeight.slice(0, 2)) pick.add(ORIGIN + (s.url === "/" ? "/" : s.url));
const subset = [...pick];
console.error(`deep: ${subset.length} representative pages`);

const RESOURCE_RE = {
  css: /<link\b[^>]*\brel=["']?stylesheet["']?[^>]*>/gi,
  linkTag: /<link\b[^>]*>/gi,
  script: /<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi,
  img: /<img\b[^>]*>/gi,
};
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"));
  return m ? m[1] : null;
};
const abs = (href) =>
  href.startsWith("http")
    ? href
    : ORIGIN + "/" + href.replace(/^\.?\//, "").replace(/^\.\.\//, "");
const isThird = (u) => !u.startsWith(ORIGIN);

async function deep(u) {
  const c = await measure(u, { encoding: "compressed" });
  const raw = await measure(u, { encoding: "identity" });
  // Parse the DECOMPRESSED body: c.body is raw brotli bytes (undici request()
  // never auto-decodes), so only the identity fetch yields real HTML.
  const doc = raw.body.toString("utf8");
  const head = (doc.match(/<head[^>]*>([\s\S]*?)<\/head>/i) || [, ""])[1];

  // stylesheets: classify render-blocking vs async (media=print+onload / preload)
  const cssTags = doc.match(RESOURCE_RE.css) || [];
  const css = cssTags.map((t) => {
    const href = attr(t, "href");
    const media = (attr(t, "media") || "all").toLowerCase();
    const asyncLoad = /onload=/.test(t) || /rel=["']?preload/.test(t);
    return {
      href,
      third: href ? isThird(abs(href)) : false,
      blocking: !asyncLoad && media !== "print",
    };
  });

  // scripts with src: blocking if in <head> and no defer/async
  const scripts = [];
  for (const m of doc.matchAll(RESOURCE_RE.script)) {
    const tag = m[0];
    const src = m[1];
    const inHead = head.includes(tag);
    const deferred = /\bdefer\b/i.test(tag) || /\basync\b/i.test(tag);
    scripts.push({ src, third: isThird(abs(src)), blocking: inHead && !deferred });
  }

  // images
  const imgs = (doc.match(RESOURCE_RE.img) || []).map((t) => ({
    src: attr(t, "src"),
    hasDims: !!(attr(t, "width") && attr(t, "height")),
    lazy: (attr(t, "loading") || "").toLowerCase() === "lazy",
    fetchpriority: attr(t, "fetchpriority"),
  }));

  // fetch same-origin sub-resources to sum real page weight
  const assetUrls = [
    ...css.map((x) => x.href).filter(Boolean),
    ...scripts.map((x) => x.src),
    ...imgs.map((x) => x.src).filter(Boolean),
  ]
    .map(abs)
    .filter((x, i, a) => a.indexOf(x) === i);
  const assets = await pool(assetUrls, 8, async (a) => {
    const m = await measure(a, { encoding: "compressed" });
    return {
      url: a.replace(ORIGIN, ""),
      third: isThird(a),
      kind: /\.css($|\?)/.test(a)
        ? "css"
        : /\.js($|\?)/.test(a)
          ? "js"
          : /\.(png|jpe?g|webp|avif|gif|svg|ico)($|\?)/i.test(a)
            ? "img"
            : /\.woff2?($|\?)/i.test(a)
              ? "font"
              : "other",
      wireKb: kb(m.bytes),
      enc: m.enc,
      status: m.status,
      type: m.type,
    };
  });
  const same = assets.filter((a) => a && !a.third);
  const third = assets.filter((a) => a && a.third);
  const sum = (list) => Math.round(list.reduce((s, a) => s + (a.wireKb || 0), 0) * 10) / 10;
  const byKind = {};
  for (const a of assets.filter(Boolean))
    byKind[a.kind] = Math.round(((byKind[a.kind] || 0) + a.wireKb) * 10) / 10;

  return {
    url: path(u),
    htmlWireKb: kb(c.bytes),
    htmlRawKb: kb(raw.body.length),
    htmlEnc: c.enc,
    ttfbMs: c.ttfbMs,
    totalPageWireKb: Math.round((c.bytes / 1024 + sum(assets.filter(Boolean))) * 10) / 10,
    requests: 1 + assets.filter(Boolean).length,
    thirdPartyRequests: third.length,
    thirdPartyKb: sum(third),
    weightByKind: byKind,
    renderBlockingCss: css.filter((x) => x.blocking).length,
    asyncCss: css.filter((x) => !x.blocking).length,
    renderBlockingJs: scripts.filter((x) => x.blocking).length,
    images: imgs.length,
    imagesNoDims: imgs.filter((x) => !x.hasDims).length,
    imagesNotLazy: imgs.filter((x) => !x.lazy).length,
    imgFormats: assets
      .filter(Boolean)
      .filter((a) => a.kind === "img")
      .reduce((m, a) => {
        const ext = (a.url.match(/\.([a-z0-9]+)(?:$|\?)/i) || [, "?"])[1].toLowerCase();
        m[ext] = (m[ext] || 0) + 1;
        return m;
      }, {}),
    assets: assets.filter(Boolean),
  };
}

const deepResults = [];
for (const u of subset) {
  console.error(`  deep: ${path(u)}`);
  deepResults.push(await deep(u));
}

// ---- write + summarize ------------------------------------------------------
const summary = {
  origin: ORIGIN,
  sitemapUrls: urls.length,
  htmlPages: html.length,
  compression: {
    servedCompressed: html.length - uncompressed.length,
    servedUncompressed: uncompressed.length,
    uncompressedSample: uncompressed.slice(0, 10).map((s) => s.url),
    encodings: html.reduce((m, s) => ((m[s.enc] = (m[s.enc] || 0) + 1), m), {}),
  },
  htmlWireKb: { avg: Math.round(avgWire * 10) / 10, heaviest: byWeight.slice(0, 12) },
  ttfb: {
    avgMs: Math.round(avgTtfb),
    slowest: [...html].sort((a, b) => b.ttfbMs - a.ttfbMs).slice(0, 8)
      .map((s) => ({ url: s.url, ttfbMs: s.ttfbMs, cf: s.cfCache })),
  },
  edgeCache: {
    miss: cacheMiss.length,
    sample: cacheMiss.slice(0, 10).map((s) => ({ url: s.url, cf: s.cfCache })),
    statuses: html.reduce((m, s) => ((m[s.cfCache || "?"] = (m[s.cfCache || "?"] || 0) + 1), m), {}),
  },
  deep: deepResults.map(({ assets, ...rest }) => rest),
};

writeFileSync(new URL("./sweep.json", OUT), JSON.stringify(sweep, null, 2));
writeFileSync(new URL("./deep.json", OUT), JSON.stringify(deepResults, null, 2));
writeFileSync(new URL("./summary.json", OUT), JSON.stringify(summary, null, 2));

console.log("\n================= SPEED SUMMARY =================");
console.log(`Pages (HTML 200): ${summary.htmlPages} of ${summary.sitemapUrls} sitemap URLs`);
console.log(
  `Compression: ${summary.compression.servedCompressed} compressed, ` +
    `${summary.compression.servedUncompressed} uncompressed  ${JSON.stringify(summary.compression.encodings)}`,
);
console.log(`HTML wire size: avg ${summary.htmlWireKb.avg} KB (compressed)`);
console.log(`TTFB: avg ${summary.ttfb.avgMs} ms`);
console.log(`Edge cache MISS/DYNAMIC: ${summary.edgeCache.miss}  statuses ${JSON.stringify(summary.edgeCache.statuses)}`);
console.log("\nHeaviest HTML (compressed wire):");
for (const s of summary.htmlWireKb.heaviest.slice(0, 8))
  console.log(`  ${String(s.wireKb).padStart(6)} KB  ${s.enc.padEnd(5)}  ${s.url}`);
console.log("\nDeep pages — total page weight (compressed) / requests / blocking:");
for (const d of summary.deep)
  console.log(
    `  ${String(d.totalPageWireKb).padStart(6)} KB  req=${String(d.requests).padStart(2)}  ` +
      `blkCSS=${d.renderBlockingCss} blkJS=${d.renderBlockingJs}  ` +
      `img=${d.images}(noDims=${d.imagesNoDims})  3p=${d.thirdPartyRequests}(${d.thirdPartyKb}KB)  ${d.url}`,
  );
console.log("\nwrote reports/speed/{sweep,deep,summary}.json");
