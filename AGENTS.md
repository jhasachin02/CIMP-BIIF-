# CIMP - BIIF Development Guidelines & Rules

## 1. Remote GitHub Synchronization (Mandatory)
- Before making any code modifications or running builds, **always check and scan GitHub remote repository status**:
  ```bash
  git fetch origin main
  git status
  ```
- If remote has incoming changes, pull and integrate them first:
  ```bash
  git pull origin main
  ```
- After completing approved changes, verify locally, commit with clear messages, and push to `origin main` so Vercel auto-deploys stay up to date.

## 2. Directory Hierarchy & Clean URLs
- All portals use dedicated folder structures:
  - Director: `admin/director/index.html`
  - Incubation Manager: `admin/incubation-manager/index.html`
  - IT Admin: `admin/it-admin/index.html`
  - Startup Founder: `admin/startup/index.html`
  - Mentor: `admin/mentor/index.html`
- Do NOT create duplicate root `.html` files (e.g. `admin/it-admin.html`) as they conflict with Vercel clean URL routing.
