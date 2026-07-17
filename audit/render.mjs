// Rendered-DOM layer for the UI / ADA / Speed dimensions.
//
// Chromium cannot egress directly through the agent proxy in this sandbox, so
// every browser request is fulfilled from Node (which can) via request
// interception. That means network *timings* are indicative rather than field
// data, but everything layout-based — screenshots, horizontal overflow, CLS,
// LCP element, computed color contrast, tap-target sizes, the a11y tree — is
// fully real.
//
// Reads audit/reports/manifest.json, renders a representative subset at mobile
// and desktop, and writes:
//   audit/reports/screenshots/<slug>-<vp>.png
//   audit/reports/render-metrics.json

import { chromium } from "playwright-core";
import { ProxyAgent, setGlobalDispatcher, request as ureq } from "undici";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const PROXY = process.env.HTTPS_PROXY || process.env.https_proxy || "http://127.0.0.1:34883";
if (PROXY) setGlobalDispatcher(new ProxyAgent(PROXY));
const EXE = process.env.AUDIT_CHROMIUM || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const OUT = new URL("./reports/", import.meta.url);
const SHOTS = new URL("./reports/screenshots/", import.meta.url);
const RENDER_LIMIT = process.env.AUDIT_RENDER_LIMIT ? Number(process.env.AUDIT_RENDER_LIMIT) : 22;

const VIEWPORTS = { mobile: { width: 390, height: 844, dsf: 2 }, desktop: { width: 1366, height: 900, dsf: 1 } };

// In-page instrumentation, injected before load, so LCP/CLS observers catch
// events from the very start.
const INIT = `
  window.__cls = 0; window.__lcp = 0; window.__lcpEl = '';
  try {
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((l) => { const es = l.getEntries(); const last = es[es.length - 1]; if (last) { window.__lcp = Math.round(last.startTime); const el = last.element; window.__lcpEl = el ? (el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : '')) : ''; } }).observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {}
`;

const MEASURE = () => {
  const parseRGB = (s) => { const m = (s || "").match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(",").map((x) => parseFloat(x)); return { r: p[0], g: p[1], b: p[2], a: p[3] ?? 1 }; };
  const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const lum = (c) => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
  const ratio = (fg, bg) => { const L1 = lum(fg), L2 = lum(bg); const a = Math.max(L1, L2) + 0.05, b = Math.min(L1, L2) + 0.05; return a / b; };
  const effBg = (el) => { let n = el; while (n && n !== document.documentElement) { const c = parseRGB(getComputedStyle(n).backgroundColor); if (c && c.a > 0) return c; n = n.parentElement; } return { r: 255, g: 255, b: 255, a: 1 }; };

  const de = document.documentElement;
  const overflowPx = Math.max(0, de.scrollWidth - de.clientWidth);
  // contrast: sample visible text-bearing elements
  const contrast = [];
  const seen = new Set();
  for (const el of document.querySelectorAll("p,a,li,span,h1,h2,h3,button,.btn,label,figcaption")) {
    const txt = (el.textContent || "").trim();
    if (txt.length < 4) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2 || r.bottom < 0 || r.top > 3000) continue;
    const cs = getComputedStyle(el);
    const fg = parseRGB(cs.color); if (!fg) continue;
    const bg = effBg(el);
    const size = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight) >= 700;
    const large = size >= 24 || (size >= 18.66 && bold);
    const cr = ratio(fg, bg);
    const min = large ? 3 : 4.5;
    if (cr < min) {
      const key = Math.round(cr * 10) + txt.slice(0, 20);
      if (!seen.has(key)) { seen.add(key); contrast.push({ ratio: Math.round(cr * 100) / 100, min, size: Math.round(size), text: txt.slice(0, 40), fg: cs.color, tag: el.tagName.toLowerCase() }); }
    }
  }
  // tap targets (only meaningful at mobile)
  let smallTargets = 0; const smallSamples = [];
  for (const el of document.querySelectorAll("a[href],button,input,select,[role=button]")) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    // ignore links that are inline inside a paragraph (natural inline text)
    if (el.tagName === "A" && el.closest("p,li")) continue;
    if (r.width < 24 || r.height < 24) { smallTargets++; if (smallSamples.length < 6) smallSamples.push({ text: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 24), w: Math.round(r.width), h: Math.round(r.height) }); }
  }
  const landmarks = { main: document.querySelectorAll("main,[role=main]").length, nav: document.querySelectorAll("nav,[role=navigation]").length, header: document.querySelectorAll("header,[role=banner]").length, footer: document.querySelectorAll("footer,[role=contentinfo]").length };
  const paints = Object.fromEntries(performance.getEntriesByType("paint").map((e) => [e.name, Math.round(e.startTime)]));
  return {
    title: document.title,
    overflowPx,
    fcpMs: paints["first-contentful-paint"] ?? null,
    lcpMs: window.__lcp || null,
    lcpElement: window.__lcpEl || null,
    cls: Math.round((window.__cls || 0) * 1000) / 1000,
    contrastFailures: contrast.sort((a, b) => a.ratio - b.ratio).slice(0, 12),
    contrastFailCount: contrast.length,
    smallTapTargets: smallTargets,
    smallTapSamples: smallSamples,
    landmarks,
  };
};

