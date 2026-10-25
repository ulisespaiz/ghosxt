# HANDOFF.md: execution plan for the Opus session

Read CLAUDE.md first, then AUDIT.md. Branch from `main` for each PR using the name
pattern below; never commit to `main`. Each PR is a few hundred changed lines (generated
files excepted), carries the finding IDs it closes, its acceptance test, and either
"Visual impact: none" with a clean screenshot-diff job or the owner's
`visual-change-approved` label. The reviewer agent (`.claude/agents/reviewer.md`) gates
every commit. Workers: `seo-worker` (Sonnet) for edits, `crawler` (Haiku) for runs and
parsing, `auditor` (Opus) when a decision needs judgment.

Decisions that gate work are the D1 to D10 questions at the top of AUDIT.md. PRs that
need an answer are marked "after Dn". Everything else can start now.

## Order of work

| # | PR | Branch | Closes | Gate |
|---|---|---|---|---|
| 1 | A1 Routing and headers | seo/a1-routing-2026-10 | T-03, T-04, T-07, T-15 (the broken href) | none |
| 2 | B1 Titles, metas, OG | seo/b1-titles-2026-10 | T-01, T-02, T-19, A-05, A-04 (title suffix) | none |
| 3 | B2 One business entity | seo/b2-entity-2026-10 | S-01, S-02, S-03, S-05, S-06, L-02, L-04 | D3 for the name string (default "Ghosxt" until answered) |
| 4 | B3 FAQ visibility | seo/b3-faq-2026-10 | S-04, A-03 (compliance pages) | none |
| 5 | C1 Compliance front door | seo/c1-nav-2026-10 | C-05, T-15 (service-area links), T-18 | T-18 changes visible anchor text: label required |
| 6 | C2 Answer-first leads, compliance pages | seo/c2-leads-compliance-2026-10 | A-02 (cmmc, hipaa, pci, ctpat, cyber-insurance) | none |
| 7 | A2 Icon font to inline SVG | seo/a2-icons-2026-10 | T-05, T-20, T-22 (nav part) | screenshot diff must be clean |
| 8 | B4 llms.txt and llms-full.txt | seo/b4-llms-2026-10 | A-07 | none (add /managed-ai line after C-01 merges) |
| 9 | C3 Answer-first leads, service pages | seo/c3-leads-services-2026-10 | A-02 (9 service pages) | none |
| 10 | C4 Answer-first leads, verticals | seo/c4-leads-verticals-2026-10 | A-02 (10 vertical pages) | none |
| 11 | D1 Accessibility: chrome and tables | seo/d1-a11y-chrome-2026-10 | X-02, X-04, X-05, X-06, X-09, T-12 | none |
| 12 | D2 Accessibility: pricing calculator | seo/d2-a11y-pricing-2026-10 | X-03, X-07, T-23 | screenshot diff must be clean except the calculator text tone (label) |
| 12b | D3 Accessibility: contrast on five pages | seo/d3-a11y-contrast-2026-10 | X-01, X-08, X-10 | visible: label required |
| 13 | A3 Home main thread, inline scripts, image variants | seo/a3-home-perf-2026-10 | T-06, T-13, T-17, T-22 (/support part) | screenshot diff must be clean |
| 13b | A6 Contact page third parties | seo/a6-contact-embeds-2026-10 | T-21 | placeholder box is a visible change: label required |
| 14 | C5 Salinas hub trim | seo/c5-salinas-2026-10 | C-06 | none |
| 15 | C6 Cannibalization merges (one PR per pair) | seo/c6-merge-<pair>-2026-10 | C-02 | none |
| 16 | PR #260 Managed AI | feature/managed-ai (existing) | C-01 | after D1, D3 |
| 17 | C7 Resolve [VERIFY] markers | seo/c7-verify-2026-10 | A-01, C-11 | after D4, D10 |
| 18 | C8 Proof pages | seo/c8-proof-2026-10 | C-03 | after D2 |
| 19 | C9 Launch the two draft verticals | seo/c9-launch-drafts-2026-10 | C-07 | after D4 |
| 20 | C10 Voice: tagline, home subtitle, footer | seo/c10-voice-2026-10 | C-08, C-09 | after D8 and a Search Console baseline (D6) |
| 21 | B5 sameAs and dates | seo/b5-sameas-dates-2026-10 | S-07, S-08, A-08, T-09 | after D7 |
| 22 | A4 Fonts and OG cards | seo/a4-fonts-2026-10 | T-08, T-10 | after D1, label required |
| 23 | L1 County pages | seo/l1-counties-2026-10 | L-03 | none |
| 24 | A5 Dead external links | seo/a5-external-links-2026-10 | T-16 | confirm each in a browser first |
| 25 | Owner tasks (no PR) | none | A-06, L-01, T-11, C-12 | owner |

