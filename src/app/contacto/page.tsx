import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube } from 'lucide-react';
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
          <span className="text-acento text-sm font-bold tracking-widest uppercase mb-2 block">
            Comunícate
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Contacto</h1>
          <p className="text-white/75 text-base max-w-xl">
            Estamos aquí para escucharte. Escríbenos y te responderemos a la brevedad.
          </p>
        </div>
      </div>

      <ContenedorSeccion fondo="suave">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Formulario */}
          <AnimarAlVer variante="izquierda" className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 sombra-media border border-borde">
              <h2 className="text-2xl font-bold text-texto mb-1">Envíanos un mensaje</h2>
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
                className="bg-white rounded-xl p-5 sombra-suave border border-borde"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primario-muy-claro text-primario shrink-0">
                    <Icono size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-texto text-sm mb-0.5">{titulo}</p>
                    {tipo === 'enlace' && href ? (
                      <a
                        href={href}
                        className="text-texto-suave text-sm hover:text-primario transition-colors whitespace-pre-line"
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
            <div className="bg-white rounded-xl p-5 sombra-suave border border-borde">
              <p className="font-semibold text-texto text-sm mb-4">Síguenos en redes</p>
              <div className="flex gap-3">
                {[
                  { icono: Instagram, href: CONFIGURACION_SITIO.redesSociales.instagram, label: 'Instagram' },
                  { icono: Facebook, href: CONFIGURACION_SITIO.redesSociales.facebook, label: 'Facebook' },
                  { icono: Youtube, href: CONFIGURACION_SITIO.redesSociales.youtube, label: 'YouTube' },
                ].map(({ icono: Icono, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-primario-muy-claro text-primario hover:bg-primario hover:text-white transition-all"
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
