import React from 'react';
import { User, Shield, Cpu, Globe, Zap } from 'lucide-react';
import styles from './about.module.css';

export const metadata = {
  title: 'About',
  description: 'Chi c’è dietro ERCHOMAI PROTOCOL.',
};

// ============================================================
// TESTI DELLA PAGINA: modifica solo questo blocco.
// Il testo attuale è un segnaposto (lorem ipsum) da sostituire.
// ============================================================
const CONTENT = {
  // Riquadro a sinistra
  status: [
    { label: 'ID_ENTITY:', value: 'LOREM_IPSUM' },
    { label: 'STATUS:', value: 'ONLINE', highlight: true },
    { label: 'AUTH_LEVEL:', value: 'DOLOR_SIT' },
  ],
  hardwareTitle: 'HARDWARE_LINK',

  // Intestazione a destra
  title: 'PROJECT_OVERVIEW',
  breadcrumb: 'ROOT > ARCHIVE > SYSTEM_INFO',

  // Prima sezione
  missionTitle: 'THE_MISSION',
  missionBefore:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et',
  missionHighlight: 'dolore magna aliqua',
  missionAfter:
    '. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',

  // Seconda sezione
  secondTitle: 'NEURAL_ARCHITECTURE',
  secondText:
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  list: ['LOREM_IPSUM_DOLOR', 'SIT_AMET_CONSECTETUR', 'ADIPISCING_ELIT'],

  // Piè di pagina del riquadro
  footerLines: ['LAST_UPDATE: 0000.00.00_T00:00', 'SIGNATURE: [DATA_REDACTED]'],
};
// ============================================================

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
              {CONTENT.status.map((row) => (
                <div key={row.label} className={styles.statusRow}>
                  <span className={styles.label}>{row.label}</span>
                  <span
                    className={styles.value}
                    style={row.highlight ? { color: '#00f2fe' } : undefined}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.techSpecs}>
              <div className={styles.specTitle}>{CONTENT.hardwareTitle}</div>
              <div className={styles.specIcons}>
                <Cpu size={16} /> <Globe size={16} /> <Zap size={16} />
              </div>
            </div>
          </aside>

          {/* CONTENUTO: BIO E MISSIONE */}
          <section className={styles.contentArea}>
            <div className={styles.contentScroll}>
              <header className={styles.contentHeader}>
                <h1 className={styles.glitchTitle}>{CONTENT.title}</h1>
                <div className={styles.breadcrumb}>{CONTENT.breadcrumb}</div>
              </header>

              <article className={styles.articleSection}>
                <h2 className={styles.subTitle}><Shield size={18} /> {CONTENT.missionTitle}</h2>
                <p className={styles.text}>
                  {CONTENT.missionBefore}
                  <span className={styles.highlight}> {CONTENT.missionHighlight}</span>
                  {CONTENT.missionAfter}
                </p>
              </article>

              <article className={styles.articleSection}>
                <h2 className={styles.subTitle}><Cpu size={18} /> {CONTENT.secondTitle}</h2>
                <p className={styles.text}>{CONTENT.secondText}</p>
                <ul className={styles.techList}>
                  {CONTENT.list.map((item) => (
                    <li key={item}>+ {item}</li>
                  ))}
                </ul>
              </article>

              <footer className={styles.contentFooter}>
                {CONTENT.footerLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </footer>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
