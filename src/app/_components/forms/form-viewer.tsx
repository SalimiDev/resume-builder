import dynamic from 'next/dynamic';

import { resumeSteps } from '@/utils/constants/resume-steps';

interface FormViewerProps {
    step: string;
    setSubmitHandler: (submitHandler: () => Promise<boolean>) => void;
}
const formMap: Record<string, React.FC<{ setSubmitHandler: (submitHandler: () => Promise<boolean>) => void }>> = {
    summary: dynamic(() => import('./summary/summary-form'), { ssr: false }),
    experiences: dynamic(() => import('./experiences/experiences-form'), { ssr: false }),
    educations: dynamic(() => import('./educations/educations-form'), { ssr: false }),
    languages: dynamic(() => import('./languages/languages-form'), { ssr: false }),
    projects: dynamic(() => import('./projects/projects-form'), { ssr: false }),
    details: dynamic(() => import('./details/details-form'), { ssr: false }),
    skills: dynamic(() => import('./skills/skills-form'), { ssr: false })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<string, any>;

export default function FormViewer({ step, setSubmitHandler }: FormViewerProps) {
    const Component = formMap[step];
    const currentFormData = resumeSteps.filter((data) => data.key === step);

    return step ? (
        <section className='flex flex-col gap-3 p-8'>
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
