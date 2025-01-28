import { useEffect } from 'react';

import { useResumeStore } from '@/store/useResumeStore';
import { zodResolver } from '@hookform/resolvers/zod';

import { TextEditor } from '../../text-editor';
import { SummaryFormType, summaryFormSchema } from './summary-form-schema';
import { Controller, useForm } from 'react-hook-form';

interface SummaryFormProps {
    setSubmitHandler?: (submitHandler: () => Promise<boolean>) => void;
}

export default function SummaryForm({ setSubmitHandler }: SummaryFormProps) {
    const { summary, setSummary } = useResumeStore();

    const {
        handleSubmit,
        control,
        formState: { errors, isValid }
    } = useForm<SummaryFormType>({
        resolver: zodResolver(summaryFormSchema),
        mode: 'onBlur',
        defaultValues: summary
    });

    const onSubmit = async (data: SummaryFormType) => {
        setSummary(data);
    };

    // send the submit handler to the parent component(step-layout)
    useEffect(() => {
        if (setSubmitHandler) {
            setSubmitHandler(async () => {
                await handleSubmit(onSubmit)();

                return isValid;
            });
        }
    }, [handleSubmit, onSubmit, setSubmitHandler, isValid]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='mb-6 flex flex-col gap-4 rounded-lg border bg-white p-4 shadow-md'>
            <Controller
                control={control}
                name={`summary`}
                render={({ field }) => (
                    <TextEditor value={field.value} onChange={field.onChange} toolbarId={`toolbar-summary`} />
                )}
            />

            {!!errors.summary && <p className='text-red-500 text-sm'>{errors.summary?.message}</p>}
        </form>
    );
}
