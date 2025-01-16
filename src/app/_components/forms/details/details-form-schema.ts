import { z } from 'zod';

export const detailsFormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
    location: z.string().min(1, 'Location is required'),
    github: z.string().url('Invalid GitHub URL'),
    summary: z.string().min(10, 'Summary must be at least 10 characters'),
    additionalFields: z
        .array(
            z.object({
                id: z.number(),
                value: z.string().min(1, 'This field is required')
            })
        )
        .optional()
});

export type DetailsFormType = z.infer<typeof detailsFormSchema>;
