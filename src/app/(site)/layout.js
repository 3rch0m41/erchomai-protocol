// Layout del sito pubblico. La cartella (site) è un "route group":
// serve solo a organizzare i file e non compare negli URL.
// Titolo e descrizione di default sono nel layout radice.
import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="site-main">{children}</main>
      <Footer />
    </>
  );
}
