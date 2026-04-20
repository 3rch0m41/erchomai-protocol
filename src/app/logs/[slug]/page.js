import { client } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import styles from './log.module.css';

// Query per recuperare il log tramite lo slug
const LOG_QUERY = `*[_type == "log" && slug.current == $slug][0] {
  _id,
  title,
  publishedAt,
  content
}`;

export default async function LogPage({ params }) {
  const { slug } = await params;
  const log = await client.fetch(LOG_QUERY, { slug });

  // Fallback in caso di log non trovato
  if (!log) {
    return (
      <main className="min-h-[50vh] flex items-center justify-center text-[#00f2fe] font-mono">
        {">>"} ERROR_0x404: LOG_STREAM_CORRUPTED
      </main>
    );
  }

  const technicalId = log._id.substring(0, 8).toUpperCase();
  const dateStr = new Date(log.publishedAt).toLocaleDateString('it-IT');
  const timeStr = new Date(log.publishedAt).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

  return (
    <section className={styles.container}>
      {/* Overlay a griglia decorativo */}
      <div className={styles.gridOverlay} />

      {/* HEADER: Full Width - Titolo centrato e Navigazione a sinistra */}
      <header className={styles.header}>
        <Link href="/" className={styles.returnLink}>
          RETURN_TO_CORE
        </Link>

        <h1 className={styles.flickerTitle}>
          {log.title}
        </h1>

        {/* Spacer per bilanciare la grid e mantenere il titolo al centro */}
        <div className="hidden md:block" />
      </header>

      {/* Linea di separazione Dotted */}
      <div className={styles.mainDivider} />

      {/* WRAPPER: Centrato al 50% della pagina */}
      <div className={styles.contentWrapper}>
        
        {/* Riga dettagli tecnici subito sotto la linea */}
        <div className={styles.detailsRow}>
          <span>ID: {technicalId}</span>
          <span>TIMESTAMP: {dateStr} _ {timeStr}</span>
          <span>STATUS: STABLE</span>
        </div>

        {/* Articolo con reset dei margini per il footer globale */}
        <article className={`prose prose-invert prose-cyan max-w-none ${styles.articleContainer}`}>
          <PortableText value={log.content} components={portableTextComponents} />
        </article>
      </div>
    </section>
  );
}

// Componenti personalizzati per il rendering del contenuto Sanity
const portableTextComponents = {
  types: {
    code: ({ value }) => {
      // Logica per i numeri di riga
      const lines = value.code ? value.code.split('\n') : [];
      const lineNumbers = lines.map((_, i) => i + 1).join('\n');

      return (
        <div className={styles.codeBlockContainer}>
          {/* Header del blocco di codice stile Terminale */}
          <div className={styles.codeHeader}>
            <div className={styles.codeControls}>
              <div className={styles.dot} />
              <div className={styles.dot} />
              <div className={styles.dot} />
            </div>
            <span className={styles.codeLabel}>
              {value.language || 'RAW_DATA'}  EXECUTING...
            </span>
          </div>

          <div className={styles.codeBody}>
            {/* Colonna dei numeri di riga */}
            <pre className={styles.lineNumbers}>
              {lineNumbers}
            </pre>
            
            {/* Area del codice */}
            <pre className={styles.codePre}>
              <code className={styles.codeText}>
                {value.code}
              </code>
            </pre>
          </div>
          
          {/* Effetto scanline leggero interno al codice */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
        </div>
      );
    },
  },
  block: {
    // Styling dei titoli interni al post
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-12 mb-6 border-b border-[#00f2fe]/10 pb-2 uppercase tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-bold mt-8 mb-4 uppercase opacity-90">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-[#00f2fe]/80 leading-relaxed mb-6 font-light">
        {children}
      </p>
    ),
  },
  marks: {
    // Styling dei link nel testo
    link: ({ children, value }) => (
      <a 
        href={value.href} 
        className="text-[#00f2fe] underline decoration-[#00f2fe]/30 hover:decoration-[#00f2fe] transition-all"
        target="_blank" 
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    // Styling del codice inline
    code: ({ children }) => (
      <code className="bg-[#00f2fe]/10 text-[#00f2fe] px-1.5 py-0.5 rounded text-sm border border-[#00f2fe]/20">
        {children}
      </code>
    ),
  },
};