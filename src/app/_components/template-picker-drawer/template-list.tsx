'use client';

import Image from 'next/image';

import { elegant } from '@/assets/images';
import { useTemplateStore } from '@/store/useTemplateStore';
import AddIcon from '@mui/icons-material/Add';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import LibraryAddTwoToneIcon from '@mui/icons-material/LibraryAddTwoTone';
import { Button } from '@mui/material';
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

    const handleClickActions = (template: string, close: boolean) => {
        setCurrentTemplate(template);
        toggleDrawer(close);
    };

    return (
        <Box
            className='flex min-h-full flex-col items-center gap-3 !bg-primary py-4'
            sx={{
                width: 300
            }}
            role='presentation'>
            {templates.map(({ templateName, templateCover }) => (
                <div
                    key={templateName}
                    className='group h-[99mm] w-[70mm] drop-shadow-xl transition-all duration-300 ease-out hover:scale-[102%] *:hover:flex'>
                    <div className='absolute inset-0 z-50 flex items-center justify-center bg-white/20 opacity-0 transition-all duration-300 group-hover:opacity-100'>
                        <Button
                            // variant='outlined'
                            color='inherit'
                            startIcon={<LibraryAddOutlinedIcon />}
                            onClick={() => handleClickActions(templateName, false)}
                            className='rounded-md !bg-accent-content !px-4 !py-2 !font-semibold !shadow-xl !drop-shadow-2xl'>
                            Use Template
                        </Button>
                    </div>
                    <Image src={templateCover} alt={templateName} className='h-[99mm] w-[70mm]' />
                </div>
            ))}
        </Box>
    );
}
// hover:grayscale  hover:grayscale brightness-50 saturate-50 backdrop-saturate-50