T-14 (the Lighthouse budgets) and the CI gates ship in this audit PR. C-10 (no year in new
blog slugs) is a rule for future posts, enforced by the reviewer, not a PR.

Each lead rewrite PR (6, 9, 10) touches at most 10 pages and about 60 lines per page:
the lead paragraph, the first H2 section (receives the story), and nothing else. Run
`python3 scripts/compute-csp-hashes.py --check` only if an inline script changed (it
should not).

After every PR merges: regenerate `llms-full.txt`, `sitemap.xml`, `feed.xml` and
`blog/all.html` with the scripts, run `python3 scripts/check-chrome-drift.py`, and if a
page's title changed run `python3 scripts/generate-og-images.py` for that page (the
regenerated card is a visual change to a social asset; the diff job does not cover it).

## PR B1 spec table: titles, metas, Open Graph

Titles are 60 characters or fewer, metas 155 or fewer (measured on decoded text, run
`python3 scripts/check-title-meta-length.py`). The og:title may equal the title. The
og:description is the meta unless shorter is better for a card. Schema types are the
nodes the page must carry after PR B2 (the business node is `LocalBusiness @id
#business` on every page; listed once as LB). Facts in the copy are limited to what the
live site already states: owner-run, DoD infrastructure experience, published pricing,
4-hour critical-incident notification, GCC High setup and hardening with the assessment
through a third party, support hours 8am to 6pm Pacific.

