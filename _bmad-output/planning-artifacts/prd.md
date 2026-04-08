---
stepsCompleted: [step-01-init, step-02-discovery, step-02b-vision, step-02c-executive-summary, step-03-success, step-04-journeys, step-05-domain, step-06-innovation, step-07-project-type]
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
inputDocuments: [_bmad-output/planning-artifacts/product-brief.md]
workflowType: 'prd'
---

# Product Requirements Document - Site Web de Présentation Personnelle

**Author:** ghilas
**Date:** 2026-04-07

## Executive Summary

Site web de présentation personnelle de Ghilas Sabour, étudiant en Master Informatique (22 ans). Conçu comme vitrine numérique à destination des recruteurs, ce site centralise identité, compétences, projets et coordonnées en un point d'accès unique. L'objectif est immédiat : générer une première impression de sérieux et de maîtrise technique avant même l'entretien.

Problème résolu : un CV PDF est générique et impersonnel. Les recruteurs googlent les candidats — sans site propre, Ghilas n'existe pas en ligne. Avec ce site, il contrôle ce qu'ils trouvent.

### Ce qui le rend spécial

Un étudiant en informatique qui construit et héberge lui-même son portfolio, c'est déjà une démonstration de compétence. Le site ne se contente pas de *parler* de ses capacités — il *en est* la preuve. Design sobre, performance maximale (Astro + Tailwind), déployé sur Netlify. Aucun template générique, aucun constructeur de site — du code maîtrisé.

## Classification du Projet

| Attribut | Valeur |
|----------|--------|
| **Type** | Web App statique (site portfolio) |
| **Domaine** | Général — aucune contrainte réglementaire |
| **Complexité** | Faible |
| **Contexte** | Greenfield — création from scratch |
| **Stack** | Astro 4 + Tailwind CSS + Netlify |

## Exigences Spécifiques Web App

### Vue d'ensemble

Site statique single-page (défilement fluide, style portfolio moderne). Astro génère des pages ultra-performantes, navigation par ancres.

### Architecture Technique

| Choix | Décision |
|-------|----------|
| Structure | Single-page avec sections ancrées |
| Navigateurs supportés | Chrome, Firefox, Safari, Edge (2 dernières versions) |
| SEO | Activé — balises meta, Open Graph, nom indexable sur Google |
| Temps réel | Non requis |
| Accessibilité | Niveau AA (contraste, navigation clavier, alt text images) |

### Responsive Design

- Mobile first (320px → desktop 1440px+)
- Breakpoints : mobile / tablette / desktop
- Numéro de téléphone cliquable (`tel:` link)

### Performance

- Astro Zero-JS par défaut — HTML statique pur
- Images optimisées automatiquement via `astro:assets`
- Score Lighthouse ≥ 90

### SEO

- Balises `<title>` et `<meta description>` optimisées
- Open Graph (aperçu quand le lien est partagé sur LinkedIn)
- URL propre avec domaine personnalisé

## Success Criteria

### Succès Utilisateur (Recruteur)

- Le recruteur comprend qui est Ghilas en **moins de 10 secondes** sur la page d'accueil
- Le design et la qualité du code donnent l'impression d'un profil **sérieux et compétent**
- Le recruteur trouve les coordonnées et peut contacter Ghilas en **moins de 3 clics**
- Le site s'affiche parfaitement sur mobile (les recruteurs consultent souvent sur téléphone)

### Succès Business (Ghilas)

- **Objectif principal :** Décrocher une alternance grâce (en partie) au site
- Le site est mentionné ou consulté lors d'au moins un entretien
- Le nom "Ghilas Sabour" remonte dans les premiers résultats Google

### Succès Technique

- Score Lighthouse Performance : **≥ 90/100**
- Chargement page : **< 2 secondes**
- 100% responsive (mobile, tablette, desktop)
- Formulaire de contact fonctionnel et délivré

### Résultats Mesurables

| Métrique | Cible |
|----------|-------|
| Temps pour comprendre le profil | < 10 secondes |
| Clics pour contacter | ≤ 3 |
| Score performance Lighthouse | ≥ 90 |
| Chargement initial | < 2s |
| Objectif final | 1 alternance décrochée |

## Périmètre Produit

### MVP — Lancement

- Hero (nom, photo, titre, accroche)
- Section À propos + description
- Galerie photos (4-6 images)
- Section Projets (3 projets minimum)
- Page Contact (formulaire + coordonnées)
- Déploiement Netlify avec domaine

### Growth (Post-lancement)

- Blog / articles techniques
- Compteur de visites
- CV téléchargeable en PDF

### Vision (Futur)

- Site multilingue (FR/EN)
- Portfolio évolutif reflétant une carrière professionnelle

## Parcours Utilisateurs

### Parcours 1 — Le Recruteur (chemin principal)

**Personnage :** Sophie, 34 ans, chargée de recrutement dans une ESN parisienne. Elle cherche un alternant développeur pour septembre.

- **Scène d'ouverture :** Sophie reçoit la candidature de Ghilas par email. Elle voit l'URL de son site dans le CV. Elle clique.
- **Action montante :** La page d'accueil charge instantanément. Elle voit la photo, le nom, "Étudiant Master Informatique". En 5 secondes, elle sait à qui elle a affaire. Elle fait défiler — section À propos, compétences, projets.
- **Moment clé :** Elle clique sur un projet, lit la description technique. Elle pense : *"ce gars sait ce qu'il fait, et il a pris la peine de construire un site propre."* Elle cherche les coordonnées — un clic sur "Contact", le formulaire est là.
- **Résolution :** Sophie envoie un message via le formulaire. Ghilas reçoit la notification. L'entretien est planifié.

**Exigences révélées :** hero clair, section projets avec détails techniques, formulaire fonctionnel, vitesse de chargement.

---

### Parcours 2 — Le Recruteur (cas limite)

**Personnage :** Marc, 41 ans, DRH d'une PME. Il consulte sur son iPhone pendant son trajet.

- **Scène d'ouverture :** Marc a reçu le lien par SMS d'un collègue. Il ouvre sur mobile.
- **Action montante :** Le site s'adapte au mobile, navigation fluide. Il parcourt rapidement.
- **Moment clé :** Il veut appeler directement — il tape sur le numéro de téléphone affiché. L'appel se lance automatiquement.
- **Résolution :** Contact établi sans friction.

**Exigences révélées :** responsive mobile, numéro de téléphone cliquable (`tel:` link).

---

### Parcours 3 — Ghilas lui-même (maintenance)

**Personnage :** Ghilas, après avoir terminé un nouveau projet universitaire.

- **Scène d'ouverture :** Ghilas veut ajouter son dernier projet au site.
- **Action montante :** Il ouvre son éditeur, modifie le fichier de contenu Astro, fait un `git push`.
- **Moment clé :** Netlify détecte le push et redéploie automatiquement en 30 secondes.
- **Résolution :** Le site est à jour sans manipulation complexe.

**Exigences révélées :** structure de contenu simple à modifier, déploiement continu via GitHub + Netlify.

---

### Résumé des Exigences Révélées

| Parcours | Capacités requises |
|----------|-------------------|
| Recruteur principal | Hero, projets détaillés, formulaire, performance |
| Recruteur mobile | Responsive, `tel:` link, navigation tactile |
| Ghilas (maintenance) | Structure Astro simple, CI/CD Netlify |
