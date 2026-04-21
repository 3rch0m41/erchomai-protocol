"use client";

import React, { useState, useMemo } from 'react';
import { Terminal } from 'lucide-react';
import SearchArea from '@/components/Logs/SearchArea';
import FilterBar from '@/components/Logs/FilterBar';
import LogCard from '@/components/Logs/LogCard';
import styles from './LogsPage.module.css';

export default function LogsClient({ initialLogs = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Logica conteggi basata sui dati reali di Sanity
  const categoryCounts = useMemo(() => {
    const counts = { ALL: initialLogs.length };
    ["SECURITY", "DATA", "UPLINK", "SYSTEM"].forEach(cat => {
      counts[cat] = initialLogs.filter(l => l.type === cat).length;
    });
    return counts;
  }, [initialLogs]);

  // Logica filtraggio: cerchiamo nel titolo e filtriamo per tipo
  const filteredLogs = useMemo(() => {
    return initialLogs.filter(log => {
      const title = log.title || "";
      const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === "ALL" || log.type === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter, initialLogs]);

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

          {/* Componenti modulari con i dati di stato */}
          <SearchArea query={searchQuery} setQuery={setSearchQuery} />

          <FilterBar 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter} 
            counts={categoryCounts} 
          />

          <div className={styles.embeddedLogsGrid}>
            {filteredLogs.length > 0 ? (
              filteredLogs.map(log => (
                <LogCard 
                  key={log._id} 
                  item={{
                    ...log,
                    // Mapping per compatibilità con il tuo LogCard.js
                    id: log._id,
                    label: log.title 
                  }} 
                />
              ))
            ) : (
              <div className={styles.noResults}>
                <p className="animate-pulse text-[#00f2fe] font-mono">
                  ERROR: NO_DATA_FOUND_IN_ARCHIVE
                </p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}