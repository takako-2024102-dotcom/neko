document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".info-card");

  cards.forEach(card => {
    const header = card.querySelector(".card-header");

    header.addEventListener("click", () => {
      card.classList.toggle("open");
    });
  });
});
