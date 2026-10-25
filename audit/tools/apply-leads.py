#!/usr/bin/env python3
"""Apply the answer-first leads from AUDIT.md A-02 to the service, compliance
and vertical pages.

For each page in LEADS: the first paragraph after the H1 (class "lead", or the
C-TPAT hero subtitle) becomes the new two-sentence lead, and the old lead
paragraph moves, with its markup intact, to the top of the first H2 section so
no copy is lost. The C-TPAT subtitle is replaced outright because the new lead
carries its every fact.

    python3 audit/tools/apply-leads.py          # dry run: counts and checks
    python3 audit/tools/apply-leads.py --apply  # write pages

Each new lead is at most 70 words and names the service, "Monterey County"
and published pricing (linked to /pricing). No em dashes.
"""

import html as H
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PRICING = '<a href="/pricing">published pricing</a>'

LEADS = {
    "managed-it-services":
        "If your IT only gets attention after something breaks, you pay for the downtime twice: once in the outage and again in the invoice. "
        "Ghosxt provides managed IT services for small businesses across Monterey County and surrounding areas: a fixed monthly fee, monitoring that catches problems before your staff notice, and an engineer with DoD infrastructure experience who answers the call, at " + PRICING + ".",
    "cybersecurity":
        "An antivirus subscription and the router from the cable company do not stop a ransomware crew; they slow it down. "
        "Ghosxt provides cybersecurity services for small businesses across Monterey County and surrounding areas: government-grade controls sized to each client, run by an engineer with DoD infrastructure experience, at " + PRICING + ".",
    "managed-detection-response":
        "A security alert nobody reads at 2am is not protection, it is a log file. "
        "Ghosxt provides managed detection and response for small businesses across Monterey County and surrounding areas: a 24/7 SOC watching endpoints, network and cloud, human-reviewed alerts and real containment when something is found, run by an engineer with DoD infrastructure experience, at " + PRICING + ".",
    "cloud-services":
        "Most cloud tenants were set up in an afternoon, never hardened, and nobody can show what is actually locked down. "
        "Ghosxt provides cloud services for small businesses across Monterey County and surrounding areas: Microsoft 365 hardening, clean migrations and a straight answer on what belongs in the cloud at all, run by an engineer with DoD infrastructure experience, at " + PRICING + ".",
    "backup-disaster-recovery":
        "A backup nobody has restored from is a hope, not a plan, and you find out which on the worst morning of the year. "
        "Ghosxt provides backup and disaster recovery for small businesses across Monterey County and surrounding areas, built the way an engineer with DoD infrastructure experience would protect their own data, at " + PRICING + ".",
    "network-design":
        "If the only person who knew the admin password left two jobs ago, your network was never designed; it grew. "
        "Ghosxt provides network design and architecture for small businesses across Monterey County and surrounding areas: segmented, documented and vendor-neutral, built by an engineer with DoD infrastructure experience, at " + PRICING + ".",
    "help-desk-it-support":
        "When a mailbox will not open or a laptop rejects the password, your team needs a person who picks up and fixes it, not a ticket number and a phone tree. "
        "Ghosxt provides IT help desk and support for small businesses across Monterey County and surrounding areas: an engineer with DoD infrastructure experience who already knows your network and your people, most issues fixed remotely, at " + PRICING + ".",
    "it-consulting-vcio":
        "Without an IT director, technology decisions get made under pressure by whoever is least busy that week, and the budget shows it. "
        "Ghosxt provides IT consulting and vCIO services for small businesses across Monterey County and surrounding areas: a part-time strategic IT lead who owns the roadmap, budget, risk and vendor decisions, delivered by owner Ulises Paiz, an engineer with DoD infrastructure experience, at " + PRICING + ".",
    "co-managed-it":
        "Your one IT person is good, and the only one who knows how everything works, cannot take a real vacation and has no time to become a security specialist. "
        "Ghosxt provides co-managed IT for small businesses across Monterey County and surrounding areas: an engineer with DoD infrastructure experience alongside your team, covering the gaps and the security and compliance depth, so internal IT gets stronger, not replaced, at " + PRICING + ".",
    "cmmc-compliance":
        "If you hold or want DoD contracts, CMMC is no longer optional, and your competitors are getting ready. "
        "Ghosxt prepares small defense contractors and subcontractors across Monterey County and surrounding areas for CMMC and NIST SP 800-171, Microsoft 365 GCC High included, led by an engineer with DoD infrastructure experience who has lived inside these controls, at " + PRICING + ".",
    "hipaa-it-compliance":
        "HIPAA does not care that you run a two-provider clinic: if you store electronic patient data, the Security Rule applies in full. "
        "Ghosxt builds and documents HIPAA-compliant IT for small medical practices across Monterey County and surrounding areas, with the documentation an investigation asks for, run by an engineer with DoD infrastructure experience, at " + PRICING + ".",
    "pci-compliance":
        "If your business takes cards, PCI DSS applies, and assuming the POS vendor handles it is how small merchants end up breached and fined. "
        "Ghosxt makes PCI compliance practical for restaurants, hotels, retailers and service businesses across Monterey County and surrounding areas: the right SAQ, real network segmentation and the monitoring behind it, from an engineer with DoD infrastructure experience, at " + PRICING + ".",
    "ctpat":
        "CBP's updated Minimum Security Criteria now require a dedicated cybersecurity program, not an IT guy who handles it. "
        "Ghosxt provides C-TPAT cybersecurity compliance for importers, carriers, packers and logistics companies across Monterey County and surrounding areas, run by an engineer with DoD infrastructure experience, without disrupting operations, at " + PRICING + ".",
    "cyber-insurance-compliance":
        "This year's cyber insurance questionnaire is nothing like the one you signed three years ago, and carriers decline small businesses over a missing MFA checkbox. "
        "Ghosxt gets small businesses across Monterey County and surrounding areas ready for cyber insurance renewal: MFA where it counts, managed detection and response on every endpoint, cloud backup and the written evidence your broker expects, from an engineer with DoD infrastructure experience, at " + PRICING + ".",
    "zero-trust-security":
        "\"Trusted because it is inside the network\" is exactly how a stolen laptop or a phished password becomes a full breach. "
        "Ghosxt builds zero trust security for small businesses across Monterey County and surrounding areas, using the tools you likely already own and configuring them to actually enforce it, run by an engineer with DoD infrastructure experience, at " + PRICING + ".",
    "agriculture-it-services":
        "A pack-house ERP that goes dark in July or a cooler that stops paging in a heatwave is a six-figure problem by Friday, not an IT ticket. "
        "Ghosxt provides managed IT and cybersecurity for growers, packers, processors and cooling and distribution operators across Monterey County and surrounding areas: federal-grade engineering, no outsourced helpdesk, at " + PRICING + ".",
    "trucking-it-services":
        "When dispatch goes down or a driver cannot sign into the ELD, freight sits, and it costs revenue by the hour. "
        "Ghosxt provides managed IT and cybersecurity for trucking, logistics and customs operators across Monterey County and surrounding areas, keeping dispatch, ELD and C-TPAT controls running and audit-ready: federal-grade engineering, no outsourced helpdesk, at " + PRICING + ".",
    "manufacturing-it-services":
        "A CNC controller that loses the network at 10am is a half-day of running by hand, and an OT segment hit by ransomware does not stay on the shop floor. "
        "Ghosxt provides managed IT, cybersecurity and OT/IT segmentation for machine shops, fabricators, contract manufacturers and small defense suppliers across Monterey County and surrounding areas, CMMC preparation included: federal-grade engineering, at " + PRICING + ".",
    "healthcare-it-services":
        "An EHR outage in the middle of a clinic day costs revenue and trust, and a lost laptop without verified encryption starts a sixty-day breach-notification clock. "
        "Ghosxt provides HIPAA-aligned managed IT and cybersecurity for medical practices, behavioral health, physical therapy and optometry across Monterey County and surrounding areas: federal-grade engineering, signed BAAs, at " + PRICING + ".",
    "property-management-it-services":
        "A property manager runs a portfolio of offices, and every leasing office is a different ISP, a different Wi-Fi reality and a different risk surface around the same tenant data. "
        "Ghosxt provides identity-first managed IT and cybersecurity for property managers, HOA management firms and commercial real estate operators across Monterey County and surrounding areas: federal-grade engineering, no outsourced helpdesk, at " + PRICING + ".",
    "hospitality-it-services":
        "Your guests touch your systems directly: the point-of-sale taking a card every few minutes, the Wi-Fi anyone can join, the wine club that drives your best margins. "
        "Ghosxt provides PCI-aware managed IT and cybersecurity for restaurants, hotels, inns and wineries across Monterey County and surrounding areas: federal-grade engineering, no outsourced helpdesk, at " + PRICING + ".",
    "professional-services-it":
        "A partner who leaves on Friday and still has access to every client file on Monday is the breach nobody budgets for. "
        "Ghosxt provides managed IT, cybersecurity and Microsoft 365 hardening for law offices, CPA firms, agencies and other professional offices across Monterey County and surrounding areas: federal-grade engineering, no outsourced helpdesk, at " + PRICING + ".",
    "engineering-it-services":
        "A 3 GB BIM model that takes five minutes to open over the VPN is a margin problem, and a drawing set on a personal laptop is an ITAR or client-confidentiality issue waiting to surface. "
        "Ghosxt provides managed IT, CAD performance and engineering data security for civil, structural, MEP and A/E firms across Monterey County and surrounding areas: federal-grade engineering, at " + PRICING + ".",
}

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
    if PRICING not in lead:
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
    bad = 0
    for slug, lead in LEADS.items():
        problems = check(slug, lead)
        path = os.path.join(ROOT, slug + ".html")
        text = open(path, encoding="utf-8").read()
        new, err = transform(text, lead, slug in REPLACE_ONLY)
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
