import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    status: z.enum(['active', 'beta', 'coming-soon']),
    description: z.string(),
    primaryUrl: z.string().url(),
    repoUrl: z.string().url().optional(),
    docsUrl: z.string().url().optional(),
    order: z.number(),
    flagship: z.boolean().default(false),
  }),
});

export const collections = { products };
