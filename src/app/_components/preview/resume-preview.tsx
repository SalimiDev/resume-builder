'use client';

import Image from 'next/image';

import { user_placeholder1 } from '@/assets/images';
import { useDetailsStore } from '@/store/useDetailsStore';
import { useEducationStore } from '@/store/useEducationStore';
import { useExperiencesStore } from '@/store/useExperiencesStore';
import { useProjectsStore } from '@/store/useProjectsStore';
import { useSkillsStore } from '@/store/useSkillsStore';

//resume-cards
import DetailCard from '../resume-templates/elegant/detail-card';
import EducationCard from '../resume-templates/elegant/education-card';
import ExperienceCard from '../resume-templates/elegant/experince-card';
import ProjectCard from '../resume-templates/elegant/project-card';
import SkillCard from '../resume-templates/elegant/skill-card';

type ResumePreviewProps = {
    scale: number;
};

export default function ResumePreview({ scale }: ResumePreviewProps) {
    const { detailsStore } = useDetailsStore();
    const { skillsStore } = useSkillsStore();
    const { educationStore } = useEducationStore();
    const { ProjectsStore } = useProjectsStore();
    const { experiencesStore } = useExperiencesStore();

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
                {/* <EducationCard education={educationStore?.education ?? []} /> */}
            </section>

            {/* =========Section Right ========== */}
            <section className='flex w-1/3 flex-col gap-8 bg-[#22405c] px-6 pt-16 text-white'>
                <figure className='flex w-full justify-center'>
                    <Image alt='user' src={user_placeholder1} width={120} />
                </figure>

                <div className='flex w-full flex-col gap-2'>
                    <h2 className='text-lg font-semibold'>SUMMARY</h2>
                    <hr className='border' />
                    <p className='text-sm'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio ullam iusto, eaque accusamus
                        molestiae mollitia quia sit ab maiores laboriosam expedita obcaecati voluptas. Ducimus commodi
                        nemo a voluptate ad provident, cum, doloribus quae quammaiores laboriosam expedita obcaecati
                        obcaecati voluptatibus molestias ullam ipsa placeat!
                    </p>
                </div>

                {/* **********SKILLS**********   */}
                <SkillCard skills={skillsStore} />

                <div className='flex w-full flex-col gap-2'>
                    <h2 className='text-lg font-semibold'>LANGUAGES</h2>
                    <hr className='border' />
                    <div className='flex items-center justify-between'>
                        <div>
                            <h5>English</h5>
                            <p className='text-xs'>Upper intermediate</p>
                        </div>
                        <span className='text-xs'>000000</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
