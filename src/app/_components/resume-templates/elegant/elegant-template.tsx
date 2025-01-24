'use client';

import Image from 'next/image';

import { user_placeholder1 } from '@/assets/images';
import { TemplateProps } from '@/types/templates-props.types';

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
    return (
        <div className='flex h-full'>
            <section className='flex w-2/3 flex-col gap-8 pl-12 pr-6 pt-16'>
                <DetailCard {...details} />
                <ExperienceCard {...experiences} />
                <ProjectCard {...projects} />
                <EducationCard {...education} />
            </section>

            <section className='flex w-1/3 flex-col gap-8 bg-[#22405c] px-6 pt-16 text-white'>
                <figure className='flex w-full justify-center'>
                    <Image alt='user' src={user_placeholder1} width={120} />
                </figure>
                <SummaryCard {...summary} />
                <SkillCard skills={skills} />
                <LanguageCard {...languages} />
            </section>
        </div>
    );
}
