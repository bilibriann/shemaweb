import type { Metadata } from 'next';
import { CONFIGURACION_SITIO } from '@/lib/constantes/sitio';

export const metadataBase: Metadata = {
  metadataBase: new URL(CONFIGURACION_SITIO.url),
  title: {
    default: CONFIGURACION_SITIO.nombre,
    template: `%s | ${CONFIGURACION_SITIO.nombre}`,
  },
  description: CONFIGURACION_SITIO.descripcion,
  keywords: [
    'iglesia cristiana',
    'Calvary Santiago',
    'Santiago',
    'Chile',
    'fe',
    'evangelio',
    'ministerios',
    'culto',
    'comunidad cristiana',
  ],
  authors: [{ name: CONFIGURACION_SITIO.nombre }],
  creator: CONFIGURACION_SITIO.nombre,
  publisher: CONFIGURACION_SITIO.nombre,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: CONFIGURACION_SITIO.url,
    siteName: CONFIGURACION_SITIO.nombre,
    title: CONFIGURACION_SITIO.nombre,
    description: CONFIGURACION_SITIO.descripcion,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: CONFIGURACION_SITIO.nombre,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: CONFIGURACION_SITIO.nombre,
    description: CONFIGURACION_SITIO.descripcion,
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};
