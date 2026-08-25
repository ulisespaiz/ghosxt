# Page Audit: /cmmc-compliance

## Route
/cmmc-compliance (file: cmmc-compliance.html)

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| Owner/operator is an engineer with DoD infrastructure experience | "engineer with DoD infrastructure experience" | cmmc-compliance.html:7, 13, 19, 44, 240, 257-258 | MATCHES |
| "DoD-cleared work" (no clearance level stated) | "Ghosxt's background includes DoD-cleared work" | cmmc-compliance.html:258 | MATCHES (house rule: "DoD-cleared" is fine, never state the level; no level is stated) |
| Specific former job title | "former Senior Solutions Consultant for the U.S. Department of Defense" | cmmc-compliance.html:258 | UNVERIFIABLE - VERIFIED FACTS states only "prior DoD/federal contractor infrastructure experience," with no specific title on record. VERIFY WITH ULI |
| Personally operated/lived inside CMMC/NIST 800-171 controls | "who has lived inside these exact controls" / "implemented and operated these controls inside the environments they were written for" / "readiness built by someone who has [touched CUI]" | cmmc-compliance.html:240, 245, 257-258 | UNVERIFIABLE - extends the verified "DoD infrastructure experience" fact to a specific claim of having personally operated CMMC/NIST 800-171 controls and handled CUI. VERIFY WITH ULI |
| Credential: "CMMC / NIST SP 800-171" | JSON-LD `hasCredential`: `{"@type":"EducationalOccupationalCredential","credentialCategory":"CMMC / NIST SP 800-171"}` | cmmc-compliance.html:53 | CONTRADICTS - no such credential appears in the VERIFIED FACTS credential list (M.S. Cybersecurity and Information Assurance; AZ-104; CompTIA SecurityX/CySA+/Security+/Network+/Cloud+/Project+; ITIL 4 Foundation; Linux Essentials). It also conflicts with the page's own FAQ, which states Ghosxt does **not** perform the official CMMC assessment because only an accredited C3PAO can (line 101-105) - asserting a formal CMMC/NIST-SP-800-171 credential on the same page that disclaims certifying authority is self-contradictory |
| Service area | Monterey, Santa Cruz, San Benito, and Santa Clara counties, California | cmmc-compliance.html:46-52 | MATCHES - consistent with footer service-area cities (Salinas, Monterey, Watsonville, Hollister, Santa Cruz, Gilroy, San Jose, Pacific Grove, Carmel, Seaside, Marina, lines 504-514) and the verified Salinas, CA base |
| Core CMMC service deliverables: gap assessment vs. all 110 controls, CUI enclave design, SSP & POA&M authorship, control implementation, SPRS score calc/submission | Full services grid + FAQ answer | cmmc-compliance.html:44, 93-97 (JSON-LD FAQ), 267-291 (services grid), 313-326 (visible FAQ) | UNVERIFIABLE - none of these CMMC-specific deliverables appear in VERIFIED FACTS's "Capabilities we actually deliver" or "Contracted deliverables" lists. This is the entire premise of the page. VERIFY WITH ULI and add to VERIFIED FACTS once confirmed |
| "Book a Free CMMC Assessment" / free assessment offer | Free-assessment CTA repeated across page | cmmc-compliance.html:44, 242, 297-298, 340-341 | UNVERIFIABLE - not itemized in VERIFIED FACTS, but internally consistent throughout the page; low-priority |
| General CMMC/NIST 800-171 program facts (Level 1 = 17 practices; Level 2 = 110 controls; DFARS 252.204-7012 trigger; C3PAO third-party assessment every 3 years) | Public-record framework facts, not Ghosxt-specific | cmmc-compliance.html:72, 80, 313-317 | UNVERIFIABLE - outside the scope of VERIFIED FACTS (which covers only Ghosxt's own facts); no contradiction found, flagged only because it cannot be checked against the source of truth |
| Self-description: "we don't perform the official CMMC assessment, a C3PAO does" | "No. The formal Level 2 certification is performed by an accredited C3PAO..." | cmmc-compliance.html:101-105 (JSON-LD), 328-330 (visible FAQ) | MATCHES - not contradicted by VERIFIED FACTS; consistent, accurate self-scoping statement (though it sits in tension with the hasCredential claim above) |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | Fail | No `<aside>`/key-facts block exists anywhere on this page. No response-time or SLA statement appears anywhere in the body. No in-body pricing link (see last row). |
| FAQ present with real question-and-answer text | Pass | 6 `<details>/<summary>` Q&As at lines 311-334, matching the FAQPage JSON-LD (lines 64-115) word-for-word. |
| Plain-text statement of the offer within first 300 words of body | Pass | H1 (239) + lead paragraph (240) plainly state the offer ("Ghosxt prepares small defense contractors and subcontractors on the Central Coast for CMMC and NIST SP 800-171...") well within the first 300 words. |
| Exactly one H1 | Pass | Single `<h1>` at line 239. |
| Title, meta description, canonical present | Pass | Title line 6; meta description line 7; canonical line 8. |
| JSON-LD present (list which types) | Pass, with issue | Types present: Service (with nested `EducationalOccupationalCredential` via `hasCredential` - see Claims Table), BreadcrumbList, FAQPage. No `LocalBusiness` node is defined on this page (provider is referenced only by `@id`). |
| Content that exists only inside JS | Pass | No content found that is JS-only; all visible copy, including the FAQ, is server-rendered static HTML. |
| Icon-only table cells | N/A / Pass | No `<table>` elements exist on this page. |
| display:none on content that should be crawlable | Pass | No `display:none` occurrences found in this file. |
| Cookie banner or duplicated nav before main content in the DOM | Fail | `<div class="cookie-banner" id="cookieBanner">` (lines 129-143) sits in the DOM before `<nav class="navbar">` (144) and before `<main id="main-content">` (233). |
| Internal links to pricing and to the relevant city or vertical pages | Partial | Vertical links present in body: `/managed-it-services` (289), `/ctpat` (304), `/cybersecurity` (305), `/manufacturing-it-services` (305), `/engineering-it-services` (305). But `/pricing` is linked only in nav (178) and footer/mobile-menu boilerplate (220, 385) - never once in the page's body copy, even though the page never states pricing itself. No city page is linked (acceptable - this is a vertical/service page, not tied to one city). |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| Invented/unverified credential - JSON-LD `hasCredential` asserts an `EducationalOccupationalCredential` of "CMMC / NIST SP 800-171," which is not in the VERIFIED FACTS credential list and contradicts the page's own FAQ stating only an accredited C3PAO performs the formal certification | cmmc-compliance.html:53 (JSON-LD), cf. 101-105/328-330 (FAQ) |
| Capability not in VERIFIED FACTS - the page's entire core offering (gap assessment against all 110 controls, CUI enclave design, SSP & POA&M authorship, control implementation, SPRS score calculation and submission) is not named anywhere in VERIFIED FACTS's "Capabilities we actually deliver" or "Contracted deliverables" lists | cmmc-compliance.html:44, 93-97, 267-291, 313-326 |

No em dashes, Cisco-certification claims, dental/dentist references, vendor/tool-brand names, SIEM claims, or stated clearance level were found on this page.

## Top Three Fixes
1. Resolve the JSON-LD `hasCredential` node (line 53) claiming a "CMMC / NIST SP 800-171" `EducationalOccupationalCredential` - this credential is not in the VERIFIED FACTS list and directly conflicts with the page's own FAQ, which states the formal Level 2 certification is performed only by an accredited C3PAO, not Ghosxt (lines 101-105, 328-330). VERIFY WITH ULI whether a legitimate credential exists to cite, or remove the property.
2. Get explicit sign-off from Uli on the CMMC-specific service deliverables this page promises (gap assessment vs. 110 controls, CUI enclave design, SSP/POA&M authorship, SPRS scoring and submission, control implementation) - none of these appear in VERIFIED FACTS's capability or deliverable lists, and this is the entire content premise of the page (lines 44, 93-97, 267-291, 313-326). Add the confirmed items to VERIFIED FACTS so future audits have a source of truth for this page.
3. Add an at-a-glance block (service area, who you talk to, response time, pricing link) - this page has none, unlike other audited service/location pages - and add at least one in-body link to `/pricing`, since currently the only pricing links are nav/footer boilerplate (178, 220, 385) despite the page never stating price itself. Also move the cookie banner (lines 129-143) so it no longer precedes `<nav>`/`<main>` in the DOM order (systemic issue also seen on other pages).

Lower-priority: VERIFY WITH ULI the specific claim "former Senior Solutions Consultant for the U.S. Department of Defense" (line 258) and the extension of "DoD infrastructure experience" to "has lived inside these exact controls" / operated CMMC/NIST 800-171 controls specifically and handled CUI personally (lines 240, 245, 257-258) - both go beyond the verified "prior DoD/federal contractor infrastructure experience" wording with unconfirmed specificity.
