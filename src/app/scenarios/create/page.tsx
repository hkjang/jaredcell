'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Cpu, Globe, Server, ShieldAlert, Target, FileText } from 'lucide-react';
import Link from 'next/link';
import styles from '@/styles/common.module.css';

const templates = [
    { id: 'web-xss', name: 'Web XSS Testing', icon: Globe, category: 'Web', description: 'Standard XSS payload injection for web applications' },
    { id: 'api-sqli', name: 'API SQL Injection', icon: Server, category: 'API', description: 'SQL injection fuzzing for REST/GraphQL endpoints' },
    { id: 'llm-jailbreak', name: 'LLM Jailbreak Suite', icon: Cpu, category: 'AI', description: 'Comprehensive prompt injection attacks (DAN, Crescendo, etc.)' },
    { id: 'rag-leakage', name: 'RAG Knowledge Leakage', icon: FileText, category: 'AI', description: 'Test for unauthorized document retrieval in RAG systems' },
    { id: 'agent-abuse', name: 'Agent Tool Abuse', icon: ShieldAlert, category: 'AI', description: 'Test for misuse of tools by autonomous agents' },
];

export default function CreateScenarioPage() {
    const [step, setStep] = useState(1);
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [scenarioName, setScenarioName] = useState('');
    const [targetUrl, setTargetUrl] = useState('');

    return (
        <div className={styles.container}>
            <Link href="/scenarios" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', marginBottom: 24 }}>
                <ArrowLeft size={16} /> Back to Scenarios
            </Link>

            <h1 className={styles.title} style={{ marginBottom: 8 }}>Create Attack Scenario</h1>
            <p className={styles.subtitle}>Follow the wizard to configure a new red team attack simulation.</p>

            {/* Progress Stepper */}
            <div style={{ display: 'flex', gap: 8, margin: '32px 0', alignItems: 'center' }}>
                {[1, 2, 3].map((s) => (
                    <React.Fragment key={s}>
                        <div style={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            background: step >= s ? 'var(--primary)' : 'var(--bg-card)',
                            color: step >= s ? '#000' : 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            border: `2px solid ${step >= s ? 'var(--primary)' : 'var(--border-subtle)'}`
                        }}>
                            {step > s ? <Check size={18} /> : s}
                        </div>
                        {s < 3 && <div style={{ flex: 1, height: 2, background: step > s ? 'var(--primary)' : 'var(--border-subtle)' }}></div>}
                    </React.Fragment>
                ))}
            </div>

            {/* Step 1: Select Template */}
            {step === 1 && (
                <div>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: 20 }}>Step 1: Select Attack Template</h2>
                    <div className={styles.cardsGrid}>
                        {templates.map((template) => {
                            const Icon = template.icon;
                            const isSelected = selectedTemplate === template.id;
                            return (
                                <div
                                    key={template.id}
                                    className={styles.card}
                                    onClick={() => setSelectedTemplate(template.id)}
                                    style={{
                                        cursor: 'pointer',
                                        borderColor: isSelected ? 'var(--primary)' : undefined,
                                        background: isSelected ? 'rgba(0, 229, 255, 0.05)' : undefined
                                    }}
                                >
                                    <div className={styles.cardHeader}>
                                        <div style={{ padding: 10, background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
                                            <Icon size={22} color={isSelected ? 'var(--primary)' : 'var(--text-secondary)'} />
                                        </div>
                                        <span className={`${styles.badge} ${styles.badgeWarning}`}>{template.category}</span>
                                    </div>
                                    <div className={styles.cardTitle}>{template.name}</div>
                                    <div className={styles.cardDescription}>{template.description}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Step 2: Configure Target */}
            {step === 2 && (
                <div>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: 20 }}>Step 2: Configure Target</h2>
                    <div className={styles.section} style={{ maxWidth: 600 }}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Scenario Name</label>
                            <input
                                type="text"
                                className={styles.formInput}
                                placeholder="e.g., Production Chatbot Jailbreak Test"
                                value={scenarioName}
                                onChange={(e) => setScenarioName(e.target.value)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Target URL / Endpoint</label>
                            <input
                                type="text"
                                className={styles.formInput}
                                placeholder="https://api.target.com/v1/chat"
                                value={targetUrl}
                                onChange={(e) => setTargetUrl(e.target.value)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Environment</label>
                            <select className={styles.formSelect}>
                                <option>Development</option>
                                <option>Staging</option>
                                <option>Production (Requires Approval)</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Execution Mode</label>
                            <select className={styles.formSelect}>
                                <option>Manual (Requires Start Command)</option>
                                <option>Scheduled (Cron)</option>
                                <option>Event-Triggered (CI/CD Hook)</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 3: Review & Create */}
            {step === 3 && (
                <div>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: 20 }}>Step 3: Review & Create</h2>
                    <div className={styles.section} style={{ maxWidth: 600 }}>
                        <div style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--border-subtle)' }}>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 4 }}>Template</div>
                            <div style={{ fontWeight: 600 }}>{templates.find(t => t.id === selectedTemplate)?.name}</div>
                        </div>
                        <div style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--border-subtle)' }}>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 4 }}>Scenario Name</div>
                            <div style={{ fontWeight: 600 }}>{scenarioName || 'Untitled Scenario'}</div>
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 4 }}>Target</div>
                            <div style={{ fontWeight: 600 }}>{targetUrl || 'Not specified'}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
                <button
                    className={`${styles.btn} ${styles.btnSecondary}`}
                    onClick={() => setStep(Math.max(1, step - 1))}
                    disabled={step === 1}
                    style={{ opacity: step === 1 ? 0.5 : 1 }}
                >
                    <ArrowLeft size={16} />
                    Previous
                </button>

                {step < 3 ? (
                    <button
                        className={`${styles.btn} ${styles.btnPrimary}`}
                        onClick={() => setStep(step + 1)}
                        disabled={step === 1 && !selectedTemplate}
                        style={{ opacity: (step === 1 && !selectedTemplate) ? 0.5 : 1 }}
                    >
                        Next
                        <ArrowRight size={16} />
                    </button>
                ) : (
                    <Link href="/scenarios">
                        <button className={`${styles.btn} ${styles.btnPrimary}`}>
                            <Check size={16} />
                            Create Scenario
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}
