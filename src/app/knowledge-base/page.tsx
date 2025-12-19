'use client';

import React from 'react';
import Link from 'next/link';
import { Search, BookOpen, TrendingUp, Calendar, Tag, ExternalLink, Shield } from 'lucide-react';
import styles from '@/styles/common.module.css';

const knowledgeItems = [
    {
        id: 1,
        title: 'DAN Jailbreak Variants (v11-v14)',
        category: 'AI Attack',
        successRate: '68%',
        lastUsed: '2 hours ago',
        tags: ['LLM', 'Jailbreak', 'Prompt Injection']
    },
    {
        id: 2,
        title: 'SQL Injection Payloads (MySQL)',
        category: 'Web Attack',
        successRate: '45%',
        lastUsed: '1 day ago',
        tags: ['SQLi', 'MySQL', 'Backend']
    },
    {
        id: 3,
        title: 'RAG Context Overflow Technique',
        category: 'AI Attack',
        successRate: '82%',
        lastUsed: '3 days ago',
        tags: ['RAG', 'Context Poisoning', 'Retrieval']
    },
    {
        id: 4,
        title: 'API Authentication Bypass',
        category: 'API Attack',
        successRate: '33%',
        lastUsed: '1 week ago',
        tags: ['OAuth', 'JWT', 'Auth Bypass']
    },
    {
        id: 5,
        title: 'Agent Tool Misuse Patterns',
        category: 'AI Attack',
        successRate: '91%',
        lastUsed: '5 hours ago',
        tags: ['Agent', 'Tool Abuse', 'Autonomy']
    },
];

export default function KnowledgeBasePage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Attack Knowledge Base</h1>
                    <p className={styles.subtitle}>Accumulated attack patterns, success rates, and historical data</p>
                </div>
                <button className={`${styles.btn} ${styles.btnPrimary}`}>
                    <BookOpen size={16} />
                    Add Entry
                </button>
            </div>

            {/* Search Bar */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 16px',
                maxWidth: 500
            }}>
                <Search size={18} color="var(--text-tertiary)" />
                <input
                    type="text"
                    placeholder="Search attacks, payloads, techniques..."
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-primary)',
                        flex: 1,
                        outline: 'none',
                        fontSize: '0.95rem'
                    }}
                />
            </div>

            {/* Tabs */}
            <div className={styles.tabs}>
                <button className={`${styles.tab} ${styles.tabActive}`}>All</button>
                <button className={styles.tab}>AI Attacks</button>
                <button className={styles.tab}>Web Attacks</button>
                <button className={styles.tab}>API Attacks</button>
                <button className={styles.tab}>Infrastructure</button>
            </div>

            {/* Knowledge Cards */}
            <div className={styles.cardsGrid}>
                {knowledgeItems.map((item) => (
                    <div key={item.id} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div style={{ padding: 10, background: 'rgba(0, 229, 255, 0.1)', borderRadius: 8 }}>
                                <Shield size={20} color="var(--primary)" />
                            </div>
                            <span className={`${styles.badge} ${styles.badgeWarning}`}>{item.category}</span>
                        </div>
                        <div className={styles.cardTitle}>{item.title}</div>

                        <div style={{ display: 'flex', gap: 16, margin: '16px 0', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--success)' }}>
                                <TrendingUp size={14} />
                                <span>{item.successRate} success</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-tertiary)' }}>
                                <Calendar size={14} />
                                <span>{item.lastUsed}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {item.tags.map((tag, idx) => (
                                <span key={idx} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 4,
                                    padding: '4px 8px',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    borderRadius: 4,
                                    fontSize: '0.8rem',
                                    color: 'var(--text-secondary)'
                                }}>
                                    <Tag size={12} />
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <button style={{
                            marginTop: 16,
                            width: '100%',
                            padding: '10px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 6,
                            color: 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                            cursor: 'pointer'
                        }}>
                            <ExternalLink size={14} />
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
