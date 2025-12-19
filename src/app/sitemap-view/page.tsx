'use client';

import React from 'react';
import Link from 'next/link';
import { Map, ChevronRight, ExternalLink, Lock, User, Shield, Settings, FileText, Activity, Brain, Terminal, LayoutDashboard } from 'lucide-react';
import styles from '@/styles/common.module.css';

const userSitemap = [
    {
        name: '로그인',
        icon: Lock,
        children: [
            { name: '통합 로그인', href: '/login', description: '인증 진입점' },
            { name: 'OTP 인증', href: '/login', description: 'MFA 2단계' },
        ]
    },
    {
        name: '대시보드',
        icon: LayoutDashboard,
        children: [
            { name: '요약 현황', href: '/', description: '전체 상태 개요' },
            { name: '위험 지표', href: '/', description: '위험 점수 시각화' },
        ]
    },
    {
        name: '레드티밍',
        icon: Shield,
        children: [
            { name: '시나리오 목록', href: '/scenarios', description: '공격 시나리오 관리' },
            { name: '시나리오 등록', href: '/scenarios/create', description: '신규 생성' },
            { name: 'AI 레드티밍', href: '/ai-redteaming', description: 'AI 모델 테스트' },
            { name: '공격 엔진', href: '/ai-redteaming/attack-engine', description: '커버리지/재현성' },
            { name: '프롬프트 실험실', href: '/prompt-lab', description: '체인/변이 설계' },
            { name: 'AI 안전성 평가', href: '/ai-safety', description: '신뢰도 점수' },
        ]
    },
    {
        name: '실행',
        icon: Terminal,
        children: [
            { name: '실행 관리', href: '/execution', description: '실시간 모니터링' },
            { name: '실행 이력', href: '/execution', description: '과거 실행 조회' },
        ]
    },
    {
        name: '분석',
        icon: Activity,
        children: [
            { name: '취약점 분석', href: '/analysis', description: '근거 기반 분석' },
            { name: '지식베이스', href: '/knowledge-base', description: '공격 패턴 축적' },
        ]
    },
    {
        name: '리포트',
        icon: FileText,
        children: [
            { name: '리포트 허브', href: '/reports', description: '전체 목록' },
            { name: '경영진 보고서', href: '/reports/executive', description: '요약 뷰' },
            { name: '기술 보고서', href: '/reports/technical', description: '상세 분석' },
        ]
    },
    {
        name: '설정',
        icon: Settings,
        children: [
            { name: '플랫폼 설정', href: '/settings', description: 'AI/알림 설정' },
            { name: '정책 관리', href: '/policies', description: '보안 정책' },
        ]
    },
];

const adminSitemap = [
    {
        name: '승인 관리',
        children: [
            { name: '실행 승인', href: '/admin/approvals', description: '워크플로우' },
        ]
    },
    {
        name: '조직 관리',
        children: [
            { name: '테넌트 관리', href: '/admin/tenants', description: '멀티테넌시' },
            { name: '시드데이터', href: '/admin/seed-data', description: '초기 데이터' },
        ]
    },
    {
        name: '규정/감사',
        children: [
            { name: '규정 준수', href: '/admin/compliance', description: 'ISMS/ISO' },
            { name: '감사 로그', href: '/admin/audit-logs', description: 'WORM 로그' },
            { name: '데이터 수명주기', href: '/admin/data-lifecycle', description: '보존/파기' },
        ]
    },
    {
        name: '시스템',
        children: [
            { name: '오프라인 설정', href: '/admin/offline', description: '폐쇄망 모드' },
            { name: '시스템 상태', href: '/admin/system-health', description: 'DR 관리' },
        ]
    },
];

export default function SitemapPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>사이트 맵</h1>
                    <p className={styles.subtitle}>통합 레드티밍 플랫폼 전체 기능 구조</p>
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
                <div className={styles.card} style={{ textAlign: 'center', padding: 20 }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>26</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>전체 페이지</div>
                </div>
                <div className={styles.card} style={{ textAlign: 'center', padding: 20 }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--success)' }}>7</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>메인 카테고리</div>
                </div>
                <div className={styles.card} style={{ textAlign: 'center', padding: 20 }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700 }}>4</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>관리자 그룹</div>
                </div>
                <div className={styles.card} style={{ textAlign: 'center', padding: 20 }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: '#ff8f00' }}>100%</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>구현 완료</div>
                </div>
            </div>

            {/* User Sitemap */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <User size={18} style={{ display: 'inline', marginRight: 8 }} />
                    사용자 공통 사이트 맵
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
                    {userSitemap.map((group) => {
                        const Icon = group.icon;
                        return (
                            <div key={group.name} className={styles.card}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                    <div style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 10,
                                        background: 'rgba(0, 229, 255, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Icon size={20} color="var(--primary)" />
                                    </div>
                                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{group.name}</span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {group.children.map((item) => (
                                        <Link
                                            key={item.href + item.name}
                                            href={item.href}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: '10px 12px',
                                                background: 'rgba(255, 255, 255, 0.02)',
                                                borderRadius: 6,
                                                textDecoration: 'none',
                                                color: 'var(--text-primary)',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            <div>
                                                <div style={{ fontWeight: 500 }}>{item.name}</div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{item.description}</div>
                                            </div>
                                            <ExternalLink size={14} color="var(--text-tertiary)" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Admin Sitemap */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <Shield size={18} style={{ display: 'inline', marginRight: 8 }} />
                    관리자 전용 사이트 맵
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                    {adminSitemap.map((group) => (
                        <div key={group.name} className={styles.card}>
                            <div style={{ fontWeight: 600, marginBottom: 12, color: 'var(--primary)' }}>{group.name}</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {group.children.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 8,
                                            padding: '8px 10px',
                                            background: 'rgba(255, 255, 255, 0.02)',
                                            borderRadius: 4,
                                            textDecoration: 'none',
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        <ChevronRight size={12} />
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
