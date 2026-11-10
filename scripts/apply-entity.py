#!/usr/bin/env python3
"""Keep the JSON-LD business entity identical on every page, from one source.

Source of truth (see scripts/_entity.py): the #business node in contact.html for name,
url, image, telephone, email and address; the visible footer "Service Areas" list in
scripts/_chrome_source.html for areaServed. To change a fact, edit that source and run
this script with --apply. Do not hand-patch the entity on individual pages.

Steps (--only, comma separated):
  entity         every LocalBusiness node gets the canonical managed fields (image and
                 ContactPoint telephone/email are synced where already present); root
                 indexable pages with no LocalBusiness/Organization node get the
                 canonical node as the first @graph element
  provider       every Service node gets "provider": {"@id": ".../#business"}; other
                 per-page "#business" references are retargeted to the one global @id
  search-action  WebSite.potentialAction of type SearchAction is removed (no site search)
  breadcrumbs    BreadcrumbList is added on the pages listed in _entity.BREADCRUMB_EXTRA
  faq            opt-in (CLAUDE.md rule 8): a FAQPage Question whose name is in the visible
                 text is kept; one that matches only after folding quote style and case is
                 renamed to the visible wording (name value only); any other is dropped, and
                 a FAQPage left with no Question is dropped. acceptedAnswer is never touched

Default is the first four. JSON-LD is never re-serialised: only the touched values are
spliced, and four gates run before any write (every block parses; the parsed result
equals the same edit applied to the parsed data; the page text with the ld+json bodies
blanked is byte-identical; a second pass is a no-op).

    python3 scripts/apply-entity.py                       # dry run, per-page summary
    python3 scripts/apply-entity.py --apply               # write
    python3 scripts/apply-entity.py --check               # exit 1 if any page would change (CI)
    python3 scripts/apply-entity.py --diff                # unified diff, no write
    python3 scripts/apply-entity.py --only entity,faq     # choose steps
    python3 scripts/apply-entity.py --files a.html b.html # restrict scope
    python3 scripts/apply-entity.py --root DIR            # run on a copy (tests)

--check also asserts llms.txt carries the display phone and email of the canonical node
and no other phone or email pattern. It never edits llms.txt.
"""

import argparse
import difflib
import html
import json
import os
import re
import sys
from html.parser import HTMLParser

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import _entity as E  # noqa: E402

ALL_STEPS = ["entity", "provider", "search-action", "breadcrumbs", "faq"]
DEFAULT_STEPS = ["entity", "provider", "search-action", "breadcrumbs"]


def pages(root):
    for d in ("", "blog", "case-studies"):
        p = os.path.join(root, d)
        if not os.path.isdir(p):
            continue
        for f in sorted(os.listdir(p)):
            if f.endswith(".html"):
                yield os.path.join(d, f) if d else f


def read(path):
    with open(path, encoding="utf-8", newline="") as fh:
        return fh.read()


def blank(text):
    return E.BLOCK_RE.sub(lambda m: m.group(1) + m.group(3), text)


def is_indexable(text):
    m = re.search(r'<meta name="robots" content="([^"]*)"', text)
    return not (m and "noindex" in m.group(1))


