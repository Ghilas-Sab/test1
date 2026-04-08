# Story 3.3: Section Projets

Status: ready-for-dev

## Story

As a recruteur,
I want to see Ghilas's projects with technical details and GitHub links,
so that I can evaluate his technical skills through concrete realizations.

## Acceptance Criteria

1. Au minimum 3 projets sont affichés sous forme de cartes
2. Chaque carte affiche : titre, description courte, liste de technologies, lien GitHub (si présent)
3. Les projets sont chargés depuis la Content Collection `projects` via `getCollection()`
4. Les cartes sont responsive (grille 1 colonne mobile, 2-3 colonnes desktop)
5. La section a l'ancre `id="projects"`

## Tasks / Subtasks

- [ ] Créer `src/components/ProjectCard.astro` (AC: 2)
  - [ ] Accepter les props depuis la collection : titre, description, technologies, githubUrl (optional), date
  - [ ] Afficher le titre en en-tête de carte
  - [ ] Afficher la description courte
  - [ ] Afficher les technologies sous forme de badges/tags
  - [ ] Afficher le lien GitHub si présent (avec `target="_blank"` et `rel="noopener noreferrer"`)
- [ ] Créer `src/components/Projects.astro` (AC: 1, 3, 4, 5)
  - [ ] Ajouter `id="projects"` sur la section
  - [ ] Charger la collection `projects` avec `getCollection('projects')`
  - [ ] Trier les projets par date décroissante
  - [ ] Rendre les cartes en grille responsive
- [ ] Vérifier que les 3 fichiers projets de Story 3.1 sont présents (AC: 1)
- [ ] Intégrer dans `src/pages/index.astro`
  - [ ] Importer et placer `<Projects />` après `<Gallery />`

## Dev Notes

### ProjectCard.astro — implémentation complète
```astro
---
interface Props {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  date: Date;
}

const { title, description, technologies, githubUrl } = Astro.props;
---

<article class="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
  
  <div>
    <h3 class="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p class="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
  
  <!-- Technologies -->
  <div class="flex flex-wrap gap-2">
    {technologies.map((tech) => (
      <span class="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium">
        {tech}
      </span>
    ))}
  </div>
  
  <!-- Lien GitHub -->
  {githubUrl && (
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      class="mt-auto inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      aria-label={`Voir le code source de ${title} sur GitHub`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
      Voir sur GitHub
    </a>
  )}
  
</article>
```

### Projects.astro — implémentation complète
```astro
---
import { getCollection } from 'astro:content';
import ProjectCard from './ProjectCard.astro';

const projects = await getCollection('projects');
// Trier par date décroissante (le plus récent en premier)
const sortedProjects = projects.sort(
  (a, b) => b.data.date.getTime() - a.data.date.getTime()
);
---

<section id="projects" class="py-20 px-4 bg-gray-50">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">Mes Projets</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedProjects.map((project) => (
        <ProjectCard
          title={project.data.title}
          description={project.data.description}
          technologies={project.data.technologies}
          githubUrl={project.data.githubUrl}
          date={project.data.date}
        />
      ))}
    </div>
  </div>
</section>
```

### Lien GitHub — sécurité
Toujours ajouter `rel="noopener noreferrer"` sur les liens `target="_blank"` (sécurité standard).

### Tri par date
`getCollection()` retourne les entrées dans l'ordre du système de fichiers.
Trier explicitement par `data.date` pour contrôler l'ordre d'affichage.

### Anti-patterns à éviter
- ❌ Ne PAS hardcoder les projets dans le composant — utiliser `getCollection()`
- ❌ Ne PAS omettre `rel="noopener noreferrer"` sur les liens GitHub
- ❌ Ne PAS oublier l'ancre `id="projects"`

### Project Structure Notes
- `src/components/ProjectCard.astro`
- `src/components/Projects.astro`
- Données dans `src/content/projects/` (créés en Story 3.1)

### References
- [Source: architecture.md#Frontend Architecture] — Projects.astro, ProjectCard.astro
- [Source: architecture.md#Architectural Boundaries] — getCollection() pour les données
- [Source: epics.md#Story 3.3] — AC complets
- [Source: prd.md#FR4] — ≥3 projets avec titre, description, technologies, lien GitHub

## Dev Agent Record

### Agent Model Used
claude-sonnet-4-6

### Debug Log References

### Completion Notes List

### File List
