import { z } from 'zod';

export const experienceSchema = z.object({
    employer: z.string().min(1, 'Employer is required'),
    role: z.string().min(1, 'Role is required'),
    location: z.string().min(1, 'Location is required'),
    startDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Invalid date (MM/YYYY)'),
    endDate: z.string().optional().or(z.literal('Present')),
    description: z.string().optional()
});

export const experienceFormSchema = z.object({
    experiences: z.array(experienceSchema)
});

export type ExperienceFormType = z.infer<typeof experienceFormSchema>;
