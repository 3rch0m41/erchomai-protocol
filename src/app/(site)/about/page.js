import React from 'react';
import { User, Shield, Cpu, Terminal, Award, ChevronRight } from 'lucide-react';
import styles from './about.module.css';

export const metadata = {
  title: 'About',
  description: 'Giulio Malini (Erchomai) — laureato in Sicurezza dei Sistemi e delle Reti, orientato al Blue Team. ERCHOMAI PROTOCOL è il suo portfolio e archivio di sicurezza informatica.',
};

// ============================================================
// TESTI DELLA PAGINA: modifica solo questo blocco.
// Per aggiornare qualcosa, cambia i valori qui sotto e rifai il deploy.
// ============================================================
const CONTENT = {
  // --- Riquadro identità (sinistra) ---
  status: [
    { label: 'ID_ENTITY:', value: 'ERCHOMAI' },
    { label: 'STATUS:', value: 'ONLINE', highlight: true },
    { label: 'ROLE:', value: 'BLUE_TEAM' },
  ],
  hardwareTitle: 'CORE_STACK',

  // --- Intestazione (destra) ---
  title: 'OPERATOR_PROFILE',
  breadcrumb: 'ROOT > ARCHIVE > OPERATOR',

  // --- Sezione 1: chi sono ---
  missionTitle: 'IDENTITY',
  // Il testo è spezzato in "prima / parola evidenziata / dopo": la parte
  // centrale appare in azzurro. Modifica le tre parti mantenendo il senso.
  missionBefore:
    'Sono Giulio Malini, ma online mi trovi come Erchomai. Ho una laurea in Sicurezza dei Sistemi e delle Reti Informatiche conseguita all\u2019Universit\u00e0 degli Studi di Milano, e oggi lavoro come Data Management Engineer in Wood Italiana S.r.l. La sicurezza informatica \u00e8 la direzione verso cui voglio portare la mia carriera: sono orientato soprattutto al ',
  missionHighlight: 'Blue Team',
  missionAfter:
    ', la difesa dei sistemi, ma resto aperto a tutto ci\u00f2 che mi permette di crescere nel settore. Sono alla ricerca della mia prima posizione professionale nella cybersecurity.',

  // --- Sezione 2: il progetto ---
  projectTitle: 'THE_PROTOCOL',
  // "Erchomai" (\u1f14\u03c1\u03c7\u03bf\u03bc\u03b1\u03b9) in greco significa "vengo, sto arrivando".
  projectText:
    'Il nome nasce dal greco \u00e9rchomai, \u00abvengo, sto arrivando\u00bb: la stessa idea della frase che apre il sito, \u00absecurity is a state of arrival\u00bb. La sicurezza non \u00e8 un traguardo fisso ma un percorso, e questo archivio ne \u00e8 il diario. ERCHOMAI PROTOCOL nasce con due scopi: da un lato \u00e8 il mio portfolio, il posto dove mostro con fatti concreti ci\u00f2 che so fare; dall\u2019altro \u00e8 una fonte aperta, pensata per chi vuole avvicinarsi alla materia o cerca spunti e approfondimenti. Ogni report \u2014 CTF, progetti di codice, esperimenti in laboratorio \u2014 \u00e8 sia una prova delle mie competenze sia qualcosa che spero possa essere utile a qualcun altro.',

  // --- Sezione 3: competenze ---
  skillsTitle: 'CAPABILITIES',
  skillsIntro: 'Le aree e gli strumenti su cui mi muovo:',
  skills: [
    'Sicurezza difensiva (Blue Team) e analisi',
    'Scripting e automazione in Python',
    'Programmazione: C++, Java',
    'Sviluppo web: HTML & CSS',
  ],

  // --- Sezione 4: certificazioni / badge ---
  // AGGIUNGERE UNA CERTIFICAZIONE: copia una riga qui sotto e cambiala.
  // Se lasci la lista vuota ( [] ), l'intera sezione sparisce dal sito.
  // Esempio: { name: 'CompTIA Security+', issuer: 'CompTIA', year: '2026' },
  certsTitle: 'CREDENTIALS',
  certsEmpty: 'Sezione in aggiornamento.',
  certs: [
    // { name: 'Nome certificazione', issuer: 'Ente', year: 'Anno' },
  ],

  // --- Piè di pagina del riquadro ---
  footerLines: ['LOCATION: MILANO, IT', 'SIGNATURE: ERCHOMAI'],
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
                <Terminal size={16} /> <Cpu size={16} /> <Shield size={16} />
              </div>
            </div>
          </aside>

          {/* CONTENUTO */}
          <section className={styles.contentArea}>
            <div className={styles.contentScroll}>
              <header className={styles.contentHeader}>
                <h1 className={styles.glitchTitle}>{CONTENT.title}</h1>
                <div className={styles.breadcrumb}>{CONTENT.breadcrumb}</div>
              </header>

              {/* 1. Identità */}
              <article className={styles.articleSection}>
                <h2 className={styles.subTitle}><User size={18} /> {CONTENT.missionTitle}</h2>
                <p className={styles.text}>
                  {CONTENT.missionBefore}
                  <span className={styles.highlight}>{CONTENT.missionHighlight}</span>
                  {CONTENT.missionAfter}
                </p>
              </article>

              {/* 2. Il progetto */}
              <article className={styles.articleSection}>
                <h2 className={styles.subTitle}><Shield size={18} /> {CONTENT.projectTitle}</h2>
                <p className={styles.text}>{CONTENT.projectText}</p>
              </article>

              {/* 3. Competenze */}
              <article className={styles.articleSection}>
                <h2 className={styles.subTitle}><Cpu size={18} /> {CONTENT.skillsTitle}</h2>
                <p className={styles.text}>{CONTENT.skillsIntro}</p>
                <ul className={styles.techList}>
                  {CONTENT.skills.map((item) => (
                    <li key={item}>+ {item}</li>
                  ))}
                </ul>
              </article>

              {/* 4. Certificazioni / badge */}
              <article className={styles.articleSection}>
                <h2 className={styles.subTitle}><Award size={18} /> {CONTENT.certsTitle}</h2>
                {CONTENT.certs.length > 0 ? (
                  <ul className={styles.certList}>
                    {CONTENT.certs.map((cert) => (
                      <li key={cert.name} className={styles.certItem}>
                        <ChevronRight size={12} className={styles.certIcon} />
                        <span className={styles.certName}>{cert.name}</span>
                        <span className={styles.certMeta}>
                          {[cert.issuer, cert.year].filter(Boolean).join(' · ')}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.certEmpty}>{CONTENT.certsEmpty}</p>
                )}
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
