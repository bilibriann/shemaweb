import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { AnimarAlVer } from '@/componentes/ui/AnimarAlVer';
import { img } from '@/lib/utilidades/rutas';

// Foto de muestra del álbum "Día de la Madre" — representa la galería en el inicio.
const FOTO_MUESTRA = img('/contenido/Dia de la Madre 2026/DSC06138.JPG');

export function SeccionGaleriaPrevia() {
  return (
    <div style={{ backgroundColor: '#0D2B35' }} className="py-20 md:py-28">
      <div className="contenedor">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">

          {/* Foto de muestra — formato retrato */}
          <AnimarAlVer>
            <div
              className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl"
              style={{ aspectRatio: '3 / 4' }}
            >
              <Image
                src={FOTO_MUESTRA}
                alt="Momento de la comunidad SHEMA — Día de la Madre"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </AnimarAlVer>

          {/* Texto + CTA */}
          <AnimarAlVer retraso={100}>
            <div className="text-center md:text-left">
              <span className="text-acento mb-3 block text-xs font-semibold uppercase tracking-[0.28em]">
                Nuestra comunidad
              </span>
              <h2 className="mb-4 text-4xl font-light tracking-tight text-white md:text-5xl">
                Galería
              </h2>
              <p className="mb-8 text-base text-white/60 max-w-md mx-auto md:mx-0">
                Cultos, eventos, ministerios y los momentos que quedan en el corazón —
                revive con nosotros los recuerdos de nuestra comunidad.
              </p>
              <Link
                href="/galeria"
                className="inline-flex items-center gap-2 border border-acento/30 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-acento transition-all hover:border-acento hover:bg-acento hover:text-primario-oscuro"
              >
                Ver galería completa <ArrowRight size={14} />
              </Link>
            </div>
          </AnimarAlVer>

        </div>
      </div>
    </div>
  );
}
