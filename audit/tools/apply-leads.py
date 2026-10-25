#!/usr/bin/env python3
"""Apply the answer-first leads from AUDIT.md A-02 to the service, compliance
and vertical pages.

For each page in LEADS: the first paragraph after the H1 (class "lead", or the
C-TPAT hero subtitle) becomes the new two-sentence lead, and the old lead
paragraph moves, with its markup intact, to the top of the first H2 section so
no copy is lost. The C-TPAT subtitle is replaced outright because the new lead
carries its every fact.

    python3 audit/tools/apply-leads.py                         # dry run: counts and checks
    python3 audit/tools/apply-leads.py --apply                 # write pages
    python3 audit/tools/apply-leads.py --apply --replace-only  # re-run after a wording change

Each new lead is at most 70 words and names the service, "Monterey County"
and published pricing (linked to /pricing). No em dashes.
"""

import html as H
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PRICING = '<a href="/pricing">published pricing</a>'
DOD = "Ghosxt, run by an engineer with DoD infrastructure experience, "

LEADS = {
    "managed-it-services":
        "Break-fix IT is cheap right up until the week a ransomware crew finds the file share nobody was watching. "
        + DOD + "provides managed IT services for small businesses across Monterey County and surrounding areas: a fixed monthly fee at " + PRICING + ", monitoring that catches problems before your staff notice, and an engineer who answers the call.",
    "cybersecurity":
        "The attacker does not need to beat your firewall; one reused password or one convincing invoice email walks straight past it. "
        + DOD + "provides cybersecurity services for small businesses across Monterey County and surrounding areas: government-grade controls sized to each client, at " + PRICING + ".",
    "managed-detection-response":
        "A security alert nobody reads at 2am is not protection, it is a log file. "
        + DOD + "provides managed detection and response for small businesses across Monterey County and surrounding areas: a 24/7 SOC watching endpoints, network and cloud, human-reviewed alerts and real containment when something is found, at " + PRICING + ".",
    "cloud-services":
        "A cloud tenant set up in an afternoon and never hardened is where most of the small-business breaches we see begin, and nobody can show what is locked down. "
        + DOD + "provides cloud services for small businesses across Monterey County and surrounding areas: Microsoft 365 management and baseline hardening included in every managed IT plan at " + PRICING + ", with migrations and cloud projects quoted per scope.",
    "backup-disaster-recovery":
        "The question is not whether you have backups; it is when someone last restored from them and how long it took. "
        + DOD + "provides backup and disaster recovery for small businesses across Monterey County and surrounding areas, built the way that engineer would protect their own data, at " + PRICING + ".",
    "network-design":
        "A flat network behind the modem the cable company gave you means one phished laptop can reach everything. "
        + DOD + "provides network design and architecture for small businesses across Monterey County and surrounding areas: segmented, documented and vendor-neutral, quoted per project after a free assessment.",
    "help-desk-it-support":
        "When a mailbox will not open or a laptop rejects the password, your team needs a person who picks up and fixes it, not a ticket number. "
        + DOD + "provides IT help desk and support for small businesses across Monterey County and surrounding areas: someone who already knows your network and your people, most issues fixed remotely, at " + PRICING + ".",
    "it-consulting-vcio":
        "Nobody owns the IT roadmap, so renewals get signed, tools overlap and the budget is explained after it is spent. "
        "Ghosxt provides IT consulting and vCIO services for small businesses across Monterey County and surrounding areas: owner Ulises Paiz, an engineer with DoD infrastructure experience, as your part-time strategic IT lead for roadmap, budget, risk and vendor decisions, at " + PRICING + ".",
    "co-managed-it":
        "Your internal IT person or team cannot be on vacation and on call at the same time, and the security work is what slips. "
        + DOD + "provides co-managed IT for small businesses across Monterey County and surrounding areas: working alongside your team, covering the gaps and the security and compliance depth, scoped to the role we play, with transparent pricing agreed upfront.",
    "cmmc-compliance":
        "A DoD contract or subcontract now comes with a CMMC requirement, and \"we have antivirus\" is not an answer an assessor accepts. "
        "Ghosxt, run by an engineer with DoD infrastructure experience who has lived inside these controls, prepares small defense contractors and subcontractors across Monterey County and surrounding areas for CMMC and NIST SP 800-171, including Microsoft 365 GCC High setup and hardening, with managed IT at " + PRICING + ".",
    "hipaa-it-compliance":
        "HIPAA does not care that you run a two-provider clinic: if you store electronic patient data, the Security Rule applies in full. "
        + DOD + "builds and documents HIPAA-compliant IT for small medical practices across Monterey County and surrounding areas, with the documentation an investigation asks for, at " + PRICING + ".",
    "pci-compliance":
        "Your POS vendor's PCI letter covers their terminal, not the network it sits on, and that network is yours. "
        + DOD + "makes PCI compliance practical for restaurants, hotels, retailers and service businesses across Monterey County and surrounding areas: the right SAQ, real network segmentation and the monitoring behind it, at " + PRICING + ".",
    "ctpat":
        "CBP's updated Minimum Security Criteria require a dedicated cybersecurity program, and \"our IT guy handles it\" is not one. "
        + DOD + "helps importers, carriers, freight forwarders, 3PLs and customs brokers across Monterey County and surrounding areas meet and maintain the C-TPAT cybersecurity criteria, at " + PRICING + ".",
    "cyber-insurance-compliance":
        "This year's cyber insurance questionnaire is nothing like the one you signed three years ago, and carriers decline small businesses over a missing MFA checkbox. "
        + DOD + "gets small businesses across Monterey County and surrounding areas ready for renewal: MFA where it counts, managed detection and response on every endpoint, cloud backup and the written evidence your broker expects, at " + PRICING + ".",
    "zero-trust-security":
        "Once a phished password is inside your network, nothing else asks it to prove who it is. "
        + DOD + "builds zero trust security for small businesses across Monterey County and surrounding areas, using the tools you likely already own and configuring them to actually enforce it, at " + PRICING + ".",
    "agriculture-it-services":
        "Harvest does not pause for an IT ticket, and the cooler, the pack line and the ERP all find out at once. "
        "Ghosxt provides managed IT and cybersecurity for growers, packers, processors and cooling and distribution operators across Monterey County and surrounding areas: federal-grade engineering, no outsourced helpdesk, at " + PRICING + ".",
    "trucking-it-services":
        "A truck is parked the moment the driver cannot sign into the ELD, and the customer does not care whose fault that is. "
        "Ghosxt provides managed IT and cybersecurity for trucking, logistics and customs operators across Monterey County and surrounding areas, keeping dispatch, ELD and C-TPAT controls running and audit-ready: federal-grade engineering, no outsourced helpdesk, at " + PRICING + ".",
    "manufacturing-it-services":
        "Ransomware that reaches an OT segment stops the shop floor, and the ERP outage that follows stops the office. "
        "Ghosxt provides managed IT, cybersecurity and OT/IT segmentation for machine shops, fabricators, contract manufacturers and small defense suppliers across Monterey County and surrounding areas, with CMMC preparation for defense subcontracts: federal-grade engineering, at " + PRICING + ".",
    "healthcare-it-services":
        "An EHR outage in the middle of a clinic day costs revenue and trust, and a lost laptop without verified encryption starts a sixty-day breach-notification clock. "
        "Ghosxt provides HIPAA-aligned managed IT and cybersecurity for medical practices, behavioral health, physical therapy and optometry across Monterey County and surrounding areas: federal-grade engineering, signed BAAs, at " + PRICING + ".",
    "property-management-it-services":
        "Tenant data, owner portals and rent payments sit behind the logins your leasing offices share, and one phished password reaches all of it. "
        "Ghosxt provides identity-first managed IT and cybersecurity for property managers, HOA management firms and commercial real estate operators across Monterey County and surrounding areas: federal-grade engineering, no outsourced helpdesk, at " + PRICING + ".",
    "hospitality-it-services":
        "One guest on the staff Wi-Fi or one skimmed card at the POS becomes a review-site story before the investigation is finished. "
        "Ghosxt provides PCI-aware managed IT and cybersecurity for restaurants, hotels, inns and wineries across Monterey County and surrounding areas: federal-grade engineering, no outsourced helpdesk, at " + PRICING + ".",
    "professional-services-it":
        "A partner who leaves on Friday and still has access to every client file on Monday is the breach nobody budgets for. "
        "Ghosxt provides managed IT, cybersecurity and Microsoft 365 hardening for law offices, CPA firms, agencies and other professional offices across Monterey County and surrounding areas: federal-grade engineering, no outsourced helpdesk, at " + PRICING + ".",
    "engineering-it-services":
        "Your project files are the business, and a BIM model that will not open over the VPN or a drawing set on a personal laptop takes the margin with it. "
        "Ghosxt provides managed IT, CAD performance and engineering data security for civil, structural, MEP and A/E firms across Monterey County and surrounding areas: federal-grade engineering, at " + PRICING + ".",
}

