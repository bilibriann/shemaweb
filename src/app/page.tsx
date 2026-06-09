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
import { TarjetaHorarios } from '@/componentes/ui/TarjetaHorarios';
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
            <div className="text-acento mb-3 flex items-center gap-0 text-sm font-bold tracking-widest uppercase">
              <span className="font-normal">Bienvenido a CALVARY</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/contenido/Diseño/cruz.png"
                alt="cruz"
                className="mx-0.5 h-8 w-auto shrink-0"
                style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(80%) saturate(600%) hue-rotate(1deg) brightness(103%)' }}
              />
              <strong>SANTIAGO</strong>
            </div>
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
                className="bg-primario hover:bg-primario-oscuro inline-flex items-center gap-2 px-6 py-2.5 font-semibold text-white transition-colors"
              >
                Nuestra historia
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/contacto"
                className="border-primario text-primario hover:bg-primario inline-flex items-center gap-2 border-2 px-6 py-2.5 font-semibold transition-all hover:text-white"
              >
                <Heart size={18} />
                Contáctanos
              </Link>
            </div>
          </div>
          </AnimarAlVer>

          {/* Horarios rápidos */}
          <AnimarAlVer variante="derecha" retraso={100}>
            <TarjetaHorarios horarios={horarios} variante="claro" mostrarEnlace />
          </AnimarAlVer>
        </div>
      </ContenedorSeccion>

      <SeccionEventos eventos={eventos} />

      <SeccionGaleriaPrevia />
    </>
  );
}
