// Layout dello Studio: niente Navbar, Footer o CSS del sito.
// <html> e <body> arrivano dal layout radice.
export const metadata = {
  title: 'Sanity Studio',
};

export default function StudioLayout({ children }) {
  return children;
}
