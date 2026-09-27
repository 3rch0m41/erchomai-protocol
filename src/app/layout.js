// Layout radice: condiviso da sito e Studio, contiene solo <html> e <body>.
// Navbar, Footer e stili globali del sito stanno in (site)/layout.js.
// Le pagine possono sovrascrivere questi metadati.
import { getSiteUrl, SITE_NAME, SITE_DESCRIPTION } from '@/lib/site';

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  // Le pagine indicano solo il proprio titolo, es. "About" → "About | ERCHOMAI PROTOCOL"
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
