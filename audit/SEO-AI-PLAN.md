# SEO and AI-Search Plan (ChatGPT, Gemini, Claude, Perplexity, Copilot)

Date: 2026-09-28. PM: Opus. Research fleet: 6 Sonnet + 3 Haiku agents, every
finding below re-checked by the PM against the repo or live site before it was
kept. Plan only; nothing on the site has been changed by this pass.

## Bottom line

You do not need more pages. The site has 236 indexed URLs and 138 blog posts,
and the coverage map found a STRONG existing answer page for almost every buyer
question in the 20-prompt panel. What is holding back AI recommendations is:

1. **Off-site entity signals** (Business Profile, Bing Places, Apple, reviews,
   directories, local press). This is where assistants get most local
   recommendations, and Ghosxt is missing from almost every third-party surface
   that competitors appear on.
2. **Fact errors on the pages AI reads first.** llms.txt, llms-full.txt, the CMMC
   page, and a live case study still carry claims that contradict VERIFIED
   FACTS. An assistant quoting these is worse than not being cited at all.
3. **Authority gaps vs. competitors.** They have named case studies, awards,
   and Clutch or chamber presence. Ghosxt has none of these off-site.

The on-site work is mostly upgrades and consolidation. Net new content is one
blog lane (Google Workspace + Mac) where no local competitor ranks.

## What the research established

### How each assistant finds local businesses

| Assistant | Index it leans on | Crawler that matters for citation | #1 lever |
|---|---|---|---|
| ChatGPT search | OpenAI's own index, still partly Bing-fed | OAI-SearchBot | Bing Places + Bing Webmaster Tools + IndexNow |
| Gemini / AI Overviews / AI Mode | Google index + Business Profile | Googlebot | Complete, active Business Profile with recent reviews |
| Claude | Brave Search (inferred from ~87% result overlap; Anthropic has not confirmed) | Claude-SearchBot, Claude-User | Be well-ranked in Brave (no submission tool; crawlable + linked) |
| Perplexity | Own crawler plus third-party APIs | PerplexityBot | Third-party mentions; cites sources ~90% of the time |
| Copilot | Bing, nothing else | bingbot | Bing Places |

Evidence quality: mostly 2026 agency studies (Whitespark, BrightLocal, SE Ranking,
Profound). Directionally consistent, not platform-confirmed. Re-verify the
Claude/Brave link and ChatGPT's Bing dependence before the day-45 review.

### Confirmed from the live site

- No crawl blocker. Live robots.txt is byte-identical to the repo; 11 bot
  user-agents x 4 pages all returned 200 with full server-rendered content
  (H1, prices, FAQ in raw HTML). Caveat: spoofed UAs from a non-bot IP cannot
  prove Cloudflare's verified-bot blocking is off. Uli checks the dashboard.
- llms.txt, llms-full.txt, sitemap, feed, IndexNow key file all live.
- Sitemap, canonicals, redirects, JSON-LD parse: clean. No redirect chains.
  No JSON-LD parse errors. The organization @id is consistent sitewide.
- Ghosxt already surfaces for "best MSP Monterey County" with accurate facts,
  and its own "Top 5 Managed IT Providers" blog post ranks for "best managed IT
  provider Salinas." The comparison-post format works.
- **Stale response-time snippet still being served:** search summaries for
  /santa-cruz quote "most issues resolved remotely the same hour" (removed under
  D4). Same issue previously seen on /watsonville and /hollister.

### Confirmed defects (P0: AI will repeat these)

