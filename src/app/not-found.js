// 404 globale: gestisce sia gli URL inesistenti sia le chiamate a notFound().
// Viene renderizzata direttamente sotto il layout radice (fuori da (site)),
// quindi importa da sola gli stili globali, la Navbar e il Footer del sito.
// Nota: per questo motivo Next carica globals.css anche nello Studio.
import './globals.css';
import Link from 'next/link';
import { AlertTriangle, Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './error-pages.module.css';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="site-main">
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
      </main>
      <Footer />
    </>
  );
}