function selectRenderSet(pages) {
  // Guarantee one of every template shape, then fill with variety, then cap.
  const want = [
    "home", "contact", "pricing", "services", "about", "cybersecurity", "cloud-services",
    "managed-it-services", "website-development", "salinas", "monterey-county",
    "cybersecurity-monterey", "cloud-services-monterey", "web-design-monterey", "it-help-morgan-hill",
  ];
  const bySlug = new Map(pages.map((p) => [p.slug, p]));
  const set = [];
  for (const s of want) if (bySlug.has(s)) set.push(bySlug.get(s));
  for (const p of pages) { if (set.length >= RENDER_LIMIT) break; if (p.category === "blog" && !set.includes(p)) set.push(p); }
  for (const p of pages) { if (set.length >= RENDER_LIMIT) break; if (!set.includes(p)) set.push(p); }
  return set.slice(0, RENDER_LIMIT);
}

async function main() {
  await mkdir(SHOTS, { recursive: true });
  const manifest = JSON.parse(await readFile(new URL("manifest.json", OUT), "utf8"));
  const set = selectRenderSet(manifest.pages);
  console.error(`rendering ${set.length} pages × ${Object.keys(VIEWPORTS).length} viewports`);

  const cache = new Map();
  const browser = await chromium.launch({ executablePath: EXE, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  const results = {};

  for (const page of set) {
    results[page.slug] = { url: page.url, category: page.category, viewports: {} };
    for (const [vp, dim] of Object.entries(VIEWPORTS)) {
      const ctx = await browser.newContext({ viewport: { width: dim.width, height: dim.height }, deviceScaleFactor: dim.dsf, ignoreHTTPSErrors: true });
      const p = await ctx.newPage();
      await p.addInitScript(INIT);
      let served = 0, failed = 0;
      await p.route("**/*", async (route) => {
        const url = route.request().url();
        if (!/^https?:/.test(url)) return route.continue().catch(() => {});
        try {
          let hit = cache.get(url);
          if (!hit) { const r = await ureq(url, { method: "GET", maxRedirections: 3, headers: { "user-agent": "ghosxt-site-audit/1.0" } }); hit = { status: r.statusCode, ct: r.headers["content-type"] || "application/octet-stream", body: Buffer.from(await r.body.arrayBuffer()) }; cache.set(url, hit); }
          served++; await route.fulfill({ status: hit.status, headers: { "content-type": hit.ct }, body: hit.body });
        } catch { failed++; route.abort().catch(() => {}); }
      });
      try {
        await p.goto(page.url, { waitUntil: "load", timeout: 60000 });
        await p.waitForTimeout(1800);
        const m = await p.evaluate(MEASURE);
        const shot = `${page.slug}-${vp}.png`;
        await p.screenshot({ path: fileURLToPath(new URL(shot, SHOTS)), fullPage: false });
        results[page.slug].viewports[vp] = { served, failed, screenshot: `screenshots/${shot}`, ...m };
      } catch (e) {
        results[page.slug].viewports[vp] = { error: String(e.message || e).split("\n")[0].slice(0, 140) };
      }
      await ctx.close();
    }
    const d = results[page.slug].viewports.desktop || {};
    console.error(`  ${page.slug}: lcp=${d.lcpMs}ms cls=${d.cls} overflow(m)=${results[page.slug].viewports.mobile?.overflowPx} contrastFails=${d.contrastFailCount} tapSmall(m)=${results[page.slug].viewports.mobile?.smallTapTargets}`);
  }
  await browser.close();
  await writeFile(new URL("render-metrics.json", OUT), JSON.stringify(results, null, 2));
  console.error(`wrote render-metrics.json (${set.length} pages)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
