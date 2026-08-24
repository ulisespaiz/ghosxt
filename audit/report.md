# AI-Search Audit Report: ghosxt.com

Phase 3 deliverable. Sources: audit/inventory.md, 215 page reports in audit/pages/, compiled rows in audit/claims.md. Nothing below has been implemented yet; Phase 4 starts only on approval.

The good news first: head hygiene is already perfect (215/215 pages have one H1, a canonical, and a meta description), JSON-LD coverage is broad, the review count is already single-sourced and uniform at 26, em dashes are essentially absent (2 URL-encoded stragglers), and blog posts are uniformly bylined and dated with BlogPosting schema. The problems are concentrated in claim accuracy, a handful of systematic template bugs, and machine-legibility gaps.

## P0: credibility and contradictions

These are the things a verifying buyer or a fact-checking LLM can catch you on.

### P0-1. The About page misstates the credentials (about.html, 8 contradictions)
The one page whose job is to state credentials: lists CompTIA A+ (not held), claims a "B.S. in Network Engineering and Cybersecurity" (not in the verified facts), omits the M.S. Cybersecurity and Information Assurance (WGU, 2026), omits SecurityX (CAS-005) and Project+, and its "nine certifications" count matches neither its own list nor the verified list. The cybersecurity.html page repeats the A+ claim. Fix: rewrite the credentials grid, bio text, and Person JSON-LD hasCredential to exactly the verified list.

### P0-2. Dental appears in 60 files as a client or target vertical
Verified fact: dental must not appear anywhere. Four severity tiers:
1. Whole pages built on dental: blog/hipaa-compliant-it-medical-dental-monterey-county.html (title, slug, meta, JSON-LD, H1, body, CTA, plus its own conflicting pricing) and hipaa-it-compliance.html (dental in title tag, meta, og/twitter, JSON-LD, H1, lead). These need retargeting to medical-only framing, and the blog post likely needs a new slug with a 301.
2. healthcare-it-services.html: 10 references including a full anonymized case example titled "Ransomware attempt at a dental practice". The case example is flagged VERIFY WITH ULI; I will not rewrite or remove it without your decision.
3. The one-line "Healthcare and dental" industry-list entry, repeated with FAQ and JSON-LD mirrors across ~25 location and service pages (salinas x6, seaside x5, santa-cruz x5, monterey, watsonville, hollister, marina, pacific-grove, san-jose x2 including a "dentist" in the hero, all 4 county pages, it-help-aptos x8, it-help-morgan-hill x2, services, cybersecurity x2, managed-it-services, it-consulting-vcio, backup-disaster-recovery, cloud-services combos, blog teasers and cross-links).
4. Incidental client scenarios: cloud-services-marina names "a dental practice moving into a new Marina building"; several blog posts use dental as an example industry and 6+ posts link to the dental blog post.

### P0-3. SIEM is claimed as a Ghosxt capability in 10+ files
Worst: managed-detection-response.html has SIEM in its meta description, og:description, JSON-LD Service description, hero, and a service card. salinas.html and pricing.html tie "Managed SIEM" to the Compliance & Continuity tier; services.html lists it; blog posts tie SIEM to the top tier (managed-it-services-cost-salinas-2026, it-support-vs-managed-it-services-difference states "Ghosxt is structured this way" right after defining MSSP-with-SIEM). Also "Identity Threat Detection & Response" on pricing.html is an unlisted capability. Fix: reword to the verified phrasing "managed detection and response with a 24/7 SOC".

### P0-4. Security-stack vendor names are published
Verified fact: never publish vendor names for capabilities we deliver.
- "Huntress EDR" appears on all 11 cybersecurity-CITY pages plus managed-it-services.html and 2 blog posts describing "our stack".
- backup-disaster-recovery.html names Veeam, Datto, Wasabi, Backblaze B2, Azure Blob as the delivery stack.
- managed-it-services.html names UniFi, pfSense, Sophos, Hyper-V, VMware; network-design.html has a "Vendors we deploy" section naming pfSense Plus, OPNsense, Sophos XGS, WatchGuard, UniFi Enterprise, Aruba CX.
- Gray areas needing your ruling (Decision D2): educational blog posts that name third-party tools as reader advice (EDR comparisons, WordPress plugins, password managers); client-side software names (SolidWorks, Autodesk Vault, Yardi, AppFolio, ELD vendors like Samsara); Cisco Meraki equipment mentions (allowed only if true, [VERIFY]).
- No Cisco certification claim exists anywhere in the repo (both "cisco" grep hits in blog were false positives such as "San Francisco"); the Cisco-certification problem lives off-site (Chamber directory, Phase 6).

