import type { Metadata } from 'next';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';
import { EncabezadoSeccion } from '@/componentes/ui/ContenedorSeccion';
import { CONFIGURACION_SITIO } from '@/lib/constantes/sitio';
import { obtenerHorarios } from '@/lib/servicios/servicioHorarios';
import { formatearHora } from '@/lib/utilidades/utilidades';

export const metadata: Metadata = {
  title: 'Horarios',
  description: `Horarios de cultos y actividades de ${CONFIGURACION_SITIO.nombre}. Domingos y miércoles en Santiago.`,
};

export default function PaginaHorarios() {
  const horarios = obtenerHorarios();

  return (
    <>
      <div className="gradient-primario pt-32 pb-20 text-white">
        <div className="contenedor">
          <span className="text-acento mb-3 block text-sm font-bold tracking-widest uppercase">
            Visítanos
          </span>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Horarios</h1>
          <p className="max-w-xl text-lg text-white/75">
            Te esperamos en cada servicio. Ven con tu familia, con amigos, o solo — todos son
            bienvenidos.
          </p>
        </div>
      </div>

      <div className="bg-fondo-suave py-10 md:py-14">
        <div className="contenedor">
          <div className="relative overflow-hidden rounded-3xl shadow-xl">

            {/* Imagen de fondo */}
            <Image
              src="/contenido/png/santiago1.png"
              fill
              alt=""
              aria-hidden="true"
              className="object-cover object-center"
            />
            {/* Overlay para legibilidad */}
            <div className="absolute inset-0 bg-white/75" aria-hidden="true" />

            {/* Contenido */}
            <div className="relative z-10 p-8 md:p-12">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">

                <div className="lg:col-span-2">
                  <EncabezadoSeccion etiqueta="Programación semanal">Nuestros cultos</EncabezadoSeccion>
                  <div className="space-y-6">
                    {horarios.map((horario) => (
                      <div
                        key={horario.dia}
                        className="tarjeta-interactiva border-borde sombra-suave overflow-hidden rounded-2xl border"
                      >
                        <div className="gradient-primario px-6 py-4">
                          <h2 className="text-lg font-bold text-white">{horario.dia}</h2>
                        </div>
                        <div className="divide-borde divide-y bg-white">
                          {horario.servicios.map((servicio, i) => (
                            <div key={i} className="flex items-start gap-4 px-6 py-5">
                              <div className="min-w-[80px]">
                                <span className="text-primario text-lg font-bold">
                                  {formatearHora(servicio.hora)}
                                </span>
                              </div>
                              <div>
                                <p className="text-texto font-semibold">{servicio.tipo}</p>
                                {servicio.descripcion && (
                                  <p className="text-texto-suave mt-1 text-sm leading-relaxed">
                                    {servicio.descripcion}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <EncabezadoSeccion etiqueta="Ubicación">Encuéntranos</EncabezadoSeccion>
                  <div className="bg-white/90 border-borde space-y-5 rounded-2xl border p-6">
                    <div className="flex items-start gap-3">
                      <MapPin size={20} className="text-acento mt-0.5 shrink-0" />
                      <div>
                        <p className="text-texto mb-0.5 text-sm font-semibold">Dirección</p>
                        <p className="text-texto-suave text-sm">
                          {CONFIGURACION_SITIO.direccion.calle}
                          <br />
                          {CONFIGURACION_SITIO.direccion.ciudad}, {CONFIGURACION_SITIO.direccion.region}
                          <br />
                          {CONFIGURACION_SITIO.direccion.pais}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone size={20} className="text-acento mt-0.5 shrink-0" />
                      <div>
                        <p className="text-texto mb-0.5 text-sm font-semibold">Teléfono</p>
                        <a
                          href={`tel:${CONFIGURACION_SITIO.telefono.replace(/\s/g, '')}`}
                          className="text-texto-suave hover:text-primario text-sm transition-colors"
                        >
                          {CONFIGURACION_SITIO.telefono}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail size={20} className="text-acento mt-0.5 shrink-0" />
                      <div>
                        <p className="text-texto mb-0.5 text-sm font-semibold">Correo electrónico</p>
                        <a
                          href={`mailto:${CONFIGURACION_SITIO.email}`}
                          className="text-texto-suave hover:text-primario text-sm transition-colors"
                        >
                          {CONFIGURACION_SITIO.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="bg-acento-muy-claro border-acento/20 mt-6 rounded-2xl border p-5">
                    <p className="text-acento-oscuro mb-1 text-sm font-semibold">📍 Mapa próximamente</p>
                    <p className="text-texto-suave text-xs">El mapa interactivo estará disponible...</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
