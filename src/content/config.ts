import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    excerpt: z.string(),
    tags: z.array(z.string()).optional(),
    series: z.object({
      name: z.string(),
      part: z.number(),
    }).optional(),
  }),
});

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    github: z.string().optional(),
    demo: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = {
  blog,
  projects,
};