'use client';

import { useEffect, useState } from 'react';

const VERSICULO = '«Por tanto, id y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo; enseñándoles que guarden todas las cosas que os he mandado; y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo.»';
const PALABRAS = VERSICULO.split(' ');
const DELAY_INICIO_MS = 150;
const DELAY_ENTRE_PALABRAS_MS = 40;

export function VersiculoEscritura() {
  const [visible, setVisible] = useState(false);
  const [sinAnimacion, setSinAnimacion] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSinAnimacion(true);
      setVisible(true);
      return;
    }
    const timeout = setTimeout(() => setVisible(true), DELAY_INICIO_MS);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="mt-6 max-w-xl mx-auto text-center">
      <p
        className="font-display italic text-texto-suave leading-relaxed min-h-[4rem]"
        aria-label={VERSICULO}
      >
        {visible
          ? PALABRAS.map((palabra, i) => (
              <span
                key={i}
                className={sinAnimacion ? undefined : 'gota-palabra'}
                style={sinAnimacion ? undefined : { animationDelay: `${i * DELAY_ENTRE_PALABRAS_MS}ms` }}
                aria-hidden="true"
              >
                {palabra}{i < PALABRAS.length - 1 ? ' ' : ''}
              </span>
            ))
          : ' '}
      </p>
      <cite className="mt-2 block text-acento text-xs font-bold tracking-widest uppercase not-italic">
        Mateo 28:19-20
      </cite>
    </div>
  );
}
