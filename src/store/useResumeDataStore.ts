import { useSkillsStore } from '@/store/useSkillsStore';

import { create } from 'zustand';

// import { useExperienceStore } from '@/store/useExperienceStore';
// import { useProjectsStore } from '@/store/useProjectsStore';

type ResumeDataState = {
    resumeData: {
        skills: string[];
        // experience: any[];
        // projects: any[];
        education: unknown[];
    };
};

export const useResumeDataStore = create<ResumeDataState>((set) => ({
    resumeData: {
        skills: [],
        // experience: [],
        // projects: [],
        education: []
    }
}));

// Aggregating data from other stores with subscriptions
export const initializeResumeDataSync = () => {
    const updateResumeData = () => {
        const skillsStore = useSkillsStore.getState();
        // const experienceStore = useExperienceStore.getState();
        // const projectsStore = useProjectsStore.getState();

        useResumeDataStore.setState({
            resumeData: {
                skills: skillsStore.skills,
                // experience: experienceStore.experience,
                // projects: projectsStore.projects,
                education: [] // Set education dynamically
            }
        });
    };

    // Subscribe to changes in individual stores
    useSkillsStore.subscribe(() => updateResumeData());
    //   useExperienceStore.subscribe(() => updateResumeData());
    //   useProjectsStore.subscribe(() => updateResumeData());

    // Initial sync
    updateResumeData();
};
