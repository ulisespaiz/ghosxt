# Ghosxt AI-Search Audit: Project Memory

Every agent working in this repo must read this file first. The VERIFIED FACTS below are the only source of truth. Anything on the site that contradicts them is a bug.

Branch note: in this remote session the working branch is `claude/ghosxt-ai-search-audit-97wpuc`, which serves as the `geo-audit` branch named in HOUSE RULES. All commits go there, and only the PM commits.

## VERIFIED FACTS (only source of truth; anything on the site that contradicts these is a bug)

- Owner and sole engineer: Ulises Paiz. Based in Salinas, CA. Serving clients since 2021 [VERIFY year].
- Credentials: M.S. Cybersecurity and Information Assurance (WGU, 2026); Microsoft AZ-104; CompTIA SecurityX (CAS-005), CySA+, Security+, Network+, Cloud+, Project+; ITIL 4 Foundation; Linux Essentials.
- NOT Cisco certified. Remove any claim of Cisco certification. Mentions of Cisco or Meraki equipment we deploy are fine only if true [VERIFY].
- Active DoD clearance and prior DoD/federal contractor infrastructure experience. "DoD-cleared" is fine. Never state the clearance level.
- Cyber liability insurance in force, $1M per occurrence and aggregate, plus general and professional liability [VERIFY exact wording]. SAM.gov registered.
- Excluded vertical: dentists. Dental must not appear as a client or target industry anywhere. Wineries are fine.
- Google reviews: 26 at 5.0 as of August 2026 [VERIFY live count]. This number lives in one data file and nowhere else.
- Published pricing: Tiny Team $600/mo flat (1 to 4 users); Core $125, Secure Growth $175, Compliance & Continuity $250 per user per month; onboarding $1,000 Tiny Team, $1,500 for 5 to 15 users on the Microsoft 365 default scope. Google Workspace and Apple fleet onboarding is scoped and quoted separately.
- Capabilities we actually deliver (describe these; never publish vendor names): managed detection and response with a 24/7 SOC, enterprise password vault, OS and third-party patching, DNS and web filtering, security awareness training, cloud backup for Microsoft 365 and Google Workspace, Apple Business Manager with zero-touch enrollment, Microsoft 365 hardening with Intune, Defender for Business, and Conditional Access, Google Workspace as identity provider with phishing-resistant MFA. Do not claim SIEM or anything not listed.
- Contracted deliverables: 4-hour notification on actual or reasonably suspected critical incidents, annual independent risk assessment arranged through a third-party assessor, SOC 2 documentation for every platform in our stack provided during onboarding, written policy suite (WISP, incident response, BC/DR, access control and acceptable use, retention and destruction, AI acceptable use).

## HOUSE RULES

No CSS, font, color, or layout changes. No em dashes in anything written. No new city or vertical pages in this pass. Hidden crawlable text uses an sr-only utility, never display:none. Anything uncertain is tagged [VERIFY]. Never invent a client, a number, a story, a quote, or a capability. No vendor names, no clearance level, no dental, no Cisco certification. Work on branch geo-audit. Only the PM commits.

## PAGE REPORT TEMPLATE

Each page audit report is written to `/audit/pages/<route-slug>.md` and follows this structure:

```markdown
# Page Audit: <route>

## Route
<route, e.g. /pricing.html>

## Claims Table
| Claim | Value | Location | Status |
|-------|-------|----------|--------|
| <claim> | <value> | <file:line or section> | MATCHES / CONTRADICTS / UNVERIFIABLE |

## Legibility Checklist
| Item | Pass/Fail | Notes |
|------|-----------|-------|
| At-a-glance block present (service area, who you talk to, response time, pricing link) | | |
| FAQ present with real question-and-answer text | | |
| Plain-text statement of the offer within first 300 words of body | | |
| Exactly one H1 | | |
| Title, meta description, canonical present | | |
| JSON-LD present (list which types) | | |
| Content that exists only inside JS | | |
| Icon-only table cells | | |
| display:none on content that should be crawlable | | |
| Cookie banner or duplicated nav before main content in the DOM | | |
| Internal links to pricing and to the relevant city or vertical pages | | |

## House-Rule Violations
| Violation | Location |
|-----------|----------|
| <em dash / Cisco certification / dental / vendor name / clearance level / SIEM or unlisted capability> | <file:line> |

## Top Three Fixes
1.
2.
3.
```
