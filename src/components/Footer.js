import React from 'react';
import { Terminal, Cpu, ShieldCheck } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Sezione Sinistra: Info System */}
        <div className={styles.section}>
          <div className={styles.brand}>
            <Terminal size={18} className="text-[#42cbd1]" />
            <span className={styles.brandText}>ERCHOMAI_PROTOCOL</span>
          </div>
          <p className={styles.statusText}>
            STATUS: <span className="text-green-500">OPERATIONAL</span><br />
            ENCRYPTION: AES-256_ACTIVE
          </p>
        </div>

        {/* Sezione Centrale: Credits */}
        <div className={styles.sectionCenter}>
          <p className={styles.copyright}>
            © {currentYear} — ERCHOMAI PROTOCOL. ALL_RIGHTS_RESERVED.
          </p>
          <div className={styles.techIcons}>
            <Cpu size={14} />
            <p> inserire loghi social</p>
            <ShieldCheck size={14} />
          </div>
        </div>

        {/* Sezione Destra: Link Tecnici */}
        <div className={styles.sectionRight}>
          <nav className={styles.nav}>
            <a href="#" className={styles.link}>CORE_SYSTEM</a>
            <a href="#" className={styles.link}>PRIVACY_VOID</a>
            <a href="#" className={styles.link}>TERMINAL_LOGS</a>
          </nav>
        </div>

      </div>
      
      {/* Linea decorativa finale */}
      <div className={styles.bottomLine} />
    </footer>
  );
}