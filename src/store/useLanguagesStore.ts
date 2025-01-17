'use client';

import { LanguageFormType } from '@/app/_components/forms/languages/languages-form-schema';

import { create } from 'zustand';

interface LanguagesStore {
    languagesStore: LanguageFormType;
    setLanguagesStore: (data: LanguageFormType) => void;
}

export const useLanguagesStore = create<LanguagesStore>((set) => ({
    languagesStore: {
        languages: [],
        level: 0
    },
    setLanguagesStore: (data) => set(() => ({ languagesStore: data }))
}));
