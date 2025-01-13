'use client';

import { useSkillsStore } from '@/store/useSkillsStore';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export default function SkillsForm() {
    const { skills, addSkill, removeSkill } = useSkillsStore();

    const handleAddSkill = (skill: string) => {
        if (skills.includes(skill)) return; // جلوگیری از افزودن مهارت تکراری
        addSkill(skill);
    };

    const handleDelete = (skill: string) => {
        removeSkill(skill);
    };

    return (
        <div className='flex flex-col gap-4'>
            {/* ****SKILLS***** */}
            <section>
                <Box component='form' sx={{ '& > :not(style)': { m: 1, width: '30ch' } }} noValidate autoComplete='off'>
                    <TextField
                        id='outlined-basic'
                        label='Skills'
                        variant='outlined'
                        onKeyDown={(e) => {
                            const input = e.target as HTMLInputElement;
                            if (e.key === 'Enter' && input.value.trim()) {
                                handleAddSkill(input.value.trim());
                                e.preventDefault();
                                input.value = '';
                            }
                        }}
                    />
                </Box>

                <Stack direction='row' spacing={1} className='flex-wrap gap-y-3'>
                    {skills.map((skill, index) => (
                        <Chip key={index} label={skill} onDelete={() => handleDelete(skill)} />
                    ))}
                </Stack>
            </section>
        </div>
    );
}
