import { zodResolver } from '@hookform/resolvers/zod';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, MenuItem, TextField } from '@mui/material';

import { EducationFormType, educationFormSchema } from './educations-form-schema';
// eslint-disable-next-line import/named
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

const degrees = ['High School', 'Bachelor', 'Master', 'PhD'];

export default function EducationsForm() {
    const {
        control,
        handleSubmit,
        register,
        watch,
        formState: { errors }
    } = useForm<EducationFormType>({
        resolver: zodResolver(educationFormSchema),
        defaultValues: {
            education: [
                {
                    degree: '',
                    schoolName: '',
                    schoolLocation: '',
                    graduationDate: ''
                }
            ]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'education'
    });

    const educationValues = watch('education');

    const isAddMoreDisabled = educationValues.some(
        (field) => !field.degree || !field.schoolName || !field.schoolLocation || !field.graduationDate
    );

    const onSubmit: SubmitHandler<EducationFormType> = (data) => {
        console.log('Submitted Data:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8'>
            {fields.map((field, index) => (
                <Box key={field.id} className='flex flex-col gap-4'>
                    <Box className='flex gap-2 *:w-1/2'>
                        <TextField
                            select
                            label='Degree'
                            error={!!errors.education?.[index]?.degree}
                            helperText={errors.education?.[index]?.degree?.message}
                            {...register(`education.${index}.degree`)}>
                            {degrees.map((degree) => (
                                <MenuItem key={degree} value={degree}>
                                    {degree}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label='School Name'
                            error={!!errors.education?.[index]?.schoolName}
                            helperText={errors.education?.[index]?.schoolName?.message}
                            {...register(`education.${index}.schoolName`)}
                        />
                    </Box>

                    <Box className='flex gap-2 *:w-1/2'>
                        <TextField
                            label='School Location'
                            error={!!errors.education?.[index]?.schoolLocation}
                            helperText={errors.education?.[index]?.schoolLocation?.message}
                            {...register(`education.${index}.schoolLocation`)}
                        />

                        <TextField
                            label='Graduation Date'
                            type='date'
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.education?.[index]?.graduationDate}
                            helperText={errors.education?.[index]?.graduationDate?.message}
                            {...register(`education.${index}.graduationDate`)}
                        />
                    </Box>

                    {index > 0 && (
                        <Button
                            type='button'
                            startIcon={<DeleteIcon />}
                            onClick={() => remove(index)}
                            variant='outlined'
                            color='error'
                            aria-label='delete'
                            className='mx-auto flex w-36'>
                            Delete
                        </Button>
                    )}
                </Box>
            ))}

            <Box className='flex gap-4'>
                <Button
                    startIcon={<AddIcon />}
                    type='button'
                    variant='outlined'
                    onClick={() =>
                        append({
                            degree: '',
                            schoolName: '',
                            schoolLocation: '',
                            graduationDate: ''
                        })
                    }
                    disabled={isAddMoreDisabled}>
                    Add More
                </Button>

                <Button type='submit' variant='contained' color='primary'>
                    Submit
                </Button>
            </Box>
        </form>
    );
}
