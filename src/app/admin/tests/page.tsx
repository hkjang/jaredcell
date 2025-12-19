'use client';

import React from 'react';
import { TestTube, CheckCircle, XCircle, Clock, Play, AlertTriangle, BarChart3 } from 'lucide-react';
import styles from '@/styles/common.module.css';

const testCategories = [
    { name: '단위 테스트', passed: 245, failed: 3, skipped: 2, coverage: 92 },
    { name: '통합 테스트 (API)', passed: 89, failed: 0, skipped: 1, coverage: 95 },
    { name: 'E2E 테스트', passed: 42, failed: 1, skipped: 0, coverage: 88 },
    { name: '보안 테스트', passed: 28, failed: 0, skipped: 0, coverage: 100 },
    { name: 'AI 재현성 테스트', passed: 156, failed: 12, skipped: 5, coverage: 85 },
    { name: '성능/부하 테스트', passed: 18, failed: 2, skipped: 0, coverage: 90 },
];

const recentRuns = [
    { id: 'TEST-001', type: 'E2E', branch: 'main', status: 'passed', duration: '4m 32s', date: '2024-01-15 14:30' },
    { id: 'TEST-002', type: 'Unit', branch: 'feature/ai-engine', status: 'failed', duration: '2m 15s', date: '2024-01-15 13:45' },
    { id: 'TEST-003', type: 'Security', branch: 'main', status: 'passed', duration: '8m 20s', date: '2024-01-15 12:00' },
];

export default function TestDashboardPage() {
    const totalPassed = testCategories.reduce((sum, c) => sum + c.passed, 0);
    const totalFailed = testCategories.reduce((sum, c) => sum + c.failed, 0);
    const totalTests = totalPassed + totalFailed + testCategories.reduce((sum, c) => sum + c.skipped, 0);
    const overallPassRate = ((totalPassed / (totalPassed + totalFailed)) * 100).toFixed(1);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>테스트 대시보드</h1>
                    <p className={styles.subtitle}>전체 테스트 현황 및 품질 지표</p>
                </div>
                <button className={`${styles.btn} ${styles.btnPrimary}`}>
                    <Play size={16} />
                    전체 테스트 실행
                </button>
            </div>

            {/* Overall Stats */}
            <div style={{
                background: parseFloat(overallPassRate) >= 95
                    ? 'rgba(0, 255, 128, 0.05)'
                    : parseFloat(overallPassRate) >= 90
                        ? 'rgba(255, 143, 0, 0.05)'
                        : 'rgba(255, 46, 46, 0.05)',
                border: `1px solid ${parseFloat(overallPassRate) >= 95 ? 'rgba(0, 255, 128, 0.2)' : parseFloat(overallPassRate) >= 90 ? 'rgba(255, 143, 0, 0.2)' : 'rgba(255, 46, 46, 0.2)'}`,
                borderRadius: 'var(--radius-md)',
                padding: 24,
                marginBottom: 24,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 8 }}>전체 테스트 통과율</div>
                    <div style={{
                        fontSize: '3rem',
                        fontWeight: 800,
                        color: parseFloat(overallPassRate) >= 95 ? 'var(--success)' : parseFloat(overallPassRate) >= 90 ? '#ff8f00' : 'var(--danger)'
                    }}>
                        {overallPassRate}%
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 32 }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700 }}>{totalTests}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>전체</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--success)' }}>{totalPassed}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>통과</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--danger)' }}>{totalFailed}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>실패</div>
                    </div>
                </div>
            </div>

            {/* Test Categories */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>테스트 유형별 현황</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                    {testCategories.map((cat) => {
                        const passRate = (cat.passed / (cat.passed + cat.failed)) * 100;
                        return (
                            <div key={cat.name} className={styles.card}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                                    <div style={{ fontWeight: 600 }}>{cat.name}</div>
                                    <span style={{
                                        fontWeight: 700,
                                        color: passRate >= 95 ? 'var(--success)' : passRate >= 90 ? '#ff8f00' : 'var(--danger)'
                                    }}>{passRate.toFixed(0)}%</span>
                                </div>

                                <div style={{ display: 'flex', gap: 16, marginBottom: 12, fontSize: '0.9rem' }}>
                                    <span style={{ color: 'var(--success)' }}>✓ {cat.passed}</span>
                                    <span style={{ color: 'var(--danger)' }}>✗ {cat.failed}</span>
                                    <span style={{ color: 'var(--text-tertiary)' }}>⊘ {cat.skipped}</span>
                                </div>

                                <div style={{
                                    height: 6,
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    display: 'flex'
                                }}>
                                    <div style={{ width: `${passRate}%`, background: 'var(--success)' }}></div>
                                    <div style={{ width: `${100 - passRate}%`, background: 'var(--danger)' }}></div>
                                </div>

                                <div style={{ marginTop: 12, fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                                    코드 커버리지: {cat.coverage}%
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Recent Runs */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>최근 실행 이력</h2>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>유형</th>
                                <th>브랜치</th>
                                <th>상태</th>
                                <th>소요 시간</th>
                                <th>실행 일시</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentRuns.map((run) => (
                                <tr key={run.id}>
                                    <td><code>{run.id}</code></td>
                                    <td><span className={`${styles.badge} ${styles.badgeWarning}`}>{run.type}</span></td>
                                    <td><code>{run.branch}</code></td>
                                    <td>
                                        {run.status === 'passed' ? (
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--success)' }}>
                                                <CheckCircle size={14} /> 통과
                                            </span>
                                        ) : (
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--danger)' }}>
                                                <XCircle size={14} /> 실패
                                            </span>
                                        )}
                                    </td>
                                    <td>{run.duration}</td>
                                    <td style={{ color: 'var(--text-tertiary)' }}>{run.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quality Gates */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>품질 게이트 (릴리즈 조건)</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                    {[
                        { check: '단위 테스트 통과율 ≥ 95%', status: true },
                        { check: 'E2E 테스트 전체 통과', status: false },
                        { check: '보안 테스트 전체 통과', status: true },
                        { check: 'AI 재현성 테스트 ≥ 90%', status: true },
                        { check: '코드 커버리지 ≥ 80%', status: true },
                        { check: '성능 기준 충족', status: true },
                    ].map((gate, idx) => (
                        <div key={idx} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: 16,
                            background: gate.status ? 'rgba(0, 255, 128, 0.03)' : 'rgba(255, 46, 46, 0.03)',
                            border: `1px solid ${gate.status ? 'rgba(0, 255, 128, 0.1)' : 'rgba(255, 46, 46, 0.1)'}`,
                            borderRadius: 8
                        }}>
                            {gate.status ? (
                                <CheckCircle size={20} color="var(--success)" />
                            ) : (
                                <XCircle size={20} color="var(--danger)" />
                            )}
                            <span>{gate.check}</span>
                        </div>
                    ))}
                </div>

                <div style={{
                    marginTop: 16,
                    padding: 16,
                    background: 'rgba(255, 143, 0, 0.05)',
                    border: '1px solid rgba(255, 143, 0, 0.2)',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                }}>
                    <AlertTriangle size={20} color="#ff8f00" />
                    <span style={{ color: '#ff8f00', fontWeight: 600 }}>
                        릴리즈 차단: E2E 테스트 1건 실패로 인해 배포가 차단되었습니다.
                    </span>
                </div>
            </div>
        </div>
    );
}
