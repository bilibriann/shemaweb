import type { NextConfig } from 'next';

// En GitHub Pages el sitio vive en /nombre-del-repo — en Hostinger va en raíz
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const configuracion: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,

  images: {
    unoptimized: true, // requerido para export estático
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Headers de seguridad — no aplican en export estático.
  // Re-habilitar al desplegar en Hostinger (servidor con Node.js).
  // async headers() { ... }
};

export default configuracion;
