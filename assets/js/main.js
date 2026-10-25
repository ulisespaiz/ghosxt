// Conversion event tracking.
// Sends a JSON beacon to /api/track for high-intent clicks (Calendly, tel:,
// contact form submit). The endpoint is currently a no-op on the worker side;
// these events also surface in Cloudflare Web Analytics via the data-cf-beacon
// scripts. Keeping this client-side hook in one place so we can swap the
// destination later without editing every page.
(function () {
  function send(name, detail) {
    try {
      const payload = JSON.stringify({
        e: name,
        d: detail || {},
        p: location.pathname,
        t: Date.now(),
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }));
      }
    } catch (_) {}
  }

  document.addEventListener('click', function (e) {
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (href.indexOf('calendly.com') !== -1) {
      send('cta_calendly_click', { href: href, text: (a.textContent || '').trim().slice(0, 80) });
    } else if (href.indexOf('tel:') === 0) {
      send('cta_tel_click', { href: href });
    }
  }, { capture: true, passive: true });

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', function () {
      send('contact_form_submit_attempt', {});
    });
    document.addEventListener('contact:success', function () {
      send('contact_form_submit_success', {});
    });
    document.addEventListener('calendly.event_scheduled', function () {
      send('calendly_booking_complete', {});
    });
    /* Pricing calculator intent events — dispatched by pricing.js. The
       generic cta_calendly_click event above still fires for the
       calculator's Book-a-Call button (it matches any calendly.com
       href); pricing_book_call_click adds the tier/users/total/addons
       context that the generic event can't capture. */
    document.addEventListener('pricing:tier', function (e) {
      send('pricing_tier_selected', e.detail || {});
    });
    document.addEventListener('pricing:addon', function (e) {
      send('pricing_addon_selected', e.detail || {});
    });
    document.addEventListener('pricing:cta-click', function (e) {
      send('pricing_book_call_click', e.detail || {});
    });
    window.addEventListener('message', function (e) {
      if (!e || !e.data || typeof e.data !== 'object') return;
      if (e.data.event === 'calendly.event_scheduled') {
        send('calendly_booking_complete', {});
      }
    });
  });
})();


// Scroll to Top Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (!scrollToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }, { passive: true });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});


