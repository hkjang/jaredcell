'use client';

import React, { useState } from 'react';
import { Cpu, Brain, Target, TrendingUp, AlertTriangle, CheckCircle, Play, Pause, BarChart3, RefreshCw, Zap, Shield } from 'lucide-react';
import styles from '@/styles/common.module.css';

const models = [
    { id: 'llm-1', name: 'Customer Chatbot (GPT-4)', type: 'LLM', status: 'Testing', trustScore: 72, attacks: 145, vulnerabilities: 8 },
    { id: 'llm-2', name: 'Internal Assistant (Llama-3)', type: 'LLM', status: 'Completed', trustScore: 88, attacks: 230, vulnerabilities: 3 },
    { id: 'mm-1', name: 'Image Analyzer (CLIP)', type: 'Multimodal', status: 'Queued', trustScore: null, attacks: 0, vulnerabilities: 0 },
    { id: 'rag-1', name: 'Knowledge RAG Service', type: 'RAG', status: 'Testing', trustScore: 65, attacks: 89, vulnerabilities: 12 },
    { id: 'agent-1', name: 'Autonomous Task Agent', type: 'Agent', status: 'Critical', trustScore: 41, attacks: 56, vulnerabilities: 18 },
];

const attackCampaigns = [
    { id: 'CAMP-001', name: 'Jailbreak Stress Test', target: 'Customer Chatbot', type: 'Direct Bypass', progress: 78, status: 'Running' },
    { id: 'CAMP-002', name: 'Context Poisoning Suite', target: 'Knowledge RAG', type: 'Context Attack', progress: 100, status: 'Completed' },
    { id: 'CAMP-003', name: 'Role Confusion Matrix', target: 'All LLMs', type: 'Role Attack', progress: 45, status: 'Running' },
];

const safetyMetrics = [
    { label: 'Policy Compliance Rate', value: '94.2%', trend: '+2.1%', color: 'var(--success)' },
    { label: 'Hallucination Rate', value: '4.8%', trend: '-0.5%', color: '#ff8f00' },
    { label: 'Sensitive Info Leakage', value: '0.3%', trend: '-0.1%', color: 'var(--success)' },
    { label: 'Exploit Success Rate', value: '12.4%', trend: '+1.2%', color: 'var(--danger)' },
];

