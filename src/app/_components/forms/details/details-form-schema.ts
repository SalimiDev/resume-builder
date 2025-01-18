import { z } from 'zod';

export const detailsFormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    role: z.string().min(2, 'Role must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().regex(/^\d{11}$/, 'Phone number must be exactly 11 digits'),
    location: z.string().min(1, 'Location is required'),
    additionalFields: z
        .array(
            z.object({
                id: z.number(),
                value: z.string().min(1, 'This field is required'),
                isLink: z.boolean()
            })
        )
        .optional()
});

export type DetailsFormType = z.infer<typeof detailsFormSchema>;
