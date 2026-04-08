# Product Brief : Site Web de Présentation Personnelle — Ghilas Sabour

---

## Résumé Exécutif

Ghilas Sabour, 22 ans, étudiant en Master Informatique, souhaite se doter d'un site web personnel qui lui serve de carte de visite numérique professionnelle. Dans un monde où les recruteurs, partenaires académiques et collaborateurs potentiels cherchent d'abord en ligne, un site personnel bien conçu est devenu le premier outil de différenciation d'un jeune profil technique.

Ce site doit refléter à la fois la rigueur d'un étudiant en informatique et la personnalité d'un individu curieux, ambitieux et accessible. Il centralise en un seul endroit tout ce qu'un visiteur aurait besoin de savoir : qui est Ghilas, ce qu'il sait faire, ses projets, et comment le contacter.

L'objectif n'est pas simplement d'exister en ligne — c'est de créer une impression mémorable.

---

## Le Problème

Les jeunes professionnels et étudiants en informatique disposent souvent de compétences solides mais d'une visibilité numérique insuffisante. Un profil LinkedIn seul est générique et ne permet pas de montrer sa personnalité ni ses réalisations concrètes. Les recruteurs reçoivent des dizaines de CVs PDF identiques — un site personnel bien construit permet de sortir immédiatement du lot.

Sans vitrine en ligne propre, Ghilas dépend d'outils tiers qui ne lui appartiennent pas et qui ne transmettent pas l'image d'un développeur maîtrisant son environnement numérique.

---

## La Solution

Un mini-site web personnel, moderne et épuré, avec les sections suivantes :

### Structure des pages

**1. Hero / Accueil**
- Photo de profil professionnelle (ou photo choisie par Ghilas)
- Nom complet : **Ghilas Sabour**
- Titre : *Étudiant en Master Informatique*
- Phrase d'accroche personnalisée (ex : *"Passionné par le développement logiciel et les nouvelles technologies, je construis des solutions qui ont du sens."*)
- Bouton d'appel à l'action : "Me contacter" / "Voir mes projets"

**2. À propos de moi**
- Présentation personnelle narrative :
  > Ghilas Sabour est un étudiant de 22 ans en Master Informatique, animé par une curiosité intellectuelle profonde et un goût prononcé pour la résolution de problèmes complexes. Depuis ses premiers pas en programmation, il explore les langages, frameworks et architectures avec l'enthousiasme de quelqu'un qui sait que chaque ligne de code peut changer quelque chose. Rigoureux dans son travail, ouvert à la collaboration, et toujours en quête d'apprentissage, il cherche à construire des expériences numériques qui allient performance et élégance.
- Compétences (à compléter selon son cursus) : Python, Java, Web, Bases de données, etc.
- Loisirs / centres d'intérêt (à personnaliser)

**3. Galerie / Photos**
- Section galerie avec 3 à 6 photos (photo de profil, photos de projets, campus, moments personnels)
- Format moderne : grille ou carrousel
- Légendes courtes pour contextualiser chaque image
- *(Les photos réelles seront fournies par Ghilas lors du développement)*

**4. Projets / Réalisations**
- Cartes de projets académiques ou personnels
- Chaque carte : titre, description courte, technologies utilisées, lien GitHub (si disponible)
- *(À alimenter avec les vrais projets de Ghilas)*

**5. Contact**
- Formulaire de contact simple (nom, email, message)
- Coordonnées directes :
  - **Email** : ghilas@gmail.com
  - **Téléphone** : 07 07 07 07 07
  - **Adresse** : 16 rue du Maine
- Icônes de réseaux sociaux (LinkedIn, GitHub, etc.)

---

## Ce qui le Différencie

- Design personnalisé, pas un template générique — reflète la personnalité de Ghilas
- Hébergé sous son propre domaine (ex: ghilassabour.fr) pour un impact professionnel maximal
- Code maîtrisé par Ghilas lui-même — preuve concrète de ses compétences techniques
- Galerie photos pour une dimension humaine et authentique rarement présente dans un CV classique

---

## Public Cible

**Primaire :**
- Recruteurs en stage / alternance / premier emploi dans le secteur IT
- Enseignants et jury de soutenance souhaitant évaluer le profil global

**Secondaire :**
- Futurs collaborateurs sur des projets étudiants ou open source
- Réseau personnel et professionnel

---

## Critères de Succès

- Site accessible en ligne, mobile-responsive
- Chargement rapide (< 2s)
- Navigation intuitive en moins de 3 clics vers n'importe quelle information
- Au moins 3 projets présentés avec description claire
- Formulaire de contact fonctionnel

---

## Périmètre V1

**Inclus :**
- 5 sections (Hero, À propos, Galerie, Projets, Contact)
- Design responsive (mobile + desktop)
- Galerie photos avec 4-6 images
- Formulaire de contact
- Coordonnées complètes

**Hors scope V1 :**
- Blog / articles
- Système de back-office ou CMS
- Multilingue (peut venir en V2)
- Animations complexes

---

## Vision

À terme, ce site devient le hub central de la présence numérique de Ghilas : enrichi de nouveaux projets au fil de sa carrière, potentiellement un blog technique, et une vitrine évolutive qui grandit avec lui. Dans 2-3 ans, il pourra refléter une carrière professionnelle complète plutôt qu'un profil étudiant.

---

## Stack Technologique Recommandée

### Choix : Astro + Tailwind CSS + Netlify

| Couche | Technologie | Pourquoi |
|--------|-------------|----------|
| Framework | **Astro 4** | Conçu spécifiquement pour les sites orientés contenu (portfolios, blogs). Génère du HTML statique ultra-rapide, zéro JavaScript inutile envoyé au navigateur. Le meilleur outil qui existe aujourd'hui pour ce type de projet. |
| Style | **Tailwind CSS** | CSS utilitaire — design propre et cohérent sans écrire des feuilles de style complexes. Responsive par défaut. |
| Galerie photos | **Lightbox natif (CSS + JS vanilla)** | Léger, sans dépendance externe, suffisant pour 4-6 photos. |
| Formulaire de contact | **Netlify Forms** | Gratuit, sans backend, sans serveur — les messages arrivent directement dans un tableau de bord. |
| Hébergement | **Netlify** (offre gratuite) | Déploiement automatique depuis GitHub, HTTPS inclus, domaine personnalisé supporté. Zéro coût pour un portfolio étudiant. |
| Versioning | **Git + GitHub** | Standard de l'industrie. Sert aussi de vitrine de code pour les recruteurs. |

### Pourquoi pas React / Vue / Next.js ?
Ces frameworks sont excellents pour des applications complexes avec état dynamique. Pour un site statique de présentation, ils ajoutent de la complexité sans valeur ajoutée. Astro est plus rapide, plus léger, et plus intelligent pour ce besoin précis.

### Score attendu (Google Lighthouse)
- Performance : **95-100/100**
- Accessibilité : **95+/100**
- SEO : **100/100**

---

## Informations de Contact (pour le site)

| Champ | Valeur |
|-------|--------|
| Nom complet | Ghilas Sabour |
| Âge | 22 ans |
| Statut | Étudiant Master Informatique |
| Email | ghilas@gmail.com |
| Téléphone | 07 07 07 07 07 |
| Adresse | 16 rue du Maine |

---

*Brief rédigé par Mary — Analyste Stratégique BMad Method*
*Date : 2026-04-07*
