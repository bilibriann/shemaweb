import type { NextConfig } from 'next';

// DEPLOY_TARGET=hostinger → servidor Node.js (Hostinger)
// DEPLOY_TARGET no definido o cualquier otro valor → export estático (GitHub Pages)
const esHostinger = process.env.DEPLOY_TARGET === 'hostinger';

// En GitHub Pages el sitio vive en /nombre-del-repo — en Hostinger va en raíz
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const configuracion: NextConfig = {
  output: esHostinger ? undefined : 'export',
  trailingSlash: true,
  basePath,

  images: {
    unoptimized: !esHostinger,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Headers de seguridad — solo aplican en servidor Node.js (Hostinger)
  ...(esHostinger && {
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'X-Frame-Options', value: 'DENY' },
            { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
            { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          ],
        },
      ];
    },
  }),
};

export default configuracion;
