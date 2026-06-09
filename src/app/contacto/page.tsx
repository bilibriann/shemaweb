import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, Share2, Play } from 'lucide-react';
import { ContenedorSeccion } from '@/componentes/ui/ContenedorSeccion';
import { FormularioContacto } from '@/componentes/secciones/FormularioContacto';
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
                      icono: Share2,
                      href: CONFIGURACION_SITIO.redesSociales.instagram,
                      label: 'Instagram',
                    },
                    {
                      icono: Share2,
                      href: CONFIGURACION_SITIO.redesSociales.facebook,
                      label: 'Facebook',
                    },
                    {
                      icono: Play,
                      href: CONFIGURACION_SITIO.redesSociales.youtube,
                      label: 'YouTube',
                    },
                  ].map(({ icono: Icono, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="bg-primario-muy-claro text-primario hover:bg-primario flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:text-white"
                    >
                      <Icono size={18} />
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
