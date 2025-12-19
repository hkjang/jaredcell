'use client';

import React from 'react';
import { Bell, Search } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.title}>
                Project: Infrastructure Alpha
            </div>

            <div className={styles.actions}>
                <button className={styles.iconButton}>
                    <Search size={20} />
                </button>
                <button className={styles.iconButton}>
                    <Bell size={20} />
                </button>

                <div className={styles.userBadge}>
                    <div className={styles.avatar}>A</div>
                    <span className={styles.userName}>Admin</span>
                </div>
            </div>
        </header>
    );
}
