/* ═══════════════════════════════════════════════════════════════
   WEBDEV.JS — Ghosxt Web Development Page Calculator
   Handles project type selection, add-ons, and live pricing updates
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── CONSTANTS ───────────────────────────────────────────── */
  const PROJECT_PRICES = {
    essential: 1800,
    business: 3200,
    ecommerce: 5900
  };

  const PROJECT_NAMES = {
    essential: 'Essential',
    business: 'Business Pro',
    ecommerce: 'E-commerce / Portal'
  };

  /* ── STATE ───────────────────────────────────────────────── */
  let state = {
    projectType: 'business',
    addons: {
      cms: false,
      seo: false,
      booking: false,
      multilingual: false,
      customDesign: false
    },
    maintenance: false
  };

  const ADDON_PRICES = {
    cms: 800,
    seo: 550,
    booking: 1200,
    multilingual: 950,
    customDesign: 1500
  };

  const MAINTENANCE_PRICE = 300;

  /* ── HELPER FUNCTIONS ────────────────────────────────────── */
  function fmtDollar(n) {
    return '$' + Math.round(n).toLocaleString('en-US');
  }

  function setEl(id, txt) {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
  }

  function flash(el) {
    if (!el) return;
    el.classList.remove('updating');
    void el.offsetWidth;
    el.classList.add('updating');
  }

  /* ── GET ACTIVE ADD-ONS ──────────────────────────────────── */
  function getActiveAddons() {
    const addons = [];
    if (state.addons.cms) addons.push({ name: 'Custom CMS', price: ADDON_PRICES.cms });
    if (state.addons.seo) addons.push({ name: 'SEO Optimization', price: ADDON_PRICES.seo });
    if (state.addons.booking) addons.push({ name: 'Booking System', price: ADDON_PRICES.booking });
    if (state.addons.multilingual) addons.push({ name: 'Multilingual', price: ADDON_PRICES.multilingual });
    if (state.addons.customDesign) addons.push({ name: 'Premium Custom Design', price: ADDON_PRICES.customDesign });
    return addons;
  }

  function addonsTotal() {
    return getActiveAddons().reduce((sum, a) => sum + a.price, 0);
  }

  function baseCost() {
    return PROJECT_PRICES[state.projectType];
  }

  function totalBuildCost() {
    return baseCost() + addonsTotal();
  }

  /* ── RENDER ADD-ONS BREAKDOWN ────────────────────────────── */
  function renderAddonsBreakdown() {
    const container = document.getElementById('webAddonsBreakdown');
    if (!container) return;

    const addons = getActiveAddons();

    if (addons.length === 0) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = addons.map(addon => `
      <div class="breakdown-web-row">
        <span class="breakdown-web-label">+ ${addon.name}</span>
        <span class="breakdown-web-value">${fmtDollar(addon.price)}</span>
      </div>
    `).join('');
  }

  /* ── MAIN RENDER FUNCTION ────────────────────────────────── */
  function render() {
    const base = baseCost();
    const addons = addonsTotal();
    const total = totalBuildCost();
    const maintenanceActive = state.maintenance;

    // Update main display
    const totalEl = document.getElementById('totalWebCost');
    if (totalEl) {
      totalEl.textContent = Math.round(total).toLocaleString('en-US');
      flash(totalEl);
    }

    setEl('webProjectName', PROJECT_NAMES[state.projectType]);
    setEl('webBasePrice', fmtDollar(base));
    setEl('webTotalBuild', fmtDollar(total));

    // Monthly maintenance row
    const monthlyRow = document.getElementById('webMonthlyRow');
    const monthlyCostEl = document.getElementById('webMonthlyCost');
    if (monthlyRow && monthlyCostEl) {
      if (maintenanceActive) {
        monthlyRow.style.display = 'flex';
        monthlyCostEl.textContent = fmtDollar(MAINTENANCE_PRICE);
      } else {
        monthlyRow.style.display = 'none';
      }
    }

    // Render addons breakdown
    renderAddonsBreakdown();
  }

  /* ── EVENT HANDLERS ──────────────────────────────────────── */
  function init() {
    // Project type radio buttons
    document.querySelectorAll('input[name="projectType"]').forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.checked) {
          state.projectType = radio.value;
          render();
        }
      });
    });

    // Add-on checkboxes
    const addonMap = {
      'data-price="800"': 'cms',
      'data-price="550"': 'seo',
      'data-price="1200"': 'booking',
      'data-price="950"': 'multilingual',
      'data-price="1500"': 'customDesign'
    };

    document.querySelectorAll('.addon-web-item input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => {
        const priceAttr = cb.getAttribute('data-price');
        let addonKey = null;
        
        for (const [attr, key] of Object.entries(addonMap)) {
          if (priceAttr === attr.match(/\d+/)?.[0] || 
              (attr === 'data-price="800"' && priceAttr === '800') ||
              (attr === 'data-price="550"' && priceAttr === '550') ||
              (attr === 'data-price="1200"' && priceAttr === '1200') ||
              (attr === 'data-price="950"' && priceAttr === '950') ||
              (attr === 'data-price="1500"' && priceAttr === '1500')) {
            addonKey = key;
            break;
          }
        }
        
        // Alternative: check by price value
        if (!addonKey) {
          const price = parseInt(cb.getAttribute('data-price'));
          if (price === 800) addonKey = 'cms';
          else if (price === 550) addonKey = 'seo';
          else if (price === 1200) addonKey = 'booking';
          else if (price === 950) addonKey = 'multilingual';
          else if (price === 1500) addonKey = 'customDesign';
        }
        
        if (addonKey && state.addons.hasOwnProperty(addonKey)) {
          state.addons[addonKey] = cb.checked;
        }
        render();
      });
    });

    // Maintenance checkbox
    const maintenanceCheckbox = document.getElementById('maintenanceCheckbox');
    if (maintenanceCheckbox) {
      maintenanceCheckbox.addEventListener('change', () => {
        state.maintenance = maintenanceCheckbox.checked;
        render();
      });
    }

    // Set default selected radio
    const defaultRadio = document.querySelector('input[name="projectType"][value="business"]');
    if (defaultRadio) defaultRadio.checked = true;
    state.projectType = 'business';

    render();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();