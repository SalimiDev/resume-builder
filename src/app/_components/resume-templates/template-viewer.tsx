import { useEffect, useRef } from 'react';

import { usePrintStore } from '@/store/usePrintStore';
import { TemplateProps } from '@/types/template-props.types';

import { ElegantTemplate } from '.';
import { useReactToPrint } from 'react-to-print';

const templatesMap: Record<string, React.FC<TemplateProps>> = {
    elegant: ElegantTemplate
};

type TemplateViewerProps = {
    scale: number;
    templateKey: string;
    resumeData: TemplateProps;
};

export default function TemplateViewer({ templateKey, resumeData }: TemplateViewerProps) {
    const Template = templatesMap[templateKey];
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
    const { scale, setPrintElements } = usePrintStore();

    useEffect(() => {
        setPrintElements(contentRef, reactToPrintFn);
    }, []);

    return (
        <div
            ref={contentRef}
            style={{ transform: `scale(${scale})`, transformOrigin: 'top' }}
            className='aspect-[1/1.414] h-[297mm] w-[210mm] overflow-auto bg-white shadow-lg drop-shadow-lg'>
            <Template {...resumeData} />
        </div>
    );
}
