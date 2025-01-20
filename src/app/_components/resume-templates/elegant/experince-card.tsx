import { ExperienceFormType } from '../../forms/experiences/experiences-form-schema';
import { Quill } from 'quill';

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

                    <div className='text-sm'>{experience.responsibilities}</div>
                </div>
            ))}
        </div>
    );
}

{
    /* <div>
                <div className='flex justify-between'>
                    <div>
                        <h3 className='font-semibold text-text-dark'>Frontend Developer</h3>
                        <h3 className='font-semibold text-primary-content'>PAYA</h3>
                    </div>
                    <div className='text-end text-text-dark'>
                        <span>06/2023 - Present</span>
                        <p>Tehran</p>
                    </div>
                </div>

                <div className='text-sm'>
                    <p>
                        As a Frontend Developer at Paya, my focus is on building management dashboards and creating
                        optimized interactive websites using modern technologies such as JavaScript, Next.js, React, and
                        Tailwind CSS. I collaborate with diverse teams to ensure the creation of beautiful and
                        responsive user interfaces, consistently aiming to provide an exceptional user experience.
                    </p>
                    <ul className='*:ml-5 *:list-disc'>
                        <li>
                            Utilized JavaScript, Next.js, and React to build interactive and visually appealing
                            management dashboards and websites.
                        </li>
                        <li>
                            Collaborated with cross-functional teams to ensure the seamless integration of design and
                            functionality.
                        </li>
                        <li>
                            Employed Tailwind CSS and responsive design principles to create visually stunning and
                            user-friendly interfaces.
                        </li>
                        <li>
                            Contributed to the optimization of web applications to enhance performance and user
                            experience.
                        </li>
                        <li>
                            Continuously enhanced my skills and knowledge to deliver high-quality work and stay updated
                            with the latest industry trends and best practices.
                        </li>
                    </ul>
                </div>
            </div> */
}
