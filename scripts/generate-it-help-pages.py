#!/usr/bin/env python3
"""Generate "IT help / IT support" city landing pages (it-help-<city>.html).

These target the "IT support / IT help / help desk in <city>" intent for the
major towns in the service area that do NOT already have a city hub page, so
they expand geographic coverage without cannibalizing the existing city pages
(salinas.html, monterey.html, etc.) or the existing county pages.

Shared chrome (head assets, cookie banner, nav, footer) is sliced verbatim from
an existing, hand-tuned location page so generated pages stay byte-identical to
the rest of the site. Only the localized regions — title/meta/OG, JSON-LD, hero,
body sections, and FAQs — are templated from the per-city data model below. Each
city has genuinely distinct prose so the pages read as local pages, not a
find-and-replace, which is what keeps them out of duplicate-content filtering.

Run from the repo root:

    python3 scripts/generate-it-help-pages.py            # only writes new pages
    python3 scripts/generate-it-help-pages.py --force    # overwrite existing

After running, regenerate the sitemap and OG images:

    python3 scripts/generate-sitemap.py
    python3 scripts/generate-og-images.py
"""

import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHROME_TEMPLATE = os.path.join(ROOT, "cybersecurity-monterey.html")


def slice_between(text, start_marker, end_marker, include_start=True, include_end=False):
    s = text.index(start_marker)
    e = text.index(end_marker, s + len(start_marker))
    if not include_start:
        s += len(start_marker)
    if include_end:
        e += len(end_marker)
    return text[s:e]


def extract_chrome(path):
    """Pull the byte-identical shared blocks out of an existing location page."""
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
# Per-city data model. Each city is genuinely differentiated by its economy and
# character so the generated pages are local, not boilerplate.
#   admin  : the AdministrativeArea used in JSON-LD + on-page copy
#   county : (slug, label) of the existing county page to link up to
#   nearby : existing city pages to cross-link to (builds links into the hubs)
# ---------------------------------------------------------------------------

