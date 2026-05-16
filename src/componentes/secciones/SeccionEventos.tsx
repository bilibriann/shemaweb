import Link from 'next/link';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { ContenedorSeccion, EncabezadoSeccion } from '@/componentes/ui/ContenedorSeccion';
import { Insignia } from '@/componentes/ui/Insignia';
import { obtenerMesAnio, formatearHora } from '@/lib/utilidades/utilidades';
import { ETIQUETAS_CATEGORIA_EVENTO } from '@/lib/constantes/sitio';
import type { Evento } from '@/lib/tipos/type';

interface PropiedadesSeccionEventos {
  eventos: Evento[];
}

export function SeccionEventos({ eventos }: PropiedadesSeccionEventos) {
  return (
    <ContenedorSeccion fondo="acento" id="eventos">
      <EncabezadoSeccion centrado etiqueta="Agenda" subtitulo="Únete a nuestras actividades.">
        Próximos Eventos
      </EncabezadoSeccion>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {eventos.map((evento) => {
          const { dia, mes } = obtenerMesAnio(evento.fecha);

          return (
            <article
              key={evento.id}
              className="tarjeta-interactiva sombra-media border-borde/50 overflow-hidden rounded-xl border bg-white"
            >
              <div className="flex">
                {/* Fecha lateral */}
                <div className="gradient-primario flex min-w-[80px] flex-col items-center justify-center px-5 py-6 text-white">
                  <span className="text-3xl leading-none font-bold">{dia}</span>
                  <span className="text-acento-claro mt-1 text-xs font-semibold tracking-widest">
                    {mes}
                  </span>
                </div>

                {/* Contenido */}
                <div className="min-w-0 flex-1 p-5">
                  <div className="mb-2">
                    <Insignia variante="primario">
                      {ETIQUETAS_CATEGORIA_EVENTO[evento.categoria] || evento.categoria}
                    </Insignia>
                  </div>
                  <h3 className="text-texto mb-3 text-base leading-tight font-bold">
                    {evento.titulo}
                  </h3>
                  <div className="text-texto-suave space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} className="text-acento shrink-0" />
                      <span>{formatearHora(evento.hora)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-acento shrink-0" />
                      <span className="line-clamp-1">{evento.lugar}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Link href="/eventos">
          <button className="bg-primario hover:bg-primario-oscuro inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-semibold text-white transition-colors">
            Ver todos los eventos
            <ArrowRight size={18} />
          </button>
        </Link>
      </div>
    </ContenedorSeccion>
  );
}
