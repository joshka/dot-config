import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";
import { parse } from "yaml";

// Errors thrown in the parser are logged but don't fail the build, so
// duplicates are flagged here and rejected by the schema instead.
const tools = defineCollection({
  loader: file("src/data/tools.yaml", {
    parser: (text) => {
      const seen = new Set<string>();
      return parse(text).map((tool: { name: string }, i: number) => {
        const duplicate = seen.has(tool.name);
        seen.add(tool.name);
        return duplicate ? { ...tool, id: `${tool.name}#${i}`, duplicate } : { ...tool, id: tool.name };
      });
    },
  }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    paths: z.array(z.string().startsWith(".config/")).min(1),
    reference: z.string().url(),
    note: z.string().optional(),
    duplicate: z.never({ message: "Duplicate tool name in tools.yaml" }).optional(),
  }),
});

export const collections = { tools };
