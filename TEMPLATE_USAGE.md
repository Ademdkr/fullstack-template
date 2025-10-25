# Template Verwendung

Dieses Dokument erklärt, wie du dieses Template für dein eigenes Projekt nutzen kannst.

## 🚀 Neues Projekt starten

### 1. Template verwenden

#### Option A: GitHub Template verwenden

1. Klicke auf "Use this template" → "Create a new repository"
2. Gib deinem neuen Repository einen Namen
3. Clone dein neues Repository

#### Option B: Manuell klonen

```bash
git clone https://github.com/Ademdkr/fullstack-template.git mein-projekt
cd mein-projekt
rm -rf .git
git init
git add .
git commit -m "Initial commit from template"
```

### 2. Setup-Script ausführen

Das Setup-Script ersetzt automatisch alle Platzhalter im Projekt:

```bash
# PowerShell
pnpm setup -- --name="Mein Projekt" --slug="mein-projekt" --user="dein-github-username" --portWeb=4200 --portApi=3000

# Bash
pnpm setup -- --name="Mein Projekt" --slug="mein-projekt" --user="dein-github-username" --portWeb=4200 --portApi=3000
```

**Parameter:**

- `--name`: Der volle Name deines Projekts (z.B. "Budget Tracker")
- `--slug`: URL-freundlicher Name (z.B. "budget-tracker")
- `--user`: Dein GitHub Username
- `--portWeb`: Port für das Frontend (Standard: 4200)
- `--portApi`: Port für das Backend (Standard: 3000)

Das Script ersetzt automatisch:

- Projekt-Namen in allen `package.json` Dateien
- Ports in Konfigurationsdateien
- GitHub-Referenzen
- Platzhalter in Environment-Dateien

### 3. Dependencies installieren

```bash
pnpm install
```

### 4. Environment-Variablen konfigurieren

#### Backend (.env)

```bash
# Kopiere die Beispieldatei
cp apps/backend/.env.example apps/backend/.env

# Bearbeite apps/backend/.env und passe die DATABASE_URL an
```

Für lokale Entwicklung mit Docker:

```bash
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5433/mein-projekt?schema=public&sslmode=disable
```

#### Frontend (.env) - Optional

```bash
cp apps/frontend/.env.example apps/frontend/.env
# Passe bei Bedarf die API URLs an
```

### 5. Datenbank starten & migrieren

```bash
# Docker Compose Datenbank starten
pnpm db:up

# Prisma Migrationen ausführen
cd apps/backend
pnpm prisma:migrate
pnpm prisma:generate
pnpm prisma:seed
cd ../..
```

### 6. Entwicklung starten

```bash
# Frontend + Backend gleichzeitig
pnpm dev

# Oder einzeln:
pnpm dev:web   # Nur Frontend
pnpm dev:api   # Nur Backend
```

Das Frontend läuft auf `http://localhost:4200` (oder deinem konfigurierten Port)
Das Backend läuft auf `http://localhost:3000/api` (oder deinem konfigurierten Port)

## 📦 Projekt-Struktur anpassen

### Neue Features hinzufügen

#### Backend (NestJS)

```bash
cd apps/backend
pnpm nest generate resource users
```

#### Frontend (Angular)

```bash
cd apps/frontend
pnpm ng generate component features/user-list
pnpm ng generate service services/user
```

### Datenbank-Schema ändern

1. Bearbeite `apps/backend/prisma/schema.prisma`
2. Erstelle eine Migration:
   ```bash
   cd apps/backend
   pnpm prisma migrate dev --name add-users-table
   ```
3. Generiere den Prisma Client neu:
   ```bash
   pnpm prisma:generate
   ```

## 🚢 Deployment vorbereiten

### 1. GitHub Secrets konfigurieren

Gehe zu deinem Repository → Settings → Secrets and variables → Actions

Füge folgende Secrets hinzu:

#### Für Cloudflare (Frontend & Worker)

- `CLOUDFLARE_API_TOKEN`: Cloudflare API Token mit "Edit Cloudflare Workers" Berechtigung
- `CLOUDFLARE_ACCOUNT_ID`: Deine Cloudflare Account ID

#### Für Datenbank (Neon empfohlen)

- `DATABASE_URL`: PostgreSQL Connection String (Pooled Connection)
- `DIRECT_DATABASE_URL`: Direct Connection (für Migrationen)

#### Optional: Backend Deployment

Für Backend-Deployment brauchst du eine Alternative zu Cloudflare Workers:

**Railway** (empfohlen für NestJS):

- `RAILWAY_TOKEN`: Railway API Token

**Render**:

- Konfiguriere über Render Dashboard

**Fly.io**:

- `FLY_API_TOKEN`: Fly.io API Token

### 2. Cloudflare Projekte erstellen

#### Pages Projekt (Frontend)

