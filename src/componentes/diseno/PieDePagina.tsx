import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail, Clock } from 'lucide-react';
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
            <Link href="/" className="inline-flex items-center gap-3 mb-5">
              <div className="relative h-9 w-9 overflow-hidden rounded-lg">
                <Image
                  src={img("/contenido/png/logo.png")}
                  alt="Logo CALVARY SANTIAGO"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-display tracking-wide">
                <span className="font-normal">CALVARY </span><strong>SANTIAGO</strong>
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              {CONFIGURACION_SITIO.descripcion}
            </p>
            <a href="https://calvarychapelesp.com/" target="_blank" rel="noopener noreferrer" className="inline-block relative w-28 h-7 mb-5">
              <Image
                src={img("/contenido/png/calvarychapelcomblanco.png")}
                alt="Calvary Chapel"
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
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/70 hover:bg-acento hover:text-white transition-all duration-200"
              >
                <Instagram size={16} />
              </a>
              <a
                href={CONFIGURACION_SITIO.redesSociales.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/70 hover:bg-acento hover:text-white transition-all duration-200"
              >
                <Facebook size={16} />
              </a>
              <a
                href={CONFIGURACION_SITIO.redesSociales.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/70 hover:bg-acento hover:text-white transition-all duration-200"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Columna 2: Iglesia */}
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase text-acento mb-5">
              La Iglesia
            </h3>
            <ul className="space-y-3">
              {ENLACES_PIE_PAGINA.iglesia.map((enlace) => (
                <li key={enlace.ruta}>
                  <Link
                    href={enlace.ruta}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {enlace.etiqueta}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Recursos */}
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase text-acento mb-5">
              Recursos
            </h3>
            <ul className="space-y-3">
              {ENLACES_PIE_PAGINA.recursos.map((enlace) => (
                <li key={enlace.ruta}>
                  <Link
                    href={enlace.ruta}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {enlace.etiqueta}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-bold tracking-widest uppercase text-acento mb-5 mt-8">
              Legal
            </h3>
            <ul className="space-y-3">
              {ENLACES_PIE_PAGINA.legal.map((enlace) => (
                <li key={enlace.ruta}>
                  <Link
                    href={enlace.ruta}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {enlace.etiqueta}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase text-acento mb-5">
              Encuéntranos
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin size={16} className="mt-0.5 shrink-0 text-acento" />
                <span>
                  {CONFIGURACION_SITIO.direccion.calle}
                  <br />
                  {CONFIGURACION_SITIO.direccion.ciudad},{' '}
                  {CONFIGURACION_SITIO.direccion.region}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${CONFIGURACION_SITIO.telefono.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Phone size={16} className="shrink-0 text-acento" />
                  {CONFIGURACION_SITIO.telefono}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONFIGURACION_SITIO.email}`}
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Mail size={16} className="shrink-0 text-acento" />
                  {CONFIGURACION_SITIO.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <Clock size={16} className="mt-0.5 shrink-0 text-acento" />
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
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/50">© {anioActual} · Santiago, Chile · {CONFIGURACION_SITIO.idioma.toUpperCase()}</span>
          </div>
          <a href="https://calvarychapelesp.com/" target="_blank" rel="noopener noreferrer" className="inline-block relative w-24 h-6">
            <Image
              src={img("/contenido/png/calvarychapelcomblanco.png")}
              alt="Calvary Chapel"
              fill
              className="object-contain object-right"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
