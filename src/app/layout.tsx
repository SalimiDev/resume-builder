'use client';

import { useEffect } from 'react';

import { initializeResumeDataSync } from '@/store/useResumeDataStore';

import { Header } from './_components/header';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        initializeResumeDataSync();
    }, []);

    return (
        <html lang='en' dir='ltr' suppressHydrationWarning>
            <body className={`flex h-screen flex-col`}>
                <header className='h-14 flex-shrink-0'>
                    <Header />
                </header>
                <main className='min-h-[calc(100vh-56px)] flex-1'>{children}</main>
            </body>
        </html>
    );
}
