'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingDown } from 'lucide-react';
import styles from '../Reports.module.css';

export default function ExecutiveReportPage() {
    return (
        <div className={styles.reportGrid}>
            <div className={styles.reportHeader}>
                <div className={styles.reportTitle}>
                    <Link href="/reports" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', marginBottom: 12, fontSize: '0.9rem' }}>
                        <ArrowLeft size={14} /> Back to Reports
                    </Link>
                    <h1>Weekly Executive Summary</h1>
                    <p style={{ color: 'var(--text-tertiary)' }}>Reporting Period: Dec 11 - Dec 18, 2024</p>
                </div>
                <button style={{ padding: '12px 24px', background: 'var(--primary)', color: '#000', border: 'none', borderRadius: 6, fontWeight: 700 }}>Download PDF</button>
            </div>

            <div className={styles.metricCard}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Security Posture Score</div>
                <div className={styles.metricValue} style={{ color: 'var(--primary)' }}>88/100</div>
                <div style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: '0.85rem' }}>
                    <TrendingDown size={14} /> +2.5% from last week
                </div>
            </div>

            <div className={styles.metricCard}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Critical Risks Mitigated</div>
                <div className={styles.metricValue}>12</div>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>Automated Fixes Applied</div>
            </div>

            <div className={styles.metricCard}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>AI Hallucination Rate</div>
                <div className={styles.metricValue} style={{ color: '#ffbd2e' }}>4.2%</div>
                <div style={{ color: '#ffbd2e', fontSize: '0.85rem' }}>Requires Attention (&gt;3%)</div>
            </div>

            <div className={styles.metricCard}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Active Tenants</div>
                <div className={styles.metricValue}>8</div>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>Fully Isolated</div>
            </div>

            {/* Mock Charts */}
            <div className={styles.chartContainer}>
                [Risk Trend Chart Placeholder]
                <br />
                (Visualizing risk reduction over time)
            </div>

            <div className={styles.chartContainer}>
                [Vulnerability Distribution by Category]
                <br />
                (Web vs API vs AI)
            </div>
        </div>
    );
}