# Pages whose service is quoted per scope: the lead says so in the page's own
# words instead of linking the published tiers.
NO_PRICING_LINK = {"network-design", "co-managed-it"}

REPLACE_ONLY = {"ctpat"}
TAG = re.compile(r"<[^>]+>")
MAIN_RE = re.compile(r'<main id="main-content">(.*)</main>', re.S)
H1_RE = re.compile(r"<h1\b[^>]*>.*?</h1>", re.S)
LEAD_RE = re.compile(r'(<p class="(?:lead|ctpat-hero-subtitle)"[^>]*>)(.*?)(</p>)', re.S)
H2_RE = re.compile(r"<h2\b[^>]*>.*?</h2>", re.S)


def words(markup):
    return len(H.unescape(TAG.sub("", markup)).split())


def check(slug, lead):
    plain = H.unescape(TAG.sub("", lead))
    problems = []
    if words(lead) > 70:
        problems.append(f"{words(lead)} words")
    if "Monterey County and surrounding areas" not in plain:
        problems.append("service area wording missing")
    if PRICING not in lead and not (slug in NO_PRICING_LINK and "pricing" in plain or "quoted" in plain):
        problems.append("pricing link missing")
    if chr(0x2014) in lead:
        problems.append("em dash")
    if re.search(r"\bSalinas\b", plain):
        problems.append("names Salinas beside the county")
    return problems


