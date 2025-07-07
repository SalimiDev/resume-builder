import { useCallback, useEffect, useMemo } from 'react';

import { useResumeStore } from '@/store/useResumeStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Grid2, TextField, Typography } from '@mui/material';

import ExtraField from '../extra-field';
import { DetailsFormType, detailsFormSchema } from './details-form-schema';
import { useForm } from 'react-hook-form';

interface DetailsFormProps {
    setSubmitHandler?: (submitHandler: () => Promise<boolean>) => void;
}

interface FormFieldConfig {
    name: keyof DetailsFormType;
    label: string;
    type?: string;
    autoComplete?: string;
}

export default function DetailsForm({ setSubmitHandler }: DetailsFormProps) {
    const { details, setDetails } = useResumeStore();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid, isSubmitting }
    } = useForm<DetailsFormType>({
        resolver: zodResolver(detailsFormSchema),
        mode: 'onBlur',
        defaultValues: details
    });

    // Memoize form field configurations to prevent unnecessary re-renders
    const formFields = useMemo<FormFieldConfig[][]>(
        () => [
            [
                { name: 'name', label: 'First Name', autoComplete: 'given-name' },
                { name: 'lastName', label: 'Last Name', autoComplete: 'family-name' }
            ],
            [
                { name: 'role', label: 'Professional Title', autoComplete: 'organization-title' },
                { name: 'location', label: 'Location', autoComplete: 'address-level2' }
            ],
            [
                { name: 'email', label: 'Email Address', type: 'email', autoComplete: 'email' },
                { name: 'phoneNumber', label: 'Phone Number', type: 'tel', autoComplete: 'tel' }
            ]
        ],
        []
    );

    // Memoize the submit handler to prevent unnecessary re-renders
    const onSubmit = useCallback(
        async (data: DetailsFormType): Promise<boolean> => {
            try {
                setDetails(data);

                return true;
            } catch (error) {
                console.error('Error submitting details form:', error);

                return false;
            }
        },
        [setDetails]
    );

    // Send the submit handler to the parent component
    useEffect(() => {
        if (setSubmitHandler) {
            setSubmitHandler(async () => {
                try {
                    let isFormValid = false;
                    await handleSubmit((data) => {
                        isFormValid = true;

                        return onSubmit(data);
                    })();

                    return isFormValid && isValid;
                } catch (error) {
                    console.error('Form submission error:', error);

                    return false;
                }
            });
        }
    }, [handleSubmit, onSubmit, setSubmitHandler, isValid]);

    // Render a pair of form fields
    const renderFieldPair = useCallback(
        (fieldPair: FormFieldConfig[], index: number) => (
            <Grid2 container spacing={2} key={index}>
                {fieldPair.map((field) => (
                    <Grid2 size={{ xs: 12, sm: 6 }} key={field.name}>
                        <TextField
                            label={field.label}
                            type={field.type || 'text'}
                            variant='outlined'
                            fullWidth
                            autoComplete={field.autoComplete}
                            disabled={isSubmitting}
                            {...register(field.name)}
                            error={!!errors[field.name]}
                            helperText={errors[field.name]?.message}
                            aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                        />
                    </Grid2>
                ))}
            </Grid2>
        ),
        [register, errors, isSubmitting]
    );

    return (
        <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            className='mb-6 flex flex-col gap-4 rounded-lg border bg-white p-4 shadow-md'
            noValidate
            aria-label='Personal details form'>
            <Typography variant='h6' component='h2' className='text-gray-800 mb-2'>
                Personal Information
            </Typography>

            <Box className='flex flex-col gap-4'>
                {formFields.map((fieldPair, index) => renderFieldPair(fieldPair, index))}
            </Box>

            <Box className='mt-4'>
                <ExtraField<DetailsFormType> control={control} name='extraFields' />
            </Box>
        </Box>
    );
}
