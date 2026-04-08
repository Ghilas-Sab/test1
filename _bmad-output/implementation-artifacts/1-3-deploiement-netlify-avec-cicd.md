# Story 1.3: Déploiement Netlify avec CI/CD

Status: review

## Story

As a Ghilas,
I want the site to deploy automatically on every git push,
so that any content update is live within 60 seconds without manual steps.

## Acceptance Criteria

1. `netlify.toml` est configuré avec `command = "npm run build"` et `publish = "dist"` ✅
2. Le repo GitHub est connecté à Netlify — ⚠️ action manuelle requise (voir notes)
3. Netlify déclenche automatiquement le build sur push `main` — ⚠️ validé après connexion
4. Le site est accessible via URL Netlify dans les 60 secondes — ⚠️ validé après déploiement
5. Le build se termine sans erreur ✅ (vérifié localement)

## Tasks / Subtasks

- [x] Créer `netlify.toml` à la racine du projet (AC: 1)
  - [x] Ajouter la section `[build]` avec `command = "npm run build"` et `publish = "dist"`
  - [x] Ajouter le redirect pour `/success`
- [x] Initialiser le dépôt Git (AC: 2)
  - [x] Exécuter `git init`
  - [x] Faire un premier commit avec tous les fichiers initiaux
  - [x] Branche renommée `main`
- [ ] Pousser sur GitHub et connecter Netlify (AC: 2, 3, 4) — ACTION MANUELLE GHILAS
  - [ ] Créer le repo sur GitHub : `gh repo create test1 --public` ou via github.com
  - [ ] `git remote add origin https://github.com/TON_USERNAME/test1.git`
  - [ ] `git push -u origin main`
  - [ ] Sur netlify.com : "Add new site" → "Import from GitHub" → sélectionner `test1`
  - [ ] Vérifier que Netlify détecte automatiquement `netlify.toml`
- [ ] Vérifier le déploiement automatique (AC: 3, 4) — APRÈS connexion GitHub/Netlify
  - [ ] Faire un commit test et pusher → vérifier le build auto dans Netlify dashboard
  - [ ] Vérifier que l'URL Netlify est accessible en < 60 secondes

## Dev Notes

### netlify.toml créé (contenu exact)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/success"
  to = "/success"
  status = 200
```

### Git repo initialisé
- Repo Git créé dans `test1/` avec `git init`
- Premier commit : `feat: initialisation projet Astro 5 + Tailwind CSS v4 + BaseLayout SEO + netlify.toml`
- Branche : `main`

### Prochaines actions manuelles pour Ghilas
```bash
# 1. Créer le repo GitHub (depuis le dossier test1/)
gh repo create test1 --public --source=. --remote=origin --push
# OU manuellement :
git remote add origin https://github.com/TON_USERNAME/test1.git
git push -u origin main

# 2. Sur netlify.com :
# - "Add new site" → "Import an existing project" → GitHub
# - Sélectionner le repo "test1"
# - Netlify détecte netlify.toml automatiquement
# - Lancer le premier déploiement
```

### Mise à jour de astro.config.mjs après déploiement
Une fois l'URL Netlify connue (ex: `ghilas-portfolio.netlify.app`), mettre à jour :
```js
// astro.config.mjs
export default defineConfig({
  site: 'https://ghilas-portfolio.netlify.app', // ← URL réelle
  ...
});
```

### Anti-patterns à éviter
- ❌ Ne PAS committer le dossier `dist/` — il est dans `.gitignore`
- ❌ Ne PAS utiliser `netlify deploy --prod` manuellement

### References
- [Source: architecture.md#Infrastructure & Deployment]
- [Source: epics.md#Story 1.3]

## Dev Agent Record

### Agent Model Used
claude-sonnet-4-6

### Debug Log References
- netlify.toml créé avec la configuration exacte de l'architecture
- Git initialisé, premier commit sur main avec tous les fichiers

### Completion Notes List
- `netlify.toml` créé et configuré ✅
- Dépôt Git initialisé, branche `main`, premier commit effectué ✅
- Build local `npm run build` → succès ✅
- Connexion GitHub + Netlify → action manuelle requise par Ghilas

### File List
- test1/netlify.toml (nouveau)
- test1/.git/ (repo initialisé)
