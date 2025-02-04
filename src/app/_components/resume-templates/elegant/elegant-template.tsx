'use client';

import { user_placeholder1 } from '@/assets/images';
import { useResumeStore } from '@/store/useResumeStore';
import { TemplateProps } from '@/types/template-props.types';

//resume-cards
import { DetailCard, EducationCard, ExperienceCard, LanguageCard, ProjectCard, SkillCard, SummaryCard } from '.';

export default function ElegantTemplate({
    details,
    skills,
    education,
    projects,
    experiences,
    summary,
    languages
}: TemplateProps) {
    const {
        summary: { avatar }
    } = useResumeStore();

    return (
        <div className='flex h-full'>
            <section className='flex w-2/3 flex-col gap-8 pl-12 pr-6 pt-16'>
                <DetailCard {...details} />
                <ExperienceCard {...experiences} />
                <ProjectCard {...projects} />
                <EducationCard {...education} />
            </section>

            <section className='flex w-1/3 flex-col gap-8 bg-[#22405c] px-6 pt-16 text-white'>
                <figure className='mx-auto flex justify-center overflow-hidden'>
                    <img
                        alt='user image'
                        src={typeof avatar === 'string' ? avatar : user_placeholder1.src}
                        className='size-32 rounded-full object-cover'
                    />
                </figure>
                <SummaryCard {...summary} />
                <SkillCard skills={skills} />
                <LanguageCard {...languages} />
            </section>
        </div>
    );
}
