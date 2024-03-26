import * as z from "zod";

export const NobelCategorySchema = z.enum([
  "chemistry",
  "economics",
  "literature",
  "peace",
  "physics",
  "medicine",
]);
export type NobelCategory = z.infer<typeof NobelCategorySchema>;

export const LaureateSchema = z.object({
  id: z.coerce.number(),
  firstname: z.string().default("🧐 John Doe ?"),
  surname: z.string().optional(),
  motivation: z.string(),
});
export type Laureate = z.infer<typeof LaureateSchema>;

export const PrizeSchema = z
  .object({
    year: z.coerce.number().min(1900),
    category: NobelCategorySchema,
    laureates: LaureateSchema.array().optional(),
    overallMotivation: z.string().optional(),
  })
  .superRefine(({ laureates, overallMotivation }, ctx) => {
    if (!laureates && !overallMotivation) {
      ctx.addIssue({
        message: "No Laureates have explaination",
        path: ["laureates"], // path of error
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type Prize = z.infer<typeof PrizeSchema>;

export const PrizeResponseSchema = z.object({
  prizes: PrizeSchema.array(),
});
