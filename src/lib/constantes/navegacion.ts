import type { ElementoNavegacion } from '@/lib/tipos/type';

export const ELEMENTOS_NAVEGACION: ElementoNavegacion[] = [
  { etiqueta: 'Inicio', ruta: '/' },
  { etiqueta: 'Nosotros', ruta: '/nosotros' },
  { etiqueta: 'Horarios', ruta: '/horarios' },
  { etiqueta: 'Eventos', ruta: '/eventos' },
  { etiqueta: 'Galería', ruta: '/galeria' },
  { etiqueta: 'Contacto', ruta: '/contacto' },
];

export const ENLACES_PIE_PAGINA = {
  iglesia: [
    { etiqueta: 'Nosotros', ruta: '/nosotros' },
    { etiqueta: 'Horarios', ruta: '/horarios' },
  ],
  recursos: [
    { etiqueta: 'Eventos', ruta: '/eventos' },
    { etiqueta: 'Galería', ruta: '/galeria' },
    { etiqueta: 'Contacto', ruta: '/contacto' },
  ],
};
