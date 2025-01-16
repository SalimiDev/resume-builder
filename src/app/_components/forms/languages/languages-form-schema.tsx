import { z } from 'zod';

export const languageFormSchema = z.object({
    languages: z.array(
        z.object({
            language: z.string().min(1, 'Language is required'),
            level: z.number().min(0).max(100)
        })
    )
});

export type LanguageFormType = z.infer<typeof languageFormSchema>;
