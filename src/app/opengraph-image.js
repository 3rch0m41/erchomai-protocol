import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Immagine di anteprima (1200x630) mostrata quando un link del sito viene
// condiviso su social e app di messaggistica. Viene generata in fase di build.
export const alt = 'ERCHOMAI PROTOCOL';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Logo completo scontornato (percorso relativo alla cartella del progetto)
const LOGO_WIDTH = 1168;
const LOGO_HEIGHT = 450;

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), 'src/assets/erchomai-logo.png'), 'base64');
  const logoSrc = `data:image/png;base64,${logoData}`;
  const logoWidth = 920;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000212',
          backgroundImage:
            'linear-gradient(to right, rgba(128,128,128,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(128,128,128,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text -- in next/og l'immagine è parte di un PNG, alt è in export const alt */}
        <img
          src={logoSrc}
          width={logoWidth}
          height={Math.round((logoWidth * LOGO_HEIGHT) / LOGO_WIDTH)}
        />
        <div
          style={{
            marginTop: 36,
            fontSize: 28,
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          SECURITY IS A STATE OF ARRIVAL
        </div>
      </div>
    ),
    { ...size }
  );
}
