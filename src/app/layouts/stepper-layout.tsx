import { ReactNode, useState } from 'react';

import { ResumeStepsType } from '@/types/resume-steps.interface';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Button, Step, StepButton, StepLabel, Stepper, Typography } from '@mui/material';

type StepperLayoutProps = {
    steps: ResumeStepsType[];
    children: (activeStep: number) => ReactNode; // Render Prop
};

const StepperLayout = ({ steps, children }: StepperLayoutProps) => {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{
        [k: number]: boolean;
    }>({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        setCompleted({
            ...completed,
            [activeStep]: true
        });
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
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
            <section className='flex-1'>{children(activeStep)}</section>

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
                        {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>Step {activeStep + 1}</Typography> */}
                        <Box sx={{ display: 'flex', flexDirection: 'row', p: 3 }}>
                            <Button
                                color='inherit'
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                                className='border-primary font-semibold text-primary'>
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button
                                onClick={handleNext}
                                sx={{ mr: 1 }}
                                variant='contained'
                                className='!bg-accent'
                                endIcon={<NavigateNextIcon />}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Save & Next'}
                            </Button>
                            {/* {activeStep !== steps.length &&
                                (completed[activeStep] ? (
                                    <Typography variant='caption' sx={{ display: 'inline-block' }}>
                                        Step {activeStep + 1} already completed
                                    </Typography>
                                ) : (
                                    <Button onClick={handleComplete}>
                                        {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                                    </Button>
                                ))} */}
                        </Box>
                    </>
                )}
            </div>
        </Box>
    );
};

export default StepperLayout;
