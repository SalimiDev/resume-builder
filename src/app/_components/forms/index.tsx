'use client';

import { useState } from 'react';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// import EducationForm from './components/Form/EducationForm';
// import ExperienceForm from './components/Form/ExperienceForm';
// import ResumePreview from './components/Preview/ResumePreview';
import SkillsForm from './skills-form';

export default function ResumeBuilder() {
    const [step, setStep] = useState(0); // مرحله جاری
    const [resumeData, setResumeData] = useState({
        skills: [],
        experiences: [],
        education: []
    });

    const updateResumeData = (section: string, data: string[]) => {
        setResumeData((prev) => ({ ...prev, [section]: data }));
    };

    const steps = [
        {
            title: 'Skills',
            description: 'Highlight your skills and expertise. You can add multiple skills by pressing Enter.',
            component: (
                <SkillsForm updateData={(data) => updateResumeData('skills', data)} initialData={resumeData.skills} />
            )
        },
        {
            title: 'Experinces',
            description: 'Highlight your skills and expertise. You can add multiple skills by pressing Enter.',
            component: (
                <SkillsForm
                    updateData={(data) => updateResumeData('experiences', data)}
                    initialData={resumeData.experiences}
                />
            )
        }
        // {
        //     title: 'تحصیلات',
        //     component: (
        //         <EducationForm
        //             updateData={(data) => updateResumeData('education', data)}
        //             initialData={resumeData.education}
        //         />
        //     )
        // }
    ];

    const handleNext = () => {
        if (step < steps.length - 1) setStep(step + 1);
    };

    const handlePrevious = () => {
        if (step > 0) setStep(step - 1);
    };

    return (
        <div className='mx-auto flex h-full flex-col justify-between gap-8 p-4'>
            <div>
                <div className='mb-4 flex flex-col gap-4 border-b-2 pb-4 text-text-dark'>
                    <h1 className='text-2xl font-bold'>{steps[step].title}</h1>
                    <p>{steps[step].description}</p>
                </div>

                <div className='rounded-md p-4'>{steps[step].component}</div>
            </div>

            <div className='bottom-10 w-full'>
                <Stack direction='row' className='flex w-full justify-between px-11'>
                    <Button
                        variant='outlined'
                        className='border-primary text-primary'
                        onClick={handlePrevious}
                        disabled={step === 0}>
                        Back
                    </Button>
                    <Button
                        variant='contained'
                        endIcon={<NavigateNextIcon />}
                        className='bg-accent'
                        onClick={handleNext}
                        disabled={step === steps.length - 1}>
                        {step === steps.length - 1 ? 'Finish' : 'Save & Next'}
                    </Button>
                </Stack>
            </div>
        </div>
    );
}
