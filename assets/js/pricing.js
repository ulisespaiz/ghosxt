/* ═══════════════════════════════════════════════════════════════
   PRICING.JS — Ghosxt Pricing Page Calculator
   UPDATED: Shows individual add-on line items with quantities
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── CONSTANTS ───────────────────────────────────────────── */
  const TIER_PRICES  = { essential: 125, professional: 175, premium: 250 };
  const TIER_LABELS  = { essential: 'Core Managed IT', professional: 'Secure Growth', premium: 'Compliance & Continuity' };
  const MIN_USERS      = 5;

  /* Loaded monthly cost for each role (CA salary + 30% benefits/overhead, ÷12).
     `threshold` = endpoint count below which the role is not yet realistic
     for an in-house team. Below threshold the role is "blanked out" in the
     comparison so we don't claim a 5-user shop needs a Network Engineer.
     `ratio` = how many endpoints one hire can cover before a second is needed. */
  const ROLES = [
    { key: 'itTech', label: 'IT Tech',          baseCount: 1, ratio: 75,  threshold: 0,  monthly: 8333  },  // ~$77k loaded, always active
    { key: 'sysEng', label: 'Systems Engineer', baseCount: 1, ratio: 150, threshold: 30, monthly: 10833 }, // ~$100k loaded, needed at 30+
    { key: 'netEng', label: 'Network Engineer', baseCount: 1, ratio: 250, threshold: 75, monthly: 12083 }  // ~$112k loaded, needed at 75+
  ];

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

  function roleActive(users, role) {
    return users >= role.threshold;
  }

  function roleCounts(users) {
    return ROLES.reduce((acc, r) => {
      acc[r.key] = roleActive(users, r) ? Math.max(r.baseCount, Math.ceil(users / r.ratio)) : 0;
      return acc;
    }, {});
  }

  function roleCost(users, key) {
    const r = ROLES.find(x => x.key === key);
    if (!r) return 0;
    if (!roleActive(users, r)) return 0;
    const count = Math.max(r.baseCount, Math.ceil(users / r.ratio));
    return count * r.monthly;
  }

  function internalCost(users) {
    return ROLES.reduce((sum, r) => sum + roleCost(users, r.key), 0);
  }

  function totalHireCount(users) {
    const counts = roleCounts(users);
    return Object.values(counts).reduce((a, b) => a + b, 0);
  }

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
    const counts   = roleCounts(users);
    const base     = users * TIER_PRICES[tier];
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

    /* Savings card: per-role line items. Roles below their threshold are
       blanked out with a "not yet needed" message and a — for the cost. */
    function renderRole(role, labelId, costId) {
      const labelEl = document.getElementById(labelId);
      const costEl  = document.getElementById(costId);
      const row     = labelEl ? labelEl.closest('.compare-row') : null;
      const active  = roleActive(users, role);
      if (active) {
        const count = counts[role.key];
        if (labelEl) labelEl.textContent = `${role.label} × ${count} (avg. CA)`;
        if (costEl)  costEl.textContent  = fmtDollar(roleCost(users, role.key)) + '/mo';
        if (row)     row.classList.remove('compare-row-inactive');
      } else {
        if (labelEl) labelEl.textContent = `${role.label} (not yet needed at ${users} endpoints)`;
        if (costEl)  costEl.textContent  = '—';
        if (row)     row.classList.add('compare-row-inactive');
      }
    }
    renderRole(ROLES[0], 'itTechLabel', 'itTechCost');
    renderRole(ROLES[1], 'sysEngLabel', 'sysEngCost');
    renderRole(ROLES[2], 'netEngLabel', 'netEngCost');
    setEl('hireCost',       fmtDollar(internal) + '/mo');
    setEl('ghosxtCostCompare', fmtDollar(ghosxt) + '/mo');
    setEl('sTier', TIER_LABELS[tier]);

    const savMoEl  = document.getElementById('savingsPerMonth');
    const savYrEl  = document.getElementById('savingsPerYear');
    const savPctEl = document.getElementById('savingsPct');
    if (savMoEl)  { savMoEl.textContent  = savedMo > 0 ? fmtDollar(savedMo) : '$0'; flash(savMoEl); }
    if (savYrEl)  { savYrEl.textContent  = savedYr > 0 ? fmtDollar(savedYr) : '$0'; flash(savYrEl); }
    if (savPctEl) { savPctEl.textContent = pct > 0     ? pct + '%'          : '—';  flash(savPctEl); }

    const barEl = document.getElementById('savingsBar');
    if (barEl) barEl.style.width = (internal > 0 ? Math.min(100, Math.round((ghosxt / internal) * 100)) : 100) + '%';

    const noteEl = document.getElementById('savingsNoteText');
    if (noteEl) {
      noteEl.textContent = `Roles unlock as your business grows: a Systems Engineer becomes realistic around 30 endpoints, a Network Engineer around 75. Below those thresholds, one IT generalist usually carries everything (and the engineering and security work suffers). Staffing ratios are industry SMB benchmarks (1 IT tech per 75, 1 sys engineer per 150, 1 network engineer per 250). Salaries are CA averages plus 30% for benefits and overhead.`;
    }

    const heroEl = document.getElementById('heroSavingsPct');
    if (heroEl) heroEl.textContent = pct > 0 ? pct + '%' : '—';
  }

  /* ── CONTROLS ────────────────────────────────────────────── */
  function setUsers(raw) {
    const parsed = parseInt(raw);
    const notice = document.getElementById('under5Notice');
    if (notice) notice.hidden = !(Number.isFinite(parsed) && parsed >= 1 && parsed < MIN_USERS);
    state.users = Math.max(MIN_USERS, Math.min(500, parsed || MIN_USERS));
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