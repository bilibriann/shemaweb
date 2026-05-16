export interface ElementoNavegacion {
  etiqueta: string;
  ruta: string;
  externo?: boolean;
}

export type CategoriaEvento =
  | 'culto'
  | 'retiro'
  | 'conferencia'
  | 'evangelismo'
  | 'especial'
  | 'jovenes';

export interface Evento {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  lugar: string;
  imagen?: string;
  categoria: CategoriaEvento;
  destacado: boolean;
}


export interface HorarioCulto {
  dia: string;
  orden: number;
  servicios: ServicioCulto[];
}

export interface ServicioCulto {
  tipo: string;
  hora: string;
  descripcion?: string;
}

export interface RespuestaAPI<T = unknown> {
  exito: boolean;
  datos?: T;
  mensaje?: string;
  errores?: Record<string, string[]>;
}

export interface DatosFormularioContacto {
  nombre: string;
  correo: string;
  telefono?: string;
  asunto: string;
  mensaje: string;
  campoCebo?: string;
}
