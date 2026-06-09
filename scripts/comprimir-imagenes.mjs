import sharp from 'sharp';
import { readdir, stat, rename } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const CONTENIDO = join(__dirname, '..', 'public', 'contenido');

const EXCLUIR = ['Diseño'];
const EXTENSIONES = ['.jpg', '.jpeg', '.png'];
const MAX_ANCHO = 1920;
const CALIDAD_JPEG = 82;
const CALIDAD_PNG = 85;

async function obtenerImagenes(carpeta) {
  const entradas = await readdir(carpeta, { withFileTypes: true });
  const archivos = [];
  for (const entrada of entradas) {
    const ruta = join(carpeta, entrada.name);
    if (entrada.isDirectory()) {
      archivos.push(...await obtenerImagenes(ruta));
    } else if (EXTENSIONES.includes(extname(entrada.name).toLowerCase())) {
      archivos.push(ruta);
    }
  }
  return archivos;
}

function formatearBytes(bytes) {
  return (bytes / 1024 / 1024).toFixed(1) + ' MB';
}

async function comprimirImagen(ruta) {
  const infoAntes = await stat(ruta);
  const ext = extname(ruta).toLowerCase();
  const tmp = ruta + '.tmp';

  const pipeline = sharp(ruta).resize({ width: MAX_ANCHO, withoutEnlargement: true });

  if (ext === '.png') {
    await pipeline.png({ quality: CALIDAD_PNG, compressionLevel: 9 }).toFile(tmp);
  } else {
    await pipeline.jpeg({ quality: CALIDAD_JPEG, mozjpeg: true }).toFile(tmp);
  }

  const infoDespues = await stat(tmp);
  await rename(tmp, ruta);

  return { antes: infoAntes.size, despues: infoDespues.size };
}

async function main() {
  const carpetas = await readdir(CONTENIDO, { withFileTypes: true });
  const carpetasAlbum = carpetas
    .filter(e => e.isDirectory() && !EXCLUIR.includes(e.name))
    .map(e => join(CONTENIDO, e.name));

  if (carpetasAlbum.length === 0) {
    console.log('No se encontraron álbumes para comprimir.');
    return;
  }

  console.log(`Álbumes a procesar: ${carpetasAlbum.map(c => basename(c)).join(', ')}\n`);

  let totalAntes = 0;
  let totalDespues = 0;
  let totalImagenes = 0;

  for (const carpeta of carpetasAlbum) {
    const imagenes = await obtenerImagenes(carpeta);
    console.log(`📁 ${basename(carpeta)} — ${imagenes.length} imágenes`);

    for (const imagen of imagenes) {
      process.stdout.write(`   ${basename(imagen)}... `);
      const { antes, despues } = await comprimirImagen(imagen);
      totalAntes += antes;
      totalDespues += despues;
      totalImagenes++;
      const ahorro = Math.round((1 - despues / antes) * 100);
      console.log(`${formatearBytes(antes)} → ${formatearBytes(despues)} (-${ahorro}%)`);
    }
    console.log();
  }

  console.log('─'.repeat(50));
  console.log(`Total: ${totalImagenes} imágenes`);
  console.log(`Antes:  ${formatearBytes(totalAntes)}`);
  console.log(`Después: ${formatearBytes(totalDespues)}`);
  console.log(`Ahorro: ${formatearBytes(totalAntes - totalDespues)} (${Math.round((1 - totalDespues / totalAntes) * 100)}%)`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
