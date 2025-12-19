'use client';

import React, { useEffect, useRef } from 'react';
import styles from './Execution.module.css';

interface LogEntry {
    id: number;
    timestamp: string;
    level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
    message: string;
}

export default function TerminalLog({ logs }: { logs: LogEntry[] }) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    return (
        <div className={styles.terminalContainer}>
            <div className={styles.terminalHeader}>
                <div className={`${styles.terminalDot} ${styles.dotRed}`} />
                <div className={`${styles.terminalDot} ${styles.dotYellow}`} />
                <div className={`${styles.terminalDot} ${styles.dotGreen}`} />
                <span className={styles.terminalTitle}>root@redteam-agent:~/runner#</span>
            </div>
            <div className={styles.terminalBody}>
                {logs.map((log) => (
                    <div key={log.id} className={styles.logLine}>
                        <span className={styles.logTime}>[{log.timestamp}]</span>
                        <span className={
                            log.level === 'INFO' ? styles.logInfo :
                                log.level === 'WARN' ? styles.logWarn :
                                    log.level === 'ERROR' ? styles.logError :
                                        styles.logSuccess
                        }>{log.level}</span>
                        <span style={{ marginLeft: 8 }}>{log.message}</span>
                    </div>
                ))}
                <div className={styles.logLine}>
                    <span className={styles.cursor}></span>
                </div>
                <div ref={bottomRef} />
            </div>
        </div>
    );
}
