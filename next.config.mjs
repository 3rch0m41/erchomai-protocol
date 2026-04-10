/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // 1. CONTENT SECURITY POLICY
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self';",
              // connect-src: Added wss: for Sanity Real-time and telemetry
              "connect-src 'self' https://*.sanity.io wss://*.sanity.io https://*.sanity.cdn.com https://registry.npmjs.org https://telemetry.sanity.io;",
              // script-src: 'unsafe-eval' is mandatory for Sanity Studio's dynamic runtime
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://core.sanity-cdn.com;",
              "style-src 'self' 'unsafe-inline';",
              "img-src 'self' data: blob: https://cdn.sanity.io;",
              "font-src 'self' data:;",
              "frame-src 'self' https://core.sanity-cdn.com https://*.sanity.io;",
              "frame-ancestors 'self';",
              "upgrade-insecure-requests;",
            ].join(' '),
          },
          // 2. X-CONTENT-TYPE-OPTIONS
          // Prevents the browser from sniffing the MIME type
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // 3. REFERRER-POLICY
          // Sends the origin but hides the specific path when navigating away
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // 4. PERMISSIONS-POLICY
          // Disables invasive browser features (Camera, Mic, Geolocation)
          // unless explicitly needed.
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // 5. X-FRAME-OPTIONS
          // Modern backup for frame-ancestors
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          }
        ],
      },
    ];
  },
};

export default nextConfig;
