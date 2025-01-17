import { useDetailsStore } from '@/store/useDetailsStore';
import { zodResolver } from '@hookform/resolvers/zod';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import { DetailsFormType, detailsFormSchema } from './details-form-schema';
// eslint-disable-next-line import/named
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

export default function DetailsForm() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<DetailsFormType>({
        resolver: zodResolver(detailsFormSchema),
        defaultValues: {
            additionalFields: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'additionalFields'
    });

    const { setDetailsStore, detailsStore } = useDetailsStore();
    console.log(detailsStore);
    const onSubmit: SubmitHandler<DetailsFormType> = (data) => {
        console.log('Form Submitted:', data);
        setDetailsStore(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='mb-6 flex flex-col gap-4 rounded-lg border bg-white p-4 shadow-md'>
            <Box className='flex gap-2 *:w-1/2'>
                <TextField
                    label='Name'
                    variant='outlined'
                    {...register('name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />

                <TextField
                    label='Last Name'
                    variant='outlined'
                    {...register('lastName')}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                />
            </Box>

            <Box className='flex gap-2 *:w-1/2'>
                <TextField
                    label='Email'
                    variant='outlined'
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField
                    label='Phone Number'
                    variant='outlined'
                    {...register('phoneNumber')}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                />
            </Box>

            <Box className='flex gap-2 *:w-1/2'>
                <TextField
                    label='Location'
                    variant='outlined'
                    {...register('location')}
                    error={!!errors.location}
                    helperText={errors.location?.message}
                />

                <TextField
                    label='GitHub'
                    variant='outlined'
                    {...register('github')}
                    error={!!errors.github}
                    helperText={errors.github?.message}
                />
            </Box>

            <TextField
                label='Summary'
                variant='outlined'
                multiline
                rows={8}
                {...register('summary')}
                error={!!errors.summary}
                helperText={errors.summary?.message}
            />

            {/* مدیریت فیلدهای اضافی */}
            {fields.map((field, index) => (
                <Box key={field.id} className='flex items-center gap-2'>
                    <TextField
                        className='w-1/2'
                        label={`Additional Field ${index + 1}`}
                        variant='outlined'
                        {...register(`additionalFields.${index}.value` as const)}
                        error={!!errors.additionalFields && !!errors.additionalFields[index]?.value}
                        helperText={errors.additionalFields && errors.additionalFields[index]?.value?.message}
                    />
                    <IconButton color='error' onClick={() => remove(index)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}

            {/* دکمه اضافه کردن فیلد */}
            <div className='flex gap-4'>
                <Button
                    startIcon={<AddIcon />}
                    variant='outlined'
                    onClick={() => append({ id: fields.length + 1, value: '' })}>
                    Add More
                </Button>

                <Button variant='contained' type='submit'>
                    Submit
                </Button>
            </div>
        </form>
    );
}
