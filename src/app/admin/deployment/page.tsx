'use client';

import React, { useState } from 'react';
import { Package, Download, CheckCircle, AlertTriangle, Server, HardDrive, RefreshCw, Lock, FileArchive, Wifi, Shield } from 'lucide-react';
import styles from '@/styles/common.module.css';

const deploymentPackages = [
    { version: 'v1.4.2', date: '2024-01-15', size: '2.4 GB', type: 'Full', status: 'Current', hash: 'sha256:a4f2b...' },
    { version: 'v1.4.1', date: '2024-01-10', size: '1.8 GB', type: 'Patch', status: 'Previous', hash: 'sha256:7e3c1...' },
    { version: 'v1.4.0', date: '2024-01-05', size: '2.3 GB', type: 'Full', status: 'Archived', hash: 'sha256:9b2d4...' },
];

const deploymentSteps = [
    { step: 1, name: '패키지 다운로드', desc: 'USB/외부 미디어로 패키지 전송', status: 'complete' },
    { step: 2, name: '무결성 검증', desc: 'SHA256 해시 및 GPG 서명 확인', status: 'complete' },
    { step: 3, name: '서비스 중지', desc: '현재 서비스 graceful shutdown', status: 'complete' },
    { step: 4, name: '백업 생성', desc: '데이터베이스 및 설정 백업', status: 'complete' },
    { step: 5, name: '패키지 설치', desc: '새 버전 배포 및 마이그레이션', status: 'current' },
    { step: 6, name: '서비스 시작', desc: '헬스체크 후 서비스 재시작', status: 'pending' },
    { step: 7, name: '검증 테스트', desc: '스모크 테스트 및 기능 확인', status: 'pending' },
];

