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
        
        // Here you can add your analytics/tracking code
        console.log('Cookies accepted');
    });
    
    // Decline cookies
    cookieDecline.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieBanner.classList.remove('visible');
        
        console.log('Cookies declined');
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

    // Navbar scroll effect (optional - adds shadow on scroll)
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // if (currentScroll > 10) {
        //     navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        // } else {
        //     navbar.style.boxShadow = 'none';
        // }

        lastScroll = currentScroll;
    }, { passive: true });
});
