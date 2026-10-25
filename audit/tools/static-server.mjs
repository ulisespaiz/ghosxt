// Local static server that mirrors how Cloudflare Workers static assets serve
// this repo: html_handling "auto-trailing-slash", the repo's _redirects and
// _headers files, and the .assetsignore exclusions. Node http only, no deps.
//
// Run:  node tools/static-server.mjs --help

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const DEFAULT_PORT = 8787;
const DEFAULT_HOST = "127.0.0.1";

// Never served, even if .assetsignore does not list them.
const ALWAYS_BLOCKED = [".assetsignore", "_headers", "_redirects"];

const CONTENT_TYPES = new Map([
  ["html", "text/html; charset=utf-8"],
  ["css", "text/css; charset=utf-8"],
  ["js", "text/javascript; charset=utf-8"],
  ["mjs", "text/javascript; charset=utf-8"],
  ["json", "application/json; charset=utf-8"],
  ["map", "application/json; charset=utf-8"],
  ["webmanifest", "application/manifest+json; charset=utf-8"],
  ["xml", "application/xml; charset=utf-8"],
  ["txt", "text/plain; charset=utf-8"],
  ["svg", "image/svg+xml"],
  ["png", "image/png"],
  ["jpg", "image/jpeg"],
  ["jpeg", "image/jpeg"],
  ["webp", "image/webp"],
  ["avif", "image/avif"],
  ["ico", "image/x-icon"],
  ["woff", "font/woff"],
  ["woff2", "font/woff2"],
]);

const HELP = `Usage: node tools/static-server.mjs [options]

Serves the site the way Cloudflare Workers static assets do for this repo:
extensionless URLs, trailing-slash redirects, _redirects, _headers, and
.assetsignore exclusions. Zero dependencies, for CI and local checks.

Options:
  --root <dir>   directory to serve (default: ${DEFAULT_ROOT})
  --port <n>     TCP port, 0 picks a free port (default: ${DEFAULT_PORT})
  --host <addr>  bind address (default: ${DEFAULT_HOST})
  --quiet        no per-request lines on stderr
  --help         show this help and exit

On start it prints "listening on http://<host>:<port>" to stdout.
Stop with Ctrl-C or SIGTERM. Exit 1 only on a fatal setup error.
`;

function escapeRe(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Turns a glob with "*" wildcards into an anchored RegExp.
function globToRegExp(glob, star, tail) {
  return new RegExp("^" + glob.split("*").map(escapeRe).join(star) + tail);
}

// _redirects: "<from> <to> <status>", first match wins. ":name" placeholders
// match one path segment, or part of one as in "/:page.html".
function parseRedirects(text) {
  const rules = [];
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [from, to, code] = trimmed.split(/\s+/);
    if (!from || !to) continue;
    rules.push({ from, to, status: Number(code) || 302, ...compileFrom(from) });
  }
  return rules;
}

function compileFrom(from) {
  if (!from.includes(":")) return { names: [], exact: from, regex: null };
  const names = [];
  const body = from
    .split("/")
    .map((segment) =>
      segment
        .split(/(:[A-Za-z_]\w*)/)
        .map((part) => {
          if (!/^:[A-Za-z_]\w*$/.test(part)) return escapeRe(part);
          names.push(part.slice(1));
          return "([^/]+)";
        })
        .join(""),
    )
    .join("/");
  return { names, exact: null, regex: new RegExp("^" + body + "$") };
}

function matchRedirect(rules, pathname) {
  for (const rule of rules) {
    if (rule.regex === null) {
      if (pathname === rule.exact) return { status: rule.status, target: rule.to };
      continue;
    }
    const match = rule.regex.exec(pathname);
    if (!match) continue;
    const captured = new Map(rule.names.map((name, i) => [name, match[i + 1]]));
    const target = rule.to.replace(/:([A-Za-z_]\w*)/g, (token, name) =>
      captured.has(name) ? captured.get(name) : token,
    );
    return { status: rule.status, target };
  }
  return null;
}

