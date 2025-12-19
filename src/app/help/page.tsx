'use client';

import React, { useState } from 'react';
import { Book, Search, ChevronRight, FileText, Play, Settings, Shield, Brain, Terminal, Users, HelpCircle, ExternalLink } from 'lucide-react';
import styles from '@/styles/common.module.css';

const manualCategories = [
    {
        id: 'getting-started',
        name: '시작하기',
        icon: Play,
        articles: [
            { title: '플랫폼 소개', desc: '통합 레드티밍 플랫폼 개요' },
            { title: '첫 로그인', desc: '계정 설정 및 MFA 등록' },
            { title: '대시보드 이해하기', desc: '메인 화면 구성 안내' },
        ]
    },
    {
        id: 'scenarios',
        name: '시나리오 관리',
        icon: Shield,
        articles: [
            { title: '시나리오 생성', desc: '새 공격 시나리오 만들기' },
            { title: '템플릿 활용', desc: '사전 정의된 템플릿 사용' },
            { title: '버전 관리', desc: '시나리오 변경 이력 추적' },
        ]
    },
    {
        id: 'ai-redteaming',
        name: 'AI 레드티밍',
        icon: Brain,
        articles: [
            { title: 'AI 모델 등록', desc: '테스트 대상 모델 추가' },
            { title: '프롬프트 체인 설계', desc: '다단계 공격 구성' },
            { title: '재현성 검증', desc: 'Seed 기반 결과 재현' },
        ]
    },
    {
        id: 'execution',
        name: '공격 실행',
        icon: Terminal,
        articles: [
            { title: '실행 시작/중지', desc: '공격 제어 방법' },
            { title: '실시간 로그', desc: '실행 중 모니터링' },
            { title: '병렬 실행', desc: '다중 시나리오 동시 실행' },
        ]
    },
    {
        id: 'admin',
        name: '관리자 기능',
        icon: Settings,
        articles: [
            { title: '사용자 관리', desc: '계정 생성 및 권한 설정' },
            { title: '정책 설정', desc: '보안 정책 구성' },
            { title: '감사 로그', desc: '모든 활동 조회' },
        ]
    },
    {
        id: 'troubleshooting',
        name: '문제 해결',
        icon: HelpCircle,
        articles: [
            { title: '자주 묻는 질문', desc: 'FAQ' },
            { title: '오류 코드', desc: '에러 메시지 해석' },
            { title: '긴급 연락처', desc: '기술 지원 요청' },
        ]
    },
];

export default function OperationsManualPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>운영 매뉴얼</h1>
                    <p className={styles.subtitle}>플랫폼 사용법 및 관리자 가이드</p>
                </div>
            </div>

            {/* Search */}
            <div style={{ marginBottom: 24 }}>
                <div style={{ position: 'relative' }}>
                    <Search size={20} style={{
                        position: 'absolute',
                        left: 16,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-tertiary)'
                    }} />
                    <input
                        type="text"
                        placeholder="매뉴얼 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '16px 16px 16px 52px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 12,
                            color: 'var(--text-primary)',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                    />
                </div>
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
                <div className={styles.card} style={{ textAlign: 'center', padding: 20 }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>6</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>카테고리</div>
                </div>
                <div className={styles.card} style={{ textAlign: 'center', padding: 20 }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700 }}>18</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>문서</div>
                </div>
                <div className={styles.card} style={{ textAlign: 'center', padding: 20 }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--success)' }}>v1.4</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>문서 버전</div>
                </div>
                <div className={styles.card} style={{ textAlign: 'center', padding: 20 }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700 }}>한국어</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>언어</div>
                </div>
            </div>

            {/* Categories */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {manualCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                        <div key={category.id} className={styles.card}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                <div style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 10,
                                    background: 'rgba(0, 229, 255, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Icon size={22} color="var(--primary)" />
                                </div>
                                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{category.name}</div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {category.articles.map((article, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '10px 12px',
                                            background: 'rgba(255, 255, 255, 0.02)',
                                            borderRadius: 6,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <div>
                                            <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>{article.title}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{article.desc}</div>
                                        </div>
                                        <ChevronRight size={16} color="var(--text-tertiary)" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Links */}
            <div className={styles.section} style={{ marginTop: 24 }}>
                <h2 className={styles.sectionTitle}>바로가기</h2>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {[
                        { label: 'PDF 다운로드', icon: FileText },
                        { label: '영상 튜토리얼', icon: Play },
                        { label: '기술 지원 요청', icon: HelpCircle },
                    ].map((link, idx) => {
                        const Icon = link.icon;
                        return (
                            <button key={idx} className={`${styles.btn} ${styles.btnSecondary}`}>
                                <Icon size={16} />
                                {link.label}
                                <ExternalLink size={14} />
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
