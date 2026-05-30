'use client';

import { useEffect, useRef, useState } from 'react';

const VERSICULO = '«Por tanto, id y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo; enseñándoles que guarden todas las cosas que os he mandado; y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo.»';
const DELAY_INICIO_MS = 600;
const VELOCIDAD_CHAR_MS = 22;

export function VersiculoEscritura() {
  const [charCount, setCharCount] = useState(0);
  const [tipeoActivo, setTipeoActivo] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCharCount(VERSICULO.length);
      return;
    }

    const timeout = setTimeout(() => {
      setTipeoActivo(true);
      let i = 0;
      intervalRef.current = setInterval(() => {
        i++;
        setCharCount(i);
        if (i >= VERSICULO.length) {
          clearInterval(intervalRef.current!);
          setTipeoActivo(false);
        }
      }, VELOCIDAD_CHAR_MS);
    }, DELAY_INICIO_MS);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="mt-6 max-w-xl mx-auto text-center">
      <p
        className="font-display italic text-texto-suave leading-relaxed min-h-[4rem]"
        aria-label={VERSICULO}
      >
        {charCount > 0 ? VERSICULO.slice(0, charCount) : ' '}
        {tipeoActivo && (
          <span
            aria-hidden="true"
            className="ml-0.5 inline-block h-[0.85em] w-0.5 bg-texto/50 align-middle"
          />
        )}
      </p>
      <cite className="mt-2 block text-acento text-xs font-bold tracking-widest uppercase not-italic">
        Mateo 28:19-20
      </cite>
    </div>
  );
}
