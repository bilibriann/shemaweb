import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...entradas: ClassValue[]): string {
  return twMerge(clsx(entradas));
}

export function formatearFechaChile(fechaISO: string): string {
  return new Date(fechaISO + 'T00:00:00').toLocaleDateString('es-CL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Santiago',
  });
}

export function formatearFechaCorta(fechaISO: string): string {
  return new Date(fechaISO + 'T00:00:00').toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'America/Santiago',
  });
}

export function formatearHora(hora: string): string {
  const [horas, minutos] = hora.split(':');
  const h = parseInt(horas, 10);
  const sufijo = h >= 12 ? 'PM' : 'AM';
  return `${horas}:${minutos} ${sufijo}`;
}

export function truncarTexto(texto: string, limite: number): string {
  if (texto.length <= limite) return texto;
  return texto.slice(0, limite).trimEnd() + '…';
}

export function obtenerMesAnio(fechaISO: string): { mes: string; anio: string; dia: string } {
  const fecha = new Date(fechaISO + 'T00:00:00');
  return {
    dia: fecha.toLocaleDateString('es-CL', { day: '2-digit', timeZone: 'America/Santiago' }),
    mes: fecha.toLocaleDateString('es-CL', { month: 'short', timeZone: 'America/Santiago' }).toUpperCase(),
    anio: fecha.toLocaleDateString('es-CL', { year: 'numeric', timeZone: 'America/Santiago' }),
  };
}
