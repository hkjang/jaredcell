'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Bomb, Terminal, Activity, FileText, Settings, Shield, BookOpen, Building, ScrollText, WifiOff, CheckSquare, Database, ShieldCheck, HeartPulse, Brain, MessageSquare, Gauge } from 'lucide-react';
import styles from './Sidebar.module.css';

const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { label: 'Scenarios', icon: Bomb, href: '/scenarios' },
    { label: 'Execution', icon: Terminal, href: '/execution' },
    { label: 'Analysis', icon: Activity, href: '/analysis' },
    { label: 'Reports', icon: FileText, href: '/reports' },
    { label: 'Knowledge Base', icon: BookOpen, href: '/knowledge-base' },
    { label: 'Policies', icon: Shield, href: '/policies' },
    { label: 'Settings', icon: Settings, href: '/settings' },
];

const aiItems = [
    { label: 'AI Red Teaming', icon: Brain, href: '/ai-redteaming' },
    { label: 'Prompt Lab', icon: MessageSquare, href: '/prompt-lab' },
    { label: 'AI Safety', icon: Gauge, href: '/ai-safety' },
];

const adminItems = [
    { label: 'Approvals', icon: CheckSquare, href: '/admin/approvals' },
    { label: 'Tenants', icon: Building, href: '/admin/tenants' },
    { label: 'Compliance', icon: ShieldCheck, href: '/admin/compliance' },
    { label: 'Data Lifecycle', icon: Database, href: '/admin/data-lifecycle' },
    { label: 'Audit Logs', icon: ScrollText, href: '/admin/audit-logs' },
    { label: 'Offline Mode', icon: WifiOff, href: '/admin/offline' },
    { label: 'System Health', icon: HeartPulse, href: '/admin/system-health' },
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
