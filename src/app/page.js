"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Lock, Zap } from 'lucide-react';
import Navbar from '@/components/navbar'; // Assicurati che il percorso sia corretto

export default function HomePage() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#000212] text-white flex flex-col font-mono selection:bg-cyan-500/30 overflow-x-hidden relative">
      
      {/* --- BACKGROUND GRID --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* --- 1. NAVBAR (Componente Riutilizzabile) --- */}
      <Navbar />

      {/* --- 2. HERO ZONE --- */}
      <main className="flex-grow flex flex-col items-center justify-start relative z-10 px-10 md:px-40 pb-20">
        
        {/* Glow di sfondo soffuso */}
        <div className="absolute top-40 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full -z-10" />

        {/* --- MAIN RECTANGULAR BOX --- */}
        <div className="w-full max-w-[75%] min-h-[600px] mt-16 rounded-[48px] border border-white/10 bg-white/[0.02] backdrop-blur-md relative flex flex-col items-center justify-center p-16 shadow-[0_0_80px_rgba(0,0,0,0.6)]">
          
          {/* Decorazioni HUD angolari */}
          <div className="absolute top-10 left-14 flex items-center gap-2 text-[#00f2fe]/40 text-[10px] tracking-[0.4em] uppercase font-bold">
            <Zap className="w-3 h-3 animate-pulse" />
            <span>Core_Module_v4</span>
          </div>

          {/* SQUARE LOGO CONTAINER */}
          <div className="relative group mb-16">
            <div className="w-40 h-40 md:w-52 md:h-52 border border-[#00f2fe]/20 rounded-[32px] flex items-center justify-center bg-black/60 relative overflow-hidden transition-all duration-700 group-hover:border-[#00f2fe]/40 group-hover:shadow-[0_0_50px_rgba(0,242,254,0.1)]">
              
              {/* Effetto Laser Scan */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f2fe]/15 to-transparent h-1/2 w-full animate-[scan_3s_linear_infinite]" />
              
              {/* Logo Centrale con logica active tramite CSS globale */}
              <span className={`text-7xl md:text-9xl font-black italic select-none z-10 nav-link-custom ${pathname === '/' ? 'active' : ''}`}>
                ΣΠ
              </span>
            </div>
            
            {/* Corner brackets decorativi */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-[#00f2fe]/30" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-[#00f2fe]/30" />
          </div>

          {/* Testo Hero Principale */}
          <div className="text-center space-y-10 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.12em] text-white uppercase leading-tight">
              Security is not a <span className="italic font-light text-white/20 tracking-normal">destination</span>;<br />
              <span className="text-white font-bold tracking-[0.2em] drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                It is a state of arrival.
              </span>
            </h2>
          </div>

        </div>
      </main>

      {/* --- 3. FOOTER --- */}
      <footer className="px-20 py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-20 text-[9px] uppercase tracking-[0.6em] font-mono mt-auto">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3 text-cyan-500 font-bold">
            <Lock className="w-3 h-3" />
            <span>ENCRYPTED_SESSION</span>
          </div>
        </div>
        <span>© 2026 Erchomai_Repository</span>
      </footer>

      {/* --- ANIMAZIONI LOCALI --- */}
      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-120%); }
          100% { transform: translateY(220%); }
        }
      `}</style>
    </div>
  );
}