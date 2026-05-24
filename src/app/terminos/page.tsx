import type { Metadata } from 'next';
import { FileText, Clock } from 'lucide-react';
import { ContenedorSeccion } from '@/componentes/ui/ContenedorSeccion';
import { AnimarAlVer } from '@/componentes/ui/AnimarAlVer';
import { CONFIGURACION_SITIO } from '@/lib/constantes/sitio';

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: `Términos y condiciones de ${CONFIGURACION_SITIO.nombre}.`,
  robots: { index: false, follow: false },
};

const SECCIONES = [
  'Aceptación de los términos',
  'Uso del sitio',
  'Propiedad intelectual',
  'Contenido religioso',
  'Exactitud de la información',
  'Limitación de responsabilidad',
  'Ley aplicable',
  'Contacto',
];

export default function PaginaTerminos() {
  return (
    <>
      <div className="gradient-primario pt-20 pb-4 text-white">
        <div className="contenedor">
          <span className="text-acento text-sm font-bold tracking-widest uppercase mb-2 block">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Términos y Condiciones</h1>
          <p className="text-white/60 text-sm">Documento en preparación</p>
        </div>
      </div>

      <ContenedorSeccion fondo="blanco">
        <div className="max-w-3xl mx-auto">

          {/* Banner en construcción */}
          <AnimarAlVer>
          <div className="flex items-start gap-4 bg-acento-muy-claro border border-acento/30 rounded-2xl p-5 mb-10">
            <Clock size={22} className="text-acento shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-acento-oscuro mb-1">Documento en preparación</p>
              <p className="text-sm text-texto-suave leading-relaxed">
                Los términos y condiciones de uso de {CONFIGURACION_SITIO.nombre} están siendo
                redactados y serán publicados próximamente. Para consultas, escríbenos a{' '}
                <a href={`mailto:${CONFIGURACION_SITIO.email}`} className="text-primario hover:underline">
                  {CONFIGURACION_SITIO.email}
                </a>
                .
              </p>
            </div>
          </div>
          </AnimarAlVer>

          {/* Estructura de secciones (placeholder) */}
          <div className="space-y-4">
            {SECCIONES.map((titulo, i) => (
              <AnimarAlVer key={i} retraso={i * 50}>
              <div className="border border-borde rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primario-muy-claro text-primario text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <h2 className="font-semibold text-texto">{titulo}</h2>
                </div>
                <div className="space-y-2 pl-10">
                  <div className="h-3 bg-fondo-suave rounded w-full" />
                  <div className="h-3 bg-fondo-suave rounded w-4/5" />
                  {i % 3 === 0 && <div className="h-3 bg-fondo-suave rounded w-3/5" />}
                </div>
              </div>
              </AnimarAlVer>
            ))}
          </div>

          <AnimarAlVer retraso={100}>
          <div className="flex items-center gap-2 mt-10 text-texto-muy-suave text-xs">
            <FileText size={13} />
            <span>{CONFIGURACION_SITIO.nombre} · Santiago, Chile</span>
          </div>
          </AnimarAlVer>

        </div>
      </ContenedorSeccion>
    </>
  );
}
