const reviews = Array.from({ length: 5 }, () => ({
  name: "Александр Смирнов",
  rating: "5.0",
  date: "16 сен 2025",
  text:
    "Обращались в компанию для изготовления и монтажа металлоконструкций под производственные нужды. С самого начала понравился профессиональный подход: быстро разобрались в задаче, предложили оптимальные технические решения и адекватные сроки."
}));

const list = document.getElementById("reviews-list");

reviews.forEach(r => {
  const el = document.createElement("div");
  el.className = "review";

  el.innerHTML = `
    <div class="review__top">
      <div>
        <span class="review__name">${r.name}</span>
        <span class="review__rating">★ <p>${r.rating}</p></span>
      </div>
      <div class="review__date">${r.date}</div>
    </div>
    <div class="review__text">${r.text}</div>
  `;

  list.appendChild(el);
});
