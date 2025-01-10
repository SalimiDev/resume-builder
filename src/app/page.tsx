import ResumeSteps from './_components/breadcrumb/resume-steps';
import ResumePreview from './_components/preview/resume-preview';

export default function Home() {
    return (
        <div className=''>
            <div className='bg-slate-300 flex h-14 justify-center'>
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
