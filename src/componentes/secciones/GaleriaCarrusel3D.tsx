'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const N = 8;
const DEG = 360 / N;
const ANCHO = 300;
const ALTO = 400;
const RADIO = Math.round((ANCHO / 2) / Math.tan(Math.PI / N)); // ≈ 362px

interface Props {
  fotos: { src: string; alt: string }[];
}

export function GaleriaCarrusel3D({ fotos }: Props) {
  const total = fotos.length;
  const [paso, setPaso] = useState(0);
  const [pausado, setPausado] = useState(false);
  const intervaloRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const avanzar = useCallback((delta = 1) => setPaso(p => p + delta), []);

  const reiniciarIntervalo = useCallback(() => {
    if (intervaloRef.current) clearInterval(intervaloRef.current);
    if (!pausado) intervaloRef.current = setInterval(() => avanzar(1), 3500);
  }, [pausado, avanzar]);

  useEffect(() => {
    reiniciarIntervalo();
    return () => { if (intervaloRef.current) clearInterval(intervaloRef.current); };
  }, [reiniciarIntervalo]);

  const frente = ((paso % N) + N) % N;

  const imagenDePanel = (i: number) => {
    const offset = ((i - frente) + N) % N;
    return ((paso + offset) % total + total) % total;
  };

  const irAPanel = (i: number) => {
    const diff = ((i - frente) + N) % N;
    const delta = diff <= N / 2 ? diff : diff - N;
    setPaso(p => p + delta);
    reiniciarIntervalo();
  };

  const indiceActual = ((paso % total) + total) % total;

  return (
    <div
      className="flex flex-col items-center gap-8 select-none"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      {/* Escena 3D */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: ALTO + 100, perspective: 1200 }}
      >
        <div
          className="absolute left-1/2"
          style={{
            top: (ALTO + 100) / 2,
            transformStyle: 'preserve-3d',
            transform: `translateX(-50%) translateY(-50%) rotateY(${-paso * DEG}deg)`,
            transition: 'transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
            width: 0,
            height: 0,
          }}
        >
          {Array.from({ length: N }).map((_, i) => {
            const esFrontal = i === frente;
            const imgIdx = imagenDePanel(i);

            return (
              <div
                key={i}
                onClick={() => !esFrontal && irAPanel(i)}
                style={{
                  position: 'absolute',
                  width: ANCHO,
                  height: ALTO,
                  left: -ANCHO / 2,
                  top: -ALTO / 2,
                  transform: `rotateY(${i * DEG}deg) translateZ(${RADIO}px)`,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden' as never,
                  borderRadius: 14,
                  overflow: 'hidden',
                  cursor: esFrontal ? 'default' : 'pointer',
                  boxShadow: esFrontal
                    ? '0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.2)'
                    : '0 10px 30px rgba(0,0,0,0.4)',
                }}
              >
                <Image
                  src={fotos[imgIdx].src}
                  alt={fotos[imgIdx].alt}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
                {!esFrontal && (
                  <div className="absolute inset-0 bg-black/40" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => { avanzar(-1); reiniciarIntervalo(); }}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-all hover:bg-white/30 hover:scale-110"
          aria-label="Foto anterior"
        >
          <ChevronLeft size={22} />
        </button>

        <span className="min-w-[64px] text-center text-sm font-medium text-white/60">
          {indiceActual + 1} / {total}
        </span>

        <button
          onClick={() => { avanzar(1); reiniciarIntervalo(); }}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-all hover:bg-white/30 hover:scale-110"
          aria-label="Foto siguiente"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}
