# Iglesia SHEMA — Sitio Web Institucional

Sitio web informativo de la **Iglesia SHEMA**, Santiago, Chile.
Construido con Next.js 15, TypeScript y Tailwind CSS v4, con arquitectura orientada a producción.

---

## Stack tecnológico

| Tecnología | Versión | Rol |
|---|---|---|
| Next.js | 15.x | Framework full-stack (App Router + SSG) |
| React | 19.x | Librería de UI |
| TypeScript | 5.x | Tipado estático estricto |
| Tailwind CSS | 4.x | Estilos con variables CSS personalizadas |
| Zod | 3.x | Validación de esquemas (cliente y servidor) |
| React Hook Form | 7.x | Formularios con validación |
| Lucide React | — | Íconos SVG |
| Raleway + Cormorant Garamond | — | Tipografías (Google Fonts vía `next/font`) |

---

## Requisitos

- **Node.js** `>= 20.0.0`
- **npm** `>= 10.x`

---

## Instalación y desarrollo

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/shemaweb.git
cd shemaweb

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con los valores correspondientes (ver sección más abajo)

# 4. Iniciar servidor de desarrollo (Turbopack)
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---

## Scripts disponibles

```bash
npm run dev          # Servidor de desarrollo con Turbopack (hot reload)
npm run build        # Build de producción (genera páginas estáticas)
npm run start        # Servidor de producción (requiere build previo)
npm run lint         # Verificar código con ESLint
npm run format       # Formatear archivos con Prettier
npm run format:check # Verificar formato sin modificar
npm run type-check   # Verificar tipos TypeScript sin compilar
npm run start:dev    # Build + start en un solo comando (puerto 3000)
```

---

## Variables de entorno

Copiar `.env.example` como `.env.local` y completar los valores:

