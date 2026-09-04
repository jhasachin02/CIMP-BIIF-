/**
 * CIMP - BIIF Interactive Clone Enhancements
 */

document.addEventListener("DOMContentLoaded", function () {
    // 1. Master Sticky Header is managed via .sticky-master-header CSS

    // 2. Mobile Menu Right Drawer & Backdrop System
    const toggleBtn = document.getElementById("isToggle");
    const navigation = document.getElementById("navigation");
    let navBackdrop = document.getElementById("navBackdrop");

    if (!navBackdrop) {
        navBackdrop = document.createElement("div");
        navBackdrop.id = "navBackdrop";
        navBackdrop.className = "mobile-nav-backdrop";
        document.body.appendChild(navBackdrop);
    }

    const masterHeader = document.querySelector(".sticky-master-header");

    function openMobileDrawer() {
        if (masterHeader) masterHeader.classList.add("drawer-open");
        if (topnav) topnav.classList.add("drawer-open");
        if (navigation) navigation.classList.add("is-open", "open");
        if (toggleBtn) toggleBtn.classList.add("is-active", "open");
        if (navBackdrop) navBackdrop.classList.add("is-active");
        document.body.style.overflow = "hidden";
    }

    function closeMobileDrawer() {
        if (masterHeader) masterHeader.classList.remove("drawer-open");
        if (topnav) topnav.classList.remove("drawer-open");
        if (navigation) navigation.classList.remove("is-open", "open");
        if (toggleBtn) toggleBtn.classList.remove("is-active", "open");
        if (navBackdrop) navBackdrop.classList.remove("is-active");
        document.body.style.overflow = "";
    }

    window.openMobileDrawer = openMobileDrawer;
    window.closeMobileDrawer = closeMobileDrawer;

    if (toggleBtn) {
        toggleBtn.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = navigation && (navigation.classList.contains("is-open") || navigation.classList.contains("open"));
            if (isOpen) {
                closeMobileDrawer();
            } else {
                openMobileDrawer();
            }
        });
    }

    // Direct event listener on Close button and Backdrop
    document.addEventListener("click", function (e) {
        if (e.target.closest("#mobileDrawerClose")) {
            e.preventDefault();
            e.stopPropagation();
            closeMobileDrawer();
            return;
        }

        if (e.target.closest("#navBackdrop")) {
            e.preventDefault();
            e.stopPropagation();
            closeMobileDrawer();
            return;
        }
    });

    if (navBackdrop) {
        navBackdrop.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            closeMobileDrawer();
        });
    }

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeMobileDrawer();
        }
    });

    // 3. Mobile Submenu Dropdowns (Accordion Behavior)
    const submenuLinks = document.querySelectorAll(".iit-menu .has-submenu > a, .navigation-menu .has-submenu > a");
    submenuLinks.forEach(function (parentLink) {
        parentLink.addEventListener("click", function (e) {
            if (window.innerWidth <= 991) {
                e.preventDefault();
                e.stopPropagation();
                const parentLi = parentLink.parentElement;
                const dropdown = parentLink.nextElementSibling;
                
                if (dropdown) {
                    const isAlreadyOpen = dropdown.classList.contains("is-open") || dropdown.classList.contains("open") || dropdown.classList.contains("open-submenu");
                    
                    // Close sibling dropdowns in the same menu
                    const siblingList = parentLi.parentElement.querySelectorAll(".has-submenu");
                    siblingList.forEach(function (li) {
                        if (li !== parentLi) {
                            li.classList.remove("is-open", "open");
                            const sub = li.querySelector(".iit-dropdown, .submenu");
                            if (sub) sub.classList.remove("is-open", "open", "open-submenu");
                        }
                    });

                    // Toggle current dropdown
                    if (isAlreadyOpen) {
                        dropdown.classList.remove("is-open", "open", "open-submenu");
                        parentLi.classList.remove("is-open", "open");
                    } else {
                        dropdown.classList.add("is-open", "open", "open-submenu");
                        parentLi.classList.add("is-open", "open");
                    }
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

    // 5. Notice Modal Handling - DISABLED per user request
    if (typeof $ !== "undefined" && $.fn.modal) {
        const popupModal = document.querySelector('.popup-modal');
        if (popupModal) popupModal.style.display = 'none';
    }
    const modalEl = document.getElementById("basicModal");
    if (modalEl) {
        modalEl.remove();
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

    // 7. Form Handlers (Registration, Contact, Mentors, Investors - excluding login forms)
    const forms = document.querySelectorAll("form:not(#modalLoginForm):not(#institutionalLoginForm)");
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
                // Collect form data
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // Send to backend/service
                fetch('/.netlify/functions/submit-form', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(result => {
                    if (result.success) {
                        window.showToast("Success!", "Thank you for reaching out to CIMP-BIIF. Our team will review and get back to you.");
                        form.reset();
                    } else {
                        window.showToast("Error", result.message || "Failed to submit form. Please try again.");
                    }
                })
                .catch(err => {
                    console.error('Form submission error:', err);
                    // Fallback: Send via Formspree as backup
                    const formspreeAction = 'https://formspree.io/f/YOUR_FORM_ID';
                    // For now, show message to enable this
                    window.showToast("Notice", "Form submission service is being configured. Please contact support@cimpbiif.com");
                });
            } else {
                window.showToast("Incomplete Form", "Please fill in all the required fields before submitting.");
            }
        });
    });

    // 8. Startups Dynamic Directory (on startups.html)
    const MOCK_STARTUPS = [
        {
            id: 1, name: 'Digital Labour Chowk', initial: 'D', logo: 'assets/images/startups/logo-dlc.png',
            sector: 'Technology',
            stage: 'Revenue Stage', status: 'Active',
            founder: 'Chandrashekhar Mandal', year: 2022, location: 'Maurya Lok, Patna',
            desc: 'An award-winning platform connecting construction and daily wage workers directly with local employers and contractors across Bihar without intermediaries.',
            color: '#4527A0', metric: '5,000+', metricLabel: 'Workers Registered'
        },
        {
            id: 2, name: 'Gramshree Agri Services', initial: 'G', logo: 'assets/images/startups/logo-gramshree.png',
            sector: 'AgriTech',
            stage: 'Scaling', status: 'Active',
            founder: 'Aastha Singh', year: 2021, location: 'Patna',
            desc: 'Empowering Bihar farmers through a B2F agri-input, crop advisory, and market-linkage platform. Secured ₹80L VC investment in 2024.',
            color: '#2E7D32', metric: '₹80L+', metricLabel: 'Venture Investment'
        },
        {
            id: 3, name: 'Railrestro', initial: 'R', logo: 'assets/images/startups/logo-railrestro.png',
            sector: 'E-commerce',
            stage: 'Scaling', status: 'Graduated',
            founder: 'Manish Chandra', year: 2017, location: 'Patna',
            desc: 'Leading e-catering platform serving fresh restaurant food to railway passengers on trains across 450+ major Indian stations.',
            color: '#B71C1C', metric: '450+', metricLabel: 'Stations Covered'
        },
        {
            id: 4, name: 'Hanuman Care', initial: 'H', logo: 'assets/images/startups/logo-hanuman.png',
            sector: 'HealthTech',
            stage: 'Revenue Stage', status: 'Active',
            founder: 'Dr. Niraj Jha', year: 2020, location: 'Patna',
            desc: 'Digital healthcare, emergency ambulance aggregator, and home diagnostics network providing fast, affordable medical response in Bihar.',
            color: '#C62828', metric: '10k+', metricLabel: 'Emergency Rides'
        },
        {
            id: 5, name: 'ShadowGrid Technologies', initial: 'S', logo: 'assets/images/startups/logo-shadowgrid.png',
            sector: 'Technology',
            stage: 'Idea Stage', status: 'Active',
            founder: 'Rahul Kumar', year: 2023, location: 'Patna',
            desc: 'Advanced cyber defense, surveillance, and stealth communications systems. Selected for MSME Idea Hackathon 5.0 funding.',
            color: '#1E3A8A', metric: '₹15L', metricLabel: 'MSME Grant Winner'
        },
        {
            id: 6, name: 'Project Starline (Starline AI)', initial: 'P', logo: 'assets/images/startups/logo-starline.png',
            sector: 'Technology',
            stage: 'Idea Stage', status: 'Active',
            founder: 'Keshav Kumar', year: 2023, location: 'Patna',
            desc: 'Developing AI-guided autonomous stealth glider drone models for remote agricultural monitoring, surveillance, and rescue.',
            color: '#2563EB', metric: '₹15L', metricLabel: 'MSME Grant Winner'
        },
        {
            id: 7, name: 'Chill Roof (CoolRoof India)', initial: 'C', logo: 'assets/images/startups/logo-coolroof.png',
            sector: 'CleanTech',
            stage: 'Pre-Revenue', status: 'Active',
            founder: 'Suraj Kumar', year: 2023, location: 'Bhagalpur',
            desc: 'Eco-friendly ceramic tiles designed to reduce building surface temperatures by up to 12°C, improving energy efficiency.',
            color: '#0D9488', metric: '12°C', metricLabel: 'Temp Reduction'
        },
        {
            id: 8, name: 'Urban Kare Internet', initial: 'U', logo: 'assets/images/startups/logo-urbankare.png',
            sector: 'Technology',
            stage: 'Pre-Revenue', status: 'Active',
            founder: 'Abhishek Kumar', year: 2022, location: 'Patna',
            desc: 'On-demand home maintenance and appliance servicing portal connecting verified local professionals with urban consumers.',
            color: '#EA580C', metric: '1.5k+', metricLabel: 'Services Booked'
        },
        {
            id: 9, name: 'Maataram Network', initial: 'M', logo: 'assets/images/startups/logo-maataram.png',
            sector: 'Technology',
            stage: 'Pre-Revenue', status: 'Active',
            founder: 'Santosh Kumar', year: 2021, location: 'Patna',
            desc: 'Designing decentralized rural broadband networks and high-speed telecom distribution for digital connectivity in remote blocks.',
            color: '#C2410C', metric: '12+', metricLabel: 'Rural Hubs Built'
        },
        {
            id: 10, name: 'Aryan Cabs & Rurals Trans', initial: 'A', logo: 'assets/images/startups/logo-aryancabs.png',
            sector: 'Technology',
            stage: 'Revenue Stage', status: 'Active',
            founder: 'Akhilesh Singh', year: 2021, location: 'Gaya',
            desc: 'Shared mobility and reliable intercity transport services tailored specifically for rural commuters and pilgrimage hubs in Gaya.',
            color: '#6366F1', metric: '50k+', metricLabel: 'Kms Traveled'
        },
        {
            id: 11, name: 'Goknight Innovators', initial: 'G', logo: 'assets/images/startups/logo-goknight.png',
            sector: 'Technology',
            stage: 'Idea Stage', status: 'Active',
            founder: 'Nitin Kumar', year: 2022, location: 'Patna',
            desc: 'IoT-enabled automated micro-valves and smart flow meters optimizing municipal water grid distribution in urban residential projects.',
            color: '#0284C7', metric: '5+', metricLabel: 'IPR & Patents'
        },
        {
            id: 12, name: 'Maas Infosolutions', initial: 'M', logo: 'assets/images/startups/logo-maas.png',
            sector: 'Technology',
            stage: 'Revenue Stage', status: 'Active',
            founder: 'Amit Kumar', year: 2021, location: 'Patna',
            desc: 'Providing enterprise SaaS tools, custom cloud migration, and localized IT support helping Bihar MSMEs move business operations online.',
            color: '#16A34A', metric: '80+', metricLabel: 'Enterprise Clients'
        }
    ];

    window.MOCK_STARTUPS = MOCK_STARTUPS;

    function resolveAssetPath(path) {
        if (!path) return '';
        if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:') || path.startsWith('/')) {
            return path;
        }
        const isPagesSubdir = window.location.pathname.includes('/pages/') || window.location.pathname.endsWith('/pages') || window.location.href.includes('/pages/');
        if (isPagesSubdir) {
            if (path.startsWith('../')) return path;
            return '../' + path;
        } else {
            if (path.startsWith('../')) return path.substring(3);
            return path;
        }
    }
    window.resolveAssetPath = resolveAssetPath;

    function resolveStartupLogo(s) {
        if (!s) return '';
        const nameLower = (s.name || '').toLowerCase();
        if (nameLower.includes('agridrone')) return 'assets/images/startups/logo-agridrone.png';
        if (nameLower.includes('digital labour') || nameLower.includes('dlc')) return 'assets/images/startups/logo-dlc.png';
        if (nameLower.includes('gramshree')) return 'assets/images/startups/logo-gramshree.png';
        if (nameLower.includes('railrestro')) return 'assets/images/startups/logo-railrestro.png';
        if (nameLower.includes('hanuman')) return 'assets/images/startups/logo-hanuman.png';
        if (nameLower.includes('shadowgrid')) return 'assets/images/startups/logo-shadowgrid.png';
        if (nameLower.includes('starline')) return 'assets/images/startups/logo-starline.png';
        if (nameLower.includes('chill roof') || nameLower.includes('coolroof')) return 'assets/images/startups/logo-coolroof.png';
        if (nameLower.includes('urban kare')) return 'assets/images/startups/logo-urbankare.png';
        if (nameLower.includes('maataram')) return 'assets/images/startups/logo-maataram.png';
        if (nameLower.includes('aryan')) return 'assets/images/startups/logo-aryancabs.png';
        if (nameLower.includes('goknight')) return 'assets/images/startups/logo-goknight.png';
        if (nameLower.includes('maas')) return 'assets/images/startups/logo-maas.png';

        if (s.logo && !s.logo.includes('logo-default.png')) {
            return s.logo;
        }
        return '';
    }

    function renderStartupItem(s) {
        let bulletClass = 'bullet-green';
        if (s.stage === 'Pre-Revenue' || s.stage === 'Proof of Concept') bulletClass = 'bullet-amber';
        if (s.stage === 'Idea Stage') bulletClass = 'bullet-blue';

        const rawLogo = resolveStartupLogo(s);
        const logoSrc = rawLogo ? resolveAssetPath(rawLogo) : '';
        const initial = (s.initial || (s.name ? s.name.charAt(0) : 'S')).toUpperCase();
        const brandColor = s.color || '#1E3A8A';
        const startupIdStr = JSON.stringify(s.id);

        return `
            <div class="startup-card-item" data-sector="${s.sector || ''}" data-stage="${s.stage || ''}" data-status="${s.status || ''}" data-name="${(s.name || '').toLowerCase()}" data-founder="${(s.founder || '').toLowerCase()}">
                <div class="startup-card-header-bar">
                    <span class="startup-sector-tag-pill" style="color: ${brandColor}; background: ${brandColor}18; border: 1px solid ${brandColor}30;">${s.sector || 'Venture'}</span>
                    <span class="startup-stage-pill">
                        <span class="stage-bullet ${bulletClass}"></span>
                        ${s.stage || 'Active'}
                    </span>
                </div>

                <div class="startup-card-body">
                    <div class="startup-logo-display">
                        ${logoSrc ? `
                            <img src="${logoSrc}" alt="${s.name}" class="startup-logo-img" onerror="this.onerror=null; this.remove();">
                        ` : `
                            <div class="startup-logo-fallback" style="display:flex; width:48px; height:48px; background:${brandColor}; color:#fff; font-weight:800; font-size:20px; border-radius:10px; align-items:center; justify-content:center; font-family:'Outfit', sans-serif;">
                                ${initial}
                            </div>
                        `}
                    </div>

                    <h4 class="startup-name">${s.name}</h4>
                    <p class="startup-desc-text">${s.desc || ''}</p>
                    
                    <div class="startup-meta-details">
                        <div class="meta-line">
                            <i class="fa-solid fa-user-tie text-primary font-12"></i>
                            <span>Founder: <strong>${s.founder || 'Founder'}</strong> (Est. ${s.year || 2023})</span>
                        </div>
                        <div class="meta-line">
                            <i class="fa-solid fa-location-dot text-danger font-12"></i>
                            <span>${s.location || 'Patna, Bihar'}</span>
                        </div>
                    </div>

                    <div class="startup-metric-card">
                        <span class="metric-lbl"><i class="fa-solid fa-chart-line text-primary me-1"></i> ${s.metricLabel || 'Traction'}</span>
                        <span class="metric-val">${s.metric || 'Active'}</span>
                    </div>
                </div>

                <div class="startup-card-footer">
                    <button class="startup-view-btn" onclick="openStartupModal(${startupIdStr})">
                        <span>View Venture Profile</span>
                        <i class="fa-solid fa-arrow-right font-12 ms-1"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // 8. Startups Dynamic Directory (on startups.html)
    function getActiveStartupsList() {
        if (typeof window.CIMP_DB !== "undefined" && window.CIMP_DB.getStartups) {
            return window.CIMP_DB.getStartups();
        }
        return MOCK_STARTUPS;
    }

    const gridContainer = document.getElementById("startups-grid");
    function renderLiveStartupsGrid() {
        if (!gridContainer) return;
        const list = getActiveStartupsList();
        gridContainer.innerHTML = list.map(renderStartupItem).join("");
        applyStartupFilters();
    }

    if (gridContainer) {
        renderLiveStartupsGrid();

        window.addEventListener("cimp:db_updated", function () {
            renderLiveStartupsGrid();
        });

        const searchInput = document.getElementById("startup-search");
        const sectorSelect = document.getElementById("filter-sector");
        const stageSelect = document.getElementById("filter-stage");
        const statusSelect = document.getElementById("filter-status");
        const countDisplay = document.getElementById("results-count");

        function applyStartupFilters() {
            const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
            const sector = sectorSelect ? sectorSelect.value : "";
            const stage = stageSelect ? stageSelect.value : "";
            const status = statusSelect ? statusSelect.value : "";

            const cards = gridContainer.querySelectorAll(".startup-card-item");
            let visibleCount = 0;

            cards.forEach(function (card) {
                const cardSector = card.getAttribute("data-sector") || "";
                const cardStage = card.getAttribute("data-stage") || "";
                const cardStatus = card.getAttribute("data-status") || "";
                const cardName = card.getAttribute("data-name") || "";
                const cardFounder = card.getAttribute("data-founder") || "";

                const matchQuery = !query || cardName.includes(query) || cardFounder.includes(query) || cardSector.toLowerCase().includes(query);
                const matchSector = !sector || cardSector === sector;
                const matchStage = !stage || cardStage === stage;
                const matchStatus = !status || cardStatus === status;

                if (matchQuery && matchSector && matchStage && matchStatus) {
                    card.style.display = "flex";
                    visibleCount++;
                } else {
                    card.style.display = "none";
                }
            });

            if (countDisplay) {
                countDisplay.textContent = `Showing ${visibleCount} startup${visibleCount !== 1 ? 's' : ''}`;
            }
        }
        window.applyStartupFilters = applyStartupFilters;

        if (searchInput) searchInput.addEventListener("input", applyStartupFilters);
        if (sectorSelect) sectorSelect.addEventListener("change", applyStartupFilters);
        if (stageSelect) stageSelect.addEventListener("change", applyStartupFilters);
        if (statusSelect) statusSelect.addEventListener("change", applyStartupFilters);
    }

    // 8.1 Homepage Startups Seamless Infinite Marquee Renderer
    function renderHomeStartupsMarquee() {
        const homeGridContainer = document.getElementById("home-startups-grid");
        if (homeGridContainer) {
            const list = getActiveStartupsList();
            const allStartupsHtml = list.map(renderStartupItem).join("");
            homeGridContainer.innerHTML = allStartupsHtml + allStartupsHtml;
        }
    }
    renderHomeStartupsMarquee();

    window.addEventListener("cimp:db_updated", function () {
        renderHomeStartupsMarquee();
    });

    // Modal popup handler
    window.openStartupModal = function (id) {
        const list = getActiveStartupsList();
        const startup = list.find(item => String(item.id) === String(id) || item.name.toLowerCase() === String(id).toLowerCase()) || MOCK_STARTUPS[0];
        if (!startup) return;

        let modal = document.getElementById("startup-detail-modal");
        if (!modal) {
            modal = document.createElement("div");
            modal.id = "startup-detail-modal";
            modal.className = "startup-modal-backdrop";
            modal.onclick = function (e) {
                if (e.target === modal) modal.style.display = "none";
            };
            document.body.appendChild(modal);
        }

        const rawLogo = resolveStartupLogo(startup);
        const logoSrc = rawLogo ? resolveAssetPath(rawLogo) : '';
        const initial = (startup.initial || (startup.name ? startup.name.charAt(0) : 'S')).toUpperCase();
        const brandColor = startup.color || '#1E3A8A';
        const applyUrl = window.location.pathname.includes('/pages/') ? 'incubation-registration.html' : 'pages/incubation-registration.html';

        modal.innerHTML = `
            <div class="startup-modal-box">
                <div class="modal-head-banner">
                    <h3 class="fw-bold mb-1 text-white font-22">${startup.name}</h3>
                    <p class="mb-0 text-white-50 font-13"><i class="fa-solid fa-tag text-warning me-1"></i> ${startup.sector || 'Incubated Venture'} · Incubation Portfolio</p>
                    <button class="modal-close-icon" onclick="document.getElementById('startup-detail-modal').style.display='none'">✕</button>
                </div>
                <div class="modal-content-area">
                    <div class="d-flex align-items-center gap-3 mb-4">
                        <div style="width:64px; height:64px; border-radius:14px; border:1px solid #E2E8F0; padding:6px; background:#FFFFFF; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                            ${logoSrc ? `
                                <img src="${logoSrc}" alt="${startup.name}" style="width:100%; height:100%; object-fit:contain; border-radius:8px;" onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                <div style="display:none; width:100%; height:100%; background:${brandColor}; color:#fff; font-weight:800; font-size:20px; border-radius:8px; align-items:center; justify-content:center; font-family:'Outfit', sans-serif;">${initial}</div>
                            ` : `
                                <div style="display:flex; width:100%; height:100%; background:${brandColor}; color:#fff; font-weight:800; font-size:20px; border-radius:8px; align-items:center; justify-content:center; font-family:'Outfit', sans-serif;">${initial}</div>
                            `}
                        </div>
                        <div>
                            <h5 class="fw-bold text-navy mb-1">${startup.name}</h5>
                            <p class="text-muted font-13 mb-0"><i class="fa-solid fa-user-tie text-primary me-1"></i> Founder: <strong>${startup.founder}</strong> (Est. ${startup.year || 2023})</p>
                        </div>
                    </div>
                    
                    <div class="p-3 bg-light rounded-3 mb-4 border">
                        <p class="text-secondary font-14 mb-0" style="line-height:1.65;">${startup.desc || 'Venture incubated at CIMP-BIIF.'}</p>
                    </div>

                    <div class="row g-3 mb-4 text-center">
                        <div class="col-4">
                            <div class="p-2 border rounded-3 bg-white">
                                <span class="d-block font-11 text-muted text-uppercase fw-bold">Stage</span>
                                <strong class="font-13 text-navy">${startup.stage || 'Active'}</strong>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="p-2 border rounded-3 bg-white">
                                <span class="d-block font-11 text-muted text-uppercase fw-bold">Location</span>
                                <strong class="font-13 text-navy">${startup.location || 'Patna'}</strong>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="p-2 border rounded-3 bg-white">
                                <span class="d-block font-11 text-muted text-uppercase fw-bold">${startup.metricLabel || 'Traction'}</span>
                                <strong class="font-13 text-orange">${startup.metric || 'Active'}</strong>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex gap-3">
                        <a href="${applyUrl}" class="btn btn-primary flex-grow-1 py-2 font-13 fw-semibold">Apply for Incubation</a>
                        <button class="btn btn-outline-secondary px-4 py-2 font-13" onclick="document.getElementById('startup-detail-modal').style.display='none'">Close</button>
                    </div>
                </div>
            </div>
        `;
        modal.style.display = "flex";
    };

    // 9. High-Performance IntersectionObserver Animated Number Counters (Repeats on every scroll into view)
    const statCounters = document.querySelectorAll(".stat-counter");
    if (statCounters.length > 0) {
        let activeAnimationFrames = [];

        const resetCounters = () => {
            activeAnimationFrames.forEach((id) => cancelAnimationFrame(id));
            activeAnimationFrames = [];
            statCounters.forEach((counter) => {
                const startVal = parseInt(counter.getAttribute("data-start") || "0", 10);
                counter.textContent = startVal;
            });
        };

        const animateCounters = () => {
            activeAnimationFrames.forEach((id) => cancelAnimationFrame(id));
            activeAnimationFrames = [];

            statCounters.forEach((counter) => {
                const target = parseInt(counter.getAttribute("data-count"), 10);
                const startVal = parseInt(counter.getAttribute("data-start") || "0", 10);
                const duration = target > 500 ? 1600 : 1200; // ms
                let startTime = null;

                const updateNumber = (currentTime) => {
                    if (!startTime) startTime = currentTime;
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Smooth Ease-Out Cubic
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const currentVal = Math.floor(startVal + (target - startVal) * easeOut);

                    counter.textContent = currentVal;

                    if (progress < 1) {
                        const frameId = requestAnimationFrame(updateNumber);
                        activeAnimationFrames.push(frameId);
                    } else {
                        counter.textContent = target;
                    }
                };

                const frameId = requestAnimationFrame(updateNumber);
                activeAnimationFrames.push(frameId);
            });
        };

        if ("IntersectionObserver" in window) {
            let isVisible = false;
            const impactObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (!isVisible) {
                            isVisible = true;
                            animateCounters();
                        }
                    } else {
                        if (isVisible) {
                            isVisible = false;
                            resetCounters();
                        }
                    }
                });
            }, { threshold: 0.25 });

            const impactSection = document.querySelector(".ecosystem-impact-section");
            if (impactSection) {
                impactObserver.observe(impactSection);
            } else {
                statCounters.forEach(c => impactObserver.observe(c));
            }
        } else {
            animateCounters();
        }
    }
});

