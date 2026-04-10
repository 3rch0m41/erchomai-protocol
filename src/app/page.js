"use client";

import React, { useEffect, useRef } from 'react';
import { Zap, ChevronRight } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';

export default function HomePage() {
  const scrollRef = useRef(null);

  // Mock data per i log (da sostituire con i tuoi dati reali/Sanity)
  const latestLogs = [
    { title: "Zero-Day Protocol", excerpt: "Analisi minacce APT nodi cluster.", slug: "zero-day" },
    { title: "Quantum Encryption", excerpt: "Standard post-quantum integrati.", slug: "encryption" },
    { title: "Neural Link v4", excerpt: "Integrità canali biometrici.", slug: "neural-link" },
    { title: "Cloud Firewall", excerpt: "Filtraggio euristico AI attivo.", slug: "cloud-v9" },
    { title: "System Breach Audit", excerpt: "Rapporto vulnerabilità legacy.", slug: "audit-2024" },
    { title: "Proxy Tunneling", excerpt: "Routing criptato multi-layer.", slug: "proxy-tunnel" },
    { title: "Kernel Override", excerpt: "Accesso prioritario ai nodi core.", slug: "kernel-over" }
  ];

  // Logica Autoscroll
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollStep = 0.8;
    const delay = 25;

    const autoScroll = setInterval(() => {
      if (scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth - 1) {
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainer.scrollLeft += scrollStep;
      }
    }, delay);

    const stopScroll = () => clearInterval(autoScroll);
    scrollContainer.addEventListener('mouseenter', stopScroll);
    
    return () => {
      clearInterval(autoScroll);
      scrollContainer.removeEventListener('mouseenter', stopScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#000212] text-white flex flex-col font-mono selection:bg-[#00f2fe]/30 overflow-hidden relative">
      
      {/* HUD Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <main className="flex-grow flex flex-col items-center relative z-10 px-6 pb-20">
        
        {/* HERO ZONE - Dimensioni aumentate */}
        <div className="w-full max-w-[85%] md:max-w-[50%] lg:max-w-[42%] min-h-[460px] mt-16 rounded-[40px] border border-white/10 bg-white/[0.01] backdrop-blur-md relative flex flex-col items-center justify-center p-12 shadow-[0_0_80px_rgba(0,0,0,0.8)]">
          
          <div className="absolute top-8 left-10 flex items-center gap-2 text-[#00f2fe]/30 text-[8px] tracking-[0.5em] font-bold uppercase">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            <span>Core_v4.1_Enhanced</span>
          </div>

          {/* Logo Sigma Pi */}
          <div className="w-24 h-24 md:w-32 md:h-32 border border-[#00f2fe]/20 rounded-[32px] flex items-center justify-center bg-black/40 mb-10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f2fe]/15 to-transparent h-1/2 w-full animate-[scan_4s_linear_infinite]" />
            <span className="text-5xl md:text-6xl font-black italic group-hover:scale-110 transition-transform duration-700">ΣΠ</span>
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-extralight tracking-[0.12em] text-center uppercase leading-tight">
            Security is not a <span className="text-white/10 italic">destination</span>;<br />
            <span className="font-bold text-white tracking-[0.2em] text-2xl md:text-4xl mt-4 block leading-none">
              It is a state of arrival.
            </span>
          </h2>
        </div>

        {/* SECTION HEADER - Allineata alla Hero */}
        <div className="w-full max-w-[85%] md:max-w-[50%] lg:max-w-[42%] mt-28 mb-10 text-left">
          <h2 className="text-4xl md:text-5xl font-black text-[#00f2fe] uppercase italic leading-none mb-2">
            [SYSTEM_LOG]
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-white/30 tracking-widest uppercase whitespace-nowrap">Live_Encrypted_Data_Stream</span>
            <div className="h-[1px] flex-grow bg-white/10" />
          </div>
        </div>

        {/* CAROUSEL - Scorre liberamente */}
        <section className="w-full overflow-hidden">
          <div 
            ref={scrollRef}
            className="w-full overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing"
          >
            <div className="flex gap-6 px-10 w-max pb-10">
              {latestLogs.map((log, index) => (
                <div key={index} className="w-[220px] md:w-[280px] flex-shrink-0">
                  <BlogCard {...log} />
                </div>
              ))}

              {/* Card Archivio finale adattata */}
              <Link href="/logs" 
                className="flex items-center justify-between px-8 bg-white/[0.03] border border-white/10 rounded-[20px] hover:bg-[#00f2fe]/10 hover:border-[#00f2fe]/30 transition-all group min-h-[120px] w-[220px] md:w-[280px] flex-shrink-0">
                <div className="flex flex-col">
                  <span className="text-[11px] font-black uppercase text-white/40 group-hover:text-[#00f2fe]">Full Archive</span>
                  <span className="text-[8px] text-white/10 group-hover:text-white/20 uppercase mt-0.5 tracking-widest italic">Encrypted_Access</span>
                </div>
                <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-[#00f2fe] group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
      `}</style>
    </div>
  );
}