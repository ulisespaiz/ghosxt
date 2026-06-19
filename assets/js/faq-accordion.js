// FAQ accordion: one open item at a time, with aria-expanded kept in sync.
// Shared by contact.html, ctpat.html, and website-development.html.
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          otherItem
            .querySelector(".faq-question")
            .setAttribute("aria-expanded", "false");
        }
      });

      // Toggle current item
      item.classList.toggle("active");
      const isExpanded = item.classList.contains("active");
      question.setAttribute("aria-expanded", isExpanded);
    });
  });
});