// Back to top function
window.topFunction = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

// ==========================================================================
// 10. ONBOARDING & APPLICATION WIZARD MODAL HANDLERS
// ==========================================================================
let currentWizardStep = 1;
let currentAppType = 'startup';

window.showApplyModal = function (type) {
    currentAppType = type || 'startup';
    currentWizardStep = 1;

    const modal = document.getElementById('apply-modal');
    if (!modal) return;

    const title = document.getElementById('modal-title');
    const subtitle = document.getElementById('modal-subtitle');
    const stepsContainer = document.getElementById('wizard-steps-container');
    const footerNav = document.getElementById('modal-footer-nav');

    if (stepsContainer) stepsContainer.style.display = 'flex';
    if (footerNav) footerNav.style.display = 'flex';

    if (currentAppType === 'startup') {
        if (title) title.textContent = 'Startup Incubation Application';
        if (subtitle) subtitle.textContent = 'CIMP-BIIF 16-Week Incubation Cohort';
    } else {
        if (title) title.textContent = 'Expert Mentor Registration';
        if (subtitle) subtitle.textContent = 'CIMP-BIIF Advisory & Mentorship Panel';
    }

    resetWizardInputs();
    modal.style.display = 'flex';
    updateWizardUI();
};

window.closeModal = function () {
    const modal = document.getElementById('apply-modal');
    if (modal) modal.style.display = 'none';
};

