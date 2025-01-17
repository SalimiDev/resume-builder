'use client';

import { ProjectsFormType } from '@/app/_components/forms/projects/projects-form-schema';

import { create } from 'zustand';

interface ProjectState {
    ProjectsStore: ProjectsFormType | null;
    setProjectsStore: (data: ProjectsFormType) => void;
}

export const useProjectsStore = create<ProjectState>((set) => ({
    ProjectsStore: null,
    setProjectsStore: (data) => set({ ProjectsStore: data })
}));
