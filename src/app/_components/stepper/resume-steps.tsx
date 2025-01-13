'use client';

import { useResumeStepsStore } from '@/store/useResumeStepsStore';
import { resumeSections as resumeSteps } from '@/utils/constants/resume-sections';
import { Step, StepLabel, Stepper } from '@mui/material';
import Box from '@mui/material/Box';

export default function ResumeSteps() {
    const { activeStep, completed, handleNext, handleBack, handleStep, handleComplete } = useResumeStepsStore();

    return (
        <Box sx={{ width: '100%', height: 'auto' }}>
            <Stepper nonLinear activeStep={activeStep}>
                {resumeSteps.map((step, index) => {
                    const IconComponent = step.icon;

                    return (
                        <Step key={index} completed={completed[index]} className='cursor-pointer text-primary'>
                            <StepLabel
                                onClick={() => handleStep(index)}
                                slots={{
                                    stepIcon: () => <IconComponent />
                                }}>
                                {step.title}
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    );
}
