'use client';

import { useEffect, useState } from 'react';

import { useResumeStore } from '@/store/useResumeStore';
import { zodResolver } from '@hookform/resolvers/zod';
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
    const { skills, setSkills } = useResumeStore();
    const [skillInput, setSkillInput] = useState('');
    const [localSkills, setLocalSkills] = useState<string[]>(skills);

    const {
        handleSubmit,
        trigger,
        formState: { errors, isValid }
    } = useForm<SkillsFormType>({
        resolver: zodResolver(skillsFormSchema),
        mode: 'onBlur',
        defaultValues: { skills: localSkills }
    });

    const addSkill = async () => {
        if ((await trigger()) && skillInput.trim() && !localSkills.includes(skillInput.trim())) {
            setLocalSkills([...localSkills, skillInput.trim()]);
            setSkillInput('');
        }
    };

    const handleDelete = (skill: string) => {
        setLocalSkills(localSkills.filter((item) => item !== skill));
    };

    const onSubmit = async () => {
        setSkills(localSkills);

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

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='mb-6 flex flex-col gap-4 rounded-lg border bg-white p-4 shadow-md'>
            <Box className='flex gap-2'>
                <TextField
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
            </Box>

            <Stack direction='row' spacing={1} className='flex-wrap gap-y-3'>
                {localSkills.map((skill, index) => (
                    <Chip key={index} label={skill} onDelete={() => handleDelete(skill)} />
                ))}
            </Stack>
        </form>
    );
}
