'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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

function TarjetaDia({ grupo }: { grupo: GrupoDia }) {
  // Enlaza al evento exacto en la página de eventos.
  const destino = `/eventos/#evento-${grupo.eventos[0].id}`;

  return (
    <Link
      href={destino}
      aria-label={`Ver detalle de ${grupo.eventos.map((e) => e.titulo).join(', ')} en la página de eventos`}
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
    </Link>
  );
}

export function CalendarioEventos({ eventos }: Props) {
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setMontado(true);
  }, []);

  const grupos = useGruposDia(eventos, null);

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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {grupos.map((grupo, indice) => (
        <AnimarAlVer key={grupo.fecha} retraso={indice * 150}>
          <TarjetaDia grupo={grupo} />
        </AnimarAlVer>
      ))}
    </div>
  );
}
