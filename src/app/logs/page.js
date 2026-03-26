"use client";

import React from 'react';
import Link from 'next/link';

export default function LogsPage() {
  // Esempio di dati (che poi prenderemo da Sanity)
  const dummyLogs = [
    { id: 1, title: "Protocol_Update_v4.0", date: "2026-03-24", status: "STABLE" },
    { id: 2, title: "Network_Breach_Simulation", date: "2026-03-22", status: "ENCRYPTED" },
    { id: 3, title: "Auth_Module_Refactor", date: "2026-03-15", status: "ARCHIVED" },
  ];

  return (
    <div className="min-h-screen bg-[#000212] text-white flex flex-col font-sans">
      
      {/* --- NAVBAR (Copiata da Home per coerenza) --- */}
      <nav className="flex justify-between items-center px-10 md:px-20 py-10 border-b border-white/5 bg-black/60 backdrop-blur-xl sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-4 group flex-shrink-0">
          <span className="text-3xl font-black italic text-white group-hover:text-[#00f2fe] transition-all">ΣΠ</span>
          <div className="flex flex-col uppercase tracking-tighter leading-none">
            <h1 className="text-xl font-bold text-white/90">ERCHOMAI</h1>
          </div>
        </Link>

        <div className="flex items-center justify-end flex-grow">
          <ul className="flex items-center gap-x-12 lg:gap-x-24 text-[10px] md:text-[11px] uppercase tracking-[0.5em] font-black">
            <li><Link href="/" className="text-white hover:text-[#00f2fe]">Home</Link></li>
            <li><Link href="/logs" className="text-[#00f2fe] drop-shadow-[0_0_8px_rgba(0,242,254,0.6)]">Logs</Link></li>
            <li><Link href="/about" className="text-white hover:text-[#00f2fe]">About</Link></li>
            <li><Link href="/contact" className="text-white hover:text-[#00f2fe]">Contact</Link></li>
          </ul>
        </div>
      </nav>

      {/* --- CONTENT AREA --- */}
      <main className="flex-grow p-10 md:p-20 max-w-5xl mx-auto w-full">
        <h2 className="text-[10px] tracking-[1em] text-cyan-800 uppercase mb-12 font-mono">
          System_Archives // Logs
        </h2>

        <div className="space-y-6">
          {dummyLogs.map((log) => (
            <div key={log.id} className="group border border-white/5 p-6 hover:bg-white/[0.02] transition-all flex justify-between items-center cursor-pointer">
              <div className="flex flex-col gap-2">
                <span className="text-[9px] text-white/30 font-mono">{log.date}</span>
                <h3 className="text-lg font-light tracking-widest uppercase group-hover:text-[#00f2fe] transition-colors">
                  {log.title}
                </h3>
              </div>
              <span className="text-[9px] border border-cyan-900/50 px-3 py-1 text-cyan-700 font-bold tracking-widest">
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}