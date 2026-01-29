const jobs = Array.from({length: 9}, () => ({
    title: "Менеджер продаж",
    city: "г. Смоленск",
    description:
    "Работа с входящими заявками и существующей клиентской базой: консультации, подбор решений, расчёты и сопровождение сделки до результата.",
  salary: "от 80 000 ₽",
}));

const container = document.getElementById("jobs");

jobs.forEach(jobs => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
    <h3>${jobs.title}</h3>
    <div class="location">${jobs.city}</div>
    <div class="description">${jobs.description}</div>
    <div class="salary">${jobs.salary}</div>
    <div class="buttons">
        <button class="btn primary-btn button--second">Откликнуться</button>
        <button class="btn secondary-btn">Подробнее</button>
    </div>
    `;
    container.appendChild(card);
});