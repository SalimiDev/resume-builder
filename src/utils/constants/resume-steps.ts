import { ResumeStepsType } from '@/types/resume-steps.interface';
import { BusinessCenter, Engineering, ManageAccounts, School, WorkspacePremium } from '@mui/icons-material';

export const resumeSteps: ResumeStepsType[] = [
    {
        title: 'Details',
        description: 'Provide your personal and contact information.',
        key: 'details',
        icon: ManageAccounts
    },
    {
        title: 'Summary',
        description: 'Write about yourself..',
        key: 'summary',
        icon: ManageAccounts
    },
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
    },
    {
        title: 'Experiences',
        description: 'Showcase your work history and achievements.',
        key: 'experiences',
        icon: WorkspacePremium
    },
    {
        title: 'Projects',
        description: 'Present your key projects and contributions.',
        key: 'projects',
        icon: BusinessCenter
    },
    {
        title: 'Educations',
        description: 'Detail your educational background.',
        key: 'educations',
        icon: School
    }
];
