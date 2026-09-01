# 🏛️ CIMP - BIIF Admin & Ecosystem Management Architecture

Welcome to the **CIMP - Business Incubation & Innovation Foundation (BIIF)** enterprise portal system. This document provides a human-readable structural guide to all directories, files, and role workspaces.

---

## 📁 Directory & Folder Hierarchy

```
d:/Sachin projects/CIMP - BIIF Website/
│
├── 📂 admin/                               # Unified Admin & Ecosystem Suite
│   │
│   ├── 📂 director/                        # 👑 Director Panel (Executive Command)
│   │   └── index.html                      # Executive Dashboard, OmniSearch, Final Approvals
│   │
│   ├── 📂 incubation-manager/              # 📋 Incubation Manager Operations Hub
│   │   └── index.html                      # Level-1 Intake Scrutiny, Scoring Matrix, Mentorship
│   │
│   ├── 📂 it-admin/                        # 🛡️ IT & System Administration
│   │   └── index.html                      # RBAC User Roles, Security Audit Logs, DB Backup
│   │
│   ├── 📂 startup/                         # 🚀 Startup Founder Workspace
│   │   └── index.html                      # Monthly Traction Reporting, Mentor Connect, Circulars
│   │
│   ├── 📂 mentor/                          # 🎓 Mentor Advisory Hub
│   │   └── index.html                      # Allotted Portfolio Startups, Session Hours Logger
│   │
│   ├── index.html                          # Root Director Command Center (Quick Access)
│   ├── manager.html                        # Root Incubation Manager Shortcut
│   ├── it-admin.html                       # Root IT Admin Shortcut
│   ├── startup-portal.html                 # Root Startup Founder Portal Shortcut
│   ├── mentor-portal.html                  # Root Mentor Advisory Shortcut
│   └── README.md                           # This Architecture Guide
│
├── 📂 assets/                              # Core Design System & Engine
│   ├── 📂 css/
│   │   └── admin-portal.css                # Enterprise Glassmorphic Stylesheet
│   └── 📂 js/
│       ├── cimp-db.js                      # Centralized State Engine, Multi-Tier Approval API & DB
│       └── clone-enhancements.js           # Live Dynamic Website Renderer
│
├── login.html                              # Unified Single Sign-On (SSO) Role Switcher
├── startups.html                           # Live Verified Startups Directory (Auto-Synced)
├── incubation-registration.html            # Public Startup Intake Registration Form
└── mentor-registration.html                # Public Mentor Intake Registration Form
```

---

## 🔄 Two-Tier Automated Lifecycle Overview

$$\text{Public Registration Form} \xrightarrow{\text{Submits Application}} \text{Incubation Manager Desk} \xrightarrow{\text{Scores \& Recommends}} \text{Director Command Center} \xrightarrow{\text{Final Approval}} \begin{cases} \text{1. Live Directory Sync on startups.html} \\ \text{2. Selection Letter \& Email Dispatch} \\ \text{3. Founder Login Credentials Activated} \end{cases}$$

1. **Submission**: Applicant registers via `incubation-registration.html` (receives tracking ID `APP-2026-xxx`).
2. **Level-1 Scrutiny**: Incubation Manager scores the pitch (0–100) and clicks *"Score & Recommend to Director"*.
3. **Executive Approval**: Director reviews executive summary and clicks *"Executive Approve & Publish"*.
4. **Live Activation**:
   - Startup instantly appears on `startups.html` with its live tags and metrics.
   - Automated Selection Letter & Login credentials are generated.
   - Founder can immediately log in to `admin/startup/index.html`.

---

## 🔑 Default Demo Roles

| Role | Name | Email | Default Dashboard |
|---|---|---|---|
| **Director** | Dr. Rana Singh | `director@cimp.ac.in` | `admin/director/index.html` |
| **Incubation Manager** | Kumod Kumar | `incubation@cimpbiif.com` | `admin/incubation-manager/index.html` |
| **IT Admin** | J. Sachan | `itadmin@cimpbiif.com` | `admin/it-admin/index.html` |
| **Startup Founder** | Chandrashekhar Mandal | `founder@digitallabourchowk.com` | `admin/startup/index.html` |
| **Mentor** | Dr. Alok Kumar | `alok.kumar@cimp.ac.in` | `admin/mentor/index.html` |
