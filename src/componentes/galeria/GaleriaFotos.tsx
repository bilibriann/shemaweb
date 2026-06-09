'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface Foto {
  src: string;
  alt: string;
  vertical?: boolean;
}

interface Props {
  fotos: Foto[];
}

// Celda para fotos verticales: angosta y alta, calza con su proporción de retrato.
const CELDA_VERTICAL = { col: 1, row: 2 };

// Celdas para fotos horizontales: varían entre anchas y cuadradas.
const PATRON_HORIZONTAL: { col: number; row: number }[] = [
  { col: 2, row: 2 },
  { col: 1, row: 1 },
  { col: 1, row: 1 },
  { col: 2, row: 1 },
  { col: 1, row: 1 },
  { col: 2, row: 2 },
  { col: 1, row: 1 },
  { col: 2, row: 1 },
];

const FOTOS_POR_PAGINA = 12;

const transicionModal = {
  type: 'spring' as const,
  bounce: 0,
  duration: 0.52,
};

export function GaleriaFotos({ fotos }: Props) {
  const [modal, setModal] = useState<{ origen: number; actual: number } | null>(null);
  const [pagina, setPagina] = useState(0);
  const punteroX = useRef<number | null>(null);

  const totalPaginas = Math.ceil(fotos.length / FOTOS_POR_PAGINA);
  const inicio = pagina * FOTOS_POR_PAGINA;
  const fotosEnPagina = fotos.slice(inicio, inicio + FOTOS_POR_PAGINA);

  // Asigna celda según orientación: las verticales van en celdas altas y angostas
  // que respetan su proporción de retrato; las horizontales rotan un patrón bento.
  const celdasEnPagina = (() => {
    let indiceHorizontal = 0;
    return fotosEnPagina.map((foto) =>
      foto.vertical
        ? CELDA_VERTICAL
        : PATRON_HORIZONTAL[indiceHorizontal++ % PATRON_HORIZONTAL.length],
    );
  })();

  const abrir = useCallback((globalIdx: number) => setModal({ origen: globalIdx, actual: globalIdx }), []);
  const cerrar = useCallback(() => setModal(null), []);

  const siguiente = useCallback(
    () => setModal(m => (m ? { ...m, actual: (m.actual + 1) % fotos.length } : m)),
    [fotos.length],
  );
  const anterior = useCallback(
    () => setModal(m => (m ? { ...m, actual: (m.actual - 1 + fotos.length) % fotos.length } : m)),
    [fotos.length],
  );

  // Teclado
  useEffect(() => {
    if (!modal) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cerrar();
      else if (e.key === 'ArrowRight') siguiente();
      else if (e.key === 'ArrowLeft') anterior();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [modal, cerrar, siguiente, anterior]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [!!modal]);

  return (
    <MotionConfig transition={transicionModal}>

      {/* ── Grid bento con transición de página ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pagina}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
        >
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3"
            style={{ gridAutoRows: '180px', gridAutoFlow: 'dense' }}
          >
            {fotosEnPagina.map((foto, localIdx) => {
              const globalIdx = inicio + localIdx;
              const { col, row } = celdasEnPagina[localIdx];
              const esOrigen = modal?.origen === globalIdx;

              return (
                <motion.div
                  key={foto.src}
                  layoutId={`foto-${globalIdx}`}
                  className="relative overflow-hidden rounded-xl cursor-pointer group"
                  style={{
                    gridColumn: `span ${col}`,
                    gridRow: `span ${row}`,
                    opacity: esOrigen ? 0 : 1,
                  }}
                  onClick={() => abrir(globalIdx)}
                  whileHover={{ scale: 1.025, y: -3, zIndex: 2 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    fill
                    className="object-cover transition-[transform,filter] duration-700 will-change-transform group-hover:scale-[1.07] group-hover:brightness-110"
                    sizes={
                      col === 2
                        ? '(max-width: 768px) 100vw, 50vw'
                        : '(max-width: 768px) 50vw, 25vw'
                    }
                    loading={localIdx < 8 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors duration-300 rounded-xl" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                      <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 text-white" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 3h4M3 3v4M13 3h-4M13 3v4M3 13h4M3 13v-4M13 13h-4M13 13v-4" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Navegación de páginas ── */}
      {totalPaginas > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPagina(p => p - 1)}
            disabled={pagina === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white border border-white/15 transition-all hover:bg-white/25 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Página anterior"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPaginas }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPagina(i)}
                aria-label={`Página ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === pagina
                    ? 'w-6 h-2 bg-acento'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/55'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setPagina(p => p + 1)}
            disabled={pagina === totalPaginas - 1}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white border border-white/15 transition-all hover:bg-white/25 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Página siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* ── Visor — imagen grande, galería desenfocada detrás ── */}
      <AnimatePresence>
        {modal !== null && (
          <>
            {/* Overlay: oscurece y desenfoca la galería de fondo */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[60]"
              style={{
                background: 'rgba(0,0,0,0.38)',
                backdropFilter: 'blur(10px) brightness(0.82)',
                WebkitBackdropFilter: 'blur(10px) brightness(0.82)' as never,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={cerrar}
            />

            {/* Contenedor de centrado — no intercepta clicks */}
            <div className="fixed inset-0 z-[61] flex items-center justify-center pointer-events-none">
              {/* Shared element: crece desde la miniatura hasta ocupar ~85% de pantalla */}
              <motion.div
                layoutId={`foto-${modal.origen}`}
                className="pointer-events-auto relative overflow-hidden"
                style={{
                  width: 'min(88vw, 1400px)',
                  height: 'min(85vh, 900px)',
                  borderRadius: 14,
                  background: 'rgba(0,0,0,0.08)',
                  boxShadow:
                    '0 32px 100px rgba(0,0,0,0.6), 0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05)',
                }}
                onPointerDown={(e) => { punteroX.current = e.clientX; }}
                onPointerUp={(e) => {
                  if (punteroX.current === null) return;
                  const dx = e.clientX - punteroX.current;
                  punteroX.current = null;
                  if (Math.abs(dx) > 55) dx < 0 ? siguiente() : anterior();
                }}
              >
                {/* Imagen — crossfade al navegar */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={modal.actual}
                    className="absolute inset-0 will-change-transform"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.14, ease: 'easeInOut' }}
                  >
                    <Image
                      src={fotos[modal.actual].src}
                      alt={fotos[modal.actual].alt}
                      fill
                      className="object-contain"
                      sizes="min(88vw, 1400px)"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Controles — emergen después de la transición de apertura */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.28 }}
                >
                  {/* Cerrar */}
                  <button
                    onClick={cerrar}
                    className="pointer-events-auto absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/90 backdrop-blur-sm border border-white/10 transition-all hover:bg-white hover:text-black"
                    aria-label="Cerrar visor"
                  >
                    <X size={16} />
                  </button>

                  {/* Anterior */}
                  <button
                    onClick={anterior}
                    className="pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white/90 backdrop-blur-sm border border-white/10 transition-all hover:bg-white hover:text-black"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft size={22} />
                  </button>

                  {/* Siguiente */}
                  <button
                    onClick={siguiente}
                    className="pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white/90 backdrop-blur-sm border border-white/10 transition-all hover:bg-white hover:text-black"
                    aria-label="Foto siguiente"
                  >
                    <ChevronRight size={22} />
                  </button>

                  {/* Contador */}
                  <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-xs font-medium text-white/60 tracking-widest tabular-nums">
                    {modal.actual + 1} / {fotos.length}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