1. Gehe zu Cloudflare Dashboard → Pages
2. Erstelle ein neues Projekt
3. Benenne es: `dein-slug-frontend`

#### Workers Projekt (Worker)

Der Worker wird automatisch beim ersten Deploy erstellt.

### 3. Datenbank bei Neon erstellen

1. Gehe zu [console.neon.tech](https://console.neon.tech)
2. Erstelle ein neues Projekt
3. Kopiere die Connection Strings:
   - **Pooled connection** → `DATABASE_URL` Secret
   - **Direct connection** → `DIRECT_DATABASE_URL` Secret

### 4. Deploy ausführen

Push zu `main` Branch löst automatisch Deployment aus:

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

Oder manuell triggern:

- Gehe zu GitHub → Actions → Deploy → Run workflow

## 📝 Nach dem Setup

### Was zu tun ist:

1. **README.md anpassen**
   - Ersetze die Projekt-Beschreibung
   - Füge Screenshots hinzu
   - Dokumentiere projektspezifische Features

2. **Portfolio Manifest** (optional)
   - Bearbeite `portfolio.project.json`
   - Füge Thumbnail und Demo-URLs hinzu

3. **Git-History bereinigen** (optional)

   ```bash
   rm -rf .git
   git init
   git add .
   git commit -m "Initial commit"
   ```

4. **Tests schreiben**
   - Füge Tests für neue Features hinzu
   - Führe Tests aus: `pnpm test`

5. **CI/CD überprüfen**
   - Stelle sicher, dass alle GitHub Actions erfolgreich laufen
   - Überprüfe die Deployment-Logs

## 🔧 Erweiterte Konfiguration

### Alternative Deployment-Plattformen

#### Backend auf Railway deployen

1. Installiere Railway CLI:

   ```bash
   npm install -g @railway/cli
   ```

2. Login:

   ```bash
   railway login
   ```

3. Neues Projekt erstellen:

   ```bash
   cd apps/backend
   railway init
   ```

4. Environment-Variablen setzen:

   ```bash
   railway variables set DATABASE_URL="postgresql://..."
   railway variables set PORT_API=3000
   ```

5. Deployen:
   ```bash
   railway up
   ```

#### Backend auf Render deployen

1. Erstelle `render.yaml` im Root:

   ```yaml
   services:
     - type: web
       name: mein-projekt-backend
       env: node
       buildCommand: cd apps/backend && pnpm install && pnpm build
       startCommand: cd apps/backend && pnpm start:prod
       envVars:
         - key: DATABASE_URL
           sync: false
         - key: PORT_API
           value: 3000
   ```

2. Verbinde dein Repository mit Render
3. Deploy wird automatisch getriggert

### Monorepo erweitern

Neue App hinzufügen:

```bash
mkdir -p apps/neue-app
cd apps/neue-app
npm init -y
# Konfiguriere package.json mit @dein-slug/neue-app
```

Füge zum Root `package.json` hinzu:

```json
{
  "scripts": {
    "dev:neue-app": "pnpm --filter @dein-slug/neue-app dev"
  }
}
```

## 🐛 Troubleshooting

### Häufige Probleme

**Problem: Prisma Client fehlt**

```bash
pnpm --filter @template/backend prisma:generate
pnpm --filter @template/worker prisma:generate
```

**Problem: Port bereits in Verwendung**

- Ändere Ports in `.env`
- Oder finde den Prozess: `lsof -i :3000` (Mac/Linux) / `netstat -ano | findstr :3000` (Windows)

**Problem: Docker Datenbank startet nicht**

```bash
pnpm db:down
pnpm db:up
pnpm db:logs
```

**Problem: Frontend Tests schlagen fehl (Chrome nicht gefunden)**

- Installiere Chrome/Chromium
- Oder deaktiviere Frontend-Tests in `.github/workflows/ci.yml`

## 📚 Weitere Ressourcen

- [NestJS Dokumentation](https://docs.nestjs.com/)
- [Angular Dokumentation](https://angular.io/docs)
- [Prisma Dokumentation](https://www.prisma.io/docs)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Railway Docs](https://docs.railway.app/)
- [Neon Docs](https://neon.tech/docs)

## 💡 Best Practices

1. **Commits**: Nutze Conventional Commits (z.B. `feat:`, `fix:`, `docs:`)
2. **Branches**: Arbeite in Feature-Branches, merge zu `main`
3. **Tests**: Schreibe Tests für neue Features
4. **Documentation**: Halte README und Docs aktuell
5. **Security**: Commite nie Secrets oder `.env` Dateien
6. **Dependencies**: Halte Dependencies aktuell mit `pnpm update`

## 🆘 Support

Bei Fragen oder Problemen:

1. Überprüfe die [SETUP.md](./docs/SETUP.md) Dokumentation
2. Suche in den GitHub Issues
3. Erstelle ein neues Issue mit detaillierter Beschreibung

Viel Erfolg mit deinem Projekt! 🚀
