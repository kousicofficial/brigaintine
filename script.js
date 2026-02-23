/* =====================================
   AUTO SLIDER (ONE BY ONE - CLEAN)
===================================== */

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const progressBar = document.querySelector(".slider-progress");

let currentIndex = 0;
let autoSlide;


/* Update Slider Position */
function updateSlider() {

    if (!slider || slides.length === 0) return;

    slider.style.transform =
        `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === currentIndex);
    });

    /* Progress bar */
    if (progressBar) {

        progressBar.style.transition = "none";
        progressBar.style.width = "0";

        progressBar.offsetHeight;

        progressBar.style.transition = "width 5s linear";
        progressBar.style.width = "100%";

    }

}


/* Next Slide */
function nextSlide() {
    currentIndex++;
    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }
    updateSlider();
    startSlider(); // Reset timer on manual move
}

function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }
    updateSlider();
    startSlider(); // Reset timer on manual move
}


/* Start Auto Play */
function startSlider() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 5000);
}


/* ================= SLIDER CONTROLS ================= */

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dots = document.querySelectorAll(".dot");

if (nextBtn) nextBtn.addEventListener("click", nextSlide);
if (prevBtn) prevBtn.addEventListener("click", prevSlide);

dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        currentIndex = i;
        updateSlider();
        startSlider();
    });
});

/* Update slider dots on change */
function updateDots() {
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
    });
}

// Update updateSlider to include dots
const originalUpdateSlider = updateSlider;
updateSlider = function() {
    originalUpdateSlider();
    if (dots.length > 0) updateDots();
};


/* ================= HAMBURGER ================= */

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {

    hamburger.addEventListener("click", () => {

        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");

        document.body.style.overflow =
            navLinks.classList.contains("active")
                ? "hidden"
                : "auto";

    });

}


/* Close menu on click */

document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
            document.body.style.overflow = "auto";

        });

    });


/* ================= SCROLL ANIMATION ================= */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }

    });

}, { threshold: 0.15 });


document
    .querySelectorAll("section, .site-footer")
    .forEach(el => observer.observe(el));


/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {

    if (slides.length > 0) {

        slides[0].classList.add("active");

        updateSlider();
        startSlider();

    }

});