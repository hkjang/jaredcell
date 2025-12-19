'use client';

import React, { useState } from 'react';
import { HardDrive, RefreshCw, Shield, CheckCircle, AlertTriangle, Upload, Package, Hash, Clock, Server, Wifi, WifiOff } from 'lucide-react';
import styles from '@/styles/common.module.css';

const installedModels = [
    { name: 'Llama-3-70B-Instruct', size: '140GB', version: 'v1.2.0', hash: 'sha256:7f3a...b2c1', status: 'Active', lastVerified: '2 hours ago' },
    { name: 'Mistral-7B-v0.3', size: '14GB', version: 'v0.3.1', hash: 'sha256:2d4e...f8a9', status: 'Active', lastVerified: '2 hours ago' },
    { name: 'CodeLlama-34B', size: '68GB', version: 'v2.0.0', hash: 'sha256:9c1f...3e7b', status: 'Standby', lastVerified: '1 day ago' },
];

const pendingPatches = [
    { id: 'PATCH-2024-12-001', name: 'Security Update v2.1.5', size: '45MB', signature: 'Valid (GPG)', critical: true },
    { id: 'PATCH-2024-12-002', name: 'AI Model Definitions Update', size: '12MB', signature: 'Valid (GPG)', critical: false },
];

export default function OfflineSettingsPage() {
    const [activeTab, setActiveTab] = useState('models');

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Offline Mode Configuration</h1>
                    <p className={styles.subtitle}>Air-gapped deployment settings for secure/isolated environments</p>
                </div>
            </div>

            {/* Network Isolation Status */}
            <div style={{
                background: 'rgba(0, 229, 255, 0.05)',
                border: '1px solid rgba(0, 229, 255, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '20px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: 'rgba(0, 229, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <WifiOff size={24} color="var(--primary)" />
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 4, color: 'var(--primary)' }}>
                            Air-Gap Mode: ACTIVE
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            All external network connections are blocked. Platform operating in fully isolated mode.
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 24, fontSize: '0.9rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: 'var(--text-tertiary)' }}>Outbound</div>
                        <div style={{ color: 'var(--danger)', fontWeight: 600 }}>● BLOCKED</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: 'var(--text-tertiary)' }}>Inbound</div>
                        <div style={{ color: 'var(--danger)', fontWeight: 600 }}>● BLOCKED</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: 'var(--text-tertiary)' }}>Internal LAN</div>
                        <div style={{ color: 'var(--success)', fontWeight: 600 }}>● ALLOWED</div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'models' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('models')}
                >Local AI Models</button>
                <button
                    className={`${styles.tab} ${activeTab === 'updates' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('updates')}
                >Offline Updates</button>
                <button
                    className={`${styles.tab} ${activeTab === 'export' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('export')}
                >Data Export Control</button>
                <button
                    className={`${styles.tab} ${activeTab === 'backup' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('backup')}
                >Backup & Recovery</button>
            </div>

            {/* Models Tab */}
            {activeTab === 'models' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Installed Local Models</h2>
                        <button className={`${styles.btn} ${styles.btnPrimary}`}>
                            <Upload size={16} />
                            Import Model Package
                        </button>
                    </div>

                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Model Name</th>
                                    <th>Version</th>
                                    <th>Size</th>
                                    <th>Hash (SHA256)</th>
                                    <th>Status</th>
                                    <th>Last Verified</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {installedModels.map((model, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                <Server size={18} color="var(--primary)" />
                                                <span style={{ fontWeight: 500 }}>{model.name}</span>
                                            </div>
                                        </td>
                                        <td><code style={{ background: '#222', padding: '2px 6px', borderRadius: 4 }}>{model.version}</code></td>
                                        <td style={{ color: 'var(--text-secondary)' }}>{model.size}</td>
                                        <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <Hash size={12} />
                                                {model.hash}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`${styles.badge} ${model.status === 'Active' ? styles.badgeActive : styles.badgeInactive}`}>
                                                {model.status}
                                            </span>
                                        </td>
                                        <td style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <Clock size={12} />
                                                {model.lastVerified}
                                            </div>
                                        </td>
                                        <td>
                                            <button className={`${styles.btn} ${styles.btnSecondary}`} style={{ padding: '6px 12px' }}>
                                                <RefreshCw size={14} />
                                                Verify
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* vLLM / Ollama Config */}
                    <div className={styles.section} style={{ marginTop: 24 }}>
                        <h3 className={styles.sectionTitle}>Local Inference Engine</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Inference Backend</label>
                                <select className={styles.formSelect}>
                                    <option>vLLM (Recommended for Production)</option>
                                    <option>Ollama (Development)</option>
                                    <option>Text Generation Inference (TGI)</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>GPU Allocation</label>
                                <select className={styles.formSelect}>
                                    <option>All Available GPUs (4x A100)</option>
                                    <option>2x GPU</option>
                                    <option>CPU Only (Slow)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Updates Tab */}
            {activeTab === 'updates' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Pending Offline Patches</h2>
                        <button className={`${styles.btn} ${styles.btnSecondary}`}>
                            <Upload size={16} />
                            Import Patch File (.patch)
                        </button>
                    </div>

                    <div className={styles.cardsGrid}>
                        {pendingPatches.map((patch) => (
                            <div key={patch.id} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <Package size={24} color={patch.critical ? 'var(--danger)' : 'var(--primary)'} />
                                    {patch.critical && (
                                        <span className={`${styles.badge} ${styles.badgeCritical}`}>
                                            <AlertTriangle size={12} />
                                            CRITICAL
                                        </span>
                                    )}
                                </div>
                                <div className={styles.cardTitle}>{patch.name}</div>
                                <div className={styles.cardDescription}>
                                    <div style={{ marginBottom: 8 }}>ID: <code>{patch.id}</code></div>
                                    <div>Size: {patch.size} | Signature: <span style={{ color: 'var(--success)' }}>{patch.signature}</span></div>
                                </div>
                                <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                                    <button className={`${styles.btn} ${styles.btnPrimary}`} style={{ flex: 1 }}>
                                        <CheckCircle size={16} />
                                        Apply Patch
                                    </button>
                                    <button className={`${styles.btn} ${styles.btnSecondary}`}>
                                        Defer
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Rollback Section */}
                    <div className={styles.section} style={{ marginTop: 24 }}>
                        <h3 className={styles.sectionTitle}>Version Rollback</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
                            Instantly restore to a previous known-good state in case of issues.
                        </p>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <select className={styles.formSelect} style={{ maxWidth: 400 }}>
                                <option>v2.1.4 (Current)</option>
                                <option>v2.1.3 (Dec 15, 2024)</option>
                                <option>v2.1.2 (Dec 10, 2024)</option>
                                <option>v2.0.0 (Nov 28, 2024)</option>
                            </select>
                            <button className={`${styles.btn} ${styles.btnSecondary}`}>
                                <RefreshCw size={16} />
                                Rollback to Selected
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Export Control Tab */}
            {activeTab === 'export' && (
                <div>
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Data Export Approval Workflow</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
                            All data exports require administrator approval. Dual approval is required for classified data.
                        </p>

                        <div className={styles.toggleWrapper}>
                            <div>
                                <div className={styles.toggleLabel}>Require Export Approval</div>
                                <div className={styles.toggleDescription}>All exports must be approved by an administrator</div>
                            </div>
                            <div className={`${styles.toggle} active`}></div>
                        </div>

                        <div className={styles.toggleWrapper}>
                            <div>
                                <div className={styles.toggleLabel}>Dual Approval (Two-Person Rule)</div>
                                <div className={styles.toggleDescription}>Critical data requires approval from two separate administrators</div>
                            </div>
                            <div className={`${styles.toggle} active`}></div>
                        </div>

                        <div className={styles.toggleWrapper}>
                            <div>
                                <div className={styles.toggleLabel}>Auto-Mask PII in Exports</div>
                                <div className={styles.toggleDescription}>Automatically redact personal information before export</div>
                            </div>
                            <div className={`${styles.toggle} active`}></div>
                        </div>

                        <div className={styles.toggleWrapper}>
                            <div>
                                <div className={styles.toggleLabel}>Watermark Exported Documents</div>
                                <div className={styles.toggleDescription}>Add user/timestamp watermark to all exported PDFs</div>
                            </div>
                            <div className={styles.toggle}></div>
                        </div>
                    </div>

                    <div className={styles.section} style={{ marginTop: 24 }}>
                        <h3 className={styles.sectionTitle}>Allowed Export Formats</h3>
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            {['PDF', 'CSV', 'JSON', 'Log Bundle (.tar.gz)'].map((format) => (
                                <div key={format} style={{
                                    padding: '8px 16px',
                                    background: 'rgba(0, 255, 128, 0.1)',
                                    border: '1px solid rgba(0, 255, 128, 0.2)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: 'var(--success)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8
                                }}>
                                    <CheckCircle size={14} />
                                    {format}
                                </div>
                            ))}
                            {['XLSX', 'XML', 'Raw DB Dump'].map((format) => (
                                <div key={format} style={{
                                    padding: '8px 16px',
                                    background: 'rgba(255, 46, 46, 0.1)',
                                    border: '1px solid rgba(255, 46, 46, 0.2)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: 'var(--danger)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    textDecoration: 'line-through'
                                }}>
                                    {format}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Backup Tab */}
            {activeTab === 'backup' && (
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Offline Backup Configuration</h3>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Backup Destination</label>
                        <select className={styles.formSelect}>
                            <option>/mnt/backup-nas (Internal NAS)</option>
                            <option>USB Media (Manual)</option>
                            <option>Tape Archive</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Backup Schedule</label>
                        <select className={styles.formSelect}>
                            <option>Daily at 02:00</option>
                            <option>Weekly (Sunday)</option>
                            <option>Manual Only</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                        <button className={`${styles.btn} ${styles.btnPrimary}`}>
                            <HardDrive size={16} />
                            Run Backup Now
                        </button>
                        <button className={`${styles.btn} ${styles.btnSecondary}`}>
                            <RefreshCw size={16} />
                            Restore from Backup
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
