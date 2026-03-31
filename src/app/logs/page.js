"use client";

import React, { useState } from 'react';
import { Search, Terminal, Shield, HardDrive, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import styles from './LogsPage.module.css'; // Carichiamo il CSS locale

const LOG_ENTRIES = [
  { id: '001', label: 'KERNEL_LOG', icon: Shield, status: 'SECURE', ref: 'X92-TR', sector: '04' },
  { id: '002', label: 'DATA_STREAM', icon: HardDrive, status: 'SYNC', ref: 'B14-MK', sector: '05' },
  { id: '003', label: 'UPLINK_NODE', icon: Share2, status: 'ACTIVE', ref: 'L09-QV', sector: '06' }
];

export default function LogsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <main className={styles.mainContent}>
        
        {/* --- HEADER / HERO --- */}
        <div className={styles.heroGrid}>
          {/* Effetto Scanline retro */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20" />

          <h1 className={styles.title}>REPOSITORY_DATA</h1>

          {/* Sottotitolo */}
          <div className="col-start-2 col-span-12 z-20 flex items-center gap-4 text-[#00f2fe] font-bold uppercase tracking-[0.1em] pt-2">
            <Terminal size={24} />
            <span className="text-[20pt]">System_Archive</span>
          </div>

          {/* Search Bar Sezione */}
          <div className={styles.searchArea}>
            <div className={styles.searchBar}>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH_DATA..." 
                className={styles.searchInput}
              />
              <div className={styles.searchIcon}>
                <Search size={20} strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>

        {/* --- CARDS GRID --- */}
        <div className={styles.logsGrid}>
          {LOG_ENTRIES.map((item) => (
            <div key={item.id} className="group relative bg-white/[0.02] border border-white/5 rounded-[24px] p-8 hover:bg-[#42cbd1]/5 hover:border-[#42cbd1]/30 transition-all duration-500 cursor-pointer">
              <div className="flex justify-between items-start mb-12">
                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#42cbd1]/10 transition-colors">
                  <item.icon size={22} className="text-white group-hover:text-[#42cbd1]" />
                </div>
                <span className="text-[6pt] tracking-[0.3em] font-bold text-[#42cbd1] bg-[#42cbd1]/10 px-2 py-1 rounded italic uppercase">
                  {item.status}
                </span>
              </div>
              <h3 className="text-[14pt] font-black tracking-[0.2em] mb-2 italic uppercase text-white">
                {item.label}_{item.id}
              </h3>
              <div className="h-1 w-12 bg-white/10 group-hover:w-full group-hover:bg-[#42cbd1]/40 transition-all duration-700 mb-4" />
              <p className="text-[7pt] tracking-[0.1em] opacity-40 leading-relaxed uppercase">
                Index_Ref: {item.ref} | Sector: {item.sector}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}