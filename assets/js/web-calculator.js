// Website-development pricing calculator (website-development.html).
(function () {
  const packages = {
    essential: { name: "Essential", price: 1800 },
    business: { name: "Business Pro", price: 3200 },
    ecommerce: { name: "E-commerce", price: 5900 },
  };

  function fmt(n) {
    return n.toLocaleString("en-US");
  }

  function recalc() {
    const selectedRadio = document.querySelector(
      'input[name="projectType"]:checked',
    );
    if (!selectedRadio) return;

    const pkg = packages[selectedRadio.value];
    let addonsTotal = 0;
    let hasMonthly = false;
    const addonRows = [];

    document
      .querySelectorAll('.addon-web-list input[type="checkbox"]')
      .forEach((cb) => {
        if (!cb.checked) return;
        if (cb.id === "maintenanceCheckbox") {
          hasMonthly = true;
        } else {
          const price = parseInt(cb.dataset.price, 10) || 0;
          const name = cb
            .closest(".addon-web-item")
            .querySelector(".addon-web-name")
            .textContent.trim();
          addonsTotal += price;
          addonRows.push({ name, price });
        }
      });

    const total = pkg.price + addonsTotal;

    document.getElementById("totalWebCost").textContent = fmt(total);
    document.getElementById("webProjectName").textContent = pkg.name;
    document.getElementById("webBasePrice").textContent =
      "$" + fmt(pkg.price);
    document.getElementById("webTotalBuild").textContent =
      "$" + fmt(total);

    document.getElementById("webAddonsBreakdown").innerHTML = addonRows
      .map(
        (r) =>
          `<div class="breakdown-web-row">
              <span class="breakdown-web-label">+ ${r.name}</span>
              <span class="breakdown-web-value">$${fmt(r.price)}</span>
          </div>`,
      )
      .join("");

    document.getElementById("webMonthlyRow").style.display = hasMonthly
      ? "flex"
      : "none";

    const amountEl = document.getElementById("totalWebCost");
    amountEl.classList.remove("updating");
    void amountEl.offsetWidth;
    amountEl.classList.add("updating");
  }

  document
    .querySelectorAll('input[name="projectType"]')
    .forEach((r) => r.addEventListener("change", recalc));
  document
    .querySelectorAll('.addon-web-list input[type="checkbox"]')
    .forEach((cb) => cb.addEventListener("change", recalc));
  recalc();
})();
