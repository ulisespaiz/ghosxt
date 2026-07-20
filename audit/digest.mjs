// Build reports/digest.json — the ONE compact file the code-dimension and
// site-wide fleet agents read instead of 79 individual artifacts.
//
// Extraction contract (must match crawl.mjs's artifact shape):
//   - jsonLd entries store their @type values under `.types` (an array),
//     NOT `.type` / `['@type']`. Getting this wrong feeds the SEO/content
//     agents a false "no schema" premise and poisons every downstream call.
//
// Run after crawl.mjs:  node digest.mjs   →  reports/digest.json

import { readFileSync, writeFileSync, statSync } from "node:fs";

const reportsDir = new URL("./reports/", import.meta.url).pathname;
const manifest = JSON.parse(readFileSync(`${reportsDir}manifest.json`, "utf8"));

const digest = {};
let skipped = 0;
for (const p of manifest.pages) {
  try {
    const a = JSON.parse(readFileSync(`${reportsDir}artifacts/${p.slug}.json`, "utf8"));
    digest[p.slug] = {
      url: a.url,
      category: a.category,
      title: a.title,
      metaDescription: a.metaDescription,
      h1: a.h1,
      headings: (a.headings || []).map((h) => `${h.level}:${h.text}`),
      jsonLdTypes: [...new Set((a.jsonLd || []).flatMap((l) => l.types || []))],
      tel: a.tel,
      email: a.email,
      textLen: a.textLen,
      textSample: a.textSample,
    };
  } catch (e) {
    skipped++;
    console.error(`skip ${p.slug}: ${e.message}`);
  }
}

writeFileSync(`${reportsDir}digest.json`, JSON.stringify(digest));
console.log(
  `digest: ${Object.keys(digest).length} pages${skipped ? ` (${skipped} skipped)` : ""}, ` +
  `${statSync(`${reportsDir}digest.json`).size} bytes`
);
