import { create } from 'zustand';

type PrintStore = {
    scale: number;
    contentRef: React.RefObject<HTMLDivElement> | null;
    reactToPrintFn: (() => void) | null;
    setScale: (scale: number) => void;
    setPrintElements: (ref: React.RefObject<HTMLDivElement>, printFn: () => void) => void;
};

export const usePrintStore = create<PrintStore>((set) => ({
    scale: 0.9,
    contentRef: null,
    reactToPrintFn: null,
    setScale: (scale) => set({ scale }),
    setPrintElements: (ref, printFn) => set({ contentRef: ref, reactToPrintFn: printFn })
}));
