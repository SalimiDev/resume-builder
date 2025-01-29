'use client';

import { useState } from 'react';

import Drawer from '@mui/material/Drawer';

import TemplateList from './template-list';

export default function TemplatePicker() {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    return (
        <div className='relative flex h-full'>
            <Drawer
                anchor='left'
                open={open}
                onClose={() => toggleDrawer(false)}
                variant='temporary'
                ModalProps={{
                    // container: containerRef.current,
                    disablePortal: true,
                    keepMounted: true
                }}
                sx={{
                    '& .MuiDrawer-paper': {
                        position: 'absolute',
                        height: '100%'
                    },
                    position: 'absolute'
                }}>
                <TemplateList toggleDrawer={toggleDrawer} />
            </Drawer>

            <div className='relative flex h-full w-2 bg-primary'>
                <button className='w-0' onClick={() => toggleDrawer(!open)}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='11'
                        height='5'
                        fill='none'
                        viewBox='0 0 11 5'
                        className='absolute z-50 translate-x-1/2 rotate-90'>
                        <path
                            fill='white'
                            d='M4.735.24c.422-.32 1.108-.32 1.53 0l4.418 3.357c.423.32.423.841 0 1.162-.422.321-1.107.321-1.53 0L5.5 1.984 1.847 4.76c-.422.321-1.108.321-1.53 0-.423-.32-.423-.841 0-1.162z'></path>
                    </svg>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='96'
                        height='14'
                        fill='none'
                        viewBox='0 0 96 14'
                        className='block translate-x-[-35%] rotate-90 cursor-pointer'>
                        <path
                            className='fill-primary'
                            d='M71.294 0H24.706a12 12 0 0 0-8.45 3.48l-7.1 7.04A12 12 0 0 1 .706 14h94.588a12 12 0 0 1-8.45-3.48l-7.1-7.04A12 12 0 0 0 71.294 0'></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}
