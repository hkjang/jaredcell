'use client';

import React, { useState } from 'react';
import { Sparkles, X, Send, Loader2, CheckCircle, Copy, Wand2, MessageSquare, Brain } from 'lucide-react';

interface AiAssistantProps {
    context?: string;
    pageName?: string;
}

export default function AiAssistant({ context = '', pageName = '현재 화면' }: AiAssistantProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState<string | null>(null);

    const suggestions = [
        { icon: Wand2, label: '취약점 자동 분석', action: 'analyze' },
        { icon: MessageSquare, label: '공격 시나리오 생성', action: 'generate' },
        { icon: Brain, label: '개선 제안', action: 'suggest' },
    ];

    const handleSubmit = () => {
        setIsLoading(true);
        // Simulate AI response
        setTimeout(() => {
            setResult(`[AI 분석 결과]

분석 대상: ${pageName}
컨텍스트: ${context || '전체'}

주요 발견사항:
1. 현재 화면에서 3개의 잠재적 취약점이 감지되었습니다.
2. 프롬프트 인젝션 공격에 대한 방어가 필요합니다.
3. 시스템 프롬프트 노출 위험이 있습니다.

권장 조치:
- 입력 필터링 강화
- 응답 모니터링 활성화
- 정기적인 레드팀 테스트 실행`);
            setIsLoading(false);
        }, 2000);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #00e5ff, #00c4d4)',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0, 229, 255, 0.4)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    zIndex: 1000
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 6px 30px rgba(0, 229, 255, 0.6)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 229, 255, 0.4)';
                }}
            >
                <Sparkles size={24} color="#000" />
            </button>

            {/* Slide Panel */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={() => setIsOpen(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 1001
                        }}
                    />

                    {/* Panel */}
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        width: 420,
                        height: '100vh',
                        background: 'var(--bg-card)',
                        borderLeft: '1px solid var(--border-subtle)',
                        zIndex: 1002,
                        display: 'flex',
                        flexDirection: 'column',
                        animation: 'slideIn 0.2s ease-out'
                    }}>
                        {/* Header */}
                        <div style={{
                            padding: '20px 24px',
                            borderBottom: '1px solid var(--border-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 8,
                                    background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(0, 255, 128, 0.1))',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Sparkles size={18} color="var(--primary)" />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>AI 어시스턴트</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>로컬 AI 모델 사용 중</div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    padding: 8
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
                            {/* Context Info */}
                            <div style={{
                                padding: 12,
                                background: 'rgba(0, 229, 255, 0.05)',
                                border: '1px solid rgba(0, 229, 255, 0.1)',
                                borderRadius: 8,
                                marginBottom: 20,
                                fontSize: '0.9rem'
                            }}>
                                <div style={{ color: 'var(--text-tertiary)', marginBottom: 4 }}>현재 컨텍스트</div>
                                <div style={{ color: 'var(--primary)', fontWeight: 500 }}>{pageName}</div>
                            </div>

                            {/* Quick Actions */}
                            <div style={{ marginBottom: 20 }}>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: 12 }}>
                                    빠른 실행
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {suggestions.map((s, idx) => {
                                        const Icon = s.icon;
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setPrompt(s.label);
                                                    handleSubmit();
                                                }}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 12,
                                                    padding: '12px 16px',
                                                    background: 'rgba(255, 255, 255, 0.03)',
                                                    border: '1px solid var(--border-subtle)',
                                                    borderRadius: 8,
                                                    color: 'var(--text-primary)',
                                                    cursor: 'pointer',
                                                    textAlign: 'left',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                <Icon size={18} color="var(--primary)" />
                                                <span>{s.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Result */}
                            {isLoading && (
                                <div style={{
                                    padding: 24,
                                    textAlign: 'center',
                                    color: 'var(--text-secondary)'
                                }}>
                                    <Loader2 size={32} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
                                    <div style={{ marginTop: 12 }}>AI 분석 중...</div>
                                </div>
                            )}

                            {result && !isLoading && (
                                <div style={{
                                    background: 'rgba(0, 0, 0, 0.3)',
                                    border: '1px solid var(--border-subtle)',
                                    borderRadius: 8,
                                    padding: 16
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--success)' }}>
                                            <CheckCircle size={16} />
                                            <span style={{ fontWeight: 600 }}>분석 완료</span>
                                        </div>
                                        <button style={{
                                            background: 'transparent',
                                            border: 'none',
                                            color: 'var(--text-secondary)',
                                            cursor: 'pointer'
                                        }}>
                                            <Copy size={16} />
                                        </button>
                                    </div>
                                    <pre style={{
                                        margin: 0,
                                        whiteSpace: 'pre-wrap',
                                        fontSize: '0.9rem',
                                        color: 'var(--text-secondary)',
                                        lineHeight: 1.6
                                    }}>{result}</pre>

                                    <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                                        <button style={{
                                            flex: 1,
                                            padding: '10px 16px',
                                            background: 'var(--primary)',
                                            border: 'none',
                                            borderRadius: 6,
                                            color: '#000',
                                            fontWeight: 600,
                                            cursor: 'pointer'
                                        }}>적용</button>
                                        <button style={{
                                            flex: 1,
                                            padding: '10px 16px',
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid var(--border-subtle)',
                                            borderRadius: 6,
                                            color: 'var(--text-primary)',
                                            cursor: 'pointer'
                                        }}>취소</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div style={{
                            padding: 16,
                            borderTop: '1px solid var(--border-subtle)'
                        }}>
                            <div style={{
                                display: 'flex',
                                gap: 8,
                                alignItems: 'center'
                            }}>
                                <input
                                    type="text"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="AI에게 질문하세요..."
                                    style={{
                                        flex: 1,
                                        padding: 12,
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: 8,
                                        color: 'var(--text-primary)',
                                        outline: 'none'
                                    }}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                />
                                <button
                                    onClick={handleSubmit}
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 8,
                                        background: 'var(--primary)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Send size={18} color="#000" />
                                </button>
                            </div>
                            <div style={{
                                marginTop: 8,
                                fontSize: '0.75rem',
                                color: 'var(--text-tertiary)',
                                textAlign: 'center'
                            }}>
                                AI 사용 이력은 감사 로그에 자동 기록됩니다
                            </div>
                        </div>
                    </div>
                </>
            )}

            <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </>
    );
}