# ------------------------------------------------------------- visible text (faq)
class _Visible(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.skip = 0
        self.in_body = False
        self.out = []

    def handle_starttag(self, tag, attrs):
        if tag == "body":
            self.in_body = True
        if tag in ("script", "style"):
            self.skip += 1

    def handle_endtag(self, tag):
        if tag in ("script", "style"):
            self.skip -= 1

    def handle_data(self, data):
        if self.in_body and not self.skip:
            self.out.append(data)


def norm(s):
    return re.sub(r"\s+", " ", s).strip()


_QUOTES = {c: "'" for c in "'\"\u2018\u2019\u201c\u201d"}


def fold(s):
    """Quote-style and case fold, one output character per input character."""
    out = []
    for c in s:
        c = _QUOTES.get(c, c)
        low = c.lower()
        out.append(low if len(low) == 1 else c)
    return "".join(out)


# (page, action, old name, new name) for each Question the faq step changed on its first pass
FAQ_LOG = []


def visible_text(text):
    p = _Visible()
    p.feed(text)
    return norm("".join(p.out))


# ------------------------------------------------------------------- per page
def transform(rel, text, canon, steps, verify=True):
    """Return (new_text, notes, warnings). notes: {step: count}."""
    ed = E.Editor(text)
    notes = {}
    warnings = []

    def note(step, n=1):
        notes[step] = notes.get(step, 0) + n

    matches = list(E.BLOCK_RE.finditer(text))
    trees, datas = [], []
    for i, m in enumerate(matches):
        trees.append(E.scan(text, m.start(2), (), i))
        datas.append(json.loads(m.group(2)))

    dead = []  # spans replaced wholesale; nothing inside them is edited again

    def is_dead(n):
        return any(a <= n["s"] < b for a, b in dead)

    all_nodes = [n for t in trees for n in E.walk(t) if n["k"] == "obj"]

    # provider first: it can replace an inline Organization, which must not count as a business node
    if "provider" in steps:
        ed.step = "provider"
        for n in all_nodes:
            if is_dead(n):
                continue
            ty = E.types(text, n)
            if "Service" in ty:
                ks, pv = E.member(n, "provider")
                if pv is None:
                    ed.add(n, "provider", {"@id": E.BID})
                    note("provider")
                elif E.value(text, pv) != {"@id": E.BID}:
                    ed.replace(pv, {"@id": E.BID}, E.line_indent(text, ks))
                    dead.append((pv["s"], pv["e"]))
                    note("provider")
        for n in all_nodes:
            if is_dead(n):
                continue
            is_service = "Service" in E.types(text, n)
            for ks, k, v in n["m"]:
                if is_service and k == "provider":
                    continue
                if v["k"] == "obj" and len(v["m"]) == 1 and v["m"][0][1] == "@id":
                    ref = E.value(text, v)["@id"]
                    if isinstance(ref, str) and ref.endswith("#business") and ref != E.BID:
                        ed.replace(v, {"@id": E.BID}, E.line_indent(text, ks))
                        dead.append((v["s"], v["e"]))
                        note("provider")

    if "entity" in steps:
        ed.step = "entity"
        has_biz = False
        for n in all_nodes:
            ty = E.types(text, n)
            if "LocalBusiness" in ty and not is_dead(n):
                has_biz = True
                changed = False
                for key in E.MANAGED:
                    changed = ed.set(n, key, canon[key]) or changed
                for key in E.SYNC_IF_PRESENT_LB:
                    if E.member(n, key)[1] is not None:
                        changed = ed.set(n, key, canon[key]) or changed
                if changed:
                    note("entity")
            elif "Organization" in ty and not is_dead(n):
                has_biz = True
        for n in all_nodes:
            if "ContactPoint" in E.types(text, n) and not is_dead(n):
                changed = False
                for key in E.SYNC_IF_PRESENT_CONTACT:
                    if E.member(n, key)[1] is not None:
                        changed = ed.set(n, key, canon[key]) or changed
                if changed:
                    note("entity")
        # A noindex root page still gets the node when it already points at it, so no
        # "#business" reference is left dangling.
        refs_biz = any(E.BID in m.group(2) for m in matches)
        if "/" not in rel and (is_indexable(text) or refs_biz) and not has_biz and trees:
            for t in trees:
                g = E.member(t, "@graph")[1] if t["k"] == "obj" else None
                if g is not None and g["k"] == "arr" and g["items"]:
                    ed.insert_first(g, canon)
                    note("entity")
                    break
            else:
                warnings.append("no @graph block to receive the business node")

    if "search-action" in steps:
        ed.step = "search-action"
        for n in all_nodes:
            if "WebSite" in E.types(text, n) and not is_dead(n):
                ks, pa = E.member(n, "potentialAction")
                if pa is not None and "SearchAction" in E.types(text, pa):
                    ed.drop_member(n, "potentialAction")
                    note("search-action")

    if "breadcrumbs" in steps and rel in E.BREADCRUMB_EXTRA:
        ed.step = "breadcrumbs"
        has_bc = any("BreadcrumbList" in E.types(text, n) for n in all_nodes)
        if not has_bc and trees:
            crumbs = E.BREADCRUMB_EXTRA[rel]
            target = None
            cut = text.find(E.MARKER)
            for t in trees:
                g = E.member(t, "@graph")[1] if t["k"] == "obj" else None
                if g is not None and g["k"] == "arr" and g["items"] and (cut < 0 or t["s"] < cut):
                    target = ("graph", g)
                    break
            if target is None:
                # Bare-object blocks: attach to the page node as schema.org WebPage.breadcrumb,
                # so no script tag is added outside an existing JSON-LD body.
                for t in trees:
                    if t["k"] == "obj" and t["m"] and (cut < 0 or t["s"] < cut) and any(
                        x.endswith("Page") for x in E.types(text, t)
                    ):
                        target = ("page", t)
                        break
            if target is None:
                warnings.append("no block can receive a BreadcrumbList")
            elif target[0] == "graph":
                g = target[1]
                ind = E.line_indent(text, g["items"][-1]["s"])
                ed.append_item(g, E.breadcrumb_node(crumbs), E.breadcrumb_text(crumbs, ind))
                note("breadcrumbs")
            else:
                t = target[1]
                ind = E.line_indent(text, t["m"][-1][0])
                ed.add(t, "breadcrumb", E.breadcrumb_node(crumbs), E.breadcrumb_text(crumbs, ind))
                note("breadcrumbs")

    if "faq" in steps:
        ed.step = "faq"
        vis = None
        for n in all_nodes:
            if "FAQPage" not in E.types(text, n) or is_dead(n):
                continue
            _, me = E.member(n, "mainEntity")
            if me is None or me["k"] != "arr" or not me["items"]:
                continue
            if vis is None:
                vis = visible_text(text)
            drops = []
            renames = []
            fvis = fold(vis)
            for i, q in enumerate(me["items"]):
                qv = E.value(text, q)
                if not isinstance(qv, dict) or not isinstance(qv.get("name"), str):
                    continue  # not a plain Question object: leave it alone
                name = norm(html.unescape(qv["name"]))
                if name in vis:
                    continue
                at = fvis.find(fold(name)) if name else -1
                if at >= 0:
                    renames.append((i, q, vis[at:at + len(name)], qv["name"]))
                else:
                    drops.append(i)
            for i, q, wording, old_name in renames:
                ed.set(q, "name", wording)
                note("faq-renamed")
                FAQ_LOG.append((rel, "renamed", old_name, wording))
            if not drops:
                continue
            if len(drops) < len(me["items"]):
                ed.drop_items(me, drops)
                note("faq", len(drops))
                for i in drops:
                    FAQ_LOG.append((rel, "dropped", E.value(text, me["items"][i])["name"], None))
                continue
            # no Question survives: drop the whole FAQPage node
            holder = None
            for t in trees:
                g = E.member(t, "@graph")[1] if t["k"] == "obj" else None
                if g is not None and g["k"] == "arr" and any(it is n for it in g["items"]):
                    holder = g
                    break
            if holder is not None and len(holder["items"]) > 1:
                ed.drop_items(holder, [holder["items"].index(n)])
                note("faq", len(drops))
                for i in drops:
                    FAQ_LOG.append((rel, "dropped", E.value(text, me["items"][i])["name"], None))
            else:
                warnings.append("FAQPage has no visible Question and cannot be dropped without removing its script tag")

    if not ed.splices and not ed.adds:
        return text, notes, warnings

    new = ed.result()
    if not verify:
        return new, notes, warnings
    # gate (a) every block parses
    new_matches = list(E.BLOCK_RE.finditer(new))
    if len(new_matches) != len(matches):
        raise E.EntityError("%s: block count changed" % rel)
    new_datas = [json.loads(m.group(2)) for m in new_matches]
    # gate (b) parsed result equals the edit applied to the parsed data
    if new_datas != E.expected_data(datas, ed.ops):
        raise E.EntityError("%s: parsed result differs from the intended edit" % rel)
    # gate (c) nothing outside the ld+json bodies moved
    if blank(new) != blank(text):
        raise E.EntityError("%s: text outside JSON-LD bodies changed" % rel)
    # gate (d) idempotent
    again, _, _ = transform(rel, new, canon, steps, verify=False)
    if again != new:
        raise E.EntityError("%s: second pass is not a no-op" % rel)
    return new, notes, warnings


def nap_problems(root, canon):
    """llms.txt must carry the display phone and email and no other phone or email."""
    path = os.path.join(root, "llms.txt")
    if not os.path.exists(path):
        return []
    t = read(path)
    phone = E.display_phone(canon)
    digits = re.sub(r"\D", "", phone)
    out = []
    if phone not in t:
        out.append("llms.txt does not contain %s" % phone)
    if canon["email"] not in t:
        out.append("llms.txt does not contain %s" % canon["email"])
    for m in re.finditer(r"\(?\b\d{3}\)?[ .-]\d{3}[ .-]\d{4}\b", t):
        if re.sub(r"\D", "", m.group()) != digits:
            out.append("llms.txt has another phone number: %s" % m.group())
    for m in re.finditer(r"[\w.+-]+@[\w-]+(?:\.[\w-]+)+", t):
        if m.group().lower() != canon["email"].lower():
            out.append("llms.txt has another email: %s" % m.group())
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--apply", action="store_true", help="write changes")
    ap.add_argument("--check", action="store_true", help="exit 1 if any page would change")
    ap.add_argument("--diff", action="store_true", help="print a unified diff, write nothing")
    ap.add_argument("--only", default=",".join(DEFAULT_STEPS), help="steps: " + ",".join(ALL_STEPS))
    ap.add_argument("--files", nargs="+", help="restrict to these pages (relative to --root)")
    ap.add_argument("--root", default=E.ROOT, help="repo root (default: this repo)")
    args = ap.parse_args()

    steps = [s.strip() for s in args.only.split(",") if s.strip()]
    bad = [s for s in steps if s not in ALL_STEPS]
    if bad:
        ap.error("unknown step(s): " + ", ".join(bad))
    root = os.path.abspath(args.root)
    try:
        canon = E.load_canonical(root)
    except E.EntityError as exc:
        print("ERROR: %s" % exc, file=sys.stderr)
        return 2

    if args.files:
        rels = []
        for f in args.files:
            f = os.path.relpath(os.path.abspath(os.path.join(root, f)), root)
            rels.append(f)
    else:
        rels = list(pages(root))

    changed = []
    failed = False
    for rel in rels:
        path = os.path.join(root, rel)
        text = read(path)
        try:
            new, notes, warnings = transform(rel, text, canon, steps)
        except (E.EntityError, ValueError, KeyError, IndexError, TypeError, AttributeError) as exc:
            print("ERROR %s: %s" % (rel, exc), file=sys.stderr)
            failed = True
            continue
        for w in warnings:
            print("WARN %s: %s" % (rel, w), file=sys.stderr)
        if new == text:
            continue
        changed.append(rel)
        if args.diff:
            sys.stdout.writelines(difflib.unified_diff(
                text.splitlines(True), new.splitlines(True), "a/" + rel, "b/" + rel))
        else:
            print("%s: %s" % (rel, ", ".join("%s %d" % kv for kv in sorted(notes.items()))))
        if args.apply:
            with open(path, "w", encoding="utf-8", newline="") as fh:
                fh.write(new)

    problems = nap_problems(root, canon) if args.check else []
    for p in problems:
        print("NAP: %s" % p)

    fix = "python3 scripts/apply-entity.py --apply"
    if args.only != ",".join(DEFAULT_STEPS):
        fix += " --only " + args.only
    verb = "changed" if args.apply else "would change"
    print("%d page(s) %s" % (len(changed), verb))
    if args.check:
        if changed:
            print("Fix: %s" % fix)
        return 1 if (changed or problems or failed) else 0
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
