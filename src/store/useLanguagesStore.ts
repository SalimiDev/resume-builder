import { create } from 'zustand';

type LanguageData = {
    language: string;
    level: number;
};

type LanguagesState = {
    languages: LanguageData[];
    addLanguage: (language: string, level: number) => void;
    updateLanguage: (index: number, newLanguage: string) => void;
    updateLevel: (index: number, newLevel: number) => void;
    removeLanguage: (index: number) => void;
    resetLanguages: () => void;
};

export const useLanguagesStore = create<LanguagesState>((set) => ({
    languages: [],
    addLanguage: (language, level) =>
        set((state) => ({
            languages: [...state.languages, { language, level }]
        })),
    updateLanguage: (index, newLanguage) =>
        set((state) => {
            const updatedLanguages = [...state.languages];
            updatedLanguages[index].language = newLanguage;

            return { languages: updatedLanguages };
        }),
    updateLevel: (index, newLevel) =>
        set((state) => {
            const updatedLanguages = [...state.languages];
            updatedLanguages[index].level = newLevel;

            return { languages: updatedLanguages };
        }),
    removeLanguage: (index) =>
        set((state) => ({
            languages: state.languages.filter((_, i) => i !== index)
        })),
    resetLanguages: () => set({ languages: [] })
}));