| Page | Title | Meta description | OG title | OG description | Schema |
|---|---|---|---|---|---|
| / | Managed IT & Cybersecurity, Monterey County \| Ghosxt | Owner-run managed IT and cybersecurity for small businesses in Monterey County and surrounding areas. Published pricing, DoD infrastructure experience. | Managed IT & Cybersecurity in Monterey County | Owner-run managed IT and cybersecurity with published pricing. Free 30-minute assessment. | LB, WebSite (no SearchAction), Person ref, FAQPage |
| /pricing | Managed IT Pricing for Small Business \| Ghosxt | Published managed IT pricing: Tiny Team $600 per month flat for 1 to 4 users; Core $125, Secure Growth $175, Compliance & Continuity $250 per user. | Managed IT Pricing, Published | Tiny Team $600 flat; $125 to $250 per user per month. No guessing. | LB, Service x4 with Offer, FAQPage, BreadcrumbList |
| /contact | Contact Ghosxt: Free IT Assessment, Monterey County | Book a free 30-minute IT assessment or send a message. You reach the owner directly, 8am to 6pm Pacific, Monday to Friday. Monterey County and nearby. | Contact Ghosxt | Free 30-minute IT assessment. You reach the owner directly. | LB with hours, ContactPage, BreadcrumbList |
| /about | About Ghosxt: Owner-Run Managed IT, Salinas CA | Ghosxt is run by Ulises Paiz, an engineer with DoD infrastructure experience, from Salinas, serving Monterey County and surrounding areas. | About Ghosxt | One owner, one engineer, ten credentials, Monterey County. | LB, Person with credentials and sameAs, BreadcrumbList |
| /services | IT Services for Monterey County Small Business \| Ghosxt | Every Ghosxt service on one page: managed IT, cybersecurity, MDR, Microsoft 365, backup, network design, CMMC, HIPAA, PCI, C-TPAT, managed AI governance. | IT Services, Monterey County | Managed IT, cybersecurity, cloud, backup, network, compliance, and managed AI governance. | LB, ItemList, BreadcrumbList |
| /managed-it-services | Managed IT Services in Monterey County \| Ghosxt | Fixed-fee managed IT for Monterey County small businesses: monitoring, patching, MDR, Microsoft 365 hardening, cloud backup. Published pricing, owner-run. | Managed IT Services in Monterey County | Fixed monthly fee, published pricing, the owner answers. | LB, Service, FAQPage, BreadcrumbList |
| /cybersecurity | Cybersecurity Services, Monterey County SMBs \| Ghosxt | Cybersecurity for small businesses in Monterey County and surrounding areas: MDR with a 24/7 SOC, MFA, cloud backup, awareness training. Published pricing. | Cybersecurity Services in Monterey County | MDR with a 24/7 SOC, MFA, backup and training, priced for small business. | LB, Service, FAQPage, BreadcrumbList |
| /managed-detection-response | Managed Detection & Response (MDR) for SMBs \| Ghosxt | Managed detection and response with a 24/7 SOC for Monterey County small businesses: endpoints, cloud accounts, human-reviewed alerts, containment. | MDR with a 24/7 SOC for small business | Someone is watching at 2am. Human-reviewed alerts and real containment. | LB, Service, FAQPage, BreadcrumbList |
| /cloud-services | Microsoft 365 & Cloud Services, Monterey County \| Ghosxt | Microsoft 365 hardening with Intune, Defender and Conditional Access, Google Workspace with phishing-resistant MFA, clean migrations. Monterey County. | Microsoft 365 & Cloud Services in Monterey County | Hardened tenants, clean migrations, Google Workspace too. | LB, Service, FAQPage, BreadcrumbList |
| /backup-disaster-recovery | Backup & Disaster Recovery, Monterey County \| Ghosxt | Cloud backup for Microsoft 365 and Google Workspace with restores you can see, for small businesses in Monterey County and surrounding areas. | Backup & Disaster Recovery in Monterey County | Cloud backup for Microsoft 365 and Google Workspace, with proof it restores. | LB, Service, FAQPage, BreadcrumbList |
| /network-design | Network Design & Deployment, Monterey County \| Ghosxt | Small-office network design and deployment in Monterey County and surrounding areas: segmentation, firewall, business wireless, written documentation. | Network Design & Deployment in Monterey County | Segmented, documented, built to be understood. | LB, Service, FAQPage, BreadcrumbList |
| /help-desk-it-support | IT Help Desk & Support, Monterey County \| Ghosxt | IT help desk and on-site support for Monterey County small businesses, 8am to 6pm Pacific, Monday to Friday. You reach the owner, not a queue. | IT Help Desk & Support in Monterey County | You reach the owner, 8am to 6pm Pacific. On-site across Monterey County. | LB with hours, Service, FAQPage, BreadcrumbList |
| /it-consulting-vcio | IT Consulting & vCIO Services, Monterey County \| Ghosxt | vCIO and IT consulting for small businesses in Monterey County and surrounding areas: roadmap, budget, vendor decisions, security and compliance strategy. | IT Consulting & vCIO in Monterey County | An IT director's judgment without the salary. | LB, Service, FAQPage, BreadcrumbList |
| /co-managed-it | Co-Managed IT for In-House IT Teams \| Ghosxt | Co-managed IT for Monterey County companies with an in-house IT person: we add MDR, the security stack and depth; your team keeps the relationships. | Co-Managed IT | Back up your IT person without replacing them. | LB, Service, FAQPage, BreadcrumbList |
| /cmmc-compliance | CMMC & NIST 800-171 IT, Monterey County \| Ghosxt | CMMC and NIST SP 800-171 IT for small defense contractors in Monterey County: Microsoft 365 GCC High setup and hardening; assessment through a third party. | CMMC & NIST 800-171 IT in Monterey County | GCC High set up and hardened by an engineer with DoD infrastructure experience. | LB, Service, FAQPage, BreadcrumbList |
| /hipaa-it-compliance | HIPAA IT for Medical Practices, Monterey County \| Ghosxt | HIPAA-compliant IT for small medical practices in Monterey County and surrounding areas: risk analysis, access controls, encryption, backup, BAA. | HIPAA IT for Medical Practices in Monterey County | Technical safeguards, documented, for a two-provider clinic or a specialty practice. | LB, Service, FAQPage, BreadcrumbList |
| /pci-compliance | PCI DSS IT Compliance, Monterey County \| Ghosxt | Practical PCI DSS compliance for restaurants, hotels, tasting rooms and retailers in Monterey County: the right SAQ, segmentation, secure POS, monitoring. | PCI DSS IT Compliance in Monterey County | The right SAQ, real segmentation, secure POS. | LB, Service, FAQPage, BreadcrumbList |
| /ctpat | C-TPAT Cybersecurity Compliance IT, Monterey County \| Ghosxt | IT controls and evidence for the C-TPAT cybersecurity minimum security criteria, for importers, carriers and packers in Monterey County and nearby. | C-TPAT Cybersecurity Compliance IT in Monterey County | The IT evidence your CBP validation asks for. | LB, Service, FAQPage, BreadcrumbList |
| /cyber-insurance-compliance | Cyber Insurance IT Requirements, Monterey County \| Ghosxt | Get through the cyber insurance questionnaire: MFA where it counts, managed detection and response, cloud backup, and the evidence underwriters ask for. | Cyber Insurance IT Requirements in Monterey County | MFA, MDR, backups and the evidence, before renewal. | LB, Service, FAQPage, BreadcrumbList |
| /zero-trust-security | Zero Trust Security for Small Business \| Ghosxt | Zero trust for a 15-person company, in practice: identity first, device checks, least access, on the Microsoft 365 or Google Workspace you already pay for. | Zero Trust Security for Small Business | A way of configuring what you have, not a product to buy. | LB, Service, FAQPage, BreadcrumbList |
| /managed-ai | Managed AI Governance in Monterey County \| Ghosxt | Managed AI governance for Monterey County small businesses: find the AI tools connected to your data, lock down access, and set a policy staff can follow. | Managed AI Governance in Monterey County | Your team is already using AI with your data. See it, control it, review it monthly. | LB, Service, FAQPage, BreadcrumbList |
| /monterey-county | Managed IT & IT Support Across Monterey County \| Ghosxt | Managed IT, IT support and cybersecurity across Monterey County, from the Salinas Valley to the Peninsula and South County. Owner-run, published pricing. | Managed IT Across Monterey County | Home county. On-site everywhere in it. | LB, Service, FAQPage, BreadcrumbList |
| /service-area | Service Area: Monterey County & Surrounding \| Ghosxt | Ghosxt serves Monterey County and the surrounding counties (Santa Cruz, San Benito, Santa Clara) on-site, with remote support nationwide. Every local page. | Service Area | Monterey County and surrounding counties on-site; remote nationwide. | LB, ItemList, FAQPage, BreadcrumbList |
| /managed-it-cost-monterey-county | What Managed IT Costs in Monterey County (2026) \| Ghosxt | What managed IT costs in Monterey County in 2026: published prices ($125 to $250 per user per month, or $600 flat for 1 to 4 users), worked examples. | What Managed IT Costs in Monterey County | Real numbers, three worked examples, no form to fill in first. | LB, Article, FAQPage, BreadcrumbList |
| /healthcare-it-services | Healthcare IT & HIPAA Support, Monterey County \| Ghosxt | IT for small medical practices in Monterey County and surrounding areas: HIPAA technical safeguards, EHR support, PHI protection, cloud backup, BAA. | Healthcare IT in Monterey County | HIPAA-grade IT without a hospital budget. | LB, Service, FAQPage, BreadcrumbList |
| /manufacturing-it-services | Manufacturing IT & CMMC Support, Monterey County \| Ghosxt | IT for small manufacturers in Monterey County and surrounding areas: OT and IT separation, ERP support, CMMC readiness through GCC High, backup and MDR. | Manufacturing IT in Monterey County | Shop floor, ERP and CMMC, handled. | LB, Service, FAQPage, BreadcrumbList |
| /trucking-it-services | Trucking & Logistics IT, C-TPAT Ready \| Ghosxt | IT for carriers, brokers and owner-operators in Monterey County and surrounding areas: dispatch and ELD systems, C-TPAT cybersecurity controls, backup. | Trucking & Logistics IT | Dispatch, ELD and C-TPAT controls that stay up. | LB, Service, FAQPage, BreadcrumbList |
| /agriculture-it-services | Agriculture IT Services, Salinas Valley \| Ghosxt | IT and cybersecurity for Salinas Valley growers, packers, coolers and ag-tech: field to office networks, ransomware-resistant backup, MDR, seasonal access. | Agriculture IT, Salinas Valley | Field, cooler and office, one provider. | LB, Service, FAQPage, BreadcrumbList |
| /professional-services-it | IT for Law Firms & CPAs, Monterey County \| Ghosxt | IT for law firms, CPAs and small offices in Monterey County and nearby: client-file protection, email security, offboarding, client security reviews. | IT for Law Firms & CPAs in Monterey County | Client files and email, protected and provable. | LB, Service, FAQPage, BreadcrumbList |
| /hospitality-it-services | Hospitality IT & PCI Support, Monterey County \| Ghosxt | IT for restaurants, inns, hotels and tasting rooms in Monterey County and surrounding areas: POS security, guest Wi-Fi separation, PCI DSS, named logins. | Hospitality IT in Monterey County | POS, guest Wi-Fi and PCI, without the shared PIN. | LB, Service, FAQPage, BreadcrumbList |

