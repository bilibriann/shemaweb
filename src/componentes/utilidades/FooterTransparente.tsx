'use client';

import Image from 'next/image';
import { img } from '@/lib/utilidades/rutas';

export function FooterTransparente() {
  return (
    <div className="fixed inset-0 -z-20" aria-hidden="true">
      <Image
        src={img('/contenido/png/santiagorojo.png')}
        alt=""
        fill
        priority
        className="object-cover object-center"
      />
    </div>
  );
}
