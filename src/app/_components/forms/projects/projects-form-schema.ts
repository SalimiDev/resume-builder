import { z } from 'zod';

const extraFieldSchema = z.object({
    id: z.string(),
    value: z.string().nonempty('Extra field is required.'),
    icon: z.any().optional(),
    isLink: z.boolean().default(true)
});

const projectSchema = z.object({
    projectName: z.string().nonempty('Project name is required.'),
    startDate: z.string().nonempty('Start date is required.'),
    endDate: z.string().nonempty('End date is required.'),
    description: z.string().optional(),
    extraFields: z.array(extraFieldSchema).optional()
});

export const ProjectsFormSchema = z.object({
    projects: z.array(projectSchema)
});

export type ProjectsFormType = z.infer<typeof ProjectsFormSchema>;
