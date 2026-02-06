import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/data/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/research' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['ongoing', 'completed', 'planned']).default('ongoing'),
    links: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),
    sortOrder: z.number().default(0),
  }),
});

export const collections = { blog, research };
