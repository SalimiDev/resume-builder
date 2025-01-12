'use client';

import Image from 'next/image';

import { user_placeholder1 } from '@/assets/images';
import { AlternateEmail, GitHub, LocationOn, OpenInNew, Phone } from '@mui/icons-material';

type ResumePreviewProps = {
    scale: number;
};

export default function ResumePreview({ scale }: ResumePreviewProps) {
    return (
        <div
            className='border-gray-300 flex aspect-[1/1.414] h-[297mm] w-[210mm] overflow-auto border bg-white shadow-lg'
            style={{ transform: `scale(${scale})`, transformOrigin: 'top' }}>
            {/* =========Section Left ========== */}
            <section className='flex w-2/3 flex-col gap-8 pl-12 pr-6 pt-16'>
                {/* =========details ========== */}
                <div className='flex flex-col gap-2'>
                    <div>
                        <h1 className='text-3xl font-bold'>MEHDI SALIMI</h1>
                        <h3 className='text-lg text-primary-content'>Frontend Developer</h3>
                    </div>

                    <div className='text-sm'>
                        <div className='flex gap-4 *:flex *:items-center *:gap-1'>
                            <div>
                                <Phone fontSize='small' className='text-base-25' />
                                <a href='tel:+989370938781'>+989370938781</a>
                            </div>

                            <div>
                                <AlternateEmail fontSize='small' className='text-base-25' />
                                <a href='mailto:salimi.devop@gmail.com'>Salimi.devop@gmail.com</a>
                            </div>
                        </div>

                        <div className='flex gap-4 *:flex *:items-center *:gap-1'>
                            <div>
                                <GitHub fontSize='small' className='text-base-25' />
                                <a href='https://github.com/SalimiDev'>https://github.com/SalimiDev</a>
                            </div>
                            <div>
                                <LocationOn fontSize='small' className='text-base-25' />
                                <p>Tehran</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =========Experience ========== */}
                <div className='mt-2 flex w-full flex-col gap-2'>
                    <h2 className='text-lg font-semibold'>EXPERIENCE</h2>
                    <hr className='border text-base-content' />

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
                            optimized interactive websites using modern technologies such as JavaScript, Next.js, React,
                            and Tailwind CSS. I collaborate with diverse teams to ensure the creation of beautiful and
                            responsive user interfaces, consistently aiming to provide an exceptional user experience.
                        </p>
                        <ul className='*:ml-5 *:list-disc'>
                            <li>
                                Utilized JavaScript, Next.js, and React to build interactive and visually appealing
                                management dashboards and websites.
                            </li>
                            <li>
                                Collaborated with cross-functional teams to ensure the seamless integration of design
                                and functionality.
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
                                Continuously enhanced my skills and knowledge to deliver high-quality work and stay
                                updated with the latest industry trends and best practices.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* =========Projects ========== */}
                <div className='flex w-full flex-col gap-2'>
                    <h2 className='text-lg font-semibold'>PROJECTS</h2>
                    <hr className='border text-base-content' />

                    <div className='flex justify-between text-text-dark'>
                        <h3 className='font-semibold'>Hillter Hotel</h3>
                        <span className=' '>09/2022 - 12/2022</span>
                    </div>

                    <div className='text-sm'>
                        <p>
                            Hillter Hotel is a cleanly designed website built for a hotel. I created the Figma design
                            and implemented the site using React, focusing on delivering a polished, user-friendly
                            experience.
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

                {/* =========Experience ========== */}
                <div className='mt-2 flex w-full flex-col gap-2'>
                    <h2 className='text-lg font-semibold'>EDUCATION</h2>
                    <hr className='border text-base-content' />

                    <div className='flex justify-between'>
                        <div>
                            <h3 className='font-semibold text-text-dark'>Master&apos;s degree</h3>
                            <h3 className='font-semibold text-primary-content'>Islamic Azad University</h3>
                        </div>
                        <div className='text-end text-text-dark'>
                            <span>06/2023 - Present</span>
                            <p>Tehran</p>
                        </div>
                    </div>
                </div>
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

                <div className='flex w-full flex-col gap-2'>
                    <h2 className='text-lg font-semibold'>SKILLS</h2>
                    <hr className='border' />
                    <ul className='flex flex-wrap gap-1 text-sm'>
                        <li>JavaScript (ES6+)</li>.<li>React.js</li>.<li>Next.js</li>.<li>TypeScript</li>.<li>Redux</li>
                        .<li>Zustand</li>.<li>React Query</li>.<li>GraphQL</li>.<li>REST API</li>.<li>Tailwind CSS</li>.
                        <li>Material UI</li>.<li>Responsive Design</li>.<li>Git / GitHub</li>.<li>HTML5</li>.
                        <li>CSS3</li>
                    </ul>
                </div>

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
