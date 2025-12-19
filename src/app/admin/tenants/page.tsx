'use client';

import React from 'react';
import styles from '@/app/reports/Reports.module.css'; // Reusing some table styles but ideally should be separate
import { Search, Building, Users, Lock, MoreHorizontal } from 'lucide-react';

const tenants = [
    { id: 1, name: 'Acme Corp (Global)', tier: 'Enterprise', users: 154, models: ['GPT-4', 'Claude-3'], isolation: 'Dedicated VPC', status: 'Active' },
    { id: 2, name: 'StartUp Inc.', tier: 'Growth', users: 12, models: ['GPT-3.5'], isolation: 'Shared', status: 'Active' },
    { id: 3, name: 'BioHealth Systems', tier: 'Enterprise+', users: 450, models: ['Med-PaLM', 'GPT-4'], isolation: 'On-Premise', status: 'Active' },
];

export default function TenantsPage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Tenant Management</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage multi-tenancy isolation policies and resource quotas.</p>
                </div>
                <button style={{
                    background: 'var(--primary)',
                    color: '#000',
                    padding: '10px 20px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                }}>
                    <Building size={16} />
                    Add Tenant
                </button>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <table className={styles.tenantTable}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.02)', textAlign: 'left' }}>
                            <th style={{ padding: 16, color: 'var(--text-secondary)', fontWeight: 600 }}>Tenant Name</th>
                            <th style={{ padding: 16, color: 'var(--text-secondary)', fontWeight: 600 }}>Plan Tier</th>
                            <th style={{ padding: 16, color: 'var(--text-secondary)', fontWeight: 600 }}>Isolation Level</th>
                            <th style={{ padding: 16, color: 'var(--text-secondary)', fontWeight: 600 }}>Users</th>
                            <th style={{ padding: 16, color: 'var(--text-secondary)', fontWeight: 600 }}>Status</th>
                            <th style={{ padding: 16, color: 'var(--text-secondary)', fontWeight: 600 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tenants.map(tenant => (
                            <tr key={tenant.id} className={styles.tenantRow}>
                                <td className={styles.tenantCell}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #333, #555)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Building size={16} color="#fff" />
                                        </div>
                                        <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{tenant.name}</span>
                                    </div>
                                </td>
                                <td className={styles.tenantCell}>
                                    <span style={{
                                        padding: '4px 8px',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: 4,
                                        fontSize: '0.85rem',
                                        color: 'var(--text-secondary)'
                                    }}>{tenant.tier}</span>
                                </td>
                                <td className={styles.tenantCell}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-tertiary)' }}>
                                        <Lock size={14} />
                                        {tenant.isolation}
                                    </div>
                                </td>
                                <td className={styles.tenantCell}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <Users size={14} color="var(--text-tertiary)" />
                                        {tenant.users}
                                    </div>
                                </td>
                                <td className={styles.tenantCell}>
                                    <span style={{ color: 'var(--success)', fontWeight: 500 }}>● {tenant.status}</span>
                                </td>
                                <td className={styles.tenantCell}>
                                    <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                        <MoreHorizontal size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
