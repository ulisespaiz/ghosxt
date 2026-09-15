# Error sweep: ghosxt.com, 2026-09-10

Scope: all 225 pages (99 root, 126 blog). Three layers: a deterministic scan, a headless Chromium load of every page at 390px, and a 60-agent fleet (29 Haiku finders reading every page, 8 Sonnet leads verifying and deduping per dimension, Opus refutation votes on every high-severity finding; a high survives only if fewer than 2 of 3 refuters reject it).

## Layer 1: deterministic scan (clean)

Across 225 pages: 0 broken internal links, 0 missing images or scripts, 0 HTML nesting errors, 0 JSON-LD parse failures, 0 placeholder text, 0 em dashes, every page has exactly one H1, and phone, email, and review count are consistent everywhere. One duplicate empty `id=""` on about.html. Vendor-name hits are confined to 16 blog posts (educational lists) and the two `[VERIFY]`-tagged Meraki mentions.

## Layer 2: headless load of every page (3 findings)

Zero script errors on all 225 pages. Three blog posts scroll horizontally on phones because PowerShell code blocks use `white-space: pre` with no scroll container: sharepoint-server-rce (401px), exchange-server-zero-day (237px), windows-miniplasma (237px). Fix: `pre { overflow-x: auto; max-width: 100% }` in blog.css.

## Layer 3: agent fleet (59 raw, 16 verified, 5 high)

Root pages: 37 raw findings, 9 verified. Blog: 22 raw, 7 verified. Three highs were killed by the refuters (a response-time reading that was actually allowed wording, and two "immutable" mentions that were educational, not our stack).

### High (contradicts VERIFIED FACTS or misleads a buyer)

1. **backup-disaster-recovery.html:122** JSON-LD Service description sells "tested monthly restores, ransomware recovery, RTO and RPO planning", and the body and FAQ sell immutable backups and RTO/RPO commitments (lines 212 to 523; some carry hidden `[VERIFY]` comments, the JSON-LD cannot). D3 requires rewording to "cloud backup for Microsoft 365 and Google Workspace". This is the one page whose sales narrative is built on unverified capability. Decision needed from Uli: reword to verified phrasing, or confirm the capability and add it to VERIFIED FACTS.
2. **about.html:344 and :353** the capability marquee lists "Penetration Testing" as a plain capability. Remove or replace with a listed capability.
3. **cloud-services-monterey.html:253** a card claims "Microsoft 365 GCC High with the NIST 800-171 and CMMC controls and documentation". Reword to hardening language or tag `[VERIFY]`.
4. **7 pages' backup and DR cards** (cybersecurity.html:548 and siblings) promise a monthly restore-testing cadence or documented RTO/RPO. Same D3 rewording.
5. **3 vertical blog posts** (hospitality:342, property-management:346, trucking:347) share a template line "A real firewall (Fortinet, Sophos, Palo Alto, or a managed Meraki)" inside "the baseline we recommend". D2 strips stack vendor names; Sophos is on the list by name.

### Medium

6. Four county pages carry LocalBusiness postalCode 93905 while every other page uses 93901. Confirm the real ZIP and align.
7. Two pull-quote testimonials (healthcare-it-services.html:592, hospitality-it-services.html) are attributed only to an anonymous "multi-year Ghosxt partner". Tag `[VERIFY]` or attribute with consent.
8. Bare `<!-- [VERIFY] -->` comments sit mid-sentence in published body copy on 9 pages. Invisible to readers, but they are the tracking mechanism and should live in audit notes, not page bodies.
9. blog/data-retention-destruction-policy:203 has a `[VERIFY ...]` tag visible to readers, not in a comment.
10. business-wifi-network-segmentation (lines 95, 237, 253) names Ubiquiti, Cisco Meraki, and Aruba three times including in FAQ JSON-LD; genericize.
11. Two EDR posts (ai-attack-speed:267, claude-mythos-firefox:335) and cybersecurity-services-monterey:262 name SentinelOne, CrowdStrike, Huntress, Sophos as alternatives. Market commentary, not our stack, but Huntress and Sophos are on the strip list; genericize or confirm with Uli that naming competitors is fine.
12. Several blog posts' BlogPosting JSON-LD `image` points at the generic og-image.png while their og:image meta uses the slug-specific image (canvas-data-breach:47, claude-mythos-firefox:47, and siblings). Align JSON-LD to the meta.

### Low

13. Six leftover `<!-- [VERIFY] -->` comments on google-workspace-mac-it.html sit on capabilities that are already on the VERIFIED FACTS list verbatim. Delete.
14. it-help-castroville.html:214 uses a comma where the other seven it-help pages use a colon in the same pricing callout.

## What the fleet did not find

No wrong-city copy on any of the 61 city and county pages, no broken FAQ mirrors, no title, H1, or canonical disagreements, no fused words, no duplicated paragraphs, no stale dates. The site's structural hygiene is solid; every remaining issue is a claim-accuracy or house-rule question.

## Recommended split

Mechanical, no decision needed (one small PR): items 2, 8, 9, 10, 12, 13, 14, the three overflow posts, and the about.html empty id.
Decisions for Uli before editing: items 1, 3, 4 (capability wording under D3), 5 and 11 (vendor names in blog recommendations), 6 (which ZIP), 7 (testimonial attribution).
