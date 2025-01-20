'use client';

import { ProjectsFormType } from '@/app/_components/forms/projects/projects-form-schema';

import { create } from 'zustand';

interface ProjectState {
    ProjectsStore: ProjectsFormType;
    setProjectsStore: (data: ProjectsFormType) => void;
}

export const useProjectsStore = create<ProjectState>((set) => ({
    ProjectsStore: { projects: [] },
    setProjectsStore: (data) => set({ ProjectsStore: data })
}));
