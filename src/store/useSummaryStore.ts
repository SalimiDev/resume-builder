import { create } from 'zustand';

type SummaryState = {
    summary: string;
    setSummaryStore: (data: Partial<SummaryState>) => void;
};

export const useSummaryStore = create<SummaryState>((set) => ({
    summary: '',
    setSummaryStore: (data) => set((state) => ({ ...state, ...data }))
}));
