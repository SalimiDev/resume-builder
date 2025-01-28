import { ReactNode, useRef, useState } from 'react';

import { useResumeStore } from '@/store/useResumeStore';
import { ResumeStepsType } from '@/types/resume-steps.interface';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Button, Step, StepButton, StepLabel, Stepper, Typography } from '@mui/material';

import CompletedDialog from '../_components/completed-steps-dialog/completed-dialog';

type StepperLayoutProps = {
    steps: ResumeStepsType[];
    children: (activeStep: number, setSubmitHandler: (submitHandler: () => Promise<boolean>) => void) => ReactNode;
};

const StepperLayout = ({ steps, children }: StepperLayoutProps) => {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const submitHandlerRef = useRef<(() => void) | null>(null);

    const totalSteps = () => steps.length;
    const completedSteps = () => Object.keys(completed).length;
    const isLastStep = () => activeStep === totalSteps() - 1;
    const allStepsCompleted = () => completedSteps() === totalSteps();

    const setSubmitHandler = (submitHandler: () => boolean | Promise<boolean>) => {
        submitHandlerRef.current = submitHandler;
    };

    const handleNext = async () => {
        if (submitHandlerRef.current) {
            const isValid = await submitHandlerRef.current();
            if (typeof isValid !== 'boolean') {
                throw new Error('Submit handler must return a boolean value.');
            }
            if (!isValid) return;
        }

        const newActiveStep =
            isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1;

        setActiveStep(newActiveStep);
    };

    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const handleStep = (step: number) => () => setActiveStep(step);

    const handleComplete = async () => {
        if (submitHandlerRef.current) {
            const isValid = await submitHandlerRef.current();
            if (typeof isValid !== 'boolean') {
                throw new Error('Submit handler must return a boolean value.');
            }
            isValid && isLastStep() && setIsDialogOpen(true);

            if (!isValid) return;
        }
        setCompleted({
            ...completed,
            [activeStep]: true
        });
    };
    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
        setIsDialogOpen(false);
    };

    const handleSkip = () => {
        const stepKeys = ['details', 'summary', 'skills', 'languages', 'experiences', 'projects', 'education'];
        useResumeStore.getState().clearStepData(stepKeys[activeStep]);

        const newActiveStep =
            isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1;

        if (isLastStep()) {
            setIsDialogOpen(true);
        } else {
            setActiveStep(activeStep + 1);
        }
    };

    return (
        <Box sx={{ width: '100%', height: '100%' }} className='flex flex-col'>
            <Stepper
                nonLinear
                activeStep={activeStep}
                className='flex h-14 flex-shrink-0 items-center border-b border-text-light bg-accent p-2'>
                {steps.map((step, index) => (
                    <Step key={step.key} completed={completed[index]}>
                        <StepButton color='inherit' onClick={handleStep(index)}>
                            {step.title}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>

            {/* here the current form will render */}
            <section className='flex-1'>{children(activeStep, setSubmitHandler)}</section>

            <div>
                {allStepsCompleted() ? (
                    <>
                        <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'row', p: 3 }}>
                            <Button
                                onClick={handleBack}
                                className='border-primary font-semibold text-primary'
                                sx={{ mr: 1 }}
                                color='inherit'
                                disabled={activeStep === 0}>
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button
                                onClick={handleSkip}
                                className='!border-accent !text-accent disabled:!border-base-content disabled:!text-base-content'
                                sx={{ mr: 1 }}
                                color='inherit'
                                variant='outlined'>
                                Skip
                            </Button>
                            <Button
                                onClick={activeStep === steps.length - 1 ? handleComplete : handleNext}
                                className='!bg-accent'
                                sx={{ mr: 1 }}
                                variant='contained'
                                endIcon={<NavigateNextIcon />}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Save & Next'}
                            </Button>
                        </Box>
                    </>
                )}
            </div>

            <CompletedDialog open={isDialogOpen} handleClose={handleReset} />
        </Box>
    );
};
export default StepperLayout;
