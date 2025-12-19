'use client';

import React from 'react';
import { Activity, Clock, Users, Zap, Server, Database, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import styles from '@/styles/common.module.css';

const slaMetrics = [
    { name: '시스템 가용성', target: '99.9%', current: '99.95%', status: 'pass' },
    { name: 'API 응답 시간', target: '< 200ms', current: '145ms', status: 'pass' },
    { name: '페이지 로드 시간', target: '< 2s', current: '1.8s', status: 'pass' },
    { name: '동시 사용자', target: '100명', current: '85명', status: 'pass' },
    { name: 'AI 추론 응답', target: '< 5s', current: '4.2s', status: 'pass' },
    { name: '데이터베이스 쿼리', target: '< 100ms', current: '78ms', status: 'pass' },
];

const performanceStats = [
    { label: '평균 CPU 사용률', value: '34%', icon: Server, color: 'var(--success)' },
    { label: '메모리 사용량', value: '62%', icon: Database, color: '#ff8f00' },
    { label: '디스크 I/O', value: '28 MB/s', icon: Activity, color: 'var(--primary)' },
    { label: '네트워크 대역폭', value: '12%', icon: Zap, color: 'var(--success)' },
];

const recentIncidents = [
    { date: '2024-01-14', type: '성능 저하', duration: '12분', resolved: true },
    { date: '2024-01-10', type: 'DB 연결 지연', duration: '3분', resolved: true },
];

export default function SLADashboardPage() {
    const passCount = slaMetrics.filter(m => m.status === 'pass').length;
    const totalCount = slaMetrics.length;
    const slaRate = ((passCount / totalCount) * 100).toFixed(1);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>SLA / 성능 대시보드</h1>
                    <p className={styles.subtitle}>비기능 요구사항 충족 현황 및 성능 지표</p>
                </div>
            </div>

            {/* Overall SLA Status */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(0, 255, 128, 0.1) 0%, rgba(0, 229, 255, 0.05) 100%)',
                border: '1px solid rgba(0, 255, 128, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: 32,
                marginBottom: 24,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 8 }}>SLA 충족률</div>
                    <div style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--success)' }}>{slaRate}%</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', marginTop: 8 }}>
                        {passCount}/{totalCount} 지표 충족
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 24 }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--success)' }}>99.95%</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>가용성 (30일)</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>145ms</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>평균 응답</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700 }}>15분</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>총 장애 시간</div>
                    </div>
                </div>
            </div>

            {/* Performance Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
                {performanceStats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className={styles.card} style={{ padding: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                <div style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 10,
                                    background: `${stat.color}20`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Icon size={20} color={stat.color} />
                                </div>
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: stat.color }}>{stat.value}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>{stat.label}</div>
                        </div>
                    );
                })}
            </div>

            {/* SLA Metrics Table */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>SLA 지표 상세</h2>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>지표</th>
                                <th>목표</th>
                                <th>현재</th>
                                <th>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {slaMetrics.map((metric, idx) => (
                                <tr key={idx}>
                                    <td style={{ fontWeight: 500 }}>{metric.name}</td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{metric.target}</td>
                                    <td>
                                        <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{metric.current}</span>
                                    </td>
                                    <td>
                                        {metric.status === 'pass' ? (
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--success)' }}>
                                                <CheckCircle size={14} /> 충족
                                            </span>
                                        ) : (
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--danger)' }}>
                                                <AlertTriangle size={14} /> 미달
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Incidents */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>최근 장애 이력</h2>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>날짜</th>
                                <th>유형</th>
                                <th>지속 시간</th>
                                <th>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentIncidents.map((incident, idx) => (
                                <tr key={idx}>
                                    <td>{incident.date}</td>
                                    <td>{incident.type}</td>
                                    <td>{incident.duration}</td>
                                    <td>
                                        <span className={`${styles.badge} ${styles.badgeActive}`}>해결됨</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Performance Thresholds */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>성능 기준 (비기능 요구사항)</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                    {[
                        { name: '동시 사용자 수', value: '최대 100명', desc: '폐쇄망 기준' },
                        { name: 'API 타임아웃', value: '30초', desc: '강제 설정' },
                        { name: '데이터 처리량', value: '1,000 TPS', desc: '실행 기준' },
                        { name: '장애 허용', value: '부분 장애 허용', desc: '서비스 격리' },
                        { name: '자동 재시도', value: '3회', desc: '실패 시 자동' },
                        { name: '트랜잭션 무결성', value: 'ACID 보장', desc: '데이터 일관성' },
                    ].map((item, idx) => (
                        <div key={idx} style={{
                            padding: 16,
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: 8,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <div style={{ fontWeight: 500 }}>{item.name}</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>{item.desc}</div>
                            </div>
                            <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
