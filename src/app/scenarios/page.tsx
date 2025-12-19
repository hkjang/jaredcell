'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Plus, Calendar, Activity, Database, Globe, Cpu } from 'lucide-react';
import styles from '@/components/scenarios/Scenarios.module.css';

const scenarios = [
    { id: '1', title: 'Automated SQL Injection Test', type: 'Web', status: 'Active', target: 'Payment Gateway API', updated: '2h ago', icon: Database },
    { id: '2', title: 'LLM Prompt Injection (Jailbreak)', type: 'AI', status: 'Active', target: 'Customer Chatbot v2', updated: '5h ago', icon: Cpu },
    { id: '3', title: 'Cross-Site Scripting (XSS) Sweep', type: 'Web', status: 'Draft', target: 'User Dashboard', updated: '1d ago', icon: Globe },
    { id: '4', title: 'RAG Knowledge Leakage Probe', type: 'AI', status: 'Draft', target: 'Internal Knowledge Base', updated: '2d ago', icon: Cpu },
    { id: '5', title: 'Authentication Bypass Fuzzing', type: 'API', status: 'Active', target: 'Login Service', updated: '3d ago', icon: Globe },
];

export default function ScenariosPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Attack Scenarios</h1>
                    <div className={styles.subtitle}>Manage and configure your red teaming attack vectors</div>
                </div>
                <button className={styles.createButton}>
                    <Plus size={18} />
                    Create New Scenario
                </button>
            </div>

            <div className={styles.controls}>
                <div className={styles.searchBar}>
                    <Search size={16} color="var(--text-secondary)" />
                    <input type="text" placeholder="Search scenarios..." className={styles.searchInput} />
                </div>

                {/* Filter buttons could go here */}
            </div>

            <div className={styles.grid}>
                {scenarios.map((scenario) => {
                    const Icon = scenario.icon;
                    return (
                        <Link href={`/scenarios/${scenario.id}`} key={scenario.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <div style={{ padding: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
                                        <Icon size={20} color="var(--primary)" />
                                    </div>
                                    <div className={styles.cardTitle}>{scenario.title}</div>
                                </div>
                                <div className={`${styles.statusBadge} ${scenario.status === 'Active' ? styles.statusActive : styles.statusDraft}`}>
                                    {scenario.status}
                                </div>
                            </div>

                            <div className={styles.cardBody}>
                                <div className={styles.description}>Targeting: {scenario.target}</div>
                                <div className={styles.tags}>
                                    <span className={styles.tag}>{scenario.type}</span>
                                    <span className={styles.tag}>Automated</span>
                                </div>
                            </div>

                            <div className={styles.meta}>
                                <div className={styles.metaItem}>
                                    <Calendar size={14} />
                                    <span>{scenario.updated}</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <Activity size={14} />
                                    <span>High Impact</span>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}
