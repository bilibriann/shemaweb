import { cn } from '@/lib/utilidades/utilidades';

type FondoSeccion = 'blanco' | 'suave' | 'primario' | 'acento';

interface PropiedadesContenedorSeccion extends React.HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'article';
  fondo?: FondoSeccion;
  espacio?: 'sm' | 'md' | 'lg';
  id?: string;
}

const estilosFondo: Record<FondoSeccion, string> = {
  blanco: 'bg-white',
  suave: 'bg-fondo-suave',
  primario: 'gradient-primario text-white',
  acento: 'bg-acento-muy-claro',
};

const estilosEspacio = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-20 md:py-32',
};

function ContenedorSeccion({
  as: Componente = 'section',
  fondo = 'blanco',
  espacio = 'md',
  className,
  children,
  ...resto
}: PropiedadesContenedorSeccion) {
  return (
    <Componente className={cn(estilosFondo[fondo], estilosEspacio[espacio], className)} {...resto}>
      <div className="contenedor">{children}</div>
    </Componente>
  );
}

interface PropiedadesEncabezadoSeccion extends React.HTMLAttributes<HTMLDivElement> {
  centrado?: boolean;
  subtitulo?: string;
  etiqueta?: string;
}

function EncabezadoSeccion({
  centrado = false,
  subtitulo,
  etiqueta,
  className,
  children,
  ...resto
}: PropiedadesEncabezadoSeccion) {
  return (
    <div className={cn('mb-12', centrado && 'text-center', className)} {...resto}>
      {etiqueta && (
        <span className="text-sm font-bold tracking-widest uppercase text-acento mb-3 block">
          {etiqueta}
        </span>
      )}
      <h2
        className={cn(
          'text-3xl md:text-4xl font-bold text-texto',
          centrado ? 'linea-decorativa-centrada' : 'linea-decorativa',
        )}
      >
        {children}
      </h2>
      {subtitulo && (
        <p className="mt-5 text-texto-suave text-lg max-w-2xl leading-relaxed mx-auto">{subtitulo}</p>
      )}
    </div>
  );
}

export { ContenedorSeccion, EncabezadoSeccion };
