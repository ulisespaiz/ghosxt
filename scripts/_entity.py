"""Single-source business entity for the JSON-LD on every page.

Source of truth (no second copy of these facts exists anywhere):

* name, url, image, telephone, email, address: the one LocalBusiness node with
  "@id": "https://ghosxt.com/#business" in contact.html (the NAP page, see
  CLAUDE.md rule 10). image is written on inserted nodes and kept in sync on existing
  nodes that already carry one; telephone and email are also kept in sync on every
  ContactPoint node that already carries them.
* areaServed: the visible footer "Service Areas" list
  (<div class="service-areas-footer"><ul>...) in scripts/_chrome_source.html, one
  City per list item, in footer order.

To change a fact: edit the source above (contact.html JSON-LD, or the footer list in
_chrome_source.html, then apply-chrome.py for the visible footer), then run

    python3 scripts/apply-entity.py --apply

Do not hand-patch the business node, a Service provider, or any LocalBusiness field on
individual pages: the next apply-entity run (and CI, via --check) overwrites or flags it.

Nothing here ever re-serialises a JSON-LD block. `scan` records the character span of
every JSON value, the edit helpers collect (start, end, replacement) splices, and
`Editor.result` applies them right to left, so every byte outside a touched value stays
identical. `apply-entity.py` verifies that before it writes.

Standard library only.
"""

import json
import os
import re
from html.parser import HTMLParser
from json.decoder import scanstring

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BID = "https://ghosxt.com/#business"
HOME = "https://ghosxt.com/"

BLOCK_RE = re.compile(r'(<script type="application/ld\+json">)(.*?)(</script>)', re.S)
MARKER = "<!-- ghosxt:cf-web-analytics -->"
MANAGED = ["@id", "name", "url", "telephone", "email", "address", "areaServed"]
# Synced only where the key already exists (never added to a node that lacks it): the
# LocalBusiness image, and telephone/email on any ContactPoint.
SYNC_IF_PRESENT_LB = ["image"]
SYNC_IF_PRESENT_CONTACT = ["telephone", "email"]

# Pages with no BreadcrumbList of their own. Names are copied from the visible navbar
# or dropdown label (Home, Services dropdown), nothing else is claimed.
# (file, [(name, url), ...]); the last crumb is the page itself.
BREADCRUMB_EXTRA = {
    "about.html": [("Home", HOME), ("About", "https://ghosxt.com/about")],
    "contact.html": [("Home", HOME), ("Contact", "https://ghosxt.com/contact")],
    "pricing.html": [("Home", HOME), ("Pricing", "https://ghosxt.com/pricing")],
    "ctpat.html": [
        ("Home", HOME),
        ("Services", "https://ghosxt.com/services"),
        ("C-TPAT Compliance", "https://ghosxt.com/ctpat"),
    ],
    "website-development.html": [
        ("Home", HOME),
        ("Services", "https://ghosxt.com/services"),
        ("Web Development", "https://ghosxt.com/website-development"),
    ],
}


class EntityError(Exception):
    """The source of truth is missing or ambiguous."""


# ---------------------------------------------------------------- span scanner
_WS = re.compile(r"[ \t\r\n]*")
_LIT = re.compile(r"-?\d+(\.\d+)?([eE][-+]?\d+)?|true|false|null")


