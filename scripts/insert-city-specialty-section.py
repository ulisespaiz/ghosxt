#!/usr/bin/env python3
"""Insert a localized "IT services by specialty in <City>" cross-link section into
each city page, immediately before its FAQ section.

This wires every city page to its service x city combo pages (cybersecurity-<slug>,
cloud-services-<slug>) plus the core service pages with descriptive, city-named anchor
text — the internal-linking signal these pages were missing. Idempotent: pages that
already contain the section are skipped.

Run from the repo root:

    python3 scripts/insert-city-specialty-section.py
"""

import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# slug -> display name
CITIES = {
    "carmel": "Carmel",
    "gilroy": "Gilroy",
    "hollister": "Hollister",
    "king-city": "King City",
    "marina": "Marina",
    "monterey": "Monterey",
    "pacific-grove": "Pacific Grove",
    "salinas": "Salinas",
    "san-jose": "San Jose",
    "santa-cruz": "Santa Cruz",
    "seaside": "Seaside",
    "soledad": "Soledad",
    "watsonville": "Watsonville",
}

FAQ_ANCHOR = '      <section class="location-section location-faq">'
MARKER = "<!-- ghosxt:specialty-grid -->"


def section_html(slug, name):
    return f"""      <section class="location-section">
        {MARKER}
        <div class="container">
          <h2>{name} IT services by specialty</h2>
          <p>Need a specific service in {name}? Go straight to the detail page for the work you have in mind. Each is delivered locally — on-site across the area and remotely nationwide — and runs on the same managed foundation with one cleared engineer behind it.</p>
          <div class="services-grid">
            <article class="service-card"><h3>Cybersecurity in {name}</h3><p>Endpoint detection and response, phishing-resistant MFA, immutable backup, and 24/7 monitoring — government-grade, sized for a {name} small business.</p><a href="cybersecurity-{slug}.html">{name} cybersecurity</a></article>
            <article class="service-card"><h3>Cloud &amp; Microsoft 365 in {name}</h3><p>Microsoft 365 setup and hardening, no-downtime email and file migrations, SharePoint, Teams, and Azure for {name} businesses.</p><a href="cloud-services-{slug}.html">{name} cloud &amp; Microsoft 365</a></article>
            <article class="service-card"><h3>Managed IT</h3><p>Monitoring, patching, and a real cleared engineer who answers the phone — the foundation every other service sits on.</p><a href="managed-it-services.html">Managed IT services</a></article>
            <article class="service-card"><h3>IT Help Desk &amp; Support</h3><p>Live, US-based help desk for your {name} team, with most issues fixed remotely the same hour and on-site help when hardware needs hands.</p><a href="help-desk-it-support.html">IT help desk &amp; support</a></article>
            <article class="service-card"><h3>Backup &amp; Disaster Recovery</h3><p>Immutable, tested backups and a real recovery plan, so an outage or ransomware hit is a bad day, not a closed business.</p><a href="backup-disaster-recovery.html">Backup &amp; disaster recovery</a></article>
            <article class="service-card"><h3>Network Design</h3><p>Wired and wireless networks, firewalls, and segmentation built to be secure and reliable from day one.</p><a href="network-design.html">Network design</a></article>
          </div>
        </div>
      </section>
"""


def main():
    changed, skipped = [], []
    for slug, name in CITIES.items():
        path = os.path.join(ROOT, f"{slug}.html")
        t = open(path, encoding="utf-8").read()
        if MARKER in t:
            skipped.append(slug)
            continue
        if FAQ_ANCHOR not in t:
            print(f"!! anchor not found in {slug}.html — skipping")
            skipped.append(slug)
            continue
        new = t.replace(FAQ_ANCHOR, section_html(slug, name) + FAQ_ANCHOR, 1)
        open(path, "w", encoding="utf-8").write(new)
        changed.append(slug)

    print(f"Inserted specialty section into {len(changed)} pages: {', '.join(changed)}")
    if skipped:
        print(f"Skipped {len(skipped)}: {', '.join(skipped)}")


if __name__ == "__main__":
    main()
