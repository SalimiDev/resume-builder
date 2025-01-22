import { ExperienceFormType } from '../../forms/experiences/experiences-form-schema';
import '../../text-editor/text-editor.css';
import 'react-quill/dist/quill.snow.css';

export default function ExperienceCard({ experiences }: ExperienceFormType) {
    console.log('🚀 ~ ExperienceCard ~ experiences:', experiences);
    if (!experiences.length) return null;

    return (
        <div className='mt-2 flex w-full flex-col gap-2'>
            <h2 className='text-lg font-semibold'>EXPERIENCE</h2>
            <hr className='border text-base-content' />

            {experiences.map((experience, idx) => (
                <div key={idx}>
                    <div className='flex justify-between'>
                        <div>
                            <h3 className='font-semibold text-text-dark'>{experience.role}</h3>
                            <h3 className='font-semibold text-primary-content'>{experience.employer}</h3>
                        </div>
                        <div className='text-end text-text-dark'>
                            <div className='flex gap-1'>
                                <span>{experience.startDate}</span>
                                <span>{experience.endDate}</span>
                            </div>
                            <p>{experience.location}</p>
                        </div>
                    </div>

                    <div
                        className='ql-snow quill-content'
                        dangerouslySetInnerHTML={{ __html: experience.description || '' }}
                    />
                </div>
            ))}
        </div>
    );
}
