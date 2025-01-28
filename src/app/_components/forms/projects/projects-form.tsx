'use client';

import { useEffect } from 'react';

import { useResumeStore } from '@/store/useResumeStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { Add, Delete } from '@mui/icons-material';
import { Button, IconButton, TextField } from '@mui/material';

import { TextEditor } from '../../text-editor';
import ExtraField from '../extra-field';
import { ProjectsFormSchema, ProjectsFormType } from './projects-form-schema';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

interface ProjectsFormProps {
    setSubmitHandler?: (submitHandler: () => Promise<boolean>) => void;
}

export default function ProjectsForm({ setSubmitHandler }: ProjectsFormProps) {
    const { projects, setProjects } = useResumeStore();

    const defaultValues: ProjectsFormType = {
        projects: [
            {
                projectName: '',
                startDate: '',
                endDate: '',
                description: '',
                extraFields: []
            }
        ]
    };

    const {
        register,
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isValid }
    } = useForm<ProjectsFormType>({
        resolver: zodResolver(ProjectsFormSchema),
        mode: 'onBlur',
        defaultValues: projects.projects.length ? projects : defaultValues
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'projects'
    });

    useEffect(() => {
        if (!projects.projects.length) {
            reset(defaultValues);
        } else {
            reset(projects);
        }
    }, [projects, reset]);

    const onSubmit = async (data: ProjectsFormType) => {
        setProjects(data);

        return true;
    };

    useEffect(() => {
        if (setSubmitHandler) {
            setSubmitHandler(async () => {
                await handleSubmit(onSubmit)();

                return isValid;
            });
        }
    }, [handleSubmit, onSubmit, setSubmitHandler, isValid]);

    const projectsValues = watch('projects');
    const isAddMoreDisabled = projectsValues.some(
        (field) => !field.projectName || !field.startDate || !field.endDate || !field.description
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field, index) => (
                <div
                    key={field.id}
                    className='relative mb-6 flex flex-col gap-3 rounded-lg border bg-white p-4 shadow-md'>
                    <TextField
                        label='Project Name'
                        fullWidth
                        {...register(`projects.${index}.projectName`)}
                        error={!!errors.projects?.[index]?.projectName}
                        helperText={errors.projects?.[index]?.projectName?.message}
                    />

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <TextField
                            type='month'
                            label='Start Date'
                            InputLabelProps={{ shrink: true }}
                            {...register(`projects.${index}.startDate`)}
                            error={!!errors.projects?.[index]?.startDate}
                            helperText={errors.projects?.[index]?.startDate?.message}
                        />

                        <TextField
                            type='month'
                            label='End Date'
                            InputLabelProps={{ shrink: true }}
                            {...register(`projects.${index}.endDate`)}
                            error={!!errors.projects?.[index]?.endDate}
                            helperText={errors.projects?.[index]?.endDate?.message}
                        />
                    </div>

                    <Controller
                        name={`projects.${index}.description`}
                        control={control}
                        render={({ field }) => (
                            <TextEditor value={field.value} onChange={field.onChange} toolbarId={`toolbar-${index}`} />
                        )}
                    />

                    {errors.projects?.[index]?.description && (
                        <p className='text-red-500 text-sm'>{errors.projects[index]?.description?.message}</p>
                    )}

                    <ExtraField<ProjectsFormType> control={control} name={`projects.${index}.extraFields`} />

                    {index > 0 && (
                        <IconButton
                            onClick={() => remove(index)}
                            className='right-2 top-2'
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
                    disabled={isAddMoreDisabled}
                    onClick={() => append(defaultValues.projects[0])}>
                    Add More
                </Button>
            </div>
        </form>
    );
}
