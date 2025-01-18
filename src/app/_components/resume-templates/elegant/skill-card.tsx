import { SkillsFormType } from '../../forms/skills/skills-form-schema';

export default function SkillCard({ skills }: SkillsFormType) {
    if (!skills.length) return null;

    return (
        <div className='flex w-full flex-col gap-2'>
            <h2 className='text-lg font-semibold'>SKILLS</h2>
            <hr className='border' />

            <ul className='flex flex-wrap gap-2 text-sm'>
                {skills.map((skill, index) => (
                    <li key={index} className=''>
                        {skill}.
                    </li>
                ))}
            </ul>
        </div>
    );
}
