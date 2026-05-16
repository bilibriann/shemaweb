import type { Metadata } from 'next';
import Image from 'next/image';
import { EncabezadoSeccion } from '@/componentes/ui/ContenedorSeccion';
import { CONFIGURACION_SITIO } from '@/lib/constantes/sitio';
import datosIglesia from '@/lib/contenido/iglesia.json';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: `Conoce la historia, visión, misión y valores de ${CONFIGURACION_SITIO.nombre} en Santiago, Chile.`,
};

export default function PaginaNosotros() {
  return (
    <>
      {/* Hero */}
      <div className="gradient-primario pt-32 pb-20 text-white">
        <div className="contenedor">
          <span className="text-acento text-sm font-bold tracking-widest uppercase mb-3 block">
            La iglesia
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nosotros</h1>
          <p className="text-white/75 text-lg max-w-xl">
            Conoce quiénes somos, de dónde venimos y hacia dónde vamos como comunidad.
          </p>
        </div>
      </div>

      <div className="bg-fondo-suave py-10 md:py-14">
        <div className="contenedor">
          <div className="relative overflow-hidden rounded-3xl shadow-xl">

            {/* Historia con logo de fondo */}
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
                  src="/contenido/png/logo.png"
                  fill
                  alt=""
                  className="object-contain opacity-[0.18] blur-sm scale-125"
                />
              </div>
              <div className="relative z-10 max-w-3xl mx-auto">
                <EncabezadoSeccion etiqueta="Nuestra historia">Quiénes somos</EncabezadoSeccion>
                <p className="text-texto-suave leading-relaxed text-lg">{datosIglesia.historia}</p>
              </div>
            </section>

            {/* Visión y Misión */}
            <section className="relative z-10 bg-fondo-suave/90 px-8 md:px-12 py-12 md:py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 sombra-media">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primario text-white text-2xl mb-5">
                    👁️
                  </div>
                  <h2 className="text-2xl font-bold text-texto mb-4">Visión</h2>
                  <p className="text-texto-suave leading-relaxed">{datosIglesia.vision}</p>
                </div>
                <div className="bg-white rounded-2xl p-8 sombra-media">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-acento text-white text-2xl mb-5">
                    🎯
                  </div>
                  <h2 className="text-2xl font-bold text-texto mb-4">Misión</h2>
                  <p className="text-texto-suave leading-relaxed">{datosIglesia.mision}</p>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="relative z-10 gradient-primario px-8 md:px-12 py-10 md:py-14">
              <div className="text-center text-white">
                <h2 className="text-2xl font-bold mb-3">¿Quieres conocernos más?</h2>
                <p className="text-white/75 mb-6">Ven a uno de nuestros cultos o escríbenos. Somos una familia y te esperamos.</p>
                <a
                  href="/contacto"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-acento text-white font-semibold hover:bg-acento-oscuro transition-colors"
                >
                  Contáctanos
                </a>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
