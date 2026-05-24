import type { Metadata } from 'next';
import { MapPin, Phone, Mail } from 'lucide-react';
import { AnimarAlVer } from '@/componentes/ui/AnimarAlVer';
import { CONFIGURACION_SITIO } from '@/lib/constantes/sitio';
import { obtenerHorarios } from '@/lib/servicios/servicioHorarios';
import { formatearHora } from '@/lib/utilidades/utilidades';
import { FooterTransparente } from '@/componentes/utilidades/FooterTransparente';

export const metadata: Metadata = {
  title: 'Horarios',
  description: `Horarios de cultos y actividades de ${CONFIGURACION_SITIO.nombre}. Domingos y miércoles en Santiago.`,
};

export default function PaginaHorarios() {
  const horarios = obtenerHorarios();

  return (
    <>
      <FooterTransparente />
      {/* Overlay oscuro fijo para legibilidad */}
      <div className="fixed inset-0 -z-10 bg-black/45" />

      {/* Hero con efecto frosted glass */}
      <div className="relative pt-20 pb-4 text-white">
        <div className="absolute inset-0 backdrop-blur-md bg-black/20" aria-hidden="true" />
        <div className="contenedor relative z-10">
          <span className="text-acento mb-2 block text-sm font-bold tracking-widest uppercase">
            Visítanos
          </span>
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">Horarios</h1>
          <p className="max-w-xl text-base text-white/75">
            Te esperamos en cada servicio. Ven con tu familia, con amigos, o solo — todos son
            bienvenidos.
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="py-14 md:py-20">
        <div className="contenedor">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">

            {/* Columna cultos */}
            <AnimarAlVer variante="izquierda" className="lg:col-span-2">
            <div>
              <div className="mb-8">
                <span className="text-acento mb-3 block text-sm font-bold tracking-widest uppercase">
                  Programación semanal
                </span>
                <h2 className="linea-decorativa text-3xl font-bold text-white md:text-4xl">
                  Nuestros cultos
                </h2>
              </div>

              <div className="space-y-6">
                {horarios.map((horario, indice) => (
                  <AnimarAlVer key={horario.dia} retraso={indice * 100}>
                  <div className="tarjeta-interactiva overflow-hidden rounded-2xl shadow-lg">
                    <div className="gradient-primario px-6 py-4">
                      <h2 className="text-lg font-bold text-white">{horario.dia}</h2>
                    </div>
                    <div className="divide-y divide-gray-100 bg-white">
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
                  </AnimarAlVer>
                ))}
              </div>
            </div>
            </AnimarAlVer>

            {/* Columna ubicación */}
            <AnimarAlVer variante="derecha" retraso={150}>
            <div>
              <div className="mb-8">
                <span className="text-acento mb-3 block text-sm font-bold tracking-widest uppercase">
                  Ubicación
                </span>
                <h2 className="linea-decorativa text-3xl font-bold text-white md:text-4xl">
                  Encuéntranos
                </h2>
              </div>

              <div className="space-y-5 rounded-2xl border border-white/20 bg-white/90 p-6 shadow-lg">
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

              <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-5">
                <p className="mb-1 text-sm font-semibold text-white">Mapa próximamente</p>
                <p className="text-xs text-white/60">El mapa interactivo estará disponible pronto.</p>
              </div>
            </div>
            </AnimarAlVer>

          </div>
        </div>
      </div>
    </>
  );
}
