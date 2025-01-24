'use client';

import { useEffect, useState } from 'react';

import { useResumeStore } from '@/store/useResumeStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { SkillsFormType, skillsFormSchema } from './skills-form-schema';
import { useForm } from 'react-hook-form';

interface SkillsFormProps {
    setSubmitHandler?: (submitHandler: () => Promise<boolean>) => void;
}

export default function SkillsForm({ setSubmitHandler }: SkillsFormProps) {
    const [skillInput, setSkillInput] = useState('');
    const [skills, setLocalSkills] = useState<string[]>([]);

    const {
        handleSubmit,
        trigger,
        formState: { errors, isValid }
    } = useForm<SkillsFormType>({
        resolver: zodResolver(skillsFormSchema),
        mode: 'onBlur',
        defaultValues: {
            skills: []
        }
    });

    const addSkill = async () => {
        const isValid = await trigger();
        if (isValid && skillInput.trim() && !skills.includes(skillInput.trim())) {
            setLocalSkills((prev) => [...prev, skillInput.trim()]);
            setSkillInput('');
        }
    };

    const handleDelete = (skill: string) => {
        setLocalSkills((prev) => prev.filter((item) => item !== skill));
    };

    const { setSkills } = useResumeStore();
    const onSubmit = async (data: SkillsFormType) => {
        setSkills(skills);
        //TODO FIX THIS

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
            <Box className='flex gap-2'>
                <TextField
                    id='outlined-basic'
                    label='Skills'
                    variant='outlined'
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    error={!!errors.skills}
                    helperText={errors.skills?.message?.toString()}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            addSkill();
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
