// src/app/(site)/logs/[slug]/page.js
import { cache } from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { highlightCode } from '@/lib/highlight';
import { SITE_NAME } from '@/lib/site';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './log.module.css';

// Rigenera la pagina al massimo ogni 60 secondi, così i log pubblicati
// nello Studio compaiono sul sito senza dover rifare il deploy.
export const revalidate = 60;

// 1. QUERY PULITA: Recupera i dati grezzi da Sanity senza elaborazioni di stringhe
const LOG_QUERY = `*[ _type in ["forgeLog", "breachLog", "malwareLog"] && slug.current == $slug ][0] {
  _id,
  _type,
  title,
  excerpt,
  publishedAt,
  "content": content[] {
    ...,
    // Per le immagini servono anche le dimensioni, per riservare lo spazio
    _type == "image" => { "dimensions": asset->metadata.dimensions }
  },
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

// Una sola richiesta a Sanity per pagina, condivisa da metadati e contenuto
const getLog = cache((slug) => client.fetch(LOG_QUERY, { slug }));

// Titolo e descrizione del singolo log (scheda del browser, motori di ricerca, anteprime)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const log = await getLog(slug);
  if (!log) return {};

  const prefix = PREFIX_TEXT[log._type] || "SYSTEM // ";
  return {
    title: `${prefix}${log.title}`,
    description: log.excerpt || undefined,
    // Next non unisce openGraph con quello del layout: i campi comuni vanno ripetuti qui
    openGraph: {
      type: 'article',
      title: `${prefix}${log.title}`,
      description: log.excerpt || undefined,
      publishedTime: log.publishedAt || undefined,
      siteName: SITE_NAME,
      locale: 'it_IT',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/opengraph-image'],
    },
  };
}

export default async function LogPage({ params }) {
  const { slug } = await params;
  const log = await getLog(slug);

  // Slug inesistente: vera risposta 404 con la pagina not-found.js del sito
  if (!log) {
    notFound();
  }

  // 2. FORMATTAZIONE SICURA: Assegnazione del prefisso tramite template literal
  // Evidenziazione della sintassi: calcolata qui sul server per ogni blocco di codice
  const content = await Promise.all(
    (log.content || []).map(async (block) =>
      block._type === 'code'
        ? { ...block, tokens: await highlightCode(block.code, block.language) }
        : block
    )
  );

  const prefix = PREFIX_TEXT[log._type] || "SYSTEM // ";
  const fullTitle = `${prefix}${log.title}`;
  
  const technicalId = log._id ? log._id.substring(0, 8).toUpperCase() : "00000000";
  // Data in formato fisso AAAA.MM.GG, come nelle card dell'archivio
  const date = log.publishedAt
    ? log.publishedAt.slice(0, 10).replaceAll('-', '.')
    : "PENDING";

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
          <time dateTime={log.publishedAt || undefined}>{`DATE: ${date}`}</time>
          
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
          <PortableText value={content} components={portableTextComponents} />
        </article>
      </div>
    </section>
  );
}

// Trasforma i token di Shiki in <span> colorati (una riga per volta)
function renderTokens(lines) {
  return lines.map((line, i) => (
    <span key={i}>
      {line.map((token, j) => (
        <span
          key={j}
          style={{
            color: token.color,
            fontStyle: token.fontStyle & 1 ? 'italic' : undefined,
            fontWeight: token.fontStyle & 2 ? 'bold' : undefined,
            textDecoration: token.fontStyle & 4 ? 'underline' : undefined,
          }}
        >
          {token.content}
        </span>
      ))}
      {i < lines.length - 1 ? '\n' : null}
    </span>
  ));
}

// Larghezze in cui il CDN di Sanity genera l'immagine (il browser sceglie la più adatta)
const IMAGE_WIDTHS = [640, 960, 1280, 1600];

// Configurazione dei componenti PortableText
const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const imageUrl = (width) => urlFor(value).width(width).fit('max').auto('format').url();
      return (
        <figure className={styles.figure}>
          {/* <img> invece di next/image: le immagini sono già ridimensionate e
              ottimizzate dal CDN di Sanity, senza consumare la quota di Vercel */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl(1280)}
            srcSet={IMAGE_WIDTHS.map((w) => `${imageUrl(w)} ${w}w`).join(', ')}
            sizes="(max-width: 1000px) 100vw, 1000px"
            width={value.dimensions?.width}
            height={value.dimensions?.height}
            alt={value.alt || ''}
            loading="lazy"
            decoding="async"
            className={styles.figureImage}
          />
          {value.caption && (
            <figcaption className={styles.figureCaption}>{value.caption}</figcaption>
          )}
        </figure>
      );
    },
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
            <span className={styles.codeLabel}>
              {/* Nome file (se indicato nello Studio) seguito dal linguaggio */}
              {value.filename && <span className={styles.codeFilename}>{value.filename}</span>}
              {value.language || 'RAW_DATA'}
            </span>
          </div>
          <div className={styles.codeBody}>
            <pre className={styles.lineNumbers}>{lineNumbers}</pre>
            <pre className={styles.codePre}>
              <code className={styles.codeText}>
                {value.tokens ? renderTokens(value.tokens) : value.code}
              </code>
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