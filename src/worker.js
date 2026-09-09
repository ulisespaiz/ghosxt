// Cloudflare Worker entry point for ghosxt.com.
//
// Routes:
//   POST /api/contact  → handleContact (form submission via Turnstile + Resend)
//   *                  → env.ASSETS.fetch(request)  (static site)
//
// Required environment variables (Workers & Pages → ghosxt → Settings →
// Variables and Secrets). Mark RESEND_API_KEY and TURNSTILE_SECRET_KEY
// as encrypted secrets; the rest are plaintext.
//
//   RESEND_API_KEY        Resend API key (secret)
//   TURNSTILE_SECRET_KEY  Cloudflare Turnstile secret key (secret)
//   CONTACT_TO_EMAIL      e.g. hello@ghosxt.com
//   CONTACT_FROM_EMAIL    e.g. "Ghosxt Contact Form <noreply@ghosxt.com>"
//   ALLOWED_ORIGINS       e.g. "https://ghosxt.com,https://www.ghosxt.com"

const MAX_FIELD_LENGTH = {
  name: 120,
  company: 200,
  email: 254,
  phone: 40,
  message: 5000,
  found_us: 100,
  search_query: 500,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// failClosed controls what happens when ALLOWED_ORIGINS is unset or resolves
// to an empty list. handleTrack passes no options (fail-open: a best-effort
// analytics beacon should not 403 just because the var was never set).
// handleContact passes { failClosed: true } so the same unset/empty state
// blocks the request instead of admitting it, because a forged or missing
// Origin must never reach Turnstile or Resend on the form-submission route.
function isAllowedOrigin(request, env, { failClosed = false } = {}) {
  const allowed = (env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (allowed.length === 0) {
    if (failClosed) {
      console.warn("ALLOWED_ORIGINS is unset or empty; failing closed for this route");
      return false;
    }
    console.warn("ALLOWED_ORIGINS is unset \u2014 origin check disabled (fail-open); set it in production");
    return true;
  }
  const origin = request.headers.get("Origin");
  if (origin && allowed.includes(origin)) return true;
  const referer = request.headers.get("Referer");
  if (referer) {
    try {
      const refOrigin = new URL(referer).origin;
      if (allowed.includes(refOrigin)) return true;
    } catch {}
  }
  return false;
}

async function verifyTurnstile(token, ip, secret, expectedHostname) {
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body },
  );
  if (!res.ok) return { ok: false };
  const data = await res.json();
  const errorCodes = Array.isArray(data["error-codes"]) ? data["error-codes"] : [];
  if (errorCodes.length > 0) {
    console.warn("Turnstile siteverify returned error-codes", errorCodes);
  }
  // siteverify echoes back the hostname the widget was solved on. Checking
  // it against the hostname the request actually arrived on catches a token
  // solved on a different site (e.g. a copied widget embed) from being
  // replayed here, even though it independently passed Cloudflare's check.
  const hostnameOk = !expectedHostname || data.hostname === expectedHostname;
  if (data.success === true && !hostnameOk) {
    console.warn("Turnstile token solved on unexpected hostname", {
      expected: expectedHostname,
      got: data.hostname,
    });
  }
  return { ok: data.success === true && hostnameOk, data };
}

async function sendViaResend(env, payload) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let body = "";
    try { body = await res.text(); } catch {}
    console.error("Resend send failed", {
      status: res.status,
      body: body.slice(0, 500),
      from: payload.from,
      to: payload.to,
    });
  }
  return { ok: res.ok, status: res.status };
}

