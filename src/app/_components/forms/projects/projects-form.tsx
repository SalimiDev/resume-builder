'use client';

import { useEffect, useState } from 'react';

import { useResumeStore } from '@/store/useResumeStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { Add, Delete } from '@mui/icons-material';
import { Button, IconButton, TextField } from '@mui/material';

import { TextEditor } from '../../text-editor';
import { ProjectsFormSchema, ProjectsFormType } from './projects-form-schema';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

interface ProjectsFormProps {
    setSubmitHandler?: (submitHandler: () => Promise<boolean>) => void;
}

export default function ProjectsForm({ setSubmitHandler }: ProjectsFormProps) {
    const defaultValues: ProjectsFormType = {
        projects: [
            {
                projectName: '',
                startDate: '',
                endDate: '',
                description: '',
                externalLinks: []
            }
        ]
    };

    const {
        register,
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid }
    } = useForm<ProjectsFormType>({
        resolver: zodResolver(ProjectsFormSchema),
        mode: 'onBlur',
        defaultValues
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'projects'
    });

    const { setProjects } = useResumeStore();
    const onSubmit = async (data: ProjectsFormType) => {
        setProjects(data);

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

    const projectsValues = watch('projects');
    const isAddMoreDisabled = projectsValues.some(
        (field) =>
            !field.projectName || !field.startDate || !field.endDate || !field.description || !field.externalLinks
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((projectField, projectIndex) => (
                <div
                    key={projectField.id}
                    className='relative mb-6 flex flex-col gap-3 rounded-lg border bg-white p-4 shadow-md'>
                    <TextField
                        label='Project Name'
                        fullWidth
                        {...register(`projects.${projectIndex}.projectName`)}
                        error={!!errors.projects?.[projectIndex]?.projectName}
                        helperText={errors.projects?.[projectIndex]?.projectName?.message}
                    />

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <TextField
                            type='month'
                            label='Start Date'
                            InputLabelProps={{ shrink: true }}
                            {...register(`projects.${projectIndex}.startDate`)}
                            error={!!errors.projects?.[projectIndex]?.startDate}
                            helperText={errors.projects?.[projectIndex]?.startDate?.message}
                        />

                        <TextField
                            type='month'
                            label='End Date'
                            InputLabelProps={{ shrink: true }}
                            {...register(`projects.${projectIndex}.endDate`)}
                            error={!!errors.projects?.[projectIndex]?.endDate}
                            helperText={errors.projects?.[projectIndex]?.endDate?.message}
                        />
                    </div>

                    <Controller
                        name={`projects.${projectIndex}.description`}
                        control={control}
                        render={({ field }) => <TextEditor value={field.value} onChange={field.onChange} />}
                    />

                    {errors.projects?.[projectIndex]?.description && (
                        <p className='text-red-500 text-sm'>{errors.projects[projectIndex]?.description?.message}</p>
                    )}

                    <ExternalLinksFieldArray register={register} control={control} projectIndex={projectIndex} />

                    {projectIndex > 0 && (
                        <IconButton onClick={() => remove(projectIndex)} className='!absolute right-2 top-2'>
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
                    onClick={() =>
                        append({
                            projectName: '',
                            startDate: '',
                            endDate: '',
                            description: '',
                            externalLinks: []
                        })
                    }>
                    Add More
                </Button>
            </div>
        </form>
    );
}

type ExternalLinksProps = {
    register: ReturnType<typeof useForm<ProjectsFormType>>['register'];
    control: ReturnType<typeof useForm<ProjectsFormType>>['control'];
    projectIndex: number;
};

function ExternalLinksFieldArray({ register, control, projectIndex }: ExternalLinksProps) {
    const {
        fields: linkFields,
        append: appendLink,
        remove: removeLink
    } = useFieldArray({
        control,
        name: `projects.${projectIndex}.externalLinks`
    });

    const [fileState, setFileState] = useState<{ [key: number]: File | null }>({});

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileState((prev) => ({ ...prev, [idx]: file }));
        }
    };

    return (
        <div className='space-y-3'>
            <p className='font-semibold'>External Links</p>

            {linkFields.map((linkField, linkIndex) => (
                <div key={linkField.id} className='flex flex-col items-center justify-center gap-2 md:flex-row'>
                    <TextField
                        label='Link URL'
                        fullWidth
                        {...register(`projects.${projectIndex}.externalLinks.${linkIndex}.url`)}
                    />

                    <input
                        type='file'
                        {...register(`projects.${projectIndex}.externalLinks.${linkIndex}.icon`)}
                        onChange={(e) => handleFileChange(e, linkIndex)}
                    />

                    <IconButton color='error' onClick={() => removeLink(linkIndex)} aria-label='delete-link'>
                        <Delete />
                    </IconButton>
                </div>
            ))}

            <Button variant='outlined' onClick={() => appendLink({ url: '', icon: null })}>
                Add Link
            </Button>
        </div>
    );
}
