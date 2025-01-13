import { resumeSections as resumeSteps } from '@/utils/constants/resume-sections';

import { create } from 'zustand';

type ResumeStepsState = {
    activeStep: number;
    completed: { [key: number]: boolean };
    totalSteps: number;
    completedSteps: number;
    isLastStep: boolean;
    allStepsCompleted: boolean;
    handleNext: () => void;
    handleBack: () => void;
    handleStep: (step: number) => void;
    handleComplete: () => void;
    handleReset: () => void;
};

export const useResumeStepsStore = create<ResumeStepsState>((set, get) => ({
    activeStep: 0,
    completed: {},
    totalSteps: resumeSteps.length,
    get completedSteps() {
        return Object.keys(get().completed).length;
    },
    get isLastStep() {
        return get().activeStep === get().totalSteps - 1;
    },
    get allStepsCompleted() {
        return get().completedSteps === get().totalSteps;
    },
    handleNext: () => {
        const { isLastStep, allStepsCompleted, completed, activeStep } = get();
        const newActiveStep =
            isLastStep && !allStepsCompleted ? resumeSteps.findIndex((_, i) => !(i in completed)) : activeStep + 1;

        set({ activeStep: newActiveStep });
    },
    handleBack: () => {
        set((state) => ({ activeStep: state.activeStep - 1 }));
    },
    handleStep: (step: number) => {
        set({ activeStep: step });
    },
    handleComplete: () => {
        const { activeStep, completed } = get();
        set({ completed: { ...completed, [activeStep]: true } });
        get().handleNext();
    },
    handleReset: () => {
        set({ activeStep: 0, completed: {} });
    }
}));
