"use client";

import React, { useState, useMemo } from 'react';
import { Terminal } from 'lucide-react';
import SearchArea from '@/components/Logs/SearchArea';
import FilterBar from '@/components/Logs/FilterBar';
import LogCard from '@/components/Logs/LogCard';
import styles from './LogsPage.module.css';
import { getLogType, FILTER_CATEGORIES } from '@/lib/logTypes';

export default function LogsClient({ initialLogs = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Conteggi basati sul tipo mappato
  const categoryCounts = useMemo(() => {
    const counts = { ALL: initialLogs.length };
    FILTER_CATEGORIES.filter(c => c.id !== "ALL").map(c => c.id).forEach(cat => {
      counts[cat] = initialLogs.filter(l => getLogType(l._type) === cat).length;
    });
    return counts;
  }, [initialLogs]);

  // Filtraggio dinamico
  const filteredLogs = useMemo(() => {
    return initialLogs.filter(log => {
      const logType = getLogType(log._type);
      // La ricerca guarda titolo, estratto e tag (es. "SQLi", "Kerberoasting")
      const haystack = [log.title, log.excerpt, ...(log.tags || [])].join(' ').toLowerCase();
      const matchesSearch = haystack.includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === "ALL" || logType === activeFilter;
      
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
                    type: getLogType(log._type) // Tipo normalizzato (CTF, CODE, LAB)
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