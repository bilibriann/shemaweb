'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { esquemaContacto, type EntradaFormularioContacto } from '@/lib/utilidades/validaciones';
import { Boton } from '@/componentes/ui/Boton';
import { cn } from '@/lib/utilidades/utilidades';

type EstadoEnvio = 'inactivo' | 'enviando' | 'exito' | 'error';

export function FormularioContacto() {
  const [estadoEnvio, setEstadoEnvio] = useState<EstadoEnvio>('inactivo');
  const [mensajeError, setMensajeError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EntradaFormularioContacto>({
    resolver: zodResolver(esquemaContacto),
  });

  const alEnviar = async (datos: EntradaFormularioContacto) => {
    setEstadoEnvio('enviando');
    setMensajeError('');

    try {
      const respuesta = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok || !resultado.exito) {
        throw new Error(resultado.mensaje || 'Error al enviar el mensaje');
      }

      setEstadoEnvio('exito');
      reset();
    } catch (error) {
      setEstadoEnvio('error');
      setMensajeError(
        error instanceof Error ? error.message : 'Ocurrió un error inesperado. Inténtalo de nuevo.',
      );
    }
  };

  if (estadoEnvio === 'exito') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle2 size={56} className="text-green-500 mb-4" />
        <h3 className="text-xl font-bold text-texto mb-2">¡Mensaje enviado!</h3>
        <p className="text-texto-suave mb-8 max-w-sm">
          Gracias por escribirnos. Te responderemos lo antes posible.
        </p>
        <Boton variante="secundario" onClick={() => setEstadoEnvio('inactivo')}>
          Enviar otro mensaje
        </Boton>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(alEnviar)} noValidate className="space-y-5">
      {/* Honeypot anti-spam (oculto) */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('campoCebo')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <CampoFormulario
          id="nombre"
          etiqueta="Nombre completo"
          obligatorio
          error={errors.nombre?.message}
        >
          <input
            id="nombre"
            type="text"
            autoComplete="name"
            placeholder="Juan González"
            className={estiloInput(!!errors.nombre)}
            {...register('nombre')}
          />
        </CampoFormulario>

        <CampoFormulario
          id="correo"
          etiqueta="Correo electrónico"
          obligatorio
          error={errors.correo?.message}
        >
          <input
            id="correo"
            type="email"
            autoComplete="email"
            placeholder="juan@ejemplo.cl"
            className={estiloInput(!!errors.correo)}
            {...register('correo')}
          />
        </CampoFormulario>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <CampoFormulario id="telefono" etiqueta="Teléfono" error={errors.telefono?.message}>
          <input
            id="telefono"
            type="tel"
            autoComplete="tel"
            placeholder="+56 9 1234 5678"
            className={estiloInput(!!errors.telefono)}
            {...register('telefono')}
          />
        </CampoFormulario>

        <CampoFormulario
          id="asunto"
          etiqueta="Asunto"
          obligatorio
          error={errors.asunto?.message}
        >
          <input
            id="asunto"
            type="text"
            placeholder="¿En qué te podemos ayudar?"
            className={estiloInput(!!errors.asunto)}
            {...register('asunto')}
          />
        </CampoFormulario>
      </div>

      <CampoFormulario
        id="mensaje"
        etiqueta="Mensaje"
        obligatorio
        error={errors.mensaje?.message}
      >
        <textarea
          id="mensaje"
          rows={5}
          placeholder="Escribe tu mensaje aquí..."
          className={cn(estiloInput(!!errors.mensaje), 'resize-none')}
          {...register('mensaje')}
        />
      </CampoFormulario>

      {estadoEnvio === 'error' && (
        <div className="flex items-start gap-3 rounded-lg bg-red-50 p-4 border border-red-200">
          <AlertCircle size={18} className="text-red-600 mt-0.5 shrink-0" />
          <p className="text-red-700 text-sm">{mensajeError}</p>
        </div>
      )}

      <p className="text-xs text-texto-suave">
        Al enviar este formulario aceptas nuestra{' '}
        <a href="/privacidad" className="text-primario hover:underline">
          Política de Privacidad
        </a>
        .
      </p>

      <Boton
        type="submit"
        variante="primario"
        tamano="lg"
        cargando={estadoEnvio === 'enviando'}
        iconoFin={<Send size={18} />}
        className="w-full sm:w-auto"
      >
        Enviar mensaje
      </Boton>
    </form>
  );
}

function estiloInput(tieneError: boolean): string {
  return cn(
    'w-full rounded-lg border px-4 py-3 text-sm text-texto bg-white',
    'placeholder:text-texto-muy-suave',
    'focus:outline-none focus:ring-2 focus:ring-primario focus:border-transparent',
    'transition-colors duration-200',
    tieneError
      ? 'border-red-400 bg-red-50 focus:ring-red-400'
      : 'border-borde hover:border-texto-suave',
  );
}

interface PropiedadesCampoFormulario {
  id: string;
  etiqueta: string;
  obligatorio?: boolean;
  error?: string;
  children: React.ReactNode;
}

function CampoFormulario({
  id,
  etiqueta,
  obligatorio,
  error,
  children,
}: PropiedadesCampoFormulario) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-texto mb-1.5">
        {etiqueta}
        {obligatorio && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1" role="alert">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );
}
