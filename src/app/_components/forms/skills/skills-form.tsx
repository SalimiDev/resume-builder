'use client';

import { useState } from 'react';

import { useSkillsStore } from '@/store/useSkillsStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { SkillsFormType, skillsFormSchema } from './skills-form-schema';
// eslint-disable-next-line import/named
import { SubmitHandler, useForm } from 'react-hook-form';

export default function SkillsForm() {
    const [skills, setSkills] = useState<string[]>([]);
    const {
        register,
        watch,
        handleSubmit,
        trigger,
        reset,
        setFocus,
        formState: { errors }
    } = useForm<SkillsFormType>({
        resolver: zodResolver(skillsFormSchema),
        defaultValues: {
            skill: ''
        }
    });

    const addSkill = (skill: string) => {
        if (!skills.includes(skill)) {
            setSkills((prev: string[]) => [...prev, skill]);
        }
    };

    const handleDelete = (skill: string) => {
        setSkills((prev: string[]) => prev.filter((item: string) => item !== skill));
    };

    const { setSkillsStore, skillsStore } = useSkillsStore();
    console.log(skillsStore);
    const onSubmit: SubmitHandler<SkillsFormType> = (data) => {
        console.log('Form Submitted:', data);
        setSkillsStore(skills);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='mb-6 flex flex-col gap-4 rounded-lg border bg-white p-4 shadow-md'>
            <Box className='flex gap-2'>
                <TextField
                    id='outlined-basic'
                    label='Skills'
                    variant='outlined'
                    {...register('skill')}
                    error={!!errors.skill}
                    helperText={errors.skill && errors.skill.message}
                    onKeyDown={async (e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            const isValid = await trigger('skill');
                            if (isValid) {
                                const currentSkill = watch('skill');
                                addSkill(currentSkill);
                                reset();
                            }
                        }
                    }}
                />

                <Button variant='contained' type='submit'>
                    Submit
                </Button>
            </Box>

            <Stack direction='row' spacing={1} className='flex-wrap gap-y-3'>
                {skills.map((skill, index) => (
                    <Chip key={index} label={skill} onDelete={() => handleDelete(skill)} />
                ))}
            </Stack>
        </form>
    );
}