def scan(s, i=0, path=(), blk=0):
    """Parse the JSON value starting at or after s[i]; return a span tree.

    Node dicts: {k: obj|arr|str|lit, s, e, path, blk} plus m [(key_start, key, node)]
    for objects, items [node] for arrays, v for scalars. s/e index into `s`.
    """
    i = _WS.match(s, i).end()
    c = s[i]
    if c == "{":
        node = {"k": "obj", "s": i, "m": [], "path": path, "blk": blk}
        i = _WS.match(s, i + 1).end()
        if s[i] == "}":
            node["e"] = i + 1
            return node
        while True:
            i = _WS.match(s, i).end()
            ks = i
            key, i = scanstring(s, i + 1)
            i = _WS.match(s, i).end()
            if s[i] != ":":
                raise ValueError("expected ':' at %d" % i)
            v = scan(s, i + 1, path + (key,), blk)
            node["m"].append((ks, key, v))
            i = _WS.match(s, v["e"]).end()
            if s[i] == ",":
                i += 1
                continue
            if s[i] != "}":
                raise ValueError("expected '}' at %d" % i)
            node["e"] = i + 1
            return node
    if c == "[":
        node = {"k": "arr", "s": i, "items": [], "path": path, "blk": blk}
        i = _WS.match(s, i + 1).end()
        if s[i] == "]":
            node["e"] = i + 1
            return node
        while True:
            v = scan(s, i, path + (len(node["items"]),), blk)
            node["items"].append(v)
            i = _WS.match(s, v["e"]).end()
            if s[i] == ",":
                i += 1
                continue
            if s[i] != "]":
                raise ValueError("expected ']' at %d" % i)
            node["e"] = i + 1
            return node
    if c == '"':
        val, e = scanstring(s, i + 1)
        return {"k": "str", "s": i, "e": e, "v": val, "path": path, "blk": blk}
    m = _LIT.match(s, i)
    if not m:
        raise ValueError("bad JSON value at %d" % i)
    return {"k": "lit", "s": i, "e": m.end(), "v": json.loads(m.group()), "path": path, "blk": blk}


def value(s, n):
    return json.loads(s[n["s"]:n["e"]])


def member(n, key):
    """(key_start, value_node) of an object member, or (None, None)."""
    for ks, k, v in n.get("m", []):
        if k == key:
            return ks, v
    return None, None


def types(s, n):
    _, t = member(n, "@type")
    if t is None:
        return []
    v = value(s, t)
    return v if isinstance(v, list) else [v]


def walk(n):
    yield n
    for _, _, v in n.get("m", []):
        yield from walk(v)
    for v in n.get("items", []):
        yield from walk(v)


# ------------------------------------------------------------------- rendering
def inline(v):
    """Generator/hub-page style: spaces inside braces and brackets, one line."""
    if isinstance(v, dict):
        if not v:
            return "{}"
        return "{ " + ", ".join(json.dumps(k, ensure_ascii=False) + ": " + inline(x) for k, x in v.items()) + " }"
    if isinstance(v, list):
        if not v:
            return "[]"
        return "[ " + ", ".join(inline(x) for x in v) + " ]"
    return json.dumps(v, ensure_ascii=False)


def line_indent(s, i):
    ls = s.rfind("\n", 0, i) + 1
    return s[ls:_WS.match(s, ls).end()].replace("\n", "")


def rows(v, ind):
    """List of values, one inline item per row, brackets on their own lines."""
    return "[\n" + ",\n".join(ind + "  " + inline(x) for x in v) + "\n" + ind + "]"


def block(v, ind):
    return json.dumps(v, indent=2, ensure_ascii=False).replace("\n", "\n" + ind)


def render_like(s, old, v, ind):
    """Render v where `old` (a span node) used to be, matching its line shape."""
    multiline = "\n" in s[old["s"]:old["e"]]
    if multiline and isinstance(v, list) and v:
        return rows(v, ind)
    if multiline and isinstance(v, dict):
        return block(v, ind)
    return inline(v)


def breadcrumb_node(crumbs):
    return {
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": n, "name": name, "item": url}
            for n, (name, url) in enumerate(crumbs, 1)
        ],
    }


def breadcrumb_text(crumbs, ind):
    """Block style: member lines at ind + 2, one inline ListItem per row."""
    node = breadcrumb_node(crumbs)
    items = rows(node["itemListElement"], ind + "  ")
    return ("{\n" + ind + '  "@type": "BreadcrumbList",\n' + ind + '  "itemListElement": ' + items
            + "\n" + ind + "}")


