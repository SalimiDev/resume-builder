import { ResumeSectionType } from '@/types/resume-section.interface';
import { BusinessCenter, Engineering, ManageAccounts, School, WorkspacePremium } from '@mui/icons-material';

export const resumeSections: ResumeSectionType[] = [
    // {
    //     title: 'Details',
    //     description: 'Provide your personal and contact information.',
    //     key: 'details',
    //     icon: ManageAccounts
    // },
    {
        title: 'Skills',
        description: 'Highlight your skills and expertise.',
        key: 'skills',
        icon: Engineering
    },
    {
        title: 'Languages',
        description: 'Include your native language and additional languages you speak.',
        key: 'languages',
        icon: Engineering
    }
    // {
    //     title: 'Experiences',
    //     description: 'Showcase your work history and achievements.',
    //     key: 'experiences',
    //     icon: WorkspacePremium
    // },
    // {
    //     title: 'Projects',
    //     description: 'Present your key projects and contributions.',
    //     key: 'projects',
    //     icon: BusinessCenter
    // },
    // {
    //     title: 'Education',
    //     description: 'Detail your educational background.',
    //     key: 'education',
    //     icon: School
    // }
];
