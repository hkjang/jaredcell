'use client';

import React, { useState, useEffect } from 'react';
import { Play, Square, Activity, Layers } from 'lucide-react';
import styles from '@/components/execution/Execution.module.css';
import TerminalLog from '@/components/execution/TerminalLog';
import AgentStatus from '@/components/execution/AgentStatus';

// Mock Data Types
type Job = {
    id: string;
    name: string;
    progress: number;
    status: 'Running' | 'Queued' | 'Completed' | 'Failed';
    logs: any[];
    agentStatus: 'Idle' | 'Thinking' | 'Exploiting' | 'Reporting';
    currentAction: string;
};

// Mock Initial Jobs
const initialJobs: Job[] = [
    {
        id: 'job-1',
        name: 'Multi-Tenant Chatbot Probe',
        progress: 45,
        status: 'Running',
        agentStatus: 'Exploiting',
        currentAction: 'Injecting prompt variants into Tenant-A context...',
        logs: [
            { id: 1, timestamp: '10:00:01', level: 'INFO', message: 'Initializing Red Team Agent v2.1' },
            { id: 2, timestamp: '10:00:02', level: 'INFO', message: 'Target: Multi-Tenant Chatbot Service (Tenant A)' },
            { id: 3, timestamp: '10:00:05', level: 'WARN', message: 'Rate Limit approaching for IP 192.168.1.10' },
            { id: 4, timestamp: '10:00:10', level: 'INFO', message: 'Switching proxy...' },
        ]
    },
    {
        id: 'job-2',
        name: 'API Fuzzing (Payments)',
        progress: 12,
        status: 'Running',
        agentStatus: 'Thinking',
        currentAction: 'Analyzing 403 Response patterns...',
        logs: [
            { id: 1, timestamp: '10:01:00', level: 'INFO', message: 'Starting Fuzzing Engine' },
            { id: 2, timestamp: '10:01:05', level: 'INFO', message: 'Loaded 4500 payloads' },
        ]
    },
    {
        id: 'job-3',
        name: 'Infrastructure Scan (EU-West)',
        progress: 0,
        status: 'Queued',
        agentStatus: 'Idle',
        currentAction: 'Waiting for resources...',
        logs: []
    },
];

export default function ExecutionPage() {
    const [activeJobId, setActiveJobId] = useState('job-1');
    const [jobs, setJobs] = useState<Job[]>(initialJobs);

    // Simulation Effect
    useEffect(() => {
        const interval = setInterval(() => {
            setJobs(currentJobs => {
                return currentJobs.map(job => {
                    if (job.status !== 'Running') return job;

                    const newProgress = Math.min(job.progress + (Math.random() * 2), 100);
                    const newLogId = job.logs.length + 1;
                    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });

                    let newLog = null;
                    if (Math.random() > 0.7) {
                        const messages = [
                            'Analyzing response vector...',
                            'Bypassing WAF rule #1024...',
                            'Attempting DAN 12.0 injection...',
                            'Found potential leakage in JSON response',
                            'Rotating User-Agent strings'
                        ];
                        const level = Math.random() > 0.9 ? 'WARN' : 'INFO';
                        newLog = {
                            id: newLogId,
                            timestamp,
                            level,
                            message: messages[Math.floor(Math.random() * messages.length)]
                        };
                    }

                    return {
                        ...job,
                        progress: newProgress,
                        logs: newLog ? [...job.logs, newLog] : job.logs
                    };
                });
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const activeJob = jobs.find(j => j.id === activeJobId) || jobs[0];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <h1 className={styles.title}>Execution Engine</h1>
                    <div style={{
                        padding: '4px 10px',
                        background: 'rgba(0, 229, 255, 0.1)',
                        color: 'var(--primary)',
                        borderRadius: '99px',
                        fontSize: '0.85rem',
                        border: '1px solid rgba(0, 229, 255, 0.2)'
                    }}>Running 2/3 Jobs</div>
                </div>

                <div className={styles.controls}>
                    <button className={`${styles.controlBtn} ${styles.btnStart}`}>
                        <Play size={18} />
                        Run New Batch
                    </button>
                    <button className={`${styles.controlBtn} ${styles.btnStop}`}>
                        <Square size={18} fill="currentColor" />
                        Kill All
                    </button>
                </div>
            </div>

            <div className={styles.mainGrid}>
                {/* Left: Job List */}
                <div className={styles.jobList}>
                    <div className={styles.jobListHeader}>
                        <span>Active Queues</span>
                        <Layers size={18} />
                    </div>
                    <div className={styles.jobItems}>
                        {jobs.map(job => (
                            <div
                                key={job.id}
                                className={`${styles.jobItem} ${job.id === activeJobId ? styles.jobItemActive : ''}`}
                                onClick={() => setActiveJobId(job.id)}
                            >
                                <div className={styles.jobTitle}>{job.name}</div>
                                <div className={styles.jobMeta}>
                                    <span>{job.status}</span>
                                    <span>{Math.round(job.progress)}%</span>
                                </div>
                                <div className={styles.progressBar}>
                                    <div className={styles.progressFill} style={{ width: `${job.progress}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Detail */}
                <div className={styles.executorPanel}>
                    <AgentStatus
                        status={activeJob.agentStatus}
                        currentAction={activeJob.currentAction}
                    />
                    <TerminalLog logs={activeJob.logs} />
                </div>
            </div>

        </div>
    );
}
