const jobs = Array.from({length: 9}, (_, i) => ({
    title: "Менеджер продаж",
    city: "г. Смоленск",
    description: "Работа с входящими заявками и существующей клиентской базой: консультации, подбор решений, расчёты и сопровождение сделки до результата.",
    salary: "от 80 000 ₽",
    id: i
}));

const container = document.getElementById("jobs");

jobs.forEach(job => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <h3>${job.title}</h3>
        <div class="location">${job.city}</div>
        <div class="description">${job.description}</div>
        <div class="salary">${job.salary}</div>
        <div class="buttons">
            <button class="btn primary-btn button--second">Откликнуться</button>
            <button class="btn secondary-btn">Подробнее</button>
        </div>
    `;

    container.appendChild(card);
    const detailsBtn = card.querySelector(".secondary-btn");
    detailsBtn.addEventListener("click", () => {
        localStorage.setItem("selectedJob", JSON.stringify({
            title: job.title,
            city: job.city,
            description: job.description,
            salary: job.salary
        }));
        window.location.href = `vacancies-inside.html`;
    });
});
