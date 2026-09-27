"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Logs', path: '/logs' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

export default function Navbar() {
  const pathname = usePathname();
  // Menu a tendina per schermi sotto i 1024px (breakpoint "lg" di Tailwind)
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className="flex items-center py-4 lg:py-10 bg-black/60 backdrop-blur-xl sticky top-0 z-50"
      onKeyDown={(e) => { if (e.key === 'Escape') closeMenu(); }}
    >
      <div className="pl-5 lg:pl-20 flex-shrink-0">
        <Link href="/" onClick={closeMenu} className="flex items-center gap-4 group cursor-pointer no-underline">
          <span
            className={`text-3xl font-black italic nav-link-custom ${pathname === '/' ? 'active-page' : ''}`}
          >
            ΣΠ
          </span>
          {/* Testo del logo: non è un <h1>, il titolo principale sta in ogni pagina */}
          <span className="text-xl font-bold tracking-tight text-white/90 uppercase">ERCHOMAI</span>
        </Link>
      </div>

      {/* DESKTOP (da 1024px): link in riga, come prima */}
      <div className="hidden lg:flex flex-grow justify-end">
        <ul className="list-none flex items-center gap-x-[100px] text-[10px] md:text-[11px] uppercase tracking-[0.5em] font-black p-0 m-0 mr-[100px]">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`nav-link-custom ${pathname === link.path ? 'active-page' : ''}`}
                aria-current={pathname === link.path ? 'page' : undefined}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* MOBILE E TABLET: pulsante che apre/chiude il menu */}
      <button
        type="button"
        className="lg:hidden ml-auto mr-3 p-2 bg-transparent border-0 text-white cursor-pointer"
        aria-label={menuOpen ? 'Chiudi il menu' : 'Apri il menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {menuOpen && (
        <ul
          id="mobile-menu"
          className="lg:hidden absolute top-full left-0 right-0 list-none m-0 px-5 py-2 flex flex-col bg-black/95 backdrop-blur-xl border-t border-b border-[#00f2fe]/15 text-sm uppercase tracking-[0.4em] font-black"
        >
          {links.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                onClick={closeMenu}
                className={`nav-link-custom block py-4 ${pathname === link.path ? 'active-page' : ''}`}
                aria-current={pathname === link.path ? 'page' : undefined}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
