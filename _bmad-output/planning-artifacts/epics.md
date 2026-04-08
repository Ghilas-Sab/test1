---
stepsCompleted: [1, 2, 3, 4]
status: 'complete'
completedAt: '2026-04-08'
inputDocuments: ['_bmad-output/planning-artifacts/prd.md', '_bmad-output/planning-artifacts/architecture.md']
---

# test1 - Epic Breakdown

## Overview

Ce document fournit la décomposition complète en épics et stories pour le site portfolio personnel de Ghilas Sabour (projet test1), en décomposant les exigences du PRD et de l'Architecture en stories implémentables.

## Requirements Inventory

### Functional Requirements

FR1: L'utilisateur peut voir la section Hero (nom, photo, titre, accroche) et comprendre le profil en moins de 10 secondes.
FR2: L'utilisateur peut consulter la section À propos avec biographie et liste de compétences.
FR3: L'utilisateur peut consulter une galerie de 4 à 6 photos avec légendes, et ouvrir chaque photo en plein écran.
FR4: L'utilisateur peut consulter au minimum 3 projets avec titre, description technique, technologies utilisées et lien GitHub.
FR5: L'utilisateur peut envoyer un message de contact via formulaire (champs : nom, email, message) et reçoit une confirmation d'envoi.
FR6: L'utilisateur mobile peut appeler directement via un numéro de téléphone cliquable (tel: link).
FR7: Ghilas peut mettre à jour le contenu du site via git push avec redéploiement automatique en moins de 60 secondes.

### NonFunctional Requirements

NFR1: Score Lighthouse Performance ≥ 90/100 (mesuré via Lighthouse CLI).
NFR2: Chargement initial de la page < 2 secondes (mesuré sur réseau standard).
NFR3: Site responsive mobile-first de 320px à 1440px+ avec breakpoints mobile / tablette / desktop.
NFR4: Accessibilité niveau AA (WCAG 2.1) — contraste ≥ 4.5:1, navigation clavier, alt text sur toutes les images.
NFR5: SEO — balises `<title>` et `<meta description>` optimisées, Open Graph (titre, description, image), URL propre avec domaine personnalisé.
NFR6: Compatibilité navigateurs : Chrome, Firefox, Safari, Edge (2 dernières versions majeures).
NFR7: CI/CD — tout push sur la branche `main` déclenche un déploiement automatique Netlify.

### Additional Requirements

- Tech1: Initialisation du projet via `npm create astro@latest test1` suivi de `npx astro add tailwind` (Astro 6.1.3, Tailwind CSS v4).
- Tech2: Astro Content Collections avec schémas Zod définis dans `src/content/config.ts` pour les collections `projects` et `gallery`.
- Tech3: Formulaire de contact via Netlify Forms — attribut `data-netlify="true"`, champ honeypot, redirection vers `success.astro` après envoi.
- Tech4: Toutes les images du site doivent utiliser `astro:assets` (composant `<Image>`) — jamais de balise `<img>` directe sauf pour `public/`.
- Tech5: Architecture single-page avec navigation par ancres : `#hero`, `#about`, `#gallery`, `#projects`, `#contact`.
- Tech6: `BaseLayout.astro` unique pour le head SEO — reçoit les props `title`, `description`, `ogImage?`.
- Tech7: `netlify.toml` configuré avec `command = "npm run build"` et `publish = "dist"`, déploiement auto depuis GitHub branch `main`.

### UX Design Requirements

N/A — Aucun document UX Design disponible.

### FR Coverage Map

FR1: Epic 2 — Hero (nom, photo, titre, accroche)
FR2: Epic 2 — Section À propos (bio + compétences)
FR3: Epic 3 — Galerie photos (4-6 images, plein écran)
FR4: Epic 3 — Section Projets (≥3 projets avec détails)
FR5: Epic 4 — Formulaire de contact (nom, email, message, confirmation)
FR6: Epic 4 — Numéro de téléphone cliquable (tel: link)
FR7: Epic 1 — CI/CD déploiement automatique via GitHub → Netlify

## Epic List

### Epic 1: Fondations & Déploiement
Le site existe, est déployé en production sur Netlify et est indexable sur Google dès la fin de cet epic.
**FRs covered:** FR7
**Tech:** Tech1, Tech6, Tech7
**NFRs:** NFR5, NFR7

### Epic 2: Présentation Personnelle
Le recruteur peut comprendre qui est Ghilas (identité, parcours, compétences) en moins de 10 secondes après l'ouverture du site.
**FRs covered:** FR1, FR2
**Tech:** Tech5
**NFRs:** NFR3

### Epic 3: Portfolio (Galerie & Projets)
Le recruteur peut consulter les photos personnelles de Ghilas et ses réalisations techniques détaillées avec liens GitHub.
**FRs covered:** FR3, FR4
**Tech:** Tech2, Tech4

