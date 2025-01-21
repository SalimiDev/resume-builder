import { useSummaryStore } from '@/store/useSummaryStore';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';

import { TextEditor } from '../../text-editor';
import { SummaryFormType, summaryFormSchema } from './summary-form-schema';
// eslint-disable-next-line import/named
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export default function SummaryForm() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<SummaryFormType>({
        resolver: zodResolver(summaryFormSchema)
    });

    const { setSummaryStore } = useSummaryStore();

    const onSubmit: SubmitHandler<SummaryFormType> = (data) => {
        console.log('Summary Me Submitted:', data);
        setSummaryStore(data);
    };

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
