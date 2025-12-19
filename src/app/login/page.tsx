'use client';

import React, { useState } from 'react';
import { Lock, User, Key, Shield, AlertTriangle } from 'lucide-react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [showMfa, setShowMfa] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!showMfa) {
            // First step: credentials verification
            setShowMfa(true);
        } else {
            // Second step: MFA verification - redirect to dashboard
            window.location.href = '/';
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #050505 0%, #0a0a0a 50%, #050505 100%)',
            padding: 24
        }}>
            <div style={{
                width: '100%',
                maxWidth: 420,
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 16,
                padding: 40,
                backdropFilter: 'blur(20px)'
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{
                        width: 64,
                        height: 64,
                        borderRadius: 16,
                        background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(0, 255, 128, 0.1))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px'
                    }}>
                        <Shield size={32} color="#00e5ff" />
                    </div>
                    <h1 style={{
                        fontSize: '1.8rem',
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #00e5ff, #00ff80)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: 8
                    }}>RedTeam OS</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        통합 레드티밍 플랫폼
                    </p>
                </div>

                {/* Offline Mode Badge */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '8px 16px',
                    background: 'rgba(0, 229, 255, 0.1)',
                    border: '1px solid rgba(0, 229, 255, 0.2)',
                    borderRadius: 8,
                    marginBottom: 24,
                    fontSize: '0.85rem',
                    color: 'var(--primary)'
                }}>
                    <Lock size={14} />
                    오프라인 모드 - 폐쇄망 운영 중
                </div>

                {error && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: 12,
                        background: 'rgba(255, 46, 46, 0.1)',
                        border: '1px solid rgba(255, 46, 46, 0.2)',
                        borderRadius: 8,
                        marginBottom: 16,
                        fontSize: '0.9rem',
                        color: 'var(--danger)'
                    }}>
                        <AlertTriangle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    {!showMfa ? (
                        <>
                            {/* Username */}
                            <div style={{ marginBottom: 20 }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: 8,
                                    fontSize: '0.9rem',
                                    color: 'var(--text-secondary)'
                                }}>사용자 ID</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{
                                        position: 'absolute',
                                        left: 14,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'var(--text-tertiary)'
                                    }} />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="admin@organization.com"
                                        style={{
                                            width: '100%',
                                            padding: '14px 14px 14px 44px',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid var(--border-subtle)',
                                            borderRadius: 8,
                                            color: 'var(--text-primary)',
                                            fontSize: '0.95rem',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div style={{ marginBottom: 24 }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: 8,
                                    fontSize: '0.9rem',
                                    color: 'var(--text-secondary)'
                                }}>비밀번호</label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} style={{
                                        position: 'absolute',
                                        left: 14,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'var(--text-tertiary)'
                                    }} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        style={{
                                            width: '100%',
                                            padding: '14px 14px 14px 44px',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid var(--border-subtle)',
                                            borderRadius: 8,
                                            color: 'var(--text-primary)',
                                            fontSize: '0.95rem',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Auth Method */}
                            <div style={{ marginBottom: 24 }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: 8,
                                    fontSize: '0.9rem',
                                    color: 'var(--text-secondary)'
                                }}>인증 방식</label>
                                <select style={{
                                    width: '100%',
                                    padding: 14,
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid var(--border-subtle)',
                                    borderRadius: 8,
                                    color: 'var(--text-primary)',
                                    fontSize: '0.95rem'
                                }}>
                                    <option>로컬 계정</option>
                                    <option>LDAP (내부 디렉터리)</option>
                                </select>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* MFA Step */}
                            <div style={{
                                textAlign: 'center',
                                padding: 20,
                                background: 'rgba(0, 229, 255, 0.05)',
                                borderRadius: 8,
                                marginBottom: 24
                            }}>
                                <Key size={32} color="var(--primary)" style={{ marginBottom: 12 }} />
                                <div style={{ fontWeight: 600, marginBottom: 4 }}>2단계 인증</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    OTP 코드 또는 하드웨어 토큰을 입력하세요
                                </div>
                            </div>

                            <div style={{ marginBottom: 24 }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: 8,
                                    fontSize: '0.9rem',
                                    color: 'var(--text-secondary)'
                                }}>인증 코드</label>
                                <input
                                    type="text"
                                    value={otpCode}
                                    onChange={(e) => setOtpCode(e.target.value)}
                                    placeholder="000000"
                                    maxLength={6}
                                    style={{
                                        width: '100%',
                                        padding: 14,
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: 8,
                                        color: 'var(--text-primary)',
                                        fontSize: '1.5rem',
                                        textAlign: 'center',
                                        letterSpacing: '0.5em',
                                        fontFamily: 'monospace',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: 14,
                            background: 'linear-gradient(135deg, #00e5ff, #00c4d4)',
                            border: 'none',
                            borderRadius: 8,
                            color: '#000',
                            fontSize: '1rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        {showMfa ? '인증 완료' : '로그인'}
                    </button>
                </form>

                {/* Footer */}
                <div style={{
                    marginTop: 24,
                    paddingTop: 24,
                    borderTop: '1px solid var(--border-subtle)',
                    textAlign: 'center',
                    fontSize: '0.85rem',
                    color: 'var(--text-tertiary)'
                }}>
                    보안 정책에 따라 모든 접근 이력이 기록됩니다
                </div>
            </div>
        </div>
    );
}
