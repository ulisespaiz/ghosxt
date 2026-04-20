/* ═══════════════════════════════════════════════════════════════
   PRICING.JS — Ghosxt Pricing Page Calculator
   UPDATED: Shows individual add-on line items with quantities
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── CONSTANTS ───────────────────────────────────────────── */
  const TIER_PRICES  = { essential: 125, professional: 175, premium: 250 };
  const TIER_LABELS  = { essential: 'Essential', professional: 'Professional', premium: 'Premium' };
  const USERS_PER_HIRE = 18;
  const COST_PER_HIRE  = 8333;   // $100k/yr ÷ 12, CA fully loaded
  const MIN_USERS      = 5;

  /* ── ADD-ON CONFIGURATION (for display names) ────────────── */
  const ADDON_CONFIG = {
    'Server (physical or virtual)': { shortName: 'Server', basePrice: 200 },
    'Firewall': { shortName: 'Firewall', basePrice: 50 },
    'Managed Network Switch': { shortName: 'Switch', basePrice: 25 },
    'Wireless Access Point': { shortName: 'Access Point', basePrice: 20 },
    'NAS (Network-Attached Storage)': { shortName: 'NAS', basePrice: 100 },
    'Mobile Device Management': { shortName: 'MDM', basePrice: 15 }
  };

  /* ── STATE ───────────────────────────────────────────────── */
  let state = {
    users: 10,
    tier:  'professional',
  };

  /* ── COLLECT ACTIVE ADD-ONS WITH QUANTITIES ───────────────── */
  function getActiveAddons() {
    const addons = [];
    document.querySelectorAll('.addon-item input[type="checkbox"]:checked').forEach(cb => {
      const item = cb.closest('.addon-item');
      const nameEl = item?.querySelector('.addon-name');
      const addonName = nameEl ? nameEl.childNodes[0]?.textContent.trim() : '';
      const qtyEl = item?.querySelector('.addon-qty');
      const qty = qtyEl ? (parseInt(qtyEl.textContent) || 1) : 1;
      const price = parseFloat(cb.dataset.price) || 0;
      
      const config = ADDON_CONFIG[addonName] || { shortName: addonName, basePrice: price };
      
      addons.push({
        name: config.shortName,
        displayName: addonName,
        price: price,
        quantity: qty,
        total: price * qty
      });
    });
    return addons;
  }

  function addonTotal() {
    return getActiveAddons().reduce((sum, a) => sum + a.total, 0);
  }

  function ghosxtCost() {
    return (state.users * TIER_PRICES[state.tier]) + addonTotal();
  }

  function hireCount(users)    { return Math.max(1, Math.floor(users / USERS_PER_HIRE)); }
  function internalCost(users) { return hireCount(users) * COST_PER_HIRE; }

  function fmtDollar(n) { return '$' + Math.round(n).toLocaleString('en-US'); }
  function setEl(id, txt) { const el = document.getElementById(id); if (el) el.textContent = txt; }
  function flash(el) {
    if (!el) return;
    el.classList.remove('updating');
    void el.offsetWidth;
    el.classList.add('updating');
  }

  /* ── RENDER ENHANCED BREAKDOWN WITH ADD-ON ITEMS ──────────── */
  function renderAddonsBreakdown() {
    const container = document.getElementById('addonsBreakdownContainer');
    if (!container) return;
    
    const addons = getActiveAddons();
    
    if (addons.length === 0) {
      container.innerHTML = '';
      return;
    }
    
    container.innerHTML = addons.map(addon => {
      // Format: "Server × 2" or "MDM × 5 devices"
      let quantityText = `× ${addon.quantity}`;
      if (addon.name === 'MDM') quantityText = `× ${addon.quantity} devices`;
      
      return `
        <div class="breakdown-row breakdown-addon">
          <span class="breakdown-label">${addon.name} ${quantityText}</span>
          <span class="breakdown-value">${fmtDollar(addon.total)}</span>
        </div>
      `;
    }).join('');
  }

  function render() {
    const users    = state.users;
    const tier     = state.tier;
    const ghosxt   = ghosxtCost();
    const internal = internalCost(users);
    const hires    = hireCount(users);
    const base     = users * TIER_PRICES[tier];
    const infra    = addonTotal();
    const savedMo  = Math.max(0, internal - ghosxt);
    const savedYr  = savedMo * 12;
    const pct      = internal > 0 ? Math.round((savedMo / internal) * 100) : 0;

    /* Monthly cost card */
    const totalEl = document.getElementById('totalCost');
    if (totalEl) { totalEl.textContent = Math.round(ghosxt).toLocaleString('en-US'); flash(totalEl); }

    setEl('bUsers', users);
    setEl('bRate',  TIER_PRICES[tier]);
    setEl('bBase',  fmtDollar(base));

    /* Render individual add-ons in breakdown */
    renderAddonsBreakdown();

    setEl('bTotal',  fmtDollar(ghosxt));
    setEl('bAnnual', fmtDollar(ghosxt * 12));

    /* Savings card */
    setEl('hireCostLabel',
      hires === 1
        ? 'Internal IT hire × 1 (avg. CA)'
        : `Internal IT team × ${hires} hires (avg. CA)`
    );
    setEl('hireCost',          fmtDollar(internal) + '/mo');
    setEl('ghosxtCostCompare', fmtDollar(ghosxt)   + '/mo');
    setEl('sTier', TIER_LABELS[tier]);

    const savMoEl  = document.getElementById('savingsPerMonth');
    const savYrEl  = document.getElementById('savingsPerYear');
    const savPctEl = document.getElementById('savingsPct');
    if (savMoEl)  { savMoEl.textContent  = savedMo > 0 ? fmtDollar(savedMo) : '$0'; flash(savMoEl); }
    if (savYrEl)  { savYrEl.textContent  = savedYr > 0 ? fmtDollar(savedYr) : '$0'; flash(savYrEl); }
    if (savPctEl) { savPctEl.textContent = pct > 0     ? pct + '%'           : '—';  flash(savPctEl); }

    const barEl = document.getElementById('savingsBar');
    if (barEl) barEl.style.width = (internal > 0 ? Math.min(100, Math.round((ghosxt / internal) * 100)) : 100) + '%';

    const noteEl = document.getElementById('savingsNoteText');
    if (noteEl) {
      noteEl.textContent = hires > 1
        ? `At ${users} users, most CA businesses need ~${hires} IT hires (1:18 industry ratio). Each fully loaded at ~$100k/yr. Ghosxt replaces the entire team with one predictable monthly fee.`
        : `Internal IT hire estimate based on avg. CA salary + benefits + overhead (~$77k/yr + 30% burden). At ${users} users, 1 hire is the SMB industry benchmark.`;
    }

    const heroEl = document.getElementById('heroSavingsPct');
    if (heroEl) heroEl.textContent = pct > 0 ? pct + '%' : '—';
  }

  /* ── CONTROLS ────────────────────────────────────────────── */
  function setUsers(raw) {
    state.users = Math.max(MIN_USERS, Math.min(500, parseInt(raw) || MIN_USERS));
    const ui = document.getElementById('userCount');
    const us = document.getElementById('userSlider');
    if (ui) ui.value = state.users;
    if (us) us.value = Math.min(state.users, 200);
    render();
  }

  function init() {
    const stepDown   = document.getElementById('stepDown');
    const stepUp     = document.getElementById('stepUp');
    const userInput  = document.getElementById('userCount');
    const userSlider = document.getElementById('userSlider');

    if (stepDown)   stepDown.addEventListener('click', () => setUsers(state.users - 1));
    if (stepUp)     stepUp.addEventListener('click',   () => setUsers(state.users + 1));
    if (userInput)  {
      userInput.addEventListener('change', () => setUsers(userInput.value));
      userInput.addEventListener('input',  () => setUsers(userInput.value));
    }
    if (userSlider) userSlider.addEventListener('input', () => setUsers(userSlider.value));

    /* Tier radios */
    document.querySelectorAll('input[name="tier"]').forEach(r => {
      r.addEventListener('change', () => {
        if (r.checked) { state.tier = r.value; render(); }
      });
    });

    /* Add-on checkboxes — toggle qty wrap visibility, then re-render */
    document.querySelectorAll('.addon-item input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => {
        const item = cb.closest('.addon-item');
        const qw   = item?.querySelector('.addon-qty-wrap');
        if (qw) {
          if (cb.checked) {
            qw.classList.remove('hidden');
          } else {
            qw.classList.add('hidden');
            const qtyEl = qw.querySelector('.addon-qty');
            if (qtyEl) qtyEl.textContent = '1';
          }
        }
        render();
      });
    });

    /* Qty +/- buttons */
    document.querySelectorAll('.addon-qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        const qtyEl  = btn.closest('.addon-qty-wrap')?.querySelector('.addon-qty');
        if (!qtyEl) return;
        let qty = parseInt(qtyEl.textContent) || 1;
        qty = action === 'up' ? qty + 1 : Math.max(1, qty - 1);
        qtyEl.textContent = qty;
        render();
      });
    });

    /* Set Professional as default selected */
    const proRadio = document.querySelector('input[name="tier"][value="professional"]');
    if (proRadio) proRadio.checked = true;
    state.tier = 'professional';

    render();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();