// _headers: an unindented path pattern, then indented "Name: value" lines.
// "*" matches any run of characters. Every matching block applies, in file order.
function parseHeaderBlocks(text) {
  const blocks = [];
  let current = null;
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    if (/^\s/.test(line)) {
      const colon = trimmed.indexOf(":");
      if (current && colon > 0) {
        current.headers.push([trimmed.slice(0, colon).trim(), trimmed.slice(colon + 1).trim()]);
      }
      continue;
    }
    current = { re: globToRegExp(trimmed, ".*", "$"), headers: [] };
    blocks.push(current);
  }
  return blocks;
}

// Merges every _headers block whose pattern matches one of the candidate
// paths. Later blocks override earlier ones for the same header name.
function collectHeaders(blocks, candidates) {
  const merged = new Map();
  for (const block of blocks) {
    if (!candidates.some((candidate) => block.re.test(candidate))) continue;
    for (const [name, value] of block.headers) merged.set(name.toLowerCase(), [name, value]);
  }
  return merged;
}

function headerObject(bag) {
  return Object.fromEntries(bag.values());
}

// .assetsignore: "dir/" excludes that top-level directory, a plain name excludes
// any top-level path that starts with it, and patterns with "*" are globs.
function parseIgnoreRules(text) {
  const rules = ALWAYS_BLOCKED.map((name) => ({ kind: "prefix", name }));
  for (const line of text.split(/\r?\n/)) {
    const pattern = line.trim().replace(/^\/+/, "");
    if (!pattern || pattern.startsWith("#")) continue;
    if (pattern.endsWith("/")) {
      rules.push({ kind: "dir", name: pattern.slice(0, -1) });
    } else if (pattern.includes("*")) {
      rules.push({ kind: "glob", re: globToRegExp(pattern, "[^/]*", "(?:/|$)") });
    } else {
      rules.push({ kind: "prefix", name: pattern });
    }
  }
  return rules;
}

function isIgnored(rules, rel) {
  if (!rel) return false;
  return rules.some((rule) => {
    if (rule.kind === "dir") return rel === rule.name || rel.startsWith(rule.name + "/");
    if (rule.kind === "glob") return rule.re.test(rel);
    return rel.startsWith(rule.name);
  });
}

// Collapses "//" and "/./" the way a URL resolver would, keeping trailing slashes.
function normalizePath(pathname) {
  const out = pathname.replace(/\/\.(?=\/|$)/g, "").replace(/\/{2,}/g, "/");
  return out.startsWith("/") ? out : "/" + out;
}

