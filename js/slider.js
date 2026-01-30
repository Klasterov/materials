const products = [
  { title: "БЕРИЛЛИЕВЫЕ ЛЕНТЫ", img: "../images/1.jpg" },
  { title: "БИ, ТРИМЕТАЛЛИЧЕСКИЕ ЛЕНТЫ", img: "../images/2.jpg" },
  { title: "БРОНЗОВЫЕ ЛЕНТЫ", img: "../images/3.jpg" },
  { title: "ВИДЫ ДОПОЛНИТЕЛЬНЫХ ПОКРЫТИЙ ЛЕНТ", img: "../images/4.jpg" },
  { title: "ВОЛЬФРАМОВАЯ ЛЕНТА", img: "../images/5.png" },
  { title: "КРОВЕЛЬНЫЕ МЕДНЫЕ ЛЕНТЫ", img: "../images/6.jpg" }
];

const track = document.getElementById("sliderTrack");
track.innerHTML = products.map(item =>`
    <div class="product-card">
    <img src="${item.img}" alt="">
    <span>${item.title}</span>
    </div>
    `).join("");

const slider = document.querySelector(".slider");
let isDown = false;
let startX;
let scrollLeft;
slider.addEventListener("mousedown", e => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", () => {
    isDown = false;
});
slider.addEventListener("mouseup", () => {
    isDown = false;
});
slider.addEventListener("mousemove", e => {
  if (!isDown) return;
  e.preventDefault();

  const x = e.pageX - slider.offsetLeft;
  const delta = x - startX;

  slider.scrollLeft = scrollLeft - delta * 0.2;
});