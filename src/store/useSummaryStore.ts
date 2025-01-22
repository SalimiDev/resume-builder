import { SummaryFormType } from '@/app/_components/forms/summary/summary-form-schema';

import { create } from 'zustand';

type SummaryState = {
    summaryStore: SummaryFormType;
    setSummaryStore: (data: SummaryFormType) => void;
};

export const useSummaryStore = create<SummaryState>((set) => ({
    summaryStore: { summary: '' },
    setSummaryStore: (data) => set({ summaryStore: data })
}));