CITIES = {
    "morgan-hill": {
        "name": "Morgan Hill",
        "admin": "Santa Clara County, California",
        "county": ("santa-clara-county", "Santa Clara County"),
        "nearby": [("gilroy", "Gilroy"), ("san-jose", "San Jose"), ("hollister", "Hollister"), ("watsonville", "Watsonville")],
        "lead": "Morgan Hill sits at the quiet end of Silicon Valley &mdash; close enough to the Bay Area's prices, far enough that the big-name IT firms treat a drive down 101 as an imposition. The result is a town full of professional offices, small manufacturers, wineries, and growing companies that get treated as an afterthought by their provider. Ghosxt is the opposite: a live help desk that answers, on-site response that actually shows up, and a cleared DoD IT engineer who treats a Morgan Hill ten-person office like it matters &mdash; because it does.",
        "economy": "Morgan Hill's economy is a mix that demands responsive support: dental and medical practices that cannot see patients when the system is down, law and accounting offices on deadline, light manufacturers and machine shops running job and design software, and wineries and tasting rooms taking payments seven days a week. What they share is a low tolerance for being on hold. When email stops or a workstation dies, they need a person, not a ticket number and a 48-hour window.",
        "response": "Based on the Central Coast with a footprint up the 101 corridor, we cover Morgan Hill with same-day or next-day on-site visits for non-emergencies and immediate remote response for anything urgent. Most issues never need a truck roll &mdash; they are fixed remotely within the hour &mdash; but when hands-on work is required, you are not waiting for someone to find time between Bay Area accounts.",
        "card_a": ("Practice &amp; Office Uptime", "Dental, medical, and professional offices in Morgan Hill kept running &mdash; fast help-desk response so a frozen workstation or down server does not turn into a day of canceled appointments."),
        "card_b": ("Shop &amp; Winery Support", "End-user support for the job software, point-of-sale, and tasting-room systems Morgan Hill's manufacturers and wineries run on, with someone who picks up when it breaks."),
        "faqs": [
            ("Do you provide IT support and help desk for Morgan Hill businesses?", "Yes. Ghosxt provides a live, US-based help desk and on-site IT support for Morgan Hill small and midsize businesses: day-to-day end-user support, Microsoft 365, monitoring and patching, and a cleared engineer for anything complex. We cover the 101 corridor on-site and support businesses remotely nationwide."),
            ("How fast do you respond when something breaks?", "Most issues are resolved remotely within the hour, because we monitor and answer in real time rather than parking tickets in a queue. When a problem needs hands on the hardware, on-site response in Morgan Hill is typically same-day or next-day for non-emergencies."),
            ("We're tired of being a low priority for a Bay Area IT firm. Are you different?", "That is exactly who we built for. We do not have enterprise accounts that come first, so a Morgan Hill office of ten people is a real client, gets a named engineer, and is not left on hold while someone services a larger account up north."),
            ("Do we have to switch everything at once, or can you just be our help desk?", "We can start as your responsive help desk and grow from there. Many clients begin with day-to-day support and add monitoring, security, and Microsoft 365 management as they see how it works. Pricing is published upfront so there are no surprises."),
        ],
    },
    "capitola": {
        "name": "Capitola",
        "admin": "Santa Cruz County, California",
        "county": ("santa-cruz-county", "Santa Cruz County"),
        "nearby": [("santa-cruz", "Santa Cruz"), ("watsonville", "Watsonville")],
        "lead": "Capitola runs on foot traffic &mdash; the Village boutiques, the beachfront restaurants, the salons and surf shops, and the small professional offices tucked behind them. For all of them, a down point-of-sale terminal or a dead Wi-Fi network on a busy Saturday is not an inconvenience, it is lost revenue that does not come back. Ghosxt gives Capitola's small businesses a help desk that answers fast and an engineer who understands that in a beach town, downtime has a season.",
        "economy": "Capitola's businesses are small, seasonal, and customer-facing: restaurants and cafes processing cards all day, Village retail and boutiques that live and die by the register, salons and studios running booking software, and the accountants, realtors, and therapists who serve the community. Their IT needs are not complicated, but they are urgent &mdash; when the card reader freezes during the lunch rush or the guest Wi-Fi drops, they need help in minutes, not a callback tomorrow.",
        "response": "We are based on the Central Coast and cover Capitola and the greater Santa Cruz area with genuinely local on-site response &mdash; same-day or next-day for non-emergencies &mdash; and most issues handled remotely within the hour. During the summer and holiday surge, when a busy weekend is the whole month's margin, that responsiveness is the entire point.",
        "card_a": ("Point-of-Sale &amp; Wi-Fi That Stays Up", "Fast support for the card terminals, registers, and guest Wi-Fi Capitola's restaurants and Village shops depend on &mdash; so a busy Saturday is not derailed by a frozen screen."),
        "card_b": ("Small-Team Microsoft 365 &amp; Email", "Email, booking systems, and everyday support for Capitola's salons, studios, and professional offices, handled by a person who answers &mdash; no in-house IT required."),
        "faqs": [
            ("Do you provide IT support for small businesses in Capitola?", "Yes. Ghosxt provides a live help desk and on-site IT support for Capitola's restaurants, retail, salons, and professional offices: point-of-sale and Wi-Fi support, Microsoft 365, email, monitoring, and security. We are local to the Santa Cruz area, so on-site help is a short drive."),
            ("Our POS or Wi-Fi goes down on busy days. Can you help fast?", "Yes, and that is the priority. We respond in real time, so most register, terminal, and Wi-Fi issues are fixed remotely within minutes. When it needs an on-site visit, we get to Capitola same-day or next-day, and we can harden the setup so it stops happening."),
            ("We're a tiny business with no IT person. Is that a problem?", "Not at all &mdash; that is most of who we help in Capitola. You get a help desk to call when something breaks and proactive monitoring so less breaks in the first place, with flat, published pricing sized for a small team, including our Tiny Team plan."),
            ("Can you keep our customer payment data secure?", "Yes. We deliver PCI-aware point-of-sale support, keep the payment network separate from public guest Wi-Fi, and add the backups and security that protect both your business and your customers, without slowing down the front counter."),
        ],
    },
    "scotts-valley": {
        "name": "Scotts Valley",
        "admin": "Santa Cruz County, California",
        "county": ("santa-cruz-county", "Santa Cruz County"),
        "nearby": [("santa-cruz", "Santa Cruz"), ("watsonville", "Watsonville"), ("san-jose", "San Jose")],
        "lead": "Scotts Valley has a different character than the rest of the county &mdash; a cluster of technology firms, light manufacturers, and professional offices in the hills above Santa Cruz, many run by people who know enough about IT to know they should not be the ones doing it. Ghosxt gives them a help desk and a cleared engineer who can keep up with a technical team, handle the day-to-day, and free the owner from being the accidental IT department.",
        "economy": "Scotts Valley's businesses skew technical and professional: software and hardware companies, engineering and design firms, manufacturers, and the medical and professional offices that serve the area. Their staff are capable, which means the tickets that reach IT are the real ones &mdash; a misbehaving server, an identity or Microsoft 365 problem, a security question, a new-hire setup that needs to be right. They need a provider who responds quickly and actually understands the environment, not a script-reading call center.",
        "response": "Based on the Central Coast and covering the Santa Cruz area and the Highway 17 corridor, we provide Scotts Valley businesses with same-day or next-day on-site response for non-emergencies and immediate remote support for anything urgent &mdash; with most issues resolved remotely the same hour by an engineer who can speak to a technical team as a peer.",
        "card_a": ("Support for Technical Teams", "A help desk that does not waste a capable team's time &mdash; fast escalation to a cleared engineer for the server, identity, and Microsoft 365 issues that actually need expertise."),
        "card_b": ("Free the Accidental IT Owner", "Hand off the new-hire setups, password resets, patching, and 'why is this broken' tickets that have been falling on the owner or office manager, to a team that owns them."),
        "faqs": [
            ("Do you provide IT support and help desk for Scotts Valley businesses?", "Yes. Ghosxt provides a live, US-based help desk and on-site IT support for Scotts Valley's tech firms, manufacturers, and professional offices: end-user support, Microsoft 365, monitoring and patching, identity, and a cleared engineer for complex work. Local on-site, remote nationwide."),
            ("Our team is technical. We need real support, not a call center. Is that you?", "Yes. Our help desk escalates quickly to a cleared engineer instead of reading from a script, so a capable Scotts Valley team is not stuck explaining their environment to someone who does not understand it. You get peers, not gatekeepers."),
            ("Can you take IT off the owner's plate?", "That is one of the most common reasons Scotts Valley businesses call us. We take over the new-hire setups, patching, password resets, and day-to-day tickets that have quietly become the owner's second job, with monitoring so fewer things break to begin with."),
            ("How fast is on-site response to Scotts Valley?", "Most issues are solved remotely within the hour. When something needs hands-on work, on-site response is typically same-day or next-day for non-emergencies &mdash; we cover the Santa Cruz area and the Highway 17 corridor directly."),
        ],
    },
    "aptos": {
        "name": "Aptos",
        "admin": "Santa Cruz County, California",
        "county": ("santa-cruz-county", "Santa Cruz County"),
        "nearby": [("santa-cruz", "Santa Cruz"), ("watsonville", "Watsonville")],
        "lead": "Aptos is small-business country in the best sense &mdash; professional offices around Cabrillo College, real estate and law practices, medical and dental offices, restaurants and inns along the coast, and the trades and services that keep the community running. None of them are big enough to want an IT department, and all of them need IT that just works. Ghosxt is the local help desk and on-site engineer that fills that gap.",
        "economy": "The Aptos economy is built on small professional and service businesses: realtors and attorneys handling sensitive client documents, dental and medical practices on tight appointment schedules, accountants on deadline, and hospitality along the coast. Their IT is supposed to be invisible &mdash; until a workstation freezes, email stops, or a file will not open, and suddenly the whole day stalls. What they need is someone to call who fixes it fast and quietly keeps it from happening again.",
        "response": "We are based on the Central Coast and cover Aptos and the greater Santa Cruz area with local on-site response &mdash; same-day or next-day for non-emergencies &mdash; and most problems handled remotely within the hour. For a small office where everyone wears several hats, having a help desk that simply answers is the difference between a five-minute interruption and a lost afternoon.",
        "card_a": ("Practice &amp; Office Support", "Dental, medical, legal, and accounting offices in Aptos kept running &mdash; fast help-desk response and the document security these practices are obligated to maintain."),
        "card_b": ("No-IT-Department Coverage", "A complete help desk for businesses too small to hire IT &mdash; support when something breaks, monitoring so less does, and Microsoft 365 and email managed for you."),
        "faqs": [
            ("Do you provide IT support for small businesses in Aptos?", "Yes. Ghosxt provides a live help desk and on-site IT support for Aptos's professional offices, practices, and service businesses: day-to-day support, Microsoft 365, email, monitoring, patching, and security. We are local to the Santa Cruz area, so on-site help is a short drive."),
            ("We don't have anyone in-house for IT. Can you be that for us?", "Yes &mdash; that is exactly what we do for most Aptos clients. You get a help desk to call when something breaks and proactive monitoring so fewer things break, without the cost of a full-time hire. Pricing is published upfront."),
            ("Can you handle the compliance side for a medical or dental office?", "Yes. We support HIPAA-minded dental and medical practices in Aptos with the access controls, backups, and documentation those obligations require, alongside the everyday help desk that keeps appointments on schedule."),
            ("How quickly can you respond?", "Most issues are resolved remotely within the hour, because we answer in real time rather than queuing tickets. When something needs an on-site visit, response in Aptos is typically same-day or next-day for non-emergencies."),
        ],
    },
    "castroville": {
        "name": "Castroville",
        "admin": "Monterey County, California",
        "county": ("monterey-county", "Monterey County"),
        "nearby": [("salinas", "Salinas"), ("marina", "Marina"), ("monterey", "Monterey"), ("watsonville", "Watsonville")],
        "lead": "Castroville is the Artichoke Center of the World, and behind that title is a working economy of growers, coolers, processors, and the trucking and small businesses that move product out of north Monterey County. It is the kind of town big IT firms drive past on the way to the Peninsula. Ghosxt does not drive past &mdash; we are based up the road in Salinas and bring Castroville's ag and small businesses a real help desk and on-site support.",
        "economy": "Castroville runs on agriculture and the businesses around it: growers and shippers with lean back offices, cooling and processing operations with equipment that cannot stop, trucking and logistics on tight schedules, and the family-run shops and services in town. Their IT problems are practical &mdash; an office PC that died mid-invoice, email that stopped, a scale or label system that will not talk to the network &mdash; and they need someone nearby who answers and shows up, not a ticket lost in a Bay Area queue.",
        "response": "We are based in Salinas, a short drive from Castroville, so on-site response across north county is genuinely local &mdash; same-day or next-day for non-emergencies &mdash; with most issues solved remotely within the hour. For an operation running on a harvest schedule, a provider who is actually close by is worth more than one who looks good on paper and is two hours away.",
        "card_a": ("Ag Back-Office Support", "Fast help-desk support for the invoicing, scheduling, and email that keep a Castroville grower, cooler, or shipper running &mdash; handled by someone a short drive away."),
        "card_b": ("On-Site When It Counts", "Real on-site response across north Monterey County for the PC, network, and connected-equipment problems that cannot be fixed over the phone &mdash; no waiting half a day for a truck from the Bay."),
        "faqs": [
            ("Do you provide IT support for businesses in Castroville?", "Yes. Ghosxt provides a live help desk and on-site IT support for Castroville's growers, processors, trucking operations, and local businesses: day-to-day support, Microsoft 365, email, monitoring, and security. We are based in nearby Salinas, so on-site help is genuinely local."),
            ("Most IT companies won't drive out here. Will you?", "Yes. We are based in Salinas, minutes from Castroville, and built our business around serving the north-county and valley operations other providers treat as too far. On-site response is a short drive, not a half-day trip from the Bay Area."),
            ("Can you support our cooler, scale, or processing equipment?", "We support the networks and systems that connect them and segment that equipment safely from the office network. For the equipment itself we coordinate with your vendor, so you have one number to call when something on the floor stops talking to the network."),
            ("How fast can you respond during harvest?", "Most issues are handled remotely within the hour, and on-site response is same-day or next-day for non-emergencies. We plan around your season, because we know a stopped system during harvest costs real money."),
        ],
    },
    "greenfield": {
        "name": "Greenfield",
        "admin": "Monterey County, California",
        "county": ("monterey-county", "Monterey County"),
        "nearby": [("soledad", "Soledad"), ("king-city", "King City"), ("salinas", "Salinas")],
        "lead": "Greenfield sits deep in the southern Salinas Valley, surrounded by vineyards, row crops, and the growers and processors who work them. It is exactly the kind of place most IT providers write off as too far to serve, which leaves real businesses limping along with no support at all. Ghosxt is based up the valley in Salinas and refuses to write off South County: a real help desk and on-site engineer for Greenfield's businesses.",
        "economy": "Greenfield's economy is agriculture end to end: vineyards and wineries, vegetable growers, packing and processing, and the lean offices that run them, plus the local shops and services in town. These businesses often run on aging hardware and whatever setup a relative configured years ago, with no one to call when it breaks. What they need is straightforward and overdue &mdash; a responsive help desk, reliable backups, and an engineer who will actually drive out.",
        "response": "We are based in Salinas, up the valley from Greenfield, and built our model around serving South County &mdash; Greenfield, Soledad, King City &mdash; directly. On-site response is real, not theoretical: same-day or next-day for non-emergencies, with most issues solved remotely within the hour. The point is that someone finally answers.",
        "card_a": ("South County, Actually Served", "A help desk and on-site engineer for Greenfield growers, wineries, and shops that other providers treat as too far &mdash; based up the valley in Salinas, not the Bay Area."),
        "card_b": ("Off the Fragile Setup", "Reliable email, backups, and day-to-day support to replace the aging hardware and nobody-to-call arrangement most Greenfield businesses have been stuck with."),
        "faqs": [
            ("Do you provide IT support for businesses in Greenfield?", "Yes. Ghosxt provides a live help desk and on-site IT support for Greenfield's growers, wineries, processors, and local businesses: everyday support, Microsoft 365, email, backups, monitoring, and security. We are based up the valley in Salinas, so South County on-site response is real."),
            ("Does anyone actually provide IT support this far south?", "We do. Most providers treat Greenfield, Soledad, and King City as too far to bother with. We are based in Salinas and built our business around showing up for the southern Salinas Valley operations everyone else skips."),
            ("Our setup is old and nobody manages it. Where do we start?", "Start with a free assessment. We will document what you have, tell you plainly what is at risk, and prioritize the fixes &mdash; usually reliable backups, email, and a help desk to call first. No obligation, and pricing is published upfront."),
            ("How fast can you respond out here?", "Most issues are resolved remotely within the hour. When on-site work is needed, response in Greenfield is same-day or next-day for non-emergencies, planned around your harvest and operating schedule."),
        ],
    },
    "gonzales": {
        "name": "Gonzales",
        "admin": "Monterey County, California",
        "county": ("monterey-county", "Monterey County"),
        "nearby": [("soledad", "Soledad"), ("salinas", "Salinas"), ("king-city", "King City")],
        "lead": "Gonzales is a small Salinas Valley city that punches above its weight &mdash; anchored by agriculture, food and beverage processing, and distribution operations that ship product well beyond the county. Those operations run on systems that cannot afford to stop, in a town most Bay Area IT firms consider out of range. Ghosxt is based up the valley in Salinas and gives Gonzales businesses a help desk and on-site support that is genuinely local.",
        "economy": "Gonzales blends large-scale food and beverage processing and distribution with the growers, trucking, and small businesses around them. The processors and distributors run line-of-business systems, scheduling, and connected equipment where downtime is expensive; the smaller offices need reliable email and a help desk to call. Both have the same complaint about IT in South County: when something breaks, no one nearby answers. That is the gap we close.",
        "response": "Based in Salinas, just up the valley, we cover Gonzales with same-day or next-day on-site response for non-emergencies and immediate remote support &mdash; most issues fixed remotely within the hour. For a processor or distributor running on a schedule, having an engineer who is a short drive away rather than two hours up the 101 is the whole difference.",
        "card_a": ("Processing &amp; Distribution Uptime", "Responsive support for the scheduling, line-of-business, and network systems Gonzales processors and distributors run on &mdash; so a glitch is a quick call, not a stopped line."),
        "card_b": ("Local Help Desk", "A live help desk and on-site engineer based up the valley in Salinas, for the growers, offices, and shops in Gonzales that have had no one to call."),
        "faqs": [
            ("Do you provide IT support for businesses in Gonzales?", "Yes. Ghosxt provides a live help desk and on-site IT support for Gonzales's processors, distributors, growers, and local businesses: day-to-day support, Microsoft 365, monitoring, backups, and security. We are based up the valley in Salinas, so on-site response is genuinely local."),
            ("We run processing and distribution systems that can't go down. Can you support that?", "Yes. We keep the networks, scheduling, and line-of-business systems behind those operations monitored and supported, segment connected equipment safely, and respond fast when something breaks. For the equipment itself we coordinate with your vendor so you have one number to call."),
            ("Is anyone actually based close enough to help?", "We are. Salinas is a short drive from Gonzales, and we built our model around serving the Salinas Valley directly instead of treating it as too far. On-site help is local, not a half-day trip."),
            ("How does pricing work?", "Pricing is published upfront: flat per-user managed plans, with a Tiny Team option for the smallest offices. Start with a free assessment for a written plan and a real number, whether or not you become a client."),
        ],
    },
    "san-juan-bautista": {
        "name": "San Juan Bautista",
        "admin": "San Benito County, California",
        "county": ("san-benito-county", "San Benito County"),
        "nearby": [("hollister", "Hollister"), ("salinas", "Salinas"), ("gilroy", "Gilroy")],
        "lead": "San Juan Bautista is a small historic town that runs on tourism and character &mdash; the mission, the restaurants and tasting rooms, the antique shops and galleries, and the small offices and growers in the surrounding hills. Its businesses are tiny, customer-facing, and the last thing they want is to fight with technology while visitors are at the counter. Ghosxt gives them a help desk that answers and an engineer nearby in Hollister and Salinas.",
        "economy": "San Juan Bautista's economy is hospitality and small retail: restaurants and wine tasting rooms taking cards, shops and galleries running point-of-sale, inns serving visitors, and the small professional offices and growers around town. Their IT needs are modest but time-sensitive &mdash; a frozen register or dropped Wi-Fi on a busy tourist weekend is lost business &mdash; so what matters is fast, friendly support and a setup that quietly stays up.",
        "response": "We are based on the Central Coast with a footprint in nearby Hollister and Salinas, so San Juan Bautista gets genuinely local coverage &mdash; same-day or next-day on-site for non-emergencies, with most issues fixed remotely within the hour. In a town where a single busy weekend matters, that responsiveness is the point.",
        "card_a": ("Tasting Room &amp; Shop Support", "Fast support for the point-of-sale, Wi-Fi, and booking systems San Juan Bautista's restaurants, tasting rooms, and shops depend on through every tourist weekend."),
        "card_b": ("Small &amp; Historic-Town Friendly", "A patient, plain-English help desk for tiny businesses with no IT person &mdash; quick fixes, reliable email, and a setup that stays out of the way of your guests."),
        "faqs": [
            ("Do you provide IT support for businesses in San Juan Bautista?", "Yes. Ghosxt provides a live help desk and on-site IT support for San Juan Bautista's restaurants, tasting rooms, shops, and small offices: point-of-sale and Wi-Fi support, Microsoft 365, email, monitoring, and security. We are nearby in Hollister and Salinas, so on-site help is a short drive."),
            ("Our register or Wi-Fi fails on busy weekends. Can you fix that fast?", "Yes, and that is the priority. We respond in real time, so most point-of-sale and Wi-Fi issues are resolved remotely within minutes, and we can harden the setup so it stops happening. On-site response is same-day or next-day when hands-on work is needed."),
            ("We're a very small business with no IT help. Is that okay?", "That is most of who we serve here. You get a friendly help desk to call and proactive monitoring so less breaks, with flat, published pricing sized for a small team, including our Tiny Team plan."),
            ("Can you keep our customer card payments secure?", "Yes. We provide PCI-aware point-of-sale support, separate the payment network from public guest Wi-Fi, and add the backups and security that protect your business and your customers, without slowing the front counter."),
        ],
    },
    "carmel-valley": {
        "name": "Carmel Valley",
        "admin": "Monterey County, California",
        "county": ("monterey-county", "Monterey County"),
        "nearby": [("carmel", "Carmel"), ("monterey", "Monterey"), ("salinas", "Salinas")],
        "lead": "Carmel Valley is wine country with a quiet, high-end clientele &mdash; tasting rooms and vineyards, resorts and spas, real estate and the professional offices that serve affluent residents. Like Carmel itself, it trades on discretion and reputation, which makes both downtime and a data breach expensive in ways that go beyond the bill. Ghosxt brings Carmel Valley businesses a responsive help desk and on-site engineer who works quietly and keeps things running.",
        "economy": "Carmel Valley's economy centers on hospitality and high-value services: wineries and tasting rooms taking payments and running wine clubs, resorts and spas with booking and guest systems, and real estate, legal, and financial offices handling significant transactions. These businesses need support that is both fast and discreet &mdash; when a tasting-room register freezes during a busy afternoon or a real estate office cannot reach its files, they need a quiet, capable response, not a disruption in front of guests.",
        "response": "We are based on the Central Coast and cover Carmel Valley with same-day or next-day on-site response for non-emergencies and immediate remote support, with most issues resolved remotely within the hour. On-site visits are scheduled around your guests and clients and handled low-profile &mdash; the same discretion we hold across Carmel and the Peninsula.",
        "card_a": ("Winery &amp; Tasting-Room Support", "Fast, quiet support for the point-of-sale, wine-club, and booking systems Carmel Valley's wineries and resorts run on &mdash; kept up through every busy weekend."),
        "card_b": ("Discreet Office Support", "Responsive help desk and on-site support for real estate, legal, and financial offices, with the wire-fraud and document protections high-value transactions demand."),
        "faqs": [
            ("Do you provide IT support for businesses in Carmel Valley?", "Yes. Ghosxt provides a live help desk and on-site IT support for Carmel Valley's wineries, resorts, and professional offices: day-to-day support, point-of-sale and booking systems, Microsoft 365, email, monitoring, and security. We cover the Peninsula on-site and work discreetly."),
            ("Can you work discreetly with guests and clients present?", "Yes. Discretion is standard for us. On-site visits are scheduled around your hours, our engineers are professional and low-profile, and we never discuss client details &mdash; the same standard we held inside DoD networks."),
            ("Can you protect a real estate or financial office from wire fraud?", "Yes. We harden email with enforced multi-factor authentication and anti-spoofing, add impersonation and banking-change alerts, and train staff to verify wire details, because most wire fraud starts with a compromised inbox."),
            ("How fast do you respond?", "Most issues are resolved remotely within the hour. When on-site work is needed, response in Carmel Valley is typically same-day or next-day for non-emergencies, scheduled around your guests and clients."),
        ],
    },
    "prunedale": {
        "name": "Prunedale",
        "admin": "Monterey County, California",
        "county": ("monterey-county", "Monterey County"),
        "nearby": [("salinas", "Salinas"), ("marina", "Marina"), ("monterey", "Monterey"), ("watsonville", "Watsonville")],
        "lead": "Prunedale is North Monterey County's crossroads &mdash; a spread-out community along Highway 101 of trades, contractors, small retail, growers, and family businesses that serve the area. It has no downtown and no IT firm of its own, which usually means no one to call when technology breaks. Ghosxt is based minutes away in Salinas and gives Prunedale's businesses a real help desk and on-site support close to home.",
        "economy": "Prunedale's businesses are practical and owner-run: contractors and trades, auto and equipment shops, growers and nurseries, and the retail and services along the 101 corridor. They run on a mix of office PCs, mobile devices in the field, and point-of-sale, and their IT trouble is the everyday kind &mdash; email that stopped, a quote that will not print, a device that will not connect. What they have lacked is simply someone nearby who answers and can drive out.",
        "response": "We are based in Salinas, minutes from Prunedale, so on-site response across north county is genuinely local &mdash; same-day or next-day for non-emergencies &mdash; with most issues solved remotely within the hour. For an owner-run business in a spread-out community, having support a short drive away beats a call center two hours up the freeway every time.",
        "card_a": ("Field &amp; Office Support", "Support for the office PCs, mobile devices, and point-of-sale that Prunedale's contractors, trades, and shops rely on in the field and at the counter."),
        "card_b": ("Nearby On-Site Help", "A help desk and on-site engineer based minutes away in Salinas, for the North County businesses that have never had anyone local to call."),
        "faqs": [
            ("Do you provide IT support for businesses in Prunedale?", "Yes. Ghosxt provides a live help desk and on-site IT support for Prunedale's contractors, trades, growers, retail, and family businesses: day-to-day support, Microsoft 365, email, monitoring, backups, and security. We are based minutes away in Salinas."),
            ("There's no IT company out here. Can you really cover Prunedale?", "Yes. We are based in Salinas, minutes from Prunedale along 101, and serve north county directly. On-site response is a short drive, not a half-day trip from the Bay Area."),
            ("We work in the field as much as the office. Can you support that?", "Yes. We support the mobile devices, email, and access your team uses on job sites and in trucks, not just the office PCs, so the people doing the work can stay connected wherever they are."),
            ("How much does it cost?", "Pricing is published upfront: flat per-user managed plans with a Tiny Team option for the smallest businesses. Start with a free assessment for a written plan and a real number, with no obligation."),
        ],
    },
}


