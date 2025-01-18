import { EducationFormType } from '@/app/_components/forms/educations/educations-form-schema';

import { create } from 'zustand';

interface EducationState {
    educationStore: EducationFormType;
    setEducationStore: (data: EducationFormType) => void;
}

export const useEducationStore = create<EducationState>((set) => ({
    educationStore: { education: [] },
    setEducationStore: (data) => {
        set({ educationStore: data });
    }
}));
