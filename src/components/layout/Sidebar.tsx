'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Bomb, Terminal, Activity, FileText, Settings, Shield, BookOpen, Building, ScrollText, WifiOff, CheckSquare, Database, ShieldCheck, HeartPulse, Brain, MessageSquare, Gauge, Target, Package, HelpCircle, BarChart3, Map } from 'lucide-react';
import styles from './Sidebar.module.css';

const menuItems = [
    { label: '대시보드', icon: LayoutDashboard, href: '/' },
    { label: '시나리오 관리', icon: Bomb, href: '/scenarios' },
    { label: '공격 실행', icon: Terminal, href: '/execution' },
    { label: '취약점 분석', icon: Activity, href: '/analysis' },
    { label: '리포트', icon: FileText, href: '/reports' },
    { label: '공격 지식베이스', icon: BookOpen, href: '/knowledge-base' },
    { label: '정책 관리', icon: Shield, href: '/policies' },
    { label: '설정', icon: Settings, href: '/settings' },
    { label: '도움말', icon: HelpCircle, href: '/help' },
];

const aiItems = [
    { label: 'AI 레드티밍', icon: Brain, href: '/ai-redteaming' },
    { label: '공격 엔진', icon: Target, href: '/ai-redteaming/attack-engine' },
    { label: '프롬프트 실험실', icon: MessageSquare, href: '/prompt-lab' },
    { label: 'AI 안전성 평가', icon: Gauge, href: '/ai-safety' },
];

const adminItems = [
    { label: '실행 승인', icon: CheckSquare, href: '/admin/approvals' },
    { label: '테넌트 관리', icon: Building, href: '/admin/tenants' },
    { label: '사이트 맵', icon: Map, href: '/sitemap-view' },
    { label: 'ERD/데이터 모델', icon: Database, href: '/admin/erd' },
    { label: 'API 문서', icon: FileText, href: '/admin/api-docs' },
    { label: '테스트 현황', icon: Activity, href: '/admin/tests' },
    { label: 'SLA/성능', icon: BarChart3, href: '/admin/sla' },
    { label: '시드데이터', icon: Database, href: '/admin/seed-data' },
    { label: '배포 관리', icon: Package, href: '/admin/deployment' },
    { label: '규정 준수', icon: ShieldCheck, href: '/admin/compliance' },
    { label: '감사 로그', icon: ScrollText, href: '/admin/audit-logs' },
    { label: '오프라인 설정', icon: WifiOff, href: '/admin/offline' },
    { label: '시스템 상태', icon: HeartPulse, href: '/admin/system-health' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logoArea}>
                <div className={styles.logoText}>RedTeam OS</div>
            </div>

            <nav className={styles.nav}>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                        >
                            <Icon className={styles.icon} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}

                {/* AI Red Teaming Section */}
                <div style={{ borderTop: '1px solid var(--border-subtle)', margin: '16px 0', paddingTop: 16 }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Red Teaming</div>
                    {aiItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                            >
                                <Icon className={styles.icon} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Admin Section Divider */}
                <div style={{ borderTop: '1px solid var(--border-subtle)', margin: '16px 0', paddingTop: 16 }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Administration</div>
                    {adminItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                            >
                                <Icon className={styles.icon} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <div className={styles.footer}>
                {/* User profile or status could go here */}
            </div>
        </aside>
    );
}
