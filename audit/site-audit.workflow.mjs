// The audit fleet — a Workflow script orchestrated by Fable (the main loop),
// with Sonnet doing the broad per-dimension fan-out and Opus doing the
// judgment-heavy cross-page + verification stages.
//
// The Workflow sandbox has no filesystem/network, so:
//   - I (Fable) pre-produce the artifacts on disk (crawl.mjs + render.mjs) and
//     pass this script the reports directory + page list via `args`.
//   - Each worker AGENT reads the artifact JSON / screenshots itself and WRITES
//     its findings to reports/agent-findings/<label>.json (agents have fs/tools).
//   - synthesize.mjs (run by Fable afterwards) merges every findings file.
//
// Invoke with:
//   Workflow({ scriptPath: 'audit/site-audit.workflow.mjs', args: {...} })

export const meta = {
  name: "ghosxt-site-audit",
  description: "Fleet auditing live ghosxt.com across UI, ADA, Speed, SEO, Security, Content — Fable PM, Sonnet/Opus workers.",
  phases: [
    { title: "Code dimensions", detail: "SEO / Security / Content over all crawled pages (Sonnet)" },
    { title: "Rendered dimensions", detail: "UI / ADA / Speed over screenshots + metrics (Sonnet)" },
    { title: "Site-wide", detail: "Cannibalization, NAP/pricing parity, duplication, coverage (Opus)" },
    { title: "Verify", detail: "Adversarially confirm High/Critical findings (Opus)" },
  ],
};

const A = args || {};
const reportsDir = A.reportsDir;
const date = A.date || "today";
const batchCode = A.batchCode || 8;
const batchRendered = A.batchRendered || 4;

const PAGES_SCHEMA = {
  type: "object", required: ["pages"], properties: {
    pages: { type: "array", items: { type: "object", required: ["url", "slug", "category", "rendered"],
      properties: { url: { type: "string" }, slug: { type: "string" }, category: { type: "string" }, rendered: { type: "boolean" } } } },
  },
};

const artifactPath = (slug) => `${reportsDir}/artifacts/${slug}.json`;
const shot = (slug, vp) => `${reportsDir}/screenshots/${slug}-${vp}.png`;
const outPath = (label) => `${reportsDir}/agent-findings/${label}.json`;

function chunk(arr, n) { const out = []; for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n)); return out; }

const SCHEMA = `Return ONLY findings you can back with concrete evidence. Write them as a JSON array to the output file, each item:
{ "dimension": "<your dimension>", "severity": "critical|high|medium|low|info",
  "rule": "<short-kebab-slug>", "url": "<page url>",
  "evidence": "<specific, quotable proof — a value, a selector, what the screenshot shows>",
  "fix": "<one concrete action>", "confidence": "high|medium|low" }
If there are genuinely no issues for a page, that's fine — omit it. Never invent issues to fill space. Write [] if the batch is clean.`;

function fileInstr(label) {
  return `When done, WRITE your JSON array to exactly this path (create parent dirs if needed):\n  ${outPath(label)}\nUse the Write tool (or \`mkdir -p\` + Write). The file MUST be valid JSON (an array). End your run by confirming the file was written and how many findings it holds.`;
}

function pageList(batch, withShots) {
  return batch.map((p) => {
    let s = `- ${p.url}\n    artifact: ${artifactPath(p.slug)}`;
    if (withShots) s += `\n    screenshot(mobile 390px): ${shot(p.slug, "mobile")}\n    screenshot(desktop 1366px): ${shot(p.slug, "desktop")}`;
    return s;
  }).join("\n");
}

