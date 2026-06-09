'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';
import { ELEMENTOS_NAVEGACION } from '@/lib/constantes/navegacion';
import { cn } from '@/lib/utilidades/utilidades';
import { img } from '@/lib/utilidades/rutas';

export function BarraNavegacion() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [desplazado, setDesplazado] = useState(false);
  const rutaActual = usePathname();

  useEffect(() => {
    const manejarDesplazamiento = () => setDesplazado(window.scrollY > 20);
    window.addEventListener('scroll', manejarDesplazamiento, { passive: true });
    return () => window.removeEventListener('scroll', manejarDesplazamiento);
  }, []);

  useEffect(() => {
    setMenuAbierto(false);
  }, [rutaActual]);

  useEffect(() => {
    document.body.style.overflow = menuAbierto ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuAbierto]);

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300 border-b border-borde bg-white',
        desplazado && 'sombra-media',
      )}
    >
      <nav className="contenedor" aria-label="Navegación principal">
        <div className="flex h-16 items-center justify-between lg:h-18">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'font-display flex items-center gap-3 text-xl font-bold tracking-wide transition-colors text-primario',
            )}
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-lg">
              <Image
                src={img("/contenido/Diseño/logo.png")}
                alt="Logo CALVARY SANTIAGO"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="flex items-center">
              <span className="font-normal">CALVARY</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/contenido/Diseño/cruz.png"
                alt=""
                className="mx-0.5 h-5 w-auto shrink-0"
                style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(80%) saturate(600%) hue-rotate(1deg) brightness(103%)' }}
              />
              <strong>SANTIAGO</strong>
            </span>
          </Link>

          {/* Navegación escritorio */}
          <ul className="hidden items-center gap-1 lg:flex" role="list">
            {ELEMENTOS_NAVEGACION.map((elemento) => {
              const activo = rutaActual === elemento.ruta;
              return (
                <li key={elemento.ruta}>
                  <Link
                    href={elemento.ruta}
                    className={cn(
                      'nav-indicador px-3 py-2 text-sm font-medium transition-all duration-200',
                      activo
                        ? 'text-primario bg-primario-muy-claro font-semibold'
                        : 'text-texto hover:text-primario hover:bg-primario-muy-claro',
                    )}
                    aria-current={activo ? 'page' : undefined}
                  >
                    {elemento.etiqueta}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA escritorio */}
          <div className="hidden items-center lg:flex">
            <Link
              href="/contacto"
              className="px-5 py-2 text-sm font-semibold transition-all duration-200 bg-acento hover:bg-acento-oscuro text-white"
            >
              Contáctanos
            </Link>
          </div>

          {/* Botón menú móvil */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="p-2 transition-colors lg:hidden text-texto hover:bg-fondo-suave"
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
          >
            {menuAbierto ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {menuAbierto && (
        <div
          id="menu-movil"
          className="fixed inset-0 top-16 z-40 overflow-y-auto bg-white lg:hidden"
          aria-label="Menú móvil"
        >
          <nav className="contenedor py-6">
            <ul className="space-y-1" role="list">
              {ELEMENTOS_NAVEGACION.map((elemento) => {
                const activo = rutaActual === elemento.ruta;
                return (
                  <li key={elemento.ruta}>
                    <Link
                      href={elemento.ruta}
                      className={cn(
                        'flex items-center justify-between px-4 py-3.5 text-base font-medium transition-all',
                        activo
                          ? 'bg-primario-muy-claro text-primario font-semibold'
                          : 'text-texto hover:bg-fondo-suave',
                      )}
                      aria-current={activo ? 'page' : undefined}
                    >
                      {elemento.etiqueta}
                      <ChevronRight
                        size={16}
                        className={activo ? 'text-primario' : 'text-texto-muy-suave'}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="border-borde mt-8 border-t pt-6">
              <Link
                href="/contacto"
                className="bg-acento hover:bg-acento-oscuro flex w-full items-center justify-center py-3.5 text-base font-semibold text-white transition-colors"
              >
                Contáctanos
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
