import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ContenedorSeccion, EncabezadoSeccion } from '@/componentes/ui/ContenedorSeccion';
import { CalendarioEventos } from '@/componentes/secciones/CalendarioEventos';
import { AnimarAlVer } from '@/componentes/ui/AnimarAlVer';
import type { Evento } from '@/lib/tipos/type';

interface PropiedadesSeccionEventos {
  eventos: Evento[];
}

export function SeccionEventos({ eventos }: PropiedadesSeccionEventos) {
  return (
    <ContenedorSeccion fondo="acento" id="eventos">
      <AnimarAlVer>
        <EncabezadoSeccion centrado etiqueta="Agenda" subtitulo="Únete a nuestras actividades.">
          Próximos Eventos
        </EncabezadoSeccion>
      </AnimarAlVer>

      <AnimarAlVer retraso={120}>
        <CalendarioEventos eventos={eventos} />
      </AnimarAlVer>

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
