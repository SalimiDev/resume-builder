import { DetailsFormType } from '@/app/_components/forms/details/details-form-schema';

import { create } from 'zustand';

type DetailsStore = {
    detailsStore: DetailsFormType;
    setDetailsStore: (data: DetailsFormType) => void;
};

export const useDetailsStore = create<DetailsStore>((set) => ({
    detailsStore: {
        name: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        location: '',
        github: '',
        summary: '',
        additionalFields: []
    },
    setDetailsStore: (data) => {
        set({ detailsStore: data });
    }
}));