### P0-5. Pricing contradictions
- san-jose.html claims "no onboarding fees" in 3 places; published pricing has $1,000/$1,500 onboarding.
- blog/cybersecurity-cost-small-business-2026 states Ghosxt's own price as "$50 to $150 per user per month" under "How we price it at Ghosxt", in body and FAQ JSON-LD.
- blog/hipaa-compliant-it-medical-dental-monterey-county quotes $175 to $300 per user and $2,500 to $8,000 onboarding.
- blog/professional-services-it-law-cpa and blog/property-management-it price MDR at $25/user plus managed IT at $150 to $200/user.
- blog/cybersecurity-services-monterey-2026 gives two conflicting all-in ranges for the same 25-person scenario.
- blog/it-help-help-desk-tech-support-small-business-salinas uses a different tier naming scheme (Foundation/Essential/Professional/Premium).
- pricing.html's static calculator snapshot shows internally inconsistent numbers ($31,250 in-house, $4,667 saved, 73%) that also disagree with what pricing.js computes ($8,333, $6,583, 79%); a non-JS crawler indexes wrong numbers.
- website-development.html: webdev.js silently overrides the advertised $1,800 default to the $3,200 tier on load; the $3,200/$5,900 tiers and add-on prices exist only in JS.
- pricing.html's $1,500 onboarding line has no Microsoft 365 default-scope note and no "Google Workspace and Apple fleet quoted separately" note (confirmed from the brief).
- pricing.js MIN_USERS is 5, so the calculator cannot express the Tiny Team 1 to 4 user tier at all.

### P0-6. Sole-engineer story contradicted by team language
co-managed-it.html claims a staffed "24/7 US-based help desk" and "senior engineering team"; cyber-insurance-compliance.html says "We are engineers"; web-design combos say "security team"; all 10 it-help pages have a "Real people who answer" card. The blog author-bio box on ~115 posts claims "10+ years", "Senior Solutions Consultant for the DoD", and "built security programs for 40+ Central Coast businesses", none of which are in the verified facts; About adds "multinational corporation" and "coaches football" specifics. One shared-block fix corrects all posts at once, pending Decision D6.