### Epic 4: Contact, Accessibilité & Performance
Le recruteur peut contacter Ghilas facilement depuis n'importe quel device, et le site respecte tous les standards de performance et d'accessibilité.
**FRs covered:** FR5, FR6
**Tech:** Tech3
**NFRs:** NFR1, NFR2, NFR4, NFR6

---

## Epic 1: Fondations & Déploiement

Le site existe, est déployé en production sur Netlify et est indexable sur Google dès la fin de cet epic.

### Story 1.1: Initialisation du projet Astro + Tailwind

As a Ghilas,
I want to initialize the project with Astro and Tailwind CSS,
So that I have a working development environment ready for building.

**Acceptance Criteria:**

**Given** un environnement Node.js installé
**When** j'exécute `npm create astro@latest test1` puis `npx astro add tailwind`
**Then** le projet démarre avec `npm run dev` sans erreur
**And** TypeScript est en mode `strict` dans `tsconfig.json`
**And** Tailwind CSS v4 est fonctionnel (une classe Tailwind appliquée et visible)
**And** la structure de dossiers correspond à l'architecture : `src/components/`, `src/layouts/`, `src/pages/`, `src/content/`, `src/assets/`, `src/styles/`, `public/`

### Story 1.2: Layout de base et configuration SEO

As a recruteur,
I want the site to have proper metadata and a consistent base structure,
So that the site is indexable on Google and shareable on LinkedIn with a preview.

**Acceptance Criteria:**

**Given** le projet initialisé (Story 1.1 complétée)
**When** j'ouvre `index.astro` dans un navigateur
**Then** `BaseLayout.astro` est le seul layout utilisé et contient le `<head>` complet
**And** les balises `<title>` et `<meta name="description">` sont présentes et renseignées
**And** les balises Open Graph (`og:title`, `og:description`, `og:image`) sont présentes
**And** `global.css` inclut `scroll-behavior: smooth` et le reset de base
**And** `public/og-image.jpg` est présent (1200×630px)

### Story 1.3: Déploiement Netlify avec CI/CD

As a Ghilas,
I want the site to deploy automatically on every git push,
So that any content update is live within 60 seconds without manual steps.

**Acceptance Criteria:**

**Given** le repo GitHub connecté à Netlify
**When** je fais un `git push` sur la branche `main`
**Then** Netlify déclenche automatiquement le build
**And** le site est accessible via URL Netlify dans les 60 secondes
**And** `netlify.toml` est configuré avec `command = "npm run build"` et `publish = "dist"`
**And** le build se termine sans erreur

---

## Epic 2: Présentation Personnelle

Le recruteur peut comprendre qui est Ghilas (identité, parcours, compétences) en moins de 10 secondes après l'ouverture du site.

### Story 2.1: Navigation sticky avec ancres

As a recruteur,
I want a sticky navigation bar with anchor links to each section,
So that I can quickly jump to any part of the page from anywhere.

**Acceptance Criteria:**

**Given** le site ouvert dans un navigateur
**When** je fais défiler la page
**Then** la barre de navigation reste visible en haut de l'écran
**And** les liens de navigation (`#hero`, `#about`, `#gallery`, `#projects`, `#contact`) scrollent vers la section correspondante avec animation fluide
**And** la navigation est responsive et utilisable sur mobile (menu hamburger ou liens visibles)
**And** chaque lien a un `aria-label` accessible

### Story 2.2: Section Hero

As a recruteur,
I want to immediately see who Ghilas is when the page loads,
So that I can assess his profile in under 10 seconds.

**Acceptance Criteria:**

**Given** le site chargé dans un navigateur
**When** la page s'affiche
**Then** la section Hero est visible sans scroll avec : photo de profil, nom complet, titre (Étudiant Master Informatique), phrase d'accroche
**And** un bouton CTA "Me contacter" et un bouton "Voir mes projets" sont présents et fonctionnels (scroll vers sections)
**And** la photo est affichée via `astro:assets` (composant `<Image>`)
**And** la section est responsive sur mobile (320px) et desktop (1440px+)
**And** l'image a un attribut `alt` descriptif

### Story 2.3: Section À propos

As a recruteur,
I want to read a brief personal presentation and see Ghilas's skills,
So that I can evaluate his background and technical profile.

**Acceptance Criteria:**

**Given** la section About visible après scroll ou clic sur "À propos"
**When** je consulte la section
**Then** une biographie personnelle de Ghilas est affichée (minimum 3 phrases)
**And** une liste de compétences techniques est visible (langages, frameworks, outils)
**And** la section a l'ancre `id="about"`
**And** la section est responsive (mobile et desktop)

---

## Epic 3: Portfolio (Galerie & Projets)

Le recruteur peut consulter les photos personnelles de Ghilas et ses réalisations techniques détaillées avec liens GitHub.

### Story 3.1: Configuration des Content Collections

As a Ghilas,
I want typed content collections for projects and gallery,
So that adding or updating content is structured, validated, and type-safe.

**Acceptance Criteria:**

