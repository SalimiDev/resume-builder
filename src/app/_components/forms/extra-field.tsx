'use client';

import { useId } from 'react';

import { Add, CloudUpload, Delete, LinkOff } from '@mui/icons-material';
import LinkIcon from '@mui/icons-material/Link';
import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Controller, useFieldArray, useWatch } from 'react-hook-form';
import type { ArrayPath, Control, FieldArray, FieldValues, Path, UseFieldArrayAppend } from 'react-hook-form';

interface ExtraFieldProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    name: ArrayPath<TFieldValues>;
}

interface ExtraFieldType {
    id: string;
    value: string;
    icon: string | null;
    isLink: boolean;
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
});

export default function ExtraField<TFieldValues extends FieldValues>({ control, name }: ExtraFieldProps<TFieldValues>) {
    const id = useId();
    const { fields, append, remove, update } = useFieldArray({
        control,
        name
    });

    const watchedFields = useWatch({
        control,
        name: name as Path<TFieldValues>
    });
    console.log('🚀 ~ watchedFields:', watchedFields);

    const safeAppend: UseFieldArrayAppend<TFieldValues, typeof name> = append;

    return (
        <div className='space-y-3'>
            <p className='my-2 font-semibold'>Extra Field</p>

            {fields.map((field, index) => {
                const isLink = watchedFields[index]?.isLink ?? false;

                return (
                    <div key={field.id} className='flex items-center gap-4'>
                        <Box className='flex flex-grow'>
                            <Controller
                                name={`${name}.${index}.value` as Path<TFieldValues>}
                                control={control}
                                render={({ field: urlField, fieldState: { error } }) => (
                                    <TextField
                                        label={isLink ? 'URL' : 'Text'}
                                        fullWidth
                                        {...urlField}
                                        error={!!error}
                                        helperText={error?.message}
                                        type={isLink ? 'url' : 'text'}
                                    />
                                )}
                            />

                            <Tooltip title={isLink ? 'Disable link' : 'Enable link'}>
                                <IconButton
                                    color={isLink ? 'primary' : 'default'}
                                    onClick={() => {
                                        update(index, {
                                            ...fields[index],
                                            isLink: !isLink
                                        });
                                    }}>
                                    {isLink ? <LinkIcon /> : <LinkOff />}
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <Controller
                            name={`${name}.${index}.icon` as Path<TFieldValues>}
                            control={control}
                            render={({ field: iconField }) => (
                                <Button
                                    component='label'
                                    // role={undefined}
                                    variant='contained'
                                    // tabIndex={-1}
                                    startIcon={<CloudUpload />}>
                                    Upload icon
                                    <VisuallyHiddenInput
                                        type='file'
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    iconField.onChange(reader.result as string);
                                                };
                                                reader.readAsDataURL(file);
                                            } else {
                                                iconField.onChange(null);
                                            }
                                        }}
                                        // multiple
                                    />
                                </Button>
                            )}
                        />

                        <IconButton color='error' onClick={() => remove(index)} aria-label='delete-link'>
                            <Delete />
                        </IconButton>
                    </div>
                );
            })}

            <Button
                startIcon={<Add />}
                variant='outlined'
                onClick={() =>
                    safeAppend({
                        id,
                        value: '',
                        icon: null,
                        isLink: true
                    } as FieldArray<TFieldValues, typeof name>)
                }>
                New Field
            </Button>
        </div>
    );
}
