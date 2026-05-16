import { cn } from '@/lib/utilidades/utilidades';

type VarianteInsignia = 'primario' | 'acento' | 'verde' | 'gris' | 'rojo';

interface PropiedadesInsignia extends React.HTMLAttributes<HTMLSpanElement> {
  variante?: VarianteInsignia;
}

const estilosVariante: Record<VarianteInsignia, string> = {
  primario: 'bg-primario-muy-claro text-primario',
  acento: 'bg-acento-muy-claro text-acento-oscuro',
  verde: 'bg-green-100 text-green-800',
  gris: 'bg-fondo-suave text-texto-suave',
  rojo: 'bg-red-100 text-red-800',
};

function Insignia({ variante = 'gris', className, children, ...resto }: PropiedadesInsignia) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase',
        estilosVariante[variante],
        className,
      )}
      {...resto}
    >
      {children}
    </span>
  );
}

export { Insignia };
