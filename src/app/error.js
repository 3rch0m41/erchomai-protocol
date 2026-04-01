'use client';

import { useEffect } from 'react';
import { RefreshCcw, HardDrive } from 'lucide-react';
import styles from './error-pages.module.css';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log dell'errore su un servizio esterno o console
    console.error("CRITICAL_SYSTEM_ERROR:", error);
  }, [error]);

  return (
    <div className={styles.errorWrapper}>
      <div className={styles.glitchContainer}>
        <HardDrive size={64} className={styles.errorIconCritical} />
        <h1 className={styles.errorCode}>500</h1>
        <h2 className={styles.errorTitle}>CRITICAL_CORE_FAILURE</h2>
        <p className={styles.errorMsg}>
          A synchronization error occurred. Segment violation detected in kernel memory.
        </p>
        
        <button onClick={() => reset()} className={styles.backButton}>
          <RefreshCcw size={18} />
          REBOOT_SYSTEM
        </button>
      </div>
    </div>
  );
}