document.addEventListener("DOMContentLoaded", () => {

  // カード開閉
  document.querySelectorAll(".info-card").forEach(card => {
    card.querySelector(".card-header").addEventListener("click", () => {
      card.classList.toggle("open");
    });
  });

  // フェードイン
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
});
