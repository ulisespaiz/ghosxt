# Page Audit: /ghosxt-cares

## Route
/ghosxt-cares (file: ghosxt-cares.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/company location | "Ghosxt is a Salinas-based managed IT provider" | ghosxt-cares.html:442 | MATCHES ("Based in Salinas, CA") |
| Owner/engineer federal background (no clearance level stated) | "built by an engineer who spent years securing systems where the stakes were high and the standards were higher" | ghosxt-cares.html:393-396 | MATCHES (consistent with DoD/federal-contractor experience; no clearance level named, as required) |
| Footer line, federal background | "Built by an engineer from the federal contracting world." | ghosxt-cares.html:979 | MATCHES |
| Footer tagline | "Government-grade IT for small business." | ghosxt-cares.html:853 | UNVERIFIABLE — marketing gloss on the DoD/federal background fact; not itself a listed VERIFIED FACT |
| Program identity/existence | "Ghosxt Cares" free IT setup program for nonprofits | entire page; JSON-LD Service, ghosxt-cares.html:66-89 | UNVERIFIABLE — this program and all its terms are not mentioned anywhere in VERIFIED FACTS; nothing to check it against |
| Service area for the program | "Monterey County" 501(c)(3) nonprofits only | title (9), meta description (13), hero (338), JSON-LD areaServed (75-78), eligibility section (678) | UNVERIFIABLE — geographically consistent with a Salinas, CA base, but the county-wide free-program commitment itself is not in VERIFIED FACTS |
| Cost to nonprofit / "free" labor | "Zero labor cost" / "100% free labor" / "$0" | title (9), meta (13), hero note (355), mission body (402-404), JSON-LD offers price "0" USD (85-88), FAQ (755-758) | UNVERIFIABLE (program not in VERIFIED FACTS) but internally consistent throughout the page |
| Domain registration fee estimate | "~$12/year" / "about $12/year" | covers-list (616), FAQ answer (98, 757) | UNVERIFIABLE — not in VERIFIED FACTS, but consistent across all three mentions |
| Microsoft 365 Nonprofit licensing | "free or deeply discounted for eligible nonprofits" | covers-list (621-624), FAQ (98, 758) | UNVERIFIABLE — describes a third-party (Microsoft) program, not a Ghosxt capability; not covered by VERIFIED FACTS |
| Eligibility limit | "Limited to 1 organization per quarter" / "We take one organization per quarter" | eligibility list (682), FAQ (114, 785-786), apply section (697-698) | UNVERIFIABLE — a specific operational commitment not present anywhere in VERIFIED FACTS; recommend VERIFY WITH ULI given it's a concrete capacity promise |
| Onboarding session length | "1-hour" / "one-hour onboarding session" | provides-card (497), FAQ (130, 812) | UNVERIFIABLE — internally consistent, but not sourced in VERIFIED FACTS (which only defines onboarding fees for paid tiers, a different program) |
| DNS technical scope | "Domain routing, MX records, SPF/DKIM/DMARC" | provides-card (486-488) | UNVERIFIABLE — standard technical claim, not enumerated in VERIFIED FACTS capability list |
| Setup timeline | "Most setups are completed within a couple of weeks of our kickoff call" | FAQ answer (798-800, 121-123) | UNVERIFIABLE — not in VERIFIED FACTS |
| Call-to-action duration | "Book a 15-min call" | hero CTA (350), apply CTA (707) | UNVERIFIABLE — specific duration not stated in VERIFIED FACTS |
| Contact/booking link owner | Calendly link "calendly.com/ulises-ghosxt" | 246, 292, 348, 705, 859, 925, 1048 | MATCHES (consistent with owner name Ulises Paiz) |
| Contact email (program) | cares@ghosxt.com | 344, 701, 712 | UNVERIFIABLE — not covered by VERIFIED FACTS |
| Contact email (footer/sales) | sales@ghosxt.com | 966-969 | UNVERIFIABLE — not covered by VERIFIED FACTS |
| Phone number | (831) 204-0501 / +18312040501 | 244, 1047 | UNVERIFIABLE — not covered by VERIFIED FACTS, but consistent within the page |
| Copyright year | "© 2026 Ghosxt" | 979 | MATCHES current year (2026); not itself a VERIFIED FACT item |
| Service-area cities (footer, sitewide) | Salinas, Monterey, Watsonville, Hollister, Santa Cruz, Gilroy, San Jose, Pacific Grove, Carmel, Seaside, Marina | 999-1010 | UNVERIFIABLE — generic sitewide footer, not specific to this program; note several listed cities (Hollister, Gilroy, San Jose, Santa Cruz) fall outside Monterey County, which could read as inconsistent with the page's own "Monterey County only" eligibility rule for the Cares program specifically — worth a scope clarification, not a factual contradiction |
| Credentials/certifications | none named on this page | — | N/A — no specific credential claims to check |
| Cisco certification | none found | — | N/A (correct — none should appear) |
| Dental/dentist | none found | — | N/A (correct — excluded vertical does not appear) |
| Vendor names / SIEM | none found | — | N/A (correct — no capability or vendor claims beyond the free-setup scope) |
| Clearance level | none stated | — | MATCHES (compliant — never states a level) |
| Case examples / testimonials | none present on this page | — | N/A — nothing to flag as anonymized case example or testimonial here |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No dedicated summary block exists. Hero states service area/cost only (338-341, 355); no named contact ("Ulises" appears only inside the Calendly URL slug, never in visible body text), no response time/turnaround stated anywhere, and no pricing link appears in body content (only in sitewide nav/footer) |
| FAQ present with real question-and-answer text | Pass | Visible accordion FAQ at 747-833 (6 real Q&As), matching FAQPage JSON-LD at 90-142 |
| Plain-text statement of the offer within first 300 words of body | Pass | Hero subtitle (337-341) states the offer plainly ("Free IT foundations for Monterey County nonprofits... at no cost for our labor") within the first ~50 words |
| Exactly one H1 | Pass | Single `<h1>` at ghosxt-cares.html:335 |
| Title, meta description, canonical present | Pass | Title (8-10), meta description (11-14), canonical (15) |
| JSON-LD present (list which types) | Pass | `@graph` at 62-145 contains: Service (with nested Organization provider, AdministrativeArea areaServed, Audience, Offer) and FAQPage (with 6 nested Question/Answer pairs) |
| Content that exists only inside JS | Pass (none found) | All copy, cards, and FAQ text are static HTML; inline script (1018-1044) only toggles scroll-to-top visibility and the `.active` class on FAQ items — it does not inject text |
| Icon-only table cells | Pass (N/A) | No `<table>` elements exist on this page |
| display:none on content that should be crawlable | Pass (none found) | No `display:none` occurrences in the HTML markup (external CSS files were not modified/audited per house rules) |
| Cookie banner or duplicated nav before main content in the DOM | Fail | Cookie banner (`#cookieBanner`, 156-182) sits before `<nav>` (187) and before `<main id="main-content">` (303). The full nav link set is also duplicated between the desktop menu (200-234) and the mobile drawer menu (257-300), both located before `<main>` |
| Internal links to pricing and to the relevant city or vertical pages | Pass | /pricing linked in nav (230, 286) and footer (877); footer also links Monterey-County-area city pages (999-1010). These are sitewide boilerplate links, not contextual in-body links specific to this page's content |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Em dash — URL-encoded `%E2%80%94` (U+2014 EM DASH) inside the mailto `subject=` query string, rendering as "Ghosxt Cares application — [Your organization name]" | ghosxt-cares.html:344 (hero "Apply by email" CTA) |
| Em dash — identical `%E2%80%94` encoded em dash in the same mailto subject string | ghosxt-cares.html:701 (bottom "Apply by email" CTA) |

No Cisco-certification, dental, vendor-name, clearance-level, or SIEM/unlisted-capability violations were found on this page.

## Top Three Fixes
1. Remove the em dash from the mailto `subject=` parameter (encoded as `%E2%80%94`) at both ghosxt-cares.html:344 and :701 — replace with a comma, colon, or plain word so the house "no em dashes" rule is met in the actual rendered/decoded text, not just the visible HTML source.
2. Add an at-a-glance block near the top of the page stating service area (Monterey County), who the applicant will work with (name the owner, not just an unlabeled Calendly slug), expected timeline, and a link to /pricing — none of the four required elements currently appear together anywhere on the page.
3. Move the cookie banner (156-182) so it no longer precedes `<nav>`/`<main>` in the DOM, and flag the whole Ghosxt Cares program's specific terms (one org per quarter, ~$12/year domain estimate, one-hour onboarding, Microsoft nonprofit licensing claims) for VERIFY WITH ULI — none of it is anchored in VERIFIED FACTS, which covers only the paid managed-services offering.
