// Despliegue local a Hostinger por FTPS.
// Sube el contenido de out/ (export estático) al servidor.
//
// Uso:  npm run desplegar
// Lee las credenciales desde .env.local (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD).
// El servidor bloquea las IP de GitHub Actions, por eso desplegamos desde el equipo local.

import { Client } from 'basic-ftp';
import { existsSync } from 'node:fs';

const { FTP_SERVER, FTP_USERNAME, FTP_PASSWORD, FTP_DIR } = process.env;

if (!FTP_SERVER || !FTP_USERNAME || !FTP_PASSWORD) {
  console.error(
    '\n❌ Faltan credenciales FTP en .env.local.\n' +
      '   Agrega: FTP_SERVER, FTP_USERNAME y FTP_PASSWORD\n',
  );
  process.exit(1);
}

if (!existsSync('out')) {
  console.error('\n❌ No existe la carpeta out/. Ejecuta primero "npm run build".\n');
  process.exit(1);
}

const carpetaRemota = FTP_DIR || '/';
const cliente = new Client(30_000); // timeout 30s
cliente.ftp.verbose = false;

try {
  console.log(`\n🔌 Conectando a ${FTP_SERVER} (FTPS)...`);
  await cliente.access({
    host: FTP_SERVER,
    user: FTP_USERNAME,
    password: FTP_PASSWORD,
    secure: true, // FTPS explícito (AUTH TLS) en el puerto 21
    secureOptions: { rejectUnauthorized: false },
  });

  console.log(`📤 Subiendo out/ → ${carpetaRemota} ...`);
  cliente.trackProgress((info) => {
    if (info.name) process.stdout.write(`\r   ${info.type}: ${info.name}            `);
  });

  await cliente.ensureDir(carpetaRemota);
  await cliente.uploadFromDir('out', carpetaRemota);

  cliente.trackProgress();
  console.log(`\n\n✅ Despliegue completado en ${FTP_SERVER}`);
  console.log('   Revisa el sitio en https://calvarysantiago.cl (puede tardar por la caché).\n');
} catch (error) {
  console.error(`\n\n❌ Error en el despliegue: ${error.message}\n`);
  process.exitCode = 1;
} finally {
  cliente.close();
}
