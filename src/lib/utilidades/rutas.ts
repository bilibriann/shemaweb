export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const img = (ruta: string) => `${BASE_PATH}${ruta}`;
