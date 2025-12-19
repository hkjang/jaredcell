'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels: Record<string, string> = {
    '': '대시보드',
    'scenarios': '시나리오 관리',
    'create': '시나리오 생성',
    'execution': '공격 실행',
    'analysis': '취약점 분석',
    'reports': '리포트',
    'executive': '경영진 보고서',
    'technical': '기술 보고서',
    'knowledge-base': '공격 지식베이스',
    'policies': '정책 관리',
    'settings': '설정',
    'ai-redteaming': 'AI 레드티밍',
    'prompt-lab': '프롬프트 실험실',
    'ai-safety': 'AI 안전성 평가',
    'admin': '관리',
    'approvals': '실행 승인',
    'tenants': '테넌트 관리',
    'compliance': '규정 준수',
    'data-lifecycle': '데이터 수명주기',
    'audit-logs': '감사 로그',
    'offline': '오프라인 설정',
    'system-health': '시스템 상태',
};

export default function Breadcrumb() {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    if (pathname === '/') {
        return null;
    }

    return (
        <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 0',
            marginBottom: 16,
            fontSize: '0.9rem'
        }}>
            <Link
                href="/"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'var(--text-tertiary)',
                    textDecoration: 'none'
                }}
            >
                <Home size={16} />
            </Link>

            {segments.map((segment, index) => {
                const path = '/' + segments.slice(0, index + 1).join('/');
                const isLast = index === segments.length - 1;
                const label = routeLabels[segment] || segment;

                return (
                    <React.Fragment key={path}>
                        <ChevronRight size={14} color="var(--text-tertiary)" />
                        {isLast ? (
                            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                                {label}
                            </span>
                        ) : (
                            <Link
                                href={path}
                                style={{
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none'
                                }}
                            >
                                {label}
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
}
