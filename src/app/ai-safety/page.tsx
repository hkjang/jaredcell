'use client';

import React, { useState } from 'react';
import { Shield, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Eye, Lock, Brain, BarChart3, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import styles from '@/styles/common.module.css';

const modelSafetyData = [
    {
        model: 'Customer Chatbot (GPT-4)',
        trustScore: 72,
        policyCompliance: 94.2,
        hallucinationRate: 4.8,
        sensitiveLeakage: 0.3,
        exploitSuccess: 12.4,
        trend: 'improving'
    },
    {
        model: 'Internal Assistant (Llama-3)',
        trustScore: 88,
        policyCompliance: 97.1,
        hallucinationRate: 2.3,
        sensitiveLeakage: 0.1,
        exploitSuccess: 5.2,
        trend: 'stable'
    },
    {
        model: 'Knowledge RAG Service',
        trustScore: 65,
        policyCompliance: 89.5,
        hallucinationRate: 8.2,
        sensitiveLeakage: 1.2,
        exploitSuccess: 18.7,
        trend: 'declining'
    },
    {
        model: 'Autonomous Task Agent',
        trustScore: 41,
        policyCompliance: 76.3,
        hallucinationRate: 12.1,
        sensitiveLeakage: 2.8,
        exploitSuccess: 34.5,
        trend: 'critical'
    },
];

const vulnerabilityBreakdown = [
    { type: 'Jailbreak/Bypass', count: 23, severity: 'Critical' },
    { type: 'Information Leakage', count: 15, severity: 'High' },
    { type: 'Hallucination', count: 42, severity: 'Medium' },
    { type: 'Policy Violation', count: 18, severity: 'High' },
    { type: 'Context Manipulation', count: 8, severity: 'Critical' },
];

export default function AISafetyMetricsPage() {
    const getTrustColor = (score: number) => {
        if (score >= 80) return 'var(--success)';
        if (score >= 60) return '#ff8f00';
        return 'var(--danger)';
    };

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case 'improving': return <ArrowUpRight size={16} color="var(--success)" />;
            case 'stable': return <TrendingUp size={16} color="var(--primary)" />;
            case 'declining': return <ArrowDownRight size={16} color="#ff8f00" />;
            case 'critical': return <AlertTriangle size={16} color="var(--danger)" />;
            default: return null;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>AI Safety Metrics</h1>
                    <p className={styles.subtitle}>Comprehensive trust scores and safety evaluation for AI models</p>
                </div>
                <button className={`${styles.btn} ${styles.btnPrimary}`}>
                    <BarChart3 size={16} />
                    Export Safety Report
                </button>
            </div>

            {/* Overall Safety Score */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(0, 255, 128, 0.05) 100%)',
                border: '1px solid rgba(0, 229, 255, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: 32,
                textAlign: 'center',
                marginBottom: 24
            }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 8 }}>
                    ORGANIZATION AI SAFETY INDEX
                </div>
                <div style={{
                    fontSize: '5rem',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #00e5ff, #00ff80)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1
                }}>
                    74
                </div>
                <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: 8 }}>
                    <TrendingUp size={16} style={{ display: 'inline', marginRight: 4 }} />
                    +3.2 points from last assessment
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 48, marginTop: 24 }}>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>4</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>Models Tested</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>520</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>Attacks Executed</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--danger)' }}>41</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>Vulnerabilities Found</div>
                    </div>
                </div>
            </div>

            {/* Per-Model Safety Matrix */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Model Safety Comparison</h2>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Model</th>
                                <th>Trust Score</th>
                                <th>Policy Compliance</th>
                                <th>Hallucination Rate</th>
                                <th>Info Leakage</th>
                                <th>Exploit Success</th>
                                <th>Trend</th>
                            </tr>
                        </thead>
                        <tbody>
                            {modelSafetyData.map((model, idx) => (
                                <tr key={idx}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <Brain size={18} color="var(--primary)" />
                                            <span style={{ fontWeight: 500 }}>{model.model}</span>
                                        </div>
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
                                                    width: `${model.trustScore}%`,
                                                    height: '100%',
                                                    background: getTrustColor(model.trustScore)
                                                }}></div>
                                            </div>
                                            <span style={{ fontWeight: 700, color: getTrustColor(model.trustScore) }}>
                                                {model.trustScore}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <span style={{ color: model.policyCompliance >= 95 ? 'var(--success)' : 'var(--text-primary)' }}>
                                            {model.policyCompliance}%
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{ color: model.hallucinationRate > 5 ? '#ff8f00' : 'var(--text-primary)' }}>
                                            {model.hallucinationRate}%
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{ color: model.sensitiveLeakage > 1 ? 'var(--danger)' : 'var(--success)' }}>
                                            {model.sensitiveLeakage}%
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{ color: model.exploitSuccess > 20 ? 'var(--danger)' : model.exploitSuccess > 10 ? '#ff8f00' : 'var(--success)' }}>
                                            {model.exploitSuccess}%
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            {getTrendIcon(model.trend)}
                                            <span style={{
                                                fontSize: '0.85rem',
                                                color: model.trend === 'critical' ? 'var(--danger)' : 'var(--text-secondary)',
                                                textTransform: 'capitalize'
                                            }}>{model.trend}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Vulnerability Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Vulnerability by Type</h2>
                    {vulnerabilityBreakdown.map((vuln, idx) => (
                        <div key={idx} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 0',
                            borderBottom: idx < vulnerabilityBreakdown.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    background: vuln.severity === 'Critical' ? 'var(--danger)' :
                                        vuln.severity === 'High' ? '#ff8f00' : 'var(--primary)'
                                }}></div>
                                <span>{vuln.type}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span className={`${styles.badge} ${vuln.severity === 'Critical' ? styles.badgeCritical :
                                        vuln.severity === 'High' ? styles.badgeWarning :
                                            styles.badgeInactive
                                    }`}>{vuln.severity}</span>
                                <span style={{ fontWeight: 600, width: 30, textAlign: 'right' }}>{vuln.count}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Safety Recommendations</h2>

                    <div style={{
                        background: 'rgba(255, 46, 46, 0.05)',
                        border: '1px solid rgba(255, 46, 46, 0.2)',
                        borderRadius: 8,
                        padding: 16,
                        marginBottom: 16
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <AlertTriangle size={16} color="var(--danger)" />
                            <span style={{ fontWeight: 600, color: 'var(--danger)' }}>Critical: Autonomous Task Agent</span>
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            Trust score below 50. Immediate review of tool permissions and output filtering required.
                        </div>
                    </div>

                    <div style={{
                        background: 'rgba(255, 143, 0, 0.05)',
                        border: '1px solid rgba(255, 143, 0, 0.2)',
                        borderRadius: 8,
                        padding: 16,
                        marginBottom: 16
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <Eye size={16} color="#ff8f00" />
                            <span style={{ fontWeight: 600, color: '#ff8f00' }}>Warning: RAG Service</span>
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            High hallucination rate (8.2%). Consider document index review and retrieval tuning.
                        </div>
                    </div>

                    <div style={{
                        background: 'rgba(0, 255, 128, 0.05)',
                        border: '1px solid rgba(0, 255, 128, 0.2)',
                        borderRadius: 8,
                        padding: 16
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <CheckCircle size={16} color="var(--success)" />
                            <span style={{ fontWeight: 600, color: 'var(--success)' }}>Good: Internal Assistant</span>
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            Highest trust score (88). Model approved for continued production use.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
