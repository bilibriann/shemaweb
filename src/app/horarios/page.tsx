import type { Metadata } from 'next';
import { MapPin, Phone, Mail } from 'lucide-react';
import { AnimarAlVer } from '@/componentes/ui/AnimarAlVer';
import { TarjetaHorarios } from '@/componentes/ui/TarjetaHorarios';
import { obtenerHorarios } from '@/lib/servicios/servicioHorarios';
import { CONFIGURACION_SITIO } from '@/lib/constantes/sitio';
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

      {/* Contenido principal */}
      <div className="pt-24 pb-14 md:pb-20">
        <div className="contenedor">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

            {/* Columna cultos */}
            <AnimarAlVer variante="izquierda">
              <div>
                <div className="mb-6">
                  <span className="text-acento mb-3 block text-sm font-bold tracking-widest uppercase">
                    Programación semanal
                  </span>
                  <h2 className="linea-decorativa text-3xl font-bold text-white md:text-4xl">
                    Nuestros cultos
                  </h2>
                </div>

                <TarjetaHorarios horarios={horarios} variante="claro" mostrarEnlace={false} />
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

            </div>
            </AnimarAlVer>

          </div>
        </div>
      </div>
    </>
  );
}
