/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              // Consentiamo le connessioni necessarie (API e WebSocket)
              "connect-src *;", 
              // Permettiamo gli script dello Studio e le valutazioni dinamiche
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.sanity.io https://core.sanity-cdn.com;",
              // Stili e immagini (blob è fondamentale per i caricamenti nello Studio)
              "style-src 'self' 'unsafe-inline';",
              "img-src * data: blob:;",
              // Evita che il tuo sito venga caricato in iframe malevoli
              "frame-ancestors 'self';",
            ].join(' '),
          },
          // Impedisce al browser di indovinare il tipo di file (MIME-sniffing)
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Protegge la privacy dell'utente quando naviga verso l'esterno
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          }
        ],
      },
    ];
  },
};

export default nextConfig;