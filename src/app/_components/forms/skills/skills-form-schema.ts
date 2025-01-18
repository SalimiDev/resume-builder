import { z } from 'zod';

export const skillsFormSchema = z.object({
    skills: z.array(
        z
            .string()
            .trim()
            .min(2, 'Skill must be at least 2 characters')
            .max(30, 'Skill cannot be more than 30 characters')
    )
});

export type SkillsFormType = z.infer<typeof skillsFormSchema>;
