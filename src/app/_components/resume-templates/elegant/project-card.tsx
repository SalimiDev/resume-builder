import { ProjectsFormType } from '../../forms/projects/projects-form-schema';
import '../../text-editor/text-editor.css';
import 'react-quill/dist/quill.snow.css';

export default function ProjectCard({ projects }: ProjectsFormType) {
    if (!projects.length) return null;

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
                        <div
                            className='ql-snow quill-content'
                            dangerouslySetInnerHTML={{ __html: project.description || '' }}
                        />

                        {project.extraFields?.map(({ id, icon, isLink, value }) => (
                            <div key={id} className='mt-2 flex gap-1'>
                                {icon && <img src={icon} alt='icon' className='size-5' />}

                                {isLink ? <a href={value}>{value}</a> : <p>{value}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
