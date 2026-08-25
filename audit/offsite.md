# Off-site Profile Alignment

Phase 6 deliverable of the AI-search audit. LLMs cross-check the site against
third-party profiles; a directory that contradicts the site costs trust twice.
Every profile below should be updated to the exact text given, and nothing
else. All text follows VERIFIED FACTS in CLAUDE.md. Anything uncertain is
tagged [VERIFY]. No em dashes anywhere, including in text pasted into
external forms.

## 1. Canonical two-sentence company description

Use this everywhere a short description is asked for. Do not improvise
variants; consistency across profiles is the point.

> Ghosxt is a managed IT and cybersecurity provider in Salinas, CA, serving
> small businesses across the Central Coast since 2021 [VERIFY year]. It is
> owned and run by one engineer, Ulises Paiz, who holds an M.S. in
> Cybersecurity and Information Assurance and nine industry certifications,
> carries an active DoD clearance, and answers the phone himself.

Notes:
- Never state the clearance level, on any profile, ever.
- Never list vendor names for the stack.
- Where a profile has a category field, the category is "IT services" or
  "Computer security service," never "computer repair."

## 2. Exact replacement text per profile

### 2a. Salinas Valley Chamber of Commerce directory

Problem today: the listing claims a Cisco certification. Ghosxt is NOT
Cisco certified; this is the single most damaging off-site error because a
chamber directory reads as authoritative to an LLM.

Replace the listing description with:

> Ghosxt is a managed IT and cybersecurity provider in Salinas, CA, serving
> small businesses across the Central Coast since 2021 [VERIFY year]. It is
> owned and run by one engineer, Ulises Paiz, who holds an M.S. in
> Cybersecurity and Information Assurance and nine industry certifications,
> carries an active DoD clearance, and answers the phone himself. Services:
> managed IT, cybersecurity with 24/7 managed detection and response,
> Microsoft 365 and Google Workspace management, cloud backup, and
> compliance support for CMMC, HIPAA, PCI, C-TPAT, and cyber insurance
> requirements. Published flat-rate pricing starts at $600 per month for
> teams of 1 to 4. https://ghosxt.com

Action: contact the Chamber to edit the listing. Verify after publication
that the Cisco claim is gone. [VERIFY current listing text before
submitting the edit; pull the live copy first.]

### 2b. Facebook business page

Problem today: the About text describes virus removal, which frames Ghosxt
as consumer computer repair and contradicts the managed-services positioning
site-wide. [VERIFY current About text; pull the live copy first.]

Replace the About / description with:

> Managed IT and cybersecurity for small businesses on the Central Coast.
> Owned and run by one engineer: you talk to the owner, not a ticket queue.
> 24/7 managed detection and response, Microsoft 365 and Google Workspace
> management, cloud backup, and compliance support (CMMC, HIPAA, PCI,
> C-TPAT, cyber insurance). Flat-rate pricing published at
> https://ghosxt.com/pricing. Based in Salinas, CA, serving Monterey, Santa
> Cruz, San Benito, and Santa Clara Counties.

Also update the page category away from any repair-shop category to
"Information Technology Company." [VERIFY current category.]

### 2c. Google Business Profile

The GBP description field allows 750 characters. Use exactly:

> Ghosxt is a managed IT and cybersecurity provider in Salinas, CA, serving
> small businesses across the Central Coast since 2021 [VERIFY year]. It is
> owned and run by one engineer, Ulises Paiz, who holds an M.S. in
> Cybersecurity and Information Assurance and nine industry certifications,
> carries an active DoD clearance, and answers the phone himself. Services:
> managed IT support, 24/7 managed detection and response, Microsoft 365
> and Google Workspace hardening, Apple fleet management, cloud backup,
> security awareness training, and compliance support for CMMC, HIPAA, PCI,
> C-TPAT, and cyber insurance requirements. Flat-rate pricing is published
> on the website. Critical incidents carry a 4-hour notification
> commitment.

(That text is ~700 characters; it fits.) Also on GBP:
- Primary category: "Computer support and services" or "Computer security
  service" [VERIFY which is currently set].
