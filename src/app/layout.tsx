import type { ReactNode } from 'react';
import '@/estilos/globals.css';
import { Raleway, Cormorant_Garamond } from 'next/font/google';
import { BarraNavegacion } from '@/componentes/diseno/BarraNavegacion';
import { PieDePagina } from '@/componentes/diseno/PieDePagina';
import { TransicionPagina } from '@/componentes/diseno/TransicionPagina';
import { metadataBase } from '@/lib/constantes/metadata';

export const metadata = metadataBase;

const fuenteRaleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const fuenteCormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export default function LayoutRaiz({ children }: { children: ReactNode }) {
  return (
    <html lang="es-CL" className={`${fuenteRaleway.variable} ${fuenteCormorant.variable}`}>
      <body>
        <BarraNavegacion />
        <main>
          <TransicionPagina>{children}</TransicionPagina>
        </main>
        <PieDePagina />
      </body>
    </html>
  );
}
