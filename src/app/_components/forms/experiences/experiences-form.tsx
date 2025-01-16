'use client';

import dynamic from 'next/dynamic';

import { zodResolver } from '@hookform/resolvers/zod';
import { Add, Delete } from '@mui/icons-material';
import { Button, IconButton, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

import { ExperienceFormType, experienceFormSchema } from './experiences-form-schema';
import { useFieldArray, useForm } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

//Quill Styles
const QuillContainer = styled('div')({
    '& .ql-editor': {
        minHeight: '100px'
    }
});

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
            experiences: [{ employer: '', role: '', location: '', startDate: '', endDate: '', responsibilities: '' }]
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
            !field.responsibilities
    );

    const onSubmit = (data: ExperienceFormType) => {
        console.log('Form Data:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className=' '>
            {fields.map((field, index) => (
                <div key={field.id} className='relative mb-6 rounded-lg border bg-white p-4 shadow-md'>
                    <TextField
                        label='Employer'
                        fullWidth
                        {...register(`experiences.${index}.employer`)}
                        error={!!errors.experiences?.[index]?.employer}
                        helperText={errors.experiences?.[index]?.employer?.message}
                        className='mb-3'
                    />

                    <TextField
                        label='Role or Job Title'
                        fullWidth
                        {...register(`experiences.${index}.role`)}
                        error={!!errors.experiences?.[index]?.role}
                        helperText={errors.experiences?.[index]?.role?.message}
                        className='mb-3'
                    />

                    <TextField
                        label='Location'
                        fullWidth
                        {...register(`experiences.${index}.location`)}
                        error={!!errors.experiences?.[index]?.location}
                        helperText={errors.experiences?.[index]?.location?.message}
                        className='mb-3'
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

                    <QuillContainer className='mt-3'>
                        <ReactQuill
                            theme='snow'
                            value={watch(`experiences.${index}.responsibilities`)}
                            onChange={(content) => setValue(`experiences.${index}.responsibilities`, content)}
                        />
                    </QuillContainer>

                    {errors.experiences?.[index]?.responsibilities && (
                        <p className='text-red-500 text-sm'>{errors.experiences[index]?.responsibilities?.message}</p>
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
                            responsibilities: ''
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
