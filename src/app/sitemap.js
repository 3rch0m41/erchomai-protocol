import { client } from '@/sanity/lib/client';
import { getSiteUrl } from '@/lib/site';
import { LOG_TYPES_GROQ } from '@/lib/logTypes';

// Genera /sitemap.xml con le pagine fisse e tutti i log pubblicati.
// Si aggiorna al massimo ogni ora.
export const revalidate = 3600;

const SLUGS_QUERY = `*[ _type in ${LOG_TYPES_GROQ} && defined(slug.current) ] {
  "slug": slug.current,
  _updatedAt
}`;

export default async function sitemap() {
  const siteUrl = getSiteUrl();

  const staticPages = ['', '/logs', '/about', '/contact', '/privacy'].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path === '' || path === '/logs' ? 'weekly' : 'yearly',
    priority: path === '' ? 1 : 0.5,
  }));

  let logPages = [];
  try {
    const logs = await client.fetch(SLUGS_QUERY);
    logPages = logs.map((log) => ({
      url: `${siteUrl}/logs/${log.slug}`,
      lastModified: log._updatedAt,
      changeFrequency: 'monthly',
      priority: 0.8,
    }));
  } catch (error) {
    // Se Sanity non risponde, la sitemap contiene almeno le pagine fisse
    console.error('SITEMAP_ERROR:', error);
  }

  return [...staticPages, ...logPages];
}
