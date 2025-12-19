'use client';

import React, { useState } from 'react';
import { Plus, Shield, AlertTriangle, CheckCircle, Edit2, Trash2, Copy } from 'lucide-react';
import styles from '@/styles/common.module.css';

const policies = [
    {
        id: 1,
        name: 'Production Environment Protection',
        type: 'Network',
        status: 'Active',
        rules: 12,
        lastModified: '2 days ago',
        description: 'Prevents destructive attacks on production systems'
    },
    {
        id: 2,
        name: 'AI Model Safety Guardrails',
        type: 'AI/LLM',
        status: 'Active',
        rules: 8,
        lastModified: '1 week ago',
        description: 'Rate limiting and content filtering for AI endpoints'
    },
    {
        id: 3,
        name: 'PCI-DSS Compliance Testing',
        type: 'Compliance',
        status: 'Inactive',
        rules: 24,
        lastModified: '3 weeks ago',
        description: 'Restricted attack vectors for payment systems'
    },
    {
        id: 4,
        name: 'Critical Infrastructure - No Exploit',
        type: 'Critical',
        status: 'Active',
        rules: 5,
        lastModified: '1 day ago',
        description: 'Kill switch enabled for all SCADA/ICS targets'
    },
];

export default function PoliciesPage() {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Policy Management</h1>
                    <p className={styles.subtitle}>Configure attack boundaries and safety guardrails</p>
                </div>
                <button className={`${styles.btn} ${styles.btnPrimary}`}>
                    <Plus size={18} />
                    Create Policy
                </button>
            </div>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'all' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('all')}
                >All Policies</button>
                <button
                    className={`${styles.tab} ${activeTab === 'network' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('network')}
                >Network</button>
                <button
                    className={`${styles.tab} ${activeTab === 'ai' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('ai')}
                >AI/LLM</button>
                <button
                    className={`${styles.tab} ${activeTab === 'compliance' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('compliance')}
                >Compliance</button>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Policy Name</th>
                            <th>Type</th>
                            <th>Rules</th>
                            <th>Status</th>
                            <th>Last Modified</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {policies.map((policy) => (
                            <tr key={policy.id}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{
                                            padding: 8,
                                            background: policy.type === 'Critical' ? 'rgba(255, 46, 46, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                            borderRadius: 8
                                        }}>
                                            <Shield size={18} color={policy.type === 'Critical' ? 'var(--danger)' : 'var(--primary)'} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 500 }}>{policy.name}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>{policy.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className={`${styles.badge} ${policy.type === 'Critical' ? styles.badgeCritical : styles.badgeWarning}`}>
                                        {policy.type}
                                    </span>
                                </td>
                                <td>{policy.rules} rules</td>
                                <td>
                                    <span className={`${styles.badge} ${policy.status === 'Active' ? styles.badgeActive : styles.badgeInactive}`}>
                                        {policy.status === 'Active' ? <CheckCircle size={12} /> : null}
                                        {policy.status}
                                    </span>
                                </td>
                                <td style={{ color: 'var(--text-secondary)' }}>{policy.lastModified}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button className={styles.btnIcon}><Edit2 size={16} /></button>
                                        <button className={styles.btnIcon}><Copy size={16} /></button>
                                        <button className={styles.btnIcon}><Trash2 size={16} /></button>
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