// Path portion of the request target, without the query string or fragment.
// The raw form is kept so ".." can be rejected before any URL parsing.
function requestPath(url) {
  let target = url;
  if (/^https?:\/\//i.test(target)) target = target.replace(/^https?:\/\/[^/?#]*/i, "") || "/";
  const cut = target.search(/[?#]/);
  const pathOnly = cut === -1 ? target : target.slice(0, cut);
  return pathOnly || "/";
}

function querySuffix(url) {
  const start = url.indexOf("?");
  if (start === -1) return "";
  const hash = url.indexOf("#", start);
  return hash === -1 ? url.slice(start) : url.slice(start, hash);
}

function statInRoot(root, rel) {
  const abs = path.join(root, rel);
  if (abs !== root && !abs.startsWith(root + path.sep)) return null;
  try {
    return fs.statSync(abs);
  } catch {
    return null;
  }
}

function isFileRel(root, rel) {
  const st = statInRoot(root, rel);
  return st !== null && st.isFile();
}

function isDirRel(root, rel) {
  const st = statInRoot(root, rel);
  return st !== null && st.isDirectory();
}

// Cloudflare-style lookup for a decoded, normalized path. Returns { file } to
// serve a file, { redirect, status } to redirect, or null when nothing matches.
function resolvePath(root, p) {
  if (p === "/") return { file: "index.html" };
  if (p.endsWith("/index.html")) {
    return { redirect: p.slice(0, -"index.html".length), status: 301 };
  }
  const rel = p.slice(1);
  if (p.endsWith("/")) {
    if (isFileRel(root, rel.slice(0, -1) + ".html")) {
      return { redirect: p.slice(0, -1), status: 307 };
    }
    if (isFileRel(root, rel + "index.html")) return { file: rel + "index.html" };
    return null;
  }
  if (p.endsWith(".html")) {
    if (isFileRel(root, rel)) return { redirect: p.slice(0, -".html".length), status: 301 };
    return null;
  }
  if (isFileRel(root, rel + ".html")) return { file: rel + ".html" };
  if (isDirRel(root, rel) && isFileRel(root, rel + "/index.html")) {
    return { redirect: p + "/", status: 307 };
  }
  if (isFileRel(root, rel)) return { file: rel };
  return null;
}

function contentTypeFor(rel) {
  const ext = path.extname(rel).slice(1).toLowerCase();
  return CONTENT_TYPES.get(ext) ?? "application/octet-stream";
}

function readOptional(root, name) {
  try {
    return fs.readFileSync(path.join(root, name), "utf8");
  } catch (err) {
    if (err.code === "ENOENT") return "";
    throw err;
  }
}

function loadConfig(root, quiet) {
  const redirects = parseRedirects(readOptional(root, "_redirects"));
  const headerBlocks = parseHeaderBlocks(readOptional(root, "_headers"));
  const ignoreRules = parseIgnoreRules(readOptional(root, ".assetsignore"));
  if (!quiet) {
    process.stderr.write(
      `static-server: root ${root}; ${redirects.length} redirect rules, ` +
        `${headerBlocks.length} header blocks, ${ignoreRules.length} ignore rules\n`,
    );
  }
  return { root, redirects, headerBlocks, ignoreRules, quiet };
}

function logRequest(ctx, status, method, rawPath) {
  if (!ctx.quiet) process.stderr.write(`${status} ${method} ${rawPath}\n`);
}

function reply(ctx, method, rawPath, res, status, headers, body) {
  res.writeHead(status, headers);
  res.end(method === "HEAD" || body == null ? undefined : body);
  logRequest(ctx, status, method, rawPath);
}

function textReply(ctx, method, rawPath, res, status, text, extra = {}) {
  const body = Buffer.from(text, "utf8");
  const headers = {
    ...extra,
    "Content-Type": "text/plain; charset=utf-8",
    "Content-Length": String(body.length),
  };
  reply(ctx, method, rawPath, res, status, headers, body);
}

function redirectReply(ctx, method, rawPath, res, status, location, search) {
  const target = search && !location.includes("?") ? location + search : location;
  reply(ctx, method, rawPath, res, status, { Location: target, "Content-Length": "0" }, null);
}

// candidates are the paths _headers patterns are matched against: the request
// path and the served file's own path (so "/about" also gets "/*.html" rules).
async function serveFile(ctx, method, rawPath, res, rel, status, candidates) {
  const body = await fs.promises.readFile(path.join(ctx.root, rel));
  const bag = collectHeaders(ctx.headerBlocks, candidates);
  bag.set("content-type", ["Content-Type", contentTypeFor(rel)]);
  bag.set("content-length", ["Content-Length", String(body.length)]);
  reply(ctx, method, rawPath, res, status, headerObject(bag), body);
}

async function notFoundReply(ctx, method, rawPath, res, p) {
  if (isFileRel(ctx.root, "404.html")) {
    return serveFile(ctx, method, rawPath, res, "404.html", 404, [p, "/404.html"]);
  }
  return textReply(ctx, method, rawPath, res, 404, "Not Found");
}

async function handleRequest(ctx, req, res) {
  const method = req.method;
  const rawPath = requestPath(req.url || "/");
  if (method !== "GET" && method !== "HEAD") {
    return textReply(ctx, method, rawPath, res, 405, "Method Not Allowed", { Allow: "GET, HEAD" });
  }

  let p;
  try {
    p = normalizePath(decodeURIComponent(rawPath));
  } catch {
    return textReply(ctx, method, rawPath, res, 400, "Bad Request");
  }
  if (p.includes("..") || p.includes("\u0000")) {
    return textReply(ctx, method, rawPath, res, 400, "Bad Request");
  }
  const search = querySuffix(req.url || "");

  const redirect = matchRedirect(ctx.redirects, p);
  if (redirect) {
    return redirectReply(ctx, method, rawPath, res, redirect.status, redirect.target, search);
  }

  if (isIgnored(ctx.ignoreRules, p.slice(1))) {
    return notFoundReply(ctx, method, rawPath, res, p);
  }

  const found = resolvePath(ctx.root, p);
  if (!found) return notFoundReply(ctx, method, rawPath, res, p);
  if (found.redirect !== undefined) {
    return redirectReply(ctx, method, rawPath, res, found.status, found.redirect, search);
  }
  if (isIgnored(ctx.ignoreRules, found.file)) {
    return notFoundReply(ctx, method, rawPath, res, p);
  }

  return serveFile(ctx, method, rawPath, res, found.file, 200, [p, "/" + found.file]);
}

function createServer(ctx) {
  return http.createServer((req, res) => {
    handleRequest(ctx, req, res).catch((err) => {
      process.stderr.write(`500 ${req.method} ${req.url}: ${err.message}\n`);
      if (!res.headersSent) res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Internal Server Error");
    });
  });
}

function parsePort(text) {
  const port = Number(text);
  if (!/^\d+$/.test(text) || port > 65535) {
    throw new Error(`--port must be an integer from 0 to 65535, got "${text}"`);
  }
  return port;
}

function parseArgs(argv) {
  const opts = { root: DEFAULT_ROOT, port: DEFAULT_PORT, host: DEFAULT_HOST, quiet: false, help: false };
  let i = 0;
  while (i < argv.length) {
    const arg = argv[i];
    i += 1;
    const eq = arg.startsWith("--") ? arg.indexOf("=") : -1;
    const flag = eq === -1 ? arg : arg.slice(0, eq);
    const inline = eq === -1 ? undefined : arg.slice(eq + 1);
    let value;
    if (["--root", "--host", "--port"].includes(flag)) {
      if (inline !== undefined) {
        value = inline;
      } else if (i < argv.length) {
        value = argv[i];
        i += 1;
      } else {
        throw new Error(`${flag} needs a value`);
      }
      if (value === "") throw new Error(`${flag} needs a non-empty value`);
    }
    if (flag === "--help" || flag === "-h") opts.help = true;
    else if (flag === "--quiet") opts.quiet = true;
    else if (flag === "--root") opts.root = path.resolve(value);
    else if (flag === "--host") opts.host = value;
    else if (flag === "--port") opts.port = parsePort(value);
    else throw new Error(`unknown argument: ${arg}`);
  }
  return opts;
}

function isDirectory(dir) {
  try {
    return fs.statSync(dir).isDirectory();
  } catch {
    return false;
  }
}

function listen(server, host, port) {
  return new Promise((resolve, reject) => {
    const onError = (err) => reject(err);
    server.once("error", onError);
    server.listen(port, host, () => {
      server.off("error", onError);
      resolve();
    });
  });
}

async function main(argv) {
  const opts = parseArgs(argv);
  if (opts.help) {
    process.stdout.write(HELP);
    return;
  }
  if (!isDirectory(opts.root)) throw new Error(`--root is not a directory: ${opts.root}`);
  const ctx = loadConfig(opts.root, opts.quiet);
  const server = createServer(ctx);
  try {
    await listen(server, opts.host, opts.port);
  } catch (err) {
    throw new Error(`cannot listen on ${opts.host}:${opts.port}: ${err.message}`);
  }
  server.on("error", (err) => {
    process.stderr.write(`static-server: ${err.message}\n`);
    process.exit(1);
  });
  const { port } = server.address();
  const shownHost = opts.host.includes(":") ? `[${opts.host}]` : opts.host;
  process.stdout.write(`listening on http://${shownHost}:${port}\n`);

  const stop = () => {
    server.close(() => process.exit(0));
    server.closeAllConnections();
  };
  process.once("SIGINT", stop);
  process.once("SIGTERM", stop);
}

main(process.argv.slice(2)).catch((err) => {
  process.stderr.write(`static-server: ${err.message}\n`);
  process.exitCode = 1;
});
