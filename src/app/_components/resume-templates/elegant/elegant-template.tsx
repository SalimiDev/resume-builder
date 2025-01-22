'use client';

import Image from 'next/image';

import { user_placeholder1 } from '@/assets/images';
import {
    useDetailsStore,
    useEducationStore,
    useExperiencesStore,
    useLanguagesStore,
    useProjectsStore,
    useSkillsStore,
    useSummaryStore
} from '@/store';

//resume-cards
import { DetailCard, EducationCard, ExperienceCard, LanguageCard, ProjectCard, SkillCard, SummaryCard } from '.';

type ResumePreviewProps = {
    scale: number;
};

export default function ElegantTemplate({ scale }: ResumePreviewProps) {
    const { detailsStore } = useDetailsStore();
    const { skillsStore } = useSkillsStore();
    const { educationStore } = useEducationStore();
    const { ProjectsStore } = useProjectsStore();
    const { experiencesStore } = useExperiencesStore();
    const { summaryStore } = useSummaryStore();
    const { languagesStore } = useLanguagesStore();

    return (
        <div
            className='border-gray-300 flex aspect-[1/1.414] h-[297mm] w-[210mm] overflow-auto border bg-white shadow-lg'
            style={{ transform: `scale(${scale})`, transformOrigin: 'top' }}>
            <section className='flex w-2/3 flex-col gap-8 pl-12 pr-6 pt-16'>
                <DetailCard {...detailsStore} />
                <ExperienceCard experiences={experiencesStore.experiences} />
                <ProjectCard projects={ProjectsStore.projects} />
                <EducationCard education={educationStore.education} />
            </section>

            <section className='flex w-1/3 flex-col gap-8 bg-[#22405c] px-6 pt-16 text-white'>
                <figure className='flex w-full justify-center'>
                    <Image alt='user' src={user_placeholder1} width={120} />
                </figure>
                <SummaryCard summary={summaryStore.summary} />
                <SkillCard skills={skillsStore} />
                <LanguageCard languages={languagesStore.languages} />
            </section>
        </div>
    );
}
