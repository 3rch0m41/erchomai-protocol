"use client";

import React, { useState } from 'react';
import { Search, Terminal, Activity } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function LogsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const neonGlowStyle = {
    textShadow: `0 0 10px rgba(0, 242, 254, 0.8), 0 0 20px rgba(0, 242, 254, 0.4)`,
  };

  return (
    <div className="min-h-screen bg-[#000212] text-white flex flex-col font-mono selection:bg-blue-500/30 overflow-x-hidden relative">
      <Navbar />

      <main className="relative z-10 w-full flex flex-col items-center pt-20 pb-40 px-4">
        
        {/* --- HERO CONTAINER (GRID 24 COLONNE) --- */}
        <div className="w-full max-w-[95%] md:max-w-[90%] min-h-[35vh] bg-black/40 border-2 border-[#00f2fe]/20 rounded-[32px] shadow-[0_0_80px_rgba(0,242,254,0.05)] relative overflow-hidden grid grid-cols-[repeat(24,1fr)] p-8 md:p-12 items-start">
          
          {/* Scanlines Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] pointer-events-none opacity-10" />

          {/* 1. TITOLO GIGANTE (Riga Superiore) */}
          <div className="col-start-2 col-span-22 z-20"> 
            <h1 
              style={neonGlowStyle}
              className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tighter text-white italic leading-[0.5]"
            >
              REPOSITORY_DATA
            </h1>
          </div>

          {/* --- BLOCCO INFERIORE (Spostato su di "una riga intera") --- */}
          {/* md:-mt-20 e lg:-mt-28 annullano il vuoto del font gigante */}
          
          {/* SYSTEM ARCHIVE (Sinistra) */}
          <div className="col-start-2 col-span-10 z-20 flex items-center gap-4 text-[#00f2fe] text-sm md:text-xl font-bold uppercase tracking-[0.2em] opacity-80 mt-2 md:-mt-20 lg:-mt-28">
            <Terminal size={24} className="text-blue-500" />
            <span>System_Archive</span>
          </div>

          {/* SEARCH BAR (Destra) */}
          <div className="col-start-16 col-span-8 z-30 flex flex-col items-end mt-2 md:-mt-20 lg:-mt-28">
            
            {/* DECORAZIONE SOPRA */}
            <div className="w-full max-w-[340px] h-1 mb-3 bg-blue-500/10 border-r-4 border-blue-500 opacity-40" />

            {/* SEARCH BAR PILL */}
            <div className="relative w-full max-w-[340px] group">
              <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
              
              <div className="relative flex items-center bg-black/95 border border-blue-500/30 rounded-full px-6 py-2.5 transition-all duration-300 group-hover:border-blue-500/60 group-focus-within:border-blue-500 shadow-2xl">
                
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH_DATABASE" 
                  className="w-full bg-transparent text-xs tracking-[0.25em] uppercase text-white placeholder:text-blue-500/20 outline-none font-bold"
                />

                <div className="flex items-center pl-3 border-l border-white/10">
                  <Search size={18} className="text-blue-500" />
                </div>
              </div>
            </div>

            {/* STATUS SOTTO */}
            <div className="mt-2 flex items-center gap-3 px-4 opacity-40 text-right">
              <div className="flex flex-col items-end leading-none">
                <span className="text-[7px] tracking-[0.4em] font-black uppercase italic mb-1">Scan_Ready</span>
                <span className="text-[6px] tracking-[0.2em] uppercase opacity-50">Link_Stable</span>
              </div>
              <Activity size={12} className="text-blue-500 animate-pulse" />
            </div>
          </div>

        </div>

        {/* --- GRID RISULTATI --- */}
        <div className="w-full max-w-[90%] mt-20 opacity-20">
             <div className="h-px bg-white/10" />
        </div>

      </main>
    </div>
  );
}