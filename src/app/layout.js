import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieLogic from '@/components/CookieLogic';
import './globals.css';

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