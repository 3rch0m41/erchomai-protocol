"use client";

import React, { useState } from 'react';
import { Search, Terminal, Lock, Hash } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function LogsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const logs = [
    { id: "001", title: "Zero-Day Protocol", status: "Encrypted", category: "Security", date: "2026.03.12", desc: "Prevents anonymous attacks and implements proactive defense systems." },
    { id: "002", title: "Quantum Encryption v4", status: "Verified", category: "Research", date: "2026.03.12", desc: "Post-quantum cryptography protocols and network stabilization." },
    { id: "003", title: "Neural Link Latency", status: "Classified", category: "Hardware", date: "2026.03.11", desc: "Stabilization of bidirectional data stream for neural interfaces." },
    { id: "004", title: "AI Ethics Bypass", status: "Encrypted", category: "Software", date: "2026.03.10", desc: "Analysis of AI ethical bypass scenarios in controlled environments." },
    { id: "005", title: "Satellite Uplink Hijack", status: "Warning", category: "Network", date: "2026.03.09", desc: "Unauthorized access detected in peripheral orbital nodes." },
    { id: "006", title: "Deep Web Crawling", status: "Encrypted", category: "Data_Mining", date: "2026.03.08", desc: "Indexing of unlisted onion sites for threat intelligence gathering." },
  ];

  return (
    <div className="min-h-screen bg-[#000212] text-white flex flex-col font-mono selection:bg-cyan-500/30 overflow-x-hidden relative">
      {/* BACKGROUND GRID */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <Navbar />

      <main className="relative z-10 w-full flex flex-col items-center pt-32 pb-40 px-6">
        
        {/* --- IL RETTANGOLO HEADER (75% WIDTH) --- */}
        <div className="w-full max-w-[85%] md:max-w-[75%] bg-white/[0.02] border border-[#00f2fe]/20 rounded-[48px] p-10 md:p-16 backdrop-blur-xl mb-24 flex flex-col md:flex-row justify-between items-start md:items-center gap-12 shadow-[0_0_100px_rgba(0,0,0,0.8)] relative overflow-hidden">
          
          {/* Effetto luce interna al rettangolo */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f2fe]/20 to-transparent" />

          {/* GRUPPO TITOLO (SINISTRA) */}
          <div className="relative z-10">
            {/* REPOSITORY_DATA con alone blu elettrico */}
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_25px_rgba(0,242,254,0.8)] mb-4">
              REPOSITORY<span className="text-[#00f2fe]">_DATA</span>
            </h1>
            
            {/* SYSTEM_ARCHIVE / LOGS in blu elettrico */}
            <div className="flex items-center gap-3 text-[#00f2fe] text-[11px] md:text-[13px] tracking-[0.5em] font-bold uppercase">
              <Terminal size={18} className="drop-shadow-[0_0_10px_rgba(0,242,254,0.5)]" />
              <span className="drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]">System_Archive / Logs</span>
            </div>
          </div>

          {/* BARRA DI RICERCA (DESTRA) */}
          <div className="relative w-full md:w-[400px] group">
            <input 
              type="text" 
              placeholder="SEARCH_DATABASE..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-[#00f2fe]/40 rounded-2xl py-5 px-6 pl-16 text-[11px] tracking-[0.3em] uppercase text-[#00f2fe] placeholder:text-[#00f2fe]/30 outline-none focus:border-[#00f2fe] focus:shadow-[0_0_30px_rgba(0,242,254,0.2)] transition-all duration-300"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#00f2fe]" size={20} />
          </div>
        </div>

        {/* --- GRID DEI LOGS --- */}
        <div className="w-full max-w-[85%] md:max-w-[75%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {logs.map((log) => (
            <Link key={log.id} href={`/logs/${log.id}`} className="group relative">
              <div className="h-full bg-white/[0.02] border border-white/5 rounded-[32px] p-10 flex flex-col justify-between transition-all duration-500 hover:border-[#00f2fe]/40 hover:bg-[#00f2fe]/5 hover:shadow-[0_0_50px_rgba(0,242,254,0.1)] group-hover:-translate-y-2">
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold tracking-widest uppercase border border-white/20 px-2 py-1 rounded">
                      ID: {log.id}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">{log.status}</span>
                  </div>

                  <h3 className="text-2xl font-bold uppercase tracking-widest leading-tight group-hover:text-[#00f2fe] transition-colors">
                    {log.title}
                  </h3>
                  
                  <p className="text-[12px] text-white/30 leading-relaxed uppercase line-clamp-3 group-hover:text-white/50 transition-colors">
                    {log.desc}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-white/5 mt-10">
                  <div className="flex items-center gap-2 text-[10px] text-[#00f2fe]/60 font-bold uppercase">
                    <Hash size={14} />
                    {log.category}
                  </div>
                  <span className="text-[10px] text-white/20 font-bold tracking-tighter italic">{log.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </main>

      <footer className="py-12 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-8 opacity-20 text-[10px] uppercase tracking-[0.6em] mt-auto">
        <div className="flex items-center gap-3 text-[#00f2fe] font-bold">
          <Lock size={14} />
          <span>ENCRYPTED_SESSION</span>
        </div>
        <span>© 2026 Erchomai_Repository</span>
      </footer>
    </div>
  );
}