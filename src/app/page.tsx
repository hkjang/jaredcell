'use client';

import React from 'react';
import styles from '@/components/dashboard/Dashboard.module.css';
import { ShieldAlert, Terminal, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className={styles.dashboardGrid}>
      <div className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>Dashboard</h1>
        <p className={styles.welcomeSubtitle}>Integrated Red Teaming Platform Overview</p>
      </div>

      {/* Risk Score */}
      <div className={styles.riskCard}>
        <div className={styles.riskScore}>82</div>
        <div className={styles.riskLabel}>Overall Risk Score</div>
      </div>

      {/* Stats */}
      <div className={styles.statCard}>
        <ShieldAlert size={28} color="var(--danger)" style={{ marginBottom: 12 }} />
        <div>
          <div className={styles.statValue}>14</div>
          <div className={styles.statLabel}>Critical Vulnerabilities</div>
        </div>
      </div>

      <div className={styles.statCard}>
        <Terminal size={28} color="var(--primary)" style={{ marginBottom: 12 }} />
        <div>
          <div className={styles.statValue}>28</div>
          <div className={styles.statLabel}>Active Scenarios</div>
        </div>
      </div>

      <div className={styles.statCard}>
        <CheckCircle2 size={28} color="var(--success)" style={{ marginBottom: 12 }} />
        <div>
          <div className={styles.statValue}>156</div>
          <div className={styles.statLabel}>Passed Checks</div>
        </div>
      </div>

      <div className={styles.statCard}>
        <AlertTriangle size={28} color="#ff8f00" style={{ marginBottom: 12 }} />
        <div>
          <div className={styles.statValue}>3</div>
          <div className={styles.statLabel}>Pending Reviews</div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className={styles.feedSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>Recent Attack Simulations</div>
          <button style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--primary)',
            fontSize: '0.9rem',
            cursor: 'pointer'
          }}>View All</button>
        </div>

        <div className={styles.feedList}>
          {[
            { name: 'API - SQL Injection test', status: 'statusCritical', time: '10 mins ago' },
            { name: 'Web - XSS Standard Payload', status: 'statusSafe', time: '1 hour ago' },
            { name: 'AI - Prompt Leakage (GPT-4)', status: 'statusHigh', time: '2 hours ago' },
            { name: 'Infra - Port Scan (Internal)', status: 'statusSafe', time: '4 hours ago' },
            { name: 'AI - Jailbreak Attempt', status: 'statusCritical', time: 'Yesterday' },
          ].map((item, idx) => (
            <div key={idx} className={styles.feedItem}>
              <div className={styles.feedInfo}>
                <div className={`${styles.feedStatus} ${styles[item.status]}`} />
                <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{item.name}</span>
              </div>
              <div className={styles.feedTime}>{item.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Placeholder for Graph or Map */}
      <div style={{
        gridColumn: 'span 6',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        minHeight: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-tertiary)'
      }}>
        Attack Path Visualization (Mock)
      </div>

    </div>
  );
}
