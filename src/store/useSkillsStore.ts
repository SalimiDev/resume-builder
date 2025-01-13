import { create } from 'zustand';

type SkillsState = {
    skills: string[];
    addSkill: (skill: string) => void;
    removeSkill: (skill: string) => void;
    resetSkills: () => void;
};

export const useSkillsStore = create<SkillsState>((set) => ({
    skills: [],
    addSkill: (skill) =>
        set((state) => ({
            skills: [...state.skills, skill]
        })),
    removeSkill: (skill) =>
        set((state) => ({
            skills: state.skills.filter((s) => s !== skill)
        })),
    resetSkills: () => set({ skills: [] })
}));
