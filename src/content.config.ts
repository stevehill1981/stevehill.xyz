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
    githubUrl: z.string().url().optional(),
    technologies: z.array(z.string()),
  }),
});

export const collections = { blog, projects }; 