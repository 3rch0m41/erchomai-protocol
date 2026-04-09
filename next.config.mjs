/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    // Se siamo in sviluppo, restituiamo un array vuoto (nessun blocco)
    if (process.env.NODE_ENV === 'development') {
      return [];
    }

    // In produzione, applichiamo la sicurezza
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; connect-src 'self' https://*.sanity.io wss://*.sanity.io https://*.sanity.cdn.com https://registry.npmjs.org; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://core.sanity-cdn.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://cdn.sanity.io; frame-ancestors 'self';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;