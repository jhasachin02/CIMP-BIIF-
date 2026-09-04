# CIMP-BIIF — Incubation & Innovation Portal

> **Chandragupt Institute of Management Patna (CIMP)**  
> **Business Incubation & Innovation Foundation (BIIF)**  
> Supported by Bihar Startup Policy, Govt. of Bihar & DST/MSME

Official web platform and enterprise management dashboard suite for the **CIMP - Business Incubation & Innovation Foundation (CIMP-BIIF)**.

---

## 🚀 Key Features

* **Public Portal & Information Suite**:
  * Complete institutional pages for programs, PGDM-IEV, Bihar Startup Policy guidelines, team, advisors, and mentors directory.
  * Multi-step dynamic registration forms for Incubation intake, Mentors onboarding, and Investor network empanelement.
* **TBI Incubation Management Console** (`/admin/incubation-manager/`):
  * Multi-stage Scrutiny Queue with live 4-Pillar Evaluation Scorecard (Innovation [25], Bihar Impact [25], Feasibility [25], Team [25]).
  * Inline Tap-to-View / Expandable Dossier Trays for rapid review without layout shift.
  * Facilities allocation (Co-working Desks, Prototyping FabLab, IoT Sandbox), Bihar Seed Capital (₹10L–₹25L) Tranche milestone tracking, and direct founder WhatsApp/Call actions.
* **Director Command Center** (`/admin/director/`):
  * Executive portfolio KPIs, direct Bihar employment stats, and 1-click Incubation Sanctions.
* **Mentor Advisory Console** (`/admin/mentor/`):
  * Mentee tracking, 1-on-1 consultation logs, strategic guidance minutes, and milestone sign-offs.
* **Startup Founder Desk** (`/admin/startup/`):
  * Milestone sprint submissions, Bihar Seed Grant Utilization Certificate (UC) records, and monthly commercial traction reporting.
* **IT & RBAC Security Suite** (`/admin/it-admin/`):
  * Role-Based Access Control (RBAC), multi-step Google Forms-level form studio, security audit trails, and snapshot backups.

---

## 📁 Repository Structure

```tree
CIMP-BIIF Website/
├── 📄 index.html                       # Homepage with dynamic metrics & ecosystem highlights
├── 📄 login.html                       # Unified role-based login gateway
├── 📄 sitemap.xml                      # Search engine sitemap
├── 📄 robots.txt                       # Crawler access rules
├── 📄 vercel.json                      # Vercel deployment configuration
├── 📄 _redirects                       # Netlify clean URL rules
├── 📄 .htaccess                        # Apache web server configuration
│
├── 📂 admin/                           # Role-based Administrative Control Panels
│   ├── director/                       # Director oversight & sanction portal
│   ├── incubation-manager/             # TBI Incubation Operations & Scrutiny queue
│   ├── it-admin/                       # RBAC, user provisioning & form studio
│   ├── mentor/                         # Mentor tracking & session logging
│   └── startup/                        # Incubatee progress & traction desk
│
├── 📂 pages/                           # Public Information & Service Pages
│   ├── about-us.html                   # About CIMP-BIIF Foundation
│   ├── apply.html                      # Direct Incubation Application
│   ├── incubation-registration.html    # Multi-step Startup Incubation form
│   ├── mentor-registration.html        # Mentor Onboarding form
│   ├── investor-registration.html      # Investor Network registration
│   ├── mentors.html                    # Empaneled Mentors directory
│   ├── startups.html                   # Incubated startups portfolio
│   ├── incubation-process.html         # Incubation lifecycle & policy roadmap
│   └── contact-us.html                 # Contact details & location
│
├── 📂 investor/                        # Investor ecosystem portal
├── 📂 mentor/                          # Mentor engagement portal
├── 📂 startup/                         # Incubatee founder hub
│
└── 📂 assets/                          # Static Assets & Styling
    ├── 📂 css/                         # Modular CSS & Design System
    │   ├── design-system.css           # Core typography & color tokens
    │   ├── admin-dashboard.css         # Unified Admin dashboard CSS & tables
    │   └── bootstrap.min.css           # Bootstrap framework utilities
    ├── 📂 js/                          # Application Logic & Mock Database
    │   ├── app.js                      # Core interactive scripts & navigation
    │   └── cimp-db.js                  # Central ecosystem database & auth state
    └── 📂 images/                      # Brand logos, banners & icons
```

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Structure** | **HTML5** | Semantic structure, ARIA accessibility, responsive viewport |
| **Styling & Themes** | **CSS3 & Bootstrap** | Custom Design System tokens, glassmorphism, flex/grid layouts |
| **Client Scripting** | **Vanilla JavaScript (ES6+)** | Zero-dependency modular UI logic, active navigation, form validation |
| **Data & State Management** | **localStorage & IndexedDB** | Unified `CIMP_DB` reactive layer with exportable JSON snapshots |
| **Web Server Compat** | **Apache / Nginx / Vercel** | Multi-platform hosting rules via `.htaccess`, `_redirects`, `vercel.json` |

---

## 🔐 Role-Based Access Portals

| Role | Access URL | Core Functions | Default Credentials |
| :--- | :--- | :--- | :--- |
| **👑 Director** | `/admin/director/` | Executive governance, KPI analytics, Incubation Sanctions | `director@cimp.ac.in` / `director@123` |
| **🚀 Incubation Manager** | `/admin/incubation-manager/` | Level-1 Scrutiny Matrix, 360° portfolio, Seed Grant audit | `manager@cimp.ac.in` / `manager@123` |
| **💻 IT Admin** | `/admin/it-admin/` | RBAC provisioning, Form Studio, Audit logs & Backups | `itadmin@cimpbiif.com` / `admin@123` |
| **🎓 Faculty Mentor** | `/admin/mentor/` | Assigned mentees, 1-on-1 consultation logs, milestone sign-offs | `mentor@cimp.ac.in` / `mentor@123` |
| **🌱 Startup Founder** | `/admin/startup/` | Monthly traction filings, sprint deliverables, UC compliance | `founder@abc.com` / `founder@123` |

---

## 🚀 Deployment

### ⚡ Deploy on Vercel
1. Push this repository to GitHub.
2. Import the repository in [Vercel Dashboard](https://vercel.com/).
3. Framework preset: **Other** / Root directory: `./`.
4. Click **Deploy**.

---

## 👥 Organization & Contact

**Chandragupt Institute of Management Patna (CIMP)**  
*Business Incubation & Innovation Foundation (CIMP-BIIF)*  
📍 Mithapur, Patna, Bihar - 800001, India  
🌐 Website: [cimp.ac.in](https://www.cimp.ac.in)  
📧 Incubation Secretariat: `biif@cimp.ac.in`

---

<div align="center">
  <sub>Developed & maintained for the CIMP-BIIF & Bihar Startup Ecosystem.</sub>
</div>
