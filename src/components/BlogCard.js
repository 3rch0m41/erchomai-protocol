import React from 'react';
import Link from 'next/link';

export default function BlogCard({ title, excerpt, slug }) {
  return (
    <Link href={`/logs/${slug}`} className="group block h-full">
      {/* Altezza ridotta a 120px e padding minimo */}
      <div className="relative h-full min-h-[120px] flex flex-col justify-between p-4 rounded-[20px] border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-[#00f2fe]/40 hover:bg-[#00f2fe]/5 overflow-hidden shadow-sm">
        
        {/* Header minimale */}
        <div className="flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-[#00f2fe]" />
            <span className="text-[6px] font-mono tracking-[0.2em] uppercase text-white">Log_Data</span>
          </div>
          <span className="text-[6px] font-mono text-white/40 uppercase tracking-tighter italic font-bold">SEC_04</span>
        </div>

        {/* Content compattato */}
        <div className="flex-grow flex flex-col justify-center">
          <h3 className="text-[11px] md:text-xs font-bold text-white leading-tight group-hover:text-[#00f2fe] transition-colors uppercase tracking-tighter line-clamp-1">
            {title}
          </h3>
          <p className="text-[9px] text-white/20 leading-tight line-clamp-1 mt-1 font-light italic">
            {excerpt}
          </p>
        </div>

        {/* Decorazione inferiore sottilissima */}
        <div className="h-[1px] w-full bg-white/5 rounded-full overflow-hidden mt-2">
          <div className="h-full w-0 bg-[#00f2fe] group-hover:w-full transition-all duration-700 ease-out" />
        </div>
      </div>
    </Link>
  );
}