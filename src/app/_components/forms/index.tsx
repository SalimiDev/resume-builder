'use client';

import React from 'react';

import { useResumeStepsStore } from '@/store/useResumeStepsStore';
import { resumeSections } from '@/utils/constants/resume-sections';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import LanguagesForm from './languages-form';
import SkillsForm from './skills-form';

export default function ResumeBuilder() {
    const { activeStep: step, handleNext, handleBack: handlePrevious } = useResumeStepsStore();

    const [resumeData, setResumeData] = React.useState({
        skills: [],
        languages: []
        // education: []
    });

    const updateResumeData = (section: string, data: string[]) => {
        setResumeData((prev) => ({ ...prev, [section]: data }));
    };

    const componentMap: Record<string, React.FC<unknown>> = {
        skills: SkillsForm,
        languages: LanguagesForm
    };

    return (
        <div className='mx-auto flex flex-col'>
            {resumeSections.map((section, index) => {
                if (index !== step) return null;
                const Component = componentMap[section?.key];

                return (
                    <div key={section.key} className='p-4'>
                        <div className='mb-4 flex flex-col gap-4 border-b-2 pb-4 text-text-dark'>
                            <h1 className='text-3xl font-bold'>{section.title}</h1>
                            <p>{section.description}</p>
                        </div>
                        <Component
                        // updateData={(data: string[]) => updateResumeData(section.key, data)}
                        // initialData={resumeSections.find(sec => sec.key === section.key)}
                        />
                    </div>
                );
            })}

            <div className='absolute bottom-8 w-full'>
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
                        disabled={step === resumeSections.length - 1}>
                        {step === resumeSections.length - 1 ? 'Finish' : 'Save & Next'}
                    </Button>
                </Stack>
            </div>
        </div>
    );
}
