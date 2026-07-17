// Merge every findings source into one ranked report.
//
// Inputs (all under audit/reports/):
//   deterministic-findings.json     from crawl.mjs
//   agent-findings/*.json           from the Workflow fleet (dimension + site-wide + verify)
//   render-metrics.json             from render.mjs (CWV appendix)
//   manifest.json                   coverage
// Outputs:
//   audit/reports/audit-<date>.md
//   audit/reports/audit-<date>.html

import { readdir, readFile, writeFile } from "node:fs/promises";

const OUT = new URL("./reports/", import.meta.url);
const ORIGIN = "https://ghosxt.com";
const SEV_ORDER = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };
const SEV_LABEL = { critical: "CRITICAL", high: "HIGH", medium: "MEDIUM", low: "LOW", info: "INFO" };

function normUrl(u) { try { const x = new URL(u, ORIGIN); let p = x.pathname.replace(/\/index\.html$/, "/"); if (p.length > 1) p = p.replace(/\/$/, ""); return `${x.origin}${p || "/"}`; } catch { return u; } }
const readJson = async (u) => JSON.parse(await readFile(u, "utf8"));

async function main() {
  const date = (await readJson(new URL("manifest.json", OUT))).generatedAt || new Date().toISOString().slice(0, 10);
  const manifest = await readJson(new URL("manifest.json", OUT));
  const det = await readJson(new URL("deterministic-findings.json", OUT)).catch(() => []);

  // Load agent-findings/*.json → split into findings vs verify-verdicts.
  let agentFindings = [], verdicts = [];
  let agentFiles = [];
  try { agentFiles = (await readdir(new URL("agent-findings/", OUT))).filter((f) => f.endsWith(".json")); } catch {}
  const skipped = [];
  for (const f of agentFiles) {
    try {
      const data = await readJson(new URL(`agent-findings/${f}`, OUT));
      const arr = Array.isArray(data) ? data : data.findings || [];
      if (f.startsWith("verify-")) verdicts.push(...arr);
      else agentFindings.push(...arr.map((x) => ({ ...x, source: x.source || "agent", from: f })));
    } catch (e) { skipped.push(f); }
  }

  // Apply verify verdicts to ALL High/Critical findings (deterministic + fleet).
  const vmap = new Map();
  for (const v of verdicts) if (v && v.verifies && v.url) vmap.set(`${v.verifies}|${normUrl(v.url)}`, v);
  const all = [...det, ...agentFindings].filter((f) => f && f.dimension && f.severity && f.rule);
  for (const f of all) {
    if (f.severity === "high" || f.severity === "critical") {
      const v = vmap.get(`${f.rule}|${normUrl(f.url)}`);
      if (v) {
        if (v.verdict === "refuted") { f.severity = "info"; f.note = `verify: refuted — ${v.note || ""}`.trim(); }
        else if (v.verdict === "adjusted" && SEV_LABEL[v.adjustedSeverity]) { f.severity = v.adjustedSeverity; f.note = `verify: adjusted — ${v.note || ""}`.trim(); }
        else { f.verified = true; }
      }
    }
  }

  // Group by (dimension, rule); collapse site-wide repeats into one issue with many affected pages.
  const groups = new Map();
  for (const f of all) {
    const key = `${f.dimension}::${f.rule}`;
    if (!groups.has(key)) groups.set(key, { dimension: f.dimension, rule: f.rule, items: [], fixes: new Map(), sev: 5, verified: false });
    const g = groups.get(key);
    g.items.push({ url: f.url, evidence: f.evidence || "", severity: f.severity, source: f.source || "agent", confidence: f.confidence, note: f.note, verified: f.verified });
    if (f.fix) g.fixes.set(f.fix, (g.fixes.get(f.fix) || 0) + 1);
    g.sev = Math.min(g.sev, SEV_ORDER[f.severity] ?? 4);
    if (f.verified) g.verified = true;
  }
  const issues = [...groups.values()].map((g) => ({
    ...g,
    severity: Object.keys(SEV_ORDER).find((k) => SEV_ORDER[k] === g.sev) || "info",
    topFix: [...g.fixes.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "",
    count: g.items.length,
  })).sort((a, b) => SEV_ORDER[a.severity] - SEV_ORDER[b.severity] || b.count - a.count || a.dimension.localeCompare(b.dimension));

  // Counts
  const bySev = {}, byDim = {};
  for (const i of issues) { bySev[i.severity] = (bySev[i.severity] || 0) + 1; byDim[i.dimension] = (byDim[i.dimension] || 0) + 1; }
  const totalIssues = issues.length;
  const affectedPages = new Set(all.map((f) => normUrl(f.url))).size;

  // ---- Markdown ----
  const md = [];
  md.push(`# Ghosxt.com live-site audit — ${date}`);
  md.push("");
  md.push(`Audited **${manifest.auditedCount}/${manifest.sitemapCount}** sitemap URLs (all unique templates + sampled city matrices + sampled blog). Fleet: Fable PM · Sonnet dimension workers · Opus site-wide + verification.`);
  md.push("");
  md.push(`**${totalIssues} distinct issue types** across ~${affectedPages} pages.`);
  md.push("");
  md.push("| Severity | Issue types |");
  md.push("|---|---|");
  for (const s of Object.keys(SEV_ORDER)) if (bySev[s]) md.push(`| ${SEV_LABEL[s]} | ${bySev[s]} |`);
  md.push("");
  md.push("| Dimension | Issue types |");
  md.push("|---|---|");
  for (const [d, n] of Object.entries(byDim).sort((a, b) => b[1] - a[1])) md.push(`| ${d} | ${n} |`);
  md.push("");
  if (skipped.length) md.push(`> Note: ${skipped.length} agent findings file(s) were unreadable and skipped: ${skipped.join(", ")}\n`);

  for (const s of Object.keys(SEV_ORDER)) {
    const list = issues.filter((i) => i.severity === s);
    if (!list.length) continue;
    md.push(`## ${SEV_LABEL[s]} (${list.length})`);
    md.push("");
    for (const i of list) {
      md.push(`### [${i.dimension}] ${i.rule}${i.verified ? " ✓verified" : ""} — ${i.count} page${i.count > 1 ? "s" : ""}`);
      if (i.topFix) md.push(`**Fix:** ${i.topFix}`);
      md.push("");
      for (const it of i.items.slice(0, 12)) md.push(`- \`${it.url}\` — ${it.evidence}${it.note ? ` _(${it.note})_` : ""}`);
      if (i.items.length > 12) md.push(`- …and ${i.items.length - 12} more`);
      md.push("");
    }
  }

  // CWV appendix
  try {
    const rm = await readJson(new URL("render-metrics.json", OUT));
    md.push("## Appendix — rendered metrics (lab/indicative)");
    md.push("");
    md.push("| Page | LCP el | LCP ms | CLS | Contrast fails | Mobile overflow px | Small tap targets |");
    md.push("|---|---|---|---|---|---|---|");
    for (const [slug, v] of Object.entries(rm)) {
      const d = v.viewports.desktop || {}, m = v.viewports.mobile || {};
      md.push(`| ${slug} | ${d.lcpElement || "?"} | ${d.lcpMs ?? "?"} | ${d.cls ?? "?"} | ${d.contrastFailCount ?? "?"} | ${m.overflowPx ?? "?"} | ${m.smallTapTargets ?? "?"} |`);
    }
    md.push("");
  } catch {}

  const mdStr = md.join("\n");
  await writeFile(new URL(`audit-${date}.md`, OUT), mdStr);

  // ---- HTML ----
  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  const badge = (s) => `<span class="sev ${s}">${SEV_LABEL[s]}</span>`;
  const rows = issues.map((i) => `
    <details class="issue ${i.severity}">
      <summary>${badge(i.severity)} <b>[${esc(i.dimension)}]</b> ${esc(i.rule)}${i.verified ? " ✓" : ""} <span class="count">${i.count} page${i.count > 1 ? "s" : ""}</span></summary>
      ${i.topFix ? `<p class="fix"><b>Fix:</b> ${esc(i.topFix)}</p>` : ""}
      <ul>${i.items.slice(0, 30).map((it) => `<li><code>${esc(it.url)}</code> — ${esc(it.evidence)}${it.note ? ` <em>(${esc(it.note)})</em>` : ""}</li>`).join("")}${i.items.length > 30 ? `<li>…and ${i.items.length - 30} more</li>` : ""}</ul>
    </details>`).join("");
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ghosxt audit — ${date}</title>
  <style>
    :root{color-scheme:light dark}
    body{font:15px/1.5 system-ui,sans-serif;max-width:1000px;margin:0 auto;padding:24px;background:#0b0d10;color:#e8eaed}
    h1{font-size:26px} h2{margin-top:28px;border-bottom:1px solid #2a2f36;padding-bottom:6px}
    table{border-collapse:collapse;width:100%;margin:12px 0} th,td{border:1px solid #2a2f36;padding:6px 8px;text-align:left;font-size:13px}
    .cards{display:flex;gap:10px;flex-wrap:wrap;margin:12px 0}
    .card{background:#151a20;border:1px solid #2a2f36;border-radius:10px;padding:10px 14px;min-width:96px}
    .card b{font-size:22px;display:block}
    details.issue{background:#151a20;border:1px solid #2a2f36;border-left-width:4px;border-radius:8px;padding:8px 12px;margin:8px 0}
    summary{cursor:pointer} .count{color:#9aa4af;font-size:12px;margin-left:8px}
    .fix{color:#cfe8d0;margin:6px 0} code{background:#0b0d10;padding:1px 4px;border-radius:4px;font-size:12px}
    .sev{font:700 11px/1 system-ui;padding:3px 7px;border-radius:5px;color:#fff}
    .sev.critical{background:#b3261e} .sev.high{background:#c8631a} .sev.medium{background:#b58a00} .sev.low{background:#356fb3} .sev.info{background:#555}
    .issue.critical{border-left-color:#b3261e}.issue.high{border-left-color:#c8631a}.issue.medium{border-left-color:#b58a00}.issue.low{border-left-color:#356fb3}.issue.info{border-left-color:#555}
  </style></head><body>
  <h1>Ghosxt.com live-site audit — ${date}</h1>
  <p>Audited <b>${manifest.auditedCount}/${manifest.sitemapCount}</b> sitemap URLs. Fleet: Fable PM · Sonnet dimension workers · Opus site-wide + verification. <b>${totalIssues}</b> distinct issue types across ~${affectedPages} pages.</p>
  <div class="cards">${Object.keys(SEV_ORDER).filter((s) => bySev[s]).map((s) => `<div class="card">${badge(s)}<b>${bySev[s]}</b></div>`).join("")}</div>
  <div class="cards">${Object.entries(byDim).sort((a, b) => b[1] - a[1]).map(([d, n]) => `<div class="card">${esc(d)}<b>${n}</b></div>`).join("")}</div>
  <h2>Issues</h2>
  ${rows}
  </body></html>`;
  await writeFile(new URL(`audit-${date}.html`, OUT), html);

  console.error(`report: audit-${date}.md / .html — ${totalIssues} issue types; severities ${JSON.stringify(bySev)}; from ${det.length} deterministic + ${agentFindings.length} agent findings; ${verdicts.length} verdicts applied.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
