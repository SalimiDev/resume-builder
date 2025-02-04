'use client';

import { ChangeEvent, useRef, useState } from 'react';

import { user_placeholder1 } from '@/assets/images';
import { useResumeStore } from '@/store/useResumeStore';
import AddIcon from '@mui/icons-material/Add';
import { Alert } from '@mui/material';

type AvatarUploadProps = {
    onFileChange?: (base64: string) => void;
};

export function AvatarUpload({ onFileChange }: AvatarUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const { summary } = useResumeStore();
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const [error, setError] = useState<string | null>(null);

    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                setError('The selected file size exceeds the allowed limit (maximum 2 MB).');

                return;
            } else {
                setError(null);
            }
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
                    <img
                        src={typeof preview === 'string' ? preview : undefined}
                        alt='user image'
                        className='size-full object-cover'
                    />
                ) : (
                    <div className='text-gray-500 relative flex size-full items-center justify-center'>
                        <img
                            src={typeof summary.avatar === 'string' ? summary.avatar : user_placeholder1.src}
                            alt='user Image'
                        />
                        <span className='absolute -bottom-4 z-50 grid h-1/2 w-full justify-center py-1 text-white backdrop-contrast-50'>
                            <AddIcon />
                        </span>
                    </div>
                )}
            </div>
            {error && <Alert severity='error'>{error}</Alert>}
            <input type='file' accept='image/*' ref={inputRef} onChange={handleChange} style={{ display: 'none' }} />
        </div>
    );
}
