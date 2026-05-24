'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import { img } from '@/lib/utilidades/rutas';
import { Boton } from '@/componentes/ui/Boton';
import { CONFIGURACION_SITIO } from '@/lib/constantes/sitio';

const ESLOGAN_COMPLETO = `«${CONFIGURACION_SITIO.eslogan}»`;
const DELAY_INICIO_MS = 1650;
const VELOCIDAD_CHAR_MS = 22;

export function SeccionHero() {
  const [charCount, setCharCount] = useState(0);
  const [tipeoActivo, setTipeoActivo] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCharCount(ESLOGAN_COMPLETO.length);
      return;
    }

    const timeout = setTimeout(() => {
      setTipeoActivo(true);
      let i = 0;
      intervalRef.current = setInterval(() => {
        i++;
        setCharCount(i);
        if (i >= ESLOGAN_COMPLETO.length) {
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
    <section
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-label="Bienvenida"
    >
      {/* Imagen de fondo con zoom-out cinematográfico */}
      <div className="hero-fondo absolute inset-0">
        <Image
          src={img('/contenido/png/hero.png')}
          alt=""
          fill
          priority
          className="object-cover object-center"
          aria-hidden="true"
        />
      </div>

      {/* Overlay oscuro */}
      <div
        className="hero-fondo bg-primario-oscuro/65 absolute inset-0"
        style={{ animationDelay: '150ms' }}
        aria-hidden="true"
      />

      {/* Forma decorativa superior derecha */}
      <div
        className="absolute -top-64 -right-64 h-[600px] w-[600px] rounded-full bg-white/5"
        aria-hidden="true"
      />

      {/* Forma decorativa inferior izquierda */}
      <div
        className="bg-acento/10 absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full"
        aria-hidden="true"
      />

      {/* Logo paloma de fondo */}
      <div
        className="hero-fondo pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{ animationDelay: '350ms' }}
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
            src={img('/contenido/png/logo-invertido.png')}
            alt=""
            fill
            priority
            className="object-contain opacity-[0.25] mix-blend-screen blur-sm lg:opacity-[0.30]"
          />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="contenedor relative z-10 py-32 pt-40">
        <div className="max-w-3xl">

          {/* 1. Badge */}
          <div
            className="elemento-entrada mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm"
            style={{ animationDelay: '350ms' }}
          >
            <span className="bg-acento h-2 w-2 animate-pulse rounded-full" />
            <span className="text-sm font-medium tracking-wide text-white/90">
              Iglesia Cristiana · Santiago, Chile
            </span>
          </div>

          {/* 2. Logo + Título */}
          <div
            className="elemento-entrada mb-6 flex items-center gap-6"
            style={{ animationDelay: '520ms' }}
          >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-sm">
              <Image
                src={img('/contenido/png/logo.png')}
                alt="Logo CALVARY SANTIAGO"
                fill
                priority
                className="object-contain"
              />
            </div>
            <h1 className="text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
              {CONFIGURACION_SITIO.nombre}
            </h1>
          </div>

          {/* 3. Versículo — typewriter */}
          <p
            className="elemento-entrada font-display mb-6 min-h-[3rem] text-2xl text-white/80 italic sm:text-3xl"
            style={{ animationDelay: '720ms' }}
            aria-label={ESLOGAN_COMPLETO}
          >
            {charCount > 0 ? ESLOGAN_COMPLETO.slice(0, charCount) : ' '}
            {tipeoActivo && (
              <span
                aria-hidden="true"
                className="cursor-tipeo ml-0.5 inline-block h-[0.85em] w-0.5 bg-white/65 align-middle"
              />
            )}
          </p>

          {/* 4+5. Botones */}
          <div
            className="elemento-entrada mb-16 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: '1000ms' }}
          >
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

          {/* 6. Información inferior */}
          <div
            className="elemento-entrada flex flex-col gap-6 text-sm text-white/60 sm:flex-row"
            style={{ animationDelay: '1180ms' }}
          >
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

      {/* Indicador de scroll */}
      <div
        className="elemento-entrada absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        style={{ animationDelay: '1400ms' }}
      >
        <span className="pulsar-descubrir text-xs tracking-widest uppercase text-white/50">
          Descubre más
        </span>
        <div className="scroll-flecha h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