def transform(text, lead, replace_only):
    m = MAIN_RE.search(text)
    if not m:
        return None, "no main"
    body = m.group(1)
    h1 = H1_RE.search(body)
    if not h1:
        return None, "no h1"
    lm = LEAD_RE.search(body, h1.end())
    if not lm:
        return None, "no lead paragraph after h1"
    old_inner = lm.group(2)
    if H.unescape(TAG.sub("", old_inner)).strip() == H.unescape(TAG.sub("", lead)).strip():
        return None, "already applied"
    new_body = body[:lm.start()] + lm.group(1) + lead + lm.group(3) + body[lm.end():]
    if not replace_only:
        h2 = H2_RE.search(new_body, lm.start() + len(lm.group(1)) + len(lead) + len(lm.group(3)))
        if not h2:
            return None, "no h2 after the lead"
        indent = re.search(r"([ \t]*)$", new_body[:h2.start()]).group(1)
        moved = f"\n{indent}<p>{old_inner.strip()}</p>"
        new_body = new_body[:h2.end()] + moved + new_body[h2.end():]
    return text[:m.start(1)] + new_body + text[m.end(1):], None


def main(argv):
    apply = "--apply" in argv
    # --replace-only: the story was already moved by an earlier run; only the
    # lead paragraph changes.
    replace_all = "--replace-only" in argv
    bad = 0
    for slug, lead in LEADS.items():
        problems = check(slug, lead)
        path = os.path.join(ROOT, slug + ".html")
        text = open(path, encoding="utf-8").read()
        new, err = transform(text, lead, replace_all or slug in REPLACE_ONLY)
        status = err or ("would write" if not apply else "written")
        if problems or (err and err != "already applied"):
            bad += 1
        print(f"{slug:36s} {words(lead):2d} words  {status}{'  PROBLEMS: ' + ', '.join(problems) if problems else ''}")
        if apply and new and not problems:
            open(path, "w", encoding="utf-8").write(new)
    if not apply:
        print("dry run; pass --apply to write")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
