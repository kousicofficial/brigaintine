/* =====================================
   THREE.JS 3D HERO ANIMATION
===================================== */

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("#hero-canvas");
    if (!canvas) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // GEOMETRY - Particle Grid
    const particlesCount = 1500;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
        colors[i] = Math.random();
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // MATERIAL
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.015,
        vertexColors: false,
        color: 0x00a8e8,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    // POINTS
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 3;

    // MOUSE INTERACTION
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    });

    // RESPONSIVE
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // ANIMATION LOOP
    const clock = new THREE.Clock();

    const animate = () => {
        const elapsedTime = clock.getElapsedTime();

        // Update particles
        particlesMesh.rotation.y = elapsedTime * 0.05;
        
        // Mouse follow effect
        particlesMesh.rotation.x += (mouseY * 0.1 - particlesMesh.rotation.x) * 0.05;
        particlesMesh.rotation.y += (mouseX * 0.1 - particlesMesh.rotation.y) * 0.05;

        renderer.render(scene, camera);
        window.requestAnimationFrame(animate);
    };

    animate();


    /* ================= HAMBURGER ================= */
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
            document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "auto";
        });
    }

    /* Close menu on click */
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            if (hamburger) hamburger.classList.remove("active");
            if (navLinks) navLinks.classList.remove("active");
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
    }, { threshold: 0.1 });

    document.querySelectorAll("section, .site-footer").forEach(el => observer.observe(el));
});