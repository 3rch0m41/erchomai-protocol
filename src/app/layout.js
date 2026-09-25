// Layout radice: condiviso da sito e Studio, contiene solo <html> e <body>.
// Navbar, Footer e stili globali del sito stanno in (site)/layout.js.
// Le pagine possono sovrascrivere questi metadati (lo Studio lo fa già).
export const metadata = {
  title: 'ERCHOMAI PROTOCOL',
  description:
    "ERCHOMAI PROTOCOL - Un viaggio attraverso la sicurezza informatica e l'innovazione tecnologica. Esplora le nostre analisi, ricerche e approfondimenti su minacce emergenti, tecnologie di difesa e tendenze del settore.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
