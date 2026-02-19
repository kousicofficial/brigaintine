const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-arrow.prev');
const nextBtn = document.querySelector('.slider-arrow.next');
const dots = document.querySelectorAll('.dot');
const progressBar = document.querySelector('.slider-progress');

let currentIndex = 0;
let autoSlideInterval;

function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 33.333}%)`;
    
    // Update active slide class for transitions (Ken Burns & Text animations)
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentIndex);
    });

    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });

    // Reset and Restart Progress Bar
    if (progressBar) {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0';
        // Force reflow
        progressBar.offsetHeight; 
        progressBar.style.transition = 'width 5s linear';
        progressBar.style.width = '100%';
    }
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Event Listeners
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
        resetAutoSlide();
    });
});

// Intersection Observer for Section Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Initialize
if (slides.length > 0) {
    slides[0].classList.add('active');
}
if (progressBar) {
    progressBar.style.width = '100%';
}
startAutoSlide();
