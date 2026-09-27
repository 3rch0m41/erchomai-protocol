// Indirizzo pubblico del sito, usato per sitemap, robots.txt e anteprime dei link.
// Ordine di priorità:
//   1. NEXT_PUBLIC_SITE_URL (da impostare quando avrai un dominio, es. https://tuodominio.it)
//   2. l'indirizzo di produzione che Vercel fornisce in automatico (...vercel.app)
//   3. localhost, in sviluppo
export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return 'http://localhost:3000';
}

export const SITE_NAME = 'ERCHOMAI PROTOCOL';
export const SITE_DESCRIPTION =
  "ERCHOMAI PROTOCOL - Un viaggio attraverso la sicurezza informatica e l'innovazione tecnologica. Esplora le nostre analisi, ricerche e approfondimenti su minacce emergenti, tecnologie di difesa e tendenze del settore.";
