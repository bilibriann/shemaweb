'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ImageIcon } from 'lucide-react';
import { GaleriaFotos, type Foto } from '@/componentes/galeria/GaleriaFotos';

export interface Album {
  slug: string;
  titulo: string;
  categoria: string;
  portada: string;
  fotos: Foto[];
}

interface Props {
  albumes: Album[];
}

export function GaleriaAlbumes({ albumes }: Props) {
  const [seleccionado, setSeleccionado] = useState<string | null>(null);

  const album = albumes.find((a) => a.slug === seleccionado) ?? null;

  return (
    <AnimatePresence mode="wait">
      {album ? (
        <motion.div
          key="album"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Encabezado del álbum */}
          <div className="mb-6 flex items-end justify-between">
            <div>
              <button
                onClick={() => setSeleccionado(null)}
                className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/50 transition-colors hover:text-white"
              >
                <ArrowLeft size={14} />
                Volver a álbumes
              </button>
              <span className="text-acento text-xs font-bold tracking-widest uppercase mb-1 block">
                {album.categoria}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">{album.titulo}</h2>
            </div>
            <span className="text-white/40 text-sm tabular-nums whitespace-nowrap">
              {album.fotos.length} fotos
            </span>
          </div>

          <GaleriaFotos fotos={album.fotos} />
        </motion.div>
      ) : (
        <motion.div
          key="albumes"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {albumes.map((a) => (
            <button
              key={a.slug}
              onClick={() => setSeleccionado(a.slug)}
              className="group relative overflow-hidden rounded-2xl border border-white/10 text-left"
              style={{ aspectRatio: '4 / 3' }}
            >
              <Image
                src={a.portada}
                alt={a.titulo}
                fill
                className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-colors duration-300 group-hover:from-black/85" />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="text-acento text-xs font-bold tracking-widest uppercase mb-1 block">
                  {a.categoria}
                </span>
                <h3 className="text-xl font-bold text-white mb-1">{a.titulo}</h3>
                <span className="inline-flex items-center gap-1.5 text-xs text-white/60 tabular-nums">
                  <ImageIcon size={13} />
                  {a.fotos.length} fotos
                </span>
              </div>
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
