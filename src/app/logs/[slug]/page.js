// src/app/logs/[slug]/page.js
import { client } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import styles from './log.module.css';

// 1. QUERY PULITA: Recupera i dati grezzi da Sanity senza elaborazioni di stringhe
const LOG_QUERY = `*[ _type in ["forgeLog", "breachLog", "malwareLog"] && slug.current == $slug ][0] {
  _id,
  _type,
  title,
  publishedAt,
  content,
  status,
  version,
  language,
  platform,
  difficulty,
  exploitVec,
  fileHash,
  sandboxEnv
}`;

// Oggetto di mapping per i prefissi testuali sicuri
const PREFIX_TEXT = {
  forgeLog: "FORGE_CRAFT // ",
  breachLog: "BREACH_REPORT // ",
  malwareLog: "MALWARE_SNDBX // ",
};

export default async function LogPage({ params }) {
  const { slug } = await params;
  const log = await client.fetch(LOG_QUERY, { slug });

  if (!log) {
    return (
      <main className="min-h-[50vh] flex items-center justify-center text-[#00f2fe] font-mono">
        {">> ERROR_0x404: LOG_STREAM_CORRUPTED"}
      </main>
    );
  }

  // 2. FORMATTAZIONE SICURA: Assegnazione del prefisso tramite template literal
  const prefix = PREFIX_TEXT[log._type] || "SYSTEM // ";
  const fullTitle = `${prefix}${log.title}`;
  
  const technicalId = log._id ? log._id.substring(0, 8).toUpperCase() : "00000000";

  return (
    <section className={styles.container}>
      <div className={styles.gridOverlay} />

      <header className={styles.header}>
        <Link href="/logs" className={styles.returnLink}>
          RETURN_TO_ARCHIVE
        </Link>
        {/* Renderizzato come stringa JavaScript pura per evitare conflitti sintattici */}
        <h1 className={styles.flickerTitle}>{fullTitle}</h1>
        <div className="hidden md:block" />
      </header>

      <div className={styles.mainDivider} />

      <div className={styles.contentWrapper}>
        
        {/* 3. DETAILS ROW CONDIZIONALE: Mostra i metadati in base al tipo di schema */}
        <div className={styles.detailsRow}>
          <span>{`ID: ${technicalId}`}</span>
          
          {log._type === 'forgeLog' && (
            <span>{`ENV: ${log.language || 'UNKNOWN'} // ${log.version || 'v1.0.0'}`}</span>
          )}
          {log._type === 'breachLog' && (
            <span>{`TARGET: ${log.platform || 'CTF'} // ${log.difficulty || 'MEDIUM'}`}</span>
          )}
          {log._type === 'malwareLog' && (
            <span>{`ENV: ${log.sandboxEnv || 'SANDBOX'}`}</span>
          )}
          
          <span>{`STATUS: ${log.status || "STABLE"}`}</span>
        </div>

        <article className={`prose prose-invert prose-cyan max-w-none ${styles.articleContainer}`}>
          <PortableText value={log.content} components={portableTextComponents} />
        </article>
      </div>
    </section>
  );
}

// Configurazione dei componenti PortableText (invariata, ma protetta nelle stringhe)
const portableTextComponents = {
  types: {
    code: ({ value }) => {
      const lines = value.code ? value.code.split('\n') : [];
      const lineNumbers = lines.map((_, i) => i + 1).join('\n');
      return (
        <div className={styles.codeBlockContainer}>
          <div className={styles.codeHeader}>
            <div className={styles.codeControls}>
              <div className={styles.dot}/>
              <div className={styles.dot}/>
              <div className={styles.dot}/>
            </div>
            <span className={styles.codeLabel}>{value.language || 'RAW_DATA'}</span>
          </div>
          <div className={styles.codeBody}>
            <pre className={styles.lineNumbers}>{lineNumbers}</pre>
            <pre className={styles.codePre}>
              <code className={styles.codeText}>{value.code}</code>
            </pre>
          </div>
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
        </div>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-12 mb-6 border-b border-[#00f2fe]/10 pb-2 uppercase tracking-tight">
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <p className="text-[#00f2fe]/80 leading-relaxed mb-6 font-light">
        {children}
      </p>
    ),
  }
};