export default function DeploymentGuidePage() {
    const [activeTab, setActiveTab] = useState('packages');

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>배포 관리</h1>
                    <p className={styles.subtitle}>오프라인망 패키지 배포 및 버전 관리</p>
                </div>
                <button className={`${styles.btn} ${styles.btnPrimary}`}>
                    <Download size={16} />
                    패키지 다운로드
                </button>
            </div>

            {/* Tabs */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'packages' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('packages')}
                >패키지 목록</button>
                <button
                    className={`${styles.tab} ${activeTab === 'deploy' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('deploy')}
                >배포 절차</button>
                <button
                    className={`${styles.tab} ${activeTab === 'rollback' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('rollback')}
                >롤백 가이드</button>
                <button
                    className={`${styles.tab} ${activeTab === 'environment' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('environment')}
                >환경 분리</button>
            </div>

            {/* Packages Tab */}
            {activeTab === 'packages' && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>배포 패키지</h2>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>버전</th>
                                    <th>배포일</th>
                                    <th>크기</th>
                                    <th>유형</th>
                                    <th>해시</th>
                                    <th>상태</th>
                                    <th>조치</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deploymentPackages.map((pkg) => (
                                    <tr key={pkg.version}>
                                        <td><code style={{ fontWeight: 600, color: 'var(--primary)' }}>{pkg.version}</code></td>
                                        <td>{pkg.date}</td>
                                        <td>{pkg.size}</td>
                                        <td>
                                            <span className={`${styles.badge} ${pkg.type === 'Full' ? styles.badgeWarning : styles.badgeActive}`}>
                                                {pkg.type}
                                            </span>
                                        </td>
                                        <td><code style={{ fontSize: '0.8rem' }}>{pkg.hash}</code></td>
                                        <td>
                                            <span className={`${styles.badge} ${pkg.status === 'Current' ? styles.badgeActive :
                                                    pkg.status === 'Previous' ? styles.badgeWarning :
                                                        styles.badgeInactive
                                                }`}>{pkg.status}</span>
                                        </td>
                                        <td>
                                            <button className={`${styles.btn} ${styles.btnSecondary}`} style={{ padding: '6px 12px' }}>
                                                <Download size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Offline Notice */}
                    <div style={{
                        marginTop: 24,
                        padding: 16,
                        background: 'rgba(0, 229, 255, 0.05)',
                        border: '1px solid rgba(0, 229, 255, 0.2)',
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12
                    }}>
                        <Wifi size={20} color="var(--primary)" style={{ transform: 'rotate(45deg)' }} />
                        <div>
                            <div style={{ fontWeight: 600 }}>오프라인망 배포 모드</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                모든 패키지는 USB/DVD를 통해 전송됩니다. 외부 네트워크 연결이 차단됩니다.
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Deploy Tab */}
            {activeTab === 'deploy' && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>배포 절차</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {deploymentSteps.map((step) => (
                            <div key={step.step} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 16,
                                padding: 16,
                                background: step.status === 'current' ? 'rgba(0, 229, 255, 0.05)' : 'rgba(255,255,255,0.02)',
                                border: `1px solid ${step.status === 'current' ? 'rgba(0, 229, 255, 0.3)' : 'var(--border-subtle)'}`,
                                borderRadius: 8
                            }}>
                                <div style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    background: step.status === 'complete' ? 'rgba(0, 255, 128, 0.1)' :
                                        step.status === 'current' ? 'rgba(0, 229, 255, 0.1)' : 'rgba(255,255,255,0.05)',
                                    border: `2px solid ${step.status === 'complete' ? 'var(--success)' :
                                            step.status === 'current' ? 'var(--primary)' : 'var(--border-subtle)'
                                        }`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {step.status === 'complete' ? (
                                        <CheckCircle size={20} color="var(--success)" />
                                    ) : (
                                        <span style={{ fontWeight: 600, color: step.status === 'current' ? 'var(--primary)' : 'var(--text-tertiary)' }}>
                                            {step.step}
                                        </span>
                                    )}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600 }}>{step.name}</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{step.desc}</div>
                                </div>
                                {step.status === 'current' && (
                                    <span className={`${styles.badge} ${styles.badgeWarning}`}>진행 중</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Rollback Tab */}
            {activeTab === 'rollback' && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>롤백 가이드</h2>

                    <div style={{
                        padding: 20,
                        background: 'rgba(255, 143, 0, 0.05)',
                        border: '1px solid rgba(255, 143, 0, 0.2)',
                        borderRadius: 8,
                        marginBottom: 24
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                            <AlertTriangle size={24} color="#ff8f00" />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>롤백 전 주의사항</span>
                        </div>
                        <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-secondary)' }}>
                            <li>롤백 시 현재 버전의 데이터 변경사항은 유실될 수 있습니다</li>
                            <li>롤백 전 반드시 현재 상태 백업을 수행하세요</li>
                            <li>롤백 후 모든 기능 테스트를 수행해야 합니다</li>
                        </ul>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                        <div className={styles.card}>
                            <div style={{ fontWeight: 600, marginBottom: 12 }}>즉시 롤백</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
                                이전 버전(v1.4.1)으로 즉시 복원합니다.
                            </div>
                            <button className={`${styles.btn} ${styles.btnSecondary}`} style={{ width: '100%' }}>
                                <RefreshCw size={16} />
                                v1.4.1로 롤백
                            </button>
                        </div>
                        <div className={styles.card}>
                            <div style={{ fontWeight: 600, marginBottom: 12 }}>특정 버전 복원</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
                                선택한 버전으로 복원합니다.
                            </div>
                            <select className={styles.formSelect} style={{ marginBottom: 12 }}>
                                <option>v1.4.1 (2024-01-10)</option>
                                <option>v1.4.0 (2024-01-05)</option>
                                <option>v1.3.9 (2024-01-01)</option>
                            </select>
                            <button className={`${styles.btn} ${styles.btnSecondary}`} style={{ width: '100%' }}>
                                선택 버전으로 롤백
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Environment Tab */}
            {activeTab === 'environment' && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>환경 분리 정책</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                        {[
                            { name: '개발 (Dev)', desc: 'Mock 데이터 허용', color: 'var(--primary)', mock: true },
                            { name: '검증 (Stage)', desc: '실데이터 기반', color: '#ff8f00', mock: false },
                            { name: '운영 (Prod)', desc: 'Mock 금지', color: 'var(--success)', mock: false },
                        ].map((env) => (
                            <div key={env.name} style={{
                                padding: 20,
                                background: 'rgba(255,255,255,0.02)',
                                border: `1px solid ${env.color}40`,
                                borderRadius: 8,
                                borderLeft: `4px solid ${env.color}`
                            }}>
                                <div style={{ fontWeight: 700, color: env.color, marginBottom: 8 }}>{env.name}</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 12 }}>{env.desc}</div>
                                <div style={{ fontSize: '0.85rem' }}>
                                    Mock 데이터: {env.mock ? (
                                        <span style={{ color: 'var(--success)' }}>허용</span>
                                    ) : (
                                        <span style={{ color: 'var(--danger)' }}>금지</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
