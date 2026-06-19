// Contact form: AJAX submit to /api/contact (Cloudflare Worker).
// Handles Turnstile token, validation feedback, and accessible status updates.
(function () {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const submit = document.getElementById('form-submit');
    const status = document.getElementById('form-status');
    const submitDefault = submit.textContent;

    function setStatus(message, kind) {
        status.textContent = message;
        status.dataset.kind = kind || '';
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        setStatus('', '');

        if (!form.reportValidity()) return;

        const data = new FormData(form);
        const token = data.get('cf-turnstile-response');
        if (!token) {
            setStatus('Please complete the security check above.', 'error');
            return;
        }

        submit.disabled = true;
        submit.textContent = 'Sending…';

        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { Accept: 'application/json' },
            });
            if (res.ok) {
                form.reset();
                if (window.turnstile) window.turnstile.reset();
                setStatus('Thanks — we received your message and will reply within 1 business day.', 'success');
                document.dispatchEvent(new CustomEvent('contact:success'));
            } else {
                let msg = 'Something went wrong. Please try again or email sales@ghosxt.com.';
                try {
                    const body = await res.json();
                    if (body && body.error) msg = body.error + '. Please try again or email sales@ghosxt.com.';
                } catch (_) {}
                setStatus(msg, 'error');
            }
        } catch (_) {
            setStatus('Network error. Please try again or email sales@ghosxt.com.', 'error');
        } finally {
            submit.disabled = false;
            submit.textContent = submitDefault;
        }
    });
})();
