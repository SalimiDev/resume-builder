import { z } from 'zod';

export const educationFormSchema = z.object({
    education: z.array(
        z.object({
            degree: z.string().min(1, 'Degree is required'),
            schoolName: z.string().min(1, 'School Name is required'),
            schoolLocation: z.string().min(1, 'School Location is required'),
            graduationDate: z.string().min(1, 'Graduation Date is required')
        })
    )
});

export type EducationFormType = z.infer<typeof educationFormSchema>;
