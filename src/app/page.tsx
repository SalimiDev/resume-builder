'use client';

import { useMemo } from 'react';

import { usePrintStore } from '@/store/usePrintStore';
import { useResumeStore } from '@/store/useResumeStore';
import { useTemplateStore } from '@/store/useTemplateStore';
import { resumeSteps } from '@/utils/constants/resume-steps';

import FormViewer from './_components/forms/form-viewer';
import TemplateViewer from './_components/resume-templates/template-viewer';
import TemplatePicker from './_components/template-picker-drawer/template-picker';
import StepperLayout from './layouts/stepper-layout';

export default function Home() {
    const { currentTemplate } = useTemplateStore();
    const resumeData = useResumeStore();
    const { setScale, scale } = usePrintStore();

    return (
        <div className='flex size-full'>
            <div className='relative flex h-full w-0'>
                <TemplatePicker />
            </div>

            <div className='flex flex-1'>
                {/* ستون چپ */}
                <div className='flex h-full w-1/2 flex-col overflow-auto border-r'>
                    <StepperLayout steps={resumeSteps}>
                        {(activeStep, setSubmitHandler) => {
                            const currentStepKey = useMemo(() => resumeSteps[activeStep].key, [activeStep]);

                            return <FormViewer step={currentStepKey} setSubmitHandler={setSubmitHandler} />;
                        }}
                    </StepperLayout>
                </div>

                {/* ستون راست */}
                <div className='relative flex h-full w-1/2 flex-1 flex-col overflow-auto bg-text-light'>
                    <div className='flex items-start justify-center overflow-auto p-4'>
                        <TemplateViewer scale={scale} templateKey={currentTemplate} resumeData={resumeData} />
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
        </div>
    );
}
