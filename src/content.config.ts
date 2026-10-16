import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    excerpt: z.string(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    series: z.object({
      name: z.string(),
      part: z.number(),
    }).optional(),
  })
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    github: z.string().optional(),
    demo: z.string().optional(),
    draft: z.boolean().optional(),
    featured: z.boolean().optional(),
    technologies: z.array(z.string()).default([]),
    // Released: apps and games. Live: websites. Published: libraries and scripts.
    status: z.enum(['Released', 'Live', 'Published', 'In progress', 'Paused']).optional(),
    year: z.number().optional(),
    repository: z.string().optional(),
    homepage: z.string().optional(),
    priority: z.number().optional(),
  }),
});

export const collections = { blog, projects };