| # | Defect | Where | Why it matters |
|---|---|---|---|
| 1 | "24/7 help desk", "live, US-based IT help desk", "Azure and hybrid cloud" + Azure service menu, "Ransomware Recovery & Emergency IT" as a named service, "24/7 monitoring", "government-grade", "tested restores monthly", "VLAN segmentation, firewalls", "PCI scanning", "CMMC readiness" | llms.txt lines 1-35, llms-full.txt (15+ places) | These are the files an assistant reads when it wants a summary of Ghosxt. llms.txt says "24/7 help desk" and "8am to 6pm support" in the same file. |
| 2 | Claims Ghosxt writes the SSP and POA&M ("Yes... we produce the SSP and POA&M") | cmmc-compliance.html meta description (line 8), JSON-LD (line 45), service card (line 280), FAQ (line 328) | Directly contradicts the 2026-09-10 VERIFIED FACT. The page also never mentions GCC High, the defense capability that IS verified. |
| 3 | Case study is live and indexable with unresolved [VERIFY] items, including "identity monitoring", a capability not in VERIFIED FACTS | case-studies/remote-google-workspace-onboarding.html (robots index,follow; in sitemap and llms.txt) | Phase 5 said case study stays do-not-publish until approved. Needs Uli's call: approve and resolve the VERIFY items, or noindex it. |
| 4 | 139 `[VERIFY]` HTML comments shipped in live page source across 30 files | e.g. cmmc-compliance.html, the case study | Crawlers and LLMs ingest raw HTML. Each marker flags a claim as unverified to anyone who reads the source. |
| 5 | Salinas Chamber directory says "Certified in Cisco and Microsoft technologies" and lists phone 831-595-1114 | business.salinaschamber.com/member-directory/details/ghosxt-llc-3428815 | False Cisco claim plus a NAP mismatch on the one off-site listing that exists. |
| 6 | Founder node on index.html is a separate unlinked Person with jobTitle "Founder & Lead IT Engineer"; about.html's canonical Person (`#ulises-paiz`) says "Founder & CEO" | index.html:103-107 vs about.html:77-96 | Two identities for one person weakens entity resolution. |
| 7 | Public GitHub repo exposes CLAUDE.md (internal facts, the dental exclusion, the decision log) and the audit/ folder | github.com/ulisespaiz/ghosxt (visibility: public) | Not a ranking issue. It is an information-disclosure issue, and search engines index GitHub. Uli's decision. |

### Research findings the PM rejected after checking

- "20 pages missing meta descriptions" (Haiku): false positive. The tags span
  multiple lines; index.html and pricing.html both have them.
- "Who-you-talk-to FAQ on only 8 pages" (Sonnet): false. It is on 100 root pages.
- "10 blog posts orphaned from the blog index" (Haiku): false. All are linked
  from blog/all.html.
- "ctpat.html has no FAQ" (Sonnet): false. It has a visible FAQ (h3 format,
  line 1107) plus FAQPage JSON-LD.
- "Block GPTBot/ClaudeBot training crawlers" (Sonnet): rejected. For a small
  local business, being in training data helps the model know the entity. Keep
  allowing them.

## The plan

Owner legend: **AGENT** = done by the fleet in the repo. **ULI** = needs your
account logins or your judgment; agents prepare everything they can.

### Phase 0: Baseline first (week 0, before any change ships)

| # | Action | Owner | Effort |
|---|---|---|---|
| 0.1 | Run the 20-prompt panel (audit/llm-prompts.md) across ChatGPT, Gemini, Claude, Perplexity, Copilot. Log every verbatim misstatement. Without this you cannot tell whether anything below worked. | ULI (agents can pre-run the Claude column via web search and pre-fill the log) | 2 h |
| 0.2 | Export Search Console (non-brand queries, /blog/, /it-help-) and Business Profile insights, including the review list with dates | ULI | 1 h |
| 0.3 | Cloudflare dashboard: Security > Bots / AI Crawl Control. Confirm verified AI crawlers are allowed. | ULI | 10 min |

### Phase 1: Stop AI from repeating wrong facts (week 1)

