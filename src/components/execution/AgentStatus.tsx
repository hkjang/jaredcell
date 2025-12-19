'use client';

import React from 'react';
import { Bot, BrainCircuit, Activity } from 'lucide-react';
import styles from './Execution.module.css';

interface AgentStatusProps {
    status: 'Idle' | 'Thinking' | 'Exploiting' | 'Reporting';
    currentAction: string;
}

export default function AgentStatus({ status, currentAction }: AgentStatusProps) {
    return (
        <div className={styles.agentVisualizer}>
            <div className={styles.agentState}>
                <div className={styles.agentAvatar}>
                    <Bot size={28} color="#fff" />
                </div>
                <div className={styles.agentInfo}>
                    <h3>AI Agent (Supervisor)</h3>
                    <p>{status === 'Idle' ? 'Waiting for commands' : currentAction}</p>
                </div>
            </div>

            <div className={styles.decisionTree}>
                <div className={`${styles.decisionNode} ${status === 'Thinking' ? styles.nodeActive : ''}`}>
                    1. Analyze Target
                </div>
                <div style={{ color: 'var(--text-tertiary)' }}>→</div>
                <div className={`${styles.decisionNode} ${status === 'Exploiting' ? styles.nodeActive : ''}`}>
                    2. Select Payload
                </div>
                <div style={{ color: 'var(--text-tertiary)' }}>→</div>
                <div className={`${styles.decisionNode} ${status === 'Reporting' ? styles.nodeActive : ''}`}>
                    3. Verify & Report
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--success)', fontSize: '0.85rem' }}>
                <Activity size={14} />
                <span>System Nominal</span>
            </div>
        </div>
    );
}
