# Contact form setup

The contact form on `/contact.html` posts to `/api/contact`. The handler is
in `src/worker.js` — this is a **Cloudflare Worker with static assets**
(not a Pages Function). The Worker routes `/api/contact` to the contact
handler and falls through to the `ASSETS` binding for every other path.

It uses Cloudflare Turnstile for bot mitigation and Resend for transactional
email.

## One-time setup (production)

### 1. Cloudflare Turnstile

1. Open https://dash.cloudflare.com/ → **Turnstile** → **Add site**.
2. Name: `ghosxt.com contact form`. Domain: `ghosxt.com`. Widget mode: **Managed**.
3. Copy the **Site Key** and the **Secret Key**.
4. In `contact.html`, replace the placeholder site key in the `<div class="cf-turnstile" data-sitekey="...">` element with the real Site Key (site keys are public; safe to commit).

### 2. Resend (email delivery)

1. Sign up at https://resend.com.
2. **Domains** → **Add Domain** → `ghosxt.com`. Add the DNS records (SPF, DKIM, return-path) to your DNS provider and wait for verification. Resend free tier covers 3,000 emails/month.
3. **API Keys** → **Create API Key** with the **Sending access** role. Copy the key once — you won't see it again.

### 3. Cloudflare environment variables

Cloudflare dashboard → **Workers & Pages** → `ghosxt` → **Settings** → **Variables and Secrets**. Add the following.

> **Important:** the dashboard hides Variables and Secrets when a Worker has only static assets and no compute entry point. Once `main: "src/worker.js"` is deployed (this commit), the section becomes editable. If the page still shows "Variables cannot be added to a Worker that only has static assets," redeploy the latest commit first.

| Name | Type | Example value |
|---|---|---|
| `RESEND_API_KEY` | Encrypted | `re_xxxxxxxxxxxxxxxxxxxxxxxx` |
| `TURNSTILE_SECRET_KEY` | Encrypted | `0x4AAAAAAB...` (the secret, not the site key) |
| `CONTACT_TO_EMAIL` | Plaintext | `hello@ghosxt.com` |
| `CONTACT_FROM_EMAIL` | Plaintext | `Ghosxt Contact Form <noreply@ghosxt.com>` |
| `ALLOWED_ORIGINS` | Plaintext | `https://ghosxt.com,https://www.ghosxt.com` |

Repeat the same variables in the **Preview** environment if you want the form to work on preview deploys.

### 4. Deploy

Push to the branch and Cloudflare will redeploy the Worker + assets. The deploy reads `wrangler.jsonc` (`main: "src/worker.js"`) so the contact handler ships with the static site.

### 5. (Optional) Account-level Secrets Store

If you'd prefer to store `RESEND_API_KEY` / `TURNSTILE_SECRET_KEY` in the **account-level Secrets Store** instead of per-project Variables and Secrets, that works too:

1. Create the secret in Secrets Store with whatever name you like.
2. Back in **Workers & Pages → ghosxt → Settings → Variables and Secrets**, click **Add binding → Secrets Store**, pick the secret, and bind it under the same name the code expects (`RESEND_API_KEY`, etc.).

The Worker reads them identically — `env.RESEND_API_KEY`. Secrets Store only makes sense if multiple projects share the same secret or your org wants account-wide RBAC + rotation. For one contact form, per-project Variables and Secrets is simpler.

## Security model

Defense in depth, in order of execution in `src/worker.js` → `handleContact`:

1. **Method check** — only `POST` is accepted; other verbs return `405`.
2. **Origin/Referer check** — `ALLOWED_ORIGINS` is enforced server-side. Blocks form replay from other domains even if someone scrapes the form HTML.
3. **Body parsing with `Content-Type` whitelist** — `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data` only. Anything else returns `415`.
4. **Honeypot** — `<input name="website">` is hidden from real users. If it's filled, we return `204 No Content` (no error to the bot, no email sent).
5. **Server-side validation** — required fields, length caps (matching the `maxlength=` attributes on the inputs), basic email shape. Bad payloads return `400` with a per-field error map.
6. **Turnstile verification** — the `cf-turnstile-response` token is sent to Cloudflare's `siteverify` endpoint with the requester's IP. Failures return `403`.
7. **HTML escaping** — every user-supplied value is HTML-escaped before being embedded in the email body (`escapeHtml` in the function). Prevents HTML/CSS injection into your inbox.
8. **`reply_to` set to the submitter's email** — so hitting Reply in your inbox goes to the lead. The `from:` address stays on `noreply@ghosxt.com` so SPF/DKIM stay aligned with Resend.
9. **Secrets stay in Cloudflare env vars** — never in the repo. `.env*` is already in `.gitignore`.
10. **CSP** (`_headers`) — `form-action 'self'` prevents the form being repurposed to POST elsewhere; `script-src` allows Turnstile's origin only.

## Local testing

```bash
npx wrangler dev
```

(Run from the repo root — `wrangler` reads `wrangler.jsonc` and serves the Worker at `http://localhost:8787` with the assets binding wired up.)

You'll need the env vars set locally too. Easiest is a `.dev.vars` file in the repo root (gitignored):

```
RESEND_API_KEY=re_...
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA   # Turnstile "always passes" test secret
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL=Ghosxt Contact Form <noreply@ghosxt.com>
ALLOWED_ORIGINS=http://localhost:8787
```

For local testing, use Cloudflare's [Turnstile test keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/):

| Purpose | Site key | Secret key |
|---|---|---|
| Always passes (visible) | `1x00000000000000000000AA` | `1x0000000000000000000000000000000AA` |
| Always blocks | `2x00000000000000000000AB` | `2x0000000000000000000000000000000AA` |
| Always passes (invisible) | `1x00000000000000000000BB` | (use the test secret above) |

Swap the production site key into `contact.html` before merging.

## Smoke test after deploy

1. Open https://ghosxt.com/contact.html in a private window.
2. Fill the form, complete the Turnstile widget, submit.
3. Expect: success message in the form's status region; email arrives at `CONTACT_TO_EMAIL` within ~30 seconds.
4. Re-check **Resend → Logs** if the email doesn't arrive — domain verification or API key issues show up there.
5. Try submitting with the browser console open: `fetch('/api/contact', {method:'POST', body:'{}', headers:{'Content-Type':'application/json'}})` — expect `400` with a validation error map.
6. Try `GET /api/contact` — expect `405 Method Not Allowed`.

## Adding the form to other pages

Copy the `<form id="contactForm" …>` block from `contact.html` and include the same `<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer>` in the `<head>`. The submit-handler `<script>` at the bottom of `contact.html` will reattach because it scopes itself to `#contactForm`.
