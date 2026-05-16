import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import { img } from '@/lib/utilidades/rutas';

import { Boton } from '@/componentes/ui/Boton';
import { CONFIGURACION_SITIO } from '@/lib/constantes/sitio';

export function SeccionHero() {
  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-label="Bienvenida"
    >
      {/* Imagen de fondo */}
      <Image
        src={img("/contenido/png/hero.png")}
        alt=""
        fill
        priority
        className="object-cover object-center"
        aria-hidden="true"
      />

      {/* Overlay para legibilidad */}
      <div className="bg-primario-oscuro/65 absolute inset-0" aria-hidden="true" />

      {/* Patrón decorativo de fondo */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Formas decorativas */}
      <div
        className="absolute -top-64 -right-64 h-[600px] w-[600px] rounded-full bg-white/5"
        aria-hidden="true"
      />

      <div
        className="bg-acento/10 absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full"
        aria-hidden="true"
      />

      {/* Paloma decorativa de fondo */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="relative h-[500px] w-[500px] translate-x-[12%] sm:h-[650px] sm:w-[650px] lg:h-[820px] lg:w-[820px]"
          style={{
            maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 72%)',
          }}
        >
          <Image
            src={img("/contenido/png/logo-invertido.png")}
            alt=""
            fill
            priority
            className="object-contain opacity-[0.25] mix-blend-screen blur-sm lg:opacity-[0.30]"
          />
        </div>
      </div>

      {/* Contenido */}
      <div className="contenedor relative z-10 py-32 pt-40">
        <div className="max-w-3xl">
          {/* Etiqueta */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="bg-acento h-2 w-2 animate-pulse rounded-full" />

            <span className="text-sm font-medium tracking-wide text-white/90">
              Iglesia Cristiana · Santiago, Chile
            </span>
          </div>

          {/* Logo */}
          <div className="mb-6 flex items-center gap-6">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-sm">
              <Image
                src={img("/contenido/png/logo-invertido.png")}
                alt="Logo Iglesia SHEMA"
                fill
                priority
                className="object-contain"
              />
            </div>

            <div>
              {/* Hebreo */}
              <p className="text-acento-claro font-display mb-1 text-lg tracking-widest opacity-80">
                שְׁמַע
              </p>

              {/* Título */}
              <h1 className="text-5xl leading-tight font-bold text-white sm:text-6xl lg:text-7xl">
                {CONFIGURACION_SITIO.nombreCorto}
              </h1>
            </div>
          </div>

          {/* Eslogan */}
          <p className="font-display mb-6 text-2xl text-white/80 italic sm:text-3xl">
            «{CONFIGURACION_SITIO.eslogan}»
          </p>

          {/* Descripción */}
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-white/70">
            «Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de
            ellos» — Mateo 18:20
          </p>

          {/* Botones */}
          <div className="mb-16 flex flex-col gap-4 sm:flex-row">
            <Link href="/nosotros">
              <Boton variante="acento" tamano="lg" iconoFin={<ArrowRight size={20} />}>
                Conócenos
              </Boton>
            </Link>

            <Link href="/horarios">
              <Boton
                variante="contorno"
                tamano="lg"
                className="hover:text-primario border-white text-white hover:bg-white"
              >
                Ver horarios
              </Boton>
            </Link>
          </div>

          {/* Información */}
          <div className="flex flex-col gap-6 text-sm text-white/60 sm:flex-row">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-acento shrink-0" />

              <span>Domingos 10:30 AM y Miercoles 19:30 PM</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-acento shrink-0" />

              <span>{CONFIGURACION_SITIO.direccion.ciudad}, Chile</span>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador scroll */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/40">
        <span className="text-xs tracking-widest uppercase">Descubre más</span>

        <div className="h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
