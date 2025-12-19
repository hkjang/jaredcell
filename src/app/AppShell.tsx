'use client';

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import styles from './Shell.module.css';

export default function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.mainContainer}>
            <Sidebar />
            <div className={styles.contentWrapper}>
                <Header />
                <main className={styles.scrollArea}>
                    {children}
                </main>
            </div>
        </div>
    );
}