const CHECKLISTS = {
  SEO: `Read each page's artifact JSON. Judge (beyond the mechanical checks already done):
  - Title & meta description: compelling, keyword-appropriate for the page's intent, and DISTINCT from the other pages in your batch? Quote duplicates/near-duplicates.
  - Canonical: points at the right URL for this page's role?
  - JSON-LD (jsonLd[].types): is the right schema present and does it match the visible page (e.g. FAQPage only if real FAQs, LocalBusiness NAP correct, Service/Offer sensible)? Missing obvious schema?
  - Headings outline: logical, single clear H1 that matches search intent?
  - Thin/duplicative body copy that won't rank (textSample, textLen).`,
  Security: `Read each page's artifact JSON. Judge:
  - headers{}: any missing/weak among CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy.
  - CSP: 'unsafe-inline' in script-src/style-src (what inline code depends on it? is a nonce/hash migration feasible?), overly broad sources.
  - secrets[]: anything that looks like a real key/credential/PII served to the client.
  - Any off-site scripts/embeds and whether they're trust-appropriate.`,
  Content: `Read each page's artifact JSON. Judge:
  - NAP: tel[] / email[] — consistent within the batch and plausible? Flag divergent phone/email formats or values.
  - placeholders[]: any leftover template/boilerplate tokens.
  - For templated city pages (category matrix:*): is the copy genuinely locally distinct, or find-and-replace boilerplate/thin? (textSample)
  - Obvious grammar/clarity problems, missing/weak calls-to-action, claims that look inconsistent across the batch.`,
  UI: `READ the mobile AND desktop screenshots for each page (use the Read tool on the PNG paths — you can see images). Also read the artifact JSON. Judge what you SEE:
  - Layout breakage: overlapping, clipped, or misaligned elements; content escaping its container; broken/awkward wrapping.
  - Broken or missing images (placeholder boxes, alt text showing).
  - Mobile: horizontal scrolling (cross-check render metric overflowPx), cramped/overlapping nav, text or buttons running off-screen, tiny tap targets (metric smallTapTargets).
  - Above the fold: is the value prop + primary CTA visible and legible on mobile?
  - Visual consistency of shared header/nav/footer across the batch; obvious spacing/alignment inconsistencies.`,
  Accessibility: `READ the screenshots AND the artifact JSON, and consult render metrics (contrastFailures, landmarks, smallTapTargets). Judge to WCAG 2.2 AA:
  - Color contrast: for each candidate in the metric's contrastFailures, LOOK at the screenshot and confirm whether the text is genuinely hard to read (some candidates are measurement noise over images/gradients — only report confirmed ones). Note the location.
  - Landmarks: missing <main>/<header>/<nav> (landmarks metric), heading order.
  - Images without alt (artifact imgMissingAlt), icon-only controls without names (iconOnlyLinks).
  - lang attribute, visible focus, tap-target size on mobile.`,
  Speed: `Read the artifact JSON + render metrics (lcpMs, cls, lcpElement, fcpMs — note timings are lab/indicative, layout metrics are real). Judge:
  - CLS > 0.1 (what element shifts — lcpElement/screenshot), LCP element sensible and not oversized.
  - Page weight (htmlBytes), images without width/height (imgNoDims → CLS risk), non-modern image formats (imgRasterNonModern), render-blocking CSS (renderBlockingCss), script count.
  - Caching headers (headers.cache-control).`,
};

async function dimensionFanout(dimension, batches, withShots, phaseTitle) {
  return parallel(batches.map((batch, i) => () => {
    const label = `${dimension.toLowerCase()}-${i}`;
    const prompt = `You are the **${dimension}** auditor in a live-site audit fleet for ghosxt.com (an IT/MSP marketing site). Audit ONLY the ${dimension} dimension for these ${batch.length} live pages:\n\n${pageList(batch, withShots)}\n\nYour checklist:\n${CHECKLISTS[dimension]}\n\n${SCHEMA}\n\n${fileInstr(label)}`;
    return agent(prompt, { label, phase: phaseTitle, model: "sonnet", agentType: "general-purpose" }).then(() => label);
  }));
}

// ---- Bootstrap: load the audited page list from disk (Workflow sandbox has no fs) ----
phase("Code dimensions");
let pages = A.pages;
if (!pages) {
  const boot = await agent(
    `Bootstrap the audit page list. Read these two JSON files with the Read tool:\n  ${reportsDir}/manifest.json (has .pages = [{url,slug,category,artifact}])\n  ${reportsDir}/render-metrics.json (an object whose KEYS are the slugs that were rendered)\nReturn {pages:[{url,slug,category,rendered}]} — one entry for EVERY item in manifest.pages, with rendered=true iff that slug is a key in render-metrics.json. Do not omit or invent any page.`,
    { label: "bootstrap", phase: "Code dimensions", model: "sonnet", agentType: "general-purpose", schema: PAGES_SCHEMA });
  pages = (boot && boot.pages) || [];
}
const codePages = pages;
const renderedPages = pages.filter((p) => p.rendered);
log(`Loaded ${codePages.length} pages (${renderedPages.length} rendered).`);

// ---- Phase 1: code dimensions (Sonnet) over all crawled pages ----
const codeBatches = chunk(codePages, batchCode);
await parallel([
  () => dimensionFanout("SEO", codeBatches, false, "Code dimensions"),
  () => dimensionFanout("Security", codeBatches, false, "Code dimensions"),
  () => dimensionFanout("Content", codeBatches, false, "Code dimensions"),
]);