# Shared help-desk service cards, reused across pages. {name} is templated in.
SHARED_CARDS = [
    ("Live, US-Based Help Desk", "Real people who answer &mdash; remote support for the day-to-day issues that stop work, with most tickets resolved the same hour instead of parked in a queue."),
    ("Same-Day On-Site Response", "When a problem needs hands on the hardware, we drive out. Based on the Central Coast, on-site visits to {name} are typically same-day or next-day for non-emergencies."),
    ("Proactive Monitoring &amp; Patching", "We watch your systems and patch them before they fail, so most problems are prevented &mdash; fewer tickets, less downtime, and no surprise outages."),
    ("Microsoft 365 &amp; New-Hire Setup", "Email, Teams, passwords, onboarding and offboarding, and the everyday Microsoft 365 questions your team actually has &mdash; handled quickly so people can get back to work."),
]


def jstr(s):
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


def clean_text(s):
    """Strip HTML tags and decode the handful of entities used in copy for JSON-LD."""
    s = re.sub(r"<[^>]+>", "", s)
    s = s.replace("&mdash;", "—").replace("&amp;", "&")
    return s


def faq_jsonld(faqs):
    items = []
    for q, a in faqs:
        items.append(
            '              {\n'
            '                "@type": "Question",\n'
            f'                "name": {jstr(clean_text(q))},\n'
            '                "acceptedAnswer": {\n'
            '                  "@type": "Answer",\n'
            f'                  "text": {jstr(clean_text(a))}\n'
            '                }\n'
            '              }'
        )
    return ",\n".join(items)


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


