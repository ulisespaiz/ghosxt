// The audit fleet — a Workflow script orchestrated by Fable (the main loop),
// with Sonnet doing per-dimension judgment and Opus doing the cross-page +
// verification stages.
//
// Sized for the host's concurrency cap (min(16, cores-2)). The deterministic
// layer (crawl.mjs) already does the exhaustive per-page mechanical checks, so
// the fleet only adds JUDGMENT: visual review, contrast confirmation, thin /
// duplicate / cannibalization calls, holistic security review, and adversarial
// verification of the high-severity findings.
//
// The Workflow sandbox has no filesystem/network. I (Fable) pre-produce the
// artifacts on disk (crawl.mjs + render.mjs) and pass the reports dir + the
// rendered page list via `args`. Each worker AGENT reads the JSON/screenshots
// itself and WRITES its findings to reports/agent-findings/<label>.json.
//
// Invoke: Workflow({ scriptPath: 'audit/site-audit.workflow.mjs', args: {...} })

export const meta = {
  name: "ghosxt-site-audit",
  description: "Fleet auditing live ghosxt.com across UI, ADA, Speed, SEO, Security, Content — Fable PM, Sonnet/Opus workers.",
  phases: [
    { title: "Code dimensions", detail: "SEO / Content / Security judgment over the digest (Sonnet)" },
    { title: "Rendered dimensions", detail: "UI / ADA / Speed over screenshots + metrics (Sonnet)" },
    { title: "Site-wide", detail: "Cannibalization, NAP/pricing parity, duplication (Opus)" },
    { title: "Verify", detail: "Adversarially confirm High/Critical findings (Opus)" },
  ],
};

const A = args || {};
const reportsDir = A.reportsDir;
const repoRoot = A.repoRoot || "/home/user/ghosxt";
const renderedPages = A.renderedPages || [];
const digestPath = `${reportsDir}/digest.json`;
const detPath = `${reportsDir}/deterministic-findings.json`;

const artifactPath = (slug) => `${reportsDir}/artifacts/${slug}.json`;
const shot = (slug, vp) => `${reportsDir}/screenshots/${slug}-${vp}.png`;
const outPath = (label) => `${reportsDir}/agent-findings/${label}.json`;

const EFF = `Work efficiently. The page data is ALREADY extracted into the JSON files below — TRUST those fields. Do NOT re-fetch pages, re-run the crawler, or re-verify the extraction logic. Read each listed file at most once, form your judgment, then write findings. Finish in a handful of tool calls.`;

const SCHEMA = `Report ONLY issues you can back with concrete evidence — never invent issues to fill space. Write a JSON array to the output file; each item:
{ "dimension":"<dimension>", "severity":"critical|high|medium|low|info", "rule":"<kebab-slug>", "url":"<page url>", "evidence":"<specific proof — a value, selector, or what the screenshot shows>", "fix":"<one concrete action>", "confidence":"high|medium|low" }
Write [] if there's nothing to report.`;

function fileInstr(label) {
  return `Finally, WRITE your JSON array with the Write tool to exactly:\n  ${outPath(label)}\nIt MUST be a valid JSON array. Confirm the file and finding count when done.`;
}

function chunk(a, n) { const o = []; for (let i = 0; i < a.length; i += n) o.push(a.slice(i, i + n)); return o; }

function shotList(batch) {
  return batch.map((p) => `- ${p.url}\n    artifact: ${artifactPath(p.slug)}\n    mobile(390px): ${shot(p.slug, "mobile")}\n    desktop(1366px): ${shot(p.slug, "desktop")}`).join("\n");
}

// ---------- Phase 1: code dimensions (Sonnet) ----------
phase("Code dimensions");
const code = [
  { label: "seo-quality", dim: "SEO", body: `You are the SEO & structured-data judge. Read the site digest (one JSON file, all audited pages with title, metaDescription, h1, headings, jsonLdTypes, textSample):\n  ${digestPath}\nJudge: title/description quality + distinctiveness across the templated city pages (quote duplicates/near-duplicates); whether jsonLdTypes match each page's purpose (FAQPage↔real FAQs, LocalBusiness NAP, Service/Offer); single clear intent-matching H1; thin/duplicative copy. The mechanical checks (missing/oversized tags, invalid JSON-LD, dup titles) are already done — focus on judgment the rules can't make.` },
  { label: "content-quality", dim: "Content", body: `You are the content-consistency judge. Read the site digest:\n  ${digestPath}\nJudge: NAP consistency (tel/email across pages); templated city pages (slug patterns cybersecurity-/cloud-services-/web-design-/it-help-) that read as find-and-replace boilerplate vs. locally distinct; weak/missing calls-to-action on conversion pages; grammar/clarity/claims that look off. Quote specifics.` },
  { label: "security-review", dim: "Security", body: `You are the security & headers reviewer. Read:\n  ${artifactPath("home")} and ${artifactPath("contact")} (live response headers under .headers, plus any secrets[])\n  ${repoRoot}/_headers (the header/CSP source)\n  ${repoRoot}/src/worker.js (the contact-form + tracking Worker)\nJudge holistically: CSP strength (the 'unsafe-inline' in script-src/style-src — what inline code needs it, and whether nonces/hashes are feasible), any missing/weak header, input validation / honeypot / origin / Turnstile / HTML-escaping / error handling in the Worker, and any secret/PII exposure. The header presence and the /scripts/*.py exposure are already flagged by the rule engine — add the judgment.` },
];
await parallel(code.map((c) => () =>
  agent(`${c.body}\n\n${EFF}\n\n${SCHEMA}\nUse dimension "${c.dim}". ${fileInstr(c.label)}`,
    { label: c.label, phase: "Code dimensions", model: "sonnet", agentType: "general-purpose" })));

