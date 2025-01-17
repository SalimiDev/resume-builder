import { EducationFormType } from '@/app/_components/forms/educations/educations-form-schema';

import { create } from 'zustand';

interface EducationState {
    educationStore: EducationFormType | null;
    setEducationStore: (data: EducationFormType) => void;
}

export const useEducationStore = create<EducationState>((set) => ({
    educationStore: null,
    setEducationStore: (data) => {
        set({ educationStore: data });
    }
}));
