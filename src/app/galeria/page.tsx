import type { Metadata } from 'next';
import Image from 'next/image';
import { AnimarAlVer } from '@/componentes/ui/AnimarAlVer';
import { GaleriaAlbumes, type Album } from '@/componentes/galeria/GaleriaAlbumes';
import { CONFIGURACION_SITIO } from '@/lib/constantes/sitio';
import { img } from '@/lib/utilidades/rutas';

export const metadata: Metadata = {
  title: 'Galería',
  description: `Galería de fotos de ${CONFIGURACION_SITIO.nombre}. Momentos de nuestra comunidad, cultos, eventos y ministerios.`,
};

const BASE_DIA_MADRE = '/contenido/Dia de la Madre 2026';

// Fotos tomadas en formato retrato (vertical) — se muestran en celdas altas
// que respetan su proporción en lugar de recortarlas como si fueran horizontales.
const FOTOS_VERTICALES = new Set([
  'DSC06047.JPG', 'DSC06058.JPG', 'DSC06064.JPG', 'DSC06071.JPG',
  'DSC06075.JPG', 'DSC06083.JPG', 'DSC06087.JPG', 'DSC06089.JPG',
  'DSC06096.JPG', 'DSC06099.JPG', 'DSC06110.JPG', 'DSC06117.JPG',
  'DSC06148.JPG', 'DSC06185.JPG', 'DSC06198.JPG', 'DSC06209.JPG',
  'DSC06217.JPG',
]);

const FOTOS_DIA_MADRE = [
  'DSC06044.JPG', 'DSC06047.JPG', 'DSC06049.JPG', 'DSC06058.JPG',
  'DSC06063.JPG', 'DSC06064.JPG', 'DSC06066.JPG', 'DSC06071.JPG',
  'DSC06072.JPG', 'DSC06075.JPG', 'DSC06078.JPG', 'DSC06083.JPG',
  'DSC06085.JPG', 'DSC06087.JPG', 'DSC06089.JPG', 'DSC06094.JPG',
  'DSC06096.JPG', 'DSC06099.JPG', 'DSC06105.JPG', 'DSC06108.JPG',
  'DSC06110.JPG', 'DSC06114.JPG', 'DSC06117.JPG', 'DSC06138.JPG',
  'DSC06148.JPG', 'DSC06167.JPG', 'DSC06169.JPG', 'DSC06176.JPG',
  'DSC06185.JPG', 'DSC06191.JPG', 'DSC06195.JPG', 'DSC06198.JPG',
  'DSC06207.JPG', 'DSC06209.JPG', 'DSC06217.JPG',
].map((nombre, i) => ({
  src: img(`${BASE_DIA_MADRE}/${nombre}`),
  alt: `Día de la Madre 2026 — foto ${i + 1}`,
  vertical: FOTOS_VERTICALES.has(nombre),
}));

const ALBUMES: Album[] = [
  {
    slug: 'dia-de-la-madre-2026',
    titulo: 'Día de la Madre',
    categoria: 'Álbum · 2026',
    portada: img(`${BASE_DIA_MADRE}/DSC06099.JPG`),
    fotos: FOTOS_DIA_MADRE,
  },
];

export default function PaginaGaleria() {
  return (
    <>
      {/* Fondo fijo */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={img('/contenido/Diseño/santiagodia.png')}
          fill
          alt=""
          aria-hidden="true"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Hero */}
      <div className="relative pt-20 pb-6 text-white">
        <div className="contenedor relative z-10">
          <span className="text-acento text-sm font-bold tracking-widest uppercase mb-2 block">
            Momentos
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Galería</h1>
          <p className="text-white/70 text-base max-w-xl">
            Un vistazo a la vida de nuestra comunidad — cultos, eventos, ministerios y momentos
            que quedan en el corazón.
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="pb-20">
        <div className="contenedor">
          <AnimarAlVer retraso={80}>
            <GaleriaAlbumes albumes={ALBUMES} />
          </AnimarAlVer>
        </div>
      </div>
    </>
  );
}
