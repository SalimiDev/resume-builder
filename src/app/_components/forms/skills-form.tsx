import { useState } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

type SkillsFormProps = {
    updateData: (data: string[]) => void;
    initialData: string[];
};

export default function SkillsForm({ updateData }: SkillsFormProps) {
    const [skills, setSkills] = useState<string[]>([]);

    const handleAddSkill = (skill: string) => {
        const updatedSkills = [...skills, skill];
        setSkills(updatedSkills);
        updateData(updatedSkills);
    };

    const handleDelete = (skill: string) => {
        const updatedSkills = skills.filter((chip) => chip !== skill);
        setSkills(updatedSkills);
    };

    return (
        <div className='flex flex-col gap-4'>
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
        </div>
    );
}
