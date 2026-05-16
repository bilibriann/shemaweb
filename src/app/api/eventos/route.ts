export const dynamic = 'force-static';

import { NextRequest, NextResponse } from 'next/server';
import { obtenerEventos, obtenerEventoProximos } from '@/lib/servicios/servicioEventos';
import type { RespuestaAPI, Evento } from '@/lib/tipos/type';

export async function GET(solicitud: NextRequest): Promise<NextResponse<RespuestaAPI<Evento[]>>> {
  try {
    const { searchParams } = new URL(solicitud.url);
    const soloProximos = searchParams.get('proximos') === 'true';

    const eventos = soloProximos ? obtenerEventoProximos() : obtenerEventos();

    return NextResponse.json(
      { exito: true, datos: eventos },
      {
        status: 200,
        headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
      },
    );
  } catch (error) {
    console.error('[Eventos] Error:', error);
    return NextResponse.json(
      { exito: false, mensaje: 'Error al obtener los eventos.' },
      { status: 500 },
    );
  }
}
