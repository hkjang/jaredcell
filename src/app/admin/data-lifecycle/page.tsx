'use client';

import React, { useState } from 'react';
import { Database, Clock, Lock, Trash2, Archive, FileText, AlertTriangle, CheckCircle, Search, Filter } from 'lucide-react';
import styles from '@/styles/common.module.css';

const dataAssets = [
    {
        id: 'DATA-001',
        name: 'Vulnerability Scan Results (Dec 2024)',
        type: 'Scan Data',
        classification: 'Confidential',
        created: '2024-12-15',
        retention: '3 years',
        status: 'Active',
        size: '2.4 GB'
    },
    {
        id: 'DATA-002',
        name: 'AI Attack Prompts Library',
        type: 'Attack Payload',
        classification: 'Internal',
        created: '2024-11-01',
        retention: '5 years',
        status: 'Active',
        size: '156 MB'
    },
    {
        id: 'DATA-003',
        name: 'Q3 Executive Report Package',
        type: 'Report',
        classification: 'Confidential',
        created: '2024-10-01',
        retention: '7 years',
        status: 'Archived',
        size: '45 MB'
    },
    {
        id: 'DATA-004',
        name: 'Legacy Model Outputs (v1.0)',
        type: 'AI Output',
        classification: 'Internal',
        created: '2024-06-15',
        retention: 'Expired',
        status: 'Pending Destruction',
        size: '890 MB'
    },
];

const destructionQueue = [
    { id: 'DEST-001', asset: 'Test Environment Logs (Q2)', scheduledFor: '2024-12-20', requestedBy: 'admin@corp.com', status: 'Pending Approval' },
    { id: 'DEST-002', asset: 'Deprecated Model Cache', scheduledFor: '2024-12-21', requestedBy: 'system', status: 'Approved' },
];

