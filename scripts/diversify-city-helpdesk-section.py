#!/usr/bin/env python3
"""Replace the templated "IT Support & Help Desk in <City>" section on each
city hub page with genuinely distinct copy, grounded in the same local
details already established elsewhere on that page (its "Why <City>
businesses pick Ghosxt" and "Common IT challenges" sections) — not new
claims, just de-duplicated wording so the section stops reading as a
find-and-replace of the city name across 12 pages.

salinas.html already has fully bespoke copy for this section under a
different heading and isn't touched.

Run from the repo root:

    python3 scripts/diversify-city-helpdesk-section.py

Idempotent: skips a page if its current text doesn't match the known old
template (i.e. it's already been diversified or was hand-edited).
"""

import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

OLD_TEMPLATE_P1 = (
    'When something breaks in your {name} office, what your team wants is a person who picks up and fixes it '
    '&mdash; not a ticket number and a callback tomorrow. Our <a href="help-desk-it-support.html">IT help desk</a> '
    'gives {name} businesses live, US-based support by phone, email, or client portal, with most issues resolved '
    'remotely the same hour and on-site help across {name} when hardware, a network drop, or a new-hire setup '
    'needs hands on site.'
)
OLD_TEMPLATE_P2 = (
    'Day to day that means fast fixes for Microsoft 365 and Outlook, password and account lockouts, printers, '
    'Wi-Fi and VPN, and slow or failing computers &mdash; the everyday {name} IT support that quietly costs a '
    'small business hours when there is no one to call. It is included in every '
    '<a href="managed-it-services.html">managed IT</a> plan, so the same team that prevents problems is the one '
    'you reach when you have one.'
)

