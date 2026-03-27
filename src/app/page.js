"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Lock, Zap, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';

export default function HomePage() {
  const pathname = usePathname();

  // Dati di esempio per i log
  const latestLogs = [
    {
      title: "The Zero-Day Protocol",
      date: "27.MAR.2026",
      category: "Security",
      excerpt: "Analisi delle minacce persistenti avanzate (APT) rilevate nei nodi periferici del sistema.",
      slug: "zero-day-protocol"
    },
    {
      title: "Encryption Standards v4",
      date: "24.MAR.2026",
      category: "Cryptography",
      excerpt: "Implementazione dei nuovi protocolli di crittografia post-quantum per la protezione dei dati.",
      slug: "encryption-v4"
    }
  ];

  return (
    <div className="min-h-screen bg-[#000212] text-white flex flex-col font-mono selection:bg-cyan-500/30 overflow-x-hidden relative">
      
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* 1. NAVBAR */}
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-start relative z-10 px-6 md:px-20 pb-40">
        
        {/* Glow di sfondo */}
        <div className="absolute top-40 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full -z-10" />

        {/* --- 2. HERO ZONE (RETTANGOLO PRINCIPALE) --- */}
        <div className="w-full max-w-[85%] md:max-w-[75%] min-h-[600px] mt-16 rounded-[48px] border border-white/10 bg-white/[0.02] backdrop-blur-md relative flex flex-col items-center justify-center p-8 md:p-16 shadow-[0_0_80px_rgba(0,0,0,0.6)]">
          
          {/* Header HUD */}
          <div className="absolute top-10 left-14 flex items-center gap-2 text-[#00f2fe]/40 text-[10px] tracking-[0.4em] uppercase font-bold">
            <Zap className="w-3 h-3 animate-pulse" />
            <span>Core_Module_v4</span>
          </div>

          {/* AREA LOGO + TESTO TECNICO */}
          <div className="relative flex flex-col lg:flex-row items-center justify-center gap-16 mb-16 w-full">
            
            {/* Testo Tecnico a Sinistra */}
            <div className="text-center lg:text-right space-y-2 order-2 lg:order-1 lg:min-w-[350px]">
              <div className="text-[#00f2fe]/50 text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-medium leading-relaxed">
                Initializing Security Lifecycle.... 
                <span className="text-[#00f2fe] font-black ml-2 drop-shadow-[0_0_8px_rgba(0,242,254,0.8)]">
                  [OK]
                </span>
                <br />
                System Status: 
                <span className="text-[#00f2fe] font-black ml-2 animate-pulse drop-shadow-[0_0_8px_rgba(0,242,254,0.8)]">
                  ACTIVE
                </span>
              </div>
            </div>

            {/* Square Logo Container */}
            <div className="relative order-1 lg:order-2">
              <div className="w-40 h-40 md:w-52 md:h-52 border border-[#00f2fe]/20 rounded-[32px] flex items-center justify-center bg-black/60 relative overflow-hidden transition-all duration-700 hover:border-[#00f2fe]/40">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f2fe]/15 to-transparent h-1/2 w-full animate-[scan_3s_linear_infinite]" />
                <span className={`text-7xl md:text-9xl font-black italic select-none z-10 nav-link-custom ${pathname === '/' ? 'active-page' : ''}`}>
                  ΣΠ
                </span>
              </div>
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-[#00f2fe]/30" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-[#00f2fe]/30" />
            </div>
          </div>

          {/* Citazione Hero */}
          <div className="text-center space-y-10 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.12em] text-white uppercase leading-tight">
              Security is not a <span className="italic font-light text-white/20 tracking-normal">destination</span>;<br />
              <span className="text-white font-bold tracking-[0.2em] drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                It is a state of arrival.
              </span>
            </h2>
          </div>
        </div>

        {/* --- 3. SECTION PROTOCOL UPDATES (CAROSELLO E TITOLO NEON) --- */}
        <section className="w-full mt-32 space-y-10 pb-20 flex flex-col items-center">
          
          {/* HEADER SEZIONE: Allineamento forzato al margine sinistro del Box Hero */}
          <div className="w-full max-w-[85%] md:max-w-[75%] px-4 md:px-0">
            <div className="border-b border-white/5 pb-5">
              <h2 className="text-2xl md:text-3xl font-black tracking-[0.5em] uppercase text-[#00f2fe] drop-shadow-[0_0_15px_rgba(0,242,254,0.8)]">
                [PROTOCOL UPDATES]
              </h2>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-3 italic">
                {latestLogs.length > 2 ? "Swipe to decrypt more nodes..." : "System archives verified."}
              </p>
            </div>
          </div>

          {/* CONTENITORE CAROSELLO CON CENTRAMENTO DINAMICO */}
          <div className="w-full flex justify-center overflow-visible">
            <div className={`flex flex-nowrap gap-8 pb-12 px-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory w-full 
              ${latestLogs.length < 3 ? 'justify-center' : 'justify-start md:pl-[12.5%]'}`}>
              
              {/* Mapping dei Log */}
              {latestLogs.map((log, index) => (
                <BlogCard 
                  key={index}
                  title={log.title}
                  date={log.date}
                  category={log.category}
                  excerpt={log.excerpt}
                  slug={log.slug}
                />
              ))}

              {/* TILE "SEE MORE" FISSA */}
              <Link 
                href="/logs"
                className="group relative flex-shrink-0 w-[300px] md:w-[350px] aspect-square bg-white/[0.01] border-2 border-dashed border-white/10 rounded-[32px] p-8 transition-all duration-500 hover:border-[#00f2fe]/40 hover:bg-[#00f2fe]/5 flex flex-col items-center justify-center gap-6 snap-center"
              >
                <div className="w-20 h-20 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center group-hover:border-[#00f2fe]/40 group-hover:scale-110 transition-all duration-500 shadow-inner">
                  <ChevronRight className="w-10 h-10 text-white/10 group-hover:text-[#00f2fe] transition-colors" />
                </div>
                <div className="text-center space-y-2">
                  <span className="block text-[14px] font-black uppercase tracking-[0.6em] text-white/40 group-hover:text-white transition-colors">
                    See More..
                  </span>
                  <span className="block text-[9px] uppercase tracking-[0.3em] text-[#00f2fe]/40 font-bold">
                    Access_Full_Archive [READ_ALL]
                  </span>
                </div>
                <div className="absolute inset-0 rounded-[32px] bg-[#00f2fe]/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </Link>
              
              {/* Padding tecnico finale */}
              <div className="flex-shrink-0 w-8 md:hidden" />
            </div>
          </div>
        </section>

      </main>

      {/* 4. FOOTER */}
      <footer className="px-20 py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-20 text-[9px] uppercase tracking-[0.6em] font-mono mt-auto">
        <div className="flex items-center gap-3 text-cyan-500 font-bold">
          <Lock className="w-3 h-3" />
          <span>ENCRYPTED_SESSION</span>
        </div>
        <span>© 2026 Erchomai_Repository</span>
      </footer>

      {/* ANIMAZIONI E UTILITY CSS */}
      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-120%); }
          100% { transform: translateY(220%); }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}