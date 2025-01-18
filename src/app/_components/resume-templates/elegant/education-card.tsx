import { EducationFormType } from '../../forms/educations/educations-form-schema';

export default function EducationCard({ education }: EducationFormType) {
    if (!education.length) return null;

    return (
        <div className='mt-2 flex w-full flex-col gap-2'>
            <h2 className='text-lg font-semibold'>EDUCATION</h2>
            <hr className='border text-base-content' />

            {education.map((edu, idx) => (
                <div key={idx} className='flex justify-between'>
                    <div>
                        <h3 className='font-semibold text-text-dark'>{edu.degree}</h3>
                        <h3 className='font-semibold capitalize text-primary-content'>{edu.schoolName}</h3>
                    </div>
                    <div className='text-end text-text-dark'>
                        <span>{edu.graduationDate}</span>
                        <p className='capitalize'>{edu.schoolLocation}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
