// Deterministic crawler + rule engine for the LIVE ghosxt.com.
//
// Fetches the target URL set (from the live sitemap), extracts a structured
// artifact per page, and runs every check that can be decided without an LLM.
// Writes:
//   audit/reports/artifacts/<slug>.json     one artifact per page
//   audit/reports/manifest.json             the URL set + metadata (fed to the agent fleet)
//   audit/reports/deterministic-findings.json
//
// Everything under audit/reports/ is git-ignored and .assetsignore'd.

import { load } from "cheerio";
import { mkdir, writeFile } from "node:fs/promises";
import { fetchText, probeStatus } from "./lib/fetch.mjs";

const ORIGIN = "https://ghosxt.com";
const OUT = new URL("./reports/", import.meta.url);
const ART = new URL("./reports/artifacts/", import.meta.url);

const CFG = {
  matrixSample: Number(process.env.AUDIT_MATRIX_SAMPLE ?? 4),
  blogSample: Number(process.env.AUDIT_BLOG_SAMPLE ?? 10),
  full: process.env.AUDIT_FULL === "1",
  limit: process.env.AUDIT_LIMIT ? Number(process.env.AUDIT_LIMIT) : Infinity,
};

const SECRET_PATTERNS = [
  [/\bre_[A-Za-z0-9]{16,}\b/, "Resend API key"],
  [/\b0x[A-Fa-f0-9]{40,}\b/, "Turnstile/40-hex secret-shaped token"],
  [/\bAKIA[0-9A-Z]{16}\b/, "AWS access key id"],
  [/\bsk-[A-Za-z0-9]{20,}\b/, "OpenAI-style secret key"],
  [/(?:api[_-]?key|secret|password|token)\s*[:=]\s*["'][^"']{12,}["']/i, "generic hardcoded credential"],
];
const PLACEHOLDER_PATTERNS = [
  /lorem ipsum/i, /\bTODO\b/, /\bFIXME\b/, /\bXXX\b/, /\{\{[^}]+\}\}/,
  /\{city\}|\{service\}|\{slug\}/i, /example\.com/i, /yourdomain/i, /\bplaceholder\b/i, /REPLACE[-_ ]ME/i,
];

let FINDINGS = [];
let fidSeq = 0;
function finding(dimension, severity, rule, url, evidence, fix) {
  FINDINGS.push({ id: `D${++fidSeq}`, source: "deterministic", dimension, severity, rule, url, evidence, fix });
}

function normUrl(u) {
  try {
    const x = new URL(u, ORIGIN);
    let p = x.pathname.replace(/\/index\.html$/, "/");
    if (p.length > 1) p = p.replace(/\/$/, "");
    return `${x.origin}${p || "/"}`;
  } catch {
    return u;
  }
}

function categorize(u) {
  const last = u.replace(/\/$/, "").split("/").pop() || "home";
  if (u.includes("/blog/")) return "blog";
  if (last.startsWith("cybersecurity-")) return "matrix:cybersecurity";
  if (last.startsWith("cloud-services-")) return "matrix:cloud-services";
  if (last.startsWith("web-design-")) return "matrix:web-design";
  if (last.startsWith("it-help-")) return "matrix:it-help";
  return "unique";
}

