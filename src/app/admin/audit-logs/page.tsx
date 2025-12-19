'use client';

import React, { useState } from 'react';
import { Shield, Clock, User, Search, Download, Filter, AlertTriangle, CheckCircle, Eye, Lock } from 'lucide-react';
import styles from '@/styles/common.module.css';

const auditLogs = [
    { id: 1, timestamp: '2024-12-19 16:45:23', user: 'admin@corp.com', action: 'SCENARIO_EXECUTE', target: 'LLM Jailbreak Suite', status: 'SUCCESS', ip: '192.168.1.100' },
    { id: 2, timestamp: '2024-12-19 16:42:11', user: 'redlead@corp.com', action: 'REPORT_EXPORT', target: 'Executive Summary Q4', status: 'PENDING_APPROVAL', ip: '192.168.1.105' },
    { id: 3, timestamp: '2024-12-19 16:30:05', user: 'admin@corp.com', action: 'MODEL_DEPLOY', target: 'Llama-3-70B-Instruct', status: 'SUCCESS', ip: '192.168.1.100' },
    { id: 4, timestamp: '2024-12-19 16:15:44', user: 'system', action: 'PATCH_APPLY', target: 'Security Patch v2.1.4', status: 'SUCCESS', ip: 'localhost' },
    { id: 5, timestamp: '2024-12-19 15:55:12', user: 'blue@corp.com', action: 'DATA_ACCESS', target: 'Vulnerability Report VULN-001', status: 'SUCCESS', ip: '192.168.1.110' },
    { id: 6, timestamp: '2024-12-19 15:30:00', user: 'admin@corp.com', action: 'USER_CREATE', target: 'newuser@corp.com (Red Team)', status: 'SUCCESS', ip: '192.168.1.100' },
    { id: 7, timestamp: '2024-12-19 15:00:33', user: 'redlead@corp.com', action: 'KILL_SWITCH', target: 'All Active Scenarios', status: 'SUCCESS', ip: '192.168.1.105' },
    { id: 8, timestamp: '2024-12-19 14:45:00', user: 'redlead@corp.com', action: 'REPORT_EXPORT', target: 'Technical Report VULN-002', status: 'REJECTED', ip: '192.168.1.105' },
];

export default function AuditLogsPage() {
    const [filter, setFilter] = useState('all');

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'SUCCESS': return styles.badgeActive;
            case 'PENDING_APPROVAL': return styles.badgeWarning;
            case 'REJECTED': return styles.badgeCritical;
            default: return styles.badgeInactive;
        }
    };

    const getActionIcon = (action: string) => {
        if (action.includes('EXPORT')) return <Download size={14} />;
        if (action.includes('EXECUTE') || action.includes('KILL')) return <AlertTriangle size={14} />;
        if (action.includes('ACCESS')) return <Eye size={14} />;
        return <Shield size={14} />;
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Audit Logs</h1>
                    <p className={styles.subtitle}>Tamper-proof activity logs with hash chain verification (WORM compliant)</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button className={`${styles.btn} ${styles.btnSecondary}`}>
                        <Filter size={16} />
                        Advanced Filter
                    </button>
                    <button className={`${styles.btn} ${styles.btnPrimary}`}>
                        <Download size={16} />
                        Export Evidence Package
                    </button>
                </div>
            </div>

            {/* Integrity Status Banner */}
            <div style={{
                background: 'rgba(0, 255, 128, 0.05)',
                border: '1px solid rgba(0, 255, 128, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 16
            }}>
                <Lock size={24} color="var(--success)" />
                <div>
                    <div style={{ fontWeight: 600, color: 'var(--success)', marginBottom: 4 }}>Log Integrity Verified</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        Hash chain validated. Last block: <code style={{ background: '#222', padding: '2px 6px', borderRadius: 4 }}>0x7f3a...b2c1</code> |
                        Total entries: <strong>1,247</strong> | WORM storage active
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${filter === 'all' ? styles.tabActive : ''}`}
                    onClick={() => setFilter('all')}
                >All Actions</button>
                <button
                    className={`${styles.tab} ${filter === 'execute' ? styles.tabActive : ''}`}
                    onClick={() => setFilter('execute')}
                >Executions</button>
                <button
                    className={`${styles.tab} ${filter === 'export' ? styles.tabActive : ''}`}
                    onClick={() => setFilter('export')}
                >Data Exports</button>
                <button
                    className={`${styles.tab} ${filter === 'admin' ? styles.tabActive : ''}`}
                    onClick={() => setFilter('admin')}
                >Admin Actions</button>
            </div>

            {/* Audit Table */}
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>User</th>
                            <th>Action</th>
                            <th>Target</th>
                            <th>Source IP</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {auditLogs.map((log) => (
                            <tr key={log.id}>
                                <td style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <Clock size={14} />
                                        {log.timestamp}
                                    </div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <User size={14} color="var(--text-tertiary)" />
                                        {log.user}
                                    </div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        {getActionIcon(log.action)}
                                        <code style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4, fontSize: '0.85rem' }}>
                                            {log.action}
                                        </code>
                                    </div>
                                </td>
                                <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {log.target}
                                </td>
                                <td style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                                    {log.ip}
                                </td>
                                <td>
                                    <span className={`${styles.badge} ${getStatusBadge(log.status)}`}>
                                        {log.status === 'SUCCESS' && <CheckCircle size={12} />}
                                        {log.status === 'PENDING_APPROVAL' && <Clock size={12} />}
                                        {log.status === 'REJECTED' && <AlertTriangle size={12} />}
                                        {log.status.replace('_', ' ')}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
                    Showing 1-8 of 1,247 entries
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button className={`${styles.btn} ${styles.btnSecondary}`} style={{ padding: '8px 16px' }}>Previous</button>
                    <button className={`${styles.btn} ${styles.btnSecondary}`} style={{ padding: '8px 16px' }}>Next</button>
                </div>
            </div>
        </div>
    );
}
