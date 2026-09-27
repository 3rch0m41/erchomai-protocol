import { getSiteUrl } from '@/lib/site';

// Genera /robots.txt: i motori di ricerca possono leggere il sito,
// ma non lo Studio né l'API.
export default function robots() {
  const siteUrl = getSiteUrl();
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
