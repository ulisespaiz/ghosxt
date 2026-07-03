#!/usr/bin/env python3
"""Insert a genuinely local "the <County> economy" section into each county
hub page, immediately before its FAQ section. The existing "What we do across
<County>" services-grid is identical across all 5 counties (fine — it's a
generic service list), but nothing on these pages previously cited real,
named local economic detail. This closes that gap with sourced facts only —
no invented landmarks or figures.

Idempotent: pages that already contain the section are skipped.

Run from the repo root:

    python3 scripts/insert-county-economy-section.py
"""

import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FAQ_ANCHOR = '      <section class="location-section location-faq">'
MARKER = "<!-- ghosxt:county-economy -->"

COUNTIES = {
    "monterey-county": {
        "name": "Monterey County",
        "html": """<p>Agriculture drives it: Monterey County is California's 4th-highest agricultural-producing county, with 2024 crop and livestock value of nearly $5 billion &mdash; the Salinas Valley alone supplies an estimated 61% of U.S. leaf lettuce and 57% of U.S. celery. That scale sits alongside an unusual concentration of federal institutions for a rural county: the Naval Postgraduate School and the Defense Language Institute in Monterey, and CSU Monterey Bay. Hospital systems Salinas Valley Health and Community Hospital of the Monterey Peninsula round out the county's largest employers outside of agriculture.</p>""",
    },
    "santa-cruz-county": {
        "name": "Santa Cruz County",
        "html": """<p>Santa Cruz County's economy is unusually concentrated: education, tourism/hospitality, healthcare, retail, and agriculture together account for 63% of the workforce, well above the statewide average. UC Santa Cruz anchors the education and research base &mdash; strong enough in genomics and marine science to have spun off private companies &mdash; and the county has real tech roots of its own: Looker, the data-analytics company later acquired by Google Cloud, grew up in downtown Santa Cruz. Coastal tourism and Watsonville-area agriculture add a seasonal rhythm the county's larger tech neighbors don't share.</p>""",
    },
    "san-benito-county": {
        "name": "San Benito County",
        "html": """<p>Agriculture remains San Benito County's traditional cornerstone &mdash; wine grapes, walnuts, almonds, and tomatoes among the major crops &mdash; but manufacturing has grown into the single largest employer category, with Taylor Farms and George Chiala Farms among the named anchors. Hazel Hawkins Memorial Hospital in Hollister is the county's only hospital system. San Benito has also led every California county in the pace of new housing construction over the past five years, driven in part by Santa Clara County workers seeking affordability &mdash; roughly 40% of San Benito's workforce commutes out to Santa Clara County for higher-wage tech jobs.</p>""",
    },
    "santa-clara-county": {
        "name": "Santa Clara County",
        "html": """<p>Santa Clara County is the core of Silicon Valley: the city of Santa Clara alone hosts Applied Materials, Intel, Nvidia, Oracle, and Ericsson, and the broader county's tech employer list reads like the Bay Area's top 20. Stanford Health Care and Santa Clara Valley Healthcare anchor the medical system. That density of intellectual property and customer data makes the county's businesses a specifically attractive target for attackers &mdash; a different risk profile than the county's more agricultural or tourism-driven neighbors, and one that calls for security built to the same standard the county's own tech employers expect.</p>""",
    },
    "san-luis-obispo-county": {
        "name": "San Luis Obispo County",
        "html": """<p>Agriculture is San Luis Obispo County's largest driver at over $700 million annually, led by wine grapes &mdash; the county is California's third-largest wine producer, behind only Sonoma and Napa &mdash; with tourism close behind, employing nearly a fifth of the county's workforce. Cal Poly San Luis Obispo's "Learn by Doing" model feeds the region's growers, winemakers, and increasingly its aerospace and engineering employers. The county also carries an economic profile none of its neighbors share: Diablo Canyon Power Plant is the county's second-largest employer, injecting roughly $1.1 billion a year into the California economy.</p>""",
    },
}


def main():
    changed, skipped = [], []
    for slug, data in COUNTIES.items():
        path = os.path.join(ROOT, f"{slug}.html")
        t = open(path, encoding="utf-8").read()
        if MARKER in t:
            skipped.append(slug)
            continue
        if FAQ_ANCHOR not in t:
            print(f"!! anchor not found in {slug}.html — skipping")
            skipped.append(slug)
            continue
        section = (
            '      <section class="location-section">\n'
            f'        {MARKER}\n'
            '        <div class="container">\n'
            f'          <h2>The {data["name"]} economy</h2>\n'
            f'          {data["html"]}\n'
            '        </div>\n'
            '      </section>\n'
        )
        new = t.replace(FAQ_ANCHOR, section + FAQ_ANCHOR, 1)
        open(path, "w", encoding="utf-8").write(new)
        changed.append(slug)

    print(f"Inserted county-economy section into {len(changed)} pages: {', '.join(changed)}")
    if skipped:
        print(f"Skipped {len(skipped)}: {', '.join(skipped)}")


if __name__ == "__main__":
    main()
