// Ghosxt Cares page: scroll-to-top button + FAQ accordion.
document.addEventListener("DOMContentLoaded", function () {
  // Scroll to top button
  const scrollBtn = document.getElementById("scrollToTop");
  if (scrollBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        scrollBtn.classList.add("visible");
      } else {
        scrollBtn.classList.remove("visible");
      }
    });
    scrollBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // FAQ accordion
  document.querySelectorAll(".cares-faq-item").forEach(function (item) {
    const question = item.querySelector(".cares-faq-question");
    question.addEventListener("click", function () {
      const isOpen = item.classList.toggle("active");
      question.setAttribute("aria-expanded", String(isOpen));
    });
  });
});