def nearby_links(nearby):
    parts = [f'<a href="{slug}.html">{name}</a>' for slug, name in nearby]
    if len(parts) > 1:
        return ", ".join(parts[:-1]) + ", and " + parts[-1]
    return parts[0] if parts else ""


def build_page(chrome, slug, city):
    name = city["name"]
    admin = city["admin"]
    county_slug, county_name = city["county"]
    nearby = nearby_links(city["nearby"])

    page_slug = f"it-help-{slug}"
    url = f"https://ghosxt.com/{page_slug}.html"
    og_image = f"https://ghosxt.com/assets/img/og/{page_slug}.png"

    title = f"IT Support &amp; Help Desk in {name}, CA | Ghosxt"
    meta_desc = (
        f"Live US-based help desk and on-site IT support for {name}, California small "
        "businesses: fast response, Microsoft 365, monitoring, and security from a cleared "
        "DoD IT engineer. Free assessment."
    )
    og_title = f"IT Support &amp; Help Desk in {name}, CA | Ghosxt"
    og_desc = f"A live help desk and genuinely local on-site IT support for {name} small business, from a cleared DoD IT engineer."
    schema_name = f"IT Support and Help Desk in {name}"
    schema_desc = (
        f"Live, US-based help desk and on-site IT support for {name}, California small business: "
        "day-to-day end-user support, Microsoft 365, proactive monitoring and patching, backup, "
        "and cybersecurity from a cleared DoD IT engineer."
    )
    h1 = f"IT Support &amp; Help Desk in {name}, California"

    cards = [
        (SHARED_CARDS[0][0], SHARED_CARDS[0][1].format(name=name)),
        (SHARED_CARDS[1][0], SHARED_CARDS[1][1].format(name=name)),
        city["card_a"],
        city["card_b"],
        (SHARED_CARDS[2][0], SHARED_CARDS[2][1].format(name=name)),
        (SHARED_CARDS[3][0], SHARED_CARDS[3][1].format(name=name)),
    ]
    faqs = city["faqs"]

    body = f"""      <section class="location-hero">
        <div class="container">
          <nav class="location-breadcrumbs" aria-label="Breadcrumb">
            <a href="index.html">Home</a><span class="sep">&rsaquo;</span><a href="help-desk-it-support.html">IT Help Desk &amp; Support</a><span class="sep">&rsaquo;</span><span aria-current="page">{name}</span>
          </nav>
          <h1>{h1}</h1>
          <p class="lead">{city['lead']}</p>
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
          <p class="pricing-trust-callout"><a href="pricing.html">Help desk and IT support are built into every managed plan &mdash; pricing published upfront.</a></p>
        </div>
      </section>

      <section class="location-section">
        <div class="container">
          <h2>What IT help looks like in {name}</h2>
          <p>{city['economy']}</p>
          <p>That is the job we do: be the team a {name} business calls first, fix what is broken quickly, and quietly keep more of it from breaking. No phone tree, no overseas script, no waiting days for a callback &mdash; just a cleared engineer and a help desk that treats your time as the thing that matters.</p>
        </div>
      </section>

      <section class="location-section">
        <div class="container">
          <h2>How we support {name} businesses</h2>
          <p>A complete help desk and managed IT, sized for a {name} small business: the everyday support your team needs, plus the monitoring, security, and backup that keep problems from becoming emergencies.</p>
          <div class="services-grid">
{cards_html(cards)}
          </div>
        </div>
      </section>

      <section class="location-cta">
        <div class="container">
          <h2>Free IT assessment for your {name} business</h2>
          <p>30 minutes with a cleared engineer. We review your systems, support history, Microsoft 365, and backups, and leave you a written, prioritized punch list of what to fix first &mdash; whether or not you become a client.</p>
          <a href="https://calendly.com/ulises-ghosxt" target="_blank" rel="noopener noreferrer" class="location-btn location-btn-primary">
            <i class="fi fi-rs-calendar-day" aria-hidden="true"></i>
            Book your free assessment
          </a>
        </div>
      </section>

      <section class="location-section">
        <div class="container">
          <h2>On-site when you need it, remote when you don't</h2>
          <p>{city['response']}</p>
        </div>
      </section>

      <section class="location-section">
        <div class="container">
          <h2>A help desk that's part of complete IT</h2>
          <p>Day-to-day support works best when the same team also runs and secures the systems behind it. Our {name} help desk sits inside <a href="managed-it-services.html">managed IT</a> &mdash; monitoring, patching, <a href="cybersecurity.html">cybersecurity</a>, <a href="cloud-services.html">Microsoft 365 and cloud</a>, and <a href="backup-disaster-recovery.html">backup</a> &mdash; so the engineer who answers your ticket is the one who knows your environment. For the full picture of our support model, see <a href="help-desk-it-support.html">IT help desk &amp; support</a>.</p>
          <p>We serve {name} as part of our coverage across <a href="{county_slug}.html">{county_name}</a>, and also support nearby {nearby}. Based on the Central Coast, on-site response is genuinely local, with the same remote management nationwide.</p>
        </div>
      </section>

      <section class="location-section location-faq">
        <div class="container">
          <h2>FAQs about IT support in {name}</h2>
{faq_details(faqs)}
        </div>
      </section>

      <section class="location-cta">
        <div class="container">
          <h2>Get {name} IT support that actually answers</h2>
          <p>Book a 30-minute free assessment, or send us a note. Either way, you walk away knowing exactly where your IT stands and what to fix first.</p>
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

    jsonld = f"""    <script type="application/ld+json">
      {{
        "@context": "https://schema.org",
        "@graph": [
          {{
            "@type": "Service",
            "@id": "{url}#service",
            "serviceType": "IT Support and Help Desk",
            "name": "{schema_name}",
            "url": "{url}",
            "description": {jstr(schema_desc)},
            "provider": {{ "@id": "https://ghosxt.com/#business" }},
            "areaServed": {{ "@type": "City", "name": "{name}", "containedInPlace": {{ "@type": "AdministrativeArea", "name": "{admin}" }} }}
          }},
          {{
            "@type": "BreadcrumbList",
            "itemListElement": [
              {{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ghosxt.com/" }},
              {{ "@type": "ListItem", "position": 2, "name": "IT Help Desk & Support", "item": "https://ghosxt.com/help-desk-it-support.html" }},
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
    chrome = extract_chrome(CHROME_TEMPLATE)

    written, skipped = [], []
    for slug, city in CITIES.items():
        page_slug, html = build_page(chrome, slug, city)
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
