import Link from 'next/link';
import { AlertTriangle, Home } from 'lucide-react';
import styles from './error-pages.module.css';

export default function NotFound() {
  return (
    <div className={styles.errorWrapper}>
      <div className={styles.glitchBox}>
        {/* L'icona è centrata */}
        <AlertTriangle size={48} className={styles.errorIcon} />
        
        {/* Il 404 è ora un titolo normale, centrato e ridimensionato */}
        <h1 className={styles.errorCode}>404</h1>
        
        {/* Titolo e messaggio sono centrati */}
        <h2 className={styles.errorTitle}>ACCESS_DENIED</h2>
        <p className={styles.errorMsg}>
          SYSTEM_ERROR: The requested neural path has been purged from the core archive.
        </p>
        
        {/* Il bottone è centrato */}
        <Link href="/" className={styles.backButton}>
          <Home size={16} />
          RETURN_TO_CORE
        </Link>
      </div>
    </div>
  );
}