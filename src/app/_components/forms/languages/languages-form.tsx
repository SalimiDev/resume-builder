import { useEffect } from 'react';

import { useResumeStore } from '@/store/useResumeStore';
import languages from '@/utils/constants/language-list';
import { zodResolver } from '@hookform/resolvers/zod';
import { Add, Delete } from '@mui/icons-material';
import { Autocomplete, Box, Button, IconButton, Slider, TextField } from '@mui/material';

import { LanguageFormType, languageFormSchema } from './languages-form-schema';
import { useFieldArray, useForm } from 'react-hook-form';

const languageLevels = [
    { value: 0, label: 'Beginner' },
    { value: 25, label: 'Intermediate' },
    { value: 50, label: 'Upper intermediate' },
    { value: 75, label: 'Advanced' },
    { value: 100, label: 'Proficient' }
];

function valuetext(value: number) {
    return `${value}`;
}

interface LanguagesFormProps {
    setSubmitHandler?: (submitHandler: () => Promise<boolean>) => void;
}

export default function LanguagesForm({ setSubmitHandler }: LanguagesFormProps) {
    const {
        control,
        handleSubmit,
        register,
        setValue,
        watch,
        formState: { errors, isValid }
    } = useForm<LanguageFormType>({
        resolver: zodResolver(languageFormSchema),
        defaultValues: {
            languages: [
                {
                    language: 'English',
                    level: 0
                }
            ]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'languages'
    });

    const languageValues = watch('languages');

    const { setLanguages } = useResumeStore();
    const onSubmit = async (data: LanguageFormType) => {
        setLanguages(data);

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

    const isAddMoreDisabled = languageValues.some((field) => !field.language);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col gap-4'>
            {fields.map((field, index) => (
                <Box key={field.id} className='flex w-full flex-row items-center justify-between gap-5'>
                    <Box className='flex w-2/3 flex-col gap-4'>
                        <Autocomplete
                            options={languages}
                            value={languageValues[index]?.language || ''}
                            onChange={(event, newValue) => {
                                setValue(`languages.${index}.language`, newValue ?? '');
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Language'
                                    variant='outlined'
                                    {...register(`languages.${index}.language`)}
                                    error={!!errors.languages?.[index]?.language}
                                    helperText={errors.languages?.[index]?.language?.message}
                                />
                            )}
                            style={{ width: 300 }}
                        />

                        <Box className='pl-8'>
                            <Slider
                                aria-label='Language Level'
                                value={languageValues[index]?.level || 0}
                                onChange={(event, newValue) => {
                                    const numericValue = Array.isArray(newValue) ? newValue[0] : newValue;
                                    setValue(`languages.${index}.level`, numericValue);
                                }}
                                getAriaValueText={valuetext}
                                step={null}
                                marks={languageLevels}
                                min={0}
                                max={100}
                            />
                            {errors.languages?.[index]?.level && (
                                <span className='text-red-600'>{errors.languages[index].level?.message}</span>
                            )}
                        </Box>
                    </Box>

                    {index > 0 && (
                        <IconButton
                            onClick={() => remove(index)}
                            color='error'
                            aria-label='delete'
                            className='h-fit p-3'>
                            <Delete />
                        </IconButton>
                    )}
                </Box>
            ))}

            <Box className='mt-8 flex gap-2'>
                <Button
                    sx={{ width: 180 }}
                    variant='outlined'
                    startIcon={<Add />}
                    disabled={isAddMoreDisabled}
                    onClick={() => append({ language: '', level: 0 })}>
                    Add More
                </Button>
            </Box>
        </form>
    );
}
