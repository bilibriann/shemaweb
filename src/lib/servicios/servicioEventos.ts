import type { Evento } from '@/lib/tipos/type';
import datosEventos from '@/lib/contenido/eventos.json';

const eventos = datosEventos as Evento[];

export function obtenerEventos(): Evento[] {
  return eventos.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
}

export function obtenerEventosDestacados(): Evento[] {
  return eventos.filter((e) => e.destacado);
}

export function obtenerEventoProximos(): Evento[] {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return eventos
    .filter((e) => new Date(e.fecha) >= hoy)
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
}

export function obtenerEventoPorId(id: string): Evento | undefined {
  return eventos.find((e) => e.id === id);
}
