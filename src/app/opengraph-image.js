import { ImageResponse } from 'next/og';

// Immagine di anteprima (1200x630) mostrata quando un link del sito viene
// condiviso su social e app di messaggistica. Viene generata in fase di build.
export const alt = 'ERCHOMAI PROTOCOL';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
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
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 150,
            height: 150,
            border: '2px solid rgba(0, 242, 254, 0.35)',
            borderRadius: 36,
            fontSize: 72,
            fontWeight: 900,
            fontStyle: 'italic',
            marginBottom: 48,
          }}
        >
          ΣΠ
        </div>
        <div style={{ fontSize: 76, fontWeight: 900, letterSpacing: '0.12em', color: '#00f2fe' }}>
          ERCHOMAI PROTOCOL
        </div>
        <div style={{ marginTop: 28, fontSize: 30, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)' }}>
          SECURITY IS A STATE OF ARRIVAL
        </div>
      </div>
    ),
    { ...size }
  );
}
