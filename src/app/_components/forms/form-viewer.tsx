import { resumeSteps } from '@/utils/constants/resume-steps';

import DetailsForm from './details/details-form';
import EducationsForm from './educations/educations-form';
import ExperiencesForm from './experiences/experiences-form';
import LanguagesForm from './languages/languages-form';
import ProjectsForm from './projects/projects-form';
import SkillsForm from './skills/skills-form';

interface FormViewerProps {
    step: string;
}

const formMap: Record<string, React.FC> = {
    educations: EducationsForm,
    experiences: ExperiencesForm,
    languages: LanguagesForm,
    projects: ProjectsForm,
    details: DetailsForm,
    skills: SkillsForm
};

export default function FormViewer({ step }: FormViewerProps) {
    const Component = formMap[step];
    const currentFormData = resumeSteps.filter((data) => data.key === step);

    return step ? (
        <section className='flex flex-col gap-3 p-6'>
            {currentFormData.map((form) => (
                <div key={form.key}>
                    <header className='mb-3 border-b border-base-content pb-3'>
                        <h1 className='text-3xl font-bold text-text-dark'>{form.title}</h1>
                    </header>
                    <div className='flex flex-col gap-6 py-2'>
                        <h4 className='text-xl font-semibold text-text-dark'>{form.description}</h4>
                        <Component />
                    </div>
                </div>
            ))}
        </section>
    ) : (
        <div className='flex size-full items-center justify-center text-3xl font-semibold text-accent'>
            Form not found!
        </div>
    );
}
