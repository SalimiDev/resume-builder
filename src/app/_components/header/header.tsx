'use client';

import { usePrintStore } from '@/store/usePrintStore';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

export const Header: React.FC = () => {
    const { reactToPrintFn, setScale } = usePrintStore();

    const handlePrint = () => {
        setScale(1);
        setTimeout(() => {
            reactToPrintFn?.();
        }, 150);
    };

    return (
        <div className='flex size-full justify-between bg-primary px-4 text-text-light'>
            <div className='flex items-center justify-center gap-4'>
                <h2 className='font-semibold'>CV Builder</h2>
            </div>

            <div className='flex items-center justify-center gap-4'>
                <Button
                    size='small'
                    component='label'
                    role={undefined}
                    variant='contained'
                    tabIndex={-1}
                    startIcon={<CloudDownloadIcon />}
                    onClick={() => handlePrint?.()}>
                    Download
                </Button>
                <div>
                    <Avatar alt='Travis Howard' src='https://i.pravatar.cc/150?u=a04258114e29026302d' />
                </div>
            </div>
        </div>
    );
};
