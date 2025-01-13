import { useState } from 'react';

import languages from '@/utils/constants/language-list';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';

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
    const [languageData, setLanguageData] = useState<{ language: string; level: number }[]>([
        { language: '', level: 0 }
    ]);
    const [isNewLanguage, setIsNewLanguage] = useState(false);

    const handleLanguageChange = (index: number, newValue: string) => {
        const updatedData = [...languageData];
        updatedData[index].language = newValue;
        setLanguageData(updatedData);
        setIsNewLanguage(true);
    };

    const handleLevelChange = (index: number, newValue: number) => {
        const updatedData = [...languageData];
        updatedData[index].level = newValue;
        setLanguageData(updatedData);
    };

    const addNewLanguage = () => {
        setLanguageData([...languageData, { language: '', level: 0 }]);
    };

    console.log(languageData);

    return (
        <section className='w-full'>
            <Box className='flex w-full flex-col gap-4' component='form' noValidate autoComplete='off'>
                {languageData.map((entry, index) => (
                    <Box key={index} className='flex w-full flex-col gap-5'>
                        <Autocomplete
                            options={languages}
                            value={entry.language}
                            onChange={(event, newValue) => handleLanguageChange(index, newValue || '')}
                            renderInput={(params) => <TextField {...params} label='Language' variant='outlined' />}
                            style={{ width: 300 }}
                        />

                        <div className='w-2/3 pl-8'>
                            <Slider
                                aria-label='Language Level'
                                value={entry.level}
                                getAriaValueText={valuetext}
                                step={null}
                                marks={languageLevels}
                                onChange={(e, newValue) => handleLevelChange(index, newValue as number)}
                                disabled={!isNewLanguage}
                            />
                        </div>
                    </Box>
                ))}

                <Button
                    sx={{ width: 180 }}
                    variant='outlined'
                    startIcon={<AddIcon />}
                    onClick={addNewLanguage}
                    disabled={!isNewLanguage}>
                    Add Language
                </Button>
            </Box>
        </section>
    );
}
