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

function isAllowedOrigin(request, env) {
  const allowed = (env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (allowed.length === 0) return true;
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

async function verifyTurnstile(token, ip, secret) {
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
  return { ok: data.success === true, data };
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
  const missing = ["RESEND_API_KEY", "TURNSTILE_SECRET_KEY", "CONTACT_TO_EMAIL", "CONTACT_FROM_EMAIL"]
    .filter((k) => !env[k]);
  if (missing.length > 0) {
    console.error("Missing required env vars", missing);
    return jsonResponse(500, { error: "Server misconfigured" });
  }
  if (!isAllowedOrigin(request, env)) {
    return jsonResponse(403, { error: "Forbidden" });
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
    return jsonResponse(204, {});
  }

  const fields = {
    name: String(data.name || "").trim(),
    company: String(data.company || "").trim(),
    email: String(data.email || "").trim(),
    phone: String(data.phone || "").trim(),
    message: String(data.message || "").trim(),
  };

  const OPTIONAL_FIELDS = new Set(["phone"]);
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
  const verify = await verifyTurnstile(token, ip, env.TURNSTILE_SECRET_KEY);
  if (!verify.ok) {
    return jsonResponse(403, { error: "Challenge failed" });
  }

  const phoneDisplay = fields.phone || "(not provided)";
  const subject = `New contact form submission — ${fields.company}`;
  const text = [
    `Name:    ${fields.name}`,
    `Company: ${fields.company}`,
    `Email:   ${fields.email}`,
    `Phone:   ${phoneDisplay}`,
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
