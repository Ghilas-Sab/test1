# Story 2.3: Section À propos

Status: ready-for-dev

## Story

As a recruteur,
I want to read a brief personal presentation and see Ghilas's skills,
so that I can evaluate his background and technical profile.

## Acceptance Criteria

1. Une biographie personnelle de Ghilas est affichée (minimum 3 phrases)
2. Une liste de compétences techniques est visible (langages, frameworks, outils)
3. La section a l'ancre `id="about"`
4. La section est responsive (mobile et desktop)

## Tasks / Subtasks

- [ ] Créer `src/components/About.astro` (AC: 1, 2, 3, 4)
  - [ ] Ajouter `id="about"` sur la section
  - [ ] Rédiger la biographie (minimum 3 phrases — personnalisée pour Ghilas)
  - [ ] Créer la liste de compétences groupées par catégorie
  - [ ] Rendre la section responsive (1 colonne mobile, 2 colonnes desktop)
- [ ] Intégrer dans `src/pages/index.astro` (AC: 3)
  - [ ] Importer et placer `<About />` après `<Hero />`

## Dev Notes

### About.astro — structure recommandée
```astro
---
const skills = {
  'Langages': ['Python', 'JavaScript', 'TypeScript', 'Java', 'C'],
  'Web': ['Astro', 'React', 'HTML/CSS', 'Tailwind CSS'],
  'Outils': ['Git', 'GitHub', 'VS Code', 'Linux'],
  'Bases de données': ['SQL', 'PostgreSQL'],
};
---

<section id="about" class="py-20 px-4 bg-gray-50">
  <div class="max-w-5xl mx-auto">
    
    <h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">À propos</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      
      <!-- Biographie -->
      <div>
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Qui suis-je ?</h3>
        <div class="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Étudiant en Master Informatique (22 ans), je me passionne pour le développement 
            web et la création de solutions techniques élégantes. Mon parcours m'a permis 
            d'acquérir une solide base en programmation et en algorithmique.
          </p>
          <p>
            J'aime construire des projets du début à la fin — de la conception à 
            l'hébergement. Ce portfolio en est la preuve : conçu avec Astro et Tailwind, 
            déployé sur Netlify, sans template générique.
          </p>
          <p>
            Je recherche une alternance pour mettre mes compétences au service d'une 
            équipe dynamique et continuer à progresser dans un environnement professionnel stimulant.
          </p>
        </div>
      </div>
      
      <!-- Compétences -->
      <div>
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Compétences</h3>
        <div class="space-y-4">
          {Object.entries(skills).map(([category, items]) => (
            <div>
              <h4 class="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">{category}</h4>
              <div class="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span class="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  </div>
</section>
```

### Contenu de la biographie
Le contenu ci-dessus est un exemple. Ghilas peut (et doit) le personnaliser avec :
- Son vrai parcours (école, projets passés, centres d'intérêt)
- Ses vraies compétences techniques
- Son vrai objectif d'alternance

### Compétences à adapter
Ajuster la liste `skills` avec les vraies compétences de Ghilas. La structure en catégories est recommandée pour la lisibilité.

### Responsive
- Mobile : 1 colonne (bio d'abord, compétences dessous)
- Desktop (`md:`) : 2 colonnes côte à côte
- Tailwind : `grid grid-cols-1 md:grid-cols-2`

### Anti-patterns à éviter
- ❌ Ne PAS créer un fichier de contenu séparé pour About — le contenu est statique dans le composant
- ❌ Ne PAS oublier `id="about"` sur la section
- ❌ Ne PAS utiliser des images dans About (pas de astro:assets requis ici)

### Project Structure Notes
- Composant dans `src/components/About.astro`
- Pas de Content Collection pour About — contenu en dur dans le composant (simple et efficace pour un portfolio)

### References
- [Source: architecture.md#Frontend Architecture] — About.astro
- [Source: epics.md#Story 2.3] — AC complets
- [Source: prd.md#FR2] — Section À propos avec biographie et compétences
- [Source: prd.md#Parcours Utilisateurs] — recruteur évalue le profil technique

## Dev Agent Record

### Agent Model Used
claude-sonnet-4-6

### Debug Log References

### Completion Notes List

### File List
