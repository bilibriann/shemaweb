import fs from 'node:fs';
import path from 'node:path';
import { img } from '@/lib/utilidades/rutas';

export interface FotoGaleria {
  src: string;
  alt: string;
  vertical: boolean;
}

// Lee el ancho/alto de un JPEG recorriendo sus marcadores (SOF) — sin dependencias.
function dimensionesJpeg(buf: Buffer): { ancho: number; alto: number } | null {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null;

  let offset = 2;
  while (offset + 9 < buf.length) {
    if (buf[offset] !== 0xff) {
      offset++;
      continue;
    }
    let marcador = buf[offset + 1];
    // Saltar bytes de relleno 0xFF consecutivos.
    while (marcador === 0xff && offset + 1 < buf.length) {
      offset++;
      marcador = buf[offset + 1];
    }
    // Marcadores sin payload (SOI, EOI, RSTn, TEM).
    if (marcador === 0xd8 || marcador === 0xd9 || (marcador >= 0xd0 && marcador <= 0xd7) || marcador === 0x01) {
      offset += 2;
      continue;
    }
    // Marcadores SOF (contienen las dimensiones), excepto los que no lo son (DHT/DAC/DNL).
    if (marcador >= 0xc0 && marcador <= 0xcf && marcador !== 0xc4 && marcador !== 0xc8 && marcador !== 0xcc) {
      const alto = buf.readUInt16BE(offset + 5);
      const ancho = buf.readUInt16BE(offset + 7);
      return { ancho, alto };
    }
    const longitud = buf.readUInt16BE(offset + 2);
    if (longitud < 2) break;
    offset += 2 + longitud;
  }
  return null;
}

/**
 * Lee todas las imágenes de una carpeta dentro de /public y devuelve sus datos.
 * Se ejecuta en tiempo de compilación (export estático): al agregar o quitar
 * fotos de la carpeta, la galería se ajusta sola sin tocar el código.
 */
export function obtenerFotosAlbum(carpeta: string, etiqueta: string): FotoGaleria[] {
  const dir = path.join(process.cwd(), 'public', carpeta);

  let archivos: string[];
  try {
    archivos = fs
      .readdirSync(dir)
      .filter((nombre) => /\.(jpe?g|png|webp)$/i.test(nombre))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    return [];
  }

  return archivos.map((nombre, i) => {
    let vertical = false;
    if (/\.jpe?g$/i.test(nombre)) {
      try {
        const dims = dimensionesJpeg(fs.readFileSync(path.join(dir, nombre)));
        if (dims) vertical = dims.alto > dims.ancho;
      } catch {
        // Si no se pueden leer las dimensiones, se trata como horizontal.
      }
    }
    return {
      src: img(`/${carpeta}/${nombre}`),
      alt: `${etiqueta} — foto ${i + 1}`,
      vertical,
    };
  });
}