| # | Action | Owner | Notes |
|---|---|---|---|
| 1.1 | Rewrite llms.txt against VERIFIED FACTS: kill 24/7 help desk, US-based help desk, Azure menu, named ransomware service, government-grade, VLAN/firewall, PCI scanning, CMMC readiness. Add support hours and the 4-hour notification as the only response commitment. Regenerate llms-full.txt, then fix the source pages it copies from (managed-it-services, co-managed-it, agriculture, trucking, cloud-services, backup-disaster-recovery, network-design, ransomware-recovery). | AGENT | Source pages first, then `scripts/generate-llms-full.py --apply` |
| 1.2 | CMMC page: remove SSP/POA&M authoring from meta, JSON-LD, card, and FAQ. Replace with the verified model (GCC High setup and hardening with Intune, Defender for Business, Conditional Access; assessment arranged through a third party). Add a GCC High section and FAQ. This also becomes the page that answers "GCC High for small defense contractors," which currently has no owner. | AGENT | Highest-value single page fix |
| 1.3 | Case study: Uli decides approve or noindex. If approve, resolve all 4 VERIFY items and remove "identity monitoring" unless it is added to VERIFIED FACTS. | ULI decides, AGENT executes | |
| 1.4 | Resolve or strip the 139 live `[VERIFY]` comments. Produce a list for Uli grouped by file; anything confirmed gets the marker removed, anything unconfirmed gets reworded to verified phrasing. Longer term, add a deploy-time check that fails if `[VERIFY]` is present in a served file. | AGENT + ULI | The deploy check is a small script plus a CI step |
| 1.5 | index.html founder node: replace the inline Person with `{"@id": "https://ghosxt.com/#ulises-paiz"}` and settle one jobTitle. | AGENT | |
| 1.6 | Fix the Chamber listing (remove Cisco certification, correct phone to (831) 204-0501). | ULI | 15 min; email the chamber |
| 1.7 | Request re-crawl of /santa-cruz, /watsonville, /hollister and every page changed in 1.1-1.5: Google Search Console URL inspection + IndexNow submission (key already live). | AGENT prepares URL list and IndexNow call; ULI runs GSC | IndexNow covers Bing, and so ChatGPT and Copilot |
| 1.8 | Decide repo visibility. Options: make private (Cloudflare deploy does not need it public), or move CLAUDE.md and audit/ out of the public repo. | ULI | |

### Phase 2: Off-site entity build (weeks 1-6, ~3 h/week, the biggest lever)

| # | Action | Assistant it feeds | Effort | Evidence |
|---|---|---|---|---|
| 2.1 | Business Profile full pass: primary category, secondary categories, full services list, description, photos, service areas that match the site's areaServed. Q&A is gone (removed Dec 2025); Gemini's "Ask" now pulls from profile fields + site + reviews. Confirm the address is hidden (service-area business). | Gemini, AI Overviews | 3 h | Strong |
| 2.2 | Claim Bing Places (import from Business Profile) and verify Bing Webmaster Tools; submit sitemap. | ChatGPT, Copilot | 1 h | Strong |
| 2.3 | Claim Apple Business (the unified Business Connect, Apr 2026). | Siri, Apple Maps | 1 h | Moderate, emerging |
| 2.4 | LinkedIn company page + Uli's profile aligned word-for-word with VERIFIED FACTS (credentials exactly, no clearance level, no vendor names). LinkedIn is among the most-cited domains for professional queries. | All | 2 h | Strong |
| 2.5 | Free listings where competitors already rank for contested queries: ThreeBestRated (Salinas IT), InfoMSP, mspdatabase.com, itcompanies.net, Clutch (free profile + ask 3-5 clients for Clutch reviews). Skip paid placement on UpCity and Expertise.com. | Perplexity, ChatGPT | 3 h | Moderate |
| 2.6 | Review habit: ask every client at a natural milestone (onboarding done, incident resolved, QBR), never gated, never incentivized (FTC rule, up to $51,744 per violation). Reply within 48 h. Realistic target for a solo MSP: 1 to 2 new reviews a month, steady, rather than bursts. | Gemini, all | 30 min/wk | Strong |
| 2.7 | One local press or community play per quarter: a free cyber clinic or chamber/SBDC workshop, pitched to Monterey County Weekly, The Californian, KSBW, Santa Cruz Sentinel. Third-party brand mentions correlate with AI citation more than backlinks do. This is also what unlocks Wikidata later. | All | 3 h/quarter | Moderate-strong |
| 2.8 | SAM.gov / SBA Small Business Search (replaced DSBS July 2025) completeness pass, with GCC High as a stated capability. | Federal buyers; weak AI evidence | 1 h | Weak-moderate |
| 2.9 | Agent-prepared copy kit so every listing says the same thing: 50-, 150-, and 750-character descriptions, services list, categories, NAP block, all from VERIFIED FACTS. | AGENT | Do first; 2.1-2.5 paste from it | |

