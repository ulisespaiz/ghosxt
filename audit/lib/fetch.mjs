// Proxy-aware fetch helpers.
//
// This environment routes outbound HTTPS through an agent proxy
// (HTTPS_PROXY). Node's global fetch (undici) does NOT read that env var on
// its own, so we install a proxy dispatcher as the global dispatcher. Where
// undici provides EnvHttpProxyAgent it is used, so NO_PROXY is honoured and
// loopback stays direct; otherwise a plain ProxyAgent sends everything through
// the proxy. The proxy's TLS-interception CA is already trusted by Node via
// NODE_EXTRA_CA_CERTS, so no extra cert wiring is needed here.
//
// Chromium, by contrast, cannot egress directly through the proxy in this
// sandbox, so render.mjs fulfils every browser request through these helpers
// instead of letting the browser touch the network.

import * as undici from "undici";
import { ProxyAgent, setGlobalDispatcher, request } from "undici";

const PROXY = process.env.HTTPS_PROXY || process.env.https_proxy || "";
// Loopback is always direct. undici cannot parse a bare "::1" in noProxy (it
// reads it as host ":" port 1), so IPv6 loopback is written in brackets.
const LOOPBACK_NO_PROXY = "localhost,127.0.0.1,[::1]";
if (PROXY) {
  if (typeof undici.EnvHttpProxyAgent === "function") {
    // An explicit noProxy replaces the environment value inside undici, so the
    // environment NO_PROXY is merged in here. httpProxy keeps plain http:// URLs
    // on the proxy, as ProxyAgent did; undici would send them direct otherwise.
    const noProxy = [LOOPBACK_NO_PROXY, process.env.no_proxy || process.env.NO_PROXY].filter(Boolean).join(",");
    setGlobalDispatcher(new undici.EnvHttpProxyAgent({ httpProxy: PROXY, noProxy }));
  } else {
    setGlobalDispatcher(new ProxyAgent(PROXY));
  }
}

const UA = "ghosxt-site-audit/1.0 (+internal audit; not a public crawler)";

// Fetch a URL and return { status, headers, body:Buffer, url:finalUrl }.
export async function fetchRaw(url, { method = "GET", maxRedirections = 5, timeoutMs = 45000 } = {}) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const r = await request(url, {
      method,
      maxRedirections,
      headers: { "user-agent": UA, accept: "*/*" },
      signal: ac.signal,
    });
    const body = Buffer.from(await r.body.arrayBuffer());
    return { status: r.statusCode, headers: r.headers, body, url };
  } finally {
    clearTimeout(timer);
  }
}

// Fetch and decode as text.
export async function fetchText(url, opts) {
  const r = await fetchRaw(url, opts);
  return { ...r, text: r.body.toString("utf8") };
}

// HEAD-style existence probe that tolerates servers which reject HEAD:
// try HEAD, fall back to a ranged GET. Returns the final status number.
export async function probeStatus(url, { timeoutMs = 25000 } = {}) {
  try {
    const r = await fetchRaw(url, { method: "HEAD", maxRedirections: 5, timeoutMs });
    if (r.status && r.status !== 405 && r.status !== 501) return r.status;
  } catch {
    /* fall through to GET */
  }
  try {
    const r = await fetchRaw(url, { method: "GET", maxRedirections: 5, timeoutMs });
    return r.status;
  } catch {
    return 0; // network error / unreachable
  }
}
