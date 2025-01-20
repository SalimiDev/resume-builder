import { GitHub, OpenInNew } from '@mui/icons-material';

import { ProjectsFormType } from '../../forms/projects/projects-form-schema';

export default function ProjectCard({ projects }: ProjectsFormType) {
    // if (!projects.length) return null;

    console.log('projectscard', projects);

    return (
        <div className='flex w-full flex-col gap-2'>
            <h2 className='text-lg font-semibold'>PROJECTS</h2>
            <hr className='border text-base-content' />

            {projects.map((project, idx) => (
                <div key={idx}>
                    <div className='flex justify-between text-text-dark'>
                        <h3 className='font-semibold'>{project.projectName}</h3>
                        <div className='flex'>
                            <span className=' '>{project.startDate} </span>
                            <span className=' '>{project.endDate}</span>
                        </div>
                    </div>

                    <div className='text-sm'>
                        <p>{project.description}</p>

                        {project.externalLinks?.map((link, index) => (
                            <div key={index} className='mt-2 flex gap-1'>
                                <img src={link.icon} alt='icon' className='size-6' />
                                {/* <label htmlFor='' className='font-semibold'>
                                    Figma:
                                </label> */}
                                <a href={link.url}>{link.url}</a>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div>
                <div className='flex justify-between text-text-dark'>
                    <h3 className='font-semibold'>Hillter Hotel</h3>
                    <span className=' '>09/2022 - 12/2022</span>
                </div>

                <div className='text-sm'>
                    <p>
                        Hillter Hotel is a cleanly designed website built for a hotel. I created the Figma design and
                        implemented the site using React, focusing on delivering a polished, user-friendly experience.
                    </p>
                    <div className='mt-2 flex gap-1'>
                        <OpenInNew fontSize='small' className='text-base-25' />
                        <label htmlFor='' className='font-semibold'>
                            Figma:
                        </label>
                        <a href='https://shorturl.at/YLmQI'>https://shorturl.at/YLmQI</a>
                    </div>

                    <div className='mt-2 flex gap-1'>
                        <GitHub fontSize='small' className='text-base-25' />
                        <label htmlFor='' className='font-semibold'>
                            GitHub:
                        </label>
                        <a href='https://shorturl.at/YLmQI'>https://github.com/SalimiDev/Hotel-ReactJsApp</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
