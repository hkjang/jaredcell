'use client';

import React, { useState } from 'react';
import { Shield, CheckCircle, AlertTriangle, FileText, Download, Link2, ExternalLink, Search, Filter, BookOpen } from 'lucide-react';
import styles from '@/styles/common.module.css';

const complianceFrameworks = [
    { id: 'isms', name: 'ISMS', fullName: '정보보호 관리체계', status: 'Compliant', coverage: 94, items: 104 },
    { id: 'isms-p', name: 'ISMS-P', fullName: '개인정보보호 관리체계', status: 'Partial', coverage: 78, items: 82 },
    { id: 'iso27001', name: 'ISO 27001', fullName: 'Information Security Management', status: 'Compliant', coverage: 91, items: 114 },
    { id: 'iso27701', name: 'ISO 27701', fullName: 'Privacy Information Management', status: 'In Progress', coverage: 65, items: 49 },
];

const controlMappings = [
    {
        framework: 'ISMS',
        controlId: '2.1.3',
        controlName: '위험 평가',
        evidence: ['Vulnerability Scan Reports', 'Risk Assessment Matrix'],
        status: 'Mapped',
        lastVerified: '2024-12-15'
    },
    {
        framework: 'ISMS',
        controlId: '2.3.1',
        controlName: '접근 통제',
        evidence: ['RBAC Configuration', 'Access Logs'],
        status: 'Mapped',
        lastVerified: '2024-12-10'
    },
    {
        framework: 'ISMS-P',
        controlId: '3.1.2',
        controlName: '개인정보 처리 방침',
        evidence: ['Privacy Policy Document'],
        status: 'Pending Review',
        lastVerified: null
    },
    {
        framework: 'ISO 27001',
        controlId: 'A.12.4.1',
        controlName: 'Event Logging',
        evidence: ['Audit Log Configuration', 'WORM Compliance Report'],
        status: 'Mapped',
        lastVerified: '2024-12-18'
    },
];

export default function CompliancePage() {
    const [selectedFramework, setSelectedFramework] = useState('all');

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Compliance Hub</h1>
                    <p className={styles.subtitle}>Regulatory framework mapping and audit evidence management</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button className={`${styles.btn} ${styles.btnSecondary}`}>
                        <BookOpen size={16} />
                        Audit Mode
                    </button>
                    <button className={`${styles.btn} ${styles.btnPrimary}`}>
                        <Download size={16} />
                        Export Compliance Package
                    </button>
                </div>
            </div>

            {/* Framework Status Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
                {complianceFrameworks.map((fw) => (
                    <div
                        key={fw.id}
                        className={styles.card}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedFramework(fw.id)}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{fw.name}</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{fw.fullName}</div>
                            </div>
                            <span className={`${styles.badge} ${fw.status === 'Compliant' ? styles.badgeActive :
                                    fw.status === 'Partial' ? styles.badgeWarning :
                                        styles.badgeInactive
                                }`}>
                                {fw.status === 'Compliant' && <CheckCircle size={12} />}
                                {fw.status}
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div style={{ marginBottom: 8 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: 4 }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Coverage</span>
                                <span style={{ fontWeight: 600 }}>{fw.coverage}%</span>
                            </div>
                            <div style={{
                                height: 6,
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: 3,
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    width: `${fw.coverage}%`,
                                    height: '100%',
                                    background: fw.coverage >= 90 ? 'var(--success)' : fw.coverage >= 70 ? '#ff8f00' : 'var(--danger)',
                                    transition: 'width 0.3s'
                                }}></div>
                            </div>
                        </div>

                        <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                            {fw.items} controls mapped
                        </div>
                    </div>
                ))}
            </div>

            {/* Control Mappings Table */}
            <div className={styles.section}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 className={styles.sectionTitle} style={{ marginBottom: 0, paddingBottom: 0, borderBottom: 'none' }}>
                        Control Mappings & Evidence
                    </h2>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '8px 12px'
                        }}>
                            <Search size={16} color="var(--text-tertiary)" />
                            <input
                                type="text"
                                placeholder="Search controls..."
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--text-primary)',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Framework</th>
                                <th>Control ID</th>
                                <th>Control Name</th>
                                <th>Linked Evidence</th>
                                <th>Status</th>
                                <th>Last Verified</th>
                            </tr>
                        </thead>
                        <tbody>
                            {controlMappings.map((ctrl, idx) => (
                                <tr key={idx}>
                                    <td>
                                        <span style={{
                                            padding: '4px 8px',
                                            background: 'rgba(0, 229, 255, 0.1)',
                                            borderRadius: 4,
                                            fontWeight: 600,
                                            color: 'var(--primary)'
                                        }}>{ctrl.framework}</span>
                                    </td>
                                    <td><code>{ctrl.controlId}</code></td>
                                    <td style={{ fontWeight: 500 }}>{ctrl.controlName}</td>
                                    <td>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                            {ctrl.evidence.map((ev, i) => (
                                                <span key={i} style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: 4,
                                                    padding: '4px 8px',
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    borderRadius: 4,
                                                    fontSize: '0.8rem',
                                                    color: 'var(--text-secondary)'
                                                }}>
                                                    <Link2 size={12} />
                                                    {ev}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`${styles.badge} ${ctrl.status === 'Mapped' ? styles.badgeActive : styles.badgeWarning}`}>
                                            {ctrl.status}
                                        </span>
                                    </td>
                                    <td style={{ color: 'var(--text-tertiary)' }}>
                                        {ctrl.lastVerified || '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Audit Mode Section */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Audit Mode (Read-Only)</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
                    Enable read-only access for external auditors with restricted visibility.
                </p>

                <div className={styles.toggleWrapper}>
                    <div>
                        <div className={styles.toggleLabel}>Enable Auditor Account</div>
                        <div className={styles.toggleDescription}>Create a read-only account for external compliance auditors</div>
                    </div>
                    <div className={styles.toggle}></div>
                </div>

                <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                    <button className={`${styles.btn} ${styles.btnSecondary}`}>
                        <FileText size={16} />
                        Generate ISMS Submission Package
                    </button>
                    <button className={`${styles.btn} ${styles.btnSecondary}`}>
                        <FileText size={16} />
                        Generate ISO Audit Report
                    </button>
                </div>
            </div>
        </div>
    );
}
