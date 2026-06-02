#!/usr/bin/env python3
"""Generate service x city combo pages (cybersecurity-<city>.html, cloud-services-<city>.html).

Shared chrome (head assets, cookie banner, nav, footer) is sliced verbatim from an
existing, hand-tuned combo page so generated pages stay byte-identical to the real
site. Only the localized regions — title/meta/OG, JSON-LD, hero, body sections, and
FAQs — are templated from the per-city data model below.

Run from the repo root:

    python3 scripts/generate-location-service-pages.py

By default it only writes pages that do not already exist, so the hand-tuned
Monterey/Salinas/San Jose/Santa Cruz/Watsonville combos are never clobbered.
Pass --force to overwrite.

After running, regenerate the sitemap and OG images:

    python3 scripts/generate-sitemap.py
    python3 scripts/generate-og-images.py
"""

import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CYBER_TEMPLATE = os.path.join(ROOT, "cybersecurity-monterey.html")
CLOUD_TEMPLATE = os.path.join(ROOT, "cloud-services-monterey.html")


def slice_between(text, start_marker, end_marker, include_start=True, include_end=False):
    s = text.index(start_marker)
    e = text.index(end_marker, s + len(start_marker))
    if not include_start:
        s += len(start_marker)
    if include_end:
        e += len(end_marker)
    return text[s:e]


def extract_chrome(path):
    """Pull the byte-identical shared blocks out of an existing combo page."""
    t = open(path, encoding="utf-8").read()
    head_assets = slice_between(
        t,
        '    <link rel="icon" href="assets/img/favicon.ico"',
        '    <script type="application/ld+json">',
    )
    cf_analytics = slice_between(
        t,
        "    <!-- ghosxt:cf-web-analytics -->",
        "  </head>",
    )
    body_top = slice_between(t, "  <body>", '    <nav class="navbar"')
    nav = slice_between(t, '    <nav class="navbar"', '    <main id="main-content">')
    footer = t[t.index('    <footer class="footer" id="footerSection">'):]
    return {
        "head_assets": head_assets.rstrip(),
        "cf_analytics": cf_analytics.rstrip(),
        "body_top": body_top.rstrip(),
        "nav": nav.rstrip(),
        "footer": footer.rstrip(),
    }


# ---------------------------------------------------------------------------
# Per-city data model. Each city is genuinely differentiated by its economy so
# the generated pages are local, not boilerplate.
# ---------------------------------------------------------------------------

CITIES = {
    "carmel": {
        "name": "Carmel",
        "admin": "Monterey County, California",
        "nearby": [("pacific-grove", "Pacific Grove"), ("monterey", "Monterey"), ("seaside", "Seaside"), ("salinas", "Salinas")],
        "cloud_exists": False,
    },
    "gilroy": {
        "name": "Gilroy",
        "admin": "Santa Clara County, California",
        "nearby": [("hollister", "Hollister"), ("san-jose", "San Jose"), ("salinas", "Salinas"), ("watsonville", "Watsonville")],
        "cloud_exists": False,
    },
    "hollister": {
        "name": "Hollister",
        "admin": "San Benito County, California",
        "nearby": [("salinas", "Salinas"), ("gilroy", "Gilroy"), ("watsonville", "Watsonville"), ("san-jose", "San Jose")],
        "cloud_exists": False,
    },
    "king-city": {
        "name": "King City",
        "admin": "Monterey County, California",
        "nearby": [("soledad", "Soledad"), ("salinas", "Salinas"), ("monterey", "Monterey"), ("hollister", "Hollister")],
        "cloud_exists": False,
    },
    "marina": {
        "name": "Marina",
        "admin": "Monterey County, California",
        "nearby": [("seaside", "Seaside"), ("monterey", "Monterey"), ("salinas", "Salinas"), ("pacific-grove", "Pacific Grove")],
        "cloud_exists": False,
    },
    "pacific-grove": {
        "name": "Pacific Grove",
        "admin": "Monterey County, California",
        "nearby": [("monterey", "Monterey"), ("carmel", "Carmel"), ("seaside", "Seaside"), ("marina", "Marina")],
        "cloud_exists": False,
    },
    "seaside": {
        "name": "Seaside",
        "admin": "Monterey County, California",
        "nearby": [("marina", "Marina"), ("monterey", "Monterey"), ("pacific-grove", "Pacific Grove"), ("salinas", "Salinas")],
        "cloud_exists": False,
    },
    "soledad": {
        "name": "Soledad",
        "admin": "Monterey County, California",
        "nearby": [("king-city", "King City"), ("salinas", "Salinas"), ("hollister", "Hollister"), ("monterey", "Monterey")],
        "cloud_exists": False,
    },
}


