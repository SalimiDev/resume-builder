import ResumePreview from './_components/preview/resume-preview';
import ResumeSteps from './_components/stepper/resume-steps';

export default function Home() {
    return (
        <div className=''>
            <div className='bg-slate-300 flex h-16 items-center justify-center border-b border-text-light bg-accent px-4'>
                <ResumeSteps />
            </div>
            <div className='flex w-screen'>
                <section className='w-1/2'>
                    <ResumePreview />
                </section>
                <section className='w-1/2'>section 2</section>
            </div>
        </div>
    );
}
