export const CONFIGURACION_SITIO = {
  nombre: 'Iglesia SHEMA',
  nombreCorto: 'SHEMA',
  eslogan: 'Oye, Israel: Jehová nuestro Dios, Jehová uno es',
  descripcion:
    'Iglesia cristiana en Santiago, Chile. Adorando a Dios con todo nuestro ser y sirviendo a nuestra comunidad.',
  url: process.env.NEXT_PUBLIC_URL || 'https://iglesashema.cl',
  idioma: 'es-CL',
  zonaHoraria: 'America/Santiago',
  email: 'contacto@iglesashema.cl',
  telefono: '+56 9 0000 0000',
  direccion: {
    calle: 'Av. Brasil, 522',
    ciudad: 'Santiago',
    region: 'Región Metropolitana',
    pais: 'Chile',
  },
  redesSociales: {
    instagram: 'https://instagram.com/iglesashema',
    facebook: 'https://facebook.com/iglesashema',
    youtube: 'https://youtube.com/@iglesashema',
  },
  fundacion: 2010,
} as const;

export const ETIQUETAS_CATEGORIA_EVENTO: Record<string, string> = {
  culto: 'Culto',
  retiro: 'Retiro',
  conferencia: 'Conferencia',
  evangelismo: 'Evangelismo',
  especial: 'Especial',
  jovenes: 'Jóvenes',
};
