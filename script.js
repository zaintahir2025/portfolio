document.addEventListener("DOMContentLoaded", () => {
    
    // --- Custom Cursor Logic ---
    const cursor = document.getElementById("custom-cursor");
    const hoverTargets = document.querySelectorAll(".hover-target, a, button");
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Smooth interpolation for the cursor
    function animateCursor() {
        let distX = mouseX - cursorX;
        let distY = mouseY - cursorY;
        
        cursorX = cursorX + (distX * 0.2);
        cursorY = cursorY + (distY * 0.2);
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    hoverTargets.forEach(target => {
        target.addEventListener("mouseenter", () => {
            cursor.classList.add("hovering");
        });
        target.addEventListener("mouseleave", () => {
            cursor.classList.remove("hovering");
        });
    });

    // --- Bento Item Mouse Glow ---
    const bentoItems = document.querySelectorAll(".bento-item");
    bentoItems.forEach(item => {
        item.addEventListener("mousemove", (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            item.style.setProperty("--mouse-x", `${x}px`);
            item.style.setProperty("--mouse-y", `${y}px`);
        });
    });

    // --- 3D Tilt Effect on Bento Cards ---
    bentoItems.forEach(item => {
        item.addEventListener("mousemove", (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation (max 5 degrees)
            const xRotation = -((y - rect.height / 2) / rect.height) * 10;
            const yRotation = ((x - rect.width / 2) / rect.width) * 10;
            
            item.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        item.addEventListener("mouseleave", () => {
            item.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // --- Magnetic Button ---
    const magneticBtn = document.querySelector(".magnetic-btn");
    if (magneticBtn) {
        magneticBtn.addEventListener("mousemove", (e) => {
            const rect = magneticBtn.getBoundingClientRect();
            const h = rect.width / 2;
            const v = rect.height / 2;
            
            const x = e.clientX - rect.left - h;
            const y = e.clientY - rect.top - v;
            
            magneticBtn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        magneticBtn.addEventListener("mouseleave", () => {
            magneticBtn.style.transform = `translate(0px, 0px)`;
        });
    }

    // --- Smooth Scroll Reveal (Staggered) ---
    const revealElements = document.querySelectorAll(".reveal");
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a small delay based on index if multiple elements appear at once
                setTimeout(() => {
                    entry.target.classList.add("active");
                }, 100 * index); // 100ms stagger
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});
