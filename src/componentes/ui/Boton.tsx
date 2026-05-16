import { forwardRef } from 'react';
import { cn } from '@/lib/utilidades/utilidades';

type VarianteBoton = 'primario' | 'secundario' | 'contorno' | 'fantasma' | 'acento';
type TamanoBoton = 'sm' | 'md' | 'lg';

interface PropiedadesBoton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: VarianteBoton;
  tamano?: TamanoBoton;
  cargando?: boolean;
  icono?: React.ReactNode;
  iconoFin?: React.ReactNode;
}

const estilosVariante: Record<VarianteBoton, string> = {
  primario:
    'bg-primario text-white hover:bg-primario-oscuro focus-visible:ring-primario shadow-sm',
  secundario:
    'bg-primario-muy-claro text-primario hover:bg-primario hover:text-white focus-visible:ring-primario',
  contorno:
    'border-2 border-primario text-primario hover:bg-primario hover:text-white focus-visible:ring-primario',
  fantasma:
    'text-primario hover:bg-primario-muy-claro focus-visible:ring-primario',
  acento:
    'bg-acento text-white hover:bg-acento-oscuro focus-visible:ring-acento shadow-sm',
};

const estilosTamano: Record<TamanoBoton, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-2.5 text-base gap-2',
  lg: 'px-8 py-3.5 text-lg gap-2.5',
};

const Boton = forwardRef<HTMLButtonElement, PropiedadesBoton>(
  (
    {
      variante = 'primario',
      tamano = 'md',
      cargando = false,
      icono,
      iconoFin,
      children,
      className,
      disabled,
      ...resto
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || cargando}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          estilosVariante[variante],
          estilosTamano[tamano],
          className,
        )}
        {...resto}
      >
        {cargando ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          icono
        )}
        {children}
        {!cargando && iconoFin}
      </button>
    );
  },
);

Boton.displayName = 'Boton';

export { Boton };
export type { PropiedadesBoton };
