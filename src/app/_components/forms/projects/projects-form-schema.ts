import { z } from 'zod';

const linkSchema = z.object({
    url: z.string().nonempty('Link URL is required.').url('Please enter a valid URL.'),
    icon: z.any().optional()
});

const projectSchema = z.object({
    projectName: z.string().nonempty('Project name is required.'),
    startDate: z.string().nonempty('Start date is required.'),
    endDate: z.string().nonempty('End date is required.'),
    description: z.string().optional(),
    externalLinks: z.array(linkSchema).optional()
});

export const ProjectsFormSchema = z.object({
    projects: z.array(projectSchema)
});

export type ProjectsFormType = z.infer<typeof ProjectsFormSchema>;
