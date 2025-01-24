import { resumeSteps } from '@/utils/constants/resume-steps';

import { DetailsForm, EducationsForm, ExperiencesForm, LanguagesForm, ProjectsForm, SkillsForm, SummaryForm } from '.';

interface FormViewerProps {
    step: string;
    setSubmitHandler: (submitHandler: () => Promise<boolean>) => void;
}

const formMap: Record<string, React.FC<{ setSubmitHandler: (submitHandler: () => Promise<boolean>) => void }>> = {
    summary: SummaryForm,
    experiences: ExperiencesForm,
    educations: EducationsForm,
    languages: LanguagesForm,
    projects: ProjectsForm,
    details: DetailsForm,
    skills: SkillsForm
};

export default function FormViewer({ step, setSubmitHandler }: FormViewerProps) {
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
                        <Component setSubmitHandler={setSubmitHandler} />
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
