'use client';

import { create } from 'zustand';

interface SkillsStore {
    skillsStore: string[];
    setSkillsStore: (skills: string[]) => void;
}

export const useSkillsStore = create<SkillsStore>((set) => ({
    skillsStore: [],

    setSkillsStore: (skillsStore: string[]) => set(() => ({ skillsStore }))
}));
