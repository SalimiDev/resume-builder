import { DetailsFormType } from '@/app/_components/forms/details/details-form-schema';
import { EducationFormType } from '@/app/_components/forms/educations/educations-form-schema';
import { ExperienceFormType } from '@/app/_components/forms/experiences/experiences-form-schema';
import { LanguageFormType } from '@/app/_components/forms/languages/languages-form-schema';
import { ProjectsFormType } from '@/app/_components/forms/projects/projects-form-schema';
import { SummaryFormType } from '@/app/_components/forms/summary/summary-form-schema';

export interface TemplateProps {
    details: DetailsFormType;
    skills: string[];
    education: EducationFormType;
    projects: ProjectsFormType;
    experiences: ExperienceFormType;
    summary: SummaryFormType;
    languages: LanguageFormType;
}
