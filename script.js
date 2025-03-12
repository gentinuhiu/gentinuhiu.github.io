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

    // Navbar Toggle
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

    // Statistics Animation
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

    // Smooth scrolling for ALL links, not just navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetElement = document.querySelector(this.getAttribute('href'));

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Table Plan Image Switching with Buttons
    const tablePlanImg = document.getElementById("table-plan-img");
    const prevButton = document.getElementById("prev-plan");
    const nextButton = document.getElementById("next-plan");
    const images = ["outside.jpg", "inside.jpg", "vip.jpg"];
    let currentIndex = 0;

    function changeImage(direction) {
        if (direction === "up" && currentIndex > 0) {
            currentIndex--;
        } else if (direction === "down" && currentIndex < images.length - 1) {
            currentIndex++;
        }
        tablePlanImg.style.opacity = "0"; // Fade out effect
        setTimeout(() => {
            tablePlanImg.src = images[currentIndex];
            tablePlanImg.style.opacity = "1"; // Fade in effect
        }, 300);
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener("click", () => changeImage("up"));
        nextButton.addEventListener("click", () => changeImage("down"));
    }

    // Restrict Time Input (3 PM - 12 AM)
    const timeInput = document.getElementById("time");

    if (timeInput) {
        timeInput.addEventListener("change", function () {
            let selectedTime = this.value;
            let minTime = "12:00"; // 3:00 PM
            let maxTime = "23:59"; // 11:59 PM

            if (selectedTime < minTime) {
                this.value = minTime;
            }
            if (selectedTime > maxTime) {
                this.value = maxTime;
            }
        });
    }
});