async function handleContact(request, env) {
  if (request.method !== "POST") {
    return jsonResponse(405, { error: "Method Not Allowed", allow: "POST" });
  }
  // ALLOWED_ORIGINS is required here (rather than left to isAllowedOrigin's
  // shared fail-open default) so a missing value can't silently admit every
  // origin on this route: fail-open is intentional for handleTrack but not
  // safe for a form submission endpoint. The failClosed option below is a
  // second layer on top of this: it also blocks the request if
  // ALLOWED_ORIGINS is set but resolves to no usable entries (e.g. only
  // commas/whitespace), and it is what actually rejects a forged or missing
  // Origin/Referer once ALLOWED_ORIGINS is validly set.
  const missing = ["RESEND_API_KEY", "TURNSTILE_SECRET_KEY", "CONTACT_TO_EMAIL", "CONTACT_FROM_EMAIL", "ALLOWED_ORIGINS"]
    .filter((k) => !env[k]);
  if (missing.length > 0) {
    console.error("Missing required env vars", missing);
    return jsonResponse(500, { error: "Server misconfigured" });
  }
  if (!isAllowedOrigin(request, env, { failClosed: true })) {
    return jsonResponse(403, { error: "Forbidden" });
  }

  // Rate limiting via the Workers Rate Limiting binding. Skipped when the
  // binding is absent (e.g. local `wrangler dev` without it configured) so
  // local testing isn't blocked by a missing binding.
  if (env.CONTACT_RATE_LIMIT) {
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const { success } = await env.CONTACT_RATE_LIMIT.limit({ key: ip });
    if (!success) {
      return jsonResponse(429, { error: "Too many requests" });
    }
  }

  const contentType = request.headers.get("Content-Type") || "";
  let data;
  try {
    if (contentType.includes("application/json")) {
      data = await request.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await request.text();
      data = Object.fromEntries(new URLSearchParams(text));
    } else if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      data = Object.fromEntries(form);
    } else {
      return jsonResponse(415, { error: "Unsupported Media Type" });
    }
  } catch {
    return jsonResponse(400, { error: "Malformed request body" });
  }

  if (data.website && String(data.website).trim() !== "") {
    // 204 No Content must not carry a body — jsonResponse always writes one.
    return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  }

  const fields = {
    name: String(data.name || "").trim(),
    company: String(data.company || "").trim(),
    email: String(data.email || "").trim(),
    phone: String(data.phone || "").trim(),
    message: String(data.message || "").trim(),
    found_us: String(data.found_us || "").trim(),
    search_query: String(data.search_query || "").trim(),
  };

  const OPTIONAL_FIELDS = new Set(["phone", "found_us", "search_query"]);
  const errors = {};
  for (const [k, v] of Object.entries(fields)) {
    if (!v) {
      if (!OPTIONAL_FIELDS.has(k)) errors[k] = "Required";
    } else if (v.length > MAX_FIELD_LENGTH[k]) {
      errors[k] = "Too long";
    }
  }
  if (!errors.email && !EMAIL_RE.test(fields.email)) {
    errors.email = "Invalid email";
  }
  if (Object.keys(errors).length > 0) {
    return jsonResponse(400, { error: "Validation failed", fields: errors });
  }

  const token = String(data["cf-turnstile-response"] || "");
  if (!token) {
    return jsonResponse(400, { error: "Missing challenge token" });
  }
  const ip = request.headers.get("CF-Connecting-IP") || "";
  const expectedHostname = new URL(request.url).hostname;
  const verify = await verifyTurnstile(token, ip, env.TURNSTILE_SECRET_KEY, expectedHostname);
  if (!verify.ok) {
    return jsonResponse(403, { error: "Challenge failed" });
  }

  const phoneDisplay = fields.phone || "(not provided)";
  const foundUsDisplay = fields.found_us || "(not provided)";
  const searchQueryDisplay = fields.search_query || "(not provided)";
  // Strip CR/LF from the subject to prevent header injection; the text/html
  // body paths below are already escaped or plain-text-safe.
  const subject = `New contact form submission — ${fields.company.replace(/[\r\n]+/g, " ")}`;
  const text = [
    `Name:    ${fields.name}`,
    `Company: ${fields.company}`,
    `Email:   ${fields.email}`,
    `Phone:   ${phoneDisplay}`,
    `Found us: ${foundUsDisplay}`,
    `Searched for: ${searchQueryDisplay}`,
    "",
    "Message:",
    fields.message,
    "",
    "---",
    `IP:      ${ip}`,
    `UA:      ${request.headers.get("User-Agent") || ""}`,
    `Time:    ${new Date().toISOString()}`,
  ].join("\n");
  const html = `<!doctype html><meta charset="utf-8"><div style="font-family:system-ui,sans-serif;color:#111">
<h2 style="margin:0 0 8px">New contact form submission</h2>
<table cellpadding="4" style="border-collapse:collapse">
<tr><td><b>Name</b></td><td>${escapeHtml(fields.name)}</td></tr>
<tr><td><b>Company</b></td><td>${escapeHtml(fields.company)}</td></tr>
<tr><td><b>Email</b></td><td>${escapeHtml(fields.email)}</td></tr>
<tr><td><b>Phone</b></td><td>${escapeHtml(phoneDisplay)}</td></tr>
<tr><td><b>Found us</b></td><td>${escapeHtml(foundUsDisplay)}</td></tr>
<tr><td><b>Searched for</b></td><td>${escapeHtml(searchQueryDisplay)}</td></tr>
</table>
<h3 style="margin:16px 0 4px">Message</h3>
<pre style="white-space:pre-wrap;font-family:inherit;background:#f6f6f6;padding:12px;border-radius:6px">${escapeHtml(fields.message)}</pre>
<hr><p style="color:#666;font-size:12px">IP ${escapeHtml(ip)} · ${escapeHtml(new Date().toISOString())}</p>
</div>`;

  const sent = await sendViaResend(env, {
    from: env.CONTACT_FROM_EMAIL,
    to: [env.CONTACT_TO_EMAIL],
    reply_to: fields.email,
    subject,
    text,
    html,
  });
  if (!sent.ok) {
    return jsonResponse(502, { error: "Delivery failed" });
  }

  return jsonResponse(200, { ok: true });
}

const TRACK_MAX_BODY_BYTES = 4096;

async function handleTrack(request, env) {
  // Lightweight conversion-event sink. Currently a no-op so that
  // navigator.sendBeacon calls from assets/js/main.js do not 404. Events also
  // surface in Cloudflare Web Analytics via the page beacon. Logged at
  // info level so the worker tail captures them while a richer pipeline is
  // wired up.
  if (request.method !== "POST") {
    return new Response(null, { status: 204 });
  }
  // Only log same-origin beacons within the size cap; skip reading the body
  // for cross-origin or oversized POSTs. Always 204 — this is a fire-and-forget
  // sendBeacon sink, so no caller inspects the status. isAllowedOrigin's
  // fail-open-when-unset behavior is intentional and untouched here.
  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (isAllowedOrigin(request, env) && contentLength < TRACK_MAX_BODY_BYTES) {
    try {
      const text = await request.text();
      if (text && text.length < TRACK_MAX_BODY_BYTES) {
        console.log("track", text.slice(0, 500));
      }
    } catch {}
  }
  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") {
      return handleContact(request, env);
    }
    if (url.pathname === "/api/track") {
      return handleTrack(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
