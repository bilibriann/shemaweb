import { NextRequest, NextResponse } from 'next/server';
import { esquemaContacto } from '@/lib/utilidades/validaciones';
import type { RespuestaAPI } from '@/lib/tipos/type';

export async function POST(solicitud: NextRequest): Promise<NextResponse<RespuestaAPI>> {
  try {
    let cuerpo: unknown;
    try {
      cuerpo = await solicitud.json();
    } catch {
      return NextResponse.json({ exito: false, mensaje: 'Solicitud inválida.' }, { status: 400 });
    }

    const resultado = esquemaContacto.safeParse(cuerpo);

    if (!resultado.success) {
      const errores = resultado.error.flatten().fieldErrors as Record<string, string[]>;
      return NextResponse.json(
        { exito: false, mensaje: 'Datos inválidos.', errores },
        { status: 422 },
      );
    }

    const { campoCebo, ...datos } = resultado.data;

    // Campo cebo anti-spam: si viene relleno, ignorar silenciosamente
    if (campoCebo && campoCebo.length > 0) {
      return NextResponse.json({ exito: true, mensaje: 'Mensaje recibido.' });
    }

    // TODO: Integrar servicio de email (Resend / Nodemailer) cuando esté disponible
    // Ejemplo con Resend:
    // await resend.emails.send({
    //   from: process.env.EMAIL_REMITENTE!,
    //   to: process.env.EMAIL_CONTACTO!,
    //   subject: `[SHEMA Contacto] ${datos.asunto}`,
    //   html: plantillaEmail(datos),
    // });

    console.warn('[Contacto] Mensaje recibido:', {
      nombre: datos.nombre,
      correo: datos.correo,
      asunto: datos.asunto,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { exito: true, mensaje: 'Mensaje enviado correctamente.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('[Contacto] Error interno:', error);
    return NextResponse.json(
      { exito: false, mensaje: 'Error interno del servidor. Inténtalo de nuevo.' },
      { status: 500 },
    );
  }
}
