import { NextRequest, NextResponse } from 'next/server';

const limitadorMemoria = new Map<string, { contador: number; timestamp: number }>();
const VENTANA_MS = 60_000;
const LIMITE_SOLICITUDES = 20;

function obtenerIP(solicitud: NextRequest): string {
  return (
    solicitud.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    solicitud.headers.get('x-real-ip') ||
    'desconocido'
  );
}

function verificarLimitador(ip: string): boolean {
  const ahora = Date.now();
  const registro = limitadorMemoria.get(ip);

  if (!registro || ahora - registro.timestamp > VENTANA_MS) {
    limitadorMemoria.set(ip, { contador: 1, timestamp: ahora });
    return true;
  }

  if (registro.contador >= LIMITE_SOLICITUDES) {
    return false;
  }

  registro.contador++;
  return true;
}

// Limpieza periódica para evitar fugas de memoria
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const ahora = Date.now();
    for (const [ip, registro] of limitadorMemoria.entries()) {
      if (ahora - registro.timestamp > VENTANA_MS * 5) {
        limitadorMemoria.delete(ip);
      }
    }
  }, VENTANA_MS * 5);
}

export function middleware(solicitud: NextRequest): NextResponse {
  const { pathname } = solicitud.nextUrl;

  if (pathname.startsWith('/api/')) {
    const ip = obtenerIP(solicitud);

    if (!verificarLimitador(ip)) {
      return NextResponse.json(
        { exito: false, mensaje: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.' },
        { status: 429, headers: { 'Retry-After': '60' } },
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
