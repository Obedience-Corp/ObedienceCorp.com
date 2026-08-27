import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const products = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/products" }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    status: z.enum(["active", "beta", "coming-soon", "internal"]),
    description: z.string(),
    primaryUrl: z.string().url(),
    repoUrl: z.string().url().optional(),
    docsUrl: z.string().url().optional(),
    order: z.number(),
    flagship: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default("Lance Rogers"),
    canonical: z.string().url().optional(),
    ogImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { products, blog };