### Phase 3: On-site upgrades (weeks 2-6, agent fleet)

Ranked by expected citation impact. No new root pages in this phase.

| # | Page | Upgrade |
|---|---|---|
| 3.1 | it-for-audited-companies.html, google-workspace-mac-it.html | Launch the two Phase 5 drafts once Uli approves: resolve VERIFY items, remove noindex, run generate-og-images.py, add to llms.txt and nav, regenerate sitemap. They are the only answers to prompts 11, 13, 14, and 19. |
| 3.2 | Compliance pages (cmmc, hipaa, pci, ctpat, cyber-insurance) | Add 1-3 citations to primary sources (NIST SP 800-171, HHS HIPAA Security Rule, PCI SSC, CBP C-TPAT MSC, CISA). Zero root pages link to any .gov source today. |
| 3.4 | it-consulting-vcio.html | Lead with a plain definition of a vCIO in the first 100 words. Cross-link the vCIO blog post. |
| 3.5 | pricing.html | First 300 words: one plain sentence stating who Ghosxt is, where, and the four prices. Currently leads with a tagline. |
| 3.6 | break-fix-vs-managed-it.html | Add in-house vs outsourced cost with worked arithmetic from published prices; link the Top 5 comparison post. |
| 3.7 | blog/switching-it-providers-salinas-monterey-checklist | Add a "questions to ask before you sign" section (pre-contract intent). |
| 3.8 | Cannibalization merges | (a) blog/managed-it-services-cost-salinas-2026 duplicates managed-it-cost-monterey-county: merge into the root page, 301 the post. (b) blog/cyber-insurance-small-business-2026 vs cyber-insurance-compliance.html: re-angle the post to "what cyber insurance covers"; keep the renewal checklist. (c) vCIO post vs service page: trim the post, link it to the page. (d) best-it-support-in-salinas + best-it-support-in-monterey: differentiate, or merge and 301. (e) M365 Copilot trio: give each post a distinct reader (buyer pricing, security risk, admin setup) and cross-link. |
| 3.9 | Patch Tuesday posts | Link each to the next month and to the evergreen patch-management post so authority pools in one place. |
| 3.10 | Titles | Trim the 10 titles over 60 characters (worst: IT setup checklist at 96). |

### Phase 4: New content (weeks 3-10), the only net-new work recommended

| # | Item | Why |
|---|---|---|
| 4.1 | **Google Workspace + Mac blog lane, 4-6 posts.** Examples: Microsoft 365 vs Google Workspace for a 10-person company (currently no page answers this); phishing-resistant MFA on Google Workspace; Google Workspace backup; offboarding contractors on Workspace; Mac zero-touch enrollment walkthrough. | No local competitor ranks for Google Workspace + Mac IT in California; it is only 2 of 138 posts today; it matches a verified capability and a Phase 5 vertical. |
| 4.2 | Optional: one service-area hub page listing every city and county page. | Gives an assistant one URL to cite for "which cities do you serve." Only if Uli wants it; lowest priority. |
| 4.3 | Named case studies, when clients agree. | Every competitor has named case studies; this is the biggest authority gap on the site. Never invented: only real, client-approved engagements. |

