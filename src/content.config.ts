import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    excerpt: z.string(),
    tags: z.array(z.string()).optional(),
  })
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    github: z.string().optional(),
    demo: z.string().optional(),
    featured: z.boolean().optional(),
    technologies: z.array(z.string()).default([]),
    status: z.string().optional(),
    year: z.number().optional(),
    repository: z.string().optional(),
    homepage: z.string().optional(),
    priority: z.number().optional(),
  }),
});

export const collections = { blog, projects }; 