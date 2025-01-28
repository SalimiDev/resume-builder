import Rating from '@mui/material/Rating';

import { LanguageFormType } from '../../forms/languages/languages-form-schema';

export default function LanguageCard({ languages }: LanguageFormType) {
    if (!languages.length) return null;

    enum LanguageLevel {
        Beginner = 0,
        Intermediate = 25,
        UpperIntermediate = 50,
        Advanced = 75,
        Proficient = 100
    }

    return (
        <div className='flex w-full flex-col gap-2 overflow-hidden'>
            <h2 className='text-lg font-semibold'>LANGUAGES</h2>
            <hr className='border' />

            {languages.map((language, idx) => (
                <div key={idx} className='flex items-center justify-between'>
                    <div>
                        <h5>{language.language}</h5>
                        <p className='text-xs'>{LanguageLevel[language.level]}</p>
                    </div>
                    <Rating
                        className='size-5 text-xs'
                        color='primary'
                        name='text-feedback'
                        value={language.level / 25 + 1}
                        icon={<span className='text-text-light'>●</span>}
                        readOnly
                        emptyIcon={<span className='text-text-light opacity-40'>●</span>}
                    />
                </div>
            ))}
        </div>
    );
}
