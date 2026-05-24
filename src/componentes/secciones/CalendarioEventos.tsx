'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Clock, MapPin, X } from 'lucide-react';
import type { Evento } from '@/lib/tipos/type';
import { useGruposDia, type GrupoDia } from '@/lib/hooks/useGruposDia';
import { formatearHora } from '@/lib/utilidades/utilidades';
import { AnimarAlVer } from '@/componentes/ui/AnimarAlVer';

interface Props {
  eventos: Evento[];
}


function IconoCalendario({ dia }: { dia: number }) {
  return (
    <svg
      viewBox="0 0 56 60"
      className="h-20 w-20 text-primario"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="2" y="8" width="52" height="50" rx="7" fill="white" stroke="currentColor" strokeWidth="2.5" />
      <rect x="2" y="8" width="52" height="18" rx="7" fill="currentColor" />
      <rect x="2" y="18" width="52" height="8" fill="currentColor" />
      <rect x="14" y="1" width="6" height="15" rx="3" fill="currentColor" />
      <rect x="36" y="1" width="6" height="15" rx="3" fill="currentColor" />
      <text
        x="28"
        y="42"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="22"
        fontWeight="bold"
        fill="currentColor"
        fontFamily="system-ui, sans-serif"
      >
        {dia}
      </text>
    </svg>
  );
}

interface PropsTarjetaDia {
  grupo: GrupoDia;
  onAbrir: () => void;
}

function TarjetaDia({ grupo, onAbrir }: PropsTarjetaDia) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onAbrir}
      onKeyDown={(e) => e.key === 'Enter' && onAbrir()}
      className="flex cursor-pointer flex-col items-center rounded-2xl bg-white px-6 py-7 shadow-lg transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primario"
    >
      <span className="text-primario text-xl font-semibold tracking-wide">
        {grupo.nombreMes}
      </span>

      <div className="mt-4">
        <IconoCalendario dia={grupo.dia} />
      </div>

      <span className="mt-3 text-sm font-medium text-gray-500">
        {grupo.nombreDia}
      </span>

      <div className="my-5 h-px w-11/12 bg-gray-100" />

      <div className="w-full space-y-4 text-center">
        {grupo.eventos.map((evento) => (
          <div key={evento.id}>
            {evento.gancho && (
              <p className="text-primario-claro mb-1 text-xs italic leading-snug">
                {evento.gancho}
              </p>
            )}
            <p className="text-sm font-semibold leading-snug text-gray-800">
              {evento.titulo}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-gray-400">
              {formatearHora(evento.hora)} · {evento.lugar}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface PropsModal {
  grupo: GrupoDia;
  estaAbierto: boolean;
  onCerrar: () => void;
}

function ModalEvento({ grupo, estaAbierto, onCerrar }: PropsModal) {
  useEffect(() => {
    if (!estaAbierto) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCerrar();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [estaAbierto, onCerrar]);

  useEffect(() => {
    document.body.style.overflow = estaAbierto ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [estaAbierto]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-hidden={!estaAbierto}
      className={`fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center transition-opacity duration-300 ${
        estaAbierto ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Fondo oscuro */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={onCerrar}
      />

      {/* Ventana del modal */}
      <div
        className={`relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-gray-900/90 backdrop-blur-xl shadow-[0_32px_64px_rgba(0,0,0,0.6)] transition-all duration-[420ms] ease-out ${
          estaAbierto
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-5'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-white/10">
          <div className="flex items-end gap-4">
            <p className="text-6xl font-bold text-white leading-none">{grupo.dia}</p>
            <div className="pb-1">
              <p className="text-acento text-xs font-bold tracking-widest uppercase">
                {grupo.nombreMes}
              </p>
              <p className="text-white/50 text-sm font-medium">{grupo.nombreDia}</p>
            </div>
          </div>
          <button
            onClick={onCerrar}
            className="rounded-full bg-white/10 p-2 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Lista de eventos */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-white/8">
          {grupo.eventos.map((evento) => (
            <div key={evento.id} className="px-6 py-5">
              {evento.gancho && (
                <p className="text-acento mb-1.5 text-xs italic opacity-80">
                  {evento.gancho}
                </p>
              )}
              <h3 className="text-white text-base font-bold leading-snug">
                {evento.titulo}
              </h3>
              <div className="mt-2.5 flex flex-wrap gap-4 text-xs text-white/45">
                <span className="flex items-center gap-1.5">
                  <Clock size={11} className="text-acento" />
                  {formatearHora(evento.hora)}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={11} className="text-acento" />
                  {evento.lugar}
                </span>
              </div>
              {evento.descripcion && (
                <p className="mt-3 text-sm leading-relaxed text-white/40">
                  {evento.descripcion}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CalendarioEventos({ eventos }: Props) {
  const [montado, setMontado] = useState(false);
  const [grupoModal, setGrupoModal] = useState<GrupoDia | null>(null);
  const [estaAbierto, setEstaAbierto] = useState(false);
  const grupoRef = useRef<GrupoDia | null>(null);

  useEffect(() => {
    setMontado(true);
  }, []);

  const abrirModal = useCallback((grupo: GrupoDia) => {
    grupoRef.current = grupo;
    setGrupoModal(grupo);
    setEstaAbierto(true);
  }, []);

  const cerrarModal = useCallback(() => {
    setEstaAbierto(false);
    setTimeout(() => setGrupoModal(null), 420);
  }, []);

  const grupos = useGruposDia(eventos, null);

  const grupoVisible = grupoModal ?? grupoRef.current;

  if (!montado) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-64 animate-pulse rounded-2xl bg-white/20" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div>
        {/* Tarjetas con aparición escalonada */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {grupos.map((grupo, indice) => (
            <AnimarAlVer key={grupo.fecha} retraso={indice * 150}>
              <TarjetaDia grupo={grupo} onAbrir={() => abrirModal(grupo)} />
            </AnimarAlVer>
          ))}
        </div>
      </div>

      {/* Modal — siempre en DOM, anima entrada/salida */}
      {grupoVisible && (
        <ModalEvento
          grupo={grupoVisible}
          estaAbierto={estaAbierto}
          onCerrar={cerrarModal}
        />
      )}
    </>
  );
}
