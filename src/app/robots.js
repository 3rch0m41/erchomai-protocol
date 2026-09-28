import { getSiteUrl } from '@/lib/site';

// Crawler che raccolgono dati per ADDESTRARE modelli AI: bloccati,
// così i contenuti del sito non finiscono nei dataset di training.
// (I crawler di RICERCA AI — es. OAI-SearchBot, Claude-SearchBot,
// PerplexityBot — restano ammessi dalla regola generale sotto, così
// il sito può essere citato nelle risposte AI e portare lettori.)
const AI_TRAINING_BOTS = [
  'GPTBot', // OpenAI - training
  'ClaudeBot', // Anthropic - training
  'Google-Extended', // Google - training Gemini (non tocca Google Search)
  'CCBot', // Common Crawl - dataset usato da molti modelli
  'anthropic-ai', // vecchio user-agent Anthropic (per sicurezza)
  'Applebot-Extended', // Apple - opt-out training
  'meta-externalagent', // Meta - training
  'FacebookBot', // Meta - training
  'Bytespider', // ByteDance/TikTok - training
  'Amazonbot', // Amazon - training
  'Diffbot',
  'Omgili',
  'img2dataset',
  'PerplexityBot-Train', // eventuale crawler di training (la ricerca resta ammessa)
];

// Genera /robots.txt.
export default function robots() {
  const siteUrl = getSiteUrl();
  return {
    rules: [
      // Tutti gli altri bot (Google, Bing, crawler di ricerca AI): sito sì, Studio e API no
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/api/'],
      },
      // Crawler di addestramento AI: nessun accesso
      {
        userAgent: AI_TRAINING_BOTS,
        disallow: '/',
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
