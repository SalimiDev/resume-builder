'use client';

import { useExperiencesStore } from '@/store/useExperiencesStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { Add, Delete } from '@mui/icons-material';
import { Button, IconButton, TextField } from '@mui/material';

import { TextEditor } from '../../text-editor';
import { ExperienceFormType, experienceFormSchema } from './experiences-form-schema';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

const ExperiencesForm = () => {
    const {
        register,
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<ExperienceFormType>({
        resolver: zodResolver(experienceFormSchema),
        defaultValues: {
            experiences: [{ employer: '', role: '', location: '', startDate: '', endDate: '', description: '' }]
        }
    });

    const { fields, append, remove } = useFieldArray({ control, name: 'experiences' });

    const experiencesValues = watch('experiences');

    const isAddMoreDisabled = experiencesValues.some(
        (field) =>
            !field.employer ||
            !field.role ||
            !field.location ||
            !field.startDate ||
            !field.endDate ||
            !field.description
    );

    const { setExperiencesStore, experiencesStore } = useExperiencesStore();
    console.log(experiencesStore);
    const onSubmit = (data: ExperienceFormType) => {
        console.log('Form Data:', data);
        setExperiencesStore(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className=' '>
            {fields.map((field, index) => (
                <div
                    key={field.id}
                    className='relative mb-6 flex flex-col gap-3 rounded-lg border bg-white p-4 shadow-md'>
                    <TextField
                        label='Employer'
                        fullWidth
                        {...register(`experiences.${index}.employer`)}
                        error={!!errors.experiences?.[index]?.employer}
                        helperText={errors.experiences?.[index]?.employer?.message}
                    />

                    <TextField
                        label='Role or Job Title'
                        fullWidth
                        {...register(`experiences.${index}.role`)}
                        error={!!errors.experiences?.[index]?.role}
                        helperText={errors.experiences?.[index]?.role?.message}
                    />

                    <TextField
                        label='Location'
                        fullWidth
                        {...register(`experiences.${index}.location`)}
                        error={!!errors.experiences?.[index]?.location}
                        helperText={errors.experiences?.[index]?.location?.message}
                    />

                    <div className='grid grid-cols-2 gap-4'>
                        <TextField
                            label='Start Date (MM/YYYY)'
                            fullWidth
                            {...register(`experiences.${index}.startDate`)}
                            error={!!errors.experiences?.[index]?.startDate}
                            helperText={errors.experiences?.[index]?.startDate?.message}
                        />

                        <TextField
                            label='End Date (MM/YYYY or Present)'
                            fullWidth
                            {...register(`experiences.${index}.endDate`)}
                            error={!!errors.experiences?.[index]?.endDate}
                            helperText={errors.experiences?.[index]?.endDate?.message}
                        />
                    </div>

                    <Controller
                        name={`experiences.${index}.description`}
                        control={control}
                        render={({ field }) => <TextEditor value={field.value} onChange={field.onChange} />}
                    />

                    {errors.experiences?.[index]?.description && (
                        <p className='text-red-500 text-sm'>{errors.experiences[index]?.description?.message}</p>
                    )}

                    {index > 0 && (
                        <IconButton
                            onClick={() => remove(index)}
                            className='absolute right-2 top-2'
                            aria-label='delete'
                            color='error'>
                            <Delete />
                        </IconButton>
                    )}
                </div>
            ))}

            <div className='flex gap-4'>
                <Button
                    startIcon={<Add />}
                    type='button'
                    variant='outlined'
                    onClick={() =>
                        append({
                            employer: '',
                            role: '',
                            location: '',
                            startDate: '',
                            endDate: '',
                            description: ''
                        })
                    }
                    disabled={isAddMoreDisabled}>
                    Add More
                </Button>

                <Button type='submit' variant='contained' color='primary'>
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default ExperiencesForm;
