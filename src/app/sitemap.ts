export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';
import { CONFIGURACION_SITIO } from '@/lib/constantes/sitio';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = CONFIGURACION_SITIO.url;
  const ahora = new Date().toISOString();

  const rutas = [
    { ruta: '', prioridad: 1.0, frecuencia: 'weekly' as const },
    { ruta: '/nosotros', prioridad: 0.9, frecuencia: 'monthly' as const },
    { ruta: '/horarios', prioridad: 0.9, frecuencia: 'weekly' as const },
    { ruta: '/eventos', prioridad: 0.8, frecuencia: 'weekly' as const },
    { ruta: '/galeria', prioridad: 0.7, frecuencia: 'monthly' as const },
    { ruta: '/contacto', prioridad: 0.8, frecuencia: 'monthly' as const },
  ];

  return rutas.map(({ ruta, prioridad, frecuencia }) => ({
    url: `${url}${ruta}`,
    lastModified: ahora,
    changeFrequency: frecuencia,
    priority: prioridad,
  }));
}
