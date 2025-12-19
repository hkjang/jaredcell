'use client';

import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, Activity, TrendingUp, Filter, Search, ExternalLink, Clock, Target } from 'lucide-react';
import styles from '@/styles/common.module.css';

const vulnerabilities = [
    {
        id: 'VULN-001',
        title: 'LLM Jailbreak Successful - System Prompt Leak',
        severity: 'Critical',
        target: 'Customer Chatbot v2',
        category: 'AI/LLM',
        cvss: 9.1,
        status: 'Open',
        discovered: '2 hours ago'
    },
    {
        id: 'VULN-002',
        title: 'SQL Injection in Payment API',
        severity: 'Critical',
        target: 'api.payments.internal',
        category: 'Web',
        cvss: 9.8,
        status: 'In Progress',
        discovered: '1 day ago'
    },
    {
        id: 'VULN-003',
        title: 'RAG Context Poisoning Detected',
        severity: 'High',
        target: 'Knowledge Base Service',
        category: 'AI/RAG',
        cvss: 7.5,
        status: 'Open',
        discovered: '3 days ago'
    },
    {
        id: 'VULN-004',
        title: 'Cross-Site Scripting (Stored XSS)',
        severity: 'Medium',
        target: 'Admin Dashboard',
        category: 'Web',
        cvss: 6.1,
        status: 'Resolved',
        discovered: '1 week ago'
    },
    {
        id: 'VULN-005',
        title: 'Agent Tool Abuse - Unauthorized API Call',
        severity: 'High',
        target: 'Autonomous Agent Service',
        category: 'AI/Agent',
        cvss: 8.2,
        status: 'Open',
        discovered: '5 hours ago'
    },
];

export default function AnalysisPage() {
    const [filter, setFilter] = useState('all');

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'Critical': return 'var(--danger)';
            case 'High': return '#ff8f00';
            case 'Medium': return '#ffbd2e';
            default: return 'var(--text-secondary)';
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Vulnerability Analysis</h1>
                    <p className={styles.subtitle}>Review and triage discovered security issues</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button className={`${styles.btn} ${styles.btnSecondary}`}>
                        <Filter size={16} />
                        Filters
                    </button>
                    <button className={`${styles.btn} ${styles.btnPrimary}`}>
                        Export Report
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                <div className={styles.card} style={{ textAlign: 'center' }}>
                    <ShieldAlert size={28} color="var(--danger)" style={{ marginBottom: 12 }} />
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--danger)' }}>5</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Critical Issues</div>
                </div>
                <div className={styles.card} style={{ textAlign: 'center' }}>
                    <AlertTriangle size={28} color="#ff8f00" style={{ marginBottom: 12 }} />
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: '#ff8f00' }}>12</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>High Issues</div>
                </div>
                <div className={styles.card} style={{ textAlign: 'center' }}>
                    <Activity size={28} color="var(--primary)" style={{ marginBottom: 12 }} />
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>8.4</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Avg. CVSS Score</div>
                </div>
                <div className={styles.card} style={{ textAlign: 'center' }}>
                    <TrendingUp size={28} color="var(--success)" style={{ marginBottom: 12 }} />
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--success)' }}>67%</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Resolution Rate</div>
                </div>
            </div>

            {/* Tabs */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${filter === 'all' ? styles.tabActive : ''}`}
                    onClick={() => setFilter('all')}
                >All</button>
                <button
                    className={`${styles.tab} ${filter === 'ai' ? styles.tabActive : ''}`}
                    onClick={() => setFilter('ai')}
                >AI/LLM</button>
                <button
                    className={`${styles.tab} ${filter === 'web' ? styles.tabActive : ''}`}
                    onClick={() => setFilter('web')}
                >Web</button>
                <button
                    className={`${styles.tab} ${filter === 'api' ? styles.tabActive : ''}`}
                    onClick={() => setFilter('api')}
                >API</button>
            </div>

            {/* Vulnerability List */}
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Vulnerability</th>
                            <th>Target</th>
                            <th>Category</th>
                            <th>CVSS</th>
                            <th>Status</th>
                            <th>Discovered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vulnerabilities.map((vuln) => (
                            <tr key={vuln.id} style={{ cursor: 'pointer' }}>
                                <td style={{ fontFamily: 'monospace', color: 'var(--primary)' }}>{vuln.id}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{
                                            width: 4,
                                            height: 32,
                                            borderRadius: 2,
                                            background: getSeverityColor(vuln.severity)
                                        }}></div>
                                        <div>
                                            <div style={{ fontWeight: 500 }}>{vuln.title}</div>
                                            <div style={{ fontSize: '0.8rem', color: getSeverityColor(vuln.severity), fontWeight: 600 }}>{vuln.severity}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <Target size={14} color="var(--text-tertiary)" />
                                        {vuln.target}
                                    </div>
                                </td>
                                <td>
                                    <span className={`${styles.badge} ${styles.badgeWarning}`}>{vuln.category}</span>
                                </td>
                                <td>
                                    <span style={{
                                        fontWeight: 700,
                                        color: vuln.cvss >= 9 ? 'var(--danger)' : vuln.cvss >= 7 ? '#ff8f00' : 'var(--text-primary)'
                                    }}>{vuln.cvss}</span>
                                </td>
                                <td>
                                    <span className={`${styles.badge} ${vuln.status === 'Open' ? styles.badgeCritical :
                                            vuln.status === 'In Progress' ? styles.badgeWarning :
                                                styles.badgeActive
                                        }`}>{vuln.status}</span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)' }}>
                                        <Clock size={14} />
                                        {vuln.discovered}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
