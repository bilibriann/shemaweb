import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { ContenedorSeccion } from '@/componentes/ui/ContenedorSeccion';
import { FormularioContacto } from '@/componentes/formularios/FormularioContacto';
import { AnimarAlVer } from '@/componentes/ui/AnimarAlVer';
import { CONFIGURACION_SITIO } from '@/lib/constantes/sitio';

export const metadata: Metadata = {
  title: 'Contacto',
  description: `Contáctate con ${CONFIGURACION_SITIO.nombre}. Estamos aquí para ayudarte y responder tus preguntas.`,
};

const mediosContacto = [
  {
    icono: MapPin,
    titulo: 'Dirección',
    contenido: `${CONFIGURACION_SITIO.direccion.calle}\n${CONFIGURACION_SITIO.direccion.ciudad}, ${CONFIGURACION_SITIO.direccion.region}`,
    tipo: 'texto',
  },
  {
    icono: Phone,
    titulo: 'Teléfono',
    contenido: CONFIGURACION_SITIO.telefono,
    href: `tel:${CONFIGURACION_SITIO.telefono.replace(/\s/g, '')}`,
    tipo: 'enlace',
  },
  {
    icono: Mail,
    titulo: 'Correo electrónico',
    contenido: CONFIGURACION_SITIO.email,
    href: `mailto:${CONFIGURACION_SITIO.email}`,
    tipo: 'enlace',
  },
  {
    icono: Clock,
    titulo: 'Horarios',
    contenido: 'Dom: 10:30 AM\nMié: 19:30 PM',
    tipo: 'texto',
  },
];

export default function PaginaContacto() {
  return (
    <>
      <div className="gradient-primario pt-20 pb-4 text-white">
        <div className="contenedor">
          <span className="text-acento mb-2 block text-sm font-bold tracking-widest uppercase">
            Comunícate
          </span>
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">Contacto</h1>
          <p className="max-w-xl text-base text-white/75">
            Estamos aquí para escucharte. Escríbenos y te responderemos a la brevedad.
          </p>
        </div>
      </div>

      <ContenedorSeccion fondo="suave">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Formulario */}
          <AnimarAlVer variante="izquierda" className="lg:col-span-2">
            <div className="sombra-media border-borde rounded-2xl border bg-white p-8">
              <h2 className="text-texto mb-1 text-2xl font-bold">Envíanos un mensaje</h2>
              <p className="text-texto-suave mb-8">
                Completa el formulario y te responderemos en menos de 24 horas.
              </p>
              <FormularioContacto />
            </div>
          </AnimarAlVer>

          {/* Información de contacto */}
          <AnimarAlVer variante="derecha" retraso={100}>
            <div className="space-y-4">
              {mediosContacto.map(({ icono: Icono, titulo, contenido, href, tipo }) => (
                <div
                  key={titulo}
                  className="sombra-suave border-borde rounded-xl border bg-white p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-primario-muy-claro text-primario flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                      <Icono size={18} />
                    </div>
                    <div>
                      <p className="text-texto mb-0.5 text-sm font-semibold">{titulo}</p>
                      {tipo === 'enlace' && href ? (
                        <a
                          href={href}
                          className="text-texto-suave hover:text-primario text-sm whitespace-pre-line transition-colors"
                        >
                          {contenido}
                        </a>
                      ) : (
                        <p className="text-texto-suave text-sm whitespace-pre-line">{contenido}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Redes sociales */}
              <div className="sombra-suave border-borde rounded-xl border bg-white p-5">
                <p className="text-texto mb-4 text-sm font-semibold">Síguenos en redes</p>
                <div className="flex gap-3">
                  {[
                    {
                      label: 'Instagram',
                      href: CONFIGURACION_SITIO.redesSociales.instagram,
                      ruta: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
                    },
                    {
                      label: 'Facebook',
                      href: CONFIGURACION_SITIO.redesSociales.facebook,
                      ruta: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
                    },
                    {
                      label: 'YouTube',
                      href: CONFIGURACION_SITIO.redesSociales.youtube,
                      ruta: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
                    },
                  ].map(({ label, href, ruta }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="bg-primario-muy-claro text-primario hover:bg-primario flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:text-white"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d={ruta} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimarAlVer>
        </div>
      </ContenedorSeccion>
    </>
  );
}
