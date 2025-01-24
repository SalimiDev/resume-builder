import { TemplateProps } from '@/types/templates-props.types';

import { ElegantTemplate } from '.';

const templatesMap: Record<string, React.FC<TemplateProps>> = {
    elegant: ElegantTemplate
};

type TemplateViewerProps = {
    scale: number;
    templateKey: string;
    resumeData: TemplateProps;
};

export default function TemplateViewer({ scale, templateKey, resumeData }: TemplateViewerProps) {
    const TemplateComponent = templatesMap[templateKey];

    return (
        <div
            style={{ transform: `scale(${scale})`, transformOrigin: 'top' }}
            className='border-gray-300 aspect-[1/1.414] h-[297mm] w-[210mm] overflow-auto border bg-white shadow-lg'>
            <TemplateComponent {...resumeData} />
        </div>
    );
}
