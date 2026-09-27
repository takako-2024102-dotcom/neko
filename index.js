document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, {
    threshold: 0.2
  });

  items.forEach(item => observer.observe(item));
});

const items = document.querySelectorAll(".fade-up, .fade-pop");