# ---------------------------------------------------------------------- editor
class Editor:
    """Collects splices against one page's text. Also records each edit as a
    path-based operation so the expected parsed result can be computed on the
    parsed data independently of the text splicing (safety gate b)."""

    def __init__(self, text):
        self.t = text
        self.splices = []  # (start, end, replacement)
        self.ops = []  # (step, kind, blk, path, arg)
        self.step = ""
        self.adds = {}

    def _splice(self, a, b, new):
        self.splices.append((a, b, new))

    def _op(self, kind, node, arg=None):
        self.ops.append((self.step, kind, node["blk"], node["path"], arg))

    def replace(self, old, v, ind):
        """Replace the value at span node `old` by v (no-op when equal)."""
        if value(self.t, old) == v:
            return False
        self._splice(old["s"], old["e"], render_like(self.t, old, v, ind))
        self._op("rep", old, v)
        return True

    def set(self, obj, key, v):
        ks, old = member(obj, key)
        if old is not None:
            return self.replace(old, v, line_indent(self.t, ks))
        self.add(obj, key, v)
        return True

    def add(self, obj, key, v, text=None):
        """Append a member. `text` overrides the rendering of the value. Several adds to
        one object are merged into a single splice when the editor is resolved."""
        if not obj["m"]:
            raise EntityError("cannot add a member to an empty object")
        self.adds.setdefault(id(obj), (obj, []))[1].append((key, v, text))
        self._op("add", obj, (key, v))

    def _flush_adds(self):
        for obj, entries in self.adds.values():
            last_ks, _, last = obj["m"][-1]
            multi = "\n" in self.t[obj["s"]:obj["e"]]
            ind = line_indent(self.t, last_ks)
            out = ""
            for key, v, text in entries:
                k = json.dumps(key, ensure_ascii=False)
                if multi:
                    if text is None:
                        if isinstance(v, list) and v and all(isinstance(x, dict) for x in v):
                            text = rows(v, ind)
                        else:
                            text = inline(v)
                    out += ",\n" + ind + k + ": " + text
                else:
                    out += ", " + k + ": " + (text or inline(v))
            self._splice(last["e"], last["e"], out)
        self.adds = {}

    def drop_member(self, obj, key):
        ms = obj["m"]
        for idx, (ks, k, v) in enumerate(ms):
            if k != key:
                continue
            if len(ms) == 1:
                raise EntityError("refusing to empty an object")
            if idx > 0:
                self._splice(ms[idx - 1][2]["e"], v["e"], "")
            else:
                self._splice(ks, ms[1][0], "")
            self._op("dropm", obj, key)
            return True
        return False

    def drop_items(self, arr, indices):
        """Drop array items; contiguous runs become one splice. Never empties the array."""
        idxs = sorted(set(indices))
        items = arr["items"]
        if not idxs:
            return
        if len(idxs) == len(items):
            raise EntityError("refusing to empty an array")
        runs = []
        for i in idxs:
            if runs and runs[-1][1] == i - 1:
                runs[-1][1] = i
            else:
                runs.append([i, i])
        for a, b in runs:
            if a > 0:
                self._splice(items[a - 1]["e"], items[b]["e"], "")
            else:
                self._splice(items[0]["s"], items[b + 1]["s"], "")
        for i in idxs:
            self._op("dropi", arr, i)

    def insert_first(self, arr, v):
        first = arr["items"][0]
        if "\n" in self.t[arr["s"]:first["s"]]:
            ind = line_indent(self.t, first["s"])
            self._splice(first["s"], first["s"], inline(v) + ",\n" + ind)
        else:
            self._splice(first["s"], first["s"], inline(v) + ", ")
        self._op("first", arr, v)

    def append_item(self, arr, v, text=None):
        last = arr["items"][-1]
        ind = line_indent(self.t, last["s"])
        self._splice(last["e"], last["e"], ",\n" + ind + (text or inline(v)))
        self._op("append", arr, v)

    def result(self):
        self._flush_adds()
        sp = sorted(self.splices, key=lambda x: (x[0], x[1]))
        for (a1, b1, n1), (a2, b2, n2) in zip(sp, sp[1:]):
            if b1 > a2 or (a1 == a2 and b1 == b2 and (b1 == a1)):
                raise EntityError("overlapping splices at %d-%d and %d-%d" % (a1, b1, a2, b2))
        out = self.t
        for a, b, new in sorted(sp, key=lambda x: (x[0], x[1]), reverse=True):
            out = out[:a] + new + out[b:]
        return out


def _at(data, path):
    for p in path:
        data = data[p]
    return data


