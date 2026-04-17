import { client } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import styles from './log.module.css';

const LOG_QUERY = `*[_type == "log" && slug.current == $slug][0] {
  _id,
  title,
  publishedAt,
  content
}`;

export default async function LogPage({ params }) {
  const { slug } = await params;
  const log = await client.fetch(LOG_QUERY, { slug });

  if (!log) {
    return (
      <main className="min-h-screen bg-black text-[#00f2fe] p-24 font-mono">
        {">>"} ERROR_0x404: LOG_NOT_FOUND
      </main>
    );
  }

  const technicalId = log._id.substring(0, 8).toUpperCase();

  return (
    <div className={styles.container}>
      {/* Elementi estetici di sfondo */}
      <div className={styles.gridOverlay} />
      <div className={styles.scanlines} />

      <main className="max-w-4xl mx-auto p-6 md:p-12 lg:p-16 relative z-10">
        
        {/* HEADER - La linea inferiore funge da decorazione superiore per il titolo */}
        <header className={styles.header}>
          <div className="mb-6 md:mb-0">
            <Link href="/" className={styles.returnLink}>
              {"<"} RETURN_TO_CORE
            </Link>
          </div>
          <div className="flex flex-col md:items-end gap-1 opacity-60 text-[10px] tracking-[0.3em] uppercase">
            <p>LOG_ID: {technicalId}</p>
            <p>ENTRY: {new Date(log.publishedAt).toLocaleDateString('it-IT')}</p>
          </div>
        </header>

        {/* TITOLO CENTRALE - Fluttua sotto la linea dell'header */}
        <div className="mb-32 flex flex-col items-center text-center">
          <h1 className={`text-5xl md:text-8xl font-black uppercase tracking-tighter ${styles.flickerTitle}`}>
            {log.title}
          </h1>
          <p className="mt-6 text-[11px] opacity-40 tracking-[0.6em] uppercase">
            Security_Protocol_Override_Active
          </p>
        </div>

        {/* CONTENUTO ARTICOLO */}
        <article className="prose prose-invert prose-cyan max-w-none 
          prose-p:text-[#00f2fe]/80 prose-p:leading-relaxed prose-p:mb-8 prose-p:font-light
          prose-headings:text-[#00f2fe] prose-headings:uppercase prose-headings:tracking-tighter
          prose-strong:text-white prose-strong:font-bold
          prose-ul:list-disc prose-li:marker:text-[#00f2fe]/40">
          <PortableText value={log.content} components={portableTextComponents} />
        </article>

        {/* FOOTER TERMINALE */}
        <footer className="mt-40 pb-10 text-center opacity-20 text-[9px] tracking-[0.8em] uppercase border-t border-[#00f2fe]/10 pt-10">
          <p>End of Transmission // {technicalId}</p>
        </footer>
      </main>
    </div>
  );
}

// Componenti per PortableText
const portableTextComponents = {
  types: {
    code: ({ value }) => (
      <div className={styles.codeBlockContainer}>
        <div className={styles.codeLabel}>
          SOURCE_CODE // {value.language || 'RAW_DATA'}
        </div>
        <pre className={styles.codePre}>
          <code className="text-xs md:text-sm text-[#00f2fe]/90 leading-relaxed font-mono">
            {value.code}
          </code>
        </pre>
      </div>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-20 mb-8 border-b border-[#00f2fe]/10 pb-4 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-bold mt-12 mb-4 tracking-widest opacity-90">
        {children}
      </h3>
    ),
  },
  marks: {
    code: ({ children }) => (
      <code className="bg-[#00f2fe]/15 text-[#00f2fe] px-1.5 py-0.5 rounded-sm text-xs border border-[#00f2fe]/20">
        {children}
      </code>
    ),
  }
};