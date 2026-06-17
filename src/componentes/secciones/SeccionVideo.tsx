import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ContenedorSeccion, EncabezadoSeccion } from '@/componentes/ui/ContenedorSeccion';
import { AnimarAlVer } from '@/componentes/ui/AnimarAlVer';
import { CONFIGURACION_SITIO } from '@/lib/constantes/sitio';
import { img } from '@/lib/utilidades/rutas';

const URL_CANAL = CONFIGURACION_SITIO.redesSociales.youtube;

export function SeccionVideo() {
  return (
    <ContenedorSeccion fondo="suave" id="videos">
      <AnimarAlVer>
        <EncabezadoSeccion
          centrado
          etiqueta="En video"
          subtitulo="Revive nuestros mensajes y los momentos más recientes en nuestro canal de YouTube."
        >
          Míranos en YouTube
        </EncabezadoSeccion>
      </AnimarAlVer>

      <AnimarAlVer retraso={120}>
        <div className="mx-auto max-w-4xl">
          {/* Contenedor tipo video — redirige al canal de YouTube */}
          <a
            href={URL_CANAL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver los videos más recientes en nuestro canal de YouTube"
            className="group border-borde relative block overflow-hidden rounded-2xl border bg-black shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-acento"
            style={{ aspectRatio: '16 / 9' }}
          >
            <Image
              src={img('/contenido/Dia de la Madre 2026/DSC06191.JPG')}
              alt=""
              fill
              className="scale-105 object-cover object-center opacity-80 blur-[2px] transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 896px) 90vw, 896px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/40" />

            {/* Botón de reproducción */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FF0000] shadow-xl transition-transform duration-300 group-hover:scale-110 md:h-24 md:w-24">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="white"
                  aria-hidden="true"
                  className="ml-1"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6 text-center md:p-8">
              <p className="text-lg font-semibold text-white md:text-xl">
                Videos más recientes de {CONFIGURACION_SITIO.nombre}
              </p>
              <p className="mt-1 text-sm text-white/70">Toca para ver en YouTube</p>
            </div>
          </a>

          <div className="mt-8 text-center">
            <a
              href={URL_CANAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FF0000] px-8 py-3.5 font-semibold text-white transition-colors hover:bg-[#cc0000]"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Ver canal en YouTube
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </AnimarAlVer>
    </ContenedorSeccion>
  );
}
