import ResumeBuilder from './_components/forms';
import ResumePreview from './_components/preview/resume-preview';
import ResumeSteps from './_components/stepper/resume-steps';

export default function Home() {
    return (
        <div className='flex h-full flex-col'>
            <div className='bg-slate-300 flex h-16 items-center justify-center border-b border-text-light bg-accent px-4'>
                <ResumeSteps />
            </div>

            <div className='flex w-screen flex-1'>
                <section className='w-1/2 shadow-xl'>
                    <ResumeBuilder />
                </section>
                <section className='w-1/2 bg-text-light'>
                    <ResumePreview />
                </section>
            </div>
        </div>
    );
}