City and county spokes keep their current titles unless over 60 characters (three county
pages and three cloud-services spokes are; trim per T-02).

## Acceptance tests by finding (copy into the PR body)

| ID | Test |
|---|---|
| A-01 | `node audit/tools/check-seo-meta.mjs --only verify-markers` reports PASS; `grep -rl '\[VERIFY' --include='*.html' . \| grep -v -e google-workspace-mac-it -e it-for-audited-companies \| wc -l` prints 0 |
| S-04 | `node audit/tools/check-seo-meta.mjs --only faq-visible` reports PASS |
| A-06 | `site:ghosxt.com` on Bing lists the root pages; brand query in audit/queries.md returns ghosxt.com on every surface |
| C-01 | `/managed-ai` returns 200 `index, follow`, is in sitemap.xml and llms.txt, visible FAQ equals FAQPage |
| T-01 | `node audit/tools/check-seo-meta.mjs --only title-unique` reports PASS |
| T-02 | `python3 scripts/check-title-meta-length.py` exits 0 |
| T-03 | `curl -sI https://www.ghosxt.com/pricing` returns 301 to `https://ghosxt.com/pricing` |
| T-04 | `curl -sI https://ghosxt.com/blog` returns 301 |
| T-05 | no flaticon.com request in Lighthouse network records; `/` total byte weight under 200 KiB; visual diff 0 changed |
| T-06 | `/` mobile performance 90 or better (median of 3), TBT under 200 ms, DOM under 1,500; visual diff 0 changed |
| T-07 | `curl -sI https://ghosxt.com/about` shows `max-age=300` |
| T-08 | no googleapis or gstatic request; FCP holds; visual diff 0 changed |
| T-09 | sitemap `lastmod` for a page equals its last content commit date |
| T-10 | regenerated OG card uses the brand font (label required) |
| T-12 | html-validate with `no-implicit-button-type` and `heading-level` as `error` passes |
| T-13 | Lighthouse image-delivery no longer lists the logo |
| T-19 | `node audit/tools/check-seo-meta.mjs --only og-twitter` reports PASS |
| T-23 | rendered snapshot of /pricing has no U+2014; assets/js/*.js contain none |
| T-20 | mobile FCP under 2.0 s and LCP under 2.5 s on /contact, /ctpat, /website-development, /privacy-policy, /ghosxt-cares; perf 90 or better |
| T-21 | no calendly.com or stripe.com request before interaction on /contact; third-party-cookies passes; weight under 1 MiB; BP 100 |
| T-22 | desktop CLS under 0.05 on /support and /blog/all; no nav entry in layout-shifts on / |
| X-07 | Lighthouse accessibility 100 on /pricing at both widths; axe clean |
| X-08 | color-contrast passes on /break-fix-vs-managed-it, /case-studies, /support, /blog/all |
| X-09 | axe scrollable-region-focusable reports 0 nodes |
| X-10 | axe clean on /website-development; Lighthouse accessibility 100 |
| S-01 | `node audit/tools/check-seo-meta.mjs --only localbusiness-consistent` reports PASS (one variant) |
| S-02 | `node audit/tools/check-seo-meta.mjs --only business-node,service-provider` reports PASS |
| S-03 | `node audit/tools/check-seo-meta.mjs --only breadcrumbs` reports PASS |
| S-05 | `node audit/tools/check-seo-meta.mjs --only areaserved-consistent` reports PASS; key-facts phrase count equals 101 |
| S-06 | `node audit/tools/check-seo-meta.mjs --only search-action` reports PASS |
| S-07 | sameAs URLs present and each returns 200 |
| S-08 | WebPage with dateModified on every root page; visible date matches |
| A-02 | first 70 words of each lead contain the service name, "Monterey County", and "pricing" or the audience |
| A-03 | each listed question is visible and mirrored in FAQPage; S-04 scan stays at 0 |
| A-04 | retired phrases grep to 0; llms.txt, home JSON-LD description and subtitle agree |
| A-05 | compliance titles contain "Monterey County" and are 60 characters or fewer |
| A-07 | llms.txt has no "Emergency line"; `wc -c llms-full.txt` under 204800; both list /managed-ai |
| C-02 | 301 in `_redirects`; merged URL gone from sitemap and llms.txt |
| C-03 | `/case-studies` indexed and listed, or no client name on `/`; both pages agree |
| C-04 | form submits with three required fields; hours line visible; no [VERIFY] on /contact |
| C-05 | every compliance page has 8 or more in-body inbound links; /service-area has 5 or more |
| C-06 | salinas.html under 2,000 words; each teaser links one spoke |
| C-07 | drafts indexed and listed, or recorded as parked |
| C-08 | "government-grade" count 0 if retired; home subtitle has the geography phrase and not "Salinas and" |
| C-09 | footer has one service-area line; every CTA names Monterey County; city pages keep 4 or more in-body inbound links |
| C-11 | no unconfirmed capability stated; no [VERIFY] on the five pages |
| C-12 | repository private, or audit/*.md out of the public tree |
| L-01 | all owner-controlled listings show the contact.html NAP; 0 nodes without address or phone |
| L-03 | each county page over 1,200 words with 3 unique facts; family similarity under 0.4; no new location URL |
| X-01 | Lighthouse color-contrast passes on `/`; axe 0 color-contrast nodes |
| X-02 | axe region reports 0 nodes site-wide; 0 aria-label-misuse on the bar; visual diff 0 |
| X-03 | html-validate pricing rules promoted to error pass; axe label rules clean; visual diff 0 |
| X-04 | no-implicit-button-type as error passes |
| X-05 | Lighthouse label-content-name-mismatch passes on /about |
| X-06 | Lighthouse link-in-text-block passes on /blog/all |
| T-17 | uses-responsive-images lists neither ulises.avif nor ghosxt-cta.webp; visual diff 0 changed |
| T-18 | Lighthouse link-text passes on every vertical page; SEO 100 |

## Regenerating the baseline and budgets

See `audit/baseline/README.md`. Short version: start `node audit/tools/static-server.mjs`,
run `node audit/tools/lh-run.mjs --base http://127.0.0.1:8787 --runs 3 --out
audit/baseline/lighthouse-local --urls <representative urls>`, then
`node audit/tools/make-budgets.mjs`, and commit the two `lighthouserc` files with the
reason for the change in the PR body.