# Localized prose, keyed by slug. Kept in one place so each page reads as a
# distinct local page rather than a find-and-replace of the city name.
CONTENT = {
    "carmel": {
        "cyber_lead": "Carmel businesses trade on reputation and discretion — galleries holding six-figure inventory, luxury inns and tasting rooms taking cards all day, and real estate offices moving large sums by wire. Each is a quiet, high-value target, and a breach here is not just downtime, it is a story that travels in a small town. Ghosxt brings government-grade cybersecurity, sized for a Carmel small business and delivered with the discretion the town expects, from a cleared DoD IT engineer.",
        "cyber_threat1": "Carmel's money is concentrated and visible, which is exactly what attackers look for. Real estate and escrow activity makes the area a magnet for business email compromise and wire fraud, where a spoofed inbox reroutes a closing payment. Galleries and boutiques run point-of-sale and high-ticket card transactions that draw payment-card theft. Luxury hospitality juggles seasonal staff and guest data, a combination that invites social engineering.",
        "cyber_threat2": "The controls that stop all of this are the same proven set used to protect government endpoints. What changes in Carmel is the discretion required to deploy them — quiet on-site visits scheduled around guests and clients, and an engineer who never discusses your business elsewhere.",
        "cyber_card_a": ("Wire-Fraud &amp; BEC Defense", "Email hardening with enforced MFA, SPF, DKIM, and DMARC, plus impersonation and banking-change alerts — the controls that stop a spoofed inbox from rerouting a Carmel real estate closing."),
        "cyber_card_b": ("Gallery &amp; Boutique PCI", "PCI-aware point-of-sale security and segmented guest Wi-Fi, so high-ticket card transactions and gallery inventory systems stay protected without slowing the floor."),
        "cyber_diff": "Most Carmel businesses are not under a federal compliance regime, but they all carry something worth stealing and a reputation that cannot absorb a public breach. The practical bar is the one cyber-insurers now set — MFA, EDR, immutable backup, and email security, with the documentation to prove it. Our <a href=\"blog/cyber-insurance-renewal-checklist-small-business-central-coast.html\">cyber-insurance renewal checklist</a> covers what underwriters expect, and our note on <a href=\"blog/small-business-cybersecurity-mistakes.html\">common small-business security mistakes</a> covers the gaps we see most.",
        "cyber_faq": [
            ("Do you provide cybersecurity for small businesses in Carmel?", "Yes. Ghosxt provides full cybersecurity for Carmel and Carmel Valley small businesses: endpoint detection and response, phishing-resistant MFA, identity hardening, immutable backup, email security, and 24/7 monitoring. We are based on the Central Coast, so on-site work in Carmel is genuinely local and handled discreetly."),
            ("How do you protect real estate transactions from wire fraud?", "We harden email accounts with enforced multi-factor authentication, configure SPF, DKIM, and DMARC to block spoofing, add impersonation and banking-change alerts, and train staff to verify wire details by phone. Most wire fraud starts with a compromised inbox, so that is where we focus."),
            ("Can you secure a gallery or boutique that takes high-value card payments?", "Yes. We deliver PCI-aware point-of-sale security, segment the guest and payment networks from the back office, and add monitoring that catches intrusions early — sized for a single storefront, not an enterprise."),
            ("Can you work discreetly on-site with our staff and clients present?", "Yes. Discretion is standard for us. On-site visits are scheduled around your hours, our engineers are professional and low-profile, and we never discuss client details. It is the same standard we held inside DoD networks."),
        ],
        "cloud_lead": "Carmel runs on small, refined teams — galleries, inns, tasting rooms, real estate and law offices — that need their email, files, and booking systems to work from the floor, from home, and on the road without ever getting in the way. Microsoft 365 done right gives them that mobility with the security a high-value business needs; done wrong, it leaks client data or breaks on migration day. Ghosxt handles Microsoft 365 and cloud work for Carmel small business, from a cleared DoD IT engineer, with the discretion the town expects.",
        "cloud_economy": "Galleries and boutiques want inventory, CRM, and point-of-sale that sync cleanly across a small team. Real estate and law offices need secure document sharing and signing without emailing sensitive files around. Inns and tasting rooms need staff to reach schedules and email from the floor while guest systems stay safely separate. Microsoft 365 covers all of it — but only when the tenant is configured and hardened correctly, which is the part most setups skip.",
        "cloud_card_a": ("Secure Document Sharing", "SharePoint and OneDrive set up so a Carmel real estate or law office can share and sign sensitive documents with clients without sensitive files floating around in email."),
        "cloud_card_b": ("Gallery &amp; Inn Systems", "Inventory, CRM, booking, and point-of-sale tied into a hardened Microsoft 365 tenant, with guest-facing systems kept separate from the back office."),
        "cloud_faq": [
            ("Do you provide Microsoft 365 support for Carmel businesses?", "Yes. We set up, harden, and manage Microsoft 365 for Carmel small businesses — email, Teams, SharePoint, OneDrive, and licensing — with the security baselines most setups skip. On-site in Carmel and Carmel Valley, remote nationwide."),
            ("Can you migrate our email and files without downtime?", "Yes. We migrate email and shared files to Microsoft 365 with the cutover planned around your schedule, usually over a weekend, so your team does not lose a workday. Mailboxes, permissions, and shared files are validated before and after."),
            ("Can you set up secure document sharing for a real estate or law office?", "Yes. We build SharePoint and OneDrive with permissions that make sense, add secure external sharing and signing, and harden the tenant so confidential client documents are not scattered across inboxes."),
            ("Is Microsoft 365 secure enough for a high-value Carmel business?", "Microsoft 365 is secure when it is configured correctly, which most setups are not. We harden the tenant with phishing-resistant MFA, Conditional Access, and data-sharing controls so a gallery, inn, or firm gets the productivity of the cloud without leaving the front door open."),
        ],
    },
    "gilroy": {
        "cyber_lead": "Gilroy sits where US-101 meets State Route 152, which made it a distribution, logistics, and food-processing hub long before it was anything else. Warehouses, 3PLs, growers, and the retail outlets off the freeway all run on systems that cannot afford to stop — and ransomware crews know that a business losing money every hour it is down is a business that pays. Ghosxt brings government-grade cybersecurity, sized for a Gilroy small business, from a cleared DoD IT engineer.",
        "cyber_threat1": "Logistics and distribution businesses are targeted precisely because downtime is so expensive — a warehouse management system or dispatch board held hostage costs money by the hour, which is what ransomware operators count on. Food processors add operational technology and cold-chain systems that were never designed to be on the internet. Retail and outlets process card data at volume. And every one of them runs on email that attackers probe for invoice and payment fraud.",
        "cyber_threat2": "The defenses are the same proven controls in each case — EDR, hardened identity, immutable backup, network segmentation, and a human watching. What changes is the cost of being wrong, and for a business that runs on uptime, that cost is steep.",
        "cyber_card_a": ("Logistics Uptime &amp; Ransomware", "EDR and immutable backup tuned for warehouse, dispatch, and 3PL systems that cannot go down — so a ransomware hit is a contained incident, not a week of stopped freight."),
        "cyber_card_b": ("OT &amp; Network Segmentation", "Processing-line, cold-chain, and warehouse equipment segmented away from the office network, so a compromised PC cannot reach the systems that move product."),
        "cyber_diff": "Distribution and food businesses increasingly face two pressures at once: cyber-insurers demanding real controls before they renew, and larger retail and grocery customers sending security questionnaires before they sign. We put the same controls in place that satisfy both — MFA, EDR, immutable backup, email security — and produce the documentation to prove it. Our <a href=\"blog/cyber-insurance-renewal-checklist-small-business-central-coast.html\">cyber-insurance renewal checklist</a> and <a href=\"blog/backup-disaster-recovery-small-business-2026.html\">backup and disaster-recovery guide</a> are good starting points.",
        "cyber_faq": [
            ("Do you provide cybersecurity for small businesses in Gilroy?", "Yes. Ghosxt provides full cybersecurity for Gilroy small and midsize businesses: endpoint detection and response, phishing-resistant MFA, identity hardening, immutable backup, network segmentation, and 24/7 monitoring. We work on-site across South County and the 101 corridor and remotely nationwide."),
            ("Can you protect a warehouse or 3PL from ransomware?", "Yes. Logistics businesses are heavily targeted because downtime is so costly. We deploy EDR with a 24/7 SOC, immutable backups the production network cannot reach, and segmentation so an infected PC cannot reach dispatch and warehouse systems."),
            ("Can you help us pass a retail or grocery customer's security review?", "Yes. We put the controls and documentation in place — MFA, backups, access policies, written procedures — so when a larger customer sends a security questionnaire, you can answer it and keep the contract."),
            ("How much does cybersecurity cost for a Gilroy business?", "It depends on headcount and what you already have, but our pricing is published upfront. Most small businesses are best served by managed IT with cybersecurity built in rather than buying point tools piecemeal. Start with a free assessment for a written, prioritized plan and a real number."),
        ],
        "cloud_lead": "Gilroy businesses move product — distribution, 3PL, food processing, growers, and the retail that lines the freeway — and the back office that runs them needs email, files, and line-of-business apps available from the warehouse floor, the cab, and the office without breaking. Microsoft 365 and Azure done right give that reach with the security a logistics business needs. Ghosxt handles cloud and Microsoft 365 work for Gilroy small business, from a cleared DoD IT engineer.",
        "cloud_economy": "Warehouse and dispatch teams need email, schedules, and documents on whatever device is in hand. Growers and processors want files and line-of-business data reachable from the field and the plant. Retail needs reliable point-of-sale and back-office sync. Microsoft 365 covers the productivity layer and Azure handles the line-of-business app or secure remote access that does not belong on an aging on-prem server — but only when the environment is built and hardened correctly.",
        "cloud_card_a": ("Line-of-Business in Azure", "Warehouse, dispatch, and ERP apps moved off aging on-prem hardware into Azure or hybrid where it earns its place, with secure remote access for field and warehouse teams."),
        "cloud_card_b": ("Mobile &amp; Field Access", "Email, files, and apps reachable from the cab, the floor, and the office on managed, secured devices — without standing up a VPN nobody maintains."),
        "cloud_faq": [
            ("Do you provide Microsoft 365 support for Gilroy businesses?", "Yes. We set up, harden, and manage Microsoft 365 for Gilroy small and midsize businesses — email, Teams, SharePoint, OneDrive, and licensing — with the security baselines most setups skip. On-site across South County, remote nationwide."),
            ("Can you migrate our email and files without downtime?", "Yes. We migrate email, file shares, and line-of-business data to Microsoft 365 with the cutover planned around your schedule, so your team does not lose a workday. Everything is validated before and after the move."),
            ("Can you move our warehouse or dispatch app to the cloud?", "Yes. We move line-of-business apps off aging on-prem servers into Azure or a hybrid setup where it makes sense, with secure remote access for warehouse and field teams — and we are honest when something is better left where it is."),
            ("Is Microsoft 365 secure enough for a logistics business?", "Microsoft 365 is secure when it is configured correctly, which most setups are not. We harden the tenant with phishing-resistant MFA and Conditional Access so a distribution or processing business gets cloud mobility without leaving the door open."),
        ],
    },
    "hollister": {
        "cyber_lead": "Hollister is a working town — machine shops and small manufacturers, vineyards and growers, and family businesses that have run for generations. Most assume they are too small or too out-of-the-way to be a target, which is exactly the assumption ransomware crews exploit, because automated attacks do not check your zip code. Ghosxt brings government-grade cybersecurity, sized for a Hollister small business and priced for one, from a cleared DoD IT engineer right next door.",
        "cyber_threat1": "Manufacturers and machine shops run CAD files, job data, and increasingly connected equipment that is devastating to lose and expensive to have held for ransom. Vineyards and growers run lean back offices that are easy to phish. Family businesses often have one trusted person handling everything, which means one compromised inbox can move money. None of these are too small to attack — automated ransomware and phishing do not target by size, they target by opportunity.",
        "cyber_threat2": "The fix is the same proven set of controls used on government endpoints, sized down without being dumbed down: EDR, hardened identity, immutable backup, and segmentation between the shop floor and the office. The difference with Ghosxt is that on-site help is a short drive, not a half-day from the Bay Area.",
        "cyber_card_a": ("Shop-Floor &amp; CAD Protection", "EDR and immutable backup for machine-shop and manufacturing systems, with the office network segmented away from connected equipment so a compromise cannot jump to the floor."),
        "cyber_card_b": ("Small-Team Identity Hardening", "Phishing-resistant MFA and least-privilege access for lean family businesses where one person handles the money — closing the single biggest gap before it is exploited."),
        "cyber_diff": "Hollister businesses do not usually face a federal compliance regime, but they do face cyber-insurers who now require real controls, and manufacturers face customers who send security questionnaires before awarding work. We put the controls in place that satisfy both — MFA, EDR, immutable backup, email security — and document them. See our <a href=\"blog/cyber-insurance-renewal-checklist-small-business-central-coast.html\">cyber-insurance renewal checklist</a> and the rundown of <a href=\"blog/small-business-cybersecurity-mistakes.html\">common small-business security mistakes</a>.",
        "cyber_faq": [
            ("Do you provide cybersecurity for small businesses in Hollister?", "Yes. Ghosxt provides full cybersecurity for Hollister and San Benito County small businesses: endpoint detection and response, phishing-resistant MFA, identity hardening, immutable backup, and 24/7 monitoring. We are nearby, so on-site response is a short drive, not a half-day trip."),
            ("Is my business too small to be a target?", "No — automated ransomware and phishing do not target by size, they target by opportunity. Small, lean businesses are often easier to breach because no one is watching. The good news is the highest-leverage controls, like MFA and EDR, are affordable and stop the bulk of attacks."),
            ("Can you protect a machine shop's CAD files and equipment?", "Yes. We deploy EDR and immutable backup for shop systems and CAD data, and segment the office network from connected equipment so a compromised PC cannot reach the floor."),
            ("How much does cybersecurity cost for a Hollister business?", "Our pricing is published upfront, and most small businesses are best served by managed IT with cybersecurity built in rather than buying point tools piecemeal. Start with a free assessment for a written plan and a real number."),
        ],
        "cloud_lead": "Hollister's machine shops, growers, and family businesses mostly still run on aging on-prem servers and ad-hoc email — setups that quietly cost a workday whenever hardware fails. Microsoft 365 and the right cloud foundation fix that, giving a small Hollister team reliable email, files, and remote access without a server in the closet to babysit. Ghosxt handles cloud and Microsoft 365 work for Hollister small business, from a cleared DoD IT engineer right next door.",
        "cloud_economy": "Manufacturers want CAD and job files reachable and backed up without a fragile on-prem server. Growers and family businesses want email and documents that work from the field, the office, and home. Most of these businesses are running an old box in a closet that is one failure away from a bad week. Microsoft 365 and a clean cloud migration replace that with something reliable — when it is set up and hardened correctly, which is the part most setups skip.",
        "cloud_card_a": ("Off the On-Prem Server", "File shares and line-of-business data moved off the aging server in the closet into Microsoft 365 and Azure, so a hardware failure stops being a business emergency."),
        "cloud_card_b": ("Reliable Small-Team M365", "Email, Teams, SharePoint, and OneDrive set up properly for a lean Hollister team, with backups and security baselines built in from day one."),
        "cloud_faq": [
            ("Do you provide Microsoft 365 support for Hollister businesses?", "Yes. We set up, harden, and manage Microsoft 365 for Hollister and San Benito County small businesses — email, Teams, SharePoint, OneDrive, and licensing. On-site nearby, remote nationwide."),
            ("Can you move us off our old on-prem server?", "Yes. We migrate file shares and line-of-business data off aging on-prem hardware into Microsoft 365 and Azure, so a failed server is no longer a business emergency. The cutover is planned around your schedule so you do not lose a workday."),
            ("Can you migrate our email without downtime?", "Yes. Mailboxes, calendars, and shared files are pre-staged and validated before and after the move, with the cutover usually over a weekend, so Monday morning just works."),
            ("Is Microsoft 365 secure enough for a small Hollister business?", "Microsoft 365 is secure when configured correctly. We harden the tenant with phishing-resistant MFA and Conditional Access so a small shop or office gets cloud reliability without leaving the door open."),
        ],
    },
    "king-city": {
        "cyber_lead": "King City anchors the southern Salinas Valley — agriculture, ranching, vineyards, food processing, and the trucking that moves it all up US-101. It is the part of Monterey County most IT providers treat as too far to serve, which leaves real businesses running on no protection at all. Ghosxt does not write off South County. We bring government-grade cybersecurity, sized and priced for a King City small business, from a cleared DoD IT engineer based up the valley in Salinas.",
        "cyber_threat1": "Agriculture and food businesses are squarely in the crosshairs now: produce coolers, processing lines, and irrigation systems increasingly run on connected technology that was never built to be secured, and a ransomware hit during harvest can spoil product and stop shipments. Trucking and freight operations run on dispatch and ELD systems that cannot go dark. Ranches and growers run lean offices that are easy to phish for payment fraud.",
        "cyber_threat2": "The controls that stop this are the same ones used to protect government endpoints — EDR, hardened identity, immutable backup, and segmentation of operational technology from the office network. The only thing rural South County has lacked is a provider willing to show up, and that is the gap we close.",
        "cyber_card_a": ("Ag &amp; Food-Processing OT", "Coolers, processing lines, and irrigation controls segmented away from the office network and monitored, so a ransomware hit during harvest does not spoil product or stop shipments."),
        "cyber_card_b": ("Trucking &amp; Dispatch Security", "EDR and immutable backup for dispatch and freight systems that cannot go dark, with email hardened against the invoice and payment fraud that targets logistics."),
        "cyber_diff": "Ag, trucking, and food businesses face cyber-insurers requiring real controls and larger buyers — grocers, shippers, processors — sending security questionnaires before they sign. We put the controls in place that satisfy both and document them. Our <a href=\"blog/cyber-insurance-renewal-checklist-small-business-central-coast.html\">cyber-insurance renewal checklist</a> and <a href=\"agriculture-it-services.html\">agriculture IT</a> page cover what South County operations specifically need.",
        "cyber_faq": [
            ("Do you provide cybersecurity for small businesses in King City?", "Yes. Ghosxt provides full cybersecurity for King City and the southern Salinas Valley: endpoint detection and response, phishing-resistant MFA, identity hardening, immutable backup, and 24/7 monitoring. We are based up the valley in Salinas, so on-site response in South County is real, not theoretical."),
            ("Do you actually serve South County, or just say you do?", "We genuinely serve it. Most providers treat King City, Greenfield, and Soledad as too far. We are based in Salinas and built our model around showing up for the businesses other shops skip."),
            ("Can you protect farm, cooler, and processing systems from ransomware?", "Yes. We deploy EDR and immutable backup, and segment operational technology — coolers, processing lines, irrigation controls — away from the office network so a compromise cannot stop production during harvest."),
            ("How much does cybersecurity cost for a King City business?", "Our pricing is published upfront. Most operations are best served by managed IT with cybersecurity built in. Start with a free assessment for a written, prioritized plan and a real number."),
        ],
        "cloud_lead": "King City and the southern Salinas Valley run on agriculture, ranching, food processing, and trucking — operations spread across fields, coolers, and the road, often tied to an aging server in an office no IT provider wants to drive to. Microsoft 365 and the right cloud foundation give a South County business reliable email, files, and remote access from anywhere. Ghosxt handles cloud and Microsoft 365 work for King City small business, from a cleared DoD IT engineer based up the valley in Salinas.",
        "cloud_economy": "Growers and ranchers want records, maps, and email reachable from the field, not chained to an office PC. Food processors want line-of-business and compliance data backed up and available, not trapped on one fragile server. Trucking operations want dispatch and documents on the road. Microsoft 365 and a clean cloud migration deliver that reach and resilience — when the environment is built and hardened correctly.",
        "cloud_card_a": ("Field &amp; Road Access", "Email, files, and records reachable from the field, the cooler, and the cab on secured devices, so a South County operation is not tied to one office PC."),
        "cloud_card_b": ("Off the Aging Server", "Grower, processor, and dispatch data moved off the old on-prem box into Microsoft 365 and Azure, with backups built in, so a hardware failure is no longer a harvest emergency."),
        "cloud_faq": [
            ("Do you provide Microsoft 365 support for King City businesses?", "Yes. We set up, harden, and manage Microsoft 365 for King City and southern Salinas Valley operations — email, Teams, SharePoint, OneDrive, and licensing. On-site from our Salinas base, remote nationwide."),
            ("Do you really serve the southern Salinas Valley?", "Yes. We are based in Salinas and built our model around serving South County — King City, Greenfield, Soledad — that other providers treat as too far to bother with."),
            ("Can you move our operation off an aging on-prem server?", "Yes. We migrate grower, processor, and dispatch data off old on-prem hardware into Microsoft 365 and Azure, with the cutover planned around harvest and your schedule so you do not lose a workday."),
            ("Is Microsoft 365 secure enough for an ag or trucking business?", "Microsoft 365 is secure when configured correctly. We harden the tenant with phishing-resistant MFA and Conditional Access so a grower, processor, or carrier gets cloud reach without leaving the door open."),
        ],
    },
    "marina": {
        "cyber_lead": "Marina is the fastest-growing part of the Monterey Peninsula — built on the old Fort Ord footprint, anchored by CSU Monterey Bay, and increasingly home to ag-tech and small startups. Growth means new networks, new hires, and new ways to get breached, usually faster than a young company's security keeps up. Ghosxt brings government-grade cybersecurity that scales with a growing Marina business, from a cleared DoD IT engineer.",
        "cyber_threat1": "Fast-growing companies are breached in predictable ways: identity and access sprawl as headcount climbs, devices added faster than they are secured, and the assumption that there is time to lock things down later. Startups and ag-tech firms hold IP and customer data that draw targeted phishing. Hybrid and student-adjacent teams around CSUMB widen the attack surface with personal devices and shared logins.",
        "cyber_threat2": "The controls that stop this are the same proven set used on government endpoints — phishing-resistant MFA, EDR, hardened identity, immutable backup. The trick for a growing company is building them in early so they scale, instead of bolting them on after an incident forces the issue.",
        "cyber_card_a": ("Identity for Growing Teams", "Phishing-resistant MFA, Conditional Access, and least-privilege access standardized before headcount sprawl turns into a breach — the highest-leverage control on a growing network."),
        "cyber_card_b": ("Startup &amp; Ag-Tech Readiness", "The EDR, backup, and documented controls that let a young Marina company answer a customer or investor security review and win the work."),
        "cyber_diff": "As Marina startups and ag-tech firms land larger clients, those clients start sending security questionnaires — and cyber-insurers want the same controls before they renew. We put MFA, EDR, immutable backup, and email security in place and document them so you can pass the review and the audit. Our guide to <a href=\"blog/identity-hardening-small-business-5-employees-microsoft-365.html\">identity hardening for a small Microsoft 365 team</a> is the first move every growing company should make.",
        "cyber_faq": [
            ("Do you provide cybersecurity for small businesses in Marina?", "Yes. Ghosxt provides full cybersecurity for Marina small and growing businesses: endpoint detection and response, phishing-resistant MFA, identity hardening, immutable backup, and 24/7 monitoring. On-site across the Peninsula, remote nationwide."),
            ("We're growing fast — can security keep up?", "Yes, and building it in early is the point. We standardize MFA, device management, and least-privilege access so adding people and devices does not create new holes. It is far cheaper than cleaning up after an incident."),
            ("Can you help us pass a customer's or investor's security review?", "Yes. We put the controls and documentation in place — MFA, EDR, backups, access policies, written procedures — so when a larger client or investor sends a security questionnaire, you can answer it and win the work."),
            ("How much does cybersecurity cost for a Marina business?", "Our pricing is published upfront, and most growing teams are best served by managed IT with cybersecurity built in. Start with a free assessment for a written, prioritized plan and a real number."),
        ],
        "cloud_lead": "Marina is where the Peninsula is actually growing — new offices, ag-tech and tech startups, and teams that are hybrid from day one. A cloud-first foundation fits that perfectly: Microsoft 365 and Azure let a growing Marina company scale without re-buying everything at twenty people. Done right it scales cleanly; done wrong it has to be ripped out. Ghosxt handles cloud and Microsoft 365 work for Marina small business, from a cleared DoD IT engineer.",
        "cloud_economy": "Growing companies need email, files, and collaboration that work for hybrid and remote teams from day one, identity that scales as they hire, and the ability to add a line-of-business app in Azure without standing up a server. Startups and ag-tech firms want to look credible to customers and investors. Microsoft 365 and Azure deliver all of it — when the foundation is built to scale and hardened correctly, instead of cobbled together and outgrown.",
        "cloud_card_a": ("Cloud-First Foundation", "Microsoft 365 and Azure set up to scale from five people to fifty without ripping it out — identity, file structure, and device management that grow with you."),
        "cloud_card_b": ("Hybrid &amp; Remote Work", "Secure access to email, files, and apps for hybrid and student-adjacent teams around CSUMB, on managed devices, without a brittle VPN."),
        "cloud_faq": [
            ("Do you provide Microsoft 365 support for Marina businesses?", "Yes. We set up, harden, and manage Microsoft 365 for Marina small and growing businesses — email, Teams, SharePoint, OneDrive, and licensing — with the security baselines most setups skip. On-site across the Peninsula, remote nationwide."),
            ("Can you build a cloud setup that scales as we grow?", "Yes. We build a cloud-first foundation — identity, file structure, device management — designed to scale from five users to fifty cleanly, so you are not re-buying or rebuilding every time you hire."),
            ("Can you migrate our email and files without downtime?", "Yes. We migrate email, file shares, and line-of-business data to Microsoft 365 with the cutover planned around your schedule, so your team does not lose a workday."),
            ("Is Microsoft 365 secure enough for a startup or ag-tech firm?", "Microsoft 365 is secure when configured correctly. We harden the tenant with phishing-resistant MFA and Conditional Access so a growing company gets cloud productivity it can put in front of customers and investors."),
        ],
    },
    "pacific-grove": {
        "cyber_lead": "Pacific Grove businesses are small, tight-knit, and built on hospitality — inns and B&amp;Bs, restaurants and cafes, retreats, and the professional offices that serve them. The technology behind them is supposed to disappear, which is exactly why security often goes unaddressed until something breaks. Ghosxt brings government-grade cybersecurity, sized for a PG small business and delivered quietly, from a cleared DoD IT engineer.",
        "cyber_threat1": "Hospitality is a frequent target because it combines payment-card data with seasonal, high-turnover staff — a mix that invites point-of-sale compromise and social engineering. Inns and B&amp;Bs run booking and guest systems that hold personal and card data. Small offices and retreats often have one person handling email, billing, and bookings, so a single compromised inbox can do real damage.",
        "cyber_threat2": "The controls that stop this are the same proven set used on government endpoints — PCI-aware point-of-sale security, segmented guest Wi-Fi, phishing-resistant MFA, EDR, and immutable backup. In a town this small, the other requirement is discretion, and that is built into how we work.",
        "cyber_card_a": ("Hospitality &amp; PCI", "PCI-aware point-of-sale security and guest Wi-Fi segmented from the back office, sized for an inn, cafe, or retreat — protection that holds through the summer and festival surge."),
        "cyber_card_b": ("Booking &amp; Guest-Data Defense", "Email hardening and immutable backup around the booking and reservation systems that hold guest and card data, so a compromise does not become a guest-trust problem."),
        "cyber_diff": "Pacific Grove businesses rarely face a federal compliance regime, but those that take cards face PCI obligations, and all of them face cyber-insurers who now require MFA, EDR, immutable backup, and email security before they renew. We put those controls in place and document them. Our <a href=\"blog/cyber-insurance-renewal-checklist-small-business-central-coast.html\">cyber-insurance renewal checklist</a> and note on <a href=\"blog/small-business-cybersecurity-mistakes.html\">common small-business security mistakes</a> cover the essentials.",
        "cyber_faq": [
            ("Do you provide cybersecurity for small businesses in Pacific Grove?", "Yes. Ghosxt provides full cybersecurity for Pacific Grove small businesses: endpoint detection and response, phishing-resistant MFA, identity hardening, immutable backup, PCI-aware point-of-sale security, and 24/7 monitoring. On-site in PG and across the Peninsula, handled discreetly."),
            ("Do you secure inns, B&amp;Bs, and restaurants?", "Yes. Hospitality is a frequent target because of card data and seasonal staff. We deliver PCI-aware point-of-sale security, guest Wi-Fi segmented from the back office, and monitoring that holds up through the summer and festival surge."),
            ("We're a very small business — is this affordable?", "Yes. Fit depends on your operating profile, not headcount. Very small teams use our flat-rate Tiny Team plan, and the highest-leverage controls — MFA and EDR — are affordable and stop the bulk of attacks."),
            ("Can you work discreetly with guests and clients on-site?", "Yes. Discretion is standard for us. On-site visits are scheduled around your hours, our engineers are low-profile, and we never discuss client details. It is the same standard we held inside DoD networks."),
        ],
        "cloud_lead": "Pacific Grove runs on small hospitality and professional teams — inns, cafes, retreats, and offices — that need email, booking, and files to work quietly from the front desk, the floor, and home. Microsoft 365 done right gives that without a server to babysit or a setup that breaks on migration day. Ghosxt handles cloud and Microsoft 365 work for PG small business, from a cleared DoD IT engineer, with the discretion the town expects.",
        "cloud_economy": "Inns and B&amp;Bs want booking, email, and guest communication reliable across a small staff. Cafes and restaurants want back-office files and point-of-sale that just work. Professional offices and retreats want secure document sharing without emailing files around. Microsoft 365 covers all of it for a small team — when the tenant is set up and hardened correctly, with guest-facing systems kept separate from the back office.",
        "cloud_card_a": ("Hospitality M365", "Email, booking communication, and back-office files set up properly for an inn, cafe, or retreat, with guest-facing systems kept separate from staff systems."),
        "cloud_card_b": ("Quiet, Reliable Email", "Microsoft 365 email and files configured to simply work for a small PG team, with backups and security baselines built in, so technology stays in the background where it belongs."),
        "cloud_faq": [
            ("Do you provide Microsoft 365 support for Pacific Grove businesses?", "Yes. We set up, harden, and manage Microsoft 365 for PG small businesses — email, Teams, SharePoint, OneDrive, and licensing — with the security baselines most setups skip. On-site in PG and across the Peninsula, remote nationwide."),
            ("Can you migrate our email and files without downtime?", "Yes. We migrate email and shared files to Microsoft 365 with the cutover planned around your schedule, usually over a weekend, so your team does not lose a workday."),
            ("Can you set up secure file sharing for a small office?", "Yes. We build SharePoint and OneDrive with sensible permissions and secure external sharing, so confidential documents are not scattered across inboxes."),
            ("Is Microsoft 365 secure enough for a hospitality business?", "Microsoft 365 is secure when configured correctly. We harden the tenant with phishing-resistant MFA and Conditional Access and keep guest-facing systems separate, so an inn or cafe gets cloud productivity without leaving the door open."),
        ],
    },
    "seaside": {
        "cyber_lead": "Seaside is a working town in transition — military families, growing retail and restaurants, auto and repair shops, and the small businesses that keep daily life on the Peninsula moving. These are exactly the practical, busy businesses that attackers count on having no one watching their systems. Ghosxt brings government-grade cybersecurity, sized and priced for a Seaside small business, from a cleared DoD IT engineer.",
        "cyber_threat1": "Retail and restaurants process card data and run point-of-sale that is a frequent target. Auto and repair shops hold customer records and increasingly run connected diagnostic and scheduling systems. Small offices and nonprofits often have one person handling email and money, so a single phished inbox can move funds. None of these have spare time to watch for intrusions — which is precisely the opening attackers use.",
        "cyber_threat2": "The fix is the same proven set of controls used on government endpoints, sized for a small business: EDR, phishing-resistant MFA, immutable backup, segmented payment networks, and a human watching 24/7. Being based on the Central Coast means on-site help is genuinely local.",
        "cyber_card_a": ("Retail &amp; POS Security", "PCI-aware point-of-sale protection and payment networks segmented from the back office, sized for a Seaside storefront or restaurant, not an enterprise."),
        "cyber_card_b": ("Small-Office Identity", "Phishing-resistant MFA and least-privilege access for lean offices, shops, and nonprofits where one person handles the money — closing the gap attackers exploit most."),
        "cyber_diff": "Seaside businesses that take cards face PCI obligations, and all of them face cyber-insurers who now require MFA, EDR, immutable backup, and email security before they renew. We put those controls in place and document them so the renewal is straightforward. Our <a href=\"blog/cyber-insurance-renewal-checklist-small-business-central-coast.html\">cyber-insurance renewal checklist</a> and <a href=\"blog/protect-small-business-cyberattack-10-essentials-2026.html\">ten security essentials</a> are good starting points.",
        "cyber_faq": [
            ("Do you provide cybersecurity for small businesses in Seaside?", "Yes. Ghosxt provides full cybersecurity for Seaside small businesses: endpoint detection and response, phishing-resistant MFA, identity hardening, immutable backup, PCI-aware point-of-sale security, and 24/7 monitoring. On-site across the Peninsula, remote nationwide."),
            ("Do you secure retail stores and restaurants?", "Yes. We deliver PCI-aware point-of-sale security, segment the payment network from the back office, and add monitoring that catches intrusions early — sized for a single storefront or restaurant."),
            ("We're a small shop or nonprofit — is this affordable?", "Yes. Fit depends on your operating profile, not headcount. Very small teams use our flat-rate Tiny Team plan, and the highest-leverage controls — MFA and EDR — are affordable and stop most attacks."),
            ("How fast can you get on-site to Seaside?", "Same-day or next-day for non-emergencies, and most issues are resolved remotely the same hour. We are based on the Central Coast, so Peninsula on-site response is genuinely local."),
        ],
        "cloud_lead": "Seaside's retail, restaurants, shops, and offices mostly run on ad-hoc email and aging hardware that quietly costs time whenever something fails. Microsoft 365 and a clean cloud setup give a busy Seaside team reliable email, files, and point-of-sale-adjacent systems that just work, without a server to maintain. Ghosxt handles cloud and Microsoft 365 work for Seaside small business, from a cleared DoD IT engineer based on the Central Coast.",
        "cloud_economy": "Retail and restaurants want back-office files and point-of-sale sync that is reliable. Shops want customer records and scheduling reachable from the floor. Small offices and nonprofits want email and documents that work from anywhere without IT overhead. Microsoft 365 delivers a reliable productivity layer for all of them — when it is set up and hardened correctly rather than left at defaults.",
        "cloud_card_a": ("Reliable Back Office", "Email, files, and scheduling on Microsoft 365 that just works for a busy Seaside shop, store, or office, with backups and security built in from day one."),
        "cloud_card_b": ("Off Aging Hardware", "File shares and data moved off the old PC or server everything depends on, into Microsoft 365, so a hardware failure stops being a lost day."),
        "cloud_faq": [
            ("Do you provide Microsoft 365 support for Seaside businesses?", "Yes. We set up, harden, and manage Microsoft 365 for Seaside small businesses — email, Teams, SharePoint, OneDrive, and licensing — with the security baselines most setups skip. On-site across the Peninsula, remote nationwide."),
            ("Can you migrate our email and files without downtime?", "Yes. We migrate email and shared files to Microsoft 365 with the cutover planned around your schedule, usually over a weekend, so your team does not lose a workday."),
            ("Can you move us off our old PC or server?", "Yes. We move the files and data your business depends on off aging hardware into Microsoft 365, with backups built in, so a failure is no longer an emergency."),
            ("Is Microsoft 365 secure enough for a small Seaside business?", "Microsoft 365 is secure when configured correctly. We harden the tenant with phishing-resistant MFA and Conditional Access so a shop, store, or office gets cloud reliability without leaving the door open."),
        ],
    },
    "soledad": {
        "cyber_lead": "Soledad sits in the heart of Salinas Valley wine and produce country — vineyards, growers, food processors, and the small businesses that keep South County running. Most are written off by Bay Area IT shops as too far to serve, which leaves them exposed at exactly the moment ag and food businesses have become ransomware targets. Ghosxt brings government-grade cybersecurity, sized and priced for a Soledad small business, from a cleared DoD IT engineer just up the valley in Salinas.",
        "cyber_threat1": "Food and produce operations now run connected technology end to end — coolers, processing and packing lines, irrigation, and logistics — much of it never designed to be secured, and all of it costly to lose during a harvest window. Wineries run point-of-sale and club and e-commerce systems holding card data. Growers run lean offices that are easy to phish for payment and invoice fraud.",
        "cyber_threat2": "The defenses are the same proven controls used on government endpoints — EDR, hardened identity, immutable backup, and segmentation of operational technology from the office network. The thing South County has lacked is a provider who will actually drive out, and being based in Salinas is exactly what lets us.",
        "cyber_card_a": ("Produce &amp; Cold-Chain OT", "Coolers, packing lines, and irrigation controls segmented from the office network and monitored, so a ransomware hit during harvest does not spoil product or stop shipments."),
        "cyber_card_b": ("Winery POS &amp; Club Data", "PCI-aware protection for tasting-room point-of-sale, wine-club, and e-commerce systems that hold customer and card data, with email hardened against fraud."),
        "cyber_diff": "Ag, wine, and food businesses face cyber-insurers requiring real controls and larger buyers — grocers, distributors, processors — sending security questionnaires before they sign. We put the controls in place that satisfy both and document them. Our <a href=\"blog/cyber-insurance-renewal-checklist-small-business-central-coast.html\">cyber-insurance renewal checklist</a> and <a href=\"agriculture-it-services.html\">agriculture IT</a> page cover what valley operations need.",
        "cyber_faq": [
            ("Do you provide cybersecurity for small businesses in Soledad?", "Yes. Ghosxt provides full cybersecurity for Soledad and the Salinas Valley: endpoint detection and response, phishing-resistant MFA, identity hardening, immutable backup, and 24/7 monitoring. We are based up the valley in Salinas, so on-site response in South County is real."),
            ("Do you actually serve South County?", "Yes. Most providers treat Soledad, Greenfield, and King City as too far. We are based in Salinas and built our model around showing up for the valley businesses other shops skip."),
            ("Can you protect cold-chain and processing systems from ransomware?", "Yes. We deploy EDR and immutable backup, and segment operational technology — coolers, packing lines, irrigation — from the office network so a compromise cannot stop production during harvest."),
            ("Do you secure winery and tasting-room point-of-sale?", "Yes. We deliver PCI-aware protection for tasting-room point-of-sale, wine-club, and e-commerce systems, segment the payment network, and harden email against fraud."),
        ],
        "cloud_lead": "Soledad and the Salinas Valley run on vineyards, growers, and food processors — operations spread across fields, tasting rooms, and packing houses, usually tied to an aging server no Bay Area provider wants to drive out to maintain. Microsoft 365 and the right cloud foundation give a valley business reliable email, files, and remote access from anywhere. Ghosxt handles cloud and Microsoft 365 work for Soledad small business, from a cleared DoD IT engineer based in Salinas.",
        "cloud_economy": "Growers want records and email reachable from the field, not stuck on an office PC. Wineries want club, e-commerce, and tasting-room systems tied into reliable email and files. Processors want compliance and production data backed up and available rather than trapped on one server. Microsoft 365 and a clean cloud migration deliver that reach and resilience — when the environment is built and hardened correctly.",
        "cloud_card_a": ("Field &amp; Tasting-Room Access", "Email, files, and records reachable from the vineyard, the tasting room, and the packing house on secured devices, so a valley operation is not tied to one office PC."),
        "cloud_card_b": ("Off the Aging Server", "Grower, winery, and processor data moved off the old on-prem box into Microsoft 365 and Azure, with backups built in, so a hardware failure is no longer a harvest emergency."),
        "cloud_faq": [
            ("Do you provide Microsoft 365 support for Soledad businesses?", "Yes. We set up, harden, and manage Microsoft 365 for Soledad and Salinas Valley operations — email, Teams, SharePoint, OneDrive, and licensing. On-site from our Salinas base, remote nationwide."),
            ("Do you really serve the Salinas Valley?", "Yes. We are based in Salinas and built our model around serving South County — Soledad, Greenfield, King City — that other providers treat as too far."),
            ("Can you move our operation off an aging on-prem server?", "Yes. We migrate grower, winery, and processor data off old on-prem hardware into Microsoft 365 and Azure, with the cutover planned around harvest and your schedule so you do not lose a workday."),
            ("Is Microsoft 365 secure enough for an ag or winery business?", "Microsoft 365 is secure when configured correctly. We harden the tenant with phishing-resistant MFA and Conditional Access so a grower, winery, or processor gets cloud reach without leaving the door open."),
        ],
    },
}


