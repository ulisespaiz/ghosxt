# Rankings Baseline: Local SEO Research and SERP Spot Checks

Lane L5. Research only. No site files were changed by this lane.

Compiled 2026-09-09 using web search from a US exit. Every claim below carries a
source URL. Nothing in this file is a measured Google ranking position for
ghosxt.com. Read Section 2's caveat before quoting any of it.

Note on Ghosxt facts: this file cites only what is in `CLAUDE.md` VERIFIED FACTS
(solo owner Ulises Paiz, Salinas, 26 Google reviews at 5.0 as of August 2026,
published pricing, the 4-hour critical-incident notification). No other claim
about the business is asserted here.

---

## Section 1: Current local-SEO practice for a solo MSP in 2026

### 1.1 What the ranking-factor surveys say

| Signal group | Reported share of local-pack weight | Source |
|---|---|---|
| Google Business Profile signals | about 32% | [StoreRocket, Local SEO Ranking Factors](https://storerocket.io/learn/local-seo-ranking-factors) |
| On-page signals | about 19% | same |
| Review signals | about 16% (one source puts it near 20% today, up from 16% in 2023) | same; [Atlas Unchained](https://www.atlasunchained.com/local-marketing-web/review-velocity-14-day-engine/) |
| Link signals | about 15% | same |
| Behavioral signals | about 8% | same |
| Citation signals | about 7% | same |

[VERIFY] These percentages come from vendor-published summaries of practitioner
surveys, not from Google. The canonical practitioner source is Whitespark's
Local Search Ranking Factors report ([whitespark.ca/local-search-ranking-factors](https://whitespark.ca/local-search-ranking-factors/)),
which should be read directly before any of these numbers are used in a
deliverable. Treat all weightings as directional.

Google's own stated basis for local ranking remains three factors: relevance,
distance, and prominence. Vendor guides in 2026 continue to describe it that way
([JC Web Pros](https://jcwebpros.com/google-business-profile-ranking-factors/),
[Sparkz Marketing](https://www.sparkzmarketing.com/post/google-business-profile-ranking-factors-2026-win-local)).

**Important structural point:** the factors that put a business in the local pack
are not the same factors that rank it in local organic results. Local organic is
driven by conventional signals (content quality, backlinks, domain authority,
local relevance); the pack is driven mainly by the profile, proximity, and
reviews. Source: [StoreRocket](https://storerocket.io/learn/local-seo-ranking-factors).
For Ghosxt this matters because the site's 13-city spoke matrix and blog volume
work on the organic side, while the pack side is almost entirely a Google
Business Profile and reviews problem.

### 1.2 Review velocity and recency

Reported 2026 practice, and the single most actionable finding in this file:

- Review **recency** is described as the top individual local ranking factor for
  2026, with reviews under 30 days old carrying full weight and reviews older
  than 180 days retaining only 10 to 20 percent of their influence.
  Source: [Epicware](https://www.epicware.ai/blog/why-review-recency-matters-for-local-rankings),
  [Atlas Unchained](https://www.atlasunchained.com/local-marketing-web/review-velocity-14-day-engine/).
- Velocity is reported to matter more than raw count: 3 to 5 new reviews per
  month is the cited threshold associated with top-3 placement, and a profile
  whose newest review is a month old is described as "cooling off."
  Source: [Atlas Unchained](https://www.atlasunchained.com/local-marketing-web/review-velocity-14-day-engine/),
  [Hashmeta](https://hashmeta.com/blog/the-role-of-review-velocity-in-local-search-performance-a-complete-guide/).
- Responding to reviews within 24 to 48 hours is the commonly recommended
  practice. Source: [Straight North](https://www.straightnorth.com/blog/why-review-velocity-matters-for-local-seo/).

[VERIFY] The "recency is the number one factor" claim and the specific 30-day and
180-day decay figures come from marketing-agency blogs, not from Google or from a
peer-reviewed correlation study. The direction of the claim is well supported
across sources; the exact numbers should be treated as vendor estimates and could
be outdated or overstated.

Applied to Ghosxt: 26 reviews at 5.0 (VERIFIED FACTS, as of August 2026) is a
healthy count for a solo MSP but says nothing about velocity. The distribution of
review dates, not the total, is what needs measuring. See Section 3.

### 1.3 Service-area business handling

Ghosxt is Salinas-based and serves a multi-county area, which makes the
service-area business (SAB) rules directly relevant.

- Google requires the street address to be hidden if the business does not have a
  storefront with signage where it receives customers. Failing to hide it is
  described as one of the most common causes of profile suspension.
  Source: [Local Falcon](https://www.localfalcon.com/blog/when-should-you-hide-your-address-on-google-business-profile),
  [Google Business Profile Help: Manage your business address](https://support.google.com/business/answer/2853879?hl=en).
- The address stays on the back end for verification but is not shown publicly.
  Up to 20 service areas can be listed. PO boxes and virtual offices are not
  permitted and lead to suspension.
  Source: [Google Business Profile Help](https://support.google.com/business/answer/2853879?hl=en),
  [RankAI SAB guide](https://rankai.ai/articles/service-area-business-google-business-profile-guide).

[VERIFY] Whether Ghosxt's profile is currently configured as an SAB, and whether
the address is hidden, cannot be checked from this environment. Uli should
confirm this directly in the Business Profile dashboard. If a street address is
publicly visible and there is no customer-facing storefront, this is a
suspension risk that outranks every other item in this file.

Site-side corollary: the D5 decision (real Salinas organization plus `areaServed`
for each city, no fabricated per-city street addresses or coordinates) is the
correct schema mirror of an SAB configuration. Verified in this pass: every
`LocalBusiness` node in the repo now carries `"addressLocality": "Salinas"` and a
single geo point (36.6777, -121.6555), with no per-city coordinates anywhere.

### 1.4 NAP consistency and citations

Consistent name, address, and phone across platforms is reported as a top-five
factor for both the local pack and local organic.
Source: [StoreRocket](https://storerocket.io/learn/local-seo-ranking-factors).
Citation signals themselves are the smallest of the six groups (about 7%), so the
practical reading is that inconsistency hurts more than volume helps.

### 1.5 E-E-A-T for a solo owner

The searches run for this lane returned no source that treats E-E-A-T for a
solo-operator local business as a distinct, documented topic; the review-velocity
sources explicitly did not cover it. What the AEO sources do say (Section 1.6) is
that AI systems favor businesses that are easy to verify and easy to quote, with
"strong entity signals that tie your name to a real place and service."

[VERIFY] The following is inference from those sources rather than a directly
sourced recommendation: for a one-person MSP, the verifiable-entity signals that
already exist on this site are the named owner, the Salinas base, the stated
credential list, and the DoD-cleared status. Those are the E-E-A-T assets. No
source found in this lane quantifies their ranking effect.

### 1.6 AI overviews and answer-engine visibility

- The Google Business Profile is described as the primary data source for
  AI-driven local answers.
  Source: [SEM Nexus](https://semnexus.com/how-local-businesses-appear-in-ai-search-answers-2026),
  [Brandify](https://brandify.io/blog/aeo-for-local-businesses/).
- Four signals are reported to do most of the work in getting a business named in
  an AI answer: clear quotable content, consistent business information across the
  web, real reviews, and entity signals tying the name to a real place and
  service. Source: [Brandify](https://brandify.io/blog/aeo-for-local-businesses/).
- Technical priorities cited: indexed and crawlable pages, original expertise,
  current local business information, and **structured data that matches the
  visible page**. Source: [Amsive](https://www.amsive.com/insights/seo/answer-engine-optimization-aeo-evolving-your-seo-strategy-in-the-age-of-ai-search/),
  [WRITER](https://writer.com/blog/geo-aeo-optimization/).
- AEO is positioned as an expansion of SEO, not a replacement. Reported time to
  first visible citation is 4 to 8 weeks.
  Source: [HubSpot](https://blog.hubspot.com/marketing/answer-engine-optimization-trends),
  [Amsive](https://www.amsive.com/insights/seo/answer-engine-optimization-aeo-evolving-your-seo-strategy-in-the-age-of-ai-search/).

[VERIFY] The "4 to 8 weeks" figure is a single vendor's estimate and should not be
used as a commitment to anyone.

The "structured data that matches the visible page" requirement is the one item
here that directly validates work already done in this pass: stripping claims
from JSON-LD that no longer appear in body copy (the D1 and D3 mirrors) is an
AEO requirement, not just a housekeeping one.

---

## Section 2: SERP spot checks

### Read this before using Section 2

**These are web-search results, not Google local-pack positions.** They were
gathered through a search API from a US exit with no location bias set to
Salinas or Monterey. They do not show the map pack, they are not personalized,
they are not distance-weighted from any specific point, and they will not match
what a Salinas business owner sees on a phone. They are useful for one thing
only: seeing which domains and page types own the general topical space for each
phrase. For real positions, see Section 3.

Date of checks: 2026-09-09.

| # | Keyword | ghosxt.com in results | Who appears | Page types ranking |
|---|---|---|---|---|
| 1 | managed IT services Salinas | No | SRS Networks (3 pages), Adaptive IS (2), Alvarez Technology Group, Biz Tech Consult | Competitor service pages and competitor city pages only |
| 2 | IT support Salinas CA | No | Adaptive IS (2), SRS Networks (2), Livewire Information Systems (2), HelloTech | Competitor pages plus one consumer-tech aggregator (HelloTech) |
| 3 | IT support Monterey | No | VC3, Xobee, Rayne Technology, SRS Networks, Adaptive IS | Competitor pages plus one MSP directory (InfoMSP) |
| 4 | managed IT Monterey County | No | Xobee, VC3, Cosmistack, Adaptive IS (2), SRS Networks | Competitor pages plus a directory (mspdatabase.com county page) |
| 5 | cybersecurity Monterey County | No | Adaptive IS cybersecurity-and-compliance page, Xobee, VC3, Cosmistack | Competitor service pages; no dedicated cybersecurity-plus-county page from a local solo provider |
| 6 | MSP Santa Cruz | No | The 20 MSP, Madrone MSP (Aptos), SRS Networks, NexTrust, Cosmistack, Network Management Solutions | Heavy directory presence: itcompanies.net, mspdirectory.com, infomsp.com |
| 7 | IT support Watsonville | **Yes** (`ghosxt.com/watsonville`) | SRS Networks, Datalink Networks, TOTL, **Ghosxt**, Adaptive IS, Watsonville Computers, Techs in a Sec, Tech Solutions | Competitor city pages; Ghosxt ranks with its city page |
| 8 | IT services Gilroy | No | CCI Tech (2), Adaptive IS, SRS Networks, Techs in a Sec | Competitor city pages only |
| 9 | IT support Hollister | **Yes** (`ghosxt.com/hollister`) | SRS Networks, Adaptive IS, **Ghosxt**, Biz Tech Consult, Techs in a Sec | Competitor city pages; Ghosxt ranks with its city page |
| 10 | IT company Seaside CA | No | Mitchell Technologies, VEE R, HelloTech, Techs in a Sec, local repair shops | **Directory-dominated**: three separate Yelp category pages take the top slots |

### What the pattern shows

1. **Ghosxt appears on 2 of 10 phrases**, and in both cases it is the city spoke
   page (`/watsonville`, `/hollister`) that ranks, not the homepage and not a
   service page. The spoke matrix is doing work where competition is thinnest.
2. **The two wins are the two least contested markets.** Watsonville and
   Hollister are the phrases where the incumbent set is smallest. Salinas,
   Monterey, and Santa Cruz are contested by established multi-page competitors
   and Ghosxt does not surface at all.
3. **Four incumbents recur across nearly every Monterey Bay phrase**: SRS
   Networks, Adaptive Information Systems, Xobee, and VC3. SRS and Adaptive both
   run per-city landing pages under a `/locations/` or `/it-services/` path,
   which is structurally the same play as the Ghosxt spoke matrix but older.
4. **Directories own the low-intent phrases.** Seaside returns three Yelp
   category pages; Santa Cruz returns itcompanies.net, mspdirectory.com, and
   infomsp.com. For those phrases the realistic near-term goal is a listing in
   the directory, not outranking it.
5. **Stale index warning.** The search snippets for `ghosxt.com/watsonville` and
   `ghosxt.com/hollister` both currently read "most issues resolved remotely the
   same hour." That phrasing was removed from the site under decision D4 and does
   not exist anywhere in the repository today (verified by grep in this pass).
   Google is still serving a pre-D4 cached description. It will clear on recrawl.
   Uli can accelerate it with a URL Inspection re-index request on those two
   pages. This is worth doing: it is a response-time promise the business no
   longer makes.

---

## Section 3: The exports Uli should pull for a real baseline

Nothing in Section 2 is a position. To get positions, pull these. All three are
free except the rank tracker.

### 3.1 Google Search Console, performance export

Two exports, both from Search Console > Performance > Search results, using
Export > Download CSV (or the Google Sheets export, which keeps the query and
page dimensions in separate tabs):

**Export A: last 3 months.** Date range "Last 3 months." Enable all four metrics
(clicks, impressions, CTR, average position). Export both the **Queries** tab and
the **Pages** tab. This is the current-state baseline.

**Export B: last 16 months.** Date range "Last 16 months" (16 is the maximum
Search Console retains). Same metrics, same two tabs. This gives the trend line
and the seasonality, which matters for an ag-adjacent client base.

For each export, also apply and save these filtered views, because the unfiltered
query list will be dominated by brand terms:

- Filter: Query does not contain `ghosxt` (strips brand traffic, exposes the
  non-brand baseline).
- Filter: Page contains `/it-help-` (measures the 10 spoke pages this pass just
  added inbound links to, so the effect is attributable).
- Filter: Page contains `/blog/` (measures whether the blog volume converts to
  impressions; relevant because 120 blog titles were rewritten in this pass).
- Filter: Query contains each of the 10 Section 2 phrases in turn, to get the
  actual average position for the exact phrases spot-checked above.

Also capture Search Console > Indexing > Pages: the count of indexed versus not
indexed, and the reasons. With 225 pages, partial indexing is a plausible and
invisible ceiling on everything else.

### 3.2 Google Business Profile insights

From the Business Profile dashboard, Performance section, exported at the maximum
retained window (6 months of daily data):

- **Searches breakdown**: how many discovery versus direct versus branded
  searches, and the "searches showing your business" query list. That query list
  is the closest thing to local-pack keyword data that exists.
- **Calls**: count and time-of-day distribution.
- **Direction requests**: count and origin. For an SAB these are low-volume but
  they are the clearest proximity signal.
- **Website clicks** and **messages**, if enabled.
- **Reviews**: export or record the full review list **with dates**. The count
  (26 at 5.0, VERIFIED FACTS, as of August 2026) is already known; the date
  distribution is not, and per Section 1.2 the date distribution is the part that
  affects ranking. Specifically: number of reviews in the last 30 days, and
  number in the last 180 days.

Also record, as a one-time configuration audit rather than an export:

- Primary category and every secondary category.
- Whether the street address is hidden and the profile is configured as a
  service-area business (Section 1.3 suspension risk).
- The full service-area list, and whether it matches the `areaServed` values in
  the site's JSON-LD.

### 3.3 Rank tracker recommendation

The practitioner-standard capability for local is **geo-grid tracking**: the tool
simulates a search from each point on a grid of GPS coordinates across the
service area and returns a heat map, because a single "position" is meaningless
for a business whose ranking varies block by block.
Source: [Nightwatch](https://nightwatch.io/blog/best-local-rank-tracking-tools/),
[Wiremo](https://wiremo.co/blog/10-best-local-rank-tracker-tools/).

Recommendation for this business: **Local Falcon**, on a low-tier plan, running a
grid on Salinas plus one grid each on Monterey and Santa Cruz. Rationale: it is
the tool most consistently named for grid heat maps in the 2026 roundups, it
covers Google Business Profile, Apple Business Connect, and AI-generated results
in one place, and it is usable by a single operator without an agency seat.
Sources: [Wiremo](https://wiremo.co/blog/10-best-local-rank-tracker-tools/),
[Local Falcon](https://www.localfalcon.com/blog/when-should-you-hide-your-address-on-google-business-profile).

Alternatives, both credible: **BrightLocal** (named the agency standard for
multi-location, more reporting than a solo operator needs) and **Nightwatch**
(named a top pick, quoted from $32/month, combines grid heat maps with organic
tracking). Sources: [Wiremo](https://wiremo.co/blog/10-best-local-rank-tracker-tools/),
[Nightwatch](https://nightwatch.io/blog/best-local-rank-tracking-tools/).

[VERIFY] Every one of these roundups is affiliate-adjacent commercial content and
several are published by the tools they rank. Pricing and feature claims should
be confirmed on the vendor's own pricing page before purchase. The pricing figure
quoted above is from a vendor's own blog and is likely to have changed.

---

## Section 4: The five highest-leverage actions

Ordered by leverage against what the site already has: clean head hygiene, a
13-city spoke matrix, high blog volume, and 26 five-star Google reviews.

### 1. Audit and, if needed, fix the Google Business Profile configuration

The profile is roughly a third of local-pack weight (Section 1.1) and is the
primary source AI answer engines read (Section 1.6), and the site cannot
compensate for it. Two specific checks: (a) if there is no customer-facing
storefront and the street address is publicly visible, hide it and convert to a
service-area business, because that is the single most common suspension cause
(Section 1.3); (b) confirm the service-area list matches the `areaServed` values
in the site's JSON-LD, so the entity signals agree. This is the highest-leverage
item because it is the only one where the downside is losing the listing
entirely.

### 2. Build a review-velocity habit, not a review-count target

26 at 5.0 is a good count, but per Section 1.2 recency is what carries weight and
reviews past 180 days retain only 10 to 20 percent of their influence. A steady
3 to 5 new reviews per month, plus replies inside 24 to 48 hours, is reported to
be worth more than the existing total. Concretely: ask at a fixed moment in the
engagement (end of onboarding is the natural one, since onboarding is a defined
deliverable) rather than ad hoc. [VERIFY] The specific cadence numbers are vendor
estimates; the principle is well supported, the thresholds are not.

### 3. Request re-indexing of the pages carrying stale pre-D4 snippets

Google is currently serving "most issues resolved remotely the same hour" as the
description for `/watsonville` and `/hollister` (Section 2, finding 5). That
promise has been removed from the site. Every day it stays in the index is a day
the business is publicly making a commitment it has decided not to make. A URL
Inspection re-index request on both pages costs minutes. Worth extending to any
other page where a cached snippet still carries removed D1, D3, or D4 language.

### 4. Close the gap on the contested phrases with depth, not more pages

Ghosxt ranks for Watsonville and Hollister, the two least contested phrases, and
is absent on Salinas, Monterey, and Santa Cruz (Section 2, findings 1 and 2). The
incumbents there are not winning on page count; they have the same per-city page
structure. They are older and more linked. Local organic, unlike the pack, is
driven by conventional signals including links and content depth (Section 1.1).
The work already done in this pass, adding 4 or more contextual inbound links to
each previously orphaned spoke page, is the correct shape of this fix. Extending
it to the primary Salinas, Monterey, and Santa Cruz hub pages, and earning even a
small number of genuine external local links, is higher value than page 226.

### 5. Get listed in the directories that already outrank everyone

For Seaside the top results are three Yelp category pages; for Santa Cruz they
are itcompanies.net, mspdirectory.com, and infomsp.com (Section 2, findings 4 and
10). On those phrases the achievable near-term outcome is presence inside the
directory result, not displacing it. This is also NAP-consistency work, which is
a reported top-five factor (Section 1.4), so it pays twice. Ensure every listing
carries exactly the same name, address, and phone as the Business Profile.

---

## What this file does not establish

- No Google local-pack position for any keyword. Section 2 is web search only.
- No click, impression, or conversion data. None exists in this environment.
- No competitor authority metrics. No backlink tool was available.
- No verification of the Business Profile's current configuration.
- No confirmation of the review date distribution behind the 26-review count.

Sections 3.1 and 3.2 are the exact steps to close all of these gaps.
