'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { AnimarAlVer } from '@/componentes/ui/AnimarAlVer';
import { img } from '@/lib/utilidades/rutas';

const IMAGENES = [
  img('/contenido/png/santiagodia.png'),
  img('/contenido/png/santiagorojo.png'),
  img('/contenido/png/santiago2.png'),
];

export function SeccionGaleriaPrevia() {
  const [actual, setActual] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActual((i) => (i + 1) % IMAGENES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ backgroundColor: '#0D2B35' }} className="py-20 md:py-28">
      <div className="contenedor">

        <AnimarAlVer>
          <div className="mb-10 text-center">
            <span className="text-acento mb-3 block text-xs font-semibold uppercase tracking-[0.28em]">
              Nuestra comunidad
            </span>
            <h2 className="text-4xl font-light tracking-tight text-white md:text-5xl">
              Galería
            </h2>
          </div>
        </AnimarAlVer>

        <AnimarAlVer retraso={100}>
          <div className="relative overflow-hidden rounded-2xl" style={{ height: '480px' }}>
            {IMAGENES.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt=""
                fill
                className="object-cover transition-opacity duration-1000"
                style={{ opacity: i === actual ? 1 : 0 }}
                priority={i === 0}
              />
            ))}
            <div className="absolute inset-0 bg-black/25" />

            {/* Indicadores */}
            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
              {IMAGENES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActual(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === actual ? 'w-6 bg-white' : 'w-2 bg-white/35'
                  }`}
                />
              ))}
            </div>
          </div>
        </AnimarAlVer>

        <AnimarAlVer retraso={150}>
          <div className="mt-8 text-center">
            <Link
              href="/galeria"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/40 transition-colors hover:text-white"
            >
              Ver galería completa <ArrowRight size={13} />
            </Link>
          </div>
        </AnimarAlVer>

      </div>
    </div>
  );
}
