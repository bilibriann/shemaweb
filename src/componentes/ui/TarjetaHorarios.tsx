import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { HorarioCulto } from '@/lib/tipos/type';
import { formatearHora } from '@/lib/utilidades/utilidades';

interface Props {
  horarios: HorarioCulto[];
  variante?: 'claro' | 'oscuro';
  mostrarEnlace?: boolean;
}

export function TarjetaHorarios({ horarios, variante = 'claro', mostrarEnlace = true }: Props) {
  const esOscuro = variante === 'oscuro';

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${
        esOscuro
          ? 'border border-white/12 bg-white/6 backdrop-blur-md'
          : 'border border-slate-100 bg-white'
      }`}
      style={
        esOscuro
          ? undefined
          : { boxShadow: '0 12px 48px rgba(0,77,93,0.09), 0 2px 8px rgba(0,77,93,0.06)' }
      }
    >
      {/* Línea decorativa superior */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-acento/70 to-transparent" />

      {/* Cabecera centrada */}
      <div className="px-8 pb-7 pt-10 text-center">
        {/* Eyebrow */}
        <div className="mb-5 flex items-center justify-center gap-2.5">
          <div className={`h-px w-10 ${esOscuro ? 'bg-acento/30' : 'bg-acento/25'}`} />
          <span
            className={`text-[10px] font-bold tracking-[0.22em] uppercase ${
              esOscuro ? 'text-acento/80' : 'text-acento'
            }`}
          >
            Horarios de culto
          </span>
          <div className={`h-px w-10 ${esOscuro ? 'bg-acento/30' : 'bg-acento/25'}`} />
        </div>

        {/* Título */}
        <h3
          className={`font-display mb-2.5 text-[1.6rem] font-semibold leading-tight tracking-tight ${
            esOscuro ? 'text-white' : 'text-[#0F172A]'
          }`}
        >
          Servicios semanales
        </h3>

        {/* Subtítulo */}
        <p
          className={`text-[0.8rem] leading-relaxed ${
            esOscuro ? 'text-white/45' : 'text-[#64748B]'
          }`}
        >
          Únete a nuestros servicios semanales
        </p>
      </div>

      {/* Divisor */}
      <div
        className={`mx-8 h-px ${esOscuro ? 'bg-white/8' : 'bg-slate-100'}`}
      />

      {/* Filas de horario */}
      <div className="space-y-1.5 px-5 py-5">
        {horarios.map((horario) =>
          horario.servicios.map((servicio, si) => (
            <div
              key={`${horario.dia}-${si}`}
              className={`group flex items-center gap-4 px-4 py-3.5 transition-all duration-200 rounded-xl ${
                esOscuro
                  ? 'bg-white/4 hover:bg-white/9'
                  : 'bg-[#F8FAFC] hover:bg-[#F1F5F9]'
              }`}
              style={{ transitionProperty: 'background-color, box-shadow, transform' }}
            >
              {/* Indicador visual */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  esOscuro
                    ? 'bg-acento/10 ring-1 ring-acento/20'
                    : 'bg-primario/5 ring-1 ring-primario/10'
                }`}
              >
                <div
                  className={`h-1.5 w-1.5 rounded-full ${
                    esOscuro ? 'bg-acento' : 'bg-primario/70'
                  }`}
                />
              </div>

              {/* Día + tipo */}
              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm font-semibold leading-snug ${
                    esOscuro ? 'text-white' : 'text-[#0F172A]'
                  }`}
                >
                  {horario.dia}
                </p>
                <p
                  className={`mt-0.5 truncate text-[11px] leading-snug ${
                    esOscuro ? 'text-white/40' : 'text-[#94A3B8]'
                  }`}
                >
                  {servicio.tipo}
                </p>
              </div>

              {/* Hora */}
              <span
                className={`font-display shrink-0 text-2xl font-semibold tabular-nums tracking-tight ${
                  esOscuro ? 'text-acento' : 'text-primario'
                }`}
              >
                {formatearHora(servicio.hora)}
              </span>
            </div>
          )),
        )}
      </div>

      {/* CTA */}
      {mostrarEnlace && (
        <>
          <div className={`mx-5 h-px ${esOscuro ? 'bg-white/8' : 'bg-slate-100'}`} />
          <div className="px-5 pb-5 pt-4">
            <Link
              href="/horarios"
              className={`group flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold transition-all duration-300 ${
                esOscuro
                  ? 'border border-acento/25 text-acento hover:border-acento hover:bg-acento hover:text-primario-oscuro'
                  : 'bg-primario text-white hover:bg-primario-oscuro hover:-translate-y-0.5'
              }`}
              style={
                esOscuro
                  ? undefined
                  : {
                      boxShadow: '0 4px 16px rgba(0,77,93,0.22)',
                    }
              }
            >
              Ver horarios completos
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
