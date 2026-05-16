import type { Metadata } from 'next';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
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
      <div className="gradient-primario pt-32 pb-20 text-white">
        <div className="contenedor">
          <span className="text-acento text-sm font-bold tracking-widest uppercase mb-3 block">
            Momentos
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Galería</h1>
          <p className="text-white/75 text-lg max-w-xl">
            Un vistazo a la vida de nuestra comunidad — cultos, eventos, ministerios y momentos
            que quedan en el corazón.
          </p>
        </div>
      </div>

      <div className="bg-fondo-suave py-10 md:py-14">
        <div className="contenedor">
          <div className="relative overflow-hidden rounded-3xl shadow-xl">

            {/* Imagen de fondo */}
            <Image
              src={img("/contenido/png/santiago2.png")}
              fill
              alt=""
              aria-hidden="true"
              className="object-cover object-center"
            />
            {/* Overlay para legibilidad */}
            <div className="absolute inset-0 bg-white/75" aria-hidden="true" />

            {/* Contenido */}
            <div className="relative z-10 p-8 md:p-12">

              <div className="flex flex-wrap gap-2 mb-10 justify-center">
                <button className="px-4 py-2 rounded-full text-sm font-semibold bg-primario text-white">
                  Todas
                </button>
                {categorias.map((cat) => (
                  <button
                    key={cat}
                    className="px-4 py-2 rounded-full text-sm font-semibold border border-borde text-texto hover:bg-primario hover:text-white hover:border-primario transition-all"
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className={`
                      bg-white/80 rounded-xl border border-borde flex items-center justify-center
                      ${i === 0 || i === 7 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}
                    `}
                  >
                    <div className="text-center text-texto-muy-suave p-4">
                      <ImageIcon size={32} className="mx-auto mb-2 opacity-40" />
                      <p className="text-xs">Foto próximamente</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12 py-10 bg-white/80 rounded-2xl border border-borde">
                <ImageIcon size={48} className="mx-auto mb-4 text-texto-muy-suave opacity-40" />
                <h3 className="text-xl font-bold text-texto mb-2">Galería en construcción</h3>
                <p className="text-texto-suave max-w-md mx-auto">
                  Pronto tendremos aquí una galería completa con fotos de nuestra comunidad.
                  El material gráfico será proporcionado por la iglesia.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
