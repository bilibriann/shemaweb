import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CONFIGURACION_SITIO } from '@/lib/constantes/sitio';
import datosIglesia from '@/lib/contenido/iglesia.json';
import { img } from '@/lib/utilidades/rutas';
import { AnimarAlVer } from '@/componentes/ui/AnimarAlVer';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: `Conoce la historia, visión, misión y declaración de fe de ${CONFIGURACION_SITIO.nombre} en Santiago, Chile.`,
};

export default function PaginaNosotros() {
  return (
    <>
      {/* Hero */}
      <div className="bg-fondo-suave pt-32 pb-2">
        <div className="contenedor text-center">
          <span className="text-acento text-sm font-bold tracking-widest uppercase mb-2 block">
            Nuestra historia
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-texto">Quiénes somos</h1>
          <p className="text-texto-suave text-base max-w-3xl mx-auto text-justify">
            {datosIglesia.historia.split('Calvary Global Network').flatMap((parte, i) =>
              i === 0
                ? [parte]
                : [
                    <a
                      key="cgn"
                      href="https://calvarychapelesp.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-acento font-semibold hover:underline"
                    >
                      Calvary Global Network
                    </a>,
                    parte,
                  ],
            )}
          </p>
        </div>
      </div>

      <div className="bg-fondo-suave py-4 md:py-6">
        <div className="contenedor space-y-6">

          {/* Declaración de Fe */}
          <AnimarAlVer variante="derecha" retraso={120}>
          <div className="relative overflow-hidden rounded-3xl shadow-xl">
            <section className="relative overflow-hidden z-10 bg-white/90 px-8 md:px-12 py-12 md:py-16">
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                aria-hidden="true"
                style={{
                  maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                }}
              >
                <Image
                  src={img("/contenido/diseno/logo.png")}
                  fill
                  alt=""
                  className="object-contain opacity-[0.18] blur-sm scale-125"
                />
              </div>
              <div className="relative z-10 max-w-3xl mx-auto">
                <div className="mb-5">
                  <span className="text-sm font-bold tracking-widest uppercase text-acento mb-3 block text-center">Lo que creemos</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-texto linea-decorativa-centrada text-center">Declaración de Fe</h2>
                </div>
                <p className="text-texto-suave leading-relaxed text-justify mb-8">
                  Nuestra <strong className="text-texto">Misión</strong> es{' '}
                  {datosIglesia.mision.charAt(0).toLowerCase() + datosIglesia.mision.slice(1)}{' '}
                  Nuestra <strong className="text-texto">Visión</strong> es{' '}
                  {datosIglesia.vision.charAt(0).toLowerCase() + datosIglesia.vision.slice(1)}
                </p>
                <ol className="space-y-5">
                  {datosIglesia.principios.map((principio, indice) => (
                    <li key={indice} className="flex gap-4">
                      <span className="gradient-primario mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                        {indice + 1}
                      </span>
                      <p className="text-texto-suave leading-relaxed text-justify">{principio}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* CTA */}
            <section className="relative z-10 gradient-primario px-8 md:px-12 py-10 md:py-14">
              <div className="text-center text-white">
                <h2 className="text-2xl font-bold mb-3">¿Quieres conocernos más?</h2>
                <p className="text-white/75 mb-6">Ven a uno de nuestros cultos o escríbenos. Somos una familia y te esperamos.</p>
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-acento text-white font-semibold hover:bg-acento-oscuro transition-colors"
                >
                  Contáctanos
                </Link>
              </div>
            </section>
          </div>
          </AnimarAlVer>

        </div>
      </div>
    </>
  );
}
