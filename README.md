# Fullstack Template (Angular + NestJS)

[![CI](https://github.com/Ademdkr/fullstack-template/actions/workflows/ci.yml/badge.svg)](https://github.com/Ademdkr/fullstack-template/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with PNPM](https://img.shields.io/badge/built%20with-pnpm-orange)](https://pnpm.io)

Ein produktionsreifes **Full-Stack TypeScript Template** mit Angular 18 (Frontend), NestJS 10 (Backend), Cloudflare Workers und PostgreSQL.  
Perfekt für **schnelle Prototypen**, **Portfolio-Projekte** oder **professionelle Web-Anwendungen**.

> **🚀 Neu hier?** Lies die [TEMPLATE_USAGE.md](./TEMPLATE_USAGE.md) für eine vollständige Anleitung zur Verwendung dieses Templates!

---

## ✨ Features

### 🏗️ Architektur

- 🧩 **Monorepo-Struktur** mit pnpm Workspaces
  - `apps/frontend` - Angular 18 mit Standalone Components
  - `apps/backend` - NestJS 10 REST API mit Prisma
  - `apps/worker` - Cloudflare Worker mit Hono & Edge-Funktionen
- 🔄 **Hot Reload** für Frontend & Backend gleichzeitig
- � **Proxy-Konfiguration** - `/api` Requests werden automatisch ans Backend weitergeleitet

### 🛠️ Developer Experience

- ⚙️ **Automatisches Setup-Script** - Ersetzt alle Platzhalter mit einem Befehl
- 📝 **TypeScript überall** - Type-Safety im gesamten Stack
- 🎨 **ESLint & Prettier** vorkonfiguriert
- 🪝 **Git Hooks** mit Husky & lint-staged
- � **Conventional Commits** mit Commitlint
- 🧪 **Testing** - Jest (Backend) + Karma/Jasmine (Frontend)

### 🚀 CI/CD & Deployment

- ✅ **GitHub Actions CI** - Automatisches Linting, Testing & Building
- 🌐 **Multi-Platform Deployment**:
  - **Frontend** → Cloudflare Pages (automatisch)
  - **Worker** → Cloudflare Workers (automatisch)
  - **Backend** → Railway / Render / Fly.io (konfigurierbar)
  - **Datenbank** → Neon PostgreSQL (serverless)
- � **Secrets Management** über GitHub Secrets

### 🗄️ Datenbank & API

- 📊 **Prisma ORM** mit Type-Safety
- 🐘 **PostgreSQL** (Docker Compose für lokale Entwicklung)
- 🌊 **Neon Serverless** Adapter für Cloudflare Workers
- 📘 **Swagger/OpenAPI** Dokumentation unter `/api/docs`
- 💚 **Health Checks** mit Datenbank-Status

---

## 📦 Tech-Stack

| Bereich      | Technologie                            |
| ------------ | -------------------------------------- |
| **Frontend** | Angular 18, TypeScript 5, SCSS         |
| **Backend**  | NestJS 10, Prisma 6, PostgreSQL        |
| **Worker**   | Cloudflare Workers, Hono, Neon Adapter |
| **DevOps**   | Docker Compose, GitHub Actions         |
| **Tooling**  | pnpm, ESLint, Prettier, Husky          |
| **Testing**  | Jest, Karma, Jasmine                   |

---

## 🚀 Schnellstart

### Als Template verwenden

1. **Klicke auf "Use this template"** → "Create a new repository"
2. **Clone dein neues Repository**

   ```bash
   git clone https://github.com/dein-username/dein-projekt.git
   cd dein-projekt
   ```

3. **Führe das Setup-Script aus**

   ```bash
   pnpm install
   pnpm setup -- --name="Mein Projekt" --slug="mein-projekt" --user="dein-username"
   ```

4. **Starte die Datenbank**

   ```bash
   pnpm db:up
   ```

5. **Backend Setup**

   ```bash
   cd apps/backend
   cp .env.example .env
   # Bearbeite .env falls nötig
   pnpm prisma:migrate
   pnpm prisma:generate
   pnpm prisma:seed
   cd ../..
   ```

6. **Entwicklung starten**

   ```bash
   pnpm dev
   ```

   🎉 **Fertig!**
   - Frontend: http://localhost:4200
   - Backend: http://localhost:3000/api
   - API Docs: http://localhost:3000/api/docs
   - Health: http://localhost:3000/api/health

### Detaillierte Anleitung

📖 Für eine ausführliche Anleitung siehe:

- **[TEMPLATE_USAGE.md](./TEMPLATE_USAGE.md)** - Komplette Template-Verwendung
- **[docs/SETUP.md](./docs/SETUP.md)** - Lokales Setup & Troubleshooting
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution Guidelines

---

## 📜 Verfügbare Scripts

### Root Scripts

```bash
# Entwicklung
pnpm dev          # Frontend + Backend gleichzeitig
pnpm dev:web      # Nur Frontend
pnpm dev:api      # Nur Backend

# Build
pnpm build        # Alle Apps bauen
pnpm build:web    # Nur Frontend
pnpm build:api    # Nur Backend

# Testing & Qualität
pnpm test         # Alle Tests
pnpm lint         # Alle Apps linten
pnpm format       # Code formatieren

# Datenbank (Docker)
pnpm db:up        # PostgreSQL starten
pnpm db:down      # PostgreSQL stoppen
pnpm db:logs      # Logs anzeigen
pnpm db:studio    # Prisma Studio öffnen

# Prisma
pnpm gen:prisma   # Prisma Clients generieren

# Setup
pnpm setup        # Template konfigurieren
```

---

## 🚢 Deployment

### Voraussetzungen

1. **GitHub Secrets konfigurieren** (Settings → Secrets and variables → Actions):

   ```
   CLOUDFLARE_API_TOKEN    # Für Frontend & Worker Deployment
   CLOUDFLARE_ACCOUNT_ID   # Cloudflare Account ID
   DATABASE_URL            # PostgreSQL Connection (Neon empfohlen)
   DIRECT_DATABASE_URL     # Für Prisma Migrationen
   ```

2. **Deployment-Plattformen**:
   - ✅ **Cloudflare Pages** (Frontend) - Automatisch
   - ✅ **Cloudflare Workers** (Worker) - Automatisch
   - ✅ **Neon** (Datenbank) - Kostenloser Serverless PostgreSQL
   - 🔧 **Railway / Render / Fly.io** (Backend) - Konfiguration siehe [TEMPLATE_USAGE.md](./TEMPLATE_USAGE.md)

### Automatisches Deployment

Push zu `main` triggert automatisch:

```bash
git push origin main
```

Oder manuell über GitHub Actions → Deploy → Run workflow

### Backend Deployment Optionen

Da NestJS nicht nativ auf Cloudflare Workers läuft, empfehlen wir:

**Empfohlen:**

- **[Railway](https://railway.app)** - Einfachste Option, generous free tier
- **[Render](https://render.com)** - Free tier verfügbar
- **[Fly.io](https://fly.io)** - Gute Performance, günstig

Siehe [TEMPLATE_USAGE.md](./TEMPLATE_USAGE.md#backend-auf-railway-deployen) für Details.

---

## 📁 Projekt-Struktur

```
fullstack-template/
├── apps/
│   ├── frontend/          # Angular 18 App
│   │   ├── src/
│   │   │   ├── app/       # Components, Services, Routes
│   │   │   └── environments/
│   │   ├── proxy.conf.json
│   │   └── package.json
│   ├── backend/           # NestJS API
│   │   ├── src/
│   │   │   ├── budgets/   # Beispiel-Modul
│   │   │   ├── health/    # Health Check
│   │   │   ├── prisma/    # Prisma Service
│   │   │   └── main.ts
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── migrations/
│   │   │   └── seed.ts
│   │   └── package.json
│   └── worker/            # Cloudflare Worker
│       ├── src/
│       │   └── index.ts   # Hono API
│       └── wrangler.toml
├── .github/
│   └── workflows/
│       ├── ci.yml         # CI Pipeline
│       └── deploy.yml     # Deployment
├── tools/
│   └── setup.mjs          # Setup-Script
├── docs/
│   └── SETUP.md           # Setup-Dokumentation
├── docker-compose.yml     # Lokale PostgreSQL
├── package.json           # Root Package
├── pnpm-workspace.yaml    # Workspace Config
├── README.md              # Diese Datei
└── TEMPLATE_USAGE.md      # Template-Anleitung
```

---

## 🔧 Konfiguration

### Environment-Variablen

**Root `.env`:**

```bash
APP_NAME="Mein Projekt"
APP_SLUG="mein-projekt"
PORT_WEB=4200
PORT_API=3000
```

**Backend `apps/backend/.env`:**

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/mydb
PORT_API=3000
CORS_ORIGIN=http://localhost:4200
```

**Frontend `apps/frontend/.env`:**

```bash
VITE_API_URL=http://localhost:3000
```

---

## 🧪 Testing

```bash
# Alle Tests
pnpm test

# Nur Backend
pnpm --filter @template/backend test

# Nur Frontend (benötigt Chrome/Chromium)
pnpm --filter @template/frontend test
```

**Hinweis:** Frontend-Tests benötigen Chrome. In CI wird Chromium automatisch installiert.

---

## 🤝 Contributing

Beiträge sind willkommen! Bitte lies [CONTRIBUTING.md](./CONTRIBUTING.md) für Guidelines.

1. Fork das Projekt
2. Erstelle einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'feat: add amazing feature'`)
4. Pushe zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

---

## 📝 License

MIT License - siehe [LICENSE](./LICENSE) für Details.

---

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - Progressive Node.js Framework
- [Angular](https://angular.io/) - Platform for building web applications
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Cloudflare Workers](https://workers.cloudflare.com/) - Serverless Platform
- [Neon](https://neon.tech/) - Serverless PostgreSQL

---

## 📞 Support

- 📖 [Dokumentation](./TEMPLATE_USAGE.md)
- 🐛 [Issue Tracker](https://github.com/Ademdkr/fullstack-template/issues)
- 💬 [Discussions](https://github.com/Ademdkr/fullstack-template/discussions)

---

**Erstellt mit ❤️ für die Developer Community**
