import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string().transform((val) => new Date(val)),
    description: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { blog };
//Collection name must match folder: "blog" → src/content/blog/
