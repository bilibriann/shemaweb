import type { Metadata } from 'next';
import { MapPin, Clock, Calendar, Star } from 'lucide-react';
import { Insignia } from '@/componentes/ui/Insignia';
import { AnimarAlVer } from '@/componentes/ui/AnimarAlVer';
import { CONFIGURACION_SITIO, ETIQUETAS_CATEGORIA_EVENTO } from '@/lib/constantes/sitio';
import { obtenerEventos, obtenerEventoProximos } from '@/lib/servicios/servicioEventos';
import { formatearFechaChile, formatearHora } from '@/lib/utilidades/utilidades';

export const metadata: Metadata = {
  title: 'Eventos',
  description: `Agenda de eventos y actividades de ${CONFIGURACION_SITIO.nombre}. Retiros, conferencias, cultos especiales y más.`,
};

const MESES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];

function parsearFecha(fechaStr: string) {
  const [, mes, dia] = fechaStr.split('-');
  return { dia: parseInt(dia, 10), mes: MESES[parseInt(mes, 10) - 1] };
}

export default function PaginaEventos() {
  const todosLosEventos = obtenerEventos();
  const eventosProximos = obtenerEventoProximos();
  const eventosDestacados = eventosProximos.filter((e) => e.destacado);
  return (
    <>
      {/* Hero */}
      <div className="gradient-primario pt-32 pb-12 text-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/5" aria-hidden="true" />
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-acento/10" aria-hidden="true" />
        <div className="contenedor relative z-10">
          <AnimarAlVer>
            <span className="text-acento mb-3 block text-sm font-bold tracking-widest uppercase">
              Agenda
            </span>
            <h1 className="mb-3 text-5xl font-bold md:text-6xl">Eventos</h1>
            <p className="max-w-xl text-lg text-white/75 mb-8">
              Únete a nuestras actividades. Cada encuentro es una oportunidad para crecer en fe y comunidad.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-3">
                <Calendar size={20} className="text-acento" />
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wide">Próximos</p>
                  <p className="text-xl font-bold">{eventosProximos.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-3">
                <Star size={20} className="text-acento" />
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wide">Destacados</p>
                  <p className="text-xl font-bold">{eventosDestacados.length}</p>
                </div>
              </div>
            </div>
          </AnimarAlVer>
        </div>
      </div>

      {/* Eventos destacados */}
      {eventosDestacados.length > 0 && (
        <section className="bg-fondo-suave py-16 md:py-20">
          <div className="contenedor">
            <AnimarAlVer>
              <span className="text-acento mb-3 block text-sm font-bold tracking-widest uppercase">No te los pierdas</span>
              <h2 className="linea-decorativa text-3xl md:text-4xl font-bold text-texto mb-12">Eventos Destacados</h2>
            </AnimarAlVer>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {eventosDestacados.map((evento, indice) => {
                const { dia, mes } = parsearFecha(evento.fecha);
                return (
                  <AnimarAlVer key={evento.id} retraso={indice * 120}>
                    <article className="tarjeta-interactiva sombra-media border-borde overflow-hidden rounded-2xl border bg-white flex flex-col">
                      <div className="gradient-primario p-6 flex items-start gap-5">
                        <div className="shrink-0 bg-white/15 rounded-xl px-4 py-3 text-center min-w-[64px]">
                          <span className="block text-3xl font-bold text-white leading-none">{dia}</span>
                          <span className="block text-xs font-bold text-acento tracking-widest mt-1">{mes}</span>
                        </div>
                        <div className="flex-1">
                          <Insignia variante="acento" className="mb-2">
                            {ETIQUETAS_CATEGORIA_EVENTO[evento.categoria]}
                          </Insignia>
                          <h3 className="text-xl font-bold text-white leading-tight">{evento.titulo}</h3>
                          {evento.gancho && (
                            <p className="mt-1.5 text-sm italic text-white/75">{evento.gancho}</p>
                          )}
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        {evento.descripcion && (
                          <p className="text-texto-suave text-sm leading-relaxed mb-4">{evento.descripcion}</p>
                        )}
                        <div className="space-y-2 text-sm">
                          <div className="text-texto flex items-center gap-2">
                            <Clock size={14} className="text-acento shrink-0" />
                            <span>{formatearFechaChile(evento.fecha)} — {formatearHora(evento.hora)}</span>
                          </div>
                          <div className="text-texto-suave flex items-center gap-2">
                            <MapPin size={14} className="text-acento shrink-0" />
                            <span>{evento.lugar}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </AnimarAlVer>
                );
              })}
            </div>
          </div>
        </section>
      )}


      {todosLosEventos.length === 0 && (
        <section className="bg-fondo-suave py-20">
          <div className="contenedor text-center">
            <Calendar size={48} className="mx-auto mb-4 text-texto-muy-suave" />
            <p className="text-texto-suave text-lg">No hay eventos programados por el momento.</p>
            <p className="text-texto-muy-suave mt-2 text-sm">¡Vuelve pronto para ver la nueva agenda!</p>
          </div>
        </section>
      )}
    </>
  );
}
