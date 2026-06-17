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

export function formatearHora(hora: string): string {
  const [horas, minutos] = hora.split(':');
  const h = parseInt(horas, 10);
  const sufijo = h >= 12 ? 'PM' : 'AM';
  return `${horas}:${minutos} ${sufijo}`;
}