export default function AIRedTeamingPage() {
    const [selectedModel, setSelectedModel] = useState<string | null>(null);

    const getTrustColor = (score: number | null) => {
        if (score === null) return 'var(--text-tertiary)';
        if (score >= 80) return 'var(--success)';
        if (score >= 60) return '#ff8f00';
        return 'var(--danger)';
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>AI Red Teaming</h1>
                    <p className={styles.subtitle}>Comprehensive AI model security testing and safety evaluation</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button className={`${styles.btn} ${styles.btnSecondary}`}>
                        <BarChart3 size={16} />
                        Safety Report
                    </button>
                    <button className={`${styles.btn} ${styles.btnPrimary}`}>
                        <Zap size={16} />
                        Launch Campaign
                    </button>
                </div>
            </div>

            {/* Safety Metrics Overview */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
                {safetyMetrics.map((metric, idx) => (
                    <div key={idx} className={styles.card} style={{ textAlign: 'center', padding: 20 }}>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 8 }}>{metric.label}</div>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: metric.color }}>{metric.value}</div>
                        <div style={{
                            fontSize: '0.85rem',
                            color: metric.trend.startsWith('+') && metric.label.includes('Exploit') ? 'var(--danger)' :
                                metric.trend.startsWith('-') ? 'var(--success)' : 'var(--success)',
                            marginTop: 4
                        }}>
                            <TrendingUp size={14} style={{ display: 'inline', marginRight: 4 }} />
                            {metric.trend} vs last week
                        </div>
                    </div>
                ))}
            </div>

            {/* Model Inventory */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Target Models</h2>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Model</th>
                                <th>Type</th>
                                <th>Trust Score</th>
                                <th>Attacks Run</th>
                                <th>Vulnerabilities</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {models.map((model) => (
                                <tr key={model.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{
                                                padding: 8,
                                                background: 'rgba(0, 229, 255, 0.1)',
                                                borderRadius: 8
                                            }}>
                                                {model.type === 'Agent' ? <Brain size={18} color="var(--primary)" /> : <Cpu size={18} color="var(--primary)" />}
                                            </div>
                                            <span style={{ fontWeight: 500 }}>{model.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`${styles.badge} ${styles.badgeWarning}`}>{model.type}</span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{
                                                width: 60,
                                                height: 8,
                                                background: 'rgba(255,255,255,0.1)',
                                                borderRadius: 4,
                                                overflow: 'hidden'
                                            }}>
                                                <div style={{
                                                    width: model.trustScore ? `${model.trustScore}%` : '0%',
                                                    height: '100%',
                                                    background: getTrustColor(model.trustScore),
                                                    transition: 'width 0.3s'
                                                }}></div>
                                            </div>
                                            <span style={{ fontWeight: 600, color: getTrustColor(model.trustScore) }}>
                                                {model.trustScore ?? '-'}
                                            </span>
                                        </div>
                                    </td>
                                    <td>{model.attacks}</td>
                                    <td>
                                        {model.vulnerabilities > 0 ? (
                                            <span style={{ color: 'var(--danger)', fontWeight: 600 }}>{model.vulnerabilities}</span>
                                        ) : '-'}
                                    </td>
                                    <td>
                                        <span className={`${styles.badge} ${model.status === 'Completed' ? styles.badgeActive :
                                                model.status === 'Critical' ? styles.badgeCritical :
                                                    model.status === 'Testing' ? styles.badgeWarning :
                                                        styles.badgeInactive
                                            }`}>
                                            {model.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button className={`${styles.btn} ${styles.btnSecondary}`} style={{ padding: '6px 12px' }}>
                                                <Play size={14} />
                                                Test
                                            </button>
                                            <button className={styles.btnIcon}>
                                                <Target size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Active Campaigns */}
            <div className={styles.section}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h2 className={styles.sectionTitle} style={{ marginBottom: 0, paddingBottom: 0, borderBottom: 'none' }}>
                        Attack Campaigns
                    </h2>
                    <button className={`${styles.btn} ${styles.btnSecondary}`} style={{ padding: '8px 16px' }}>
                        <RefreshCw size={14} />
                        Refresh
                    </button>
                </div>

                <div className={styles.cardsGrid}>
                    {attackCampaigns.map((campaign) => (
                        <div key={campaign.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <code style={{ background: '#222', padding: '4px 8px', borderRadius: 4, fontSize: '0.8rem' }}>
                                    {campaign.id}
                                </code>
                                <span className={`${styles.badge} ${campaign.status === 'Running' ? styles.badgeWarning :
                                        campaign.status === 'Completed' ? styles.badgeActive :
                                            styles.badgeInactive
                                    }`}>
                                    {campaign.status === 'Running' && <Play size={10} />}
                                    {campaign.status}
                                </span>
                            </div>
                            <div className={styles.cardTitle}>{campaign.name}</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 12 }}>
                                Target: {campaign.target} | Type: {campaign.type}
                            </div>

                            {/* Progress Bar */}
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: 4 }}>
                                    <span style={{ color: 'var(--text-tertiary)' }}>Progress</span>
                                    <span style={{ fontWeight: 600 }}>{campaign.progress}%</span>
                                </div>
                                <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
                                    <div style={{
                                        width: `${campaign.progress}%`,
                                        height: '100%',
                                        background: campaign.status === 'Completed' ? 'var(--success)' : 'var(--primary)',
                                        transition: 'width 0.3s'
                                    }}></div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 8 }}>
                                {campaign.status === 'Running' && (
                                    <button className={`${styles.btn} ${styles.btnSecondary}`} style={{ flex: 1 }}>
                                        <Pause size={14} />
                                        Pause
                                    </button>
                                )}
                                <button className={`${styles.btn} ${styles.btnSecondary}`} style={{ flex: 1 }}>
                                    View Results
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Attack Types */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Attack Simulation Types</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                    {[
                        { name: 'Context Poisoning', desc: 'Long conversation bypass, response contamination', count: 12 },
                        { name: 'Role Confusion', desc: 'System/Developer/User role mixing', count: 8 },
                        { name: 'Output Distortion', desc: 'Fact/Policy/Tone manipulation', count: 15 },
                        { name: 'Memory Attack', desc: 'Memory corruption, false info persistence', count: 6 },
                    ].map((type, idx) => (
                        <div key={idx} className={styles.card} style={{ padding: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                <span style={{ fontWeight: 600 }}>{type.name}</span>
                                <span style={{
                                    padding: '4px 8px',
                                    background: 'rgba(0, 229, 255, 0.1)',
                                    borderRadius: 'var(--radius-full)',
                                    fontSize: '0.8rem',
                                    color: 'var(--primary)'
                                }}>{type.count} payloads</span>
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>{type.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
