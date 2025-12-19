'use client';

import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, AlertTriangle, Shield, User, Calendar, Play, Lock, Unlock, ChevronRight } from 'lucide-react';
import styles from '@/styles/common.module.css';

const pendingApprovals = [
    {
        id: 'REQ-001',
        scenario: 'LLM Jailbreak Suite (DAN v14)',
        requester: 'redlead@corp.com',
        target: 'Production Chatbot',
        riskLevel: 'Critical',
        requestedAt: '10 mins ago',
        approvers: ['admin@corp.com', 'security@corp.com'],
        status: 'Pending First Approval'
    },
    {
        id: 'REQ-002',
        scenario: 'SQL Injection Fuzzing',
        requester: 'pentester@corp.com',
        target: 'Staging Database API',
        riskLevel: 'High',
        requestedAt: '1 hour ago',
        approvers: ['admin@corp.com'],
        status: 'Pending'
    },
];

const recentDecisions = [
    { id: 'REQ-000', scenario: 'XSS Sweep', decision: 'Approved', by: 'admin@corp.com', at: '2 hours ago' },
    { id: 'REQ-099', scenario: 'Production DB Test', decision: 'Rejected', by: 'security@corp.com', at: '1 day ago', reason: 'Production target not allowed' },
];

export default function ApprovalsPage() {
    const [selectedReq, setSelectedReq] = useState<string | null>(null);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Approval Workflow</h1>
                    <p className={styles.subtitle}>Review and approve attack scenario execution requests</p>
                </div>
            </div>

            {/* Execution Restrictions Summary */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 16,
                marginBottom: 24
            }}>
                <div className={styles.card} style={{ textAlign: 'center', padding: 16 }}>
                    <Clock size={24} color="var(--primary)" style={{ marginBottom: 8 }} />
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Allowed Hours</div>
                    <div style={{ fontWeight: 600, marginTop: 4 }}>09:00 - 18:00 KST</div>
                </div>
                <div className={styles.card} style={{ textAlign: 'center', padding: 16 }}>
                    <Calendar size={24} color="var(--danger)" style={{ marginBottom: 8 }} />
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Weekend/Holiday</div>
                    <div style={{ fontWeight: 600, marginTop: 4, color: 'var(--danger)' }}>BLOCKED</div>
                </div>
                <div className={styles.card} style={{ textAlign: 'center', padding: 16 }}>
                    <Shield size={24} color="var(--success)" style={{ marginBottom: 8 }} />
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Protected Targets</div>
                    <div style={{ fontWeight: 600, marginTop: 4 }}>12 Systems</div>
                </div>
                <div className={styles.card} style={{ textAlign: 'center', padding: 16 }}>
                    <Play size={24} color="var(--primary)" style={{ marginBottom: 8 }} />
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Concurrent Limit</div>
                    <div style={{ fontWeight: 600, marginTop: 4 }}>3 / 5 Active</div>
                </div>
            </div>

            {/* Pending Approvals */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Pending Approval Requests</h2>

                {pendingApprovals.map((req) => (
                    <div key={req.id} style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        padding: 20,
                        marginBottom: 16
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                    <code style={{ background: '#222', padding: '4px 8px', borderRadius: 4 }}>{req.id}</code>
                                    <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{req.scenario}</span>
                                    <span className={`${styles.badge} ${req.riskLevel === 'Critical' ? styles.badgeCritical : styles.badgeWarning}`}>
                                        {req.riskLevel}
                                    </span>
                                </div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                    Target: <strong>{req.target}</strong> | Requested by: {req.requester} | {req.requestedAt}
                                </div>
                            </div>
                            <div style={{
                                padding: '6px 12px',
                                background: 'rgba(255, 143, 0, 0.1)',
                                borderRadius: 'var(--radius-full)',
                                color: '#ff8f00',
                                fontSize: '0.85rem',
                                fontWeight: 500
                            }}>
                                {req.status}
                            </div>
                        </div>

                        {/* Dual Approval Progress */}
                        {req.riskLevel === 'Critical' && (
                            <div style={{
                                background: 'rgba(255, 46, 46, 0.05)',
                                border: '1px solid rgba(255, 46, 46, 0.1)',
                                borderRadius: 8,
                                padding: 12,
                                marginBottom: 16
                            }}>
                                <div style={{ fontSize: '0.85rem', color: 'var(--danger)', marginBottom: 8, fontWeight: 600 }}>
                                    ⚠️ Critical Risk - Dual Approval Required
                                </div>
                                <div style={{ display: 'flex', gap: 16 }}>
                                    {req.approvers.map((approver, idx) => (
                                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{
                                                width: 24,
                                                height: 24,
                                                borderRadius: '50%',
                                                background: idx === 0 ? 'rgba(255, 143, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                {idx === 0 ? <Clock size={12} color="#ff8f00" /> : <Lock size={12} color="var(--text-tertiary)" />}
                                            </div>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{approver}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: 12 }}>
                            <button className={`${styles.btn} ${styles.btnPrimary}`}>
                                <CheckCircle size={16} />
                                Approve
                            </button>
                            <button className={`${styles.btn}`} style={{ background: 'rgba(255, 46, 46, 0.1)', color: 'var(--danger)', border: '1px solid rgba(255, 46, 46, 0.2)' }}>
                                <XCircle size={16} />
                                Reject
                            </button>
                            <button className={`${styles.btn} ${styles.btnSecondary}`}>
                                View Details
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Decisions */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Recent Decisions</h2>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>Scenario</th>
                                <th>Decision</th>
                                <th>Decided By</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentDecisions.map((dec) => (
                                <tr key={dec.id}>
                                    <td><code>{dec.id}</code></td>
                                    <td>{dec.scenario}</td>
                                    <td>
                                        <span className={`${styles.badge} ${dec.decision === 'Approved' ? styles.badgeActive : styles.badgeCritical}`}>
                                            {dec.decision === 'Approved' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                            {dec.decision}
                                        </span>
                                    </td>
                                    <td>{dec.by}</td>
                                    <td style={{ color: 'var(--text-tertiary)' }}>{dec.at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
