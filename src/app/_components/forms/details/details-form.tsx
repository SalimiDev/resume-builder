import { useEffect } from 'react';

import { useResumeStore } from '@/store/useResumeStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, TextField } from '@mui/material';

import ExtraField from '../extra-field';
import { DetailsFormType, detailsFormSchema } from './details-form-schema';
import { useForm } from 'react-hook-form';

interface DetailsFormProps {
    setSubmitHandler?: (submitHandler: () => Promise<boolean>) => void;
}

export default function DetailsForm({ setSubmitHandler }: DetailsFormProps) {
    const { details, setDetails } = useResumeStore();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid }
    } = useForm<DetailsFormType>({
        resolver: zodResolver(detailsFormSchema),
        mode: 'onBlur',
        defaultValues: details
    });

    const onSubmit = async (data: DetailsFormType) => {
        setDetails(data);

        return true;
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
            <Box className='flex gap-2 *:w-1/2'>
                <TextField
                    label='Name'
                    variant='outlined'
                    {...register('name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />

                <TextField
                    label='Last Name'
                    variant='outlined'
                    {...register('lastName')}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                />
            </Box>

            <Box className='flex gap-2 *:w-1/2'>
                <TextField
                    label='Role'
                    variant='outlined'
                    {...register('role')}
                    error={!!errors.role}
                    helperText={errors.role?.message}
                />

                <TextField
                    label='Location'
                    variant='outlined'
                    {...register('location')}
                    error={!!errors.location}
                    helperText={errors.location?.message}
                />
            </Box>

            <Box className='flex gap-2 *:w-1/2'>
                <TextField
                    label='Email'
                    variant='outlined'
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField
                    label='Phone Number'
                    variant='outlined'
                    {...register('phoneNumber')}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                />
            </Box>

            <ExtraField<DetailsFormType> control={control} name='extraFields' />
        </form>
    );
}
