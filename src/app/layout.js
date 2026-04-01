import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieLogic from '@/components/CookieLogic';
import './globals.css';

export const metadata = {
  title: {
    default: 'ERCHOMAI_PROTOCOL',
    template: '%s | ERCHOMAI_PROTOCOL', // Il %s verrà sostituito dal titolo della pagina
  },
  description: 'Cyber security and data privacy portfolio',
  icons: {
    icon: '/favicon.ico', // Assicurati di avere un'icona nella cartella public
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <Navbar />
        {children}
        <Footer />
        <CookieLogic />
      </body>
    </html>
  );
}