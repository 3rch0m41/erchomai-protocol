// La pagina contatti è un componente client e non può esportare metadati:
// li definiamo in questo layout, che per il resto non aggiunge nulla.
export const metadata = {
  title: 'Contact',
  description: 'Contatta ERCHOMAI PROTOCOL tramite il modulo di contatto.',
};

export default function ContactLayout({ children }) {
  return children;
}
