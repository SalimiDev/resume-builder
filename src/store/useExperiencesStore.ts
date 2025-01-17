import { ExperienceFormType } from '@/app/_components/forms/experiences/experiences-form-schema';

import { create } from 'zustand';

type ExperiencesStore = {
    experiencesStore: ExperienceFormType;
    setExperiencesStore: (data: ExperienceFormType) => void;
};

export const useExperiencesStore = create<ExperiencesStore>((set) => ({
    experiencesStore: {
        experiences: [
            {
                employer: '',
                role: '',
                location: '',
                startDate: '',
                endDate: '',
                responsibilities: ''
            }
        ]
    },

    setExperiencesStore: (data) => set({ experiencesStore: data })
}));