// Cookie Consent Banner Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieDecline = document.getElementById('cookieDecline');
    if (!cookieBanner || !cookieAccept || !cookieDecline) return;

    // Check if user has already responded to cookies
    const cookieConsent = localStorage.getItem('cookieConsent');

    // The banner's resting position (above the mobile sticky CTA bar, or
    // flush with the bottom when there is none) is fixed in CSS from first
    // paint (see .cookie-banner in assets/css/main.css), so no JS height
    // measurement is needed here; only the show/hide transform changes.

    // Show banner if no consent has been given
    if (!cookieConsent) {
        setTimeout(() => {
            cookieBanner.classList.add('visible');
        }, 1000); // Delay 1 second before showing
    }

    // Accept cookies
    cookieAccept.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.classList.remove('visible');
    });

    // Decline cookies
    cookieDecline.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieBanner.classList.remove('visible');
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const navbarOverlay = document.getElementById('navbarOverlay');
    const body = document.body;
    if (!mobileToggle || !mobileMenu || !navbarOverlay) return;

    const closeMobileMenu = () => {
        mobileMenu.classList.remove('active');
        navbarOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.querySelector('i').className = 'fi fi-rs-burger-menu';
    };

    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const isOpen = mobileMenu.classList.contains('active');
        mobileToggle.setAttribute('aria-expanded', String(isOpen));
        
        // Toggle overlay - ADD THIS
        if (isOpen) {
            navbarOverlay.classList.add('active');
            body.classList.add('menu-open');
        } else {
            navbarOverlay.classList.remove('active');
            body.classList.remove('menu-open');
        }
        
        mobileToggle.querySelector('i').className = isOpen ? 'fi fi-rs-cross' : 'fi fi-rs-burger-menu';
    });

    // Mobile accordion functionality
    const accordionTriggers = document.querySelectorAll('.mobile-accordion-trigger');
    
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const accordion = trigger.parentElement;
            const isActive = accordion.classList.contains('active');

            // Close all accordions
            document.querySelectorAll('.mobile-accordion').forEach(acc => {
                acc.classList.remove('active');
                const t = acc.querySelector('.mobile-accordion-trigger');
                if (t) t.setAttribute('aria-expanded', 'false');
            });

            // Open clicked accordion if it wasn't active
            if (!isActive) {
                accordion.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Close mobile menu when clicking the overlay
    navbarOverlay.addEventListener('click', () => {
        closeMobileMenu();
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close mobile menu when pressing Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-dropdown-item, .mobile-btn');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // // Theme toggle functionality
    // const themeToggle = document.getElementById('themeToggle');
    
    // themeToggle.addEventListener('click', () => {
    //     themeToggle.classList.toggle('dark');
    //     // You can add actual theme switching logic here if needed
    // });

    // Sticky navbar: add a shadow once the page is scrolled so the header
    // (and the red Call button) reads as a distinct, always-present bar.
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const onScroll = () => {
            navbar.classList.toggle('scrolled', window.pageYOffset > 8);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }
});

// Active-page highlight. Compares each nav link's resolved pathname to the
// current URL (the browser resolves relative/`../` hrefs for us), so it works
// across root and /blog/ pages without per-page edits.
document.addEventListener('DOMContentLoaded', function () {
    const norm = (p) => p.replace(/index\.html$/, '').replace(/\/+$/, '') || '/';
    const current = norm(location.pathname);
    const links = document.querySelectorAll(
        '.navbar-link[href], .dropdown-item[href], .mobile-link[href], .mobile-dropdown-item[href]'
    );
    links.forEach((a) => {
        if (norm(a.pathname) !== current) return;
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
        // Bubble the highlight up to the parent dropdown / accordion trigger.
        const dd = a.closest('.navbar-dropdown');
        if (dd) dd.querySelector('.dropdown-trigger')?.classList.add('active');
        const acc = a.closest('.mobile-accordion');
        if (acc) acc.querySelector('.mobile-accordion-trigger')?.classList.add('active');
    });
});

// ------ Motion: scroll reveal, FAQ open animation, reading progress, lazy
// image fade. Styles live in the MOTION section of main.css. Everything here
// respects prefers-reduced-motion and degrades to the plain page without JS.
(function () {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ready = (fn) => {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    };

    // Scroll reveal, inner pages only: the home page has its own animations.
    ready(function () {
        if (reducedMotion || !('IntersectionObserver' in window)) return;
        if (document.getElementById('gridCanvas')) return;
        const selector = [
            '.key-facts', '.service-card', '.icon-card', '.scenario-card', '.location-cta',
            '.location-faq details', '.faq-item', '.blog-card', '.blog-post-cta',
            '.certification-card', '.portfolio-card', '.stripe-card',
        ].join(', ');
        const fold = window.innerHeight * 0.9;
        const items = [];
        document.querySelectorAll(selector).forEach((el) => {
            // Leave anything in the first screen alone so nothing flashes.
            if (el.getBoundingClientRect().top < fold) return;
            el.classList.add('reveal');
            items.push(el);
        });
        if (!items.length) return;
        // Short stagger between siblings in the same grid or list.
        items.forEach((el) => {
            const siblings = Array.from(el.parentElement.children).filter((c) => c.classList.contains('reveal'));
            const i = siblings.indexOf(el);
            if (i > 0) el.style.transitionDelay = Math.min(i, 4) * 60 + 'ms';
        });
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
        items.forEach((el) => io.observe(el));
        // Safety net: nothing stays hidden if the observer never fires.
        setTimeout(() => items.forEach((el) => el.classList.add('is-visible')), 4000);
    });

    // FAQ open and close animation for the <details> accordions. The answer is
    // the single element after the summary; anything else keeps native behaviour.
    ready(function () {
        if (reducedMotion) return;
        document.querySelectorAll('.location-faq details, details.faq-item').forEach((details) => {
            const summary = details.querySelector(':scope > summary');
            const panel = summary && summary.nextElementSibling;
            if (!summary || !panel || panel.nextElementSibling || typeof panel.animate !== 'function') return;
            let running = null;
            summary.addEventListener('click', (event) => {
                event.preventDefault();
                if (running) return;
                panel.style.overflow = 'hidden';
                if (details.open) {
                    const from = panel.offsetHeight;
                    running = panel.animate(
                        [{ height: from + 'px', opacity: 1 }, { height: '0px', opacity: 0 }],
                        { duration: 200, easing: 'ease' }
                    );
                    running.onfinish = () => {
                        details.open = false;
                        panel.style.overflow = '';
                        running = null;
                    };
                } else {
                    details.open = true;
                    const to = panel.offsetHeight;
                    running = panel.animate(
                        [{ height: '0px', opacity: 0 }, { height: to + 'px', opacity: 1 }],
                        { duration: 240, easing: 'ease' }
                    );
                    running.onfinish = () => {
                        panel.style.overflow = '';
                        running = null;
                    };
                }
            });
        });
    });

    // Reading progress on blog posts: a thin line along the navbar's bottom
    // edge that fills as the article scrolls past.
    ready(function () {
        const post = document.querySelector('main.blog-post');
        const navbar = document.querySelector('.navbar');
        if (!post || !navbar) return;
        const bar = document.createElement('div');
        bar.className = 'read-progress';
        bar.setAttribute('aria-hidden', 'true');
        navbar.appendChild(bar);
        let queued = false;
        const update = () => {
            queued = false;
            const total = post.offsetHeight - window.innerHeight;
            if (total <= 0) {
                bar.style.transform = 'scaleX(1)';
                return;
            }
            const passed = Math.min(Math.max(-post.getBoundingClientRect().top, 0), total);
            bar.style.transform = 'scaleX(' + (passed / total).toFixed(4) + ')';
        };
        window.addEventListener('scroll', () => {
            if (queued) return;
            queued = true;
            requestAnimationFrame(update);
        }, { passive: true });
        window.addEventListener('resize', update);
        update();
    });

    // Lazy images fade in. Only images still loading get the class, so cached
    // images never flash.
    ready(function () {
        if (reducedMotion) return;
        document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
            if (img.complete) return;
            img.classList.add('img-fade');
            const done = () => img.classList.add('is-loaded');
            img.addEventListener('load', done, { once: true });
            img.addEventListener('error', done, { once: true });
            if (img.complete) done();
        });
    });
})();