**Given** le projet Astro initialisé
**When** j'ajoute un fichier `.md` dans `src/content/projects/` ou `src/content/gallery/`
**Then** Astro valide le frontmatter via le schéma Zod défini dans `src/content/config.ts`
**And** le schéma `projects` contient : `title` (string), `description` (string), `technologies` (string[]), `githubUrl` (string url, optional), `date` (date)
**And** le schéma `gallery` contient : `caption` (string), `imagePath` (string), `alt` (string)
**And** au moins 3 fichiers projets et 4 fichiers galerie de démonstration sont présents

### Story 3.2: Section Galerie avec lightbox

As a recruteur,
I want to browse a photo gallery of Ghilas and open photos in full screen,
So that I get a more personal and human impression of the candidate.

**Acceptance Criteria:**

**Given** la section Galerie visible après scroll
**When** je consulte la grille de photos
**Then** 4 à 6 photos sont affichées en grille responsive
**And** chaque photo est chargée via `astro:assets` (optimisation WebP + lazy loading)
**And** chaque photo a une légende issue de la Content Collection
**When** je clique sur une photo
**Then** un `<dialog>` HTML natif s'ouvre avec la photo en grand format
**And** le dialog se ferme en cliquant en dehors ou avec la touche Échap
**And** le `<dialog>` a un `aria-label` et gère le focus trap
**And** la section a l'ancre `id="gallery"`

### Story 3.3: Section Projets

As a recruteur,
I want to see Ghilas's projects with technical details and GitHub links,
So that I can evaluate his technical skills through concrete realizations.

**Acceptance Criteria:**

**Given** la section Projets visible après scroll
**When** je consulte la grille de projets
**Then** au minimum 3 projets sont affichés sous forme de cartes
**And** chaque carte affiche : titre, description courte, liste de technologies, lien GitHub (si présent)
**And** les projets sont chargés depuis la Content Collection `projects` via `getCollection()`
**And** les cartes sont responsive (grille 1 colonne mobile, 2-3 colonnes desktop)
**And** la section a l'ancre `id="projects"`

---

## Epic 4: Contact, Accessibilité & Performance

Le recruteur peut contacter Ghilas facilement depuis n'importe quel device, et le site respecte tous les standards de performance et d'accessibilité.

### Story 4.1: Section Contact avec formulaire Netlify

As a recruteur,
I want to send a message to Ghilas via a contact form,
So that I can reach him in less than 3 clicks from anywhere on the page.

**Acceptance Criteria:**

**Given** la section Contact visible après scroll ou clic sur "Me contacter"
**When** je remplis le formulaire (nom, email, message) et clique sur Envoyer
**Then** Netlify Forms reçoit la soumission et redirige vers `/success`
**And** le formulaire a l'attribut `data-netlify="true"` et un champ honeypot
**And** l'email, le téléphone (cliquable via `tel:`) et l'adresse sont visibles
**And** le numéro de téléphone déclenche un appel au tap sur mobile
**And** la section a l'ancre `id="contact"`
**And** tous les champs du formulaire ont des labels accessibles

### Story 4.2: Page de confirmation d'envoi

As a recruteur,
I want to see a confirmation after sending my message,
So that I know my message was received successfully.

**Acceptance Criteria:**

**Given** j'ai soumis le formulaire de contact
**When** la redirection vers `/success` s'effectue
**Then** une page de confirmation s'affiche avec un message clair ("Message envoyé !")
**And** un lien "Retour au site" ramène vers `/#contact`
**And** `success.astro` utilise `BaseLayout.astro` avec title et description SEO appropriés

### Story 4.3: Audit accessibilité AA et corrections

As a recruteur (utilisateur avec besoins d'accessibilité),
I want the site to be fully navigable by keyboard and screen reader,
So that the site is inclusive and compliant with WCAG 2.1 AA.

**Acceptance Criteria:**

**Given** le site complet déployé
**When** j'effectue un audit avec Lighthouse Accessibility
**Then** le score Accessibility Lighthouse est ≥ 90
**And** toutes les images ont un attribut `alt` non vide
**And** tous les liens et boutons ont un label accessible (texte visible ou `aria-label`)
**And** le ratio de contraste texte/fond est ≥ 4.5:1 sur tout le site
**And** la navigation complète du site est possible au clavier (Tab, Entrée, Échap)

### Story 4.4: Optimisation performance finale

As a recruteur,
I want the site to load fast and score high on Lighthouse,
So that I get a seamless browsing experience and Ghilas demonstrates technical quality.

**Acceptance Criteria:**

**Given** le site complet déployé sur Netlify
**When** j'exécute un audit Lighthouse sur la page d'accueil
**Then** le score Performance Lighthouse est ≥ 90/100
**And** le chargement initial de la page est < 2 secondes (sur réseau standard)
**And** toutes les images sont servies au format WebP via `astro:assets`
**And** le site s'affiche correctement sur Chrome, Firefox, Safari, Edge (2 dernières versions)
**And** le site est fully responsive de 320px à 1440px+ sans scroll horizontal
