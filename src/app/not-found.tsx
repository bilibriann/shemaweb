'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function PaginaNoEncontrada() {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-primario px-4">
      <div className="text-center text-white max-w-md">
        <p className="text-acento-claro font-display text-8xl font-bold mb-4 leading-none">404</p>
        <h1 className="text-2xl font-bold mb-3">Página no encontrada</h1>
        <p className="text-white/70 mb-10 leading-relaxed">
          La página que buscas no existe o fue movida. Vuelve al inicio y continúa explorando.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-acento text-white font-semibold hover:bg-acento-oscuro transition-colors"
          >
            <Home size={18} />
            Ir al inicio
          </Link>
          <button
            onClick={() => history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={18} />
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