# Shared service cards reused across pages (service-generic, appropriate everywhere).
CYBER_SHARED_CARDS = [
    ("Endpoint Detection &amp; Response", "Huntress EDR with a 24/7 SOC on every endpoint, layered with Microsoft Defender. Ransomware behavior is detected and isolated before it spreads."),
    ("Immutable Backup", "Backups the production network cannot reach or delete, with monthly tested restores — so a ransomware hit is a bad day, not a closed business. See <a href=\"backup-disaster-recovery.html\">backup &amp; DR</a>."),
    ("24/7 Monitoring &amp; Response", "Tooling plus a human who responds. When something fires at 2 a.m., it is contained — not waiting in a queue. The <a href=\"blog/ai-attack-speed-22-seconds-mdr-smb.html\">speed of modern attacks</a> demands it."),
]

CLOUD_SHARED_CARDS = [
    ("Microsoft 365 Setup &amp; Hardening", "Email, Teams, SharePoint, and OneDrive configured with the security baselines most setups skip — phishing-resistant MFA, Conditional Access, and a healthy Secure Score."),
    ("Email &amp; File Migration", "Move from on-prem Exchange, Google Workspace, or a hosting provider to Microsoft 365 with mailboxes, calendars, and shared files validated before and after. No lost data, no lost workday."),
    ("SharePoint, Teams &amp; OneDrive", "File shares rebuilt as a sane SharePoint and Teams structure with permissions that make sense. See our <a href=\"blog/onedrive-vs-sharepoint-vs-teams-files-small-business.html\">guide to which to use when</a>."),
    ("Cloud Backup &amp; Identity", "Immutable <a href=\"backup-disaster-recovery.html\">backup</a> for Microsoft 365 (which Microsoft does not do for you the way most assume), plus Entra ID and Conditional Access."),
]