window.handleBackdropClick = function (e) {
    if (e.target === document.getElementById('apply-modal')) {
        window.closeModal();
    }
};

function resetWizardInputs() {
    const step1 = document.getElementById('modal-wizard-step-1');
    if (!step1) return;

    if (currentAppType === 'startup') {
        step1.innerHTML = `
            <h4 class="fw-bold text-navy mb-3">Applicant &amp; Entity Information</h4>
            <div class="wizard-input-grid">
                <div class="wizard-form-group">
                    <label for="wiz-founder-name">Primary Founder Name *</label>
                    <input type="text" id="wiz-founder-name" class="wizard-form-control" placeholder="Enter your full name">
                </div>
                <div class="wizard-form-row">
                    <div class="wizard-form-group">
                        <label for="wiz-email">Email Address *</label>
                        <input type="email" id="wiz-email" class="wizard-form-control" placeholder="Enter your email address">
                    </div>
                    <div class="wizard-form-group">
                        <label for="wiz-phone">Mobile Number *</label>
                        <input type="tel" id="wiz-phone" class="wizard-form-control" placeholder="Enter your mobile number">
                    </div>
                </div>
                <div class="wizard-form-group">
                    <label for="wiz-startup-name">Startup Name / Proposed Entity Name *</label>
                    <input type="text" id="wiz-startup-name" class="wizard-form-control" placeholder="Enter your startup name">
                </div>
            </div>
        `;
    } else {
        step1.innerHTML = `
            <h4 class="fw-bold text-navy mb-3">Mentor Personal Information</h4>
            <div class="wizard-input-grid">
                <div class="wizard-form-group">
                    <label for="wiz-founder-name">Full Name *</label>
                    <input type="text" id="wiz-founder-name" class="wizard-form-control" placeholder="Enter your full name">
                </div>
                <div class="wizard-form-row">
                    <div class="wizard-form-group">
                        <label for="wiz-email">Email Address *</label>
                        <input type="email" id="wiz-email" class="wizard-form-control" placeholder="Enter your email address">
                    </div>
                    <div class="wizard-form-group">
                        <label for="wiz-phone">Mobile Number *</label>
                        <input type="tel" id="wiz-phone" class="wizard-form-control" placeholder="Enter your mobile number">
                    </div>
                </div>
                <div class="wizard-form-group">
                    <label for="wiz-startup-name">Current Designation / Organization *</label>
                    <input type="text" id="wiz-startup-name" class="wizard-form-control" placeholder="e.g. Managing Director / Partner">
                </div>
            </div>
        `;
    }

    const step2Title = document.querySelector('#modal-wizard-step-2 h4');
    const step2SelectLabel = document.querySelector('#modal-wizard-step-2 label[for="wiz-sector"]');
    const step2PitchLabel = document.querySelector('#modal-wizard-step-2 label[for="wiz-pitch"]');
    const step2PitchPlaceholder = document.getElementById('wiz-pitch');

    if (currentAppType === 'startup') {
        if (step2Title) step2Title.textContent = 'Business Proposition & Sector';
        if (step2SelectLabel) step2SelectLabel.textContent = 'Primary Business Sector *';
        if (step2PitchLabel) step2PitchLabel.textContent = 'Elevator Pitch (What problem do you solve?) *';
        if (step2PitchPlaceholder) step2PitchPlaceholder.placeholder = 'Provide a brief summary of your product, technology, or service.';
    } else {
        if (step2Title) step2Title.textContent = 'Advisory Domain & Experience';
        if (step2SelectLabel) step2SelectLabel.textContent = 'Core Advisory Expertise *';
        if (step2PitchLabel) step2PitchLabel.textContent = 'Advisory Overview (What values can you mentor?) *';
        if (step2PitchPlaceholder) step2PitchPlaceholder.placeholder = 'Provide a brief summary of your industry credentials and past advisory achievements.';
    }

    const step3Title = document.querySelector('#modal-wizard-step-3 h4');
    const step3Label1 = document.querySelector('#modal-wizard-step-3 label[for="wiz-team-size"]');
    const step3Select1 = document.getElementById('wiz-team-size');
    const step3Label2 = document.querySelector('#modal-wizard-step-3 label[for="wiz-stage"]');
    const step3Select2 = document.getElementById('wiz-stage');

    if (currentAppType === 'startup') {
        if (step3Title) step3Title.textContent = 'Team Structure & Maturity';
        if (step3Label1) step3Label1.textContent = 'Total Core Team Members *';
        if (step3Label2) step3Label2.textContent = 'Current Business Stage *';
        if (step3Select1) {
            step3Select1.innerHTML = `
                <option value="1">1 (Solo Founder)</option>
                <option value="2-4" selected>2-4 Members</option>
                <option value="5-10">5-10 Members</option>
                <option value="10+">10+ Members</option>
            `;
        }
        if (step3Select2) {
            step3Select2.innerHTML = `
                <option value="Idea Stage">Idea Stage</option>
                <option value="Pre-Revenue">Pre-Revenue</option>
                <option value="Revenue Stage">Revenue Stage / MVP</option>
                <option value="Scaling">Scaling / Growth</option>
            `;
        }
    } else {
        if (step3Title) step3Title.textContent = 'Mentoring Availability';
        if (step3Label1) step3Label1.textContent = 'Hours Available Per Month *';
        if (step3Label2) step3Label2.textContent = 'Preferred Mentoring Mode *';
        if (step3Select1) {
            step3Select1.innerHTML = `
                <option value="1-2">1-2 Hours</option>
                <option value="3-5" selected>3-5 Hours</option>
                <option value="6-10">6-10 Hours</option>
                <option value="10+">10+ Hours</option>
            `;
        }
        if (step3Select2) {
            step3Select2.innerHTML = `
                <option value="Online">Online / Telephonic</option>
                <option value="In-Person">In-Person at Maurya Lok B-HUB</option>
                <option value="Hybrid">Hybrid Mode (Both)</option>
            `;
        }
    }
}

