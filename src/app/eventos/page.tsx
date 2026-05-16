import type { Metadata } from 'next';
import { MapPin, Clock, Calendar } from 'lucide-react';
import { ContenedorSeccion, EncabezadoSeccion } from '@/componentes/ui/ContenedorSeccion';
import { Insignia } from '@/componentes/ui/Insignia';
import { CONFIGURACION_SITIO, ETIQUETAS_CATEGORIA_EVENTO } from '@/lib/constantes/sitio';
import { obtenerEventos, obtenerEventoProximos } from '@/lib/servicios/servicioEventos';
import { formatearFechaChile, formatearHora } from '@/lib/utilidades/utilidades';

export const metadata: Metadata = {
  title: 'Eventos',
  description: `Agenda de eventos y actividades de ${CONFIGURACION_SITIO.nombre}. Retiros, conferencias, cultos especiales y más.`,
};

export default function PaginaEventos() {
  const todosLosEventos = obtenerEventos();
  const eventosProximos = obtenerEventoProximos();
  const eventosDestacados = eventosProximos.filter((e) => e.destacado);
  const eventosRegulares = eventosProximos.filter((e) => !e.destacado);

  return (
    <>
      <div className="gradient-primario pt-32 pb-20 text-white">
        <div className="contenedor">
          <span className="text-acento mb-3 block text-sm font-bold tracking-widest uppercase">
            Agenda
          </span>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Eventos</h1>
          <p className="max-w-xl text-lg text-white/75">Únete a nuestra agenda de actividades.</p>
          <div className="mt-6 flex items-center gap-2 text-sm text-white/60">
            <Calendar size={14} className="text-acento" />
            {eventosProximos.length} eventos próximos
          </div>
        </div>
      </div>

      {/* Eventos destacados */}
      {eventosDestacados.length > 0 && (
        <ContenedorSeccion fondo="suave">
          <EncabezadoSeccion etiqueta="No te los pierdas">Eventos Destacados</EncabezadoSeccion>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {eventosDestacados.map((evento) => (
              <article
                key={evento.id}
                className="tarjeta-interactiva sombra-media border-borde overflow-hidden rounded-2xl border bg-white"
              >
                <div className="gradient-primario p-6">
                  <Insignia variante="acento" className="mb-3">
                    {ETIQUETAS_CATEGORIA_EVENTO[evento.categoria]}
                  </Insignia>
                  <h2 className="text-xl leading-tight font-bold text-white">{evento.titulo}</h2>
                </div>
                <div className="p-6">
                  <p className="text-texto-suave mb-4 text-sm leading-relaxed">
                    {evento.descripcion}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="text-texto flex items-center gap-2">
                      <Clock size={14} className="text-acento shrink-0" />
                      <span>
                        {formatearFechaChile(evento.fecha)} — {formatearHora(evento.hora)}
                      </span>
                    </div>
                    <div className="text-texto-suave flex items-center gap-2">
                      <MapPin size={14} className="text-acento shrink-0" />
                      <span>{evento.lugar}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </ContenedorSeccion>
      )}

      {/* Todos los eventos */}
      {eventosRegulares.length > 0 && (
        <ContenedorSeccion fondo="blanco">
          <EncabezadoSeccion etiqueta="Programación">Más actividades</EncabezadoSeccion>
          <div className="space-y-4">
            {eventosRegulares.map((evento) => (
              <article
                key={evento.id}
                className="item-interactivo bg-fondo-suave border-borde hover:sombra-suave flex flex-col gap-5 rounded-xl border p-5 sm:flex-row"
              >
                <div className="shrink-0 text-center sm:text-left">
                  <Insignia variante="primario">
                    {ETIQUETAS_CATEGORIA_EVENTO[evento.categoria]}
                  </Insignia>
                </div>
                <div className="flex-1">
                  <h3 className="text-texto mb-1 font-bold">{evento.titulo}</h3>
                  <p className="text-texto-suave mb-2 text-sm">{evento.descripcion}</p>
                  <div className="text-texto-suave flex flex-wrap gap-4 text-xs">
                    <span className="flex items-center gap-1">
                      <Clock size={11} className="text-acento" />
                      {formatearFechaChile(evento.fecha)} — {formatearHora(evento.hora)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} className="text-acento" />
                      {evento.lugar}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </ContenedorSeccion>
      )}

      {todosLosEventos.length === 0 && (
        <ContenedorSeccion fondo="blanco">
          <div className="py-12 text-center">
            <p className="text-texto-suave text-lg">No hay eventos programados por el momento.</p>
            <p className="text-texto-muy-suave mt-2 text-sm">
              ¡Vuelve pronto para ver la nueva agenda!
            </p>
          </div>
        </ContenedorSeccion>
      )}
    </>
  );
}