### P0-7. Capability claims beyond the verified list
Recurring unlisted capabilities: EDR as a named deliverable (the verified phrasing is MDR with a 24/7 SOC), "immutable backups" (verified: cloud backup for Microsoft 365 and Google Workspace), vulnerability management or scanning, network segmentation, penetration testing delivered in-house (penetration-testing.html's entire premise, repeated in blog; sits against the verified third-party-assessor model), backup-disaster-recovery.html's full offering (image-based server backup, RTO/RPO commitments, monthly tested restores, DR tabletops), cloud-services.html's Azure menu (Site Recovery, AVD, PIM, DLP), CMMC SSP/POA&M authoring plus a fabricated "CMMC / NIST SP 800-171" credential in cmmc-compliance.html's JSON-LD, ransomware recovery as a standalone service, zero-trust implementation cards, MDR threat hunting. Each needs Decision D3: confirm it (and add to VERIFIED FACTS) or reword to verified phrasing.

### P0-8. Geography and identity integrity
- City hubs (confirmed on gilroy and pacific-grove, likely all 11) declare fabricated local street addresses and geo-coordinates in LocalBusiness JSON-LD, contradicting the Salinas base and risking NAP inconsistency against the Google Business Profile.
- "Trusted by businesses across Monterey County" copy appears verbatim on Santa Clara, Santa Cruz, and San Benito county pages, gilroy.html, santa-cruz.html, and cloud-services-santa-cruz (wrong county).
- ctpat.html claims service "across the United States" while its own schema and footer say California.
- privacy-policy.html meta says "Last updated 2026" while the page says December 11, 2024.

### P0-9. Structured data that lies about the page
- Duplicate JSON-LD Service and BreadcrumbList nodes sharing one @id with conflicting areaServed lists (11 cities vs 4) on at least 8 pages: managed-it-services, cloud-services, network-design, backup-disaster-recovery, agriculture, manufacturing, engineering, property-management, professional-services, website-development.
- Broken @id references (Service.provider pointing to a LocalBusiness @id that does not exist on the page) on carmel, gilroy, santa-cruz, watsonville, and likely siblings.
- ctpat.html ships a live FAQPage JSON-LD while its entire visible FAQ is commented out of the HTML.
- FAQPage JSON-LD with no or mismatched visible FAQ text: blog/remote-work-security, blog/shadow-it, blog/vendor-third-party-risk, blog/best-it-support-in-salinas (missing 6th Q&A), blog/exchange-server-zero-day (missing 1 of 6).

### P0-10. Response-time chaos
No verified response-time fact exists (only the 4-hour critical-incident notification), yet pages promise: 24 hours and 1 business day (contact.html, 4 spots), five different formulations on help-desk-it-support.html, three on watsonville/carmel/engineering, "same hour" vs "same business day" on it-help pages, "instant response" implied by the homepage chat demo. Decision D4: define the single response-time statement; then one consistent line goes everywhere.

## P1: machine-legibility fixes (proposed for Phase 4, in order)

0. Prerequisite: add an sr-only utility class to the shared CSS. This is the one CSS addition the work requires; flagging it explicitly since the house rules say no CSS changes (Decision D7).
1. Fix About page credentials (P0-1) and the site-wide credential mentions; owner-forward rewrite with credentials block and corrected Person JSON-LD (sameAs LinkedIn [VERIFY URL], alumniOf WGU, hasCredential list).
2. Dental purge: mechanical one-line removals across ~25 pages including JSON-LD mirrors; retarget hipaa-it-compliance.html to medical-only; blog post retarget plus 301 (pending Decision D1 for the case example and post).
3. SIEM and ITDR rewording to verified phrasing everywhere (P0-3).
4. Vendor-name removal from our-stack contexts (Huntress on 13 pages, backup and network vendor sections), pending Decision D2 for the gray areas.
5. Pricing truth pass: san-jose "no onboarding fees"; blog price corrections to published tiers; fix pricing.html static calculator snapshot to match pricing.js math; add the Microsoft 365 scope note and the Google Workspace and Apple separate-quote note (also the Phase 5 item 4); fix webdev.js default-tier override and add static text for all webdev tiers; reconcile MIN_USERS vs Tiny Team.
6. Numbers wired to the data file: extend site-config.json plus a marker-driven scripts/update-site-numbers.py generalizing update-review-count.py (design in claims.md).
7. JSON-LD repair: dedupe conflicting Service/BreadcrumbList nodes, fix @id graph links, restore ctpat's visible FAQ (or drop its FAQPage), sync the five FAQPage mismatches, replace fabricated city addresses with the Salinas organization plus areaServed for the city (Decision D5).
8. Chrome fixes via scripts/_chrome_source.html and apply-chrome.py: move the cookie banner after main content (or inject it client-side) and move the duplicated mobile nav markup after main; keep the skip-link first. Blog chrome updated separately (apply-chrome does not touch blog).
9. Pricing comparison table icon-only cells get sr-only "Included" / "Not included" text.
10. JS-only content static equivalents: static transcript or descriptive text for the homepage chat demo (aligned to the real 4-hour notification, killing the "instant response" implication), static default calculator figures on pricing and website-development.
11. Homepage compact at-a-glance block using the existing key-facts styles (service area, who you talk to, response time per Decision D4, pricing link); extend the key-facts block to the 43 root pages missing it, or at minimum homepage, pricing, contact, about, all 5 compliance pages, and the 8 service pages lacking it.
12. JSON-LD additions: Organization/ProfessionalService with areaServed, telephone, priceRange on pages lacking it; Service per service page (already broadly present); FAQPage where FAQs exist but schema does not (index, about, services); Offer/PriceSpecification on pricing (present, verify values); AggregateRating only if it meets Google's guidelines. Note: Google requires the rating be for a specific reviewed entity with reviews accessible from the page; site-wide Google-review counts generally do not qualify, so my recommendation is to skip AggregateRating and keep the visible "26 Google reviews" text (Decision D8).
13. Blog: add the two missing datePublished fields; fix the shared author-bio numbers (Decision D6); add missing service-page links on ~6 posts; fix the broken logo path on seasonal-worker post.
14. robots.txt: add explicit Claude-SearchBot and Bingbot allows, reconcile deprecated Claude-Web and anthropic-ai tokens, after verifying every bot token against OpenAI, Anthropic, Perplexity, Google, and Microsoft docs at implementation time.
15. llms.txt: add hospitality vertical; regenerate llms-full.txt as a full-content companion; add an IndexNow key file (Cloudflare serves static files, so hosting the key works; Bing/IndexNow submission is a Phase 6 checklist item).
16. Em dashes: replace the 2 URL-encoded em dashes in ghosxt-cares mailto subjects.
17. Internal links: add in-body pricing links on pci-compliance, voip, msp-partners, case-studies and the web-design combos missing at-a-glance blocks.
18. Sitemap and canonicals are already clean; regenerate sitemap.xml after page changes.

## P2: coverage pages (Phase 5 drafts, not linked into nav, everything uncertain [VERIFY])

1. Google Workspace and Mac managed IT vertical page (Apple Business Manager, zero-touch, Google Workspace as IdP with phishing-resistant MFA, Gmail/Drive backup, contractor on/offboarding, remote and India contractor fleets).
2. "IT for firms whose customers audit them" vertical page (DPA flowdown, vendor security questionnaires, SOC 2 docs for every platform, 4-hour notification, annual independent risk assessment, policy suite).
3. "Who you will actually talk to" row in every at-a-glance block plus matching FAQ on service and vertical pages: the owner, Ulises Paiz, directly, no tier-1 queue.
4. Pricing-page note: Google Workspace and Apple fleet onboarding quoted separately from Microsoft 365 defaults.
5. Case-study skeleton at /case-studies for the AI-forward accounting firm (all facts [VERIFY], do-not-publish banner).
6. Intake: "How did you find us?" select plus "What did you search for?" free text on the self-hosted contact form (contact.html plus 4 coordinated src/worker.js edits; documented in inventory.md section 7; it is not a third-party embed).

## P3: polish (backlog, not scheduled)

Unsourced statistics in blog and it-help pages (attack stats, "60% of U.S. leaf lettuce", Ocean Mist Farms, "$8,000/month ransomware", in-house salary model figures); og:image fallbacks on 2 posts; H1/title mismatches on 2 posts; professional-services-it.html broken hero sentence fragment ("...Bay Area. federal-grade engineering..."); privacy-policy date conflict; 404.html has no JSON-LD; blog/all.html hidden table column (harmless); Soledad/King City named on it-help-gonzales without pages (redirects exist).

## Decisions needed from you before Phase 4

- D1 Dental case example on healthcare-it-services.html and the dental blog post: remove, retarget to medical-only, or leave? (Case examples are never touched without you.)
- D2 Vendor-name scope: confirm removal applies to our-stack names; rule on educational tool lists in blog posts, client-side software names, and whether the Cisco Meraki equipment mentions are true.
- D3 Capability confirmations, page by page (claims.md UNVERIFIABLE list): in-house pentesting, backup scope beyond M365/GW, Azure services, EDR wording, ransomware recovery, CMMC SSP work, zero-trust cards, vulnerability scanning. Confirm or we reword to verified phrasing.
- D4 The official response-time statement (for the at-a-glance blocks, FAQs, and all the conflicting promises).
- D5 City-page addresses: replace fabricated street addresses with Salinas org plus areaServed? (Recommended.)
- D6 Author-bio facts: years in industry, DoD title wording, client count, founding year 2021, LinkedIn URL, insurance wording.
- D7 Approve the single sr-only CSS utility addition.
- D8 AggregateRating: my recommendation is skip (does not meet Google guidelines for org self-rating); confirm.
- D9 Fix scope for P1 item 11: extend at-a-glance to all 43 missing pages, or the priority subset?

Phase 4 will execute one fix per commit, implementer then Opus review then commit, only after your approval of this report and the decisions above.
