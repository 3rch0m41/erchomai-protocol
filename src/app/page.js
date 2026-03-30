"use client";

import React from 'react';
import { Lock, Zap, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';

export default function HomePage() {
  const latestLogs = [
    { title: "The Zero-Day Protocol", excerpt: "Analisi delle minacce APT rilevate nei nodi periferici.", slug: "zero-day" },
    { title: "Encryption Standards v4", excerpt: "Protocolli post-quantum per la protezione dati.", slug: "encryption" }
  ];

  return (
    <div className="min-h-screen bg-[#000212] text-white flex flex-col font-mono selection:bg-cyan-500/30 overflow-x-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <Navbar />

      <main className="flex-grow flex flex-col items-center relative z-10 px-6 pb-40">
        
        {/* HERO ZONE */}
        <div className="w-full max-w-[85%] md:max-w-[70%] min-h-[550px] mt-16 rounded-[48px] border border-white/10 bg-white/[0.02] backdrop-blur-md relative flex flex-col items-center justify-center p-8 md:p-16 shadow-[0_0_80px_rgba(0,0,0,0.6)]">
          <div className="absolute top-10 left-14 flex items-center gap-2 text-[#00f2fe]/40 text-[10px] tracking-[0.4em] font-bold uppercase">
            <Zap className="w-3 h-3 animate-pulse" />
            <span>Core_Module_v4</span>
          </div>
          <div className="w-36 h-36 md:w-44 md:h-44 border border-[#00f2fe]/20 rounded-[32px] flex items-center justify-center bg-black/60 mb-12 relative overflow-hidden shadow-[0_0_30px_rgba(0,242,254,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f2fe]/15 to-transparent h-1/2 w-full animate-[scan_3s_linear_infinite]" />
            <span className="text-6xl md:text-8xl font-black italic">ΣΠ</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extralight tracking-[0.12em] text-center uppercase leading-tight">
            Security is not a <span className="text-white/20 italic">destination</span>;<br />
            <span className="font-bold text-white tracking-[0.2em]">It is a state of arrival.</span>
          </h2>
        </div>

        {/* SECTION UPDATES */}
        <section className="w-full mt-32 flex flex-col items-center">
          <div className="w-full max-w-[85%] md:max-w-[70%] mb-12">
            <h2 className="text-xl md:text-2xl font-black tracking-[0.5em] text-[#00f2fe] uppercase">[PROTOCOL UPDATES]</h2>
          </div>

          <div className="w-full no-scrollbar overflow-x-auto">
            <div className="blog-gallery-container px-10">
              {latestLogs.map((log, index) => (
                <div key={index} className="blog-card-wrapper">
                  <BlogCard {...log} />
                </div>
              ))}

              {/* See More */}
              <Link href="/logs" className="flex-shrink-0 flex flex-col items-center justify-center gap-4 group opacity-30 hover:opacity-100 transition-all">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#00f2fe]">
                  <ChevronRight className="w-8 h-8 group-hover:text-[#00f2fe]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Archive</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 border-t border-white/5 flex flex-col items-center opacity-20 text-[9px] tracking-[0.5em] uppercase mt-auto">
        <div className="flex items-center gap-3 text-cyan-500 font-bold mb-2">
          <Lock className="w-3 h-3" /><span>ENCRYPTED_SESSION</span>
        </div>
        <span>© 2026 Erchomai_Repository</span>
      </footer>
    </div>
  );
}