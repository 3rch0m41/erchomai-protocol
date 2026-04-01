// components/CookieBanner.js
"use client";

import React from 'react';
import { ShieldAlert, Check } from 'lucide-react';
import styles from './CookieBanner.module.css';

export default function CookieBanner({ onAccept, onDecline }) {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.glitchBox}>
        <div className={styles.content}>
          <div className={styles.iconArea}><ShieldAlert size={20} /></div>
          <div className={styles.textArea}>
            <span className={styles.title}>COOKIE_PROTOCOL</span>
            <p className={styles.desc}>Accept Cookie Policy?</p>
          </div>
          <div className={styles.actions}>
            <button onClick={onDecline} className={styles.btnDecline}>DECLINE</button>
            <button onClick={onAccept} className={styles.btnAccept}><Check size={14} /> ACCEPT</button>
          </div>
        </div>
      </div>
    </div>
  );
}