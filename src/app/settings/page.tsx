'use client';

import React, { useState } from 'react';
import { User, Key, Bell, Cpu, Globe, Shield, Save, RefreshCw } from 'lucide-react';
import styles from '@/styles/common.module.css';

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState('ai');

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Platform Settings</h1>
                    <p className={styles.subtitle}>Configure system preferences and integrations</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 24 }}>
                {/* Sidebar Navigation */}
                <div className={styles.section} style={{ padding: 0, height: 'fit-content' }}>
                    {[
                        { id: 'ai', icon: Cpu, label: 'AI Configuration' },
                        { id: 'users', icon: User, label: 'User Management' },
                        { id: 'auth', icon: Key, label: 'Authentication' },
                        { id: 'notifications', icon: Bell, label: 'Notifications' },
                        { id: 'integrations', icon: Globe, label: 'Integrations' },
                    ].map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                padding: '14px 20px',
                                cursor: 'pointer',
                                borderLeft: activeSection === item.id ? '3px solid var(--primary)' : '3px solid transparent',
                                background: activeSection === item.id ? 'rgba(0, 229, 255, 0.05)' : 'transparent',
                                color: activeSection === item.id ? 'var(--primary)' : 'var(--text-secondary)',
                                transition: 'all 0.2s'
                            }}
                        >
                            <item.icon size={18} />
                            <span style={{ fontWeight: 500 }}>{item.label}</span>
                        </div>
                    ))}
                </div>

                {/* Content Area */}
                <div>
                    {activeSection === 'ai' && (
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>AI Model Configuration</h2>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Primary LLM Provider</label>
                                <select className={styles.formSelect}>
                                    <option>OpenAI (GPT-4 Turbo)</option>
                                    <option>Azure OpenAI</option>
                                    <option>Anthropic Claude</option>
                                    <option>vLLM (Self-hosted)</option>
                                    <option>Ollama (Local)</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>API Endpoint URL</label>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    placeholder="https://api.openai.com/v1"
                                    defaultValue="https://api.openai.com/v1"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>API Key</label>
                                <input
                                    type="password"
                                    className={styles.formInput}
                                    placeholder="sk-..."
                                    defaultValue="sk-••••••••••••••••••••"
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Temperature</label>
                                    <input type="number" className={styles.formInput} defaultValue="0.7" step="0.1" min="0" max="2" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Max Tokens</label>
                                    <input type="number" className={styles.formInput} defaultValue="4096" />
                                </div>
                            </div>

                            <div className={styles.toggleWrapper}>
                                <div>
                                    <div className={styles.toggleLabel}>Enable Prompt Evolution</div>
                                    <div className={styles.toggleDescription}>Automatically mutate prompts based on previous attack success</div>
                                </div>
                                <div className={`${styles.toggle} active`}></div>
                            </div>

                            <div className={styles.toggleWrapper}>
                                <div>
                                    <div className={styles.toggleLabel}>AI Feedback Loop</div>
                                    <div className={styles.toggleDescription}>Learn from successful attack patterns to generate new payloads</div>
                                </div>
                                <div className={`${styles.toggle} active`}></div>
                            </div>

                            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                                <button className={`${styles.btn} ${styles.btnPrimary}`}>
                                    <Save size={16} />
                                    Save Changes
                                </button>
                                <button className={`${styles.btn} ${styles.btnSecondary}`}>
                                    <RefreshCw size={16} />
                                    Test Connection
                                </button>
                            </div>
                        </div>
                    )}

                    {activeSection === 'users' && (
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>User & Role Management</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
                                Manage RBAC (Role-Based Access Control) for your organization.
                            </p>

                            <div className={styles.tableWrapper}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Role</th>
                                            <th>Last Active</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { name: 'Admin User', email: 'admin@corp.com', role: 'Platform Admin', lastActive: 'Now' },
                                            { name: 'Red Team Lead', email: 'redlead@corp.com', role: 'Red Team', lastActive: '2h ago' },
                                            { name: 'Blue Team Analyst', email: 'blue@corp.com', role: 'Blue Team', lastActive: '1d ago' },
                                        ].map((user, idx) => (
                                            <tr key={idx}>
                                                <td>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                        <div style={{
                                                            width: 36,
                                                            height: 36,
                                                            borderRadius: '50%',
                                                            background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            color: '#fff',
                                                            fontWeight: 600
                                                        }}>{user.name.charAt(0)}</div>
                                                        <div>
                                                            <div style={{ fontWeight: 500 }}>{user.name}</div>
                                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><span className={`${styles.badge} ${styles.badgeActive}`}>{user.role}</span></td>
                                                <td style={{ color: 'var(--text-secondary)' }}>{user.lastActive}</td>
                                                <td>
                                                    <button className={`${styles.btn} ${styles.btnSecondary}`} style={{ padding: '6px 12px' }}>Edit</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeSection === 'notifications' && (
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Notification Settings</h2>

                            <div className={styles.toggleWrapper}>
                                <div>
                                    <div className={styles.toggleLabel}>Slack Integration</div>
                                    <div className={styles.toggleDescription}>Send alerts to #security-alerts channel</div>
                                </div>
                                <div className={`${styles.toggle} active`}></div>
                            </div>

                            <div className={styles.toggleWrapper}>
                                <div>
                                    <div className={styles.toggleLabel}>Email Alerts</div>
                                    <div className={styles.toggleDescription}>Notify security team on critical findings</div>
                                </div>
                                <div className={`${styles.toggle} active`}></div>
                            </div>

                            <div className={styles.toggleWrapper}>
                                <div>
                                    <div className={styles.toggleLabel}>Jira Ticketing</div>
                                    <div className={styles.toggleDescription}>Auto-create tickets for vulnerabilities</div>
                                </div>
                                <div className={styles.toggle}></div>
                            </div>
                        </div>
                    )}

                    {(activeSection === 'auth' || activeSection === 'integrations') && (
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>{activeSection === 'auth' ? 'Authentication Settings' : 'External Integrations'}</h2>
                            <p style={{ color: 'var(--text-tertiary)' }}>Coming soon...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
