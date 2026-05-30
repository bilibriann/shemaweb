import type { Metadata } from 'next';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { AnimarAlVer } from '@/componentes/ui/AnimarAlVer';
import { CONFIGURACION_SITIO } from '@/lib/constantes/sitio';
import { img } from '@/lib/utilidades/rutas';

export const metadata: Metadata = {
  title: 'Galería',
  description: `Galería de fotos de ${CONFIGURACION_SITIO.nombre}. Momentos de nuestra comunidad, cultos, eventos y ministerios.`,
};

const categorias = ['Cultos', 'Eventos', 'Ministerios', 'Retiros', 'Comunidad'];

export default function PaginaGaleria() {
  return (
    <>
      {/* Imagen fija de fondo — cubre toda la pantalla incluido el footer */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={img('/contenido/png/santiagodia.png')}
          fill
          alt=""
          aria-hidden="true"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Hero con efecto frosted glass */}
      <div className="relative pt-20 pb-4 text-white">
        <div className="contenedor relative z-10">
          <span className="text-acento text-sm font-bold tracking-widest uppercase mb-2 block">
            Momentos
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Galería</h1>
          <p className="text-white/75 text-base max-w-xl">
            Un vistazo a la vida de nuestra comunidad — cultos, eventos, ministerios y momentos
            que quedan en el corazón.
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="py-14 md:py-20">
        <div className="contenedor">

          {/* Filtros */}
          <AnimarAlVer>
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            <button className="px-4 py-2 rounded-full text-sm font-semibold bg-primario text-white shadow-md">
              Todas
            </button>
            {categorias.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-full text-sm font-semibold border border-white/35 text-white hover:bg-white/20 hover:border-white/60 transition-all"
              >
                {cat}
              </button>
            ))}
          </div>
          </AnimarAlVer>

          {/* Grid de fotos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <AnimarAlVer
                key={i}
                retraso={i * 40}
                className={i === 0 || i === 7 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}
              >
                <div className="rounded-xl border border-white/20 bg-white/10 flex items-center justify-center w-full h-full transition-colors hover:bg-white/20">
                  <div className="text-center text-white/50 p-4">
                    <ImageIcon size={32} className="mx-auto mb-2" />
                    <p className="text-xs">Foto próximamente</p>
                  </div>
                </div>
              </AnimarAlVer>
            ))}
          </div>

          {/* Banner en construcción */}
          <AnimarAlVer retraso={150}>
          <div className="text-center mt-12 py-10 bg-white/10 rounded-2xl border border-white/20">
            <ImageIcon size={48} className="mx-auto mb-4 text-white/50" />
            <h3 className="text-xl font-bold text-white mb-2">Galería en construcción</h3>
            <p className="text-white/65 max-w-md mx-auto">
              Pronto tendremos aquí una galería completa con fotos de nuestra comunidad.
              El material gráfico será proporcionado por la iglesia.
            </p>
          </div>
          </AnimarAlVer>

        </div>
      </div>
    </>
  );
}
