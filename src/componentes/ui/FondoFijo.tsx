import Image from 'next/image';
import { img } from '@/lib/utilidades/rutas';

interface PropiedadesFondoFijo {
  /** Ruta de la imagen dentro de /public (ej: "/contenido/diseno/santiagorojo.png"). */
  src: string;
}

// Imagen de fondo fija a pantalla completa (decorativa), detrás de todo el contenido.
export function FondoFijo({ src }: PropiedadesFondoFijo) {
  return (
    <div className="fixed inset-0 -z-20" aria-hidden="true">
      <Image src={img(src)} alt="" fill priority className="object-cover object-center" />
    </div>
  );
}
