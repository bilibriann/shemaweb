import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { CONFIGURACION_SITIO } from '@/lib/constantes/sitio';
import { ENLACES_PIE_PAGINA } from '@/lib/constantes/navegacion';
import { img } from '@/lib/utilidades/rutas';

export function PieDePagina() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="bg-primario-oscuro text-white" aria-label="Pie de página">
      <div className="contenedor">
        {/* Cuerpo principal */}
        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Columna 1: Identidad */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-5 inline-flex items-center gap-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-lg">
                <Image
                  src={img('/contenido/diseno/logo.png')}
                  alt="Logo CALVARY SANTIAGO"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-display flex flex-wrap items-center text-xl tracking-wide">
                <span className="font-normal">CALVARY</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img("/contenido/diseno/cruz.png")}
                  alt=""
                  className="mx-0.5 h-5 w-auto shrink-0"
                  style={{
                    filter:
                      'brightness(0) saturate(100%) invert(67%) sepia(80%) saturate(600%) hue-rotate(1deg) brightness(103%)',
                  }}
                />
                <strong>SANTIAGO</strong>
              </span>
            </Link>
            <p className="mb-5 text-sm leading-relaxed text-white/70">
              {CONFIGURACION_SITIO.descripcion}
            </p>
            <a
              href="https://calvarychapelesp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative mb-5 inline-block h-7 w-28"
            >
              <Image
                src={img('/contenido/diseno/CGN_MAINLOGO_WHITE-1.png')}
                alt="CGN"
                fill
                className="object-contain object-left"
              />
            </a>

            {/* Redes sociales */}
            <div className="flex gap-3">
              <a
                href={CONFIGURACION_SITIO.redesSociales.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:bg-acento flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/70 transition-all duration-200 hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={CONFIGURACION_SITIO.redesSociales.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:bg-acento flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/70 transition-all duration-200 hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={CONFIGURACION_SITIO.redesSociales.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:bg-acento flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/70 transition-all duration-200 hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Columna 2: Iglesia */}
          <div>
            <h3 className="text-acento mb-5 text-sm font-bold tracking-widest uppercase">
              La Iglesia
            </h3>
            <ul className="space-y-3">
              {ENLACES_PIE_PAGINA.iglesia.map((enlace) => (
                <li key={enlace.ruta}>
                  <Link
                    href={enlace.ruta}
                    className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
                  >
                    {enlace.etiqueta}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Recursos */}
          <div>
            <h3 className="text-acento mb-5 text-sm font-bold tracking-widest uppercase">
              Recursos
            </h3>
            <ul className="space-y-3">
              {ENLACES_PIE_PAGINA.recursos.map((enlace) => (
                <li key={enlace.ruta}>
                  <Link
                    href={enlace.ruta}
                    className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
                  >
                    {enlace.etiqueta}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="text-acento mb-5 text-sm font-bold tracking-widest uppercase">
              Encuéntranos
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin size={16} className="text-acento mt-0.5 shrink-0" />
                <span>
                  {CONFIGURACION_SITIO.direccion.calle}
                  <br />
                  {CONFIGURACION_SITIO.direccion.ciudad}, {CONFIGURACION_SITIO.direccion.region}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${CONFIGURACION_SITIO.telefono.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Phone size={16} className="text-acento shrink-0" />
                  {CONFIGURACION_SITIO.telefono}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONFIGURACION_SITIO.email}`}
                  className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Mail size={16} className="text-acento shrink-0" />
                  {CONFIGURACION_SITIO.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <Clock size={16} className="text-acento mt-0.5 shrink-0" />
                <span>
                  Dom: 10:30 AM
                  <br />
                  Mié: 19:30 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/50">
              © {anioActual} · Santiago, Chile · {CONFIGURACION_SITIO.idioma.toUpperCase()}
            </span>
          </div>
          <a
            href="https://calvarychapelesp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block h-6 w-24"
          >
            <Image
              src={img('/contenido/diseno/CGN_MAINLOGO_WHITE-1.png')}
              alt="CGN"
              fill
              className="object-contain object-right"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
