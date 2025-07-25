import { DetailsFormType } from '@/app/_components/forms/details/details-form-schema';
import { EducationFormType } from '@/app/_components/forms/educations/educations-form-schema';
import { ExperienceFormType } from '@/app/_components/forms/experiences/experiences-form-schema';
import { LanguageFormType } from '@/app/_components/forms/languages/languages-form-schema';
import { ProjectsFormType } from '@/app/_components/forms/projects/projects-form-schema';
import { SummaryFormType } from '@/app/_components/forms/summary/summary-form-schema';
import { TemplateProps } from '@/types/template-props.types';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface ResumeState extends TemplateProps {
    setDetails: (data: DetailsFormType) => void;
    setEducation: (data: EducationFormType) => void;
    setExperiences: (data: ExperienceFormType) => void;
    setLanguages: (data: LanguageFormType) => void;
    setProjects: (data: ProjectsFormType) => void;
    setSkills: (skills: string[]) => void;
    setSummary: (data: SummaryFormType) => void;
    clearStepData: (stepKey: string) => void;
    clearAllData: () => void;
}

// prettier-ignore
export const useResumeStore = create(
    persist(
        immer<ResumeState>((set) => ({
            details: { name: '', lastName: '', role:'', email: '', phoneNumber: '', location: '', extraFields: [] },
            education: { education: [] },
            experiences: { experiences: [] },
            languages: { languages: [] },
            projects: { projects: [] },
            skills: [],
            summary: { summary: '' },

            setDetails: (data) => set((state) => { state.details = data; }),
            setEducation: (data) => set((state) => { state.education = data; }),
            setExperiences: (data) => set((state) => { state.experiences = data; }),
            setLanguages: (data) => set((state) => { state.languages = data; }),
            setProjects: (data) => set((state) => { state.projects = data; }),
            setSkills: (skills) => set((state) => { state.skills = skills; }),
            setSummary: (data) => set((state) => { state.summary = data; }),

            clearStepData: (stepKey) => set((state) => {
                if (stepKey in state) {
                    switch (stepKey) {
                        case 'details': state.details = { name: '', lastName: '', role: '', email: '', phoneNumber: '', location: '', extraFields: [] }; break;
                        case 'education': state.education = { education: [] }; break;
                        case 'experiences': state.experiences = { experiences: [] }; break;
                        case 'languages': state.languages = { languages: [] }; break;
                        case 'projects': state.projects = { projects: [] }; break;
                        case 'skills': state.skills = []; break;
                        case 'summary': state.summary = { summary: '' }; break;
                    }
                }
            }),

            clearAllData: () => set((state) => {
                state.details = { name: '', lastName: '', role: '', email: '', phoneNumber: '', location: '', extraFields: [] };
                state.education = { education: [] };
                state.experiences = { experiences: [] };
                state.languages = { languages: [] };
                state.projects = { projects: [] };
                state.skills = [];
                state.summary = { summary: '' };
            }),
        })),
        {
            name: 'resume-storage', 
            storage: createJSONStorage(() => localStorage)
        }
    )
);