def esc(s):
    return s.replace("&", "&amp;").replace("&amp;amp;", "&amp;")


def faq_jsonld(faqs):
    items = []
    for q, a in faqs:
        q_clean = re.sub(r"&amp;", "&", q)
        a_clean = re.sub(r"<[^>]+>", "", a)
        a_clean = re.sub(r"&amp;", "&", a_clean)
        items.append(
            '              {\n'
            '                "@type": "Question",\n'
            f'                "name": {jstr(q_clean)},\n'
            '                "acceptedAnswer": {\n'
            '                  "@type": "Answer",\n'
            f'                  "text": {jstr(a_clean)}\n'
            '                }\n'
            '              }'
        )
    return ",\n".join(items)


def jstr(s):
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


def faq_details(faqs):
    out = []
    for q, a in faqs:
        out.append(
            "          <details>\n"
            f"            <summary>{q}</summary>\n"
            f'            <div class="answer">{a}</div>\n'
            "          </details>"
        )
    return "\n".join(out)


def cards_html(cards):
    out = []
    for h, p in cards:
        out.append(
            "            <article class=\"service-card\">\n"
            f"              <h3>{h}</h3>\n"
            f"              <p>{p}</p>\n"
            "            </article>"
        )
    return "\n".join(out)


def nearby_links(nearby, exclude_slug):
    parts = [f'<a href="{slug}.html">{name}</a>' for slug, name in nearby if slug != exclude_slug]
    if len(parts) > 1:
        return ", ".join(parts[:-1]) + ", and " + parts[-1]
    return parts[0] if parts else ""


