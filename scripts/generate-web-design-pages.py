#!/usr/bin/env python3
"""Generate web design x city combo pages (web-design-<city>.html).

Follows the same model as generate-location-service-pages.py: shared chrome
(head assets, cookie banner, nav, footer) is sliced verbatim from
scripts/_chrome_source.html, and only the localized regions — title/meta/OG,
JSON-LD, hero, body sections, and FAQs — are templated from the per-city data
model below. Each city gets genuinely distinct local prose and FAQs so the
page reads as a local page rather than a find-and-replace.

Run from the repo root:

    python3 scripts/generate-web-design-pages.py            # only writes new pages
    python3 scripts/generate-web-design-pages.py --force    # overwrite existing

After running, regenerate the sitemap and OG images, and keep llms.txt and the
city hub pages' local-services cards in sync:

    python3 scripts/generate-sitemap.py
    python3 scripts/generate-og-images.py
"""

import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _chrome import extract_chrome  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# ---------------------------------------------------------------------------
# Per-city data model. Same city set as the cybersecurity/cloud matrices so
# every city hub cross-links a complete local service trio.
# ---------------------------------------------------------------------------

# Per-city meta descriptions, hand-diversified for SEO and kept here so a
# --force regeneration reproduces the unique descriptions instead of the
# {name}-only boilerplate. Keep each <= ~155 chars. Cities not listed fall
# back to the generic template below.
WEB_DESIGN_META_DESC = {
    "carmel": "Hand-coded, mobile-first web design for Carmel galleries, inns, and tasting rooms — presentation that matches the brand and ranks locally. From $1,800.",
    "gilroy": "Web design for Gilroy retailers and B2B distributors — sites that convert Highway 101 traffic and win logistics and processing buyers. From $1,800.",
    "hollister": "Mobile-first web design for Hollister businesses stuck with an outdated site, or none — get found before a competitor does. From $1,800.",
    "king-city": "Web design for King City and South County businesses the big agencies skip — a real site, not just a Facebook page, from a local team. From $1,800.",
    "marina": "First websites for Marina startups, ag-tech, and clinics near CSUMB and the Dunes — mobile-first sites built to grow with you. From $1,800.",
    "monterey": "Web design for Monterey hospitality and visitor-facing businesses — menus, bookings, and galleries that win the trip-planning search. From $1,800.",
    "pacific-grove": "Mobile-first websites for Pacific Grove inns, cafes, and retreats booked by visitors — clean, personal, and easy to find. From $1,800.",
    "salinas": "Salinas web design from a local team — campaign, machine-shop, and nonprofit sites in our home-base portfolio, built to rank locally. From $1,800.",
    "san-jose": "Web design and local SEO for San Jose small businesses fighting page-one competition — hand-coded, fast, mobile-first sites. From $1,800.",
    "santa-cruz": "Web design for Santa Cruz independents — sites that carry a fiercely local, un-corporate brand and still rank and convert. From $1,800.",
    "seaside": "No-flash, high-function web design for Seaside shops and services competing across the Peninsula — fast, findable, mobile-first. From $1,800.",
    "soledad": "Web design for Soledad wineries, growers, and shops hard to find online — tasting-room and local sites built to be seen. From $1,800.",
    "watsonville": "Web design for Watsonville ag, food-processing, and family businesses — bring an invisible economy online with a fast, mobile-first site. From $1,800.",
}

CITIES = {
    "salinas": {
        "name": "Salinas",
        "admin": "Monterey County, California",
        "nearby": [("monterey", "Monterey"), ("watsonville", "Watsonville"), ("hollister", "Hollister"), ("marina", "Marina")],
    },
    "monterey": {
        "name": "Monterey",
        "admin": "Monterey County, California",
        "nearby": [("pacific-grove", "Pacific Grove"), ("carmel", "Carmel"), ("seaside", "Seaside"), ("salinas", "Salinas")],
    },
    "santa-cruz": {
        "name": "Santa Cruz",
        "admin": "Santa Cruz County, California",
        "nearby": [("watsonville", "Watsonville"), ("gilroy", "Gilroy"), ("san-jose", "San Jose"), ("monterey", "Monterey")],
    },
    "watsonville": {
        "name": "Watsonville",
        "admin": "Santa Cruz County, California",
        "nearby": [("santa-cruz", "Santa Cruz"), ("salinas", "Salinas"), ("gilroy", "Gilroy"), ("hollister", "Hollister")],
    },
    "san-jose": {
        "name": "San Jose",
        "admin": "Santa Clara County, California",
        "nearby": [("gilroy", "Gilroy"), ("santa-cruz", "Santa Cruz"), ("hollister", "Hollister"), ("salinas", "Salinas")],
    },
    "carmel": {
        "name": "Carmel",
        "admin": "Monterey County, California",
        "nearby": [("pacific-grove", "Pacific Grove"), ("monterey", "Monterey"), ("seaside", "Seaside"), ("salinas", "Salinas")],
    },
    "gilroy": {
        "name": "Gilroy",
        "admin": "Santa Clara County, California",
        "nearby": [("hollister", "Hollister"), ("san-jose", "San Jose"), ("salinas", "Salinas"), ("watsonville", "Watsonville")],
    },
    "hollister": {
        "name": "Hollister",
        "admin": "San Benito County, California",
        "nearby": [("salinas", "Salinas"), ("gilroy", "Gilroy"), ("watsonville", "Watsonville"), ("san-jose", "San Jose")],
    },
    "king-city": {
        "name": "King City",
        "admin": "Monterey County, California",
        "nearby": [("soledad", "Soledad"), ("salinas", "Salinas"), ("monterey", "Monterey"), ("hollister", "Hollister")],
    },
    "marina": {
        "name": "Marina",
        "admin": "Monterey County, California",
        "nearby": [("seaside", "Seaside"), ("monterey", "Monterey"), ("salinas", "Salinas"), ("pacific-grove", "Pacific Grove")],
    },
    "pacific-grove": {
        "name": "Pacific Grove",
        "admin": "Monterey County, California",
        "nearby": [("monterey", "Monterey"), ("carmel", "Carmel"), ("seaside", "Seaside"), ("marina", "Marina")],
    },
    "seaside": {
        "name": "Seaside",
        "admin": "Monterey County, California",
        "nearby": [("marina", "Marina"), ("monterey", "Monterey"), ("pacific-grove", "Pacific Grove"), ("salinas", "Salinas")],
    },
    "soledad": {
        "name": "Soledad",
        "admin": "Monterey County, California",
        "nearby": [("king-city", "King City"), ("salinas", "Salinas"), ("hollister", "Hollister"), ("monterey", "Monterey")],
    },
}


