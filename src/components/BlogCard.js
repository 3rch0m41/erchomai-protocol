import React from 'react';
import Link from 'next/link';

export default function BlogCard({ title, excerpt, slug }) {
  return (
    <Link href={`/logs/${slug}`} className="group block h-full">
      {/* Ridotto min-h da 140px a 100px e p-6 a p-4 */}
      <div className="relative h-full min-h-[100px] flex flex-col justify-center p-4 rounded-[15px] border border-[#00f2fe]/30 bg-[#00f2fe]/5 backdrop-blur-sm transition-all duration-500 hover:border-[#00f2fe] hover:bg-[#00f2fe]/10 overflow-hidden shadow-[0_0_15px_rgba(0,242,254,0.05)]">
        
        {/* Content - Centrato e compatto */}
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="text-[12px] md:text-sm font-bold text-[#00f2fe] leading-tight uppercase line-clamp-2 group-hover:scale-105 transition-transform duration-300">
            {title}
          </h3>
          <p className="text-[9px] text-[#00f2fe]/60 line-clamp-1 italic mt-1 font-light leading-none">
            {excerpt}
          </p>
        </div>

        {/* Decorative Line - Più sottile e vicina */}
        <div className="h-[1px] w-12 bg-[#00f2fe]/20 mx-auto mt-3" />
      </div>
    </Link>
  );
}