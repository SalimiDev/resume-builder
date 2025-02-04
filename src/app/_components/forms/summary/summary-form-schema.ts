import { z } from 'zod';

export const summaryFormSchema = z.object({
    summary: z
        .string()
        .min(10, 'About me must be at least 10 characters')
        .max(1000, 'About me cannot exceed 500 characters'),
    avatar: z.string().optional()
});

export type SummaryFormType = z.infer<typeof summaryFormSchema>;