function updateWizardUI() {
    document.querySelectorAll('.wizard-step-content').forEach(s => s.classList.remove('active'));

    const stepContent = document.getElementById('modal-wizard-step-' + currentWizardStep);
    if (stepContent) {
        stepContent.classList.add('active');
    }

    for (let i = 1; i <= 3; i++) {
        const ind = document.getElementById('indicator-step-' + i);
        if (!ind) continue;

        ind.classList.remove('active', 'completed');

        if (i === currentWizardStep) {
            ind.classList.add('active');
        } else if (i < currentWizardStep) {
            ind.classList.add('completed');
        }
    }

    const prevBtn = document.getElementById('wiz-prev-btn');
    const nextBtn = document.getElementById('wiz-next-btn');

    if (!prevBtn || !nextBtn) return;

    if (currentWizardStep === 1) {
        prevBtn.style.visibility = 'hidden';
        nextBtn.textContent = 'Continue';
    } else if (currentWizardStep === 3) {
        prevBtn.style.visibility = 'visible';
        nextBtn.textContent = 'Submit Proposal';
    } else if (currentWizardStep === 4) {
        prevBtn.style.visibility = 'hidden';
        nextBtn.textContent = 'Finish & Close';
    } else {
        prevBtn.style.visibility = 'visible';
        nextBtn.textContent = 'Continue';
    }
}

window.nextWizardStep = function () {
    if (currentWizardStep < 4) {
        currentWizardStep++;
        updateWizardUI();
    } else {
        window.closeModal();
    }
};

window.prevWizardStep = function () {
    if (currentWizardStep > 1 && currentWizardStep < 4) {
        currentWizardStep--;
        updateWizardUI();
    }
};

