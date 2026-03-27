"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Logs', path: '/logs' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="flex items-center py-10 bg-black/60 backdrop-blur-xl sticky top-0 z-50">
      <div className="pl-20 flex-shrink-0">
        <Link href="/" className="flex items-center gap-4 group cursor-pointer">
          <span className={`text-3xl font-black italic nav-link-custom ${pathname === '/' ? 'active' : ''}`}>
            ΣΠ
          </span>
          <h1 className="text-xl font-bold tracking-tight text-white/90 uppercase">ERCHOMAI</h1>
        </Link>
      </div>
      
      <div className="flex flex-grow justify-end">
        <ul className="list-none flex items-center gap-x-[100px] text-[10px] md:text-[11px] uppercase tracking-[0.5em] font-black p-0 m-0 mr-[100px]">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                href={link.path} 
                className={`nav-link-custom ${pathname === link.path ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;