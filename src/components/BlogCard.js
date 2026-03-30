import React from 'react';
import Link from 'next/link';
import { Terminal } from 'lucide-react';

export default function BlogCard({ title, excerpt, slug }) {
  return (
    <div className="w-[300px] aspect-[4/5] rounded-[32px] border-2 border-[#00f2fe] bg-black/40 backdrop-blur-md p-8 flex flex-col items-center text-center transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,242,254,0.3)] hover:-translate-y-2 group relative">
      
      <div className="w-12 h-12 rounded-xl bg-[#00f2fe]/10 border border-[#00f2fe]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Terminal className="w-6 h-6 text-[#00f2fe]" />
      </div>

      <div className="flex-grow flex flex-col justify-center items-center space-y-4">
        <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest leading-tight text-white">
          {title}
        </h3>
        <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-tight">
          {excerpt}
        </p>
      </div>

      <Link 
        href={`/logs/${slug}`} 
        className="mt-6 text-[9px] font-black uppercase tracking-[0.4em] text-[#00f2fe] border-b border-[#00f2fe]/30 pb-1 hover:brightness-125 transition-all"
      >
        Open_File [+]
      </Link>
    </div>
  );
}