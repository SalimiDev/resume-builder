'use client';

import { useState } from 'react';

import ResumeBuilder from './_components/forms';
import ResumePreview from './_components/preview/resume-preview';
import ResumeSteps from './_components/stepper/resume-steps';

export default function Home() {
    const [scale, setScale] = useState(0.6);

    return (
        <div className='flex size-full'>
            {/* ستون چپ */}
            <div className='flex h-full w-1/2 flex-col overflow-auto border-r'>
                {/* نوار بالا (استپر رزومه) */}
                <div className='h-14 flex-shrink-0 border-b border-text-light bg-accent p-2'>
                    <ResumeSteps />
                </div>
                {/* بقیه فضا برای فرم؛ اسکرول داخلی دارد */}
                <div className='relative flex-1 overflow-y-auto overflow-x-hidden p-4'>
                    <ResumeBuilder />
                </div>
            </div>

            {/* ستون راست */}
            <div className='relative flex h-full w-1/2 flex-1 flex-col overflow-auto bg-text-light'>
                <div className='flex items-start justify-center overflow-auto p-4'>
                    <ResumePreview scale={scale} />
                </div>

                <div className='absolute bottom-2 right-4 border-b border-text-light p-2'>
                    <label htmlFor='zoom' className='mr-2'>
                        زوم:
                    </label>
                    <input
                        type='range'
                        id='zoom'
                        min='0.5'
                        max='1'
                        step='0.1'
                        value={scale}
                        onChange={(e) => setScale(parseFloat(e.target.value))}
                        className='cursor-pointer'
                    />
                </div>
            </div>
        </div>
    );
}
