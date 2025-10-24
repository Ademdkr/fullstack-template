# Fullstack Template (Angular + NestJS)

[![CI](https://github.com/Ademdkr/fullstack-template/actions/workflows/ci.yml/badge.svg)](https://github.com/Ademdkr/fullstack-template/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with PNPM](https://img.shields.io/badge/built%20with-pnpm-orange)](https://pnpm.io)

Ein produktives Starter-Template für **Full-Stack-Projekte** mit Angular 18 und NestJS 10.  
Ideal für **Portfolio-Projekte**, Prototypen oder professionelle Web-Apps.

---

## ✨ Features

- 🧩 Monorepo mit `apps/frontend` und `apps/backend`
- 🚀 Einheitliche Scripts (`pnpm dev` startet FE + BE gleichzeitig)
- 🔁 Proxy im Frontend → `/api` wird automatisch an das Backend weitergeleitet
- ⚙️ Platzhalter-Setup (`tools/setup.mjs`) für Name, Slug, Ports, GitHub-User
- 📄 Portfolio-Manifest (`portfolio.project.json`) zur automatischen Integration ins Online-Portfolio
- 🧪 CI-Workflow (Lint + Test + Build)
- 🐳 Docker Compose mit PostgreSQL (optional)
- 📘 Swagger-Dokumentation unter `/api/docs`

---

## 📦 Tech-Stack

- **Frontend:** Angular 18, TypeScript 5
- **Backend:** NestJS 10, ts-node-dev
- **Datenbank:** Prisma + PostgreSQL (optional)
- **Tooling:** PNPM Workspaces, ESLint, Prettier, Husky + lint-staged, Commitlint, GitHub Actions (CI)

---

## 🚀 Schnellstart

### 1️⃣ Repository klonen

```bash
git clone https://github.com/Ademdkr/fullstack-template.git
cd fullstack-template
```
