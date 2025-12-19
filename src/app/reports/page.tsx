'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, PieChart, Download } from 'lucide-react';
import styles from './Reports.module.css';

const reports = [
    { id: 1, title: 'Weekly Executive Summary', date: 'Dec 18, 2024', type: 'Executive', status: 'Ready' },
    { id: 2, title: 'Deep Dive: AI Prompt Leakage', date: 'Dec 17, 2024', type: 'Technical', status: 'Ready' },
    { id: 3, title: 'Q4 Compliance Audit (ISMS)', date: 'Dec 15, 2024', type: 'Compliance', status: 'Processing' },
];

export default function ReportsPage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Reports Center</h1>
                <button style={{
                    background: 'var(--primary)',
                    color: '#000',
                    padding: '10px 20px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer'
                }}>Generate New Report</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
                {reports.map((report) => (
                    <div key={report.id} style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        padding: 24,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 16
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{
                                padding: 8,
                                borderRadius: 8,
                                background: report.type === 'Executive' ? 'rgba(0, 229, 255, 0.1)' : 'rgba(255, 143, 0, 0.1)',
                                color: report.type === 'Executive' ? 'var(--primary)' : '#ff8f00'
                            }}>
                                {report.type === 'Executive' ? <PieChart size={20} /> : <FileText size={20} />}
                            </div>
                            <span style={{
                                fontSize: '0.8rem',
                                padding: '4px 8px',
                                borderRadius: '99px',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'var(--text-secondary)'
                            }}>{report.status}</span>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: 4 }}>{report.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Generated on {report.date}</p>
                        </div>

                        <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: 12 }}>
                            <Link href={report.type === 'Executive' ? '/reports/executive' : '/reports/technical'} style={{
                                flex: 1,
                                textAlign: 'center',
                                padding: '8px',
                                background: 'var(--bg-glass)',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.9rem',
                                color: 'var(--text-primary)'
                            }}>View Online</Link>
                            <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                <Download size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
