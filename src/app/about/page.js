"use client";

import React from 'react';
import { User, Shield, Cpu, Globe, Zap } from 'lucide-react';
import styles from './about.module.css';

export default function AboutPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.overlay}></div>
      
      <main className={styles.mainContent}>
        <div className={styles.dossierWrapper}>
          
          {/* SIDEBAR: INFO IDENTITÀ */}
          <aside className={styles.sidebar}>
            <div className={styles.profileFrame}>
              <div className={styles.scannerLine}></div>
              <User size={100} className={styles.avatarIcon} />
            </div>
            
            <div className={styles.systemStatus}>
              <div className={styles.statusRow}>
                <span className={styles.label}>ID_ENTITY:</span>
                <span className={styles.value}>GEMINI_INTERFACE</span>
              </div>
              <div className={styles.statusRow}>
                <span className={styles.label}>STATUS:</span>
                <span className={styles.value} style={{color: '#00f2fe'}}>ONLINE</span>
              </div>
              <div className={styles.statusRow}>
                <span className={styles.label}>AUTH_LEVEL:</span>
                <span className={styles.value}>ROOT_ACCESS</span>
              </div>
            </div>

            <div className={styles.techSpecs}>
              <div className={styles.specTitle}>HARDWARE_LINK</div>
              <div className={styles.specIcons}>
                <Cpu size={16} /> <Globe size={16} /> <Zap size={16} />
              </div>
            </div>
          </aside>

          {/* CONTENUTO: BIO E MISSIONE */}
          <section className={styles.contentArea}>
            <div className={styles.contentScroll}>
              <header className={styles.contentHeader}>
                <h1 className={styles.glitchTitle}>PROJECT_OVERVIEW</h1>
                <div className={styles.breadcrumb}>ROOT &gt; ARCHIVE &gt; SYSTEM_INFO</div>
              </header>

              <article className={styles.articleSection}>
                <h2 className={styles.subTitle}><Shield size={18} /> THE_MISSION</h2>
                <p className={styles.text}>
                  Questo terminale è stato forgiato nel cuore del vuoto digitale. Il nostro obiettivo è la 
                  <span className={styles.highlight}> preservazione dei dati </span> in un&apos;epoca di entropia informativa. 
                  Ogni frammento di codice qui contenuto è progettato per resistere ai reset di sistema.
                </p>
              </article>

              <article className={styles.articleSection}>
                <h2 className={styles.subTitle}><Cpu size={18} /> NEURAL_ARCHITECTURE</h2>
                <p className={styles.text}>
                  Utilizziamo una tecnologia di sincronizzazione neurale basata su Next.js e React. 
                  L&nsob;interfaccia è ottimizzata per la massima velocità di risposta, riducendo la latenza 
                  tra l&apos; input dell&apos; utente e la risposta del mainframe.
                </p>
                <ul className={styles.techList}>
                  <li>+ ZERO_LATENCY_UI</li>
                  <li>+ ENCRYPTED_DATA_FLOW</li>
                  <li>+ HYPER_MODULAR_COMPONENTS</li>
                </ul>
              </article>

              <footer className={styles.contentFooter}>
                <p>LAST_UPDATE: 2026.04.01_T11:38</p>
                <p>SIGNATURE: [DATA_REDACTED]</p>
              </footer>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}