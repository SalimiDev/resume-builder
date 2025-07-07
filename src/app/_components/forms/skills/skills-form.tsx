'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useResumeStore } from '@/store/useResumeStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Chip, Stack, TextField, Tooltip } from '@mui/material';

import { SkillsFormType, skillsFormSchema } from './skills-form-schema';
import { useForm } from 'react-hook-form';

interface SkillsFormProps {
    setSubmitHandler?: (submitHandler: () => Promise<boolean>) => void;
}

export default function SkillsForm({ setSubmitHandler }: SkillsFormProps) {
    const { skills, setSkills } = useResumeStore();
    const [skillInput, setSkillInput] = useState('');
    const [localSkills, setLocalSkills] = useState<string[]>(skills);
    const inputRef = useRef<HTMLInputElement>(null);

    const {
        handleSubmit,
        trigger,
        formState: { errors, isValid },
        register,
        setValue
    } = useForm<SkillsFormType>({
        resolver: zodResolver(skillsFormSchema),
        mode: 'onBlur',
        defaultValues: { skills: localSkills }
    });

    // Sync localSkills with store if skills change externally
    useEffect(() => {
        setLocalSkills(skills);
    }, [skills]);

    // Focus input after adding a skill
    const focusInput = () => {
        inputRef.current?.focus();
    };

    const addSkill = useCallback(async () => {
        const trimmed = skillInput.trim();
        if ((await trigger()) && trimmed && !localSkills.includes(trimmed)) {
            const updatedSkills = [...localSkills, trimmed];
            setLocalSkills(updatedSkills);
            setValue('skills', updatedSkills, { shouldValidate: true });
            setSkillInput('');
            focusInput();
        }
    }, [skillInput, localSkills, setValue, trigger]);

    const handleDelete = useCallback(
        (skill: string) => {
            const updatedSkills = localSkills.filter((item) => item !== skill);
            setLocalSkills(updatedSkills);
            setValue('skills', updatedSkills, { shouldValidate: true });
        },
        [localSkills, setValue]
    );

    const onSubmit = useCallback(async () => {
        setSkills(localSkills);

        return true;
    }, [localSkills, setSkills]);

    useEffect(() => {
        if (setSubmitHandler) {
            setSubmitHandler(async () => {
                await handleSubmit(onSubmit)();

                return isValid;
            });
        }
    }, [handleSubmit, onSubmit, setSubmitHandler, isValid]);

    // Allow adding skill with Enter, Comma, or Tab
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (['Enter', 'Tab', ','].includes(e.key)) {
            if (skillInput.trim()) {
                e.preventDefault();
                addSkill();
            }
        }
    };

    // Disable Add button if input is empty or duplicate
    const isAddDisabled = !skillInput.trim() || localSkills.includes(skillInput.trim());

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='mb-6 flex flex-col gap-4 rounded-lg border bg-white p-4 shadow-md'
            autoComplete='off'>
            <Box className='flex gap-2'>
                <TextField
                    className='w-72'
                    label='Skills'
                    variant='outlined'
                    value={skillInput}
                    inputRef={inputRef}
                    error={!!errors.skills}
                    helperText={errors.skills?.message?.toString()}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    aria-label='Add a skill'
                />
                <Tooltip title={isAddDisabled ? 'Enter a unique skill' : 'Add Skill'}>
                    <span className='flex items-center'>
                        <Button onClick={addSkill} disabled={isAddDisabled} type='button' aria-label='Add skill'>
                            Add
                        </Button>
                    </span>
                </Tooltip>
            </Box>

            <Stack direction='row' spacing={1} className='flex-wrap gap-y-3'>
                {localSkills.map((skill, index) => (
                    <Chip
                        key={index}
                        label={skill}
                        onDelete={() => handleDelete(skill)}
                        aria-label={`Remove skill ${skill}`}
                    />
                ))}
            </Stack>
        </form>
    );
}
