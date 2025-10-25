Dieses PR finalisiert das Template, verbessert die Entwickler-Erfahrung, CI‑Konfiguration, Tests sowie Doku. Ziel ist ein sofort nutzbares, sicheres und reproduzierbares Starter‑Template.

Kurzfassung der Änderungen

- Frontend
  - Tests: hinzugefügt `src/test.ts` (Angular Test-Bootstrap) und `tsconfig.spec.json` angepasst, damit Karma/ChromeHeadless funktioniert.
  - ESLint: `.eslintrc.json` ergänzt und `lint`-Script so angepasst, dass `pnpm -r lint` funktioniert.
  - `apps/frontend/.env.example` ergänzt.
- Backend
  - `tsconfig.json` angepasst (Jest/Node Typen, Tests in TS-Compilation aufgenommen).
  - `apps/backend/.env.example` angelegt.
  - `apps/backend/.env.neon` redigiert: reale Neon-URLs entfernt und durch Platzhalter/Instruktionen ersetzt.
  - Lizenz in `apps/backend/package.json` auf `MIT` gesetzt.
- Worker
  - `apps/worker/.env.example` ergänzt.
- Root / Monorepo
  - `package.json` (root): Node engine gelockert und `postinstall` optional gemacht (env: SKIP_POSTINSTALL=true).
  - `.github/workflows/ci.yml`: separater Job `frontend-tests` hinzugefügt (Chromium installiert, Headless-Karma-Test läuft), Install mit `--ignore-scripts` und explizitem `prisma generate`.
  - `docs/SETUP.md` erstellt / erweitert und `README.md` um Quick-Start ergänzt.
  - `CONTRIBUTING.md` hinzugefügt.
  - `.gitignore` um `.wrangler`-Temporärdateien erweitert.
  - Sicherheitsmaßnahme: Prüfe, dass keine sensiblen Credentials mehr im Repo sind (Neon-URLs wurden bereits entfernt/redigiert).
- Tests / Validierung
  - Lokal geprüft: `pnpm install`, `pnpm --filter @template/frontend build`, `pnpm --filter @template/backend build`, `pnpm -r lint`, `pnpm --filter @template/frontend test` (ChromeHeadless), `pnpm --filter @template/backend test` (Jest) — alles grün lokal.

Checklist before merge:

- [ ] Review changes and confirm no sensitive credentials remain
- [ ] (Optional) Run `pnpm install` and `pnpm -r test` locally
- [ ] Merge and observe CI run

Wenn du möchtest, kann ich in einem Folge-PR noch TypeScript-/DevDependency- Harmonisierung oder CI-Optimierung (pnpm cache) vornehmen.