# Localized prose, keyed by slug. Each entry: lead, economy, card_a, card_b,
# faq (4 pairs). Keep answers plain enough that stripping tags for JSON-LD
# leaves a complete sentence.
CONTENT = {
    "salinas": {
        "lead": "Salinas is our home base, and it shows in the portfolio — campaign sites, machine-shop sites, nonprofit and renter-advocacy sites, all built for real Salinas organizations. A Salinas business competes for customers who search first and drive second, so the site has to load fast, read clearly in the results, and make calling easy. Ghosxt hand-codes websites for Salinas small businesses — no page builders, no templates — from a local, DoD-cleared engineer.",
        "economy": "Valley ag companies need sites that hold up to the security questionnaires their buyers send. Downtown professional offices — law, insurance, accounting — need to rank for their practice area before the Main Street competition does. Restaurants and retail need menus, hours, and directions that work instantly on a phone. And Salinas trades in both languages, so a site that speaks Spanish as well as English reaches the whole market instead of half of it.",
        "card_a": ("Salinas-Proven Portfolio", "We've shipped sites for Salinas organizations you may already know — from advocacy groups to a mayoral campaign to industrial shops. See the live portfolio on the <a href=\"website-development.html\">web development page</a>."),
        "card_b": ("Bilingual Websites", "English/Spanish builds that serve the whole Salinas market — real translated pages that rank in both languages, not a translate widget bolted on."),
        "faq": [
            ("Do you build websites for businesses in Salinas?", "Yes — Salinas is our home base. We hand-code websites for Salinas small businesses, from starter sites at $1,800 to full e-commerce, and several of our live portfolio projects are Salinas organizations. On-site meetings are easy because we're local."),
            ("How much does a website cost in Salinas?", "Our packages are published upfront: $1,800 for a 3-5 page Essential site, $3,200 for the 8-12 page Business Pro, and $5,900+ for e-commerce or portals. The instant calculator on our web development page prices your exact project in about a minute, no sales call required."),
            ("Can you build a bilingual English/Spanish website?", "Yes. Our multilingual add-on builds real translated pages — not a widget — so your site ranks in Spanish-language searches too. For many Salinas businesses that's the difference between reaching the whole market and half of it."),
            ("Can you make my Salinas business show up on Google?", "That's most of the point. Every build ships with clean on-page SEO, and our SEO package adds schema markup, Search Console setup, and page-speed work so you can compete for 'your service + Salinas' searches instead of being invisible."),
        ],
    },
    "monterey": {
        "name_note": "",
        "lead": "Monterey businesses live or die on how they look to someone planning a visit — a diner checking the menu from Cannery Row, a family comparing hotels, a bride shortlisting venues. The website is the storefront before anyone reaches the storefront. Ghosxt hand-codes fast, mobile-first websites for Monterey small businesses — restaurants, inns, tour operators, and the professional offices that serve them — from a Central Coast, DoD-cleared engineer.",
        "economy": "Hospitality and tourism set the bar here: visitors decide from a phone, often on hotel Wi-Fi, and a slow or dated site loses the booking before a human ever gets a chance. Restaurants need menus and reservations that work in two taps. Tour and activity operators need booking systems that don't send customers to a competitor's calendar. And Monterey's professional and marine-science community needs credible, content-rich sites that rank beyond the tourist core.",
        "card_a": ("Booking &amp; Reservations", "Booking and appointment systems built into your own site — tours, tastings, tables, rooms — so the reservation happens on your domain, not a commission platform's."),
        "card_b": ("Tourism-Speed Mobile", "Pages tuned for visitors on phones and spotty hotel Wi-Fi — menus, hours, directions, and booking that load instantly, because that's where Monterey customers decide."),
        "faq": [
            ("Do you build websites for businesses in Monterey?", "Yes. We hand-code websites for Monterey restaurants, inns, tour operators, shops, and professional offices — mobile-first and tuned for the visitor traffic Monterey runs on. We're based on the Central Coast, so meeting in person is easy."),
            ("Can you add online booking or reservations to my site?", "Yes. Our booking add-on ($1,200) integrates scheduling for tours, tastings, appointments, or tables directly into your site, so customers book on your domain instead of a commission platform — and you keep the customer relationship."),
            ("How much does a website cost in Monterey?", "Packages are published upfront: $1,800 Essential, $3,200 Business Pro, $5,900+ for e-commerce or booking-heavy builds. Use the instant calculator on our web development page for your exact number."),
            ("My site looks fine on my computer — why is it losing customers?", "Because your customers aren't on your computer. Most Monterey visitors decide on a phone, and a site that takes more than a few seconds to load on cell data loses them to the next search result. We build to Google's Core Web Vitals so the site is fast where it counts."),
        ],
    },
    "santa-cruz": {
        "lead": "Santa Cruz businesses have a brand whether they chose one or not — surf-town independent, fiercely local, allergic to anything that looks corporate. The website has to carry that personality and still perform: load fast, rank for local searches, and sell online where it makes sense. Ghosxt hand-codes websites for Santa Cruz small businesses that look like Santa Cruz and perform like they were built by an engineer — because they were.",
        "economy": "Boutiques, surf and outdoor shops, and makers sell as much through Instagram and online stores as over the counter — they need e-commerce that actually converts. Cafes, breweries, and venues need hours, menus, and events that are current without a developer on retainer. Wellness studios and practitioners live on online booking. And the county's professionals and remote-work economy expect a site that doesn't embarrass them in a design-literate town.",
        "card_a": ("E-commerce for Makers", "Online stores for boutiques, makers, and shops — product catalogs, payments, and inventory that sync with the counter, built to convert rather than just exist."),
        "card_b": ("Update It Yourself", "A clean CMS so your staff can change menus, events, classes, and products in minutes — no developer, no page-builder spaghetti, no stale site."),
        "faq": [
            ("Do you build websites for businesses in Santa Cruz?", "Yes. We hand-code websites for Santa Cruz shops, studios, restaurants, and professionals — sites with enough personality for a design-literate town and the performance to rank and convert. We serve the whole county, from the Westside to Aptos."),
            ("Can you build an online store for my shop?", "Yes. Our e-commerce builds start at $5,900 and include product catalog, payment processing, and a checkout that works on phones. For smaller catalogs, we can often add a compact store to a Business Pro site instead — we'll tell you honestly which fits."),
            ("Will I be able to update the site myself?", "Yes. We set up a clean admin so your team can change menus, events, hours, classes, and products in minutes. Routine updates shouldn't require paying a developer, and our builds are documented so you're never locked in."),
            ("How much does a website cost in Santa Cruz?", "Packages are published upfront: $1,800 Essential, $3,200 Business Pro, $5,900+ e-commerce. The instant calculator on our web development page gives you an exact number in about a minute."),
        ],
    },
    "watsonville": {
        "lead": "Watsonville works — berries and row crops, food processing, manufacturing, trucking, and the family businesses that serve them. Most of that economy is invisible online or represented by a site nobody has touched in years, which means lost bids, lost hires, and lost customers in a town where the work itself is first-rate. Ghosxt hand-codes websites for Watsonville businesses, in English and Spanish, from a Central Coast, DoD-cleared engineer.",
        "economy": "Ag and food companies need credible sites for the buyers and auditors who look them up before signing. Manufacturers and shops need capability pages that win bids and careers pages that actually help recruiting. Local services and restaurants need to show up when Watsonville searches for them. And this is a bilingual town — a site that works in Spanish as well as English serves the real market, not a fraction of it.",
        "card_a": ("Bilingual by Default", "English/Spanish builds with real translated pages that rank in both languages — because in Watsonville, half your customers and most of your workforce may search in Spanish first."),
        "card_b": ("B2B Credibility Pages", "Capability, certification, and food-safety pages that hold up when a buyer, auditor, or prime contractor looks you up before awarding work."),
        "faq": [
            ("Do you build websites for businesses in Watsonville?", "Yes. We hand-code websites for Watsonville ag companies, processors, manufacturers, and local businesses — including full English/Spanish builds. We're based on the Central Coast, so on-site meetings are a short drive, not a video call with a stranger."),
            ("Can you build our site in English and Spanish?", "Yes, and in Watsonville we recommend it. Our multilingual add-on ($950) builds real translated pages that rank in Spanish-language searches — not a translate widget — so you reach the whole market and the whole labor pool."),
            ("We sell to bigger companies, not the public — do we still need a real website?", "Yes, arguably more. Buyers, auditors, and prime contractors look you up before they sign, and a dated or missing site reads as risk. A clean capability site with certifications and facilities builds the credibility that wins bids — and a careers page helps recruiting in a tight labor market."),
            ("How much does a website cost in Watsonville?", "Packages are published upfront: $1,800 Essential, $3,200 Business Pro, $5,900+ e-commerce or portals. The instant calculator on our web development page prices your exact project in about a minute."),
        ],
    },
    "san-jose": {
        "lead": "San Jose small businesses compete in the hardest local search market in Northern California — every plumber, dentist, restaurant, and firm is fighting page one against hundreds of others, plus agencies charging Silicon Valley rates to help. Ghosxt gives San Jose small businesses a different deal: hand-coded, performance-first websites at published Central Coast prices, from a DoD-cleared engineer, without the agency overhead.",
        "economy": "In a market this dense, the technical margins decide who gets found: page speed, clean structure, real service-area pages, and schema markup are the difference between page one and invisible. Trades and home services need lead-generation sites that make calling effortless. Restaurants and retail need to stand out in map results. Small professional firms need credibility against downtown competitors with ten times the budget.",
        "card_a": ("Compete on Page One", "Deep local SEO — service pages, schema, speed, Search Console — built to compete in San Jose's crowded results, where the technical margins decide who gets the call."),
        "card_b": ("Small-Business Pricing", "Published prices, not Silicon Valley agency quotes: the same $1,800–$5,900 packages we build on the Central Coast, hand-coded, with no account-manager layer to fund."),
        "faq": [
            ("Do you build websites for businesses in San Jose?", "Yes. We build for San Jose small businesses — trades, restaurants, clinics, firms — with the same published pricing we use everywhere: $1,800 to $5,900+ depending on scope. Most San Jose projects run fully remote with video calls and shared project boards, and it works seamlessly."),
            ("How do we compete with hundreds of similar businesses on Google?", "On technical execution. Most small-business sites in dense markets fail on speed, structure, or missing service pages, so doing those right is a genuine edge. We build individual pages for each service and area you cover, add schema markup, and tune to Core Web Vitals — the margins that decide page one."),
            ("Why hire a Central Coast developer instead of a San Jose agency?", "You get a senior engineer instead of an account manager, and published prices instead of a discovery-phase quote. Agencies in the valley routinely bid five figures for what is structurally a $3,200 site; we put our pricing on the page and let the portfolio argue the quality."),
            ("How much does a website cost for a San Jose small business?", "The same as everywhere we work: $1,800 Essential, $3,200 Business Pro, $5,900+ e-commerce. The instant calculator on our web development page gives you an exact number in about a minute, no sales call."),
        ],
    },
    "carmel": {
        "lead": "In Carmel, the website is part of the brand — a gallery, inn, tasting room, or firm here is judged on presentation before a visitor ever crosses Ocean Avenue. A generic template undercuts exactly the impression the business trades on. Ghosxt hand-codes elegant, fast websites for Carmel businesses, built and maintained with the discretion the town expects, from a DoD-cleared engineer.",
        "economy": "Galleries need work presented the way it deserves — large imagery that still loads instantly, and inquiry flows that respect a collector's privacy. Inns and tasting rooms need bookings and allocations handled on their own domain, not a commission platform. Real estate, law, and wealth offices need quiet, credible sites where discretion is legible in the design itself. What they share is a clientele that notices craft.",
        "card_a": ("Gallery-Grade Presentation", "Large-format imagery, careful typography, and pages that stay fast despite them — presentation worthy of the work, engineered so elegance never costs performance."),
        "card_b": ("Bookings Without Commissions", "Reservation and inquiry systems on your own domain for inns, tasting rooms, and experiences — you keep the guest relationship and skip the platform's cut."),
        "faq": [
            ("Do you build websites for businesses in Carmel?", "Yes. We hand-code websites for Carmel galleries, inns, tasting rooms, and professional offices — designed to the standard the town expects and maintained discreetly. We're local to the Peninsula, so in-person meetings are easy and low-profile."),
            ("Can a beautiful website still be fast?", "Yes — that's precisely the engineering. We build image-heavy pages with modern formats, lazy loading, and hand-tuned code so a gallery or inn site scores well on Google's speed metrics while looking the way Carmel demands. Beauty that costs five seconds of load time loses the customer anyway."),
            ("Can you handle bookings for an inn or tasting room?", "Yes. Our booking add-on integrates reservations directly into your site so guests book on your domain — you keep the relationship and the data, and skip the commission platforms take."),
            ("How much does a website cost in Carmel?", "Packages are published upfront: $1,800 Essential, $3,200 Business Pro, and $5,900+ for e-commerce or booking-heavy builds, with a premium custom design add-on at $1,500 for brands that want fully bespoke visuals. The calculator on our web development page prices your exact scope."),
        ],
    },
    "gilroy": {
        "lead": "Gilroy businesses split between two audiences: freeway traffic deciding where to stop, and B2B buyers vetting distribution, processing, and logistics partners. Both judge you by the website first. Ghosxt hand-codes fast, practical websites for Gilroy businesses — from restaurants and retail off the 101 to warehouses and processors up the corridor — from a Central Coast, DoD-cleared engineer.",
        "economy": "Retail and restaurants near the outlets live on 'near me' searches from travelers — map presence, hours, and menus that load instantly decide whether the car turns off. Logistics, 3PL, and food-processing companies need credible capability sites for the shippers and grocers who vet them, plus careers pages that help hire drivers and line staff in a tight market. Both get decided on a phone.",
        "card_a": ("Freeway 'Near Me' Visibility", "Map-pack and local-search presence tuned for traveler searches — hours, menus, and directions that load instantly and turn 101 traffic into foot traffic."),
        "card_b": ("Logistics &amp; Ag B2B Sites", "Capability pages, certifications, and facility credibility for the shippers, grocers, and processors who look you up before they sign — plus careers pages that actually help recruiting."),
        "faq": [
            ("Do you build websites for businesses in Gilroy?", "Yes. We hand-code websites for Gilroy restaurants, retail, and the distribution and food businesses along the 101 corridor. We're based on the Central Coast, so on-site meetings in South County are a short drive."),
            ("Can you get my restaurant or store into the map results travelers see?", "That's local SEO, and it's built into how we work: consistent business data, location schema, fast mobile pages, and a Google Business Profile configured properly. For a business near the outlets, the map pack is worth more than any ad."),
            ("We're a warehouse/processor — what should our site actually do?", "Win credibility checks and hires. Buyers and auditors look you up before awarding contracts; a clean site with capabilities, certifications, and facilities answers their first questions, and a real careers page helps fill driver and line positions."),
            ("How much does a website cost in Gilroy?", "Packages are published upfront: $1,800 Essential, $3,200 Business Pro, $5,900+ e-commerce or portals. The instant calculator on our web development page prices your exact project in about a minute."),
        ],
    },
    "hollister": {
        "lead": "Most Hollister businesses either have no website or have one that hasn't changed since it was built years ago — which means every customer who searches finds a competitor, an out-of-date page, or nothing. In a town where word of mouth carries far, the website just has to confirm what the handshake promised. Ghosxt hand-codes straightforward, fast websites for Hollister businesses at published prices, from a DoD-cleared engineer next door.",
        "economy": "Machine shops and small manufacturers need capability pages that travel further than word of mouth — the buyer in another county checking you out before a bid. Family businesses and trades need the basics done right: services, photos of real work, hours, and a phone number that's one tap away. Wineries and growers need tasting-room hours and club signups that work. None of it needs to be fancy; all of it needs to be found.",
        "card_a": ("First Real Website", "For businesses running on word of mouth alone — a clean, fast site that confirms what the handshake promised: services, real photos, hours, and one-tap calling."),
        "card_b": ("Shop &amp; Manufacturer Pages", "Capability and equipment pages for machine shops and small manufacturers, so the out-of-county buyer vetting you before a bid finds proof instead of a dead end."),
        "faq": [
            ("Do you build websites for businesses in Hollister?", "Yes. We hand-code websites for Hollister and San Benito County businesses — shops, trades, growers, and family businesses. We're genuinely nearby, so meeting in person is a short drive, not a sales call from the Bay Area."),
            ("We've never had a website — where do we start?", "With a free 30-minute call. We'll tell you honestly what you need (usually the $1,800 Essential site: services, photos, hours, contact) and what you don't. You bring what you know about your customers; we handle everything technical including the domain and hosting."),
            ("Is a website worth it if most of our business is word of mouth?", "Yes — because word of mouth now ends with a search. When someone gets your name from a friend, they look you up before calling, and finding nothing (or a competitor) loses referrals you never knew you had. The site's job is to confirm the recommendation."),
            ("How much does a website cost in Hollister?", "Packages are published upfront: $1,800 Essential, $3,200 Business Pro, $5,900+ for e-commerce. No discovery phases, no surprise line items — the calculator on our web development page shows exactly what your scope costs."),
        ],
    },
    "king-city": {
        "lead": "King City and the southern valley get skipped — by IT providers, and by web designers who won't drive past Salinas. So South County businesses end up with no site, a Facebook page standing in for one, or something a relative built years ago. Ghosxt builds real websites for King City businesses at published prices, in English and Spanish, from a DoD-cleared engineer based up the valley in Salinas.",
        "economy": "Ag operations, ranches, and processors need credible sites for buyers and compliance reviews. Trucking companies need a real web presence to win freight and recruit drivers. Local services, restaurants, and shops need to show up when someone in South County searches — because right now, mostly nobody does, which makes ranking here easier than anywhere else we work. And like the rest of the valley, King City works in two languages.",
        "card_a": ("South County, Actually Served", "Real in-person service for King City, Greenfield, and San Lucas — we drive down, meet you at the shop, and build from what we see, not from a stock-photo template."),
        "card_b": ("Ag &amp; Trucking Credibility", "Sites that hold up when a buyer, broker, or driver looks you up — capabilities, compliance, equipment, and a careers page that helps fill seats."),
        "faq": [
            ("Do you build websites for businesses in King City?", "Yes — and we actually come to King City. We're based up the valley in Salinas and built our model around serving the South County towns other providers skip. Published pricing, in-person meetings, English and Spanish builds."),
            ("Most local businesses here have no website — does that matter?", "It's an opportunity. Because so few South County businesses have real sites, a well-built one ranks quickly and owns its searches. Being the one plumber, trucking company, or restaurant with a fast, findable site is a bigger edge in King City than it would be anywhere north."),
            ("Can you build our site in Spanish and English?", "Yes. Our multilingual add-on ($950) builds real translated pages that rank in both languages — which in the southern valley is often the difference between reaching your actual customers and missing them."),
            ("How much does a website cost in King City?", "The same published prices as everywhere: $1,800 Essential, $3,200 Business Pro, $5,900+ e-commerce. The instant calculator on our web development page gives you an exact number in about a minute."),
        ],
    },
    "marina": {
        "lead": "Marina's new businesses — startups, ag-tech, clinics, and the storefronts filling in around the Dunes and CSUMB — mostly need their first real website, and need it to grow with them instead of being rebuilt at every stage. Ghosxt hand-codes fast, scalable websites for Marina businesses, from a Peninsula-based, DoD-cleared engineer.",
        "economy": "Startups and ag-tech companies need a credible site before the first customer meeting or investor call — and a foundation that won't embarrass them at twice the headcount. New storefronts, gyms, and restaurants around the Dunes need to get found by a population that's still forming its habits, where showing up early in local search compounds. Clinics and services near CSUMB need booking and information that works for a young, phone-first clientele.",
        "card_a": ("Startup-Credible, Fast", "A site that holds up in front of customers and investors — clean design, real content structure, and performance metrics you can put in a pitch deck."),
        "card_b": ("Built to Grow", "Architecture that scales from launch site to product site without a rebuild — add pages, a blog, careers, or a store later without starting over."),
        "faq": [
            ("Do you build websites for businesses in Marina?", "Yes. We hand-code websites for Marina startups, clinics, and new storefronts — we're based on the Peninsula, so meeting in person is easy. Builds are designed to grow with you rather than be replaced at your next stage."),
            ("We're a startup — do we need a custom site or a template?", "Early on, what matters is credibility and speed, not size. Our $1,800–$3,200 builds get you a fast, professional site that holds up in front of customers and investors, on a foundation you can extend — which beats both a wrestled-with template and a premature five-figure build."),
            ("Marina is growing fast — how does that affect local search?", "It's a land grab. New residents are forming search habits now, and the businesses that rank early own those habits. A fast site with proper local SEO planted today compounds as the population grows — much cheaper than displacing an incumbent later."),
            ("How much does a website cost in Marina?", "Packages are published upfront: $1,800 Essential, $3,200 Business Pro, $5,900+ e-commerce. The instant calculator on our web development page prices your exact scope in about a minute."),
        ],
    },
    "pacific-grove": {
        "lead": "Pacific Grove businesses are small, personal, and booked by strangers — a couple choosing a B&amp;B for Butterfly Days, a family picking a cafe after the Aquarium, a retreat guest comparing venues from another state. The website does the persuading before anyone arrives. Ghosxt hand-codes warm, fast websites for PG's inns, cafes, retreats, and small offices, from a Peninsula-based, DoD-cleared engineer.",
        "economy": "Inns and B&amp;Bs compete with big-brand hotels a mile away, so the site has to sell what the brands can't — character, story, and rooms photographed honestly — while taking direct bookings that skip the platform commissions. Cafes and restaurants need current menus and hours that survive the seasonal rhythm. Retreats and practitioners need calm, credible pages with scheduling built in. Small sites, done with care.",
        "card_a": ("Direct Bookings for Inns", "Reservation flows on your own domain that convert lookers into direct bookings — keeping the guest relationship and the 15-20% a platform would take."),
        "card_b": ("Character That Converts", "Design that carries a PG inn or cafe's personality — honest photography, story, warmth — engineered to load instantly for the traveler deciding from a phone."),
        "faq": [
            ("Do you build websites for businesses in Pacific Grove?", "Yes. We hand-code websites for PG inns, B&Bs, cafes, retreats, and small offices — we're based on the Peninsula, so meetings are easy and low-key. Builds start at $1,800, published upfront."),
            ("Can our inn take direct bookings instead of paying platform commissions?", "Yes. Our booking add-on puts reservations on your own domain, so a guest who finds you directly books directly — you keep the relationship and the 15-20% a platform would take. The platforms can stay as one channel; they just shouldn't be the only one."),
            ("Our business is tiny — is a professional website overkill?", "No, it just needs to be sized right. A 3-5 page Essential site at $1,800 — story, rooms or menu, honest photos, booking or contact — is exactly the scale a PG inn or cafe needs. What matters is that it loads fast and books cleanly, not that it's big."),
            ("How much does a website cost in Pacific Grove?", "Packages are published upfront: $1,800 Essential, $3,200 Business Pro, $5,900+ for booking-heavy or e-commerce builds. The instant calculator on our web development page gives you an exact number."),
        ],
    },
    "seaside": {
        "lead": "Seaside's shops, restaurants, and services compete for the whole Peninsula's customers — but only if those customers can find them. A working town's website doesn't need flash; it needs to rank, load fast on a phone, show real photos and prices, and make calling effortless. Ghosxt hand-codes practical, lead-generating websites for Seaside businesses at published prices, from a DoD-cleared engineer.",
        "economy": "Auto shops, trades, and repair services win on 'near me' searches and reviews — a fast site wired to a proper Google Business Profile turns searches into calls. Restaurants and markets need menus and hours that are always current. Barbershops, gyms, and studios need online booking that fills the schedule. Seaside businesses also serve the whole Peninsula's price-conscious side, which makes visible, honest pricing on the site itself a real advantage.",
        "card_a": ("'Near Me' Lead Generation", "Local SEO wired end to end — site, schema, Google Business Profile — so a Peninsula customer searching for what you do finds you first and calls in one tap."),
        "card_b": ("Booking for Shops &amp; Studios", "Online scheduling for barbershops, gyms, studios, and repair services that fills the calendar while you work, without double-booking or phone tag."),
        "faq": [
            ("Do you build websites for businesses in Seaside?", "Yes. We hand-code websites for Seaside shops, trades, restaurants, and services — practical, fast sites built to generate calls and bookings. We're local to the Peninsula, and pricing is published upfront starting at $1,800."),
            ("What actually gets my shop more calls from Google?", "Three things working together: a fast mobile site with a page for each service, correct schema and business data, and a properly configured Google Business Profile with your reviews. We set up all three — that combination is what wins 'near me' searches on the Peninsula."),
            ("Can customers book appointments on the site?", "Yes. Our booking add-on ($1,200) integrates scheduling for cuts, classes, estimates, or repairs directly into your site, so the calendar fills itself while you're working instead of trading voicemails."),
            ("How much does a website cost in Seaside?", "Packages are published upfront: $1,800 Essential, $3,200 Business Pro, $5,900+ e-commerce. The instant calculator on our web development page prices your exact project in about a minute — no sales call required."),
        ],
    },
    "soledad": {
        "lead": "Soledad sits in the middle of the valley's wine country, but most of its wineries, growers, and local businesses are barely visible online — tasting rooms that can't be found, wine clubs run by hand, town businesses with no site at all. Ghosxt builds real websites for Soledad and Salinas Valley businesses, from wine e-commerce to first websites, from a DoD-cleared engineer based up the valley in Salinas.",
        "economy": "Wineries along the River Road trail need what the big Napa houses have, sized honestly: tasting-room hours and reservations, a wine club people can join online, and compliant direct-to-consumer sales. Growers and processors need credible pages for buyers and auditors. Local restaurants, shops, and services need the basics — findable, fast, bilingual where it matters. The valley's work deserves better than invisibility.",
        "card_a": ("Winery DTC &amp; Wine Clubs", "Tasting-room reservations, online club signups, and compliant direct-to-consumer wine sales on your own site — the Napa toolkit, sized and priced for a River Road winery."),
        "card_b": ("Valley Business Basics", "First websites and rebuilds for Soledad's shops, restaurants, and services — fast, bilingual where it matters, and built by someone who actually drives down."),
        "faq": [
            ("Do you build websites for businesses in Soledad?", "Yes — and we actually serve the valley. We're based in Salinas and built our model around South County towns other providers skip. Wineries, growers, and town businesses alike, at published prices starting at $1,800."),
            ("Can you build online wine sales and a wine club for our winery?", "Yes. We build winery e-commerce with club signups, allocations, and age-verified, compliance-aware checkout, plus tasting-room reservations — so a River Road winery can sell direct like the big houses do, without the big-house budget."),
            ("Can visitors find our tasting room from the highway?", "That's local SEO and it's very winnable here: a fast site, location schema, and a proper Google Business Profile put you in the map results a visitor checks between Soledad and Greenfield. Few valley wineries do this right, so those who do stand out."),
            ("How much does a website cost in Soledad?", "The same published prices as everywhere: $1,800 Essential, $3,200 Business Pro, $5,900+ for e-commerce like wine clubs. The instant calculator on our web development page gives you an exact number in about a minute."),
        ],
    },
}


