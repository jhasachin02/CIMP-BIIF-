/**
 * CIMP - BIIF: PREMIER IIT / IIM TIER INTERACTIONS
 */

document.addEventListener("DOMContentLoaded", function () {
    // 1. Metric Counter Animation
    const counters = document.querySelectorAll(".metric-number");
    let hasAnimated = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            const prefix = counter.getAttribute("data-prefix") || "";
            const suffix = counter.getAttribute("data-suffix") || "";
            let count = 0;
            const speed = 1500 / target; // complete in 1.5s

            const updateCount = () => {
                const inc = Math.ceil(target / 40);
                if (count < target) {
                    count += inc;
                    if (count > target) count = target;
                    counter.innerText = prefix + count.toLocaleString() + suffix;
                    setTimeout(updateCount, 35);
                } else {
                    counter.innerText = prefix + target.toLocaleString() + suffix;
                }
            };
            updateCount();
        });
    }

    const impactSection = document.querySelector(".impact-strip-section");
    if (impactSection && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
            }
        }, { threshold: 0.2 });
        observer.observe(impactSection);
    } else {
        animateCounters();
    }

    // 2. Sticky Glass Header
    const brandBar = document.querySelector(".header-brand-bar");
    window.addEventListener("scroll", function () {
        if (brandBar) {
            if (window.scrollY >= 80) {
                brandBar.classList.add("sticky");
            } else {
                brandBar.classList.remove("sticky");
            }
        }
    });

    // 3. Mobile Navigation Toggle
    const mobileToggle = document.getElementById("isToggle");
    const navMenu = document.getElementById("navigation");
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", function (e) {
            e.preventDefault();
            navMenu.classList.toggle("open");
            mobileToggle.classList.toggle("open");
        });
    }

    // 4. Interactive SDG Matrix Tabs
    const sdgTabs = document.querySelectorAll(".sdg-tab-btn");
    const sdgCards = document.querySelectorAll(".single-flip-box");

    // Mapping SDG numbers to categories
    const sdgCategories = {
        "economic": [1, 8, 9, 12],
        "social": [2, 3, 4, 5, 10],
        "climate": [6, 7, 13, 14, 15],
        "alliances": [16, 17]
    };

    sdgTabs.forEach(tab => {
        tab.addEventListener("click", function () {
            sdgTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            const cat = tab.getAttribute("data-category");

            sdgCards.forEach((card, index) => {
                const goalNum = index + 1;
                if (cat === "all") {
                    card.style.display = "block";
                } else if (sdgCategories[cat] && sdgCategories[cat].includes(goalNum)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 5. Toast Notification System
    window.showEliteToast = function (title, message) {
        let toast = document.getElementById("elite-toast");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "elite-toast";
            toast.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: #0A192F;
                color: #FFFFFF;
                border-left: 4px solid #10B981;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                border-radius: 12px;
                padding: 18px 24px;
                display: flex;
                align-items: center;
                gap: 16px;
                z-index: 999999;
                font-family: 'Plus Jakarta Sans', sans-serif;
                animation: iitSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            `;
            document.body.appendChild(toast);
        }
        toast.innerHTML = `
            <i class="uil uil-check-circle" style="font-size: 28px; color: #10B981;"></i>
            <div>
                <h6 style="margin: 0; font-size: 15px; font-weight: 700; color: #FFFFFF;">${title}</h6>
                <p style="margin: 4px 0 0 0; font-size: 13.5px; color: #94A3B8;">${message}</p>
            </div>
        `;
        toast.style.display = "flex";
        setTimeout(() => {
            toast.style.display = "none";
        }, 4500);
    };

    // 6. Form Interception
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            window.showEliteToast("Application Submitted!", "Thank you for connecting with CIMP-BIIF. Our incubation committee will review your submission.");
            form.reset();
        });
    });
});
