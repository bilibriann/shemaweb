import { useMemo } from 'react';
import type { Evento, CategoriaEvento } from '@/lib/tipos/type';

const NOMBRES_MES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const NOMBRES_DIA = [
  'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado',
];

export interface GrupoDia {
  fecha: string;
  dia: number;
  nombreMes: string;
  nombreDia: string;
  eventos: Evento[];
}

export function useGruposDia(
  eventos: Evento[],
  categoriaFiltro: CategoriaEvento | null,
): GrupoDia[] {
  return useMemo(() => {
    const filtrados = categoriaFiltro
      ? eventos.filter((e) => e.categoria === categoriaFiltro)
      : eventos;

    const mapa = new Map<string, GrupoDia>();

    filtrados.forEach((evento) => {
      if (!mapa.has(evento.fecha)) {
        const fecha = new Date(`${evento.fecha}T00:00:00`);
        mapa.set(evento.fecha, {
          fecha: evento.fecha,
          dia: fecha.getDate(),
          nombreMes: NOMBRES_MES[fecha.getMonth()],
          nombreDia: NOMBRES_DIA[fecha.getDay()],
          eventos: [],
        });
      }
      mapa.get(evento.fecha)!.eventos.push(evento);
    });

    return Array.from(mapa.values()).sort((a, b) =>
      a.fecha.localeCompare(b.fecha),
    );
  }, [eventos, categoriaFiltro]);
}
