import type { Metadata } from 'next';
import { MapPin, Clock, Calendar } from 'lucide-react';
import { ContenedorSeccion, EncabezadoSeccion } from '@/componentes/ui/ContenedorSeccion';
import { Insignia } from '@/componentes/ui/Insignia';
import { AnimarAlVer } from '@/componentes/ui/AnimarAlVer';
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
      <div className="gradient-primario pt-20 pb-4 text-white">
        <div className="contenedor">
          <span className="text-acento mb-2 block text-sm font-bold tracking-widest uppercase">
            Agenda
          </span>
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">Eventos</h1>
          <p className="max-w-xl text-base text-white/75">Únete a nuestra agenda de actividades.</p>
          <div className="mt-3 flex items-center gap-2 text-sm text-white/60">
            <Calendar size={14} className="text-acento" />
            {eventosProximos.length} eventos próximos
          </div>
        </div>
      </div>

      {/* Eventos destacados */}
      {eventosDestacados.length > 0 && (
        <ContenedorSeccion fondo="suave">
          <EncabezadoSeccion etiqueta="No te los pierdas">Eventos Destacados</EncabezadoSeccion>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {eventosDestacados.map((evento, indice) => (
              <AnimarAlVer key={evento.id} retraso={indice * 100}>
              <article
                className="tarjeta-interactiva sombra-media border-borde overflow-hidden rounded-2xl border bg-white"
              >
                <div className="gradient-primario p-6">
                  <Insignia variante="acento" className="mb-3">
                    {ETIQUETAS_CATEGORIA_EVENTO[evento.categoria]}
                  </Insignia>
                  <h2 className="text-xl leading-tight font-bold text-white">{evento.titulo}</h2>
                  {evento.gancho && (
                    <p className="mt-2 text-sm italic text-white/80">{evento.gancho}</p>
                  )}
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
              </AnimarAlVer>
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
