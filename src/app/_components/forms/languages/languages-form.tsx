import { useLanguagesStore } from '@/store/useLanguagesStore';
import languages from '@/utils/constants/language-list';
import { zodResolver } from '@hookform/resolvers/zod';
import { Add, Delete } from '@mui/icons-material';
import { Autocomplete, Box, Button, IconButton, Slider, TextField } from '@mui/material';

import { LanguageFormType, languageFormSchema } from './languages-form-schema';
import { useFieldArray, useForm } from 'react-hook-form';

const languageLevels = [
    { value: 0, label: 'Beginner' },
    { value: 25, label: 'Elementary' },
    { value: 50, label: 'Intermediate' },
    { value: 75, label: 'Upper intermediate' },
    { value: 100, label: 'Advanced' }
];

function valuetext(value: number) {
    return `${value}`;
}

export default function LanguagesForm() {
    const {
        control,
        handleSubmit,
        register,
        setValue,
        watch,
        formState: { errors }
    } = useForm<LanguageFormType>({
        resolver: zodResolver(languageFormSchema),
        defaultValues: {
            languages: [
                {
                    language: '',
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

    const { setLanguagesStore, languagesStore } = useLanguagesStore();
    console.log(languagesStore);
    const onSubmit = (data: LanguageFormType) => {
        console.log('Form Data:', data);
        setLanguagesStore(data);
    };

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
                    onClick={() => append({ language: '', level: 0 })}>
                    Add More
                </Button>

                <Button variant='contained' type='submit'>
                    Submit
                </Button>
            </Box>
        </form>
    );
}
