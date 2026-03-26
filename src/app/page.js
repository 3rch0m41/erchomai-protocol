"use client";

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      
      {/* --- HUD NAVIGATION BAR --- */}
      <nav className="flex justify-between items-center px-10 md:px-20 py-10 border-b border-white/5 bg-black/60 backdrop-blur-xl sticky top-0 z-50">
        
        {/* LOGO (LEFT) */}
        <Link href="/" className="flex items-center gap-4 group cursor-pointer flex-shrink-0">
          <span className="text-3xl font-black italic text-[#00f2fe] drop-shadow-[0_0_10px_rgba(0,242,254,0.8)]">
            ΣΠ
          </span>
          <div className="flex flex-col uppercase tracking-tighter leading-none">
            <h1 className="text-xl font-bold tracking-tight text-white/90">ERCHOMAI</h1>
            <span className="text-[9px] tracking-[0.4em] text-cyan-800 font-bold uppercase font-mono">Protocol_v4</span>
          </div>
        </Link>

        {/* RIGHT SIDE: LABELS (WIDE SPACING) */}
        <div className="flex items-center justify-end flex-grow">
          <ul className="flex items-center gap-x-12 lg:gap-x-24 text-[10px] md:text-[11px] uppercase tracking-[0.5em] font-black whitespace-nowrap">
            <li>
              <Link href="/" className="text-[#00f2fe] drop-shadow-[0_0_8px_rgba(0,242,254,0.6)] hover:text-white transition-all">
                Home
              </Link>
            </li>
            <li>
              <Link href="/logs" className="text-white hover:text-[#00f2fe] transition-all">
                Logs
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-white hover:text-[#00f2fe] transition-all">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-white hover:text-[#00f2fe] transition-all">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* --- HERO AREA (MINIMAL) --- */}
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl h-64 border border-cyan-500/10 bg-cyan-500/[0.02] rounded-sm flex items-center justify-center relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-700">
           {/* Decorator Brackets */}
           <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-cyan-500/40" />
           <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-cyan-500/40" />
           
           <span className="text-cyan-500/20 font-mono text-[10px] tracking-[1.5em] uppercase italic animate-pulse">
             System_Ready
           </span>
        </div>
      </main>

    </div>
  );
}