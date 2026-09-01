/**
 * CIMP - BIIF Interactive Clone Enhancements
 */

document.addEventListener("DOMContentLoaded", function () {
    // 1. Sticky Navigation
    const topnav = document.getElementById("topnav");
    window.addEventListener("scroll", function () {
        if (topnav) {
            if (window.scrollY >= 50) {
                topnav.classList.add("nav-sticky");
            } else {
                topnav.classList.remove("nav-sticky");
            }
        }

        // Back to top button visibility
        const backToTop = document.getElementById("back-to-top");
        if (backToTop) {
            if (window.scrollY >= 300) {
                backToTop.style.display = "block";
            } else {
                backToTop.style.display = "none";
            }
        }
    });

    // 2. Mobile Menu Toggle
    const toggleBtn = document.getElementById("isToggle");
    const navigation = document.getElementById("navigation");
    if (toggleBtn && navigation) {
        toggleBtn.addEventListener("click", function (e) {
            e.preventDefault();
            navigation.classList.toggle("open");
            toggleBtn.classList.toggle("open");
        });
    }

    // 3. Mobile Submenu Dropdown Accordion
    const parentMenuItems = document.querySelectorAll(".navigation-menu .has-submenu > a");
    parentMenuItems.forEach(function (item) {
        item.addEventListener("click", function (e) {
            if (window.innerWidth <= 991) {
                e.preventDefault();
                const parent = item.parentElement;
                const submenu = parent.querySelector(".submenu");
                const arrow = parent.querySelector(".menu-arrow");
                if (submenu) {
                    submenu.classList.toggle("open-submenu");
                }
                if (arrow) {
                    arrow.classList.toggle("rotate-arrow");
                }
            }
        });
    });

    // 4. SDG Flip Cards Touch Support
    const flipBoxes = document.querySelectorAll(".single-flip-box");
    flipBoxes.forEach(function (box) {
        box.addEventListener("click", function () {
            if (window.innerWidth <= 991) {
                box.classList.toggle("flipped");
            }
        });
    });

    // 5. Notice Modal Handling
    const basicModal = document.getElementById("basicModal");
    const closeModalBtn = document.getElementById("close-modal");
    if (basicModal && closeModalBtn) {
        const isDismissed = sessionStorage.getItem("cimp_notice_dismissed");
        if (!isDismissed && typeof $ !== "undefined" && $.fn.modal) {
            $("#basicModal").modal("show");
        }
        closeModalBtn.addEventListener("click", function () {
            if (typeof $ !== "undefined" && $.fn.modal) {
                $("#basicModal").modal("hide");
            } else {
                basicModal.style.display = "none";
                basicModal.classList.remove("show");
            }
            sessionStorage.setItem("cimp_notice_dismissed", "true");
        });
    }

    // 6. Interactive Toast System
    let toast = document.getElementById("clone-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "clone-toast";
        toast.innerHTML = `
            <i class="uil uil-check-circle" style="font-size: 24px; color: #10b981;"></i>
            <div>
                <strong id="toast-title" style="display:block; font-size: 14px;">Success</strong>
                <span id="toast-msg" style="font-size: 13px; color: #cbd5e1;">Your request has been submitted successfully.</span>
            </div>
        `;
        document.body.appendChild(toast);
    }

    window.showToast = function (title, message) {
        const toastTitle = document.getElementById("toast-title");
        const toastMsg = document.getElementById("toast-msg");
        if (toastTitle) toastTitle.textContent = title;
        if (toastMsg) toastMsg.textContent = message;
        toast.classList.add("show");
        setTimeout(function () {
            toast.classList.remove("show");
        }, 4000);
    };

    // 7. Form Handlers (Registration, Contact, Mentors, Investors)
    const forms = document.querySelectorAll("form");
    forms.forEach(function (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            // Simple validation check
            let valid = true;
            const requiredFields = form.querySelectorAll("[required]");
            requiredFields.forEach(function (field) {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add("is-invalid");
                } else {
                    field.classList.remove("is-invalid");
                }
            });

            if (valid) {
                window.showToast("Form Submitted!", "Thank you for reaching out to CIMP-BIIF. Our team will review and get back to you.");
                form.reset();
            } else {
                window.showToast("Incomplete Form", "Please fill in all the required fields before submitting.");
            }
        });
    });

    // 8. Startups Dynamic Filtering (on startups.html)
    const startupContainer = document.querySelector(".job-box.company-list");
    if (startupContainer) {
        const row = startupContainer.closest(".row");
        if (row && !document.querySelector(".filter-tabs")) {
            const filterTabs = document.createElement("div");
            filterTabs.className = "filter-tabs w-100 mb-4";
            filterTabs.innerHTML = `
                <button class="filter-btn active" data-filter="all">All Sectors</button>
                <button class="filter-btn" data-filter="Internet Services">Internet Services</button>
                <button class="filter-btn" data-filter="Fin-Tech">Fin-Tech</button>
                <button class="filter-btn" data-filter="Edu-Tech">Edu-Tech</button>
                <button class="filter-btn" data-filter="Health-Tech">Health-Tech</button>
                <button class="filter-btn" data-filter="Agri-Tech">Agri-Tech</button>
            `;
            row.parentNode.insertBefore(filterTabs, row);

            const buttons = filterTabs.querySelectorAll(".filter-btn");
            buttons.forEach(function (btn) {
                btn.addEventListener("click", function () {
                    buttons.forEach(b => b.classList.remove("active"));
                    btn.classList.add("active");
                    const filter = btn.getAttribute("data-filter");
                    const cards = row.querySelectorAll(".col-lg-4, .col-md-6");
                    cards.forEach(function (card, index) {
                        const text = card.textContent;
                        // simulate category assignment
                        if (filter === "all") {
                            card.style.display = "block";
                        } else {
                            if (text.toLowerCase().includes(filter.toLowerCase()) || (index % 3 === 0 && filter === "Fin-Tech") || (index % 2 === 0 && filter === "Edu-Tech")) {
                                card.style.display = "block";
                            } else {
                                card.style.display = "none";
                            }
                        }
                    });
                });
            });
        }
    }
});

// Back to top function
window.topFunction = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
};
