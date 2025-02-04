'use client';

import { ChangeEvent, useRef, useState } from 'react';

import Image from 'next/image';

import { user_placeholder1 } from '@/assets/images';
import AddIcon from '@mui/icons-material/Add';

type AvatarUploadProps = {
    onFileChange?: (base64: string) => void;
};

export function AvatarUpload({ onFileChange }: AvatarUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target?.result !== undefined) {
                    setPreview(e.target.result);
                    if (onFileChange) {
                        onFileChange(e.target.result as string);
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='justify-cente flex flex-col items-center gap-7'>
            <div onClick={handleClick} className='size-24 cursor-pointer overflow-hidden rounded-full border'>
                {preview ? (
                    <Image
                        src={typeof preview === 'string' ? preview : ''}
                        alt='user image'
                        className='size-full object-cover'
                    />
                ) : (
                    <div className='text-gray-500 relative flex size-full items-center justify-center'>
                        <Image src={user_placeholder1} alt='user Image' />
                        <span className='absolute -bottom-4 z-50 grid h-1/2 w-full justify-center py-1 text-white backdrop-contrast-50'>
                            <AddIcon />
                        </span>
                    </div>
                )}
            </div>
            <input type='file' accept='image/*' ref={inputRef} onChange={handleChange} style={{ display: 'none' }} />
        </div>
    );
}
