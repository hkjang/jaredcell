'use client';

import React from 'react';
import { Activity, CheckCircle, AlertTriangle, XCircle, Server, Database, Cpu, HardDrive, RefreshCw, Play, Clock, Wifi } from 'lucide-react';
import styles from '@/styles/common.module.css';

const services = [
    { name: 'Attack Execution Engine', status: 'Healthy', uptime: '99.98%', lastCheck: '10s ago', icon: Activity },
    { name: 'Local AI Inference (vLLM)', status: 'Healthy', uptime: '99.95%', lastCheck: '15s ago', icon: Cpu },
    { name: 'Database (PostgreSQL)', status: 'Healthy', uptime: '100%', lastCheck: '5s ago', icon: Database },
    { name: 'Log Storage (WORM)', status: 'Healthy', uptime: '100%', lastCheck: '8s ago', icon: HardDrive },
    { name: 'Backup Service', status: 'Warning', uptime: '98.5%', lastCheck: '20s ago', icon: Server },
];

const recentIncidents = [
    { id: 'INC-001', description: 'Execution Engine auto-recovery triggered', time: '2h ago', status: 'Resolved', action: 'Auto-restart completed' },
    { id: 'INC-002', description: 'High memory usage on AI Worker #2', time: '1d ago', status: 'Resolved', action: 'Worker rebalanced' },
];

const drScenarios = [
    { name: 'Full System Recovery', lastTested: '2024-12-01', result: 'Passed', rpo: '1 hour', rto: '4 hours' },
    { name: 'Database Failover', lastTested: '2024-12-10', result: 'Passed', rpo: '15 min', rto: '30 min' },
    { name: 'AI Model Restoration', lastTested: '2024-11-15', result: 'Passed', rpo: '1 hour', rto: '2 hours' },
];

export default function SystemHealthPage() {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Healthy': return <CheckCircle size={16} color="var(--success)" />;
            case 'Warning': return <AlertTriangle size={16} color="#ff8f00" />;
            case 'Critical': return <XCircle size={16} color="var(--danger)" />;
            default: return null;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Healthy': return 'var(--success)';
            case 'Warning': return '#ff8f00';
            case 'Critical': return 'var(--danger)';
            default: return 'var(--text-secondary)';
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>System Health & Recovery</h1>
                    <p className={styles.subtitle}>Real-time monitoring, auto-recovery, and disaster recovery management</p>
                </div>
                <button className={`${styles.btn} ${styles.btnSecondary}`}>
                    <RefreshCw size={16} />
                    Force Health Check
                </button>
            </div>

            {/* Overall Status Banner */}
            <div style={{
                background: 'rgba(0, 255, 128, 0.05)',
                border: '1px solid rgba(0, 255, 128, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '20px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 24
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: 'rgba(0, 255, 128, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <CheckCircle size={24} color="var(--success)" />
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--success)', marginBottom: 4 }}>
                            All Systems Operational
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            5/5 services healthy | Auto-recovery enabled | Last full check: 10s ago
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 32, fontSize: '0.9rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: 'var(--text-tertiary)', marginBottom: 4 }}>Uptime (30d)</div>
                        <div style={{ fontWeight: 700, fontSize: '1.3rem', color: 'var(--success)' }}>99.97%</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: 'var(--text-tertiary)', marginBottom: 4 }}>Incidents (30d)</div>
                        <div style={{ fontWeight: 700, fontSize: '1.3rem' }}>2</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: 'var(--text-tertiary)', marginBottom: 4 }}>Auto-Recoveries</div>
                        <div style={{ fontWeight: 700, fontSize: '1.3rem' }}>3</div>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Service Status</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                    {services.map((service) => {
                        const Icon = service.icon;
                        return (
                            <div key={service.name} className={styles.card} style={{ padding: 16 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{
                                            padding: 8,
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            borderRadius: 8
                                        }}>
                                            <Icon size={20} color="var(--primary)" />
                                        </div>
                                        <span style={{ fontWeight: 500 }}>{service.name}</span>
                                    </div>
                                    {getStatusIcon(service.status)}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                    <span style={{ color: 'var(--text-tertiary)' }}>Uptime</span>
                                    <span style={{ fontWeight: 600, color: getStatusColor(service.status) }}>{service.uptime}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginTop: 4 }}>
                                    <span style={{ color: 'var(--text-tertiary)' }}>Last Check</span>
                                    <span>{service.lastCheck}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Recent Incidents */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Recent Incidents & Recoveries</h2>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Incident ID</th>
                                <th>Description</th>
                                <th>Time</th>
                                <th>Status</th>
                                <th>Action Taken</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentIncidents.map((inc) => (
                                <tr key={inc.id}>
                                    <td><code>{inc.id}</code></td>
                                    <td style={{ fontWeight: 500 }}>{inc.description}</td>
                                    <td style={{ color: 'var(--text-tertiary)' }}>{inc.time}</td>
                                    <td>
                                        <span className={`${styles.badge} ${styles.badgeActive}`}>
                                            <CheckCircle size={12} />
                                            {inc.status}
                                        </span>
                                    </td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{inc.action}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Disaster Recovery */}
            <div className={styles.section}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 className={styles.sectionTitle} style={{ marginBottom: 0, paddingBottom: 0, borderBottom: 'none' }}>
                        Disaster Recovery Scenarios
                    </h2>
                    <button className={`${styles.btn} ${styles.btnPrimary}`}>
                        <Play size={16} />
                        Run DR Drill
                    </button>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Scenario</th>
                                <th>Last Tested</th>
                                <th>Result</th>
                                <th>RPO</th>
                                <th>RTO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drScenarios.map((dr, idx) => (
                                <tr key={idx}>
                                    <td style={{ fontWeight: 500 }}>{dr.name}</td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{dr.lastTested}</td>
                                    <td>
                                        <span className={`${styles.badge} ${dr.result === 'Passed' ? styles.badgeActive : styles.badgeCritical}`}>
                                            {dr.result === 'Passed' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                            {dr.result}
                                        </span>
                                    </td>
                                    <td>{dr.rpo}</td>
                                    <td>{dr.rto}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{
                    marginTop: 16,
                    padding: 16,
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)'
                }}>
                    <strong>Note:</strong> RPO = Recovery Point Objective (max data loss), RTO = Recovery Time Objective (max downtime)
                </div>
            </div>
        </div>
    );
}