function slugFor(u) {
  const x = new URL(u);
  let p = x.pathname.replace(/^\//, "").replace(/\/$/, "");
  if (p === "" ) return "home";
  return p.replace(/\.html$/, "").replace(/\//g, "__");
}

async function getSitemapUrls() {
  const { text } = await fetchText(`${ORIGIN}/sitemap.xml`);
  return [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

function selectTargets(all) {
  if (CFG.full) return all.slice(0, CFG.limit);
  const byCat = {};
  for (const u of all) (byCat[categorize(u)] ??= []).push(u);
  const pick = [];
  for (const u of byCat["unique"] || []) pick.push(u); // all unique pages
  for (const cat of Object.keys(byCat)) {
    if (cat.startsWith("matrix:")) pick.push(...byCat[cat].slice(0, CFG.matrixSample));
  }
  // Evenly sample blog posts across the (date-sorted) list.
  const blog = byCat["blog"] || [];
  const step = Math.max(1, Math.floor(blog.length / CFG.blogSample));
  for (let i = 0; i < blog.length && pick.filter((x) => x.includes("/blog/")).length < CFG.blogSample; i += step) pick.push(blog[i]);
  return [...new Set(pick)].slice(0, CFG.limit);
}

function extract(url, status, headers, html) {
  const $ = load(html);
  const abs = (h) => { try { return new URL(h, url).href; } catch { return null; } };
  const text = $("body").text().replace(/\s+/g, " ").trim();

  const jsonLd = [];
  let emptyLd = 0;
  $('script[type="application/ld+json"]').each((_, el) => {
    const raw = $(el).text().trim();
    if (!raw) { emptyLd++; return; }
    try {
      const parsed = JSON.parse(raw);
      const types = new Set(), ids = [];
      JSON.stringify(parsed, (k, v) => { if (k === "@type") (Array.isArray(v) ? v : [v]).forEach((t) => types.add(t)); if (k === "@id") ids.push(v); return v; });
      jsonLd.push({ ok: true, types: [...types], ids });
    } catch (e) { jsonLd.push({ ok: false, error: String(e.message || e).slice(0, 160) }); }
  });

  const images = $("img").map((_, el) => {
    const $el = $(el);
    return { src: $el.attr("src") || "", hasAlt: $el.attr("alt") !== undefined, alt: $el.attr("alt") ?? null,
      width: $el.attr("width") ?? null, height: $el.attr("height") ?? null, loading: $el.attr("loading") ?? null };
  }).get();

  const headings = $("h1,h2,h3,h4,h5,h6").map((_, el) => ({ level: Number(el.tagName[1]), text: $(el).text().replace(/\s+/g, " ").trim().slice(0, 90) })).get();

  const links = $("a[href]").map((_, el) => $(el).attr("href")).get();
  const internal = new Set(), external = new Set();
  for (const h of links) {
    if (/^(mailto:|tel:|javascript:|#)/i.test(h)) continue;
    const a = abs(h); if (!a) continue;
    if (a.startsWith(ORIGIN)) internal.add(normUrl(a)); else external.add(a);
  }

  const tel = new Set(), email = new Set();
  $('a[href^="tel:"]').each((_, el) => tel.add(($(el).attr("href") || "").replace(/^tel:/, "").replace(/[^\d+]/g, "")));
  $('a[href^="mailto:"]').each((_, el) => email.add(($(el).attr("href") || "").replace(/^mailto:/, "").split("?")[0].toLowerCase()));

  const iconOnlyLinks = $("a").filter((_, el) => {
    const $el = $(el);
    const hasText = $el.text().replace(/\s+/g, "").length > 0;
    const labelled = $el.attr("aria-label") || $el.attr("title");
    const hasIcon = $el.find("i,svg,[class*=icon],[class*=fi-]").length > 0;
    return hasIcon && !hasText && !labelled;
  }).length;

  const secrets = [];
  for (const [re, name] of SECRET_PATTERNS) { const m = html.match(re); if (m) secrets.push({ name, sample: m[0].slice(0, 12) + "…" }); }
  const placeholders = [];
  for (const re of PLACEHOLDER_PATTERNS) { const m = text.match(re); if (m) placeholders.push(m[0].slice(0, 40)); }

  const stylesheets = $('link[rel="stylesheet"]').map((_, el) => ({ href: $(el).attr("href"), media: $(el).attr("media") ?? null, onload: $(el).attr("onload") ?? null })).get();

  return {
    url, normUrl: normUrl(url), status, fetchedAt: new Date().toISOString().slice(0, 10),
    category: categorize(url), htmlBytes: Buffer.byteLength(html),
    headers: {
      "content-security-policy": headers["content-security-policy"] || null,
      "strict-transport-security": headers["strict-transport-security"] || null,
      "x-content-type-options": headers["x-content-type-options"] || null,
      "x-frame-options": headers["x-frame-options"] || null,
      "referrer-policy": headers["referrer-policy"] || null,
      "permissions-policy": headers["permissions-policy"] || null,
      "cross-origin-opener-policy": headers["cross-origin-opener-policy"] || null,
      "cross-origin-resource-policy": headers["cross-origin-resource-policy"] || null,
      "cache-control": headers["cache-control"] || null,
      "content-type": headers["content-type"] || null,
    },
    lang: $("html").attr("lang") || null,
    title: $("head title").first().text().trim() || null,
    metaDescription: $('meta[name="description"]').attr("content")?.trim() || null,
    canonical: $('link[rel="canonical"]').attr("href")?.trim() || null,
    canonicalCount: $('link[rel="canonical"]').length,
    robotsMeta: $('meta[name="robots"]').attr("content")?.trim() || null,
    og: { title: $('meta[property="og:title"]').attr("content") || null, image: $('meta[property="og:image"]').attr("content") || null, url: $('meta[property="og:url"]').attr("content") || null },
    jsonLd, emptyLd,
    h1: $("h1").map((_, el) => $(el).text().replace(/\s+/g, " ").trim()).get(),
    headings,
    images, imgCount: images.length,
    imgMissingAlt: images.filter((i) => !i.hasAlt).length,
    imgNoDims: images.filter((i) => !i.width || !i.height).length,
    imgRasterNonModern: images.filter((i) => /\.(png|jpe?g)(\?|$)/i.test(i.src)).length,
    internalLinks: [...internal], externalLinks: [...external],
    stylesheets, renderBlockingCss: stylesheets.filter((s) => !s.media && !s.onload).length,
    scriptCount: $("script").length,
    tel: [...tel].filter(Boolean), email: [...email].filter(Boolean),
    iconOnlyLinks, secrets, placeholders,
    textLen: text.length, textSample: text.slice(0, 280),
    skipLink: $('a[href^="#"]').filter((_, el) => /skip/i.test($(el).text()) || /skip/i.test($(el).attr("class") || "")).length > 0,
    hasMainLandmark: $("main,[role=main]").length > 0,
  };
}

function perPageChecks(a) {
  const REQ = { "content-security-policy": "CSP", "strict-transport-security": "HSTS", "x-content-type-options": "X-Content-Type-Options", "x-frame-options": "X-Frame-Options", "referrer-policy": "Referrer-Policy" };
  // SEO
  if (!a.title) finding("SEO", "high", "missing-title", a.url, "No <title>", "Add a unique <title>.");
  else if (a.title.length > 65) finding("SEO", "low", "title-too-long", a.url, `title ${a.title.length} chars`, "Trim title to ≤60 chars so it isn't truncated in SERPs.");
  else if (a.title.length < 15) finding("SEO", "low", "title-too-short", a.url, `title ${a.title.length} chars: "${a.title}"`, "Expand the title.");
  if (!a.metaDescription) finding("SEO", "high", "missing-meta-description", a.url, "No meta description", "Add a unique meta description (~150 chars).");
  else if (a.metaDescription.length > 165) finding("SEO", "low", "meta-description-too-long", a.url, `${a.metaDescription.length} chars`, "Trim to ≤160 chars.");
  else if (a.metaDescription.length < 70) finding("SEO", "low", "meta-description-too-short", a.url, `${a.metaDescription.length} chars`, "Expand toward ~150 chars.");
  if (!a.canonical) finding("SEO", "high", "missing-canonical", a.url, "No canonical", "Add a self-referential canonical.");
  else if (normUrl(a.canonical) !== a.normUrl) finding("SEO", "medium", "canonical-mismatch", a.url, `canonical=${a.canonical}`, "Confirm this page should canonicalize elsewhere; otherwise make it self-referential.");
  if (a.canonicalCount > 1) finding("SEO", "medium", "multiple-canonical", a.url, `${a.canonicalCount} canonical tags`, "Keep exactly one canonical.");
  if (a.emptyLd) finding("SEO", "low", "empty-jsonld-block", a.url, `${a.emptyLd} empty ld+json <script>`, "Remove empty JSON-LD script blocks.");
  a.jsonLd.forEach((j) => { if (!j.ok) finding("SEO", "high", "invalid-jsonld", a.url, j.error, "Fix the JSON-LD so it parses."); });
  if (a.h1.length === 0) finding("SEO", "medium", "no-h1", a.url, "No <h1>", "Add exactly one <h1>.");
  else if (a.h1.length > 1) finding("SEO", "low", "multiple-h1", a.url, `${a.h1.length} <h1>`, "Use a single <h1>.");
  // heading skips
  let prev = 0;
  for (const h of a.headings) { if (prev && h.level > prev + 1) { finding("SEO", "low", "heading-skip", a.url, `h${prev}→h${h.level} ("${h.text}")`, "Don't skip heading levels."); break; } prev = h.level; }
  // Security
  for (const [k, label] of Object.entries(REQ)) if (!a.headers[k]) finding("Security", "high", "missing-security-header", a.url, `missing ${label}`, `Send ${label} on this response.`);
  const csp = a.headers["content-security-policy"] || "";
  if (/script-src[^;]*'unsafe-inline'/.test(csp)) finding("Security", "medium", "csp-unsafe-inline-script", a.url, "script-src allows 'unsafe-inline'", "Move to nonces/hashes and drop 'unsafe-inline' from script-src.");
  if (/style-src[^;]*'unsafe-inline'/.test(csp)) finding("Security", "low", "csp-unsafe-inline-style", a.url, "style-src allows 'unsafe-inline'", "Prefer hashed/nonce styles where practical.");
  a.secrets.forEach((s) => finding("Security", "critical", "possible-secret", a.url, `${s.name}: ${s.sample}`, "Rotate and remove any secret from client-served HTML/JS."));
  // Accessibility
  if (!a.lang) finding("Accessibility", "high", "missing-lang", a.url, "<html> has no lang", "Add lang=\"en\".");
  if (a.imgMissingAlt) finding("Accessibility", "medium", "img-missing-alt", a.url, `${a.imgMissingAlt}/${a.imgCount} <img> without alt`, "Add alt text (empty alt=\"\" only for decorative images).");
  if (a.iconOnlyLinks) finding("Accessibility", "medium", "icon-only-link-no-name", a.url, `${a.iconOnlyLinks} icon-only links without accessible name`, "Add aria-label to icon-only links.");
  if (!a.hasMainLandmark) finding("Accessibility", "low", "no-main-landmark", a.url, "No <main> landmark", "Wrap primary content in <main>.");
  // Speed
  const kb = Math.round(a.htmlBytes / 1024);
  if (a.htmlBytes > 150000) finding("Speed", "high", "html-too-heavy", a.url, `HTML ${kb}KB`, "Reduce inline CSS/markup; split or defer.");
  else if (a.htmlBytes > 100000) finding("Speed", "medium", "html-heavy", a.url, `HTML ${kb}KB`, "Trim page weight toward <100KB HTML.");
  if (a.imgNoDims) finding("Speed", "low", "img-missing-dimensions", a.url, `${a.imgNoDims}/${a.imgCount} <img> without width/height`, "Set width/height to reserve space (avoid CLS).");
  if (a.imgRasterNonModern) finding("Speed", "low", "img-not-modern-format", a.url, `${a.imgRasterNonModern} raster <img> not webp/avif`, "Serve webp/avif with fallback.");
  // Content
  a.placeholders.forEach((p) => finding("Content", "high", "placeholder-leak", a.url, `"${p}"`, "Replace placeholder/template text with real copy."));
  if (a.textLen < 500 && a.category !== "unique") finding("Content", "medium", "thin-content", a.url, `~${a.textLen} chars of body text`, "Add substantive, locally-distinct copy.");
}

async function crossPageChecks(arts, sitemapSet) {
  // Duplicate titles / descriptions
  const byTitle = {}, byDesc = {};
  for (const a of arts) { if (a.title) (byTitle[a.title] ??= []).push(a.url); if (a.metaDescription) (byDesc[a.metaDescription] ??= []).push(a.url); }
  for (const [t, us] of Object.entries(byTitle)) if (us.length > 1) finding("SEO", "medium", "duplicate-title", us[0], `${us.length} pages share title "${t.slice(0, 60)}": ${us.slice(0, 4).join(", ")}`, "Make each title unique.");
  for (const [d, us] of Object.entries(byDesc)) if (us.length > 1) finding("SEO", "medium", "duplicate-meta-description", us[0], `${us.length} pages share a meta description: ${us.slice(0, 4).join(", ")}`, "Make each meta description unique.");

  // NAP parity across pages
  const phones = new Set(), emails = new Set();
  arts.forEach((a) => { a.tel.forEach((t) => phones.add(t)); a.email.forEach((e) => emails.add(e)); });
  if (phones.size > 1) finding("Content", "high", "nap-phone-inconsistent", ORIGIN, `Distinct phone numbers site-wide: ${[...phones].join(", ")}`, "Use one canonical phone number everywhere (NAP consistency).");
  if (emails.size > 1) finding("Content", "medium", "nap-email-multiple", ORIGIN, `Distinct emails site-wide: ${[...emails].join(", ")}`, "Confirm each email is intentional; keep NAP consistent.");

  // Broken internal links (probe unique targets not already known-good in sitemap)
  const known = new Set([...sitemapSet].map(normUrl));
  const targets = new Set();
  arts.forEach((a) => a.internalLinks.forEach((l) => { if (!known.has(l)) targets.add(l); }));
  const list = [...targets].slice(0, 120);
  const results = await mapLimit(list, 8, async (u) => [u, await probeStatus(u)]);
  for (const [u, st] of results) if (st === 0 || st >= 400) {
    const from = arts.find((a) => a.internalLinks.includes(u))?.url;
    finding("Content", st >= 500 || st === 0 ? "high" : "medium", "broken-internal-link", from || u, `${u} → HTTP ${st || "unreachable"}`, "Fix or remove the link.");
  }

  // Exposed build source (the plan's live finding) — probe a couple of scripts.
  for (const s of ["/scripts/generate-sitemap.py", "/scripts/generate-location-service-pages.py"]) {
    const st = await probeStatus(ORIGIN + s);
    if (st === 200) finding("Security", "high", "exposed-source", ORIGIN + s, `${s} is publicly served (HTTP 200)`, "Add scripts/ to .assetsignore so build source isn't served.");
  }
}

async function mapLimit(items, limit, fn) {
  const out = []; let i = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) { const idx = i++; out[idx] = await fn(items[idx], idx); }
  }));
  return out;
}

async function main() {
  await mkdir(ART, { recursive: true });
  const all = await getSitemapUrls();
  const sitemapSet = new Set(all.map(normUrl));
  const targets = selectTargets(all);
  console.error(`sitemap: ${all.length} URLs; auditing ${targets.length} (matrixSample=${CFG.matrixSample}, blogSample=${CFG.blogSample}, full=${CFG.full})`);

  const arts = [];
  await mapLimit(targets, 8, async (url) => {
    try {
      const { status, headers, text } = await fetchText(url);
      const a = extract(url, status, headers, text);
      arts.push(a);
      await writeFile(new URL(`${slugFor(url)}.json`, ART), JSON.stringify(a, null, 2));
      if (status >= 400) finding("SEO", "high", "page-error-status", url, `HTTP ${status}`, "Page in sitemap returns an error.");
    } catch (e) {
      finding("SEO", "high", "fetch-failed", url, String(e.message || e).slice(0, 140), "Page could not be fetched during audit.");
    }
  });

  arts.forEach(perPageChecks);
  await crossPageChecks(arts, sitemapSet);

  const manifest = {
    origin: ORIGIN, generatedAt: new Date().toISOString().slice(0, 10),
    sitemapCount: all.length, auditedCount: arts.length,
    pages: arts.map((a) => ({ url: a.url, slug: slugFor(a.url), category: a.category, artifact: `artifacts/${slugFor(a.url)}.json` })),
  };
  await writeFile(new URL("manifest.json", OUT), JSON.stringify(manifest, null, 2));
  await writeFile(new URL("deterministic-findings.json", OUT), JSON.stringify(FINDINGS, null, 2));

  const bySev = FINDINGS.reduce((m, f) => ((m[f.severity] = (m[f.severity] || 0) + 1), m), {});
  console.error(`deterministic findings: ${FINDINGS.length}`, JSON.stringify(bySev));
}

main().catch((e) => { console.error(e); process.exit(1); });