```env
# URL pública del sitio (sin barra final)
NEXT_PUBLIC_URL=https://iglesashema.cl

# Nombre del sitio (visible en meta tags)
NEXT_PUBLIC_NOMBRE_SITIO=Iglesia SHEMA

# Email de contacto (destino de mensajes del formulario)
EMAIL_CONTACTO=contacto@iglesashema.cl
EMAIL_REMITENTE=no-reply@iglesashema.cl

# Resend — servicio de email transaccional (https://resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Google Analytics 4 (opcional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Cloudflare Turnstile — anti-bot en formulario (https://dash.cloudflare.com)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

> Las variables con prefijo `NEXT_PUBLIC_` son visibles en el cliente (navegador).
> Las demás solo existen en el servidor.

---

## Estructura del proyecto

```
shemaweb/
├── public/
│   └── contenido/png/          # Imágenes estáticas (logo, fotos)
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── layout.tsx          # Layout raíz: fuentes, BarraNavegacion, PieDePagina
│   │   ├── page.tsx            # Inicio (/)
│   │   ├── not-found.tsx       # Página 404 personalizada
│   │   ├── sitemap.ts          # Sitemap automático (/sitemap.xml)
│   │   ├── robots.ts           # Robots.txt (/robots.txt)
│   │   ├── nosotros/           # /nosotros
│   │   ├── eventos/            # /eventos
│   │   ├── horarios/           # /horarios
│   │   ├── galeria/            # /galeria
│   │   ├── contacto/           # /contacto
│   │   ├── privacidad/         # /privacidad  (noindex)
│   │   ├── terminos/           # /terminos    (noindex)
│   │   └── api/
│   │       ├── contacto/       # POST /api/contacto
│   │       └── eventos/        # GET  /api/eventos
│   ├── componentes/
│   │   ├── diseno/
│   │   │   ├── BarraNavegacion.tsx   # Navbar responsiva con menú móvil
│   │   │   ├── PieDePagina.tsx       # Footer con 4 columnas
│   │   │   └── TransicionPagina.tsx  # Animación entre rutas
│   │   ├── secciones/
│   │   │   ├── SeccionHero.tsx       # Hero principal de la página de inicio
│   │   │   ├── SeccionEventos.tsx    # Grid de próximos eventos
│   │   │   └── FormularioContacto.tsx# Formulario con validación y anti-spam
│   │   └── ui/
│   │       ├── Boton.tsx             # 5 variantes, 3 tamaños, estado loading
│   │       ├── ContenedorSeccion.tsx # Wrapper de sección con fondos configurables
│   │       └── Insignia.tsx          # Badge/chip de categoría
│   ├── estilos/
│   │   └── globals.css         # Variables CSS de diseño (colores, tipografía, sombras)
│   └── lib/
│       ├── constantes/
│       │   ├── sitio.ts        # Datos del sitio (nombre, email, dirección, redes)
│       │   ├── navegacion.ts   # Ítems de navegación y enlaces del footer
│       │   └── metadata.ts     # Metadata base para SEO (OpenGraph, Twitter Card)
│       ├── servicios/
│       │   ├── servicioEventos.ts   # Funciones de acceso a eventos.json
│       │   └── servicioHorarios.ts  # Funciones de acceso a horarios.json
│       ├── tipos/
│       │   └── type.ts         # Tipos TypeScript: Evento, HorarioCulto, RespuestaAPI…
│       └── utilidades/
│           ├── utilidades.ts   # cn(), formatearFecha, formatearHora, truncarTexto
│           └── validaciones.ts # Esquema Zod del formulario de contacto
├── middleware.ts               # Rate limiting: 20 req/min por IP en /api/*
├── next.config.ts              # Headers de seguridad, formatos de imagen
├── tailwind.config.ts          # Configuración Tailwind (si aplica)
├── tsconfig.json               # TypeScript strict mode, alias @/*
├── .env.example                # Plantilla de variables de entorno
└── .gitignore
```

---

## Contenido editable (JSON)

Todo el contenido estático está en archivos JSON dentro de `src/lib/contenido/`.
No se requiere tocar código para actualizar la información de la iglesia:

| Archivo | Contenido |
|---|---|
| `iglesia.json` | Historia, visión, misión de la iglesia |
| `eventos.json` | Lista de eventos (título, fecha, hora, lugar, categoría) |
| `horarios.json` | Horarios de cultos semanales |

**Datos del sitio** (email, teléfono, redes sociales, dirección):
`src/lib/constantes/sitio.ts`

---

## Personalización de colores

Los colores están definidos en `src/estilos/globals.css` como variables CSS.
Al modificar estos valores toda la UI se actualiza automáticamente:

```css
@theme {
  --color-primario:        #1b3a6b;   /* Azul marino principal */
  --color-primario-oscuro: #0f2347;
  --color-acento:          #b8912a;   /* Dorado */
  --color-acento-claro:    #d4a843;
}
```

---

## API Routes

### `POST /api/contacto`
Recibe los datos del formulario de contacto.

**Body JSON:**
```json
{
  "nombre": "string",
  "email": "string",
  "telefono": "string (opcional)",
  "asunto": "string",
  "mensaje": "string"
}
```

**Respuesta:**
```json
{ "exito": true, "mensaje": "Mensaje recibido correctamente." }
```

> El envío de email (Resend) está pendiente de integración. Actualmente valida y responde con éxito.

---

### `GET /api/eventos`
Devuelve la lista de eventos desde `eventos.json`.

**Query params:**
- `?proximos=true` — filtra solo eventos desde la fecha actual

**Respuesta:**
```json
{ "exito": true, "datos": [ /* Evento[] */ ] }
```

Cache: `3600s` + `stale-while-revalidate: 86400s`

---

## Seguridad

- **Rate limiting** en `/api/*`: 20 solicitudes por minuto por IP (`middleware.ts`)
- **Headers HTTP** configurados en `next.config.ts`:
  - `Content-Security-Policy` estricto
  - `Strict-Transport-Security` (HSTS, 2 años)
  - `X-Frame-Options: SAMEORIGIN`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
- **Honeypot anti-spam** en el formulario de contacto
- **Validación Zod** en cliente y servidor

---

## Despliegue

### Vercel (recomendado)

```bash
# Instalar CLI de Vercel
npm i -g vercel

# Desplegar (primera vez conecta con GitHub/GitLab)
vercel

# Producción
vercel --prod
```

Configurar las variables de entorno en `dashboard.vercel.com → Settings → Environment Variables`.

---

### VPS con Nginx + PM2

```bash
# En el servidor (Ubuntu / Debian)
# 1. Clonar y preparar
git clone https://github.com/tu-usuario/shemaweb.git
cd shemaweb
npm install
cp .env.example .env.local
# Editar .env.local con los valores de producción

# 2. Build
npm run build

# 3. Iniciar con PM2
pm2 start npm --name "shemaweb" -- start
pm2 save
pm2 startup
```

**Configuración Nginx básica:**

```nginx
server {
    listen 80;
    server_name iglesashema.cl www.iglesashema.cl;

    location / {
        proxy_pass         http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Luego activar SSL con Certbot:

```bash
sudo certbot --nginx -d iglesashema.cl -d www.iglesashema.cl
```

---

### Docker (opcional)

El proyecto es compatible con `node:20-alpine`. Ejemplo de `Dockerfile` básico:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## Checklist de producción

### Dominio y DNS
- [ ] Registro A o CNAME apuntando al servidor
- [ ] SSL/TLS activado (Certbot o Vercel automático)
- [ ] Redirección `www` → dominio principal
- [ ] HTTPS forzado

### Servidor
- [ ] Node.js 20+ instalado
- [ ] PM2 instalado (`npm i -g pm2`)
- [ ] Nginx configurado como reverse proxy
- [ ] Puertos 80, 443 y 22 abiertos en firewall

### Variables de entorno
- [ ] `.env.local` configurado en el servidor
- [ ] `NEXT_PUBLIC_URL` con dominio real (sin barra final)
- [ ] `RESEND_API_KEY` para envío de emails
- [ ] Claves Turnstile configuradas (anti-bot)

### SEO y analytics
- [ ] Google Search Console verificado
- [ ] Sitemap enviado (`/sitemap.xml`)
- [ ] Google Analytics configurado (`NEXT_PUBLIC_GA_ID`)
- [ ] Favicon real en `/public`
- [ ] Imagen OpenGraph real en `/public`

### Rendimiento
- [ ] Imágenes en formato WebP/AVIF
- [ ] Gzip/Brotli habilitado en Nginx
- [ ] Core Web Vitals verificados con Lighthouse

---

## Próximas integraciones

- [ ] Email transaccional (Resend) para formulario de contacto
- [ ] Galería con fotos reales de la iglesia
- [ ] Mapa interactivo en página de horarios
- [ ] Google Analytics 4
- [ ] Cloudflare Turnstile (anti-bot en formulario)

---

## Convenciones de código

- **Idioma**: Español en variables, funciones, componentes y archivos
- **Componentes**: PascalCase — `BarraNavegacion`, `SeccionHero`
- **Funciones / variables**: camelCase — `obtenerEventos`, `datosIglesia`
- **Archivos**: camelCase — `servicioEventos.ts`, `utilidades.ts`
- **Alias de importación**: `@/` apunta a `src/`
- **APIs de Next.js** (`metadata`, `generateStaticParams`, etc.): inglés obligatorio del framework
- Pre-commit: ESLint + Prettier automático vía Husky + lint-staged

---

## Licencia

Uso exclusivo de **Iglesia SHEMA**, Santiago, Chile. Todos los derechos reservados.
