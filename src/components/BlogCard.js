"use client";

import React from 'react';
import Link from 'next/link';
import { Calendar, Tag, Terminal } from 'lucide-react';

const BlogCard = ({ title, date, category, excerpt, slug }) => {
  return (
    <div className="group relative flex-shrink-0 w-[300px] md:w-[350px] aspect-square bg-white/[0.02] border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:border-[#00f2fe]/40 hover:bg-[#00f2fe]/5 snap-center overflow-hidden">
      
      {/* Background Decorativo HUD */}
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
        <Terminal className="w-20 h-20 text-[#00f2fe]" />
      </div>

      <div className="flex flex-col h-full relative z-10">
        {/* Meta info */}
        <div className="flex justify-between items-center text-[9px] uppercase tracking-[0.3em] font-bold mb-6">
          <span className="text-[#00f2fe] flex items-center gap-2">
            <Tag className="w-3 h-3" /> {category}
          </span>
          <span className="text-white/30">{date}</span>
        </div>

        {/* Titolo più grande per formato quadrato */}
        <h3 className="text-2xl font-black text-white leading-tight mb-4 group-hover:text-[#00f2fe] transition-colors">
          {title}
        </h3>

        {/* Excerpt con limite righe */}
        <p className="text-sm text-white/40 leading-relaxed italic line-clamp-3 mb-6">
          {`"${excerpt}"`}
        </p>

        {/* Link stile tasto terminale */}
        <div className="mt-auto">
          <Link 
            href={`/logs/${slug}`}
            className="inline-block w-full py-3 border border-white/10 text-center text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:bg-white hover:text-black"
          >
            Open_Log
          </Link>
        </div>
      </div>

      {/* Glow corner decor */}
      <div className="absolute top-0 left-0 w-12 h-[1px] bg-gradient-to-r from-[#00f2fe]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 left-0 w-[1px] h-12 bg-gradient-to-b from-[#00f2fe]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default BlogCard;