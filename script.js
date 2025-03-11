document.addEventListener("DOMContentLoaded", function () {
    document.getElementsByTagName("header")[0].style.display = "none";
    
    // Loading Screen Effect
    setTimeout(() => {
        document.getElementById("loading-screen").style.opacity = "0";
        setTimeout(() => {
            let header = document.getElementsByTagName("header")[0];
            header.style.display = "flex";
            setTimeout(() => {
                header.classList.add("show"); // Apply transition effect
            }, 50); // Small delay to ensure display change takes effect
            document.getElementById("loading-screen").style.display = "none";
        }, 500); // Wait for fade-out effect
    }, 2000);

    // Table Plan Toggle
    const tablePlanImg = document.getElementById("table-plan-img");
    const toggleButton = document.getElementById("toggle-plan");

    if (tablePlanImg && toggleButton) { 
        let isInside = true; 

        toggleButton.addEventListener("click", function () {
            tablePlanImg.src = isInside ? "plan-outside.jpg" : "plan-inside.jpg";
            toggleButton.textContent = isInside ? "Switch to Inside" : "Switch to Outside";
            isInside = !isInside; 
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");

    function isMobile() {
        return window.innerWidth <= 768; // Only apply effects for mobile screens
    }

    menuToggle.addEventListener("click", function () {
        if (isMobile()) {
            if (navbar.classList.contains("active")) {
                navbar.style.opacity = "0";
                navbar.style.transform = "translateY(-20px)";
                setTimeout(() => {
                    navbar.classList.remove("active");
                    navbar.style.display = "none";
                }, 400);
            } else {
                navbar.style.display = "block";
                setTimeout(() => {
                    navbar.classList.add("active");
                    navbar.style.opacity = "1";
                    navbar.style.transform = "translateY(0)";
                }, 10);
            }
        }
    });

    // Close menu when clicking outside (only in mobile)
    document.addEventListener("click", function (event) {
        if (isMobile() && !navbar.contains(event.target) && !menuToggle.contains(event.target)) {
            navbar.style.opacity = "0";
            navbar.style.transform = "translateY(-20px)";
            setTimeout(() => {
                navbar.classList.remove("active");
                navbar.style.display = "none";
            }, 400);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const statNumbers = document.querySelectorAll(".stat-number");

    function animateNumbers() {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute("data-target");
            let count = 0;
            const speed = target / 100; // Adjust speed

            const updateCount = () => {
                if (count < target) {
                    count += speed;
                    stat.textContent = Math.floor(count);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target; // Ensure exact final value
                }
            };

            updateCount();
        });
    }

    // Trigger animation when in view
    const statsSection = document.getElementById("stats");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(statsSection); // Stop observing after animation
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
});



// Smooth scrolling
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
