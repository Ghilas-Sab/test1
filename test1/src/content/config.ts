import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    githubUrl: z.string().url().optional(),
    date: z.date(),
  }),
});

const gallery = defineCollection({
  type: 'content',
  schema: z.object({
    caption: z.string(),
    imagePath: z.string(),
    alt: z.string(),
  }),
});

export const collections = { projects, gallery };