export default function DataLifecyclePage() {
    const [activeTab, setActiveTab] = useState('inventory');

    const getClassificationColor = (classification: string) => {
        switch (classification) {
            case 'Confidential': return 'var(--danger)';
            case 'Internal': return '#ff8f00';
            default: return 'var(--text-secondary)';
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Data Lifecycle Management</h1>
                    <p className={styles.subtitle}>Manage data creation, retention, archival, and secure destruction</p>
                </div>
            </div>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 24 }}>
                <div className={styles.card} style={{ textAlign: 'center', padding: 16 }}>
                    <Database size={24} color="var(--primary)" style={{ marginBottom: 8 }} />
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>247</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Assets</div>
                </div>
                <div className={styles.card} style={{ textAlign: 'center', padding: 16 }}>
                    <FileText size={24} color="var(--success)" style={{ marginBottom: 8 }} />
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>198</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Active</div>
                </div>
                <div className={styles.card} style={{ textAlign: 'center', padding: 16 }}>
                    <Archive size={24} color="#ff8f00" style={{ marginBottom: 8 }} />
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>42</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Archived</div>
                </div>
                <div className={styles.card} style={{ textAlign: 'center', padding: 16 }}>
                    <Trash2 size={24} color="var(--danger)" style={{ marginBottom: 8 }} />
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>7</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Pending Destruction</div>
                </div>
                <div className={styles.card} style={{ textAlign: 'center', padding: 16 }}>
                    <Lock size={24} color="var(--text-tertiary)" style={{ marginBottom: 8 }} />
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>100%</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Encrypted</div>
                </div>
            </div>

            {/* Tabs */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'inventory' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('inventory')}
                >Data Inventory</button>
                <button
                    className={`${styles.tab} ${activeTab === 'retention' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('retention')}
                >Retention Policies</button>
                <button
                    className={`${styles.tab} ${activeTab === 'destruction' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('destruction')}
                >Destruction Queue</button>
            </div>

            {/* Data Inventory Tab */}
            {activeTab === 'inventory' && (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Asset ID</th>
                                <th>Name</th>
                                <th>Classification</th>
                                <th>Type</th>
                                <th>Retention</th>
                                <th>Status</th>
                                <th>Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataAssets.map((asset) => (
                                <tr key={asset.id}>
                                    <td><code>{asset.id}</code></td>
                                    <td style={{ fontWeight: 500 }}>{asset.name}</td>
                                    <td>
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            padding: '4px 10px',
                                            background: `${getClassificationColor(asset.classification)}15`,
                                            color: getClassificationColor(asset.classification),
                                            borderRadius: 'var(--radius-full)',
                                            fontSize: '0.8rem',
                                            fontWeight: 500
                                        }}>
                                            <Lock size={12} />
                                            {asset.classification}
                                        </span>
                                    </td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{asset.type}</td>
                                    <td>
                                        {asset.retention === 'Expired' ? (
                                            <span style={{ color: 'var(--danger)' }}>⚠️ Expired</span>
                                        ) : (
                                            <span>{asset.retention}</span>
                                        )}
                                    </td>
                                    <td>
                                        <span className={`${styles.badge} ${asset.status === 'Active' ? styles.badgeActive :
                                                asset.status === 'Archived' ? styles.badgeWarning :
                                                    styles.badgeCritical
                                            }`}>
                                            {asset.status}
                                        </span>
                                    </td>
                                    <td style={{ color: 'var(--text-tertiary)' }}>{asset.size}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Retention Policies Tab */}
            {activeTab === 'retention' && (
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Retention Policy Configuration</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Scan Results</label>
                            <select className={styles.formSelect}>
                                <option>3 Years</option>
                                <option>5 Years</option>
                                <option>7 Years</option>
                                <option>Permanent</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Attack Payloads</label>
                            <select className={styles.formSelect}>
                                <option>5 Years</option>
                                <option>7 Years</option>
                                <option>Permanent</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>AI Prompts & Responses</label>
                            <select className={styles.formSelect}>
                                <option>Permanent (Required for Audit)</option>
                                <option>10 Years</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Execution Logs</label>
                            <select className={styles.formSelect}>
                                <option>7 Years</option>
                                <option>10 Years</option>
                                <option>Permanent</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.toggleWrapper} style={{ marginTop: 24 }}>
                        <div>
                            <div className={styles.toggleLabel}>Auto-Archive on Expiry</div>
                            <div className={styles.toggleDescription}>Automatically move expired data to encrypted archive</div>
                        </div>
                        <div className={`${styles.toggle} active`}></div>
                    </div>

                    <div className={styles.toggleWrapper}>
                        <div>
                            <div className={styles.toggleLabel}>Generate Destruction Proof</div>
                            <div className={styles.toggleDescription}>Create cryptographic proof of data destruction</div>
                        </div>
                        <div className={`${styles.toggle} active`}></div>
                    </div>
                </div>
            )}

            {/* Destruction Queue Tab */}
            {activeTab === 'destruction' && (
                <div>
                    <div style={{
                        background: 'rgba(255, 46, 46, 0.05)',
                        border: '1px solid rgba(255, 46, 46, 0.2)',
                        borderRadius: 'var(--radius-md)',
                        padding: 16,
                        marginBottom: 24,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16
                    }}>
                        <AlertTriangle size={24} color="var(--danger)" />
                        <div>
                            <div style={{ fontWeight: 600, color: 'var(--danger)', marginBottom: 4 }}>
                                Irreversible Destruction
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                Once approved, data destruction cannot be reversed. Cryptographic proof will be generated.
                            </div>
                        </div>
                    </div>

                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Request ID</th>
                                    <th>Asset</th>
                                    <th>Scheduled For</th>
                                    <th>Requested By</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {destructionQueue.map((item) => (
                                    <tr key={item.id}>
                                        <td><code>{item.id}</code></td>
                                        <td style={{ fontWeight: 500 }}>{item.asset}</td>
                                        <td>{item.scheduledFor}</td>
                                        <td>{item.requestedBy}</td>
                                        <td>
                                            <span className={`${styles.badge} ${item.status === 'Approved' ? styles.badgeActive : styles.badgeWarning}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td>
                                            {item.status === 'Pending Approval' && (
                                                <button className={`${styles.btn} ${styles.btnPrimary}`} style={{ padding: '6px 12px' }}>
                                                    <CheckCircle size={14} />
                                                    Approve
                                                </button>
                                            )}
                                            {item.status === 'Approved' && (
                                                <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>Awaiting execution</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
