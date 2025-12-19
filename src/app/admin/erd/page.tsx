'use client';

import React from 'react';
import { Database, Link2, Key, FileText, ArrowRight } from 'lucide-react';
import styles from '@/styles/common.module.css';

const entities = [
    { name: 'User', korean: '사용자', columns: ['id', 'username', 'email', 'role_id', 'created_at'], pk: 'id', fk: ['role_id → Role'] },
    { name: 'Role', korean: '역할', columns: ['id', 'name', 'permissions', 'created_at'], pk: 'id', fk: [] },
    { name: 'Scenario', korean: '시나리오', columns: ['id', 'name', 'type', 'risk_level', 'created_by', 'status'], pk: 'id', fk: ['created_by → User'] },
    { name: 'Prompt', korean: '프롬프트', columns: ['id', 'scenario_id', 'content', 'variant_of', 'difficulty'], pk: 'id', fk: ['scenario_id → Scenario', 'variant_of → Prompt'] },
    { name: 'Execution', korean: '실행', columns: ['id', 'scenario_id', 'model_id', 'seed', 'status', 'started_at', 'ended_at'], pk: 'id', fk: ['scenario_id → Scenario', 'model_id → AIModel'] },
    { name: 'Result', korean: '결과', columns: ['id', 'execution_id', 'input', 'output', 'verdict', 'risk_score', 'evidence'], pk: 'id', fk: ['execution_id → Execution'] },
    { name: 'AIModel', korean: 'AI 모델', columns: ['id', 'name', 'version', 'type', 'hash', 'is_locked'], pk: 'id', fk: [] },
    { name: 'AuditLog', korean: '감사 로그', columns: ['id', 'user_id', 'action', 'target', 'hash', 'prev_hash', 'created_at'], pk: 'id', fk: ['user_id → User'] },
    { name: 'Report', korean: '리포트', columns: ['id', 'title', 'type', 'created_by', 'status', 'created_at'], pk: 'id', fk: ['created_by → User'] },
    { name: 'Policy', korean: '정책', columns: ['id', 'name', 'type', 'rules', 'is_active', 'version'], pk: 'id', fk: [] },
];

const relationships = [
    { from: 'User', to: 'Role', type: 'N:1', label: 'has' },
    { from: 'Scenario', to: 'User', type: 'N:1', label: 'created by' },
    { from: 'Prompt', to: 'Scenario', type: 'N:1', label: 'belongs to' },
    { from: 'Execution', to: 'Scenario', type: 'N:1', label: 'runs' },
    { from: 'Execution', to: 'AIModel', type: 'N:1', label: 'uses' },
    { from: 'Result', to: 'Execution', type: 'N:1', label: 'from' },
    { from: 'AuditLog', to: 'User', type: 'N:1', label: 'by' },
    { from: 'Report', to: 'User', type: 'N:1', label: 'authored by' },
];

export default function ERDViewerPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>데이터 모델 (ERD)</h1>
                    <p className={styles.subtitle}>논리/물리 ERD 및 엔티티 관계 정의</p>
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
                <div className={styles.card} style={{ textAlign: 'center', padding: 20 }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>10</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>엔티티</div>
                </div>
                <div className={styles.card} style={{ textAlign: 'center', padding: 20 }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700 }}>8</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>관계</div>
                </div>
                <div className={styles.card} style={{ textAlign: 'center', padding: 20 }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--success)' }}>100%</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>FK 정의</div>
                </div>
                <div className={styles.card} style={{ textAlign: 'center', padding: 20 }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700 }}>v1.0</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>스키마 버전</div>
                </div>
            </div>

            {/* Entity List */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>엔티티 정의</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                    {entities.map((entity) => (
                        <div key={entity.name} className={styles.card}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                <div style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 8,
                                    background: 'rgba(0, 229, 255, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Database size={20} color="var(--primary)" />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700 }}>{entity.name}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>{entity.korean}</div>
                                </div>
                            </div>

                            <div style={{ fontSize: '0.85rem', marginBottom: 12 }}>
                                <div style={{ color: 'var(--text-tertiary)', marginBottom: 4 }}>컬럼:</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                    {entity.columns.map((col) => (
                                        <code key={col} style={{
                                            padding: '2px 8px',
                                            background: col === entity.pk ? 'rgba(0, 255, 128, 0.1)' : 'rgba(255,255,255,0.05)',
                                            border: col === entity.pk ? '1px solid rgba(0, 255, 128, 0.3)' : '1px solid var(--border-subtle)',
                                            borderRadius: 4,
                                            fontSize: '0.8rem'
                                        }}>
                                            {col === entity.pk && <Key size={10} style={{ marginRight: 4 }} />}
                                            {col}
                                        </code>
                                    ))}
                                </div>
                            </div>

                            {entity.fk.length > 0 && (
                                <div style={{ fontSize: '0.85rem' }}>
                                    <div style={{ color: 'var(--text-tertiary)', marginBottom: 4 }}>FK:</div>
                                    {entity.fk.map((fk, idx) => (
                                        <div key={idx} style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <Link2 size={12} />
                                            <code style={{ fontSize: '0.8rem' }}>{fk}</code>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Relationships */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>관계 정의</h2>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>From</th>
                                <th></th>
                                <th>To</th>
                                <th>관계</th>
                                <th>설명</th>
                            </tr>
                        </thead>
                        <tbody>
                            {relationships.map((rel, idx) => (
                                <tr key={idx}>
                                    <td><code>{rel.from}</code></td>
                                    <td style={{ textAlign: 'center' }}><ArrowRight size={16} color="var(--primary)" /></td>
                                    <td><code>{rel.to}</code></td>
                                    <td><span className={`${styles.badge} ${styles.badgeWarning}`}>{rel.type}</span></td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{rel.label}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Data Lifecycle */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>데이터 생명주기</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                    {[
                        { stage: '생성', desc: '사용자/AI 생성', color: 'var(--primary)' },
                        { stage: '수정', desc: '이력 자동 저장', color: '#ff8f00' },
                        { stage: '삭제', desc: '논리/물리 분리', color: 'var(--danger)' },
                        { stage: '보존', desc: '기간 정책화', color: 'var(--success)' },
                    ].map((item) => (
                        <div key={item.stage} style={{
                            padding: 16,
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: 8,
                            borderLeft: `3px solid ${item.color}`
                        }}>
                            <div style={{ fontWeight: 600, color: item.color, marginBottom: 4 }}>{item.stage}</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