// ---- Phase 2: rendered dimensions (Sonnet) over the rendered subset ----
phase("Rendered dimensions");
const rBatches = chunk(renderedPages, batchRendered);
await parallel([
  () => dimensionFanout("UI", rBatches, true, "Rendered dimensions"),
  () => dimensionFanout("Accessibility", rBatches, true, "Rendered dimensions"),
  () => dimensionFanout("Speed", rBatches, true, "Rendered dimensions"),
]);

// ---- Phase 3: site-wide cross-page analyses (Opus) ----
phase("Site-wide");
const digestPath = `${reportsDir}/digest.json`;
const siteWide = [
  { label: "sitewide-cannibalization", task: `Keyword cannibalization. The site has templated city+service pages (cybersecurity-<city>, cloud-services-<city>, web-design-<city>, it-help-<city>) plus service hubs and city hubs. Read the artifact JSON for the pages below and identify sets of pages competing for the same search intent/keyword such that they'd split ranking signals or confuse canonicalization. Name the competing URL clusters and the shared intent.` },
  { label: "sitewide-nap-pricing", task: `NAP + pricing parity across the whole site. Read the artifacts and collect every distinct phone (tel[]), email (email[]), and any pricing figures in textSample. Report any inconsistency (different phone numbers/formats, different emails, mismatched prices/tiers between pages) with the exact conflicting values and URLs.` },
  { label: "sitewide-duplication", task: `Near-duplicate / thin templated content. Compare the same-family city pages (category matrix:*) using their headings + textSample. Estimate how templated vs. locally-distinct they are, and flag families that read as find-and-replace (an SEO doorway-page risk) with example URLs.` },
];
await parallel(siteWide.map((s) => () => {
  const prompt = `You are a senior site-wide auditor (Opus) for ghosxt.com. ${s.task}\n\nRead the site digest — ONE JSON file with all ${codePages.length} audited pages (url, title, metaDescription, h1, headings, tel, email, textSample, jsonLdTypes):\n  ${digestPath}\n\n${SCHEMA}\nUse dimension "SEO" for cannibalization/duplication and "Content" for NAP/pricing. ${fileInstr(s.label)}`;
  return agent(prompt, { label: s.label, phase: "Site-wide", model: "opus", agentType: "general-purpose" });
}));

// ---- Phase 4: adversarial verification of the deterministic High/Critical findings (Opus) ----
phase("Verify");
const detPath = `${reportsDir}/deterministic-findings.json`;
// The verify agents self-select High/Critical from the deterministic file on disk.
const verifyPrompts = Array.from({ length: 3 }, (_, i) => i);
await parallel(verifyPrompts.map((i) => () => {
  const label = `verify-${i}`;
  const prompt = `You are an adversarial verifier (Opus) in a live-site audit fleet for ghosxt.com. Gather the candidate findings to check:\n  1. Deterministic findings: read ${detPath}\n  2. Fleet findings: list ${reportsDir}/agent-findings/ and read every *.json EXCEPT verify-*.json\nFrom BOTH sources, collect the findings whose severity is HIGH or CRITICAL. Order them stably (deterministic first, then fleet files alphabetically) and take the shard where (index mod 3) === ${i}.\n\nFor each finding in your shard, open the referenced page's artifact JSON (${reportsDir}/artifacts/<slug>.json — derive <slug> from the url; home page is home.json) and, for UI/Accessibility findings, the screenshot (${reportsDir}/screenshots/<slug>-desktop.png or -mobile.png). Adversarially decide whether the finding is REAL. Default to "refuted" when the evidence doesn't hold up.\n\nWrite a JSON array to ${outPath(label)}, each item:\n{ "verifies": "<rule>", "url": "<url>", "verdict": "confirmed|refuted|adjusted", "adjustedSeverity": "critical|high|medium|low|info", "note": "<why, one line>" }\nOnly include the findings in your shard. Write [] if your shard is empty. Confirm the file was written and how many verdicts it holds.`;
  return agent(prompt, { label, phase: "Verify", model: "opus", agentType: "general-purpose" });
}));

log("Fleet complete — agent findings written to reports/agent-findings/. Run synthesize.mjs next.");
return { ok: true, codeBatches: codeBatches.length, renderedBatches: rBatches.length, siteWide: siteWide.length, verify: verifyPrompts.length, pages: pages.length };
