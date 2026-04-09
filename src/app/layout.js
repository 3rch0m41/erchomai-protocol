'use client' // Importante se usi usePathname

import { usePathname } from 'next/navigation'
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function RootLayout({ children }) {
  const pathname = usePathname()
  
  // Controlliamo se la rotta attuale inizia con /studio
  const isStudio = pathname?.startsWith('/studio')

  // Se siamo nello studio, restituiamo una versione "nuda" del layout
  if (isStudio) {
    return (
      <html lang="it">
        <body style={{ margin: 0, padding: 0 }}>
          {children}
        </body>
      </html>
    )
  }

  // Altrimenti, restituiamo il sito normale con Navbar e Footer
  return (
    <html lang="it">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}