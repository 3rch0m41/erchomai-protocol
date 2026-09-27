import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

// archiver + plugin di cifratura girano solo lato server (vedi serverExternalPackages
// in next.config.mjs). Il progetto ha due versioni di "archiver"; il plugin espone
// registerFormat solo sulla propria copia (v7), quindi la importiamo per percorso fisso.
// Percorsi statici: il bundler di Next non accetta require() con path calcolato.
const archiver = require('archiver7'); // alias di archiver@7 (espone registerFormat)
const zipEncryptedPlugin = require('archiver-zip-encrypted');

// Estensioni considerate eseguibili: servite SOLO dentro uno zip protetto,
// mai come download diretto (protegge il dominio da segnalazioni antivirus).
const EXECUTABLE_EXT = new Set([
  'exe', 'dll', 'sys', 'scr', 'com', 'msi', 'bin', 'elf', 'so', 'app',
  'apk', 'dmg', 'jar', 'bat', 'cmd', 'ps1', 'vbs', 'js', 'jse', 'wsf', 'hta',
]);

// Password convenzionale per i campioni (standard di settore)
const ZIP_PASSWORD = 'infected';

let formatRegistered = false;
function getArchiver() {
  if (!formatRegistered) {
    try {
      archiver.registerFormat('zip-encrypted', zipEncryptedPlugin);
    } catch {
      // La registrazione è globale: se già fatta, archiver lancia un errore innocuo
    }
    formatRegistered = true;
  }
  return archiver;
}

function humanSize(bytes) {
  if (!bytes && bytes !== 0) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  let n = bytes;
  let i = 0;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i += 1;
  }
  return `${n.toFixed(n < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
}

function zipEncrypted(buffer, filename) {
  const archiver = getArchiver();
  return new Promise((resolve, reject) => {
    const chunks = [];
    const archive = archiver.create('zip-encrypted', {
      zlib: { level: 9 },
      encryptionMethod: 'zip20', // apribile ovunque (7-Zip, unzip, Esplora file)
      password: ZIP_PASSWORD,
    });
    archive.on('data', (c) => chunks.push(c));
    archive.on('error', reject);
    archive.on('end', () => resolve(Buffer.concat(chunks)));
    archive.append(buffer, { name: filename });
    archive.finalize();
  });
}

// Trasforma gli allegati di un report in ciò che serve alla pagina:
// per ogni file scarica il contenuto da Sanity, calcola SHA-256 e,
// se è un eseguibile, lo racchiude in uno zip protetto da password.
// Restituisce anche un data-URI, così il download non dipende da altri servizi.
export async function resolveDownloads(items) {
  if (!items?.length) return [];

  const resolved = await Promise.all(
    items.map(async (item) => {
      const url = item?.file?.asset?.url;
      const originalName = item?.file?.asset?.originalFilename || 'file';
      if (!url) return null;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = Buffer.from(await res.arrayBuffer());

        const sha256 = crypto.createHash('sha256').update(raw).digest('hex');
        const ext = (originalName.split('.').pop() || '').toLowerCase();
        const isExecutable = EXECUTABLE_EXT.has(ext);

        let downloadName = originalName;
        let payload = raw;
        let mime = item.file.asset.mimeType || 'application/octet-stream';

        if (isExecutable) {
          payload = await zipEncrypted(raw, originalName);
          downloadName = `${originalName}.zip`;
          mime = 'application/zip';
        }

        return {
          label: item.label || originalName,
          description: item.description || '',
          filename: downloadName,
          size: humanSize(payload.length),
          sha256, // hash del file ORIGINALE, così è verificabile dopo l'estrazione
          zipped: isExecutable,
          href: `data:${mime};base64,${payload.toString('base64')}`,
        };
      } catch {
        // Un file non raggiungibile non deve rompere l'intera pagina
        return null;
      }
    })
  );

  return resolved.filter(Boolean);
}
