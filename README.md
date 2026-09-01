<div align="center">

# 🏛️ CIMP - Business Incubation & Innovation Foundation (CIMP-BIIF)

[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen.svg?style=for-the-badge)](https://github.com/jhasachin02/CIMP-BIIF-)
[![Quality Grade](https://img.shields.io/badge/Quality%20Grade-A--%20(92%2F100)-blue.svg?style=for-the-badge)](https://github.com/jhasachin02/CIMP-BIIF-)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Mobile-100%25%20Responsive-orange.svg?style=for-the-badge)](#mobile-responsiveness)

**The Official Digital Platform for Chandragupt Institute of Management Patna - Business Incubation & Innovation Foundation**  
*Supported by Department of Industries (Govt. of Bihar), MSME, Startup India, & MoE's Innovation Cell (IIC)*

[Explore Pages](#-pages--features) • [Admin Portals](#-role-based-portals--dashboards) • [Tech Stack](#-technology-stack) • [Deployment](#-deployment-options) • [Documentation](#-documentation-index)

---

</div>

## 📖 Overview

**CIMP-BIIF (Business Incubation & Innovation Foundation)** is a dedicated startup incubation center established under the aegis of **Chandragupt Institute of Management Patna (CIMP)**. It serves as an entrepreneurial launchpad nurturing innovative ideas, providing state-of-the-art incubation infrastructure, mentorship, funding assistance, and industry linkages to startups across Bihar and India.

This repository contains the complete web application, public portal, stakeholder registration pipelines, and multi-tier administrative dashboards for CIMP-BIIF.

---

## ✨ Key Features & Capabilities

- 🌐 **Modern & Accessible Public Portal**: Over 25+ structured, responsive pages detailing incubation programs, PGDM-IEV courses, policies (NISP, CIMP I&E), mentorship network, and startup success stories.
- 👥 **Role-Based Portals & Dashboards**: Dedicated portal hubs for **Directors**, **Incubation Managers**, **IT Admins**, **Mentors**, **Investors**, and **Startups**.
- 📝 **Interactive Multi-Step Registrations**:
  - Incubation Application Portal
  - Mentor Onboarding & Profile Registry
  - Angel Investor / VC Registration
  - General Inquiries & Contact Dispatchers
- 📱 **Mobile-First Responsive Experience**: Tested across 12+ device form factors with touch-optimized targets ($\ge 44\text{px}$) and zero horizontal scrolling.
- ⚡ **Lightning Fast & Lightweight**: Zero bloated dependencies, optimized SVG/WebP assets, fast first contentful paint (FCP < 1.2s), and clean CSS architecture.
- 🔍 **Enterprise SEO & Meta Configuration**: Fully configured `sitemap.xml`, `robots.txt`, OpenGraph protocol, Twitter cards, and Schema.org structured metadata.
- 🔒 **Security & Production Ready**: Pre-configured routing rules for Apache (`.htaccess`), Netlify (`_redirects`), and Vercel (`vercel.json`).

---

## 📁 Repository Structure

```tree
CIMP-BIIF Website/
├── 📄 index.html                       # Homepage with hero slider, dynamic metrics & stats
├── 📄 login.html                       # Unified login gateway for all roles
├── 📄 sitemap.xml                      # Search engine sitemap
├── 📄 robots.txt                       # Crawler access rules
├── 📄 vercel.json                      # Vercel deployment configuration
├── 📄 _redirects                       # Netlify clean URL rules
├── 📄 .htaccess                        # Apache web server configuration
│
├── 📂 admin/                           # Role-based Administrative Control Panels
│   ├── index.html                      # Central Admin Dashboard
│   ├── director/                       # Director oversight portal
│   ├── incubation-manager/             # Startup & cohort management portal
│   ├── it-admin/                       # System administration & security logs
│   ├── mentor/                         # Mentor tracking dashboard
│   └── startup/                        # Incubatee progress tracking
│
├── 📂 pages/                           # Public Information & Service Pages
│   ├── about-us.html                   # About CIMP-BIIF Foundation
│   ├── about-cimp.html                 # About CIMP Institute
│   ├── apply.html                      # Direct Incubation Application
│   ├── incubation-registration.html    # Detailed Startup Incubation form
│   ├── mentor-registration.html        # Mentor Onboarding form
│   ├── investor-registration.html      # Investor Network registration
│   ├── mentors.html                    # Mentors directory
│   ├── startups.html                   # Incubated startups portfolio
│   ├── startups-details.html           # Startup deep-dive profiles
│   ├── pgdm-iev.html                   # PGDM in Innovation, Entrepreneurship & Venture Dev
│   ├── 100-steps-to-startups.html      # Comprehensive founder roadmap
│   ├── incubation-process.html         # Step-by-step incubation lifecycle
│   ├── cimp-i-e-policy.html            # Innovation & Entrepreneurship Policy
│   ├── nisp-policy.html                # National Innovation and Startup Policy
│   ├── biif-team.html                  # Foundation leadership and team
│   ├── advisors.html                   # Advisory Board
│   ├── expert-committee.html           # Expert Screening Committee
│   ├── industry-partners.html          # Corporate & ecosystem partners
│   ├── events.html                     # Workshops, hackathons & demo days
│   ├── media-coverage.html             # Press releases & news mentions
│   ├── research.html                   # Research initiatives
│   ├── publications.html               # Whitepapers & annual reports
│   ├── digital-marketing-course.html   # Skill development certifications
│   └── contact-us.html                 # Contact details & interactive map
│
├── 📂 investor/                        # Investor ecosystem portal
├── 📂 mentor/                          # Mentor engagement portal
├── 📂 startup/                         # Incubatee founder hub
│
├── 📂 assets/                          # Static Assets & Styling
│   ├── 📂 css/                         # Modular CSS & Design System
│   │   ├── design-system.css           # Core typography, color tokens & variables
│   │   ├── base-styles.css             # Base reset & layout structure
│   │   ├── site-overrides.css          # Component level styles
│   │   ├── ui-enhancements.css         # Modern animations, cards & effects
│   │   ├── admin-dashboard.css         # Admin panel themes & tables
│   │   └── bootstrap.min.css           # Bootstrap framework utilities
│   ├── 📂 js/                          # Application Logic & Form Handlers
│   │   ├── app.js                      # Core interactive scripts & navigation
│   │   └── form-handlers.js            # Client-side validation & submission
│   └── 📂 images/                      # Optimized brand logos, banners & icons
│
└── 📂 docs/                            # Internal Architecture & Reference Guides
```

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Markup** | **HTML5** | Semantic structure, ARIA accessibility, responsive viewport |
| **Styling & Themes** | **CSS3 & Bootstrap** | Custom Design System tokens, glassmorphism, flex/grid layouts |
| **Client Scripting** | **Vanilla JavaScript (ES6+)** | Zero-dependency modular UI logic, active navigation, form validation |
| **SEO & Meta** | **OpenGraph & Schema.org** | Rich snippet integration, canonical URLs, social card previews |
| **Web Server Compat** | **Apache / Nginx / Vercel** | Multi-platform hosting rules via `.htaccess`, `_redirects`, `vercel.json` |

---

## 🔐 Role-Based Portals & Dashboards

The portal provides tailored experiences for diverse ecosystem participants:

| Role | Access URL | Core Functions |
| :--- | :--- | :--- |
| **👑 Director Portal** | `/admin/director/` | Executive oversight, ecosystem KPI analytics, approval workflows |
| **🚀 Incubation Manager** | `/admin/incubation-manager/` | Cohort evaluation, milestone tracking, fund disbursement logs |
| **💻 IT Admin** | `/admin/it-admin/` | User management, security audits, system settings |
| **🎓 Mentors** | `/admin/mentor/` | Startup booking sessions, feedback evaluation, mentoring logs |
| **💼 Investors** | `/investor/` | Deal flow evaluation, pitch deck access, founder connectivity |
| **🌱 Startups** | `/admin/startup/` | Resource booking, progress reports, support ticket requests |

---

## 🚀 Deployment Options

### 1. ⚡ Deploy on Vercel (Recommended)
This repository is pre-configured with `vercel.json`:
1. Push this repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/) and click **"New Project"**.
3. Import the `CIMP-BIIF-` repository and click **Deploy**.

### 2. 🌐 Deploy on Netlify
Pre-configured with `_redirects` for clean URL handling:
1. Connect this repo at [Netlify Dashboard](https://app.netlify.com/).
2. Set Publish Directory to `./` (root).
3. Click **Deploy Site**.

### 3. 🖥️ Deploy on Apache / cPanel / Shared Hosting
Pre-configured with `.htaccess` rewrite rules:
1. Upload all repository files to the `public_html` directory of your cPanel/host.
2. Ensure `mod_rewrite` is enabled on the server.

### 4. 🐙 Deploy on GitHub Pages
1. Go to repository **Settings** $\rightarrow$ **Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose `main` branch and `/ (root)` folder, then click **Save**.

---

## 📚 Documentation Index

For in-depth technical documentation and reports, refer to the included guides:

- 📄 [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) - Step-by-step instructions for all platforms
- 📄 [`QA_TESTING_REPORT.md`](./QA_TESTING_REPORT.md) - 150+ cross-device validation results
- 📄 [`FORM_HANDLER_SETUP.md`](./FORM_HANDLER_SETUP.md) - Formspree / EmailJS / PHP backend integration guide
- 📄 [`AUDIT_REPORT.md`](./AUDIT_REPORT.md) - Comprehensive technical architecture & performance audit
- 📄 [`PRE_DEPLOYMENT_CHECKLIST.md`](./PRE_DEPLOYMENT_CHECKLIST.md) - Pre-launch checklist & sanity tests
- 📄 [`PROJECT_HANDOVER.md`](./PROJECT_HANDOVER.md) - Handover & maintenance manual

---

## 👥 Organization & Contact

**Chandragupt Institute of Management Patna (CIMP)**  
*Business Incubation & Innovation Foundation (CIMP-BIIF)*  
📍 Mithapur, Patna, Bihar - 800001, India  
🌐 Website: [cimp.ac.in](https://www.cimp.ac.in)  
📧 Incubation Cell: `biif@cimp.ac.in`

---

<div align="center">
  <sub>Developed & maintained with ❤️ for the Bihar & Indian Startup Ecosystem.</sub>
</div>
