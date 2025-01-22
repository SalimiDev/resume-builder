'use client';

import Image from 'next/image';

import { user_placeholder1 } from '@/assets/images';
import { useDetailsStore } from '@/store/useDetailsStore';
import { useEducationStore } from '@/store/useEducationStore';
import { useExperiencesStore } from '@/store/useExperiencesStore';
import { useLanguagesStore } from '@/store/useLanguagesStore';
import { useProjectsStore } from '@/store/useProjectsStore';
import { useSkillsStore } from '@/store/useSkillsStore';
import { useSummaryStore } from '@/store/useSummaryStore';

//resume-cards
import DetailCard from '../resume-templates/elegant/detail-card';
import EducationCard from '../resume-templates/elegant/education-card';
import ExperienceCard from '../resume-templates/elegant/experince-card';
import LanguageCard from '../resume-templates/elegant/language-card';
import ProjectCard from '../resume-templates/elegant/project-card';
import SkillCard from '../resume-templates/elegant/skill-card';
import SummaryCard from '../resume-templates/elegant/summary-card';

type ResumePreviewProps = {
    scale: number;
};

export default function ResumePreview({ scale }: ResumePreviewProps) {
    const { detailsStore } = useDetailsStore();
    const { skillsStore } = useSkillsStore();
    const { educationStore } = useEducationStore();
    const { ProjectsStore } = useProjectsStore();
    const { experiencesStore } = useExperiencesStore();
    const { summaryStore } = useSummaryStore();
    const { languagesStore } = useLanguagesStore();
    console.log('🚀 ~ ResumePreview ~ summaryStore:', summaryStore);

    console.log(skillsStore);

    return (
        <div
            className='border-gray-300 flex aspect-[1/1.414] h-[297mm] w-[210mm] overflow-auto border bg-white shadow-lg'
            style={{ transform: `scale(${scale})`, transformOrigin: 'top' }}>
            {/* =========Section Left ========== */}
            <section className='flex w-2/3 flex-col gap-8 pl-12 pr-6 pt-16'>
                {/* =========details ========== */}
                <DetailCard {...detailsStore} />
                {/* =========Experience ========== */}
                <ExperienceCard experiences={experiencesStore.experiences} />

                {/* =========Projects ========== */}
                <ProjectCard projects={ProjectsStore.projects} />

                {/* =========EDUCATION ========== */}
                <EducationCard education={educationStore.education} />
            </section>

            {/* =========Section Right ========== */}
            <section className='flex w-1/3 flex-col gap-8 bg-[#22405c] px-6 pt-16 text-white'>
                <figure className='flex w-full justify-center'>
                    <Image alt='user' src={user_placeholder1} width={120} />
                </figure>
                {/* **********SUMMARY**********   */}

                <SummaryCard summary={summaryStore.summary} />

                {/* **********SKILLS**********   */}
                <SkillCard skills={skillsStore} />
                {/* **********LANGUAGE**********   */}
                <LanguageCard languages={languagesStore.languages} />
            </section>
        </div>
    );
}
