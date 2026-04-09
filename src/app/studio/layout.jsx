export const metadata = {
  title: 'Sanity Studio',
}

export default function StudioLayout({ children }) {
  return (
    <html lang="it">
      <head>
        {/* Nessun CSS globale del sito qui! */}
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}