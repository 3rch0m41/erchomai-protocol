const isDev = process.env.NODE_ENV === 'development';

// CSP del sito pubblico: le pagine non caricano risorse esterne, quindi si parte
// da 'self'. 'unsafe-inline' sugli script resta necessario perché Next.js inserisce
// script inline per l'idratazione (l'alternativa è la CSP con nonce, che però rende
// tutte le pagine dinamiche). 'unsafe-eval' serve solo in sviluppo.
const siteCsp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? ' ws: wss:' : ''}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

// CSP dello Studio Sanity: più permissiva perché lo Studio carica moduli da
// sanity-cdn, usa eval e parla con le API di Sanity. Resta dietro il login Sanity.
const studioCsp = [
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.sanity.io https://*.sanity-cdn.com",
  "style-src 'self' 'unsafe-inline'",
  'img-src * data: blob:',
  "font-src 'self' data: https://*.sanity-cdn.com",
  'connect-src *',
  "worker-src 'self' blob:",
  "frame-src 'self' https://*.sanity.io",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'self'",
].join('; ');

const commonHeaders = [
  // Impedisce al browser di indovinare il tipo di file (MIME-sniffing)
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Protegge la privacy dell'utente quando naviga verso l'esterno
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Forza HTTPS per due anni (anche sui sottodomini)
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), ' +          // Disabilita la fotocamera
      'microphone=(), ' +      // Disabilita il microfono
      'geolocation=(), ' +     // Disabilita la geolocalizzazione
      'browsing-topics=(), ' + // Disabilita il tracking dei Google Topics
      'interest-cohort=()',    // Disabilita FLoC
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Questi pacchetti girano solo lato server (Node) e non vanno inclusi nel bundle:
  // servono a impacchettare gli allegati eseguibili in uno zip protetto.
  serverExternalPackages: ['archiver7', 'archiver-zip-encrypted'],

  async headers() {
    // Se più regole impostano lo stesso header, vince l'ultima:
    // le regole dello Studio stanno dopo e sovrascrivono la CSP del sito.
    return [
      {
        source: '/(.*)',
        headers: [{ key: 'Content-Security-Policy', value: siteCsp }, ...commonHeaders],
      },
      {
        source: '/studio/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: studioCsp },
          // Lo Studio non deve finire nei motori di ricerca
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ];
  },
};

export default nextConfig;
