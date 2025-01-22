import { useEffect } from 'react';

import { useSummaryStore } from '@/store/useSummaryStore';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';

import { TextEditor } from '../../text-editor';
import { SummaryFormType, summaryFormSchema } from './summary-form-schema';
// eslint-disable-next-line import/named
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface SummaryFormProps {
    setSubmitHandler?: (submitHandler: () => Promise<boolean>) => void;
}

export default function SummaryForm({ setSubmitHandler }: SummaryFormProps) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid }
    } = useForm<SummaryFormType>({
        resolver: zodResolver(summaryFormSchema),
        mode: 'onBlur'
    });

    const { setSummaryStore } = useSummaryStore();

    const onSubmit = async (data: SummaryFormType) => {
        setSummaryStore(data);
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
                render={({ field }) => <TextEditor value={field.value} onChange={field.onChange} />}
            />

            {!!errors.summary && <p className='text-red-500 text-sm'>{errors.summary?.message}</p>}

            <Button variant='contained' type='submit'>
                Save
            </Button>
        </form>
    );
}