// ---------- Phase 2: rendered dimensions (Sonnet) ----------
phase("Rendered dimensions");
// Curate a visual-review subset covering each template shape, split into 2 batches.
const wantVisual = ["home", "contact", "pricing", "services", "salinas", "cybersecurity-monterey", "monterey-county", "about"];
const visual = wantVisual.map((s) => renderedPages.find((p) => p.slug === s)).filter(Boolean);
const vBatches = chunk(visual.length ? visual : renderedPages.slice(0, 8), 4);
const metricsPath = `${reportsDir}/render-metrics.json`;

const rendered = [];
vBatches.forEach((b, i) => {
  rendered.push({ label: `ui-${i}`, dim: "UI", body: `You are the UI/visual auditor. For each page, READ the mobile AND desktop screenshots (use Read on the PNG paths — you can see images) and the artifact JSON. Judge what you SEE: layout breakage/overlap/clipping, content escaping containers, broken/missing images, mobile horizontal scroll or off-screen elements, tiny tap targets, and whether the value prop + primary CTA are visible above the fold on mobile. Pages:\n${shotList(b)}` });
  rendered.push({ label: `ada-${i}`, dim: "Accessibility", body: `You are the accessibility (WCAG 2.2 AA) auditor. Read the screenshots + artifact JSON + the render metrics file (${metricsPath}; use each page's contrastFailures, landmarks, smallTapTargets, imgMissingAlt). For each contrastFailures candidate, LOOK at the screenshot and only report it if the text is genuinely hard to read (candidates over images/gradients are noise). Also judge: missing landmarks, heading order, icon-only controls without names, lang, tap-target size. Pages:\n${shotList(b)}` });
});
rendered.push({ label: "speed", dim: "Speed", body: `You are the Speed/Core-Web-Vitals auditor. Read the render metrics file (all rendered pages):\n  ${metricsPath}\nJudge: CLS > 0.1 (name the page), LCP element sanity, and cross-reference page weight / images-missing-dimensions / non-modern formats / render-blocking CSS from a few artifacts (${reportsDir}/artifacts/{home,pricing,salinas}.json). Timings are lab/indicative — weight CLS and the static budgets more than raw ms.` });

await parallel(rendered.map((r) => () =>
  agent(`${r.body}\n\n${EFF}\n\n${SCHEMA}\nUse dimension "${r.dim}". ${fileInstr(r.label)}`,
    { label: r.label, phase: "Rendered dimensions", model: "sonnet", agentType: "general-purpose" })));

// ---------- Phase 3: site-wide (Opus) ----------
phase("Site-wide");
const siteWide = [
  { label: "sitewide-cannibalization", dim: "SEO", task: `Keyword cannibalization. Identify sets of pages competing for the same city+service search intent (the templated cybersecurity-/cloud-services-/web-design-/it-help-<city> families vs. service hubs and city hubs) that would split ranking signals or confuse canonicalization. Name the competing URL clusters and the shared intent.` },
  { label: "sitewide-nap-pricing", dim: "Content", task: `NAP + pricing parity across the whole site. From every page's tel[], email[], and pricing figures in textSample, report inconsistencies (differing phone numbers/formats, differing emails, mismatched prices) with the exact conflicting values and URLs.` },
  { label: "sitewide-duplication", dim: "SEO", task: `Near-duplicate / thin templated content. Compare the same-family city pages (slug patterns cybersecurity-/cloud-services-/web-design-/it-help-) via headings + textSample. Flag families that read as find-and-replace doorway pages, with example URLs and how distinct they actually are.` },
];
await parallel(siteWide.map((s) => () =>
  agent(`You are a senior site-wide auditor (Opus) for ghosxt.com. ${s.task}\nRead the digest — ONE JSON file, all audited pages:\n  ${digestPath}\n\n${EFF}\n\n${SCHEMA}\nUse dimension "${s.dim}". ${fileInstr(s.label)}`,
    { label: s.label, phase: "Site-wide", model: "opus", agentType: "general-purpose" })));

// ---------- Phase 4: adversarial verification (Opus) ----------
phase("Verify");
await parallel([0, 1].map((i) => () => {
  const label = `verify-${i}`;
  return agent(
    `You are an adversarial verifier (Opus) for the ghosxt.com audit. Gather candidate findings:\n  1. Read ${detPath}\n  2. List ${reportsDir}/agent-findings/ and read every *.json EXCEPT verify-*.json\nCollect all HIGH and CRITICAL findings from both. Order them stably (deterministic first, then fleet files alphabetically) and take the shard where (index mod 2) === ${i}.\nFor each in your shard, open the referenced page's artifact (${reportsDir}/artifacts/<slug>.json — home page is home.json) and, for UI/Accessibility items, the screenshot. Adversarially decide if it's REAL; default to "refuted" when the evidence doesn't hold.\nWrite a JSON array to ${outPath(label)}:\n{ "verifies":"<rule>", "url":"<url>", "verdict":"confirmed|refuted|adjusted", "adjustedSeverity":"critical|high|medium|low|info", "note":"<one line>" }\n${EFF}\nWrite [] if your shard is empty. Confirm the file and count.`,
    { label, phase: "Verify", model: "opus", agentType: "general-purpose" });
}));

log("Fleet complete — findings in reports/agent-findings/. Run synthesize.mjs next.");
return { ok: true, code: code.length, rendered: rendered.length, siteWide: siteWide.length, verify: 2 };