# Shared service cards reused across pages (service-generic, appropriate everywhere).
SHARED_CARDS = [
    ("Custom Design &amp; Build", "Hand-coded, mobile-first sites — no page builders, no bloated templates. Clean code that loads fast, ranks well, and is yours outright when it's done."),
    ("Local SEO &amp; Google Visibility", "On-page SEO, schema markup, Search Console, and page-speed tuning on every build — the technical work that decides who shows up when your city searches for what you do."),
    ("Hosting, Domain &amp; Email", "Domain, fast managed hosting with SSL, and business email on your own domain with SPF, DKIM, and DMARC configured — everything in accounts you own."),
    ("Maintenance &amp; Security", "Updates, daily backups, security monitoring, and performance checks from $300/month — run by the same <a href=\"cybersecurity.html\">security team</a> that protects business networks, so your site never becomes the unpatched thing that gets you breached."),
]


def jstr(s):
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


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
    parts = [f'<a href="web-design-{slug}.html">{name}</a>' for slug, name in nearby if slug != exclude_slug]
    if len(parts) > 1:
        return ", ".join(parts[:-1]) + ", and " + parts[-1]
    return parts[0] if parts else ""


def build_page(chrome, slug, city):
    name = city["name"]
    admin = city["admin"]
    c = CONTENT[slug]
    nearby = nearby_links(city["nearby"], slug)

    page_slug = f"web-design-{slug}"
    title = f"Web Design &amp; Development in {name}, CA | Ghosxt"
    meta_desc = WEB_DESIGN_META_DESC.get(slug) or (
        f"Custom web design and development for {name}, California small business: "
        "hand-coded mobile-first websites, local SEO, e-commerce and booking systems, "
        "hosting and maintenance. Published pricing from $1,800. Free consultation."
    )
    og_title = f"Web Design &amp; Development in {name}, CA | Ghosxt"
    og_desc = f"Hand-coded websites for {name} small business — fast, mobile-first, built to rank. Published pricing from $1,800."
    schema_desc = (
        f"Custom web design and development for {name}, California small business: "
        "hand-coded mobile-first websites, local SEO, e-commerce and booking systems, "
        "and ongoing hosting, maintenance, and security, from a DoD-cleared engineer."
    )
    h1 = f"Web Design &amp; Development in {name}, California"

    cards = [
        SHARED_CARDS[0],
        SHARED_CARDS[1],
        c["card_a"],
        c["card_b"],
        SHARED_CARDS[2],
        SHARED_CARDS[3],
    ]
    faqs = c["faq"]

    body = f"""      <section class="location-hero">
        <div class="container">
          <nav class="location-breadcrumbs" aria-label="Breadcrumb">
            <a href="index.html">Home</a><span class="sep">›</span><a href="website-development.html">Web Development</a><span class="sep">›</span><span aria-current="page">{name}</span>
          </nav>
          <h1>{h1}</h1>
          <p class="lead">{c['lead']}</p>
          <div class="location-hero-ctas">
            <a href="https://calendly.com/ulises-ghosxt" target="_blank" rel="noopener noreferrer" class="location-btn location-btn-primary">
              <i class="fi fi-rs-calendar-day" aria-hidden="true"></i>
              Book a Free Consultation
            </a>
            <a href="tel:+18312040501" class="location-btn location-btn-secondary">
              <i class="fi fi-rs-phone-call" aria-hidden="true"></i>
              (831) 204-0501
            </a>
          </div>
          <p class="pricing-trust-callout"><a href="website-development.html">Websites from $1,800, published upfront — price your exact project with the instant calculator.</a></p>
        </div>
      </section>

      <section class="location-section">
        <div class="container">
          <h2>What we build</h2>
          <p>Every site is hand-coded and mobile-first, tuned to Google's Core Web Vitals, and delivered with the domain, hosting, and code in accounts you own.</p>
          <div class="services-grid">
{cards_html(cards)}
          </div>
        </div>
      </section>

      <section class="location-section">
        <div class="container">
          <h2>Websites for the {name} economy</h2>
          <p>{c['economy']}</p>
          <p>The pattern behind all of it: your customers decide from a phone, in seconds, based on how fast and clear your site is. That is an engineering problem before it is a design problem — and engineering is what we do. See the live work on our <a href="website-development.html">portfolio</a>, or read the <a href="blog/small-business-website-cost-2026.html">2026 pricing guide</a> for real numbers.</p>
        </div>
      </section>

      <section class="location-cta">
        <div class="container">
          <h2>Free website consultation for your {name} business</h2>
          <p>30 minutes with the engineer who would actually build your site. We review your current site (or your competitors', if you don't have one), run the speed and search checks live, and leave you a written plan with a real price — whether or not you hire us.</p>
          <a href="https://calendly.com/ulises-ghosxt" target="_blank" rel="noopener noreferrer" class="location-btn location-btn-primary">
            <i class="fi fi-rs-calendar-day" aria-hidden="true"></i>
            Book your free consultation
          </a>
        </div>
      </section>

      <section class="location-section">
        <div class="container">
          <h2>Already have a website?</h2>
          <p>Then the question is whether it's earning its keep. If it's slow on a phone, invisible in local search, or running on software nobody has updated in a year, it's quietly sending {name} customers to competitors — our guide to the <a href="blog/website-redesign-signs-small-business-2026.html">nine signs a website is costing you customers</a> walks through the checks you can run yourself in ten minutes. Where the foundation is sound we'll say so and quote a refresh, not a rebuild.</p>
        </div>
      </section>

      <section class="location-section">
        <div class="container">
          <h2>Local web design, backed by a real IT and security team</h2>
          <p>Most web designers disappear after launch; most IT providers don't build websites. We're both, which changes what you get: a site maintained by the same team that runs <a href="cybersecurity-{slug}.html">cybersecurity</a> and <a href="managed-it-services.html">managed IT</a> for {name} businesses — patched, monitored, backed up, and never the abandoned software that gets a business breached. Everything local lives on the <a href="{slug}.html">{name} IT services</a> hub.</p>
          <p>We also build websites for businesses in {nearby}, and remotely across California and the US — see the main <a href="website-development.html">web development</a> page for the portfolio, packages, and instant calculator.</p>
        </div>
      </section>

      <section class="location-section location-faq">
        <div class="container">
          <h2>FAQs about web design in {name}</h2>
{faq_details(faqs)}
        </div>
      </section>

      <section class="location-cta">
        <div class="container">
          <h2>Get your {name} business found</h2>
          <p>Book a free 30-minute consultation, or price your project yourself with the instant calculator. Either way, you get a real number and an honest read on what your business actually needs.</p>
          <a href="https://calendly.com/ulises-ghosxt" target="_blank" rel="noopener noreferrer" class="location-btn location-btn-primary">
            <i class="fi fi-rs-calendar-day" aria-hidden="true"></i>
            Book your free consultation
          </a>
          <a href="website-development.html" class="location-btn location-btn-secondary">
            <i class="fi fi-rs-calculator" aria-hidden="true"></i>
            Try the Instant Calculator
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
            "serviceType": "Web Design and Development",
            "name": "Web Design & Development in {name}",
            "url": "{url}",
            "description": {jstr(schema_desc)},
            "provider": {{ "@id": "https://ghosxt.com/#business" }},
            "areaServed": {{ "@type": "City", "name": "{name}", "containedInPlace": {{ "@type": "AdministrativeArea", "name": "{admin}" }} }}
          }},
          {{
            "@type": "BreadcrumbList",
            "itemListElement": [
              {{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ghosxt.com/" }},
              {{ "@type": "ListItem", "position": 2, "name": "Web Development", "item": "https://ghosxt.com/website-development.html" }},
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

    page = f"""<!doctype html>
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
    return page_slug, page


def main():
    force = "--force" in sys.argv
    chrome = extract_chrome()

    written = []
    skipped = []
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
