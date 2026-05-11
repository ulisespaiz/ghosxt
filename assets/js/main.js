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

    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const isOpen = mobileMenu.classList.contains('active');
        
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

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
            navbarOverlay.classList.remove('active'); 
            body.classList.remove('menu-open'); // Remove scroll lock
            mobileToggle.querySelector('i').className = 'fi fi-rs-burger-menu';
        }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-dropdown-item, .mobile-btn');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navbarOverlay.classList.remove('active');
            body.classList.remove('menu-open'); // Remove scroll lock
            mobileToggle.querySelector('i').className = 'fi fi-rs-burger-menu';
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