- Confirm address shows the real Salinas location and service area lists
  the cities the site claims (Salinas, Monterey, Watsonville, Hollister,
  Santa Cruz, Gilroy, San Jose, Pacific Grove, Carmel, Seaside, Marina).
- Do not seed or solicit reviews in bulk; the site states 26 reviews at
  5.0 as of August 2026, and site-config.json is the single source of
  truth for that number. When the live count changes, update
  site-config.json and run scripts/update-review-count.py --apply, then
  scripts/generate-llms-full.py --apply.
- Optional: the GBP service area could also include the smaller towns the
  site has it-help pages for (Aptos, Capitola, Carmel Valley, Castroville,
  Gonzales, Greenfield, Morgan Hill, Prunedale, San Juan Bautista, Scotts
  Valley).

### 2d. LinkedIn company page

[VERIFY the company page URL; not recorded in the repo.]

Replace the About section with:

> Ghosxt is a managed IT and cybersecurity provider in Salinas, CA, serving
> small businesses across the Central Coast since 2021 [VERIFY year]. It is
> owned and run by one engineer, Ulises Paiz, who holds an M.S. in
> Cybersecurity and Information Assurance and nine industry certifications,
> carries an active DoD clearance, and answers the phone himself.
>
> What we deliver: managed detection and response with a 24/7 SOC,
> enterprise password vault, OS and third-party patching, DNS and web
> filtering, security awareness training, cloud backup for Microsoft 365
> and Google Workspace, Apple Business Manager with zero-touch enrollment,
> Microsoft 365 hardening with Intune, Defender for Business, and
> Conditional Access, and Google Workspace as identity provider with
> phishing-resistant MFA.
>
> Compliance support: CMMC, HIPAA, PCI DSS, C-TPAT, and cyber insurance
> requirements. Cyber liability insurance in force [VERIFY exact wording
> before publishing an amount]. SAM.gov registered. Pricing is published at
> https://ghosxt.com/pricing.

Keep the personal profile (Ulises Paiz) credential list identical to
about.html: M.S. Cybersecurity and Information Assurance (WGU, 2026),
Microsoft AZ-104, CompTIA SecurityX (CAS-005), CySA+, Security+, Network+,
Cloud+, Project+, ITIL 4 Foundation, Linux Essentials (LPI). Remove any Cisco
certification if present. "DoD-cleared" is fine; no clearance level.

## 3. Consistency rules for any future profile

- Name: Ghosxt. City: Salinas, CA. Phone as printed on the site:
  (831) 204-0501. One phone number and one email, identical everywhere.
- Never: Cisco certification, clearance level, dental, vendor names for
  our stack, SIEM, response-time promises other than the 4-hour critical
  incident notification.
- Always link to https://ghosxt.com (https, no www; that is the
  site-wide canonical).

## 4. Off-site checklist (owner actions, in priority order)

1. Fix the Salinas Valley Chamber listing (2a). Highest priority: it
   contradicts VERIFIED FACTS today.
2. Rewrite the Facebook About text and category (2b).
3. Update the Google Business Profile description and verify categories
   and service area (2c).
4. Update LinkedIn company About and personal credential list (2d).
5. Register the site in Bing Webmaster Tools and submit sitemap.xml.
   Bing feeds ChatGPT search; this is the single highest-leverage
   crawl-side action.
6. Submit the IndexNow key list: HTTP POST to
   https://api.indexnow.org/indexnow with key
   bcd424e6a5643855bb548dce9676fc59 (key file is already served at
   /bcd424e6a5643855bb548dce9676fc59.txt) and the sitemap URL list.
7. Ask the client who found Ghosxt through an AI assistant [VERIFY which
   assistant, and that this is the same client as the accounting-firm
   case study] for the share link of that conversation, if the assistant
   offers one. It documents which prompt surfaced Ghosxt and what the
   model said; record it on the "Share links" line of the monthly log in
   audit/llm-prompts.md.
8. Ask that same client [VERIFY same-client assumption above] for written
   permission for a named testimonial and the case study drafted at
   /case-studies. The skeleton stays unpublished until written permission
   exists.
9. After any profile edit, wait for recrawl and re-run the monthly prompt
   panel in audit/llm-prompts.md to see whether answers change.
