# Page Audit: /contact

## Route
/contact (file: contact.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Sole engineer / who you talk to | "Talk to the engineer" / "an engineer" / "Built by an engineer from the federal contracting world" | contact.html:379, 432, 712 | MATCHES |
| Federal contracting background | "Built by an engineer from the federal contracting world" | contact.html:712 | MATCHES |
| Business location | Salinas, California | contact.html:368, 82-85 (JSON-LD address) | MATCHES |
| Service area | "Local Salinas IT support across Monterey County" + "Remote support available nationwide" | contact.html:369-370 | MATCHES |
| Phone number | +1 (831) 204-0501 | contact.html:244, 348, 96 (JSON-LD telephone) | MATCHES (consistent across nav, info box, JSON-LD) |
| Email | sales@ghosxt.com | contact.html:337, 704, 77 (JSON-LD email) | MATCHES |
| Business hours | Mon-Fri 8am-6pm Pacific | contact.html:349; JSON-LD openingHoursSpecification 87-92 (08:00-18:00) | MATCHES |
| Founding date | 2021 | contact.html:79 (JSON-LD foundingDate) | MATCHES value in CLAUDE.md, but CLAUDE.md itself tags this year "[VERIFY year]" - inherited UNVERIFIABLE, flag VERIFY WITH ULI |
| Email response time | "We respond within 24 hours" | contact.html:338 | CONTRADICTS (see next row - page states two different response-time commitments) |
| Form response time | "we'll get back to you within 24 hours" | contact.html:380 | CONTRADICTS |
| Form response time (2nd claim) | "We reply within 1 business day" | contact.html:431 | CONTRADICTS 338/380 - "24 hours" and "1 business day" are not equivalent (e.g., a Friday-evening submission) |
| Form success message | "will reply within 1 business day" | contact.html:808 (JS) | Same inconsistency as above |
| Consultation call length | "Book a 30-minute consultation directly" | contact.html:359 | UNVERIFIABLE - VERIFY WITH ULI (call duration not in CLAUDE.md) |
| Meeting platform | "We'll meet over Google Meet, no prep required" | contact.html:446 | UNVERIFIABLE - VERIFY WITH ULI (not in CLAUDE.md; also see House-Rule Violations, vendor name) |
| Pricing tiers structure | "Tiny teams of 1–4 fit our Tiny Team Managed Security plan; teams of 5+ use per-user pricing on Core, Secure Growth, or Compliance & Continuity" | contact.html:127 (JSON-LD FAQ), 580 (visible FAQ) | MATCHES CLAUDE.md pricing (Tiny Team 1-4 users flat; Core/Secure Growth/Compliance & Continuity per-user for 5+) |
| Client size range | "We've worked with shops as small as 3 and as large as 60+" | contact.html:127, 580 | UNVERIFIABLE - VERIFY WITH ULI (specific client-count stat not in CLAUDE.md; do not remove/rewrite per instructions, flag only) |
| Contract terms | "we recommend at least 3-6 months to properly architect and stabilize your infrastructure, we don't lock clients into multi-year contracts" | contact.html:135, 591 | UNVERIFIABLE (not addressed in CLAUDE.md, does not contradict it) |
| Onboarding timeline | "we typically need 2-4 weeks to properly onboard" | contact.html:143, 602 | UNVERIFIABLE (CLAUDE.md lists onboarding fees, not a timeline; does not contradict) |
| After-hours monitoring | "Our monitoring systems alert us 24/7 to critical issues" | contact.html:159, 624 | MATCHES (consistent with "managed detection and response with a 24/7 SOC" capability) |
| Out-of-state clients | "We work with clients throughout the United States" | contact.html:119, 569 | MATCHES (consistent with "Remote support available nationwide," contact.html:370) |
| Privacy claim | "Your information is only used to respond to your inquiry and is never shared with third parties" | contact.html:426 | UNVERIFIABLE (policy claim, no contradicting fact in CLAUDE.md) |
| Tagline | "Government-grade IT for small business" | contact.html:640 | UNVERIFIABLE - marketing puffery; does not itself state a clearance level so not a rule violation, but flag for PM awareness given adjacency to DoD-clearance fact |
| No excluded verticals present | No "dental"/"dentist" client or vertical anywhere on page | footer service list, contact.html:667-685 | MATCHES (excluded vertical correctly absent) |
| No Cisco certification claim | Not present anywhere on page | n/a | MATCHES (absence correct - no false Cisco cert claim) |
| Free assessment offer | "Free IT Assessment" (title, footer CTA), "Schedule Free Assessment" | contact.html:8, 646 | UNVERIFIABLE (offer terms/scope of "free assessment" not defined in CLAUDE.md; not contradicted) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | contact-info-box (contact.html:331-373) has service area (368-370), a response-time claim (338), and "who you talk to" is stated nearby in the form header (379) - but no link to /pricing anywhere inside `<main>`. All `/pricing` links (236, 282, 658) sit in the nav/footer chrome outside this block. |
| FAQ present with real question-and-answer text | Pass | Six real Q&A pairs, contact.html:563-626, verbatim-matched by FAQPage JSON-LD (108-164). |
| Plain-text statement of the offer within first 300 words of body | Fail | The visible above-the-fold copy (badge, H1, subtitle at 302-373, form header at 378-381) never states in plain text what Ghosxt sells (managed IT / cybersecurity services for small business). It implies "IT" via "your current IT provider" and "Local Salinas IT support" but there's no explicit sentence stating the offer; that language only exists in `<meta name="description">` (line 9), which is not body text. |
| Exactly one H1 | Pass | Single `<h1 class="contact-title">` at contact.html:327. |
| Title, meta description, canonical present | Pass | Title line 8, meta description line 9, canonical line 10. |
| JSON-LD present (list which types) | Pass | Three blocks: `ContactPage` (55-66), `LocalBusiness` (67-107), `FAQPage` (108-164). |
| Content that exists only inside JS | Pass (none found) | FAQ, form copy, process steps are all static HTML. The Calendly inline widget (442-451) renders its calendar UI via external JS (assets.calendly.com/assets/external/widget.js), which is expected for a third-party embed and not core page content. |
| Icon-only table cells | Pass (N/A) | No `<table>` elements on this page. |
| display:none on content that should be crawlable | Pass | No `display:none` in the HTML. FAQ answers collapse via `max-height:0`/`overflow:hidden` (assets/css/contact.css:910-919), which keeps the text in the DOM and crawlable - not the forbidden pattern. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner" id="cookieBanner">` (contact.html:179-199) sits before `<nav>` (202) and before `<main id="main-content">` (295) in DOM order. No duplicated nav found. |
| Internal links to pricing and to the relevant city or vertical pages | Pass | `/pricing` linked in nav (236), mobile nav (282), and footer (658). Relevant city page linked in-body: `/salinas` (contact.html:369), plus a full "Service Areas" city-link list in the footer (contact.html:722-737, 11 cities). No vertical-page link appears in `<main>` itself, but the footer carries the full vertical list (667-685) with the excluded "dental" vertical correctly absent. |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Vendor/product name ("Google Meet") named for sales-call platform | contact.html:446 - "We'll meet over Google Meet, no prep required from your side." Not in CLAUDE.md's list of capabilities/vendors; flag for PM to confirm this is intended to be public or should be genericized. |
| Internal inconsistency in stated response time ("24 hours" vs. "1 business day") | contact.html:338, 380 vs. 431, 808 - not a listed house-rule category verbatim, but undermines the "response time" fact this page is supposed to state accurately; logging here since it's a factual-accuracy defect the PM should fix. |

No instances found of: em dashes (only en dashes, e.g. title line 8, and those are not prohibited by house rules), Cisco certification, dental/dentist, clearance level, or SIEM/unlisted capability claims.

## Top Three Fixes
1. Resolve the response-time contradiction: the page promises "within 24 hours" in two places (contact.html:338, 380) and "within 1 business day" in two other places (431, 808). Pick one accurate commitment and use it consistently - VERIFY WITH ULI which is correct.
2. Add a plain-text statement of the offer (what Ghosxt actually sells) and a `/pricing` link inside the at-a-glance block near the top of `<main>` (contact.html:331-373) - right now a reader/crawler has to infer the offer and has no in-block path to pricing.
3. Confirm with Uli whether naming "Google Meet" (contact.html:446) is acceptable to publish, and VERIFY the "30-minute consultation" (359) and "shops as small as 3 and as large as 60+" (127, 580) claims, none of which are sourced in CLAUDE.md.
