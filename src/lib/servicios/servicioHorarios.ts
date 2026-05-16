import type { HorarioCulto } from '@/lib/tipos/type';
import datosHorarios from '@/lib/contenido/horarios.json';

const horarios = datosHorarios as HorarioCulto[];

export function obtenerHorarios(): HorarioCulto[] {
  return horarios.sort((a, b) => a.orden - b.orden);
}