# slug -> (display name, new paragraph 1, new paragraph 2)
CITIES = {
    "carmel": (
        "Carmel",
        'A gallery on Ocean Avenue or a Carmel Valley brokerage cannot put a client on hold while a ticket sits in a queue. Our <a href="help-desk-it-support.html">IT help desk</a> answers live &mdash; phone, email, or client portal &mdash; and most issues are resolved remotely within the hour. When a POS terminal, a network drop, or a new hire\'s laptop needs hands on-site, we\'re there quietly and on your schedule, not a stranger\'s.',
        'Most days that\'s Microsoft 365 and Outlook trouble, a locked account, a stalled Wi-Fi connection, or a machine that\'s slowed to a crawl &mdash; the small stuff that eats an afternoon when there\'s no one to call. It\'s included in every <a href="managed-it-services.html">managed IT</a> plan, so the same engineer who keeps your systems documented and monitored is the one who answers when something goes wrong.',
    ),
    "gilroy": (
        "Gilroy",
        'A warehouse or distribution office off the 101/152 corridor loses money every hour a system is down, so our <a href="help-desk-it-support.html">IT help desk</a> is built for speed: live phone, email, or client-portal support, most issues fixed remotely within the hour, and on-site help across Gilroy when a dispatch terminal, a network drop, or a new hire\'s setup needs hands on the floor.',
        'Day to day, that\'s Microsoft 365 and Outlook problems, locked accounts, printers, Wi-Fi and VPN drops, and machines that have slowed to a crawl &mdash; the routine stuff that costs a logistics or food-processing business real hours during the seasonal rush around the outlets. It\'s included in every <a href="managed-it-services.html">managed IT</a> plan, so support and prevention come from the same team.',
    ),
    "hollister": (
        "Hollister",
        'A machine shop or family business in Hollister does not want a ticket number &mdash; they want someone who picks up. Our <a href="help-desk-it-support.html">IT help desk</a> gives Hollister businesses live phone, email, and client-portal support, most issues resolved remotely the same hour, and on-site help right next door when hardware or a new-hire setup needs it.',
        'Most of what we fix day to day is ordinary: Microsoft 365 and Outlook hiccups, locked accounts, printers, Wi-Fi and VPN trouble, and computers that have slowed down &mdash; the stuff that quietly costs a small shop hours when there is no one local to call. It comes with every <a href="managed-it-services.html">managed IT</a> plan, so prevention and support are the same team, not a hand-off.',
    ),
    "king-city": (
        "King City",
        'South County has long been the part of Monterey County most IT providers won\'t bother driving to. Our <a href="help-desk-it-support.html">IT help desk</a> gives King City businesses live phone, email, and client-portal support, most issues resolved remotely the same hour, and genuine on-site response &mdash; it\'s a regular stop on our route up the valley from Salinas, not a special trip.',
        'Day to day, that covers Microsoft 365 and Outlook problems, locked accounts, printers, Wi-Fi and VPN drops, and slow computers &mdash; the everyday support that a grower, rancher, or clinic loses hours to when no one local answers the phone. It\'s included in every <a href="managed-it-services.html">managed IT</a> plan, so the same engineer who understands valley connectivity and ag seasonality is the one you reach.',
    ),
    "marina": (
        "Marina",
        'A growing Marina business adds new hires, new hardware, and new accounts faster than most IT setups can keep up with. Our <a href="help-desk-it-support.html">IT help desk</a> gives Marina teams live phone, email, and client-portal support, most issues resolved remotely the same hour, and on-site help that\'s a five-minute drive when a new-hire laptop or a network drop needs hands on it.',
        'Day to day that\'s Microsoft 365 and Outlook trouble, locked accounts, printers, Wi-Fi and VPN drops, and machines that have slowed to a crawl &mdash; the routine friction that costs a scaling team real hours. It\'s included in every <a href="managed-it-services.html">managed IT</a> plan, so support scales with you instead of becoming something to rebuild at 50 employees.',
    ),
    "monterey": (
        "Monterey",
        'Bandwidth gaps out toward Pebble Beach and salt air that eats cheap network gear mean Monterey businesses need support that already knows the terrain. Our <a href="help-desk-it-support.html">IT help desk</a> gives live phone, email, and client-portal support, most issues resolved remotely the same hour, and on-site help across Monterey when hardware or connectivity needs hands on it.',
        'Most days that\'s Microsoft 365 and Outlook issues, locked accounts, printers, Wi-Fi and VPN drops, and slow computers &mdash; ordinary problems that turn into real downtime once seasonal tourist traffic strains local bandwidth. It\'s included in every <a href="managed-it-services.html">managed IT</a> plan, so the engineer who designed around Monterey\'s infrastructure quirks is the one who answers.',
    ),
    "pacific-grove": (
        "Pacific Grove",
        'Salt air kills cheap network gear and a bad weekend of guest Wi-Fi can dent reviews for months, so PG businesses need a help desk that catches problems before guests notice. Our <a href="help-desk-it-support.html">IT help desk</a> gives live phone, email, and client-portal support, most issues resolved remotely the same hour, and on-site help across Pacific Grove when hardware needs attention.',
        'Day to day that\'s Microsoft 365 and Outlook trouble, locked accounts, printers, Wi-Fi and VPN drops, and slow computers &mdash; small stuff that costs an inn or boutique real hours during a busy season. It\'s included in every <a href="managed-it-services.html">managed IT</a> plan, so the same team watching your network is the one you reach when something breaks.',
    ),
    "san-jose": (
        "San Jose",
        'A 10-person professional services firm or a 25-person startup in San Jose gets the same hold-music treatment from South Bay MSPs sized for 200-seat companies. Our <a href="help-desk-it-support.html">IT help desk</a> gives live phone, email, and client-portal support, most issues resolved remotely the same hour, and on-site help across San Jose when hardware or a new-hire setup needs it.',
        'Day to day that covers Microsoft 365 and Outlook problems, locked accounts, printers, Wi-Fi and VPN drops, and slow computers &mdash; routine friction that costs a hybrid team real hours, especially mid-migration out of a downtown office. It\'s included in every <a href="managed-it-services.html">managed IT</a> plan, priced for how a small business actually budgets.',
    ),
    "santa-cruz": (
        "Santa Cruz",
        'Santa Cruz teams tend to know their way around technology, so our <a href="help-desk-it-support.html">IT help desk</a> doesn\'t waste your time with a script &mdash; live phone, email, or client-portal support, most issues resolved remotely the same hour, and on-site help across Santa Cruz, Westside, Aptos, and Scotts Valley when hardware needs hands on it.',
        'Most days that\'s Microsoft 365 and Outlook issues, locked accounts, printers, Wi-Fi and VPN drops, and slow computers &mdash; ordinary problems, worse in the bandwidth dead zones up in the hills. It\'s included in every <a href="managed-it-services.html">managed IT</a> plan, documented and explained in plain language, not jargon.',
    ),
    "seaside": (
        "Seaside",
        'Seaside\'s retail, restaurants, and auto shops have grown faster than the local IT options have kept up with. Our <a href="help-desk-it-support.html">IT help desk</a> gives live phone, email, and client-portal support, most issues resolved remotely the same hour, and on-site help across Seaside &mdash; a 10-minute drive, not a special trip.',
        'Day to day that\'s Microsoft 365 and Outlook trouble, locked accounts, printers, Wi-Fi and VPN drops, and slow computers &mdash; the everyday support a busy shop loses hours to when no one picks up. It\'s included in every <a href="managed-it-services.html">managed IT</a> plan, at pricing built for a business that watches every dollar.',
    ),
    "soledad": (
        "Soledad",
        'South County businesses are used to being skipped by IT providers that won\'t make the drive. Our <a href="help-desk-it-support.html">IT help desk</a> gives Soledad businesses live phone, email, and client-portal support, most issues resolved remotely the same hour, and on-site response &mdash; we\'re just up US-101 in Salinas, so it\'s routine, not exceptional.',
        'Day to day that\'s Microsoft 365 and Outlook problems, locked accounts, printers, Wi-Fi and VPN drops, and slow computers &mdash; the everyday friction that costs a grower or winery real hours when no one local answers. It\'s included in every <a href="managed-it-services.html">managed IT</a> plan, from an engineer who already understands valley connectivity and seasonal ag cycles.',
    ),
    "watsonville": (
        "Watsonville",
        'Ag and food-processing businesses in Watsonville run on tight seasonal timelines, so downtime during a labor surge or a packing run isn\'t an option. Our <a href="help-desk-it-support.html">IT help desk</a> gives live phone, email, and client-portal support, most issues resolved remotely the same hour, and on-site help across Watsonville when hardware needs attention.',
        'Most days that\'s Microsoft 365 and Outlook issues, locked accounts, printers, Wi-Fi and VPN drops, and slow computers &mdash; ordinary problems, compounded by fixed-wireless gaps out in the valley. It\'s included in every <a href="managed-it-services.html">managed IT</a> plan, built around the fast user-provisioning a seasonal workforce needs.',
    ),
}


# king-city.html and soledad.html say "on-site help across South County"
# instead of "...across <City>" in paragraph 1 — everything else matches.
REGION_OVERRIDE = {"king-city": "South County", "soledad": "South County"}


def main():
    changed, skipped = [], []
    for slug, (name, new_p1, new_p2) in CITIES.items():
        path = os.path.join(ROOT, f"{slug}.html")
        text = open(path, encoding="utf-8").read()
        region = REGION_OVERRIDE.get(slug, name)
        old_p1 = OLD_TEMPLATE_P1.format(name=name).replace(
            f"on-site help across {name} when", f"on-site help across {region} when"
        )
        old_p2 = OLD_TEMPLATE_P2.format(name=name)
        if old_p1 not in text or old_p2 not in text:
            skipped.append(slug)
            continue
        text = text.replace(old_p1, new_p1, 1)
        text = text.replace(old_p2, new_p2, 1)
        with open(path, "w", encoding="utf-8") as f:
            f.write(text)
        changed.append(slug)

    print(f"Diversified {len(changed)} pages: {', '.join(changed)}")
    if skipped:
        print(f"Skipped {len(skipped)} (template text not found, already changed?): {', '.join(skipped)}")


if __name__ == "__main__":
    main()