def expected_data(blocks, ops):
    """Apply the recorded operations to deep copies of the parsed old blocks."""
    data = [json.loads(json.dumps(b)) for b in blocks]
    for step, kind, blk, path, arg in ops:
        if kind == "rep":
            if not path:
                data[blk] = arg
            else:
                _at(data[blk], path[:-1])[path[-1]] = arg
        elif kind == "add":
            _at(data[blk], path)[arg[0]] = arg[1]
    for step, kind, blk, path, arg in ops:
        if kind == "dropm":
            del _at(data[blk], path)[arg]
    for step, kind, blk, path, arg in sorted(
        (o for o in ops if o[1] == "dropi"), key=lambda o: (o[2], o[3], o[4]), reverse=True
    ):
        del _at(data[blk], path)[arg]
    for step, kind, blk, path, arg in ops:
        if kind == "first":
            _at(data[blk], path).insert(0, arg)
        elif kind == "append":
            _at(data[blk], path).append(arg)
    return data


# ------------------------------------------------------------ canonical entity
_cache = {}


class _FooterList(HTMLParser):
    """Collect the visible text of every <li> in one footer <ul>."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.li_tags = 0
        self.items = []
        self._cur = None

    def handle_starttag(self, tag, attrs):
        if tag == "li":
            self.li_tags += 1
            self._cur = []

    def handle_endtag(self, tag):
        if tag == "li" and self._cur is not None:
            self.items.append(re.sub(r"\s+", " ", "".join(self._cur).replace("\xa0", " ")).strip())
            self._cur = None

    def handle_data(self, data):
        if self._cur is not None:
            self._cur.append(data)


def footer_cities(chrome):
    """City names from the service-areas-footer <ul>, one per <li>, in order. Raises
    EntityError when an <li> yields no name, so markup changes cannot shorten the list
    silently."""
    at = chrome.find('class="service-areas-footer"')
    start = chrome.find("<ul", at) if at >= 0 else -1
    end = chrome.find("</ul>", start) if start >= 0 else -1
    if end < 0:
        raise EntityError("service-areas-footer list not found in scripts/_chrome_source.html")
    p = _FooterList()
    p.feed(chrome[start:end])
    p.close()
    names = [x for x in p.items if x]
    if not names:
        raise EntityError("service-areas-footer list is empty")
    if p.li_tags != len(names) or len(p.items) != p.li_tags:
        raise EntityError("service-areas-footer: %d <li> tags but %d city names parsed"
                          % (p.li_tags, len(names)))
    return names


def load_canonical(root=ROOT):
    """Build the canonical business node from contact.html and the footer list."""
    root = os.path.abspath(root)
    if root in _cache:
        return _cache[root]
    path = os.path.join(root, "contact.html")
    try:
        t = open(path, encoding="utf-8").read()
    except OSError as exc:
        raise EntityError("cannot read %s: %s" % (path, exc))
    found = []
    for m in BLOCK_RE.finditer(t):
        try:
            d = json.loads(m.group(2))
        except ValueError:
            continue
        nodes = d.get("@graph") if isinstance(d, dict) and isinstance(d.get("@graph"), list) else [d]
        for n in nodes:
            if isinstance(n, dict) and n.get("@id") == BID:
                found.append(n)
    if len(found) != 1:
        raise EntityError("contact.html must hold exactly one %s node, found %d" % (BID, len(found)))
    src = found[0]
    for key in ("name", "url", "image", "telephone", "email", "address"):
        if not src.get(key):
            raise EntityError("contact.html #business node has no %s" % key)
    chrome = open(os.path.join(root, "scripts", "_chrome_source.html"), encoding="utf-8").read()
    cities = footer_cities(chrome)
    canon = {
        "@type": "LocalBusiness",
        "@id": BID,
        "name": src["name"],
        "url": src["url"],
        "image": src["image"],
        "telephone": src["telephone"],
        "email": src["email"],
        "address": src["address"],
        "areaServed": [{"@type": "City", "name": c} for c in cities],
    }
    _cache[root] = canon
    return canon


def business_line(indent=10, root=None):
    """The canonical business node as one line at `indent` spaces, no trailing comma.
    Generators emit it as the first @graph element."""
    return " " * indent + inline(load_canonical(root or ROOT))


def display_phone(canon):
    d = re.sub(r"\D", "", canon["telephone"])[-10:]
    return "(%s) %s-%s" % (d[:3], d[3:6], d[6:])
