'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Breadcrumb from '@/components/Breadcrumb';
import AiAssistant from '@/components/AiAssistant';
import styles from './Shell.module.css';

const pageNames: Record<string, string> = {
    '/': '대시보드',
    '/scenarios': '시나리오 관리',
    '/execution': '공격 실행',
    '/analysis': '취약점 분석',
    '/reports': '리포트',
    '/ai-redteaming': 'AI 레드티밍',
    '/prompt-lab': '프롬프트 실험실',
    '/ai-safety': 'AI 안전성 평가',
};

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const pageName = pageNames[pathname] || '현재 화면';

    return (
        <div className={styles.mainContainer}>
            <Sidebar />
            <div className={styles.contentWrapper}>
                <Header />
                <main className={styles.scrollArea}>
                    <Breadcrumb />
                    {children}
                </main>
            </div>
            <AiAssistant pageName={pageName} />
        </div>
    );
}
