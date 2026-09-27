import React from 'react';
import Link from 'next/link';

export default function BlogCard({ title, excerpt, slug }) {
  // Se lo slug non esiste (magari è una bozza), puntiamo a una rotta di fallback
  const href = slug ? `/logs/${slug}` : '#';

  return (
    /* L'URL viene generato dinamicamente dallo slug di Sanity */
    <Link href={href} className="group block h-full no-underline">
      <div className="relative h-full min-h-[100px] flex flex-col justify-center p-4 rounded-[15px] border border-[#00f2fe]/30 bg-[#00f2fe]/5 backdrop-blur-sm transition-all duration-500 hover:border-[#00f2fe] hover:bg-[#00f2fe]/10 overflow-hidden shadow-[0_0_15px_rgba(0,242,254,0.05)]">
        
        {/* Content - Visualizza i dati provenienti da Sanity */}
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="text-[12px] md:text-sm font-bold text-[#00f2fe] leading-tight uppercase line-clamp-2 group-hover:scale-105 transition-transform duration-300 no-underline">
            {title || "ENCRYPTED_LOG"}
          </h3>
          
          <p className="text-[9px] text-[#00f2fe]/60 line-clamp-1 italic mt-1 font-light leading-none">
            {excerpt || "NO_DATA_EXTRACTED..."}
          </p>
        </div>

        {/* Decorative Line */}
        <div className="h-[1px] w-12 bg-[#00f2fe]/20 mx-auto mt-3" />
      </div>
    </Link>
  );
}