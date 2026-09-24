import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string().transform((val) => new Date(val)),
    // Doubles as the post summary: index card text, meta and og description.
    description: z.string().optional(),
    draft: z.boolean().optional(),
    // Required for grouping on the index; optional only so drafts can omit it.
    audience: z.enum(["business", "dev"]).optional(),
    tags: z.array(z.string()).optional(),
    // Big stat shown on the featured (newest) card.
    highlight: z
      .object({
        value: z.string(),
        label: z.string(),
        detail: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { blog };
//Collection name must match folder: "blog" → src/content/blog/
