import React from 'react';
import { Zap, ChevronRight } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';
import Image from 'next/image';
import heroLogo from '@/assets/erchomai-hero.png';
import { client } from '@/sanity/lib/client';
import { getLogType, getLogPrefix, LOG_TYPES_GROQ } from '@/lib/logTypes';

// Rigenera la pagina al massimo ogni 60 secondi, così i log pubblicati
// nello Studio compaiono sul sito senza dover rifare il deploy.
export const revalidate = 60;

// QUERY AGGIORNATA: Recupera gli ultimi 4 log interrogando i tre nuovi schemi
const GET_LATEST_LOGS = `*[ _type in ${LOG_TYPES_GROQ} ] | order(publishedAt desc)[0...4] {
  _id,
  _type,
  title,
  excerpt,
  "slug": slug.current,
  status
}`;

export default async function HomePage() {
  // Recupero dati da Sanity
  const rawLogs = await client.fetch(GET_LATEST_LOGS);

  // Normalizziamo i log prima di mandarli in rendering
  const latestLogs = rawLogs.map(log => {
    const calculatedType = getLogType(log._type);
    const prefix = getLogPrefix(log._type);
    
    return {
      ...log,
      type: calculatedType,
      // Passiamo il titolo già completo di prefisso formattato in JS
      displayTitle: `${prefix}${log.title}`
    };
  });

  return (
    // DESKTOP: la home riempie esattamente lo spazio tra Navbar e Footer.
    // Il riquadro principale prende tutto lo spazio che resta sopra gli articoli;
    // se lo schermo è troppo basso non si schiaccia oltre il minimo e la pagina scorre.
    // MOBILE: riquadro e articoli uno sotto l'altro, con scroll normale.
    <div className="relative w-full flex flex-col flex-[1_0_auto]">

      {/* Background HUD Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10" />

      {/* Contenitore: tutta la larghezza fino a 1700px, margini allineati alla Navbar */}
      <div className="relative z-10 flex-1 flex flex-col w-full max-w-[1700px] mx-auto box-border px-4 md:px-8 lg:px-20 pt-4 lg:pt-5 pb-8 lg:pb-6">

        {/* HERO ZONE */}
        <div className="relative flex-1 min-h-[380px] md:min-h-[260px] w-full box-border rounded-[32px] md:rounded-[40px] border border-white/10 bg-white/[0.01] bg-[radial-gradient(ellipse_at_center,rgba(0,242,254,0.05),transparent_65%)] backdrop-blur-md flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-[clamp(32px,5vw,96px)] px-6 lg:px-12 py-10 md:py-6 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]">
          <div className="absolute top-6 left-6 md:top-8 md:left-10 flex items-center gap-2 text-[#00f2fe]/30 text-[8px] tracking-[0.5em] font-bold uppercase">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            <span>ERCHOMAI_PROTOCOL_v4.1</span>
          </div>

          {/* Logo a sinistra (sopra su telefono), alto quanto il riquadro */}
          {/* Telefono: logo sopra la frase, a grandezza naturale (la pagina scorre).
              Tablet: il logo occupa lo spazio che resta sopra la frase.
              Desktop: logo a sinistra, alto quasi quanto il riquadro. */}
          <div className="relative w-full flex justify-center md:flex-1 md:min-h-[140px] lg:flex-none lg:min-h-0 lg:w-auto lg:h-[90%] lg:max-h-[600px] lg:aspect-[842/708] lg:flex-shrink-0">
            <Image
              src={heroLogo}
              alt="ERCHOMAI PROTOCOL"
              preload
              sizes="(max-width: 1024px) 90vw, 640px"
              className="w-full max-w-[380px] h-auto md:absolute md:inset-0 md:h-full md:w-full md:max-w-none object-contain"
            />
          </div>

          {/* Su telefono la frase è più contenuta; da tablet in su segue l'altezza dello schermo */}
          <h1 className="m-0 text-[1rem] md:text-[clamp(1rem,2.4vh,1.6rem)] font-extralight tracking-[0.12em] text-center lg:text-left uppercase leading-tight">
            Security is not a{" "}
            {/* Parola chiave in azzurro, il colore d'accento del sito */}
            <span className="text-[#00f2fe] italic font-normal drop-shadow-[0_0_12px_rgba(0,242,254,0.35)]">destination</span>;<br />
            <span className="font-bold text-white tracking-[0.2em] text-[1.85rem] md:text-[clamp(1.6rem,4.8vh,3.4rem)] mt-[clamp(8px,1.8vh,20px)] block leading-none">
              It is a state of arrival.
            </span>
          </h1>
        </div>

        {/* SECTION HEADER */}
        <div className="w-full mt-8 lg:mt-5 mb-4">
          <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3 px-2">
            <h2 className="text-3xl lg:text-4xl font-black text-[#00f2fe] uppercase italic leading-none m-0">
              [SYSTEM_LOG]
            </h2>
            <Link href="/logs" className="group flex items-center gap-2 mb-1 no-underline">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 group-hover:text-[#00f2fe] transition-colors">
                View_Full_Archive
              </span>
              <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-[#00f2fe] group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
          <div className="h-[1px] w-full bg-white/10 mt-3" />
        </div>

        {/* BLOG CARDS ZONE: 1 colonna su telefono, 2 su tablet, 4 in riga su desktop */}
        <section className="w-full flex-shrink-0">
          {latestLogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {latestLogs.map((log) => (
                <div key={log._id} className="min-w-0 lg:h-[clamp(120px,16vh,165px)]">
                  <BlogCard
                    title={log.displayTitle} // Titolo già completo di prefisso
                    excerpt={log.excerpt}
                    slug={log.slug}
                    type={log.type}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#00f2fe]/30 text-[10px] uppercase tracking-widest w-full text-center py-10">
              No logs found in terminal...
            </p>
          )}
        </section>
      </div>

      {/* Stile CSS Global gestito per Server Components */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
        ::-webkit-scrollbar { display: none; }
        body { -ms-overflow-style: none; scrollbar-width: none; background-color: black; }
      `}} />
    </div>
  );
}
