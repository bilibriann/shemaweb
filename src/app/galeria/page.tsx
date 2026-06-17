import type { Metadata } from 'next';
import Image from 'next/image';
import { AnimarAlVer } from '@/componentes/ui/AnimarAlVer';
import { GaleriaAlbumes, type Album } from '@/componentes/galeria/GaleriaAlbumes';
import { CONFIGURACION_SITIO } from '@/lib/constantes/sitio';
import { img } from '@/lib/utilidades/rutas';
import { obtenerFotosAlbum } from '@/lib/servicios/servicioGaleria';

export const metadata: Metadata = {
  title: 'Galería',
  description: `Galería de fotos de ${CONFIGURACION_SITIO.nombre}. Momentos de nuestra comunidad, cultos, eventos y ministerios.`,
};

const CARPETA_DIA_MADRE = 'contenido/Dia de la Madre 2026';

// Las fotos se leen automáticamente de la carpeta al compilar: agregar o quitar
// imágenes de la carpeta ajusta la galería sola, sin editar este archivo.
const FOTOS_DIA_MADRE = obtenerFotosAlbum(CARPETA_DIA_MADRE, 'Día de la Madre 2026');

const ALBUMES: Album[] = [
  {
    slug: 'dia-de-la-madre-2026',
    titulo: 'Día de la Madre',
    categoria: 'Álbum · 2026',
    portada:
      FOTOS_DIA_MADRE.find((f) => f.src.includes('DSC06099'))?.src ??
      FOTOS_DIA_MADRE[0]?.src ??
      img(`/${CARPETA_DIA_MADRE}/DSC06099.JPG`),
    fotos: FOTOS_DIA_MADRE,
  },
];

export default function PaginaGaleria() {
  return (
    <>
      {/* Fondo fijo */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={img('/contenido/diseno/santiagodia.png')}
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
