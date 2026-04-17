import React from 'react';
import { Zap, ChevronRight } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';
import { client } from '@/sanity/lib/client'; // Assicurati che l'alias @ punti a /src

// Query per recuperare gli ultimi 4 log pubblicati
const GET_LATEST_LOGS = `*[_type == "log"] | order(publishedAt desc)[0...4] {
  title,
  excerpt,
  "slug": slug.current
}`;

export default async function HomePage() {
  // Recupero dati da Sanity
  const latestLogs = await client.fetch(GET_LATEST_LOGS);

  return (
    <div className="flex flex-col items-center w-full relative">
      
      {/* Background HUD Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10" />
      
      <main className="w-full flex flex-col items-center relative z-10 px-6 pb-24">
        
        {/* HERO ZONE */}
        <div className="w-full max-w-[85%] md:max-w-[50%] lg:max-w-[42%] min-h-[460px] mt-16 rounded-[40px] border border-white/10 bg-white/[0.01] backdrop-blur-md relative flex flex-col items-center justify-center p-12 shadow-[0_0_80px_rgba(0,0,0,0.8)]">
          <div className="absolute top-8 left-10 flex items-center gap-2 text-[#00f2fe]/30 text-[8px] tracking-[0.5em] font-bold uppercase">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            <span>ERCHOMAI_PROTOCOL_v4.1</span>
          </div>
          
          <div className="w-24 h-24 md:w-32 md:h-32 border border-[#00f2fe]/20 rounded-[32px] flex items-center justify-center bg-black/40 mb-10 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f2fe]/15 to-transparent h-1/2 w-full animate-[scan_4s_linear_infinite]" />
            <span className="text-5xl md:text-6xl font-black italic">ΣΠ</span>
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-extralight tracking-[0.12em] text-center uppercase leading-tight">
            Security is not a <span className="text-white/10 italic">destination</span>;<br />
            <span className="font-bold text-white tracking-[0.2em] text-2xl md:text-4xl mt-4 block leading-none">
              It is a state of arrival.
            </span>
          </h2>
        </div>

        {/* SECTION HEADER */}
        <div className="w-full max-w-[85%] md:max-w-[50%] lg:max-w-[42%] mt-28 mb-10">
          <div className="flex items-end justify-between px-2">
            <h2 className="text-4xl md:text-5xl font-black text-[#00f2fe] uppercase italic leading-none">
              [SYSTEM_LOG]
            </h2>
            <Link href="/logs" className="group flex items-center gap-2 mb-1 no-underline">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 group-hover:text-[#00f2fe] transition-colors">
                View_Full_Archive
              </span>
              <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-[#00f2fe] group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
          <div className="h-[1px] w-full bg-white/10 mt-4" />
        </div>

        {/* BLOG CARDS ZONE */}
        <section className="w-full max-w-[85%] md:max-w-[50%] lg:max-w-[42%]">
          <div className="flex flex-row gap-6 lg:gap-8 items-stretch">
            {latestLogs.length > 0 ? (
              latestLogs.map((log, index) => (
                <div key={index} className="flex-1 min-w-0">
                  <BlogCard 
                    title={log.title} 
                    excerpt={log.excerpt} 
                    slug={log.slug} 
                  />
                </div>
              ))
            ) : (
              // Fallback se non ci sono post in Sanity
              <p className="text-[#00f2fe]/30 text-[10px] uppercase tracking-widest w-full text-center py-10">
                No logs found in terminal...
              </p>
            )}
          </div>
        </section>
      </main>

      {/* Stile CSS Global gestito per Server Components */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
        ::-webkit-scrollbar { display: none; }
        body { -ms-overflow-style: none; scrollbar-width: none; background-color: black; }
      `}} />
    </div>
  );
}