'use client';

import Image from 'next/image';

import { elegant } from '@/assets/images';
import { useTemplateStore } from '@/store/useTemplateStore';
import Box from '@mui/material/Box';

const templates = [
    { templateName: 'elegant', templateCover: elegant },
    { templateName: 'elegant2', templateCover: elegant }
];

type templateProps = {
    toggleDrawer: (arg0: boolean) => void;
};

export default function TemplateList({ toggleDrawer }: templateProps) {
    const { setCurrentTemplate } = useTemplateStore();

    return (
        <Box
            className='flex min-h-full flex-col items-center gap-3 !bg-primary py-4'
            sx={{
                width: 270
            }}
            role='presentation'
            onClick={() => toggleDrawer(false)}>
            {templates.map(({ templateName, templateCover }) => (
                <div
                    key={templateName}
                    onClick={() => setCurrentTemplate(templateName)}
                    className='h-[90mm] w-[61mm] cursor-pointer bg-white transition-transform hover:scale-[102%]'>
                    <Image src={templateCover} alt={templateName} className='h-[90mm] w-[61mm]' />
                </div>
            ))}
        </Box>
    );
}