Rejected: glossary page, separate GCC High page (would cannibalize the CMMC
page), separate owner-credentials page (about.html covers it), new city pages,
AggregateRating (D8).

### Phase 5: Measure and repeat (monthly)

- Re-run the 20-prompt panel the first week of each month; track mention rate
  out of 100 runs (20 prompts x 5 assistants) and every verbatim misstatement.
- Each misstatement is traced to the page or listing that caused it and becomes
  a fix ticket.
- Day-45 checkpoint: re-verify the fast-moving items (Brave/Claude link,
  ChatGPT index mix, Business Profile "Ask", Apple Business rollout).
- Realistic timeline: listings and profile fixes show in AI answers in 2-8
  weeks; press and review effects over 3-6 months.

## Agent fleet for execution

Opus stays PM: sequences work, reviews every diff, is the only committer, and
talks to Uli. Workers never commit.

| Agent | Model | Count | Job |
|---|---|---|---|
| fact-fixer (existing `implementer` spec) | Sonnet | 1 per page, up to 6 in parallel on separate files | Phase 1.1, 1.2, 1.5 and Phase 3 page upgrades, one page per task |
| verify-sweeper | Haiku | 1 | Lists every `[VERIFY]` marker by file for Uli (1.4); after each batch, re-greps for forbidden items (dental, Cisco cert, vendor names, SIEM, clearance words, em dashes, response-time promises) |
| llms-regenerator | Haiku | 1 | Runs generate-llms-full.py, sitemap regen, IndexNow URL list after each batch; diffs llms.txt against VERIFIED FACTS |
| listing-kit writer | Sonnet | 1 | Phase 2.9 copy kit, Clutch/Bing/Apple profile text, review-ask email template, press pitch draft |
| content writer | Sonnet | 1 per post | Phase 4.1 posts, drafted noindex with [VERIFY] tags until Uli approves |
| merge-and-redirect | Sonnet | 1 | Phase 3.8 merges plus `_redirects` entries; checks for chains |
| reviewer (existing `code-reviewer` spec) | Opus | 1 per diff | Adversarial review against CLAUDE.md before each commit |
| panel pre-runner | Sonnet | 1 monthly | Runs the Claude-column prompts via web search and pre-fills the log; Uli runs ChatGPT, Gemini, Perplexity, Copilot (agents cannot sign in to those products) |

Peak parallelism: about 10 workers in Phase 1 and Phase 3, then 2-3 per month.

## Decisions needed from Uli

1. Case study (1.3): approve and resolve its VERIFY items, or noindex it until later?
2. Repo visibility (1.8): make private, or move CLAUDE.md and audit/ out?
3. Launch the two Phase 5 drafts (3.1) after their VERIFY items are resolved?
4. Is "identity monitoring" something Ghosxt delivers? If yes, add it to VERIFIED FACTS; if no, it comes off the case study.
5. Network work (VLANs, firewalls, wireless) and Cisco/Meraki deployment: is this delivered? It is described on network-design.html and in llms.txt but is not in VERIFIED FACTS.
6. Which clients would agree to a named case study or a Clutch review?

## Don't do

- Treat llms.txt as a ranking lever. Keep it accurate because assistants read it,
  but a 300k-domain study found no measurable citation lift from having one.
- Create a Wikidata item now. There are no independent sources yet; it would be
  reverted as promotional. Revisit after press coverage exists.
- Seed Reddit or post in r/msp / r/sysadmin. Anti-solicitation norms, and
  ChatGPT's local use of Reddit swung sharply in Aug 2026.
- Pay for placement on UpCity or Expertise.com.
- Chase "5-10 reviews a week" benchmarks built for restaurants.
- Add more city or service pages.
