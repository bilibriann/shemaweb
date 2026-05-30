import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Heart } from 'lucide-react';
import { SeccionHero } from '@/componentes/secciones/SeccionHero';
import { SeccionEventos } from '@/componentes/secciones/SeccionEventos';
import { SeccionGaleriaPrevia } from '@/componentes/secciones/SeccionGaleriaPrevia';
import { ContenedorSeccion } from '@/componentes/ui/ContenedorSeccion';
import { AnimarAlVer } from '@/componentes/ui/AnimarAlVer';
import { obtenerEventoProximos } from '@/lib/servicios/servicioEventos';
import { obtenerHorarios } from '@/lib/servicios/servicioHorarios';
import { formatearHora } from '@/lib/utilidades/utilidades';
import { CONFIGURACION_SITIO } from '@/lib/constantes/sitio';

export const metadata: Metadata = {
  title: `${CONFIGURACION_SITIO.nombre} — Iglesia Cristiana en Santiago, Chile`,
  description: CONFIGURACION_SITIO.descripcion,
};

export default function PaginaInicio() {
  const eventos = obtenerEventoProximos().slice(0, 3);
  const horarios = obtenerHorarios();

  return (
    <>
      <SeccionHero />

      {/* Sección bienvenida */}
      <ContenedorSeccion fondo="blanco" espacio="md">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <AnimarAlVer variante="izquierda">
          <div>
            <span className="text-acento mb-3 block text-sm font-bold tracking-widest uppercase">
              Bienvenido a <span className="font-normal">CALVARY </span><strong>SANTIAGO</strong>
            </span>
            <h2 className="text-texto linea-decorativa mb-6 text-3xl font-bold md:text-4xl">
              Iglesia Cristiana en Santiago, Chile.
            </h2>
            <p className="text-texto-suave mb-4 leading-relaxed">
              Somos una comunidad cristiana en Santiago, Chile. Nuestra misión es anunciar el
              evangelio de Jesucristo, formar discípulos y cooperar para el crecimiento espiritual
              de los creyentes por medio de la comunión y la enseñanza fiel de la Palabra.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/nosotros"
                className="bg-primario hover:bg-primario-oscuro inline-flex items-center gap-2 rounded-lg px-6 py-2.5 font-semibold text-white transition-colors"
              >
                Nuestra historia
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/contacto"
                className="border-primario text-primario hover:bg-primario inline-flex items-center gap-2 rounded-lg border-2 px-6 py-2.5 font-semibold transition-all hover:text-white"
              >
                <Heart size={18} />
                Contáctanos
              </Link>
            </div>
          </div>
          </AnimarAlVer>

          {/* Horarios rápidos */}
          <AnimarAlVer variante="derecha" retraso={100}>
          <div className="bg-fondo-suave border-borde rounded-2xl border p-8">
            <h3 className="text-texto mb-6 flex items-center gap-2 text-xl font-bold">
              <span className="bg-acento flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white">
                ⏰
              </span>
              Horarios de culto
            </h3>
            <div className="space-y-5">
              {horarios.map((horario) => (
                <div key={horario.dia} className="flex items-start gap-4">
                  <div className="min-w-[90px]">
                    <span className="text-primario text-sm font-bold">{horario.dia}</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    {horario.servicios.map((servicio, i) => (
                      <div key={i} className="text-sm">
                        <span className="text-texto font-semibold">
                          {formatearHora(servicio.hora)}
                        </span>
                        <span className="text-texto-suave"> — {servicio.tipo}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/horarios"
              className="text-primario hover:text-acento mt-6 block text-center text-sm font-semibold transition-colors"
            >
              Ver horarios completos →
            </Link>
          </div>
          </AnimarAlVer>
        </div>
      </ContenedorSeccion>

      <SeccionEventos eventos={eventos} />

      <SeccionGaleriaPrevia />
    </>
  );
}
