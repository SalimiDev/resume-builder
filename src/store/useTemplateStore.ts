'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TemplateState {
    currentTemplate: string;
    setCurrentTemplate: (template: string) => void;
}

export const useTemplateStore = create<TemplateState>()(
    persist(
        (set) => ({
            currentTemplate: 'elegant',
            setCurrentTemplate: (template) => set({ currentTemplate: template })
        }),
        {
            name: 'current-template'
        }
    )
);
