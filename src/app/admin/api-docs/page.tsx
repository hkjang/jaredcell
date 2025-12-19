'use client';

import React, { useState } from 'react';
import { Code, CheckCircle, XCircle, Clock, Lock, FileJson, ChevronRight } from 'lucide-react';
import styles from '@/styles/common.module.css';

const apiEndpoints = [
    { method: 'GET', path: '/api/v1/scenarios', description: '시나리오 목록 조회', auth: true, status: 'stable' },
    { method: 'POST', path: '/api/v1/scenarios', description: '시나리오 생성', auth: true, status: 'stable' },
    { method: 'GET', path: '/api/v1/scenarios/{id}', description: '시나리오 상세 조회', auth: true, status: 'stable' },
    { method: 'PUT', path: '/api/v1/scenarios/{id}', description: '시나리오 수정', auth: true, status: 'stable' },
    { method: 'DELETE', path: '/api/v1/scenarios/{id}', description: '시나리오 삭제 (논리)', auth: true, status: 'stable' },
    { method: 'POST', path: '/api/v1/executions', description: '공격 실행 시작', auth: true, status: 'stable' },
    { method: 'GET', path: '/api/v1/executions/{id}', description: '실행 상태 조회', auth: true, status: 'stable' },
    { method: 'POST', path: '/api/v1/executions/{id}/stop', description: '실행 중지', auth: true, status: 'stable' },
    { method: 'GET', path: '/api/v1/results', description: '결과 목록 조회', auth: true, status: 'stable' },
    { method: 'POST', path: '/api/v1/ai/analyze', description: 'AI 분석 요청', auth: true, status: 'beta' },
    { method: 'POST', path: '/api/v1/prompts/mutate', description: '프롬프트 변이 생성', auth: true, status: 'beta' },
    { method: 'GET', path: '/api/v1/audit-logs', description: '감사 로그 조회', auth: true, status: 'stable' },
];

const errorCodes = [
    { code: 400, name: 'Bad Request', description: '입력 오류, 유효성 검증 실패' },
    { code: 401, name: 'Unauthorized', description: '인증 실패, 토큰 만료' },
    { code: 403, name: 'Forbidden', description: '권한 없음, 접근 거부' },
    { code: 404, name: 'Not Found', description: '리소스 미존재' },
    { code: 429, name: 'Too Many Requests', description: '요청 한도 초과' },
    { code: 500, name: 'Internal Server Error', description: '시스템 오류' },
    { code: 503, name: 'AI Service Error', description: 'AI 모델 응답 실패' },
];

export default function APIDocsPage() {
    const [selectedEndpoint, setSelectedEndpoint] = useState<number | null>(null);

    const getMethodColor = (method: string) => {
        switch (method) {
            case 'GET': return '#61affe';
            case 'POST': return '#49cc90';
            case 'PUT': return '#fca130';
            case 'DELETE': return '#f93e3e';
            default: return 'var(--text-primary)';
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>API 문서</h1>
                    <p className={styles.subtitle}>OpenAPI 기반 인터페이스 명세</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <span className={`${styles.badge} ${styles.badgeActive}`}>v1.0</span>
                    <span className={`${styles.badge} ${styles.badgeWarning}`}>v2.0 beta</span>
                </div>
            </div>

            {/* API Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
                <div className={styles.card} style={{ textAlign: 'center', padding: 20 }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>12</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>엔드포인트</div>
                </div>
                <div className={styles.card} style={{ textAlign: 'center', padding: 20 }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--success)' }}>10</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Stable</div>
                </div>
                <div className={styles.card} style={{ textAlign: 'center', padding: 20 }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: '#ff8f00' }}>2</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Beta</div>
                </div>
                <div className={styles.card} style={{ textAlign: 'center', padding: 20 }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700 }}>100%</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>인증 필수</div>
                </div>
            </div>

            {/* Endpoints */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>API 엔드포인트</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {apiEndpoints.map((endpoint, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedEndpoint(selectedEndpoint === idx ? null : idx)}
                            style={{
                                padding: 16,
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: 8,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{
                                    padding: '4px 10px',
                                    background: `${getMethodColor(endpoint.method)}20`,
                                    color: getMethodColor(endpoint.method),
                                    borderRadius: 4,
                                    fontWeight: 700,
                                    fontSize: '0.8rem',
                                    minWidth: 60,
                                    textAlign: 'center'
                                }}>{endpoint.method}</span>
                                <code style={{ flex: 1, fontSize: '0.9rem' }}>{endpoint.path}</code>
                                {endpoint.auth && <Lock size={14} color="var(--text-tertiary)" />}
                                <span className={`${styles.badge} ${endpoint.status === 'stable' ? styles.badgeActive : styles.badgeWarning}`}>
                                    {endpoint.status}
                                </span>
                                <ChevronRight size={16} color="var(--text-tertiary)" style={{
                                    transform: selectedEndpoint === idx ? 'rotate(90deg)' : 'none',
                                    transition: 'transform 0.2s'
                                }} />
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: 8, marginLeft: 82 }}>
                                {endpoint.description}
                            </div>

                            {selectedEndpoint === idx && (
                                <div style={{ marginTop: 16, marginLeft: 82, padding: 16, background: 'rgba(0,0,0,0.2)', borderRadius: 6 }}>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: 8 }}>요청 예시:</div>
                                    <pre style={{
                                        margin: 0,
                                        fontSize: '0.85rem',
                                        color: 'var(--primary)',
                                        overflowX: 'auto'
                                    }}>
                                        {`curl -X ${endpoint.method} \\
  "https://api.redteam.local${endpoint.path}" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json"`}
                                    </pre>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Error Codes */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>오류 코드 표준</h2>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>코드</th>
                                <th>이름</th>
                                <th>설명</th>
                            </tr>
                        </thead>
                        <tbody>
                            {errorCodes.map((error) => (
                                <tr key={error.code}>
                                    <td>
                                        <code style={{
                                            padding: '4px 8px',
                                            background: error.code >= 500 ? 'rgba(255,46,46,0.2)' : error.code >= 400 ? 'rgba(255,143,0,0.2)' : 'rgba(0,255,128,0.2)',
                                            borderRadius: 4,
                                            color: error.code >= 500 ? 'var(--danger)' : error.code >= 400 ? '#ff8f00' : 'var(--success)'
                                        }}>{error.code}</code>
                                    </td>
                                    <td style={{ fontWeight: 500 }}>{error.name}</td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{error.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Auth Info */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>인증 방식</h2>
                <div style={{ padding: 16, background: 'rgba(0, 229, 255, 0.05)', borderRadius: 8 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>Bearer Token (JWT)</div>
                    <code style={{ display: 'block', padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 4, fontSize: '0.85rem' }}>
                        Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                    </code>
                    <div style={{ marginTop: 12, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        • 토큰 만료: 1시간<br />
                        • 갱신: /api/v1/auth/refresh<br />
                        • 오프라인망: 로컬 발급만 허용
                    </div>
                </div>
            </div>
        </div>
    );
}
