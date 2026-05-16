export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';
import { CONFIGURACION_SITIO } from '@/lib/constantes/sitio';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${CONFIGURACION_SITIO.url}/sitemap.xml`,
    host: CONFIGURACION_SITIO.url,
  };
}