def build_page(chrome, service, slug, city):
    name = city["name"]
    admin = city["admin"]
    c = CONTENT[slug]
    nearby = nearby_links(city["nearby"], slug)

    if service == "cybersecurity":
        page_slug = f"cybersecurity-{slug}"
        title = f"Cybersecurity Services in {name}, CA | Ghosxt"
        meta_desc = (
            f"Government-grade cybersecurity for {name}, California small business: "
            "endpoint detection and response, phishing-resistant MFA, identity hardening, "
            "immutable backup, and 24/7 monitoring from a cleared DoD IT engineer. Free assessment."
        )
        og_title = f"Cybersecurity Services in {name}, CA | Ghosxt"
        og_desc = f"Government-grade cybersecurity for {name} small business, from a cleared DoD IT engineer."
        schema_type = "Cybersecurity Services"
        schema_name = f"Cybersecurity Services in {name}"
        schema_desc = (
            f"Government-grade cybersecurity for {name}, California small business: endpoint "
            "detection and response, phishing-resistant MFA, identity hardening, immutable backup, "
            "vulnerability management, and 24/7 monitoring from a cleared DoD IT engineer."
        )
        crumb_parent = ("Cybersecurity", "https://ghosxt.com/cybersecurity.html")
        h1 = f"Cybersecurity Services in {name}, California"
        lead = c["cyber_lead"]
        cards = [
            CYBER_SHARED_CARDS[0],
            ("Identity &amp; MFA", "Phishing-resistant MFA, Conditional Access, and the death of legacy auth — the single highest-leverage control on a small business network. See <a href=\"blog/identity-hardening-small-business-5-employees-microsoft-365.html\">identity hardening</a>."),
            c["cyber_card_a"],
            c["cyber_card_b"],
            CYBER_SHARED_CARDS[1],
            CYBER_SHARED_CARDS[2],
        ]
        faqs = c["cyber_faq"]
        cloud_xlink = f'<a href="cloud-services-{slug}.html">cloud and Microsoft 365</a>' if True else '<a href="cloud-services.html">cloud and Microsoft 365</a>'
        body = f"""      <section class="location-hero">
        <div class="container">
          <nav class="location-breadcrumbs" aria-label="Breadcrumb">
            <a href="index.html">Home</a><span class="sep">›</span><a href="cybersecurity.html">Cybersecurity</a><span class="sep">›</span><span aria-current="page">{name}</span>
          </nav>
          <h1>{h1}</h1>
          <p class="lead">{lead}</p>
          <div class="location-hero-ctas">
            <a href="https://calendly.com/ulises-ghosxt" target="_blank" rel="noopener noreferrer" class="location-btn location-btn-primary">
              <i class="fi fi-rs-calendar-day" aria-hidden="true"></i>
              Book a Free Assessment
            </a>
            <a href="tel:+18312040501" class="location-btn location-btn-secondary">
              <i class="fi fi-rs-phone-call" aria-hidden="true"></i>
              (831) 204-0501
            </a>
          </div>
          <p class="pricing-trust-callout"><a href="pricing.html">Cybersecurity is built into every managed plan — pricing published upfront.</a></p>
        </div>
      </section>

      <section class="location-section">
        <div class="container">
          <h2>The {name} threat picture</h2>
          <p>{c['cyber_threat1']}</p>
          <p>{c['cyber_threat2']}</p>
        </div>
      </section>

      <section class="location-section">
        <div class="container">
          <h2>What we secure</h2>
          <p>The same class of controls used to protect government endpoints, sized down for a {name} small business without being dumbed down.</p>
          <div class="services-grid">
{cards_html(cards)}
          </div>
        </div>
      </section>

      <section class="location-cta">
        <div class="container">
          <h2>Free cybersecurity assessment for your {name} business</h2>
          <p>30 minutes with a cleared engineer. We review your endpoints, identity, Microsoft 365, and backups, and leave you a written, prioritized punch list of what to fix first — whether or not you become a client.</p>
          <a href="https://calendly.com/ulises-ghosxt" target="_blank" rel="noopener noreferrer" class="location-btn location-btn-primary">
            <i class="fi fi-rs-calendar-day" aria-hidden="true"></i>
            Book your free assessment
          </a>
        </div>
      </section>

      <section class="location-section">
        <div class="container">
          <h2>What the controls have to satisfy</h2>
          <p>{c['cyber_diff']}</p>
        </div>
      </section>

      <section class="location-section">
        <div class="container">
          <h2>Local cybersecurity, part of a complete IT program</h2>
          <p>Security works best when the same team also runs the systems it protects. Our {name} cybersecurity sits inside <a href="managed-it-services.html">managed IT</a> — monitoring, patching, <a href="help-desk-it-support.html">help desk</a>, {cloud_xlink}, and backup — so controls are maintained, not installed once and forgotten. For our statewide approach, see the main <a href="cybersecurity.html">cybersecurity services</a> page; for everything local, the <a href="{slug}.html">{name} IT services</a> hub.</p>
          <p>We are based on the Central Coast, so on-site response is genuinely local — same-day or next-day for non-emergencies, immediate remote response for anything critical. We also serve {nearby}.</p>
        </div>
      </section>

      <section class="location-section location-faq">
        <div class="container">
          <h2>FAQs about cybersecurity in {name}</h2>
{faq_details(faqs)}
        </div>
      </section>

      <section class="location-cta">
        <div class="container">
          <h2>Lock down your {name} business</h2>
          <p>Book a 30-minute free assessment, or send us a note. Either way, you walk away knowing exactly where your security stands and what to fix first.</p>
          <a href="https://calendly.com/ulises-ghosxt" target="_blank" rel="noopener noreferrer" class="location-btn location-btn-primary">
            <i class="fi fi-rs-calendar-day" aria-hidden="true"></i>
            Book your free assessment
          </a>
          <a href="contact.html" class="location-btn location-btn-secondary">
            <i class="fi fi-rs-envelope" aria-hidden="true"></i>
            Send a Message
          </a>
        </div>
      </section>"""
    else:  # cloud-services
        page_slug = f"cloud-services-{slug}"
        title = f"Cloud &amp; Microsoft 365 Services in {name}, CA | Ghosxt"
        meta_desc = (
            f"Cloud and Microsoft 365 services for {name}, California businesses: M365 setup and "
            "hardening, no-downtime email and file migrations, SharePoint and Teams, and Azure. "
            "DoD-cleared engineer. Free assessment."
        )
        og_title = f"Cloud &amp; Microsoft 365 Services in {name}, CA | Ghosxt"
        og_desc = f"Microsoft 365 and cloud services for {name} small business: hardened tenants, no-downtime migrations, SharePoint, Teams, and Azure."
        schema_type = "Cloud and Microsoft 365 Services"
        schema_name = f"Cloud & Microsoft 365 Services in {name}"
        schema_desc = (
            f"Cloud and Microsoft 365 services for {name}, California small business: Microsoft 365 "
            "setup and tenant hardening, no-downtime email and file migrations, SharePoint, Teams, and "
            "OneDrive, and Azure and hybrid environments, from a cleared DoD IT engineer."
        )
        crumb_parent = ("Cloud Services", "https://ghosxt.com/cloud-services.html")
        h1 = f"Cloud &amp; Microsoft 365 Services in {name}, California"
        lead = c["cloud_lead"]
        cards = [
            CLOUD_SHARED_CARDS[0],
            CLOUD_SHARED_CARDS[1],
            CLOUD_SHARED_CARDS[2],
            c["cloud_card_a"],
            c["cloud_card_b"],
            ("Azure &amp; Hybrid", "Azure where it earns its place — a line-of-business app, secure remote access, or hybrid identity — and not where it does not."),
            CLOUD_SHARED_CARDS[3],
        ]
        faqs = c["cloud_faq"]
        body = f"""      <section class="location-hero">
        <div class="container">
          <nav class="location-breadcrumbs" aria-label="Breadcrumb">
            <a href="index.html">Home</a><span class="sep">›</span><a href="cloud-services.html">Cloud Services</a><span class="sep">›</span><span aria-current="page">{name}</span>
          </nav>
          <h1>{h1}</h1>
          <p class="lead">{lead}</p>
          <div class="location-hero-ctas">
            <a href="https://calendly.com/ulises-ghosxt" target="_blank" rel="noopener noreferrer" class="location-btn location-btn-primary">
              <i class="fi fi-rs-calendar-day" aria-hidden="true"></i>
              Book a Free Assessment
            </a>
            <a href="tel:+18312040501" class="location-btn location-btn-secondary">
              <i class="fi fi-rs-phone-call" aria-hidden="true"></i>
              (831) 204-0501
            </a>
          </div>
          <p class="pricing-trust-callout"><a href="pricing.html">Cloud and Microsoft 365 management is part of every managed plan — pricing published upfront.</a></p>
        </div>
      </section>

      <section class="location-section">
        <div class="container">
          <h2>What we do in the cloud</h2>
          <p>Microsoft 365 and Azure, set up and secured the way they should have been from day one.</p>
          <div class="services-grid">
{cards_html(cards)}
          </div>
        </div>
      </section>

      <section class="location-section">
        <div class="container">
          <h2>Microsoft 365 for the {name} economy</h2>
          <p>{c['cloud_economy']}</p>
          <p>The common thread is that Microsoft 365 is powerful but insecure by default. The value is in the configuration — the part most setups skip and the part we get right.</p>
        </div>
      </section>

      <section class="location-cta">
        <div class="container">
          <h2>Free cloud &amp; Microsoft 365 assessment for your {name} business</h2>
          <p>30 minutes with a cleared engineer. We review your tenant, email, files, and security posture, and leave you a written migration and hardening plan, whether or not you become a client.</p>
          <a href="https://calendly.com/ulises-ghosxt" target="_blank" rel="noopener noreferrer" class="location-btn location-btn-primary">
            <i class="fi fi-rs-calendar-day" aria-hidden="true"></i>
            Book your free assessment
          </a>
        </div>
      </section>

      <section class="location-section">
        <div class="container">
          <h2>Migrations without losing a workday</h2>
          <p>The reason businesses put off a cloud move is fear of the cutover — the weekend where email breaks and Monday is chaos. We plan around that. Mailboxes and files are pre-staged and synced, the cutover happens on your schedule, and we validate everything before your team logs in Monday morning. Permissions, shared mailboxes, calendar sharing, and line-of-business integrations are tested, not assumed.</p>
          <p>Because the same team manages the environment afterward, there is no handoff to a stranger — the engineer who moved you is the one who answers when you have a question. The cloud work sits inside <a href="managed-it-services.html">managed IT</a> and a real <a href="help-desk-it-support.html">help desk</a>.</p>
        </div>
      </section>

      <section class="location-section">
        <div class="container">
          <h2>Local cloud support, part of a complete IT program</h2>
          <p>The cloud and Microsoft 365 program is part of our complete <a href="{slug}.html">{name} IT services</a>, alongside <a href="cybersecurity-{slug}.html">cybersecurity</a> and a real <a href="help-desk-it-support.html">help desk</a>. We are based on the Central Coast, so on-site work is genuinely local, with the same remote management nationwide.</p>
          <p>We also serve {nearby}. For the statewide picture of our cloud work, see the main <a href="cloud-services.html">cloud services</a> page.</p>
        </div>
      </section>

      <section class="location-section location-faq">
        <div class="container">
          <h2>FAQs about cloud and Microsoft 365 in {name}</h2>
{faq_details(faqs)}
        </div>
      </section>

      <section class="location-cta">
        <div class="container">
          <h2>Move your {name} business to the cloud, the right way</h2>
          <p>Book a 30-minute free assessment, or send us a note. Either way, you walk away with a clear read on what to move, what to keep, and how to get there without downtime.</p>
          <a href="https://calendly.com/ulises-ghosxt" target="_blank" rel="noopener noreferrer" class="location-btn location-btn-primary">
            <i class="fi fi-rs-calendar-day" aria-hidden="true"></i>
            Book your free assessment
          </a>
          <a href="contact.html" class="location-btn location-btn-secondary">
            <i class="fi fi-rs-envelope" aria-hidden="true"></i>
            Send a Message
          </a>
        </div>
      </section>"""

    url = f"https://ghosxt.com/{page_slug}.html"
    og_image = f"https://ghosxt.com/assets/img/og/{page_slug}.png"

    jsonld = f"""    <script type="application/ld+json">
      {{
        "@context": "https://schema.org",
        "@graph": [
          {{
            "@type": "Service",
            "@id": "{url}#service",
            "serviceType": "{schema_type}",
            "name": "{schema_name}",
            "url": "{url}",
            "description": {jstr(schema_desc)},
            "provider": {{ "@type": "Organization", "name": "Ghosxt", "url": "https://ghosxt.com/" }},
            "areaServed": {{ "@type": "City", "name": "{name}", "containedInPlace": {{ "@type": "AdministrativeArea", "name": "{admin}" }} }}
          }},
          {{
            "@type": "BreadcrumbList",
            "itemListElement": [
              {{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ghosxt.com/" }},
              {{ "@type": "ListItem", "position": 2, "name": "{crumb_parent[0]}", "item": "{crumb_parent[1]}" }},
              {{ "@type": "ListItem", "position": 3, "name": "{name}", "item": "{url}" }}
            ]
          }},
          {{
            "@type": "FAQPage",
            "mainEntity": [
{faq_jsonld(faqs)}
            ]
          }}
        ]
      }}
    </script>"""

    head_top = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content="{meta_desc}" />
    <link rel="canonical" href="{url}" />
    <link rel="alternate" type="application/rss+xml" title="Ghosxt Blog" href="https://ghosxt.com/feed.xml" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{url}" />
    <meta property="og:title" content="{og_title}" />
    <meta property="og:description" content="{og_desc}" />
    <meta property="og:image" content="{og_image}" />
    <meta property="og:site_name" content="Ghosxt" />
    <meta name="robots" content="index, follow" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{og_title}" />
    <meta name="twitter:description" content="{og_desc}" />
{chrome['head_assets']}
{jsonld}
{chrome['cf_analytics']}
  </head>
  <body>
{chrome['body_top']}
{chrome['nav']}

    <main id="main-content">
{body}
    </main>

{chrome['footer']}
"""
    return page_slug, head_top


def main():
    force = "--force" in sys.argv
    cyber_chrome = extract_chrome(CYBER_TEMPLATE)
    cloud_chrome = extract_chrome(CLOUD_TEMPLATE)

    written = []
    skipped = []
    for slug, city in CITIES.items():
        for service, chrome in (("cybersecurity", cyber_chrome), ("cloud-services", cloud_chrome)):
            page_slug, html = build_page(chrome, service, slug, city)
            path = os.path.join(ROOT, f"{page_slug}.html")
            if os.path.exists(path) and not force:
                skipped.append(page_slug)
                continue
            with open(path, "w", encoding="utf-8") as f:
                f.write(html)
            written.append(page_slug)

    print(f"Wrote {len(written)} pages:")
    for p in written:
        print(f"  + {p}.html")
    if skipped:
        print(f"Skipped {len(skipped)} existing (use --force to overwrite): {', '.join(skipped)}")


if __name__ == "__main__":
    main()
