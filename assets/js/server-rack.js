// Homepage server-rack build animation + LED cycling.
document.addEventListener("DOMContentLoaded", function () {
  const serverRacks = document.querySelectorAll(".server-rack");

  // Make each rack clickable
  serverRacks.forEach(function (rack, index) {
    // Add 'build' class initially to hide them
    rack.classList.add("build");

    rack.addEventListener("click", function () {
      rack.classList.toggle("build");
    });

    // Staggered animation - REMOVE 'build' class to make them appear
    const delay = index * 100;
    setTimeout(function () {
      rack.classList.remove("build");
    }, 250 + delay);
  });

  // LED Animation (intervals tracked to avoid memory leaks)
  const ledIntervals = [];
  function animateLEDs() {
    const allLedGroups = document.querySelectorAll(".led-group");
    allLedGroups.forEach(function (ledGroup) {
      const leds = ledGroup.querySelectorAll(".led");
      let currentIndex = 0;
      const id = setInterval(function () {
        leds.forEach(function (led) {
          led.classList.add("off");
        });
        leds[currentIndex].classList.remove("off");
        currentIndex = (currentIndex + 1) % leds.length;
      }, 200);
      ledIntervals.push(id);
    });
  }
  window.addEventListener("beforeunload", function () {
    ledIntervals.forEach(function (id) {
      clearInterval(id);
    });
  });

  // Start LED animation after racks appear
  setTimeout(animateLEDs, 500);
});
