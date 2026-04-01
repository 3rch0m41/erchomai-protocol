"use client";

import React, { useState, useMemo } from 'react';
import { Terminal } from 'lucide-react';
import Navbar from '@/components/Navbar';

// Import dei nuovi componenti modulari
import SearchArea from '@/components/Logs/SearchArea';
import FilterBar from '@/components/Logs/FilterBar';
import LogCard from '@/components/Logs/LogCard';

import styles from './LogsPage.module.css';
import { LOG_ENTRIES } from '@/data/mockLogs'; // Opzionale: sposta i dati in un file separato

export default function LogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Logica conteggi
  const categoryCounts = useMemo(() => {
    const counts = { ALL: LOG_ENTRIES.length };
    ["SECURITY", "DATA", "UPLINK", "SYSTEM"].forEach(cat => {
      counts[cat] = LOG_ENTRIES.filter(l => l.type === cat).length;
    });
    return counts;
  }, []);

  // Logica filtraggio
  const filteredLogs = useMemo(() => {
    return LOG_ENTRIES.filter(log => {
      const matchesSearch = log.label.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === "ALL" || log.type === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContent}>
        <div className={styles.heroGrid}>
          
          <div className={styles.title}>
            <h1 className={styles.neonTitle}>REPOSITORY_DATA</h1>
            <div className="flex items-center gap-2 text-[#00f2fe] font-bold uppercase tracking-widest opacity-70 mt-1">
              <Terminal size={16} />
              <span className="text-[14pt]">System_Archive</span>
            </div>
          </div>

          <SearchArea query={searchQuery} setQuery={setSearchQuery} />

          <FilterBar 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter} 
            counts={categoryCounts} 
          />

          <div className={styles.embeddedLogsGrid}>
            {filteredLogs.length > 0 ? (
              filteredLogs.map(log => <LogCard key={log.id} item={log} />)
            ) : (
              <div className={styles.noResults}>
                <p className="animate-pulse">ERROR: NO_DATA_FOUND</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}